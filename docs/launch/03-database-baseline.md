# PR-03: additive database baseline

Audit DB-01. Never run this migration blindly on a customer database.

## What the migration chain now represents

The immutable 20250419144420_init and 20260831000000_add_jwt_version files are
unchanged. The new transaction adds the eight missing models (BlogPost,
Notification, Team, TeamMember, TeamInvitation, LawyerListing, VerifiedFact,
IngestSchedule), eight missing nullable DocumentTemplate SEO/link columns and
all their indexes/foreign keys. Existing UserDocument/customer rows are unchanged.
There is no data backfill because these additions are nullable or new tables;
JWT's existing additive default is tested against populated users.

Original Document, DocumentCollaborator and DocumentSignature tables and
DocumentParty.documentId are retained in schema as ignored legacy models/relations.
They may contain customer content and signature evidence. Prisma Client does not
expose the ignored models. No DROP, destructive reset or historical migration
rewrite is used. A future reviewed data migration can decide their lifecycle.

## Verification included

- PGlite (real PostgreSQL engine in WASM) replays the whole SQL chain into a fresh
  database and compares every public column, constraint and index with Prisma's
  generated target DDL, including retained legacy tables.
- A populated legacy fixture upgrades with original documents/signatures intact,
  defaults applied, then snapshots/restores and checks structure and exact rows.
- Reapplying raw reconciliation SQL deliberately fails on existing objects;
  masking unknown drift with IF NOT EXISTS would be unsafe.
- CI PostgreSQL 16 runs actual Prisma migrate deploy twice (second is a no-op),
  checks zero schema drift, seeds synthetic records, pg_dump/restores to a second
  database, checks drift again and verifies restored content. Fixtures refuse
  non-local or non-test database names.

Local fixture evidence is not a restored production database. Actual production
metadata, migration ledger, backup policy and recovery time remain unverified.

## Existing staging/production: read-only preflight first

Use authorized fresh credentials from the deployment owner, never historical
repo .env files. Use a direct migration connection, not a transaction-pooler URL.
Run in the authorized environment; keep outputs private, without row data:

    pnpm exec prisma migrate status
    pnpm run check:db

`check:db` only compares metadata, never applies SQL or changes the migration
ledger. Nonzero means STOP, not permission to reset. For reviewable private DDL:

    pnpm exec prisma migrate diff --from-schema-datasource prisma/schema.prisma --to-schema-datamodel prisma/schema.prisma --script > private-schema-diff.sql

The diff may propose destructive operations for unrelated production objects.
DO NOT EXECUTE the generated diff. Have the database owner compare it with this
migration and inspect columns, nullability, defaults, indexes, constraints,
legacy-table presence and _prisma_migrations/checksums. Do not commit the dump.

### Choose the verified path on a restored staging copy

1. **Empty database:** migrate deploy -> check:db -> fixture/application checks.
2. **Original tracked schema, migrations recorded:** restore a backup; verify
   the predecessor shape, apply the new migration on that copy; check zero drift,
   row counts and sampled content/signature hashes; deploy old contained reads
   and new application against it. Repeat deploy must be a no-op.
3. **All current objects already created out of band:** first reconcile any
   differences through reviewed, explicit additive SQL. Only after the database
   matches the complete intended schema may the owner baseline already-applied
   migration names with `prisma migrate resolve --applied <exact_name>`. Do not
   mark the new migration applied merely because one of its eight tables exists.
   Preserve existing ledger entries/checksums. Record approved evidence per name.
4. **Partial or unknown drift:** STOP. Create an environment-specific additive
   reconciliation migration/repair after reviewing the private schema diff;
   test on the restored copy. Do not drop existing tables or reset migration
   history. If an attempted transactional migration fails, inspect rollback and
   ledger state; resolve --rolled-back only after confirming all work rolled back.

## Deployment and recovery gates

Database owner records: source release SHA/schema version, migration status,
backup identifier/time, successful restore to an isolated database, row/hash
comparisons, zero post-upgrade drift, measured restore duration and rollback plan.
Take a verified backup and quiesce writes where the approved runbook requires it.
Apply approved additive migration before deploying the new main candidate.
Do not attach automatic production migrations to Vercel preview/build hooks.

Application rollback keeps additive tables/columns and uses a contained,
compatible release. Do not drop new tables to roll back code. Full database
restore is incident recovery, not a routine down migration, and needs an explicit
plan for writes since backup. DB-01 remains open until a production-like restore,
live preflight and approved production migration are evidenced.

## Minimal contracts for later PRs (no premature tables here)

- PR-05: immutable document version keyed to draft, content/hash, intent,
  jurisdiction and verified owner or isolated guest binding; purchase references
  that exact version, never browser-supplied free text.
- PR-07: separate purchase and subscription entitlement states, effective/expiry
  times, provider identifiers and uniqueness. Never infer access from tier alone.
- PR-09: unique provider event/session identifiers, transactionally update order
  and entitlement plus delivery outbox; dedupe with DB constraints, not memory.
- PR-10: outbox attempts/status/next-attempt time plus idempotent message key;
  hashed expiring single-use guest claims, no unauthenticated email identity merge.

Each feature introduces its own reviewed migration and regressions. These are
contract decisions, not claims those features are implemented in this PR.

Reference: https://www.prisma.io/docs/orm/prisma-migrate/workflows/baselining
Use this repo's pinned Prisma 5.22 CLI syntax; do not copy Prisma 7/8 commands.
