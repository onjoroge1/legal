// Email service using Resend API
// Install: npm install resend

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




