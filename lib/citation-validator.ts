/**
 * Citation validator — defends against AI hallucinations of statutes, code
 * sections, dollar amounts, dates, and act names in generated legal documents.
 *
 * How it works:
 *   1. Extract all citation-like patterns from the AI's output.
 *   2. Extract the SAME patterns from the curated `stateContext` string that
 *      was injected into the prompt (built from `lib/state-pages.ts`,
 *      `lib/international-pages.ts`, etc.).
 *   3. Any citation in the output that is NOT also present in the curated set
 *      is treated as a hallucination and replaced with a bracketed
 *      `[NEEDS_LEGAL_REVIEW: <original>]` marker, which the document preview
 *      renders highlighted in amber (see `renderWithBlanks` in
 *      `components/documents/document-preview.tsx`).
 *
 * The function is pure (no I/O, no deps) so it's cheap to call and easy to
 * unit-test. Use from API routes after every `generateText` call.
 */

/**
 * Citation patterns we attempt to recognise. Each entry is a single regex with
 * the global flag — we collect all matches across the text, then check each
 * against the verified set extracted from the prompt context.
 *
 * NB: We deliberately do NOT match bare section numbers like "1.1" or "2.3.4"
 * — those are document structure (numbered sections/subsections), not legal
 * citations. Anchors below all require a strong legal-context lead-in.
 */
