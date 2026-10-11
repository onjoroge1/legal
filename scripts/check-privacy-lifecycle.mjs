import assert from 'node:assert/strict'
import {randomUUID} from 'node:crypto'
import {PrismaClient} from '@prisma/client'
import {load} from '../tests/route-loader.cjs'
const url=new URL(process.env.DATABASE_URL||'http://invalid');if(!['127.0.0.1','localhost'].includes(url.hostname)||url.pathname!=='/legal_test')throw Error('Disposable local legal_test database required')
const prisma=new PrismaClient(),userId=`privacy-${randomUUID()}`,otherId=`privacy-${randomUUID()}`,draftId=randomUUID(),versionId=randomUUID(),orderId=randomUUID();
const privacy=load('lib/privacy-lifecycle.ts',{'./prisma':{prisma}});const {exportCustomer}=load('lib/privacy-export.ts',{'./prisma':{prisma}})
try{
 await prisma.user.create({data:{id:userId,email:`${userId}@example.invalid`,name:'Private name',password:'secret-password',resetToken:'secret-token',activeSessions:'secret-session'}})
 await prisma.user.create({data:{id:otherId,email:`${otherId}@example.invalid`,name:'OTHER OWNER',password:'!disabled'}})
 await prisma.documentDraft.create({data:{id:draftId,ownerId:userId,category:'business',sourceSlug:'nda',canonicalSlug:'nda',formData:{name:'private input'}}})
 await prisma.documentVersion.create({data:{id:versionId,draftId,title:'Private title',content:'Private contract',contentHash:'evidence-hash',formData:{private:'field'},review:{},recoveryHash:'secret-recovery'}})
 await prisma.userDocument.create({data:{id:orderId,userId,title:'Private',type:'nda',content:'Private contract',metadata:{signingToken:'secret-signing-token'}}})
 await prisma.checkoutOrder.create({data:{id:orderId,ownerId:userId,draftId,versionId,contentHash:'evidence-hash',kind:'single',priceId:'price_fixture',amount:1900,currency:'usd',status:'paid',disclaimerVersion:'fixture',expiresAt:new Date()}})
 await prisma.deliveryOutbox.create({data:{id:randomUUID(),orderId,dedupeKey:`fulfillment:${orderId}`,kind:'document_ready',payloadCipher:'secret-encrypted-payload'}})
 const output=await exportCustomer(userId);assert.match(output,/Private contract/);assert.doesNotMatch(output,/secret-password|secret-token|secret-session|secret-recovery|secret-signing-token|OTHER OWNER/)
 await prisma.billingSubscription.create({data:{id:`sub-${userId}`,ownerId:userId,customerId:'customer',priceId:'price',status:'active'}})
 await assert.rejects(()=>privacy.requestErasure(userId),/RESOLVE_SUBSCRIPTION/)
 assert.equal(await prisma.privacyRequest.count({where:{userId}}),0)
 await prisma.billingSubscription.update({where:{id:`sub-${userId}`},data:{status:'canceled'}})
 const requests=await Promise.all([privacy.requestErasure(userId),privacy.requestErasure(userId)]);assert.equal(requests[0].id,requests[1].id)
 const frozen=await prisma.user.findUnique({where:{id:userId}});assert.equal(frozen.privacyState,'pending');assert.equal(frozen.activeSessions,null);assert.equal(frozen.resetToken,null)
 process.env.ENABLE_PRIVACY_ERASURE='true';process.env.PRIVACY_POLICY_VERSION='fixture-only';process.env.PAYMENT_RECORD_RETENTION_DAYS='365'
 assert.equal((await privacy.eraseNextCustomer()).processed,0)
 await prisma.privacyRequest.update({where:{userId},data:{eligibleAt:new Date(0)}})
 const results=await Promise.all([privacy.eraseNextCustomer(),privacy.eraseNextCustomer()]);assert.equal(results.reduce((n,r)=>n+r.processed,0),1)
 const erased=await prisma.user.findUnique({where:{id:userId}});assert.equal(erased.privacyState,'erased');assert.equal(erased.name,'Deleted account');assert.equal(erased.password,'!disabled')
 const version=await prisma.documentVersion.findUnique({where:{id:versionId}});assert.equal(version.content,'');assert.equal(version.contentHash,'evidence-hash');assert.equal(version.recoveryHash,null)
 assert.equal((await prisma.deliveryOutbox.findFirst({where:{orderId}})).payloadCipher,null)
 assert.equal((await prisma.privacyRequest.findUnique({where:{userId}})).status,'local_erased')
 assert.equal((await prisma.user.findUnique({where:{id:otherId}})).name,'OTHER OWNER')
 console.log('Privacy PostgreSQL passed: scoped secret-free export, active billing denial, concurrent request deduplication, session revocation, policy delay, exactly-once erasure, restricted payment evidence and cross-owner isolation')
}finally{
 await prisma.privacyRequest.deleteMany({where:{userId}});await prisma.deliveryOutbox.deleteMany({where:{orderId}});await prisma.checkoutOrder.deleteMany({where:{id:orderId}});await prisma.userDocument.deleteMany({where:{id:orderId}});await prisma.documentVersion.deleteMany({where:{id:versionId}});await prisma.documentDraft.deleteMany({where:{id:draftId}});await prisma.billingSubscription.deleteMany({where:{ownerId:userId}});await prisma.user.deleteMany({where:{id:{in:[userId,otherId]}}});await prisma.$disconnect()
}
