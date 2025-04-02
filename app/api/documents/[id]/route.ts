import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log("[Document API] GET request received for document ID:", params.id)
    console.log("[Document API] Request URL:", req.url)
    console.log("[Document API] Request method:", req.method)
    console.log("[Document API] Request headers:", Object.fromEntries(req.headers.entries()))
    
    const session = await getServerSession(authOptions)
    console.log("[Document API] Session:", session ? "Found" : "Not found")
    
    if (!session?.user?.email) {
      console.log("[Document API] No session found, returning 401")
      return NextResponse.json(
        { error: "You must be signed in to view this document" },
        { status: 401 }
      )
    }

    console.log("[Document API] Session found for user:", session.user.email)
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      console.log("[Document API] User not found in database")
      return NextResponse.json(
        { error: "User not found in database" },
        { status: 404 }
      )
    }

    console.log("[Document API] Fetching document for user:", user.id)
    const document = await prisma.document.findUnique({
      where: {
        id: params.id,
        userId: user.id,
      },
      include: {
        parties: true,
      },
    })

    if (!document) {
      console.log("[Document API] Document not found")
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      )
    }

    console.log("[Document API] Document found:", document.id)
    return NextResponse.json(document)
  } catch (error) {
    console.error("[Document API] Error processing request:", error)
    return NextResponse.json(
      { error: "An error occurred while fetching the document" },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const body = await req.json()
    const { title, type, description, state, content } = body

    const document = await prisma.document.update({
      where: {
        id: params.id,
        userId: user.id,
      },
      data: {
        title,
        type,
        description,
        state,
        content,
      },
      include: {
        parties: true,
      },
    })

    return NextResponse.json(document)
  } catch (error) {
    console.error("Error updating document:", error)
    return NextResponse.json(
      { error: "Failed to update document" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    await prisma.document.delete({
      where: {
        id: params.id,
        userId: user.id,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting document:", error)
    return NextResponse.json(
      { error: "Failed to delete document" },
      { status: 500 }
    )
  }
} 