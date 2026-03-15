import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  Calendar,
  Clock,
  ArrowLeft,
  User,
  Tag,
  ChevronRight,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  blogPosts,
  getBlogPost,
  getRelatedPosts,
} from "@/lib/blog-data"
import { BlogCard } from "@/components/blog-card"
import { BlogSidebar } from "@/components/blog-sidebar"

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return { title: "Article Not Found" }

  return {
    title: `${post.title} | LegalLawDocs Blog`,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const relatedPosts = getRelatedPosts(slug, 3)
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  const baseUrl = "https://www.legallawdocs.com"

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Organization",
      name: post.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "LegalLawDocs",
      url: baseUrl,
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
    wordCount: post.sections.reduce(
      (acc, s) => acc + s.content.split(" ").length,
      0
    ),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="border-b border-border/40 bg-card/30">
          <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-sm text-muted-foreground lg:px-8">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/blog" className="hover:text-primary transition-colors">
              Blog
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="truncate text-foreground">{post.title}</span>
          </div>
        </div>

        {/* Article Header */}
        <header className="relative border-b border-border/40 bg-gradient-to-b from-primary/5 to-background">
          <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
            <div className="mx-auto max-w-3xl">
              <Button
                variant="ghost"
                size="sm"
                className="mb-6 text-muted-foreground hover:text-foreground"
                asChild
              >
                <Link href="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Link>
              </Button>

              <Badge variant="outline" className="mb-4">
                {post.category}
              </Badge>

              <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>

              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {post.author.name}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {post.readTime} min read
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Article Content + Sidebar */}
        <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
            {/* Article Body */}
            <article className="mx-auto max-w-3xl lg:max-w-none">
              <div className="space-y-10">
                {post.sections.map((section, index) => (
                  <div key={index}>
                    <h2 className="mb-4 font-serif text-2xl font-semibold text-foreground">
                      {section.heading}
                    </h2>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="mt-12 border-t border-border/40 pt-8">
                <div className="flex items-center gap-3 flex-wrap">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  {post.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Document-Specific CTA Banner */}
              <Card className="mt-12 border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
                <CardContent className="flex flex-col items-center gap-4 p-8 text-center sm:flex-row sm:text-left">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">
                      {post.ctaText}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Generate a professional, state-specific document in
                      minutes with our AI-powered platform. No lawyer needed.
                    </p>
                  </div>
                  <Button asChild className="shadow-md shadow-primary/20 whitespace-nowrap">
                    <Link href={`/documents/${post.relatedDocumentSlug}`}>
                      Get Started
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </article>

            {/* Sidebar — Table of Contents + Standard */}
            <div className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {/* Table of Contents */}
                <Card className="border-border/50 bg-card/50">
                  <CardContent className="p-5">
                    <h3 className="mb-3 text-sm font-semibold text-foreground">
                      In This Article
                    </h3>
                    <nav className="space-y-2">
                      {post.sections.map((section, index) => (
                        <p
                          key={index}
                          className="text-sm text-muted-foreground leading-snug"
                        >
                          {section.heading}
                        </p>
                      ))}
                    </nav>
                  </CardContent>
                </Card>

                <BlogSidebar activeCategory={post.category} />
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-border/40 bg-card/30">
            <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
              <h2 className="mb-8 font-serif text-2xl font-bold text-foreground">
                Related Articles
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relPost) => (
                  <BlogCard key={relPost.slug} post={relPost} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  )
}
