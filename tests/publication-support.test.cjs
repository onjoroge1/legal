const {test}=require('node:test');const assert=require('node:assert/strict');const {load}=require('./route-loader.cjs');
test('publication requires a current, hash-bound review, official sources, journey evidence and document scope approval',()=>{
 const {publicationHash,approvedPublication,publishedContent}=load('lib/publication-policy.ts',{'./reviewed-document-scopes':{reviewedScope:key=>key==='reviewed-scope'?{}:undefined}});
 const now=new Date('2026-10-12'),publication={path:'/documents/business/non-disclosure-agreement',kind:'document',title:'Fixture',description:'Test',author:'Fixture author',jurisdiction:'Georgia',scopeKey:'reviewed-scope',sections:[{heading:'Scope',body:'Fixture text'}],sources:[{url:'https://example.gov/source',title:'Official source',effectiveAt:'2026-01-01'}],modifiedAt:'2026-10-01'};
 const entry={publication,contentHash:publicationHash(publication),reviewer:'Fixture reviewer',credentials:'Fixture credentials',evidenceUrl:'https://example.invalid/review',journeyEvidenceUrl:'https://example.invalid/journey',reviewedAt:'2026-10-02',expiresAt:'2026-11-01'};
 assert.equal(approvedPublication(publication.path,now,[entry]),entry);assert.equal(publishedContent(now).length,0);
 for(const changed of [{...entry,expiresAt:'2026-10-11'},{...entry,reviewedAt:'2026-10-13'},{...entry,publication:{...publication,description:'Changed'}},{...entry,credentials:''},{...entry,journeyEvidenceUrl:''}])assert.equal(approvedPublication(publication.path,now,[changed]),undefined);
 assert.equal(approvedPublication(publication.path,now,[entry,entry]),undefined);
 const other={...publication,scopeKey:'unreviewed'};assert.equal(approvedPublication(other.path,now,[{...entry,publication:other,contentHash:publicationHash(other)}]),undefined);
});
test('new checkout fails closed without commercial approval even when payment flag is enabled',async()=>{
 const {requireCommercialPolicy}=load('lib/commercial-policy.ts');assert.equal(requireCommercialPolicy().status,503);
 const route=load('app/api/payment/create-checkout/route.ts',{'@/lib/checkout':{createCheckout:async()=>{throw Error('must not reach provider')}},'@/lib/feature-flags':{requireEmergencyFeature:()=>null},'@/lib/legal-disclaimer-server':{requireLegalDisclaimerAcceptance:()=>null}});
 const response=await route.POST(new Request('https://example.invalid',{method:'POST'}));assert.equal(response.status,503);assert.equal((await response.json()).code,'COMMERCIAL_POLICY_REQUIRED');
});
test('support ticket stores a hash and requires the exact private capability; expiry and frozen owners deny access',async()=>{
 let row,active=true;const tx={$executeRaw:async()=>{},user:{findUnique:async()=>({privacyState:active?'active':'pending'})},supportTicket:{create:async({data})=>(row={...data,status:'open'}),findFirst:async({where})=>row&&row.id===where.id&&row.accessHash===where.accessHash&&row.expiresAt>where.expiresAt.gt?{id:row.id,status:row.status,message:row.message}:null}};
 const support=load('lib/support.ts',{'./prisma':{prisma:{...tx,$transaction:async fn=>fn(tx)}}});
 const result=await support.createSupport({topic:'delivery',message:'Fixture delivery request'},'owner');assert.equal(row.userId,'owner');assert.notEqual(row.accessHash,result.code);assert.equal(row.code,undefined);
 assert.equal((await support.readSupport(result)).message,'Fixture delivery request');await assert.rejects(()=>support.readSupport({...result,code:'a'.repeat(64)}),/NOT_FOUND/);
 row.expiresAt=new Date(0);await assert.rejects(()=>support.readSupport(result),/EXPIRED/);active=false;await assert.rejects(()=>support.createSupport({topic:'privacy',message:'Fixture'},'owner'),/ACCOUNT_UNAVAILABLE/);
});
test('support admin reads and replies reject a non-admin before exposing messages',async()=>{
 const route=load('app/api/admin/support/route.ts',{'next-auth':{getServerSession:async()=>({user:{id:'outsider'}})},'@/lib/auth':{authOptions:{}},'@/lib/prisma':{prisma:{user:{findFirst:async()=>null}}}});
 assert.equal((await route.GET()).status,404);assert.equal((await route.POST(new Request('https://example.invalid',{method:'POST'}))).status,404);
});
