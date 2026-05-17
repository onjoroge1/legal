import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  Briefcase,
  Users,
  Home,
  Landmark,
  CreditCard,
  Mail,
  BookOpen,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Legal Guides & Blog — LegalLawDocs.com",
  description:
    "In-depth legal guides on contracts, lease agreements, employment law, estate planning, and more. Written in plain language for individuals and small businesses.",
}

const categories = [
  {
    icon: Briefcase,
    title: "Business Contracts",
    description:
      "NDAs, partnership agreements, LLC operating agreements, service contracts, and more.",
    href: "#",
    count: "Coming soon",
  },
  {
    icon: Users,
    title: "Employment Law",
    description:
      "Employment contracts, offer letters, termination agreements, and HR policy guides.",
    href: "#",
    count: "Coming soon",
  },
  {
    icon: Home,
    title: "Real Estate",
    description:
      "Lease agreements, rental applications, property management, and landlord-tenant law.",
    href: "#",
    count: "Coming soon",
  },
  {
    icon: Landmark,
    title: "Estate Planning",
    description:
      "Wills, trusts, power of attorney, healthcare directives, and probate basics.",
    href: "#",
    count: "Coming soon",
  },
  {
    icon: CreditCard,
    title: "Personal Finance",
    description:
      "Loan agreements, promissory notes, bill of sale, and personal financial documents.",
    href: "#",
    count: "Coming soon",
  },
  {
    icon: Mail,
    title: "Legal Letters",
    description:
      "Demand letters, cease and desist, debt collection, and formal correspondence.",
    href: "#",
    count: "Coming soon",
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-primary/5 to-background">
          <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                Legal Knowledge Base
              </div>
              <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
                Legal Guides &amp; Blog
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Plain-language guides on contracts, leases, employment law, estate planning, and
                more — written to help you understand your legal options without needing a law degree.
              </p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
          <div className="mb-10">
            <h2 className="font-serif text-2xl font-bold text-foreground">Browse by category</h2>
            <p className="mt-2 text-muted-foreground">
              Select a topic area to explore guides and articles.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.title}
                href={category.href}
                className="group rounded-2xl border border-border/50 bg-card/60 p-6 transition-all hover:border-primary/40 hover:bg-card hover:shadow-md"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 transition-colors group-hover:bg-primary/20">
                  <category.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {category.description}
                </p>
                <div className="mt-4">
                  <span className="inline-flex items-center rounded-full border border-border/50 bg-secondary/50 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                    {category.count}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Empty state / coming soon */}
        <section className="border-t border-border/40 bg-card/40">
          <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-xl text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-border/50 bg-card">
                <BookOpen className="h-7 w-7 text-muted-foreground" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-foreground">Articles coming soon</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                We&apos;re writing in-depth guides on contracts, lease agreements, employment law,
                estate planning, and more. Our legal content team is hard at work — check back soon.
              </p>
              <div className="mt-8 inline-flex items-center gap-2 rounded-2xl border border-primary/30 bg-primary/5 px-6 py-3 text-sm text-primary">
                <span className="font-medium">Want to be notified?</span>
                <Link href="/signup" className="underline underline-offset-4 hover:text-primary/80">
                  Create a free account
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
