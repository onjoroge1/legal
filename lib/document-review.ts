import { createHash } from "crypto"
import { reviewedScope } from "./reviewed-document-scopes"
import { currentFact } from "./generation-fidelity"
import { prisma } from "./prisma"
import { RequestError } from "./request-guard"
export async function requireReviewedVersion(version: { id: string; contentHash: string; review?: unknown }) {
  const checks = version.review as { readyForExport?: boolean; scopeKey?: string; scopeEvidenceUrl?: string; checkedAt?: string; sourceSnapshot?: { id: string; contentHash: string }[] } | undefined
  const scope = checks?.scopeKey ? reviewedScope(checks.scopeKey) : undefined
  if (checks?.readyForExport && scope && scope.evidenceUrl === checks.scopeEvidenceUrl && checks.checkedAt && Date.now() - new Date(checks.checkedAt).getTime() < 7 * 86400000 && checks.sourceSnapshot?.length) {
    const facts = await prisma.verifiedFact.findMany({ where: { id: { in: checks.sourceSnapshot.map(f => f.id) } } })
    if (checks.sourceSnapshot.every(saved => facts.some(f => f.id === saved.id && currentFact(f) && createHash("sha256").update(f.content).digest("hex") === saved.contentHash))) return scope
  }
  const review = await prisma.documentReview.findUnique({ where: { versionId: version.id } })
  if (!review || review.contentHash !== version.contentHash || review.expiresAt <= new Date()) throw new RequestError(409, "DOCUMENT_REVIEW_REQUIRED")
  return review
}
