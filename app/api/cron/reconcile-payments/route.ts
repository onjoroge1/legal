import { prisma } from "@/lib/prisma"
import { scopedToken } from "@/lib/scoped-token"
import { processPaymentEvent, reconcileOrder } from "@/lib/payment-fulfillment"
export const runtime = "nodejs"
export const maxDuration = 300
export async function GET(request: Request) {
  if (!scopedToken(request, process.env.CRON_SECRET)) return Response.json({ error: "Unauthorized" }, { status: 401 })
  let recovered = 0; let failed = 0
  const events = await prisma.stripeEvent.findMany({ where: { status: { in: ["pending", "failed"] } }, orderBy: { createdAt: "asc" }, take: 2 })
  for (const event of events) { try { await processPaymentEvent(event.id); recovered++ } catch { failed++ } }
  const orders = await prisma.checkoutOrder.findMany({ where: { status: { in: ["pending", "paid", "refunded", "disputed"] } }, orderBy: { updatedAt: "asc" }, take: 2 })
  for (const order of orders) { try { await reconcileOrder(order.id); recovered++ } catch { failed++ } }
  return Response.json({ recovered, failed }, { status: failed ? 503 : 200, headers: { "Cache-Control": "no-store" } })
}
