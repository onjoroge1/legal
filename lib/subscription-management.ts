import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// Try to import Prisma
let prisma: any

try {
  const prismaModule = require("./prisma")
  prisma = prismaModule.prisma
} catch (error) {
  // Prisma not available
}

export interface PlanChangeResult {
  success: boolean
  message: string
  newTier?: string
  error?: string
}

/**
 * Upgrade user to a new plan
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
      // This is a downgrade, handle separately
      return {
        success: false,
        error: "Use downgradePlan for downgrades",
      }
    }

    const now = new Date()
    const endDate = new Date()
    endDate.setMonth(endDate.getMonth() + 1) // 1 month from now

    await prisma.user.update({
      where: { email: userEmail },
      data: {
        subscriptionTier: newTier,
        subscriptionStatus: "active",
        subscriptionStartDate: now,
        subscriptionEndDate: newTier === "professional" ? endDate : null, // Starter is pay-per-document
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

    // If downgrading from professional, keep access until end of billing period
    // If downgrading to free, cancel immediately
    const now = new Date()
    const shouldKeepAccess = currentTier === "professional" && 
                            user.subscriptionEndDate && 
                            new Date(user.subscriptionEndDate) > now

    await prisma.user.update({
      where: { email: userEmail },
      data: {
        subscriptionTier: newTier,
        subscriptionStatus: shouldKeepAccess ? "active" : "inactive",
        // Keep endDate if downgrading from professional (user keeps access until period ends)
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
    if (tier === "professional" && status !== "active") {
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




