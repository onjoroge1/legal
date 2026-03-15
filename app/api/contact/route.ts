import { NextResponse } from "next/server"
import { sendEmail } from "@/lib/email-service"

// Simple in-memory rate limiter for the contact form
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000 // 15 minutes
const RATE_LIMIT_MAX = 3 // max 3 submissions per window

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true
  }

  entry.count++
  return false
}

/**
 * Contact form submission
 * POST /api/contact
 */
export async function POST(request: Request) {
  try {
    // Rate limit by IP
    const forwarded = request.headers.get("x-forwarded-for")
    const ip = forwarded?.split(",")[0]?.trim() || "unknown"

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again in a few minutes." },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required: name, email, subject, message" },
        { status: 400 }
      )
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      )
    }

    // Limit field lengths
    if (name.length > 200 || email.length > 320 || subject.length > 500 || message.length > 5000) {
      return NextResponse.json(
        { error: "One or more fields exceed maximum length" },
        { status: 400 }
      )
    }

    const supportEmail = process.env.SUPPORT_EMAIL || "support@legallawdocs.com"

    // Send notification email to support team
    const notificationSent = await sendEmail({
      to: supportEmail,
      subject: `[Contact Form] ${subject}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e293b; border-bottom: 2px solid #c29342; padding-bottom: 12px;">
            New Contact Form Submission
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #475569; width: 100px;">Name:</td>
              <td style="padding: 8px 0; color: #1e293b;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #475569;">Email:</td>
              <td style="padding: 8px 0; color: #1e293b;">
                <a href="mailto:${escapeHtml(email)}" style="color: #3b82f6;">${escapeHtml(email)}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #475569;">Subject:</td>
              <td style="padding: 8px 0; color: #1e293b;">${escapeHtml(subject)}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
            <p style="font-weight: 600; color: #475569; margin: 0 0 8px;">Message:</p>
            <p style="color: #1e293b; white-space: pre-wrap; margin: 0;">${escapeHtml(message)}</p>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #94a3b8;">
            Sent from LegalLawDocs.com contact form
          </p>
        </div>
      `,
    })

    // Send auto-reply to the user
    await sendEmail({
      to: email,
      subject: `We received your message - ${subject}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e293b;">Thank you for contacting us, ${escapeHtml(name)}!</h2>
          <p style="color: #475569; line-height: 1.6;">
            We have received your message and will get back to you within 24 business hours.
          </p>
          <p style="color: #475569; line-height: 1.6;">
            If your matter is urgent, you can also reach us directly at
            <a href="mailto:${supportEmail}" style="color: #3b82f6;">${supportEmail}</a>.
          </p>
          <div style="margin-top: 24px; padding: 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
            <p style="font-weight: 600; color: #475569; margin: 0 0 8px;">Your message:</p>
            <p style="color: #64748b; font-style: italic; margin: 0;">${escapeHtml(subject)}</p>
            <p style="color: #475569; white-space: pre-wrap; margin: 8px 0 0;">${escapeHtml(message)}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="font-size: 12px; color: #94a3b8;">
            This is an automated response from LegalLawDocs.com. Please do not reply to this email.
          </p>
        </div>
      `,
    })

    return NextResponse.json({
      success: true,
      message: "Your message has been sent. We'll get back to you within 24 hours.",
      emailSent: notificationSent,
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    )
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}
