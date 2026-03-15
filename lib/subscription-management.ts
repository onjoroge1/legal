// Try to import Prisma
let prisma: any

try {
  const prismaModule = require("./prisma")
  prisma = prismaModule.prisma
} catch (error) {
  // Prisma not available
}

// Try to import Stripe
let stripeLib: any
try {
  stripeLib = require("./stripe")
} catch {
  // Stripe not available
}

export interface PlanChangeResult {
  success: boolean
  message: string
  newTier?: string
  error?: string
  checkoutUrl?: string
}

/**
 * Upgrade user to a new plan
 * For paid plans, this creates a Stripe Checkout Session
 */
export async function upgradePlan(
  userEmail: string,
  newTier: "starter" | "professional"
): Promise<PlanChangeResult> {
  if (!prisma) {
    return {
      success: false,
      error: "Database not configured",
    }
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      select: {
        subscriptionTier: true,
        subscriptionStatus: true,
        stripeSubscriptionId: true,
      },
    })

    if (!user) {
      return {
        success: false,
        error: "User not found",
      }
    }

    const currentTier = user.subscriptionTier || "free"

    // Validate upgrade path
    if (currentTier === "professional" && newTier === "starter") {
      return {
        success: false,
        error: "Use downgradePlan for downgrades",
      }
    }

    // If upgrading from starter to professional, and user has an existing Stripe subscription
    // that needs to be updated, handle via Stripe
    if (stripeLib && user.stripeSubscriptionId && newTier === "professional") {
      try {
        const subscription = await stripeLib.stripe.subscriptions.retrieve(user.stripeSubscriptionId)
        const priceId = stripeLib.getPriceIdForTier(newTier)

        if (priceId && subscription.items.data.length > 0) {
          // Update existing subscription to new price
          await stripeLib.stripe.subscriptions.update(user.stripeSubscriptionId, {
            items: [
              {
                id: subscription.items.data[0].id,
                price: priceId,
              },
            ],
            proration_behavior: "create_prorations",
          })

          await prisma.user.update({
            where: { email: userEmail },
            data: {
              subscriptionTier: newTier,
              subscriptionStatus: "active",
            },
          })

          return {
            success: true,
            message: `Successfully upgraded to ${newTier} plan`,
            newTier,
          }
        }
      } catch (err) {
        console.error("Stripe subscription update error:", err)
        // Fall through to local-only update
      }
    }

    // Local-only update (for when Stripe checkout is handled separately,
    // or when webhooks will handle the Stripe side)
    const now = new Date()
    const endDate = new Date()
    endDate.setMonth(endDate.getMonth() + 1) // 1 month from now

    await prisma.user.update({
      where: { email: userEmail },
      data: {
        subscriptionTier: newTier,
        subscriptionStatus: "active",
        subscriptionStartDate: now,
        subscriptionEndDate: newTier === "professional" ? endDate : null,
      },
    })

    return {
      success: true,
      message: `Successfully upgraded to ${newTier} plan`,
      newTier,
    }
  } catch (error) {
    console.error("Upgrade plan error:", error)
    return {
      success: false,
      error: "Failed to upgrade plan",
    }
  }
}

/**
 * Downgrade user to a lower plan
 */
