# PR-10: durable receipts and guest purchase recovery

Payment fulfillment now queues a durable receipt, separately from payment and export eligibility. The worker sends the exact saved version as an attachment only to an authenticated owner's verified email and only after current legal review and entitlement checks. Guests receive a single-use recovery link, never an unsolicited account or private PDF at an unverified address.

## Delivery lifecycle

| Status | Meaning | Automatic action |
| --- | --- | --- |
| pending / retry | Durable job waiting for its due time | Worker reserves a two-minute lease |
| processing | One fenced worker owns the job | Expired leases can be reclaimed |
| accepted | Resend acknowledged the request | Await signed provider feedback |
| delivered | Provider reports delivery to the recipient mail server | No resend; this does not prove the person read it |
| blocked | Permanent/configuration problem, retry limit, or ambiguous old attempt | Operator investigation |
| failed / bounced / complained / suppressed | Provider feedback | No automatic resend; bounce/complaint/suppression blocks future mail to the hashed recipient |

The encrypted, exact request (including generated PDF bytes and recovery token) is persisted before sending. Every retry uses the same `delivery:<job-id>` idempotency key and body. A provider acceptance followed by a database failure safely retries that request. The application stops after eight attempts or 23 hours from the first send, before Resend's 24-hour idempotency expiry. Provider event IDs are deduplicated; feedback arriving before acceptance is reconciled when the provider ID is saved. Negative feedback wins over late sent/delivered events.

Receipts include the order ID, verified amount/currency, purchase type, refund-terms link and legal disclaimer. Browser purchase status displays payment and email status separately. Read-only MCP payment checks report aggregate queued, failed, accepted and delivered counts without recipient or document data.

## Guest recovery

`/recover-purchase` accepts a token in the URL fragment, removes it from history on load and requires an explicit POST to redeem it. GET requests and email scanners do not consume it. Tokens are random 256-bit values, stored hashed, expire after seven days and redeem atomically once.

A guest can restore seven-day HttpOnly browser access to one exact version, or explicitly sign in/create an account with the receipt email and attach that version. Account claims require both the email link and an authenticated session; matching an email string alone never claims a purchase. Claims transfer the purchase and one version, not the whole draft, other versions, passwords, sessions or Stripe customer. Original guest credentials cannot access an account-claimed version. Refunded/disputed purchases and expired/used links are denied. Exports continue to check legal review and payment entitlement.

New-link requests require the order ID and receipt email. The public response is identical for unknown orders, wrong emails and ineligible/suppressed purchases. Shared request limits, a per-order three-attempt hourly budget and a one-minute send cooldown constrain abuse. New links replace previous unredeemed links for that order. Account-claimed purchases are recovered through normal sign-in.

## Enable only after staging verification

1. Apply migrations with the existing backup/restore procedure. The migration preserves queued fulfillment jobs and backfills unique deduplication keys.
2. Configure a verified Resend sender/domain (SPF, DKIM and DMARC), `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, canonical HTTPS `NEXTAUTH_URL`, and `EMAIL_DELIVERY_ENCRYPTION_KEY` (base64 of 32 cryptographically random bytes). Keep the encryption key separate from the database and in the secret manager.
3. Register `/api/webhooks/resend` and set `RESEND_WEBHOOK_SECRET`. Subscribe to `email.sent`, `email.delivered`, `email.bounced`, `email.complained`, `email.failed` and `email.suppressed`. The endpoint verifies the raw signed body and rejects oversized requests; it remains active when dispatch is disabled.
4. Configure a trusted scheduler to GET `/api/cron/deliver-purchases` with `Authorization: Bearer <CRON_SECRET>` regularly (for example every minute). Each call drains up to five jobs. No scheduler or hosting-plan entitlement is installed by this PR. Stripe intake and recovery requests also request an immediate framework-managed `after()` batch, but the scheduler is required for durable retries and backlog recovery.
5. In staging with authorized test recipients, verify receipts, single-use links, account claims, signed feedback, bounce suppression and scheduler recovery. Confirm payment/export flags and legal review remain independently enforced. Only then set `ENABLE_PURCHASE_DELIVERY=true` in the intended environment. It defaults false.

Disabling dispatch leaves payments and queued jobs intact, keeps feedback intake available and allows already-issued recovery links to work. Watch queue age as well as counts; this PR does not provision external alerts or a scheduler.

## Operator recovery and data handling

Authenticated database administrators can POST `{ "id": "<job UUID>" }` to `/api/admin/delivery/retry`. It only requeues blocked/retry jobs without a provider ID and still inside the original 23-hour window. It preserves the payload and idempotency key. It does not bypass recipient suppression, payment entitlement or review. Accepted/delivered/negative-feedback jobs cannot be blindly resent.

For ambiguous attempts older than 23 hours, reconcile the original idempotency key in Resend before taking action. Do not delete the job or reset its first-send timestamp to force a retry. A customer-requested guest recovery is a separate intentional message. Suppressed recipients require investigation and an approved address-resolution process; there is no public suppression-removal endpoint.

Payload ciphertext is cleared after provider acceptance; blocked/retry payloads retain encrypted document bytes and bearer links for safe reconciliation. Restrict database access and include these records in the application's retention procedure. This PR does not add automatic terminal-job deletion. Drain/reconcile outstanding encrypted jobs before rotating the encryption key, or explicitly migrate their ciphertext under controlled access. Never log provider payloads, full errors, email addresses or tokens. Webhook ledgers contain only event/provider IDs, type and time; suppression uses a normalized recipient hash.

## Verification

Unit/route tests cover encryption tampering and missing keys, the retry window, real Resend SDK signature verification, oversized/tampered webhooks, per-version access, credential-free version responses and migration preservation. The PostgreSQL CI fixture covers competing workers, stable payload/key reuse after lost acceptance, early/stale feedback, suppression, competing token redemption, explicit account claims, lease fencing, expiry/refund denial, and Stripe replay after a guest claim. All provider sends in that fixture are intercepted; no real messages or payments occur.

Sources: [Resend idempotency](https://resend.com/docs/dashboard/emails/idempotency-keys), [webhook verification](https://resend.com/docs/webhooks/verify-webhooks-requests), [event semantics](https://resend.com/docs/webhooks/event-types).
