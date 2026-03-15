import { MetadataRoute } from 'next'
import { documentTypes } from '@/lib/document-data'
import { blogPosts } from '@/lib/blog-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.legallawdocs.com'

  // Static pages - Core public pages only
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/documents`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  // Document detail pages - High priority for SEO
  const documentPages: MetadataRoute.Sitemap = documentTypes.map((doc) => ({
    url: `${baseUrl}/documents/${doc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Informational / legal pages
  const infoPages: MetadataRoute.Sitemap = [
    { path: 'about', priority: 0.6 },
    { path: 'contact', priority: 0.6 },
    { path: 'privacy-policy', priority: 0.3 },
    { path: 'terms-of-service', priority: 0.3 },
    { path: 'cookie-policy', priority: 0.2 },
    { path: 'dmca', priority: 0.2 },
  ].map(({ path, priority }) => ({
    url: `${baseUrl}/${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority,
  }))

  // Blog listing page
  const blogListingPage: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  // Blog article pages
  const blogArticlePages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    ...staticPages,
    ...documentPages,
    ...infoPages,
    ...blogListingPage,
    ...blogArticlePages,
  ]
}
