import { createHash, randomBytes, randomUUID } from "crypto"
import type { CheckoutOrder, DeliveryOutbox } from "@prisma/client"
import { prisma } from "./prisma"
import { activeSubscription, requireVersionEntitlement } from "./entitlements"
import { requireReviewedVersion } from "./document-review"
import { generatePDF } from "./pdf-generator"
import { checkDeliveryConfiguration, deliveryHash, deliveryOrigin, openDelivery, recipientHash, sealDelivery } from "./delivery-crypto"
import { applyDeliveryFeedback } from "./delivery-feedback"
import { LEGAL_DISCLAIMER_PRIMARY_COPY } from "./legal-disclaimer"

type Payload = { from: string; to: string[]; subject: string; text: string; attachments?: { filename: string; content: string }[] }
export const RETRY_WINDOW_MS = 23 * 3600000
export function retryAllowed(firstSendAt: Date | null, now = new Date()) { return !firstSendAt || now.getTime() - firstSendAt.getTime() < RETRY_WINDOW_MS }
export async function reserveDelivery() {
  return prisma.$transaction(async tx => {
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(710100)`
    const now = new Date()
    const job = await tx.deliveryOutbox.findFirst({ where: { OR: [{ status: { in: ["pending", "retry"] }, nextAttemptAt: { lte: now } }, { status: "processing", leaseUntil: { lt: now } }] }, orderBy: [{ nextAttemptAt: "asc" }, { createdAt: "asc" }] })
    if (!job) return null
    return tx.deliveryOutbox.update({ where: { id: job.id }, data: { status: "processing", leaseId: randomUUID(), leaseUntil: new Date(Date.now() + 120000), attempts: { increment: 1 } } })
  })
}
async function eligible(order: CheckoutOrder) {
  if (order.status !== "paid") throw new Error("PAYMENT_NOT_ELIGIBLE")
  if (order.versionId) {
    const version = await prisma.documentVersion.findUniqueOrThrow({ where: { id: order.versionId } })
    if (version.contentHash !== order.contentHash || createHash("sha256").update(version.content).digest("hex") !== order.contentHash) throw new Error("DOCUMENT_INTEGRITY_ERROR")
    await requireVersionEntitlement(version.id, order.ownerId)
    // Recovery restores identity, not export approval; the download route rechecks review.
    return version
  }
  if (!order.ownerId || !await activeSubscription(order.ownerId)) throw new Error("SUBSCRIPTION_NOT_ELIGIBLE")
  return null
}
async function prepare(job: DeliveryOutbox, order: CheckoutOrder) {
  const version = await eligible(order)
  const user = order.ownerId ? await prisma.user.findUniqueOrThrow({ where: { id: order.ownerId } }) : null
  const email = user?.email ?? order.guestEmail
  if (!email) throw new Error("DELIVERY_RECIPIENT_REQUIRED")
  const hash = recipientHash(email)
  if (await prisma.emailSuppression.findUnique({ where: { recipientHash: hash } })) throw new Error("RECIPIENT_SUPPRESSED")
  if (job.payloadCipher) {
    const payload = openDelivery<Payload>(job.payloadCipher)
    if (payload.to.length !== 1 || payload.to[0] !== email) throw new Error("PURCHASE_CHANGED")
    if (payload.attachments && version) await requireReviewedVersion(version)
    return { payload, hash }
  }
  const token = user ? null : randomBytes(32).toString("hex")
  const url = token ? `${deliveryOrigin()}/recover-purchase#token=${token}` : `${deliveryOrigin()}/dashboard/${order.versionId ? `documents/${order.id}` : "billing"}`
  const amount = new Intl.NumberFormat("en-US", { style: "currency", currency: order.currency }).format(order.amount / 100)
  const text = `${job.kind === "guest_recovery" ? "Recover your purchase" : "Your payment is confirmed"}

Order: ${order.id}
Amount paid: ${amount}${order.kind === "subscription" ? " for this monthly subscription payment. Future renewals continue until canceled." : " (one saved document version)."}

${token ? "Open your purchased version or attach it to your account. This single-use link expires in seven days. No account has been created for you." : "Sign in to access your purchase."}
${url}

${token ? "If the link expires, request another at " + deliveryOrigin() + "/recover-purchase using the order ID above and this receipt email.\n\n" : ""}Refund terms: ${deliveryOrigin()}/terms#refunds

${LEGAL_DISCLAIMER_PRIMARY_COPY}`
  const payload: Payload = { from: process.env.RESEND_FROM_EMAIL!, to: [email], subject: job.kind === "guest_recovery" ? "Recover your LegalLawDocs purchase" : "Your LegalLawDocs payment confirmation", text }
  // Do not mail private document content to an unverified address. Guests get a secure link.
  if (version && user?.emailVerified && job.kind !== "guest_recovery") {
    await requireReviewedVersion(version)
    const pdf = await generatePDF(version.content, version.title, { isWatermarked: false })
    if (pdf.length > 5 * 1024 * 1024) throw new Error("ATTACHMENT_TOO_LARGE")
    payload.attachments = [{ filename: "reviewed-document.pdf", content: pdf.toString("base64") }]
  }
  const cipher = sealDelivery(payload)
  await prisma.$transaction(async tx => {
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(710090)`
    const current = await tx.checkoutOrder.findUniqueOrThrow({ where: { id: order.id } })
    if (current.ownerId !== order.ownerId || current.status !== "paid") throw new Error("PURCHASE_CHANGED")
    const updated = await tx.deliveryOutbox.updateMany({ where: { id: job.id, leaseId: job.leaseId, status: "processing" }, data: { payloadCipher: cipher, recipientHash: hash } })
    if (updated.count !== 1) throw new Error("DELIVERY_LEASE_LOST")
    if (token) await tx.guestPurchaseClaim.upsert({ where: { orderId: order.id }, create: { orderId: order.id, tokenHash: deliveryHash(token), expiresAt: new Date(Date.now() + 7 * 86400000) }, update: { tokenHash: deliveryHash(token), expiresAt: new Date(Date.now() + 7 * 86400000), redeemedAt: null } })
  })
  return { payload, hash }
}
export async function deliverReserved(job: DeliveryOutbox) {
  try {
    if (!retryAllowed(job.firstSendAt) || job.attempts > 8) throw new Error("DELIVERY_MANUAL_REVIEW")
    const order = await prisma.checkoutOrder.findUniqueOrThrow({ where: { id: job.orderId } })
    const { payload, hash } = await prepare(job, order)
    // The persisted exact payload, including PDF bytes and token, is reused on every retry.
    const firstSendAt = job.firstSendAt ?? new Date()
    const marked = await prisma.deliveryOutbox.updateMany({ where: { id: job.id, leaseId: job.leaseId, status: "processing" }, data: { firstSendAt } })
    if (marked.count !== 1) return
    const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json", "Idempotency-Key": `delivery:${job.id}` }, body: JSON.stringify(payload), signal: AbortSignal.timeout(15000) })
    if (!response.ok) {
      if (response.status === 429 || response.status >= 500) throw new Error("DELIVERY_TRANSIENT")
      throw new Error("DELIVERY_PROVIDER_REJECTED")
    }
    const result = await response.json() as { id?: string }
    if (!result.id) throw new Error("DELIVERY_TRANSIENT")
    await prisma.$transaction(async tx => {
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(710101)`
      const updated = await tx.deliveryOutbox.updateMany({ where: { id: job.id, leaseId: job.leaseId, status: "processing" }, data: { status: "accepted", providerId: result.id, acceptedAt: new Date(), recipientHash: hash, payloadCipher: null, leaseId: null, leaseUntil: null, lastError: null } })
      if (updated.count) await applyDeliveryFeedback(tx, result.id!)
    })
  } catch (error) {
    const code = error instanceof Error ? error.message : "DELIVERY_TRANSIENT"
    const permanent = ["DELIVERY_MANUAL_REVIEW", "DELIVERY_PROVIDER_REJECTED", "RECIPIENT_SUPPRESSED", "PAYMENT_NOT_ELIGIBLE", "SUBSCRIPTION_NOT_ELIGIBLE", "DOCUMENT_INTEGRITY_ERROR", "PURCHASE_CHANGED", "ATTACHMENT_TOO_LARGE"].includes(code)
    const status = code === "RECIPIENT_SUPPRESSED" ? "suppressed" : permanent || job.attempts >= 8 ? "blocked" : "retry"
    await prisma.deliveryOutbox.updateMany({ where: { id: job.id, leaseId: job.leaseId, status: "processing" }, data: { status, leaseId: null, leaseUntil: null, nextAttemptAt: new Date(Date.now() + Math.min(3600, 60 * 2 ** Math.min(job.attempts, 6)) * 1000), lastError: permanent ? code : "DELIVERY_RETRY_REQUIRED" } })
  }
}
export async function runDeliveryBatch(limit = 5) {
  checkDeliveryConfiguration()
  let processed = 0
  for (let i = 0; i < Math.min(5, limit); i++) { const job = await reserveDelivery(); if (!job) break; await deliverReserved(job); processed++ }
  return { processed }
}
