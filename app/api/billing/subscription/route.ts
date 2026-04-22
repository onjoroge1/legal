import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { stripe } from "@/lib/stripe"

/**
 * GET /api/billing/subscription
 * Returns real subscription data, payment methods, and invoice history from Stripe.
 */
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
        stripeSubscriptionId: true,
      },
    })

    const subscription = {
      tier: user?.subscriptionTier || "free",
      status: user?.subscriptionStatus || "inactive",
      startDate: user?.subscriptionStartDate?.toISOString() || null,
      endDate: user?.subscriptionEndDate?.toISOString() || null,
      isActive: user?.subscriptionStatus === "active",
    }

    // Fetch real Stripe data if the user has a customer record
    let billingHistory: object[] = []
    let paymentMethods: object[] = []

    if (user?.stripeCustomerId) {
      const [invoices, stripePaymentMethods] = await Promise.all([
        stripe.invoices.list({ customer: user.stripeCustomerId, limit: 24 }),
        stripe.paymentMethods.list({ customer: user.stripeCustomerId, type: "card" }),
      ])

      billingHistory = invoices.data.map((inv) => ({
        id: inv.id,
        amount: (inv.amount_paid || 0) / 100,
        status: inv.status,
        date: new Date((inv.created || 0) * 1000).toISOString(),
        description: inv.lines?.data?.[0]?.description || "Invoice",
        invoiceUrl: inv.hosted_invoice_url || null,
        pdfUrl: inv.invoice_pdf || null,
      }))

      // Determine default payment method
      const customer = await stripe.customers.retrieve(user.stripeCustomerId) as any
      const defaultPmId = customer.invoice_settings?.default_payment_method

      paymentMethods = stripePaymentMethods.data.map((pm) => ({
        id: pm.id,
        brand: pm.card?.brand || "card",
        last4: pm.card?.last4 || "****",
        expMonth: pm.card?.exp_month,
        expYear: pm.card?.exp_year,
        isDefault: pm.id === defaultPmId,
      }))
    }

    return NextResponse.json({ subscription, billingHistory, paymentMethods })
  } catch (error) {
    console.error("Billing API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
