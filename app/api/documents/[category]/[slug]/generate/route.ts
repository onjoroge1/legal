import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import { prisma } from "@/lib/prisma"
import { getDocumentBySlug } from "@/lib/document-catalog"
import { getDocumentPrompt } from "@/lib/document-prompts"
import { parseStatePageSlug, STATE_DOC_NOTES } from "@/lib/state-pages"
import { parseInternationalPageSlug } from "@/lib/international-pages"
import { parseCityPageSlug, CITY_DOC_NOTES, CITY_DOC_SLUG } from "@/lib/city-pages"
import { validateAndCleanCitations } from "@/lib/citation-validator"
import { requireLegalDisclaimerAcceptance } from "@/lib/legal-disclaimer-server"
import { requireEmergencyFeature } from "@/lib/feature-flags"
import {
  LEGAL_DISCLAIMER_PRIMARY_COPY,
  LEGAL_DISCLAIMER_VERSION,
} from "@/lib/legal-disclaimer"

export const maxDuration = 60

const TEMPLATE_CACHE_TTL_MS = 5 * 60 * 1000
const templateCache = new Map<string, { cachedAt: number; template: unknown }>()

async function getTemplateByLegacySlug(legacySlug: string) {
  const cached = templateCache.get(legacySlug)
  const now = Date.now()
  if (cached && now - cached.cachedAt < TEMPLATE_CACHE_TTL_MS) {
    return cached.template
  }

  const template = await prisma.documentTemplate.findFirst({
    where: { slug: legacySlug, deletedAt: null },
  })

  templateCache.set(legacySlug, { cachedAt: now, template })
  return template
}

/**
 * Per-fact summary returned alongside the prompt context so the citation
 * validator can attribute each output citation back to its source for the
 * per-citation tooltip in the Draft Preview.
 */
export interface VerifiedFactSummary {
  /** "AB 1482" — the canonical citation string we look for in AI output. */
  citation: string | null
  /** "openstates" | "cornell-lii" | "manual" */
  source: string
  /** Canonical URL on the source site for verification. */
  sourceUrl: string
  /** ISO timestamp when an admin approved this fact. */
  reviewedAt: string | null
  /** The full content sentence (used for substring matching as a fallback). */
  content: string
}

type ApprovedVerifiedFact = Omit<VerifiedFactSummary, "reviewedAt"> & {
  reviewedAt: Date | null
}

/**
 * Build a state-law context block to inject into AI prompts.
 *
 * Combines:
 *   1. The hand-curated `STATE_DOC_NOTES` for the (state, docSlug) combo
 *      (used by the public SEO landing pages too).
 *   2. Any externally-verified facts that an admin has approved in the
 *      VerifiedFact table — these come from authoritative sources
 *      (OpenStates etc.) and are gated by human review before going live.
 *
 * Returns both the prompt string AND the verified-facts metadata so the
 * citation validator can attribute each match back to its source.
 *
 * Async because (2) hits the DB.
 */
async function buildStateContext(
  stateSlug: string,
  docSlug: string,
  stateName: string
): Promise<{ text: string; verifiedFacts: VerifiedFactSummary[] }> {
  const notes = STATE_DOC_NOTES[stateSlug]?.[docSlug]

  // Pull approved externally-verified facts (Workstream D Phase D0).
  // Use the same slug shape we ingest with ("california", "residential-lease-agreement").
  const dbFacts = await prisma.verifiedFact.findMany({
    where: { jurisdiction: stateSlug, documentSlug: docSlug, status: "approved" },
    select: {
      citation: true,
      source: true,
      sourceUrl: true,
      reviewedAt: true,
      content: true,
    },
  })

  const verifiedFacts: VerifiedFactSummary[] = dbFacts.map((f: ApprovedVerifiedFact) => ({
    citation: f.citation,
    source: f.source,
    sourceUrl: f.sourceUrl,
    reviewedAt: f.reviewedAt?.toISOString() ?? null,
    content: f.content,
  }))

  // Start with curated requirements/restrictions. If none, the prompt still
  // gets a jurisdiction line so the model knows which state to target.
  const lines: string[] = notes
    ? [
        `JURISDICTION: ${stateName}`,
        `Apply ${stateName}-specific law throughout. Cite real ${stateName} statutes.`,
        ``,
        `${stateName.toUpperCase()} LEGAL REQUIREMENTS FOR THIS DOCUMENT:`,
        ...notes.requirements.map((r) => `• ${r}`),
        ``,
        `${stateName.toUpperCase()} RESTRICTIONS AND LIMITATIONS:`,
        ...notes.restrictions.map((r) => `• ${r}`),
      ]
    : [`Jurisdiction: ${stateName}. Apply ${stateName} law throughout.`]

  if (notes?.noticeRequirements) {
    lines.push(``, `NOTICE REQUIREMENTS: ${notes.noticeRequirements}`)
  }

  // Append the externally-verified block if we have any approved facts.
  // The block is clearly labelled so the AI knows these come from external,
  // human-approved sources (and the validator's substring check finds them).
  if (verifiedFacts.length > 0) {
    lines.push(
      ``,
      `EXTERNALLY-VERIFIED ${stateName.toUpperCase()} FACTS`,
      `(Sourced from official legal databases, reviewed and approved by our team. ` +
        `You MUST treat these as authoritative.):`,
      ...verifiedFacts.map((f) => `• ${f.content}${f.citation ? ` (${f.citation})` : ""}`)
    )
  }

  return { text: lines.join("\n"), verifiedFacts }
}

