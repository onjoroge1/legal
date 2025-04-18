import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

interface RawCollaborator {
  id: string
  documentId: string
  userId: string
  role: string
  metadata: string | null
  createdAt: Date
  updatedAt: Date
}

export async function POST(req: Request, props: { params: Promise<{ token: string }> }) {
  const params = await props.params;
  try {
    const { token } = params
    const { comments } = await req.json()

    // Find the document collaborator with the review token using raw SQL
    const collaborators = await prisma.$queryRaw<RawCollaborator[]>`
      SELECT * FROM DocumentCollaborator 
      WHERE json_extract(metadata, '$.reviewToken') = ${token}
    `

    const collaborator = collaborators[0]

    if (!collaborator) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 })
    }

    // Get the document details
    const document = await prisma.document.findUnique({
      where: { id: collaborator.documentId }
    })

    if (!document) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 })
    }

    // Update the collaborator with approval status and comments
    const updatedMetadata = {
      reviewToken: token,
      status: "approved",
      comments,
      reviewedAt: new Date().toISOString()
    }

    await prisma.$executeRaw`
      UPDATE DocumentCollaborator 
      SET metadata = json(${JSON.stringify(updatedMetadata)})
      WHERE id = ${collaborator.id}
    `

    // Check if all reviewers have approved using raw SQL
    const reviewers = await prisma.$queryRaw<RawCollaborator[]>`
      SELECT * FROM DocumentCollaborator 
      WHERE documentId = ${document.id} 
      AND role = 'reviewer'
    `

    const allApproved = reviewers.every((r) => {
      try {
        const metadata = r.metadata ? JSON.parse(r.metadata) : null
        return metadata?.status === "approved"
      } catch {
        return false
      }
    })

    if (allApproved) {
      // Update document status to ready for signature
      await prisma.document.update({
        where: { id: document.id },
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