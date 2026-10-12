import Link from "next/link"
import { currentCommercialPolicy } from "@/lib/commercial-policy"
export function PolicyStatus() {
 const policy = currentCommercialPolicy()
 return <aside className="my-6 rounded-xl border p-5 space-y-2" aria-label="Publication status">
 {policy ? <><p>Service operator: {policy.legalEntity}. {policy.contactAddress}</p><p>Approved refund terms: {policy.refundTerms}</p></> : <><h2 className="font-semibold">Policy review in progress</h2><p>The policy below is a draft. Final business identity, refund terms and legal approval have not been recorded. New purchases are blocked until that review is complete.</p><p>Existing orders and statutory rights are unaffected. <Link className="underline" href="/contact">Contact support about an existing order or privacy request.</Link></p></>}
 </aside>
}
