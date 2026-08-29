import { LegalDisclaimerAcceptanceGate } from "@/components/legal/legal-disclaimer-acceptance-gate"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Document | LegalLawDocs.com",
  description: "Create a new legal document draft",
}

export default function CreateDocumentLayout({
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
