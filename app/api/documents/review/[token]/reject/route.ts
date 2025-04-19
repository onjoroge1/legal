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

    // Update the collaborator with rejection status and comments
    const updatedMetadata = {
      reviewToken: token,
      status: "rejected",
      comments,
      reviewedAt: new Date().toISOString()
    }

    await prisma.$executeRaw`
      UPDATE DocumentCollaborator 
      SET metadata = json(${JSON.stringify(updatedMetadata)})
      WHERE id = ${collaborator.id}
    `

    // Update document status to needs revision
    await prisma.document.update({
      where: { id: document.id },
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