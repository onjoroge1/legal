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
 * Cancel subscription
 * POST /api/billing/cancel
 *
 * Cancels the user's Stripe subscription at the end of the current billing period.
 * The user keeps access until the period ends, then the webhook handles downgrading to free.
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

    if (!prisma) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 500 }
      )
    }

    // Get user with Stripe details
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        stripeSubscriptionId: true,
        stripeCustomerId: true,
        subscriptionTier: true,
        subscriptionStatus: true,
        subscriptionEndDate: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    if (user.subscriptionTier === "free") {
      return NextResponse.json(
        { error: "No active subscription to cancel" },
        { status: 400 }
      )
    }

    // If user has a Stripe subscription, cancel it at period end
    if (user.stripeSubscriptionId) {
      try {
        const subscription = await stripe.subscriptions.update(
          user.stripeSubscriptionId,
          { cancel_at_period_end: true }
        )

        // Update local status to reflect pending cancellation
        await prisma.user.update({
          where: { email: session.user.email },
          data: {
            subscriptionStatus: "canceling",
            subscriptionEndDate: new Date(subscription.current_period_end * 1000),
          },
        })

        return NextResponse.json({
          message: `Your subscription will be cancelled at the end of your billing period on ${new Date(subscription.current_period_end * 1000).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}. You'll continue to have access until then.`,
          cancelAt: new Date(subscription.current_period_end * 1000).toISOString(),
        })
      } catch (stripeError: any) {
        console.error("Stripe cancellation error:", stripeError)

        // If the subscription is already cancelled in Stripe, update locally
        if (stripeError?.code === "resource_missing") {
          await prisma.user.update({
            where: { email: session.user.email },
            data: {
              subscriptionTier: "free",
              subscriptionStatus: "inactive",
              stripeSubscriptionId: null,
              subscriptionEndDate: null,
            },
          })

          return NextResponse.json({
            message: "Subscription cancelled successfully.",
          })
        }

        return NextResponse.json(
          { error: "Failed to cancel subscription with payment processor" },
          { status: 500 }
        )
      }
    }

    // If no Stripe subscription ID (legacy or starter tier), cancel locally
    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        subscriptionTier: "free",
        subscriptionStatus: "inactive",
        subscriptionEndDate: null,
      },
    })

    return NextResponse.json({
      message: "Subscription cancelled successfully.",
    })
  } catch (error) {
    console.error("Cancel subscription error:", error)
    return NextResponse.json(
      { error: "Failed to cancel subscription" },
      { status: 500 }
    )
  }
}
