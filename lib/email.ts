import { Resend } from "resend"

if (!process.env.RESEND_API_KEY) {
  console.warn("[Email] RESEND_API_KEY is not configured. Email functionality will be disabled.")
} else {
  console.log("[Email] Resend API key configured successfully")
}

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

interface SendVerificationEmailParams {
  to: string
  name: string
  verificationToken: string
}

interface SendPasswordResetEmailParams {
  to: string
  name: string
  resetToken: string
}

export async function sendVerificationEmail({
  to,
  name,
  verificationToken,
}: SendVerificationEmailParams) {
  console.log("[Email] Starting verification email process for:", to)
  
  if (!resend) {
    console.warn("[Email] Skipping verification email - Resend is not configured")
    return
  }

  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${verificationToken}`
  console.log("[Email] Generated verification URL:", verificationUrl)

  try {
    console.log("[Email] Attempting to send verification email")
    const result = await resend.emails.send({
      from: "Legal Law Docs <noreply@legallawdocs.com>",
      to,
      subject: "Verify your email address",
      html: `
        <div>
          <h1>Welcome to Legal Law Docs!</h1>
          <p>Hi ${name},</p>
          <p>Thank you for signing up. Please verify your email address by clicking the link below:</p>
          <p><a href="${verificationUrl}">${verificationUrl}</a></p>
          <p>This link will expire in 24 hours.</p>
          <p>If you didn't create an account, you can safely ignore this email.</p>
        </div>
      `,
    })
    console.log("[Email] Verification email sent successfully:", result)
  } catch (error) {
    console.error("[Email] Error sending verification email:", error)
    throw new Error("Failed to send verification email")
  }
}

export async function sendPasswordResetEmail({
  to,
  name,
  resetToken,
}: SendPasswordResetEmailParams) {
  console.log("[Email] Starting password reset email process for:", to)
  
  if (!resend) {
    console.warn("[Email] Skipping password reset email - Resend is not configured")
    return
  }

  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`
  console.log("[Email] Generated reset URL:", resetUrl)

  try {
    console.log("[Email] Attempting to send password reset email")
    const result = await resend.emails.send({
      from: "Legal Law Docs <noreply@legallawdocs.com>",
      to,
      subject: "Reset your password",
      html: `
        <div>
          <h1>Reset Your Password</h1>
          <p>Hi ${name},</p>
          <p>We received a request to reset your password. Click the link below to create a new password:</p>
          <p><a href="${resetUrl}">${resetUrl}</a></p>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request a password reset, you can safely ignore this email.</p>
        </div>
      `,
    })
    console.log("[Email] Password reset email sent successfully:", result)
  } catch (error) {
    console.error("[Email] Error sending password reset email:", error)
    throw new Error("Failed to send password reset email")
  }
} 