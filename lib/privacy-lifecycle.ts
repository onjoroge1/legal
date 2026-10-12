import { randomUUID } from "crypto"
import { Prisma } from "@prisma/client"
import type { Prisma as Types } from "@prisma/client"
import { prisma } from "./prisma"
import { RequestError } from "./request-guard"
type Tx = Types.TransactionClient
export function retentionPolicy() {
 const version = process.env.PRIVACY_POLICY_VERSION
 const days = Number(process.env.PAYMENT_RECORD_RETENTION_DAYS)
 if (process.env.ENABLE_PRIVACY_ERASURE !== "true" || !version || !/^[a-zA-Z0-9._-]{1,80}$/.test(version) || !Number.isInteger(days) || days < 1 || days > 36500) throw new RequestError(503,"PRIVACY_POLICY_APPROVAL_REQUIRED")
 return { version, days }
}
async function blockers(tx: Tx, userId: string) {
 const user = await tx.user.findUniqueOrThrow({ where:{ id:userId } })
 if (await tx.billingSubscription.count({ where:{ ownerId:userId, status:{ notIn:["canceled","incomplete_expired"] } } }) || ["active","trialing","past_due"].includes(user.subscriptionStatus)) throw new RequestError(409,"RESOLVE_SUBSCRIPTION_BEFORE_DELETION")
 if (await tx.checkoutOrder.count({ where:{ ownerId:userId, status:{ in:["pending","disputed"] } } })) throw new RequestError(409,"RESOLVE_PAYMENT_BEFORE_DELETION")
 const legacy = await tx.$queryRaw<{ n: bigint }[]>`SELECT count(*) AS n FROM "Document" WHERE "userId"=${userId}`
 const signed = await tx.$queryRaw<{ n: bigint }[]>`SELECT count(*) AS n FROM "DocumentSignature" WHERE "userId"=${userId}`
 const signedMetadata = await tx.$queryRaw<{ n: bigint }[]>`SELECT count(*) AS n FROM "UserDocument" WHERE "userId"=${userId} AND (metadata ? 'signingRequests' OR metadata ? 'signatures')`
 const shared = await tx.$queryRaw<{ n: bigint }[]>`SELECT count(*) AS n FROM "DocumentCollaborator" WHERE "userId"=${userId}`
 if (Number(legacy[0].n)+Number(signed[0].n)+Number(shared[0].n)+Number(signedMetadata[0].n) || await tx.team.count({ where:{ ownerId:userId } }) || await tx.teamMember.count({ where:{ userId } }) || await tx.userDocument.count({where:{userId,status:{in:["signed","pending_signature"]}}}) || await tx.blogPost.count({where:{authorId:userId}}) || await tx.verifiedFact.count({where:{reviewedById:userId}})) throw new RequestError(409,"SHARED_OR_RESTRICTED_RECORD_REVIEW_REQUIRED")
 return user
}
export async function requestErasure(userId: string) {
 return prisma.$transaction(async tx => {
  await tx.$executeRaw`SELECT pg_advisory_xact_lock(710090)`
  const existing = await tx.privacyRequest.findUnique({ where:{userId} }); if (existing) return existing
  await blockers(tx,userId)
  const row = await tx.privacyRequest.create({data:{id:randomUUID(),userId,eligibleAt:new Date(Date.now()+86400000)}})
  await tx.user.update({where:{id:userId},data:{privacyState:"pending",jwtVersion:{increment:1},activeSessions:null,resetToken:null,resetTokenExpiry:null,verificationToken:null,verificationTokenExpiry:null}})
  await tx.session.deleteMany({where:{userId}})
  return row
 })
}
export async function eraseNextCustomer() {
 const policy = retentionPolicy()
 return prisma.$transaction(async tx => {
  await tx.$executeRaw`SELECT pg_advisory_xact_lock(710090)`
  await tx.$executeRaw`SELECT pg_advisory_xact_lock(710110)`
  const row = await tx.privacyRequest.findFirst({where:{status:"requested",eligibleAt:{lte:new Date()}},orderBy:{requestedAt:"asc"}})
  if (!row) return { processed:0 }
  const userId=row.userId
  let user
  try { user=await blockers(tx,userId) } catch(error) {
   if (!(error instanceof RequestError)) throw error
   await tx.privacyRequest.update({where:{id:row.id},data:{status:"needs_review",lastError:error.code}})
   return {processed:0,blocked:1}
  }
  const orders=await tx.checkoutOrder.findMany({where:{ownerId:userId},select:{id:true}});const orderIds=orders.map(o=>o.id)
  const versions=await tx.documentVersion.findMany({where:{OR:[{claimedOwnerId:userId},{claimedOwnerId:null,draft:{ownerId:userId}}]},select:{id:true}});const ids=versions.map(v=>v.id)
  await tx.documentReview.deleteMany({where:{versionId:{in:ids}}})
  // Keep opaque identities and purchase hashes for restricted payment reconciliation; erase content.
  await tx.documentVersion.updateMany({where:{id:{in:ids}},data:{title:"Deleted document",content:"",formData:{},review:{},recoveryHash:null,recoveryExpiresAt:null}})
  await tx.documentDraft.updateMany({where:{ownerId:userId},data:{formData:{},guestHash:null,guestExpiresAt:null}})
  await tx.documentParty.deleteMany({where:{userDocument:{userId}}})
  await tx.userDocument.updateMany({where:{userId},data:{title:"Deleted document",type:"deleted",description:null,content:"",metadata:Prisma.DbNull,deletedAt:new Date(),status:"deleted"}})
  await tx.deliveryOutbox.updateMany({where:{orderId:{in:orderIds}},data:{status:"suppressed",payloadCipher:null,recipientHash:null,leaseId:null,leaseUntil:null,lastError:"PRIVACY_ERASURE"}})
  await tx.guestPurchaseClaim.deleteMany({where:{orderId:{in:orderIds}}})
  await tx.checkoutOrder.updateMany({where:{ownerId:userId},data:{guestEmail:null}})
  await tx.storedAvatar.updateMany({where:{userId},data:{status:"retired"}})
  await tx.notification.deleteMany({where:{userId}})
  await tx.teamInvitation.deleteMany({where:{OR:[{invitedBy:userId},{email:user.email}]}})
  await tx.account.deleteMany({where:{userId}});await tx.session.deleteMany({where:{userId}})
  await tx.verificationToken.deleteMany({where:{identifier:user.email}})
  await tx.user.update({where:{id:userId},data:{privacyState:"erased",isAdmin:false,name:"Deleted account",email:`deleted-${randomUUID()}@example.invalid`,password:"!disabled",image:null,emailVerified:null,firstName:null,lastName:null,company:null,businessName:null,businessType:null,businessId:null,businessAddress:null,businessCity:null,businessState:null,businessZip:null,emailNotifications:null,inAppNotifications:null,twoFactorSecret:null,twoFactorEnabled:false,activeSessions:null,resetToken:null,resetTokenExpiry:null,verificationToken:null,verificationTokenExpiry:null,jwtVersion:{increment:1}}})
  await tx.privacyRequest.update({where:{id:row.id},data:{status:"local_erased",erasedAt:new Date(),policyVersion:policy.version,evidenceRetentionUntil:new Date(Date.now()+policy.days*86400000),lastError:null}})
  return {processed:1}
 },{timeout:20000})
}
