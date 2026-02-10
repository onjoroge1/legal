import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Document | LegalLawDocs.com",
  description: "Create a new legal document",
}

export default function CreateDocumentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 