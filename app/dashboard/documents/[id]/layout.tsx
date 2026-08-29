import type { Metadata } from "next"
import { LegalDisclaimerAcceptanceGate } from "@/components/legal/legal-disclaimer-acceptance-gate"

export const metadata: Metadata = {
  title: "View Document | LegalLawDocs.com",
  description: "View and edit your legal document",
}

export default function DocumentViewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LegalDisclaimerAcceptanceGate>
      {children}
    </LegalDisclaimerAcceptanceGate>
  )
}
