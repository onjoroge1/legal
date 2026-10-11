import { prisma } from "./prisma"
export type Health = { paidMissingFulfillment:number; failedPayments:number; delayedDelivery:number; blockedDelivery:number; generationFailures:number; generationRunningTooLong:number; reservedCents:number; dailyBudgetCents:number; staleSources:number; staleWorkers:string[]; privacyPending:number }
export function alertConditions(h:Health){
 const issues:Record<string,number>={}
 if(h.paidMissingFulfillment)issues.PAID_FULFILLMENT_GAP=h.paidMissingFulfillment
 if(h.failedPayments)issues.PAYMENT_RECONCILIATION_FAILED=h.failedPayments
 if(h.delayedDelivery)issues.DELIVERY_QUEUE_DELAY=h.delayedDelivery
 if(h.blockedDelivery)issues.DELIVERY_BLOCKED=h.blockedDelivery
 if(h.generationFailures>=3)issues.GENERATION_FAILURES=h.generationFailures
 if(h.generationRunningTooLong)issues.GENERATION_STALLED=h.generationRunningTooLong
 if(h.reservedCents>=h.dailyBudgetCents*0.8)issues.AI_BUDGET_THRESHOLD=1
 if(h.staleSources)issues.SOURCE_REFRESH_STALE=h.staleSources
 if(h.staleWorkers.length)issues.WORKER_HEARTBEAT_STALE=h.staleWorkers.length
 if(h.privacyPending)issues.PRIVACY_REQUEST_OVERDUE=h.privacyPending
 return issues
}
export async function operationalHealth(){
 const now=new Date(),hour=new Date(Date.now()-3600000),day=new Date(Date.now()-86400000)
 const [gaps,failedPayments,delayedDelivery,blockedDelivery,generationFailures,generationRunningTooLong,budget,staleSources,privacyPending,metrics,migrations]=await Promise.all([
  prisma.$queryRaw<{n:bigint}[]>`SELECT count(*) AS n FROM "CheckoutOrder" o LEFT JOIN "User" u ON u.id=o."ownerId" WHERE o.status='paid' AND (o."ownerId" IS NULL OR u."privacyState"='active') AND ((o.kind='single' AND NOT EXISTS (SELECT 1 FROM "DocumentPurchase" p WHERE p."checkoutId"=o.id AND p.status='paid')) OR NOT EXISTS (SELECT 1 FROM "DeliveryOutbox" d WHERE d."dedupeKey"='fulfillment:'||o.id))`,
  prisma.checkoutOrder.count({where:{lastReconcileError:{not:null}}}),
  prisma.deliveryOutbox.count({where:{status:{in:["pending","retry","processing"]},createdAt:{lt:new Date(Date.now()-15*60000)}}}),
  prisma.deliveryOutbox.count({where:{status:{in:["blocked","failed","bounced","complained","suppressed"]},OR:[{lastError:null},{lastError:{not:"PRIVACY_ERASURE"}}]}}),
  prisma.operationRun.count({where:{kind:"generation",status:"failed",startedAt:{gte:hour}}}),
  prisma.operationRun.count({where:{kind:"generation",status:"running",startedAt:{lt:new Date(Date.now()-5*60000),gte:day}}}),
  prisma.requestBudget.findUnique({where:{key:"ai:global:daily"}}),
  prisma.ingestSchedule.count({where:{enabled:true,OR:[{lastIngestedAt:null},{lastIngestedAt:{lt:new Date(Date.now()-45*86400000)}}]}}),
  prisma.privacyRequest.count({where:{status:{in:["requested","needs_review","local_erased"]},requestedAt:{lt:new Date(Date.now()-7*86400000)}}}),
  prisma.operationRun.groupBy({by:["kind","status"],where:{startedAt:{gte:day}},_count:{_all:true},_avg:{durationMs:true}}),
  prisma.$queryRaw<{migration_name:string}[]>`SELECT migration_name FROM "_prisma_migrations" WHERE finished_at IS NOT NULL AND rolled_back_at IS NULL ORDER BY finished_at DESC LIMIT 1`,
 ])
 const staleWorkers:string[]=[]
 for(const[kind,maxAge]of [["payments",15*60000],["sources",48*3600000],...(process.env.ENABLE_PURCHASE_DELIVERY==="true"?[["delivery",15*60000]]:[])] as [string,number][]){
  const latest=await prisma.operationRun.findFirst({where:{kind,status:"success"},orderBy:{startedAt:"desc"},select:{finishedAt:true}})
  if(!latest?.finishedAt||now.getTime()-latest.finishedAt.getTime()>maxAge)staleWorkers.push(kind)
 }
 const health:Health={paidMissingFulfillment:Number(gaps[0].n),failedPayments,delayedDelivery,blockedDelivery,generationFailures,generationRunningTooLong,reservedCents:budget&&budget.resetAt>now?budget.used:0,dailyBudgetCents:Number(process.env.AI_DAILY_BUDGET_CENTS??1000),staleSources,staleWorkers,privacyPending}
 return {health,issues:alertConditions(health),metrics,observedAt:now.toISOString(),revision:/^[a-f0-9]{40}$/.test(process.env.VERCEL_GIT_COMMIT_SHA??"")?process.env.VERCEL_GIT_COMMIT_SHA:"unavailable",appliedMigration:migrations[0]?.migration_name??"unavailable",alertDispatcherConfigured:!!process.env.OPERATIONS_ALERT_URL,providerBilledSpend:"unavailable"}
}
