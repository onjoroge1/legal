"use client"

import { useState } from "react"
import Link from "next/link"
import { TemplateActions } from "@/components/template-actions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ArrowRight,
  Sparkles,
  Search,
  FileText,
  Crown,
  CheckCircle2,
} from "lucide-react"
import { documentCatalog, getDocumentPath } from "@/lib/document-catalog"
import { useSession } from "next-auth/react"
import { useQuery } from "@tanstack/react-query"

const categories = [
  { id: "all", label: "All Documents" },
  { id: "business", label: "Business" },
  { id: "employment", label: "Employment" },
  { id: "real-estate", label: "Real Estate" },
  { id: "estate-planning", label: "Estate Planning" },
  { id: "legal-letters", label: "Legal Letters" },
  { id: "financial", label: "Financial" },
  { id: "personal", label: "Personal" },
]

const documents = documentCatalog.map((doc) => ({
  title: doc.title,
  category: doc.category,
  icon: doc.icon,
  description: doc.description,
  popular: doc.popular,
  color: doc.color,
  slug: getDocumentPath(doc),
}))

export default function TemplatesPage() {
  const { data: session } = useSession()
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Fetch subscription status
  const { data: subscriptionData } = useQuery({
    queryKey: ['subscription'],
    queryFn: async () => {
      if (!session?.user?.email) return null
      const response = await fetch("/api/user/subscription")
      if (!response.ok) return null
      return response.json()
    },
    enabled: !!session?.user?.email,
  })

  const hasActiveSubscription = subscriptionData?.subscription?.isActive ?? false

  const filtered = documents.filter((doc) => {
    const matchesCategory = activeCategory === "all" || doc.category === activeCategory
    const matchesSearch =
      searchQuery === "" ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">Legal Document Templates</h1>
            {hasActiveSubscription && (
              <Badge className="gap-1 border-accent/30 bg-accent/10 text-accent" variant="outline">
                <Crown className="h-3 w-3" />
                Unlimited Access
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground">
            {hasActiveSubscription 
              ? "Generate unlimited documents with your subscription"
              : "Browse and generate legal documents from our collection of templates"}
          </p>
        </div>
        <TemplateActions />
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-2xl">
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
      <div className="mb-6 flex flex-wrap items-center gap-2">
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
      <div className="mb-6">
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

            return (
              <Link
                key={doc.title}
                href={doc.slug}
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
                    {hasActiveSubscription && (
                      <Badge
                        variant="outline"
                        className="gap-1 border-accent/30 bg-accent/10 text-xs text-accent"
                      >
                        <Crown className="h-2.5 w-2.5" />
                        Included
                      </Badge>
                    )}
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
              </Link>
            )
          })
        )}
      </div>

      {/* Subscription Benefits Section (for non-subscribers) */}
      {!hasActiveSubscription && (
        <div className="mt-12 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5 p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
            <Crown className="h-8 w-8 text-primary" />
          </div>
          <h2 className="mt-6 font-serif text-2xl font-bold text-foreground">
            Unlock Unlimited Documents
          </h2>
          <p className="mt-2 text-muted-foreground">
            Review the current recurring price and billing interval at Stripe Checkout before payment.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              "Unlimited document generation",
              "All 52 document types",
              "Saved dashboard access",
            ].map((benefit) => (
              <div key={benefit} className="flex items-center justify-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-accent" />
                <span className="text-sm text-secondary-foreground">{benefit}</span>
              </div>
            ))}
          </div>
          <Button size="lg" className="mt-6 gap-2 shadow-md shadow-primary/20" asChild>
            <Link href="/dashboard/billing">
              Upgrade to Subscription
              <Crown className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}

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
  )
}
