import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

/**
 * Get available intents for a document type by slug
 * GET /api/templates/[slug]/intents
 * 
 * Intents are stored in template metadata or as separate questionnaires
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    // Find template by slug
    const template = await prisma.documentTemplate.findFirst({
      where: {
        slug: slug,
        deletedAt: null,
      },
    })

    if (!template) {
      return NextResponse.json(
        { error: "Template not found" },
        { status: 404 }
      )
    }

    // Get intents from metadata or questionnaires
    const metadata = template.metadata as any
    const intents = metadata?.intents || []

    // If no intents in metadata, derive from questionnaires
    if (intents.length === 0) {
      const questionnaires = await prisma.questionnaire.findMany({
        where: {
          templateId: template.id,
        },
        select: {
          id: true,
          name: true,
          description: true,
          metadata: true,
        },
      })

      // Map questionnaires to intents
      const derivedIntents = questionnaires.map((q) => ({
        id: q.id,
        name: q.name,
        description: q.description || "",
        metadata: q.metadata || {},
      }))

      return NextResponse.json(derivedIntents)
    }

    return NextResponse.json(intents)
  } catch (error) {
    console.error("Intents API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

