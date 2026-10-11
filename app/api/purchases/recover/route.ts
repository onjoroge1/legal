import { after } from "next/server"
import { runDeliveryBatch } from "@/lib/delivery-worker"
import { z } from "zod"
import { readJson, requestError } from "@/lib/request-guard"
import { guardAccount } from "@/lib/request-budget"
import { queueGuestRecovery } from "@/lib/guest-purchase-recovery"
export async function POST(request: Request) {
  try {
    const { orderId, email } = z.object({ orderId: z.string().uuid(), email: z.string().trim().email().max(254) }).strict().parse(await readJson(request, 1024))
    await guardAccount(request)
    if (process.env.ENABLE_PURCHASE_DELIVERY !== "true") return Response.json({ error: "Recovery temporarily unavailable" }, { status: 503 })
    await queueGuestRecovery(orderId, email)
    after(async () => { try { await runDeliveryBatch(1) } catch { console.warn("PURCHASE_RECOVERY_WAKEUP_FAILED") } })
    return Response.json({ message: "If this matches an eligible guest purchase, a recovery link will be emailed. Check your spam folder. Requests are limited to three per hour." }, { status: 202, headers: { "Cache-Control": "no-store" } })
  } catch (error) { return requestError(error) ?? Response.json({ error: "Recovery temporarily unavailable" }, { status: 503 }) }
}
