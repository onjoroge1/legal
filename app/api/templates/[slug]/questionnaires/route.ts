import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

/**
 * Get questionnaires for a template by slug
 * GET /api/templates/[slug]/questionnaires
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

    // Get all questionnaires for this template
    const questionnaires = await prisma.questionnaire.findMany({
      where: {
        templateId: template.id,
      },
      include: {
        questions: {
          include: {
            options: true,
            dependencies: {
              include: {
                question: {
                  select: {
                    id: true,
                    label: true,
                  },
                },
              },
            },
          },
          orderBy: [
            { section: "asc" },
            { createdAt: "asc" },
          ],
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    })

    return NextResponse.json(questionnaires)
  } catch (error) {
    console.error("Questionnaires API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

