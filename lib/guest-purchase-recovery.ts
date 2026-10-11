import { randomBytes, randomUUID } from "crypto"
import { prisma } from "./prisma"
import { deliveryHash, recipientHash } from "./delivery-crypto"
import { RequestError } from "./request-guard"

export async function queueGuestRecovery(orderId: string, email: string) {
  await prisma.$transaction(async tx => {
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(710100)`
    const key = `guest-recovery:${orderId}`
    const budget = await tx.requestBudget.findUnique({ where: { key } })
    const now = new Date(); const used = budget && budget.resetAt > now ? budget.used : 0
    const recent = await tx.deliveryOutbox.findFirst({ where: { orderId, kind: "guest_recovery", createdAt: { gt: new Date(Date.now() - 60000) } } })
    // Uniform public response, including cooldown, unknown purchases and wrong emails.
    if (used >= 3 || recent) return
    await tx.requestBudget.upsert({ where: { key }, create: { key, used: 1, resetAt: new Date(Date.now() + 3600000) }, update: { used: used + 1, resetAt: used ? budget!.resetAt : new Date(Date.now() + 3600000) } })
    const order = await tx.checkoutOrder.findUnique({ where: { id: orderId } })
    if (!order || order.ownerId || order.status !== "paid" || order.kind !== "single" || !order.versionId || order.guestEmail?.toLowerCase() !== email.toLowerCase()) return
    if (await tx.emailSuppression.findUnique({ where: { recipientHash: recipientHash(email) } })) return
    const id = randomUUID()
    await tx.deliveryOutbox.create({ data: { id, orderId, dedupeKey: `recovery:${id}`, kind: "guest_recovery" } })
  })
}
export async function redeemGuestPurchase(token: string, mode: "guest" | "account", userId?: string) {
  if (mode === "account" && !userId) throw new RequestError(401, "SIGN_IN_REQUIRED")
  return prisma.$transaction(async tx => {
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(710090)`
    const claim = await tx.guestPurchaseClaim.findUnique({ where: { tokenHash: deliveryHash(token) } })
    if (!claim || claim.redeemedAt || claim.expiresAt <= new Date()) throw new RequestError(400, "RECOVERY_LINK_EXPIRED_OR_USED")
    const order = await tx.checkoutOrder.findUnique({ where: { id: claim.orderId } })
    if (!order || order.ownerId || order.kind !== "single" || order.status !== "paid" || !order.versionId) throw new RequestError(409, "PURCHASE_NOT_RECOVERABLE")
    const version = await tx.documentVersion.findUniqueOrThrow({ where: { id: order.versionId }, include: { draft: true } })
    const purchase = await tx.documentPurchase.findUnique({ where: { checkoutId: order.id } })
    if (version.claimedOwnerId || version.draft.ownerId || !purchase || purchase.ownerId || purchase.status !== "paid" || purchase.versionId !== version.id || version.contentHash !== order.contentHash) throw new RequestError(409, "PURCHASE_NOT_RECOVERABLE")
    let cookie: string | null = null
    if (mode === "account") {
      const user = await tx.user.findUnique({ where: { id: userId! } })
      if (!user || user.email.toLowerCase() !== order.guestEmail?.toLowerCase()) throw new RequestError(403, "SIGN_IN_WITH_RECEIPT_EMAIL")
      await tx.documentVersion.update({ where: { id: version.id }, data: { claimedOwnerId: user.id, recoveryHash: null, recoveryExpiresAt: null } })
      await tx.documentPurchase.update({ where: { id: purchase.id }, data: { ownerId: user.id } })
      await tx.checkoutOrder.update({ where: { id: order.id }, data: { ownerId: user.id } })
      await tx.userDocument.upsert({ where: { id: order.id }, create: { id: order.id, userId: user.id, title: version.title, type: version.title, category: version.draft.category, content: version.content, status: "completed", metadata: { versionId: version.id, contentHash: version.contentHash, orderId: order.id } }, update: {} })
      // No password changes, session issuance, provider-customer linking or other draft transfers.
    } else {
      const secret = randomBytes(32).toString("hex")
      await tx.documentVersion.update({ where: { id: version.id }, data: { recoveryHash: deliveryHash(secret), recoveryExpiresAt: new Date(Date.now() + 7 * 86400000) } })
      cookie = `version_${version.id}=${secret}; Path=/; HttpOnly; SameSite=Strict; Max-Age=604800${process.env.NODE_ENV === "production" ? "; Secure" : ""}`
    }
    await tx.guestPurchaseClaim.update({ where: { orderId: order.id }, data: { redeemedAt: new Date() } })
    return { cookie, path: mode === "account" ? `/dashboard/documents/${order.id}` : `/documents/${version.draft.category}/${version.draft.sourceSlug}/download?version=${version.id}` }
  })
}
