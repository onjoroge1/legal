import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getUserSubscriptionInfo } from "@/lib/subscription"

/**
 * Get user subscription status
 * GET /api/user/subscription
 */
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const subscriptionInfo = await getUserSubscriptionInfo(session.user.email)

    return NextResponse.json({
      subscription: subscriptionInfo,
    })
  } catch (error) {
    console.error("Subscription API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}




