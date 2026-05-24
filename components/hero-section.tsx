import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Shield,
  Zap,
  FileText,
  CheckCircle2,
  Scale,
  MapPin,
  Calendar,
  Lock,
  Download,
  Eye,
} from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/hero-legal.jpg"
          alt=""
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
      </div>

      {/* Animated grid pattern */}
      <div className="pointer-events-none absolute inset-0 grid-pattern animate-grid-fade" />

      {/* Glowing orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-20 h-[500px] w-[500px] rounded-full bg-primary/8 blur-[120px] animate-glow-pulse" />
        <div className="absolute right-1/4 top-40 h-[400px] w-[400px] rounded-full bg-accent/6 blur-[100px] animate-glow-pulse stagger-3" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-24 lg:px-8 lg:pt-36 lg:pb-32">
        <div className="flex flex-col items-center text-center">
          <Badge
            variant="outline"
            className="animate-slide-up mb-8 gap-2 border-primary/40 bg-primary/10 px-5 py-2 text-sm text-primary"
          >
            <Zap className="h-3.5 w-3.5" />
            AI-Powered Legal Documents
            <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          </Badge>

          <h1 className="animate-slide-up stagger-1 max-w-5xl font-serif text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
            <span className="text-foreground">Professional Legal</span>
            <br />
            <span className="gradient-text">Documents in Minutes</span>
          </h1>

          <p className="animate-slide-up stagger-2 mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            Generate legally compliant documents using advanced AI technology.
            Our platform automatically adapts to your state&apos;s legal requirements,
            ensuring every document meets compliance standards.
          </p>

          <div className="animate-slide-up stagger-3 mt-12 flex flex-col gap-4 sm:flex-row">
            <Link href="/documents">
              <Button size="lg" className="gap-2 px-8 text-base shadow-lg shadow-primary/20">
                Start Creating Documents
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/documents">
              <Button variant="outline" size="lg" className="gap-2 bg-transparent px-8 text-base border-border/80 hover:border-primary/40 hover:bg-primary/5">
                View Document Library
              </Button>
            </Link>
          </div>

          {/* Trust indicators with icons */}
          <div className="animate-slide-up stagger-4 mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            <div className="flex items-center gap-2.5 rounded-full border border-border/50 bg-card/60 px-4 py-2">
              <Shield className="h-4 w-4 text-accent" />
              <span className="text-sm text-muted-foreground">State-Specific Compliance</span>
            </div>
            <div className="flex items-center gap-2.5 rounded-full border border-border/50 bg-card/60 px-4 py-2">
              <FileText className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">50+ Document Templates</span>
            </div>
            <div className="flex items-center gap-2.5 rounded-full border border-border/50 bg-card/60 px-4 py-2">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Generated in Under 2 Minutes</span>
            </div>
          </div>
        </div>

        {/* Hero visual - NDA California Document Preview */}
        <div className="animate-slide-up stagger-5 mx-auto mt-20 max-w-5xl">
          <div className="animate-border-glow overflow-hidden rounded-2xl border border-primary/20 bg-card/90 shadow-2xl shadow-primary/10 backdrop-blur-sm">

            {/* Toolbar */}
            <div className="flex items-center justify-between border-b border-border/60 bg-secondary/60 px-4 py-3 md:px-6">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-destructive/70" />
                <div className="h-3 w-3 rounded-full bg-primary/70" />
                <div className="h-3 w-3 rounded-full bg-accent/70" />
                <div className="ml-2 hidden items-center gap-2 rounded-md bg-muted/60 px-3 py-1.5 sm:flex">
                  <FileText className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-medium text-foreground/80">
                    NDA_California_2026.pdf
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="border-accent/30 bg-accent/15 text-xs text-accent" variant="outline">
                  <CheckCircle2 className="mr-1 h-3 w-3" />
                  CA Compliant
                </Badge>
                <div className="hidden items-center gap-1.5 rounded-md border border-border/50 bg-muted/40 px-2.5 py-1.5 sm:flex">
                  <Eye className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Preview</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1.5">
                  <Download className="h-3 w-3 text-primary" />
                  <span className="text-xs font-medium text-primary">Export</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row">
              {/* Main document body */}
              <div className="flex-1 p-6 md:p-10">
                {/* Document header */}
                <div className="mb-8 border-b border-border/40 pb-8">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Scale className="h-5 w-5 text-primary" />
                        <span className="text-xs font-semibold uppercase tracking-widest text-primary">Confidential</span>
                      </div>
                      <h3 className="mt-3 font-serif text-2xl font-bold text-foreground md:text-3xl">
                        Non-Disclosure Agreement
                      </h3>
                      <p className="mt-1.5 flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 text-accent" />
                        State of California
                        <span className="text-border">|</span>
                        <Calendar className="h-3.5 w-3.5 text-accent" />
                        Effective Date: February 8, 2026
                      </p>
                    </div>
                    <div className="hidden shrink-0 rounded-lg border border-primary/20 bg-primary/5 p-3 md:block">
                      <Shield className="h-7 w-7 text-primary" />
                    </div>
                  </div>
                </div>

                {/* Clause sections */}
                <div className="space-y-6">
                  {/* Section 1 */}
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/15 text-xs font-bold text-primary">1</span>
                      <h4 className="text-sm font-semibold text-foreground">Definition of Confidential Information</h4>
                    </div>
                    <p className="mt-2.5 pl-8 text-sm leading-relaxed text-muted-foreground">
                      {'"Confidential Information" shall mean any and all non-public information, including but not limited to trade secrets as defined under the California Uniform Trade Secrets Act (Cal. Civ. Code \u00A7 3426 et seq.), proprietary data, business strategies, financial records...'}
                    </p>
                  </div>

                  {/* Section 2 */}
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent/15 text-xs font-bold text-accent">2</span>
                      <h4 className="text-sm font-semibold text-foreground">Obligations of Receiving Party</h4>
                    </div>
                    <p className="mt-2.5 pl-8 text-sm leading-relaxed text-muted-foreground">
                      {'The Receiving Party agrees to: (a) hold the Confidential Information in strict confidence; (b) not disclose it to any third parties without prior written consent; (c) use the Confidential Information solely for the purposes outlined herein...'}
                    </p>
                  </div>

                  {/* Section 3 */}
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/15 text-xs font-bold text-primary">3</span>
                      <h4 className="text-sm font-semibold text-foreground">Term & California-Specific Provisions</h4>
                    </div>
                    <p className="mt-2.5 pl-8 text-sm leading-relaxed text-muted-foreground">
                      {'This Agreement shall remain in effect for a period of two (2) years from the Effective Date. Pursuant to California Business and Professions Code \u00A7 16600, nothing in this Agreement shall be construed to restrict the Receiving Party\u2019s right to engage in lawful competition...'}
                    </p>
                  </div>

                  {/* Signature block hint */}
                  <div className="mt-8 rounded-lg border border-dashed border-primary/25 bg-primary/5 px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-primary" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary">Digital Signature Block</span>
                    </div>
                    <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:gap-8">
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground">Disclosing Party</p>
                        <div className="mt-1.5 border-b border-primary/30 pb-1">
                          <span className="font-serif text-sm italic text-foreground/50">Signature...</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground">Receiving Party</p>
                        <div className="mt-1.5 border-b border-primary/30 pb-1">
                          <span className="font-serif text-sm italic text-foreground/50">Signature...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right sidebar - compliance metadata */}
              <div className="border-t border-border/40 bg-secondary/30 p-6 lg:w-72 lg:border-l lg:border-t-0">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Document Details
                </h4>
                <div className="mt-5 space-y-4">
                  <div className="rounded-lg border border-border/40 bg-card/60 p-3">
                    <p className="text-xs text-muted-foreground">Jurisdiction</p>
                    <p className="mt-0.5 text-sm font-medium text-foreground">California, USA</p>
                  </div>
                  <div className="rounded-lg border border-border/40 bg-card/60 p-3">
                    <p className="text-xs text-muted-foreground">Document Type</p>
                    <p className="mt-0.5 text-sm font-medium text-foreground">Mutual NDA</p>
                  </div>
                  <div className="rounded-lg border border-border/40 bg-card/60 p-3">
                    <p className="text-xs text-muted-foreground">Governing Law</p>
                    <p className="mt-0.5 text-sm font-medium text-foreground">Cal. Civ. Code</p>
                  </div>
                </div>

                {/* Compliance checklist */}
                <h4 className="mt-8 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Compliance Checks
                </h4>
                <div className="mt-4 space-y-2.5">
                  {[
                    "CA Trade Secrets Act",
                    "Bus. & Prof. Code \u00A716600",
                    "CCPA Data Standards",
                    "Digital Signature Valid",
                    "Non-Compete Compliant",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                      <span className="text-xs text-secondary-foreground">{item}</span>
                    </div>
                  ))}
                </div>

                {/* AI confidence score */}
                <div className="mt-8 rounded-lg border border-accent/20 bg-accent/5 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-accent">AI Confidence</span>
                    <span className="text-lg font-bold text-accent">98%</span>
                  </div>
                  <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-[98%] rounded-full bg-accent" />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    All California-specific provisions verified
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom status bar */}
            <div className="flex items-center justify-between border-t border-border/40 bg-secondary/40 px-4 py-2.5 md:px-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  <span className="text-xs text-muted-foreground">All checks passed</span>
                </div>
                <span className="hidden text-xs text-muted-foreground/50 sm:inline">|</span>
                <span className="hidden text-xs text-muted-foreground sm:inline">3 pages</span>
                <span className="text-xs text-muted-foreground/50">|</span>
                <span className="text-xs text-muted-foreground">Last updated: just now</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">AES-256 Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
