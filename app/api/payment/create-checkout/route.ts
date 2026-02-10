import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { changePlan } from "@/lib/subscription-management"

/**
 * Create checkout session for subscription upgrade
 * POST /api/payment/create-checkout
 */
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { tier } = body

    // Validate tier
    const validTiers = ["starter", "professional", "free"]
    if (!validTiers.includes(tier)) {
      return NextResponse.json(
        { error: "Invalid subscription tier" },
        { status: 400 }
      )
    }

    // Use subscription management to change plan
    const result = await changePlan(session.user.email, tier as "free" | "starter" | "professional")

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to change plan" },
        { status: 400 }
      )
    }

    // In production, this would create a Stripe checkout session
    // For now, return success with redirect URL
    return NextResponse.json({
      message: result.message,
      url: `/dashboard/billing?success=true&tier=${tier}`,
    })
  } catch (error) {
    console.error("Checkout creation error:", error)
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    )
  }
}

