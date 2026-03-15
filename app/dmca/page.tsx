import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { ShieldAlert } from "lucide-react"

export const metadata: Metadata = {
  title: "DMCA Notice",
  description:
    "LegalLawDocs.com DMCA policy and procedures for reporting copyright infringement on our AI-powered legal document generation platform.",
  openGraph: {
    title: "DMCA Notice | LegalLawDocs.com",
    description:
      "DMCA policy and procedures for reporting copyright infringement on LegalLawDocs.com.",
  },
  alternates: {
    canonical: "https://www.legallawdocs.com/dmca",
  },
}

export default function DmcaPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative border-b border-border/40 bg-gradient-to-b from-primary/5 to-background">
          <div className="mx-auto max-w-4xl px-4 py-16 text-center lg:px-8 lg:py-24">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
              <ShieldAlert className="h-7 w-7 text-primary" />
            </div>
            <h1 className="font-serif text-4xl font-bold text-foreground lg:text-5xl">
              DMCA Notice &amp; Takedown Policy
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
                LegalLawDocs.com (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects the
                intellectual property rights of others and expects our users to
                do the same. In accordance with the Digital Millennium Copyright
                Act of 1998 (DMCA), we will respond promptly to claims of
                copyright infringement committed using our Service.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-foreground mt-10 mb-4">
                1. Reporting Copyright Infringement
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                If you believe that content available on or through our Service
                infringes your copyright, please submit a written notification
                to our designated DMCA agent containing the following
                information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  A physical or electronic signature of the copyright owner or a
                  person authorized to act on behalf of the copyright owner.
                </li>
                <li>
                  Identification of the copyrighted work claimed to have been
                  infringed, or a representative list if multiple works are
                  covered by a single notification.
                </li>
                <li>
                  Identification of the material that is claimed to be
                  infringing or to be the subject of infringing activity and
                  that is to be removed or access to which is to be disabled,
                  along with information reasonably sufficient to permit us to
                  locate the material (such as a URL or specific page
                  reference).
                </li>
                <li>
                  Your contact information, including your name, address,
                  telephone number, and email address.
                </li>
                <li>
                  A statement that you have a good faith belief that use of the
                  material in the manner complained of is not authorized by the
                  copyright owner, its agent, or the law.
                </li>
                <li>
                  A statement that the information in the notification is
                  accurate and, under penalty of perjury, that you are
                  authorized to act on behalf of the copyright owner.
                </li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-foreground mt-10 mb-4">
                2. Designated DMCA Agent
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Please send all DMCA notifications to our designated agent:
              </p>
              <div className="mt-4 rounded-lg border border-border/40 bg-secondary/30 p-6">
                <p className="text-foreground font-medium">
                  DMCA Agent - LegalLawDocs.com
                </p>
                <p className="text-muted-foreground mt-1">
                  Email:{" "}
                  <Link
                    href="mailto:dmca@legallawdocs.com"
                    className="text-primary hover:underline"
                  >
                    dmca@legallawdocs.com
                  </Link>
                </p>
                <p className="text-muted-foreground mt-1">
                  Subject Line: DMCA Takedown Request
                </p>
              </div>

              <h2 className="font-serif text-2xl font-semibold text-foreground mt-10 mb-4">
                3. Processing of Notices
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Upon receipt of a valid DMCA notification, we will take the
                following steps:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  Acknowledge receipt of the notification within two (2)
                  business days.
                </li>
                <li>
                  Review the notification for completeness and compliance with
                  DMCA requirements.
                </li>
                <li>
                  If the notification is valid, promptly remove or disable
                  access to the allegedly infringing material.
                </li>
                <li>
                  Notify the user who posted or is responsible for the
                  allegedly infringing material that it has been removed or
                  disabled.
                </li>
                <li>
                  Maintain records of all DMCA notifications received and
                  actions taken.
                </li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-foreground mt-10 mb-4">
                4. Counter-Notification
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                If you believe that material removed or disabled as a result of
                a DMCA notification was not infringing, or that you have
                authorization from the copyright owner, its agent, or the law to
                post and use the material, you may submit a counter-notification
                to our DMCA agent containing:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Your physical or electronic signature.</li>
                <li>
                  Identification of the material that was removed or disabled
                  and the location at which the material appeared before it was
                  removed or disabled.
                </li>
                <li>
                  A statement under penalty of perjury that you have a good
                  faith belief that the material was removed or disabled as a
                  result of mistake or misidentification.
                </li>
                <li>
                  Your name, address, telephone number, and a statement that
                  you consent to the jurisdiction of the federal court in
                  Wilmington, Delaware, and that you will accept service of
                  process from the person who provided the original DMCA
                  notification or an agent of such person.
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Upon receipt of a valid counter-notification, we will forward it
                to the original complainant and inform them that the removed
                material may be restored in ten (10) to fourteen (14) business
                days. If the copyright owner does not file a court action
                against the user during this period, we may restore the
                material.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-foreground mt-10 mb-4">
                5. Repeat Infringers
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                In accordance with the DMCA, we have adopted a policy of
                terminating the accounts of users who are determined to be
                repeat infringers in appropriate circumstances. If a user
                receives multiple valid DMCA notifications, their account may be
                suspended or permanently terminated at our sole discretion.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-foreground mt-10 mb-4">
                6. Good Faith Warning
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Please be aware that filing a false or misleading DMCA
                notification or counter-notification may result in liability for
                damages, including costs and attorney fees. Before submitting a
                DMCA notification, please ensure that your claim is valid and
                made in good faith. If you are unsure whether the material at
                issue infringes your copyright, we recommend consulting an
                attorney before proceeding.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-foreground mt-10 mb-4">
                7. Modifications
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify this DMCA policy at any time. Any
                changes will be reflected on this page with an updated &quot;Last
                updated&quot; date. We encourage you to review this policy
                periodically.
              </p>

              {/* Disclaimer */}
              <div className="mt-10 rounded-lg border border-primary/20 bg-primary/5 p-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Disclaimer:</strong>{" "}
                  LegalLawDocs.com is not a law firm and does not provide legal
                  advice. This DMCA policy is provided for informational
                  purposes and to comply with the requirements of 17 U.S.C.
                  Section 512. If you need legal advice regarding copyright
                  matters, please consult a qualified attorney.
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
