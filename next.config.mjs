/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    // ── Legacy flat slugs → new category/slug structure (301 permanent) ──────
    const documentRedirects = [
      { from: "nda",                           to: "business/non-disclosure-agreement" },
      { from: "llc_operating_agreement",        to: "business/llc-operating-agreement" },
      { from: "partnership_agreement",          to: "business/partnership-agreement" },
      { from: "service_agreement",             to: "business/service-agreement" },
      { from: "purchase_agreement",            to: "business/purchase-agreement" },
      { from: "employment_contract",           to: "employment/employment-contract" },
      { from: "independent_contractor_agreement", to: "employment/independent-contractor-agreement" },
      { from: "non_compete_agreement",         to: "employment/non-compete-agreement" },
      { from: "residential_lease_agreement",   to: "real-estate/residential-lease-agreement" },
      { from: "commercial_lease_agreement",    to: "real-estate/commercial-lease-agreement" },
      { from: "power_of_attorney",             to: "estate-planning/power-of-attorney" },
      { from: "last_will_testament",           to: "estate-planning/last-will-and-testament" },
      // Pre-Sprint-1 one-off redirect
      { from: "non_disclosure_agreement",      to: "business/non-disclosure-agreement" },
    ]

    // For each document, redirect the detail page AND all its sub-pages
    const subpages = ["generate", "preview", "checkout", "download"]

    const generated = documentRedirects.flatMap(({ from, to }) => [
      // Detail page
      {
        source: `/documents/${from}`,
        destination: `/documents/${to}`,
        permanent: true,
      },
      // Sub-pages
      ...subpages.map((sub) => ({
        source: `/documents/${from}/${sub}`,
        destination: `/documents/${to}/${sub}`,
        permanent: true,
      })),
    ])

    // ── Canonical category moves (301 permanent) ─────────────────────────────
    const categoryMoves = [
      // vehicle-bill-of-sale: personal → financial (SEO canonical move)
      {
        source: "/documents/personal/vehicle-bill-of-sale",
        destination: "/documents/financial/vehicle-bill-of-sale",
        permanent: true,
      },
      {
        source: "/documents/personal/vehicle-bill-of-sale/:sub*",
        destination: "/documents/financial/vehicle-bill-of-sale/:sub*",
        permanent: true,
      },
    ]

    return [...generated, ...categoryMoves]
  },
}

export default nextConfig
