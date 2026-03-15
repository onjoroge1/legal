import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendEmail } from "@/lib/email-service"
import crypto from "crypto"
import { resetPasswordRateLimit, getClientIp, rateLimitResponse } from "@/lib/rate-limit"

export async function POST(request: Request) {
  // Rate limit: 3 requests per 30 minutes
  const ip = getClientIp(request)
  const limit = resetPasswordRateLimit(ip)
  if (!limit.success) return rateLimitResponse(limit.resetAt)

  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    // Always return success to prevent email enumeration
    const successResponse = NextResponse.json({
      message: "If an account with that email exists, a password reset link has been sent.",
    })

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return successResponse
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex")
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    })

    // Send reset email
    const baseUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`

    await sendEmail({
      to: email,
      subject: "Reset Your Password — LegalLawDocs",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f9fafb;">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <div style="background: white; border-radius: 8px; padding: 40px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <h1 style="color: #1a1a1a; margin-bottom: 16px; font-size: 24px;">Reset Your Password</h1>
                <p>Hi ${user.name || "there"},</p>
                <p>We received a request to reset your password for your LegalLawDocs account.</p>
                <p>Click the button below to set a new password. This link will expire in 1 hour.</p>
                <p style="text-align: center; margin: 32px 0;">
                  <a href="${resetUrl}" style="background-color: #d97706; color: white; padding: 12px 32px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600;">
                    Reset Password
                  </a>
                </p>
                <p style="color: #666; font-size: 14px;">If you didn't request this, you can safely ignore this email. Your password will remain unchanged.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
                <p style="color: #999; font-size: 12px;">LegalLawDocs.com — AI-Powered Legal Documents</p>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    return successResponse
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json(
      { error: "An error occurred. Please try again." },
      { status: 500 }
    )
  }
}
