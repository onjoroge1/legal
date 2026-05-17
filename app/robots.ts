import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXTAUTH_URL || "https://legallawdocs.com"

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          // App internals
          "/api/",
          "/dashboard/",
          "/admin/",
          "/_next/",
          "/sign/",
          // Non-indexable document flow pages
          "/documents/*/generate",
          "/documents/*/preview",
          "/documents/*/checkout",
          "/documents/*/download",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
