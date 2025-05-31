import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get all questionnaires with their questions
    const questionnaires = await prisma.questionnaire.findMany({
      include: {
        template: {
          select: {
            id: true,
            name: true,
            code: true
          }
        },
        questions: {
          include: {
            options: true,
            dependencies: true
          },
          orderBy: {
            createdAt: 'asc'
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
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