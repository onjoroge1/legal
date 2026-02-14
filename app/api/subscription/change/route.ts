import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { changePlan, upgradePlan, downgradePlan } from "@/lib/subscription-management"

/**
 * Change subscription plan
 * POST /api/subscription/change
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
    const { tier, action } = body

    // Validate tier
    const validTiers = ["free", "starter", "professional"]
    if (!validTiers.includes(tier)) {
      return NextResponse.json(
        { error: "Invalid subscription tier" },
        { status: 400 }
      )
    }

    let result

    // Use specific action if provided
    if (action === "upgrade") {
      result = await upgradePlan(session.user.email, tier as "starter" | "professional")
    } else if (action === "downgrade") {
      result = await downgradePlan(session.user.email, tier as "free" | "starter")
    } else {
      // Auto-detect upgrade/downgrade
      result = await changePlan(session.user.email, tier as "free" | "starter" | "professional")
    }

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to change plan" },
        { status: 400 }
      )
    }

    return NextResponse.json({
      message: result.message,
      newTier: result.newTier,
    })
  } catch (error) {
    console.error("Change subscription error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}




