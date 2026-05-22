import {
  consumeStream,
  convertToModelMessages,
  streamText,
  type UIMessage,
} from "ai"
import { google } from "@ai-sdk/google"
import { prisma } from "@/lib/prisma"
import { getDocumentBySlug } from "@/lib/document-catalog"

export const maxDuration = 60

const QUESTIONNAIRE_CACHE_TTL_MS = 5 * 60 * 1000
const questionnaireCache = new Map<string, { cachedAt: number; template: unknown }>()

async function getTemplateWithQuestionnaire(legacySlug: string, intent?: string | null) {
  const cacheKey = `${legacySlug}:${intent || "standard"}`
  const cached = questionnaireCache.get(cacheKey)
  const now = Date.now()
  if (cached && now - cached.cachedAt < QUESTIONNAIRE_CACHE_TTL_MS) {
    return cached.template
  }

  const template = await prisma.documentTemplate.findFirst({
    where: { slug: legacySlug, deletedAt: null },
    include: {
      questionnaires: {
        where: intent
          ? { metadata: { path: ["intent"], equals: intent } }
          : undefined,
        include: {
          questions: {
            include: { options: true },
            orderBy: [{ section: "asc" }, { createdAt: "asc" }],
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
 * Document chat (AI question flow) API
 * POST /api/documents/[category]/[slug]/chat
 *
 * Resolves document by canonical (category, slug) pair.
 * Questionnaire DB lookups use legacySlug for backwards compatibility.
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ category: string; slug: string }> }
) {
  try {
    const { category, slug } = await params
    const { messages, intent } = await request.json()

    // Resolve document by canonical slug and validate category
    const doc = getDocumentBySlug(slug)
    if (!doc || doc.category !== category) {
      return Response.json({ error: "Document not found" }, { status: 404 })
    }

    // Questionnaires in DB are keyed by legacy underscore slug
    const template = await getTemplateWithQuestionnaire(doc.legacySlug, intent)

    const questionnaire =
      template &&
      typeof template === "object" &&
      "questionnaires" in template &&
      Array.isArray((template as { questionnaires: unknown[] }).questionnaires)
        ? (template as { questionnaires: { questions: { label: string; required?: boolean; helpText?: string; options: { label?: string; value: string }[] }[] }[] }).questionnaires[0]
        : null

    const questions = questionnaire?.questions ?? []

    const questionList = questions
      .map((q, idx) => {
        const options =
          q.options.length > 0
            ? `\nOptions: ${q.options.map((o) => o.label || o.value).join(", ")}`
            : ""
        return `${idx + 1}. ${q.label}${q.required ? " (Required)" : ""}${q.helpText ? `\n   Help: ${q.helpText}` : ""}${options}`
      })
      .join("\n\n")

    const SYSTEM_PROMPT = `You are a legal document AI assistant for LegalLawDocs.com, specializing in generating ${doc.title}s. Your job is to ask the user smart, one-at-a-time questions to gather all the information needed to generate a customized, legally compliant ${doc.title}.

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
      model: google("gemini-2.5-flash"),
      system: SYSTEM_PROMPT,
      messages: await convertToModelMessages(messages as UIMessage[]),
      abortSignal: request.signal,
    })

    return result.toUIMessageStreamResponse({
      originalMessages: messages as UIMessage[],
      consumeSseStream: consumeStream,
    })
  } catch (error) {
    console.error("Document chat error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
