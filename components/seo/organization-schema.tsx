/**
 * Injects Organization + WebSite JSON-LD — render once in the root layout.
 */
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://legallawdocs.com/#organization",
        name: "LegalLawDocs.com",
        url: "https://legallawdocs.com",
        logo: {
          "@type": "ImageObject",
          url: "https://legallawdocs.com/images/logo.png",
          width: 200,
          height: 60,
        },
        description:
          "AI-powered legal document generator. Create state-compliant NDAs, leases, contracts, and more in minutes.",
        sameAs: [
          "https://twitter.com/legallawdocs",
          "https://linkedin.com/company/legallawdocs",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://legallawdocs.com/#website",
        url: "https://legallawdocs.com",
        name: "LegalLawDocs.com",
        publisher: { "@id": "https://legallawdocs.com/#organization" },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://legallawdocs.com/documents?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
