import { reconcilePaidFunnel } from "@/lib/funnel"
import { scopedToken } from "@/lib/scoped-token"
import { trackedOperation } from "@/lib/operations-telemetry"
import { monitorOperations, dispatchOperationsAlert } from "@/lib/operations-alerts"
export async function GET(request:Request){
 if(!scopedToken(request,process.env.CRON_SECRET))return Response.json({error:"Unauthorized"},{status:401})
 try{return await trackedOperation("monitor",async()=>{await reconcilePaidFunnel();const snapshot=await monitorOperations();const delivery=await dispatchOperationsAlert();return Response.json({issues:snapshot.issues,alertDispatch:delivery},{status:delivery.failed?503:200,headers:{"Cache-Control":"no-store"}})})}catch{return Response.json({error:"Monitoring unavailable"},{status:503})}
}
