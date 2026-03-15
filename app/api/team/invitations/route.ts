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
 * Get pending invitations
 * GET /api/team/invitations
 */
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    if (!prisma) {
      return NextResponse.json({
        invitations: [],
      })
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // Get user's team
    const team = await prisma.team.findFirst({
      where: { ownerId: user.id },
    })

    if (!team) {
      return NextResponse.json({
        invitations: [],
      })
    }

    // Get pending invitations
    const invitations = await prisma.teamInvitation.findMany({
      where: {
        teamId: team.id,
        status: "pending",
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    // Format invitations
    const formattedInvitations = invitations.map((invitation: any) => {
      const sentAt = new Date(invitation.createdAt)
      const now = new Date()
      const diffMs = now.getTime() - sentAt.getTime()
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
      const diffMinutes = Math.floor(diffMs / (1000 * 60))

      let sentAtText = "Just now"
      if (diffMinutes > 0 && diffMinutes < 60) {
        sentAtText = `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`
      } else if (diffHours > 0 && diffHours < 24) {
        sentAtText = `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`
      } else if (diffDays > 0 && diffDays < 7) {
        sentAtText = `${diffDays} day${diffDays > 1 ? "s" : ""} ago`
      } else if (diffDays >= 7) {
        const weeks = Math.floor(diffDays / 7)
        sentAtText = `${weeks} week${weeks > 1 ? "s" : ""} ago`
      }

      return {
        id: invitation.id,
        email: invitation.email,
        role: invitation.role,
        sentAt: sentAtText,
        expiresAt: invitation.expiresAt,
        createdAt: invitation.createdAt,
      }
    })

    return NextResponse.json({
      invitations: formattedInvitations,
    })
  } catch (error) {
    console.error("Get invitations error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

/**
 * Cancel invitation
 * DELETE /api/team/invitations
 */
export async function DELETE(request: Request) {
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

    const { searchParams } = new URL(request.url)
    const invitationId = searchParams.get("invitationId")

    if (!invitationId) {
      return NextResponse.json(
        { error: "Invitation ID is required" },
        { status: 400 }
      )
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // Get invitation
    const invitation = await prisma.teamInvitation.findUnique({
      where: { id: invitationId },
      include: {
        team: true,
      },
    })

    if (!invitation) {
      return NextResponse.json(
        { error: "Invitation not found" },
        { status: 404 }
      )
    }

    // Verify user owns the team
    if (invitation.team.ownerId !== user.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      )
    }

    // Cancel invitation
    await prisma.teamInvitation.update({
      where: { id: invitationId },
      data: { status: "cancelled" },
    })

    return NextResponse.json({
      message: "Invitation cancelled successfully",
    })
  } catch (error) {
    console.error("Cancel invitation error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

/**
 * Resend invitation
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

