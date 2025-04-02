"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, Wrench, Scale, DollarSign } from "lucide-react"
import CountdownTimer from "@/components/countdown-timer"
import FeatureCard from "@/components/feature-card"
import DocumentCard from "@/components/document-card"
import PricingCard from "@/components/pricing-card"
import TestimonialCard from "@/components/testimonial-card"
import StepCard from "@/components/step-card"

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Countdown Timer */}
      <CountdownTimer />

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="text-2xl font-bold text-primary">LegalLawDocs.com</div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium transition-colors hover:text-primary">
              Features
            </Link>
            <Link href="#samples" className="text-sm font-medium transition-colors hover:text-primary">
              Sample Docs
            </Link>
            <Link href="#pricing" className="text-sm font-medium transition-colors hover:text-primary">
              Pricing
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium transition-colors hover:text-primary">
              How It Works
            </Link>
            <Link href="#states" className="text-sm font-medium transition-colors hover:text-primary">
              State Compliance
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="#pricing">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-slate-50 to-slate-100 py-20">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <Badge className="bg-blue-100 text-primary hover:bg-blue-200">Powered by Claude AI</Badge>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  Legal Documents <span className="text-primary">in Minutes</span>, Not Hours
                </h1>
                <p className="text-lg text-muted-foreground">
                  Create professional-quality, legally compliant documents instantly with our AI-powered platform. Save
                  thousands in legal fees with documents tailored to your specific business needs.
                </p>
                <Button size="lg" asChild>
                  <Link href="#pricing">Start Creating Documents</Link>
                </Button>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/images/hero-legal-docs.png"
                  alt="AI-Generated Legal Documents"
                  width={500}
                  height={400}
                  className="rounded-lg shadow-lg"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Why Choose LegalLawDocs.com?</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our AI-powered platform delivers customized legal documents with unmatched speed, accuracy, and
                affordability.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard
                icon={<Zap className="h-6 w-6" />}
                title="Instant AI Document Generation"
                description="Create professional-quality legal documents in minutes, not days. Our Claude AI integration ensures accurate, context-aware document creation."
              />

              <FeatureCard
                icon={<Wrench className="h-6 w-6" />}
                title="Advanced Customization"
                description="Tailor clauses, agreements, and forms precisely to your business needs with industry-specific templates for real estate, e-commerce, freelancers, and more."
              />

              <FeatureCard
                icon={<Scale className="h-6 w-6" />}
                title="State-Specific Compliance"
                description="All documents are automatically generated to comply with each state's specific legal standards and regulations, with continuous updates as laws change."
              />

              <FeatureCard
                icon={<DollarSign className="h-6 w-6" />}
                title="Significant Cost Savings"
                description="Save thousands in legal fees with our affordable subscription plans. Get professional-quality documents at a fraction of traditional legal costs."
              />
            </div>
          </div>
        </section>

        {/* Sample Documents Section */}
        <section id="samples" className="py-20 bg-slate-50">
          <div className="container">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Free Sample Documents</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Download these sample documents to experience the quality and effectiveness of our platform.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DocumentCard
                title="Non-Disclosure Agreement"
                description="Protect your confidential information with our comprehensive NDA template."
                imageSrc="/images/non-disclosure-agreement.png"
              />

              <DocumentCard
                title="Service Agreement"
                description="Establish clear terms for services with this professionally crafted agreement."
                imageSrc="/images/service-agreement.png"
              />

              <DocumentCard
                title="LLC Operating Agreement"
                description="Define the financial and functional decisions of your LLC with this essential document."
                imageSrc="/images/llc-operating-agreement.png"
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20">
          <div className="container">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Get your legal documents in just three simple steps
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-between max-w-4xl mx-auto relative">
              <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-slate-200 z-0"></div>

              <StepCard
                number={1}
                title="Choose Document"
                description="Select from our extensive library of legal document templates"
              />

              <StepCard
                number={2}
                title="Input Information"
                description="Answer a few simple questions about your specific needs"
              />

              <StepCard
                number={3}
                title="Instant Download"
                description="Get your customized, legally-compliant document immediately"
              />
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-slate-50">
          <div className="container">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Simple, Transparent Pricing</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Choose the plan that works best for your business needs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <PricingCard
                name="Free"
                price="$0"
                period="forever"
                features={[
                  "1 free basic document",
                  "Preview advanced documents",
                  "PDF format only",
                  "Basic customization",
                  "Community support",
                ]}
                buttonText="Get Started"
                popular={false}
              />

              <PricingCard
                name="Standard"
                price="$49"
                period="per month"
                features={[
                  "Unlimited document generation",
                  "Advanced customization options",
                  "Full state compliance features",
                  "All document formats included",
                  "Email support within 24 hours",
                  "Editable documents with revision history",
                ]}
                buttonText="Choose Standard"
                popular={true}
              />

              <PricingCard
                name="Premium"
                price="$99"
                period="per month"
                features={[
                  "Everything in Standard plan",
                  "Priority support (same-day)",
                  "Contract review by legal professionals",
                  "Unlimited document storage",
                  "Custom clauses library",
                  "API access for integration",
                ]}
                buttonText="Choose Premium"
                popular={false}
              />
            </div>
          </div>
        </section>

        {/* State Compliance Section */}
        <section id="states" className="py-20">
          <div className="container">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Built-in State-Specific Legal Compliance</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our documents automatically adjust to meet the specific legal requirements of each state
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Alabama",
                "Alaska",
                "Arizona",
                "Arkansas",
                "California",
                "Colorado",
                "Connecticut",
                "Delaware",
                "Florida",
                "Georgia",
                "Hawaii",
                "Idaho",
                "Illinois",
                "+ 37 more states",
              ].map((state) => (
                <Badge key={state} variant="outline" className="px-3 py-1 text-sm bg-background">
                  {state}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-slate-50">
          <div className="container">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">What Our Customers Say</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Join thousands of businesses that trust LegalLawDocs.com for their legal document needs
              </p>
            </div>

            <div className="flex overflow-x-auto gap-6 pb-6 -mx-4 px-4">
              <TestimonialCard
                quote="LegalLawDocs.com saved us over $10,000 in legal fees for our startup. The documents are professionally written and the state compliance feature gives us peace of mind."
                name="Jennifer Smith"
                title="CEO, TechStart Inc."
              />

              <TestimonialCard
                quote="As a real estate investor, I need different legal documents for each property. This platform has streamlined my entire process and saved me countless hours of work."
                name="Michael Johnson"
                title="Real Estate Investor"
              />

              <TestimonialCard
                quote="The customization options are incredible. I was able to create exactly what I needed for my consulting business without paying expensive lawyer fees."
                name="Sarah Williams"
                title="Independent Consultant"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
              Join thousands of businesses saving time and money with our AI-powered legal document platform.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="#pricing">Create Your First Document</Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-200 py-12">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Document Library
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Legal Guides
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    State Laws
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Partners
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm">
            <p>© {new Date().getFullYear()} LegalLawDocs.com. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

