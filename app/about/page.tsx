import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Shield, Lock, Globe, Users, Lightbulb, Heart, Linkedin } from "lucide-react"

export const metadata: Metadata = {
  title: "About LegalLawDocs.com — AI-Powered Legal Document Drafting",
  description:
    "Learn how LegalLawDocs.com was built to make legal document drafting accessible without expensive attorney fees. Meet founder Obadiah Kimani and our mission.",
}

/**
 * Structured data — adds verifiable Organization + founder Person entities
 * for Google's E-E-A-T signals on this YMYL page. Renders inline below.
 */
const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.legallawdocs.com/#organization",
      name: "LegalLawDocs.com",
      url: "https://www.legallawdocs.com",
      description:
        "AI-powered legal document drafting platform. Not a law firm — drafts should be reviewed by a qualified attorney before signing.",
      founder: {
        "@id": "https://www.legallawdocs.com/about#founder",
      },
    },
    {
      "@type": "Person",
      "@id": "https://www.legallawdocs.com/about#founder",
      name: "Obadiah Kimani",
      jobTitle: "Founder",
      worksFor: {
        "@id": "https://www.legallawdocs.com/#organization",
      },
      sameAs: ["https://www.linkedin.com/in/obadiah-njoroge-93103246/"],
    },
    {
      "@type": "AboutPage",
      url: "https://www.legallawdocs.com/about",
      isPartOf: {
        "@id": "https://www.legallawdocs.com/#organization",
      },
    },
  ],
}

const trustSignals = [
  {
    icon: Lock,
    label: "256-bit SSL",
    description: "All data encrypted in transit and at rest.",
  },
  {
    icon: Shield,
    label: "SOC 2 Compliant",
    description: "Independently audited security controls.",
  },
  {
    icon: Globe,
    label: "GDPR Ready",
    description: "Your data rights respected globally.",
  },
]

const values = [
  {
    icon: Users,
    title: "Accessible Justice",
    description:
      "Legal protection shouldn't be a luxury. We believe every individual and small business deserves access to professionally structured legal documents — regardless of budget.",
  },
  {
    icon: Lightbulb,
    title: "AI-Powered Document Assembly",
    description:
      "Our AI compiles drafts from state-aware templates and is updated as state and federal law evolves. We give you a strong first draft — your attorney can take it from there.",
  },
  {
    icon: Heart,
    title: "Transparency First",
    description:
      "We're clear about what we are: a self-help legal document service. We're not a law firm. We never pretend otherwise — and we always encourage you to consult an attorney for complex matters.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Structured data: Organization + founder Person — improves YMYL E-E-A-T signals */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-primary/5 to-background">
          <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                Our Story
              </div>
              <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
                Legal protection for everyone,{" "}
                <span className="text-primary">not just the privileged few</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                LegalLawDocs.com was built by a team who watched friends, family, and small business
                owners get burned — not because they ignored legal protection, but because they
                couldn't afford it. We set out to change that.
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground">Our mission</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                A standard attorney consultation costs $250–$500 per hour. A simple NDA or lease
                agreement can run $500–$2,000 to have drafted. For a freelancer, startup founder, or
                landlord managing a single property, that's simply out of reach.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Our mission is to close that gap. By combining advanced AI with state-aware document
                templates, we compile professional first drafts in minutes — for a fraction of
                traditional legal costs. We&apos;re a software tool, not a law firm, and we always
                recommend you have an attorney review anything important before signing.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Every template on our platform is built from publicly available legal frameworks
                and statutory references, updated as law evolves, and structured to give you a
                strong starting point for your situation.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {trustSignals.map((signal) => (
                <div
                  key={signal.label}
                  className="rounded-2xl border border-border/50 bg-card/60 p-5 text-center"
                >
                  <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                    <signal.icon className="h-5 w-5 text-primary" />
                  </div>
                  <p className="font-semibold text-foreground">{signal.label}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{signal.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-y border-border/40 bg-card/40">
          <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold text-foreground">How it works</h2>
              <p className="mt-3 text-muted-foreground">
                Professional documents in three steps — no legal expertise required.
              </p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Choose your document",
                  description:
                    "Browse over 100 state-aware document templates across business, employment, real estate, estate planning, and more.",
                },
                {
                  step: "02",
                  title: "Answer simple questions",
                  description:
                    "Our AI walks you through a guided questionnaire. Plain-language questions, no legal jargon. Takes 5–10 minutes.",
                },
                {
                  step: "03",
                  title: "Download and use",
                  description:
                    "Receive a professionally formatted document in PDF and DOCX formats, ready to sign or customize further.",
                },
              ].map((item) => (
                <div key={item.step} className="relative rounded-2xl border border-border/50 bg-card/60 p-6">
                  <div className="mb-4 font-serif text-4xl font-bold text-primary/20">{item.step}</div>
                  <h3 className="font-serif text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Founding story */}
        <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl font-bold text-foreground">The founding story</h2>
            <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
              <p>
                LegalLawDocs.com was founded with one clear belief: that access to basic legal
                document drafting is a right, not a privilege. The founder had seen firsthand how
                costly it was for small business owners, freelancers, landlords, and families to
                get even the most routine documents put together.
              </p>
              <p>
                A freelance designer who signed a client contract without an NDA lost a six-figure
                concept to a larger company. A first-time landlord who used a generic template
                found it unenforceable in their state. A family that put off estate planning paid
                thousands in probate fees that could have been avoided with a simple will.
              </p>
              <p>
                We built LegalLawDocs.com to be the answer to those situations — affordable,
                fast, and state-aware. We&apos;re a software tool, not a law firm, and we&apos;ll
                always recommend a licensed attorney review anything important before you sign.
              </p>
            </div>
          </div>
        </section>

        {/* Meet the founder — adds real, verifiable E-E-A-T signal for YMYL */}
        <section className="border-t border-border/40 bg-card/30">
          <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-3xl">
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                  Meet the founder
                </p>
                <h2 className="mt-3 font-serif text-3xl font-bold text-foreground">
                  Built and run by Obadiah Kimani
                </h2>
              </div>

              <div className="mt-10 rounded-2xl border border-border/50 bg-card/60 p-6 sm:p-10">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                  {/* Avatar placeholder — initials in a circle (swap for a real headshot when available) */}
                  <div className="mx-auto sm:mx-0 flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-2xl font-bold text-primary">
                    OK
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-serif text-2xl font-bold text-foreground">
                      Obadiah Kimani
                    </h3>
                    <p className="mt-1 text-sm font-medium text-primary">
                      Founder, LegalLawDocs.com
                    </p>
                    <p className="mt-4 leading-relaxed text-muted-foreground">
                      Obadiah built LegalLawDocs to make professional document drafting accessible
                      to people who can&apos;t justify $500&ndash;$2,000 in attorney fees just to get
                      a first draft on paper. He runs the product, engineering, and customer side
                      personally &mdash; every email goes to a human.
                    </p>
                    <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                      <Link
                        href="https://www.linkedin.com/in/obadiah-njoroge-93103246/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5"
                      >
                        <Linkedin className="h-4 w-4 text-[#0a66c2]" />
                        Connect on LinkedIn
                      </Link>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5"
                      >
                        Get in touch
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="border-t border-border/40 bg-gradient-to-b from-card/40 to-background">
          <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold text-foreground">Our values</h2>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="rounded-2xl border border-border/50 bg-card/60 p-6"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 border border-accent/20">
                    <value.icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
