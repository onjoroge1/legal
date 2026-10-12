const {test}=require('node:test');const assert=require('node:assert/strict');const {load}=require('./route-loader.cjs');
test('destructive erasure requires explicit policy approval and a bounded retention period',()=>{
 const {retentionPolicy}=load('lib/privacy-lifecycle.ts',{'./prisma':{prisma:{}}});
 delete process.env.ENABLE_PRIVACY_ERASURE;assert.throws(()=>retentionPolicy());process.env.ENABLE_PRIVACY_ERASURE='true';process.env.PRIVACY_POLICY_VERSION='approved-fixture';process.env.PAYMENT_RECORD_RETENTION_DAYS='0';assert.throws(()=>retentionPolicy());process.env.PAYMENT_RECORD_RETENTION_DAYS='365';assert.equal(retentionPolicy().days,365);delete process.env.ENABLE_PRIVACY_ERASURE;
});
test('privacy action authenticates and rechecks password before exporting or freezing an account',async()=>{
 let called=0;const route=load('app/api/settings/privacy/route.ts',{'next-auth':{getServerSession:async()=>({user:{id:'owner'}})},'@/lib/auth':{authOptions:{}},'@/lib/prisma':{prisma:{user:{findUnique:async()=>({password:'hash',privacyState:'active'})}}},'bcryptjs':{compare:async()=>false},'@/lib/request-budget':{guardAccount:async()=>{}},'@/lib/privacy-export':{exportCustomer:async()=>{called++}},'@/lib/privacy-lifecycle':{requestErasure:async()=>{called++}}});
 const r=await route.POST(new Request('https://example.invalid/api/settings/privacy',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'export',password:'wrong'})}));assert.equal(r.status,403);assert.equal(called,0);
});
