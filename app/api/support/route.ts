import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { readJson, requestError, RequestError } from "@/lib/request-guard"
import { guardAccount } from "@/lib/request-budget"
import { createSupport, supportInput } from "@/lib/support"
export async function POST(request: Request) {
 try {
  if (request.headers.get("origin") !== new URL(request.url).origin) throw new RequestError(403, "CROSS_ORIGIN_REQUEST")
  const input = supportInput.parse(await readJson(request, 10000))
  await guardAccount(request)
  const session = await getServerSession(authOptions)
  return Response.json(await createSupport(input, session?.user?.id), { status: 201, headers: { "Cache-Control": "private, no-store" } })
 } catch (error) { return requestError(error) ?? Response.json({ error: "SUPPORT_UNAVAILABLE" }, { status: 503 }) }
}
