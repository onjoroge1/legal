export const dynamic = "force-dynamic"
import { OrganizationSchema } from "@/components/seo/organization-schema"
import { pageMetadata } from "@/lib/site-metadata"
export const metadata = pageMetadata("/", { title: "LegalLawDocs | Drafts for professional review" })
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { StatsSection } from "@/components/stats-section"
import { DocumentsSection } from "@/components/documents-section"
import { PricingSection } from "@/components/pricing-section"
import { FaqSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <div className="min-h-screen">
      <Header />
      <OrganizationSchema />
      <main>
        <HeroSection />
        <StatsSection />
        <DocumentsSection />
        <PricingSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  )
}
