import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Does LegalLawDocs determine whether my document is enforceable?",
    answer:
      "No. Enforceability depends on your facts, jurisdiction, document terms, and execution requirements. LegalLawDocs supplies a self-help draft, not a legal opinion. Ask a licensed attorney in your jurisdiction to review the draft before you rely on or sign it.",
  },
  {
    question: "What does state-aware drafting mean?",
    answer:
      "Selecting a state changes some questions, drafting notes, and reference material. Laws and official guidance change, and the software cannot verify that a draft meets every requirement that applies to you. Review current official sources and consult a licensed attorney.",
  },
  {
    question: "Can I edit the documents after they are generated?",
    answer:
      "Absolutely. All documents are delivered in editable formats (Word and PDF). You can make modifications as needed. Professional and Enterprise plan users also have access to our built-in document editor with guided legal suggestions.",
  },
  {
    question: "What types of documents can I create?",
    answer:
      "We offer 50+ document templates spanning business (NDAs, LLC agreements, partnership agreements), real estate (lease agreements, purchase contracts), employment (contracts, offer letters, non-competes), and personal (wills, power of attorney, living trusts) categories.",
  },
  {
    question: "How is my data protected?",
    answer:
      "We use account access controls and service providers described in our Privacy Policy. When payments are enabled, card details are entered on Stripe's hosted checkout rather than sent to LegalLawDocs. No internet service can promise absolute security.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Completed digital purchases and commenced subscription periods are generally final, except where law requires otherwise. If a verified technical failure prevents delivery, contact support within 7 days so we can resolve it or consider a credit. See the Terms for the controlling policy.",
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="relative py-24 lg:py-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-accent/3 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            FAQ
          </p>
          <h2 className="mt-3 text-balance font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
            Everything you need to know about using LegalLawDocs for your legal
            document needs.
          </p>
        </div>

        <Accordion type="single" collapsible className="mt-14">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={`faq-${index}`}
              value={`faq-${index}`}
              className="border-border/40 py-1"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground transition-colors hover:text-primary hover:no-underline [&[data-state=open]]:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
