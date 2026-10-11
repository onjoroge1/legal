import assert from 'node:assert/strict'
import { randomUUID, createHash } from 'node:crypto'
import { PrismaClient } from '@prisma/client'
import { load } from '../tests/route-loader.cjs'
const url = new URL(process.env.DATABASE_URL || 'http://invalid')
if (!['127.0.0.1', 'localhost'].includes(url.hostname) || url.pathname !== '/legal_test') throw Error('Disposable local legal_test database required')
const prisma = new PrismaClient(), prefix = `delivery-${randomUUID()}`
const ownerId=prefix, guestUserId=`${prefix}-guest`, email=`${prefix}@example.invalid`, guestEmail=`${prefix}-guest@example.invalid`
const orderIds=[],versionIds=[],draftIds=[],providerIds=[]
let failAccepted=true, pdfCalls=0; const calls=[]
const hash=s=>createHash('sha256').update(s).digest('hex')
process.env.EMAIL_DELIVERY_ENCRYPTION_KEY=Buffer.alloc(32,7).toString('base64')
process.env.NEXTAUTH_URL='https://example.invalid';process.env.RESEND_FROM_EMAIL='Fixture <fixture@example.invalid>';process.env.RESEND_API_KEY='fixture-email-key'
const {recordDeliveryEvent}=load('lib/delivery-feedback.ts',{'./prisma':{prisma}})
const nativeFetch=globalThis.fetch
// All mail stays inside this deterministic provider fixture. No network or recipient contact.
globalThis.fetch=async(url,options)=>{
 assert.equal(url,'https://api.resend.com/emails');const key=options.headers['Idempotency-Key'];const prior=calls.find(c=>c.key===key);const id=prior?.id??randomUUID();providerIds.push(id);calls.push({key,id,body:options.body})
 await recordDeliveryEvent(`event-${id}`,id,'email.delivered',new Date())
 return Response.json({id})
}
const database=new Proxy(prisma,{get(target,key){if(key==='$transaction')return(fn,opts)=>target.$transaction(tx=>fn(new Proxy(tx,{get(t,k){if(k==='deliveryOutbox')return{...t.deliveryOutbox,updateMany:async args=>{if(args.data.providerId&&failAccepted){failAccepted=false;throw Error('synthetic database failure after provider acceptance')}return t.deliveryOutbox.updateMany(args)}};return t[k]}})),opts);return target[key]}})
const worker=load('lib/delivery-worker.ts',{'./prisma':{prisma:database},'./entitlements':load('lib/entitlements.ts',{'./prisma':{prisma}}),'./document-review':{requireReviewedVersion:async()=>{}},'./pdf-generator':{generatePDF:async(content,title,options)=>{assert.equal(content,'Synthetic exact document');assert.equal(options.isWatermarked,false);pdfCalls++;return Buffer.from(`%PDF-fixture-${pdfCalls}`)}}})
const recovery=load('lib/guest-purchase-recovery.ts',{'./prisma':{prisma}})
async function fixture(guest=false){
 const draftId=randomUUID(),versionId=randomUUID(),orderId=randomUUID(),jobId=randomUUID();draftIds.push(draftId);versionIds.push(versionId);orderIds.push(orderId)
 await prisma.documentDraft.create({data:{id:draftId,ownerId:guest?null:ownerId,category:'business',sourceSlug:'non-disclosure-agreement',canonicalSlug:'non-disclosure-agreement',formData:{}}})
 await prisma.documentVersion.create({data:{id:versionId,draftId,title:'Fixture',content:'Synthetic exact document',contentHash:hash('Synthetic exact document'),formData:{},review:{}}})
 await prisma.checkoutOrder.create({data:{id:orderId,ownerId:guest?null:ownerId,guestEmail:guest?guestEmail:null,draftId,versionId,contentHash:hash('Synthetic exact document'),kind:'single',priceId:'price_fixture',amount:1900,currency:'usd',status:'paid',disclaimerVersion:'fixture',expiresAt:new Date(Date.now()+3600000)}})
 await prisma.documentPurchase.create({data:{id:randomUUID(),checkoutId:orderId,versionId,ownerId:guest?null:ownerId,status:'paid'}})
 await prisma.deliveryOutbox.create({data:{id:jobId,orderId,dedupeKey:`fulfillment:${orderId}`,kind:'document_ready'}})
 return{draftId,versionId,orderId,jobId}
}
try{
 await prisma.user.create({data:{id:ownerId,name:'Fixture',email,emailVerified:new Date(),password:'!disabled'}})
 await prisma.user.create({data:{id:guestUserId,name:'Guest account',email:guestEmail,password:'!disabled'}})
 const owned=await fixture()
 const reserved=await Promise.all(Array.from({length:8},()=>worker.reserveDelivery()));const job=reserved.find(Boolean)
 assert.equal(reserved.filter(Boolean).length,1)
 await worker.deliverReserved(job)
 let stored=await prisma.deliveryOutbox.findUnique({where:{id:owned.jobId}})
 assert.equal(stored.status,'retry');assert.ok(stored.payloadCipher);assert.ok(stored.firstSendAt);assert.equal(stored.providerId,null)
 await prisma.deliveryOutbox.update({where:{id:job.id},data:{nextAttemptAt:new Date(0)}})
 await worker.deliverReserved(await worker.reserveDelivery())
 stored=await prisma.deliveryOutbox.findUnique({where:{id:owned.jobId}})
 assert.equal(stored.status,'delivered');assert.ok(stored.acceptedAt);assert.ok(stored.deliveredAt);assert.equal(stored.payloadCipher,null)
 assert.equal(calls.length,2);assert.equal(calls[0].body,calls[1].body);assert.equal(calls[0].key,calls[1].key);assert.equal(pdfCalls,1)
 await recordDeliveryEvent(`late-${prefix}`,stored.providerId,'email.sent',new Date());assert.equal((await prisma.deliveryOutbox.findUnique({where:{id:job.id}})).status,'delivered')
 await recordDeliveryEvent(`bounce-${prefix}`,stored.providerId,'email.bounced',new Date())
 assert.ok(await prisma.emailSuppression.findUnique({where:{recipientHash:hash(email)}}))
 await fixture();await worker.deliverReserved(await worker.reserveDelivery());assert.equal(calls.length,2)
 const guest=await fixture(true);await worker.deliverReserved(await worker.reserveDelivery())
 let payload=JSON.parse(calls.at(-1).body);assert.equal(payload.attachments,undefined);assert.doesNotMatch(payload.text,/Synthetic exact document/)
 const token=payload.text.match(/#token=([a-f0-9]{64})/)[1]
 assert.equal((await prisma.guestPurchaseClaim.findUnique({where:{orderId:guest.orderId}})).tokenHash,hash(token))
 const attempts=await Promise.allSettled([recovery.redeemGuestPurchase(token,'guest'),recovery.redeemGuestPurchase(token,'guest')]);assert.equal(attempts.filter(x=>x.status==='fulfilled').length,1)
 assert.match(attempts.find(x=>x.status==='fulfilled').value.cookie,/HttpOnly; SameSite=Strict/)
 assert.equal((await prisma.documentVersion.findUnique({where:{id:guest.versionId}})).claimedOwnerId,null)
 await recovery.queueGuestRecovery(guest.orderId,'wrong@example.invalid');assert.equal(await prisma.deliveryOutbox.count({where:{orderId:guest.orderId,kind:'guest_recovery'}}),0)
 await recovery.queueGuestRecovery(guest.orderId,guestEmail);await recovery.queueGuestRecovery(guest.orderId,guestEmail)
 assert.equal(await prisma.deliveryOutbox.count({where:{orderId:guest.orderId,kind:'guest_recovery'}}),1)
 await worker.deliverReserved(await worker.reserveDelivery());payload=JSON.parse(calls.at(-1).body);const secondToken=payload.text.match(/#token=([a-f0-9]{64})/)[1]
 await assert.rejects(()=>recovery.redeemGuestPurchase(secondToken,'account',ownerId),/SIGN_IN_WITH_RECEIPT_EMAIL/)
 await recovery.redeemGuestPurchase(secondToken,'account',guestUserId)
 assert.equal((await prisma.documentVersion.findUnique({where:{id:guest.versionId}})).claimedOwnerId,guestUserId)
 assert.equal((await prisma.documentDraft.findUnique({where:{id:guest.draftId}})).ownerId,null)
 assert.equal((await prisma.documentPurchase.findUnique({where:{checkoutId:guest.orderId}})).ownerId,guestUserId)
 assert.equal((await prisma.userDocument.findUnique({where:{id:guest.orderId}})).userId,guestUserId)
 await assert.rejects(()=>recovery.redeemGuestPurchase(secondToken,'account',guestUserId),/EXPIRED_OR_USED/)
 const stale=await fixture(true);let staleJob=await worker.reserveDelivery();await prisma.deliveryOutbox.update({where:{id:stale.jobId},data:{leaseUntil:new Date(0)}})
 const newJob=await worker.reserveDelivery();assert.notEqual(staleJob.leaseId,newJob.leaseId);const before=calls.length;await worker.deliverReserved(staleJob);assert.equal(calls.length,before)
 await prisma.deliveryOutbox.update({where:{id:stale.jobId},data:{firstSendAt:new Date(Date.now()-24*3600000)}})
 await worker.deliverReserved({...newJob,firstSendAt:new Date(Date.now()-24*3600000)});assert.equal(calls.length,before);assert.equal((await prisma.deliveryOutbox.findUnique({where:{id:stale.jobId}})).status,'blocked')
 const fakeToken='f'.repeat(64);await prisma.guestPurchaseClaim.create({data:{orderId:stale.orderId,tokenHash:hash(fakeToken),expiresAt:new Date(0)}})
 await assert.rejects(()=>recovery.redeemGuestPurchase(fakeToken,'guest'),/EXPIRED_OR_USED/)
 await prisma.guestPurchaseClaim.update({where:{orderId:stale.orderId},data:{expiresAt:new Date(Date.now()+60000)}});await prisma.checkoutOrder.update({where:{id:stale.orderId},data:{status:'refunded'}})
 await assert.rejects(()=>recovery.redeemGuestPurchase(fakeToken,'guest'),/NOT_RECOVERABLE/)
 console.log('PostgreSQL delivery/recovery passed: leases, exact payload retry after lost acceptance, early/stale webhooks, suppression, single-use guest recovery, explicit account claim, expiry and refund denial')
}finally{
 globalThis.fetch=nativeFetch
 await prisma.emailDeliveryEvent.deleteMany({where:{providerId:{in:providerIds}}})
 await prisma.emailSuppression.deleteMany({where:{recipientHash:{in:[hash(email),hash(guestEmail)]}}})
 await prisma.guestPurchaseClaim.deleteMany({where:{orderId:{in:orderIds}}})
 await prisma.deliveryOutbox.deleteMany({where:{orderId:{in:orderIds}}})
 await prisma.documentPurchase.deleteMany({where:{checkoutId:{in:orderIds}}})
 await prisma.userDocument.deleteMany({where:{id:{in:orderIds}}})
 await prisma.checkoutOrder.deleteMany({where:{id:{in:orderIds}}})
 await prisma.documentVersion.deleteMany({where:{id:{in:versionIds}}})
 await prisma.documentDraft.deleteMany({where:{id:{in:draftIds}}})
 await prisma.requestBudget.deleteMany({where:{key:{in:orderIds.map(id=>`guest-recovery:${id}`)}}})
 await prisma.user.deleteMany({where:{id:{in:[ownerId,guestUserId]}}})
 await prisma.$disconnect()
}