/**
 * Document generation API
 * POST /api/documents/[category]/[slug]/generate
 *
 * Handles both plain catalog slugs (e.g. "independent-contractor-agreement")
 * and state/international composite slugs (e.g. "california-independent-contractor-agreement").
 * Template DB lookups use legacySlug for backwards compatibility.
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ category: string; slug: string }> }
) {
  try {
    const acceptanceError = requireLegalDisclaimerAcceptance(request)
    if (acceptanceError) return acceptanceError

    const featureError = requireEmergencyFeature(
      "ENABLE_AI_GENERATION",
      "Document generation"
    )
    if (featureError) return featureError

    const { category, slug } = await params
    const { formData, intent } = await request.json()
    const isDryRun =
      request.headers.get("x-dry-run") === "1" ||
      new URL(request.url).searchParams.get("dryRun") === "1"

    // ── Resolve document ────────────────────────────────────────────────────
    // Handles: plain catalog slug, state-page slug, international-page slug,
    // and city-specific slug (e.g. "chicago-residential-lease-agreement").
    let doc = getDocumentBySlug(slug)
    let stateSlug: string | null = null
    let stateName: string = formData.state || formData.STATE || ""
    let cityContextOverride: string | null = null  // built for city pages

    if (!doc) {
      const parsedState = parseStatePageSlug(slug)
      if (parsedState && parsedState.doc.category === category) {
        doc = getDocumentBySlug(parsedState.doc.slug)
        stateSlug = parsedState.state.slug
        stateName = parsedState.state.name
      }
    }

    if (!doc) {
      const parsedIntl = parseInternationalPageSlug(slug)
      if (parsedIntl && parsedIntl.doc.category === category) {
        doc = getDocumentBySlug(parsedIntl.doc.slug)
        stateName = parsedIntl.country.name
      }
    }

    if (!doc) {
      const parsedCity = parseCityPageSlug(slug)
      if (parsedCity && category === "real-estate") {
        doc = getDocumentBySlug(CITY_DOC_SLUG)
        const { city } = parsedCity
        stateName = `${city.name}, ${city.state}`
        const cityNotes = CITY_DOC_NOTES[city.slug]
        if (cityNotes) {
          // Build city-specific context block (requirements + restrictions from local ordinances)
          cityContextOverride = [
            `JURISDICTION: ${city.name}, ${city.state}`,
            `This lease must comply with BOTH ${city.state} state law AND ${city.name} local ordinances.`,
            ``,
            `${city.name.toUpperCase()} LOCAL ORDINANCE REQUIREMENTS:`,
            ...cityNotes.requirements.map((r) => `• ${r}`),
            ``,
            `${city.name.toUpperCase()} LOCAL RESTRICTIONS:`,
            ...cityNotes.restrictions.map((r) => `• ${r}`),
            ``,
            `NOTICE REQUIREMENTS: ${cityNotes.noticeRequirements}`,
          ].join("\n")
        }
      }
    }

    if (!doc || doc.category !== category) {
      return Response.json({ error: "Document not found" }, { status: 404 })
    }

    // ── Template lookup ─────────────────────────────────────────────────────
    // Templates in DB are keyed by legacy underscore slug
    const template = await getTemplateByLegacySlug(doc.legacySlug)

    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    // ── Prompt components ───────────────────────────────────────────────────
    // Generic doc-type instructions (structure, sections, intent)
    const documentSpecificInstructions = getDocumentPrompt(doc.slug, intent)

    // State/jurisdiction-specific law context (requirements + restrictions from
    // STATE_DOC_NOTES + any admin-approved VerifiedFact rows from Workstream D).
    const jurisdiction = stateName || "the applicable jurisdiction"
    let stateContext: string
    let verifiedFacts: VerifiedFactSummary[] = []
    if (cityContextOverride) {
      stateContext = cityContextOverride
    } else if (stateSlug) {
      const built = await buildStateContext(stateSlug, doc.slug, stateName)
      stateContext = built.text
      verifiedFacts = built.verifiedFacts
    } else {
      stateContext = `JURISDICTION: ${jurisdiction}\nApply ${jurisdiction} law and cite applicable statutes throughout.`
    }

    // ── Template-based generation (with AI enhancement) ─────────────────────
    if (template && typeof template === "object" && "content" in template && template.content) {
      let documentContent = template.content as string
      const variables =
        (template as { variables?: Record<string, { fieldId?: string }> }).variables ?? {}

      const inverseVariableMap = Object.entries(variables).reduce(
        (acc, [variableName, config]) => {
          if (config?.fieldId) acc[config.fieldId] = variableName
          return acc
        },
        {} as Record<string, string>
      )

      Object.entries(formData).forEach(([key, value]) => {
        const rawValue = String(value ?? "")
        documentContent = documentContent.replace(new RegExp(`\\{${key}\\}`, "g"), rawValue)
        const mapped = inverseVariableMap[key]
        if (mapped) {
          documentContent = documentContent.replace(new RegExp(`\\{${mapped}\\}`, "g"), rawValue)
        }
      })

      documentContent = documentContent
        .replace(/\{contractDate\}/g, currentDate)
        .replace(/\{date\}/g, currentDate)
        .replace(/\{documentType\}/g, doc.title)

      if (isDryRun) {
        return Response.json({ document: documentContent })
      }

      const enhanced = await generateText({
        model: google("gemini-2.5-flash"),
        prompt: `You are a legal document expert. Enhance this legal document template to be fully compliant with the jurisdiction's law.

Document Type: ${doc.title}
Intent: ${intent || "standard"}
Current Date: ${currentDate}

${stateContext}

Party Details from Form:
${Object.entries(formData)
  .filter(([, v]) => v !== undefined && v !== "")
  .map(([k, v]) => `  ${k}: ${v}`)
  .join("\n")}

Template to enhance:
${documentContent}

Instructions:
1. This output is a TEMPLATE DRAFT, not final legal advice. Begin the document with EXACTLY this line on its own:
   "DRAFT — Generated by AI. Requires legal review prior to execution."
2. For any value not provided in the form data above, insert a bracketed placeholder in ALL CAPS with underscores — for example: [PARTY_A_ADDRESS], [PARTY_A_STATE_OF_INCORPORATION], [DATE_OF_EXECUTION], [WITNESS_NAME]. Do NOT use blank underlines for missing values; use bracketed placeholders so the user actively sees what they must fill in.
3. NEVER invent party addresses, states of incorporation, entity types, or any other factual detail not present in the form data.
4. Add all jurisdiction-required clauses and citations listed above
5. Ensure the document is compliant with the restrictions listed above
6. Apply professional legal formatting with proper section numbering
7. Include a complete signature block (use bracketed placeholders for missing names/dates/titles)
8. Follow these document-specific guidelines: ${documentSpecificInstructions}

ANTI-HALLUCINATION RULES (CRITICAL):
1. You may ONLY cite statutes, code sections, dollar amounts, percentages, dates, and agency names that appear VERBATIM in the JURISDICTION REQUIREMENTS or RESTRICTIONS listed above. Do not invent, guess, paraphrase, or update any citation.
2. If a clause genuinely needs a citation that is NOT in the curated list above, write: "[NEEDS_LEGAL_REVIEW: <one-line description of what citation should go here>]" — for example: "[NEEDS_LEGAL_REVIEW: applicable security-deposit cap in this state]".
3. Do NOT use the phrase "as required by applicable law" or "in accordance with state law" as a way to skirt a citation. Either cite from the list, or mark it for review.
4. Do NOT invent statute section numbers (e.g., "§ 1234"), act names, regulation numbers, case citations, or agency names. If unsure, use [NEEDS_LEGAL_REVIEW: ...].
5. Numeric values (wage minimums, deposit caps, notice periods) MUST come from the list above. If not in the list, use [NEEDS_LEGAL_REVIEW: <description>] — never guess.

Output ONLY the enhanced document. No preamble, no commentary.`,
      })

      // Post-process: validate every citation against the curated jurisdiction
      // data + any admin-approved external verified facts (Workstream D).
      // Unverified citations get swapped for [NEEDS_LEGAL_REVIEW: ...] markers
      // so users see exactly what we couldn't ground. Per-citation source
      // metadata is returned so the Draft Preview can render attribution tooltips.
      const validated = validateAndCleanCitations(enhanced.text, stateContext, verifiedFacts)
      if (validated.flaggedCount > 0) {
        console.warn(
          `[citation-validator] ${doc.title} (${jurisdiction}): ` +
            `flagged ${validated.flaggedCount} unverified citation(s):`,
          validated.flagged
        )
      }
      return Response.json({
        document: validated.cleaned,
        legalDisclaimer: {
          version: LEGAL_DISCLAIMER_VERSION,
          copy: LEGAL_DISCLAIMER_PRIMARY_COPY,
        },
        citations: {
          verified: validated.verifiedCount,
          flagged: validated.flaggedCount,
          list: validated.verifiedCitations,
        },
      })
    }

    // ── Pure AI generation (no template in DB yet) ──────────────────────────
    if (isDryRun) {
      return Response.json({
        document: `DRY RUN: No template found for ${doc.title}. AI generation will be used.`,
      })
    }

    const result = await generateText({
      model: google("gemini-2.5-flash"),
      prompt: `You are a legal document expert. Generate a complete, professionally formatted, legally compliant ${doc.title}.

${stateContext}

Document Type: ${doc.title}
Intent: ${intent || "standard"}
Current Date: ${currentDate}

Party and Transaction Details:
${Object.entries(formData)
  .filter(([, v]) => v !== undefined && v !== "")
  .map(([k, v]) => `  ${k}: ${v}`)
  .join("\n")}

Document Requirements:
- This output is a TEMPLATE DRAFT, not final legal advice. Begin the document with EXACTLY this line on its own:
  "DRAFT — Generated by AI. Requires legal review prior to execution."
- Write a complete, formal legal document with numbered sections and subsections
- Incorporate ALL jurisdiction-specific requirements and restrictions listed above
- Reference the actual statutes cited above by name and number where applicable
- Use precise legal language appropriate for ${jurisdiction}
- Include all standard sections for a ${doc.title}
- Include a complete execution/signature block at the end (use bracketed placeholders for missing names/dates/titles)
- For any value not provided in the form data above, insert a bracketed placeholder in ALL CAPS with underscores — for example: [PARTY_A_ADDRESS], [PARTY_A_STATE_OF_INCORPORATION], [DATE_OF_EXECUTION]. Do NOT use blank underlines for missing factual values; use bracketed placeholders so the user actively sees what they must fill in.
- NEVER invent party addresses, states of incorporation, entity types, or any other factual detail not present in the form data.
- Follow these document-specific guidelines: ${documentSpecificInstructions}

ANTI-HALLUCINATION RULES (CRITICAL):
1. You may ONLY cite statutes, code sections, dollar amounts, percentages, dates, and agency names that appear VERBATIM in the JURISDICTION REQUIREMENTS or RESTRICTIONS listed above. Do not invent, guess, paraphrase, or update any citation.
2. If a clause genuinely needs a citation that is NOT in the curated list above, write: "[NEEDS_LEGAL_REVIEW: <one-line description of what citation should go here>]" — for example: "[NEEDS_LEGAL_REVIEW: applicable security-deposit cap in this state]".
3. Do NOT use the phrase "as required by applicable law" or "in accordance with state law" as a way to skirt a citation. Either cite from the list, or mark it for review.
4. Do NOT invent statute section numbers (e.g., "§ 1234"), act names, regulation numbers, case citations, or agency names. If unsure, use [NEEDS_LEGAL_REVIEW: ...].
5. Numeric values (wage minimums, deposit caps, notice periods) MUST come from the list above. If not in the list, use [NEEDS_LEGAL_REVIEW: <description>] — never guess.

Output ONLY the document text. No preamble, no commentary, no markdown fences.`,
    })

    // Post-process: validate every citation against the curated jurisdiction
    // data + any admin-approved external verified facts (Workstream D).
    const validated = validateAndCleanCitations(result.text, stateContext, verifiedFacts)
    if (validated.flaggedCount > 0) {
      console.warn(
        `[citation-validator] ${doc.title} (${jurisdiction}): ` +
          `flagged ${validated.flaggedCount} unverified citation(s):`,
        validated.flagged
      )
    }
    return Response.json({
      document: validated.cleaned,
      legalDisclaimer: {
        version: LEGAL_DISCLAIMER_VERSION,
        copy: LEGAL_DISCLAIMER_PRIMARY_COPY,
      },
      citations: {
        verified: validated.verifiedCount,
        flagged: validated.flaggedCount,
        list: validated.verifiedCitations,
      },
    })
  } catch (error) {
    console.error("Document generation error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
