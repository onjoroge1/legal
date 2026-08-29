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
        description:
          "Self-help, AI-assisted document drafting software with state-aware inputs. Not a law firm and not legal advice; attorney review is required before use.",
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
