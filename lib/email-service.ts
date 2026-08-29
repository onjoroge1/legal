// Email service using Resend API
// Install: npm install resend

import { generatePDF } from "@/lib/pdf-generator"
import { LEGAL_DISCLAIMER_PRIMARY_COPY } from "@/lib/legal-disclaimer"

let Resend: any
let resend: any

try {
  Resend = require("resend")
  resend = new Resend(process.env.RESEND_API_KEY)
} catch (error) {
  console.log("Resend not installed or configured - run: npm install resend")
}

interface EmailOptions {
  to: string
  subject: string
  html: string
  from?: string
}

/**
 * Send an email using Resend
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  if (!resend) {
    console.warn("Email service not configured. Email not sent:", options.subject)
    return false
  }

  try {
    const result = await resend.emails.send({
      from: options.from || process.env.RESEND_FROM_EMAIL || "LegalLawDocs <noreply@legallawdocs.com>",
      to: options.to,
      subject: options.subject,
      html: options.html,
    })

    if (result.error) {
      console.error("Email send error:", result.error)
      return false
    }

    return true
  } catch (error) {
    console.error("Email service error:", error)
    return false
  }
}

/**
 * Send document update notification
 */
export async function sendDocumentUpdateEmail(
  userEmail: string,
  userName: string,
  documentTitle: string,
  documentUrl: string
): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document Updated</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2563eb;">Document Updated</h1>
          <p>Hi ${userName},</p>
          <p>Your document <strong>${documentTitle}</strong> has been updated.</p>
          <p>
            <a href="${documentUrl}" style="background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
              View Document
            </a>
          </p>
          <p style="margin-top: 30px; color: #666; font-size: 12px;">
            If you no longer wish to receive these notifications, you can update your preferences in your account settings.
          </p>
        </div>
      </body>
    </html>
  `

  return sendEmail({
    to: userEmail,
    subject: `Document Updated: ${documentTitle}`,
    html,
  })
}

/**
 * Send billing notification
 */
export async function sendBillingNotificationEmail(
  userEmail: string,
  userName: string,
  subject: string,
  message: string
): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2563eb;">${subject}</h1>
          <p>Hi ${userName},</p>
          <p>${message}</p>
          <p style="margin-top: 30px; color: #666; font-size: 12px;">
            If you have any questions, please contact our support team.
          </p>
        </div>
      </body>
    </html>
  `

  return sendEmail({
    to: userEmail,
    subject,
    html,
  })
}

/**
 * Send new features notification
 */
