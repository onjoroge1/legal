/**
 * Retired during the production-readiness containment work.
 * Payment fulfillment must only occur from a signature-verified Stripe webhook.
 */
export async function POST() {
  return Response.json(
    {
      error: "This checkout completion endpoint has been retired.",
      code: "ENDPOINT_RETIRED",
    },
    { status: 410 }
  )
}
