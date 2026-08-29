import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Cookie Policy — LegalLawDocs.com",
  description:
    "Learn how LegalLawDocs.com uses cookies and similar technologies, what types of cookies we set, and how you can control them.",
}

export default function CookiesPage() {
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
            <h1 className="font-serif text-4xl font-bold text-foreground">Cookie Policy</h1>
            <p className="mt-3 text-muted-foreground">
              Last updated: <span className="text-foreground font-medium">August 29, 2026</span>
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              This Cookie Policy explains how LegalLawDocs.com (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
              &ldquo;our&rdquo;) uses cookies and similar tracking technologies when you visit our
              website. It should be read alongside our{" "}
              <Link href="/privacy" className="text-primary underline underline-offset-4 hover:text-primary/80">
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          {/* Content */}
          <div className="space-y-10 text-muted-foreground">
            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">What are cookies?</h2>
              <p className="leading-relaxed">
                Cookies are small text files placed on your device (computer, smartphone, or tablet)
                when you visit a website. They allow the website to remember your actions and
                preferences over time, so you don&apos;t have to re-enter them whenever you return or
                browse between pages.
              </p>
              <p className="mt-3 leading-relaxed">
                Similar technologies include web beacons, pixels, and local storage. We use the
                term &ldquo;cookies&rdquo; in this policy to refer to all of these technologies collectively.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Types of cookies we use</h2>

              <div className="space-y-6">
                <div className="rounded-2xl border border-border/50 bg-card/60 p-5">
                  <h3 className="font-semibold text-foreground mb-2">Essential cookies</h3>
                  <p className="text-sm leading-relaxed">
                    These cookies are strictly necessary for the operation of our website and services.
                    They enable core functionality such as user authentication (keeping you logged in),
                    security, session management, and accessing your account. Essential cookies cannot
                    be disabled — the website cannot function properly without them.
                  </p>
                  <div className="mt-3 rounded-lg border border-border/40 bg-secondary/30 p-3">
                    <p className="text-xs font-medium text-foreground mb-1">Examples:</p>
                    <ul className="text-xs space-y-1">
                      <li><code className="text-primary">next-auth.session-token</code> — manages your login session</li>
                      <li><code className="text-primary">next-auth.csrf-token</code> — prevents cross-site request forgery</li>
                      <li><code className="text-primary">__Secure-next-auth.session-token</code> — secure session cookie</li>
                      <li><code className="text-primary">legallawdocs_disclaimer_acceptance</code> — records signed acceptance of the current required notice</li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-2xl border border-border/50 bg-card/60 p-5">
                  <h3 className="font-semibold text-foreground mb-2">Preference cookies</h3>
                  <p className="text-sm leading-relaxed">
                    The application may use cookies or browser storage for settings and in-progress
                    workflow data, such as a selected theme or a locally saved draft. Available
                    preferences depend on the feature you use.
                  </p>
                </div>

                <div className="rounded-2xl border border-border/50 bg-card/60 p-5">
                  <h3 className="font-semibold text-foreground mb-2">Analytics cookies</h3>
                  <p className="text-sm leading-relaxed">
                    LegalLawDocs does not currently claim to set optional analytics or advertising
                    cookies. Hosting and security providers may process operational request logs as
                    described in the Privacy Policy. If optional analytics are introduced, this
                    policy and any required consent controls must be updated before activation.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Third-party cookies</h2>
              <p className="leading-relaxed">
                We use third-party services that may set their own cookies on your device:
              </p>
              <div className="mt-4 rounded-2xl border border-border/50 bg-card/60 p-5">
                <h3 className="font-semibold text-foreground mb-2">Stripe (Payment Processing)</h3>
                <p className="text-sm leading-relaxed">
                  When you make a purchase, Stripe processes your payment and may set cookies to
                  prevent fraud, remember your payment method preferences, and comply with applicable
                  regulations. Stripe&apos;s use of cookies is governed by{" "}
                  <a
                    href="https://stripe.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-4 hover:text-primary/80"
                  >
                    Stripe&apos;s Privacy Policy
                  </a>
                  . We do not control these cookies.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">How to control cookies</h2>
              <p className="leading-relaxed">
                You have several options for controlling cookies:
              </p>
              <ul className="mt-4 space-y-3 leading-relaxed">
                <li className="flex gap-3">
                  <span className="mt-1 flex-shrink-0 h-2 w-2 rounded-full bg-primary/60 mt-2" />
                  <span>
                    <strong className="text-foreground">Browser settings:</strong> Most browsers
                    allow you to view, manage, block, and delete cookies through your browser settings.
                    Note that blocking essential cookies will impair website functionality.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 flex-shrink-0 h-2 w-2 rounded-full bg-primary/60 mt-2" />
                  <span>
                    <strong className="text-foreground">Privacy tools:</strong> Browser privacy
                    extensions and tracking protections may restrict third-party requests, but can
                    also affect site functionality.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 flex-shrink-0 h-2 w-2 rounded-full bg-primary/60 mt-2" />
                  <span>
                    <strong className="text-foreground">Optional cookies:</strong> We do not currently
                    offer an optional-cookie preference center because optional analytics and advertising
                    cookies are not intentionally enabled. Required controls must be added before that changes.
                  </span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Changes to this policy</h2>
              <p className="leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in technology,
                law, or our business practices. When we make material changes, we will update the
                &ldquo;Last updated&rdquo; date at the top of this page. We encourage you to review this
                policy periodically.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Contact us</h2>
              <p className="leading-relaxed">
                If you have questions about our use of cookies or this Cookie Policy, please contact us
                at{" "}
                <a
                  href="mailto:privacy@legallawdocs.com"
                  className="text-primary underline underline-offset-4 hover:text-primary/80"
                >
                  privacy@legallawdocs.com
                </a>
                {" "}or through our{" "}
                <Link href="/help" className="text-primary underline underline-offset-4 hover:text-primary/80">
                  Help Center
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
