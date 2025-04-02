import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"

// GET /api/admin/users - Get all users
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    if (!user?.isAdmin) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Get all users with their basic info
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Filter out sensitive information
    const sanitizedUsers = users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      subscriptionTier: user.subscriptionTier,
      subscriptionStatus: user.subscriptionStatus,
      createdAt: user.createdAt,
      lastLoginAt: user.lastLoginAt,
    }))

    return NextResponse.json(sanitizedUsers)
  } catch (error) {
    // Convert error to string for safe logging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    console.error("[ADMIN_USERS_GET]", { error: errorMessage })
    return new NextResponse("Internal Error", { status: 500 })
  }
}

// PATCH /api/admin/users/[userId] - Update user role
export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    // Check if user is admin
    const adminUser = await prisma.user.findUnique({
      where: { id: session?.user?.id }
    })

    if (!adminUser?.isAdmin) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { isAdmin } = body

    // Update user's admin status
    const updatedUser = await prisma.user.update({
      where: { id: params.userId },
      data: { isAdmin },
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
        subscriptionTier: true,
        subscriptionStatus: true,
        createdAt: true,
        lastLoginAt: true,
      }
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error("[ADMIN_USERS_PATCH]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 