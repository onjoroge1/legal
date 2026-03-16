import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// Try to import Prisma - will be undefined if not set up yet
let prisma: any

try {
  const prismaModule = require("@/lib/prisma")
  prisma = prismaModule.prisma
} catch {
  // Prisma not set up yet
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

        // Calculate documents created this month
        const now = new Date()
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
        const allDocs = [...user.documents, ...user.userDocuments]
        const docsThisMonth = allDocs.filter(
          (doc: any) => new Date(doc.createdAt) >= startOfMonth
        ).length

        // Check if subscription is actually active (status + not expired)
        const isSubActive =
          user.subscriptionStatus === "active" &&
          (!user.subscriptionEndDate || new Date(user.subscriptionEndDate) > now)

        return NextResponse.json({
          totalDocuments: allDocs.length,
          documentsCreated: docsThisMonth,
          subscription: {
            type: user.subscriptionTier || "free",
            status: isSubActive ? "active" : (user.subscriptionStatus === "active" ? "expired" : (user.subscriptionStatus || "inactive")),
            endDate: user.subscriptionEndDate || null,
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
      subscription: {
        type: "free",
        status: "inactive",
        endDate: null,
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

