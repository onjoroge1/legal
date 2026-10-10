/** Populate only after qualified counsel reviews the golden outputs and the source coverage for this scope. */
export type ReviewedScope = { key: string; reviewer: string; evidenceUrl: string; reviewedAt: string; expiresAt: string }
export const REVIEWED_DOCUMENT_SCOPES: ReviewedScope[] = []
export function reviewedScope(key: string, now = new Date(), scopes = REVIEWED_DOCUMENT_SCOPES) {
  return scopes.find(scope => scope.key === key && scope.reviewer && scope.evidenceUrl.startsWith("https://") && new Date(scope.reviewedAt) <= now && new Date(scope.expiresAt) > now)
}
