# PR-04 — SEC-02 / SEC-04 / SEC-05

Carries #9 and #10 into main: those PRs were merged into their stacked parent branches, not the release branch. No production deployment or live database operation.

Bounded streamed JSON, strict generation/chat/account schemas, same-origin mutation checks, literal template replacement, durable shared AI/account budgets, eight global/two subject concurrent reservations, 55-second provider timeouts, disabled automatic provider retries, 8,192 output-token caps. PostgreSQL advisory locking serializes all budget decisions across instances. Database failure denies requests. Expired concurrency leases are removed on reservation; budget keys contain hashes, never email or IP text. Configure retention cleanup for old RequestBudget rows before opening public traffic.

AI_DAILY_BUDGET_CENTS defaults to 1000; AI_REQUEST_RESERVATION_CENTS defaults to 100. Reservations are conservative accounting, not measured provider bills. Review token costs and upper bounds before setting these values; configure an independent provider hard budget and route AI_BUDGET_THRESHOLD_80_PERCENT log alerts to an operator. Alert delivery/provider price review remain OP-E evidence, not completed here. Requests reserve full cost even on errors. Local/non-Vercel public users deliberately share a bucket until a trusted ingress integration exists. Login also has hashed email limits.

CSP denies frames/objects and restricts connections/Stripe frames; inline scripts remain necessary for current static Next rendering (nonce migration is not claimed). Test real auth and Stripe in staging with headers before enabling features. Feature flags stay off. Mutation/signing fixes belong to their roadmap PRs.

Verification: request abuse and shared-budget behavior tests, regression suite, migration replay and schema parity, typecheck/lint/build. Rollback: leave additive limit tables; roll code back only to a contained release with AI disabled.

Follow-up guards: legacy document mutations accept only draft transitions and allowlisted metadata; signed/signing/version-bound records reject edits, and optimistic updatedAt matching closes the read/update race. Settings JSON is bounded. Actual PostgreSQL concurrency checks run in CI (two requests per subject, eight global, denied transactions leave counters unchanged). Vercel ingress reference: https://vercel.com/docs/headers/request-headers#x-vercel-forwarded-for
