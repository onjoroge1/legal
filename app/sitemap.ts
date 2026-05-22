import { MetadataRoute } from "next"
import { documentCatalog } from "@/lib/document-catalog"
import { categories } from "@/lib/categories"
import { getAllIndexableSubrouteIntents } from "@/lib/intent-registry"
import { getStatePageStaticParams } from "@/lib/state-pages"
import { getInternationalPageStaticParams } from "@/lib/international-pages"
import { getCityPageStaticParams } from "@/lib/city-pages"
import { blogPosts } from "@/lib/blog-posts"

// Always use the canonical production domain — never a Vercel preview URL.
const BASE_URL = process.env.NEXT_PUBLIC_CANONICAL_URL ?? "https://www.legallawdocs.com"

// ── lastmod helpers ───────────────────────────────────────────────────────────
// Google ignores <priority> and <changeFrequency>. Only <lastmod> moves the
// needle. Use real content-change dates — not new Date() on every deploy.
const d = (iso: string) => new Date(iso)

export default function sitemap(): MetadataRoute.Sitemap {
  // ── Core static pages ────────────────────────────────────────────────────
  // Dates = last time each page's content meaningfully changed.
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                          lastModified: d("2025-05-22") },
    { url: `${BASE_URL}/documents`,           lastModified: d("2025-05-22") },
    { url: `${BASE_URL}/lawyers`,             lastModified: d("2025-05-22") },
    { url: `${BASE_URL}/advertise`,           lastModified: d("2025-05-22") },
    { url: `${BASE_URL}/blog`,                lastModified: d("2025-05-22") },
    { url: `${BASE_URL}/about`,               lastModified: d("2025-04-01") },
    { url: `${BASE_URL}/contact`,             lastModified: d("2025-04-01") },
    { url: `${BASE_URL}/privacy`,             lastModified: d("2025-04-01") },
    { url: `${BASE_URL}/terms`,               lastModified: d("2025-04-01") },
    { url: `${BASE_URL}/login`,               lastModified: d("2025-04-01") },
    { url: `${BASE_URL}/signup`,              lastModified: d("2025-04-01") },
  ]

  // ── Category hub pages ────────────────────────────────────────────────────
  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/documents/${cat.id}`,
    lastModified: d("2025-05-22"),
  }))

  // ── Document detail pages (canonical) ────────────────────────────────────
  const documentPages: MetadataRoute.Sitemap = documentCatalog.map((doc) => ({
    url: `${BASE_URL}/documents/${doc.category}/${doc.slug}`,
    lastModified: d("2025-05-22"),
  }))

  // ── Intent subroute pages ─────────────────────────────────────────────────
  const intentEntries = getAllIndexableSubrouteIntents()
  const intentPages: MetadataRoute.Sitemap = intentEntries
    .map(({ legacySlug, intent }) => {
      const doc = documentCatalog.find((d) => d.legacySlug === legacySlug)
      if (!doc) return null
      return {
        url: `${BASE_URL}/documents/${doc.category}/${doc.slug}/${intent.slug}`,
        lastModified: d("2025-05-22"),
      }
    })
    .filter(Boolean) as MetadataRoute.Sitemap

  // ── State-specific document pages ─────────────────────────────────────────
  const stateParams = getStatePageStaticParams()
  const statePages: MetadataRoute.Sitemap = stateParams.map(({ category, slug }) => ({
    url: `${BASE_URL}/documents/${category}/${slug}`,
    lastModified: d("2025-05-22"),
  }))

  // ── International document pages ──────────────────────────────────────────
  const intlParams = getInternationalPageStaticParams()
  const intlPages: MetadataRoute.Sitemap = intlParams.map(({ category, slug }) => ({
    url: `${BASE_URL}/documents/${category}/${slug}`,
    lastModified: d("2025-05-15"),
  }))

  // ── City-specific residential lease pages ─────────────────────────────────
  const cityParams = getCityPageStaticParams()
  const cityPages: MetadataRoute.Sitemap = cityParams.map(({ category, slug }) => ({
    url: `${BASE_URL}/documents/${category}/${slug}`,
    lastModified: d("2025-05-22"),
  }))

  // ── Blog posts — use actual publish dates ─────────────────────────────────
  const blogPostPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
  }))

  // NOTE: generate, preview, checkout, and download pages are excluded —
  // disallowed in robots.ts and must not be indexed.

  return [
    ...staticPages,
    ...categoryPages,
    ...documentPages,
    ...intentPages,
    ...statePages,
    ...intlPages,
    ...cityPages,
    ...blogPostPages,
  ]
}
