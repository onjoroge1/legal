import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { BlogPost } from "@/lib/blog-data"

const categoryColors: Record<string, string> = {
  "Business Law": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Employment Law": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Real Estate Law": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "Estate Planning": "bg-purple-500/10 text-purple-400 border-purple-500/20",
}

export function BlogCard({ post }: { post: BlogPost }) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <Card className="h-full overflow-hidden border-border/50 bg-card/50 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
        {/* Gradient header */}
        <div className="relative h-40 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10 p-6">
          <Badge
            variant="outline"
            className={`text-xs ${categoryColors[post.category] || "bg-secondary text-muted-foreground"}`}
          >
            {post.category}
          </Badge>
          <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-transform duration-300 group-hover:translate-x-1">
            <ArrowRight className="h-4 w-4 text-primary" />
          </div>
        </div>
        <CardContent className="p-6">
          <h3 className="mb-3 line-clamp-2 text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
            {post.title}
          </h3>
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime} min read
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
