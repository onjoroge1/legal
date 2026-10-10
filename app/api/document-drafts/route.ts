import { z } from "zod"
import { readJson, requestError, formSchema, RequestError } from "@/lib/request-guard"
import { createDraft } from "@/lib/document-versions"
import { resolveDocument } from "@/lib/document-resolver"
import { guardAccount } from "@/lib/request-budget"
import { requireEmergencyFeature } from "@/lib/feature-flags"
const schema = z.object({ category: z.string().max(80), slug: z.string().max(160), intent: z.string().max(80).nullable().optional(), formData: formSchema }).strict()
export async function POST(request: Request) {
  const blocked = requireEmergencyFeature("ENABLE_AI_GENERATION", "Document drafting")
  if (blocked) return blocked
  try {
    const body = schema.parse(await readJson(request))
    let resolved
    try { resolved = resolveDocument(body.category, body.slug, body.intent, body.formData) } catch { throw new RequestError(422, "INVALID_DOCUMENT_IDENTITY") }
    await guardAccount(request)
    const { draft, cookie } = await createDraft(request, resolved, body.formData)
    return Response.json({ draftId: draft.id }, { headers: { "Cache-Control": "no-store", ...(cookie ? { "Set-Cookie": cookie } : {}) } })
  } catch (error) { return requestError(error) ?? Response.json({ error: "DRAFT_UNAVAILABLE" }, { status: 503 }) }
}
