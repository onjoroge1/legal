import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Legal Document Templates",
  description:
    "Browse 50+ professional legal document templates including NDAs, LLC agreements, employment contracts, leases, and more. AI-powered with state-specific compliance.",
  keywords: [
    "legal document templates",
    "NDA template",
    "LLC operating agreement",
    "employment contract template",
    "lease agreement template",
    "legal forms online",
    "AI legal documents",
  ],
  openGraph: {
    title: "Legal Document Templates | LegalLawDocs.com",
    description:
      "Browse 50+ professional legal document templates. AI-powered generation with state-specific compliance.",
  },
  alternates: {
    canonical: "https://www.legallawdocs.com/documents",
  },
}

export default function DocumentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
