import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  CheckCircle2,
  Clock,
  DollarSign,
  MapPin,
  ArrowRight,
  Star,
  Sparkles,
  Lock,
  Zap,
  Users,
  Download,
  Crown,
  Globe,
  ExternalLink,
} from "lucide-react"
import { documentCatalog, getDocumentBySlug, getDocumentsByCategory, getRelatedDocuments, getDocumentPath, getVariantDocuments } from "@/lib/document-catalog"
import { getIntentsForDocument } from "@/lib/intent-registry"
import { getCategoryMeta } from "@/lib/categories"
import { getSubscriptionFromSession } from "@/lib/subscription"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumb } from "@/components/seo/breadcrumb"
import { LegalDisclaimer } from "@/components/seo/legal-disclaimer"
import { SponsoredLegalServicesBlock } from "@/components/seo/sponsored-legal-services"
import type { Metadata } from "next"

import { getDocumentContent } from "@/lib/document-content"
import { getDocumentDetailContent } from "@/lib/document-detail-content"
import { getDocumentSeo, getCanonicalUrlByParts } from "@/lib/document-seo"
import {
  parseStatePageSlug,
  getStatePageData,
  getStatePageStaticParams,
  getSiblingStatePages,
} from "@/lib/state-pages"
import {
  parseInternationalPageSlug,
  getInternationalPageData,
  getInternationalPageStaticParams,
  getSiblingCountryPages,
} from "@/lib/international-pages"
import {
  parseCityPageSlug,
  getCityPageData,
  getCityPageStaticParams,
  getSiblingCityPages,
} from "@/lib/city-pages"

const statesCovered = [
  "California", "New York", "Texas", "Florida", "Illinois",
  "Pennsylvania", "Ohio", "Georgia", "North Carolina", "Michigan",
  "New Jersey", "Virginia", "Washington", "Arizona", "Massachusetts",
  "All 50 States",
]

// Customer reviews removed for YMYL/E-E-A-T compliance — unverifiable
// testimonials are a Google quality-rater red flag for legal sites.
// When real, named, consenting customer quotes (with verifiable LinkedIn
// or case-study sources) are available, they can be reinstated here.

interface PageProps {
  params: Promise<{ category: string; slug: string }>
}

