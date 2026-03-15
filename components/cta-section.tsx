import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield } from "lucide-react"

export function CtaSection() {
  return (
    <section className="border-t border-border/50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 p-1">
          {/* Gradient border effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />

          <div className="relative rounded-[calc(1.5rem-4px)] bg-card p-12 text-center md:p-20">
            {/* Glowing orbs */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/4 top-1/2 h-[300px] w-[400px] -translate-y-1/2 rounded-full bg-primary/6 blur-[100px] animate-glow-pulse" />
              <div className="absolute right-1/4 top-1/3 h-[250px] w-[350px] rounded-full bg-accent/5 blur-[80px] animate-glow-pulse stagger-3" />
            </div>

            {/* Grid pattern */}
            <div className="pointer-events-none absolute inset-0 grid-pattern opacity-[0.03]" />

            <div className="relative">
              <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10">
                <Shield className="h-8 w-8 text-primary" />
              </div>

              <h2 className="text-balance font-serif text-3xl font-bold md:text-4xl lg:text-5xl">
                <span className="text-foreground">Start Creating Legal</span>
                <br />
                <span className="gradient-text">Documents Today</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                Join thousands of businesses and individuals who trust LegalLawDocs
                for professional, state-compliant legal documentation.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" className="gap-2 px-8 text-base shadow-lg shadow-primary/20" asChild>
                  <Link href="/signup">
                    Get Started Free
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="bg-transparent px-8 text-base border-border/80 hover:border-primary/40 hover:bg-primary/5" asChild>
                  <Link href="/contact">
                    Schedule a Demo
                  </Link>
                </Button>
              </div>
              <p className="mt-7 text-sm text-muted-foreground">
                No credit card required. Your first document is free.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
