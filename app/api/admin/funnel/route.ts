import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { funnelSummary } from "@/lib/funnel"
export async function GET() {
 try {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id || !await prisma.user.findFirst({ where: { id: session.user.id, isAdmin: true, privacyState: "active" }, select: { id: true } })) return Response.json({ error: "NOT_FOUND" }, { status: 404 })
  return Response.json(await funnelSummary(), { headers: { "Cache-Control": "private, no-store" } })
 } catch { return Response.json({ error: "FUNNEL_UNAVAILABLE" }, { status: 503 }) }
}
