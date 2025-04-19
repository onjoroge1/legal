import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

interface Document {
  id: string
  title: string
  type: string
  createdAt: Date
}

export const GET = async (request: Request) => {
  try {
    console.log("[Dashboard API] Starting request")
    const session = await getServerSession(authOptions)
    console.log("[Dashboard API] Session:", session)
    
    if (!session?.user?.email) {
      console.log("[Dashboard API] No session or email")
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        email: true,
        name: true,
        isAdmin: true,
      }
    })
    console.log("[Dashboard API] User lookup result:", user)

    if (!user) {
      console.log("[Dashboard API] User not found")
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get the user's documents
    const documents = await prisma.document.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        title: true,
        type: true,
        createdAt: true,
      }
    })
    console.log("[Dashboard API] Found documents:", documents)

    // Get total document count
    const totalDocuments = await prisma.document.count({
      where: { userId: user.id },
    })

    // Get documents created in the last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const documentsCreated = await prisma.document.count({
      where: {
        userId: user.id,
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
    })

    const response = {
      totalDocuments,
      documentsCreated,
      storage: {
        used: 1024 * 1024 * 50, // 50MB
        total: 1024 * 1024 * 100, // 100MB
      },
      subscription: {
        type: "Free",
        status: "active",
      },
      recentDocuments: documents.map((doc: Document) => ({
        id: doc.id,
        title: doc.title,
        createdAt: doc.createdAt.toISOString(),
        type: doc.type,
      })),
    }
    console.log("[Dashboard API] Sending response:", response)
    
    return NextResponse.json(response)
  } catch (error) {
    console.log("[Dashboard API] Entered catch block after error")
    
    if (error instanceof Error) {
      console.error("[Dashboard API] Error:", error.message)
      console.error("[Dashboard API] Stack:", error.stack)
    } else {
      console.error("[Dashboard API] Unknown error:", error)
    }
    
    const message =
      error && typeof error === "object" && "message" in error
        ? (error as Error).message
        : "Unknown error"
    
    return NextResponse.json(
      { error: "Failed to fetch dashboard data", details: message },
      { status: 500 }
    )
  }
} 