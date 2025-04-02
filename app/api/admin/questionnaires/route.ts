import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET /api/admin/questionnaires - Get all questionnaires
export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Check if user is admin
  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  })

  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const questionnaires = await prisma.questionnaire.findMany({
      include: {
        template: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(questionnaires)
  } catch (error) {
    console.error("Error fetching questionnaires:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// POST /api/admin/questionnaires - Create a new questionnaire
export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Check if user is admin
  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  })

  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { name, description, templateId, questions } = body

    const questionnaire = await prisma.questionnaire.create({
      data: {
        name,
        description,
        questions,
        templateId,
      },
      include: {
        template: {
          include: {
            category: true,
          },
        },
      },
    })

    return NextResponse.json(questionnaire)
  } catch (error) {
    console.error("Error creating questionnaire:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
} 