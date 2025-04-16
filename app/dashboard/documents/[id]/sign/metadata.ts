import type { Metadata } from "next"

interface DocumentSignPageProps {
  params: {
    id: string
  }
}

export function generateMetadata({ params }: DocumentSignPageProps): Metadata {
  return {
    title: `Sign Document | LegalLawDocs.com`,
    description: `Sign and request signatures for your legal document`,
  }
} 