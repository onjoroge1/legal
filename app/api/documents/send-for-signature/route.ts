import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { sendEmail } from "@/lib/email-service"

// Try to import Prisma
let prisma: any

try {
  const prismaModule = require("@/lib/prisma")
  prisma = prismaModule.prisma
} catch (error) {
  console.log("Prisma not available")
}

/**
 * Send document for signature
 * POST /api/documents/send-for-signature
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

    if (!prisma) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { documentId, signerEmail, signerName, message } = body

    if (!documentId || !signerEmail || !signerName) {
      return NextResponse.json(
        { error: "Document ID, signer email, and signer name are required" },
        { status: 400 }
      )
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, name: true, email: true },
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // Get document
    const document = await prisma.userDocument.findFirst({
      where: {
        id: documentId,
        userId: user.id,
      },
    })

    if (!document) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      )
    }

    // Generate signing token
    const signingToken = require("crypto").randomBytes(32).toString("hex")
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 30) // 30 days to sign

    // Create signing request (you might want to create a SigningRequest model)
    // For now, we'll store it in document metadata
    const metadata = (document.metadata as any) || {}
    metadata.signingRequests = [
      ...(metadata.signingRequests || []),
      {
        signerEmail,
        signerName,
        token: signingToken,
        status: "pending",
        createdAt: new Date().toISOString(),
        expiresAt: expiresAt.toISOString(),
      },
    ]

    await prisma.userDocument.update({
      where: { id: documentId },
      data: { metadata },
    })

    // Send email with signing link
    const signingUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/sign/${signingToken}`
    const senderName = user.name || user.email?.split("@")[0] || "Document Sender"

    await sendEmail({
      to: signerEmail,
      subject: `Please Sign: ${document.title}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document Signature Request</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #2563eb;">Signature Request</h1>
              <p>Hi ${signerName},</p>
              <p><strong>${senderName}</strong> has requested that you sign the following document:</p>
              <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p style="margin: 0; font-weight: bold;">${document.title}</p>
              </div>
              ${message ? `<p style="background-color: #fef3c7; padding: 15px; border-radius: 5px; margin: 20px 0;">${message}</p>` : ""}
              <p>
                <a href="${signingUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0;">
                  Review and Sign Document
                </a>
              </p>
              <p style="margin-top: 30px; color: #666; font-size: 12px;">
                This signing link will expire in 30 days. If you didn't expect this request, you can safely ignore this email.
              </p>
            </div>
          </body>
        </html>
      `,
    })

    return NextResponse.json({
      message: "Document sent for signature successfully",
      signingToken,
    })
  } catch (error) {
    console.error("Send for signature error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

