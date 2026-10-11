import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { PrismaClient } from '@prisma/client'
import { load } from '../tests/route-loader.cjs'
const url = new URL(process.env.DATABASE_URL || 'http://invalid')
if (!['127.0.0.1', 'localhost'].includes(url.hostname) || url.pathname !== '/legal_test') throw Error('Disposable local legal_test database required')
const prisma = new PrismaClient()
const prefix = `payment-fixture-${randomUUID()}`
const ownerId = prefix, versionId = randomUUID(), draftId = randomUUID(), orderId = randomUUID()
let status = 'paid', failDelivery = true
const events = []
const session = {id: `cs_${prefix}`, livemode: false, status:'complete', payment_status:'paid', mode:'payment', client_reference_id:orderId, metadata:{orderId,kind:'single',versionId,contentHash:'fixture-hash'}, currency:'usd',amount_total:1900,customer:null,payment_intent:`pi_${prefix}`,subscription:null,line_items:{data:[{quantity:1,price:{id:'price_fixture'},amount_total:1900}],has_more:false}}
const stripe = {checkout:{sessions:{retrieve:async()=>session}},paymentIntents:{retrieve:async()=>({id:session.payment_intent,livemode:false,status:'succeeded',amount:1900,amount_received:1900,currency:'usd',metadata:{orderId},latest_charge:{amount:1900,amount_refunded:status==='refunded'?1900:0}})},disputes:{list:async()=>({has_more:false,data:status==='disputed'?[{status:'needs_response'}]:[]})}}
const database = new Proxy(prisma, {get(target,key){if(key==='$transaction')return (fn,opts)=>target.$transaction(tx=>fn(new Proxy(tx,{get(t,k){if(k==='deliveryOutbox')return {...t.deliveryOutbox,upsert:async args=>{if(failDelivery)throw Error('synthetic dispatch persistence failure');return t.deliveryOutbox.upsert(args)}};return t[k]}})),opts);return target[key]}})
const {processPaymentEvent}=load('lib/payment-fulfillment.ts',{'./prisma':{prisma:database},'./stripe':{stripe}})
async function event(type='checkout.session.completed',objectId=session.id){const id=`evt_${randomUUID()}`;events.push(id);await prisma.stripeEvent.create({data:{id,type,objectId,livemode:false}});return id}
try {
 await prisma.user.create({data:{id:ownerId,email:`${prefix}@example.invalid`,name:'Payment fixture',password:'not-a-login-hash'}})
 await prisma.documentDraft.create({data:{id:draftId,ownerId,category:'business',sourceSlug:'nda',canonicalSlug:'nda',formData:{}}})
 await prisma.documentVersion.create({data:{id:versionId,draftId,title:'Fixture',content:'Synthetic immutable text',contentHash:'fixture-hash',formData:{},review:{}}})
 await prisma.checkoutOrder.create({data:{id:orderId,ownerId,draftId,versionId,contentHash:'fixture-hash',kind:'single',priceId:'price_fixture',amount:1900,currency:'usd',sessionId:session.id,disclaimerVersion:'fixture',expiresAt:new Date(Date.now()+3600000)}})
 const id=await event()
 await assert.rejects(()=>processPaymentEvent(id))
 assert.equal(await prisma.documentPurchase.count({where:{checkoutId:orderId}}),0)
 assert.equal((await prisma.checkoutOrder.findUnique({where:{id:orderId}})).status,'pending')
 assert.equal((await prisma.stripeEvent.findUnique({where:{id}})).status,'failed')
 failDelivery=false
 await Promise.all(Array.from({length:8},()=>processPaymentEvent(id)))
 assert.equal(await prisma.documentPurchase.count({where:{checkoutId:orderId,status:'paid'}}),1)
 assert.equal(await prisma.deliveryOutbox.count({where:{orderId}}),1)
 assert.equal(await prisma.userDocument.count({where:{id:orderId}}),1)
 // Different event IDs for the same session are also idempotent; current state wins over event order.
 status='refunded';await processPaymentEvent(await event())
 assert.equal((await prisma.documentPurchase.findUnique({where:{checkoutId:orderId}})).status,'refunded')
 status='disputed';await processPaymentEvent(await event())
 assert.equal((await prisma.documentPurchase.findUnique({where:{checkoutId:orderId}})).status,'disputed')
 status='paid';await processPaymentEvent(await event())
 assert.equal((await prisma.documentPurchase.findUnique({where:{checkoutId:orderId}})).status,'paid')
 assert.equal(await prisma.deliveryOutbox.count({where:{orderId}}),1)
 // Unpaid completion is acknowledged without granting access; async success fulfills once.
 const delayedId=randomUUID()
 session.id=`cs_delayed_${prefix}`;session.client_reference_id=delayedId;session.metadata.orderId=delayedId;session.payment_status='unpaid'
 await prisma.checkoutOrder.create({data:{id:delayedId,ownerId,draftId,versionId,contentHash:'fixture-hash',kind:'single',priceId:'price_fixture',amount:1900,currency:'usd',sessionId:session.id,disclaimerVersion:'fixture',expiresAt:new Date(Date.now()+3600000)}})
 await processPaymentEvent(await event())
 assert.equal(await prisma.documentPurchase.count({where:{checkoutId:delayedId}}),0)
 // Subscription events use the current snapshot, including cancel-at-period-end and recovery.
 const subOrderId=randomUUID(),subscriptionId=`sub_${prefix}`,customerId=`cus_${prefix}`
 const future=Math.floor(Date.now()/1000)+30*86400
 const subscription={id:subscriptionId,livemode:false,customer:customerId,metadata:{orderId:subOrderId},status:'active',cancel_at_period_end:false,trial_end:null,items:{data:[{price:{id:'price_fixture'},quantity:1,current_period_end:future}]},latest_invoice:{id:'in_fixture',status:'paid',amount_paid:1900,currency:'usd'}}
 stripe.subscriptions={retrieve:async()=>subscription}
 const subSession={...session,id:`cs_sub_${prefix}`,mode:'subscription',payment_status:'paid',client_reference_id:subOrderId,metadata:{orderId:subOrderId,kind:'subscription',versionId:'',contentHash:''},customer:customerId,subscription:subscriptionId,payment_intent:null}
 stripe.checkout.sessions.retrieve=async()=>subSession
 await prisma.checkoutOrder.create({data:{id:subOrderId,ownerId,kind:'subscription',priceId:'price_fixture',amount:1900,currency:'usd',sessionId:subSession.id,disclaimerVersion:'fixture',expiresAt:new Date(Date.now()+3600000)}})
 await processPaymentEvent(await event('checkout.session.completed',subSession.id))
 const {activeSubscription}=load('lib/entitlements.ts',{'./prisma':{prisma}})
 assert.ok(await activeSubscription(ownerId))
 subscription.cancel_at_period_end=true
 await processPaymentEvent(await event('customer.subscription.updated',subscriptionId));assert.ok(await activeSubscription(ownerId))
 subscription.status='past_due';subscription.latest_invoice.status='open'
 await processPaymentEvent(await event('customer.subscription.updated',subscriptionId));assert.equal(await activeSubscription(ownerId),null)
 // A later-delivered old event still sees current past_due state.
 await processPaymentEvent(await event('customer.subscription.created',subscriptionId));assert.equal(await activeSubscription(ownerId),null)
 subscription.status='active';subscription.latest_invoice.status='paid'
 await processPaymentEvent(await event('customer.subscription.updated',subscriptionId));assert.ok(await activeSubscription(ownerId))
 subscription.status='canceled'
 await processPaymentEvent(await event('customer.subscription.deleted',subscriptionId));assert.equal(await activeSubscription(ownerId),null)
 console.log('PostgreSQL payment verification passed: atomic rollback, concurrent retries, exact-once outbox, delayed payment, refund/dispute, cancellation and subscription recovery')
} finally {
 await prisma.stripeEvent.deleteMany({where:{id:{in:events}}})
 const ownedOrders=await prisma.checkoutOrder.findMany({where:{ownerId},select:{id:true}})
 const orderIds=ownedOrders.map(o=>o.id)
 await prisma.deliveryOutbox.deleteMany({where:{orderId:{in:orderIds}}})
 await prisma.documentPurchase.deleteMany({where:{checkoutId:{in:orderIds}}})
 await prisma.userDocument.deleteMany({where:{id:orderId}})
 await prisma.checkoutOrder.deleteMany({where:{ownerId}})
 await prisma.billingSubscription.deleteMany({where:{ownerId}})
 await prisma.documentVersion.deleteMany({where:{id:versionId}})
 await prisma.documentDraft.deleteMany({where:{id:draftId}})
 await prisma.user.deleteMany({where:{id:ownerId}})
 await prisma.$disconnect()
}
