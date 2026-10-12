import { requireCommercialPolicy } from "@/lib/commercial-policy"
import { createCheckout } from "@/lib/checkout"
import { requestError } from "@/lib/request-guard"
import { requireLegalDisclaimerAcceptance } from "@/lib/legal-disclaimer-server"
import { requireEmergencyFeature } from "@/lib/feature-flags"
export async function POST(request: Request) {
  try {
    const blocked = requireLegalDisclaimerAcceptance(request) ?? requireEmergencyFeature("ENABLE_PAYMENTS", "Checkout") ?? requireCommercialPolicy()
    if (blocked) return blocked
    const result = await createCheckout(request)
    if (result.expired) return Response.json({ error: "Checkout expired. Try again to create a new checkout." }, { status: 409 })
    if (result.processing || result.reconciliationRequired) return Response.json({ error: "Payment is being verified. Please do not pay again." }, { status: 409 })
    return Response.json(result, { headers: { "Cache-Control": "no-store" } })
  } catch (error) { return requestError(error) ?? Response.json({ error: "Checkout temporarily unavailable" }, { status: 503 }) }
}
