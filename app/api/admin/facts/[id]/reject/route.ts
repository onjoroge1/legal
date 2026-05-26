/**
 * POST /api/admin/facts/[id]/reject
 * Body: { reason: string }
 *
 * Flips a pending verified fact to status="rejected" and records the reviewer's
 * reason. Rejected facts are never injected into prompts but stay in the DB for
 * audit/triage. A future re-ingest that produces the same content hash will
 * also be rejected by the unique-index dedup, so this is effectively a blocklist.
 */

import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export const runtime = "nodejs"

export async function POST(
  request: Request,
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

  let reason = ""
  try {
    const body = await request.json()
    reason = typeof body?.reason === "string" ? body.reason.trim().slice(0, 500) : ""
  } catch {
    // body is optional — empty reason is allowed
  }

  try {
    const updated = await prisma.verifiedFact.update({
      where: { id },
      data: {
        status: "rejected",
        reviewedById: user.id,
        reviewedAt: new Date(),
        rejectionReason: reason || null,
      },
    })
    return NextResponse.json({ fact: updated })
  } catch (err) {
    console.error("[admin/facts/reject] failed:", err)
    return NextResponse.json({ error: "Reject failed" }, { status: 500 })
  }
}
