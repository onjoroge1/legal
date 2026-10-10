import { readJson, requestError } from "@/lib/request-guard"
import { guardAccount } from "@/lib/request-budget"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import bcrypt from "bcryptjs"
import * as z from "zod"
import { prisma } from "@/lib/prisma"
import { parseActiveSessions, serializeActiveSessions } from "@/lib/session-tracker"

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters").max(200),
  confirmPassword: z.string().min(1, "Please confirm your new password"),
}).strict().refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

/**
 * Change user password
 * POST /api/settings/password
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

    const body = await readJson(request, 4096)
    const { currentPassword, newPassword } = changePasswordSchema.parse(body)
    await guardAccount(request)

    // Get user with password
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        password: true,
        activeSessions: true,
      },
    })

    if (!user || !user.password) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, user.password)

    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 400 }
      )
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12)

    // Update password
    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        password: hashedPassword,
        lastPasswordChange: new Date(),
        activeSessions: serializeActiveSessions(
          parseActiveSessions(user.activeSessions).filter((item) => item.id === session.sessionId)
        ),
      },
    })

    return NextResponse.json({
      message: "Password changed successfully",
    })
  } catch (error) {
    const rejected = requestError(error)
    if (rejected) return rejected
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      )
    }

    console.error("Password change error:")
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}



