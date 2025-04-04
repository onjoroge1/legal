import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const params = await context.params
    const { id } = params
    console.log('API Route - Debug - Fetching questionnaires for template:', { id })

    // Get questionnaires for the template
    const questionnaires = await prisma.questionnaire.findMany({
      where: {
        templateId: id
      },
      include: {
        questions: {
          include: {
            options: true,
            dependencies: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    console.log('API Route - Found questionnaires:', {
      templateId: id,
      count: questionnaires.length
    })

    return NextResponse.json(questionnaires)
  } catch (error) {
    console.error('Error fetching questionnaires:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
} 