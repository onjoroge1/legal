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

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    if (!user.stripeCustomerId) {
      return NextResponse.json(
        { error: "No Stripe customer found" },
        { status: 400 }
      )
    }

    const { paymentMethodId } = await request.json()

    if (!paymentMethodId) {
      return NextResponse.json(
        { error: "Payment method ID is required" },
        { status: 400 }
      )
    }

    // Check if this is the default payment method
    const customer = await stripe.customers.retrieve(user.stripeCustomerId) as Stripe.Customer
    const isDefault = customer.invoice_settings?.default_payment_method === paymentMethodId

    // Detach the payment method
    await stripe.paymentMethods.detach(paymentMethodId)

    if (isDefault) {
      // Find another payment method to set as default
      const paymentMethods = await stripe.paymentMethods.list({
        customer: user.stripeCustomerId,
        type: "card",
      })

      if (paymentMethods.data.length > 0) {
        await stripe.customers.update(user.stripeCustomerId, {
          invoice_settings: {
            default_payment_method: paymentMethods.data[0].id,
          },
        })
      }
    }

    return NextResponse.json({
      success: true,
      message: "Payment method removed successfully",
    })
  } catch (error) {
    console.error("Error removing payment method:", error)
    return NextResponse.json(
      { error: "Failed to remove payment method" },
      { status: 500 }
    )
  }
} 