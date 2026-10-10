import { getServerSession } from "next-auth"
import { authOptions } from "./auth"
import { prisma } from "./prisma"
import { subscriptionAllowsAccess } from "./entitlements"

export interface SubscriptionInfo {
  tier: string; status: string; isActive: boolean; startDate?: Date; endDate?: Date; cancelAtPeriodEnd?: boolean
}
export async function getUserSubscriptionInfo(email?: string): Promise<SubscriptionInfo | null> {
  if (!email) return null
  const user = await prisma.user.findUnique({ where: { email }, select: { billingSubscriptions: true } })
  if (!user) return null
  const state = user.billingSubscriptions.find(s => subscriptionAllowsAccess(s)) ?? user.billingSubscriptions.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())[0]
  const isActive = subscriptionAllowsAccess(state ?? null)
  return { tier: isActive ? "professional" : "free", status: state?.status ?? "inactive", isActive, endDate: (state?.status === "trialing" ? state.trialEndsAt : state?.paidThrough) ?? undefined, cancelAtPeriodEnd: state?.cancelAtPeriodEnd ?? false }
}
export async function isSubscriptionActive(email?: string) { return (await getUserSubscriptionInfo(email))?.isActive ?? false }
// Slugs cannot identify a purchased revision. Kept only for legacy subscription badges.
export async function hasAccessToDocument(email?: string, _slug?: string) { return isSubscriptionActive(email) }
export async function getSubscriptionFromSession() {
  const session = await getServerSession(authOptions)
  return getUserSubscriptionInfo(session?.user?.email ?? undefined)
}
