import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Run all queries in parallel for speed
    const [
      totalUsers,
      usersThisMonth,
      usersLastMonth,
      totalDocuments,
      documentsThisMonth,
      documentsLastMonth,
      subscriptionBreakdown,
      recentUsers,
      recentDocuments,
      documentsByType,
    ] = await Promise.all([
      // Total users
      prisma.user.count(),

      // Users this month
      prisma.user.count({
        where: {
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      }),

      // Users last month
      prisma.user.count({
        where: {
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
            lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      }),

      // Total documents
      prisma.userDocument.count(),

      // Documents this month
      prisma.userDocument.count({
        where: {
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      }),

      // Documents last month
      prisma.userDocument.count({
        where: {
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
            lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      }),

      // Subscription breakdown
      prisma.user.groupBy({
        by: ["subscriptionTier"],
        _count: { id: true },
      }),

      // Recent users (last 10)
      prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
        select: {
          id: true,
          name: true,
          email: true,
          subscriptionTier: true,
          subscriptionStatus: true,
          createdAt: true,
          _count: {
            select: { userDocuments: true },
          },
        },
      }),

      // Recent documents (last 10)
      prisma.userDocument.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
        select: {
          id: true,
          title: true,
          type: true,
          status: true,
          createdAt: true,
          user: {
            select: { name: true, email: true },
          },
        },
      }),

      // Documents by type
      prisma.userDocument.groupBy({
        by: ["type"],
        _count: { id: true },
        orderBy: { _count: { id: "desc" } },
      }),
    ])

    // Calculate growth percentages
    const userGrowth = usersLastMonth > 0
      ? Math.round(((usersThisMonth - usersLastMonth) / usersLastMonth) * 100)
      : usersThisMonth > 0 ? 100 : 0

    const docGrowth = documentsLastMonth > 0
      ? Math.round(((documentsThisMonth - documentsLastMonth) / documentsLastMonth) * 100)
      : documentsThisMonth > 0 ? 100 : 0

    // Format subscription data
    const subscriptions = subscriptionBreakdown.reduce(
      (acc: Record<string, number>, item: any) => {
        acc[item.subscriptionTier] = item._count.id
        return acc
      },
      {} as Record<string, number>
    )

    const paidUsers =
      (subscriptions["professional"] || 0) +
      (subscriptions["enterprise"] || 0) +
      (subscriptions["starter"] || 0)

    return NextResponse.json({
      overview: {
        totalUsers,
        usersThisMonth,
        userGrowth,
        totalDocuments,
        documentsThisMonth,
        docGrowth,
        paidUsers,
        conversionRate: totalUsers > 0
          ? Math.round((paidUsers / totalUsers) * 100)
          : 0,
      },
      subscriptions,
      recentUsers,
      recentDocuments,
      documentsByType: documentsByType.map((item: any) => ({
        type: item.type,
        count: item._count.id,
      })),
    })
  } catch (error) {
    console.error("Admin stats error:", error)
    return NextResponse.json(
      { error: "Failed to fetch admin stats" },
      { status: 500 }
    )
  }
}
