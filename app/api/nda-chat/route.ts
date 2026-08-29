/**
 * Retired legacy route. Use the canonical document assistant endpoint, which
 * enforces the current legal disclaimer and production feature controls.
 */
export async function POST() {
  return Response.json(
    { error: "Legacy endpoint retired.", code: "ENDPOINT_RETIRED" },
    { status: 410 }
  )
}
