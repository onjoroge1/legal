# Roadmap PR14: publication review and support

This branch also carries roadmap PR12–13 into main. GitHub #20 merged into the PR11 feature branch and #21 into the PR12 feature branch after #19 was merged; neither was on main at the start of this work. Their original commits are preserved in the branch history.

## Delivered

- Legal detail, jurisdiction, intent and article renderers withhold legacy guidance unless a current publication approval exists. Approval binds the exact published payload hash, identified author/reviewer/credentials, jurisdiction, dated sources and test evidence. Document publication also requires the corresponding generation-scope approval. The initial collection is empty; no legal approvals were invented.
- Public review/corrections page; archived noncompete and federal tax examples corrected against the FTC and IRS on October 12, 2026. Remaining archived legal material is not cleared for publication.
- Draft policy labels and a server-enforced block on new checkout/subscription purchases until business identity, contact address and approved refund terms are recorded. Existing fulfillment/recovery/cancellation stay available. Terms are not represented as counsel-approved.
- Durable support tickets and an authenticated, database-authorized admin inbox at `/admin/support`. A visitor submits a bounded message and saves a 256-bit private access code, then reads the staff response on `/contact`. Only a hash is stored; no code in URL, browser storage or analytics. No email delivery claim and no automatic outbound messages.
- Strict request size/schema/origin checks, durable request limits, expiry and response-only admin updates. Tickets expire after 30 days and a daily authenticated cleanup removes them. Signed-in tickets participate in export and erasure, with transaction locking to prevent recreation during account deletion. Guest tickets require the original capability; email is not identity proof.

## Verification and operations

Unit checks cover stale/tampered/duplicate publication approval, commercial gating, wrong support capability, expiry, frozen accounts and non-admin denial. PostgreSQL privacy checks include real support create/read/reply/export/erasure. CI replays all migrations, verifies schema drift and runs the combined suite/build/smoke.

Before enabling support publicly, deploy `20261017000000_support_inbox`, verify the cleanup schedule and assign an operator to monitor `/admin/support`. Test a synthetic visitor request and staff reply in staging. A submitted request is a database receipt, not proof that staff have read it. No response SLA is advertised. Backups must follow the existing privacy ledger/expiry process. Do not take account/payment actions based only on unverified ticket text.

## Open owner/reviewer evidence

Record the actual legal entity/address, approved commercial and privacy policies, reviewer identities/credentials, scope-by-scope legal and journey evidence, and support staffing/staging completion. These are release requirements; a code merge does not supply them. Keep payments and automatic privacy erasure disabled until their separate gates pass.

Official correction sources:
- https://www.ftc.gov/legal-library/browse/rules/noncompete-rule
- https://www.irs.gov/businesses/small-businesses-self-employed/whats-new-estate-and-gift-tax
