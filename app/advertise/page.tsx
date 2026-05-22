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
    "List your law firm or legal services on LegalLawDocs.com and reach high-intent users actively generating legal documents. Fixed monthly rates, no pay-per-click.",
}

const valueProps = [
  {
    icon: TrendingUp,
    title: "High-intent audience",
    description:
      "Users on LegalLawDocs.com are actively generating legal documents right now. They already know they have a legal need — they're not browsing, they're acting. That puts them at the bottom of the funnel before they ever see your listing.",
  },
  {
    icon: MapPin,
    title: "Contextual placement",
    description:
      "Your listing appears alongside the documents most relevant to your practice area. An estate planning attorney gets featured near wills and power of attorney pages. A landlord-tenant specialist appears next to lease agreements. Relevance, not randomness.",
  },
  {
    icon: Zap,
    title: "No pay-per-click waste",
    description:
      "Fixed monthly listing fee. Unlimited impressions. No bidding wars, no surprise bills at the end of the month, no clicks from people who had no intention of hiring anyone. Just your firm in front of the right people, every day.",
  },
]

const tiers = [
  {
    name: "Basic Directory Listing",
    price: "$49",
    period: "/mo",
    featured: false,
    description: "Get found in our growing lawyers directory.",
    features: [
      "Name, practice area & location",
      "Website link",
      "Listed in the /lawyers directory",
      "Basic dashboard stats",
    ],
  },
  {
    name: "Featured Listing",
    price: "$149",
    period: "/mo",
    featured: true,
    description: "Stand out with a rich, complete profile.",
    features: [
      "Everything in Basic",
      "Priority placement in directory",
      "Professional photo",
      "Bio up to 200 words",
      "Phone number & email link",
      "Basic dashboard stats",
    ],
  },
  {
    name: "Premium Partner",
    price: "$349",
    period: "/mo",
    featured: false,
    description: "Maximum visibility — on the directory and on document pages.",
    features: [
      "Everything in Featured",
      "Contextual placement on relevant document pages",
      '"Reviewed by [Name]" badge on generated docs',
      "Monthly analytics report (impressions + clicks)",
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
    title: "Review within 24 hours",
    description:
      "Our team verifies your credentials and bar membership before your listing goes live. We keep the directory high-quality so every lead is worth your time.",
  },
  {
    step: "03",
    title: "Go live and start getting leads",
    description:
      "Your listing is published and immediately visible to users generating documents in your practice area and geography.",
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
    a: "Yes. Every listing is manually reviewed by our team within 24 hours of submission. We verify practice area claims and bar membership where applicable to keep the directory trustworthy for users and valuable for advertisers.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. All plans are month-to-month with no long-term commitment. You can cancel before your next billing cycle and your listing will remain active until the end of the period you've already paid for.",
  },
  {
    q: "What practice areas do you support?",
    a: "All of them. Our document library spans family law, estate planning, business formation, employment, real estate, intellectual property, and more. Whatever your specialty, there are users generating documents in your area right now.",
  },
  {
    q: "How do I track performance?",
    a: "Premium Partners receive a monthly analytics email with impression and click data for their listing and document-page placements. Basic and Featured listings have access to a simple dashboard showing profile views and link clicks.",
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
                Reach clients when they need{" "}
                <span className="text-primary">legal help most</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                LegalLawDocs.com serves 50,000+ document generations per month. Every one of those
                users has already identified a legal need and is actively doing something about it.
                List your firm in our lawyers directory and put your name in front of that audience —
                at the exact moment they realize they need professional help.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/contact?subject=Advertise+on+LegalLawDocs">
                    Get Listed Now <ArrowRight className="ml-2 h-4 w-4" />
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
              Most legal advertising puts your ad in front of people who might someday need a
              lawyer. We put you in front of people who need one right now.
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
                Three tiers to match your goals and budget. All plans are month-to-month.
              </p>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:items-start">
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
              From submission to live listing in as little as one business day.
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
                Any licensed or credentialed legal professional or service provider is welcome to
                apply.
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
                Join attorneys and legal service providers already reaching high-intent clients on
                LegalLawDocs.com. Choose your tier and submit your listing today.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/contact?subject=Advertise+on+LegalLawDocs">
                    Get Listed Now <ArrowRight className="ml-2 h-4 w-4" />
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
