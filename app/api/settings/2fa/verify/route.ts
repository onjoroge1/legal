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
} catch (error) {
  console.log("Prisma not available")
}

try {
  speakeasy = require("speakeasy")
} catch (error) {
  console.log("speakeasy not installed")
}

const verify2FASchema = z.object({
  token: z.string().length(6, "Token must be 6 digits"),
})

/**
 * Verify two-factor authentication token
 * POST /api/settings/2fa/verify
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
        { error: "2FA verification not available" },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { token } = verify2FASchema.parse(body)

    // Get user with 2FA secret
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, twoFactorSecret: true },
    })

    if (!user || !user.twoFactorSecret) {
      return NextResponse.json(
        { error: "2FA not set up. Please set up 2FA first." },
        { status: 400 }
      )
    }

    // Verify token
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token,
      window: 2, // Allow tokens from ±2 time steps (60 seconds each)
    })

    if (!verified) {
      return NextResponse.json(
        { error: "Invalid verification code" },
        { status: 400 }
      )
    }

    // Enable 2FA
    await prisma.user.update({
      where: { email: session.user.email },
      data: { twoFactorEnabled: true },
    })

    return NextResponse.json({
      message: "2FA verified and enabled successfully",
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      )
    }

    console.error("2FA verification error:", error)
    return NextResponse.json(
      { error: "Failed to verify 2FA" },
      { status: 500 }
    )
  }
}

