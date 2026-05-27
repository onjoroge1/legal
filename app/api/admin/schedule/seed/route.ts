/**
 * POST /api/admin/schedule/seed
 *
 * Admin-gated trigger to populate the IngestSchedule table from the static
 * registry (lib/sources/registry.ts). Idempotent: existing rows are updated,
 * not duplicated; lastIngestedAt cursors are preserved on re-seed.
 *
 * Also fires automatically on the first cron run if the table is empty —
 * this manual button is primarily for ops convenience (seed immediately
 * after deploy without waiting for the cron schedule).
 */

import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { seedIngestSchedule } from "@/lib/sources/schedule-seed"

export const runtime = "nodejs"
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
    const result = await seedIngestSchedule()
    return NextResponse.json(result)
  } catch (err) {
    console.error("[admin/schedule/seed] failed:", err)
    return NextResponse.json({ error: "Seed failed" }, { status: 500 })
  }
}
