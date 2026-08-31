import { NextResponse } from "next/server"
import { Prisma } from "@prisma/client"
import bcrypt from "bcryptjs"
import * as z from "zod"
import { prisma } from "@/lib/prisma"

const signupSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("Invalid email address").transform((value) => value.toLowerCase()),
  password: z.string().min(8, "Password must be at least 8 characters").max(200),
})

/**
 * Signup API Route
 * Creates a new user account
 * 
 * POST /api/auth/signup
 * Body: { name: string, email: string, password: string }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = signupSchema.parse(body)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    })

    return NextResponse.json(
      { 
        message: "User created successfully", 
        userId: user.id,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      )
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
    }
    console.error("Signup error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}



