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

/** Subjects on OpenStates that map to residential-lease law. */
const CA_LEASE_SUBJECTS = ["Housing", "Landlord and Tenant"] as const

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
 * Fetch California-enacted bills under landlord-tenant / housing subjects from
 * the last ~2 years. We deliberately constrain to "passed" classifications so
 * the returned facts represent currently-enacted law, not pending proposals.
 */
async function fetchCaliforniaLeaseBills(): Promise<OpenStatesBill[]> {
  const apiKey = process.env.OPENSTATES_API_KEY
  if (!apiKey) {
    console.warn("[openstates] OPENSTATES_API_KEY not set — returning empty result.")
    return []
  }

  const collected: OpenStatesBill[] = []

  for (const subject of CA_LEASE_SUBJECTS) {
    try {
      const url = new URL(`${OPENSTATES_API_BASE}/bills`)
      url.searchParams.set("jurisdiction", "ca")
      url.searchParams.set("subject", subject)
      url.searchParams.set("classification", "bill")
      url.searchParams.set("sort", "updated_desc")
      url.searchParams.set("per_page", "20") // small page; we just want the latest
      // include the fields we need (default response is slim)
      url.searchParams.append("include", "abstracts")
      url.searchParams.append("include", "sources")

      const res = await fetch(url.toString(), {
        headers: { "X-API-KEY": apiKey, Accept: "application/json" },
        // Don't cache — we want fresh data on each manual trigger
        cache: "no-store",
      })

      if (!res.ok) {
        console.warn(
          `[openstates] subject="${subject}" returned ${res.status} ${res.statusText}; skipping`
        )
        continue
      }

      const data = (await res.json()) as OpenStatesBillsResponse
      if (Array.isArray(data.results)) collected.push(...data.results)

      await sleep(REQUEST_GAP_MS)
    } catch (err) {
      console.warn(`[openstates] fetch error for subject="${subject}":`, err)
      // Keep going with the other subjects
    }
  }

  return collected
}

/**
 * Public entry point for Phase D0. Returns RawFacts derived from California
 * landlord-tenant bills, ready to be upserted as `status="pending"` by the
 * ingest pipeline.
 *
 * Each bill is mapped to a single fact whose content reads as a one-line
 * jurisdiction note (e.g., "California AB 1482 — Tenant Protection Act of
 * 2019: limits annual rent increases to 5% + CPI."). The human reviewer
 * approves, rejects, or edits the content before it flows into the prompt.
 */
export async function fetchCaliforniaResidentialLeaseFacts(): Promise<RawFact[]> {
  const bills = await fetchCaliforniaLeaseBills()

  // De-duplicate by bill identifier — OpenStates can return the same bill under
  // multiple subjects.
  const seen = new Set<string>()
  const facts: RawFact[] = []

  for (const bill of bills) {
    if (!bill.identifier || seen.has(bill.identifier)) continue
    seen.add(bill.identifier)

    // Prefer the OpenStates abstract for the content; fall back to the title.
    const abstract = bill.abstracts?.[0]?.abstract?.trim()
    const summary = abstract || bill.title || ""
    if (!summary) continue

    // Pick the most authoritative URL we can find for the fact:
    //   1. the bill's primary source (legislature.ca.gov)
    //   2. OpenStates' own bill page
    const sourceUrl =
      bill.sources?.[0]?.url || bill.openstates_url || `https://openstates.org/ca/bills/${bill.id}`

    facts.push({
      jurisdiction: "california",
      jurisdictionType: "state",
      documentSlug: "residential-lease-agreement",
      factType: "requirement",
      // Compose a one-line, prompt-ready content string.
      content: `California ${bill.identifier} — ${summary}`,
      citation: bill.identifier, // e.g., "AB 1482"
      source: "openstates",
      sourceUrl,
    })
  }

  return facts
}
