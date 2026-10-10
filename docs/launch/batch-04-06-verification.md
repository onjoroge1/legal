# Launch batch 04–06 verification

Story: document route and user inputs → guarded generation → durable owned/guest version → exact saved preview → reviewed export/checkout reference.

- 52 base catalog and 560 localized route mappings: passed exhaustive resolver fixtures.
- 21 regression tests: passed locally, including migration replay/schema parity and legacy restore preservation, bounded malformed inputs, shared reservation rollback, ownership/guest expiry/content tampering, intent and numeric/date fidelity, source freshness, generation-to-save response and saved-only export.
- Browser fixture test: production build rendered form, submitted mutual intent and fields, navigated to saved preview, preserved preview after reload, stored no document content in browser storage, and displayed a 409 download error without creating a file. No page errors. API responses were intercepted test fixtures, NOT live model/payment/database evidence.
- Production build and static route/auth/disclaimer/claims gates: passed locally with synthetic configuration. Node on this executor is 24; CI is pinned to the repository's Node 22 toolchain.
- Typecheck: passed. Lint remains ratcheted (no relaxed app rules).
- Existing production-server smoke: 68 passed on the first integrated build; final CI rechecks the published commit.
- Actual PostgreSQL concurrent admission tests added to CI alongside migration/drift/backup restore checks. Await published-run evidence before calling these passed on PostgreSQL.

Not performed: production changes, live schema migrations, credential rotation, provider charges, paid Gemini calls, verified email delivery, counsel review, production alias validation. Existing flags stay closed. The MCP file is a scope/implementation plan only; no MCP endpoint or connection is claimed.

Each of PR-04/05/06 targets main. Their branches contain predecessors, so merge in order 04 → 05 → 06. Unlike the previous stack, none merges only into a feature branch. PR-04 also brings already-reviewed #9/#10 changes from their merged parent branches into main. Audit items remain open for their operational/legal acceptance evidence.
