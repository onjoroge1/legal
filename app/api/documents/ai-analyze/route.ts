import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { generateObject } from "ai"
import { google } from "@ai-sdk/google"
import { z } from "zod"

export const maxDuration = 60

const analysisSchema = z.object({
  riskScore: z.enum(["low", "medium", "high"]),
  riskReason: z.string(),
  issues: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      severity: z.enum(["low", "medium", "high"]),
    })
  ),
  recommendations: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    })
  ),
  summary: z.string(),
  keyTerms: z.array(z.string()),
  documentType: z.string(),
})

/**
 * POST /api/documents/ai-analyze
 * Runs GPT-4o-mini analysis on a user document and returns structured results.
 */
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { documentId } = await request.json()
    if (!documentId) {
      return NextResponse.json({ error: "documentId is required" }, { status: 400 })
    }

    const document = await prisma.userDocument.findFirst({
      where: {
        id: documentId,
        user: { email: session.user.email },
      },
    })

    if (!document) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 })
    }

    // Truncate very long documents to keep within token limits
    const contentForAnalysis = document.content.length > 8000
      ? document.content.substring(0, 8000) + "\n\n[Content truncated for analysis...]"
      : document.content

    const { object } = await generateObject({
      model: google("gemini-2.0-flash"),
      schema: analysisSchema,
      prompt: `You are a legal document analyst. Analyze the following legal document and provide a structured analysis.

Document title: ${document.title}
Document type: ${document.type}

Document content:
${contentForAnalysis}

Provide:
1. A risk score (low/medium/high) based on potential legal issues, missing clauses, or ambiguous language
2. A brief reason for the risk score
3. A list of specific issues found (2-5 issues)
4. A list of actionable recommendations (2-4 items)
5. A concise 2-3 sentence executive summary
6. Key legal terms or clauses present in the document (3-6 terms)
7. The detected document type/category

Be specific and constructive. Focus on real legal considerations.`,
    })

    return NextResponse.json({ analysis: object })
  } catch (error) {
    console.error("AI analyze error:", error)
    return NextResponse.json({ error: "Failed to analyze document" }, { status: 500 })
  }
}
