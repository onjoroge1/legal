import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Mail, MessageSquare, Clock, MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us — LegalLawDocs.com",
  description:
    "Have a question about our AI-powered legal documents? Contact the LegalLawDocs.com support team. We're here to help you create the right document.",
  alternates: { canonical: "https://legallawdocs.com/contact" },
}

const contactMethods = [
  {
    icon: Mail,
    label: "Email Support",
    value: "support@legallawdocs.com",
    description: "We respond to all emails within 1 business day.",
  },
  {
    icon: MessageSquare,
    label: "Live Chat",
    value: "Available on every page",
    description: "Click the chat bubble in the bottom-right corner.",
  },
  {
    icon: Clock,
    label: "Support Hours",
    value: "Mon–Fri, 9 am–6 pm ET",
    description: "Urgent issues? Email us anytime — we monitor 24/7.",
  },
  {
    icon: MapPin,
    label: "Headquarters",
    value: "United States",
    description: "Serving customers across all 50 states.",
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
      "Our AI tailors every document to your state's requirements — including required disclosures, signing formalities, and notice periods. For documents requiring notarization or witnesses, we include step-by-step instructions.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Yes. If you're not satisfied with your document for any reason, contact us within 30 days of purchase and we'll issue a full refund — no questions asked.",
  },
  {
    question: "Do you offer bulk or business pricing?",
    answer:
      "Yes. Businesses creating multiple documents — law firms, property managers, HR departments — can contact us for volume pricing and white-label options.",
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
              Questions, feedback, or need help with a document? We're here. Real humans, real answers — usually within a few hours.
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
            <h2 className="text-2xl font-bold mb-6 text-center">Send Us a Message</h2>
            <form className="space-y-5 bg-card rounded-xl border p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Jane Smith"
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="jane@example.com"
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select a topic...</option>
                  <option value="document-help">Help with a document</option>
                  <option value="billing">Billing or refund</option>
                  <option value="technical">Technical issue</option>
                  <option value="business">Business / bulk pricing</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Describe your question or issue in detail..."
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-primary text-primary-foreground font-semibold py-2.5 text-sm hover:bg-primary/90 transition-colors"
              >
                Send Message
              </button>
              <p className="text-xs text-muted-foreground text-center">
                We typically respond within 1 business day. For urgent matters, use live chat.
              </p>
            </form>
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
