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
    const { title, type, description, state, content, parties } = body
    console.log("[Document Creation] Received document data:", { title, type, description, state, partiesCount: parties?.length })

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      console.log("[Document Creation] User not found in database")
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    console.log("[Document Creation] Creating document for user:", user.id)
    const document = await prisma.document.create({
      data: {
        title,
        type,
        description,
        state,
        content,
        status: "draft",
        userId: user.id,
        parties: {
          create: parties.map((party: any) => ({
            name: party.name,
            type: party.type,
            address: party.address,
            email: party.email,
          })),
        },
      },
      include: {
        parties: true,
      },
    })

    console.log("[Document Creation] Document created successfully:", document.id)
    return NextResponse.json(document)
  } catch (error) {
    console.error("[Document Creation] Error creating document:", error)
    return NextResponse.json(
      { error: "Failed to create document" },
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