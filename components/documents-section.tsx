"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  FileText,
  Building2,
  Users,
  Briefcase,
  Home,
  HandshakeIcon,
  ArrowRight,
  Sparkles,
} from "lucide-react"

const categories = [
  { id: "all", label: "All Documents" },
  { id: "business", label: "Business" },
  { id: "real-estate", label: "Real Estate" },
  { id: "employment", label: "Employment" },
  { id: "personal", label: "Personal" },
]

const documents = [
  {
    title: "Non-Disclosure Agreement",
    category: "business",
    icon: FileText,
    description: "Protect confidential information shared between parties.",
    popular: true,
    color: "primary" as const,
    slug: "/documents/non_disclosure_agreement",
  },
  {
    title: "LLC Operating Agreement",
    category: "business",
    icon: Building2,
    description: "Define ownership structure and operating procedures for your LLC.",
    popular: true,
    color: "accent" as const,
  },
  {
    title: "Employment Contract",
    category: "employment",
    icon: Briefcase,
    description: "Comprehensive employment agreements with state-specific provisions.",
    popular: false,
    color: "primary" as const,
  },
  {
    title: "Residential Lease Agreement",
    category: "real-estate",
    icon: Home,
    description: "Legally binding lease agreements compliant with local tenant laws.",
    popular: true,
    color: "accent" as const,
  },
  {
    title: "Independent Contractor Agreement",
    category: "employment",
    icon: Users,
    description: "Define the terms of engagement with freelancers and contractors.",
    popular: false,
    color: "primary" as const,
  },
  {
    title: "Partnership Agreement",
    category: "business",
    icon: HandshakeIcon,
    description: "Establish clear terms for business partnerships and profit sharing.",
    popular: false,
    color: "accent" as const,
  },
  {
    title: "Power of Attorney",
    category: "personal",
    icon: FileText,
    description: "Authorize someone to act on your behalf in legal or financial matters.",
    popular: true,
    color: "primary" as const,
  },
  {
    title: "Last Will & Testament",
    category: "personal",
    icon: FileText,
    description: "Protect your legacy with a state-compliant will document.",
    popular: false,
    color: "accent" as const,
  },
  {
    title: "Commercial Lease Agreement",
    category: "real-estate",
    icon: Building2,
    description: "Professional commercial property lease with full legal protections.",
    popular: false,
    color: "primary" as const,
  },
]

export function DocumentsSection() {
  const [activeCategory, setActiveCategory] = useState("all")

  const filtered =
    activeCategory === "all"
      ? documents
      : documents.filter((d) => d.category === activeCategory)

  return (
    <section id="documents" className="relative border-t border-border/50 py-24 lg:py-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-card/50 via-background to-card/50" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Document Library
          </p>
          <h2 className="mt-3 text-balance font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            50+ Legal Document <span className="gradient-text">Templates</span>
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
            From business formation to personal legal needs, we have you covered
            with professionally crafted, AI-enhanced templates.
          </p>
        </div>

        {/* Category pills */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "border border-border/60 bg-card text-secondary-foreground hover:border-primary/30 hover:bg-secondary"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Document cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((doc) => {
            const isAccent = doc.color === "accent"
            const hasSlug = "slug" in doc && doc.slug
            const Wrapper = hasSlug ? Link : "div"
            const wrapperProps = hasSlug ? { href: (doc as { slug: string }).slug } : {}
            return (
              <Wrapper
                key={doc.title}
                {...(wrapperProps as Record<string, string>)}
                className="group flex cursor-pointer items-start gap-4 rounded-2xl border border-border/50 bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    isAccent
                      ? "border border-accent/20 bg-accent/10"
                      : "border border-primary/20 bg-primary/10"
                  }`}
                >
                  <doc.icon
                    className={`h-5 w-5 ${isAccent ? "text-accent" : "text-primary"}`}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">
                      {doc.title}
                    </h3>
                    {doc.popular && (
                      <Badge
                        variant="outline"
                        className="gap-1 border-primary/30 bg-primary/10 text-xs text-primary"
                      >
                        <Sparkles className="h-2.5 w-2.5" />
                        Popular
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {doc.description}
                  </p>
                </div>
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-primary group-hover:opacity-100" />
              </Wrapper>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" className="gap-2 border-border/80 bg-transparent hover:border-primary/40 hover:bg-primary/5" asChild>
            <Link href="/documents">
              Browse All Documents
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
