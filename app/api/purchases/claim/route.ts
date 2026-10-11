import { z } from "zod"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { readJson, requestError } from "@/lib/request-guard"
import { guardAccount } from "@/lib/request-budget"
import { redeemGuestPurchase } from "@/lib/guest-purchase-recovery"
export async function POST(request: Request) {
  try {
    const { token, mode } = z.object({ token: z.string().regex(/^[a-f0-9]{64}$/), mode: z.enum(["guest", "account"]) }).strict().parse(await readJson(request, 1024))
    await guardAccount(request)
    const session = mode === "account" ? await getServerSession(authOptions) : null
    const result = await redeemGuestPurchase(token, mode, session?.user?.id)
    return Response.json({ path: result.path }, { headers: { "Cache-Control": "private, no-store", ...(result.cookie ? { "Set-Cookie": result.cookie } : {}) } })
  } catch (error) { return requestError(error) ?? Response.json({ error: "Recovery temporarily unavailable" }, { status: 503 }) }
}
