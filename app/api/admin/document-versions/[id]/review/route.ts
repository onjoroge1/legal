import { z } from "zod"
import { createHash, randomUUID } from "crypto"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { readJson, requestError, RequestError } from "@/lib/request-guard"
import { guardAccount } from "@/lib/request-budget"
import { resolveDocument } from "@/lib/document-resolver"
import { validateFidelity, outputIssues, DRAFT_NOTICE } from "@/lib/generation-fidelity"
const secureUrl = z.string().url().max(2048).refine(v => { const u = new URL(v); return u.protocol === "https:" && !u.username && !u.password })
const schema = z.object({ content: z.string().min(100).max(60000), evidenceUrl: secureUrl, sourceUrls: z.array(secureUrl).min(1).max(20), confirmQualifiedReview: z.literal(true) }).strict()
/** Separate immutable reviewed version. Never modifies the user's original draft. */
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions)
    const allowed = (process.env.LEGAL_REVIEWER_IDS ?? "").split(",").map(s => s.trim()).filter(Boolean)
    if (!session?.user?.id || !allowed.includes(session.user.id)) throw new RequestError(403, "QUALIFIED_REVIEWER_REQUIRED")
    const reviewer = await prisma.user.findUnique({ where: { id: session.user.id }, select: { isAdmin: true } })
    if (!reviewer?.isAdmin) throw new RequestError(403, "QUALIFIED_REVIEWER_REQUIRED")
    const body = schema.parse(await readJson(request, 65536))
    await guardAccount(request, session.user.id)
    const version = await prisma.documentVersion.findUnique({ where: { id: (await params).id }, include: { draft: true } })
    if (!version) throw new RequestError(404, "DOCUMENT_NOT_FOUND")
    const r = resolveDocument(version.draft.category, version.draft.sourceSlug, version.draft.intent)
    const fields = version.formData as Record<string, string | number | boolean | null>
    const issues = [...validateFidelity(body.content, r, fields), ...outputIssues(body.content)]
    if (issues.length) return Response.json({ error: "REVIEW_HAS_UNRESOLVED_ISSUES", issues }, { status: 422 })
    const content = body.content.startsWith(DRAFT_NOTICE) ? body.content : `${DRAFT_NOTICE}\n\n${body.content}`
    const contentHash = createHash("sha256").update(content).digest("hex")
    const id = randomUUID()
    await prisma.$transaction(async tx => {
      await tx.documentVersion.create({ data: { id, draftId: version.draftId, title: version.title, content, contentHash, formData: fields, review: { issues: [], readyForExport: true, originalVersionId: version.id } } })
      await tx.documentReview.create({ data: { versionId: id, reviewerId: session.user!.id, contentHash, evidenceUrl: body.evidenceUrl, sourceUrls: body.sourceUrls, expiresAt: new Date(Date.now() + 90 * 86400000) } })
    })
    return Response.json({ versionId: id }, { headers: { "Cache-Control": "no-store" } })
  } catch (error) { return requestError(error) ?? Response.json({ error: "REVIEW_UNAVAILABLE" }, { status: 503 }) }
}
