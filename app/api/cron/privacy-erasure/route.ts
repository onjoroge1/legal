import { scopedToken } from "@/lib/scoped-token"
import { eraseNextCustomer } from "@/lib/privacy-lifecycle"
import { requestError } from "@/lib/request-guard"
export async function GET(request: Request) {
 if(!scopedToken(request,process.env.CRON_SECRET)) return Response.json({error:"Unauthorized"},{status:401})
 try{return Response.json(await eraseNextCustomer(),{headers:{"Cache-Control":"no-store"}})}catch(e){return requestError(e)??Response.json({error:"Privacy erasure unavailable"},{status:503})}
}
