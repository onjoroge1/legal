import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// Try to import Prisma
let prisma: any

try {
  const prismaModule = require("@/lib/prisma")
  prisma = prismaModule.prisma
} catch (error) {
  console.log("Prisma not available")
}

/**
 * Get team members
 * GET /api/team/members
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
        members: [],
        team: null,
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

    // Get or create user's team
    let team = await prisma.team.findFirst({
      where: { ownerId: user.id },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    })

    // Create team if it doesn't exist
    if (!team) {
      team = await prisma.team.create({
        data: {
          ownerId: user.id,
          name: `${user.id}'s Team`,
        },
        include: {
          members: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  image: true,
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
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

      // Reload team with owner
      team = await prisma.team.findFirst({
        where: { id: team.id },
        include: {
          members: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  image: true,
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
        },
      })
    }

    // Format members
    const members = team.members.map((member: any) => ({
      id: member.id,
      userId: member.userId,
      name: member.user.name || 
            [member.user.firstName, member.user.lastName].filter(Boolean).join(" ") ||
            member.user.email?.split("@")[0] ||
            "User",
      email: member.user.email,
      role: member.role,
      avatar: member.user.image,
      initials: (member.user.firstName?.[0] || "") + (member.user.lastName?.[0] || "") || 
                member.user.email?.[0].toUpperCase() || "U",
      joinedAt: member.joinedAt,
      isOwner: member.userId === user.id,
    }))

    return NextResponse.json({
      members,
      team: {
        id: team.id,
        name: team.name,
        ownerId: team.ownerId,
      },
    })
  } catch (error) {
    console.error("Get team members error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

/**
 * Update team member role
 * PATCH /api/team/members
 */
export async function PATCH(request: Request) {
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
    const { memberId, role } = body

    if (!memberId || !role) {
      return NextResponse.json(
        { error: "Member ID and role are required" },
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

    // Get user and verify they're team owner or admin
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

    // Get team member
    const member = await prisma.teamMember.findUnique({
      where: { id: memberId },
      include: {
        team: true,
      },
    })

    if (!member) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 }
      )
    }

    // Check if user is team owner or admin
    const userMember = await prisma.teamMember.findFirst({
      where: {
        teamId: member.teamId,
        userId: user.id,
      },
    })

    const isOwner = member.team.ownerId === user.id
    const isAdmin = userMember?.role === "admin"

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: "Only team owners and admins can update member roles" },
        { status: 403 }
      )
    }

    // Don't allow changing owner's role
    if (member.userId === member.team.ownerId) {
      return NextResponse.json(
        { error: "Cannot change owner's role" },
        { status: 400 }
      )
    }

    // Update role
    await prisma.teamMember.update({
      where: { id: memberId },
      data: { role },
    })

    return NextResponse.json({
      message: "Member role updated successfully",
    })
  } catch (error) {
    console.error("Update team member error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

/**
 * Remove team member
 * DELETE /api/team/members
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
    const memberId = searchParams.get("memberId")

    if (!memberId) {
      return NextResponse.json(
        { error: "Member ID is required" },
        { status: 400 }
      )
    }

    // Get user and verify they're team owner or admin
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

    // Get team member
    const member = await prisma.teamMember.findUnique({
      where: { id: memberId },
      include: {
        team: true,
      },
    })

    if (!member) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 }
      )
    }

    // Check if user is team owner or admin
    const userMember = await prisma.teamMember.findFirst({
      where: {
        teamId: member.teamId,
        userId: user.id,
      },
    })

    const isOwner = member.team.ownerId === user.id
    const isAdmin = userMember?.role === "admin"

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: "Only team owners and admins can remove members" },
        { status: 403 }
      )
    }

    // Don't allow removing owner
    if (member.userId === member.team.ownerId) {
      return NextResponse.json(
        { error: "Cannot remove team owner" },
        { status: 400 }
      )
    }

    // Remove member
    await prisma.teamMember.delete({
      where: { id: memberId },
    })

    return NextResponse.json({
      message: "Member removed successfully",
    })
  } catch (error) {
    console.error("Remove team member error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

