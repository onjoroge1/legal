import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { headers } from "next/headers"

// Try to import Prisma
let prisma: any

try {
  const prismaModule = require("@/lib/prisma")
  prisma = prismaModule.prisma
} catch {
  // Prisma not available
}

/**
 * Get active sessions
 * GET /api/settings/sessions
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

    // Get user's active sessions
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { activeSessions: true },
    })

    const activeSessions = typeof user?.activeSessions === 'string'
      ? JSON.parse(user.activeSessions || '[]')
      : user?.activeSessions || []

    return NextResponse.json({ sessions: activeSessions })
  } catch (error) {
    console.error("Get sessions error:", error)
    return NextResponse.json(
      { error: "Failed to get sessions" },
      { status: 500 }
    )
  }
}

/**
 * Revoke a session
 * DELETE /api/settings/sessions
 */
export async function DELETE(request: Request) {
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
    const { sessionId, revokeAll } = body

    // Get user's active sessions
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { activeSessions: true },
    })

    let activeSessions = typeof user?.activeSessions === 'string'
      ? JSON.parse(user.activeSessions || '[]')
      : user?.activeSessions || []

    if (revokeAll) {
      // Keep only current session
      const currentSessionId = session.user.id // Use user ID as session identifier
      activeSessions = activeSessions.filter((s: any) => s.id === currentSessionId)
    } else if (sessionId) {
      // Remove specific session
      activeSessions = activeSessions.filter((s: any) => s.id !== sessionId)
    }

    // Update user's active sessions
    await prisma.user.update({
      where: { email: session.user.email },
      data: { activeSessions: JSON.stringify(activeSessions) },
    })

    // Note: In a production system, you'd also invalidate the actual NextAuth session tokens
    // This requires additional session management logic

    return NextResponse.json({
      message: revokeAll ? "All other sessions revoked" : "Session revoked",
    })
  } catch (error) {
    console.error("Revoke session error:", error)
    return NextResponse.json(
      { error: "Failed to revoke session" },
      { status: 500 }
    )
  }
}




