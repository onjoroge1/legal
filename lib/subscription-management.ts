import { isSubscriptionActive } from "./subscription"
export type PlanChangeResult = { success: false; error: string }
// Entitlements may only be changed by verified provider fulfillment.
export async function upgradePlan(_email: string, _tier: "starter" | "professional"): Promise<PlanChangeResult> { return { success: false, error: "Use authenticated checkout" } }
export async function downgradePlan(_email: string, _tier: "free" | "starter"): Promise<PlanChangeResult> { return { success: false, error: "Use authenticated billing cancellation" } }
export async function cancelSubscription(email: string) { return downgradePlan(email, "free") }
export async function changePlan(_email: string, _tier: "free" | "starter" | "professional"): Promise<PlanChangeResult> { return { success: false, error: "Use authenticated billing checkout or cancellation" } }
export async function canGenerateDocument(email: string) { const allowed = await isSubscriptionActive(email); return { allowed, reason: allowed ? undefined : "An active subscription is required for premium generation" } }
