import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request, props: { params: Promise<{ token: string }> }) {
  const params = await props.params;
  try {
    const { token } = params
    const { comments } = await req.json()

    // Find the document collaborator with the review token
    const collaborator = await prisma.documentCollaborator.findFirst({
      where: {
        metadata: {
          path: ["reviewToken"],
          equals: token
        }
      },
      include: {
        document: true
      }
    })

    if (!collaborator) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 })
    }

    // Update the collaborator with rejection status and comments
    await prisma.documentCollaborator.update({
      where: { id: collaborator.id },
      data: {
        metadata: {
          ...collaborator.metadata,
          status: "rejected",
          comments,
          reviewedAt: new Date().toISOString()
        }
      }
    })

    // Update document status to needs revision
    await prisma.document.update({
      where: { id: collaborator.documentId },
      data: { status: "needs_revision" }
    })

    return NextResponse.json({ message: "Document rejected successfully" })
  } catch (error) {
    console.error("[Document Review] Error:", error)
    return NextResponse.json(
      { error: "Failed to reject document" },
      { status: 500 }
    )
  }
} 