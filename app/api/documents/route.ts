import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { requireLegalDisclaimerAcceptance } from "@/lib/legal-disclaimer-server"

// Try to import Prisma - will be undefined if not set up yet
let prisma: any

try {
  const prismaModule = require("@/lib/prisma")
  prisma = prismaModule.prisma
} catch (error) {
  // Prisma not set up yet
  console.log("Prisma not available - documents will return mock data")
}

/**
 * Documents API Route
 * Returns user documents with filtering and pagination
 * 
 * GET /api/documents?status=draft&page=1&limit=10
 */
export async function GET(request: Request) {
  try {
    // Get the current session
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Parse query parameters
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") || "all"
    const type = searchParams.get("type") || "all"
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    const search = searchParams.get("search") || ""

    // If Prisma is available, fetch real data
    if (prisma) {
      try {
        const user = await prisma.user.findUnique({
          where: { email: session.user.email },
        })

        if (!user) {
          return NextResponse.json(
            { error: "User not found" },
            { status: 404 }
          )
        }

        // Build where clause
        const where: any = {
          userId: user.id,
          deletedAt: null,
        }

        if (status !== "all") {
          where.status = status
        }

        if (type !== "all") {
          where.type = type
        }

        if (search) {
          where.OR = [
            { title: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
            { type: { contains: search, mode: "insensitive" } },
          ]
        }

        // Fetch documents with pagination
        const [documents, total] = await Promise.all([
          prisma.userDocument.findMany({
            where,
            orderBy: { createdAt: "desc" },
            skip: (page - 1) * limit,
            take: limit,
            select: {
              id: true,
              title: true,
              type: true,
              category: true,
              status: true,
              description: true,
              createdAt: true,
              updatedAt: true,
            },
          }),
          prisma.userDocument.count({ where }),
        ])

        // Transform documents to include parties
        const documentsWithParties = await Promise.all(
          documents.map(async (doc: any) => {
            const parties = await prisma.documentParty.findMany({
              where: { userDocumentId: doc.id },
              select: {
                id: true,
                name: true,
                type: true,
              },
            })
            return {
              ...doc,
              parties: parties || [],
            }
          })
        )

        return NextResponse.json(documentsWithParties)
      } catch (error) {
        console.error("Database error:", error)
        // Fall through to mock data
      }
    }

    // Return mock data if Prisma is not available
    return NextResponse.json([])
  } catch (error) {
    console.error("Documents API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

/**
 * Create or update a document
 * POST /api/documents
 */
export async function POST(request: Request) {
  try {
    const acceptanceError = requireLegalDisclaimerAcceptance(request)
    if (acceptanceError) return acceptanceError

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
    const { id, title, type, category, content, status, metadata, jurisdiction, state, description } = body

    if (!title || !type || !content) {
      return NextResponse.json(
        { error: "Title, type, and content are required" },
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

    // If ID provided, update existing document
    if (id) {
      const existingDoc = await prisma.userDocument.findFirst({
        where: {
          id,
          userId: user.id,
        },
      })

      if (!existingDoc) {
        return NextResponse.json(
          { error: "Document not found" },
          { status: 404 }
        )
      }

      const updated = await prisma.userDocument.update({
        where: { id },
        data: {
          title,
          type,
          category: category || null,
          jurisdiction: jurisdiction || null,
          state: state || null,
          description: description || null,
          content,
          status: status || existingDoc.status,
          metadata: metadata || existingDoc.metadata,
          updatedAt: new Date(),
        },
      })

      return NextResponse.json({
        id: updated.id,
        message: "Document updated successfully",
      })
    }

    // Create new document
    const document = await prisma.userDocument.create({
      data: {
        title,
        type,
        category: category || null,
        jurisdiction: jurisdiction || null,
        state: state || null,
        description: description || null,
        content,
        status: status || "draft",
        metadata: metadata || {},
        userId: user.id,
      },
    })

    return NextResponse.json({
      id: document.id,
      message: "Document created successfully",
    })
  } catch (error) {
    console.error("Create document error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
