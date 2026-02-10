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
  title: 'LegalLawDocs.com | AI-Powered Legal Document Generation',
  description:
    'Generate professional, legally compliant documents using advanced AI technology. State-specific compliance, affordable pricing, and instant delivery.',
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
