import { scopedToken } from "@/lib/scoped-token"
import { prisma } from "@/lib/prisma"
export async function GET(request: Request) {
 if (!scopedToken(request, process.env.CRON_SECRET)) return Response.json({ error: "Unauthorized" }, { status: 401 })
 try { return Response.json(await prisma.supportTicket.deleteMany({ where: { expiresAt: { lte: new Date() } } }), { headers: { "Cache-Control": "no-store" } }) }
 catch { return Response.json({ error: "SUPPORT_CLEANUP_UNAVAILABLE" }, { status: 503 }) }
}
