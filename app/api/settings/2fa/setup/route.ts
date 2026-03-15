import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// Try to import Prisma and speakeasy
let prisma: any
let speakeasy: any
let qrcode: any

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

try {
  qrcode = require("qrcode")
} catch {
  // qrcode not installed
}

/**
 * Setup two-factor authentication
 * POST /api/settings/2fa/setup
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

    if (!prisma || !speakeasy || !qrcode) {
      return NextResponse.json(
        { error: "2FA setup not available. Please install required packages." },
        { status: 503 }
      )
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, email: true, twoFactorSecret: true, twoFactorEnabled: true },
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // If 2FA is already enabled, return existing secret
    if (user.twoFactorEnabled && user.twoFactorSecret) {
      // Generate QR code for existing secret
      const otpauthUrl = speakeasy.otpauthURL({
        secret: user.twoFactorSecret,
        label: `LegalLawDocs (${user.email})`,
        issuer: "LegalLawDocs",
        encoding: "base32",
      })

      const qrCodeDataUrl = await qrcode.toDataURL(otpauthUrl)

      return NextResponse.json({
        secret: user.twoFactorSecret,
        qrCode: qrCodeDataUrl,
        message: "2FA is already enabled. Here's your QR code.",
      })
    }

    // Generate new secret
    const secret = speakeasy.generateSecret({
      name: `LegalLawDocs (${user.email})`,
      issuer: "LegalLawDocs",
      length: 32,
    })

    // Generate QR code
    const qrCodeDataUrl = await qrcode.toDataURL(secret.otpauth_url!)

    // Save secret to database (but don't enable 2FA yet - user needs to verify first)
    await prisma.user.update({
      where: { email: session.user.email },
      data: { twoFactorSecret: secret.base32 },
    })

    return NextResponse.json({
      secret: secret.base32,
      qrCode: qrCodeDataUrl,
      message: "2FA setup initiated. Please verify with a code from your authenticator app.",
    })
  } catch (error) {
    console.error("2FA setup error:", error)
    return NextResponse.json(
      { error: "Failed to setup 2FA" },
      { status: 500 }
    )
  }
}