export async function sendNewFeaturesEmail(
  userEmail: string,
  userName: string,
  features: string[]
): Promise<boolean> {
  const featuresList = features.map(f => `<li>${f}</li>`).join("")

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Features Available</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2563eb;">New Features Available</h1>
          <p>Hi ${userName},</p>
          <p>We're excited to share some new features with you:</p>
          <ul>
            ${featuresList}
          </ul>
          <p>
            <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/dashboard" style="background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Explore Now
            </a>
          </p>
        </div>
      </body>
    </html>
  `

  return sendEmail({
    to: userEmail,
    subject: "New Features Available on LegalLawDocs",
    html,
  })
}

/**
 * Send document ready email with PDF attached.
 * Called by the Stripe webhook after checkout.session.completed.
 */
export async function sendDocumentReadyEmail({
  userEmail,
  userName,
  documentTitle,
  documentContent,
  documentId,
  isGuest = false,
  canSign = false,
  appUrl,
}: {
  userEmail: string
  userName: string
  documentTitle: string
  documentContent: string
  documentId: string
  isGuest?: boolean
  /** True when the buyer is on the Professional plan and can use e-signing. */
  canSign?: boolean
  appUrl: string
}): Promise<boolean> {
  if (!resend) {
    console.warn("Email service not configured. Document ready email not sent for:", documentTitle)
    return false
  }

  const dashboardUrl = `${appUrl}/dashboard/documents/${documentId}`
  const signUrl = `${appUrl}/dashboard/documents/${documentId}#sign`
  const safeTitle = documentTitle.replace(/[^a-zA-Z0-9\s-]/g, "").trim()

  // Generate PDF attachment. Pro users get a clean PDF; everyone else gets
  // the diagonal DRAFT watermark. The footer disclaimer is present on every PDF.
  let pdfBuffer: Buffer | null = null
  try {
    pdfBuffer = await generatePDF(documentContent, documentTitle, { isWatermarked: !canSign })
  } catch (err) {
    console.error("PDF generation failed for document email:", err)
    // Continue — send the email without attachment rather than failing entirely
  }

  const guestNote = isGuest
    ? `<p style="margin-top:16px; padding:12px 16px; background:#f0f9ff; border-left:3px solid #2563eb; border-radius:4px; font-size:13px; color:#374151;">
        <strong>Set up your account password</strong><br>
        A LegalLawDocs account was created with this email. Visit your dashboard to set a password and access all your documents anytime.
      </p>`
    : ""

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your document is ready</title>
</head>
<body style="margin:0; padding:0; background:#f9fafb; font-family: Arial, sans-serif; color:#111827;">
  <div style="max-width:560px; margin:40px auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 1px 3px rgba(0,0,0,0.08);">
    <!-- Header -->
    <div style="background:#1e293b; padding:24px 32px; text-align:center;">
      <p style="margin:0; font-size:20px; font-weight:700; color:#ffffff; letter-spacing:-0.3px;">
        Legal<span style="color:#6366f1;">Law</span>Docs
      </p>
    </div>
    <!-- Body -->
    <div style="padding:32px;">
      <h1 style="margin:0 0 8px; font-size:22px; font-weight:700; color:#111827;">Your document is ready 🎉</h1>
      <p style="margin:0 0 24px; font-size:15px; color:#6b7280;">Hi ${userName}, your <strong>${documentTitle}</strong> has been generated and attached to this email as a PDF.</p>
      ${pdfBuffer ? `<p style="margin:0 0 24px; font-size:14px; color:#374151;">📎 <strong>${safeTitle}.pdf</strong> is attached below.</p>` : ""}
      <table cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;">
        <tr>
          <td style="padding-right:8px;">
            <a href="${dashboardUrl}" style="display:inline-block; background:#6366f1; color:#ffffff; font-weight:600; font-size:14px; padding:12px 22px; border-radius:8px; text-decoration:none;">
              View &amp; Download →
            </a>
          </td>
          ${canSign ? `<td>
            <a href="${signUrl}" style="display:inline-block; background:#111827; color:#ffffff; font-weight:600; font-size:14px; padding:12px 22px; border-radius:8px; text-decoration:none;">
              Sign Your Document →
            </a>
          </td>` : ""}
        </tr>
      </table>
      ${!canSign ? `<p style="margin:0 0 20px; padding:12px 16px; background:#fefce8; border-left:3px solid #ca8a04; border-radius:4px; font-size:13px; color:#374151;">
        <strong>Electronic signing may require a different plan and may be unavailable during launch review.</strong> Check the billing dashboard for current availability and review the exact price before payment.
      </p>` : ""}
      ${guestNote}
      <p style="margin:20px 0 0; padding:12px 16px; background:#fffbeb; border-left:3px solid #d97706; border-radius:4px; font-size:12px; line-height:1.6; color:#4b5563;">
        <strong>Legal notice:</strong> ${LEGAL_DISCLAIMER_PRIMARY_COPY}
      </p>
      <hr style="border:none; border-top:1px solid #e5e7eb; margin:24px 0;">
      <p style="margin:0; font-size:12px; color:#9ca3af;">
        You're receiving this because you purchased a document from LegalLawDocs. Questions? Reply to this email.
      </p>
    </div>
  </div>
</body>
</html>`

  try {
    const payload: Record<string, unknown> = {
      from: process.env.RESEND_FROM_EMAIL || "LegalLawDocs <noreply@legallawdocs.com>",
      to: userEmail,
      subject: `Your ${documentTitle} is ready`,
      html,
    }

    if (pdfBuffer) {
      payload.attachments = [
        {
          filename: `${safeTitle}.pdf`,
          content: pdfBuffer,
        },
      ]
    }

    const result = await resend.emails.send(payload)
    if (result.error) {
      console.error("Document ready email error:", result.error)
      return false
    }
    return true
  } catch (error) {
    console.error("Document ready email service error:", error)
    return false
  }
}

/**
 * Send marketing email
 */
export async function sendMarketingEmail(
  userEmail: string,
  userName: string,
  subject: string,
  content: string
): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2563eb;">${subject}</h1>
          <p>Hi ${userName},</p>
          <div>${content}</div>
          <p style="margin-top: 30px; color: #666; font-size: 12px;">
            <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/dashboard/settings">Unsubscribe</a>
          </p>
        </div>
      </body>
    </html>
  `

  return sendEmail({
    to: userEmail,
    subject,
    html,
  })
}


