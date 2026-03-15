import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

/**
 * Get document by ID
 * GET /api/documents/by-id/[id]
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { id } = await params

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // Get document
    const document = await prisma.userDocument.findFirst({
      where: {
        id,
        userId: user.id,
        deletedAt: null,
      },
      include: {
        parties: {
          select: {
            id: true,
            name: true,
            type: true,
            email: true,
          },
        },
      },
    })

    if (!document) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(document)
  } catch (error) {
    console.error("Get document error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

/**
 * Update document
 * PATCH /api/documents/by-id/[id]
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { id } = await params
    const body = await request.json()
    const { content, title, status, metadata } = body

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // Update document
    const document = await prisma.userDocument.updateMany({
      where: {
        id,
        userId: user.id,
        deletedAt: null,
      },
      data: {
        ...(content !== undefined && { content }),
        ...(title !== undefined && { title }),
        ...(status !== undefined && { status }),
        ...(metadata !== undefined && { metadata }),
        updatedAt: new Date(),
      },
    })

    if (document.count === 0) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Update document error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

/**
 * Soft-delete document
 * DELETE /api/documents/by-id/[id]
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { id } = await params

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // Soft-delete document (set deletedAt)
    const result = await prisma.userDocument.updateMany({
      where: {
        id,
        userId: user.id,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
        status: "deleted",
      },
    })

    if (result.count === 0) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, message: "Document deleted successfully" })
  } catch (error) {
    console.error("Delete document error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

