import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendEmail } from "@/lib/email-service"
import crypto from "crypto"
import { z } from "zod"

const requestResetSchema = z.object({
  email: z.string().trim().email().transform((value) => value.toLowerCase()),
})

const successResponse = () => NextResponse.json({ success: true })

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
  })[character]!)
}

export async function POST(request: Request) {
  try {
    const { email } = requestResetSchema.parse(await request.json())

    const user = await prisma.user.findUnique({ where: { email } })

    // Always return success to prevent email enumeration
    if (!user) {
      return successResponse()
    }

    const token = crypto.randomBytes(32).toString("hex")
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex")
    const expiry = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken: hashedToken, resetTokenExpiry: expiry },
    })

    const appUrl = new URL(process.env.NEXTAUTH_URL || "")
    const resetUrl = new URL("/reset-password", appUrl)
    resetUrl.searchParams.set("token", token)
    const safeResetUrl = escapeHtml(resetUrl.toString())
    const safeName = escapeHtml(user.name || "there")

    await sendEmail({
      to: email,
      subject: "Reset your LegalLawDocs password",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #1e40af;">Reset your password</h1>
          <p>Hi ${safeName},</p>
          <p>We received a request to reset your password. Click the button below to create a new one. This link expires in 1 hour.</p>
          <p style="margin: 30px 0;">
            <a href="${safeResetUrl}" style="background-color: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
              Reset Password
            </a>
          </p>
          <p>If you didn't request this, you can safely ignore this email.</p>
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            If the button doesn't work, copy this link: ${safeResetUrl}
          </p>
        </div>
      `,
    })

    return successResponse()
  } catch (error) {
    console.error("Forgot password error:", error)
    // Keep the public response identical so this endpoint cannot be used to
    // distinguish registered addresses from unregistered ones.
    return successResponse()
  }
}
