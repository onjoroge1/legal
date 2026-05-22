import { notFound } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Star, Crown, CheckCircle2, AlertTriangle, BookOpen, HelpCircle, BarChart3 } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumb } from "@/components/seo/breadcrumb"
import { LegalDisclaimer } from "@/components/seo/legal-disclaimer"
import { categories, getCategoryMeta } from "@/lib/categories"
import {
  documentCatalog,
  getDocumentsByCategory,
  getDocumentPath,
  type CategoryId,
} from "@/lib/document-catalog"
import { getCategoryBodyContent } from "@/lib/category-body-content"
import { getSubscriptionFromSession } from "@/lib/subscription"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  return categories.map((c) => ({ category: c.id }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params
  const meta = getCategoryMeta(category as CategoryId)
  if (!meta) return {}

  const canonical = `https://legallawdocs.com/documents/${meta.id}`

  return {
    title: meta.seoTitle,
    description: meta.seoDescription,
    keywords: meta.keywords,
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
      title: meta.seoTitle,
      description: meta.seoDescription,
      siteName: "LegalLawDocs.com",
    },
  }
}

export default async function CategoryHubPage({ params }: PageProps) {
  const { category } = await params
  const meta = getCategoryMeta(category as CategoryId)

  if (!meta) notFound()

  const docs = getDocumentsByCategory(category as CategoryId)
  const subscription = await getSubscriptionFromSession()
  const hasActiveSubscription = subscription?.isActive ?? false
  const bodyContent = getCategoryBodyContent(category)

  // Related categories (exclude current)
  const relatedCategories = categories.filter((c) => c.id !== category).slice(0, 3)

  const ItemIcon = meta.icon

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: meta.heading,
    description: meta.description,
    url: `https://legallawdocs.com/documents/${meta.id}`,
    numberOfItems: docs.length,
    itemListElement: docs.map((doc, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: doc.title,
      url: `https://legallawdocs.com/documents/${doc.category}/${doc.slug}`,
    })),
  }

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <Header />

      <main>
        {/* Breadcrumb */}
        <div className="border-b border-border/30 bg-secondary/20">
          <div className="mx-auto max-w-7xl px-4 py-3 lg:px-8">
            <Breadcrumb
              items={[
                { label: "Documents", href: "/documents" },
                { label: meta.label },
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
            <div className="mx-auto max-w-3xl text-center">
              <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${meta.color === "accent" ? "border border-accent/20 bg-accent/10" : "border border-primary/20 bg-primary/10"}`}>
                <ItemIcon className={`h-8 w-8 ${meta.color === "accent" ? "text-accent" : "text-primary"}`} />
              </div>
              <h1 className="mt-6 font-serif text-4xl font-bold text-foreground md:text-5xl">
                {meta.heading}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{meta.description}</p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Badge variant="outline" className="gap-1 border-primary/30 bg-primary/10 text-primary">
                  <Sparkles className="h-3 w-3" />AI-Powered
                </Badge>
                <Badge variant="outline" className="gap-1 border-border/60 text-muted-foreground">
                  {docs.length} Document{docs.length !== 1 ? "s" : ""} Available
                </Badge>
                <Badge variant="outline" className="gap-1 border-border/60 text-muted-foreground">
                  All 50 States
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Document Grid */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            {docs.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">No documents available in this category yet.</p>
                <p className="mt-2 text-sm text-muted-foreground">Check back soon — we&apos;re adding more regularly.</p>
                <Link href="/documents" className="mt-6 inline-block">
                  <Button variant="outline" className="gap-2">
                    Browse All Documents
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <div className="mx-auto max-w-2xl text-center mb-12">
                  <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                    {meta.label} Documents
                  </p>
                  <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">
                    Choose Your Document
                  </h2>
                  <p className="mt-4 text-muted-foreground">
                    Select a document type below to get started. Each is AI-generated and state-specific.
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {docs.map((doc) => {
                    const DocIcon = doc.icon
                    const isAccent = doc.color === "accent"
                    const docPath = getDocumentPath(doc)
                    return (
                      <Link
                        key={doc.slug}
                        href={docPath}
                        className="group flex flex-col rounded-2xl border border-border/50 bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                      >
                        <div className="flex items-start gap-4">
                          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${isAccent ? "border border-accent/20 bg-accent/10" : "border border-primary/20 bg-primary/10"}`}>
                            <DocIcon className={`h-6 w-6 ${isAccent ? "text-accent" : "text-primary"}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-2 flex-wrap">
                              <h3 className="font-semibold text-foreground leading-tight">{doc.title}</h3>
                              {doc.popular && (
                                <Badge variant="outline" className="gap-1 border-primary/30 bg-primary/10 text-xs text-primary shrink-0">
                                  <Star className="h-2.5 w-2.5" />Popular
                                </Badge>
                              )}
                            </div>
                            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{doc.description}</p>
                          </div>
                        </div>

                        <div className="mt-5 flex items-center justify-between border-t border-border/30 pt-4">
                          <div>
                            {hasActiveSubscription ? (
                              <Badge variant="outline" className="gap-1 border-accent/30 bg-accent/10 text-xs text-accent">
                                <Crown className="h-3 w-3" />Free with Subscription
                              </Badge>
                            ) : (
                              <span className="text-sm font-semibold text-foreground">${doc.price}.99</span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-primary opacity-0 transition-all duration-200 group-hover:opacity-100">
                            Get Started
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        </section>

        {/* ── Rich body content ─────────────────────────────────────────────── */}
        {bodyContent && (
          <>
            {/* Intro */}
            <section className="py-16 lg:py-20 bg-muted/20 border-t border-border/30">
              <div className="mx-auto max-w-4xl px-4 lg:px-8">
                <div className="flex items-center gap-2 mb-6">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span className="text-sm font-semibold uppercase tracking-widest text-primary">Overview</span>
                </div>
                <div className="space-y-5">
                  {bodyContent.intro.map((para, i) => (
                    <p key={i} className="text-base leading-relaxed text-muted-foreground">{para}</p>
                  ))}
                </div>
              </div>
            </section>

            {/* Trust stats */}
            <section className="py-12 border-t border-border/30">
              <div className="mx-auto max-w-5xl px-4 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {bodyContent.trustStats.map((s, i) => (
                    <div key={i} className="rounded-xl border border-border/50 bg-card p-6 text-center">
                      <div className="text-2xl font-bold text-primary mb-2">{s.stat}</div>
                      <p className="text-sm text-muted-foreground">{s.context}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* When you need these documents */}
            <section className="py-16 border-t border-border/30">
              <div className="mx-auto max-w-5xl px-4 lg:px-8">
                <div className="flex items-center gap-2 mb-8">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-sm font-semibold uppercase tracking-widest text-primary">Common Situations</span>
                </div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-8">When You Need {meta.heading}</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {bodyContent.whenYouNeed.map((item, i) => (
                    <div key={i} className="rounded-xl border border-border/50 bg-card p-5">
                      <div className="font-semibold text-foreground mb-2">{item.situation}</div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Document guide */}
            {bodyContent.documentGuide.length > 0 && (
              <section className="py-16 bg-muted/20 border-t border-border/30">
                <div className="mx-auto max-w-4xl px-4 lg:px-8">
                  <div className="flex items-center gap-2 mb-8">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <span className="text-sm font-semibold uppercase tracking-widest text-primary">Which Document Do You Need?</span>
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-8">Choosing the Right Document</h2>
                  <div className="space-y-4">
                    {bodyContent.documentGuide.map((item, i) => (
                      <div key={i} className="flex gap-4 rounded-xl border border-border/50 bg-card p-5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                          {i + 1}
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">{item.docName}</div>
                          <p className="mt-1 text-sm text-muted-foreground">{item.useWhen}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Legal considerations */}
            <section className="py-16 border-t border-border/30">
              <div className="mx-auto max-w-5xl px-4 lg:px-8">
                <div className="flex items-center gap-2 mb-8">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  <span className="text-sm font-semibold uppercase tracking-widest text-primary">Legal Considerations</span>
                </div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-8">Key Legal Requirements</h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  {bodyContent.legalConsiderations.map((item, i) => (
                    <div key={i} className="rounded-xl border border-border/50 bg-card p-6">
                      <h3 className="font-semibold text-foreground mb-3">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="py-16 bg-muted/20 border-t border-border/30">
              <div className="mx-auto max-w-3xl px-4 lg:px-8">
                <div className="flex items-center gap-2 mb-8">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  <span className="text-sm font-semibold uppercase tracking-widest text-primary">FAQ</span>
                </div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-8">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {bodyContent.faq.map((item, i) => (
                    <div key={i} className="rounded-xl border border-border/50 bg-card p-6">
                      <h3 className="font-semibold text-foreground mb-2">{item.question}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* Legal Disclaimer */}
        <div className="border-t border-border/30 bg-secondary/20 py-8">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <LegalDisclaimer />
          </div>
        </div>

        {/* Other Categories */}
        <section className="border-t border-border/40 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-10">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">More Document Types</p>
              <h2 className="mt-3 font-serif text-2xl font-bold text-foreground md:text-3xl">
                Explore Other Categories
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              {relatedCategories.map((cat) => {
                const CatIcon = cat.icon
                return (
                  <Link
                    key={cat.id}
                    href={`/documents/${cat.id}`}
                    className="group flex items-center gap-4 rounded-2xl border border-border/50 bg-card/60 p-5 transition-all hover:border-primary/30 hover:shadow-md"
                  >
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${cat.color === "accent" ? "border border-accent/20 bg-accent/10" : "border border-primary/20 bg-primary/10"}`}>
                      <CatIcon className={`h-5 w-5 ${cat.color === "accent" ? "text-accent" : "text-primary"}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{cat.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {documentCatalog.filter((d) => d.category === cat.id).length} documents
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:text-primary group-hover:opacity-100" />
                  </Link>
                )
              })}
            </div>
            <div className="mt-8 text-center">
              <Link href="/documents">
                <Button variant="outline" className="gap-2">
                  View All Document Categories
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
