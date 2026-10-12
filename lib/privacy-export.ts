import { prisma } from "./prisma"
import { RequestError } from "./request-guard"
export async function exportCustomer(userId: string) {
 const data = await prisma.$transaction(async tx => {
  const user = await tx.user.findUniqueOrThrow({where:{id:userId},select:{id:true,name:true,email:true,createdAt:true,firstName:true,lastName:true,company:true,businessName:true,businessType:true,businessId:true,businessAddress:true,businessCity:true,businessState:true,businessZip:true,defaultDocumentFormat:true,autoSaveEnabled:true,defaultLanguage:true,timezone:true,emailNotifications:true,inAppNotifications:true}})
  const versions=await tx.documentVersion.findMany({where:{OR:[{claimedOwnerId:userId},{claimedOwnerId:null,draft:{ownerId:userId}}]},take:5001,select:{id:true,draftId:true,title:true,content:true,contentHash:true,formData:true,review:true,createdAt:true}})
  const drafts=await tx.documentDraft.findMany({where:{ownerId:userId},take:5001,select:{id:true,category:true,sourceSlug:true,intent:true,jurisdiction:true,formData:true,createdAt:true}})
  const documents=await tx.userDocument.findMany({where:{userId},take:5001,select:{id:true,title:true,type:true,content:true,status:true,createdAt:true,updatedAt:true,deletedAt:true,parties:{select:{name:true,type:true,address:true,email:true}}}})
  const payments=await tx.checkoutOrder.findMany({where:{ownerId:userId},take:5001,select:{id:true,versionId:true,kind:true,amount:true,currency:true,status:true,createdAt:true}})
  const subscriptions=await tx.billingSubscription.findMany({where:{ownerId:userId},take:5001,select:{id:true,status:true,paidThrough:true,trialEndsAt:true,cancelAtPeriodEnd:true}})
  const notifications=await tx.notification.findMany({where:{userId},take:5001,select:{id:true,type:true,title:true,message:true,createdAt:true,read:true}})
  const memberships=await tx.teamMember.findMany({where:{userId},take:5001,select:{teamId:true,role:true,joinedAt:true}})
  const support=await tx.supportTicket.findMany({where:{userId},take:5001,select:{id:true,topic:true,message:true,response:true,status:true,createdAt:true,expiresAt:true}})
  const legacy=await tx.$queryRaw`SELECT id,title,content,"createdAt" FROM "Document" WHERE "userId"=${userId} LIMIT 5001`
  const data={support,profile:user,drafts,versions,documents,payments,subscriptions,notifications,memberships,legacy,avatarDownload:"/api/settings/avatar (use your profile image URL while signed in)",exceptions:"Provider-held records, backups, and shared/signature evidence require a scoped support review; authentication credentials and other users' account data are excluded."}
  for(const value of Object.values(data)) if(Array.isArray(value)&&value.length>5000) throw new RequestError(413,"EXPORT_REQUIRES_SUPPORT")
  return data
 },{isolationLevel:"RepeatableRead",timeout:20000})
 const json=JSON.stringify(data)
 if(Buffer.byteLength(json)>50*1024*1024) throw new RequestError(413,"EXPORT_REQUIRES_SUPPORT")
 return json
}
