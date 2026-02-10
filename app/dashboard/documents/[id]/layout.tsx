import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "View Document | LegalLawDocs.com",
  description: "View and edit your legal document",
}

export default function DocumentViewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 