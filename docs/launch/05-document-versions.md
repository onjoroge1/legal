# PR-05 — FLOW-01 / DOC-04

One resolver for base/legacy/state/city/country/intent identity; exhaustive 52 + 560 routing fixtures. Category and conflicting jurisdiction/intent inputs are rejected. Washington DC resolves to DC, not Washington State. Detail-page entry, form workflow, generation/chat and checkout use this resolver.

Additive DocumentDraft/DocumentVersion storage. Explicit Save inputs gives an opaque recoverable draft URL; generation saves an immutable version with SHA-256 before returning a preview. Versions preserve exact input snapshot. No update/delete version endpoint. Optional draftId supports appending versions with identity checks. Ownership is authenticated user ID, or a per-draft HttpOnly SameSite cookie with a seven-day expiry and hashed capability in the database. A bare UUID is never access authority. Different tabs/URLs are isolated. Signed-in users can open their saved links on another device. Guest cross-device/account claiming is PR-10, not inferred from email.

Replaces the four divergent generation/preview/checkout/download clients with one form/preview component. No sensitive document data or identity in shared localStorage/sessionStorage. Existing UI form/questions and disclaimer gate reused; explicit error/loading/retry actions. Save inputs is explicit, not autosave. Downloads accept versionId and format only, never client document text; errors/content types checked before file creation. Dashboard purchases include versionId. Existing documents lacking a version need a deliberate backfill before enabling their new download path.

Checkout references server content/hash/version. Guest checkout is temporarily rejected until PR-08 verified identity; payment flags remain off. Entitlement/watermark/one-off access remains PR-07 and billing correctness PR-08/09. No claim that the full paid journey is launch ready.

Verification: exhaustive resolver fixtures, cross-user/expired-guest/tampering checks, schema replay, typecheck/lint/build. Staging multi-device/provider-backed purchase verification remains open. Rollback leaves additive draft/version tables intact; disable generation/payments before rollback. Do not delete evidence.
