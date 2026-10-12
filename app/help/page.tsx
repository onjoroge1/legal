import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
export const metadata = { title: "Product help — LegalLawDocs", description: "Help with saved drafts, purchases, recovery and account privacy." }
export default function Help() { return <><Header /><main className="mx-auto max-w-3xl space-y-6 px-4 py-16"><h1 className="text-3xl font-bold">Product help</h1>
 <h2 className="text-xl font-semibold">Save, reopen and revise</h2><p>Use your dashboard to reopen a saved version or revise its inputs. A revision creates a new version; a one-time purchase covers the exact version purchased. PDF and DOCX export require ownership, paid access and document review.</p>
 <h2 className="text-xl font-semibold">Pricing and refunds</h2><p>Checkout shows the configured price before payment when new sales are enabled. New purchases currently require approved business and refund terms. For an existing charge, delivery problem or refund request, open a support ticket. A request is not a promise of a refund or a waiver of your rights.</p>
 <h2 className="text-xl font-semibold">Guest purchases</h2><p>Use the recovery link in your receipt to recover the purchased version. Do not share recovery links or access codes with others.</p><Link className="underline" href="/recover-purchase">Recover a purchase</Link>
 <h2 className="text-xl font-semibold">Account data</h2><p>Data export and deletion requests are in account privacy settings. Billing, shared records and retention requirements may require support review.</p><Link className="underline" href="/dashboard/settings/privacy">Privacy settings</Link>
 <h2 className="text-xl font-semibold">Legal scope</h2><p>Available state inputs do not establish legal suitability. Only currently reviewed pages belong to the supported launch collection. Signing and team collaboration remain under development.</p><Link className="underline" href="/review-status">Review status</Link>
 <p><Link className="underline" href="/contact">Open support or read a response</Link>. Support cannot provide legal advice or handle urgent legal deadlines.</p>
 </main><Footer /></> }
