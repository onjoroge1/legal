import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { stripe } from "@/lib/stripe"

// Try to import Prisma
let prisma: any
try {
  const prismaModule = require("@/lib/prisma")
  prisma = prismaModule.prisma
} catch {
  // Prisma not available
}

/**
 * Remove payment method
 * POST /api/payment/remove-method
 *
 * Body: { paymentMethodId: string }
 *
 * Detaches a payment method from the user's Stripe customer.
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

    if (!paymentMethodId) {
      return NextResponse.json(
        { error: "Payment method ID is required" },
        { status: 400 }
      )
    }

    // Verify the payment method belongs to this user
    if (prisma) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { stripeCustomerId: true },
      })

      if (user?.stripeCustomerId) {
        // Verify the payment method belongs to this customer
        const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId)
        if (paymentMethod.customer !== user.stripeCustomerId) {
          return NextResponse.json(
            { error: "Payment method does not belong to this account" },
            { status: 403 }
          )
        }
      }
    }

    // Detach the payment method
    await stripe.paymentMethods.detach(paymentMethodId)

    return NextResponse.json({
      message: "Payment method removed successfully",
    })
  } catch (error: any) {
    console.error("Remove payment method error:", error)

    if (error?.code === "resource_missing") {
      return NextResponse.json(
        { error: "Payment method not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: "Failed to remove payment method" },
      { status: 500 }
    )
  }
}
