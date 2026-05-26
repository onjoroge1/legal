/**
 * GET /api/admin/facts?status=pending|approved|rejected
 *
 * Admin-gated list of verified-fact rows for the review queue UI.
 * Defaults to status=pending. Returns the freshest 200 rows.
 */

import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export const runtime = "nodejs"

const ALLOWED_STATUSES = new Set(["pending", "approved", "rejected", "superseded"])

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { isAdmin: true },
  })
  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status") || "pending"
  if (!ALLOWED_STATUSES.has(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 })
  }

  const facts = await prisma.verifiedFact.findMany({
    where: { status },
    orderBy: { createdAt: "desc" },
    take: 200,
    include: {
      reviewer: { select: { email: true } },
    },
  })

  // Also return counts so the tabs can show "Pending (N) | Approved (M) | ..."
  // Cheap single query because we have @@index([status]).
  const counts = await prisma.verifiedFact.groupBy({
    by: ["status"],
    _count: { status: true },
  })
  const countsByStatus = Object.fromEntries(
    counts.map((c) => [c.status, c._count.status])
  )

  return NextResponse.json({ facts, counts: countsByStatus })
}
