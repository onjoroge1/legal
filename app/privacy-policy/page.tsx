import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how LegalLawDocs.com collects, uses, and protects your personal information. Our privacy policy outlines your rights and our data handling practices.",
  openGraph: {
    title: "Privacy Policy | LegalLawDocs.com",
    description:
      "Learn how LegalLawDocs.com collects, uses, and protects your personal information.",
  },
  alternates: {
    canonical: "https://www.legallawdocs.com/privacy-policy",
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative border-b border-border/40 bg-gradient-to-b from-primary/5 to-background">
          <div className="mx-auto max-w-4xl px-4 py-16 text-center lg:px-8 lg:py-24">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
              <Shield className="h-7 w-7 text-primary" />
            </div>
            <h1 className="font-serif text-4xl font-bold text-foreground lg:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Last updated: March 14, 2026
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-4xl px-4 py-12 lg:px-8 lg:py-20">
          <Card className="border-border/40">
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none p-8 lg:p-12">
              <p className="text-muted-foreground leading-relaxed">
                LegalLawDocs.com (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to
                protecting your privacy. This Privacy Policy explains how we collect,
                use, disclose, and safeguard your information when you use our
                AI-powered legal document generation platform (&quot;Service&quot;). Please
                read this policy carefully. By using our Service, you consent to the
                practices described herein.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-foreground mt-10 mb-4">
                1. Information We Collect
              </h2>
              <h3 className="font-serif text-lg font-semibold text-foreground mt-6 mb-3">
                1.1 Personal Information You Provide
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                When you create an account, purchase a subscription, or generate
                documents, we may collect:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Name, email address, and phone number</li>
                <li>Billing address and payment information (processed securely through our third-party payment processor)</li>
                <li>Account credentials and profile information</li>
                <li>Information you input into document templates, such as names, addresses, dates, and other details specific to the legal documents you generate</li>
              </ul>

              <h3 className="font-serif text-lg font-semibold text-foreground mt-6 mb-3">
                1.2 Information Collected Automatically
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                When you access our Service, we automatically collect certain
                information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Device information (browser type, operating system, device identifiers)</li>
                <li>Log data (IP address, access times, pages viewed, referring URLs)</li>
                <li>Usage data (features used, documents generated, session duration)</li>
                <li>Cookies and similar tracking technologies (see our <Link href="/cookie-policy" className="text-primary hover:underline">Cookie Policy</Link>)</li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-foreground mt-10 mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>To provide, operate, and maintain our document generation Service</li>
                <li>To process transactions and manage your account and subscriptions</li>
                <li>To generate and deliver legal documents based on your input</li>
                <li>To improve, personalize, and expand our Service through analytics and research</li>
                <li>To communicate with you about updates, security alerts, and support</li>
                <li>To detect, prevent, and address technical issues, fraud, and security concerns</li>
                <li>To comply with legal obligations and enforce our Terms of Service</li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-foreground mt-10 mb-4">
                3. Data Sharing and Disclosure
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell your personal information. We may share your
                information in the following limited circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Service Providers:</strong> We share data with trusted third-party vendors who
                  assist us in operating our Service, including cloud hosting providers,
                  payment processors, analytics services, and email delivery services. These
                  providers are contractually obligated to protect your data.
                </li>
                <li>
                  <strong className="text-foreground">Legal Requirements:</strong> We may disclose your information if required by law,
                  subpoena, court order, or other governmental request, or when we believe
                  disclosure is necessary to protect our rights, your safety, or the safety
                  of others.
                </li>
                <li>
                  <strong className="text-foreground">Business Transfers:</strong> In the event of a merger, acquisition, or sale of
                  assets, your information may be transferred as part of that transaction.
                </li>
                <li>
                  <strong className="text-foreground">With Your Consent:</strong> We may share your information for any other purpose
                  with your explicit consent.
                </li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-foreground mt-10 mb-4">
                4. Cookies and Tracking Technologies
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar tracking technologies to enhance your
                experience, analyze usage patterns, and deliver targeted content. You
                can control cookie preferences through your browser settings. For
                detailed information about the cookies we use and your choices, please
                see our{" "}
                <Link href="/cookie-policy" className="text-primary hover:underline">
                  Cookie Policy
                </Link>
                .
              </p>

              <h2 className="font-serif text-2xl font-semibold text-foreground mt-10 mb-4">
                5. Data Security
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement industry-standard security measures to protect your
                personal information against unauthorized access, alteration,
                disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>256-bit SSL/TLS encryption for all data in transit</li>
                <li>AES-256 encryption for data at rest</li>
                <li>Regular security audits and penetration testing</li>
                <li>Access controls and authentication protocols for our internal systems</li>
                <li>SOC 2 Type II compliance</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                While we strive to protect your information, no method of electronic
                storage or transmission is completely secure. We cannot guarantee
                absolute security.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-foreground mt-10 mb-4">
                6. Your Rights and Choices
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Depending on your location, you may have the following rights
                regarding your personal data:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Access and Portability:</strong> Request a copy of the personal data we hold
                  about you in a structured, machine-readable format.
                </li>
                <li>
                  <strong className="text-foreground">Correction:</strong> Request correction of inaccurate or incomplete personal
                  data.
                </li>
                <li>
                  <strong className="text-foreground">Deletion:</strong> Request deletion of your personal data, subject to certain
                  legal exceptions.
                </li>
                <li>
                  <strong className="text-foreground">Opt-Out:</strong> Opt out of marketing communications at any time by clicking
                  &quot;unsubscribe&quot; in our emails or adjusting your account settings.
                </li>
                <li>
                  <strong className="text-foreground">Restriction:</strong> Request that we restrict the processing of your personal
                  data under certain circumstances.
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                To exercise any of these rights, please contact us at{" "}
                <Link href="mailto:privacy@legallawdocs.com" className="text-primary hover:underline">
                  privacy@legallawdocs.com
                </Link>
                . We will respond to your request within 30 days.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-foreground mt-10 mb-4">
                7. Data Retention
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal information for as long as your account is
                active or as needed to provide you with our Service. We may retain
                certain data for longer periods to comply with legal obligations,
                resolve disputes, and enforce our agreements. Document data you have
                generated is retained in your account until you choose to delete it or
                close your account.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-foreground mt-10 mb-4">
                8. Children&apos;s Privacy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Our Service is not directed to individuals under the age of 18. We do
                not knowingly collect personal information from children. If we become
                aware that a child under 18 has provided us with personal information,
                we will take steps to delete such data promptly.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-foreground mt-10 mb-4">
                9. International Data Transfers
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Your information may be transferred to and processed in countries
                other than your country of residence. These countries may have
                different data protection laws. When we transfer your data, we ensure
                appropriate safeguards are in place, such as Standard Contractual
                Clauses or other legally recognized mechanisms.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-foreground mt-10 mb-4">
                10. Changes to This Policy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify
                you of material changes by posting the new policy on this page and
                updating the &quot;Last updated&quot; date. Your continued use of the Service
                after such changes constitutes acceptance of the updated policy.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-foreground mt-10 mb-4">
                11. Contact Us
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions or concerns about this Privacy Policy or our
                data practices, please contact us at:
              </p>
              <div className="mt-4 rounded-lg border border-border/40 bg-secondary/30 p-6">
                <p className="text-foreground font-medium">LegalLawDocs.com</p>
                <p className="text-muted-foreground mt-1">
                  Email:{" "}
                  <Link href="mailto:privacy@legallawdocs.com" className="text-primary hover:underline">
                    privacy@legallawdocs.com
                  </Link>
                </p>
                <p className="text-muted-foreground mt-1">
                  Contact Page:{" "}
                  <Link href="/contact" className="text-primary hover:underline">
                    legallawdocs.com/contact
                  </Link>
                </p>
              </div>

              {/* Disclaimer */}
              <div className="mt-10 rounded-lg border border-primary/20 bg-primary/5 p-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Disclaimer:</strong> LegalLawDocs.com is not a law
                  firm and does not provide legal advice. Our platform provides
                  self-help document generation services at your specific direction.
                  The information contained in this Privacy Policy is for general
                  informational purposes only. If you need legal advice regarding your
                  privacy rights, please consult a qualified attorney.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  )
}
