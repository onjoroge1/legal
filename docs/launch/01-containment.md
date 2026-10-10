# PR-01: containment release gate

Audit: SEC-01, PAY-01. Code mitigation is not incident closure.

All four emergency flags default off in every environment. Generic document
POST/PATCH/draft writes are temporarily frozen, including draft edits, because
three routes can overwrite signed text or signature metadata. GET reads and
signature-verified Stripe webhook intake remain available. Do not enable
ENABLE_DOCUMENT_MUTATIONS until versioning/signature protections pass PR-05/18;
do not enable the other capabilities before their roadmap acceptance gates.
Webhook correctness remains PR-09; containment does not fix historical fulfillment.

## Production hotfix without promoting all of main

Observed production on 2026-10-10: 803f73eb0615b5b65e371a6664b88b50f1df53dc.
Recheck deployment SHA before proceeding. Main has JWT schema dependencies;
DO NOT promote main as a schema-free hotfix. Use the generated production hotfix
branch/patch, which changes guards and removes tracked sensitive artifacts only.
It must retire /api/checkout/complete with 410, guard every generation/chat,
AI-analyze, checkout, payment-method, subscription-change and signing handler,
and freeze all three generic document mutation routes. Preserve webhook intake.
No migration is part of this hotfix. Build/test that exact branch before promotion.
Set all four ENABLE_* flags false explicitly in every deployment environment.
Verify production aliases against the candidate SHA and repeat the safe smoke
checks. No paid checkout or real signing is needed to verify containment.

## Mandatory operational incident response (unverified)

1. Security owner rotates/revokes exposed database credentials, Stripe API and
   webhook secrets, AI provider and email keys, and NextAuth/session secret.
   Coordinate webhook secret rotation without dropping valid events. Never use
   keys from repository history to perform this work.
2. Confirm old credentials are rejected, invalidate sessions, inspect provider,
   database and hosting access logs, review customer grants from the retired
   endpoint, and reconcile legitimate Stripe purchases before removing access.
3. After rotation, arrange a coordinated repository-history cleanup for exposed
   environment files, databases and backups across branches/tags/forks/clones.
   Ordinary deletion commits do not remove history. Record owner and timestamp,
   never secret values. Changing public default master to reviewed main is a
   separate repository administration gate after the foundation PRs pass.
4. Retain evidence of key rejection, incident review, deployment SHA, flag state,
   read-path checks and webhook signature rejection. SEC-01/PAY-01 stay open
   until production verification and operational response are complete.

Rollback only to another contained release; never restore the vulnerable SHA.
