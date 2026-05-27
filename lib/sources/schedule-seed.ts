/**
 * Seed the IngestSchedule table from the static registry.
 *
 * Idempotent: existing rows are upserted (sourceConfig + enabled are
 * refreshed in case the registry was edited; lastIngestedAt is preserved
 * so we don't reset the cursor on re-seed).
 *
 * Called from:
 *   - The "Seed Schedule" admin button (manual)
 *   - The cron `ingest-facts` route on its first run (auto-seed-on-empty)
 */

import { prisma } from "@/lib/prisma"
import { buildRegistry } from "@/lib/sources/registry"

export async function seedIngestSchedule(): Promise<{ inserted: number; updated: number }> {
  const entries = buildRegistry()
  let inserted = 0
  let updated = 0

  for (const entry of entries) {
    const existing = await prisma.ingestSchedule.findUnique({
      where: {
        jurisdiction_documentSlug_source: {
          jurisdiction: entry.jurisdiction,
          documentSlug: entry.documentSlug,
          source: entry.source,
        },
      },
      select: { id: true },
    })

    if (existing) {
      // Refresh sourceConfig in case the registry changed (e.g. new subjects
      // added). Do NOT touch lastIngestedAt — we want the rolling cursor to
      // keep its position across reseed.
      await prisma.ingestSchedule.update({
        where: { id: existing.id },
        data: {
          jurisdictionType: entry.jurisdictionType,
          sourceConfig: entry.sourceConfig,
          enabled: true,
        },
      })
      updated++
    } else {
      await prisma.ingestSchedule.create({
        data: {
          jurisdiction: entry.jurisdiction,
          jurisdictionType: entry.jurisdictionType,
          documentSlug: entry.documentSlug,
          source: entry.source,
          sourceConfig: entry.sourceConfig,
          enabled: true,
        },
      })
      inserted++
    }
  }

  return { inserted, updated }
}
