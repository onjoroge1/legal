import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

/**
 * Check if email exists
 * GET /api/auth/check-email?email=user@example.com
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
      },
    })

    return NextResponse.json({
      exists: !!user,
      user: user || null,
    })
  } catch (error) {
    console.error("Email check error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

