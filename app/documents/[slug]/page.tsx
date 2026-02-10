import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Shield,
  CheckCircle2,
  Clock,
  DollarSign,
  Scale,
  MapPin,
  ArrowRight,
  Star,
  Sparkles,
  Lock,
  Zap,
  Users,
  Download,
  ArrowLeft,
  Crown,
} from "lucide-react"
import { getDocumentBySlug, documentTypes } from "@/lib/document-data"
import { getSubscriptionFromSession } from "@/lib/subscription"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const statesCovered = [
  "California", "New York", "Texas", "Florida", "Illinois",
  "Pennsylvania", "Ohio", "Georgia", "North Carolina", "Michigan",
  "New Jersey", "Virginia", "Washington", "Arizona", "Massachusetts",
  "All 50 States",
]

const included = [
  "Definition of Confidential Information",
  "Obligations of Receiving Party",
  "Term & Duration Clauses",
  "Exclusions from Confidential Information",
  "Return of Materials Provision",
  "Remedies & Injunctive Relief",
  "Non-Compete / Non-Solicitation (where legal)",
  "Governing Law & Jurisdiction",
  "Digital Signature Block",
  "State-Specific Compliance Addendum",
]

const reviews = [
  { name: "Sarah Chen", role: "Startup Founder", rating: 5, text: "Generated a California NDA in under 5 minutes. My attorney reviewed it and confirmed it was fully compliant. Saved me $800 in legal fees." },
  { name: "Marcus Johnson", role: "Business Consultant", rating: 5, text: "I use LegalLawDocs for all my client NDAs. The AI questions are spot-on and the documents are incredibly thorough." },
  { name: "Emily Rodriguez", role: "Freelance Designer", rating: 5, text: "Finally, an affordable way to protect my creative work. The NDA covered everything I needed and more." },
]

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  // Exclude slugs that have dedicated pages
  const excludedSlugs = ["llc_operating_agreement", "nda"]
  return documentTypes
    .filter((doc) => !excludedSlugs.includes(doc.slug))
    .map((doc) => ({
      slug: doc.slug,
    }))
}

