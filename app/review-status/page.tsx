import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { publishedContent } from "@/lib/publication-policy"
export const dynamic = "force-dynamic"
export const metadata = { title: "Review status and corrections", robots: { index: false, follow: true } }
export default function ReviewStatus() {
 const entries = publishedContent()
 return <><Header /><main className="mx-auto max-w-3xl px-4 py-16 space-y-6"><h1 className="text-3xl font-bold">Review status and corrections</h1>
 <p>{entries.length} pages currently have a recorded, current publication review. No jurisdiction-wide legal approval is implied.</p>
 <p>Document and guide pages need an identified author and qualified reviewer, jurisdiction, dated official sources, approval evidence and a tested drafting journey. Changes to reviewed copy or an expired review remove the page from discovery.</p>
 <ul>{entries.map(e => <li key={e.publication.path}><Link className="underline" href={e.publication.path}>{e.publication.title}</Link> — {e.publication.jurisdiction}; reviewed {e.reviewedAt} by {e.reviewer}</li>)}</ul>
 <h2 className="text-xl font-semibold">Corrections under review</h2>
 <p>The archived tax examples used 2024 figures. The IRS lists a $15,000,000 federal estate and gift tax basic exclusion and a $19,000 annual gift exclusion for 2026. These figures do not determine any individual tax liability.</p>
 <p><a className="underline" href="https://www.irs.gov/businesses/small-businesses-self-employed/whats-new-estate-and-gift-tax">IRS estate and gift tax source</a> (checked October 12, 2026).</p>
 <p>The FTC states its Noncompete Rule is not in effect or enforceable and records its September 5, 2025 steps to dismiss the Fifth Circuit appeal. Older copy describing an active nationwide ban or only an unresolved appeal has been withdrawn. Other applicable law still requires individual review.</p>
 <p><a className="underline" href="https://www.ftc.gov/legal-library/browse/rules/noncompete-rule">FTC rule status</a> (checked October 12, 2026).</p>
 <p>These source checks are editorial corrections, not approval of the remaining legal guidance. Legacy articles and jurisdiction pages remain withheld until reviewed.</p>
 <Link className="underline" href="/contact">Report inaccurate content or request product support</Link>
 </main><Footer /></>
}
