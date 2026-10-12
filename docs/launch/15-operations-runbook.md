# PR-13: operational health, reconciliation and recovery (OPS-03)

## Surfaces and evidence

`GET /api/admin/operations` requires a database administrator session. Read-only MCP `get_operational_health` exposes the same aggregate health, 24-hour counts/mean duration, actual applied migration and deployment SHA. No document text, email, prompt, provider payload or customer/order IDs are returned. Missing database/telemetry is unavailable, not healthy. AI budget is reserved cost, not provider-billed spend. Generation metrics cover the shared document generator after quota admission; other AI routes are not represented as fully instrumented.

Monitor conditions: paid orders missing a paid entitlement or fulfillment outbox, failed order reconciliation, failed or overdue webhook events, delivery older than 15 minutes, terminal delivery failures, at least three generation failures/hour, generation stuck over five minutes, 80% of reserved AI budget, source schedules stale over 45 days, overdue privacy requests over seven days, and missing successful worker heartbeats (payments/delivery 15 minutes, sources 48 hours). Delivery heartbeat is required only when dispatch is enabled. Review these initial thresholds against actual load. Daily means are not percentile latency or an SLO claim.

Reconciliation retries due events with backoff and rotates orders by lastReconciledAt even on failure. A permanently bad record cannot monopolize every batch. Existing fulfillment checks still validate current provider state and enforce transactional entitlement/outbox updates. Worker leases exclude concurrent invocations for ten minutes; hard crashes expire, and individual payment/delivery operations remain idempotent.

## Scheduling and receiver setup

- The `Scheduled operations recovery` GitHub workflow invokes payment reconciliation, delivery and monitoring every five minutes and supports manual dispatch. Set protected `operations` environment secrets `OPERATIONS_BASE_URL` (canonical HTTPS origin) and `OPERATIONS_CRON_SECRET` (the deployment's CRON_SECRET, at least 32 characters). It logs route/status only and continues to monitoring after earlier failures.
- GitHub scheduled workflows execute from the repository DEFAULT branch. This repository historically defaults to master; main must be made the default release branch (or this workflow deliberately installed on the default branch) before scheduling works. A workflow file merged only to main does not prove scheduling. Do not enable paid launch until manual dispatch and recurring runs are verified.
- Vercel's existing daily source/weekly digest jobs remain. Daily avatar cleanup and policy-gated privacy erasure are added. Automatic destructive privacy work defaults off. The five-minute schedule is external to Vercel to avoid assuming a paid Vercel cron plan.
- Set `OPERATIONS_ALERT_URL` to an approved HTTPS incident receiver and optional `OPERATIONS_ALERT_TOKEN`. The receiver accepts the documented JSON `{id,code,count,observedAt,revision,runbook}` and deduplicates the `Idempotency-Key`. A Slack incoming webhook is not assumed to accept this schema; use an adapter if needed.
- Alert episodes are deduplicated by condition/hour. Exact persisted payloads retry with backoff and a leased dispatcher. Delivery is at least once: if a receiver accepts but the database acknowledgement fails, the receiver must deduplicate. Failure remains in OperationsAlert. Missing receiver configuration never reports successful delivery.
- Watch the GitHub workflow itself through repository notifications/external uptime monitoring: a scheduler or database outage cannot reliably alert through its own broken application. Assign an on-call owner and verify the destination; this PR does not send real incident messages or change production secrets.

## Incident actions

| Code | Action |
| --- | --- |
| PAID_FULFILLMENT_GAP / PAYMENT_RECONCILIATION_FAILED / PAYMENT_WEBHOOK_BACKLOG | Keep signed Stripe intake open; inspect restricted order/event ledger; verify mode, quote and metadata; run reconciliation. Never manually grant access from a browser success URL. |
| DELIVERY_QUEUE_DELAY / DELIVERY_BLOCKED | Verify flag, scheduler, sender and provider feedback. Retry only through PR10's fenced retry controls. Beyond 23 hours, reconcile provider acceptance before any new send. |
| GENERATION_FAILURES / GENERATION_STALLED / AI_BUDGET_THRESHOLD | Disable new generation if needed; check static failure counts, reviewed sources and provider health/budget. Do not log prompts or contracts to debug. |
| SOURCE_REFRESH_STALE | Verify source cron and upstream credentials; refresh/review sources. Fresh ingestion is not qualified legal approval. |
| WORKER_HEARTBEAT_STALE | Check scheduler runs, origin, authentication and runtime duration; expire leases naturally; use authenticated manual dispatch. |
| PRIVACY_REQUEST_OVERDUE | Review policy approval, billing/shared-record blockers, object cleanup and processor/backup evidence. Never bypass policy or mark external deletion complete without evidence. |

## Release, restore and rollback

1. Record PR source SHA, full CI run, migration version and nonsecret configuration revision. Test-mode provider payment/delivery and approved legal scope remain separate release gates.
2. Back up before migration; replay the additive chain on a restored staging database. CI rehearses migrations twice and PostgreSQL backup/restore, concurrency and loss-of-acknowledgement failure paths.
3. Deploy the intended SHA; check both health and the canonical alias. Manually dispatch operations once, inject a synthetic recoverable fault, observe an accepted alert at the approved receiver, and confirm recovery. CI mocks outbound provider/alert traffic and does not satisfy this live staging evidence.
4. For incidents, disable affected new actions while leaving signed webhook intake/recovery available. Roll back only to a schema-compatible contained revision. After privacy requests exist, auth must continue enforcing privacyState; do not restore a pre-PR12 release.
5. Before serving a restored backup, replay the privacy ledger and reconcile payment events against current Stripe state. Reuse delivery idempotency keys/payloads inside their safe window; manually reconcile older ambiguous sends. Verify a synthetic paid order is not lost or duplicated.

Capacity: current recovery batches process two events/two orders and five deliveries per invocation. These are bounded initial settings, not a throughput promise; increase only after measured runtime/provider limits and queue-age evidence. Alert sending handles one due alert per monitor run. OperationRun/OperationsAlert carry no customer identifiers; review their growth and apply an approved operational-log retention policy. Financial/privacy evidence is not automatically purged by this PR.

Outstanding operator acceptance: real receiver/notification routing, protected environment secrets, default-branch alignment, recurring execution, sender/storage settings, provider-backed failure recovery and production restore/rollback rehearsal. No merged/READY state alone closes OPS-03.
