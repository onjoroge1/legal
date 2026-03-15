import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Forgot Password",
  description:
    "Reset your LegalLawDocs.com password. Enter your email address and we'll send you a secure link to create a new password.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
