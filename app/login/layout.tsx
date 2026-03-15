import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to your LegalLawDocs.com account to access your documents, manage subscriptions, and generate new legal documents.",
  openGraph: {
    title: "Sign In | LegalLawDocs.com",
    description:
      "Sign in to your LegalLawDocs.com account to access your documents and generate new legal documents.",
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
