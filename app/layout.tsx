import { MeasurementChoice } from "@/components/measurement-choice"
import { SITE_ORIGIN } from "@/lib/site-metadata"
import React from "react"
import type { Metadata, Viewport } from 'next'
import { SessionProvider } from '@/components/session-provider'
import { QueryProvider } from '@/components/query-provider'
import { Toaster } from '@/components/ui/sonner'
import { SitewideLegalNotice } from '@/components/legal/sitewide-legal-notice'

import './globals.css'

export const metadata: Metadata = {
 metadataBase: new URL(SITE_ORIGIN),
 title: 'LegalLawDocs | Drafts for professional review',
 description: 'Self-help document drafting software. Availability depends on the reviewed launch scope. Not a law firm or legal advice.',
 robots: { index: false, follow: true },
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
    <html lang="en">
      <body className="font-sans antialiased">
        <QueryProvider>
          <SessionProvider>
            {children}
            <SitewideLegalNotice />
            <MeasurementChoice />
            <Toaster />
          </SessionProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
