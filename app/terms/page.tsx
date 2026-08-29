import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AlertTriangle, Scale } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service — LegalLawDocs.com",
  description:
    "Terms of Service for LegalLawDocs.com. Read our complete terms covering AI-generated document limitations, no legal advice, liability, indemnification, and governing law.",
}

const SECTIONS = [
  ["1. Acceptance of terms", "#acceptance"],
  ["2. Service description", "#service"],
  ["3. AI-generated content — critical limitations", "#ai"],
  ["4. No legal advice; no attorney-client relationship", "#no-legal-advice"],
  ["5. User accounts", "#accounts"],
  ["6. Payment terms", "#payment"],
  ["7. Subscriptions & cancellation", "#subscriptions"],
  ["8. Refund policy", "#refunds"],
  ["9. Document ownership & license", "#ownership"],
  ["10. Intellectual property", "#ip"],
  ["11. User content & data", "#user-content"],
  ["12. Prohibited uses", "#prohibited"],
  ["13. Electronic signatures", "#esign"],
  ["14. Third-party services", "#third-party"],
  ["15. Disclaimer of warranties", "#warranties"],
  ["16. Limitation of liability", "#liability"],
  ["17. Indemnification", "#indemnification"],
  ["18. Force majeure", "#force-majeure"],
  ["19. DMCA / copyright", "#dmca"],
  ["20. Governing law", "#governing"],
  ["21. Dispute resolution & arbitration", "#disputes"],
  ["22. Class action waiver", "#class-action"],
  ["23. Severability", "#severability"],
  ["24. Entire agreement & waiver", "#entire-agreement"],
  ["25. Termination", "#termination"],
  ["26. Changes to terms", "#changes"],
  ["27. Contact", "#contact"],
]

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="flex-shrink-0 mt-[7px] h-1.5 w-1.5 rounded-full bg-primary/60" />
      <span className="leading-relaxed">{children}</span>
    </li>
  )
}

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="font-serif text-2xl font-bold text-foreground mb-4 scroll-mt-20">
      {children}
    </h2>
  )
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-5 rounded-xl border border-amber-400/40 bg-amber-50/60 dark:bg-amber-950/20 p-5">
      <div className="flex gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
        <div className="text-sm leading-relaxed text-foreground/90">{children}</div>
      </div>
    </div>
  )
}

