import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
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

    // Return mock data for storage and subscription
    return NextResponse.json({
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
      recentDocuments: documents.map(doc => ({
        id: doc.id,
        title: doc.title,
        createdAt: doc.createdAt.toISOString(),
        type: doc.type,
      })),
    })
  } catch (error) {
    console.log("✅ Entered catch block after Prisma failure")
    
    if (error instanceof Error) {
      console.error("[Dashboard] Error:", error.message)
      console.error("[Dashboard] Stack:", error.stack)
    } else {
      console.error("[Dashboard] Unknown error:", error)
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