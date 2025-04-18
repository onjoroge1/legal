import { prisma } from "@/lib/prisma"

export async function checkSubscriptionAccess(userId: string) {
  try {
    // Get user with their subscription info
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        isAdmin: true,
        subscriptionTier: true,
        subscriptionStatus: true,
        _count: {
          select: {
            documents: true
          }
        }
      }
    })

    if (!user) {
      return {
        allowed: false,
        message: "User not found"
      }
    }

    // Admins always have access
    if (user.isAdmin) {
      return {
        allowed: true
      }
    }

    // Check subscription status
    if (user.subscriptionTier === "free") {
      // Free users can only create 1 document
      if (user._count.documents >= 1) {
        return {
          allowed: false,
          message: "Free plan limit reached. Please upgrade to create more documents.",
          redirectTo: "/dashboard/billing"
        }
      }
    }

    // Allow access for paid plans or free users under limit
    return {
      allowed: true
    }
  } catch (error) {
    console.error("Error checking subscription access:", error)
    return {
      allowed: false,
      message: "Error checking subscription access"
    }
  }
} 