import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// PATCH /api/admin/templates/[templateId] - Update a template
export async function PATCH(
  request: Request,
  { params }: { params: { templateId: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.isAdmin) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const body = await request.json()
    const { name, description, categoryId } = body

    const template = await prisma.template.update({
      where: {
        id: params.templateId,
      },
      data: {
        name,
        description,
        categoryId,
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    })

    return NextResponse.json(template)
  } catch (error) {
    console.error("Error updating template:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

// DELETE /api/admin/templates/[templateId] - Delete a template
export async function DELETE(
  request: Request,
  { params }: { params: { templateId: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.isAdmin) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    await prisma.template.delete({
      where: {
        id: params.templateId,
      },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("Error deleting template:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
} 