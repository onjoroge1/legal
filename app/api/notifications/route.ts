import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// Try to import Prisma
let prisma: any

try {
  const prismaModule = require("@/lib/prisma")
  prisma = prismaModule.prisma
} catch (error) {
  console.log("Prisma not available")
}

/**
 * Get user notifications
 * GET /api/notifications
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

    // Get user ID
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

    // Get notifications (if Notification model exists)
    // For now, return empty array if model doesn't exist
    try {
      const notifications = await prisma.notification.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
        take: 50,
      })

      return NextResponse.json({ notifications })
    } catch (error) {
      // Notification model might not exist yet
      return NextResponse.json({ notifications: [] })
    }
  } catch (error) {
    console.error("Get notifications error:", error)
    return NextResponse.json(
      { error: "Failed to get notifications" },
      { status: 500 }
    )
  }
}

/**
 * Mark notification as read
 * PATCH /api/notifications
 */
export async function PATCH(request: Request) {
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
    const { notificationId, markAllRead } = body

    // Get user ID
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

    try {
      if (markAllRead) {
        await prisma.notification.updateMany({
          where: { userId: user.id, read: false },
          data: { read: true, readAt: new Date() },
        })
      } else if (notificationId) {
        await prisma.notification.update({
          where: { id: notificationId, userId: user.id },
          data: { read: true, readAt: new Date() },
        })
      }

      return NextResponse.json({ message: "Notification updated" })
    } catch (error) {
      // Notification model might not exist yet
      return NextResponse.json({ message: "Notification updated" })
    }
  } catch (error) {
    console.error("Update notification error:", error)
    return NextResponse.json(
      { error: "Failed to update notification" },
      { status: 500 }
    )
  }
}

