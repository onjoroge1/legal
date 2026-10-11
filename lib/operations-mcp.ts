import { operationalHealth } from "./operational-health"
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { z } from "zod"
import { prisma } from "./prisma"
import { isEmergencyFeatureEnabled } from "./feature-flags"
const flags = ["ENABLE_AI_GENERATION", "ENABLE_PAYMENTS", "ENABLE_ELECTRONIC_SIGNING", "ENABLE_DOCUMENT_MUTATIONS"] as const
export function operationsServer() {
  const server = new McpServer({ name: "legallawdocs-operations", version: "1.0.0" })
  function tool(name: string, description: string, run: () => Promise<unknown>) {
    server.registerTool(name, { description, inputSchema: z.object({}).strict(), annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false } }, async () => {
      try { return { content: [{ type: "text" as const, text: JSON.stringify(await run()) }] } }
      catch { return { isError: true, content: [{ type: "text" as const, text: "Operational data unavailable. No healthy status can be inferred." }] } }
    })
  }
  tool("get_release_status", "Deployment identity, expected migration and containment switches; does not infer CI or database migration success.", async () => ({
    revision: /^[a-f0-9]{40}$/.test(process.env.VERCEL_GIT_COMMIT_SHA ?? "") ? process.env.VERCEL_GIT_COMMIT_SHA : "unavailable",
    expectedMigration: "20261016000000_operational_health", appliedMigration: "unavailable", ciEvidence: "unavailable",
    flags: Object.fromEntries(flags.map(f => [f, isEmergencyFeatureEnabled(f)])),
  }))
  tool("get_usage_budget", "Reserved AI budget and live leases. Reservations are not provider-billed spend.", async () => {
    const [budget, leases] = await Promise.all([prisma.requestBudget.findUnique({ where: { key: "ai:global:daily" } }), prisma.requestLease.count({ where: { expiresAt: { gt: new Date() } } })])
    return { reservedCents: budget && budget.resetAt > new Date() ? budget.used : 0, configuredDailyCents: Number(process.env.AI_DAILY_BUDGET_CENTS ?? 1000), liveLeases: leases, providerBilledSpend: "unavailable" }
  })
  tool("get_generation_health", "Aggregate source review counts; generation latency/failure telemetry is not yet instrumented.", async () => {
    const cutoff = new Date(Date.now() - 90 * 86400000)
    const [pending, stale] = await Promise.all([prisma.verifiedFact.count({ where: { status: "pending" } }), prisma.verifiedFact.count({ where: { status: "approved", OR: [{ reviewedAt: null }, { reviewedAt: { lt: cutoff } }] } })])
    return { pendingSourceReviews: pending, staleApprovedSources: stale, latency: "unavailable", generationFailures: "unavailable", generationSuccesses: "unavailable" }
  })
  tool("get_payment_health", "Aggregate webhook, checkout and delivery backlogs. No customer, payment or document identifiers.", async () => {
    const [failedEvents, pendingEvents, pendingOrders, pendingDeliveries, blockedDeliveries, acceptedDeliveries, deliveredEmails] = await Promise.all([
      prisma.stripeEvent.count({ where: { status: "failed" } }), prisma.stripeEvent.count({ where: { status: "pending" } }),
      prisma.checkoutOrder.count({ where: { status: "pending" } }), prisma.deliveryOutbox.count({ where: { status: { in: ["pending", "retry", "processing"] } } }),
      prisma.deliveryOutbox.count({ where: { status: { in: ["blocked", "failed", "bounced", "complained", "suppressed"] } } }),
      prisma.deliveryOutbox.count({ where: { status: "accepted" } }), prisma.deliveryOutbox.count({ where: { status: "delivered" } }),
    ])
    return { failedEvents, pendingEvents, pendingOrders, pendingDeliveries, blockedDeliveries, acceptedDeliveries, deliveredEmails, deliveryWorker: process.env.ENABLE_PURCHASE_DELIVERY === "true" ? "enabled; schedule and provider verification required" : "disabled", providerReconciliationHealth: "unavailable" }
  })
  tool("get_operational_health", "Aggregate queue, heartbeat, generation, privacy and alert health with applied migration and release identity.", operationalHealth)
  tool("get_launch_backlog", "Code scope and outstanding release evidence. Does not claim that PRs are merged or deployed.", async () => ({
    work: [{ pr: "PR-07", auditIds: ["PAY-03", "PAY-07"] }, { pr: "PR-08", auditIds: ["PAY-04", "PAY-06", "PAY-08", "PAY-09"] }, { pr: "PR-09", auditIds: ["PAY-02"] }],
    merged: "unavailable", deployedAndVerified: "unavailable", remaining: ["staging delivery, webhook and guest recovery verification", "credential rotation", "real Stripe sandbox lifecycle validation", "production migration and historical payment reconciliation", "qualified legal review", "commercial and refund-policy approval"],
  }))
  return server
}
