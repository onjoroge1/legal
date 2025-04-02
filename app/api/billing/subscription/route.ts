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
    }

    return NextResponse.json({
      subscription: {
        tier: user.subscriptionTier,
        status: user.subscriptionStatus,
        startDate: user.subscriptionStartDate,
        endDate: user.subscriptionEndDate,
      },
      billingHistory,
    })
  } catch (error) {
    console.error("Error fetching subscription data:", error)
    return NextResponse.json(
      { error: "Failed to fetch subscription data" },
      { status: 500 }
    )
  }
} 