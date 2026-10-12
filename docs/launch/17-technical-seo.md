# Roadmap PR15: technical SEO

Canonical origin is `https://www.legallawdocs.com`, shared by metadata, sitemap, breadcrumbs, structured data, share cards and document URLs. Apex requests permanently redirect with path/query preserved. Production alias and NEXTAUTH_URL must be aligned before deploying the redirect; verify both domains and HTTPS at the hosting layer.

Search indexing requires both `VERCEL_ENV=production` and `ENABLE_SEARCH_INDEXING=true`. Default and preview builds emit noindex headers; no preview sitemap entries. Leave the flag off until the public collection and owner review gates pass. Auth/admin/API/document utility routes have explicit noindex headers independent of robots.txt. Robots permits rendering assets and public HTML so crawlers can observe those directives. This does not weaken session or owner authorization.

The sitemap includes core informational pages and only current publication approvals. Login/signup, workflow utilities, lawyer directory and unapproved legal pages are excluded. Reviewed entries use their actual content modification date; new public content edited in this release records October 12, 2026. Unknown historical dates are omitted rather than invented or reset on deploy.

Removed automatic heading-to-FAQ markup, unsupported software offers, invented editorial authorship and speculative SearchAction. Article schema is emitted only from an approved article payload; visible reviewer/source details accompany it. JSON-LD escapes HTML delimiters. A local 1200×630 PNG share card is used consistently.

Verification: canonical/preview/robots/sitemap/redirect unit contracts plus `scripts/check-seo-rendered.mjs` in the production smoke runner. The rendered check follows every emitted sitemap entry, verifies canonical 200 pages, utility noindex, a real PNG and apex redirect. Run a separate production-like local build with indexing enabled to exercise the intended public sitemap; default CI additionally verifies the noindex release mode.

Pending deployment evidence: apex/www aliases, HTTPS, actual preview noindex headers, production canonical HTML, Search Console ownership/submission and URL Inspection. A READY preview is not proof of search-engine discovery or legal approval.

References checked October 12, 2026:
- https://developers.google.com/search/docs/crawling-indexing/block-indexing
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
