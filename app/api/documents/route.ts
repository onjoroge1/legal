import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    console.log("[Document Creation] Starting document creation process")
    console.log("[Document Creation] Request URL:", req.url)
    
    // Log the request body
    const body = await req.json()
    console.log("[Document Creation] Received body:", body)
    
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, type, jurisdiction, description, state, content, parties, status, metadata } = body

    // Validate required fields
    if (!title || !type || !content || !status) {
      return NextResponse.json({ 
        error: "Missing required fields",
        details: {
          title: !title,
          type: !type,
          content: !content,
          status: !status
        }
      }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Create the document with all fields
    const documentData = {
      title,
      type,
      content,
      userId: user.id,
      status,
      metadata: metadata || {},
      ...(jurisdiction && { jurisdiction }),
      ...(description && { description }),
      ...(state && { state })
    }

    console.log("[Document Creation] Creating document with data:", documentData)

    const document = await prisma.document.create({
      data: {
        ...documentData,
        parties: {
          create: parties?.map((party: { name: string; type: string; address?: string; email?: string }) => ({
            name: party.name,
            type: party.type,
            address: party.address,
            email: party.email
          })) || []
        }
      },
      include: {
        parties: true
      }
    })

    console.log("[Document Creation] Document created successfully:", document.id)
    return NextResponse.json(document)
  } catch (error) {
    // Safely log the error without risking null values
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    const errorStack = error instanceof Error ? error.stack : "No stack trace"
    
    console.log("[Document Creation] Error occurred:", errorMessage)
    console.log("[Document Creation] Error stack:", errorStack)

    return NextResponse.json(
      {
        error: "Failed to create document",
        details: errorMessage,
      },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    console.log("[Document Fetch] Starting document fetch process")
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      console.log("[Document Fetch] No session found")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("[Document Fetch] Session found for user:", session.user.email)
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      console.log("[Document Fetch] User not found in database")
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Get query parameters for filtering
    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")
    const type = searchParams.get("type")
    const search = searchParams.get("search")

    console.log("[Document Fetch] Query parameters:", { status, type, search })

    const documents = await prisma.document.findMany({
      where: {
        userId: user.id,
        deletedAt: null,
        ...(status && { status }),
        ...(type && { type }),
        ...(search && {
          OR: [
            { title: { contains: search } },
            { description: { contains: search } },
          ],
        }),
      },
      include: {
        parties: true
      },
      orderBy: {
        updatedAt: "desc"
      }
    })

    console.log("[Document Fetch] Successfully fetched", documents.length, "documents")
    return NextResponse.json(documents)
  } catch (error) {
    console.log("✅ Entered catch block after Prisma failure")
    console.error("[Document Creation] Error:", error)
  
    console.error(
      "[Document Creation] Error stack:",
      error instanceof Error ? error.stack : "No stack trace"
    )
  
    const message =
      error && typeof error === "object" && "message" in error
        ? (error as Error).message
        : "Unknown error"
  
    return NextResponse.json(
      {
        error: "Failed to create document",
        details: message,
      },
      { status: 500 }
    )
  }
} 