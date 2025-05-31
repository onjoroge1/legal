import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Find the SWOT analysis template
    const template = await prisma.documentTemplate.findFirst({
      where: {
        code: 'swot-analysis'
      }
    })

    if (!template) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 })
    }

    // Create a test questionnaire
    const questionnaire = await prisma.questionnaire.create({
      data: {
        name: "SWOT Analysis Questionnaire",
        description: "A comprehensive questionnaire to gather information for SWOT analysis",
        templateId: template.id,
        questions: {
          create: [
            // Strengths Section
            {
              label: "What are your key strengths?",
              type: "textarea",
              required: true,
              section: "Strengths",
              helpText: "List the internal positive attributes that give you an advantage",
              placeholder: "e.g., Strong brand recognition, Skilled workforce, etc."
            },
            {
              label: "What unique resources do you have?",
              type: "textarea",
              required: false,
              section: "Strengths",
              helpText: "Consider physical, financial, human, and intellectual resources"
            },
            {
              label: "What advantages do you have over competitors?",
              type: "textarea",
              required: true,
              section: "Strengths",
              helpText: "Think about what makes you stand out in the market"
            },

            // Weaknesses Section
            {
              label: "What areas need improvement?",
              type: "textarea",
              required: true,
              section: "Weaknesses",
              helpText: "Identify internal factors that put you at a disadvantage",
              placeholder: "e.g., Limited resources, Outdated technology, etc."
            },
            {
              label: "What do competitors do better than you?",
              type: "textarea",
              required: false,
              section: "Weaknesses",
              helpText: "Be honest about where you lag behind"
            },
            {
              label: "What resources are you lacking?",
              type: "textarea",
              required: false,
              section: "Weaknesses",
              helpText: "Consider what you need but don't have"
            },

            // Opportunities Section
            {
              label: "What market trends could benefit you?",
              type: "textarea",
              required: true,
              section: "Opportunities",
              helpText: "Identify external factors that could create opportunities",
              placeholder: "e.g., Growing market, New technology, etc."
            },
            {
              label: "What changes in technology could help?",
              type: "textarea",
              required: false,
              section: "Opportunities",
              helpText: "Consider technological advancements that could be leveraged"
            },
            {
              label: "What new markets could you enter?",
              type: "textarea",
              required: false,
              section: "Opportunities",
              helpText: "Think about potential new customer segments or geographic areas"
            },

            // Threats Section
            {
              label: "What are your main competitors doing?",
              type: "textarea",
              required: true,
              section: "Threats",
              helpText: "Identify actions by competitors that could threaten your position",
              placeholder: "e.g., New product launches, Price changes, etc."
            },
            {
              label: "What market changes could hurt you?",
              type: "textarea",
              required: true,
              section: "Threats",
              helpText: "Consider external factors that could create challenges"
            },
            {
              label: "What regulatory changes could impact you?",
              type: "textarea",
              required: false,
              section: "Threats",
              helpText: "Think about potential changes in laws or regulations"
            }
          ]
        }
      },
      include: {
        questions: {
          include: {
            options: true,
            dependencies: true
          }
        }
      }
    })

    return NextResponse.json(questionnaire)
  } catch (error) {
    console.error('Error creating test questionnaire:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
} 