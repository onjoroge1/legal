import { after } from "next/server"
import { runDeliveryBatch } from "@/lib/delivery-worker"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"
import { processPaymentEvent, supportedEvents } from "@/lib/payment-fulfillment"
export const runtime = "nodejs"
export const maxDuration = 60
export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature")
  if (!signature) return Response.json({ error: "Missing signature" }, { status: 400 })
  if (!process.env.STRIPE_WEBHOOK_SECRET) return Response.json({ error: "Webhook unavailable" }, { status: 503 })
  const reader = request.body?.getReader()
  if (!reader) return Response.json({ error: "Missing body" }, { status: 400 })
  const chunks: Uint8Array[] = []; let size = 0
  try {
    while (true) { const { value, done } = await reader.read(); if (done) break; size += value.byteLength; if (size > 262144) { await reader.cancel(); return Response.json({ error: "Body too large" }, { status: 413 }) } chunks.push(value) }
  } finally { reader.releaseLock() }
  let event
  try { event = stripe.webhooks.constructEvent(Buffer.concat(chunks), signature, process.env.STRIPE_WEBHOOK_SECRET) }
  catch { return Response.json({ error: "Invalid signature" }, { status: 400 }) }
  if (event.livemode !== (process.env.STRIPE_MODE === "live")) return Response.json({ error: "Wrong payment mode" }, { status: 400 })
  if (!supportedEvents.has(event.type)) return Response.json({ received: true })
  if (!("id" in event.data.object) || typeof event.data.object.id !== "string") return Response.json({ error: "Invalid event object" }, { status: 400 })
  try {
    await prisma.stripeEvent.upsert({ where: { id: event.id }, create: { id: event.id, type: event.type, objectId: event.data.object.id, livemode: event.livemode }, update: {} })
    await processPaymentEvent(event.id)
    if (process.env.ENABLE_PURCHASE_DELIVERY === "true") after(async () => {
      try { await runDeliveryBatch(1) } catch { console.warn("PURCHASE_DELIVERY_WAKEUP_FAILED") }
    })
    return Response.json({ received: true })
  } catch { return Response.json({ error: "Fulfillment retry required" }, { status: 503 }) }
}
