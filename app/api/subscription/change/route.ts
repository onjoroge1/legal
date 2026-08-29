import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { stripe, PRICE_IDS } from "@/lib/stripe"
import { requireEmergencyFeature } from "@/lib/feature-flags"
import {
  getLegalDisclaimerAcceptance,
  requireLegalDisclaimerAcceptance,
} from "@/lib/legal-disclaimer-server"

/**
 * POST /api/subscription/change
 * Upgrades or downgrades a Stripe subscription.
 * Upgrading creates a new Stripe Checkout Session (returns {url}).
 * Downgrading to free cancels the subscription immediately.
 */
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { tier } = await request.json()
    const validTiers = ["free", "starter", "professional"]
    if (!validTiers.includes(tier)) {
      return NextResponse.json({ error: "Invalid subscription tier" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || "http://localhost:3000"

    if (tier === "free") {
      // Cancel immediately
      if (user.stripeSubscriptionId) {
        await stripe.subscriptions.cancel(user.stripeSubscriptionId)
      }
      await prisma.user.update({
        where: { id: user.id },
        data: { subscriptionTier: "free", subscriptionStatus: "inactive", stripeSubscriptionId: null },
      })
      return NextResponse.json({ message: "Downgraded to free plan." })
    }

    const acceptanceError = requireLegalDisclaimerAcceptance(request)
    if (acceptanceError) return acceptanceError
    const featureError = requireEmergencyFeature(
      "ENABLE_PAYMENTS",
      "Subscription changes"
    )
    if (featureError) return featureError
    const legalAcceptance = getLegalDisclaimerAcceptance(request)

    // Upgrading — send to Stripe Checkout
    let stripeCustomerId = user.stripeCustomerId
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: { userId: user.id },
      })
      stripeCustomerId = customer.id
      await prisma.user.update({ where: { id: user.id }, data: { stripeCustomerId } })
    }

    // If they already have a subscription, modify it in place
    if (user.stripeSubscriptionId) {
      const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId)
      const itemId = subscription.items.data[0]?.id
      if (itemId) {
        await stripe.subscriptions.update(user.stripeSubscriptionId, {
          items: [{ id: itemId, price: PRICE_IDS[tier as "starter" | "professional"] }],
          proration_behavior: "create_prorations",
          metadata: {
            ...subscription.metadata,
            legalDisclaimerVersion: legalAcceptance.version,
          },
        })
        await prisma.user.update({
          where: { id: user.id },
          data: { subscriptionTier: tier, subscriptionStatus: "active" },
        })
        return NextResponse.json({ message: `Switched to ${tier} plan.` })
      }
    }

    // No existing subscription — create a checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      mode: "subscription",
      line_items: [{ price: PRICE_IDS[tier as "starter" | "professional"], quantity: 1 }],
      success_url: `${appUrl}/dashboard/billing?success=true&tier=${tier}`,
      cancel_url: `${appUrl}/dashboard/billing`,
      metadata: {
        userId: user.id,
        paymentType: "subscription",
        legalDisclaimerVersion: legalAcceptance.version,
      },
      subscription_data: {
        metadata: {
          userId: user.id,
          legalDisclaimerVersion: legalAcceptance.version,
        },
      },
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error("Change subscription error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
