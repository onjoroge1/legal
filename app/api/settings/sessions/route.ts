import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

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

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { activeSessions: true },
    })

    const activeSessions = typeof user?.activeSessions === "string"
      ? JSON.parse(user.activeSessions || "[]")
      : user?.activeSessions || []

    return NextResponse.json({ sessions: activeSessions })
  } catch (error) {
    console.error("Get sessions error:", error)
    return NextResponse.json({ error: "Failed to get sessions" }, { status: 500 })
  }
}

/**
 * DELETE /api/settings/sessions
 * Removes sessions from the tracking list and increments jwtVersion so all
 * previously-issued JWTs for this user fail the version check and are rejected.
 */
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { sessionId, revokeAll } = await request.json()

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { activeSessions: true, jwtVersion: true },
    })

    let activeSessions = typeof user?.activeSessions === "string"
      ? JSON.parse(user.activeSessions || "[]")
      : user?.activeSessions || []

    if (revokeAll) {
      activeSessions = []
    } else if (sessionId) {
      activeSessions = activeSessions.filter((s: any) => s.id !== sessionId)
    }

    // Increment jwtVersion — any JWT carrying the old version will be rejected
    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        activeSessions: JSON.stringify(activeSessions),
        jwtVersion: { increment: 1 },
      },
    })

    return NextResponse.json({
      message: revokeAll ? "All sessions revoked" : "Session revoked",
    })
  } catch (error) {
    console.error("Revoke session error:", error)
    return NextResponse.json({ error: "Failed to revoke session" }, { status: 500 })
  }
}




