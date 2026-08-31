import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { z } from "zod"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { parseActiveSessions, serializeActiveSessions } from "@/lib/session-tracker"

const revokeSchema = z.union([
  z.object({ sessionId: z.string().uuid(), revokeAll: z.never().optional() }),
  z.object({ revokeAll: z.literal(true), sessionId: z.never().optional() }),
])

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email || !session.sessionId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { activeSessions: true },
    })
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

    return NextResponse.json({
      sessions: parseActiveSessions(user.activeSessions).map((item) => ({
        ...item,
        isCurrent: item.id === session.sessionId,
      })),
    })
  } catch (error) {
    console.error("Get sessions error:", error)
    return NextResponse.json({ error: "Failed to get sessions" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email || !session.sessionId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const input = revokeSchema.parse(await request.json())
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { activeSessions: true },
    })
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

    if ("sessionId" in input && input.sessionId === session.sessionId) {
      return NextResponse.json({ error: "Use Sign Out to end the current session" }, { status: 400 })
    }

    const sessions = parseActiveSessions(user.activeSessions)
    const remaining = "revokeAll" in input
      ? sessions.filter((item) => item.id === session.sessionId)
      : sessions.filter((item) => item.id !== input.sessionId)

    await prisma.user.update({
      where: { email: session.user.email },
      data: { activeSessions: serializeActiveSessions(remaining) },
    })

    return NextResponse.json({
      message: "revokeAll" in input ? "All other sessions revoked" : "Session revoked",
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 })
    }
    console.error("Revoke session error:", error)
    return NextResponse.json({ error: "Failed to revoke session" }, { status: 500 })
  }
}
