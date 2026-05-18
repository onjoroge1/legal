import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Sparkles,
  Lock,
  Zap,
  Shield,
  ChevronRight,
  AlertTriangle,
  BookOpen,
  Scale,
  ListChecks,
} from "lucide-react"
import {
  documentCatalog,
  getDocumentBySlug,
  getRelatedDocuments,
  getDocumentPath,
} from "@/lib/document-catalog"
import {
  getAllIndexableSubrouteIntents,
  getIntentForDocument,
  getIntentsForDocument,
  type DocumentIntent,
} from "@/lib/intent-registry"
import { getIntentBodyContent } from "@/lib/intent-body-content"
import { getCategoryMeta } from "@/lib/categories"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumb } from "@/components/seo/breadcrumb"
import { LegalDisclaimer } from "@/components/seo/legal-disclaimer"
import { SponsoredLegalServicesBlock } from "@/components/seo/sponsored-legal-services"
import type { Metadata } from "next"

const BASE_URL = "https://legallawdocs.com"

interface PageProps {
  params: Promise<{ category: string; slug: string; intent: string }>
}

// ── Static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const entries = getAllIndexableSubrouteIntents()
  return entries
    .map(({ legacySlug, intent }) => {
      const doc = documentCatalog.find((d) => d.legacySlug === legacySlug)
      if (!doc) return null
      return { category: doc.category, slug: doc.slug, intent: intent.slug }
    })
    .filter(Boolean) as { category: string; slug: string; intent: string }[]
}

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug, intent: intentSlug } = await params
  const doc = getDocumentBySlug(slug)
  if (!doc || doc.category !== category) return {}

  const intent = getIntentForDocument(slug, intentSlug)
  if (!intent) return {}

  const canonical = `${BASE_URL}/documents/${category}/${slug}/${intentSlug}`

  return {
    title: intent.seoTitle,
    description: intent.metaDescription,
    alternates: { canonical },
    authors: [{ name: "LegalLawDocs.com" }],
    robots: intent.indexable
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        }
      : { index: false, follow: false },
    openGraph: {
      type: "website",
      url: canonical,
      title: intent.seoTitle,
      description: intent.metaDescription,
      siteName: "LegalLawDocs.com",
      images: [
        {
          url: "https://legallawdocs.com/images/hero-legal.jpg",
          width: 1200,
          height: 630,
          alt: `${intent.h1} - LegalLawDocs.com`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: intent.seoTitle,
      description: intent.metaDescription,
      images: ["https://legallawdocs.com/images/hero-legal.jpg"],
    },
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function IntentPage({ params }: PageProps) {
  const { category, slug, intent: intentSlug } = await params

  const doc = getDocumentBySlug(slug)
  if (!doc || doc.category !== category) notFound()

  const intent = getIntentForDocument(slug, intentSlug)
  if (!intent) notFound()

  const categoryMeta = getCategoryMeta(doc.category)
  const generatePath = `/documents/${category}/${slug}/generate?intent=${intent.id}`
  const parentPath = `/documents/${category}/${slug}`
  const canonicalUrl = `${BASE_URL}/documents/${category}/${slug}/${intentSlug}`

  // Body content (extended 2,500-word content unique to this intent)
  const bodyContentKey = `${slug.replace(/-/g, "_")}_${intent.id}`
  const bodyContent = getIntentBodyContent(bodyContentKey)

  // Sibling intents (excluding this one)
  const siblingIntents = getIntentsForDocument(slug).filter(
    (i) => i.slug !== intentSlug && i.tier !== "flow-only"
  )

  // Related documents
  const relatedDocs = getRelatedDocuments(intent.relatedDocumentSlugs).slice(0, 3)

  // JSON-LD: FAQPage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: intent.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  }

  // JSON-LD: WebApplication
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${intent.h1} Generator`,
    url: canonicalUrl,
    applicationCategory: "LegalApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: `${doc.price}.99`,
      priceCurrency: "USD",
    },
    description: intent.shortDescription,
    provider: {
      "@type": "Organization",
      name: "LegalLawDocs.com",
      url: BASE_URL,
    },
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />

        {/* Breadcrumb */}
        <div className="border-b border-border/30 bg-secondary/20">
          <div className="mx-auto max-w-7xl px-4 py-3 lg:px-8">
            <Breadcrumb
              items={[
                { label: "Documents", href: "/documents" },
                { label: categoryMeta?.label || category, href: `/documents/${category}` },
                { label: doc.title, href: parentPath },
                { label: intent.name },
              ]}
            />
          </div>
        </div>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b border-border/40 py-16 lg:py-24">
          <div className="pointer-events-none absolute inset-0 grid-pattern animate-grid-fade" />
          <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
          <div className="pointer-events-none absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
              {/* Left: Content */}
              <div className="flex-1">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    className="gap-1 border-primary/30 bg-primary/10 text-primary"
                    variant="outline"
                  >
                    <Sparkles className="h-3 w-3" />
                    AI-Powered
                  </Badge>
                  <Badge
                    className="gap-1 border-accent/30 bg-accent/10 text-accent"
                    variant="outline"
                  >
                    <Zap className="h-3 w-3" />
                    Instant Download
                  </Badge>
                  <Badge
                    className="gap-1 border-green-500/30 bg-green-500/10 text-green-600"
                    variant="outline"
                  >
                    <Shield className="h-3 w-3" />
                    Lawyer-Reviewed
                  </Badge>
                </div>

                {/* H1 */}
                <h1 className="mt-6 font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
                  {intent.h1}
                </h1>

                {/* Short description */}
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
                  {intent.shortDescription}
                </p>

                {/* Trust strip */}
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Attorney-drafted template
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    PDF &amp; DOCX download
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    State-compliant
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Lock className="h-4 w-4 text-green-500" />
                    256-bit SSL encrypted
                  </span>
                </div>

                {/* CTA */}
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Link href={generatePath}>
                    <Button size="lg" className="gap-2 px-8 text-base font-semibold shadow-lg">
                      Create {intent.name} <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href={parentPath}>
                    <Button size="lg" variant="outline" className="gap-2 text-base">
                      <FileText className="h-4 w-4" />
                      View All {doc.title} Options
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right: Price card */}
              <div className="w-full shrink-0 lg:w-80">
                <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/80 shadow-xl">
                  <div className="border-b border-border/40 bg-secondary/40 px-6 py-4">
                    <p className="text-sm font-medium text-muted-foreground">Starting at</p>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="font-serif text-4xl font-bold text-foreground">
                        ${doc.price}
                      </span>
                      <span className="text-muted-foreground">.99</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">One-time · No subscription</p>
                  </div>
                  <div className="space-y-3 px-6 py-5">
                    {[
                      "AI-customised to your situation",
                      "Ready in under 5 minutes",
                      "PDF & DOCX included",
                      "All 50 states supported",
                      "Unlimited revisions",
                    ].map((f) => (
                      <div key={f} className="flex items-center gap-2.5">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500" />
                        <span className="text-sm text-secondary-foreground">{f}</span>
                      </div>
                    ))}
                  </div>
                  <div className="px-6 pb-6">
                    <Link href={generatePath} className="block">
                      <Button size="lg" className="w-full gap-2">
                        Get Started <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── When to Use ──────────────────────────────────────────────────── */}
        <section className="border-b border-border/40 bg-secondary/20 py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
                When to Use a {intent.name}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-secondary-foreground">
                {intent.whenToUse}
              </p>
            </div>
          </div>
        </section>

        {/* ── Key Differences ──────────────────────────────────────────────── */}
        <section className="border-b border-border/40 py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
                What Makes This Type Different
              </h2>
              <p className="mt-3 text-muted-foreground">
                How a {intent.name} differs from the standard {doc.title}.
              </p>
              <ul className="mt-8 space-y-4">
                {intent.keyDifferences.map((diff) => (
                  <li key={diff} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-secondary-foreground">{diff}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Complete Guide (bodyContent.overview) ────────────────────────── */}
        {bodyContent?.overview && bodyContent!.overview.length > 0 && (
          <section className="border-b border-border/40 bg-secondary/20 py-14 lg:py-20">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="mx-auto max-w-3xl">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
                    Complete Guide: {intent.h1}
                  </h2>
                </div>
                <div className="space-y-5">
                  {bodyContent!.overview.map((para, i) => (
                    <p key={i} className="text-base leading-relaxed text-secondary-foreground">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── How It Works ─────────────────────────────────────────────────── */}
        {bodyContent?.howItWorks && bodyContent!.howItWorks.length > 0 && (
          <section className="border-b border-border/40 py-14 lg:py-20">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="mx-auto max-w-3xl">
                <div className="mb-8 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent/20 bg-accent/10">
                    <ListChecks className="h-5 w-5 text-accent" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
                    How to Create a {intent.name}: Step-by-Step
                  </h2>
                </div>
                <ol className="space-y-6">
                  {bodyContent!.howItWorks.map((item, i) => (
                    <li key={i} className="flex gap-5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                        {i + 1}
                      </div>
                      <div className="flex-1 pt-1">
                        <h3 className="font-semibold text-foreground">{item.step}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-secondary-foreground">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        )}

        {/* ── Legal Considerations ─────────────────────────────────────────── */}
        {bodyContent?.legalConsiderations && bodyContent!.legalConsiderations.length > 0 && (
          <section className="border-b border-border/40 bg-secondary/20 py-14 lg:py-20">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="mx-auto max-w-3xl">
                <div className="mb-8 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
                    <Scale className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
                    Key Legal Considerations
                  </h2>
                </div>
                <div className="space-y-5">
                  {bodyContent!.legalConsiderations.map((item, i) => (
                    <div key={i} className="rounded-xl border border-border/50 bg-card/60 p-5">
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-secondary-foreground">
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Common Mistakes ──────────────────────────────────────────────── */}
        {bodyContent?.commonMistakes && bodyContent!.commonMistakes.length > 0 && (
          <section className="border-b border-border/40 py-14 lg:py-20">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="mx-auto max-w-3xl">
                <div className="mb-8 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/10">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
                    Common Mistakes to Avoid
                  </h2>
                </div>
                <div className="space-y-4">
                  {bodyContent!.commonMistakes.map((item, i) => (
                    <div key={i} className="overflow-hidden rounded-xl border border-border/50">
                      <div className="flex items-start gap-3 bg-red-500/5 px-5 py-3.5">
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                        <p className="text-sm font-semibold text-foreground">{item.mistake}</p>
                      </div>
                      <div className="flex items-start gap-3 bg-green-500/5 px-5 py-3.5">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                        <p className="text-sm leading-relaxed text-secondary-foreground">{item.fix}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Sibling Intents ───────────────────────────────────────────────── */}
        {siblingIntents.length > 0 && (
          <section className="border-b border-border/40 bg-secondary/20 py-14 lg:py-20">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
                Other {doc.title} Types
              </h2>
              <p className="mt-3 text-muted-foreground">
                Not quite the right fit? Explore other variants.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {siblingIntents.map((sibling) => {
                  const siblingPath =
                    sibling.tier === "subroute"
                      ? `/documents/${category}/${slug}/${sibling.slug}`
                      : `/documents/${category}/${slug}/generate?intent=${sibling.id}`
                  return (
                    <Link
                      key={sibling.id}
                      href={siblingPath}
                      className="group rounded-xl border border-border/50 bg-card/60 p-5 transition-all hover:border-primary/40 hover:shadow-md"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground group-hover:text-primary">
                            {sibling.name}
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">{sibling.description}</p>
                        </div>
                        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                      </div>
                    </Link>
                  )
                })}
                {/* Always show "standard" link back to parent */}
                <Link
                  href={parentPath}
                  className="group rounded-xl border border-border/50 bg-card/60 p-5 transition-all hover:border-primary/40 hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary">
                        Standard {doc.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        View all variants and the standard template
                      </p>
                    </div>
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                  </div>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ── FAQ (base + extended) ────────────────────────────────────────── */}
        <section className="border-b border-border/40 py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-muted-foreground">
                Common questions about the {intent.name}.
              </p>
              <Accordion type="single" collapsible className="mt-8 w-full space-y-2">
                {[
                  ...intent.faq,
                  ...(bodyContent?.extendedFaq ?? []),
                ].map((item, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`faq-${idx}`}
                    className="rounded-xl border border-border/50 bg-card/60 px-5"
                  >
                    <AccordionTrigger className="py-4 text-left font-semibold text-foreground hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-secondary-foreground leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* ── Related Documents ────────────────────────────────────────────── */}
        {relatedDocs.length > 0 && (
          <section className="border-b border-border/40 bg-secondary/20 py-14 lg:py-20">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
                You Might Also Need
              </h2>
              <p className="mt-3 text-muted-foreground">
                Documents commonly used alongside a {intent.name}.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedDocs.map((related) => {
                  const RelatedIcon = related.icon
                  return (
                    <Link
                      key={related.slug}
                      href={getDocumentPath(related)}
                      className="group rounded-xl border border-border/50 bg-card/60 p-5 transition-all hover:border-primary/40 hover:shadow-md"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
                          <RelatedIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground group-hover:text-primary">
                            {related.title}
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                            {related.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* ── Sponsored Legal Services ─────────────────────────────────────── */}
        <SponsoredLegalServicesBlock
          documentTitle={intent.h1}
          practiceAreas={intent.practiceAreas}
          monetizationTier={doc.monetizationTier}
        />

        {/* ── Legal Disclaimer ─────────────────────────────────────────────── */}
        <LegalDisclaimer />
      </main>

      <Footer />
    </div>
  )
}
