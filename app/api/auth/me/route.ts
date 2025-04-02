import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verify } from 'jsonwebtoken'

export async function GET(request: Request) {
  try {
    // Get the token from the cookies
    const token = request.headers.get('cookie')?.split('auth-token=')[1]?.split(';')[0]
    console.log("[Auth/Me] Token present:", !!token)

    if (!token) {
      console.log("[Auth/Me] No token found in cookies")
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Verify the token
    console.log("[Auth/Me] Verifying token")
    const decoded = verify(token, process.env.NEXTAUTH_SECRET || 'fallback-secret') as { userId: string }
    console.log("[Auth/Me] Token verified, user ID:", decoded.userId)

    // Get the user from the database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
      },
    })

    if (!user) {
      console.log("[Auth/Me] User not found for ID:", decoded.userId)
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    console.log("[Auth/Me] User found:", { id: user.id, email: user.email })
    return NextResponse.json(user)
  } catch (error) {
    console.error('[Auth/Me] Error:', error)
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    )
  }
} 