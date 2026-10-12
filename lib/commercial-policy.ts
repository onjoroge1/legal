export type CommercialPolicy = {
 legalEntity: string; contactAddress: string; refundTerms: string;
 approvedBy: string; evidenceUrl: string; approvedAt: string; expiresAt: string;
}
// Must be completed by the business owner and qualified reviewer before new sales.
export const COMMERCIAL_POLICY: CommercialPolicy | null = null
export function currentCommercialPolicy(now = new Date(), policy: CommercialPolicy | null = COMMERCIAL_POLICY) {
 if (!policy || !policy.legalEntity.trim() || !policy.contactAddress.trim() || !policy.refundTerms.trim() || !policy.approvedBy.trim() || !policy.evidenceUrl.startsWith("https://") || !(new Date(policy.approvedAt) <= now && new Date(policy.expiresAt) > now)) return null
 return policy
}
export function requireCommercialPolicy() {
 return currentCommercialPolicy() ? null : Response.json({ error: "New purchases are unavailable pending publication of approved business and refund terms.", code: "COMMERCIAL_POLICY_REQUIRED" }, { status: 503, headers: { "Cache-Control": "no-store" } })
}
