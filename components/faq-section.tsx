import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
 { question: "Can this service give legal advice?", answer: "No. LegalLawDocs prepares drafts. Ask a licensed attorney in your jurisdiction to review your circumstances and document before use." },
 { question: "Can I revise a saved draft?", answer: "Yes. Reopen a saved version in your dashboard and revise its inputs to create a new version. A one-time purchase applies only to the version purchased. Export also requires document review." },
 { question: "What is available at launch?", answer: "The Documents collection lists currently reviewed scopes. Other document types and jurisdiction pages remain pending review. See Review status for current availability." },
 { question: "What does checkout cost?", answer: "When new sales are enabled, checkout displays the configured price before payment. New purchases are blocked until approved business and refund terms are published." },
 { question: "How do I get help with a charge?", answer: "Open a support ticket on the Contact page. Save its access code to read the response. Support cannot provide legal advice." },
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
