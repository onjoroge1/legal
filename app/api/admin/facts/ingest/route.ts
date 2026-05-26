/**
 * POST /api/admin/facts/ingest
 *
 * Admin-gated manual trigger for the verified-facts ingest pipeline.
 * Phase D0 hardcodes the one supported (jurisdiction × documentSlug × source)
 * combo — California × residential-lease-agreement × OpenStates. Phase D1
 * will accept a body like `{ jurisdiction, documentSlug }` and dispatch.
 */

import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { ingestCaliforniaResidentialLease } from "@/lib/sources/ingest-pipeline"

export const runtime = "nodejs"
// Allow up to 60s — OpenStates pagination + multiple subjects can take a moment.
export const maxDuration = 60

export async function POST() {
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

  try {
    const result = await ingestCaliforniaResidentialLease()
    return NextResponse.json(result)
  } catch (err) {
    console.error("[admin/facts/ingest] failed:", err)
    return NextResponse.json({ error: "Ingest failed" }, { status: 500 })
  }
}
