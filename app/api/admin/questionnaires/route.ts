import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Prisma, PrismaClient } from "@prisma/client"

interface FieldOption {
  value: string
  label?: string
}

interface FieldDependency {
  dependsOnQuestionId: string
  conditionType: string
  conditionValue: string
}

interface Field {
  label: string
  type: string
  required: boolean
  section: string
  helpText?: string
  placeholder?: string
  options?: FieldOption[]
  dependencies?: FieldDependency[]
}

// GET /api/admin/questionnaires - Get all questionnaires
export async function GET() {
  try {
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

    // Get all questionnaires with their templates and questions
    const questionnaires = await prisma.questionnaire.findMany({
      include: {
        template: {
          include: {
            category: true,
          }
        },
        questions: {
          include: {
            options: true,
            dependencies: true,
          }
        }
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
  try {
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

    const body = await request.json()
    const { name, description, templateId, fields } = body

    // First, get the template to ensure it exists
    const template = await prisma.documentTemplate.findUnique({
      where: { id: templateId }
    })

    if (!template) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 })
    }

    // Create the questionnaire and its questions in a transaction
    const questionnaire = await prisma.$transaction(async (tx: Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">) => {
      // Create the questionnaire
      const questionnaire = await tx.questionnaire.create({
        data: {
          name,
          description,
          templateId,
        },
      })

      // Create the questions
      for (const field of fields) {
        const question = await tx.question.create({
          data: {
            label: field.label,
            type: field.type,
            required: field.required,
            section: field.section,
            helpText: field.helpText,
            placeholder: field.placeholder,
            questionnaireId: questionnaire.id,
          },
        })

        // Create options if they exist
        if (field.options && field.options.length > 0) {
          await Promise.all(
            field.options.map((option: FieldOption) =>
              tx.questionOption.create({
                data: {
                  value: option.value,
                  label: option.label || option.value,
                  questionId: question.id,
                },
              })
            )
          )
        }

        // Create dependencies if they exist
        if (field.dependencies && field.dependencies.length > 0) {
          await Promise.all(
            field.dependencies.map((dependency: FieldDependency) =>
              tx.questionDependency.create({
                data: {
                  questionId: question.id,
                  dependsOnQuestionId: dependency.dependsOnQuestionId,
                  conditionType: dependency.conditionType,
                  conditionValue: dependency.conditionValue,
                },
              })
            )
          )
        }
      }

      return tx.questionnaire.findUnique({
        where: { id: questionnaire.id },
        include: {
          questions: {
            include: {
              options: true,
              dependencies: true,
            },
          },
        },
      })
    })

    return NextResponse.json(questionnaire)
  } catch (error) {
    console.error("Error creating questionnaire:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
} 