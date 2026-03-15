import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { sendEmail } from "@/lib/email-service"

// Try to import Prisma
let prisma: any

try {
  const prismaModule = require("@/lib/prisma")
  prisma = prismaModule.prisma
} catch {
  // Prisma not available
}

/**
 * Resend team invitation
 * POST /api/team/invitations/resend
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
    const { invitationId } = body

    if (!invitationId) {
      return NextResponse.json(
        { error: "Invitation ID is required" },
        { status: 400 }
      )
    }

    // Get invitation
    const invitation = await prisma.teamInvitation.findUnique({
      where: { id: invitationId },
      include: {
        team: {
          include: {
            owner: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    })

    if (!invitation) {
      return NextResponse.json(
        { error: "Invitation not found" },
        { status: 404 }
      )
    }

    // Verify user owns the team
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    })

    if (!user || invitation.team.ownerId !== user.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      )
    }

    // Update expiration date
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7) // 7 days from now

    await prisma.teamInvitation.update({
      where: { id: invitationId },
      data: {
        expiresAt,
        status: "pending",
      },
    })

    // Resend email
    const inviteUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/invite/${invitation.token}`
    const userName = invitation.team.owner.name || invitation.team.owner.email?.split("@")[0] || "Team Owner"

    await sendEmail({
      to: invitation.email,
      subject: `You've been invited to join ${userName}'s team on LegalLawDocs`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Team Invitation</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #2563eb;">You've been invited!</h1>
              <p>Hi there,</p>
              <p><strong>${userName}</strong> has invited you to join their team on LegalLawDocs as a <strong>${invitation.role}</strong>.</p>
              <p>
                <a href="${inviteUrl}" style="background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  Accept Invitation
                </a>
              </p>
              <p style="margin-top: 30px; color: #666; font-size: 12px;">
                This invitation will expire in 7 days. If you didn't expect this invitation, you can safely ignore this email.
              </p>
            </div>
          </body>
        </html>
      `,
    })

    return NextResponse.json({
      message: "Invitation resent successfully",
    })
  } catch (error) {
    console.error("Resend invitation error:", error)
    return NextResponse.json(
      { error: "Failed to resend invitation" },
      { status: 500 }
    )
  }
}
