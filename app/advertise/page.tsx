import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  Users,
  CheckCircle2,
  TrendingUp,
  Star,
  Zap,
  MapPin,
  BarChart2,
  BadgeCheck,
  ArrowRight,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Advertise to Legal Document Users — LegalLawDocs.com",
  description:
    "Apply for the LegalLawDocs directory pilot. Listing availability, placement, pricing, review criteria, and terms are confirmed in writing before publication.",
}

const valueProps = [
  {
    icon: TrendingUp,
    title: "Contextual discovery",
    description:
      "Approved directory profiles may be shown near relevant document categories. Placement and traffic depend on availability and are not guaranteed.",
  },
  {
    icon: MapPin,
    title: "Contextual placement",
    description:
      "Profiles can be tagged by practice area and location so users can browse relevant listings. Listings are advertising profiles, not endorsements.",
  },
  {
    icon: Zap,
    title: "No performance promise",
    description:
      "We do not promise impressions, clicks, leads, clients, exclusivity, or a return on spend. Any pilot price and included reporting are disclosed before acceptance.",
  },
]

const tiers = [
  {
    name: "Directory Pilot",
    price: "Contact us",
    period: "subject to written pilot terms",
    featured: false,
    description: "Apply for a reviewed advertising profile in the directory.",
    features: [
      "Name, practice area & location",
      "Website and contact links when approved",
      "Clearly labeled profile",
      "No guaranteed traffic or leads",
    ],
  },
]

const steps = [
  {
    step: "01",
    title: "Submit your listing",
    description:
      "Fill out a short intake form with your firm details, practice areas, location, and preferred tier. Takes about five minutes.",
  },
  {
    step: "02",
    title: "Administrative review",
    description:
      "We review the submitted profile and may request supporting information. Applicants remain responsible for accurate claims and active credentials.",
  },
  {
    step: "03",
    title: "Confirm terms before publication",
    description:
      "If accepted, placement, price, duration, cancellation terms, and available reporting are confirmed in writing before a profile is published.",
  },
]

const audiences = [
  { icon: BadgeCheck, label: "Attorneys & Law Firms" },
  { icon: Users, label: "Legal Document Preparers" },
  { icon: CheckCircle2, label: "Notaries" },
  { icon: Star, label: "Paralegal Services" },
  { icon: BarChart2, label: "Legal Aid Organizations" },
]

const faqs = [
  {
    q: "Is my listing reviewed before going live?",
    a: "Applications receive an administrative review, but LegalLawDocs does not guarantee independent verification of every credential or claim. Applicants must provide accurate information, and users are told to confirm license status with the relevant authority.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Cancellation and renewal terms depend on the written pilot agreement presented before publication. Do not rely on this page as a binding offer.",
  },
  {
    q: "What practice areas do you support?",
    a: "Applications can identify supported practice-area tags. Acceptance and placement depend on directory coverage and available categories.",
  },
  {
    q: "How do I track performance?",
    a: "No reporting is promised on this page. If metrics are available for a pilot, the exact measures and delivery schedule will be described in the written terms.",
  },
]

export default function AdvertisePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-primary/5 to-background">
          <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                Advertise on LegalLawDocs.com
              </div>
              <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
                Apply for a clearly labeled{" "}
                <span className="text-primary">directory profile</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Apply for a pilot listing in the LegalLawDocs directory. We will confirm eligibility,
                available placement, labeling, pricing, duration, and reporting in writing before
                anything is published. We do not guarantee traffic, leads, or clients.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/contact?subject=Advertise+on+LegalLawDocs">
                    Apply for the Pilot <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/lawyers">View the Directory</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why advertise here */}
        <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground">
              Why advertise here?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Directory profiles can help users discover professionals by location and practice area.
              Results vary, and every profile is presented as advertising rather than an endorsement.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {valueProps.map((prop) => (
              <div
                key={prop.title}
                className="rounded-2xl border border-border/50 bg-card/60 p-6"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                  <prop.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground">{prop.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {prop.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Tiers */}
        <section className="border-y border-border/40 bg-card/40">
          <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold text-foreground">
                Advertising options
              </h2>
              <p className="mt-3 text-muted-foreground">
                The directory is in a pilot stage. This page is an invitation to apply, not a binding
                offer or a promise of placement.
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-lg gap-6">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`relative rounded-2xl border p-6 ${
                    tier.featured
                      ? "border-primary bg-card shadow-lg shadow-primary/10 lg:scale-105"
                      : "border-border/50 bg-card/60"
                  }`}
                >
                  {tier.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="mb-4">
                    <h3 className="font-serif text-lg font-semibold text-foreground">{tier.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{tier.description}</p>
                  </div>
                  <div className="mb-6 flex items-baseline gap-1">
                    <span className="font-serif text-4xl font-bold text-foreground">{tier.price}</span>
                    <span className="text-sm text-muted-foreground">{tier.period}</span>
                  </div>
                  <ul className="mb-6 space-y-2.5">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    variant={tier.featured ? "default" : "outline"}
                    className="w-full"
                  >
                    <Link
                      href={`/contact?subject=Advertise+on+LegalLawDocs+-+${encodeURIComponent(tier.name)}`}
                    >
                      Get Started
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground">How it works</h2>
            <p className="mt-3 text-muted-foreground">
              Applications are reviewed in sequence. Timing depends on the completeness of the
              submission and available directory capacity.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {steps.map((item) => (
              <div
                key={item.step}
                className="relative rounded-2xl border border-border/50 bg-card/60 p-6"
              >
                <div className="mb-4 font-serif text-4xl font-bold text-primary/20">{item.step}</div>
                <h3 className="font-serif text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Who this is for */}
        <section className="border-y border-border/40 bg-card/40">
          <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold text-foreground">Who this is for</h2>
              <p className="mt-3 text-muted-foreground">
                Licensed or credentialed legal professionals and service providers may apply.
                Submission does not guarantee acceptance.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {audiences.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2.5 rounded-full border border-border/50 bg-card/60 px-5 py-2.5"
                >
                  <item.icon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground">
              Frequently asked questions
            </h2>
          </div>
          <div className="mx-auto mt-12 max-w-3xl space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-2xl border border-border/50 bg-card/60 p-6"
              >
                <h3 className="font-serif text-base font-semibold text-foreground">{faq.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border/40 bg-gradient-to-b from-primary/5 to-background">
          <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold text-foreground">Ready to get listed?</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Submit an application for the directory pilot. We will provide the proposed terms
                before asking you to approve or pay for a listing.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/contact?subject=Advertise+on+LegalLawDocs">
                    Apply for the Pilot <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/lawyers">View the Directory</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
