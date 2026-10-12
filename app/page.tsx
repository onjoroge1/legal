import { OrganizationSchema } from "@/components/seo/organization-schema"
import { pageMetadata } from "@/lib/site-metadata"
export const metadata = pageMetadata("/", { title: "LegalLawDocs | Drafts for professional review" })
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { LogoCloud } from "@/components/logo-cloud"
import { StatsSection } from "@/components/stats-section"
import { FeaturesSection } from "@/components/features-section"
import { ComplianceBanner } from "@/components/compliance-banner"
import { DocumentsSection } from "@/components/documents-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { PricingSection } from "@/components/pricing-section"
import { FaqSection } from "@/components/faq-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <div className="min-h-screen">
      <Header />
      <OrganizationSchema />
      <main>
        <HeroSection />
        <LogoCloud />
        <StatsSection />
        <FeaturesSection />
        <ComplianceBanner />
        <DocumentsSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
