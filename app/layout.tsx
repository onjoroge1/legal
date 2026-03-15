import React from "react"
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { SessionProvider } from '@/components/session-provider'
import { QueryProvider } from '@/components/query-provider'
import { Toaster } from '@/components/ui/sonner'

import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.legallawdocs.com'),
  title: {
    default: 'LegalLawDocs.com | AI-Powered Legal Document Generation',
    template: '%s | LegalLawDocs.com',
  },
  description:
    'Generate professional, legally compliant documents using advanced AI technology. State-specific compliance, affordable pricing, and instant delivery.',
  keywords: [
    'legal documents',
    'AI legal',
    'document generation',
    'NDA',
    'LLC operating agreement',
    'employment contract',
    'lease agreement',
    'legal templates',
    'online legal documents',
    'state-specific legal forms',
  ],
  authors: [{ name: 'LegalLawDocs.com' }],
  creator: 'LegalLawDocs.com',
  publisher: 'LegalLawDocs.com',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.legallawdocs.com',
    siteName: 'LegalLawDocs.com',
    title: 'LegalLawDocs.com | AI-Powered Legal Document Generation',
    description:
      'Generate professional, legally compliant documents using advanced AI technology. State-specific compliance, affordable pricing, and instant delivery.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LegalLawDocs.com - AI-Powered Legal Document Generation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LegalLawDocs.com | AI-Powered Legal Document Generation',
    description:
      'Generate professional, legally compliant documents using advanced AI. State-specific compliance, affordable pricing.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.legallawdocs.com',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0c14',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <QueryProvider>
          <SessionProvider>
            {children}
            <Toaster />
          </SessionProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
