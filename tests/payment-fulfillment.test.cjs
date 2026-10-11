const {test}=require('node:test');const assert=require('node:assert/strict');const {load}=require('./route-loader.cjs');
const {validateCheckout}=load('lib/payment-fulfillment.ts',{'./prisma':{prisma:{}},'./stripe':{stripe:{}}});
const order={id:'order',kind:'single',versionId:'v',contentHash:'h',sessionId:'cs_fixture',priceId:'price_fixture',amount:1900,currency:'usd',customerId:'cus_owned'};
const session={id:'cs_fixture',livemode:false,client_reference_id:'order',metadata:{orderId:'order',kind:'single',versionId:'v',contentHash:'h'},mode:'payment',amount_total:1900,currency:'usd',customer:'cus_owned',line_items:{data:[{quantity:1,price:{id:'price_fixture'},amount_total:1900}],has_more:false}};
test('fulfillment binds provider mode, identity, hash, quantity, price, amount, currency and customer',()=>{
 delete process.env.STRIPE_MODE;validateCheckout(order,session);
 for(const patch of [{livemode:true},{mode:'subscription'},{amount_total:1},{currency:'eur'},{customer:'cus_other'},{client_reference_id:'other'},{metadata:{...session.metadata,contentHash:'changed'}},{line_items:{...session.line_items,has_more:true}},{line_items:{data:[{quantity:2,price:{id:'price_fixture'},amount_total:1900}]}}])assert.throws(()=>validateCheckout(order,{...session,...patch}));
});
test('signed webhook rejects tampered signatures and oversized bodies and persists before processing',async()=>{
 process.env.STRIPE_WEBHOOK_SECRET='fixture-signing-secret';const calls=[];
 const route=load('app/api/webhooks/stripe/route.ts',{'@/lib/stripe':{stripe:{webhooks:{constructEvent:(body,sig)=>{if(sig!=='valid')throw Error();return{id:'evt',type:'checkout.session.completed',livemode:false,data:{object:{id:'cs'}}}}}}},'@/lib/prisma':{prisma:{stripeEvent:{upsert:async()=>calls.push('ledger')}}},'@/lib/payment-fulfillment':{supportedEvents:new Set(['checkout.session.completed']),processPaymentEvent:async()=>calls.push('process')}});
 const req=(sig,body='{}')=>new Request('https://example.invalid/api',{method:'POST',headers:{'stripe-signature':sig},body});
 assert.equal((await route.POST(req('bad'))).status,400);assert.equal((await route.POST(req('valid','x'.repeat(262145)))).status,413);assert.deepEqual(calls,[]);
 assert.equal((await route.POST(req('valid'))).status,200);assert.deepEqual(calls,['ledger','process']);
});
