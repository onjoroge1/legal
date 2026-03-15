import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Scale,
  Shield,
  Zap,
  Users,
  Globe,
  FileCheck,
  ArrowRight,
} from "lucide-react"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about LegalLawDocs.com's mission to make professional legal documents accessible and affordable through AI-powered document generation.",
  openGraph: {
    title: "About Us | LegalLawDocs.com",
    description:
      "Our mission is to make professional legal documents accessible and affordable through AI.",
  },
  alternates: {
    canonical: "https://www.legallawdocs.com/about",
  },
}

const values = [
  {
    icon: Shield,
    title: "Trust and Security",
    description:
      "Your data is protected with enterprise-grade encryption and SOC 2 compliant infrastructure. We treat every document with the confidentiality it deserves.",
  },
  {
    icon: Zap,
    title: "Speed and Efficiency",
    description:
      "What used to take days and cost hundreds of dollars now takes minutes. Our AI generates professional documents in a fraction of the time.",
  },
  {
    icon: Users,
    title: "Accessibility for All",
    description:
      "We believe everyone deserves access to quality legal documents, regardless of their budget. Our platform makes legal protection affordable and approachable.",
  },
  {
    icon: Globe,
    title: "State-Specific Compliance",
    description:
      "Legal requirements vary by jurisdiction. Our platform generates documents tailored to the specific laws and regulations of your state.",
  },
  {
    icon: FileCheck,
    title: "Quality and Accuracy",
    description:
      "Our document templates are developed with input from legal professionals and continuously updated to reflect current laws and best practices.",
  },
  {
    icon: Scale,
    title: "Transparency",
    description:
      "We are upfront about what we are and what we are not. We provide tools for document generation, not legal advice, and we are always clear about that distinction.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative border-b border-border/40 bg-gradient-to-b from-primary/5 to-background">
          <div className="mx-auto max-w-4xl px-4 py-16 text-center lg:px-8 lg:py-24">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
              <Scale className="h-7 w-7 text-primary" />
            </div>
            <h1 className="font-serif text-4xl font-bold text-foreground lg:text-5xl">
              About LegalLawDocs
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Making professional legal documents accessible, affordable, and
              easy to create for individuals and businesses everywhere.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="mx-auto max-w-4xl px-4 py-12 lg:px-8 lg:py-20">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              At LegalLawDocs.com, we believe that access to professional legal
              documents should not be limited by cost or complexity. Our mission
              is to democratize legal document creation by combining the power
              of artificial intelligence with carefully designed templates,
              enabling individuals, small businesses, and entrepreneurs to
              protect their interests without the prohibitive expense of
              traditional legal services.
            </p>
          </div>

          {/* Story */}
          <Card className="border-border/40 mb-16">
            <CardContent className="p-8 lg:p-12">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                Why We Built LegalLawDocs
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Too many individuals and small businesses operate without
                  proper legal protections simply because they cannot afford
                  traditional legal services. A basic contract drafted by an
                  attorney can cost hundreds or even thousands of dollars,
                  placing essential legal documents out of reach for those who
                  need them most.
                </p>
                <p>
                  LegalLawDocs.com was founded to bridge that gap. We harness
                  advanced AI technology to generate professional, state-specific
                  legal documents at a fraction of the cost and time of
                  traditional methods. Our platform guides users through a simple
                  questionnaire, then produces customized documents ready for
                  review, download, and use.
                </p>
                <p>
                  From non-disclosure agreements and independent contractor
                  agreements to wills, power of attorney documents, and business
                  formation filings, our growing library of templates covers the
                  documents that individuals and businesses need most. Each
                  template is designed with state-specific compliance in mind and
                  updated regularly to reflect changes in the law.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Values */}
          <div className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-foreground text-center mb-10">
              Our Values
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((value) => (
                <Card key={value.title} className="border-border/40">
                  <CardContent className="p-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 mb-4">
                      <value.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-8 lg:p-12 text-center">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Join thousands of individuals and businesses who trust
                LegalLawDocs.com for their legal document needs. Create your
                first document in minutes.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild className="shadow-md shadow-primary/20">
                  <Link href="/signup">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <div className="mt-10 rounded-lg border border-primary/20 bg-primary/5 p-6">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Disclaimer:</strong>{" "}
              LegalLawDocs.com is not a law firm and does not provide legal
              advice, legal representation, or attorney-client relationships.
              Our platform provides self-help document generation services at
              your specific direction. Documents generated through our platform
              are for informational purposes and should be reviewed by a
              qualified attorney before use. We are not a substitute for the
              advice of an attorney.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
