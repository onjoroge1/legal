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
 * Get billing data (subscription, billing history, payment methods)
 * GET /api/billing/subscription
 *
 * Returns subscription status from DB + billing history and payment methods from Stripe
 */
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    if (!prisma) {
      return NextResponse.json({
        subscription: {
          tier: "free",
          status: "active",
          startDate: null,
          endDate: null,
        },
        billingHistory: [],
        paymentMethods: [],
      })
    }

    // Get user subscription from DB
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        subscriptionTier: true,
        subscriptionStatus: true,
        subscriptionStartDate: true,
        subscriptionEndDate: true,
        stripeCustomerId: true,
        stripeSubscriptionId: true,
      },
    })

    const subscription = {
      tier: user?.subscriptionTier || "free",
      status: user?.subscriptionStatus || "active",
      startDate: user?.subscriptionStartDate?.toISOString() || null,
      endDate: user?.subscriptionEndDate?.toISOString() || null,
      cancelAtPeriodEnd: false,
    }

    // If user has a Stripe subscription, sync its status
    if (user?.stripeSubscriptionId) {
      try {
        const stripeSubscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId)
        subscription.cancelAtPeriodEnd = stripeSubscription.cancel_at_period_end
        subscription.endDate = new Date(stripeSubscription.current_period_end * 1000).toISOString()

        // Sync status if it's changed
        if (stripeSubscription.status === "active" && subscription.status !== "active" && subscription.status !== "canceling") {
          subscription.status = "active"
        }
      } catch {
        // Stripe subscription may no longer exist - that's OK
      }
    }

    // Fetch billing history from Stripe invoices
    let billingHistory: any[] = []
    if (user?.stripeCustomerId) {
      try {
        const invoices = await stripe.invoices.list({
          customer: user.stripeCustomerId,
          limit: 24,
        })

        billingHistory = invoices.data.map((invoice) => ({
          id: invoice.id,
          amount: (invoice.amount_paid || 0) / 100, // Convert cents to dollars
          status: invoice.status === "paid" ? "paid" : invoice.status === "open" ? "pending" : invoice.status || "unknown",
          date: invoice.created ? new Date(invoice.created * 1000).toISOString() : null,
          description: invoice.lines?.data?.[0]?.description ||
            `${subscription.tier.charAt(0).toUpperCase() + subscription.tier.slice(1)} Plan`,
          invoiceUrl: invoice.hosted_invoice_url || null,
          invoicePdf: invoice.invoice_pdf || null,
        }))
      } catch {
        // Could not retrieve Stripe invoices
      }
    }

    // If no Stripe invoices but user has active subscription, generate basic history
    if (billingHistory.length === 0 && subscription.status === "active" && subscription.tier !== "free" && subscription.startDate) {
      const startDate = new Date(subscription.startDate)
      const now = new Date()
      const monthsSinceStart = Math.floor(
        (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30)
      )

      for (let i = 0; i <= monthsSinceStart && i < 12; i++) {
        const paymentDate = new Date(startDate)
        paymentDate.setMonth(paymentDate.getMonth() + i)

        if (paymentDate <= now) {
          billingHistory.push({
            id: `local-${i}`,
            amount: subscription.tier === "professional" ? 49 : subscription.tier === "starter" ? 9 : 0,
            status: "paid",
            date: paymentDate.toISOString(),
            description: `${subscription.tier.charAt(0).toUpperCase() + subscription.tier.slice(1)} Plan - ${paymentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}`,
            invoiceUrl: null,
            invoicePdf: null,
          })
        }
      }
    }

    // Sort by date descending
    billingHistory.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())

    // Fetch payment methods from Stripe
    let paymentMethods: any[] = []
    if (user?.stripeCustomerId) {
      try {
        const stripeMethods = await stripe.paymentMethods.list({
          customer: user.stripeCustomerId,
          type: "card",
        })

        // Get the default payment method from the customer object
        const customer = await stripe.customers.retrieve(user.stripeCustomerId) as any
        const defaultPaymentMethodId = customer?.invoice_settings?.default_payment_method

        paymentMethods = stripeMethods.data.map((method) => ({
          id: method.id,
          type: method.card?.brand || "card",
          last4: method.card?.last4 || "****",
          expiry: method.card ? `${String(method.card.exp_month).padStart(2, "0")}/${method.card.exp_year}` : "",
          isDefault: method.id === defaultPaymentMethodId,
        }))
      } catch {
        // Could not retrieve Stripe payment methods
      }
    }

    return NextResponse.json({
      subscription,
      billingHistory,
      paymentMethods,
    })
  } catch (error) {
    console.error("Billing API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
