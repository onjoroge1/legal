import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Terms of Service — LegalLawDocs.com",
  description:
    "Read the Terms of Service for LegalLawDocs.com covering user accounts, payment terms, document ownership, intellectual property, and governing law.",
}

export default function TermsPage() {
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
            <h1 className="font-serif text-4xl font-bold text-foreground">Terms of Service</h1>
            <p className="mt-3 text-muted-foreground">
              Last updated: <span className="text-foreground font-medium">May 1, 2026</span>
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the website,
              products, and services provided by LegalLawDocs.com (&ldquo;LegalLawDocs,&rdquo; &ldquo;we,&rdquo;
              &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By accessing or using our services, you agree to be bound
              by these Terms. If you do not agree, you may not use our services.
            </p>
          </div>

          {/* Table of contents */}
          <nav className="mb-10 rounded-2xl border border-border/50 bg-card/60 p-5">
            <p className="text-sm font-semibold text-foreground mb-3">Contents</p>
            <ol className="space-y-1.5 text-sm text-primary">
              {[
                ["1. Acceptance of terms", "#acceptance"],
                ["2. Service description", "#service"],
                ["3. User accounts", "#accounts"],
                ["4. Payment terms", "#payment"],
                ["5. Document ownership", "#ownership"],
                ["6. Intellectual property", "#ip"],
                ["7. Prohibited uses", "#prohibited"],
                ["8. Disclaimer of warranties", "#warranties"],
                ["9. Limitation of liability", "#liability"],
                ["10. Indemnification", "#indemnification"],
                ["11. Governing law", "#governing"],
                ["12. Dispute resolution", "#disputes"],
                ["13. Termination", "#termination"],
                ["14. Changes to terms", "#changes"],
                ["15. Contact", "#contact"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="underline underline-offset-4 hover:text-primary/80">
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="space-y-10 text-muted-foreground">
            <section id="acceptance">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                1. Acceptance of terms
              </h2>
              <p className="leading-relaxed">
                By creating an account, making a purchase, or otherwise using our services,
                you represent that you are at least 18 years of age, have the legal capacity
                to enter into binding contracts, and agree to be bound by these Terms and our{" "}
                <Link href="/privacy" className="text-primary underline underline-offset-4 hover:text-primary/80">
                  Privacy Policy
                </Link>
                , which is incorporated herein by reference.
              </p>
              <p className="mt-3 leading-relaxed">
                If you are using our services on behalf of a company or organization, you
                represent that you have the authority to bind that entity to these Terms, and
                &ldquo;you&rdquo; refers to both you and that entity.
              </p>
            </section>

            <section id="service">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                2. Service description
              </h2>
              <p className="leading-relaxed">
                LegalLawDocs.com is a self-help legal document generation platform. We provide
                AI-assisted tools that generate customized legal documents based on information
                you provide. Our services include:
              </p>
              <ul className="mt-3 space-y-2">
                {[
                  "Access to a library of legal document templates across multiple categories",
                  "An AI-guided questionnaire to customize documents to your situation",
                  "Document generation and delivery in PDF and DOCX formats",
                  "Account management and document storage",
                  "Access to legal guides and informational articles",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="flex-shrink-0 h-2 w-2 rounded-full bg-primary/60 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 leading-relaxed">
                LegalLawDocs.com is not a law firm and does not provide legal advice. Use of our
                services does not create an attorney-client relationship. For more information,
                please review our{" "}
                <Link href="/disclaimer" className="text-primary underline underline-offset-4 hover:text-primary/80">
                  Legal Disclaimer
                </Link>
                .
              </p>
            </section>

            <section id="accounts">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                3. User accounts
              </h2>
              <p className="leading-relaxed">
                To access most of our services, you must create an account. When creating an account:
              </p>
              <ul className="mt-3 space-y-2">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 h-2 w-2 rounded-full bg-primary/60 mt-2" />
                  <span>You must provide accurate, current, and complete information.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 h-2 w-2 rounded-full bg-primary/60 mt-2" />
                  <span>You are responsible for maintaining the security of your account credentials.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 h-2 w-2 rounded-full bg-primary/60 mt-2" />
                  <span>
                    You are responsible for all activity that occurs under your account, whether or
                    not authorized by you.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 h-2 w-2 rounded-full bg-primary/60 mt-2" />
                  <span>
                    You must notify us immediately at{" "}
                    <a href="mailto:support@legallawdocs.com" className="text-primary underline underline-offset-4">
                      support@legallawdocs.com
                    </a>{" "}
                    if you suspect unauthorized access to your account.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 h-2 w-2 rounded-full bg-primary/60 mt-2" />
                  <span>You may not transfer, sell, or assign your account to another person.</span>
                </li>
              </ul>
            </section>

            <section id="payment">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                4. Payment terms
              </h2>
              <p className="leading-relaxed">
                Our services are available on a per-document (one-time) or subscription basis.
              </p>
              <ul className="mt-4 space-y-3">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 h-2 w-2 rounded-full bg-primary/60 mt-2" />
                  <span>
                    <strong className="text-foreground">One-time purchases:</strong> You pay the
                    listed price for a specific document. Payment is due at the time of purchase.
                    Access to the document is granted immediately upon successful payment.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 h-2 w-2 rounded-full bg-primary/60 mt-2" />
                  <span>
                    <strong className="text-foreground">Subscriptions:</strong> Subscriptions are
                    billed on a recurring basis (monthly or annually) at the rate stated at the
                    time of subscription. Subscriptions automatically renew unless cancelled prior
                    to the renewal date.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 h-2 w-2 rounded-full bg-primary/60 mt-2" />
                  <span>
                    <strong className="text-foreground">Payment processing:</strong> All payments
                    are processed by Stripe. By providing payment information, you authorize us to
                    charge the applicable fees.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 h-2 w-2 rounded-full bg-primary/60 mt-2" />
                  <span>
                    <strong className="text-foreground">Price changes:</strong> We reserve the right
                    to change our prices. For subscriptions, we will provide at least 30 days&apos;
                    advance notice of any price increase.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 h-2 w-2 rounded-full bg-primary/60 mt-2" />
                  <span>
                    <strong className="text-foreground">Refunds:</strong> Because documents are
                    delivered digitally and immediately, we generally do not offer refunds for
                    completed purchases. If you experience a technical issue, contact us within
                    7 days for resolution.
                  </span>
                </li>
              </ul>
            </section>

            <section id="ownership">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                5. Document ownership
              </h2>
              <p className="leading-relaxed">
                You own the documents you generate using our platform. The specific content of
                your generated documents — including the parties, terms, and customizations you
                enter — belongs to you. You may use, modify, reproduce, and distribute your
                generated documents for your personal or business purposes.
              </p>
              <p className="mt-3 leading-relaxed">
                You grant us a limited, non-exclusive license to store and process your document
                content solely as necessary to provide our services (e.g., to store your documents
                in your account for re-download). We will not use the specific content of your
                documents for any other purpose.
              </p>
            </section>

            <section id="ip">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                6. Intellectual property
              </h2>
              <p className="leading-relaxed">
                LegalLawDocs.com and its licensors retain all intellectual property rights in the
                website, platform, document templates (as distinct from your customized outputs),
                AI systems, logos, trademarks, guides, and all other content and materials we
                create. Nothing in these Terms grants you any ownership interest in our platform
                or intellectual property.
              </p>
              <p className="mt-3 leading-relaxed">
                You may not copy, reproduce, distribute, modify, or create derivative works of
                our platform, templates, or other proprietary content without our express written
                permission.
              </p>
            </section>

            <section id="prohibited">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                7. Prohibited uses
              </h2>
              <p className="leading-relaxed">You agree not to use our services to:</p>
              <ul className="mt-3 space-y-2">
                {[
                  "Create fraudulent, deceptive, or misleading documents",
                  "Facilitate illegal activity of any kind",
                  "Impersonate any person or entity",
                  "Violate the intellectual property rights of others",
                  "Scrape, harvest, or extract data from our platform using automated means",
                  "Attempt to gain unauthorized access to any part of our systems",
                  "Resell or redistribute our services or documents without written authorization",
                  "Transmit malware, viruses, or other harmful code",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="flex-shrink-0 h-2 w-2 rounded-full bg-primary/60 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="warranties">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                8. Disclaimer of warranties
              </h2>
              <p className="leading-relaxed uppercase text-sm font-medium text-foreground/80">
                TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, LEGALLAWDOCS.COM PROVIDES
                ITS SERVICES &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE,&rdquo; WITHOUT WARRANTIES OF ANY KIND,
                EITHER EXPRESS OR IMPLIED. WE DISCLAIM ALL IMPLIED WARRANTIES, INCLUDING WITHOUT
                LIMITATION WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
                NON-INFRINGEMENT, AND ANY WARRANTIES ARISING FROM COURSE OF DEALING OR USAGE
                OF TRADE.
              </p>
              <p className="mt-4 leading-relaxed">
                We do not warrant that our services will be uninterrupted, error-free, or free
                from harmful components. We do not warrant that the documents we generate will be
                legally enforceable in any specific jurisdiction or for any specific purpose.
              </p>
            </section>

            <section id="liability">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                9. Limitation of liability
              </h2>
              <p className="leading-relaxed uppercase text-sm font-medium text-foreground/80">
                TO THE FULLEST EXTENT PERMITTED BY LAW, LEGALLAWDOCS.COM AND ITS AFFILIATES,
                OFFICERS, DIRECTORS, EMPLOYEES, AND LICENSORS SHALL NOT BE LIABLE FOR ANY
                INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES,
                INCLUDING LOSS OF PROFITS, DATA, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING
                FROM YOUR USE OF OR INABILITY TO USE OUR SERVICES.
              </p>
              <p className="mt-4 leading-relaxed">
                In no event shall our total aggregate liability to you for all claims arising
                from or related to your use of our services exceed the greater of (a) the amounts
                you paid to us in the 12 months preceding the claim, or (b) one hundred U.S.
                dollars ($100).
              </p>
              <p className="mt-3 leading-relaxed">
                Some jurisdictions do not allow the exclusion or limitation of certain damages,
                so some of the above limitations may not apply to you.
              </p>
            </section>

            <section id="indemnification">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                10. Indemnification
              </h2>
              <p className="leading-relaxed">
                You agree to indemnify, defend, and hold harmless LegalLawDocs.com and its
                affiliates, officers, directors, employees, agents, and licensors from and against
                any claims, liabilities, damages, judgments, awards, losses, costs, and expenses
                (including reasonable attorneys&apos; fees) arising from: (a) your use of our services;
                (b) your violation of these Terms; (c) your violation of any third-party rights;
                or (d) any documents you create using our platform.
              </p>
            </section>

            <section id="governing">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                11. Governing law
              </h2>
              <p className="leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the
                State of Delaware, without regard to its conflict of law provisions. You agree to
                submit to the exclusive personal jurisdiction of the state and federal courts
                located in Delaware for any disputes arising from these Terms or your use of our
                services that are not subject to arbitration (as described below).
              </p>
            </section>

            <section id="disputes">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                12. Dispute resolution
              </h2>
              <p className="leading-relaxed">
                We encourage you to contact us first to resolve any disputes informally. Most
                concerns can be resolved quickly by contacting our support team.
              </p>
              <p className="mt-3 leading-relaxed">
                For disputes that cannot be resolved informally, you and LegalLawDocs.com agree
                to resolve any dispute, claim, or controversy arising from or related to these
                Terms or our services through binding individual arbitration, except that either
                party may seek injunctive relief in a court of competent jurisdiction for
                intellectual property disputes or to prevent irreparable harm.
              </p>
              <p className="mt-3 leading-relaxed">
                <strong className="text-foreground">Class action waiver:</strong> You agree that
                any arbitration shall be conducted on an individual basis and not as a class
                action, collective action, or representative proceeding. You waive any right to
                participate in a class action lawsuit or class-wide arbitration.
              </p>
            </section>

            <section id="termination">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                13. Termination
              </h2>
              <p className="leading-relaxed">
                We reserve the right to suspend or terminate your account and access to our
                services at any time, with or without cause, and with or without notice, at our
                sole discretion — including for violations of these Terms or conduct that we
                determine is harmful to our users, services, or third parties.
              </p>
              <p className="mt-3 leading-relaxed">
                You may terminate your account at any time by contacting us or through your
                account settings. Upon termination, your right to use our services ceases
                immediately. Sections of these Terms that by their nature should survive
                termination (including disclaimer of warranties, limitation of liability,
                indemnification, and dispute resolution) shall survive.
              </p>
            </section>

            <section id="changes">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                14. Changes to terms
              </h2>
              <p className="leading-relaxed">
                We may modify these Terms from time to time. When we make material changes, we
                will provide notice by email or by posting a prominent notice on our website.
                The updated Terms will indicate the revision date. Your continued use of our
                services after the effective date of the revised Terms constitutes your acceptance
                of the changes. If you do not agree to the revised Terms, you must stop using
                our services.
              </p>
            </section>

            <section id="contact">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                15. Contact
              </h2>
              <p className="leading-relaxed">
                If you have questions about these Terms, please contact us:
              </p>
              <div className="mt-4 rounded-2xl border border-border/50 bg-card/60 p-5 text-sm space-y-1.5">
                <p className="font-semibold text-foreground">LegalLawDocs.com — Legal Team</p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:legal@legallawdocs.com"
                    className="text-primary underline underline-offset-4 hover:text-primary/80"
                  >
                    legal@legallawdocs.com
                  </a>
                </p>
                <p>
                  Help Center:{" "}
                  <Link href="/help" className="text-primary underline underline-offset-4 hover:text-primary/80">
                    legallawdocs.com/help
                  </Link>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
