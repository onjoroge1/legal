import type { Metadata } from "next"
import { canonicalUrl, SITE_ORIGIN, SITE_NAME, searchIndexingEnabled } from "./site-origin.mjs"
export { canonicalUrl, SITE_ORIGIN, searchIndexingEnabled }
export const CORE_PAGES = ["/", "/about", "/contact", "/help", "/documents", "/blog", "/review-status"]
// Dates are content changes in this release, not deploy times. Omit unknown historical dates.
export const CONTENT_MODIFIED: Record<string, string> = { "/contact": "2026-10-12", "/help": "2026-10-12", "/review-status": "2026-10-12" }
export function pageMetadata(path: string, metadata: Metadata, approved = CORE_PAGES.includes(path)): Metadata {
 const index = searchIndexingEnabled() && approved
 const title = typeof metadata.title === "string" ? metadata.title : SITE_NAME
 const description = metadata.description ?? "Self-help document drafting. Review and availability limits apply."
 const image = canonicalUrl("/share-card.png")
 return { ...metadata, alternates: { canonical: canonicalUrl(path) }, robots: { index, follow: true, googleBot: { index, follow: true } },
  openGraph: { type: "website", ...metadata.openGraph, title, description, url: canonicalUrl(path), siteName: SITE_NAME, images: [{ url: image, width: 1200, height: 630, alt: "LegalLawDocs — drafts for professional review" }] },
  twitter: { card: "summary_large_image", title, description, images: [image] } }
}
export function jsonLd(value: unknown) { return JSON.stringify(value).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026") }
