import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import * as z from "zod"

// Try to import Prisma and speakeasy
let prisma: any
let speakeasy: any

try {
  const prismaModule = require("@/lib/prisma")
  prisma = prismaModule.prisma
} catch {
  // Prisma not available
}

try {
  speakeasy = require("speakeasy")
} catch {
  // speakeasy not installed
}

const disable2FASchema = z.object({
  token: z.string().length(6, "Token must be 6 digits"),
})

/**
 * Disable two-factor authentication
 * POST /api/settings/2fa/disable
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

    if (!prisma || !speakeasy) {
      return NextResponse.json(
        { error: "2FA disable not available" },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { token } = disable2FASchema.parse(body)

    // Get user with 2FA secret
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, twoFactorSecret: true, twoFactorEnabled: true },
    })

    if (!user || !user.twoFactorSecret || !user.twoFactorEnabled) {
      return NextResponse.json(
        { error: "2FA is not enabled" },
        { status: 400 }
      )
    }

    // Verify token before disabling
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token,
      window: 2,
    })

    if (!verified) {
      return NextResponse.json(
        { error: "Invalid verification code" },
        { status: 400 }
      )
    }

    // Disable 2FA and clear secret
    await prisma.user.update({
      where: { email: session.user.email },
      data: { 
        twoFactorEnabled: false,
        twoFactorSecret: null,
      },
    })

    return NextResponse.json({
      message: "2FA disabled successfully",
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      )
    }

    console.error("2FA disable error:", error)
    return NextResponse.json(
      { error: "Failed to disable 2FA" },
      { status: 500 }
    )
  }
}




