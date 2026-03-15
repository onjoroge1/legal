import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Account",
  description:
    "Create a free LegalLawDocs.com account to generate professional, AI-powered legal documents with state-specific compliance.",
  openGraph: {
    title: "Create Account | LegalLawDocs.com",
    description:
      "Join LegalLawDocs.com and generate professional, AI-powered legal documents with state-specific compliance.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
