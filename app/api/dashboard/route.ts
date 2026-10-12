import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getUserSubscriptionInfo } from "@/lib/subscription"
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id || !session.user.email) return Response.json({ error: "Unauthorized" }, { status: 401 })
    const where = { OR: [{ claimedOwnerId: session.user.id }, { claimedOwnerId: null, draft: { ownerId: session.user.id } }] }
    const [totalDocuments, recentDocuments, subscription] = await Promise.all([
      prisma.documentVersion.count({ where }),
      prisma.documentVersion.findMany({ where, take: 5, orderBy: { createdAt: "desc" }, select: { id: true, title: true, createdAt: true } }),
      getUserSubscriptionInfo(session.user.email),
    ])
    return Response.json({ totalDocuments, documentsCreated: totalDocuments, storage: { used: null, total: null }, subscription: { type: subscription?.tier ?? "free", status: subscription?.status ?? "inactive" }, recentDocuments: recentDocuments.map(d => ({ ...d, type: "Saved version", status: "draft" })) }, { headers: { "Cache-Control": "private, no-store" } })
  } catch { return Response.json({ error: "Dashboard temporarily unavailable" }, { status: 503 }) }
}
