import { readFileSync } from "node:fs"
import { exit } from "node:process"

const read = (file) => readFileSync(file, "utf8")
const failures = []

const publicClaimFiles = [
  "app/layout.tsx",
  "app/about/page.tsx",
  "app/advertise/page.tsx",
  "app/contact/page.tsx",
  "app/cookies/page.tsx",
  "app/disclaimer/page.tsx",
  "app/help/page.tsx",
  "app/lawyers/page.tsx",
  "app/lawyers/[slug]/page.tsx",
  "app/privacy/page.tsx",
  "app/terms/page.tsx",
  "app/documents/page.tsx",
  "app/documents/[category]/page.tsx",
  "app/documents/[category]/[slug]/page.tsx",
  "app/documents/[category]/[slug]/[intent]/page.tsx",
  "app/documents/[category]/[slug]/generate/page.tsx",
  "app/documents/[category]/[slug]/checkout/page.tsx",
  "app/dashboard/billing/page.tsx",
  "app/dashboard/templates/page.tsx",
  "components/hero-section.tsx",
  "components/stats-section.tsx",
  "components/logo-cloud.tsx",
  "components/testimonials-section.tsx",
  "components/features-section.tsx",
  "components/compliance-banner.tsx",
  "components/how-it-works-section.tsx",
  "components/faq-section.tsx",
  "components/pricing-section.tsx",
  "components/cta-section.tsx",
  "components/footer.tsx",
  "components/seo/organization-schema.tsx",
  "components/seo/sponsored-legal-services.tsx",
  "lib/categories.ts",
  "lib/document-catalog.ts",
  "lib/document-content.ts",
  "lib/document-seo.ts",
  "lib/intent-registry.ts",
  "lib/permissions.ts",
  "lib/state-pages.ts",
  "lib/subscription-management.ts",
  "lib/email-service.ts",
]

const prohibitedClaims = [
  ["unverified SOC 2 claim", /SOC\s*2/i],
  ["unverified AES-256 claim", /AES[\s‑-]*256/i],
  ["unverified 256-bit claim", /256[\s‑-]*bit/i],
  ["unverified bank-level security claim", /bank[\s‑-]*level/i],
  ["unsupported attorney-drafted claim", /attorney[\s‑-]*drafted/i],
  ["unsupported attorney-reviewed claim", /attorney[\s‑-]*reviewed/i],
  ["unsupported lawyer-reviewed claim", /lawyer[\s‑-]*reviewed/i],
  ["guaranteed state-compliance claim", /state[\s‑-]*compliant/i],
  ["guaranteed state-specific compliance claim", /state[\s‑-]*specific\s+compliance/i],
  ["fictional 99.7% metric", /99\.7%/i],
  ["fictional 500K usage metric", /500K\+/i],
  ["fictional 50,000 usage metric", /50,000\+/i],
  ["fictional customer-logo claim", /trusted by leading companies/i],
  ["fictional customer-volume claim", /join thousands/i],
  ["unsupported money-back promise", /money[\s‑-]*back guarantee/i],
  ["unsupported free-trial promise", /start free trial/i],
  ["misleading paid-plan label", /free with subscription/i],
  ["unsupported legal-team claim", /our legal team/i],
  ["unsupported lead-quality claim", /qualified leads/i],
  ["unsupported audience-intent claim", /high[\s‑-]*intent/i],
  ["unsupported universal-encryption claim", /all data (?:is )?encrypted/i],
  ["unsupported audit claim", /independently audited security/i],
]

for (const file of publicClaimFiles) {
  const source = read(file)
  for (const [label, pattern] of prohibitedClaims) {
    if (pattern.test(source)) failures.push(`${file}: ${label}.`)
  }
}

const priceSurfaceFiles = [
  "app/documents/page.tsx",
  "app/documents/[category]/page.tsx",
  "app/documents/[category]/[slug]/page.tsx",
  "app/documents/[category]/[slug]/[intent]/page.tsx",
  "app/documents/[category]/[slug]/generate/page.tsx",
  "app/documents/[category]/[slug]/checkout/page.tsx",
  "app/dashboard/billing/page.tsx",
  "app/dashboard/templates/page.tsx",
  "components/pricing-section.tsx",
  "lib/email-service.ts",
  "lib/permissions.ts",
  "lib/subscription-management.ts",
]

for (const file of priceSurfaceFiles) {
  const source = read(file)
  if (/\$\d+\.99|\$\{[^}]+\}\.99/.test(source)) {
    failures.push(`${file}: appends .99 to a price that Stripe does not charge.`)
  }
}

const catalog = read("lib/document-catalog.ts")
const catalogPrices = [...catalog.matchAll(/^\s{4}price:\s*(\d+),$/gm)].map((match) => Number(match[1]))
const catalogCount = catalogPrices.length
const minPrice = Math.min(...catalogPrices)
const maxPrice = Math.max(...catalogPrices)

if (catalogCount === 0 || !Number.isFinite(minPrice) || !Number.isFinite(maxPrice)) {
  failures.push("Unable to derive document count and price range from the catalog.")
} else {
  if (!read("components/stats-section.tsx").includes(`value: "${catalogCount}"`)) {
    failures.push(`Homepage document count does not match the ${catalogCount}-item catalog.`)
  }

  const expectedRange = `$${minPrice}–$${maxPrice}`
  for (const file of ["components/pricing-section.tsx", "app/dashboard/billing/page.tsx", "app/help/page.tsx"]) {
    if (!read(file).includes(expectedRange)) {
      failures.push(`${file}: expected the catalog price range ${expectedRange}.`)
    }
  }
}

if (!read("app/layout.tsx").includes("<SitewideLegalNotice />")) {
  failures.push("The root layout must render the sitewide legal notice.")
}

if (!read("components/legal/sitewide-legal-notice.tsx").includes("LEGAL_DISCLAIMER_PRIMARY_COPY")) {
  failures.push("The sitewide notice must use the canonical primary disclaimer copy.")
}

if (read("app/contact/page.tsx").includes("<form")) {
  failures.push("The contact page must not restore a non-functional form without a submission handler.")
}

for (const file of ["app/contact/page.tsx", "app/help/page.tsx", "components/faq-section.tsx"]) {
  if (/full refund|refund within \d+/i.test(read(file))) {
    failures.push(`${file}: refund copy conflicts with the controlling Terms.`)
  }
}

if (!read("app/cookies/page.tsx").includes("legallawdocs_disclaimer_acceptance")) {
  failures.push("The Cookie Policy must disclose the disclaimer-acceptance cookie.")
}

if (failures.length > 0) {
  failures.forEach((failure) => console.error(`- ${failure}`))
  exit(1)
}

console.log("Marketing-claims contract check passed.")
