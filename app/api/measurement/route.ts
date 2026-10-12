import { z } from "zod"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { consentMeasurement, journeyCookie, measurementAllowed, measurementCookie, requestJourney } from "@/lib/funnel"
import { guardAccount } from "@/lib/request-budget"
import { readJson, requestError, RequestError } from "@/lib/request-guard"
export async function GET(request: Request) {
 try {
  await requestJourney(request) // Honor a received GPC/DNT withdrawal.
  const id = journeyCookie(request)
  const retained = id ? await prisma.funnelJourney.findFirst({ where: { id, expiresAt: { gt: new Date() } }, select: { id: true } }) : null
  return Response.json({ enabled: measurementAllowed(request), consented: !!retained }, { headers: { "Cache-Control": "private, no-store", ...(id && !retained ? { "Set-Cookie": measurementCookie(null) } : {}) } })
 } catch { return Response.json({ error: "MEASUREMENT_UNAVAILABLE" }, { status: 503, headers: { "Cache-Control": "no-store" } }) }
}

export async function POST(request: Request) {
 try {
  if (request.headers.get("origin") !== new URL(request.url).origin) throw new RequestError(403, "CROSS_ORIGIN_REQUEST")
  const input = z.object({ consent: z.boolean(), source: z.enum(["direct", "search", "referral"]).optional() }).strict().parse(await readJson(request, 512))
  const old = journeyCookie(request)
  // Withdrawal works even after the feature is disabled. It removes events and detaches orders.
  if (!input.consent || !measurementAllowed(request)) {
   if (old) await prisma.funnelJourney.deleteMany({ where: { id: old } })
   return Response.json({ consented: false }, { headers: { "Cache-Control": "no-store", "Set-Cookie": measurementCookie(null) } })
  }
  await guardAccount(request)
  const current = await requestJourney(request)
  const session = await getServerSession(authOptions)
  const id = current ?? await consentMeasurement(input.source ?? "direct", session?.user?.id)
  return Response.json({ consented: true }, { headers: { "Cache-Control": "no-store", "Set-Cookie": measurementCookie(id) } })
 } catch (error) { return requestError(error) ?? Response.json({ error: "MEASUREMENT_UNAVAILABLE" }, { status: 503 }) }
}
