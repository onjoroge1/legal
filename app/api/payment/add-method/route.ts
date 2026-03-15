import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { stripe, getOrCreateStripeCustomer } from "@/lib/stripe"

// Try to import Prisma
let prisma: any
try {
  const prismaModule = require("@/lib/prisma")
  prisma = prismaModule.prisma
} catch {
  // Prisma not available
}

/**
 * Add payment method
 * POST /api/payment/add-method
 *
 * Body: { paymentMethodId: string } - The Stripe PaymentMethod ID from the client
 *
 * Attaches a payment method created on the client (via Stripe Elements)
 * to the user's Stripe customer and sets it as default.
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
    let stripeCustomerId: string | null = null
    if (prisma) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { stripeCustomerId: true, name: true },
      })
      stripeCustomerId = user?.stripeCustomerId || null

      // Get or create Stripe customer
      const customerId = await getOrCreateStripeCustomer(
        session.user.email,
        user?.name || session.user.name || undefined,
        stripeCustomerId
      )

      // Save if new
      if (customerId !== stripeCustomerId) {
        await prisma.user.update({
          where: { email: session.user.email },
          data: { stripeCustomerId: customerId },
        })
      }

      stripeCustomerId = customerId
    }

    if (!stripeCustomerId) {
      return NextResponse.json(
        { error: "Could not create customer record" },
        { status: 500 }
      )
    }

    // Attach the payment method to the customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: stripeCustomerId,
    })

    // Set as default payment method for invoices
    await stripe.customers.update(stripeCustomerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    })

    return NextResponse.json({
      message: "Payment method added successfully",
    })
  } catch (error: any) {
    console.error("Add payment method error:", error)

    if (error?.type === "StripeCardError") {
      return NextResponse.json(
        { error: error.message || "Card was declined" },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Failed to add payment method" },
      { status: 500 }
    )
  }
}
