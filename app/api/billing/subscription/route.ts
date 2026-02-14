import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// Try to import Prisma
let prisma: any

try {
  const prismaModule = require("@/lib/prisma")
  prisma = prismaModule.prisma
} catch (error) {
  console.log("Prisma not available")
}

/**
 * Get billing data (subscription, billing history, payment methods)
 * GET /api/billing/subscription
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

    // Get user subscription
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        subscriptionTier: true,
        subscriptionStatus: true,
        subscriptionStartDate: true,
        subscriptionEndDate: true,
      },
    })

    const subscription = {
      tier: user?.subscriptionTier || "free",
      status: user?.subscriptionStatus || "active",
      startDate: user?.subscriptionStartDate?.toISOString() || null,
      endDate: user?.subscriptionEndDate?.toISOString() || null,
    }

    // Get billing history (mock for now - in production, this would come from Stripe or a transactions table)
    const billingHistory: any[] = []
    
    // If user has an active subscription, add subscription payments
    if (subscription.status === "active" && subscription.tier !== "free" && subscription.startDate) {
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
            id: `sub-${i}`,
            amount: subscription.tier === "professional" ? 49 : subscription.tier === "starter" ? 9 : 0,
            status: "paid",
            date: paymentDate.toISOString(),
            description: `${subscription.tier.charAt(0).toUpperCase() + subscription.tier.slice(1)} Subscription - ${paymentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}`,
          })
        }
      }
    }

    // Sort by date descending
    billingHistory.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    // Get payment methods (mock for now - in production, this would come from Stripe)
    const paymentMethods: any[] = []

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




