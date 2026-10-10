# Launch PR-07 — version purchases and provider subscription state

PAY-03, PAY-07. Document ownership is necessary but does not prove payment. PDF and DOCX require either a paid purchase of the exact immutable version or an active owner subscription with an unexpired paid-through period. Paid exports have no preview watermark. The legal review and signed-document immutability gates remain independent.

One-off purchases never assign a global Starter entitlement. Trial access ends at the provider trial end. Cancellation at period end keeps active access through that date. Past-due, unpaid, paused, incomplete, expired, blocked, and canceled states deny access; verified recovery restores it. Legacy tier columns and mere document existence grant nothing. Existing customers need provider reconciliation before flags are enabled; do not infer historical purchases from drafts.

Guest export first verifies the per-draft credential, then that exact version purchase. Paid guest recovery across browsers belongs to PR-10. No email-based account linking is permitted.

Proposed conservative policy for PR-09: a full refund revokes the refunded purchase; a partial refund retains access; an open/lost dispute blocks the affected purchase/subscription; a won dispute restores access only after provider reconciliation. Financial refunds never delete document or signature evidence. Commercial/legal approval of this policy is a launch gate, not implied by this implementation.
