import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// PATCH /api/admin/questionnaires/[questionnaireId] - Update a questionnaire
export async function PATCH(
  req: Request,
  context: { params: Promise<{ questionnaireId: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    if (!user?.isAdmin) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { name, description, categoryId } = body

    const params = await context.params
    const { questionnaireId } = params

    // Update questionnaire
    const questionnaire = await prisma.documentTemplate.update({
      where: { id: questionnaireId },
      data: {
        name,
        description,
        categoryId
      },
      include: {
        category: {
          select: {
            name: true
          }
        }
      }
    })

    return NextResponse.json(questionnaire)
  } catch (error) {
    console.error("[ADMIN_QUESTIONNAIRES_PATCH]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

// DELETE /api/admin/questionnaires/[questionnaireId] - Delete a questionnaire
export async function DELETE(
  req: Request,
  context: { params: Promise<{ questionnaireId: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    if (!user?.isAdmin) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const params = await context.params
    const { questionnaireId } = params

    // Delete questionnaire
    await prisma.documentTemplate.delete({
      where: { id: questionnaireId }
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("[ADMIN_QUESTIONNAIRES_DELETE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 