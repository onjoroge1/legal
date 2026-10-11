import { prisma } from "@/lib/prisma"
import { scopedToken } from "@/lib/scoped-token"
import { processPaymentEvent, reconcileOrder } from "@/lib/payment-fulfillment"
import { trackedOperation } from "@/lib/operations-telemetry"
export const runtime = "nodejs"
export const maxDuration = 300
export async function GET(request: Request) {
 if(!scopedToken(request,process.env.CRON_SECRET))return Response.json({error:"Unauthorized"},{status:401})
 try{return await trackedOperation("payments",async()=>{
  let recovered=0,failed=0
  const events=await prisma.stripeEvent.findMany({where:{status:{in:["pending","failed"]},nextAttemptAt:{lte:new Date()}},orderBy:{nextAttemptAt:"asc"},take:2})
  for(const event of events){try{await processPaymentEvent(event.id);recovered++}catch{failed++}finally{await prisma.stripeEvent.update({where:{id:event.id},data:{nextAttemptAt:new Date(Date.now()+Math.min(3600000,60000*2**Math.min(event.attempts,6)))}})}}
  const orders=await prisma.checkoutOrder.findMany({where:{status:{in:["pending","paid","refunded","disputed"]}},orderBy:{lastReconciledAt:{sort:"asc",nulls:"first"}},take:2})
  for(const order of orders){let ok=false;try{await reconcileOrder(order.id);recovered++;ok=true}catch{failed++}finally{await prisma.checkoutOrder.update({where:{id:order.id},data:{lastReconciledAt:new Date(),lastReconcileError:ok?null:"RECONCILIATION_FAILED"}})}}
  return Response.json({recovered,failed},{status:failed?503:200,headers:{"Cache-Control":"no-store"}})
 })}catch{return Response.json({error:"Reconciliation unavailable"},{status:503})}
}
