import { stripe, PRICE_IDS } from "./stripe"
import { RequestError } from "./request-guard"
export async function checkoutPrice(kind: "single" | "subscription") {
  const id = kind === "single" ? PRICE_IDS.starter : PRICE_IDS.professional
  if (!id) throw new RequestError(503, "PRICE_CONFIGURATION_REQUIRED")
  const p = await stripe.prices.retrieve(id)
  if (!p.active || !p.unit_amount || p.currency !== "usd" || p.billing_scheme !== "per_unit" ||
      (kind === "single" ? p.type !== "one_time" : p.type !== "recurring" || p.recurring?.interval !== "month" || p.recurring.interval_count !== 1)) throw new RequestError(503, "PRICE_CONFIGURATION_INVALID")
  return { priceId: p.id, amount: p.unit_amount, currency: p.currency, recurrence: kind === "subscription" ? "month" : null }
}
