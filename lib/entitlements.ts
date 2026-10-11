import { prisma } from "./prisma"
import { RequestError } from "./request-guard"

export type SubscriptionState = {
  status: string; paidThrough: Date | null; trialEndsAt: Date | null; blocked: boolean
}
export function subscriptionAllowsAccess(state: SubscriptionState | null, now = new Date()): boolean {
  if (!state || state.blocked) return false
  if (state.status === "trialing") return !!state.trialEndsAt && state.trialEndsAt > now
  return state.status === "active" && !!state.paidThrough && state.paidThrough > now
}
export async function activeSubscription(ownerId: string) {
  const states = await prisma.billingSubscription.findMany({ where: { ownerId } })
  return states.find(s => subscriptionAllowsAccess(s)) ?? null
}
// Call only after readVersion has authenticated the owner or the per-draft guest cookie.
export async function versionEntitlement(versionId: string, ownerId: string | null) {
  const purchase = await prisma.documentPurchase.findFirst({ where: { versionId, ownerId, status: "paid" } })
  const subscription = ownerId ? await activeSubscription(ownerId) : null
  const paid = !!purchase || !!subscription
  return { canDownloadPDF: paid, canDownloadDOCX: paid, watermark: !paid, source: purchase ? "purchase" : subscription ? "subscription" : "none" }
}
export async function requireVersionEntitlement(versionId: string, ownerId: string | null) {
  const access = await versionEntitlement(versionId, ownerId)
  if (!access.canDownloadPDF) throw new RequestError(402, "PAYMENT_REQUIRED")
  return access
}
