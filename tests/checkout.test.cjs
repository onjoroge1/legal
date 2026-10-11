const {test}=require('node:test');const assert=require('node:assert/strict');const {load}=require('./route-loader.cjs');
const id='11111111-1111-4111-8111-111111111111';const request=body=>new Request('https://example.invalid/api',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});
function fixture(ownerId=null){
 let order;let calls=[];let userQueries=0;const tx={$executeRaw:async()=>{},billingSubscription:{findFirst:async()=>null},documentPurchase:{findFirst:async()=>null},checkoutOrder:{findUnique:async()=>order,findUniqueOrThrow:async()=>order,create:async({data})=>(order={sessionId:null,...data}),update:async({data})=>Object.assign(order,data)}};
 const prisma={...tx,$transaction:async fn=>fn(tx),user:{findUnique:async({where})=>{userQueries++;assert.deepEqual(Object.keys(where),['id']);return{id:ownerId,stripeCustomerId:'cus_owned'}}}};
 const {createCheckout}=load('lib/checkout.ts',{'./prisma':{prisma},'./auth':{authOptions:{}},'next-auth':{getServerSession:async()=>ownerId?{user:{id:ownerId}}:null},'./document-versions':{readVersion:async()=>({version:{id,contentHash:'hash'},draft:{id:'guest-draft',ownerId,category:'business',sourceSlug:'nda'}})},'./document-review':{requireReviewedVersion:async()=>{}},'./request-budget':{guardAccount:async()=>{}},'./payment-pricing':{checkoutPrice:async()=>({priceId:'price_owned',amount:1900,currency:'usd'})},'./legal-disclaimer-server':{getLegalDisclaimerAcceptance:()=>({version:'v1'})},'./stripe':{stripe:{checkout:{sessions:{create:async(data,opts)=>{calls.push({data,opts});return{id:'cs_fixture',url:'https://checkout.stripe.com/fixture'}},retrieve:async()=>({status:'open',url:'https://checkout.stripe.com/fixture'})}}}}});
 return{createCheckout,calls,get order(){return order},get userQueries(){return userQueries}};
}
test('guest receipt email never resolves an account/customer and retry reuses one immutable order',async()=>{
 process.env.NEXTAUTH_URL='https://example.invalid';const f=fixture();const body={versionId:id,paymentType:'single',guestEmail:'existing@example.invalid'};
 const a=await f.createCheckout(request(body));const b=await f.createCheckout(request(body));assert.equal(a.url,b.url);assert.equal(f.calls.length,1);assert.equal(f.userQueries,0);assert.equal(f.order.ownerId,null);assert.equal(f.calls[0].data.customer,undefined);assert.equal(f.calls[0].data.customer_email,body.guestEmail);assert.equal(f.calls[0].data.line_items[0].price,'price_owned');
 await assert.rejects(()=>f.createCheckout(request({...body,guestEmail:'other@example.invalid'})),/CHECKOUT_EMAIL_CONFLICT/);
 await assert.rejects(()=>f.createCheckout(request({...body,amount:1})));assert.equal(f.calls.length,1);
});
test('billing upgrade has no document and no guest subscription; reject arbitrary tiers',async()=>{
 const f=fixture('owner');await f.createCheckout(request({tier:'professional'}),true);assert.equal(f.order.versionId,undefined);assert.equal(f.order.kind,'subscription');assert.equal(f.calls[0].data.customer,'cus_owned');
 await assert.rejects(()=>fixture().createCheckout(request({tier:'professional'}),true),/SIGN_IN_REQUIRED/);
 await assert.rejects(()=>fixture().createCheckout(request({paymentType:'subscription',versionId:id,guestEmail:'x@example.invalid'})),/SIGN_IN_BEFORE/);
 await assert.rejects(()=>f.createCheckout(request({tier:'starter'}),true));
});
