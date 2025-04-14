import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(
  req: Request,
  { params }: { params: { token: string } }
) {
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

    // Update the collaborator with approval status and comments
    await prisma.documentCollaborator.update({
      where: { id: collaborator.id },
      data: {
        metadata: {
          ...collaborator.metadata,
          status: "approved",
          comments,
          reviewedAt: new Date().toISOString()
        }
      }
    })

    // Check if all reviewers have approved
    const allCollaborators = await prisma.documentCollaborator.findMany({
      where: {
        documentId: collaborator.documentId,
        role: "reviewer"
      }
    })

    const allApproved = allCollaborators.every(
      (c) => c.metadata?.status === "approved"
    )

    if (allApproved) {
      // Update document status to ready for signature
      await prisma.document.update({
        where: { id: collaborator.documentId },
        data: { status: "ready_for_signature" }
      })
    }

    return NextResponse.json({ message: "Document approved successfully" })
  } catch (error) {
    console.error("[Document Review] Error:", error)
    return NextResponse.json(
      { error: "Failed to approve document" },
      { status: 500 }
    )
  }
} 