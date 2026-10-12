import { requestJourney, recordFunnel } from "./funnel"
import { createHash, randomUUID } from "crypto"
import { z } from "zod"
import { getServerSession } from "next-auth"
import { authOptions } from "./auth"
import { prisma } from "./prisma"
import { stripe } from "./stripe"
import { readVersion } from "./document-versions"
import { requireReviewedVersion } from "./document-review"
import { RequestError, readJson } from "./request-guard"
import { guardAccount } from "./request-budget"
import { checkoutPrice } from "./payment-pricing"
import { getLegalDisclaimerAcceptance } from "./legal-disclaimer-server"

const documentContract = z.object({ paymentType: z.enum(["single", "subscription"]), versionId: z.string().uuid(), guestEmail: z.string().email().max(254).optional() }).strict()
export async function createCheckout(request: Request, billing = false) {
  const session = await getServerSession(authOptions)
  const body = await readJson(request, 2048)
  const input = billing ? { ...z.object({ tier: z.literal("professional") }).strict().parse(body), paymentType: "subscription" as const, versionId: undefined, guestEmail: undefined } : documentContract.parse(body)
  if (billing && !session?.user?.id) throw new RequestError(401, "SIGN_IN_REQUIRED")
  const saved = input.versionId ? await readVersion(request, input.versionId) : null
  if (saved) await requireReviewedVersion(saved.version)
  // A guest draft stays isolated even if its browser subsequently signs in.
  const ownerId = saved ? saved.draft.ownerId : session!.user!.id
  if (input.paymentType === "subscription" && (!ownerId || ownerId !== session?.user?.id)) throw new RequestError(401, "SIGN_IN_BEFORE_CREATING_SUBSCRIPTION_DRAFT")
  const guestEmail = ownerId ? null : input.guestEmail?.trim().toLowerCase()
  if (!ownerId && !guestEmail) throw new RequestError(400, "GUEST_EMAIL_REQUIRED")
  const user = ownerId ? await prisma.user.findUnique({ where: { id: ownerId } }) : null
  if (ownerId && !user) throw new RequestError(401, "SIGN_IN_REQUIRED")
  await guardAccount(request)
  const quote = await checkoutPrice(input.paymentType)
  const activeKey = createHash("sha256").update(`${ownerId ?? saved!.draft.id}:${input.paymentType}:${input.paymentType === "single" ? saved!.version.id : "account"}`).digest("hex")
  const funnelJourneyId = await requestJourney(request)
  const order = await prisma.$transaction(async tx => {
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(710080)`
    if (input.paymentType === "subscription" && await tx.billingSubscription.findFirst({ where: { ownerId: ownerId!, status: { in: ["active", "trialing", "past_due", "unpaid", "incomplete", "paused"] } } })) throw new RequestError(409, "MANAGE_EXISTING_SUBSCRIPTION")
    if (saved && input.paymentType === "single" && await tx.documentPurchase.findFirst({ where: { versionId: saved.version.id, status: "paid" } })) throw new RequestError(409, "VERSION_ALREADY_PURCHASED")
    const existing = await tx.checkoutOrder.findUnique({ where: { activeKey } })
    if (existing) {
      if (existing.versionId !== (saved?.version.id ?? null)) throw new RequestError(409, "ANOTHER_CHECKOUT_IS_OPEN")
      if (existing.guestEmail !== (guestEmail ?? null)) throw new RequestError(409, "CHECKOUT_EMAIL_CONFLICT")
      return existing
    }
    return tx.checkoutOrder.create({ data: { id: randomUUID(), activeKey, ownerId, draftId: saved?.draft.id, versionId: saved?.version.id, contentHash: saved?.version.contentHash, guestEmail, kind: input.paymentType, priceId: quote.priceId, amount: quote.amount, currency: quote.currency, customerId: user?.stripeCustomerId, disclaimerVersion: getLegalDisclaimerAcceptance(request).version, expiresAt: new Date(Math.floor(Date.now() / 1000) * 1000 + 3600000) } })
  })
  // Serialize publication, preserving the same provider key and immutable parameters after any crash.
  const result = await prisma.$transaction(async tx => {
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(710081)`
    const current = await tx.checkoutOrder.findUniqueOrThrow({ where: { id: order.id } })
    if (current.sessionId) {
      const remote = await stripe.checkout.sessions.retrieve(current.sessionId)
      if (remote.status === "expired") {
        await tx.checkoutOrder.update({ where: { id: current.id }, data: { activeKey: null, status: "expired" } })
        return { expired: true }
      }
      if (remote.status !== "open" || !remote.url) return { processing: true }
      return { url: remote.url }
    }
    if (current.expiresAt <= new Date()) return { reconciliationRequired: true }
    const appUrl = process.env.NEXTAUTH_URL
    if (!appUrl || (process.env.NODE_ENV === "production" && new URL(appUrl).protocol !== "https:")) throw new RequestError(503, "CHECKOUT_ORIGIN_REQUIRED")
    const successPath = saved ? `/documents/${saved.draft.category}/${saved.draft.sourceSlug}/download?version=${saved.version.id}` : "/dashboard/billing?payment=processing"
    const cancelPath = saved ? `/documents/${saved.draft.category}/${saved.draft.sourceSlug}/checkout?version=${saved.version.id}` : "/dashboard/billing"
    const metadata = { orderId: current.id, kind: current.kind, versionId: current.versionId ?? "", contentHash: current.contentHash ?? "" }
    const remote = await stripe.checkout.sessions.create({
      mode: current.kind === "single" ? "payment" : "subscription",
      ...(current.customerId ? { customer: current.customerId } : current.guestEmail ? { customer_email: current.guestEmail } : {}),
      line_items: [{ price: current.priceId, quantity: 1 }],
      client_reference_id: current.id, metadata,
      ...(current.kind === "subscription" ? { subscription_data: { metadata: { orderId: current.id } } } : { payment_intent_data: { metadata: { orderId: current.id } } }),
      success_url: new URL(successPath, appUrl).href, cancel_url: new URL(cancelPath, appUrl).href,
      expires_at: Math.floor(current.expiresAt.getTime() / 1000),
      integration_identifier: "legallawdocs_checkout_qjvhtnks",
    }, { idempotencyKey: `checkout:${current.id}` })
    await tx.checkoutOrder.update({ where: { id: current.id }, data: { sessionId: remote.id } })
    return { url: remote.url }
  }, { maxWait: 10000, timeout: 20000 })
  if (result.url) {
    // Optional attribution must never prevent a payment or overwrite an existing attribution.
    if (funnelJourneyId) try {
      await prisma.$transaction(async tx => {
        await tx.$executeRaw`SELECT pg_advisory_xact_lock(710090)`
        if (ownerId && (await tx.user.findUnique({ where: { id: ownerId }, select: { privacyState: true } }))?.privacyState !== "active") return
        await tx.checkoutOrder.updateMany({ where: { id: order.id, funnelJourneyId: null }, data: { funnelJourneyId } })
      }, { maxWait: 1000, timeout: 2000 })
    } catch { console.warn("FUNNEL_MEASUREMENT_UNAVAILABLE") }
    await recordFunnel(request, "checkout")
  }
  return result
}
