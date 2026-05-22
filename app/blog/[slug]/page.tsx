import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { blogPosts } from "@/lib/blog-posts"
import { documentCatalog } from "@/lib/document-catalog"
import { ChevronRight, Clock, CalendarDays, ArrowLeft, FileText } from "lucide-react"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: `${post.title} — LegalLawDocs.com`,
    description: post.description,
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function renderContent(content: string) {
  const paragraphs = content.split("\n\n")
  return paragraphs.map((block, i) => {
    if (block.startsWith("### ")) {
      return (
        <h3
          key={i}
          className="mt-8 mb-3 font-serif text-xl font-bold text-foreground"
        >
          {block.slice(4)}
        </h3>
      )
    }
    if (block.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="mt-10 mb-4 font-serif text-2xl font-bold text-foreground"
        >
          {block.slice(3)}
        </h2>
      )
    }
    return (
      <p key={i} className="leading-relaxed text-muted-foreground">
        {block}
      </p>
    )
  })
}

/** Build a slug→category lookup from the document catalog */
const docCategoryMap: Record<string, string> = Object.fromEntries(
  documentCatalog.map((doc) => [doc.slug, doc.category])
)

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Breadcrumb */}
        <div className="border-b border-border/40 bg-card/40">
          <div className="mx-auto max-w-4xl px-4 py-3 lg:px-8">
            <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Link href="/blog" className="hover:text-foreground transition-colors">
                Blog
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-muted-foreground">{post.category}</span>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-foreground line-clamp-1">{post.title}</span>
            </nav>
          </div>
        </div>

        {/* Article */}
        <article className="mx-auto max-w-4xl px-4 py-12 lg:px-8 lg:py-16">
          {/* Article header */}
          <header className="mb-10">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <CalendarDays className="h-3.5 w-3.5" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {post.readingTimeMinutes} min read
              </span>
            </div>
            <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {post.description}
            </p>
          </header>

          {/* Divider */}
          <div className="mb-10 border-t border-border/40" />

          {/* Body */}
          <div className="space-y-5 text-base">
            {renderContent(post.content)}
          </div>

          {/* Related Documents */}
          {post.relatedDocSlugs.length > 0 && (
            <div className="mt-14 rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <div className="mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <h2 className="font-serif text-lg font-semibold text-foreground">
                  Generate related documents
                </h2>
              </div>
              <p className="mb-5 text-sm text-muted-foreground">
                Ready to create a document? LegalLawDocs.com generates state-specific legal
                documents in minutes using AI.
              </p>
              <div className="flex flex-wrap gap-3">
                {post.relatedDocSlugs.map((docSlug) => {
                  const category = docCategoryMap[docSlug] ?? "business"
                  const label = docSlug
                    .split("-")
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(" ")
                  return (
                    <Link
                      key={docSlug}
                      href={`/documents/${category}/${docSlug}`}
                      className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-card px-4 py-2 text-sm font-medium text-foreground transition-all hover:border-primary/60 hover:bg-primary/10"
                    >
                      <FileText className="h-4 w-4 text-primary" />
                      {label}
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* Back to blog */}
          <div className="mt-12 border-t border-border/40 pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all articles
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
