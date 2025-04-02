import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login | LegalLawDocs.com",
  description: "Login to your LegalLawDocs.com account",
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 