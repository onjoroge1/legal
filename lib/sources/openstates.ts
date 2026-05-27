/**
 * OpenStates source adapter.
 *
 * OpenStates (https://openstates.org) is a public legislative data project that
 * provides structured information on U.S. state bills via a REST API. They have
 * a free tier (rate-limited) and require an API key.
 *
 * For Phase D0 we use OpenStates as our *only* source. The adapter pulls
 * recently-enacted California bills tagged with subjects relevant to
 * residential leasing (landlord-tenant, housing), normalizes them into a
 * `RawFact` shape, and returns them for the ingest pipeline to upsert into
 * the `VerifiedFact` table as `status="pending"`.
 *
 * Phase D1 will add Cornell LII (scrape) and per-state legislature sites.
 *
 * Errors are swallowed and surfaced as console warnings — the admin trigger
 * button should never crash if OpenStates is rate-limited or down.
 */

const OPENSTATES_API_BASE = "https://v3.openstates.org"

/** Politely pause between API calls to respect OpenStates rate limits. */
const REQUEST_GAP_MS = 250

/** Shape an ingest pipeline understands. */
export interface RawFact {
  jurisdiction: string
  jurisdictionType: "state" | "country" | "city"
  documentSlug: string
  factType: "requirement" | "restriction" | "notice" | "citation"
  content: string
  citation?: string
  source: "openstates" | "cornell-lii" | "manual"
  sourceUrl: string
}

/** One entry in a bill's action history (we use this to decide if it's enacted). */
interface OpenStatesAction {
  description: string
  date: string // YYYY-MM-DD
  classification?: string[] // e.g. ["executive-signature"], ["became-law"]
}

/** Minimal slice of the OpenStates bill payload we care about. */
interface OpenStatesBill {
  id: string
  identifier: string // e.g., "AB 1482"
  title: string
  classification?: string[]
  subject?: string[]
  openstates_url?: string
  sources?: Array<{ url: string; note?: string }>
  abstracts?: Array<{ abstract: string; note?: string }>
  actions?: OpenStatesAction[]
  latest_action_description?: string
  latest_action_date?: string
  // Many other fields we ignore for D0
}

interface OpenStatesBillsResponse {
  results: OpenStatesBill[]
  pagination?: { per_page: number; page: number; max_page: number; total_items: number }
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms))
}

/**
 * OpenStates uses these action classifications to mark a bill as having
 * become law. We treat the presence of ANY of these in the bill's action
 * history as definitive proof the bill was enacted, not just introduced.
 *
 * - "became-law" — the universal "this is now law" signal
 * - "executive-signature" — Governor signed it (final step in most states)
 * - "veto-override-passage" — legislature overrode a veto (also law)
 */
const ENACTED_CLASSIFICATIONS = new Set([
  "became-law",
  "executive-signature",
  "veto-override-passage",
])

/**
 * California-specific belt-and-suspenders. When CA bills become law, the
 * Secretary of State "chapters" them (assigns a Chapter number). OpenStates
 * doesn't always classify this action, so we also pattern-match the
 * description as a fallback. Other state-specific phrases can be added here
 * as we expand jurisdictions in Phase D1.
 */
const ENACTED_DESCRIPTION_PATTERNS: RegExp[] = [
  /\bchaptered\b/i, // "Chaptered by Secretary of State."
  /\bapproved by the governor\b/i,
  /\bsigned into law\b/i,
  /\bsigned by the governor\b/i,
]

/**
 * Decide whether a bill has actually been enacted into law (vs just
 * introduced, in committee, passed one chamber, vetoed, etc.). Returns the
 * enactment date if found, or null if the bill is not yet law.
 */
function getEnactedDate(bill: OpenStatesBill): string | null {
  const actions = bill.actions ?? []
  for (const action of actions) {
    const classes = action.classification ?? []
    if (classes.some((c) => ENACTED_CLASSIFICATIONS.has(c))) return action.date
    if (ENACTED_DESCRIPTION_PATTERNS.some((re) => re.test(action.description))) return action.date
  }
  return null
}

/**
 * Generic OpenStates fetcher. Takes a 2-letter jurisdiction code (e.g. "ca",
 * "ny") and a list of controlled-vocabulary subjects, returns the raw bill
 * payloads. Used by the cron pipeline to ingest any (state × doc-type) combo.
 *
 * Each subject in the list = one API call. Results are concatenated; the
 * caller dedupes by bill identifier.
 *
 * Returns [] (and warns) on missing API key or HTTP errors — never throws,
 * so a failure on one entry doesn't kill the whole batch.
 */
