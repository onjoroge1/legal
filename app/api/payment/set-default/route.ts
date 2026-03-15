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
 * Set default payment method
 * POST /api/payment/set-default
 *
 * Body: { paymentMethodId: string }
 *
 * Sets a payment method as the default for the user's Stripe customer.
 * This payment method will be used for future subscription invoices.
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

    // Get user's Stripe customer ID
    if (!prisma) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 500 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { stripeCustomerId: true, stripeSubscriptionId: true },
    })

    if (!user?.stripeCustomerId) {
      return NextResponse.json(
        { error: "No payment account found" },
        { status: 400 }
      )
    }

    // Verify the payment method belongs to this customer
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId)
    if (paymentMethod.customer !== user.stripeCustomerId) {
      return NextResponse.json(
        { error: "Payment method does not belong to this account" },
        { status: 403 }
      )
    }

    // Update the customer's default payment method
    await stripe.customers.update(user.stripeCustomerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    })

    // If user has an active subscription, update its default payment method too
    if (user.stripeSubscriptionId) {
      try {
        await stripe.subscriptions.update(user.stripeSubscriptionId, {
          default_payment_method: paymentMethodId,
        })
      } catch {
        // Subscription may not exist anymore - that's OK
      }
    }

    return NextResponse.json({
      message: "Default payment method updated successfully",
    })
  } catch (error: any) {
    console.error("Set default payment method error:", error)

    if (error?.code === "resource_missing") {
      return NextResponse.json(
        { error: "Payment method not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: "Failed to set default payment method" },
      { status: 500 }
    )
  }
}
