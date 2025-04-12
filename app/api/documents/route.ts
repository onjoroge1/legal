import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    console.log("[Document Creation] Starting document creation process")
    const session = await getServerSession(authOptions)
    console.log("[Document Creation] Session:", session)
    
    if (!session?.user?.email) {
      console.log("[Document Creation] No session found, returning 401")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("[Document Creation] Session found for user:", session.user.email)
    const body = await req.json()
    console.log("[Document Creation] Request body:", body)
    const { title, type, category, jurisdiction, description, state, content, parties } = body

    // Validate required fields
    if (!title || !type || !content) {
      console.log("[Document Creation] Missing required fields")
      return NextResponse.json({ 
        error: "Missing required fields",
        details: {
          title: !title,
          type: !type,
          content: !content
        }
      }, { status: 400 })
    }

    console.log("[Document Creation] Received document data:", { 
      title, 
      type, 
      category,
      jurisdiction,
      description, 
      state, 
      partiesCount: parties?.length 
    })

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      console.log("[Document Creation] User not found in database")
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    try {
      console.log("[Document Creation] Creating document for user:", user.id)
      const documentData = {
        title,
        type,
        category,
        jurisdiction,
        description,
        state,
        content,
        status: "draft",
        userId: user.id,
      }

      // Create the document first
      const document = await prisma.document.create({
        data: documentData,
      })

      // If there are parties, create them separately
      if (parties?.length > 0) {
        await prisma.documentParty.createMany({
          data: parties.map((party: any) => ({
            name: party.name || "",
            type: party.type || "individual",
            address: party.address || "",
            email: party.email || "",
            documentId: document.id,
          })),
        })
      }

      // Fetch the complete document with parties
      const completeDocument = await prisma.document.findUnique({
        where: { id: document.id },
        include: { parties: true },
      })

      console.log("[Document Creation] Document created successfully:", document.id)
      return NextResponse.json(completeDocument)
    } catch (dbError) {
      console.error("[Document Creation] Database error:", dbError)
      return NextResponse.json({ 
        error: "Failed to create document in database",
        details: dbError instanceof Error ? dbError.message : "Unknown database error"
      }, { status: 500 })
    }
  } catch (error) {
    console.error("[Document Creation] Error creating document:", error)
    return NextResponse.json(
      { 
        error: "Failed to create document",
        details: error instanceof Error ? error.message : "Unknown error"
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
      console.log("[Document Fetch] No session found, returning 401")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("[Document Fetch] Session found for user:", session.user.email)
    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")
    const type = searchParams.get("type")
    const search = searchParams.get("search")
    console.log("[Document Fetch] Query parameters:", { status, type, search })

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      console.log("[Document Fetch] User not found in database")
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    console.log("[Document Fetch] Fetching documents for user:", user.id)
    const where = {
      userId: user.id,
      ...(status && { status }),
      ...(type && { type }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      }),
    }

    const documents = await prisma.document.findMany({
      where,
      include: {
        parties: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    })

    console.log("[Document Fetch] Found documents:", documents.length)
    return NextResponse.json(documents)
  } catch (error) {
    console.error("[Document Fetch] Error fetching documents:", error)
    return NextResponse.json(
      { error: "Failed to fetch documents" },
      { status: 500 }
    )
  }
} 