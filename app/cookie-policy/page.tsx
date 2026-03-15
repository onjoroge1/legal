import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Cookie } from "lucide-react"

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Learn about how LegalLawDocs.com uses cookies and similar tracking technologies on our AI-powered legal document generation platform.",
  openGraph: {
    title: "Cookie Policy | LegalLawDocs.com",
    description:
      "Learn about how LegalLawDocs.com uses cookies and similar tracking technologies.",
  },
  alternates: {
    canonical: "https://www.legallawdocs.com/cookie-policy",
  },
}

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative border-b border-border/40 bg-gradient-to-b from-primary/5 to-background">
          <div className="mx-auto max-w-4xl px-4 py-16 text-center lg:px-8 lg:py-24">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
              <Cookie className="h-7 w-7 text-primary" />
            </div>
            <h1 className="font-serif text-4xl font-bold text-foreground lg:text-5xl">
              Cookie Policy
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
                This Cookie Policy explains how LegalLawDocs.com (&quot;we,&quot;
                &quot;our,&quot; or &quot;us&quot;) uses cookies and similar tracking technologies
                when you visit our website and use our AI-powered legal document
                generation platform. This policy should be read alongside our{" "}
                <Link href="/privacy-policy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>

              <h2 className="font-serif text-2xl font-semibold text-foreground mt-10 mb-4">
                1. What Are Cookies?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Cookies are small text files that are stored on your device
                (computer, tablet, or mobile phone) when you visit a website.
                They are widely used to make websites work more efficiently, to
                provide information to site owners, and to improve the user
                experience. Cookies can be &quot;persistent&quot; (remaining on your
                device until they expire or you delete them) or &quot;session&quot;
                (deleted when you close your browser).
              </p>

              <h2 className="font-serif text-2xl font-semibold text-foreground mt-10 mb-4">
                2. Types of Cookies We Use
              </h2>

              <h3 className="font-serif text-lg font-semibold text-foreground mt-6 mb-3">
                2.1 Strictly Necessary Cookies
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                These cookies are essential for the operation of our platform.
                They enable core functionality such as account authentication,
                security, and session management. Without these cookies, the
                Service cannot function properly. These cookies do not require
                your consent.
              </p>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-sm border border-border/40 rounded-lg">
                  <thead>
                    <tr className="border-b border-border/40 bg-secondary/30">
                      <th className="px-4 py-3 text-left font-medium text-foreground">Cookie</th>
                      <th className="px-4 py-3 text-left font-medium text-foreground">Purpose</th>
                      <th className="px-4 py-3 text-left font-medium text-foreground">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/40">
                      <td className="px-4 py-3">session_token</td>
                      <td className="px-4 py-3">Maintains your authenticated session</td>
                      <td className="px-4 py-3">Session</td>
                    </tr>
                    <tr className="border-b border-border/40">
                      <td className="px-4 py-3">csrf_token</td>
                      <td className="px-4 py-3">Prevents cross-site request forgery attacks</td>
                      <td className="px-4 py-3">Session</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">cookie_consent</td>
                      <td className="px-4 py-3">Stores your cookie preference choices</td>
                      <td className="px-4 py-3">1 year</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="font-serif text-lg font-semibold text-foreground mt-6 mb-3">
                2.2 Performance and Analytics Cookies
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                These cookies collect information about how visitors use our
                platform, such as which pages are visited most often and whether
                users encounter errors. This data helps us improve the
                performance and usability of our Service. All information
                collected is aggregated and anonymous.
              </p>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-sm border border-border/40 rounded-lg">
                  <thead>
                    <tr className="border-b border-border/40 bg-secondary/30">
                      <th className="px-4 py-3 text-left font-medium text-foreground">Cookie</th>
                      <th className="px-4 py-3 text-left font-medium text-foreground">Purpose</th>
                      <th className="px-4 py-3 text-left font-medium text-foreground">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/40">
                      <td className="px-4 py-3">_ga</td>
                      <td className="px-4 py-3">Google Analytics - distinguishes unique users</td>
                      <td className="px-4 py-3">2 years</td>
                    </tr>
                    <tr className="border-b border-border/40">
                      <td className="px-4 py-3">_ga_*</td>
                      <td className="px-4 py-3">Google Analytics - maintains session state</td>
                      <td className="px-4 py-3">2 years</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">_gid</td>
                      <td className="px-4 py-3">Google Analytics - distinguishes users</td>
                      <td className="px-4 py-3">24 hours</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="font-serif text-lg font-semibold text-foreground mt-6 mb-3">
                2.3 Functional Cookies
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                These cookies enable enhanced functionality and personalization,
                such as remembering your preferences, selected language, or
                region. If you do not allow these cookies, some features of the
                Service may not function as intended.
              </p>

              <h3 className="font-serif text-lg font-semibold text-foreground mt-6 mb-3">
                2.4 Marketing Cookies
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                These cookies are used to track visitors across websites to
                display relevant advertisements. They are set by third-party
                advertising partners and may be used to build a profile of your
                interests. These cookies are only placed with your explicit
                consent.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-foreground mt-10 mb-4">
                3. Third-Party Cookies
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Some cookies on our platform are set by third-party services
                that appear on our pages. We do not control the placement or
                access of these third-party cookies. Third parties that may set
                cookies through our platform include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Google Analytics (analytics and performance measurement)</li>
                <li>Stripe (secure payment processing)</li>
                <li>Intercom (customer support chat)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We encourage you to review the privacy and cookie policies of
                these third parties for more information about their practices.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-foreground mt-10 mb-4">
                4. How to Manage Cookies
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                You have several options for managing cookies:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Browser Settings:</strong> Most browsers allow you to
                  control cookies through their settings. You can set your
                  browser to block or delete cookies, though this may affect the
                  functionality of our Service.
                </li>
                <li>
                  <strong className="text-foreground">Cookie Consent Banner:</strong> When you first visit
                  our platform, you will be presented with a cookie consent
                  banner that allows you to choose which categories of cookies
                  to accept or reject.
                </li>
                <li>
                  <strong className="text-foreground">Opt-Out Links:</strong> For Google Analytics, you can
                  install the Google Analytics Opt-out Browser Add-on. For other
                  advertising cookies, you can visit the Network Advertising
                  Initiative opt-out page or the Digital Advertising Alliance
                  opt-out page.
                </li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-foreground mt-10 mb-4">
                5. Similar Technologies
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                In addition to cookies, we may use other similar technologies,
                including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Web Beacons:</strong> Small graphic images embedded
                  in emails or web pages used to track whether content has been
                  viewed or a link has been clicked.
                </li>
                <li>
                  <strong className="text-foreground">Local Storage:</strong> Data stored locally in your
                  browser to improve performance, such as caching document
                  drafts while you work.
                </li>
                <li>
                  <strong className="text-foreground">Pixel Tags:</strong> Tiny images used to understand
                  browsing activity and measure the effectiveness of marketing
                  campaigns.
                </li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-foreground mt-10 mb-4">
                6. Updates to This Policy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Cookie Policy periodically to reflect changes
                in our practices or applicable regulations. We will post the
                revised policy on this page with an updated &quot;Last updated&quot; date.
                We encourage you to review this policy regularly.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-foreground mt-10 mb-4">
                7. Contact Us
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about our use of cookies, please contact
                us:
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
                  <strong className="text-foreground">Disclaimer:</strong>{" "}
                  LegalLawDocs.com is not a law firm and does not provide legal
                  advice. Our platform provides self-help document generation
                  services at your specific direction. If you have concerns
                  about your privacy rights related to cookies and tracking
                  technologies, please consult a qualified attorney.
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
