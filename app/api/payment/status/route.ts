import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { readVersion } from "@/lib/document-versions"
import { requestError } from "@/lib/request-guard"
export async function GET(request: Request) {
  try {
    const versionId = z.string().uuid().parse(new URL(request.url).searchParams.get("versionId"))
    const { draft } = await readVersion(request, versionId)
    const order = await prisma.checkoutOrder.findFirst({ where: { versionId, ownerId: draft.ownerId }, orderBy: { createdAt: "desc" }, select: { id: true, status: true } })
    const delivery = order ? await prisma.deliveryOutbox.findFirst({ where: { orderId: order.id }, orderBy: { createdAt: "desc" }, select: { status: true, acceptedAt: true, deliveredAt: true } }) : null
    return Response.json({ order, delivery }, { headers: { "Cache-Control": "private, no-store" } })
  } catch (error) { return requestError(error) ?? Response.json({ error: "Status unavailable" }, { status: 503 }) }
}
