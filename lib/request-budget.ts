import { createHash, randomUUID } from "crypto"
import { prisma } from "@/lib/prisma"
import { RequestError } from "@/lib/request-guard"

function digest(value: string) { return createHash("sha256").update(value).digest("hex") }
function positive(name: string, fallback: number) {
  const n = Number(process.env[name] ?? fallback)
  if (!Number.isSafeInteger(n) || n <= 0) throw new RequestError(503, "LIMIT_CONFIGURATION_REQUIRED")
  return n
}
/** Only Vercel's overwritten IP header is trusted. Other hosting shares an anonymous bucket. */
export function requestSubject(request: Request): string {
  const ip = process.env.VERCEL === "1" ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() : undefined
  return digest(ip || "shared-anonymous")
}
/** All routes share one atomic PostgreSQL budget. Reservations are never refunded on provider error. */
export async function reserveRequest(group: "ai" | "account", subject: string, identity?: string): Promise<void> {
  const now = new Date(); const hour = new Date(now.getTime() + 3600000)
  try {
    await prisma.$transaction(async tx => {
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(710040)`
      const take = async (key: string, amount: number, limit: number, until: Date) => {
        const current = await tx.requestBudget.findUnique({ where: { key } })
        const used = current && current.resetAt > now ? current.used : 0
        if (used + amount > limit) throw new RequestError(429, "REQUEST_LIMIT_REACHED")
        await tx.requestBudget.upsert({ where: { key }, create: { key, used: amount, resetAt: until }, update: { used: used + amount, resetAt: used ? current!.resetAt : until } })
      }
      await take(`${group}:${subject}`, 1, group === "ai" ? 12 : 20, hour)
      if (identity) await take(`${group}:identity:${digest(identity.toLowerCase())}`, 1, 10, hour)
      if (group === "ai") {
        // Configure from a reviewed worst-case provider cost with input/output caps. Not actual billing.
        const reservation = positive("AI_REQUEST_RESERVATION_CENTS", 100)
        const daily = positive("AI_DAILY_BUDGET_CENTS", 1000)
        const midnight = new Date(now); midnight.setUTCHours(24, 0, 0, 0)
        await take("ai:global:daily", reservation, daily, midnight)
        await tx.requestLease.deleteMany({ where: { expiresAt: { lte: now } } })
        if (await tx.requestLease.count() >= 8 || await tx.requestLease.count({ where: { subject } }) >= 2) throw new RequestError(429, "CONCURRENCY_LIMIT_REACHED")
        // Provider calls abort at 55s. Keep reservations 90s, including client disconnects/streams.
        await tx.requestLease.create({ data: { id: randomUUID(), subject, expiresAt: new Date(now.getTime() + 90000) } })
        const used = await tx.requestBudget.findUnique({ where: { key: "ai:global:daily" } })
        if (used && used.used >= daily * 0.8) console.warn("AI_BUDGET_THRESHOLD_80_PERCENT")
      }
    }, { maxWait: 5000, timeout: 10000 })
  } catch (error) {
    if (error instanceof RequestError) throw error
    throw new RequestError(503, "REQUEST_LIMIT_SERVICE_UNAVAILABLE")
  }
}
export async function guardAI(request: Request) { await reserveRequest("ai", requestSubject(request)) }
export async function guardAccount(request: Request, identity?: string) { await reserveRequest("account", requestSubject(request), identity) }
