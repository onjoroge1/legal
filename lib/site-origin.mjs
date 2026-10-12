// One production identity. Preview hosts must never become canonical URLs.
export const SITE_ORIGIN = "https://www.legallawdocs.com"
export const SITE_NAME = "LegalLawDocs"
export function searchIndexingEnabled() {
 return process.env.VERCEL_ENV === "production" && process.env.ENABLE_SEARCH_INDEXING === "true"
}
export function canonicalUrl(path = "/") {
 if (!path.startsWith("/") || path.startsWith("//") || /[?#\\]/.test(path)) throw new Error("Canonical path must be an absolute site path without query or fragment")
 return SITE_ORIGIN + (path === "/" ? "" : path.replace(/\/+$/, ""))
}
