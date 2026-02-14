import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

/**
 * Set default payment method
 * POST /api/payment/set-default
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
    const { paymentMethodId } = body

    // In production, this would update the payment method in Stripe
    // For now, return success
    return NextResponse.json({
      message: "Default payment method updated successfully",
    })
  } catch (error) {
    console.error("Set default payment method error:", error)
    return NextResponse.json(
      { error: "Failed to set default payment method" },
      { status: 500 }
    )
  }
}




