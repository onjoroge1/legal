import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { sendVerificationEmail } from '@/lib/email'
import { generateToken } from '@/lib/tokens'

export async function POST(req: Request) {
  try {
    console.log("[Signup] Starting signup process")
    const body = await req.json()
    const { name, email, password, plan } = body
    console.log("[Signup] Request body:", { ...body, password: "[REDACTED]" })

    if (!name || !email || !password) {
      console.log("[Signup] Missing required fields:", { 
        hasName: !!name,
        hasEmail: !!email,
        hasPassword: !!password
      })
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    console.log("[Signup] Validating email:", email)

    // Check if user exists
    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      })
      console.log("[Signup] Existing user check:", existingUser ? "Found" : "Not found")

      if (existingUser) {
        console.log("[Signup] User already exists")
        return NextResponse.json(
          { message: 'User with this email already exists' },
          { status: 400 }
        )
      }
    } catch (dbError) {
      console.error("[Signup] Database error checking existing user:", dbError)
      return NextResponse.json(
        { message: 'Database error checking existing user' },
        { status: 500 }
      )
    }

    console.log("[Signup] Hashing password")
    const hashedPassword = await hash(password, 12)
    console.log("[Signup] Generating verification token")
    const verificationToken = generateToken()

    console.log("[Signup] Creating user in database")
    let user
    try {
      user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          verificationToken,
          verificationTokenExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
          subscriptionTier: plan || "free",
          subscriptionStatus: plan === "free" ? "active" : "inactive",
        },
      })
      console.log("[Signup] User created successfully:", { id: user.id, email: user.email })
    } catch (dbError) {
      console.error("[Signup] Database error creating user:", dbError)
      const errorMessage = dbError instanceof Error ? dbError.message : 'Unknown database error'
      return NextResponse.json(
        { message: 'Database error creating user', error: errorMessage },
        { status: 500 }
      )
    }

    console.log("[Signup] Attempting to send verification email")
    try {
      await sendVerificationEmail({
        to: email,
        name,
        verificationToken,
      })
      console.log("[Signup] Verification email sent successfully")
    } catch (emailError) {
      console.error("[Signup] Error sending verification email:", emailError)
      // Don't throw here, just log the error
    }

    console.log("[Signup] Signup process completed successfully")
    return NextResponse.json(
      { 
        message: 'User created successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          subscriptionTier: user.subscriptionTier,
          subscriptionStatus: user.subscriptionStatus,
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("[Signup] Error in signup process:", error)
    console.error("[Signup] Error details:", {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
    
    // Return a more specific error message
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred during signup'
    return NextResponse.json(
      { 
        message: errorMessage,
        error: errorMessage
      },
      { status: 500 }
    )
  }
} 