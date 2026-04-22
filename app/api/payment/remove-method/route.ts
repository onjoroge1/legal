import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { stripe } from "@/lib/stripe"

/**
 * POST /api/payment/remove-method
 * Detaches a Stripe PaymentMethod from the customer.
 */
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { paymentMethodId } = await request.json()
    if (!paymentMethodId) {
      return NextResponse.json({ error: "paymentMethodId is required" }, { status: 400 })
    }

    await stripe.paymentMethods.detach(paymentMethodId)

    return NextResponse.json({ message: "Payment method removed successfully" })
  } catch (error) {
    console.error("Remove payment method error:", error)
    return NextResponse.json({ error: "Failed to remove payment method" }, { status: 500 })
  }
}




