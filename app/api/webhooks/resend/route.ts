import { Resend } from "resend"
import { deliveryEvents, recordDeliveryEvent } from "@/lib/delivery-feedback"
export const runtime = "nodejs"
export async function POST(request: Request) {
  if (!process.env.RESEND_WEBHOOK_SECRET) return Response.json({ error: "Webhook unavailable" }, { status: 503 })
  const id = request.headers.get("svix-id"), timestamp = request.headers.get("svix-timestamp"), signature = request.headers.get("svix-signature")
  if (!id || !timestamp || !signature) return Response.json({ error: "Missing signature" }, { status: 400 })
  const reader = request.body?.getReader(); if (!reader) return Response.json({ error: "Missing body" }, { status: 400 })
  const chunks: Uint8Array[] = []; let size = 0
  try { while (true) { const { value, done } = await reader.read(); if (done) break; size += value.byteLength; if (size > 65536) { await reader.cancel(); return Response.json({ error: "Body too large" }, { status: 413 }) } chunks.push(value) } } finally { reader.releaseLock() }
  let event
  try { event = new Resend(process.env.RESEND_API_KEY || "webhook-verification-only").webhooks.verify({ payload: Buffer.concat(chunks).toString("utf8"), headers: { id, timestamp, signature }, webhookSecret: process.env.RESEND_WEBHOOK_SECRET }) }
  catch { return Response.json({ error: "Invalid signature" }, { status: 400 }) }
  if (!deliveryEvents.has(event.type) || !("email_id" in event.data)) return Response.json({ received: true })
  const occurredAt = new Date(event.created_at)
  if (!Number.isFinite(occurredAt.getTime())) return Response.json({ error: "Invalid event" }, { status: 400 })
  try { await recordDeliveryEvent(id, event.data.email_id, event.type, occurredAt); return Response.json({ received: true }) }
  catch { return Response.json({ error: "Retry required" }, { status: 503 }) }
}
