import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

/**
 * Remove payment method
 * POST /api/payment/remove-method
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

    // In production, this would remove the payment method from Stripe
    // For now, return success
    return NextResponse.json({
      message: "Payment method removed successfully",
    })
  } catch (error) {
    console.error("Remove payment method error:", error)
    return NextResponse.json(
      { error: "Failed to remove payment method" },
      { status: 500 }
    )
  }
}

