import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { prisma } from "@/lib/prisma"
import { getDocumentBySlug } from "@/lib/document-catalog"
import { getDocumentPrompt } from "@/lib/document-prompts"

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
 * Document generation API
 * POST /api/documents/[category]/[slug]/generate
 *
 * Resolves document by canonical (category, slug) pair.
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

    // Resolve document by canonical slug and validate category
    const doc = getDocumentBySlug(slug)
    if (!doc || doc.category !== category) {
      return Response.json({ error: "Document not found" }, { status: 404 })
    }

    // Templates in DB are keyed by legacy underscore slug
    const template = await getTemplateByLegacySlug(doc.legacySlug)

    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    // Prompt addendum from the canonical slug
    const documentSpecificInstructions = getDocumentPrompt(slug, intent)

    // Template-based generation (with AI enhancement)
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
        model: openai("gpt-4o-mini"),
        prompt: `Enhance this legal document template with state-specific provisions and professional formatting:

Template: ${documentContent}
State: ${formData.STATE || formData.state || "California"}
Document Type: ${doc.title}
Intent: ${intent || "standard"}
Form Data: ${JSON.stringify(formData)}

Tasks:
1. Add state-specific legal citations and statutes for ${formData.STATE || formData.state || "California"}
2. Ensure professional legal document formatting
3. Add appropriate legal language based on the document type
4. Verify all required sections are present
5. Use the current date: ${currentDate}
6. Maintain the structure and key content from the template
7. Follow these document-specific instructions: ${documentSpecificInstructions}

Output ONLY the enhanced document. No commentary before or after.`,
      })

      return Response.json({ document: enhanced.text })
    }

    // Pure AI generation (no template in DB yet)
    if (isDryRun) {
      return Response.json({
        document: `DRY RUN: No template found for ${doc.title}. AI generation will be used.`,
      })
    }

    const result = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: `Generate a complete, professional, legally compliant ${doc.title} based on these details:

${Object.entries(formData)
  .map(([key, value]) => `${key}: ${value}`)
  .join("\n")}

REQUIREMENTS:
- Write a complete, formal legal document with proper section numbering
- Include ${formData.STATE || formData.state || "California"}-specific legal citations and statutes
- Use proper legal language and formatting
- Include all standard sections for a ${doc.title}
- Reference actual ${formData.STATE || formData.state || "California"} statutes where applicable
- Make it professionally formatted and ready to sign
- Use the current date: ${currentDate}
- Follow these document-specific instructions: ${documentSpecificInstructions}

Output ONLY the document text. No commentary before or after.`,
    })

    return Response.json({ document: result.text })
  } catch (error) {
    console.error("Document generation error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
