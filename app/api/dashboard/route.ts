import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// Try to import Prisma - will be undefined if not set up yet
let prisma: any

try {
  const prismaModule = require("@/lib/prisma")
  prisma = prismaModule.prisma
} catch (error) {
  // Prisma not set up yet
  console.log("Prisma not available - dashboard will return mock data")
}

/**
 * Dashboard API Route
 * Returns dashboard data for the authenticated user
 * 
 * GET /api/dashboard
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

    // If Prisma is available, fetch real data
    if (prisma) {
      try {
        const user = await prisma.user.findUnique({
          where: { email: session.user.email },
          include: {
            documents: {
              take: 5,
              orderBy: { createdAt: "desc" },
              where: { deletedAt: null },
            },
            userDocuments: {
              take: 5,
              orderBy: { createdAt: "desc" },
              where: { deletedAt: null },
            },
          },
        })

        if (!user) {
          return NextResponse.json(
            { error: "User not found" },
            { status: 404 }
          )
        }

        // Calculate storage (placeholder - implement based on your needs)
        const storageUsed = 0 // Calculate from documents
        const storageLimit = user.subscriptionTier === "free" ? 100 : 1000 // MB

        return NextResponse.json({
          totalDocuments: user.documents.length + user.userDocuments.length,
          documentsCreated: user.userDocuments.length,
          storage: {
            used: storageUsed,
            total: storageLimit,
          },
          subscription: {
            type: user.subscriptionTier || "free",
            status: user.subscriptionStatus || "inactive",
          },
          recentDocuments: [
            ...user.documents.map((doc: any) => ({
              id: doc.id,
              title: doc.title,
              type: doc.type,
              createdAt: doc.createdAt,
              status: doc.status,
              metadata: doc.metadata || {},
            })),
            ...user.userDocuments.map((doc: any) => ({
              id: doc.id,
              title: doc.title,
              type: doc.type,
              createdAt: doc.createdAt,
              status: doc.status || "draft",
              metadata: doc.metadata || {},
            })),
          ]
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 5),
        })
      } catch (error) {
        console.error("Database error:", error)
        // Fall through to mock data
      }
    }

    // Return mock data if Prisma is not available
    return NextResponse.json({
      totalDocuments: 0,
      documentsCreated: 0,
      storage: {
        used: 0,
        total: 100,
      },
      subscription: {
        type: "free",
        status: "inactive",
      },
      recentDocuments: [],
    })
  } catch (error) {
    console.error("Dashboard API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

