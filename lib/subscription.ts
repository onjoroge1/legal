import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// Try to import Prisma
let prisma: any
try {
  const prismaModule = require("@/lib/prisma")
  prisma = prismaModule.prisma
} catch (error) {
  // Prisma not available
}

export interface SubscriptionInfo {
  tier: string
  status: string
  isActive: boolean
  startDate?: Date
  endDate?: Date
}

/**
 * Check if user has an active subscription
 */
export async function isSubscriptionActive(userEmail?: string): Promise<boolean> {
  if (!userEmail || !prisma) return false

  try {
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      select: {
        subscriptionStatus: true,
        subscriptionEndDate: true,
      },
    })

    if (!user) return false

    // Check if subscription is active and not expired
    const isActive = user.subscriptionStatus === "active"
    const isNotExpired = !user.subscriptionEndDate || new Date(user.subscriptionEndDate) > new Date()

    return isActive && isNotExpired
  } catch (error) {
    console.error("Error checking subscription:", error)
    return false
  }
}

/**
 * Get user's subscription information
 */
export async function getUserSubscriptionInfo(userEmail?: string): Promise<SubscriptionInfo | null> {
  if (!userEmail || !prisma) return null

  try {
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      select: {
        subscriptionTier: true,
        subscriptionStatus: true,
        subscriptionStartDate: true,
        subscriptionEndDate: true,
      },
    })

    if (!user) return null

    const isActive = user.subscriptionStatus === "active" && 
      (!user.subscriptionEndDate || new Date(user.subscriptionEndDate) > new Date())

    return {
      tier: user.subscriptionTier || "free",
      status: user.subscriptionStatus || "inactive",
      isActive,
      startDate: user.subscriptionStartDate ? new Date(user.subscriptionStartDate) : undefined,
      endDate: user.subscriptionEndDate ? new Date(user.subscriptionEndDate) : undefined,
    }
  } catch (error) {
    console.error("Error getting subscription info:", error)
    return null
  }
}

/**
 * Check if user has access to a document (either via subscription or purchase)
 *
 * Access is granted if:
 * 1. User has an active subscription (professional tier), OR
 * 2. User has previously purchased/generated this document type
 *    (stored in UserDocument with slug in metadata JSON)
 */
export async function hasAccessToDocument(
  userEmail?: string,
  documentSlug?: string
): Promise<boolean> {
  if (!userEmail || !documentSlug || !prisma) return false

  try {
    // Check if user has active subscription
    const hasSubscription = await isSubscriptionActive(userEmail)
    if (hasSubscription) return true

    // Check if user has purchased this specific document type
    // UserDocument doesn't have a slug column — the slug is stored
    // inside the metadata JSON field as { slug: "nda" }
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      include: {
        userDocuments: {
          where: {
            deletedAt: null,
            status: "completed",
          },
        },
      },
    })

    if (!user?.userDocuments || user.userDocuments.length === 0) return false

    // Check if any completed document matches the slug via metadata
    return user.userDocuments.some((doc: any) => {
      const metadata = doc.metadata as Record<string, any> | null
      return metadata?.slug === documentSlug
    })
  } catch (error) {
    console.error("Error checking document access:", error)
    return false
  }
}

/**
 * Get subscription info from session (server-side)
 */
export async function getSubscriptionFromSession(): Promise<SubscriptionInfo | null> {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return null
  return getUserSubscriptionInfo(session.user.email)
}




