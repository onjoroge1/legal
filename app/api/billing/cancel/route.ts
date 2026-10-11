import { readJson, requestError } from "@/lib/request-guard"
import { z } from "zod"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { stripe } from "@/lib/stripe"

/**
 * POST /api/billing/cancel
 * Cancels the user's Stripe subscription at period end.
 */
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    z.object({}).strict().parse(await readJson(request, 128))
    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

    const subscription = await prisma.billingSubscription.findFirst({ where: { ownerId: user.id, status: { in: ["active", "trialing", "past_due"] } } })
    if (!subscription) {
      return NextResponse.json({ error: "No active subscription found" }, { status: 400 })
    }

    // Cancel at period end so the user keeps access until the billing date
    await stripe.subscriptions.update(subscription.id, {
      cancel_at_period_end: true,
    })

    await prisma.billingSubscription.update({
      where: { id: subscription.id },
      data: { cancelAtPeriodEnd: true },
    })

    return NextResponse.json({ message: "Subscription will be cancelled at the end of the billing period." })
  } catch (error) {
    const rejected = requestError(error)
    if (rejected) return rejected
    console.error("Cancel subscription error:")
    return NextResponse.json({ error: "Failed to cancel subscription" }, { status: 500 })
  }
}
