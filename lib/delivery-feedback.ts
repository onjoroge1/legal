import { prisma } from "./prisma"
import type { Prisma } from "@prisma/client"
export const deliveryEvents = new Set(["email.sent", "email.delivered", "email.bounced", "email.complained", "email.failed", "email.suppressed"])
export async function applyDeliveryFeedback(tx: Prisma.TransactionClient, providerId: string) {
  const job = await tx.deliveryOutbox.findUnique({ where: { providerId } })
  if (!job) return
  const events = await tx.emailDeliveryEvent.findMany({ where: { providerId } })
  const has = (type: string) => events.some(e => e.type === type)
  const status = has("email.complained") ? "complained" : has("email.bounced") ? "bounced" : has("email.suppressed") ? "suppressed" : has("email.failed") ? "failed" : has("email.delivered") ? "delivered" : "accepted"
  const deliveredAt = events.find(e => e.type === "email.delivered")?.occurredAt ?? null
  await tx.deliveryOutbox.update({ where: { id: job.id }, data: { status, deliveredAt, payloadCipher: null } })
  if (["complained", "bounced", "suppressed"].includes(status) && job.recipientHash) await tx.emailSuppression.upsert({ where: { recipientHash: job.recipientHash }, create: { recipientHash: job.recipientHash, reason: status }, update: { reason: status } })
}
export async function recordDeliveryEvent(id: string, providerId: string, type: string, occurredAt: Date) {
  await prisma.$transaction(async tx => {
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(710101)`
    await tx.emailDeliveryEvent.upsert({ where: { id }, create: { id, providerId, type, occurredAt }, update: {} })
    await applyDeliveryFeedback(tx, providerId)
  })
}
