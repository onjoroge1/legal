import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { stripe, getPriceIdForTier, getOrCreateStripeCustomer } from "@/lib/stripe"

// Try to import Prisma
let prisma: any
try {
  const prismaModule = require("@/lib/prisma")
  prisma = prismaModule.prisma
} catch {
  // Prisma not available
}

/**
 * Create a Stripe Checkout Session for subscription upgrade
 * POST /api/payment/create-checkout
 *
 * Body: { tier: "starter" | "professional" }
 *
 * For "starter" (pay-per-document): Creates a one-time payment checkout
 * For "professional" (monthly subscription): Creates a recurring subscription checkout
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
    const { tier, documentSlug } = body

    // Validate tier
    const validTiers = ["starter", "professional"]
    if (!validTiers.includes(tier)) {
      return NextResponse.json(
        { error: "Invalid subscription tier. Choose 'starter' or 'professional'." },
        { status: 400 }
      )
    }

    // Get the Stripe price ID for the selected tier
    const priceId = getPriceIdForTier(tier)
    if (!priceId) {
      return NextResponse.json(
        { error: "Price configuration not found for this tier" },
        { status: 500 }
      )
    }

    // Get the user from database to find their Stripe customer ID
    let stripeCustomerId: string | null = null
    let user: any = null

    if (prisma) {
      user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: {
          id: true,
          stripeCustomerId: true,
          subscriptionTier: true,
          stripeSubscriptionId: true,
          name: true,
        },
      })

      // Don't allow purchasing the same tier
      if (user?.subscriptionTier === tier) {
        return NextResponse.json(
          { error: `You are already on the ${tier} plan` },
          { status: 400 }
        )
      }

      // If user has an active professional subscription and wants starter, block it
      if (user?.subscriptionTier === "professional" && tier === "starter") {
        return NextResponse.json(
          { error: "Please cancel your Professional subscription first before switching to Starter" },
          { status: 400 }
        )
      }

      stripeCustomerId = user?.stripeCustomerId || null
    }

    // Get or create Stripe customer
    const customerId = await getOrCreateStripeCustomer(
      session.user.email,
      user?.name || session.user.name || undefined,
      stripeCustomerId
    )

    // Save the Stripe customer ID if it's new
    if (prisma && customerId !== stripeCustomerId) {
      await prisma.user.update({
        where: { email: session.user.email },
        data: { stripeCustomerId: customerId },
      })
    }

    // Build the base URL for redirects
    const origin = request.headers.get("origin") || process.env.NEXTAUTH_URL || "http://localhost:3000"

    // Create the Stripe Checkout Session
    const isSubscription = tier === "professional"

    // Set context-aware redirect URLs
    // If purchasing a document, redirect back to the document flow
    // Otherwise, redirect to the billing dashboard
    const successUrl = documentSlug
      ? `${origin}/documents/${documentSlug}/download?payment=success&tier=${tier}&session_id={CHECKOUT_SESSION_ID}`
      : `${origin}/dashboard/billing?success=true&tier=${tier}&session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = documentSlug
      ? `${origin}/documents/${documentSlug}/checkout?canceled=true`
      : `${origin}/dashboard/billing?canceled=true`

    const checkoutParams: any = {
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: isSubscription ? "subscription" : "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId: user?.id || "",
        userEmail: session.user.email,
        tier,
        ...(documentSlug ? { documentSlug } : {}),
      },
      allow_promotion_codes: true,
      billing_address_collection: "auto",
    }

    // For subscriptions, add subscription metadata
    if (isSubscription) {
      checkoutParams.subscription_data = {
        metadata: {
          userId: user?.id || "",
          userEmail: session.user.email,
          tier,
        },
      }
    }

    // For one-time payments (starter), add payment intent metadata
    if (!isSubscription) {
      checkoutParams.payment_intent_data = {
        metadata: {
          userId: user?.id || "",
          userEmail: session.user.email,
          tier,
          ...(documentSlug ? { documentSlug } : {}),
        },
      }
    }

    const checkoutSession = await stripe.checkout.sessions.create(checkoutParams)

    return NextResponse.json({
      url: checkoutSession.url,
      sessionId: checkoutSession.id,
    })
  } catch (error: any) {
    console.error("Checkout creation error:", error)

    // Handle specific Stripe errors
    if (error?.type === "StripeInvalidRequestError") {
      return NextResponse.json(
        { error: error.message || "Invalid request to payment processor" },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Failed to create checkout session. Please try again." },
      { status: 500 }
    )
  }
}
