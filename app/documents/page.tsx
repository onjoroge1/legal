"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  FileText,
  Sparkles,
  Search,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { documentTypes } from "@/lib/document-data"

const categories = [
  { id: "all", label: "All Documents" },
  { id: "business", label: "Business" },
  { id: "real-estate", label: "Real Estate" },
  { id: "employment", label: "Employment" },
  { id: "personal", label: "Personal" },
]

// Convert documentTypes to documents format for this page
const documents = documentTypes.map((doc) => ({
  title: doc.title,
  category: doc.category,
  icon: doc.icon,
  description: doc.description,
  popular: doc.popular,
  color: doc.color,
  slug: `/documents/${doc.slug}`,
}))

export default function DocumentsPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filtered = documents.filter((doc) => {
    const matchesCategory = activeCategory === "all" || doc.category === activeCategory
    const matchesSearch =
      searchQuery === "" ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen">
      <Header />
      <main className="relative">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-card/50 via-background to-card/50" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
          {/* Header Section */}
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Document Library
            </p>
            <h1 className="mt-3 text-balance font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              50+ Legal Document <span className="gradient-text">Templates</span>
            </h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
              From business formation to personal legal needs, we have you covered
              with professionally crafted, AI-enhanced templates.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mx-auto mt-8 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10"
              />
            </div>
          </div>

          {/* Category pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
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

          {/* Results count */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Showing {filtered.length} of {documents.length} documents
            </p>
          </div>

          {/* Document cards */}
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-lg font-medium text-foreground">No documents found</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try adjusting your search or category filter
                </p>
              </div>
            ) : (
              filtered.map((doc) => {
                const isAccent = doc.color === "accent"
                const hasSlug = doc.slug
                const Wrapper: React.ElementType = hasSlug ? Link : "div"
                const wrapperProps = hasSlug ? { href: doc.slug } : {}

                return (
                  <Wrapper
                    key={doc.title}
                    {...wrapperProps}
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
                        <h3 className="font-semibold text-foreground">{doc.title}</h3>
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
              })
            )}
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Need a custom document? Our AI can help create it for you.
            </p>
            <Button size="lg" className="gap-2 shadow-md shadow-primary/20" asChild>
              <Link href="/dashboard/create">
                Create Custom Document
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

