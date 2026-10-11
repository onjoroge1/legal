const {test}=require('node:test');const assert=require('node:assert/strict');const {createHmac}=require('node:crypto');const {load}=require('./route-loader.cjs');
const crypto=load('lib/delivery-crypto.ts');
test('delivery payloads are encrypted, authenticated and stable after decryption; missing keys fail closed',()=>{
 process.env.EMAIL_DELIVERY_ENCRYPTION_KEY=Buffer.alloc(32,9).toString('base64');
 const payload={to:['fixture@example.invalid'],text:'secret-recovery-link',attachments:[{content:'private-pdf'}]};
 const encrypted=crypto.sealDelivery(payload);assert.doesNotMatch(encrypted,/fixture|secret|private/);assert.equal(JSON.stringify(crypto.openDelivery(encrypted)),JSON.stringify(payload));
 const [iv,tag,body]=encrypted.split('.');assert.throws(()=>crypto.openDelivery([iv,tag,Buffer.from('tampered').toString('base64')].join('.')));
 delete process.env.EMAIL_DELIVERY_ENCRYPTION_KEY;assert.throws(()=>crypto.sealDelivery(payload));
});
test('retries stop before provider idempotency expiration',()=>{
 const {retryAllowed}=load('lib/delivery-worker.ts',{'./prisma':{prisma:{}},'./entitlements':{},'./document-review':{},'./pdf-generator':{},'./delivery-feedback':{}});
 const now=new Date('2026-10-11T12:00:00Z');assert.equal(retryAllowed(null,now),true);assert.equal(retryAllowed(new Date(now-22*3600000),now),true);assert.equal(retryAllowed(new Date(now-23*3600000),now),false);
});
test('Resend webhook verifies raw signatures, rejects tampering, and accepts duplicates for durable deduplication',async()=>{
 const secret=Buffer.alloc(32,7);process.env.RESEND_WEBHOOK_SECRET='whsec_'+secret.toString('base64');let recorded=[];
 const route=load('app/api/webhooks/resend/route.ts',{'@/lib/delivery-feedback':{deliveryEvents:new Set(['email.delivered']),recordDeliveryEvent:async(...args)=>recorded.push(args)}});
 const body=JSON.stringify({type:'email.delivered',created_at:new Date().toISOString(),data:{email_id:'email-fixture'}});
 const id='msg_fixture',timestamp=String(Math.floor(Date.now()/1000)),signature='v1,'+createHmac('sha256',secret).update(`${id}.${timestamp}.${body}`).digest('base64');
 const req=(text=body)=>new Request('https://example.invalid/api/webhooks/resend',{method:'POST',headers:{'svix-id':id,'svix-timestamp':timestamp,'svix-signature':signature},body:text});
 assert.equal((await route.POST(req(body+' '))).status,400);assert.equal(recorded.length,0);
 assert.equal((await route.POST(req())).status,200);assert.equal((await route.POST(req())).status,200);assert.equal(recorded[0][0],recorded[1][0]);assert.equal(recorded[0][1],'email-fixture');
 assert.equal((await route.POST(req('x'.repeat(65537)))).status,413);
});
test('claimed versions deny old guest cookies, recovered cookies authorize only one exact version, and API hides credentials',async()=>{
 let userId=null;const hash=crypto.deliveryHash('exact text');let version={id:'v',draftId:'d',title:'Fixture',content:'exact text',contentHash:hash,claimedOwnerId:'owner',recoveryHash:crypto.deliveryHash('token'),recoveryExpiresAt:new Date(Date.now()+10000)};const draft={id:'d',ownerId:null};
 const mocks={'next-auth':{getServerSession:async()=>userId?{user:{id:userId}}:null},'./auth':{authOptions:{}},'./prisma':{prisma:{documentVersion:{findUnique:async()=>version},documentDraft:{findUnique:async()=>draft,findUniqueOrThrow:async()=>draft}}}};
 const api=load('lib/document-versions.ts',mocks);
 const req=new Request('https://example.invalid',{headers:{cookie:'version_v=token'}});
 await assert.rejects(()=>api.readVersion(req,'v'),e=>e.status===404);
 userId='owner';assert.equal((await api.readVersion(req,'v')).draft.ownerId,'owner');
 userId=null;version.claimedOwnerId=null;assert.equal((await api.readVersion(req,'v')).version.id,'v');
 await assert.rejects(()=>api.readVersion(req,'other'),e=>e.status===404);
 const route=load('app/api/document-versions/[id]/route.ts',{'@/lib/document-versions':{readVersion:async()=>({version,draft})},'@/lib/entitlements':{versionEntitlement:async()=>({canDownloadPDF:true})}});
 const json=await(await route.GET(req,{params:Promise.resolve({id:'v'})})).json();assert.equal(json.recoveryHash,undefined);assert.equal(json.claimedOwnerId,undefined);
});
