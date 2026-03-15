import { NextResponse } from "next/server"
import * as z from "zod"
import { authRateLimit, getClientIp, rateLimitResponse } from "@/lib/rate-limit"

// Try to import Prisma - will be undefined if not set up yet
let prisma: any
let bcrypt: any

try {
  const prismaModule = require("@/lib/prisma")
  prisma = prismaModule.prisma
} catch {
  // Prisma not set up yet
}

try {
  bcrypt = require("bcryptjs")
} catch {
  // bcryptjs not installed yet
}

const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

/**
 * Signup API Route
 * Creates a new user account
 * 
 * POST /api/auth/signup
 * Body: { name: string, email: string, password: string }
 */
export async function POST(request: Request) {
  // Rate limit: 10 requests per 15 minutes
  const ip = getClientIp(request)
  const limit = authRateLimit(ip)
  if (!limit.success) return rateLimitResponse(limit.resetAt)

  try {
    const body = await request.json()
    const { name, email, password } = signupSchema.parse(body)

    // Check if Prisma is available
    if (!prisma) {
      return NextResponse.json(
        { 
          error: "Database not configured. Please set up Prisma first.",
          message: "See PRISMA_SETUP.md for instructions"
        },
        { status: 503 }
      )
    }

    if (!bcrypt) {
      return NextResponse.json(
        { 
          error: "bcryptjs not installed. Run: npm install bcryptjs",
          message: "Password hashing library is required"
        },
        { status: 503 }
      )
    }

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
    const hashedPassword = await bcrypt.hash(password, 10)

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

    console.error("Signup error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}




