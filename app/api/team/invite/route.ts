import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { randomBytes } from "crypto"
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
 * Send team invitation
 * POST /api/team/invite
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
    const { email, role } = body

    if (!email || !role) {
      return NextResponse.json(
        { error: "Email and role are required" },
        { status: 400 }
      )
    }

    // Validate role
    const validRoles = ["admin", "editor", "viewer"]
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { error: "Invalid role" },
        { status: 400 }
      )
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
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

    // Get or create user's team
    let team = await prisma.team.findFirst({
      where: { ownerId: user.id },
    })

    if (!team) {
      team = await prisma.team.create({
        data: {
          ownerId: user.id,
          name: `${user.id}'s Team`,
        },
      })

      // Add owner as admin member
      await prisma.teamMember.create({
        data: {
          teamId: team.id,
          userId: user.id,
          role: "admin",
        },
      })
    }

    // Check if user is already a member
    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    })

    if (existingUser) {
      const existingMember = await prisma.teamMember.findUnique({
        where: {
          teamId_userId: {
            teamId: team.id,
            userId: existingUser.id,
          },
        },
      })

      if (existingMember) {
        return NextResponse.json(
          { error: "User is already a team member" },
          { status: 400 }
        )
      }
    }

    // Check if there's a pending invitation
    const existingInvitation = await prisma.teamInvitation.findFirst({
      where: {
        teamId: team.id,
        email,
        status: "pending",
      },
    })

    if (existingInvitation) {
      // Check if invitation is expired
      if (new Date(existingInvitation.expiresAt) < new Date()) {
        // Update to expired
        await prisma.teamInvitation.update({
          where: { id: existingInvitation.id },
          data: { status: "expired" },
        })
      } else {
        return NextResponse.json(
          { error: "Invitation already sent to this email" },
          { status: 400 }
        )
      }
    }

    // Generate invitation token
    const token = randomBytes(32).toString("hex")
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7) // 7 days from now

    // Create invitation
    const invitation = await prisma.teamInvitation.create({
      data: {
        teamId: team.id,
        email,
        role,
        token,
        invitedBy: user.id,
        expiresAt,
        status: "pending",
      },
    })

    // Send invitation email
    const inviteUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/invite/${token}`
    const userName = user.name || user.email?.split("@")[0] || "Team Owner"

    await sendEmail({
      to: email,
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
              <p><strong>${userName}</strong> has invited you to join their team on LegalLawDocs as a <strong>${role}</strong>.</p>
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
      message: "Invitation sent successfully",
      invitation: {
        id: invitation.id,
        email: invitation.email,
        role: invitation.role,
        expiresAt: invitation.expiresAt,
      },
    })
  } catch (error) {
    console.error("Send invitation error:", error)
    return NextResponse.json(
      { error: "Failed to send invitation" },
      { status: 500 }
    )
  }
}

