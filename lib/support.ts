import { randomBytes, randomUUID, createHash } from "crypto"
import { z } from "zod"
import { prisma } from "./prisma"
import { RequestError } from "./request-guard"
export const supportInput = z.object({ topic: z.enum(["account", "billing", "delivery", "privacy", "correction", "other"]), message: z.string().trim().min(10).max(2000) }).strict()
export const accessInput = z.object({ id: z.string().uuid(), code: z.string().regex(/^[a-f0-9]{64}$/) }).strict()
const hash = (code: string) => createHash("sha256").update(code).digest("hex")
export async function createSupport(input: z.infer<typeof supportInput>, userId?: string) {
 const code = randomBytes(32).toString("hex")
 const ticket = await prisma.$transaction(async tx => {
  // Serialize with account erasure so a concurrent request cannot recreate personal data.
  await tx.$executeRaw`SELECT pg_advisory_xact_lock(710090)`
  if (userId && (await tx.user.findUnique({ where: { id: userId }, select: { privacyState: true } }))?.privacyState !== "active") throw new RequestError(403, "ACCOUNT_UNAVAILABLE")
  return tx.supportTicket.create({ data: { id: randomUUID(), userId, accessHash: hash(code), ...input, expiresAt: new Date(Date.now() + 30 * 86400000) } })
 })
 return { id: ticket.id, code, expiresAt: ticket.expiresAt }
}
export async function readSupport(input: z.infer<typeof accessInput>) {
 const ticket = await prisma.supportTicket.findFirst({ where: { id: input.id, accessHash: hash(input.code), expiresAt: { gt: new Date() } }, select: { id: true, topic: true, message: true, response: true, status: true, createdAt: true, expiresAt: true } })
 if (!ticket) throw new RequestError(404, "TICKET_NOT_FOUND_OR_EXPIRED")
 return ticket
}
