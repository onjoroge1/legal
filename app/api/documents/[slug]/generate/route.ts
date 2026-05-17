import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { prisma } from "@/lib/prisma"
import { getDocumentByLegacySlug } from "@/lib/document-catalog"
import { getDocumentPrompt } from "@/lib/document-prompts"

export const maxDuration = 60

const TEMPLATE_CACHE_TTL_MS = 5 * 60 * 1000
const templateCache = new Map<string, { cachedAt: number; template: any | null }>()

async function getTemplateBySlug(slug: string) {
  const cached = templateCache.get(slug)
  const now = Date.now()
  if (cached && now - cached.cachedAt < TEMPLATE_CACHE_TTL_MS) {
    return cached.template
  }

  const template = await prisma.documentTemplate.findFirst({
    where: {
      slug: slug,
      deletedAt: null,
    },
  })

  templateCache.set(slug, { cachedAt: now, template })
  return template
}

/**
 * Document-agnostic generation API
 * POST /api/documents/[slug]/generate
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const { formData, intent } = await request.json()
    const isDryRun =
      request.headers.get("x-dry-run") === "1" ||
      new URL(request.url).searchParams.get("dryRun") === "1"

    const document = getDocumentByLegacySlug(slug)
    if (!document) {
      return Response.json(
        { error: "Document not found" },
        { status: 404 }
      )
    }

    // Get template for this document type (cached)
    const template = await getTemplateBySlug(slug)

    // Use current date
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    // If template exists, use template-based generation with AI enhancement
    if (template?.content) {
      // Fill template variables
      let documentContent = template.content
      const variables = (template.variables as Record<string, any> | null) || {}
      const inverseVariableMap = Object.entries(variables).reduce(
        (acc, [variableName, config]) => {
          if (config?.fieldId) {
            acc[config.fieldId] = variableName
          }
          return acc
        },
        {} as Record<string, string>
      )
      
      // Replace variables in template (support direct keys and mapped variable names)
      Object.entries(formData).forEach(([key, value]) => {
        const rawValue = String(value ?? "")
        const directKey = `{${key}}`
        documentContent = documentContent.replace(new RegExp(directKey, "g"), rawValue)

        const mappedVariable = inverseVariableMap[key]
        if (mappedVariable) {
          const mappedKey = `{${mappedVariable}}`
          documentContent = documentContent.replace(new RegExp(mappedKey, "g"), rawValue)
        }
      })
      
      // Replace common variables
      documentContent = documentContent.replace(/{contractDate}/g, currentDate)
      documentContent = documentContent.replace(/{date}/g, currentDate)
      documentContent = documentContent.replace(/{documentType}/g, document.title)

      if (isDryRun) {
        return Response.json({ document: documentContent })
      }

      const documentSpecificInstructions = getDocumentPrompt(slug, intent)

      // AI enhancement
      const enhanced = await generateText({
        model: openai("gpt-4o-mini"),
        prompt: `Enhance this legal document template with state-specific provisions and professional formatting:

Template: ${documentContent}
State: ${formData.STATE || formData.state || "California"}
Document Type: ${document.title}
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

    // Fallback: Pure AI generation (for documents without templates yet)
    if (isDryRun) {
      return Response.json({
        document: `DRY RUN: No template found for ${document.title}. Provide a template to enable generation.`,
      })
    }

    const documentSpecificInstructions = getDocumentPrompt(slug, intent)

    const result = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: `Generate a complete, professional, legally compliant ${document.title} based on these details:

${Object.entries(formData)
  .map(([key, value]) => `${key}: ${value}`)
  .join("\n")}

REQUIREMENTS:
- Write a complete, formal legal document with proper section numbering
- Include ${formData.STATE || formData.state || "California"}-specific legal citations and statutes
- Use proper legal language and formatting
- Include all standard sections for a ${document.title}
- Reference actual ${formData.STATE || formData.state || "California"} statutes where applicable
- Make it professionally formatted and ready to sign
- Use the current date: ${currentDate}
- Follow these document-specific instructions: ${documentSpecificInstructions}

Output ONLY the document text. No commentary before or after.`,
    })

    return Response.json({ document: result.text })
  } catch (error) {
    console.error("Document generation error:", error)
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