export async function generateStaticParams() {
  const docParams = documentCatalog.map((doc) => ({
    category: doc.category,
    slug: doc.slug,
  }))
  const stateParams = getStatePageStaticParams()
  const intlParams = getInternationalPageStaticParams()
  const cityParams = getCityPageStaticParams()
  return [...docParams, ...stateParams, ...intlParams, ...cityParams]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params
  const doc = getDocumentBySlug(slug)

  if (!doc || doc.category !== category) {
    // Check if this is a state-specific page
    const parsed = parseStatePageSlug(slug)
    if (parsed && parsed.doc.category === category) {
      const stateData = getStatePageData(parsed.stateSlug, parsed.docSlug)
      if (stateData) {
        const canonical = `https://legallawdocs.com/documents/${category}/${slug}`
        return {
          title: stateData.seoTitle,
          description: stateData.metaDescription,
          alternates: { canonical },
          authors: [{ name: "LegalLawDocs.com" }],
          robots: {
            index: true,
            follow: true,
            googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
          },
          openGraph: {
            type: "website",
            url: canonical,
            title: stateData.seoTitle,
            description: stateData.metaDescription,
            siteName: "LegalLawDocs.com",
          },
        }
      }
    }
    // Check if this is an international page
    const parsedIntl = parseInternationalPageSlug(slug)
    if (parsedIntl && parsedIntl.doc.category === category) {
      const intlData = getInternationalPageData(parsedIntl.countrySlug, parsedIntl.docSlug)
      if (intlData) {
        const canonical = `https://legallawdocs.com/documents/${category}/${slug}`
        return {
          title: intlData.seoTitle,
          description: intlData.metaDescription,
          alternates: { canonical },
          authors: [{ name: "LegalLawDocs.com" }],
          robots: {
            index: true,
            follow: true,
            googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
          },
          openGraph: {
            type: "website",
            url: canonical,
            title: intlData.seoTitle,
            description: intlData.metaDescription,
            siteName: "LegalLawDocs.com",
          },
        }
      }
    }
    // Check if this is a city-specific page
    const parsedCity = parseCityPageSlug(slug)
    if (parsedCity && category === "real-estate") {
      const cityData = getCityPageData(parsedCity.city.slug)
      if (cityData) {
        const canonical = `https://legallawdocs.com/documents/${category}/${slug}`
        return {
          title: cityData.seoTitle,
          description: cityData.metaDescription,
          alternates: { canonical },
          authors: [{ name: "LegalLawDocs.com" }],
          robots: {
            index: true,
            follow: true,
            googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
          },
          openGraph: {
            type: "website",
            url: canonical,
            title: cityData.seoTitle,
            description: cityData.metaDescription,
            siteName: "LegalLawDocs.com",
          },
        }
      }
    }
    return {}
  }

  const seo = getDocumentSeo(slug)
  const canonical = getCanonicalUrlByParts(category, slug)
  const title = seo?.title || `${doc.title} Template — Create Online | LegalLawDocs.com`
  const description = seo?.description || `Create a ${doc.title} online with state‑specific compliance, instant PDF & DOCX download.`

  return {
    title,
    description,
    keywords: seo?.keywords,
    alternates: { canonical },
    authors: [{ name: "LegalLawDocs.com" }],
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    openGraph: {
      type: "website",
      url: canonical,
      title: seo?.ogTitle || title,
      description: seo?.ogDescription || description,
      siteName: "LegalLawDocs.com",
      images: [{ url: seo?.ogImage || "https://legallawdocs.com/images/hero-legal.jpg", width: 1200, height: 630, alt: seo?.ogImageAlt || `${doc.title} - LegalLawDocs.com` }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.ogTitle || title,
      description: seo?.ogDescription || description,
      images: [seo?.ogImage || "https://legallawdocs.com/images/hero-legal.jpg"],
    },
  }
}

export default async function DocumentDetailPage({ params }: PageProps) {
  const { category, slug } = await params
  const doc = getDocumentBySlug(slug)

  // ── State page branch ─────────────────────────────────────────────────────
  if (!doc || doc.category !== category) {
    const parsed = parseStatePageSlug(slug)

    // ── City page branch ──────────────────────────────────────────────────
    if (!parsed || parsed.doc.category !== category) {
      const parsedCity = parseCityPageSlug(slug)
      if (parsedCity && category === "real-estate") {
        const cityData = getCityPageData(parsedCity.city.slug)
        if (!cityData) notFound()

        const { city, notes, pageTitle } = cityData
        const generateUrl = `/documents/${category}/${slug}/generate`
        const parentDocUrl = `/documents/real-estate/residential-lease-agreement`
        const siblings = getSiblingCityPages(city.slug)

        const cityFaqSchema = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: notes.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }

        return (
          <div className="min-h-screen">
            <Header />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(cityFaqSchema) }} />

            {/* Breadcrumb */}
            <div className="border-b border-border/30 bg-secondary/20">
              <div className="mx-auto max-w-7xl px-4 py-3 lg:px-8">
                <Breadcrumb
                  items={[
                    { label: "Documents", href: "/documents" },
                    { label: "Real Estate", href: "/documents/real-estate" },
                    { label: "Residential Lease Agreement", href: parentDocUrl },
                    { label: `${city.name} Form` },
                  ]}
                />
              </div>
            </div>

            <main>
              {/* Hero */}
              <section className="relative overflow-hidden border-b border-border/40 py-16 lg:py-20">
                <div className="pointer-events-none absolute inset-0 grid-pattern animate-grid-fade" />
                <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
                <div className="mx-auto max-w-7xl px-4 lg:px-8">
                  <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    <div>
                      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{city.name}, {city.state}</span>
                      </div>
                      <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                        {pageTitle}
                      </h1>
                      <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                        Generate a residential lease agreement that complies with {city.name}&apos;s local ordinances — including rent control rules, just-cause eviction requirements, and mandatory disclosures that go beyond {city.state} state law.
                      </p>
                      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Button size="lg" className="gap-2" asChild>
                          <Link href={generateUrl}>
                            <Sparkles className="h-4 w-4" />
                            Generate {city.name} Lease
                          </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                          <Link href={parentDocUrl}>All Lease Agreement options</Link>
                        </Button>
                      </div>
                      <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" />{city.name} ordinance compliant</div>
                        <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" />{city.state} state law included</div>
                        <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" />Instant PDF & DOCX</div>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-border/50 bg-card/60 p-8">
                      <div className="mb-2 text-sm font-medium text-muted-foreground uppercase tracking-widest">City-Specific Document</div>
                      <h2 className="font-serif text-xl font-bold text-foreground">{pageTitle}</h2>
                      <p className="mt-1 text-xs text-muted-foreground">{city.name}, {city.state}</p>
                      <div className="mt-4 space-y-2">
                        {["Local ordinance compliant", `${city.state} state law included`, "Customized to your situation", "Instant PDF & DOCX download"].map((item) => (
                          <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                            {item}
                          </div>
                        ))}
                      </div>
                      <Button asChild className="mt-6 w-full" size="lg">
                        <Link href={generateUrl}>Generate {city.name} Lease <ArrowRight className="ml-2 h-4 w-4" /></Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Local Ordinance Requirements */}
              <section className="py-16 lg:py-20">
                <div className="mx-auto max-w-5xl px-4 lg:px-8">
                  <div className="mb-10">
                    <p className="text-sm font-semibold uppercase tracking-widest text-primary">Local Ordinances</p>
                    <h2 className="mt-2 font-serif text-3xl font-bold text-foreground">{city.name} Lease Requirements</h2>
                    <p className="mt-3 text-muted-foreground">What {city.name}&apos;s local ordinances require that {city.state} state law does not.</p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {notes.requirements.map((req, i) => (
                      <div key={i} className="flex gap-3 rounded-xl border border-border/50 bg-card/60 p-4">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <p className="text-sm text-secondary-foreground">{req}</p>
                      </div>
                    ))}
                  </div>
                  {notes.restrictions.length > 0 && (
                    <div className="mt-10">
                      <h3 className="font-semibold text-foreground mb-4">Restrictions & Limits</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        {notes.restrictions.map((r, i) => (
                          <div key={i} className="flex gap-3 rounded-xl border border-amber-500/20 bg-amber-50/50 dark:bg-amber-950/20 p-4">
                            <Shield className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
                            <p className="text-sm text-secondary-foreground">{r}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {notes.noticeRequirements && (
                    <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-5">
                      <p className="text-sm font-semibold text-primary mb-1">Notice Requirements</p>
                      <p className="text-sm text-secondary-foreground">{notes.noticeRequirements}</p>
                    </div>
                  )}
                </div>
              </section>

              {/* FAQ */}
              <section className="border-t border-border/40 bg-secondary/20 py-16 lg:py-20">
                <div className="mx-auto max-w-3xl px-4 lg:px-8">
                  <div className="mb-10">
                    <p className="text-sm font-semibold uppercase tracking-widest text-primary">FAQ</p>
                    <h2 className="mt-2 font-serif text-3xl font-bold text-foreground">{city.name} Lease FAQ</h2>
                    <p className="mt-3 text-muted-foreground">Common questions about renting in {city.name}.</p>
                  </div>
                  <div className="space-y-6">
                    {notes.faq.map((item, i) => (
                      <div key={i} className="rounded-xl border border-border/50 bg-card/60 p-6">
                        <h3 className="font-semibold text-foreground">{item.question}</h3>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* CTA */}
              <section className="py-16">
                <div className="mx-auto max-w-3xl px-4 lg:px-8 text-center">
                  <h2 className="font-serif text-3xl font-bold text-foreground">Create Your {city.name} Lease Agreement</h2>
                  <p className="mt-4 text-muted-foreground">Our AI builds a lease that incorporates {city.name}&apos;s local ordinances automatically — so you don&apos;t have to research them yourself.</p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Button asChild size="lg">
                      <Link href={generateUrl}>Generate {city.name} Lease <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <Link href={parentDocUrl}>All Lease Agreement options</Link>
                    </Button>
                  </div>
                </div>
              </section>

              {/* Sibling city pages */}
              {siblings.length > 0 && (
                <section className="border-t border-border/40 py-16">
                  <div className="mx-auto max-w-5xl px-4 lg:px-8">
                    <h2 className="font-serif text-2xl font-bold text-foreground">Other {city.state} Cities</h2>
                    <p className="mt-2 text-sm text-muted-foreground">Local ordinances vary by city. Find the right lease for your city.</p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
                      {siblings.map((sibling) => (
                        <Link
                          key={sibling.slug}
                          href={`/documents/real-estate/${sibling.slug}-residential-lease-agreement`}
                          className="flex items-center gap-2 rounded-xl border border-border/50 bg-card/60 px-4 py-3 text-sm font-medium text-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                        >
                          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                          {sibling.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              <LegalDisclaimer />
            </main>
            <Footer />
          </div>
        )
      }
    }

    // ── International page branch ─────────────────────────────────────────
    if (!parsed || parsed.doc.category !== category) {
      const parsedIntl = parseInternationalPageSlug(slug)
      if (!parsedIntl || parsedIntl.doc.category !== category) {
        notFound()
      }

      const intlData = getInternationalPageData(parsedIntl.countrySlug, parsedIntl.docSlug)
      if (!intlData) notFound()

      const siblings = getSiblingCountryPages(parsedIntl.docSlug, parsedIntl.countrySlug)
      const { country, doc: intlDoc, pageTitle, localName, alternateNames, notes } = intlData
      const generateUrl = `/documents/${category}/${slug}/generate`
      const parentDocUrl = `/documents/${intlDoc.category}/${intlDoc.slug}`
      // Alias terms that differ from the US catalog name — shown as "Also known as" chip
      const aliasTerms = [intlDoc.title, ...alternateNames].filter(
        (t) => t.toLowerCase() !== localName.toLowerCase()
      )

      const intlFaqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: notes.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }

      return (
        <div className="min-h-screen">
          <Header />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(intlFaqSchema) }}
          />

          {/* Breadcrumb */}
          <div className="border-b border-border/30 bg-secondary/20">
            <div className="mx-auto max-w-7xl px-4 py-3 lg:px-8">
              <Breadcrumb
                items={[
                  { label: "Documents", href: "/documents" },
                  { label: intlDoc.category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()), href: `/documents/${intlDoc.category}` },
                  { label: intlDoc.title, href: parentDocUrl },
                  { label: `${country.name} Form` },
                ]}
              />
            </div>
          </div>

          <main>
            {/* Hero */}
            <section className="relative overflow-hidden border-b border-border/40 py-16 lg:py-20">
              <div className="pointer-events-none absolute inset-0 grid-pattern animate-grid-fade" />
              <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
              <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                  <div>
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
                      <Globe className="h-3.5 w-3.5" />
                      <span>{country.flag} {country.name} Form</span>
                    </div>
                    <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                      {pageTitle}
                    </h1>
                    {/* "Also known as" chip — shows US/alternate names so searchers recognize the doc */}
                    {aliasTerms.length > 0 && (
                      <p className="mt-3 text-sm text-muted-foreground">
                        Also known as:{" "}
                        <span className="font-medium text-foreground">{aliasTerms.join(" · ")}</span>
                      </p>
                    )}
                    <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
                      Generate a {localName.toLowerCase()} tailored to {country.name} law. Our AI incorporates {country.name}-specific statutory requirements, disclosure obligations, and legal standards into every clause.
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <Button asChild size="lg">
                        <Link href={generateUrl}>
                          Generate {country.flag} {localName}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="lg" asChild>
                        <Link href={parentDocUrl}>View all {intlDoc.title} options</Link>
                      </Button>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" />{country.name} law compliant</div>
                      <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" />Instant PDF & DOCX</div>
                      <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" />{country.legalSystem}</div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border/50 bg-card/60 p-8">
                    <div className="mb-2 text-sm font-medium text-muted-foreground uppercase tracking-widest">{country.flag} {country.name} Document</div>
                    <h2 className="font-serif text-xl font-bold text-foreground">{localName}</h2>
                    {aliasTerms.length > 0 && (
                      <p className="mt-1 text-xs text-muted-foreground">Also called: {aliasTerms.slice(0, 2).join(", ")}</p>
                    )}
                    <div className="mt-4 space-y-2">
                      {[
                        `Compliant with ${country.name} law`,
                        `${country.legalSystem}`,
                        "Customised to your situation",
                        "Instant PDF & DOCX download",
                      ].map((item) => (
                        <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                          {item}
                        </div>
                      ))}
                    </div>
                    <Button asChild className="mt-6 w-full" size="lg">
                      <Link href={generateUrl}>
                        Generate {localName}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Legal Requirements */}
            <section className="py-16 lg:py-20">
              <div className="mx-auto max-w-5xl px-4 lg:px-8">
                <div className="mb-10">
                  <p className="text-sm font-semibold uppercase tracking-widest text-primary">Legal Requirements</p>
                  <h2 className="mt-2 font-serif text-3xl font-bold text-foreground">
                    {country.name} Legal Requirements
                  </h2>
                  <p className="mt-3 text-muted-foreground">
                    Key {country.name} statutes and obligations that apply to your {localName.toLowerCase()}.
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {notes.requirements.map((req, i) => (
                    <div key={i} className="flex gap-3 rounded-xl border border-border/50 bg-card/60 p-4">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <p className="text-sm text-secondary-foreground">{req}</p>
                    </div>
                  ))}
                </div>

                {notes.restrictions.length > 0 && (
                  <div className="mt-10">
                    <h3 className="font-semibold text-foreground mb-4">Restrictions & Key Considerations</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      {notes.restrictions.map((r, i) => (
                        <div key={i} className="flex gap-3 rounded-xl border border-amber-500/20 bg-amber-50/50 dark:bg-amber-950/20 p-4">
                          <Shield className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
                          <p className="text-sm text-secondary-foreground">{r}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {notes.noticeRequirements && (
                  <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-5">
                    <p className="text-sm font-semibold text-primary mb-1">Notice Requirements</p>
                    <p className="text-sm text-secondary-foreground">{notes.noticeRequirements}</p>
                  </div>
                )}
              </div>
            </section>

            {/* FAQ */}
            <section className="border-t border-border/40 bg-secondary/20 py-16 lg:py-20">
              <div className="mx-auto max-w-3xl px-4 lg:px-8">
                <div className="mb-10">
                  <p className="text-sm font-semibold uppercase tracking-widest text-primary">FAQ</p>
                  <h2 className="mt-2 font-serif text-3xl font-bold text-foreground">
                    {country.name} {localName} FAQ
                  </h2>
                  <p className="mt-3 text-muted-foreground">
                    Common questions about the {localName.toLowerCase()} under {country.name} law.
                  </p>
                </div>
                <div className="space-y-6">
                  {notes.faq.map((item, i) => (
                    <div key={i} className="rounded-xl border border-border/50 bg-card/60 p-6">
                      <h3 className="font-semibold text-foreground">{item.question}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="py-16">
              <div className="mx-auto max-w-3xl px-4 lg:px-8 text-center">
                <h2 className="font-serif text-3xl font-bold text-foreground">
                  Ready to Create Your {country.name} {localName}?
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Our AI generates a {country.name}-compliant {localName.toLowerCase()} in minutes — incorporating the statutory requirements above into every clause.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Button asChild size="lg">
                    <Link href={generateUrl}>
                      Generate {country.flag} {localName}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href={parentDocUrl}>View all {intlDoc.title} options</Link>
                  </Button>
                </div>
              </div>
            </section>

            {/* Sibling country pages */}
            {siblings.length > 0 && (
              <section className="border-t border-border/40 py-16">
                <div className="mx-auto max-w-5xl px-4 lg:px-8">
                  <h2 className="font-serif text-2xl font-bold text-foreground">
                    {intlDoc.title} by Country
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Laws vary significantly by country. Find the right form for your jurisdiction.
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
                    {siblings.map((sibling) => (
                      <Link
                        key={sibling.countrySlug}
                        href={sibling.url}
                        className="flex items-center gap-2 rounded-xl border border-border/50 bg-card/60 px-4 py-3 text-sm font-medium text-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                      >
                        <span>{sibling.flag}</span>
                        {sibling.countryName}
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            )}

            <LegalDisclaimer />
          </main>

          <Footer />
        </div>
      )
    }

    const stateData = getStatePageData(parsed.stateSlug, parsed.docSlug)
    if (!stateData) notFound()

    const siblings = getSiblingStatePages(parsed.docSlug, parsed.stateSlug)
    const { state, doc: stateDoc, pageTitle, notes, statutes } = stateData
    const generateUrl = `/documents/${category}/${slug}/generate`
    const parentDocUrl = `/documents/${stateDoc.category}/${stateDoc.slug}`

    const stateFaqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: notes.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    }

    return (
      <div className="min-h-screen">
        <Header />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(stateFaqSchema) }}
        />

        {/* Breadcrumb */}
        <div className="border-b border-border/30 bg-secondary/20">
          <div className="mx-auto max-w-7xl px-4 py-3 lg:px-8">
            <Breadcrumb
              items={[
                { label: "Documents", href: "/documents" },
                { label: stateDoc.category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()), href: `/documents/${stateDoc.category}` },
                { label: stateDoc.title, href: parentDocUrl },
                { label: `${state.name} Form` },
              ]}
            />
          </div>
        </div>

        <main>
          {/* Hero */}
          <section className="relative overflow-hidden border-b border-border/40 py-16 lg:py-20">
            <div className="pointer-events-none absolute inset-0 grid-pattern animate-grid-fade" />
            <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                <div>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{state.name} State Form</span>
                  </div>
                  <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                    {pageTitle}
                  </h1>
                  <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                    Generate a {stateDoc.title.toLowerCase()} tailored to {state.name} law. Our AI incorporates {state.abbr}-specific statutory requirements, disclosure obligations, and legal standards into every document.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button size="lg" className="gap-2" asChild>
                      <Link href={generateUrl}>
                        <Sparkles className="h-4 w-4" />
                        Generate {state.abbr} {stateDoc.title}
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link href={parentDocUrl}>View all {stateDoc.title} types</Link>
                    </Button>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" />{state.name} law compliant</div>
                    <div className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary" />Ready in minutes</div>
                    <div className="flex items-center gap-1.5"><Download className="h-4 w-4 text-primary" />PDF & DOCX</div>
                  </div>
                </div>

                {/* Price card */}
                <div className="relative lg:pl-8">
                  <div className="rounded-2xl border border-border/60 bg-card/80 p-8 shadow-xl backdrop-blur-sm">
                    <div className="text-center">
                      <div className="mb-2 text-sm font-medium text-muted-foreground uppercase tracking-widest">State-Specific Document</div>
                      <div className="text-5xl font-bold text-foreground">$7<span className="text-2xl text-muted-foreground">.99</span></div>
                      <p className="mt-2 text-sm text-muted-foreground">One-time · instant download</p>
                    </div>
                    <ul className="mt-6 space-y-3">
                      {[
                        `${state.name} statutory requirements`,
                        "AI-powered Q&A generation",
                        "Instant PDF & DOCX",
                        "Attorney-reviewed framework",
                        "30-day re-download access",
                      ].map((feature) => (
                        <li key={feature} className="flex items-center gap-2.5 text-sm">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="mt-6 w-full gap-2" size="lg" asChild>
                      <Link href={generateUrl}>
                        <Zap className="h-4 w-4" />
                        Start Now
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* State Law Requirements */}
          <section className="border-b border-border/40 bg-secondary/20 py-16">
            <div className="mx-auto max-w-5xl px-4 lg:px-8">
              <h2 className="font-serif text-3xl font-bold text-foreground">
                {state.name} Legal Requirements
              </h2>
              <p className="mt-3 text-muted-foreground">
                Key {state.abbr} statutes and obligations that apply to your {stateDoc.title.toLowerCase()}.
              </p>

              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                {/* Requirements */}
                <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Requirements</h3>
                  </div>
                  <ul className="space-y-3">
                    {notes.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Restrictions */}
                <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="h-5 w-5 text-destructive" />
                    <h3 className="font-semibold text-foreground">Restrictions & Limits</h3>
                  </div>
                  <ul className="space-y-3">
                    {notes.restrictions.map((restriction, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                        {restriction}
                      </li>
                    ))}
                  </ul>
                  {notes.noticeRequirements && (
                    <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3">
                      <p className="text-sm font-medium text-amber-600 dark:text-amber-400">Notice Requirements</p>
                      <p className="mt-1 text-sm text-muted-foreground">{notes.noticeRequirements}</p>
                    </div>
                  )}
                </div>

                {/* Official Statute References */}
                <div className="rounded-2xl border border-border/40 bg-muted/30 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <ExternalLink className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Official Statute References</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    Primary {state.name} statutes governing this document type.
                  </p>
                  <ul className="space-y-2">
                    {statutes.map((s, i) => (
                      <li key={i}>
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-2 text-sm text-primary hover:underline"
                        >
                          <ExternalLink className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="border-b border-border/40 py-16">
            <div className="mx-auto max-w-3xl px-4 lg:px-8">
              <h2 className="font-serif text-3xl font-bold text-foreground">
                {state.name} {stateDoc.title} FAQ
              </h2>
              <p className="mt-3 text-muted-foreground">
                Common questions about {stateDoc.title.toLowerCase()}s under {state.name} law.
              </p>
              <div className="mt-8 space-y-4">
                {notes.faq.map((item, i) => (
                  <details key={i} className="group rounded-xl border border-border/60 bg-card/60 p-5 open:border-primary/30">
                    <summary className="flex cursor-pointer items-start justify-between gap-4 font-medium text-foreground list-none">
                      <span>{item.question}</span>
                      <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90" />
                    </summary>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* Generate CTA */}
          <section className="border-b border-border/40 bg-primary/5 py-16">
            <div className="mx-auto max-w-2xl px-4 text-center lg:px-8">
              <h2 className="font-serif text-3xl font-bold text-foreground">
                Ready to Create Your {state.name} {stateDoc.title}?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Our AI generates a {state.abbr}-compliant {stateDoc.title.toLowerCase()} in minutes — incorporating the statutory requirements above into every clause.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button size="lg" className="gap-2" asChild>
                  <Link href={generateUrl}>
                    <Sparkles className="h-4 w-4" />
                    Generate {state.abbr} {stateDoc.title}
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href={parentDocUrl}>
                    View all {stateDoc.title} options
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Sibling state pages */}
          {siblings.length > 0 && (
            <section className="py-16">
              <div className="mx-auto max-w-5xl px-4 lg:px-8">
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  {stateDoc.title} by State
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Laws vary significantly by state. Find the right form for your location.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {siblings.map((sibling) => (
                    <Link
                      key={sibling.stateSlug}
                      href={sibling.url}
                      className="flex items-center gap-2 rounded-xl border border-border/50 bg-card/60 px-4 py-3 text-sm font-medium text-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                    >
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                      {sibling.stateName}
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          <LegalDisclaimer />
        </main>

        <Footer />
      </div>
    )
  }

  // ── Standard document page ────────────────────────────────────────────────
  const subscription = await getSubscriptionFromSession()
  const hasActiveSubscription = subscription?.isActive ?? false

  const docContent = getDocumentContent(doc.legacySlug)
  const detailContent = getDocumentDetailContent(doc.legacySlug)
  const categoryMeta = getCategoryMeta(doc.category)

  const Icon = doc.icon
  const isAccent = doc.color === "accent"
  const generatePath = `/documents/${category}/${slug}/generate`

  const faqSchema = detailContent
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: detailContent.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null

  const canonicalUrl = `https://legallawdocs.com/documents/${category}/${slug}`

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${doc.title} Generator`,
    url: canonicalUrl,
    applicationCategory: "LegalApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: `${doc.price}.99`,
      priceCurrency: "USD",
    },
    description: doc.longDescription,
    provider: {
      "@type": "Organization",
      name: "LegalLawDocs.com",
      url: "https://legallawdocs.com",
    },
  }

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${doc.title} Generator`,
    applicationCategory: "LegalApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    operatingSystem: "Web",
    // aggregateRating removed for YMYL compliance — was based on fictional
    // reviews. Reinstate only when real, verifiable customer ratings exist.
  }

  // Prefer cross-category related docs from catalog field; fall back to same-category
  const relatedDocs = doc.relatedDocuments.length > 0
    ? getRelatedDocuments(doc.relatedDocuments).slice(0, 3)
    : getDocumentsByCategory(doc.category).filter((d) => d.slug !== slug).slice(0, 3)

  // Variant links: standalone intent catalog entries that are children of this doc
  const variantDocs = getVariantDocuments(slug)

  // Subroute intent pages: registry intents with indexable subroute tier
  const subrouteIntents = getIntentsForDocument(doc.legacySlug).filter(
    (i) => i.tier === "subroute" && i.indexable
  )

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <Header />

      <main>
        {/* WebApplication schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />

        {/* FAQPage schema */}
        {faqSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
        )}

        {/* Breadcrumb */}
        <div className="border-b border-border/30 bg-secondary/20">
          <div className="mx-auto max-w-7xl px-4 py-3 lg:px-8">
            <Breadcrumb
              items={[
                { label: "Documents", href: "/documents" },
                { label: categoryMeta?.label || category, href: `/documents/${category}` },
                { label: doc.title },
              ]}
            />
          </div>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border/40 py-16 lg:py-24">
          <div className="pointer-events-none absolute inset-0 grid-pattern animate-grid-fade" />
          <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
          <div className="pointer-events-none absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
              <div className="flex-1">
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <Badge className="gap-1 border-primary/30 bg-primary/10 text-primary" variant="outline">
                    <Sparkles className="h-3 w-3" />AI-Powered
                  </Badge>
                  {/* Upfront AI disclosure — YMYL requirement: users must know they're getting
                      AI-assembled output before they engage with the funnel, not after checkout. */}
                  <Badge className="gap-1 border-amber-500/40 bg-amber-500/10 text-amber-700" variant="outline">
                    <Sparkles className="h-3 w-3" />AI-Drafted
                  </Badge>
                  <Badge className="gap-1 border-accent/30 bg-accent/10 text-accent" variant="outline">
                    <Shield className="h-3 w-3" />State-Aware Template
                  </Badge>
                  {doc.popular && (
                    <Badge className="gap-1 border-border bg-secondary text-secondary-foreground" variant="outline">
                      <Star className="h-3 w-3 fill-primary text-primary" />Popular
                    </Badge>
                  )}
                </div>

                <h1 className="mt-5 font-serif text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
                  {doc.title.split(" ").slice(0, -1).join(" ")}
                  <br />
                  <span className="gradient-text">{doc.title.split(" ").slice(-1)[0]}</span>
                </h1>

                <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                  {docContent.description}{" "}
                  Our AI asks smart questions and compiles a state-aware draft you can review and edit before signing.
                </p>
                <p className="mt-2 max-w-xl text-xs leading-relaxed text-muted-foreground/70">
                  LegalLawDocs is not a law firm. Drafts are AI-generated and should be reviewed by a qualified attorney before execution.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Link href={generatePath}>
                    <Button size="lg" className="gap-2 shadow-lg shadow-primary/20">
                      {hasActiveSubscription ? (
                        <>Generate Free {doc.title.split(" ")[0]}<Crown className="h-4 w-4" /></>
                      ) : (
                        <>Generate My {doc.title.split(" ")[0]}<ArrowRight className="h-4 w-4" /></>
                      )}
                    </Button>
                  </Link>
                  {hasActiveSubscription ? (
                    <Badge className="gap-1 border-accent/30 bg-accent/10 text-accent text-base px-4 py-2" variant="outline">
                      <Crown className="h-4 w-4" />Free with Subscription
                    </Badge>
                  ) : (
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                      <span className="text-2xl font-bold text-foreground">{doc.price}.99</span>
                      <span className="text-sm text-muted-foreground">per document</span>
                      <span className="text-sm text-muted-foreground">or</span>
                      <span className="text-lg font-semibold text-primary">{doc.subscriptionPrice}.99/mo</span>
                    </div>
                  )}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-accent" />
                    <span className="text-sm text-muted-foreground">Ready in ~5 minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Download className="h-4 w-4 text-accent" />
                    <span className="text-sm text-muted-foreground">PDF & DOCX download</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-accent" />
                    <span className="text-sm text-muted-foreground">Bank-level encryption</span>
                  </div>
                </div>
              </div>

              {/* Right card */}
              <div className="w-full shrink-0 lg:w-96">
                <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm">
                  <div className="border-b border-border/40 bg-secondary/40 p-5">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${isAccent ? "border border-accent/20 bg-accent/10" : "border border-primary/20 bg-primary/10"}`}>
                        <Icon className={`h-6 w-6 ${isAccent ? "text-accent" : "text-primary"}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{doc.title}</h3>
                        <p className="text-xs text-muted-foreground">AI-Generated Template</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">What you get</p>
                    <div className="mt-4 space-y-3">
                      {[
                        { icon: Zap, text: "AI-customized clauses", color: "text-primary" },
                        { icon: MapPin, text: "State-specific provisions", color: "text-accent" },
                        { icon: Shield, text: "Compliance verification", color: "text-primary" },
                        { icon: Users, text: "Multiple format options", color: "text-accent" },
                        { icon: Lock, text: "Digital signature ready", color: "text-primary" },
                        { icon: Download, text: "PDF & DOCX formats", color: "text-accent" },
                      ].map((item) => (
                        <div key={item.text} className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/60">
                            <item.icon className={`h-4 w-4 ${item.color}`} />
                          </div>
                          <span className="text-sm text-secondary-foreground">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-border/40 bg-secondary/30 p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        {hasActiveSubscription ? (
                          <><p className="text-xs text-muted-foreground">Included in subscription</p><p className="text-2xl font-bold text-accent">Free</p></>
                        ) : (
                          <><p className="text-xs text-muted-foreground">One-time payment</p><p className="text-2xl font-bold text-foreground">${doc.price}.99</p></>
                        )}
                      </div>
                      <Link href={generatePath}>
                        <Button className="gap-2 shadow-md shadow-primary/20">
                          {hasActiveSubscription ? (<>Generate Free<Crown className="h-4 w-4" /></>) : (<>Get Started<ArrowRight className="h-4 w-4" /></>)}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {detailContent && (
          <>
            <section className="border-b border-border/40 py-16 lg:py-24">
              <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-primary">{doc.title} Guide</p>
                    <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">{detailContent.overview.title}</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">{detailContent.overview.body}</p>
                  </div>
                  <div className="rounded-2xl border border-border/50 bg-card/60 p-6">
                    <p className="text-sm font-semibold uppercase tracking-widest text-accent">Why It Matters</p>
                    <div className="mt-4 space-y-3">
                      {detailContent.whyItMatters.map((item) => (
                        <div key={item} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-accent" />
                          <span className="text-sm text-secondary-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="border-b border-border/40 py-16 lg:py-24">
              <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                  <p className="text-sm font-semibold uppercase tracking-widest text-accent">Key Sections Explained</p>
                  <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">What Your {doc.title} Should Cover</h2>
                  <p className="mt-4 text-muted-foreground">These core sections make the document enforceable, clear, and easier to administer.</p>
                </div>
                <div className="mt-12 grid gap-6 md:grid-cols-2">
                  {detailContent.keySections.map((section) => (
                    <div key={section.title} className="rounded-2xl border border-border/50 bg-card/60 p-6">
                      <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{section.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="border-b border-border/40 py-16 lg:py-24">
              <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                  <p className="text-sm font-semibold uppercase tracking-widest text-primary">Step-by-Step</p>
                  <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">How to Create a Valid {doc.title}</h2>
                </div>
                <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {detailContent.process.map((step, index) => (
                    <div key={step.title} className="rounded-2xl border border-border/50 bg-card/60 p-6">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">{index + 1}</div>
                      <h3 className="mt-4 text-lg font-semibold text-foreground">{step.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="border-b border-border/40 py-16 lg:py-24">
              <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                  <p className="text-sm font-semibold uppercase tracking-widest text-accent">State-Specific Considerations</p>
                  <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">Requirements That Vary by State</h2>
                </div>
                <div className="mt-12 grid gap-6 md:grid-cols-2">
                  {detailContent.stateConsiderations.map((item) => (
                    <div key={item.title} className="rounded-2xl border border-border/50 bg-card/60 p-6">
                      <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="border-b border-border/40 py-16 lg:py-24">
              <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-primary">Common Mistakes</p>
                    <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">Avoid These Pitfalls</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">Most documents fail due to avoidable mistakes. Use this checklist to reduce risk.</p>
                  </div>
                  <div className="rounded-2xl border border-border/50 bg-card/60 p-6">
                    <div className="space-y-3">
                      {detailContent.mistakesToAvoid.map((item) => (
                        <div key={item} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-accent" />
                          <span className="text-sm text-secondary-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="border-b border-border/40 py-16 lg:py-24">
              <div className="mx-auto max-w-4xl px-4 lg:px-8">
                <div className="text-center">
                  <p className="text-sm font-semibold uppercase tracking-widest text-accent">Frequently Asked Questions</p>
                  <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">{doc.title} FAQs</h2>
                </div>
                <div className="mt-10 space-y-4">
                  {detailContent.faq.map((item) => (
                    <div key={item.question} className="rounded-2xl border border-border/50 bg-card/60 p-6">
                      <h3 className="text-base font-semibold text-foreground">{item.question}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* ── Looking for a specific type? (variants + subroute intents) ── */}
        {(variantDocs.length > 0 || subrouteIntents.length > 0) && (
          <section className="border-b border-border/40 bg-secondary/20 py-14 lg:py-20">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="mb-8">
                <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
                  Looking for a Specific Type?
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Choose a variant tailored to your situation — each generates a purpose-built document.
                </p>
              </div>

              {/* Standalone intent catalog variants */}
              {variantDocs.length > 0 && (
                <div className="mb-6">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Popular Variants
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {variantDocs.map((variant) => {
                      const VariantIcon = variant.icon
                      return (
                        <Link
                          key={variant.slug}
                          href={getDocumentPath(variant)}
                          className="group flex items-start gap-3 rounded-xl border border-border/50 bg-card/60 p-4 transition-all hover:border-primary/40 hover:shadow-md"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
                            <VariantIcon className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-foreground group-hover:text-primary leading-snug">
                              {variant.title}
                            </p>
                            <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                              {variant.description}
                            </p>
                          </div>
                          <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Subroute intent pages */}
              {subrouteIntents.length > 0 && (
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Situation-Specific
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {subrouteIntents.map((intent) => (
                      <Link
                        key={intent.id}
                        href={`/documents/${category}/${slug}/${intent.slug}`}
                        className="group flex items-center justify-between rounded-xl border border-border/50 bg-card/60 px-4 py-3 transition-all hover:border-accent/40 hover:shadow-sm"
                      >
                        <span className="text-sm font-medium text-foreground group-hover:text-accent">
                          {intent.name}
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground group-hover:text-accent" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* What's Included */}
        <section className="border-b border-border/40 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-accent">Comprehensive Coverage</p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">{"What's Included"}</h2>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {docContent.included.map((item, i) => (
                <div key={item} className={`flex items-start gap-3 rounded-xl border border-border/40 bg-card/40 p-4 transition-colors hover:border-primary/20 hover:bg-card/60`}>
                  <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold ${i % 2 === 0 ? "bg-primary/15 text-primary" : "bg-accent/15 text-accent"}`}>
                    {i + 1}
                  </div>
                  <span className="text-sm font-medium text-secondary-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* States Covered */}
        <section className="border-b border-border/40 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
              <div className="flex-1">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">Nationwide Coverage</p>
                <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">
                  Compliant Across <span className="gradient-text">All 50 States</span>
                </h2>
                <p className="mt-4 max-w-lg text-muted-foreground leading-relaxed">
                  Our AI automatically adapts your document to include state-specific provisions, referencing the correct statutes and compliance requirements for your jurisdiction.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {statesCovered.map((state) => (
                    <Badge key={state} variant="outline" className={`border-border/60 bg-secondary/40 text-secondary-foreground ${state === "All 50 States" ? "border-primary/40 bg-primary/10 text-primary font-semibold" : ""}`}>
                      {state === "All 50 States" ? <><MapPin className="mr-1 h-3 w-3" />{state}</> : state}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="w-full shrink-0 lg:w-80">
                <div className="rounded-2xl border border-accent/20 bg-accent/5 p-6">
                  <Shield className="h-8 w-8 text-accent" />
                  <h3 className="mt-4 text-lg font-semibold text-foreground">State-Aware Templates</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Drafts reference the statutes and provisions relevant to each U.S. state. We
                    don&apos;t verify compliance — your attorney should before you sign.
                  </p>
                  <div className="mt-5 space-y-2.5">
                    {["Trade secret statutes", "Non-compete restrictions", "Injunctive relief rules", "Statute of limitations"].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                        <span className="text-sm text-secondary-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews section removed for YMYL compliance (was fictional). */}

        {/* CTA */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              Ready to Create Your {doc.title}?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {hasActiveSubscription ? (
                <>Answer a few AI-powered questions and download your professionally compiled draft in minutes. <span className="text-accent font-semibold">Free with your subscription!</span></>
              ) : (
                <>Answer a few AI-powered questions, pay ${doc.price}.99, and download your professionally compiled draft in minutes.</>
              )}
            </p>
            <Link href={generatePath} className="mt-8 inline-block">
              <Button size="lg" className="gap-2 shadow-lg shadow-primary/20">
                {hasActiveSubscription ? (
                  <>Generate Free {doc.title.split(" ")[0]} Now<Crown className="h-4 w-4" /></>
                ) : (
                  <>Generate My {doc.title.split(" ")[0]} Now<ArrowRight className="h-4 w-4" /></>
                )}
              </Button>
            </Link>
          </div>
        </section>

        {/* Legal Disclaimer */}
        <div className="border-t border-border/30 bg-secondary/20 py-8">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <LegalDisclaimer />
          </div>
        </div>

        {/* Sponsored Legal Services */}
        {doc.lawyerListingEnabled && (
          <SponsoredLegalServicesBlock
            documentTitle={doc.title}
            practiceAreas={doc.practiceAreas}
            monetizationTier={doc.monetizationTier}
          />
        )}

        {/* Related Documents */}
        {relatedDocs.length > 0 && (
          <section className="border-t border-border/40 py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">Explore More Documents</p>
                <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">
                  You Might Also <span className="gradient-text">Be Interested In</span>
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Related documents that work well alongside your {doc.title}.
                </p>
              </div>
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedDocs.map((relatedDoc) => {
                  const RelatedIcon = relatedDoc.icon
                  const isRelatedAccent = relatedDoc.color === "accent"
                  const relatedPath = getDocumentPath(relatedDoc)
                  return (
                    <Link
                      key={relatedDoc.slug}
                      href={relatedPath}
                      className="group flex items-start gap-4 rounded-2xl border border-border/50 bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                    >
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${isRelatedAccent ? "border border-accent/20 bg-accent/10" : "border border-primary/20 bg-primary/10"}`}>
                        <RelatedIcon className={`h-6 w-6 ${isRelatedAccent ? "text-accent" : "text-primary"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2 flex-wrap">
                          <h3 className="font-semibold text-foreground leading-tight">{relatedDoc.title}</h3>
                          {relatedDoc.popular && (
                            <Badge variant="outline" className="gap-1 border-primary/30 bg-primary/10 text-xs text-primary shrink-0">
                              <Star className="h-2.5 w-2.5" />Popular
                            </Badge>
                          )}
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{relatedDoc.description}</p>
                        <div className="mt-3 flex items-center gap-2 text-sm">
                          {hasActiveSubscription ? (
                            <Badge variant="outline" className="gap-1 border-accent/30 bg-accent/10 text-xs text-accent">
                              <Crown className="h-3 w-3" />Free
                            </Badge>
                          ) : (
                            <span className="font-semibold text-foreground">${relatedDoc.price}.99</span>
                          )}
                        </div>
                      </div>
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-primary group-hover:opacity-100" />
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}
