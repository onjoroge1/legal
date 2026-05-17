/**
 * Route conflict guard — fails the build if any legacy route tree exists.
 *
 * Legacy flat document routes were removed in Sprint 3. Traffic to those
 * paths is handled exclusively by 301 redirects in next.config.mjs.
 * If any of these directories reappear (e.g. accidental re-creation or
 * a bad merge), the build must fail immediately.
 */

import { existsSync } from "fs"
import { resolve } from "path"

const root = resolve(new URL(".", import.meta.url).pathname, "..")

const FORBIDDEN_ROUTES = [
  // Flat dynamic route — conflicts with /documents/[category]/
  "app/documents/[slug]",
  // Hardcoded legacy slugs
  "app/documents/nda",
  "app/documents/llc_operating_agreement",
  "app/documents/employment_contract",
  "app/documents/residential_lease_agreement",
  "app/documents/independent_contractor_agreement",
  "app/documents/partnership_agreement",
  "app/documents/power_of_attorney",
  "app/documents/last_will_testament",
  "app/documents/commercial_lease_agreement",
  "app/documents/service_agreement",
  "app/documents/purchase_agreement",
  "app/documents/non_compete_agreement",
]

let failed = false

for (const route of FORBIDDEN_ROUTES) {
  const fullPath = resolve(root, route)
  if (existsSync(fullPath)) {
    console.error(`\n❌  Forbidden legacy route still exists: ${route}`)
    console.error(`   Delete this directory — 301 redirects in next.config.mjs handle legacy traffic.\n`)
    failed = true
  }
}

if (failed) {
  process.exit(1)
} else {
  console.log("✓  Route conflict check passed — no legacy route trees found.")
}
