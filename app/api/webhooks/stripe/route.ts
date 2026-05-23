import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"
import Stripe from "stripe"
import { sendDocumentReadyEmail } from "@/lib/email-service"

// Stripe requires the raw body for signature verification
export const runtime = "nodejs"

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 })
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("STRIPE_WEBHOOK_SECRET not configured")
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutCompleted(session)
        break
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdated(subscription)
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionDeleted(subscription)
        break
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice
        await handleInvoicePaymentSucceeded(invoice)
        break
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice
        await handleInvoicePaymentFailed(invoice)
        break
      }

      default:
        // Unhandled event — acknowledge receipt
        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error(`Error handling webhook event ${event.type}:`, error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const { userId, documentId, paymentType, isGuest } = session.metadata || {}

  if (!userId) {
    console.error("checkout.session.completed missing userId in metadata")
    return
  }

  // Fetch the user for email + name
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true, name: true },
  })

  // Finalize the pending document and fetch its content for the email
  let finalizedDoc: { title: string; content: string } | null = null
  if (documentId) {
    const doc = await prisma.userDocument.update({
      where: { id: documentId },
      data: { status: "completed" },
      select: { title: true, content: true },
    })
    finalizedDoc = doc
  }

  // For subscriptions, update user record when the session completes
  if (paymentType === "subscription" && session.subscription) {
    const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
    await prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionTier: "professional",
        subscriptionStatus: "active",
        stripeSubscriptionId: subscription.id,
        subscriptionStartDate: new Date((subscription as any).current_period_start * 1000),
        subscriptionEndDate: new Date((subscription as any).current_period_end * 1000),
      },
    })
  }

  // Send "document ready" email with PDF attached (fire-and-forget — never block the webhook)
  if (user?.email && finalizedDoc?.content && documentId) {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || "https://legallawdocs.com"
    sendDocumentReadyEmail({
      userEmail: user.email,
      userName: user.name || user.email.split("@")[0],
      documentTitle: finalizedDoc.title,
      documentContent: finalizedDoc.content,
      documentId,
      isGuest: isGuest === "true",
      appUrl,
    }).catch((err) => console.error("sendDocumentReadyEmail failed:", err))
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.userId
  if (!userId) return

  const isActive = subscription.status === "active" || subscription.status === "trialing"
  const tier = isActive ? "professional" : "free"

  await prisma.user.update({
    where: { id: userId },
    data: {
      subscriptionTier: tier,
      subscriptionStatus: subscription.status,
      stripeSubscriptionId: subscription.id,
      subscriptionStartDate: new Date((subscription as any).current_period_start * 1000),
      subscriptionEndDate: new Date((subscription as any).current_period_end * 1000),
    },
  })
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.userId
  if (!userId) return

  await prisma.user.update({
    where: { id: userId },
    data: {
      subscriptionTier: "free",
      subscriptionStatus: "cancelled",
      stripeSubscriptionId: null,
      subscriptionEndDate: new Date(),
    },
  })
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  if (!invoice.customer) return
  const customer = await stripe.customers.retrieve(invoice.customer as string)
  if (customer.deleted) return

  const userId = (customer as Stripe.Customer).metadata?.userId
  if (!userId) return

  // Renew subscription dates if this is a recurring invoice
  if (invoice.subscription) {
    const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string)
    await prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionStatus: "active",
        subscriptionEndDate: new Date((subscription as any).current_period_end * 1000),
      },
    })
  }
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  if (!invoice.customer) return
  const customer = await stripe.customers.retrieve(invoice.customer as string)
  if (customer.deleted) return

  const userId = (customer as Stripe.Customer).metadata?.userId
  if (!userId) return

  await prisma.user.update({
    where: { id: userId },
    data: { subscriptionStatus: "past_due" },
  })
}
