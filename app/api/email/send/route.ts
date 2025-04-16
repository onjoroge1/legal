import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface SigningLink {
  partyId: string
  email: string
  link: string
}

export async function POST(request: Request) {
  try {
    const { signingLinks, documentTitle } = await request.json()

    if (!signingLinks || !documentTitle) {
      console.error('[Email Send] Missing required fields:', { signingLinks, documentTitle })
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    console.log('[Email Send] Starting to send emails:', {
      documentTitle,
      numberOfRecipients: signingLinks.length,
      recipients: signingLinks.map((link: SigningLink) => link.email)
    })

    // Send email to each party
    const emailPromises = signingLinks.map(async (link: SigningLink) => {
      console.log('[Email Send] Sending to:', link.email)
      try {
        const result = await resend.emails.send({
          from: 'Legal Law Docs <onboarding@resend.dev>', // Using Resend's verified sender for testing
          to: link.email,
          subject: `Signature Request: ${documentTitle}`,
          html: `
            <h1>Signature Request</h1>
            <p>You have been requested to sign the document: ${documentTitle}</p>
            <p>Please click the link below to sign the document:</p>
            <a href="${link.link}">Sign Document</a>
            <p>This link will expire in 7 days.</p>
          `,
        })
        console.log('[Email Send] Success for:', link.email, result)
        return result
      } catch (error) {
        console.error('[Email Send] Error for:', link.email, error)
        throw error
      }
    })

    const results = await Promise.all(emailPromises)
    console.log('[Email Send] All emails sent successfully:', results)

    return NextResponse.json({ success: true, results })
  } catch (error) {
    console.error('[Email Send] Error:', error)
    return NextResponse.json(
      { error: 'Failed to send emails' },
      { status: 500 }
    )
  }
} 