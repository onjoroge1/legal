import { randomBytes } from "crypto"
import { prisma } from "./prisma"
import { RequestError } from "./request-guard"
export const FUNNEL_COOKIE = "legallawdocs_measurement"
export const FUNNEL_STAGES = ["source", "generation", "checkout", "paid", "download"] as const
export type FunnelStage = typeof FUNNEL_STAGES[number]
export function measurementAllowed(request: Request) { return process.env.ENABLE_FUNNEL_MEASUREMENT === "true" && request.headers.get("sec-gpc") !== "1" && request.headers.get("dnt") !== "1" }
export function journeyCookie(request: Request) {
 const value = request.headers.get("cookie")?.split(";").map(x => x.trim()).find(x => x.startsWith(`${FUNNEL_COOKIE}=`))?.slice(FUNNEL_COOKIE.length + 1)
 return value && /^[a-f0-9]{64}$/.test(value) ? value : null
}
export function measurementCookie(id: string | null) { return `${FUNNEL_COOKIE}=${id ?? ""}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${id ? 30 * 86400 : 0}${process.env.NODE_ENV === "production" ? "; Secure" : ""}` }
export async function consentMeasurement(source: "direct" | "search" | "referral", userId?: string) {
 return prisma.$transaction(async tx => {
  await tx.$executeRaw`SELECT pg_advisory_xact_lock(710090)`
  if (userId && (await tx.user.findUnique({ where: { id: userId }, select: { privacyState: true } }))?.privacyState !== "active") throw new RequestError(403, "ACCOUNT_UNAVAILABLE")
  const id = randomBytes(32).toString("hex")
  await tx.funnelJourney.create({ data: { id, userId, source, expiresAt: new Date(Date.now() + 30 * 86400000), events: { create: { stage: "source" } } } })
  return id
 })
}
export async function requestJourney(request: Request) {
 const id = journeyCookie(request); if (!id) return null
 if (!measurementAllowed(request)) {
  if (request.headers.get("sec-gpc") === "1" || request.headers.get("dnt") === "1") try { await prisma.funnelJourney.deleteMany({ where: { id } }) } catch { console.warn("FUNNEL_MEASUREMENT_UNAVAILABLE") }
  return null
 }
 try { return (await prisma.funnelJourney.findFirst({ where: { id, expiresAt: { gt: new Date() } }, select: { id: true } }))?.id ?? null } catch { return null }
}
export async function recordFunnel(request: Request, stage: Exclude<FunnelStage, "source" | "paid">) {
 const id = await requestJourney(request); if (!id) return
 try { await prisma.funnelEvent.upsert({ where: { journeyId_stage: { journeyId: id, stage } }, create: { journeyId: id, stage }, update: {} }) } catch { console.warn("FUNNEL_MEASUREMENT_UNAVAILABLE") }
}
// Reconciliation from durable paid state also covers webhook retries and process crashes.
// One event per opted-in browser journey, not one event per payment or download.
export async function reconcilePaidFunnel() {
 if (process.env.ENABLE_FUNNEL_MEASUREMENT !== "true") return
 try {
  const journeys = await prisma.funnelJourney.findMany({ where: { expiresAt: { gt: new Date() }, orders: { some: { status: "paid" } }, events: { none: { stage: "paid" } } }, orderBy: { createdAt: "asc" }, take: 100, select: { id: true } })
  for (const { id } of journeys) await prisma.funnelEvent.upsert({ where: { journeyId_stage: { journeyId: id, stage: "paid" } }, create: { journeyId: id, stage: "paid" }, update: {} })
 } catch { console.warn("FUNNEL_MEASUREMENT_UNAVAILABLE") }
}
export async function funnelSummary() {
 const rows = await prisma.funnelEvent.groupBy({ by: ["stage"], where: { journey: { expiresAt: { gt: new Date() } } }, _count: true })
 const sources = await prisma.funnelJourney.groupBy({ by: ["source"], where: { expiresAt: { gt: new Date() } }, _count: true })
 return { enabled: process.env.ENABLE_FUNNEL_MEASUREMENT === "true", population: "Opted-in browser journeys retained for 30 days. Stages count each journey once; journeys may enter midway. Paid is server-verified gross conversion, not net revenue. Download means file prepared, not proof of receipt.", stages: Object.fromEntries(FUNNEL_STAGES.map(stage => [stage, rows.find(r => r.stage === stage)?._count ?? 0])), sources: sources.map(row => ({ source: row.source, count: row._count })) }
}
