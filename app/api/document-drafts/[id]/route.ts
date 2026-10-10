import { draftAccess } from "@/lib/document-versions"
import { requestError } from "@/lib/request-guard"
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const draft = await draftAccess(request, (await params).id)
    return Response.json({ draftId: draft.id, formData: draft.formData, intent: draft.intent, category: draft.category, sourceSlug: draft.sourceSlug }, { headers: { "Cache-Control": "private, no-store" } })
  } catch (error) { return requestError(error) ?? Response.json({ error: "DRAFT_UNAVAILABLE" }, { status: 503 }) }
}
