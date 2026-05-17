import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AlertTriangle } from "lucide-react"

export const metadata: Metadata = {
  title: "Legal Disclaimer — LegalLawDocs.com",
  description:
    "Important legal disclaimer: LegalLawDocs.com is not a law firm and does not provide legal advice. Our documents are for informational and self-help purposes only.",
}

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <div className="mx-auto max-w-4xl px-4 py-16 lg:px-8 lg:py-24">
          {/* Header */}
          <div className="mb-10 border-b border-border/40 pb-8">
            <div className="mb-3 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              Legal
            </div>
            <h1 className="font-serif text-4xl font-bold text-foreground">Legal Disclaimer</h1>
            <p className="mt-3 text-muted-foreground">
              Last updated: <span className="text-foreground font-medium">May 1, 2026</span>
            </p>
          </div>

          {/* Important notice banner */}
          <div className="mb-10 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5">
            <div className="flex gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
              <div>
                <p className="font-semibold text-foreground">
                  LegalLawDocs.com is not a law firm.
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  We provide self-help legal document services at your specific direction. Use of
                  our website and services does not create an attorney-client relationship between
                  you and LegalLawDocs.com or any of its employees, contractors, or affiliates.
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-10 text-muted-foreground">
            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Not legal advice</h2>
              <p className="leading-relaxed">
                The information, documents, templates, guides, articles, and other content provided
                by LegalLawDocs.com are for general informational and self-help purposes only.
                Nothing on this website constitutes legal advice, legal opinion, or any other form
                of advice regarding your specific circumstances.
              </p>
              <p className="mt-3 leading-relaxed">
                You should not act or refrain from acting on the basis of any content on this site
                without seeking appropriate legal or other professional advice for your specific
                situation. The application of laws varies widely depending on the specific facts and
                jurisdiction. Only a licensed attorney can provide legal advice tailored to your
                individual circumstances.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Document limitations</h2>
              <p className="leading-relaxed">
                The documents generated through our platform are based on attorney-reviewed templates
                and are intended for common legal situations. However:
              </p>
              <ul className="mt-4 space-y-3">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 h-2 w-2 rounded-full bg-primary/60 mt-2" />
                  <span className="leading-relaxed">
                    <strong className="text-foreground">State-specific compliance:</strong> Laws vary
                    significantly by state and jurisdiction. While we include state-specific language
                    where possible, we cannot guarantee that every generated document complies with
                    all local ordinances, regulations, or court interpretations applicable to your
                    situation.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 h-2 w-2 rounded-full bg-primary/60 mt-2" />
                  <span className="leading-relaxed">
                    <strong className="text-foreground">Complex matters:</strong> Our documents are
                    best suited for straightforward, common legal situations. Complex transactions,
                    high-value contracts, disputed matters, or situations involving regulatory
                    compliance may require the assistance of a licensed attorney.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 h-2 w-2 rounded-full bg-primary/60 mt-2" />
                  <span className="leading-relaxed">
                    <strong className="text-foreground">Currency of information:</strong> Laws change.
                    While we work to keep our templates updated, we cannot guarantee that documents
                    reflect the most recent legal changes applicable to every jurisdiction at all times.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 h-2 w-2 rounded-full bg-primary/60 mt-2" />
                  <span className="leading-relaxed">
                    <strong className="text-foreground">Accuracy of user-provided information:</strong>{" "}
                    The quality and legal validity of generated documents depend on the accuracy of
                    the information you provide. We are not responsible for documents that are
                    incorrect, incomplete, or unenforceable due to inaccurate input.
                  </span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Use at your own risk</h2>
              <p className="leading-relaxed">
                You use LegalLawDocs.com and all documents generated through our platform entirely
                at your own risk. LegalLawDocs.com, its founders, employees, officers, agents,
                affiliates, and licensors expressly disclaim all liability for any loss, damage, or
                adverse outcome arising from your use of or reliance on our services or documents,
                to the fullest extent permitted by applicable law.
              </p>
              <p className="mt-3 leading-relaxed">
                In no event shall LegalLawDocs.com be liable for any indirect, incidental, special,
                consequential, exemplary, or punitive damages, or damages for loss of profits,
                goodwill, use, data, or other intangible losses, resulting from your use of our
                services or generated documents.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">No attorney-client relationship</h2>
              <p className="leading-relaxed">
                Your use of this website and our services does not create an attorney-client
                relationship of any kind. Communications with LegalLawDocs.com (including via
                email, chat, or support tickets) are not protected by attorney-client privilege
                and do not constitute legal advice.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">When to seek legal counsel</h2>
              <p className="leading-relaxed">
                We encourage you to consult a licensed attorney if your situation involves:
              </p>
              <ul className="mt-3 space-y-2">
                {[
                  "Significant financial transactions or assets",
                  "Business disputes or litigation",
                  "Criminal matters of any kind",
                  "Family law matters (divorce, child custody, adoption)",
                  "Immigration or visa issues",
                  "Complex intellectual property questions",
                  "Regulatory compliance in specialized industries",
                  "Any matter where you are unsure of your legal rights or obligations",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="flex-shrink-0 h-2 w-2 rounded-full bg-primary/60 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Governing law</h2>
              <p className="leading-relaxed">
                This disclaimer is governed by the laws of the State of Delaware, without regard
                to its conflict of law provisions. By using our services, you agree that any disputes
                arising from this disclaimer shall be subject to the jurisdiction of the courts
                located in the State of Delaware.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Questions</h2>
              <p className="leading-relaxed">
                If you have questions about this disclaimer or our services, please visit our{" "}
                <Link href="/help" className="text-primary underline underline-offset-4 hover:text-primary/80">
                  Help Center
                </Link>{" "}
                or review our{" "}
                <Link href="/terms" className="text-primary underline underline-offset-4 hover:text-primary/80">
                  Terms of Service
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
