import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumb } from "@/components/seo/breadcrumb"
import { LegalDisclaimer } from "@/components/seo/legal-disclaimer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Star, Crown, Search } from "lucide-react"
import { categories } from "@/lib/categories"
import { documentCatalog, getDocumentPath } from "@/lib/document-catalog"
import { getSubscriptionFromSession } from "@/lib/subscription"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Legal Document Templates — Create Online | LegalLawDocs.com",
  description:
    "Browse 50+ AI-powered legal document templates across 7 categories — business, employment, real estate, estate planning, and more. State-compliant, instant download.",
  keywords: [
    "legal document templates",
    "create legal documents online",
    "business contracts",
    "employment agreements",
    "real estate lease agreements",
    "estate planning documents",
    "nda template",
    "llc operating agreement",
  ],
  alternates: { canonical: "https://legallawdocs.com/documents" },
  openGraph: {
    type: "website",
    url: "https://legallawdocs.com/documents",
    title: "Legal Document Templates — LegalLawDocs.com",
    description:
      "50+ AI-powered legal document templates. State-compliant, instant download. Business, employment, real estate, estate planning, and more.",
    siteName: "LegalLawDocs.com",
  },
}

export default async function DocumentsPage() {
  const subscription = await getSubscriptionFromSession()
  const hasActiveSubscription = subscription?.isActive ?? false

  // Popular docs across all categories
  const popularDocs = documentCatalog.filter((d) => d.popular)

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Breadcrumb */}
        <div className="border-b border-border/30 bg-secondary/20">
          <div className="mx-auto max-w-7xl px-4 py-3 lg:px-8">
            <Breadcrumb items={[{ label: "Documents" }]} />
          </div>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border/40 py-16 lg:py-24">
          <div className="pointer-events-none absolute inset-0 grid-pattern animate-grid-fade" />
          <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
          <div className="pointer-events-none absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Document Library</p>
              <h1 className="mt-3 font-serif text-4xl font-bold text-foreground md:text-5xl">
                Legal Document <span className="gradient-text">Templates</span>
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                AI-powered legal documents across 7 categories — business, employment, real estate, estate planning, and more.
                State-compliant, instantly downloadable, professionally drafted.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Badge variant="outline" className="gap-1 border-primary/30 bg-primary/10 text-primary">
                  <Sparkles className="h-3 w-3" />AI-Powered
                </Badge>
                <Badge variant="outline" className="gap-1 border-border/60 text-muted-foreground">
                  {documentCatalog.length}+ Documents
                </Badge>
                <Badge variant="outline" className="gap-1 border-border/60 text-muted-foreground">
                  All 50 States
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Browse by Category</p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">
                Find Your Document
              </h2>
              <p className="mt-4 text-muted-foreground">
                Select a category to browse all documents in that area of law.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categories.map((cat) => {
                const CatIcon = cat.icon
                const count = documentCatalog.filter((d) => d.category === cat.id).length
                return (
                  <Link
                    key={cat.id}
                    href={`/documents/${cat.id}`}
                    className="group flex flex-col rounded-2xl border border-border/50 bg-card/60 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                  >
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${cat.color === "accent" ? "border border-accent/20 bg-accent/10" : "border border-primary/20 bg-primary/10"}`}>
                      <CatIcon className={`h-6 w-6 ${cat.color === "accent" ? "text-accent" : "text-primary"}`} />
                    </div>
                    <h3 className="mt-4 font-semibold text-foreground">{cat.label}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground flex-1">{cat.description}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-border/30 pt-4">
                      <span className="text-xs text-muted-foreground">{count} document{count !== 1 ? "s" : ""}</span>
                      <div className="flex items-center gap-1 text-xs text-primary opacity-0 transition-all group-hover:opacity-100">
                        Browse
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Popular Documents */}
        <section className="border-t border-border/40 py-16 lg:py-24 bg-secondary/20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-accent">Most Requested</p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">
                Popular Documents
              </h2>
              <p className="mt-4 text-muted-foreground">
                The documents most frequently created by our users.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {popularDocs.map((doc) => {
                const DocIcon = doc.icon
                const isAccent = doc.color === "accent"
                const docPath = getDocumentPath(doc)
                return (
                  <Link
                    key={doc.slug}
                    href={docPath}
                    className="group flex items-start gap-4 rounded-2xl border border-border/50 bg-card/80 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                  >
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${isAccent ? "border border-accent/20 bg-accent/10" : "border border-primary/20 bg-primary/10"}`}>
                      <DocIcon className={`h-6 w-6 ${isAccent ? "text-accent" : "text-primary"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 flex-wrap">
                        <h3 className="font-semibold text-foreground leading-tight">{doc.title}</h3>
                        <Badge variant="outline" className="gap-1 border-primary/30 bg-primary/10 text-xs text-primary shrink-0">
                          <Star className="h-2.5 w-2.5" />Popular
                        </Badge>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{doc.description}</p>
                      <div className="mt-3">
                        {hasActiveSubscription ? (
                          <Badge variant="outline" className="gap-1 border-accent/30 bg-accent/10 text-xs text-accent">
                            <Crown className="h-3 w-3" />Free
                          </Badge>
                        ) : (
                          <span className="text-sm font-semibold text-foreground">${doc.price}.99</span>
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

        {/* Legal Disclaimer */}
        <div className="border-t border-border/30 bg-secondary/20 py-8">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <LegalDisclaimer />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
