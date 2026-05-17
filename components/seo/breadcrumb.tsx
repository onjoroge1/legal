import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  /** Emits BreadcrumbList JSON-LD when true (default true) */
  withSchema?: boolean
}

const BASE_URL = "https://legallawdocs.com"

export function Breadcrumb({ items, withSchema = true }: BreadcrumbProps) {
  const all = [{ label: "Home", href: "/" }, ...items]

  const schemaItems = all.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.label,
    ...(item.href ? { item: `${BASE_URL}${item.href}` } : {}),
  }))

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: schemaItems,
  }

  return (
    <>
      {withSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-muted-foreground flex-wrap">
        {all.map((item, i) => {
          const isLast = i === all.length - 1
          return (
            <span key={i} className="flex items-center gap-1">
              {i === 0 ? (
                item.href ? (
                  <Link href={item.href} className="flex items-center gap-1 hover:text-primary transition-colors">
                    <Home className="h-3.5 w-3.5" />
                    <span className="sr-only">{item.label}</span>
                  </Link>
                ) : (
                  <Home className="h-3.5 w-3.5" />
                )
              ) : isLast || !item.href ? (
                <span className={isLast ? "font-medium text-foreground" : ""}>{item.label}</span>
              ) : (
                <Link href={item.href} className="hover:text-primary transition-colors">
                  {item.label}
                </Link>
              )}
              {!isLast && <ChevronRight className="h-3 w-3 shrink-0 opacity-50" />}
            </span>
          )
        })}
      </nav>
    </>
  )
}
