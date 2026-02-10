import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "My Documents | LegalLawDocs.com",
  description: "Manage all your legal documents in one place",
}

export default function DocumentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 