export default async function DocumentDetailPage({ params }: PageProps) {
  const { slug } = await params
  const document = getDocumentBySlug(slug)

  if (!document) {
    notFound()
  }

  // Check subscription status
  const subscription = await getSubscriptionFromSession()
  const hasActiveSubscription = subscription?.isActive ?? false

  const Icon = document.icon
  const isAccent = document.color === "accent"

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border/40 py-16 lg:py-24">
          <div className="pointer-events-none absolute inset-0 grid-pattern animate-grid-fade" />
          <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
          <div className="pointer-events-none absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
              {/* Left info */}
              <div className="flex-1">

                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <Badge className="gap-1 border-primary/30 bg-primary/10 text-primary" variant="outline">
                    <Sparkles className="h-3 w-3" />
                    AI-Powered
                  </Badge>
                  <Badge className="gap-1 border-accent/30 bg-accent/10 text-accent" variant="outline">
                    <Shield className="h-3 w-3" />
                    Legally Compliant
                  </Badge>
                  {document.popular && (
                    <Badge className="gap-1 border-border bg-secondary text-secondary-foreground" variant="outline">
                      <Star className="h-3 w-3 fill-primary text-primary" />
                      Popular
                    </Badge>
                  )}
                </div>

                <h1 className="mt-5 font-serif text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
                  {document.title.split(" ").slice(0, -1).join(" ")}
                  <br />
                  <span className="gradient-text">{document.title.split(" ").slice(-1)[0]}</span>
                </h1>

                <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                  {document.description}
                  Generate a professional, legally binding document tailored to your specific needs.
                  Our AI asks smart questions to customize every clause to your situation and
                  state requirements.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Link href={`/documents/${slug}/generate`}>
                    <Button size="lg" className="gap-2 shadow-lg shadow-primary/20">
                      {hasActiveSubscription ? (
                        <>
                          Generate Free {document.title.split(" ")[0]}
                          <Crown className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          Generate My {document.title.split(" ")[0]}
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </Link>
                  {hasActiveSubscription ? (
                    <Badge className="gap-1 border-accent/30 bg-accent/10 text-accent text-base px-4 py-2" variant="outline">
                      <Crown className="h-4 w-4" />
                      Free with Subscription
                    </Badge>
                  ) : (
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                      <span className="text-2xl font-bold text-foreground">{document.price}.99</span>
                      <span className="text-sm text-muted-foreground">per document</span>
                      <span className="text-sm text-muted-foreground">or</span>
                      <span className="text-lg font-semibold text-primary">{document.subscriptionPrice}.99/mo</span>
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

              {/* Right - Document preview card */}
              <div className="w-full shrink-0 lg:w-96">
                <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm">
                  {/* Preview header */}
                  <div className="border-b border-border/40 bg-secondary/40 p-5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                          isAccent
                            ? "border border-accent/20 bg-accent/10"
                            : "border border-primary/20 bg-primary/10"
                        }`}
                      >
                        <Icon className={`h-6 w-6 ${isAccent ? "text-accent" : "text-primary"}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{document.title}</h3>
                        <p className="text-xs text-muted-foreground">AI-Generated Template</p>
                      </div>
                    </div>
                  </div>

                  {/* Preview body */}
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      What you get
                    </p>
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

                  {/* Preview footer */}
                  <div className="border-t border-border/40 bg-secondary/30 p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        {hasActiveSubscription ? (
                          <>
                            <p className="text-xs text-muted-foreground">Included in subscription</p>
                            <p className="text-2xl font-bold text-accent">Free</p>
                          </>
                        ) : (
                          <>
                            <p className="text-xs text-muted-foreground">One-time payment</p>
                            <p className="text-2xl font-bold text-foreground">${document.price}.99</p>
                          </>
                        )}
                      </div>
                      <Link href={`/documents/${slug}/generate`}>
                        <Button className="gap-2 shadow-md shadow-primary/20">
                          {hasActiveSubscription ? (
                            <>
                              Generate Free
                              <Crown className="h-4 w-4" />
                            </>
                          ) : (
                            <>
                              Get Started
                              <ArrowRight className="h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="border-b border-border/40 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-accent">Comprehensive Coverage</p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">
                {"What's Included"}
              </h2>
              <p className="mt-4 text-muted-foreground">
                Every document generated by our AI includes these essential sections, customized to your needs.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {included.map((item, i) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-border/40 bg-card/40 p-4 transition-colors hover:border-primary/20 hover:bg-card/60"
                >
                  <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold ${
                    i % 2 === 0
                      ? "bg-primary/15 text-primary"
                      : "bg-accent/15 text-accent"
                  }`}>
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
                  Our AI automatically adapts your document to include state-specific provisions,
                  referencing the correct statutes and compliance requirements for your jurisdiction.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {statesCovered.map((state) => (
                    <Badge
                      key={state}
                      variant="outline"
                      className={`border-border/60 bg-secondary/40 text-secondary-foreground ${state === "All 50 States" ? "border-primary/40 bg-primary/10 text-primary font-semibold" : ""}`}
                    >
                      {state === "All 50 States" ? (
                        <><MapPin className="mr-1 h-3 w-3" />{state}</>
                      ) : state}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="w-full shrink-0 lg:w-80">
                <div className="rounded-2xl border border-accent/20 bg-accent/5 p-6">
                  <Shield className="h-8 w-8 text-accent" />
                  <h3 className="mt-4 text-lg font-semibold text-foreground">State-Specific Compliance</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Every state has unique requirements, and we cover them all with proper legal citations
                    and compliance verification.
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
              <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">
                What Our Users Say
              </h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {reviews.map((review) => (
                <div key={review.name} className="rounded-2xl border border-border/50 bg-card/60 p-6">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {`"${review.text}"`}
                  </p>
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
              Ready to Create Your {document.title}?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {hasActiveSubscription ? (
                <>
                  Answer a few AI-powered questions and download your professionally
                  crafted, legally compliant document in minutes. <span className="text-accent font-semibold">Free with your subscription!</span>
                </>
              ) : (
                <>
                  Answer a few AI-powered questions, pay ${document.price}.99, and download your professionally
                  crafted, legally compliant document in minutes.
                </>
              )}
            </p>
            <Link href={`/documents/${slug}/generate`} className="mt-8 inline-block">
              <Button size="lg" className="gap-2 shadow-lg shadow-primary/20">
                {hasActiveSubscription ? (
                  <>
                    Generate Free {document.title.split(" ")[0]} Now
                    <Crown className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Generate My {document.title.split(" ")[0]} Now
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </Link>
          </div>
        </section>

        {/* Related Documents */}
        <section className="border-t border-border/40 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Explore More Documents
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">
                You Might Also <span className="gradient-text">Be Interested In</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Browse other {document.category === "business" ? "business" : document.category === "employment" ? "employment" : document.category === "real-estate" ? "real estate" : "personal"} documents that might suit your needs.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {documentTypes
                .filter((doc) => doc.category === document.category && doc.slug !== slug)
                .slice(0, 3)
                .map((relatedDoc) => {
                  const RelatedIcon = relatedDoc.icon
                  const isRelatedAccent = relatedDoc.color === "accent"
                  return (
                    <Link
                      key={relatedDoc.slug}
                      href={`/documents/${relatedDoc.slug}`}
                      className="group flex items-start gap-4 rounded-2xl border border-border/50 bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                    >
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                          isRelatedAccent
                            ? "border border-accent/20 bg-accent/10"
                            : "border border-primary/20 bg-primary/10"
                        }`}
                      >
                        <RelatedIcon
                          className={`h-6 w-6 ${isRelatedAccent ? "text-accent" : "text-primary"}`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2 flex-wrap">
                          <h3 className="font-semibold text-foreground leading-tight">{relatedDoc.title}</h3>
                          {relatedDoc.popular && (
                            <Badge
                              variant="outline"
                              className="gap-1 border-primary/30 bg-primary/10 text-xs text-primary shrink-0"
                            >
                              <Star className="h-2.5 w-2.5" />
                              Popular
                            </Badge>
                          )}
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                          {relatedDoc.description}
                        </p>
                        <div className="mt-3 flex items-center gap-2 text-sm">
                          {hasActiveSubscription ? (
                            <Badge variant="outline" className="gap-1 border-accent/30 bg-accent/10 text-xs text-accent">
                              <Crown className="h-3 w-3" />
                              Free
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

            {documentTypes.filter((doc) => doc.category === document.category && doc.slug !== slug).length === 0 && (
              <div className="mt-12 text-center">
                <p className="text-muted-foreground">No other documents in this category yet.</p>
                <Link href="/documents" className="mt-4 inline-block">
                  <Button variant="outline" className="gap-2">
                    Browse All Documents
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

