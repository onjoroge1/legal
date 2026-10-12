import sharp from "sharp"
import { randomUUID } from "crypto"
import { put, get, del } from "@vercel/blob"
import { prisma } from "./prisma"
import { RequestError } from "./request-guard"
export async function normalizeAvatar(bytes: Buffer) {
  try {
    const input = sharp(bytes, { limitInputPixels: 16000000, failOn: "warning", animated: false })
    const meta = await input.metadata()
    if (!["jpeg", "png", "webp"].includes(meta.format ?? "") || (meta.pages ?? 1) > 1) throw Error()
    return await input.rotate().resize(256,256,{ fit: "cover", withoutEnlargement: true }).webp({ quality: 80 }).toBuffer()
  } catch { throw new RequestError(400, "INVALID_AVATAR_IMAGE") }
}
export async function storeAvatar(userId: string, bytes: Buffer) {
  const data = await normalizeAvatar(bytes)
  const id = randomUUID(); const pathname = `avatars/${id}.webp`
  await prisma.storedAvatar.create({ data: { id, userId, pathname } })
  // Persist the object identity before I/O, so interrupted uploads remain discoverable.
  await put(pathname, data, { access: "private", addRandomSuffix: false, contentType: "image/webp" })
  const url = `/api/settings/avatar?id=${id}`
  await prisma.$transaction(async tx => {
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(710110)`
    await tx.storedAvatar.updateMany({ where: { userId, status: "active" }, data: { status: "retired" } })
    await tx.user.update({ where: { id: userId }, data: { image: url } })
    await tx.storedAvatar.update({ where: { id }, data: { status: "active" } })
  })
  return url
}
export async function readAvatar(userId: string, id: string) {
  const row = await prisma.storedAvatar.findFirst({ where: { id, userId, status: "active" } })
  if (!row) return null
  return get(row.pathname, { access: "private", useCache: false })
}
export async function cleanupAvatars() {
  const rows = await prisma.storedAvatar.findMany({ where: { OR: [{ status: "retired" }, { status: "pending", createdAt: { lt: new Date(Date.now()-86400000) } }] }, take: 20, orderBy: { createdAt: "asc" } })
  for (const row of rows) { await del(row.pathname); await prisma.storedAvatar.delete({ where: { id: row.id } }) }
  return rows.length
}
