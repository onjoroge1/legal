import { NextResponse } from "next/server"
import { stripe, getTierForPriceId } from "@/lib/stripe"
import type Stripe from "stripe"

// Try to import Prisma
let prisma: any
try {
  const prismaModule = require("@/lib/prisma")
  prisma = prismaModule.prisma
} catch {
  // Prisma not available
}

/**
 * Stripe Webhook Handler
 * POST /api/webhooks/stripe
 *
 * Handles the following events:
 * - checkout.session.completed: Payment/subscription completed
 * - customer.subscription.updated: Subscription changed (upgrade/downgrade/renewal)
 * - customer.subscription.deleted: Subscription cancelled
 * - invoice.payment_succeeded: Recurring payment succeeded
 * - invoice.payment_failed: Recurring payment failed
 */
export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")

  if (!signature) {
    console.error("Webhook: No stripe-signature header")
    return NextResponse.json(
      { error: "No signature provided" },
      { status: 400 }
    )
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret || webhookSecret === "your_stripe_webhook_secret") {
    console.error("Webhook: STRIPE_WEBHOOK_SECRET not configured")
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message)
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${err.message}` },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session)
        break

      case "customer.subscription.updated":
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription)
        break

      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
        break

      case "invoice.payment_succeeded":
        await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice)
        break

      case "invoice.payment_failed":
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice)
        break

      default:
        // Unhandled event type
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error(`Webhook handler error for ${event.type}:`, error)
    // Return 200 to prevent Stripe from retrying - we've received the event
    // but had an internal error processing it. Log for manual review.
    return NextResponse.json({ received: true, error: "Internal processing error" })
  }
}

/**
 * Handle checkout.session.completed
 * This fires when a customer completes the Stripe Checkout flow
 */
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  if (!prisma) {
    console.error("Webhook: Prisma not available")
    return
  }

  const userEmail = session.metadata?.userEmail || session.customer_details?.email
  const tier = session.metadata?.tier
  const userId = session.metadata?.userId

  if (!userEmail) {
    console.error("Webhook: No user email in checkout session", session.id)
    return
  }

  if (session.mode === "subscription") {
    // Subscription checkout - update user with subscription details
    const subscriptionId = session.subscription as string

    // Fetch the full subscription to get the current period end
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)

    await prisma.user.update({
      where: { email: userEmail },
      data: {
        stripeCustomerId: session.customer as string,
        stripeSubscriptionId: subscriptionId,
        subscriptionTier: tier || "professional",
        subscriptionStatus: "active",
        subscriptionStartDate: new Date(subscription.current_period_start * 1000),
        subscriptionEndDate: new Date(subscription.current_period_end * 1000),
      },
    })

  } else if (session.mode === "payment") {
    // One-time payment (starter tier) - grant document access
    await prisma.user.update({
      where: { email: userEmail },
      data: {
        stripeCustomerId: session.customer as string,
        subscriptionTier: tier || "starter",
        subscriptionStatus: "active",
        subscriptionStartDate: new Date(),
        // Starter is pay-per-document, no end date
        subscriptionEndDate: null,
      },
    })

    // If a specific document slug was provided, we could create a UserDocument record here
  }
}

/**
 * Handle customer.subscription.updated
 * Fires when a subscription is changed (upgrade, downgrade, renewal, etc.)
 */
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  if (!prisma) return

  const customerId = subscription.customer as string

  // Find user by Stripe customer ID
  const user = await prisma.user.findUnique({
    where: { stripeCustomerId: customerId },
    select: { id: true, email: true },
  })

  if (!user) {
    console.error(`Webhook: No user found for Stripe customer ${customerId}`)
    return
  }

  // Determine the new tier from the subscription's price
  const priceId = subscription.items.data[0]?.price?.id
  const newTier = priceId ? getTierForPriceId(priceId) : "professional"

  // Map Stripe subscription status to our internal status
  let internalStatus: string
  switch (subscription.status) {
    case "active":
    case "trialing":
      internalStatus = "active"
      break
    case "past_due":
      internalStatus = "past_due"
      break
    case "canceled":
    case "unpaid":
      internalStatus = "inactive"
      break
    default:
      internalStatus = subscription.status
  }

  await prisma.user.update({
    where: { stripeCustomerId: customerId },
    data: {
      stripeSubscriptionId: subscription.id,
      subscriptionTier: newTier,
      subscriptionStatus: internalStatus,
      subscriptionStartDate: new Date(subscription.current_period_start * 1000),
      subscriptionEndDate: new Date(subscription.current_period_end * 1000),
    },
  })

}

/**
 * Handle customer.subscription.deleted
 * Fires when a subscription is fully cancelled (after any grace period)
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  if (!prisma) return

  const customerId = subscription.customer as string

  const user = await prisma.user.findUnique({
    where: { stripeCustomerId: customerId },
    select: { id: true, email: true },
  })

  if (!user) {
    console.error(`Webhook: No user found for Stripe customer ${customerId}`)
    return
  }

  await prisma.user.update({
    where: { stripeCustomerId: customerId },
    data: {
      subscriptionTier: "free",
      subscriptionStatus: "inactive",
      stripeSubscriptionId: null,
      subscriptionEndDate: new Date(), // Access ended now
    },
  })

}

/**
 * Handle invoice.payment_succeeded
 * Fires on successful recurring payments
 */
async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  if (!prisma) return

  const customerId = invoice.customer as string
  const subscriptionId = invoice.subscription as string

  if (!subscriptionId) return // Not a subscription invoice

  const user = await prisma.user.findUnique({
    where: { stripeCustomerId: customerId },
    select: { id: true, email: true },
  })

  if (!user) return

  // Fetch updated subscription to get new period dates
  const subscription = await stripe.subscriptions.retrieve(subscriptionId)

  await prisma.user.update({
    where: { stripeCustomerId: customerId },
    data: {
      subscriptionStatus: "active",
      subscriptionStartDate: new Date(subscription.current_period_start * 1000),
      subscriptionEndDate: new Date(subscription.current_period_end * 1000),
    },
  })

}

/**
 * Handle invoice.payment_failed
 * Fires when a recurring payment fails
 */
async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  if (!prisma) return

  const customerId = invoice.customer as string

  const user = await prisma.user.findUnique({
    where: { stripeCustomerId: customerId },
    select: { id: true, email: true },
  })

  if (!user) return

  await prisma.user.update({
    where: { stripeCustomerId: customerId },
    data: {
      subscriptionStatus: "past_due",
    },
  })

  // Send email notification about failed payment
  try {
    const { sendBillingNotificationEmail } = await import("@/lib/email-service")
    await sendBillingNotificationEmail(
      user.email,
      "Payment Failed - Action Required",
      `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e293b; border-bottom: 2px solid #ef4444; padding-bottom: 12px;">
            Payment Failed
          </h2>
          <p style="color: #475569; line-height: 1.6;">
            We were unable to process your subscription payment. Your subscription is now past due.
          </p>
          <p style="color: #475569; line-height: 1.6;">
            To avoid losing access to your documents and subscription benefits, please update your
            payment method as soon as possible.
          </p>
          <div style="margin: 24px 0; text-align: center;">
            <a href="${process.env.NEXTAUTH_URL || "https://www.legallawdocs.com"}/dashboard/billing"
               style="display: inline-block; background: #3b82f6; color: #ffffff; padding: 12px 32px;
                      border-radius: 8px; text-decoration: none; font-weight: 600;">
              Update Payment Method
            </a>
          </div>
          <p style="color: #94a3b8; font-size: 14px;">
            If you believe this is an error, please contact us at support@legallawdocs.com.
          </p>
        </div>
      `
    )
  } catch (emailError) {
    console.error("Failed to send payment failure email:", emailError)
  }
}
