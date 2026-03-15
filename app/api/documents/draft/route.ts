import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// Try to import Prisma
let prisma: any

try {
  const prismaModule = require("@/lib/prisma")
  prisma = prismaModule.prisma
} catch {
  // Prisma not available
}

/**
 * Create or update a draft document
 * POST /api/documents/draft
 */
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    if (!prisma) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { 
      documentId, // Optional: if updating existing draft
      title, 
      type, 
      slug,
      category,
      jurisdiction,
      state,
      description,
      metadata = {}
    } = body

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // If documentId provided, update existing draft (title/type optional)
    if (documentId) {
      const existingDoc = await prisma.userDocument.findFirst({
        where: {
          id: documentId,
          userId: user.id,
        },
      })

      if (!existingDoc) {
        return NextResponse.json(
          { error: "Document not found" },
          { status: 404 }
        )
      }

      const updateData: Record<string, any> = {
        metadata: {
          ...(existingDoc.metadata as any),
          ...metadata,
          ...(slug ? { slug } : {}),
          lastUpdated: new Date().toISOString(),
        },
        updatedAt: new Date(),
      }

      // Only update fields that were provided
      if (title) updateData.title = title
      if (type) updateData.type = type
      if (category) updateData.category = category
      if (jurisdiction) updateData.jurisdiction = jurisdiction
      if (state) updateData.state = state
      if (description) updateData.description = description

      const updated = await prisma.userDocument.update({
        where: { id: documentId },
        data: updateData,
      })

      return NextResponse.json({
        id: updated.id,
        message: "Draft updated successfully",
      })
    }

    // Title and type required for new drafts
    if (!title || !type) {
      return NextResponse.json(
        { error: "Title and type are required" },
        { status: 400 }
      )
    }

    // Create new draft document
    const draft = await prisma.userDocument.create({
      data: {
        title,
        type,
        category: category || null,
        jurisdiction: jurisdiction || null,
        state: state || null,
        description: description || null,
        content: "", // Empty content for draft
        status: "draft",
        metadata: {
          ...metadata,
          slug,
          isGenerating: true,
          startedAt: new Date().toISOString(),
        },
        userId: user.id,
      },
    })

    return NextResponse.json({
      id: draft.id,
      message: "Draft created successfully",
    })
  } catch (error) {
    console.error("Create draft error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

/**
 * Get draft document by slug or ID
 * GET /api/documents/draft?slug=... or ?id=...
 */
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    if (!prisma) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 }
      )
    }

    const { searchParams } = new URL(request.url)
    const slug = searchParams.get("slug")
    const id = searchParams.get("id")

    if (!slug && !id) {
      return NextResponse.json(
        { error: "Slug or ID is required" },
        { status: 400 }
      )
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // Find draft document
    let draft

    if (id) {
      draft = await prisma.userDocument.findFirst({
        where: {
          id,
          userId: user.id,
          status: "draft",
          deletedAt: null,
        },
        orderBy: { createdAt: "desc" },
      })
    } else if (slug) {
      // Find all drafts for user and filter by slug in metadata
      const drafts = await prisma.userDocument.findMany({
        where: {
          userId: user.id,
          status: "draft",
          deletedAt: null,
        },
        orderBy: { createdAt: "desc" },
      })

      // Filter by slug in metadata (since Prisma doesn't support JSON path queries easily)
      draft = drafts.find((doc: any) => {
        const metadata = doc.metadata as any
        return metadata?.slug === slug
      })
    }

    if (!draft) {
      return NextResponse.json(
        { error: "Draft not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      id: draft.id,
      title: draft.title,
      type: draft.type,
      status: draft.status,
      metadata: draft.metadata,
    })
  } catch (error) {
    console.error("Get draft error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

