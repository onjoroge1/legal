import {
  consumeStream,
  convertToModelMessages,
  streamText,
  type UIMessage,
} from "ai"
import { openai } from "@ai-sdk/openai"
import { prisma } from "@/lib/prisma"
import { getDocumentByLegacySlug } from "@/lib/document-catalog"

export const maxDuration = 60

const QUESTIONNAIRE_CACHE_TTL_MS = 5 * 60 * 1000
const questionnaireCache = new Map<string, { cachedAt: number; template: any | null }>()

async function getTemplateWithQuestionnaire(slug: string, intent?: string | null) {
  const cacheKey = `${slug}:${intent || "standard"}`
  const cached = questionnaireCache.get(cacheKey)
  const now = Date.now()
  if (cached && now - cached.cachedAt < QUESTIONNAIRE_CACHE_TTL_MS) {
    return cached.template
  }

  const template = await prisma.documentTemplate.findFirst({
    where: {
      slug: slug,
      deletedAt: null,
    },
    include: {
      questionnaires: {
        where: intent
          ? {
              metadata: {
                path: ["intent"],
                equals: intent,
              },
            }
          : undefined,
        include: {
          questions: {
            include: {
              options: true,
            },
            orderBy: [
              { section: "asc" },
              { createdAt: "asc" },
            ],
          },
        },
        take: 1,
      },
    },
  })

  questionnaireCache.set(cacheKey, { cachedAt: now, template })
  return template
}

/**
 * Document-agnostic chat API
 * POST /api/documents/[slug]/chat
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const { messages, intent } = await request.json()

    const document = getDocumentByLegacySlug(slug)
    if (!document) {
      return Response.json(
        { error: "Document not found" },
        { status: 404 }
      )
    }

    // Get template and questionnaire for this document type (cached)
    const template = await getTemplateWithQuestionnaire(slug, intent)

    // Build system prompt based on document type and intent
    const questionnaire = template?.questionnaires[0]
    const questions = questionnaire?.questions || []

    // Create question list for the prompt
    const questionList = questions
      .map((q, idx) => {
        const options = q.options.length > 0
          ? `\nOptions: ${q.options.map((o) => o.label || o.value).join(", ")}`
          : ""
        return `${idx + 1}. ${q.label}${q.required ? " (Required)" : ""}${q.helpText ? `\n   Help: ${q.helpText}` : ""}${options}`
      })
      .join("\n\n")

    const SYSTEM_PROMPT = `You are a legal document AI assistant for LegalLawDocs.com, specializing in generating ${document.title}s. Your job is to ask the user smart, one-at-a-time questions to gather all the information needed to generate a customized, legally compliant ${document.title}.

IMPORTANT RULES:
- Ask ONE question at a time. Wait for the user's response before asking the next.
- Be professional, warm, and concise.
- After each answer, briefly acknowledge it and ask the next question.
- Guide the user through this information gathering in a natural conversational flow.
${intent ? `\n- The user has selected intent: ${intent}` : ""}

INFORMATION TO GATHER (in this order):
${questionList || "1. State/Jurisdiction\n2. Parties involved\n3. Terms and conditions\n4. Additional provisions"}

After gathering ALL needed information, respond with EXACTLY this format (this is critical):
---DOCUMENT_COMPLETE---
[All collected data in key-value format]
---END_DOCUMENT_DATA---

Start by greeting the user and asking your first question.`

    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: SYSTEM_PROMPT,
      messages: await convertToModelMessages(messages),
      abortSignal: request.signal,
    })

    return result.toUIMessageStreamResponse({
      originalMessages: messages,
      consumeSseStream: consumeStream,
    })
  } catch (error) {
    console.error("Document chat error:", error)
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
