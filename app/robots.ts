import type { MetadataRoute } from "next"
import { canonicalUrl } from "@/lib/site-metadata"
export default function robots(): MetadataRoute.Robots {
 // Crawlers must be able to fetch pages and assets to observe noindex directives.
 // Authentication remains the access control for private data.
 return { rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }], sitemap: canonicalUrl("/sitemap.xml") }
}
