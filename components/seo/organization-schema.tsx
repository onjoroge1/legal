import { canonicalUrl, jsonLd } from "@/lib/site-metadata"
export function OrganizationSchema() {
 // Product identity only. Legal entity and professional credentials need owner evidence.
 const schema = { "@context": "https://schema.org", "@type": "WebSite", name: "LegalLawDocs", url: canonicalUrl("/"), description: "Self-help document drafting software. Not a law firm or legal advice." }
 return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
}
