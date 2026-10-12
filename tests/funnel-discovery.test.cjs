const {test}=require('node:test');const assert=require('node:assert/strict');const {load}=require('./route-loader.cjs');
test('all catalog/localized routes stay out of public discovery until approved; overlapping intent redirects resolve without loops',async()=>{
 const {resolveDocument}=load('lib/document-resolver.ts');const {documentCatalog}=load('lib/document-catalog.ts');const {getStatePageStaticParams}=load('lib/state-pages.ts');const {getCityPageStaticParams}=load('lib/city-pages.ts');const {getInternationalPageStaticParams}=load('lib/international-pages.ts');const {approvedPublication}=load('lib/publication-policy.ts');
 const candidates=[...documentCatalog.map(d=>({category:d.category,slug:d.slug})),...getStatePageStaticParams(),...getCityPageStaticParams(),...getInternationalPageStaticParams()];const paths=new Set();
 for(const p of candidates){const resolved=resolveDocument(p.category,p.slug);assert.equal(resolved.path,`/documents/${p.category}/${p.slug}`);assert.equal(approvedPublication(resolved.path),undefined);assert.ok(!paths.has(resolved.path));paths.add(resolved.path)}
 const {intentRedirects}=await import('../lib/intent-redirects.mjs');for(const [source,target] of intentRedirects){assert.ok(!intentRedirects.some(([s])=>s===target));const [,family,category,slug]=target.split('/');assert.equal(family,'documents');assert.equal(resolveDocument(category,slug).path,target);assert.notEqual(source,target)}
 assert.ok(candidates.length>500);
});
test('measurement is opt-in, expires, deduplicates server stages and honors privacy signals without storing customer payload',async()=>{
 const events=new Map();let lookups=0,deleted=0;const id='b'.repeat(64);const prisma={funnelJourney:{findFirst:async()=>{lookups++;return{id}},deleteMany:async()=>{deleted++;return{count:1}}},funnelEvent:{upsert:async q=>{events.set(JSON.stringify(q.where),q.create)}}};const f=load('lib/funnel.ts',{'./prisma':{prisma}});const req=extra=>new Request('https://example.invalid',{headers:{cookie:`${f.FUNNEL_COOKIE}=${id}`,...extra}});
 delete process.env.ENABLE_FUNNEL_MEASUREMENT;await f.recordFunnel(req(),'generation');assert.equal(lookups,0);assert.equal(events.size,0);
 process.env.ENABLE_FUNNEL_MEASUREMENT='true';await f.recordFunnel(new Request('https://example.invalid'),'generation');assert.equal(events.size,0);
 await f.recordFunnel(req(),'generation');await f.recordFunnel(req(),'generation');assert.equal(events.size,1);assert.deepEqual(Object.keys([...events.values()][0]).sort(),['journeyId','stage']);
 await f.recordFunnel(req({'sec-gpc':'1'}),'checkout');assert.equal(deleted,1);assert.equal(events.size,1);
 assert.match(f.measurementCookie(id),/HttpOnly; SameSite=Lax/);delete process.env.ENABLE_FUNNEL_MEASUREMENT;
});
