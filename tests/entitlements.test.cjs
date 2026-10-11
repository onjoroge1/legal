const {test}=require('node:test');const assert=require('node:assert/strict');const {load}=require('./route-loader.cjs');
const {subscriptionAllowsAccess}=load('lib/entitlements.ts',{'./prisma':{prisma:{}}});
test('subscription state matrix: finite active/trial period, cancellation retains access, recovery restores it',()=>{
 const now=new Date('2026-10-10');const future=new Date('2026-11-10');const past=new Date('2026-09-10');
 const state={status:'active',paidThrough:future,trialEndsAt:null,blocked:false,cancelAtPeriodEnd:false};
 assert.equal(subscriptionAllowsAccess(state,now),true);
 assert.equal(subscriptionAllowsAccess({...state,cancelAtPeriodEnd:true},now),true);
 for(const status of ['past_due','unpaid','incomplete','paused','canceled','inactive'])assert.equal(subscriptionAllowsAccess({...state,status},now),false,status);
 for(const paidThrough of [null,past,now])assert.equal(subscriptionAllowsAccess({...state,paidThrough},now),false);
 assert.equal(subscriptionAllowsAccess({...state,status:'trialing',trialEndsAt:future},now),true);
 assert.equal(subscriptionAllowsAccess({...state,status:'trialing',trialEndsAt:past},now),false);
 assert.equal(subscriptionAllowsAccess({...state,blocked:true},now),false);
 assert.equal(subscriptionAllowsAccess(null,now),false);
});
test('a paid purchase is limited to its exact owner and immutable version; refunds deny',async()=>{
 let status='paid';const {versionEntitlement}=load('lib/entitlements.ts',{'./prisma':{prisma:{documentPurchase:{findFirst:async({where})=>where.versionId==='v1'&&where.ownerId==='owner'&&status===where.status?{}:null},billingSubscription:{findMany:async()=>[]}}}});
 assert.equal((await versionEntitlement('v1','owner')).watermark,false);
 assert.equal((await versionEntitlement('v2','owner')).canDownloadDOCX,false);
 assert.equal((await versionEntitlement('v1','other')).canDownloadPDF,false);
 status='refunded';assert.equal((await versionEntitlement('v1','owner')).canDownloadPDF,false);
});