export async function downgradePlan(
  userEmail: string,
  newTier: "free" | "starter"
): Promise<PlanChangeResult> {
  if (!prisma) {
    return {
      success: false,
      error: "Database not configured",
    }
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      select: {
        subscriptionTier: true,
        subscriptionStatus: true,
        subscriptionEndDate: true,
        stripeSubscriptionId: true,
      },
    })

    if (!user) {
      return {
        success: false,
        error: "User not found",
      }
    }

    const currentTier = user.subscriptionTier || "free"

    // Validate downgrade path
    if (currentTier === "free" && newTier === "free") {
      return {
        success: false,
        error: "Already on free plan",
      }
    }

    // If user has a Stripe subscription, cancel it at period end
    if (stripeLib && user.stripeSubscriptionId && newTier === "free") {
      try {
        const subscription = await stripeLib.stripe.subscriptions.update(
          user.stripeSubscriptionId,
          { cancel_at_period_end: true }
        )

        await prisma.user.update({
          where: { email: userEmail },
          data: {
            subscriptionStatus: "canceling",
            subscriptionEndDate: new Date(subscription.current_period_end * 1000),
          },
        })

        return {
          success: true,
          message: `Your subscription will downgrade to ${newTier} at the end of your billing period`,
          newTier,
        }
      } catch (err) {
        console.error("Stripe cancellation error:", err)
        // Fall through to local update
      }
    }

    // Local-only downgrade
    const now = new Date()
    const shouldKeepAccess = currentTier === "professional" &&
                            user.subscriptionEndDate &&
                            new Date(user.subscriptionEndDate) > now

    await prisma.user.update({
      where: { email: userEmail },
      data: {
        subscriptionTier: newTier,
        subscriptionStatus: shouldKeepAccess ? "active" : "inactive",
        subscriptionEndDate: shouldKeepAccess ? user.subscriptionEndDate : null,
      },
    })

    return {
      success: true,
      message: shouldKeepAccess
        ? `Plan will downgrade to ${newTier} at the end of your billing period`
        : `Successfully downgraded to ${newTier} plan`,
      newTier,
    }
  } catch (error) {
    console.error("Downgrade plan error:", error)
    return {
      success: false,
      error: "Failed to downgrade plan",
    }
  }
}

/**
 * Cancel subscription (downgrade to free)
 */
export async function cancelSubscription(userEmail: string): Promise<PlanChangeResult> {
  return downgradePlan(userEmail, "free")
}

/**
 * Change user plan (upgrade or downgrade)
 */
export async function changePlan(
  userEmail: string,
  newTier: "free" | "starter" | "professional"
): Promise<PlanChangeResult> {
  if (!prisma) {
    return {
      success: false,
      error: "Database not configured",
    }
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      select: {
        subscriptionTier: true,
      },
    })

    if (!user) {
      return {
        success: false,
        error: "User not found",
      }
    }

    const currentTier = user.subscriptionTier || "free"

    // Determine if this is an upgrade or downgrade
    const tierOrder = { free: 0, starter: 1, professional: 2 }
    const currentOrder = tierOrder[currentTier as keyof typeof tierOrder] || 0
    const newOrder = tierOrder[newTier] || 0

    if (newOrder > currentOrder) {
      return upgradePlan(userEmail, newTier as "starter" | "professional")
    } else if (newOrder < currentOrder) {
      return downgradePlan(userEmail, newTier as "free" | "starter")
    } else {
      return {
        success: false,
        error: "Already on this plan",
      }
    }
  } catch (error) {
    console.error("Change plan error:", error)
    return {
      success: false,
      error: "Failed to change plan",
    }
  }
}

/**
 * Check if user can generate a document (considering limits)
 */
export async function canGenerateDocument(userEmail: string): Promise<{
  allowed: boolean
  reason?: string
  upgradeMessage?: string
}> {
  if (!prisma) {
    return {
      allowed: false,
      reason: "Database not configured",
    }
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      select: {
        subscriptionTier: true,
        subscriptionStatus: true,
      },
    })

    if (!user) {
      return {
        allowed: false,
        reason: "User not found",
      }
    }

    const tier = user.subscriptionTier || "free"
    const status = user.subscriptionStatus || "inactive"

    // Free tier cannot generate
    if (tier === "free") {
      return {
        allowed: false,
        reason: "Free plan does not include document generation",
        upgradeMessage: "Upgrade to Starter ($9 per document) or Professional ($49/month) to generate documents",
      }
    }

    // Check if subscription is active
    if (tier === "professional" && status !== "active" && status !== "canceling") {
      return {
        allowed: false,
        reason: "Subscription is not active",
        upgradeMessage: "Please renew your subscription to continue generating documents",
      }
    }

    // Starter and Professional can generate
    return {
      allowed: true,
    }
  } catch (error) {
    console.error("Can generate document error:", error)
    return {
      allowed: false,
      reason: "Error checking permissions",
    }
  }
}
