import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    console.log("[Login API] Attempting login for:", email)

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      console.log("[Login API] User not found for email:", email)
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    console.log("[Login API] User found:", { id: user.id, email: user.email })

    // Verify password
    const isValid = await compare(password, user.password)
    if (!isValid) {
      console.log("[Login API] Invalid password for user:", user.id)
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    console.log("[Login API] Password verified successfully for user:", user.id)

    // Create JWT token
    const token = sign(
      { userId: user.id, email: user.email },
      process.env.NEXTAUTH_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    )
    console.log("[Login API] Token created successfully")

    // Create response with redirect
    const response = NextResponse.json(
      { success: true, redirectTo: '/dashboard' },
      { status: 200 }
    )

    // Set the auth token cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })
    console.log("[Login API] Cookie set successfully with token")

    return response
  } catch (error) {
    console.error("[Login API] Error:", error)
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    )
  }
} 