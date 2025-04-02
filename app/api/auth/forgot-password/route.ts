import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendPasswordResetEmail } from "@/lib/email"
import { generateToken } from "@/lib/tokens"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      )
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      // Return success even if user doesn't exist to prevent email enumeration
      return NextResponse.json(
        { message: "If an account exists, you will receive a password reset link" },
        { status: 200 }
      )
    }

    // Generate reset token
    const resetToken = generateToken()
    const resetTokenExpiry = new Date(Date.now() + 1 * 60 * 60 * 1000) // 1 hour

    // Update user with reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    })

    // Send reset email
    await sendPasswordResetEmail({
      to: email,
      name: user.name,
      resetToken,
    })

    return NextResponse.json(
      { message: "If an account exists, you will receive a password reset link" },
      { status: 200 }
    )
  } catch (error) {
    console.error("[ForgotPassword] Error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
} 