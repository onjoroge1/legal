import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request, props: { params: Promise<{ token: string }> }) {
  const params = await props.params;
  try {
    const { token } = params

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

    return NextResponse.json(collaborator.document)
  } catch (error) {
    console.error("[Document Review] Error:", error)
    return NextResponse.json(
      { error: "Failed to fetch document" },
      { status: 500 }
    )
  }
} 