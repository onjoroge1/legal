import { LegalDisclaimerAcceptanceGate } from "@/components/legal/legal-disclaimer-acceptance-gate"
import { Suspense } from "react"
import DocumentWorkspace from "@/components/documents/document-workspace"

export default function Page() {
  return <Suspense fallback={<p>Loading document…</p>}><LegalDisclaimerAcceptanceGate><DocumentWorkspace mode="checkout" /></LegalDisclaimerAcceptanceGate></Suspense>
}
