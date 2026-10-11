import { scopedToken } from "@/lib/scoped-token"
import { cleanupAvatars } from "@/lib/avatar-storage"
export async function GET(request: Request) {
 if (!scopedToken(request, process.env.CRON_SECRET)) return Response.json({ error:"Unauthorized" },{ status:401 })
 try { return Response.json({ removed: await cleanupAvatars() },{ headers:{ "Cache-Control":"no-store" } }) }
 catch { return Response.json({ error:"Cleanup unavailable" },{ status:503 }) }
}
