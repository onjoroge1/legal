import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
})

interface BillingHistoryItem {
  id: string;
  amount: number;
  currency: string;
  status: string;
  date: string;
  description: string;
}

interface PaymentMethod {
  id: string;
  type: string;
  last4: string;
  expiry: string;
  isDefault: boolean;
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        subscriptionTier: true,
        subscriptionStatus: true,
        subscriptionStartDate: true,
        subscriptionEndDate: true,
        stripeCustomerId: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    let billingHistory: BillingHistoryItem[] = []
    let paymentMethods: PaymentMethod[] = []

    if (user.stripeCustomerId) {
      const charges = await stripe.charges.list({
        customer: user.stripeCustomerId,
        limit: 10,
      })

      billingHistory = charges.data.map((charge: Stripe.Charge) => ({
        id: charge.id,
        amount: charge.amount,
        currency: charge.currency,
        status: charge.status,
        date: new Date(charge.created * 1000).toISOString(),
        description: charge.description || "Subscription payment",
      }))

      const methods = await stripe.paymentMethods.list({
        customer: user.stripeCustomerId,
        type: "card",
      })

      const customer = await stripe.customers.retrieve(user.stripeCustomerId)
      if (customer.deleted) {
        return NextResponse.json(
          { error: "Customer account deleted" },
          { status: 404 }
        )
      }

      const defaultPaymentMethod = (customer as Stripe.Customer).invoice_settings?.default_payment_method

      paymentMethods = methods.data.map((method: Stripe.PaymentMethod) => ({
        id: method.id,
        type: method.card?.brand || "unknown",
        last4: method.card?.last4 || "",
        expiry: `${method.card?.exp_month}/${method.card?.exp_year}`,
        isDefault: method.id === defaultPaymentMethod,
      }))
    }

    return NextResponse.json({
      subscription: {
        tier: user.subscriptionTier,
        status: user.subscriptionStatus,
        startDate: user.subscriptionStartDate,
        endDate: user.subscriptionEndDate,
      },
      billingHistory,
      paymentMethods,
    })
  } catch (error) {
    console.error("Error fetching subscription data:", error)
    return NextResponse.json(
      { error: "Failed to fetch subscription data" },
      { status: 500 }
    )
  }
} 