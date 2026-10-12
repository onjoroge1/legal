# Roadmap PR16: reviewed discovery and conversion measurement

Public discovery now uses the same expiring, hash-bound approval list as content rendering and indexing. Document approval must match the exact resolved document, intent and jurisdiction and have generation-scope review. Unknown paths, revoked/expired approvals, changed content and overlapping redirect sources fail closed. The approved collection is currently empty: no legal review or launch availability has been fabricated.

The homepage, footer, navigation, document search, category hubs and guide index show the reviewed collection/status. Private dashboard templates remain explicitly experimental, with existing legal/export gates. An unreviewed document can still be a saved draft; it is not promoted as a supported legal product. Seven exact overlapping intent pages redirect to existing standalone variants. Generation/preview/checkout identities are unchanged.

## Measurement

`ENABLE_FUNNEL_MEASUREMENT` defaults false. When enabled, visitors can explicitly opt in via first-party controls. No analytics cookie or event is created before that action. A 256-bit HttpOnly, SameSite=Lax cookie identifies a browser journey for 30 days. Source is only direct/search/referral; no full referrer, search query, IP, document text, email or provider payload in the event tables. Journeys are pseudonymous, not claimed to be anonymous: signed-in journeys and checkout attribution can link to an account while retained.

Stages count **one browser journey once**: source consent → successful generation saved → checkout session published → verified paid order observed → authorized export file prepared. Some journeys enter midway or finish on another device, so these are observational counts, not a claim that every stage count must be monotonically decreasing. Paid measures gross conversion, not net revenue; download is not proof the browser received the file. Browser return URLs cannot claim payment. Refund accounting remains in the payment ledger.

Paid conversion reconciliation runs with operational monitoring and finds only opted-in, nonexpired journeys missing the paid stage. Failed measurement must not block drafting/export/checkout. Operators read aggregates at `/api/admin/funnel` (database-admin authorization). No public event-ingestion API permits fabricated paid/download events.

Withdrawal deletes this journey and cascades its events, detaching order attribution. Received GPC/DNT suppresses events and removes the associated journey. Account deletion requests remove linked measurement immediately; export omits the private cookie value. Daily `/api/cron/cleanup-measurement` removes expired journeys even when measurement is disabled. Backups remain subject to the privacy-ledger process. Do not enable until privacy disclosure and consent behavior are reviewed in staging.

## Evidence and remaining external work

Tests enumerate catalog, state, city and international route identities (>500 candidates), withheld scope, redirect destinations/loops, capability absence, opt-in and privacy signals. PostgreSQL CI checks concurrent stage dedupe, verified paid reconciliation, all five stages, export and deletion. Production smoke crawls public internal links/anchors and sitemap orphans and checks exact intent redirects.

Search Console setup is **not completed**: no verified property/submission/inspection response was supplied. Owner procedure:
1. Verify the domain property using the actual DNS provider; grant the operating account access.
2. Confirm www/apex routing, production SHA and indexing configuration. Keep previews noindex.
3. Once publication review passes, enable production indexing and submit the canonical sitemap.
4. Record dated evidence for homepage, one approved document, one approved guide, an excluded utility and a withdrawn page using URL Inspection. Confirm canonical selection and coverage, not merely submission.
5. Compare weekly page/query clicks, impressions, CTR and coverage with consented funnel counts. Never join query text to customer identities. Treat missing data as unavailable and distinguish search impressions from visits.

No traffic estimates, ranking improvements or conversion lifts are claimed. See the keyword/page map for evidence and review priorities.
