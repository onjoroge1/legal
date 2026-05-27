/**
 * POST /api/admin/facts/[id]/revert
 *
 * Flips a fact back to status="pending" — useful when an admin wants to
 * un-approve (or un-reject) a fact and have it re-reviewed. Clears the
 * reviewer + timestamp + rejection reason so the row looks fresh in the
 * pending queue.
 *
 * Idempotent: reverting an already-pending fact is a no-op.
 */

import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export const runtime = "nodejs"

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

  const { id } = await params
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 })
  }

  try {
    const updated = await prisma.verifiedFact.update({
      where: { id },
      data: {
        status: "pending",
        reviewedById: null,
        reviewedAt: null,
        rejectionReason: null,
      },
    })
    return NextResponse.json({ fact: updated })
  } catch (err) {
    console.error("[admin/facts/revert] failed:", err)
    return NextResponse.json({ error: "Revert failed" }, { status: 500 })
  }
}
