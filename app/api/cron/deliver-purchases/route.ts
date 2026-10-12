import { trackedOperation } from "@/lib/operations-telemetry"
import { scopedToken } from "@/lib/scoped-token"
import { runDeliveryBatch } from "@/lib/delivery-worker"
export const runtime = "nodejs"
export const maxDuration = 180
async function run(request: Request) {
  if (!scopedToken(request, process.env.CRON_SECRET)) return Response.json({ error: "Unauthorized" }, { status: 401 })
  if (process.env.ENABLE_PURCHASE_DELIVERY !== "true") return Response.json({ error: "Delivery disabled" }, { status: 503 })
  try { return Response.json(await runDeliveryBatch(), { headers: { "Cache-Control": "no-store" } }) }
  catch { return Response.json({ error: "Delivery unavailable" }, { status: 503 }) }
}

export async function GET(request: Request) {
 if (!scopedToken(request,process.env.CRON_SECRET)) return Response.json({error:"Unauthorized"},{status:401})
 if(process.env.ENABLE_PURCHASE_DELIVERY!=="true")return Response.json({status:"disabled"},{status:200})
 try {return await trackedOperation("delivery",()=>run(request))}catch{return Response.json({error:"Operation unavailable"},{status:503})}
}