function Caps({ children }: { children: React.ReactNode }) {
  return (
    <p className="leading-relaxed text-sm font-semibold uppercase tracking-wide text-foreground/80 bg-secondary/40 rounded-lg px-4 py-3 my-4 border border-border/50">
      {children}
    </p>
  )
}

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <div className="mx-auto max-w-4xl px-4 py-16 lg:px-8 lg:py-24">

          {/* ── Page header ───────────────────────────────────────────────── */}
          <div className="mb-10 border-b border-border/40 pb-8">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Scale className="h-3 w-3" />
              Legal
            </div>
            <h1 className="font-serif text-4xl font-bold text-foreground">Terms of Service</h1>
            <p className="mt-3 text-muted-foreground">
              Last updated: <span className="text-foreground font-medium">May 22, 2026</span>
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement
              between you and LegalLawDocs.com (&ldquo;LegalLawDocs,&rdquo; &ldquo;we,&rdquo;
              &ldquo;us,&rdquo; or &ldquo;our&rdquo;) governing your access to and use of our
              website, platform, and services. <strong className="text-foreground">By using our
              services you agree to these Terms in their entirety.</strong> If you do not agree,
              you must not use our services.
            </p>
          </div>

          {/* ── Critical notice ───────────────────────────────────────────── */}
          <div className="mb-10 rounded-2xl border-2 border-amber-400/50 bg-amber-50/50 dark:bg-amber-950/20 p-6">
            <div className="flex gap-4">
              <AlertTriangle className="mt-0.5 h-6 w-6 flex-shrink-0 text-amber-600" />
              <div className="space-y-2">
                <p className="font-bold text-foreground">Read this before using our platform.</p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  LegalLawDocs.com is <strong className="text-foreground">not a law firm</strong> and
                  does <strong className="text-foreground">not provide legal advice</strong>. Our
                  platform uses artificial intelligence to generate document drafts. AI-generated documents
                  may contain errors, may not reflect the most current law, and are not a substitute for
                  independent legal counsel. You use all documents generated by our platform entirely
                  at your own risk. We strongly recommend having a licensed attorney review any document
                  before you execute or rely on it.
                </p>
              </div>
            </div>
          </div>

          {/* ── Table of contents ─────────────────────────────────────────── */}
          <nav className="mb-12 rounded-2xl border border-border/50 bg-card/60 p-6">
            <p className="text-sm font-semibold text-foreground mb-3">Contents</p>
            <ol className="grid sm:grid-cols-2 gap-x-8 gap-y-1.5 text-sm text-primary">
              {SECTIONS.map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="underline underline-offset-4 hover:text-primary/80">
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="space-y-12 text-muted-foreground">

            {/* ── 1. Acceptance ─────────────────────────────────────────── */}
            <section id="acceptance">
              <H2 id="acceptance">1. Acceptance of terms</H2>
              <p className="leading-relaxed">
                By creating an account, making a purchase, clicking &ldquo;I agree,&rdquo; or
                otherwise accessing or using our services, you represent that you are:
              </p>
              <ul className="mt-3 space-y-2">
                <Li>At least 18 years of age;</Li>
                <Li>Legally capable of entering into a binding contract in your jurisdiction;</Li>
                <Li>
                  If acting on behalf of an organisation, duly authorised to bind that entity to
                  these Terms.
                </Li>
              </ul>
              <p className="mt-4 leading-relaxed">
                Your continued use of our services after any update to these Terms constitutes
                your acceptance of the revised Terms.
              </p>
            </section>

            {/* ── 2. Service description ────────────────────────────────── */}
            <section id="service">
              <H2 id="service">2. Service description</H2>
              <p className="leading-relaxed">
                LegalLawDocs.com is a self-help legal document generation platform. We provide
                AI-assisted tools that produce customised document drafts based on information
                you supply. Our services include document generation, account management, document
                storage, and access to legal guides and informational articles.
              </p>
              <p className="mt-4 leading-relaxed font-medium text-foreground">
                LegalLawDocs.com is not a law firm. We do not provide legal advice, legal
                representation, or legal services of any kind. Nothing we provide constitutes the
                practice of law.
              </p>
            </section>

            {/* ── 3. AI — CRITICAL ──────────────────────────────────────── */}
            <section id="ai">
              <H2 id="ai">3. AI-generated content — critical limitations</H2>

              <Callout>
                <strong>This section contains critical disclosures about the limitations of
                AI-generated documents. Read it carefully before using our platform.</strong>
              </Callout>

              <p className="leading-relaxed">
                Our platform uses large-language-model artificial intelligence technology to
                generate legal document drafts. By using our platform you expressly acknowledge
                and agree to each of the following:
              </p>

              <div className="mt-5 space-y-5">
                <div>
                  <p className="font-semibold text-foreground">(a) AI systems make errors.</p>
                  <p className="mt-1 leading-relaxed">
                    AI models can produce plausible-sounding but legally incorrect text — a
                    phenomenon known as &ldquo;hallucination.&rdquo; Generated documents may
                    contain errors, omissions, mis-stated statutes, incorrect legal standards,
                    or provisions that are unenforceable, inapplicable, or contrary to current
                    law. We make no warranty as to the accuracy, completeness, or currency of
                    any AI-generated output.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-foreground">(b) No guarantee of enforceability.</p>
                  <p className="mt-1 leading-relaxed">
                    The generation or delivery of a document does not guarantee, represent, or
                    warrant that the document is legally enforceable in any jurisdiction or
                    context. Enforceability depends on factors entirely outside our control,
                    including the circumstances of the parties, applicable local law, proper
                    execution, consideration, capacity, and compliance with formalities required
                    by jurisdiction-specific statutes.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-foreground">(c) Law changes; our documents may lag.</p>
                  <p className="mt-1 leading-relaxed">
                    Statutes, regulations, and court interpretations change frequently and vary
                    materially across states and localities. While we work to keep our templates
                    current, we cannot guarantee that any generated document reflects the most
                    recent legal developments applicable to your specific jurisdiction and
                    circumstances at the time of generation or use.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-foreground">(d) Your input determines output quality.</p>
                  <p className="mt-1 leading-relaxed">
                    The quality, accuracy, and appropriateness of generated documents depend
                    entirely on the accuracy and completeness of information you provide. You
                    represent and warrant that all information you submit is truthful, accurate,
                    and complete. We accept no responsibility for documents that are incorrect,
                    misleading, or unenforceable because you provided inaccurate, incomplete, or
                    false information.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-foreground">(e) Not suitable for complex or high-stakes matters.</p>
                  <p className="mt-1 leading-relaxed">
                    Our platform is designed for common, routine legal situations. It is expressly
                    not suitable for complex transactions, matters involving significant financial
                    exposure, business disputes, regulatory compliance in specialised industries,
                    matters with international dimensions, or any situation where the consequences
                    of a legal error could be severe. For such matters you must consult a licensed
                    attorney.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-foreground">(f) Independent review is your responsibility.</p>
                  <p className="mt-1 leading-relaxed">
                    You are solely and entirely responsible for reviewing any generated document
                    before signing, executing, or relying on it.{" "}
                    <strong className="text-foreground">
                      We strongly recommend that you have a licensed attorney in your jurisdiction
                      review any document before you execute it or use it for any legal purpose.
                    </strong>{" "}
                    Your failure to seek independent legal review does not diminish your agreement
                    to these Terms or your assumption of all associated risks.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-foreground">(g) Third-party reliance.</p>
                  <p className="mt-1 leading-relaxed">
                    You assume all risk for how counterparties, courts, regulators, or any third
                    party treats, interprets, or enforces any document you generate using our
                    platform. We are not liable to you or to any third party for any outcome
                    resulting from a third party&apos;s reliance on, rejection of, or legal
                    challenge to any generated document.
                  </p>
                </div>
              </div>

              <Caps>
                YOU EXPRESSLY AGREE THAT YOUR USE OF AI-GENERATED DOCUMENTS IS ENTIRELY AT YOUR
                OWN RISK AND THAT LEGALLAWDOCS.COM IS NOT RESPONSIBLE FOR ANY LEGAL, FINANCIAL,
                OR OTHER CONSEQUENCE ARISING FROM YOUR USE OF OR RELIANCE ON ANY DOCUMENT
                GENERATED THROUGH OUR PLATFORM.
              </Caps>
            </section>

            {/* ── 4. No legal advice ────────────────────────────────────── */}
            <section id="no-legal-advice">
              <H2 id="no-legal-advice">4. No legal advice; no attorney-client relationship</H2>

              <Caps>
                LEGALLAWDOCS.COM IS NOT A LAW FIRM AND DOES NOT PROVIDE LEGAL ADVICE, LEGAL
                OPINIONS, OR LEGAL REPRESENTATION OF ANY KIND.
              </Caps>

              <ul className="mt-4 space-y-3">
                <Li>
                  The documents, templates, guides, articles, and other content we provide are
                  for general informational and self-help purposes only. Nothing on our platform
                  constitutes legal advice, legal opinion, or any professional advice specific
                  to your individual circumstances.
                </Li>
                <Li>
                  No attorney-client relationship is formed between you and LegalLawDocs.com, or
                  any of its employees, contractors, officers, or affiliates, through your use of
                  our platform, your purchase of our services, or any communications with us
                  (including via email, chat, or support channels).
                </Li>
                <Li>
                  Communications with LegalLawDocs.com are not protected by attorney-client
                  privilege and do not constitute confidential legal communications.
                </Li>
                <Li>
                  We are not a substitute for a licensed attorney. For legal advice tailored to
                  your specific circumstances, please consult a licensed attorney in your
                  jurisdiction. You can find attorneys through our{" "}
                  <Link href="/lawyers" className="text-primary underline underline-offset-4 hover:text-primary/80">
                    attorney directory
                  </Link>
                  .
                </Li>
              </ul>
            </section>

            {/* ── 5. User accounts ──────────────────────────────────────── */}
            <section id="accounts">
              <H2 id="accounts">5. User accounts</H2>
              <p className="leading-relaxed">
                To access most services you must create an account. When doing so you must provide
                accurate, current, and complete information and keep it updated. You are responsible
                for all activity that occurs under your account and must notify us immediately at{" "}
                <a href="mailto:support@legallawdocs.com" className="text-primary underline underline-offset-4">
                  support@legallawdocs.com
                </a>{" "}
                if you suspect unauthorised access. You may not transfer or assign your account.
                We reserve the right to refuse service, terminate accounts, or remove content at
                our discretion.
              </p>
            </section>

            {/* ── 6. Payment ────────────────────────────────────────────── */}
            <section id="payment">
              <H2 id="payment">6. Payment terms</H2>
              <ul className="space-y-3">
                <Li>
                  <strong className="text-foreground">One-time purchases:</strong> You pay the
                  listed price for a specific document. Payment is due at the time of purchase;
                  access is granted immediately upon successful payment.
                </Li>
                <Li>
                  <strong className="text-foreground">Payment processing:</strong> All payments
                  are processed by Stripe, Inc. By providing payment information you authorise us
                  to charge the applicable fees. We do not store your full payment card details.
                </Li>
                <Li>
                  <strong className="text-foreground">Taxes:</strong> You are responsible for all
                  applicable taxes, levies, or duties imposed by taxing authorities on your
                  purchases.
                </Li>
                <Li>
                  <strong className="text-foreground">Price changes:</strong> We reserve the right
                  to change prices at any time. For subscriptions, we will provide at least 30
                  days&apos; advance notice of any price increase.
                </Li>
              </ul>
            </section>

            {/* ── 7. Subscriptions ──────────────────────────────────────── */}
            <section id="subscriptions">
              <H2 id="subscriptions">7. Subscriptions &amp; cancellation</H2>
              <ul className="space-y-3">
                <Li>
                  Subscriptions are billed on a recurring monthly basis at the rate stated at
                  the time of subscription and automatically renew unless cancelled prior to the
                  renewal date.
                </Li>
                <Li>
                  You may cancel at any time through your dashboard or by contacting us. Cancellation
                  takes effect at the end of the current billing period; you retain access until then.
                </Li>
                <Li>
                  We may suspend or terminate your subscription immediately if payment fails or
                  if you violate these Terms.
                </Li>
              </ul>
            </section>

            {/* ── 8. Refunds ────────────────────────────────────────────── */}
            <section id="refunds">
              <H2 id="refunds">8. Refund policy</H2>
              <p className="leading-relaxed">
                Because documents are generated and delivered digitally and immediately upon
                payment, <strong className="text-foreground">all sales are final and we do not
                offer refunds</strong> for completed one-time purchases or for subscription periods
                already commenced, except where required by applicable law.
              </p>
              <p className="mt-3 leading-relaxed">
                If you experience a verified technical failure that prevented document delivery,
                contact us at{" "}
                <a href="mailto:support@legallawdocs.com" className="text-primary underline underline-offset-4">
                  support@legallawdocs.com
                </a>{" "}
                within 7 days and we will work to resolve the issue or, at our discretion, issue
                a credit. Dissatisfaction with the content of an AI-generated document does not
                constitute grounds for a refund; you have the opportunity to preview documents
                prior to purchase.
              </p>
            </section>

            {/* ── 9. Document ownership ─────────────────────────────────── */}
            <section id="ownership">
              <H2 id="ownership">9. Document ownership &amp; license</H2>
              <p className="leading-relaxed">
                You own the specific content of documents you generate — the names, terms, and
                customisations you input. You may use, modify, and distribute your generated
                documents for personal or business purposes.
              </p>
              <p className="mt-3 leading-relaxed">
                You grant us a limited, non-exclusive, royalty-free licence to store, process,
                and transmit your document content solely to the extent necessary to provide our
                services (e.g., storing documents in your account). We will not sell, licence, or
                use the specific content of your documents for any other purpose. We may use
                anonymised, aggregated usage data to improve our platform.
              </p>
              <p className="mt-3 leading-relaxed">
                The underlying document templates, AI systems, platform code, and all proprietary
                structural components remain the exclusive property of LegalLawDocs.com.
              </p>
            </section>

            {/* ── 10. IP ────────────────────────────────────────────────── */}
            <section id="ip">
              <H2 id="ip">10. Intellectual property</H2>
              <p className="leading-relaxed">
                LegalLawDocs.com and its licensors own all intellectual property rights in the
                website, platform, document templates (as distinct from your customised outputs),
                AI systems, logos, trademarks, articles, and all other content and materials we
                create. Nothing in these Terms grants you any ownership in our platform or
                intellectual property. You may not copy, reverse-engineer, reproduce, distribute,
                or create derivative works of our platform or proprietary content without our
                express written consent.
              </p>
            </section>

            {/* ── 11. User content ──────────────────────────────────────── */}
            <section id="user-content">
              <H2 id="user-content">11. User content &amp; data</H2>
              <p className="leading-relaxed">
                You are solely responsible for all information, data, and content you submit to
                our platform (&ldquo;User Content&rdquo;). You represent and warrant that your
                User Content does not violate any applicable law or third-party rights.
              </p>
              <p className="mt-3 leading-relaxed">
                We handle your personal data in accordance with our{" "}
                <Link href="/privacy" className="text-primary underline underline-offset-4 hover:text-primary/80">
                  Privacy Policy
                </Link>
                , which is incorporated into these Terms by reference.
              </p>
              <p className="mt-3 leading-relaxed">
                We retain your account data for as long as your account is active and for a
                reasonable period thereafter to comply with legal obligations. You may request
                deletion of your data by contacting us, subject to our legal retention obligations.
              </p>
            </section>

            {/* ── 12. Prohibited uses ───────────────────────────────────── */}
            <section id="prohibited">
              <H2 id="prohibited">12. Prohibited uses</H2>
              <p className="leading-relaxed">You agree not to use our services to:</p>
              <ul className="mt-3 space-y-2">
                {[
                  "Create fraudulent, deceptive, or misleading documents or to facilitate fraud of any kind",
                  "Engage in or facilitate any illegal activity",
                  "Impersonate any person, entity, or governmental authority",
                  "Generate documents intended to harm, coerce, or deceive a counterparty",
                  "Violate the intellectual property or privacy rights of any person",
                  "Scrape, harvest, or extract data from our platform by automated means",
                  "Attempt to gain unauthorised access to our systems, accounts, or data",
                  "Resell, sublicence, or redistribute our services without written authorisation",
                  "Transmit malware, viruses, or harmful code of any kind",
                  "Use our platform in any manner that could damage, disable, or impair its operation",
                ].map((item) => (
                  <Li key={item}>{item}</Li>
                ))}
              </ul>
            </section>

            {/* ── 13. E-sign ────────────────────────────────────────────── */}
            <section id="esign">
              <H2 id="esign">13. Electronic signatures</H2>
              <p className="leading-relaxed">
                Our platform may facilitate electronic signature of documents. By using our
                electronic signature feature you acknowledge that: (a) your electronic signature
                is intended to have the same legal effect as a handwritten signature to the extent
                permitted under the Electronic Signatures in Global and National Commerce Act
                (E-SIGN), the Uniform Electronic Transactions Act (UETA), and other applicable
                law; (b) not all documents are legally effective when signed electronically in all
                jurisdictions — it is your responsibility to verify that electronic execution is
                valid for your specific document type and jurisdiction; and (c) we make no
                warranty as to the legal effectiveness of any electronically signed document.
              </p>
            </section>

            {/* ── 14. Third-party services ──────────────────────────────── */}
            <section id="third-party">
              <H2 id="third-party">14. Third-party services</H2>
              <p className="leading-relaxed">
                Our platform integrates with third-party services including payment processors
                (Stripe), AI model providers (Google), email delivery providers, and cloud
                infrastructure. Your use of these third-party services is subject to their
                respective terms of service and privacy policies. We are not responsible for the
                acts, omissions, or failures of any third-party service provider.
              </p>
              <p className="mt-3 leading-relaxed">
                Our website may contain links to third-party websites. We do not control and are
                not responsible for the content, privacy practices, or accuracy of any linked
                website. Links do not constitute our endorsement of those websites.
              </p>
            </section>

            {/* ── 15. Disclaimer of warranties ──────────────────────────── */}
            <section id="warranties">
              <H2 id="warranties">15. Disclaimer of warranties</H2>
              <Caps>
                TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, LEGALLAWDOCS.COM PROVIDES ITS
                SERVICES, INCLUDING ALL AI-GENERATED DOCUMENTS, &ldquo;AS IS&rdquo; AND &ldquo;AS
                AVAILABLE,&rdquo; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE
                DISCLAIM ALL IMPLIED WARRANTIES, INCLUDING WITHOUT LIMITATION WARRANTIES OF
                MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, AND
                ANY WARRANTIES ARISING FROM COURSE OF DEALING OR USAGE OF TRADE.
              </Caps>
              <p className="mt-4 leading-relaxed">
                Without limiting the foregoing, we specifically disclaim any warranty that:
              </p>
              <ul className="mt-3 space-y-2">
                <Li>Any AI-generated document is accurate, complete, legally sufficient, or free from error;</Li>
                <Li>Any generated document will be legally enforceable in any jurisdiction;</Li>
                <Li>Our documents comply with the laws of any particular state, country, or locality;</Li>
                <Li>Our services will be uninterrupted, error-free, secure, or free from viruses;</Li>
                <Li>Any defects or errors will be corrected;</Li>
                <Li>Our services meet your particular requirements or expectations.</Li>
              </ul>
            </section>

            {/* ── 16. Limitation of liability ───────────────────────────── */}
            <section id="liability">
              <H2 id="liability">16. Limitation of liability</H2>
              <Caps>
                TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, LEGALLAWDOCS.COM AND ITS
                AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AND LICENSORS SHALL NOT BE
                LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR
                PUNITIVE DAMAGES OF ANY KIND, INCLUDING LOSS OF PROFITS, REVENUE, DATA,
                GOODWILL, BUSINESS OPPORTUNITY, OR OTHER INTANGIBLE LOSSES, ARISING FROM OR
                RELATED TO YOUR USE OF OR INABILITY TO USE OUR SERVICES OR ANY AI-GENERATED
                DOCUMENT, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              </Caps>
              <p className="mt-4 leading-relaxed">
                <strong className="text-foreground">AI-specific exclusions.</strong> Without
                limiting the foregoing, we shall have no liability whatsoever for:
              </p>
              <ul className="mt-3 space-y-2">
                <Li>Any loss, damage, or adverse legal outcome resulting from your reliance on any AI-generated document;</Li>
                <Li>Any failure of any generated document to be legally enforceable or to achieve its intended purpose;</Li>
                <Li>Any inaccuracy, error, omission, outdated provision, or hallucination in any generated document;</Li>
                <Li>Any claim by a counterparty, court, regulator, or third party arising from a document generated through our platform;</Li>
                <Li>Any loss suffered by a counterparty or third party to any agreement executed using our documents;</Li>
                <Li>Your failure to obtain independent legal review before executing or relying on a generated document;</Li>
                <Li>Any change in law that renders a generated document non-compliant after the date of generation.</Li>
              </ul>
              <p className="mt-4 leading-relaxed">
                <strong className="text-foreground">Aggregate cap.</strong> In no event shall our
                total aggregate liability to you for all claims arising from or related to your
                use of our services exceed the greater of: (a) the amounts actually paid by you
                to us in the twelve (12) months immediately preceding the claim giving rise to
                liability; or (b) one hundred U.S. dollars (US$100.00).
              </p>
              <p className="mt-3 leading-relaxed text-sm">
                Some jurisdictions do not permit the exclusion or limitation of certain damages.
                To the extent such exclusions or limitations are prohibited in your jurisdiction,
                they shall apply to the maximum extent permitted by law.
              </p>
            </section>

            {/* ── 17. Indemnification ───────────────────────────────────── */}
            <section id="indemnification">
              <H2 id="indemnification">17. Indemnification</H2>
              <p className="leading-relaxed">
                You agree to indemnify, defend, and hold harmless LegalLawDocs.com and its
                affiliates, officers, directors, employees, agents, successors, and licensors
                (collectively, the &ldquo;Indemnified Parties&rdquo;) from and against any and
                all claims, liabilities, damages, judgments, awards, losses, costs, expenses, and
                fees (including reasonable attorneys&apos; fees) incurred by any Indemnified Party
                arising from or relating to:
              </p>
              <ul className="mt-4 space-y-2">
                <Li>Your access to or use of our platform or services;</Li>
                <Li>Your use of, reliance on, execution of, or distribution of any document generated through our platform;</Li>
                <Li>Your violation of these Terms or any applicable law or regulation;</Li>
                <Li>Your violation of any third-party right, including intellectual property or privacy rights;</Li>
                <Li>
                  Any representations you make to third parties (including counterparties, courts,
                  or regulators) regarding the legal validity, enforceability, or accuracy of any
                  document generated by our platform;
                </Li>
                <Li>
                  Any failure of a generated document to be legally enforceable, including any
                  claim or loss suffered by a counterparty as a result of such failure;
                </Li>
                <Li>Your failure to obtain independent legal review before relying on any generated document;</Li>
                <Li>Any inaccurate, misleading, or false information you provided to our platform;</Li>
                <Li>Any User Content you submit, post, or transmit through our platform.</Li>
              </ul>
              <p className="mt-4 leading-relaxed">
                We reserve the right to assume the exclusive defence and control of any matter
                subject to indemnification by you, and you agree to cooperate with our defence
                of such claims. You agree not to settle any matter without our prior written
                consent.
              </p>
            </section>

            {/* ── 18. Force majeure ─────────────────────────────────────── */}
            <section id="force-majeure">
              <H2 id="force-majeure">18. Force majeure</H2>
              <p className="leading-relaxed">
                LegalLawDocs.com shall not be liable for any delay, failure, or disruption of
                services caused by circumstances beyond our reasonable control, including but not
                limited to acts of God, natural disasters, war, terrorism, riots, government
                action, pandemic, internet outages, telecommunications failures, power failures,
                third-party service provider outages, or cyberattacks. In such circumstances our
                obligations are suspended for the duration of the event.
              </p>
            </section>

            {/* ── 19. DMCA ──────────────────────────────────────────────── */}
            <section id="dmca">
              <H2 id="dmca">19. DMCA / copyright infringement</H2>
              <p className="leading-relaxed">
                We respect intellectual property rights. If you believe that content on our
                platform infringes your copyright, you may submit a DMCA takedown notice to our
                designated agent at{" "}
                <a href="mailto:legal@legallawdocs.com" className="text-primary underline underline-offset-4">
                  legal@legallawdocs.com
                </a>{" "}
                including: (a) identification of the copyrighted work; (b) identification of the
                allegedly infringing material and its location on our platform; (c) your contact
                information; (d) a statement of good faith belief; and (e) a statement under
                penalty of perjury that the information is accurate and you are the rights holder
                or authorised to act on their behalf. We will respond promptly to valid notices
                in accordance with the Digital Millennium Copyright Act.
              </p>
            </section>

            {/* ── 20. Governing law ─────────────────────────────────────── */}
            <section id="governing">
              <H2 id="governing">20. Governing law</H2>
              <p className="leading-relaxed">
                These Terms are governed by and construed in accordance with the laws of the State
                of Delaware, United States, without regard to its conflict of law provisions. You
                consent to the exclusive personal jurisdiction of the state and federal courts
                located in Delaware for any dispute not subject to arbitration.
              </p>
            </section>

            {/* ── 21. Dispute resolution ────────────────────────────────── */}
            <section id="disputes">
              <H2 id="disputes">21. Dispute resolution &amp; arbitration</H2>
              <p className="leading-relaxed">
                <strong className="text-foreground">Informal resolution first.</strong> Before
                initiating any formal dispute process, you agree to contact us at{" "}
                <a href="mailto:legal@legallawdocs.com" className="text-primary underline underline-offset-4">
                  legal@legallawdocs.com
                </a>{" "}
                and provide a written description of the dispute. We will attempt to resolve it
                informally within 30 days.
              </p>
              <p className="mt-4 leading-relaxed">
                <strong className="text-foreground">Binding arbitration.</strong> If informal
                resolution fails, any dispute, claim, or controversy arising from or related to
                these Terms or our services shall be finally resolved by binding individual
                arbitration administered by the American Arbitration Association (AAA) under its
                Consumer Arbitration Rules. The arbitration shall be conducted in English. The
                arbitrator&apos;s decision shall be final and binding and may be entered as a
                judgment in any court of competent jurisdiction. Either party may seek emergency
                injunctive relief in a court of competent jurisdiction solely to preserve the
                status quo pending arbitration.
              </p>
              <p className="mt-4 leading-relaxed">
                <strong className="text-foreground">Exception.</strong> Either party may bring
                individual claims in small claims court if the claim qualifies and remains in
                small claims court. Either party may seek injunctive or other equitable relief in
                court for alleged intellectual property infringement.
              </p>
            </section>

            {/* ── 22. Class action waiver ───────────────────────────────── */}
            <section id="class-action">
              <H2 id="class-action">22. Class action waiver</H2>
              <Caps>
                YOU AND LEGALLAWDOCS.COM AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY
                IN YOUR OR ITS INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY
                PURPORTED CLASS OR REPRESENTATIVE ACTION. UNLESS BOTH YOU AND LEGALLAWDOCS.COM
                AGREE OTHERWISE, THE ARBITRATOR MAY NOT CONSOLIDATE MORE THAN ONE PERSON&apos;S
                CLAIMS AND MAY NOT OTHERWISE PRESIDE OVER ANY FORM OF CLASS OR REPRESENTATIVE
                PROCEEDING. YOU WAIVE ANY RIGHT TO PARTICIPATE IN A CLASS ACTION LAWSUIT,
                CLASS-WIDE ARBITRATION, OR REPRESENTATIVE ACTION OF ANY KIND.
              </Caps>
            </section>

            {/* ── 23. Severability ──────────────────────────────────────── */}
            <section id="severability">
              <H2 id="severability">23. Severability</H2>
              <p className="leading-relaxed">
                If any provision of these Terms is held by a court or arbitrator of competent
                jurisdiction to be invalid, illegal, or unenforceable, that provision shall be
                modified to the minimum extent necessary to make it valid and enforceable, or if
                modification is not possible, severed from these Terms. The remaining provisions
                shall continue in full force and effect. The invalidity of one provision shall not
                affect the validity of any other provision.
              </p>
            </section>

            {/* ── 24. Entire agreement & waiver ─────────────────────────── */}
            <section id="entire-agreement">
              <H2 id="entire-agreement">24. Entire agreement &amp; waiver</H2>
              <p className="leading-relaxed">
                These Terms, together with our{" "}
                <Link href="/privacy" className="text-primary underline underline-offset-4 hover:text-primary/80">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/disclaimer" className="text-primary underline underline-offset-4 hover:text-primary/80">
                  Legal Disclaimer
                </Link>
                , constitute the entire agreement between you and LegalLawDocs.com with respect
                to our services and supersede all prior and contemporaneous agreements,
                representations, and understandings of any kind.
              </p>
              <p className="mt-3 leading-relaxed">
                Our failure to enforce any right or provision of these Terms shall not constitute
                a waiver of that right or provision. A waiver of any provision in one instance
                does not constitute a continuing waiver or a waiver of any other provision. No
                waiver is effective unless made in writing and signed by an authorised
                representative of LegalLawDocs.com.
              </p>
              <p className="mt-3 leading-relaxed">
                You may not assign or transfer your rights under these Terms without our prior
                written consent. We may freely assign our rights under these Terms without
                restriction.
              </p>
            </section>

            {/* ── 25. Termination ───────────────────────────────────────── */}
            <section id="termination">
              <H2 id="termination">25. Termination</H2>
              <p className="leading-relaxed">
                We reserve the right to suspend or terminate your account and access to our
                services at any time, with or without cause and without notice, at our sole
                discretion — including for violation of these Terms, conduct harmful to our users
                or platform, or non-payment. You may terminate your account at any time via your
                account settings or by contacting us.
              </p>
              <p className="mt-3 leading-relaxed">
                Upon termination, your right to access our services ceases immediately. The
                following sections survive termination: 3 (AI limitations), 4 (no legal advice),
                9 (ownership), 10 (IP), 15 (warranties), 16 (liability), 17 (indemnification),
                20 (governing law), 21 (disputes), 22 (class action waiver), 23 (severability),
                and 24 (entire agreement).
              </p>
            </section>

            {/* ── 26. Changes ───────────────────────────────────────────── */}
            <section id="changes">
              <H2 id="changes">26. Changes to terms</H2>
              <p className="leading-relaxed">
                We may modify these Terms at any time. For material changes we will provide notice
                by email or by posting a prominent notice on our website, along with the revised
                effective date. Your continued use of our services after the effective date
                constitutes acceptance of the revised Terms. If you disagree with any change you
                must stop using our services and may request account deletion.
              </p>
            </section>

            {/* ── 27. Contact ───────────────────────────────────────────── */}
            <section id="contact">
              <H2 id="contact">27. Contact</H2>
              <p className="leading-relaxed">
                For questions about these Terms, please contact support:
              </p>
              <div className="mt-4 rounded-2xl border border-border/50 bg-card/60 p-5 text-sm space-y-1.5">
                <p className="font-semibold text-foreground">LegalLawDocs.com — Legal Department</p>
                <p>
                  Email:{" "}
                  <a href="mailto:legal@legallawdocs.com" className="text-primary underline underline-offset-4 hover:text-primary/80">
                    legal@legallawdocs.com
                  </a>
                </p>
                <p>
                  Support:{" "}
                  <a href="mailto:support@legallawdocs.com" className="text-primary underline underline-offset-4 hover:text-primary/80">
                    support@legallawdocs.com
                  </a>
                </p>
                <p>
                  Help Centre:{" "}
                  <Link href="/help" className="text-primary underline underline-offset-4 hover:text-primary/80">
                    legallawdocs.com/help
                  </Link>
                </p>
              </div>
            </section>

          </div>

          {/* ── Bottom legal notice ───────────────────────────────────────── */}
          <div className="mt-16 rounded-2xl border border-border/40 bg-secondary/30 p-6 text-sm text-muted-foreground leading-relaxed">
            <p>
              <strong className="text-foreground">Summary of key limitations</strong> (not a
              substitute for reading the full Terms above):
            </p>
            <ul className="mt-3 space-y-1.5 list-disc list-inside ml-2">
              <li>We are not a law firm and provide no legal advice.</li>
              <li>AI-generated documents may contain errors and are not guaranteed to be enforceable.</li>
              <li>You assume all risk for how you use or rely on generated documents.</li>
              <li>Our liability to you is capped at the fees you paid us in the past 12 months or US$100, whichever is greater.</li>
              <li>You indemnify us for any claims arising from your use of our documents.</li>
              <li>Disputes are resolved by individual binding arbitration in Delaware.</li>
            </ul>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}
