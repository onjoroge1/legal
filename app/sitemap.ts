import { MetadataRoute } from 'next'
import { documentTypes } from '@/lib/document-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_APP_URL || 'https://legallawdocs.com'
  
  // Static pages - Core pages
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
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // Document detail pages - High priority for SEO
  const documentPages: MetadataRoute.Sitemap = documentTypes.map((doc) => ({
    url: `${baseUrl}/documents/${doc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Document generate pages - Important for user flow
  const generatePages: MetadataRoute.Sitemap = documentTypes.map((doc) => ({
    url: `${baseUrl}/documents/${doc.slug}/generate`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Combine all pages
  return [...staticPages, ...documentPages, ...generatePages]
}

