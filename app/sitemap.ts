import type { MetadataRoute } from "next"
import { canonicalUrl, searchIndexingEnabled, CORE_PAGES, CONTENT_MODIFIED } from "@/lib/site-metadata"
import { publishedContent } from "@/lib/publication-policy"
export const dynamic = "force-dynamic"
export default function sitemap(): MetadataRoute.Sitemap {
 if (!searchIndexingEnabled()) return []
 const entries = publishedContent()
 const paths = new Map<string, string | undefined>(CORE_PAGES.map(path => [path, CONTENT_MODIFIED[path]]))
 for (const entry of entries) {
  const p = entry.publication; paths.set(p.path, p.modifiedAt)
  if (p.kind === "document") paths.set(p.path.split("/").slice(0,3).join("/"), undefined)
 }
 return [...paths].map(([path, date]) => ({ url: canonicalUrl(path), ...(date ? { lastModified: new Date(date) } : {}) }))
}
