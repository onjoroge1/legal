import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HelpCircle, CreditCard, FileText, MessageCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Help Center — LegalLawDocs.com",
  description:
    "Find answers to common questions about creating documents, billing, subscriptions, and whether LegalLawDocs documents are legally binding.",
}

const sections = [
  {
    id: "getting-started",
    icon: HelpCircle,
    title: "Getting Started",
    faqs: [
      {
        q: "How do I create a document?",
        a: "Choose a document type from our library, answer a series of plain-language questions about your specific situation, and we'll generate a professionally formatted document tailored to your needs. The process typically takes 5–10 minutes. You can then download your document as a PDF or Word file.",
      },
      {
        q: "What file formats do you offer?",
        a: "All documents are available as PDF (for signing and sharing) and DOCX (Microsoft Word format, for further editing). Both formats are included with every purchase — there are no additional fees for format selection.",
      },
      {
        q: "Is my data secure?",
        a: "Yes. All data is encrypted in transit using 256-bit SSL and encrypted at rest. We are SOC 2 compliant and GDPR ready. Your document content is never shared with third parties except as required to process payments (Stripe) or as required by law. See our Privacy Policy for full details.",
      },
      {
        q: "Do I need an account to create a document?",
        a: "You'll need a free account to save and re-download your documents. Creating an account takes less than a minute with your email address. We never require a paid subscription just to generate and download a single document.",
      },
      {
        q: "What states do you cover?",
        a: "Our documents cover all 50 U.S. states. During the document creation process, you'll be asked to specify your state, and the generated document will reflect state-specific requirements and terminology where applicable.",
      },
    ],
  },
  {
    id: "billing",
    icon: CreditCard,
    title: "Billing & Subscriptions",
    faqs: [
      {
        q: "What is the one-time price for a document?",
        a: "Individual documents are available for a one-time purchase with no recurring fees. Pricing varies by document type and is displayed on each document page before you begin. Most documents range from $9.99 to $29.99.",
      },
      {
        q: "What does a subscription include?",
        a: "Our subscription plan gives you unlimited document access — generate as many documents as you need, across all categories, for one flat monthly or annual fee. Subscribers also get priority support, re-download access to all past documents, and early access to new templates.",
      },
      {
        q: "How do I cancel my subscription?",
        a: "You can cancel at any time from your account dashboard under Settings → Subscription. Your access continues until the end of your current billing period — there are no cancellation fees and no questions asked.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover) via Stripe. All transactions are processed securely. We do not store your full card details on our servers.",
      },
      {
        q: "Can I get a refund?",
        a: "If you experience a technical issue that prevents you from downloading your document, contact us within 7 days and we'll resolve it or issue a full refund. Because documents are delivered digitally and immediately upon payment, we generally do not offer refunds for completed purchases where the document was successfully delivered.",
      },
    ],
  },
  {
    id: "documents",
    icon: FileText,
    title: "Documents & Legal",
    faqs: [
      {
        q: "Are LegalLawDocs documents legally binding?",
        a: "Our documents are drafted on attorney-reviewed frameworks and are designed to be legally valid when properly completed and executed. However, enforceability depends on correct completion, proper signing procedures, and compliance with your specific state's laws. We recommend having any document reviewed by a licensed attorney before use in high-stakes situations.",
      },
      {
        q: "Can I edit my document after downloading it?",
        a: "Yes. DOCX downloads are fully editable in Microsoft Word, Google Docs, or any compatible word processor. PDF downloads are not editable by default, but you can use a PDF editor or re-generate the document with updated answers through your account dashboard.",
      },
      {
        q: "Do I need a lawyer to use these documents?",
        a: "For many common legal situations — standard NDAs, simple lease agreements, basic employment offer letters — our documents are sufficient on their own. However, for complex transactions, high-value contracts, business acquisitions, or estate planning involving significant assets, we strongly recommend consulting a licensed attorney in addition to using our documents.",
      },
      {
        q: "Are the documents up to date with current law?",
        a: "Our legal team regularly reviews and updates document templates to reflect changes in federal and state law. The date of the last update is displayed on each document template page. If you're concerned about a recent legal change, please contact our support team.",
      },
      {
        q: "Who owns the documents I create?",
        a: "You own the documents you generate. Once you download a document, it is yours to use, modify, and retain. We do not claim any intellectual property rights over the specific content of your generated documents.",
      },
    ],
  },
]

export default function HelpPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative border-b border-border/40 bg-gradient-to-b from-primary/5 to-background">
          <div className="mx-auto max-w-4xl px-4 py-16 text-center lg:px-8 lg:py-20">
            <div className="mb-4 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Support
            </div>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
              Help Center
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Find answers to common questions — or{" "}
              <Link href="/contact" className="text-primary underline underline-offset-4 hover:text-primary/80">
                contact our team
              </Link>{" "}
              if you need more help.
            </p>
          </div>
        </section>

        {/* Navigation */}
        <section className="border-b border-border/40 bg-card/40">
          <div className="mx-auto max-w-4xl px-4 py-4 lg:px-8">
            <div className="flex flex-wrap gap-3">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-border/50 bg-card/60 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <section.icon className="h-4 w-4" />
                  {section.title}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Sections */}
        <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8 lg:py-16">
          <div className="space-y-14">
            {sections.map((section) => (
              <section key={section.id} id={section.id}>
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                    <section.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-foreground">{section.title}</h2>
                </div>

                <div className="space-y-3">
                  {section.faqs.map((faq) => (
                    <details
                      key={faq.q}
                      className="group rounded-2xl border border-border/50 bg-card/60"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-medium text-foreground transition-colors hover:text-primary [&::-webkit-details-marker]:hidden">
                        <span>{faq.q}</span>
                        <span className="flex-shrink-0 text-muted-foreground transition-transform group-open:rotate-45">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </span>
                      </summary>
                      <div className="border-t border-border/40 px-5 pb-5 pt-4">
                        <p className="leading-relaxed text-muted-foreground">{faq.a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-14 rounded-2xl border border-border/50 bg-card/60 p-8 text-center">
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 border border-accent/20">
              <MessageCircle className="h-5 w-5 text-accent" />
            </div>
            <h3 className="font-serif text-xl font-bold text-foreground">Still have questions?</h3>
            <p className="mt-2 text-muted-foreground">
              Our support team typically responds within 24 hours on business days.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-opacity hover:opacity-90"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
