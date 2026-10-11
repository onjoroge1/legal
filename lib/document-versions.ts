import { createHash, randomBytes, randomUUID, timingSafeEqual } from "crypto"
import { getServerSession } from "next-auth"
import { authOptions } from "./auth"
import { prisma } from "./prisma"
import { RequestError } from "./request-guard"
import type { ResolvedDocument } from "./document-resolver"
import type { Prisma } from "@prisma/client"
const hash = (value: string) => createHash("sha256").update(value).digest("hex")
export async function draftAccess(request: Request, id: string) {
  const draft = await prisma.documentDraft.findUnique({ where: { id } })
  if (!draft) throw new RequestError(404, "DOCUMENT_NOT_FOUND")
  const session = await getServerSession(authOptions)
  if (draft.ownerId && session?.user?.id === draft.ownerId) return draft
  const token = request.headers.get("cookie")?.split(";").map(v => v.trim()).find(v => v.startsWith(`draft_${id}=`))?.split("=")[1]
  if (!draft.ownerId && token && draft.guestHash && draft.guestExpiresAt && draft.guestExpiresAt > new Date()) {
    const actual = hash(token)
    if (actual.length === draft.guestHash.length && timingSafeEqual(Buffer.from(actual), Buffer.from(draft.guestHash))) return draft
  }
  throw new RequestError(404, "DOCUMENT_NOT_FOUND")
}
export async function createDraft(request: Request, resolved: ResolvedDocument, formData: Prisma.InputJsonObject) {
  const session = await getServerSession(authOptions)
  const id = randomUUID(); const token = randomBytes(32).toString("hex")
  const ownerId = session?.user?.id ?? null
  const draft = await prisma.documentDraft.create({ data: { id, ownerId, guestHash: ownerId ? null : hash(token), guestExpiresAt: ownerId ? null : new Date(Date.now() + 7 * 86400000), category: resolved.doc.category, canonicalSlug: resolved.doc.slug, sourceSlug: resolved.sourceSlug, intent: resolved.intent, jurisdiction: resolved.jurisdiction, formData } })
  const cookie = ownerId ? null : `draft_${id}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=604800${process.env.NODE_ENV === "production" ? "; Secure" : ""}`
  return { draft, cookie }
}
export async function saveVersion(request: Request, resolved: ResolvedDocument, fields: Prisma.InputJsonObject, content: string, review: Prisma.InputJsonObject, draftId?: string) {
  const existing = draftId ? await draftAccess(request, draftId) : null
  if (existing && (existing.canonicalSlug !== resolved.doc.slug || existing.intent !== resolved.intent || existing.jurisdiction !== resolved.jurisdiction)) throw new RequestError(409, "DRAFT_IDENTITY_CONFLICT")
  const created = existing ? { draft: existing, cookie: null } : await createDraft(request, resolved, fields)
  const version = await prisma.documentVersion.create({ data: { id: randomUUID(), draftId: created.draft.id, title: resolved.doc.title, content, contentHash: hash(content), formData: fields, review } })
  return { versionId: version.id, draftId: version.draftId, contentHash: version.contentHash, cookie: created.cookie }
}
export async function readVersion(request: Request, id: string) {
  const version = await prisma.documentVersion.findUnique({ where: { id } })
  if (!version) throw new RequestError(404, "DOCUMENT_NOT_FOUND")
  let draft
  if (version.claimedOwnerId) {
    const session = await getServerSession(authOptions)
    if (session?.user?.id !== version.claimedOwnerId) throw new RequestError(404, "DOCUMENT_NOT_FOUND")
    const source = await prisma.documentDraft.findUniqueOrThrow({ where: { id: version.draftId } })
    draft = { ...source, ownerId: version.claimedOwnerId }
  } else {
    const token = request.headers.get("cookie")?.split(";").map(v => v.trim()).find(v => v.startsWith(`version_${id}=`))?.split("=")[1]
    if (token && version.recoveryHash && version.recoveryExpiresAt && version.recoveryExpiresAt > new Date() && hash(token) === version.recoveryHash) {
      draft = await prisma.documentDraft.findUniqueOrThrow({ where: { id: version.draftId } })
    } else draft = await draftAccess(request, version.draftId)
  }
  if (hash(version.content) !== version.contentHash) throw new RequestError(409, "DOCUMENT_INTEGRITY_ERROR")
  return { version, draft }
}
