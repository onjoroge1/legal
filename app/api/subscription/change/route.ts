import { requireLegalDisclaimerAcceptance } from "@/lib/legal-disclaimer-server"
// Legacy plan mutations cannot grant access. PR-08 supplies the billing checkout contract.
export async function POST(request: Request) {
  const blocked = requireLegalDisclaimerAcceptance(request)
  if (blocked) return blocked
  return Response.json({ error: "Use billing checkout or cancellation" }, { status: 409 })
}
