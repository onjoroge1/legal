const {test}=require('node:test'); const assert=require('node:assert/strict'); const {load}=require('./route-loader.cjs');
const {resolveDocument}=load('lib/document-resolver.ts');
test('all catalog, state, city and international routes resolve consistently',()=>{
 const docs=load('lib/document-catalog.ts').documentCatalog;
 const routes=[...load('lib/state-pages.ts').getStatePageStaticParams(),...load('lib/city-pages.ts').getCityPageStaticParams(),...load('lib/international-pages.ts').getInternationalPageStaticParams()];
 assert.equal(docs.length,52);assert.equal(routes.length,560);
 for(const d of docs){assert.equal(resolveDocument(d.category,d.slug).doc.slug,d.slug);assert.equal(resolveDocument(d.category,d.legacySlug).doc.slug,d.slug)}
 for(const r of routes){const d=resolveDocument(r.category,r.slug);assert.equal(d.doc.category,r.category);assert.ok(d.jurisdiction)}
 assert.throws(()=>resolveDocument('personal','georgia-residential-lease-agreement'));
 assert.throws(()=>resolveDocument('real-estate','georgia-residential-lease-agreement',null,{state:'California'}));
 assert.throws(()=>resolveDocument('business','non-disclosure-agreement','malicious'));
 assert.equal(resolveDocument('real-estate','residential-lease-agreement',null,{state:'Georgia'}).jurisdiction,'georgia');
 assert.equal(resolveDocument('real-estate','washington-dc-residential-lease-agreement').jurisdiction,'district-of-columbia/washington-dc');
});
test('saved versions require owner or unexpired guest binding; content tampering is rejected',async()=>{
 const crypto=require('crypto');let userId='owner';let draft={id:'d',ownerId:'owner'};
 let version={id:'v',draftId:'d',content:'exact content',contentHash:crypto.createHash('sha256').update('exact content').digest('hex')};
 const api=load('lib/document-versions.ts',{'next-auth':{getServerSession:async()=>userId?{user:{id:userId}}:null},'./auth':{authOptions:{}},'./prisma':{prisma:{documentDraft:{findUnique:async()=>draft},documentVersion:{findUnique:async()=>version}}}});
 const req=()=>new Request('https://example.invalid');
 assert.equal((await api.readVersion(req(),'v')).version.content,'exact content');
 userId='stranger';await assert.rejects(api.readVersion(req(),'v'),e=>e.status===404);
 userId='owner';version.content='tampered';await assert.rejects(api.readVersion(req(),'v'),e=>e.status===409);
 draft={id:'d',ownerId:null,guestHash:crypto.createHash('sha256').update('secret').digest('hex'),guestExpiresAt:new Date(Date.now()+10000)};
 assert.equal((await api.draftAccess(new Request('https://example.invalid',{headers:{cookie:'draft_d=secret'}}),'d')).id,'d');
 draft.guestExpiresAt=new Date(0);await assert.rejects(api.draftAccess(new Request('https://example.invalid',{headers:{cookie:'draft_d=secret'}}),'d'),e=>e.status===404);
});
