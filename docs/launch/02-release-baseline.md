# PR-02: release baseline

Audit scope: REL-01, REL-02, SEC-03, OPS-04.

## Reproducible candidate

Use main after the stacked foundation PRs merge, Node 22.22.0 (.node-version),
pnpm 11.25.0 and pnpm-lock.yaml. npm/package-lock was stale and is removed.
Use `pnpm install --frozen-lockfile`, `pnpm test`, `pnpm typecheck`, `pnpm lint`,
`pnpm build`, `pnpm smoke:ci`, and `pnpm check:dependencies`.
CI uses only synthetic local PostgreSQL and provider placeholders; no production
secrets. PR-03 replaces temporary fixture db push with migration replay/drift and
restore checks. That temporary step is never a production migration instruction.
Smoke discovers all 52 document routes from the catalog, tests public routes,
legacy redirect, login protection, disabled generation/chat/checkout, retired
completion, bad Stripe signatures and 404 behavior. It is not provider-backed
purchase, email, signing or all-role end-to-end certification.

## Dependency disposition as of 2026-10-10

Next/ESLint config move 16.1.6 -> 16.4.0; React/DOM -> 19.3.0;
NextAuth -> 4.24.15. Compatible transitive patches are pinned through pnpm overrides.
The audit fell from 87 findings (3 critical/41 high) to 16 (0 critical/5 high).
Counts are advisory records, not demonstrated exploits. Raw results are retained
in CI test-results. All remaining high findings have named, expiring reachability
exceptions in dependency-exceptions.json; unknown high/critical findings block CI.

Nodemailer is transitive through Credentials-only NextAuth and Resend. This app
uses Resend's outgoing HTTP API, not SMTP/NextAuth EmailProvider or inbound MIME
parsing. Forcing Nodemailer 7 -> 10 across those dependencies is not a patch-sized
compatibility assumption. Braces has no upstream patch; its dependency paths
are Tailwind/ESLint build-time repository-controlled globs. CI checks application
sources for those excluded usage paths. Review expires 2026-10-24 or immediately
when adding those features. Remaining moderate UUID/selector-parser findings
remain visible; do not describe this as zero vulnerabilities.

Sources: https://github.com/vercel/next.js/security/advisories
https://github.com/advisories/GHSA-vfj7-8cjw-p6xm
https://github.com/advisories/GHSA-p6gq-j5cr-w38f
https://github.com/advisories/GHSA-v53p-9fqp-m79j
Next.js also announced an upstream security release for 2026-10-14:
https://nextjs.org/blog (October 8 announcement). Re-audit/patch before launch;
today's public release cannot preempt an unreleased fix.

## Logging and lint

Server logs emit static labels only. No raw provider/Prisma errors, citation text,
email subjects or document titles; Prisma raw query/error logging is disabled.
A source regression gate enforces this. Structured privacy-safe correlation and
metrics remain PR-13. Warning cleanup removes unused catch bindings. Existing
warning categories remain ratcheted; CommonJS test fixtures explicitly permit
CommonJS require. No production lint rule is weakened.

## External gates (not performed by a code PR)

Repository admin: set default branch to main after review; protect main with both
CI jobs and migration gates, disallow bypass/force push. Hosting owner: align
Vercel production source to main and use explicit frozen install/build commands;
confirm Node 22 runtime, environment scope and commit SHA. Keep all emergency
flags false. Require PR-03's reviewed migration/drift and restore evidence before
promoting main. Never run production migration from a preview build hook.
Branch heads, default branch and production aliases are distinct; a merged PR
does not prove production updated. Rollback only to a schema-compatible contained
release. Record deployment SHA and operational checks separately.
