import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HelpCircle, CreditCard, FileText, MessageCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Help Center — LegalLawDocs.com",
  description:
    "Find answers about LegalLawDocs drafting workflows, billing, subscriptions, data handling, and the limits of AI-generated drafts.",
}

const sections = [
  {
    id: "getting-started",
    icon: HelpCircle,
    title: "Getting Started",
    faqs: [
      {
        q: "How do I create a document?",
        a: "Choose a document type, answer the plain-language questions, inspect the assembled draft, and correct any placeholders or flagged citations. You can then download a PDF or Word file for attorney review.",
      },
      {
        q: "What file formats do you offer?",
        a: "All documents are available as PDF (for signing and sharing) and DOCX (Microsoft Word format, for further editing). Both formats are included with every purchase — there are no additional fees for format selection.",
      },
      {
        q: "Is my data secure?",
        a: "We use account access controls and third-party service providers described in our Privacy Policy. Payment card entry occurs on Stripe-hosted checkout when payments are enabled. No online service can guarantee absolute security, so avoid entering information the document does not require.",
      },
      {
        q: "Do I need an account to create a document?",
        a: "You'll need a free account to save and re-download your documents. Creating an account takes less than a minute with your email address. We never require a paid subscription just to generate and download a single document.",
      },
      {
        q: "What states do you cover?",
        a: "The workflow lets you select any U.S. state and may surface jurisdiction-aware questions, terminology, and reference material. That selection does not establish that the resulting draft satisfies current state or local law.",
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
        a: "Catalog prices currently range from $14–$29 per document. The applicable one-time price is displayed on the document page and again before you authorize payment.",
      },
      {
        q: "What does a subscription include?",
        a: "The Professional option is a recurring plan for ongoing drafting access. The checkout page is the source of truth for the current price, billing interval, and included features. Review those terms before authorizing payment.",
      },
      {
        q: "How do I cancel my subscription?",
        a: "Use the billing dashboard to request cancellation. The timing of cancellation and continued access is governed by the subscription terms shown before purchase and the Terms of Service.",
      },
      {
        q: "What payment methods do you accept?",
        a: "When payments are enabled, Stripe Checkout displays the payment methods available for your transaction. Card details are entered on Stripe's hosted page, and LegalLawDocs does not receive your full card number.",
      },
      {
        q: "Can I get a refund?",
        a: "Completed digital purchases and commenced subscription periods are generally final, except where law requires otherwise. If a verified technical failure prevents delivery, contact support within 7 days so we can resolve the issue or consider a credit. See the Terms for the controlling policy.",
      },
    ],
  },
  {
    id: "documents",
    icon: FileText,
    title: "Documents & Legal",
    faqs: [
      {
        q: "Does LegalLawDocs determine whether a draft is enforceable?",
        a: "No. Enforceability depends on current law, the document terms, your facts, and proper execution. LegalLawDocs is a self-help drafting tool and does not provide a legal opinion. Consult a licensed attorney in your jurisdiction before relying on or signing any draft.",
      },
      {
        q: "Can I edit my document after downloading it?",
        a: "Yes. DOCX downloads are fully editable in Microsoft Word, Google Docs, or any compatible word processor. PDF downloads are not editable by default, but you can use a PDF editor or re-generate the document with updated answers through your account dashboard.",
      },
      {
        q: "Do I need a lawyer to use these documents?",
        a: "You may use the software to prepare a draft, but you should consult a licensed attorney before relying on, signing, filing, or sending it. Professional review is especially important for deadlines, disputes, regulated matters, significant assets, or unfamiliar terms.",
      },
      {
        q: "Are the documents up to date with current law?",
        a: "Do not assume so. Laws, forms, agency guidance, and local rules change, and software updates may lag. Check current official sources and ask a licensed attorney to confirm which requirements apply before use.",
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
              Email support for product, account, billing, or technical questions. Response times vary.
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
