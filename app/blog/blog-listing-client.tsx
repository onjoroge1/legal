"use client"

import { useState, useMemo } from "react"
import { Search, BookOpen } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { BlogCard } from "@/components/blog-card"
import { BlogSidebar } from "@/components/blog-sidebar"
import { blogPosts, blogCategories, searchBlogPosts } from "@/lib/blog-data"

export function BlogListingClient() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredPosts = useMemo(() => {
    let posts = searchQuery ? searchBlogPosts(searchQuery) : blogPosts
    if (activeCategory) {
      posts = posts.filter((post) => post.category === activeCategory)
    }
    return posts
  }, [searchQuery, activeCategory])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative border-b border-border/40 bg-gradient-to-b from-primary/5 to-background">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
              <BookOpen className="h-4 w-4" />
              Legal Knowledge Hub
            </div>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Legal <span className="text-primary">Blog</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Expert guides and articles on legal documents, business formation,
              employment law, and more.
            </p>

            {/* Search */}
            <div className="relative mx-auto mt-8 max-w-md">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card/50 border-border/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category filters + Content */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        {/* Category pills */}
        <div className="mb-10 flex flex-wrap items-center gap-2">
          <Badge
            variant={activeCategory === null ? "default" : "outline"}
            className="cursor-pointer px-4 py-1.5 text-sm transition-colors"
            onClick={() => setActiveCategory(null)}
          >
            All
          </Badge>
          {blogCategories.map((category) => (
            <Badge
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              className="cursor-pointer px-4 py-1.5 text-sm transition-colors"
              onClick={() =>
                setActiveCategory(activeCategory === category ? null : category)
              }
            >
              {category}
            </Badge>
          ))}
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* Blog grid */}
          <div>
            {filteredPosts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-border/40 bg-card/30 py-20 text-center">
                <Search className="mb-4 h-10 w-10 text-muted-foreground/50" />
                <p className="text-lg font-medium text-foreground">
                  No articles found
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try adjusting your search or category filter.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <BlogSidebar activeCategory={activeCategory || undefined} />
          </div>
        </div>
      </section>
    </div>
  )
}
