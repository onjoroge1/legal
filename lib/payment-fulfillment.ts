import { randomUUID } from "crypto"
import type Stripe from "stripe"
import type { Prisma, CheckoutOrder } from "@prisma/client"
import { stripe } from "./stripe"
import { prisma } from "./prisma"

type Tx = Prisma.TransactionClient
const ref = (value: string | { id: string } | null | undefined) => typeof value === "string" ? value : value?.id ?? null
function check(ok: unknown): asserts ok { if (!ok) throw new Error("PAYMENT_VERIFICATION_FAILED") }
function correctMode(livemode: boolean) { check(livemode === (process.env.STRIPE_MODE === "live")) }
export function validateCheckout(order: CheckoutOrder, session: Stripe.Checkout.Session) {
  correctMode(session.livemode)
  const line = session.line_items?.data[0]
  check(session.metadata?.orderId === order.id && session.client_reference_id === order.id)
  check(session.metadata?.kind === order.kind && session.metadata?.versionId === (order.versionId ?? "") && session.metadata?.contentHash === (order.contentHash ?? ""))
  check(!order.sessionId || order.sessionId === session.id)
  check(session.mode === (order.kind === "single" ? "payment" : "subscription"))
  check(session.currency === order.currency && session.amount_total === order.amount)
  check(session.line_items?.data.length === 1 && !session.line_items.has_more && line?.quantity === 1 && line.price?.id === order.priceId && line.amount_total === order.amount)
  check(!order.customerId || ref(session.customer) === order.customerId)
}
async function syncSubscription(tx: Tx, id: string) {
  // Retrieve under the database lock; old event snapshots never overwrite newer state.
  const sub = await stripe.subscriptions.retrieve(id, { expand: ["latest_invoice"] })
  correctMode(sub.livemode)
  const order = await tx.checkoutOrder.findUnique({ where: { id: sub.metadata.orderId || "missing" } })
  if (!order) return // unrelated products/accounts do not grant access
  check(order.kind === "subscription" && order.ownerId && order.status === "paid" && order.subscriptionId === sub.id)
  check(ref(sub.customer) === order.customerId && sub.items.data.length === 1 && sub.items.data[0].price.id === order.priceId && sub.items.data[0].quantity === 1)
  const invoice = typeof sub.latest_invoice === "object" ? sub.latest_invoice : null
  const previous = await tx.billingSubscription.findUnique({ where: { id } })
  const item = sub.items.data[0]
  const invoicePaid = invoice?.status === "paid" && invoice.amount_paid >= order.amount && invoice.currency === order.currency
  const holds = await tx.paymentHold.count({ where: { subscriptionId: id, OR: [{ status: "disputed" }, { status: "refunded", invoiceId: ref(sub.latest_invoice) }] } })
  const data = { ownerId: order.ownerId, customerId: order.customerId!, priceId: order.priceId, status: sub.status, paidThrough: invoicePaid ? new Date(item.current_period_end * 1000) : previous?.paidThrough ?? null, trialEndsAt: sub.trial_end ? new Date(sub.trial_end * 1000) : null, cancelAtPeriodEnd: sub.cancel_at_period_end, blocked: holds > 0 }
  await tx.billingSubscription.upsert({ where: { id }, create: { id, ...data }, update: data })
}
async function paymentState(paymentIntentId: string) {
  const pi = await stripe.paymentIntents.retrieve(paymentIntentId, { expand: ["latest_charge"] })
  correctMode(pi.livemode)
  const charge = typeof pi.latest_charge === "object" ? pi.latest_charge : null
  const disputes = await stripe.disputes.list({ payment_intent: pi.id, limit: 100 })
  check(!disputes.has_more)
  const disputed = disputes.data.some(d => !["won", "warning_closed"].includes(d.status))
  return { pi, status: disputed ? "disputed" : charge && charge.amount_refunded >= charge.amount ? "refunded" : pi.status === "succeeded" ? "paid" : "pending" }
}
async function syncCheckout(tx: Tx, sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId, { expand: ["line_items"] })
  const order = await tx.checkoutOrder.findUnique({ where: { id: session.metadata?.orderId ?? "missing" } })
  if (!order) return
  if (session.status === "expired") {
    check(!order.sessionId || order.sessionId === session.id)
    if (order.status !== "paid") await tx.checkoutOrder.update({ where: { id: order.id }, data: { sessionId, status: "expired", activeKey: null } })
    return
  }
  validateCheckout(order, session)
  if (session.status !== "complete" || session.payment_status !== "paid") {
    await tx.checkoutOrder.update({ where: { id: order.id }, data: { sessionId, updatedAt: new Date() } })
    return
  }
  if (order.versionId) {
    const version = await tx.documentVersion.findUnique({ where: { id: order.versionId } })
    check(version?.contentHash === order.contentHash && version.draftId === order.draftId)
  }
  const paymentIntentId = ref(session.payment_intent)
  let status = "paid"
  if (order.kind === "single") {
    check(paymentIntentId)
    const state = await paymentState(paymentIntentId)
    check(state.pi.amount_received === order.amount && state.pi.currency === order.currency && state.pi.metadata.orderId === order.id)
    status = state.status
    check(status !== "pending")
  }
  const customerId = ref(session.customer)
  const subscriptionId = ref(session.subscription)
  if (order.kind === "subscription") check(customerId && subscriptionId && order.ownerId)
  await tx.checkoutOrder.update({ where: { id: order.id }, data: { sessionId, paymentIntentId, customerId, subscriptionId, status, activeKey: null } })
  if (order.kind === "single") {
    check(order.versionId)
    await tx.documentPurchase.upsert({ where: { checkoutId: order.id }, create: { id: randomUUID(), checkoutId: order.id, versionId: order.versionId, ownerId: order.ownerId, status }, update: { status } })
  } else {
    await syncSubscription(tx, subscriptionId!)
  }
  if (order.ownerId && customerId) {
    // Only the authenticated owner captured at checkout can acquire this customer.
    await tx.user.updateMany({ where: { id: order.ownerId, stripeCustomerId: null }, data: { stripeCustomerId: customerId } })
  }
  if (status === "paid" && order.ownerId && order.versionId) {
    const version = await tx.documentVersion.findUniqueOrThrow({ where: { id: order.versionId }, include: { draft: true } })
    await tx.userDocument.upsert({ where: { id: order.id }, create: { id: order.id, userId: order.ownerId, title: version.title, type: version.title, category: version.draft.category, content: version.content, status: "completed", metadata: { versionId: version.id, contentHash: version.contentHash, orderId: order.id } }, update: {} })
  }
  if (status === "paid") await tx.deliveryOutbox.upsert({ where: { orderId: order.id }, create: { id: randomUUID(), orderId: order.id, kind: order.versionId ? "document_ready" : "subscription_ready" }, update: {} })
}
async function syncPayment(tx: Tx, paymentIntentId: string) {
  const { pi, status } = await paymentState(paymentIntentId)
  const order = await tx.checkoutOrder.findFirst({ where: { OR: [{ paymentIntentId }, { id: pi.metadata.orderId ?? "missing" }] } })
  if (order?.kind === "single") {
    check(pi.currency === order.currency && pi.amount === order.amount)
    // If a refund/dispute arrives before checkout completion, reconcile the full checkout first.
    if (order.sessionId) await syncCheckout(tx, order.sessionId)
    return
  }
  const payments = await stripe.invoicePayments.list({ payment: { type: "payment_intent", payment_intent: paymentIntentId }, limit: 10 })
  check(!payments.has_more)
  for (const payment of payments.data) {
    const invoice = await stripe.invoices.retrieve(ref(payment.invoice)!)
    const subscriptionId = ref(invoice.parent?.subscription_details?.subscription)
    if (!subscriptionId) continue
    await tx.paymentHold.upsert({ where: { id: paymentIntentId }, create: { id: paymentIntentId, subscriptionId, invoiceId: invoice.id, status: status === "paid" ? "released" : status }, update: { status: status === "paid" ? "released" : status } })
    await syncSubscription(tx, subscriptionId)
  }
}
export const supportedEvents = new Set([
  "checkout.session.completed", "checkout.session.async_payment_succeeded", "checkout.session.async_payment_failed", "checkout.session.expired",
  "customer.subscription.created", "customer.subscription.updated", "customer.subscription.deleted", "customer.subscription.paused", "customer.subscription.resumed",
  "invoice.paid", "invoice.payment_succeeded", "invoice.payment_failed", "invoice.payment_action_required",
  "charge.refunded", "charge.dispute.created", "charge.dispute.updated", "charge.dispute.closed", "refund.updated", "refund.created",
])
export async function processPaymentEvent(id: string) {
  try {
    await prisma.$transaction(async tx => {
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(710090)`
      const event = await tx.stripeEvent.findUniqueOrThrow({ where: { id } })
      if (event.status === "processed") return
      correctMode(event.livemode)
      if (event.type.startsWith("checkout.session.")) await syncCheckout(tx, event.objectId)
      else if (event.type.startsWith("customer.subscription.")) await syncSubscription(tx, event.objectId)
      else if (event.type.startsWith("invoice.")) {
        const invoice = await stripe.invoices.retrieve(event.objectId)
        correctMode(invoice.livemode)
        const subscriptionId = ref(invoice.parent?.subscription_details?.subscription)
        if (subscriptionId) await syncSubscription(tx, subscriptionId)
      } else {
        let paymentIntentId: string | null = null
        if (event.type.startsWith("charge.dispute.")) paymentIntentId = ref((await stripe.disputes.retrieve(event.objectId)).payment_intent)
        else if (event.type.startsWith("refund.")) paymentIntentId = ref((await stripe.refunds.retrieve(event.objectId)).payment_intent)
        else paymentIntentId = ref((await stripe.charges.retrieve(event.objectId)).payment_intent)
        if (paymentIntentId) await syncPayment(tx, paymentIntentId)
      }
      await tx.stripeEvent.update({ where: { id }, data: { status: "processed", processedAt: new Date(), attempts: { increment: 1 }, lastError: null } })
    }, { maxWait: 10000, timeout: 45000 })
  } catch {
    // Durable retry record; no provider payload or customer data in logs/errors.
    await prisma.stripeEvent.updateMany({ where: { id, status: { not: "processed" } }, data: { status: "failed", attempts: { increment: 1 }, lastError: "FULFILLMENT_RETRY_REQUIRED" } })
    throw new Error("FULFILLMENT_RETRY_REQUIRED")
  }
}
export async function reconcileOrder(id: string) {
  await prisma.$transaction(async tx => {
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(710090)`
    const order = await tx.checkoutOrder.findUniqueOrThrow({ where: { id } })
    if (order.sessionId) await syncCheckout(tx, order.sessionId)
    else {
      // Recover a provider success followed by a database crash without creating another charge.
      const sessions = await stripe.checkout.sessions.list({ created: { gte: Math.floor(order.createdAt.getTime() / 1000) - 60, lte: Math.floor(order.expiresAt.getTime() / 1000) }, limit: 100 })
      const matches = sessions.data.filter(s => s.metadata?.orderId === order.id)
      check(matches.length <= 1)
      if (matches[0]) await syncCheckout(tx, matches[0].id)
      else if (!sessions.has_more && order.expiresAt < new Date()) await tx.checkoutOrder.update({ where: { id }, data: { status: "expired", activeKey: null } })
    }
  }, { maxWait: 10000, timeout: 45000 })
}