const CITATION_PATTERNS: RegExp[] = [
  // 1) Anything anchored on the section sign §, with surrounding context.
  //    Captures "Cal. Civil Code § 1954.603", "§ 1234.5(a)", "Section 1234",
  //    "Article III § 2", etc. The capture extends backward up to ~40 chars
  //    of legal-naming context (Capitalized words + "Code"/"Act"/etc.) so we
  //    catch the full citation, not just the bare § number.
  /(?:(?:[A-Z][A-Za-z.]*\s+){0,5}(?:Code|Act|Statute|Regulation|Title|Article)\s+)?§\s*\d+[\w.\-(),]*?(?=[\s.,;:)]|$)/g,

  // 2) "U.S.C." (United States Code) citations: "29 U.S.C. § 207".
  /\b\d+\s+U\.?S\.?C\.?\s+§?\s*\d+[\w.\-(),]*/g,

  // 3) "C.F.R." (Code of Federal Regulations): "29 C.F.R. § 1604.11".
  /\b\d+\s+C\.?F\.?R\.?\s+§?\s*\d+[\w.\-(),]*/g,

  // 4) Named acts with years: "Employment Rights Act 1996",
  //    "Fair Labor Standards Act of 1938", "Equality Act 2010".
  /\b(?:[A-Z][A-Za-z'-]+\s+){1,6}(?:Act|Ordinance|Regulation|Statute|Code|Law)(?:\s+of)?\s+(?:19|20)\d{2}\b/g,

  // 5) Bill numbers used as colloquial citations: "AB 1482", "SB 9", "HB 21".
  /\b(?:AB|SB|HB|HR|HJR|SJR|Prop\.?)\s?\d+\b/g,

  // 6) Legal dollar amounts with units. Matches "$11.44/hour",
  //    "$1,000 per month", "$15.00/year". Bare dollar amounts (e.g. a price
  //    in body text) are NOT flagged.
  /\$\s?\d[\d,]*(?:\.\d+)?\s*(?:\/(?:hour|year|month|week|day)|per\s+(?:hour|year|month|week|day|annum))\b/gi,

  // 7) Percentage caps in legal contexts: "5% + CPI", "3% rent cap".
  //    Restricted to contexts that include "cap", "rate", "limit", "rent",
  //    "interest", or "tax" within 30 chars on either side. (Implemented
  //    via a second pass below; this regex just finds candidates.)
  /\b\d+(?:\.\d+)?\s*%(?:\s+\+\s+CPI)?/g,
]

/** Patterns whose surrounding context must include a legal anchor to count. */
const CONTEXTUAL_PATTERN_INDICES = new Set<number>([6]) // percentages

const CONTEXT_ANCHORS = [
  "cap",
  "rate",
  "limit",
  "rent",
  "interest",
  "tax",
  "minimum",
  "maximum",
  "ceiling",
  "increase",
]

/** Normalize a citation for comparison: collapse whitespace + lowercase. */
function normalize(s: string): string {
  return s.replace(/\s+/g, " ").trim().toLowerCase()
}

/**
 * Strip the punctuation that often gets glued to the end of a regex match
 * ("§ 1234." → "§ 1234") so we compare apples to apples with the verified
 * set, which doesn't include trailing punctuation.
 */
function trimEdges(s: string): string {
  return s.replace(/^[\s,;:.()]+|[\s,;:.()]+$/g, "")
}

/**
 * Run all citation patterns against `text` and return the unique matches.
 * For contextual patterns (e.g. percentages) we additionally require at least
 * one CONTEXT_ANCHORS word to appear within ±30 chars of the match.
 */
function extractCitations(text: string): string[] {
  const found = new Set<string>()
  CITATION_PATTERNS.forEach((re, idx) => {
    const isContextual = CONTEXTUAL_PATTERN_INDICES.has(idx)
    for (const match of text.matchAll(re)) {
      const raw = match[0]
      if (!raw) continue
      if (isContextual) {
        const start = Math.max(0, (match.index ?? 0) - 30)
        const end = Math.min(text.length, (match.index ?? 0) + raw.length + 30)
        const window = text.slice(start, end).toLowerCase()
        if (!CONTEXT_ANCHORS.some((a) => window.includes(a))) continue
      }
      const cleaned = trimEdges(raw)
      if (cleaned.length >= 2) found.add(cleaned)
    }
  })
  return [...found]
}

/**
 * Per-citation attribution returned to the frontend so the Draft Preview can
 * render a green underline + tooltip ("✓ Verified against OpenStates on Nov
 * 25, 2026") on each citation that came from an admin-approved external
 * source. Citations that only match the curated state-pages.ts data are also
 * "verified" in the sense that they didn't get flagged — but they have no
 * external source URL, so the tooltip is simpler ("✓ Matched our curated
 * state requirements").
 */
export interface VerifiedCitationMeta {
  /** The verbatim citation string that appeared in the AI output. */
  citation: string
  /** "openstates" | "cornell-lii" | "manual" | "curated" */
  source: string
  /** Canonical URL on the source site (omitted for curated-only matches). */
  sourceUrl?: string
  /** ISO timestamp when this fact was admin-approved (omitted for curated). */
  reviewedAt?: string
}

/**
 * Minimal shape of an externally-verified fact, as returned by
 * `buildStateContext` in the generate route. Imported there from this module
 * to keep the types consistent.
 */
export interface VerifiedFactInput {
  citation: string | null
  source: string
  sourceUrl: string
  reviewedAt: string | null
  content: string
}

export interface CitationValidationResult {
  /** Output text with every unverified citation swapped for a review marker. */
  cleaned: string
  /** Count of citations that appeared in either the curated or verified set. */
  verifiedCount: number
  /** Count of citations that did NOT appear, and were therefore replaced. */
  flaggedCount: number
  /** Original-citation strings that got flagged — useful for triage logging. */
  flagged: string[]
  /** Per-citation attribution for the Draft Preview tooltip (Phase D0). */
  verifiedCitations: VerifiedCitationMeta[]
}

/**
 * Validate every citation in `text` against the curated `stateContext` data
 * AND any admin-approved external `verifiedFacts`.
 *
 * Match priority:
 *   1. If a citation in the output matches an externally-verified fact
 *      (by `citation` string or by appearing in the `content` substring),
 *      attribute it to that source with the source URL + verified-at date.
 *   2. Else if it appears in the curated `stateContext` haystack, attribute
 *      it as "curated".
 *   3. Else, replace with `[NEEDS_LEGAL_REVIEW: <original>]`.
 */
export function validateAndCleanCitations(
  text: string,
  stateContext: string,
  verifiedFacts: VerifiedFactInput[] = []
): CitationValidationResult {
  if (!text) {
    return {
      cleaned: "",
      verifiedCount: 0,
      flaggedCount: 0,
      flagged: [],
      verifiedCitations: [],
    }
  }

  const curatedHaystack = normalize(stateContext || "")
  const outputCitations = extractCitations(text)

  // Pre-normalize verified facts for substring matching against output citations.
  const factEntries = verifiedFacts.map((f) => ({
    citation: f.citation,
    citationNorm: f.citation ? normalize(f.citation) : null,
    contentNorm: normalize(f.content),
    source: f.source,
    sourceUrl: f.sourceUrl,
    reviewedAt: f.reviewedAt,
  }))

  const verifiedCitations: VerifiedCitationMeta[] = []
  const flagged: string[] = []
  const verifiedSet = new Set<string>()

  for (const citation of outputCitations) {
    const norm = normalize(citation)
    if (norm.length < 4) {
      // Skip too-short matches to avoid false attributions
      continue
    }

    // (1) External-source match wins — most authoritative attribution.
    const factMatch = factEntries.find(
      (f) =>
        (f.citationNorm && f.citationNorm === norm) ||
        (f.citationNorm && norm.includes(f.citationNorm)) ||
        f.contentNorm.includes(norm)
    )

    if (factMatch) {
      verifiedSet.add(citation)
      verifiedCitations.push({
        citation,
        source: factMatch.source,
        sourceUrl: factMatch.sourceUrl,
        reviewedAt: factMatch.reviewedAt ?? undefined,
      })
      continue
    }

    // (2) Curated match — appears in the hand-curated state-pages.ts data.
    if (curatedHaystack.includes(norm)) {
      verifiedSet.add(citation)
      verifiedCitations.push({ citation, source: "curated" })
      continue
    }

    // (3) Otherwise it's a hallucination.
    flagged.push(citation)
  }

  // Replace each flagged citation in the output with the review marker.
  // Sort by length descending so longer citations are replaced before any
  // shorter ones that might be substrings of them (avoids double-wrapping).
  let cleaned = text
  for (const cite of [...flagged].sort((a, b) => b.length - a.length)) {
    // Escape regex special chars in the citation before building the matcher.
    const escaped = cite.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    const replacer = new RegExp(escaped, "g")
    cleaned = cleaned.replace(replacer, `[NEEDS_LEGAL_REVIEW: ${cite}]`)
  }

  return {
    cleaned,
    verifiedCount: verifiedSet.size,
    flaggedCount: flagged.length,
    flagged,
    verifiedCitations,
  }
}
