/**
 * Ingest pipeline orchestrator.
 *
 * Calls the source adapter(s), normalizes each result, computes a content hash
 * (so re-runs don't create duplicate pending rows), and upserts each fact into
 * the `VerifiedFact` table with status="pending".
 *
 * Phase D0: hardcoded to "California × residential lease × OpenStates".
 * Phase D1: dispatch by (jurisdiction, documentSlug) to the appropriate adapter.
 */

import { createHash } from "crypto"
import { prisma } from "@/lib/prisma"
import {
  fetchCaliforniaResidentialLeaseFacts,
  fetchEnactedFactsFromOpenStates,
  type RawFact,
} from "@/lib/sources/openstates"
import { US_STATES } from "@/lib/sources/registry"

export interface IngestResult {
  /** How many facts the source returned before dedup. */
  fetched: number
  /** How many were *new* (not already in DB) and inserted as pending. */
  newlyPending: number
  /** How many were already in DB and skipped (idempotent re-run). */
  alreadyKnown: number
}

/** Stable hash for the unique index. Keeps re-ingests idempotent. */
function contentHash(jurisdiction: string, documentSlug: string, content: string): string {
  return createHash("sha256")
    .update(`${jurisdiction}::${documentSlug}::${content}`)
    .digest("hex")
}

/**
 * Upsert one RawFact into the DB. Returns:
 *   - `"new"` if a pending row was created
 *   - `"existing"` if the same (jurisdiction, documentSlug, contentHash) was already present
 */
async function upsertFact(fact: RawFact): Promise<"new" | "existing"> {
  const hash = contentHash(fact.jurisdiction, fact.documentSlug, fact.content)

  // Check first so we can report new vs existing accurately. Upsert alone
  // wouldn't tell us whether the row was created or merely updated.
  const existing = await prisma.verifiedFact.findUnique({
    where: {
      jurisdiction_documentSlug_contentHash: {
        jurisdiction: fact.jurisdiction,
        documentSlug: fact.documentSlug,
        contentHash: hash,
      },
    },
    select: { id: true, status: true },
  })

  if (existing) return "existing"

  await prisma.verifiedFact.create({
    data: {
      jurisdiction: fact.jurisdiction,
      jurisdictionType: fact.jurisdictionType,
      documentSlug: fact.documentSlug,
      factType: fact.factType,
      content: fact.content,
      citation: fact.citation,
      source: fact.source,
      sourceUrl: fact.sourceUrl,
      contentHash: hash,
      status: "pending",
    },
  })

  return "new"
}

/**
 * Phase D0 entry point — pulls California residential-lease facts from
 * OpenStates and upserts them as pending. Idempotent: re-running just no-ops
 * on facts we already know about.
 */
export async function ingestCaliforniaResidentialLease(): Promise<IngestResult> {
  const rawFacts = await fetchCaliforniaResidentialLeaseFacts()

  let newlyPending = 0
  let alreadyKnown = 0

  for (const fact of rawFacts) {
    try {
      const result = await upsertFact(fact)
      if (result === "new") newlyPending++
      else alreadyKnown++
    } catch (err) {
      // Don't let one bad row kill the batch — log and keep going
      console.warn("[ingest-pipeline] upsert failed for fact:", fact.citation, err)
    }
  }

  return { fetched: rawFacts.length, newlyPending, alreadyKnown }
}

/** Lookup display name from jurisdiction slug — for the fact content string. */
const SLUG_TO_NAME = new Map(US_STATES.map((s) => [s.slug, s.name]))

/**
 * Generic dispatcher used by the cron job. Takes one IngestSchedule row
 * (already loaded from the DB), runs the correct source adapter, and upserts
 * each returned fact as pending. Returns the count summary so the cron can
 * update `lastResult` and `lastIngestedAt` on the row.
 *
 * Throws nothing — wraps the adapter call so a bad source response doesn't
 * abort the entire batch. The error message goes into `lastResult.error`.
 */
export interface ScheduleEntryForIngest {
  jurisdiction: string
  jurisdictionType: "state" | "country" | "city"
  documentSlug: string
  source: string
  sourceConfig: { subjects?: string[]; openstatesCode?: string } | unknown
}

export async function ingestForSchedule(
  entry: ScheduleEntryForIngest
): Promise<IngestResult & { error?: string }> {
  let rawFacts: RawFact[] = []

  try {
    if (entry.source === "openstates") {
      const cfg = entry.sourceConfig as { subjects?: string[]; openstatesCode?: string } | null
      if (!cfg?.subjects || !cfg.openstatesCode) {
        return { fetched: 0, newlyPending: 0, alreadyKnown: 0, error: "missing openstates config" }
      }
      const jurisdictionName = SLUG_TO_NAME.get(entry.jurisdiction) ?? entry.jurisdiction
      rawFacts = await fetchEnactedFactsFromOpenStates({
        jurisdiction: entry.jurisdiction,
        jurisdictionType: entry.jurisdictionType,
        jurisdictionName,
        openstatesCode: cfg.openstatesCode,
        documentSlug: entry.documentSlug,
        subjects: cfg.subjects,
      })
    } else {
      return { fetched: 0, newlyPending: 0, alreadyKnown: 0, error: `unknown source: ${entry.source}` }
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.warn(
      `[ingest-pipeline] source error for ${entry.jurisdiction}/${entry.documentSlug}:`,
      msg
    )
    return { fetched: 0, newlyPending: 0, alreadyKnown: 0, error: msg }
  }

  let newlyPending = 0
  let alreadyKnown = 0

  for (const fact of rawFacts) {
    try {
      const result = await upsertFact(fact)
      if (result === "new") newlyPending++
      else alreadyKnown++
    } catch (err) {
      console.warn("[ingest-pipeline] upsert failed for fact:", fact.citation, err)
    }
  }

  return { fetched: rawFacts.length, newlyPending, alreadyKnown }
}
