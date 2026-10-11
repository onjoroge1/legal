import { z } from "zod"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { readJson, requestError } from "@/lib/request-guard"
import { guardAccount } from "@/lib/request-budget"
import { retryAllowed } from "@/lib/delivery-worker"
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    const user = session?.user?.id ? await prisma.user.findUnique({ where: { id: session.user.id }, select: { isAdmin: true } }) : null
    if (!user?.isAdmin) return Response.json({ error: "Not found" }, { status: 404 })
    const { id } = z.object({ id: z.string().uuid() }).strict().parse(await readJson(request, 512))
    await guardAccount(request)
    const result = await prisma.$transaction(async tx => {
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(710100)`
      const job = await tx.deliveryOutbox.findUnique({ where: { id } })
      if (!job || !["blocked", "retry"].includes(job.status) || job.providerId || !retryAllowed(job.firstSendAt)) return false
      await tx.deliveryOutbox.update({ where: { id }, data: { status: "retry", attempts: 0, nextAttemptAt: new Date(), lastError: null } })
      return true
    })
    return Response.json({ queued: result }, { status: result ? 202 : 409, headers: { "Cache-Control": "no-store" } })
  } catch (error) { return requestError(error) ?? Response.json({ error: "Retry unavailable" }, { status: 503 }) }
}
