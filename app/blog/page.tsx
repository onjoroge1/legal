import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { blogPosts } from "@/lib/blog-posts"
import {
  Briefcase,
  Users,
  Home,
  Landmark,
  CreditCard,
  Mail,
  Clock,
  CalendarDays,
  ArrowRight,
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
    href: "#posts",
    count: blogPosts.filter((p) => p.category === "Business").length,
  },
  {
    icon: Users,
    title: "Employment Law",
    description:
      "Employment contracts, offer letters, termination agreements, and HR policy guides.",
    href: "#posts",
    count: blogPosts.filter((p) => p.category === "Employment Law").length,
  },
  {
    icon: Home,
    title: "Real Estate",
    description:
      "Lease agreements, rental applications, property management, and landlord-tenant law.",
    href: "#posts",
    count: blogPosts.filter((p) => p.category === "Real Estate").length,
  },
  {
    icon: Landmark,
    title: "Estate Planning",
    description:
      "Wills, trusts, power of attorney, healthcare directives, and probate basics.",
    href: "#posts",
    count: blogPosts.filter((p) => p.category === "Estate Planning").length,
  },
  {
    icon: CreditCard,
    title: "Personal Finance",
    description:
      "Loan agreements, promissory notes, bill of sale, and personal financial documents.",
    href: "#posts",
    count: blogPosts.filter((p) => p.category === "Personal Finance").length,
  },
  {
    icon: Mail,
    title: "Legal Letters",
    description:
      "Demand letters, cease and desist, debt collection, and formal correspondence.",
    href: "#posts",
    count: blogPosts.filter((p) => p.category === "Legal Letters").length,
  },
]

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

const categoryBadgeColors: Record<string, string> = {
  "Employment Law": "bg-blue-500/10 text-blue-600 border-blue-500/20",
  Business: "bg-violet-500/10 text-violet-600 border-violet-500/20",
  "Real Estate": "bg-green-500/10 text-green-600 border-green-500/20",
  "Estate Planning": "bg-amber-500/10 text-amber-600 border-amber-500/20",
  "Personal Finance": "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
  "Legal Letters": "bg-rose-500/10 text-rose-600 border-rose-500/20",
}

export default function BlogPage() {
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

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
                    {category.count > 0 ? `${category.count} article${category.count === 1 ? "" : "s"}` : "Coming soon"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Posts grid */}
        <section id="posts" className="border-t border-border/40 bg-card/40">
          <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
            <div className="mb-10">
              <h2 className="font-serif text-2xl font-bold text-foreground">Latest articles</h2>
              <p className="mt-2 text-muted-foreground">
                {sortedPosts.length} guides covering employment law, real estate, business contracts, and estate planning.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sortedPosts.map((post) => {
                const badgeClass =
                  categoryBadgeColors[post.category] ??
                  "bg-primary/10 text-primary border-primary/20"
                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col rounded-2xl border border-border/50 bg-card/60 p-6 transition-all hover:border-primary/40 hover:bg-card hover:shadow-md"
                  >
                    <div className="mb-3">
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${badgeClass}`}
                      >
                        {post.category}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                      {post.description}
                    </p>
                    <div className="mt-5 flex items-center justify-between border-t border-border/40 pt-4">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <CalendarDays className="h-3 w-3" />
                          {formatDate(post.publishedAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readingTimeMinutes} min
                        </span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
