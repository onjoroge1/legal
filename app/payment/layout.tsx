import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Payment | LegalLawDocs.com",
  description: "Complete your subscription payment",
}

export default function PaymentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 