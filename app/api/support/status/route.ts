import { readJson, requestError, RequestError } from "@/lib/request-guard"
import { guardAccount } from "@/lib/request-budget"
import { readSupport, accessInput } from "@/lib/support"
export async function POST(request: Request) {
 try {
  if (request.headers.get("origin") !== new URL(request.url).origin) throw new RequestError(403, "CROSS_ORIGIN_REQUEST")
  const input = accessInput.parse(await readJson(request, 1024)); await guardAccount(request)
  return Response.json(await readSupport(input), { headers: { "Cache-Control": "private, no-store" } })
 } catch (error) { return requestError(error) ?? Response.json({ error: "SUPPORT_UNAVAILABLE" }, { status: 503 }) }
}
