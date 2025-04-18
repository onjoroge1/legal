import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
})

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { stripeCustomerId: true },
    })

    if (!user || !user.stripeCustomerId) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const { paymentMethodId } = await request.json()

    if (!paymentMethodId) {
      return NextResponse.json(
        { error: "Payment method ID is required" },
        { status: 400 }
      )
    }

    // Verify the payment method belongs to the customer
    const paymentMethods = await stripe.paymentMethods.list({
      customer: user.stripeCustomerId,
      type: "card",
    })

    const isValidPaymentMethod = paymentMethods.data.some(
      (pm) => pm.id === paymentMethodId
    )

    if (!isValidPaymentMethod) {
      return NextResponse.json(
        { error: "Invalid payment method" },
        { status: 400 }
      )
    }

    // Set as default payment method
    await stripe.customers.update(user.stripeCustomerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    })

    return NextResponse.json({
      success: true,
      message: "Default payment method updated successfully",
    })
  } catch (error) {
    console.error("Error setting default payment method:", error)
    return NextResponse.json(
      { error: "Failed to set default payment method" },
      { status: 500 }
    )
  }
} 