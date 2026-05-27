/**
 * GET /api/cron/ingest-facts
 *
 * Vercel-cron-triggered rolling ingest. Picks the N oldest-processed (or
 * never-processed) IngestSchedule entries, runs the source adapter for each,
 * upserts new facts as pending, and updates the row's `lastIngestedAt` and
 * `lastResult` so the cursor rotates through the registry over time.
 *
 * Quota-aware: defaults to 10 entries/run, which at ~2 API calls per
 * OpenStates entry = ~20 calls/run. With a daily cron schedule this stays
 * well under the OpenStates free tier (~100 calls/day) and rotates through
 * the full 250-entry registry in ~25 days.
 *
 * Auto-seeds on first run: if IngestSchedule is empty, it populates from the
 * registry before processing anything. No manual setup required after deploy.
 *
 * Auth: requires `Authorization: Bearer ${CRON_SECRET}` (Vercel cron passes
 * this automatically when CRON_SECRET is set in env). Manual calls from a
 * terminal also work with the same header.
 */

import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { ingestForSchedule } from "@/lib/sources/ingest-pipeline"
import { seedIngestSchedule } from "@/lib/sources/schedule-seed"

export const runtime = "nodejs"
// Cron jobs can hit several entries × multiple API calls — give it plenty of room.
export const maxDuration = 300

/** Max IngestSchedule rows processed per cron invocation. */
const BATCH_SIZE = Number(process.env.CRON_INGEST_BATCH_SIZE || 10)

function isAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET
  if (!secret) {
    // Refuse to run if secret isn't configured — fail closed.
    return false
  }
  const header = request.headers.get("authorization") || ""
  return header === `Bearer ${secret}`
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const startedAt = Date.now()

  // Auto-seed on first run so the cron works zero-touch after deploy.
  const existingCount = await prisma.ingestSchedule.count()
  let seedResult: { inserted: number; updated: number } | null = null
  if (existingCount === 0) {
    seedResult = await seedIngestSchedule()
    console.info(
      `[cron/ingest-facts] auto-seeded registry: ${seedResult.inserted} inserted, ${seedResult.updated} updated`
    )
  }

  // Pull the N oldest-ingested (or never-ingested) enabled entries. NULL
  // lastIngestedAt sorts first under ASC NULLS FIRST in Postgres — exactly
  // what we want for first-time entries.
  const due = await prisma.ingestSchedule.findMany({
    where: { enabled: true },
    orderBy: [{ lastIngestedAt: { sort: "asc", nulls: "first" } }],
    take: BATCH_SIZE,
  })

  const processedSummary: Array<{
    jurisdiction: string
    documentSlug: string
    source: string
    fetched: number
    newlyPending: number
    error?: string
  }> = []

  for (const entry of due) {
    const result = await ingestForSchedule({
      jurisdiction: entry.jurisdiction,
      jurisdictionType: entry.jurisdictionType as "state" | "country" | "city",
      documentSlug: entry.documentSlug,
      source: entry.source,
      sourceConfig: entry.sourceConfig,
    })

    // Update cursor + last result no matter what — even errors advance the
    // cursor so a permanently-broken combo doesn't block the rotation.
    await prisma.ingestSchedule.update({
      where: { id: entry.id },
      data: {
        lastIngestedAt: new Date(),
        lastResult: {
          fetched: result.fetched,
          newlyPending: result.newlyPending,
          alreadyKnown: result.alreadyKnown,
          ...(result.error ? { error: result.error } : {}),
        },
      },
    })

    processedSummary.push({
      jurisdiction: entry.jurisdiction,
      documentSlug: entry.documentSlug,
      source: entry.source,
      fetched: result.fetched,
      newlyPending: result.newlyPending,
      ...(result.error ? { error: result.error } : {}),
    })
  }

  const totalNew = processedSummary.reduce((sum, p) => sum + p.newlyPending, 0)
  const tookMs = Date.now() - startedAt

  console.info(
    `[cron/ingest-facts] processed ${processedSummary.length} entries in ${tookMs}ms, ${totalNew} new pending facts`
  )

  return NextResponse.json({
    ok: true,
    batchSize: BATCH_SIZE,
    processed: processedSummary.length,
    totalNewlyPending: totalNew,
    tookMs,
    seeded: seedResult,
    details: processedSummary,
  })
}
