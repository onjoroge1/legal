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
} from "lucide-react"
import { documentCatalog, getDocumentBySlug, getDocumentsByCategory, getDocumentPath } from "@/lib/document-catalog"
import { getCategoryMeta } from "@/lib/categories"
import { getSubscriptionFromSession } from "@/lib/subscription"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumb } from "@/components/seo/breadcrumb"
import { LegalDisclaimer } from "@/components/seo/legal-disclaimer"
import type { Metadata } from "next"

import { getDocumentContent } from "@/lib/document-content"
import { getDocumentDetailContent } from "@/lib/document-detail-content"
import { getDocumentSeo, getCanonicalUrlByParts } from "@/lib/document-seo"

const statesCovered = [
  "California", "New York", "Texas", "Florida", "Illinois",
  "Pennsylvania", "Ohio", "Georgia", "North Carolina", "Michigan",
  "New Jersey", "Virginia", "Washington", "Arizona", "Massachusetts",
  "All 50 States",
]

const reviews = [
  { name: "Sarah Chen", role: "Startup Founder", rating: 5, text: "Generated a state-compliant agreement in under 5 minutes. My attorney reviewed it and confirmed it was solid. Saved me hundreds in legal fees." },
  { name: "Marcus Johnson", role: "Business Consultant", rating: 5, text: "I use LegalLawDocs for client documents across multiple states. The questions are on point and the output is thorough." },
  { name: "Emily Rodriguez", role: "Freelance Designer", rating: 5, text: "Finally, an affordable way to protect my work and relationships. The document covered everything I needed." },
]

interface PageProps {
  params: Promise<{ category: string; slug: string }>
}

export async function generateStaticParams() {
  return documentCatalog.map((doc) => ({
    category: doc.category,
    slug: doc.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params
  const doc = getDocumentBySlug(slug)
  if (!doc || doc.category !== category) return {}

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

  if (!doc || doc.category !== category) {
    notFound()
  }

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

  const relatedDocs = getDocumentsByCategory(doc.category).filter((d) => d.slug !== slug).slice(0, 3)

  return (
    <div className="min-h-screen">
      <Header />

      <main>
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
                  <Badge className="gap-1 border-accent/30 bg-accent/10 text-accent" variant="outline">
                    <Shield className="h-3 w-3" />Legally Compliant
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
                  Our AI asks smart questions to customize every clause to your situation and state requirements.
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
                  <h3 className="mt-4 text-lg font-semibold text-foreground">State-Specific Compliance</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Every state has unique requirements, and we cover them all with proper legal citations and compliance verification.
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

        {/* Reviews */}
        <section className="border-b border-border/40 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Trusted By Thousands</p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">What Our Users Say</h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {reviews.map((review) => (
                <div key={review.name} className="rounded-2xl border border-border/50 bg-card/60 p-6">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{`"${review.text}"`}</p>
                  <div className="mt-4 border-t border-border/40 pt-4">
                    <p className="text-sm font-semibold text-foreground">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              Ready to Create Your {doc.title}?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {hasActiveSubscription ? (
                <>Answer a few AI-powered questions and download your professionally crafted, legally compliant document in minutes. <span className="text-accent font-semibold">Free with your subscription!</span></>
              ) : (
                <>Answer a few AI-powered questions, pay ${doc.price}.99, and download your professionally crafted, legally compliant document in minutes.</>
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
                  More {categoryMeta?.label || category} documents that might suit your needs.
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
