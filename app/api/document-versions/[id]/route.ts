import { versionEntitlement } from "@/lib/entitlements"
import { readVersion } from "@/lib/document-versions"
import { requestError } from "@/lib/request-guard"
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { version, draft } = await readVersion(request, (await params).id)
    return Response.json({ canReuseDraft: !version.claimedOwnerId, id: version.id, draftId: version.draftId, title: version.title, content: version.content, contentHash: version.contentHash, formData: version.formData, review: version.review, createdAt: version.createdAt, access: await versionEntitlement(version.id, draft.ownerId), category: draft.category, sourceSlug: draft.sourceSlug, canonicalSlug: draft.canonicalSlug, intent: draft.intent, jurisdiction: draft.jurisdiction }, { headers: { "Cache-Control": "private, no-store" } })
  } catch (error) { return requestError(error) ?? Response.json({ error: "DOCUMENT_UNAVAILABLE" }, { status: 503 }) }
}
