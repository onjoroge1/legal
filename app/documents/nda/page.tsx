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
} from "lucide-react"

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

export default function NdaDetailPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/30 bg-primary/15">
              <Scale className="h-4 w-4 text-primary" />
            </div>
            <span className="font-serif text-xl font-bold text-foreground">
              Legal<span className="text-primary">Law</span>Docs
            </span>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

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
                <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary">
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Document Library
                </Link>

                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <Badge className="gap-1 border-primary/30 bg-primary/10 text-primary" variant="outline">
                    <Sparkles className="h-3 w-3" />
                    AI-Powered
                  </Badge>
                  <Badge className="gap-1 border-accent/30 bg-accent/10 text-accent" variant="outline">
                    <Shield className="h-3 w-3" />
                    Legally Compliant
                  </Badge>
                  <Badge className="gap-1 border-border bg-secondary text-secondary-foreground" variant="outline">
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    4.9/5 Rating
                  </Badge>
                </div>

                <h1 className="mt-5 font-serif text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
                  Non-Disclosure<br />
                  <span className="gradient-text">Agreement</span>
                </h1>

                <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                  Generate a professional, legally binding NDA tailored to your specific needs.
                  Our AI asks smart questions to customize every clause to your situation and
                  state requirements.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Link href="/documents/nda/checkout">
                    <Button size="lg" className="gap-2 shadow-lg shadow-primary/20">
                      Generate My NDA
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <span className="text-2xl font-bold text-foreground">19.99</span>
                    <span className="text-sm text-muted-foreground">per document</span>
                  </div>
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
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">NDA Template</h3>
                        <p className="text-xs text-muted-foreground">Mutual or Unilateral</p>
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
                        { icon: Users, text: "Mutual or unilateral options", color: "text-accent" },
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
                        <p className="text-xs text-muted-foreground">One-time payment</p>
                        <p className="text-2xl font-bold text-foreground">$19.99</p>
                      </div>
                      <Link href="/documents/nda/checkout">
                        <Button className="gap-2 shadow-md shadow-primary/20">
                          Get Started
                          <ArrowRight className="h-4 w-4" />
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
                {"What's Included in Your NDA"}
              </h2>
              <p className="mt-4 text-muted-foreground">
                Every NDA generated by our AI includes these essential sections, customized to your needs.
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
                  Our AI automatically adapts your NDA to include state-specific provisions,
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
                    California NDAs reference Cal. Civ. Code and Bus. & Prof. Code. New York NDAs include
                    NY Gen. Bus. Law provisions. Every state has unique requirements, and we cover them all.
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
              Ready to Create Your NDA?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Answer a few AI-powered questions, pay $19.99, and download your professionally
              crafted, legally compliant NDA in minutes.
            </p>
            <Link href="/documents/nda/checkout" className="mt-8 inline-block">
              <Button size="lg" className="gap-2 shadow-lg shadow-primary/20">
                Generate My NDA Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
