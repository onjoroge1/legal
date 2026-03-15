import Link from "next/link"
import { Scale, FileText, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { blogCategories, blogPosts } from "@/lib/blog-data"

export function BlogSidebar({
  activeCategory,
}: {
  activeCategory?: string
}) {
  // Get most recent 4 posts for "Popular" section
  const popularPosts = [...blogPosts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 4)

  return (
    <aside className="space-y-6">
      {/* Categories */}
      <Card className="border-border/50 bg-card/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-foreground">
            Categories
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1.5 pt-0">
          <Link
            href="/blog"
            className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
              !activeCategory
                ? "bg-primary/10 font-medium text-primary"
                : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
            }`}
          >
            All Articles
            <span className="ml-2 text-xs text-muted-foreground">
              ({blogPosts.length})
            </span>
          </Link>
          {blogCategories.map((category) => {
            const count = blogPosts.filter((p) => p.category === category).length
            return (
              <Link
                key={category}
                href={`/blog?category=${encodeURIComponent(category)}`}
                className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                  activeCategory === category
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                }`}
              >
                {category}
                <span className="ml-2 text-xs text-muted-foreground">({count})</span>
              </Link>
            )
          })}
        </CardContent>
      </Card>

      {/* Popular Posts */}
      <Card className="border-border/50 bg-card/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <TrendingUp className="h-4 w-4 text-primary" />
            Recent Articles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          {popularPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-lg p-2 transition-colors hover:bg-secondary/50"
            >
              <p className="line-clamp-2 text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                {post.title}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {post.readTime} min read
              </p>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* CTA */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardContent className="p-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
            <Scale className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mb-2 text-base font-semibold text-foreground">
            Need a Legal Document?
          </h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Generate professional, state-specific legal documents in minutes with our AI-powered platform.
          </p>
          <Button asChild className="w-full shadow-md shadow-primary/20">
            <Link href="/documents">
              <FileText className="mr-2 h-4 w-4" />
              Browse Documents
            </Link>
          </Button>
        </CardContent>
      </Card>
    </aside>
  )
}
