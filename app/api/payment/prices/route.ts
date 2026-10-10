import { checkoutPrice } from "@/lib/payment-pricing"
export async function GET() {
  try { const [single, subscription] = await Promise.all([checkoutPrice("single"), checkoutPrice("subscription")]); return Response.json({ single, subscription }, { headers: { "Cache-Control": "public, max-age=60" } }) }
  catch { return Response.json({ error: "Prices are temporarily unavailable" }, { status: 503 }) }
}
