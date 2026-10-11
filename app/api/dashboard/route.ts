import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getUserSubscriptionInfo } from "@/lib/subscription"
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id || !session.user.email) return Response.json({ error: "Unauthorized" }, { status: 401 })
    const where = { userId: session.user.id, deletedAt: null }
    const [totalDocuments, recentDocuments, subscription] = await Promise.all([
      prisma.userDocument.count({ where }),
      prisma.userDocument.findMany({ where, take: 5, orderBy: { createdAt: "desc" }, select: { id: true, title: true, type: true, createdAt: true, status: true, metadata: true } }),
      getUserSubscriptionInfo(session.user.email),
    ])
    return Response.json({ totalDocuments, documentsCreated: totalDocuments, storage: { used: null, total: null }, subscription: { type: subscription?.tier ?? "free", status: subscription?.status ?? "inactive" }, recentDocuments }, { headers: { "Cache-Control": "private, no-store" } })
  } catch { return Response.json({ error: "Dashboard temporarily unavailable" }, { status: 503 }) }
}
