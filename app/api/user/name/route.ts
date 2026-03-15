import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// Try to import Prisma
let prisma: any

try {
  const prismaModule = require("@/lib/prisma")
  prisma = prismaModule.prisma
} catch {
  // Prisma not set up yet
}

/**
 * Get current user's name from database
 * GET /api/user/name
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

    // If Prisma is available, fetch real data from database
    if (prisma) {
      try {
        const user = await prisma.user.findUnique({
          where: { email: session.user.email },
          select: {
            name: true,
            firstName: true,
            lastName: true,
            email: true,
            image: true,
          },
        })

        if (user) {
          // Use name if available, otherwise combine firstName and lastName
          const displayName = user.name || 
            [user.firstName, user.lastName].filter(Boolean).join(" ").trim() || 
            user.email?.split("@")[0] || 
            "User"

          return NextResponse.json({
            name: displayName,
            firstName: user.firstName,
            lastName: user.lastName,
            image: user.image,
          })
        }
      } catch (error) {
        console.error("Database error fetching user name:", error)
        // Fall through to session data
      }
    }

    // Fallback to session data if Prisma is not available
    return NextResponse.json({
      name: session.user.name || session.user.email?.split("@")[0] || "User",
      firstName: null,
      lastName: null,
      image: session.user.image || null,
    })
  } catch (error) {
    console.error("User name API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

