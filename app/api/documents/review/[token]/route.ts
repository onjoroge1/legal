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

export async function GET(req: Request, props: { params: Promise<{ token: string }> }) {
  const params = await props.params;
  try {
    const { token } = params

    // Find the collaborator with the given review token using raw SQL
    const collaborators = await prisma.$queryRaw<RawCollaborator[]>`
      SELECT * FROM DocumentCollaborator 
      WHERE json_extract(metadata, '$.reviewToken') = ${token}
    `

    const collaborator = collaborators[0]
    if (!collaborator) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 })
    }

    // Then fetch the document with all its details
    const document = await prisma.document.findUnique({
      where: {
        id: collaborator.documentId
      }
    })

    if (!document) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 })
    }

    return NextResponse.json(document)
  } catch (error) {
    console.error("[Document Review] Error:", error)
    return NextResponse.json(
      { error: "Failed to fetch document" },
      { status: 500 }
    )
  }
} 