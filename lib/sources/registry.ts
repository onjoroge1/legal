/**
 * Source-to-doc registry for the verified-facts ingest pipeline.
 *
 * This is the input to the IngestSchedule seed: every (jurisdiction × documentSlug)
 * combo in here gets one schedule row, and the cron job rotates through them
 * oldest-first under a daily quota.
 *
 * D1 scope: top 5 high-traffic document types × all 50 U.S. states = 250 entries.
 * A full cycle at 10 calls/day takes ~25 days; safely under the OpenStates free tier.
 *
 * To expand later (D2+): add more docs to `TOP_DOC_SUBJECTS`, add international
 * countries, or override `subjects` per (state, doc) if a particular state uses
 * non-standard taxonomy.
 */

/**
 * The 5 document slugs we'll keep verified-data-fresh, mapped to the OpenStates
 * controlled-vocabulary subjects that best capture each doc's statutory surface
 * area. Slugs match the catalog (lib/document-catalog.ts).
 *
 * NB: NDA and operating-agreement are mostly common-law / private-contract
 * territory with little statutory law per state. Their ingest will often
 * return zero new facts, and that's fine — the cron job just no-ops them and
 * moves on. Including them keeps the registry symmetric and lets us catch
 * the rare statutory amendment (e.g. trade-secret act updates).
 */
export const TOP_DOC_SUBJECTS: Record<string, string[]> = {
  "residential-lease-agreement": ["Housing", "Landlord and Tenant"],
  "non-disclosure-agreement": ["Commerce", "Trade Secrets"],
  "employment-contract": ["Labor and Employment"],
  "independent-contractor-agreement": ["Labor and Employment"],
  "operating-agreement": ["Corporations", "Business and Commerce"],
}

/**
 * All 50 US states as { jurisdictionSlug, openstatesCode } pairs.
 * - jurisdictionSlug: lowercase full name, matches our VerifiedFact.jurisdiction
 *   and the slugs used by lib/state-pages.ts.
 * - openstatesCode: the two-letter code OpenStates expects in `?jurisdiction=`.
 */
export const US_STATES: Array<{ slug: string; code: string; name: string }> = [
  { slug: "alabama", code: "al", name: "Alabama" },
  { slug: "alaska", code: "ak", name: "Alaska" },
  { slug: "arizona", code: "az", name: "Arizona" },
  { slug: "arkansas", code: "ar", name: "Arkansas" },
  { slug: "california", code: "ca", name: "California" },
  { slug: "colorado", code: "co", name: "Colorado" },
  { slug: "connecticut", code: "ct", name: "Connecticut" },
  { slug: "delaware", code: "de", name: "Delaware" },
  { slug: "florida", code: "fl", name: "Florida" },
  { slug: "georgia", code: "ga", name: "Georgia" },
  { slug: "hawaii", code: "hi", name: "Hawaii" },
  { slug: "idaho", code: "id", name: "Idaho" },
  { slug: "illinois", code: "il", name: "Illinois" },
  { slug: "indiana", code: "in", name: "Indiana" },
  { slug: "iowa", code: "ia", name: "Iowa" },
  { slug: "kansas", code: "ks", name: "Kansas" },
  { slug: "kentucky", code: "ky", name: "Kentucky" },
  { slug: "louisiana", code: "la", name: "Louisiana" },
  { slug: "maine", code: "me", name: "Maine" },
  { slug: "maryland", code: "md", name: "Maryland" },
  { slug: "massachusetts", code: "ma", name: "Massachusetts" },
  { slug: "michigan", code: "mi", name: "Michigan" },
  { slug: "minnesota", code: "mn", name: "Minnesota" },
  { slug: "mississippi", code: "ms", name: "Mississippi" },
  { slug: "missouri", code: "mo", name: "Missouri" },
  { slug: "montana", code: "mt", name: "Montana" },
  { slug: "nebraska", code: "ne", name: "Nebraska" },
  { slug: "nevada", code: "nv", name: "Nevada" },
  { slug: "new-hampshire", code: "nh", name: "New Hampshire" },
  { slug: "new-jersey", code: "nj", name: "New Jersey" },
  { slug: "new-mexico", code: "nm", name: "New Mexico" },
  { slug: "new-york", code: "ny", name: "New York" },
  { slug: "north-carolina", code: "nc", name: "North Carolina" },
  { slug: "north-dakota", code: "nd", name: "North Dakota" },
  { slug: "ohio", code: "oh", name: "Ohio" },
  { slug: "oklahoma", code: "ok", name: "Oklahoma" },
  { slug: "oregon", code: "or", name: "Oregon" },
  { slug: "pennsylvania", code: "pa", name: "Pennsylvania" },
  { slug: "rhode-island", code: "ri", name: "Rhode Island" },
  { slug: "south-carolina", code: "sc", name: "South Carolina" },
  { slug: "south-dakota", code: "sd", name: "South Dakota" },
  { slug: "tennessee", code: "tn", name: "Tennessee" },
  { slug: "texas", code: "tx", name: "Texas" },
  { slug: "utah", code: "ut", name: "Utah" },
  { slug: "vermont", code: "vt", name: "Vermont" },
  { slug: "virginia", code: "va", name: "Virginia" },
  { slug: "washington", code: "wa", name: "Washington" },
  { slug: "west-virginia", code: "wv", name: "West Virginia" },
  { slug: "wisconsin", code: "wi", name: "Wisconsin" },
  { slug: "wyoming", code: "wy", name: "Wyoming" },
]

/** Lookup OpenStates code from our internal jurisdiction slug. */
const SLUG_TO_OPENSTATES_CODE = new Map(US_STATES.map((s) => [s.slug, s.code]))
export function jurisdictionToOpenStatesCode(slug: string): string | null {
  return SLUG_TO_OPENSTATES_CODE.get(slug) ?? null
}

/**
 * Build the full registry: cartesian product of US_STATES × TOP_DOC_SUBJECTS.
 * Returned as the shape the ingest pipeline expects when seeding the
 * IngestSchedule table.
 */
export interface RegistryEntry {
  jurisdiction: string
  jurisdictionType: "state"
  documentSlug: string
  source: "openstates"
  sourceConfig: { subjects: string[]; openstatesCode: string }
}

export function buildRegistry(): RegistryEntry[] {
  const entries: RegistryEntry[] = []
  for (const state of US_STATES) {
    for (const [documentSlug, subjects] of Object.entries(TOP_DOC_SUBJECTS)) {
      entries.push({
        jurisdiction: state.slug,
        jurisdictionType: "state",
        documentSlug,
        source: "openstates",
        sourceConfig: { subjects, openstatesCode: state.code },
      })
    }
  }
  return entries
}
