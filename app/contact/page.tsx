import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Mail, MessageSquare, Clock, MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us — LegalLawDocs.com",
  description:
    "Contact LegalLawDocs.com for product, account, billing, and technical support. Support cannot provide legal advice.",
  alternates: { canonical: "https://legallawdocs.com/contact" },
}

const contactMethods = [
  {
    icon: Mail,
    label: "Email Support",
    value: "support@legallawdocs.com",
    description: "Response times vary by request volume.",
  },
  {
    icon: MessageSquare,
    label: "Product Support",
    value: "Accounts and documents",
    description: "We can explain the software, not your legal rights.",
  },
  {
    icon: Clock,
    label: "Support Hours",
    value: "Email-based support",
    description: "Do not use this service for urgent legal deadlines.",
  },
  {
    icon: MapPin,
    label: "Service Area",
    value: "United States",
    description: "State selection is a drafting aid, not legal advice.",
  },
]

const faqs = [
  {
    question: "How do I edit a document I already created?",
    answer:
      "Log into your dashboard, find the document under 'My Documents,' and click 'Edit.' You can update any field and re-download the revised PDF or DOCX at no extra charge.",
  },
  {
    question: "Is my document legally valid in my state?",
    answer:
      "LegalLawDocs cannot determine that. The workflow may surface state-aware questions and execution notes, but enforceability depends on current law and your facts. Consult a licensed attorney in your jurisdiction before use.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Completed digital purchases and commenced subscription periods are generally final, except where law requires otherwise. Contact us within 7 days if a verified technical failure prevented delivery. The Terms control the refund policy.",
  },
  {
    question: "Do you offer bulk or business pricing?",
    answer:
      "We do not currently promise volume pricing or white-label features. Contact support to ask what is available; any price, scope, and terms must be confirmed in writing before purchase.",
  },
]

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-gradient-to-b from-muted/50 to-background py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Contact Us</h1>
            <p className="text-xl text-muted-foreground">
              Questions about the product, your account, or billing? Email support. We cannot answer
              legal questions or advise you which document or terms to use.
            </p>
          </div>
        </section>

        {/* Contact methods */}
        <section className="py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactMethods.map((method) => (
                <div
                  key={method.label}
                  className="rounded-xl border bg-card p-6 flex flex-col gap-3"
                >
                  <method.icon className="h-8 w-8 text-primary" />
                  <div>
                    <div className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                      {method.label}
                    </div>
                    <div className="font-bold mt-1">{method.value}</div>
                    <div className="text-sm text-muted-foreground mt-1">{method.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact form */}
        <section className="py-12 px-4 bg-muted/30">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Email Support</h2>
            <div className="space-y-5 bg-card rounded-xl border p-8 text-center">
              <p className="text-sm leading-relaxed text-muted-foreground">
                The previous contact form did not submit messages, so it has been removed. Email us
                directly and include your account email, the affected page, and a description of the issue.
                Do not send confidential legal facts or time-sensitive requests.
              </p>
              <a
                href="mailto:support@legallawdocs.com?subject=LegalLawDocs%20support%20request"
                className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Email support@legallawdocs.com
              </a>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-xl border bg-card p-6">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
