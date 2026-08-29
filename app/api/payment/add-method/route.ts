import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { stripe } from "@/lib/stripe"
import { requireEmergencyFeature } from "@/lib/feature-flags"
import { requireLegalDisclaimerAcceptance } from "@/lib/legal-disclaimer-server"

/**
 * POST /api/payment/add-method
 * Returns a Stripe SetupIntent clientSecret so the frontend can collect
 * card details via Stripe Elements and attach them to the customer.
 */
export async function POST(request: Request) {
  try {
    const acceptanceError = requireLegalDisclaimerAcceptance(request)
    if (acceptanceError) return acceptanceError
    const featureError = requireEmergencyFeature(
      "ENABLE_PAYMENTS",
      "Payment methods"
    )
    if (featureError) return featureError

    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

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

    const setupIntent = await stripe.setupIntents.create({
      customer: stripeCustomerId,
      payment_method_types: ["card"],
    })

    return NextResponse.json({ clientSecret: setupIntent.client_secret })
  } catch (error) {
    console.error("Add payment method error:", error)
    return NextResponse.json({ error: "Failed to create setup intent" }, { status: 500 })
  }
}



