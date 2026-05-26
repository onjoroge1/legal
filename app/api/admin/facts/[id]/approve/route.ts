/**
 * POST /api/admin/facts/[id]/approve
 *
 * Flips a pending verified fact to status="approved", records reviewer + timestamp.
 * Approved facts immediately become eligible for injection into the AI prompt
 * via lib/verified-facts.ts (see app/api/documents/[category]/[slug]/generate/route.ts).
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
    select: { id: true, isAdmin: true },
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
        status: "approved",
        reviewedById: user.id,
        reviewedAt: new Date(),
        rejectionReason: null,
      },
    })
    return NextResponse.json({ fact: updated })
  } catch (err) {
    console.error("[admin/facts/approve] failed:", err)
    return NextResponse.json({ error: "Approve failed" }, { status: 500 })
  }
}
