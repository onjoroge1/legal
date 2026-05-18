import { MetadataRoute } from "next"
import { documentCatalog } from "@/lib/document-catalog"
import { categories } from "@/lib/categories"
import { getAllIndexableSubrouteIntents } from "@/lib/intent-registry"
import { getStatePageStaticParams } from "@/lib/state-pages"

const BASE_URL = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_APP_URL || "https://legallawdocs.com"

export default function sitemap(): MetadataRoute.Sitemap {
  // ── Core static pages ────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/documents`, lastModified: new Date(), changeFrequency: "daily", priority: 0.95 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE_URL}/login`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/signup`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ]

  // ── Category hub pages ────────────────────────────────────────────────────
  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/documents/${cat.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }))

  // ── Document detail pages (canonical, indexable) ──────────────────────────
  const documentPages: MetadataRoute.Sitemap = documentCatalog.map((doc) => ({
    url: `${BASE_URL}/documents/${doc.category}/${doc.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }))

  // ── Intent subroute pages (indexable: true && tier === "subroute" only) ──────
  const intentEntries = getAllIndexableSubrouteIntents()
  const intentPages: MetadataRoute.Sitemap = intentEntries
    .map(({ legacySlug, intent }) => {
      const doc = documentCatalog.find((d) => d.legacySlug === legacySlug)
      if (!doc) return null
      return {
        url: `${BASE_URL}/documents/${doc.category}/${doc.slug}/${intent.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: intent.priority === "high" ? 0.75 : 0.65,
      }
    })
    .filter(Boolean) as MetadataRoute.Sitemap

  // ── State-specific document pages (Sprint 6) ─────────────────────────────
  const stateParams = getStatePageStaticParams()
  const statePages: MetadataRoute.Sitemap = stateParams.map(({ category, slug }) => ({
    url: `${BASE_URL}/documents/${category}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.78,
  }))

  // NOTE: generate, preview, checkout, and download pages are excluded.
  // They are disallowed in robots.ts and should not be indexed.

  return [...staticPages, ...categoryPages, ...documentPages, ...intentPages, ...statePages]
}
