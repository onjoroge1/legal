import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import { z } from "zod"

const resetPasswordSchema = z.object({
  token: z.string().min(32).max(256),
  password: z.string().min(8, "Password must be at least 8 characters").max(200),
})

export async function POST(request: Request) {
  try {
    const { token, password } = resetPasswordSchema.parse(await request.json())

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex")

    const user = await prisma.user.findFirst({
      where: {
        resetToken: hashedToken,
        resetTokenExpiry: { gt: new Date() },
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired reset link. Please request a new one." },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const result = await prisma.user.updateMany({
      where: {
        id: user.id,
        resetToken: hashedToken,
        resetTokenExpiry: { gt: new Date() },
      },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
        lastPasswordChange: new Date(),
        activeSessions: "[]",
        jwtVersion: { increment: 1 },
      },
    })

    if (result.count !== 1) {
      return NextResponse.json(
        { error: "Invalid or expired reset link. Please request a new one." },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid reset request" }, { status: 400 })
    }
    console.error("Reset password error:", error)
    return NextResponse.json({ error: "An error occurred" }, { status: 500 })
  }
}
