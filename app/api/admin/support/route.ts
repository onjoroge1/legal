import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { readJson, requestError, RequestError } from "@/lib/request-guard"
import { guardAccount } from "@/lib/request-budget"
import { z } from "zod"
async function admin() {
 const session = await getServerSession(authOptions)
 if (!session?.user?.id || !(await prisma.user.findFirst({ where: { id: session.user.id, isAdmin: true, privacyState: "active" }, select: { id: true } }))) throw new RequestError(404, "NOT_FOUND")
}
export async function GET() {
 try {
  await admin()
  return Response.json(await prisma.supportTicket.findMany({ where: { expiresAt: { gt: new Date() }, status: "open" }, orderBy: { createdAt: "asc" }, take: 50, select: { id: true, topic: true, message: true, createdAt: true, expiresAt: true } }), { headers: { "Cache-Control": "private, no-store" } })
 } catch (e) { return requestError(e) ?? Response.json({ error: "SUPPORT_UNAVAILABLE" }, { status: 503 }) }
}
export async function POST(request: Request) {
 try {
  await admin()
  if (request.headers.get("origin") !== new URL(request.url).origin) throw new RequestError(403, "CROSS_ORIGIN_REQUEST")
  const input = z.object({ id: z.string().uuid(), response: z.string().trim().min(10).max(2000) }).strict().parse(await readJson(request, 10000))
  await guardAccount(request)
  const result = await prisma.supportTicket.updateMany({ where: { id: input.id, status: "open", expiresAt: { gt: new Date() } }, data: { response: input.response, status: "answered", answeredAt: new Date() } })
  if (!result.count) throw new RequestError(409, "TICKET_NOT_OPEN")
  return Response.json({ updated: true }, { headers: { "Cache-Control": "no-store" } })
 } catch (e) { return requestError(e) ?? Response.json({ error: "SUPPORT_UNAVAILABLE" }, { status: 503 }) }
}
