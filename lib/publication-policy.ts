import { createHash } from "crypto"
import { reviewedScope } from "./reviewed-document-scopes"

export type Publication = {
 path: string; kind: "document" | "article"; title: string; description: string;
 jurisdiction: string; scopeKey?: string; author: string;
 sections: { heading: string; body: string }[];
 sources: { url: string; title: string; effectiveAt: string }[];
 modifiedAt: string;
}
export type PublicationApproval = {
 publication: Publication; contentHash: string; reviewer: string; credentials: string;
 evidenceUrl: string; journeyEvidenceUrl: string; reviewedAt: string; expiresAt: string;
}
// Empty deliberately: engineering checks are not qualified legal/content approval.
// Add reviewed, hash-bound entries through a reviewed PR; never approve all legacy content.
export const PUBLICATION_APPROVALS: PublicationApproval[] = []
export function publicationHash(publication: Publication) {
 return createHash("sha256").update(JSON.stringify(publication)).digest("hex")
}
function https(value: string) { try { const u = new URL(value); return u.protocol === "https:" && !u.username && !u.password } catch { return false } }
export function approvedPublication(path: string, now = new Date(), entries = PUBLICATION_APPROVALS) {
 const matches = entries.filter(entry => entry.publication.path === path)
 if (matches.length !== 1) return undefined
 const entry = matches[0], p = entry.publication
 if (!/^\/(?:documents|blog)\/[a-z0-9/-]+$/.test(path) || !p.title.trim() || !p.description.trim() || !p.author.trim() || !p.jurisdiction.trim() || !p.sections.length || !p.sections.every(s => s.heading.trim() && s.body.trim())) return undefined
 if (publicationHash(p) !== entry.contentHash || !entry.reviewer.trim() || !entry.credentials.trim() || !https(entry.evidenceUrl) || !https(entry.journeyEvidenceUrl)) return undefined
 if (!(new Date(p.modifiedAt) <= new Date(entry.reviewedAt) && new Date(entry.reviewedAt) <= now && now < new Date(entry.expiresAt))) return undefined
 if (!p.sources.length || !p.sources.every(s => https(s.url) && s.title.trim() && new Date(s.effectiveAt) <= now)) return undefined
 if (p.kind === "document" && (!p.scopeKey || !reviewedScope(p.scopeKey, now))) return undefined
 return entry
}
export function publishedContent(now = new Date()) {
 return PUBLICATION_APPROVALS.filter(entry => approvedPublication(entry.publication.path, now) === entry)
}