async function fetchEnactedBillsFromOpenStates(opts: {
  openstatesCode: string
  subjects: string[]
}): Promise<OpenStatesBill[]> {
  const apiKey = process.env.OPENSTATES_API_KEY
  if (!apiKey) {
    console.warn("[openstates] OPENSTATES_API_KEY not set — returning empty result.")
    return []
  }

  const collected: OpenStatesBill[] = []

  for (const subject of opts.subjects) {
    try {
      const url = new URL(`${OPENSTATES_API_BASE}/bills`)
      url.searchParams.set("jurisdiction", opts.openstatesCode)
      url.searchParams.set("subject", subject)
      url.searchParams.set("classification", "bill")
      url.searchParams.set("sort", "updated_desc")
      url.searchParams.set("per_page", "20") // small page; we just want the latest
      // include the fields we need (default response is slim).
      // `actions` is required so we can filter to enacted-only bills below.
      url.searchParams.append("include", "abstracts")
      url.searchParams.append("include", "sources")
      url.searchParams.append("include", "actions")

      const res = await fetch(url.toString(), {
        headers: { "X-API-KEY": apiKey, Accept: "application/json" },
        // Don't cache — we want fresh data on each cron run
        cache: "no-store",
      })

      if (!res.ok) {
        console.warn(
          `[openstates] ${opts.openstatesCode}/${subject} returned ${res.status} ${res.statusText}; skipping`
        )
        continue
      }

      const data = (await res.json()) as OpenStatesBillsResponse
      if (Array.isArray(data.results)) collected.push(...data.results)

      await sleep(REQUEST_GAP_MS)
    } catch (err) {
      console.warn(`[openstates] fetch error for ${opts.openstatesCode}/${subject}:`, err)
      // Keep going with the other subjects
    }
  }

  return collected
}

/**
 * Generic public entry point — used by the cron pipeline for any
 * (jurisdiction × document × subjects) combo. Returns RawFacts ready for
 * the ingest pipeline to upsert as pending.
 *
 * Each bill becomes one fact: content is a one-line "Jurisdiction CITATION —
 * <abstract or title>" string. The human reviewer approves/rejects/edits.
 *
 * The bill is hard-filtered to enacted-only — anything still in committee,
 * introduced, vetoed, or pending is dropped here so the reviewer only sees
 * actual law.
 */
export async function fetchEnactedFactsFromOpenStates(opts: {
  jurisdiction: string // our internal slug, e.g. "california"
  jurisdictionType: "state" | "country" | "city"
  jurisdictionName: string // display name, e.g. "California"
  openstatesCode: string // 2-letter OpenStates code, e.g. "ca"
  documentSlug: string
  subjects: string[]
}): Promise<RawFact[]> {
  const bills = await fetchEnactedBillsFromOpenStates({
    openstatesCode: opts.openstatesCode,
    subjects: opts.subjects,
  })

  // De-duplicate by bill identifier — OpenStates can return the same bill under
  // multiple subjects.
  const seen = new Set<string>()
  const facts: RawFact[] = []
  let skippedNotEnacted = 0

  for (const bill of bills) {
    if (!bill.identifier || seen.has(bill.identifier)) continue
    seen.add(bill.identifier)

    // Hard filter: only keep bills that have actually been enacted into law.
    const enactedAt = getEnactedDate(bill)
    if (!enactedAt) {
      skippedNotEnacted++
      continue
    }

    // Prefer the OpenStates abstract for the content; fall back to the title.
    const abstract = bill.abstracts?.[0]?.abstract?.trim()
    const summary = abstract || bill.title || ""
    if (!summary) continue

    // Pick the most authoritative URL we can find for the fact:
    //   1. the bill's primary source (state legislature site)
    //   2. OpenStates' own bill page
    const sourceUrl =
      bill.sources?.[0]?.url ||
      bill.openstates_url ||
      `https://openstates.org/${opts.openstatesCode}/bills/${bill.id}`

    // NB: don't bake enactedAt into `content` — the dedup hash relies on
    // a stable content string. Re-ingests would otherwise produce duplicate
    // pending rows alongside ones already in the DB.
    void enactedAt

    facts.push({
      jurisdiction: opts.jurisdiction,
      jurisdictionType: opts.jurisdictionType,
      documentSlug: opts.documentSlug,
      factType: "requirement",
      content: `${opts.jurisdictionName} ${bill.identifier} — ${summary}`,
      citation: bill.identifier, // e.g., "AB 1482"
      source: "openstates",
      sourceUrl,
    })
  }

  if (skippedNotEnacted > 0) {
    console.info(
      `[openstates] ${opts.openstatesCode}/${opts.documentSlug}: skipped ${skippedNotEnacted} not-yet-enacted bill(s)`
    )
  }

  return facts
}

/**
 * Backwards-compat wrapper for the original Phase D0 manual-trigger button.
 * The admin "Run California Lease Ingest" button still calls this. Phase D1+
 * code should use `fetchEnactedFactsFromOpenStates` directly.
 */
export async function fetchCaliforniaResidentialLeaseFacts(): Promise<RawFact[]> {
  return fetchEnactedFactsFromOpenStates({
    jurisdiction: "california",
    jurisdictionType: "state",
    jurisdictionName: "California",
    openstatesCode: "ca",
    documentSlug: "residential-lease-agreement",
    subjects: ["Housing", "Landlord and Tenant"],
  })
}
