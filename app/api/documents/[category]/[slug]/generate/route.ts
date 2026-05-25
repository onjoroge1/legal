import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import { prisma } from "@/lib/prisma"
import { getDocumentBySlug } from "@/lib/document-catalog"
import { getDocumentPrompt } from "@/lib/document-prompts"
import { parseStatePageSlug, STATE_DOC_NOTES } from "@/lib/state-pages"
import { parseInternationalPageSlug } from "@/lib/international-pages"
import { parseCityPageSlug, CITY_DOC_NOTES, CITY_DOC_SLUG } from "@/lib/city-pages"

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
 * Build a state-law context block to inject into AI prompts.
 * Pulls from STATE_DOC_NOTES so the model gets the same accurate
 * requirements/restrictions shown on the public SEO landing pages.
 */
function buildStateContext(stateSlug: string, docSlug: string, stateName: string): string {
  const notes = STATE_DOC_NOTES[stateSlug]?.[docSlug]
  if (!notes) return `Jurisdiction: ${stateName}. Apply ${stateName} law throughout.`

  const lines: string[] = [
    `JURISDICTION: ${stateName}`,
    `Apply ${stateName}-specific law throughout. Cite real ${stateName} statutes.`,
    ``,
    `${stateName.toUpperCase()} LEGAL REQUIREMENTS FOR THIS DOCUMENT:`,
    ...notes.requirements.map((r) => `• ${r}`),
    ``,
    `${stateName.toUpperCase()} RESTRICTIONS AND LIMITATIONS:`,
    ...notes.restrictions.map((r) => `• ${r}`),
  ]

  if (notes.noticeRequirements) {
    lines.push(``, `NOTICE REQUIREMENTS: ${notes.noticeRequirements}`)
  }

  return lines.join("\n")
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

    // State/jurisdiction-specific law context (requirements + restrictions from STATE_DOC_NOTES)
    const jurisdiction = stateName || "the applicable jurisdiction"
    const stateContext = cityContextOverride
      ?? (stateSlug
        ? buildStateContext(stateSlug, doc.slug, stateName)
        : `JURISDICTION: ${jurisdiction}\nApply ${jurisdiction} law and cite applicable statutes throughout.`)

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

Output ONLY the enhanced document. No preamble, no commentary.`,
      })

      return Response.json({ document: enhanced.text })
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

Output ONLY the document text. No preamble, no commentary, no markdown fences.`,
    })

    return Response.json({ document: result.text })
  } catch (error) {
    console.error("Document generation error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
