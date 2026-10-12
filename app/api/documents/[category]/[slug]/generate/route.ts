import { recordFunnel } from "@/lib/funnel"
import { beginOperation, finishOperation } from "@/lib/operations-telemetry"
import { reviewedScope } from "@/lib/reviewed-document-scopes"
import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import { prisma } from "@/lib/prisma"
import { resolveDocument } from "@/lib/document-resolver"
import { saveVersion, draftAccess } from "@/lib/document-versions"
import { generationSchema, readJson, requestError, RequestError } from "@/lib/request-guard"
import { guardAI } from "@/lib/request-budget"
import { requireEmergencyFeature } from "@/lib/feature-flags"
import { requireLegalDisclaimerAcceptance } from "@/lib/legal-disclaimer-server"
import { LEGAL_DISCLAIMER_VERSION, LEGAL_DISCLAIMER_PRIMARY_COPY } from "@/lib/legal-disclaimer"
import { jurisdictionKeys, grounding, generationPrompt, validateFidelity, cleanGeneratedText, outputIssues } from "@/lib/generation-fidelity"
import { getDocumentValidation } from "@/lib/document-validation"
import { getDocumentQuestions } from "@/lib/document-questions"

export const maxDuration = 60

export async function POST(request: Request, { params }: { params: Promise<{ category: string; slug: string }> }) {
  let metric: Awaited<ReturnType<typeof beginOperation>> | null = null; let success = false
  try {
    const acceptanceError = requireLegalDisclaimerAcceptance(request)
    if (acceptanceError) return acceptanceError
    const blocked = requireEmergencyFeature("ENABLE_AI_GENERATION", "Document generation")
    if (blocked) return blocked
    const { category, slug } = await params
    const { formData, intent, draftId } = generationSchema.parse(await readJson(request))
    let resolved
    try { resolved = resolveDocument(category, slug, intent, formData) } catch { throw new RequestError(422, "INVALID_DOCUMENT_IDENTITY") }
    const validation = getDocumentValidation(resolved.doc.legacySlug, formData, resolved.intent)
    const missing = getDocumentQuestions(resolved.doc.slug).filter(q => q.required && !String(formData[q.id] ?? "").trim()).map(q => q.id)
    // Localized country documents do not silently use the US state questionnaire.
    if (resolved.country) throw new RequestError(422, "INTERNATIONAL_REVIEW_REQUIRED")
    if (!resolved.jurisdiction) throw new RequestError(422, "JURISDICTION_REQUIRED")
    if (missing.length || Object.keys(validation).length) return Response.json({ error: "COMPLETE_REQUIRED_FIELDS", fields: [...missing, ...Object.keys(validation)] }, { status: 422 })
    if (draftId) {
      const draft = await draftAccess(request, draftId)
      if (draft.canonicalSlug !== resolved.doc.slug || draft.intent !== resolved.intent || draft.jurisdiction !== resolved.jurisdiction) throw new RequestError(409, "DRAFT_IDENTITY_CONFLICT")
    }
    await guardAI(request)
    metric = await beginOperation("generation")
    const facts = await prisma.verifiedFact.findMany({ where: { jurisdiction: { in: jurisdictionKeys(resolved) }, documentSlug: resolved.doc.parentSlug ?? resolved.doc.slug, status: "approved" }, take: 100 })
    const ground = grounding(resolved, facts)
    // Old generic templates are deliberately not used: a unilateral seed cannot override mutual intent.
    const result = await generateText({ model: google("gemini-2.5-flash"), prompt: generationPrompt(resolved, formData, ground.text), maxOutputTokens: 8192, maxRetries: 0, abortSignal: AbortSignal.any([request.signal, AbortSignal.timeout(55000)]) })
    const fidelity = validateFidelity(result.text, resolved, formData)
    if (fidelity.length) return Response.json({ error: "DOCUMENT_FACT_OR_INTENT_MISMATCH", issues: fidelity }, { status: 422 })
    const cleaned = cleanGeneratedText(result.text, ground.text, ground.facts, formData)
    const scopeKey = `${resolved.doc.slug}:${resolved.intent ?? "standard"}:${resolved.jurisdiction}`
    const scope = reviewedScope(scopeKey)
    const issues = [...outputIssues(cleaned.cleaned), ...ground.missing.map(key => `SOURCE_REVIEW_REQUIRED:${key}`)]
    if (!scope) issues.push("QUALIFIED_LEGAL_REVIEW_REQUIRED")
    if (cleaned.flagged) issues.push("UNVERIFIED_LEGAL_CLAIMS")
    const review = { issues, readyForExport: issues.length === 0, scopeKey, scopeEvidenceUrl: scope?.evidenceUrl ?? null, sourceSnapshot: ground.sources, checkedAt: new Date().toISOString(), intent: resolved.intent }
    const saved = await saveVersion(request, resolved, formData, cleaned.cleaned, review, draftId)
    const { cookie, ...identity } = saved
    await recordFunnel(request, "generation")
    success = true
    return Response.json({ document: cleaned.cleaned, ...identity, review, citations: { verified: cleaned.verified, flagged: cleaned.flagged, list: cleaned.list }, legalDisclaimer: { version: LEGAL_DISCLAIMER_VERSION, copy: LEGAL_DISCLAIMER_PRIMARY_COPY } }, { headers: { "Cache-Control": "no-store", ...(cookie ? { "Set-Cookie": cookie } : {}) } })
  } catch (error) { return requestError(error) ?? Response.json({ error: "GENERATION_UNAVAILABLE" }, { status: 503 }) }
  finally { if (metric) await finishOperation(metric.id,metric.startedAt,success) }
}
