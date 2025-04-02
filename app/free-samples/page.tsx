import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowRight, CheckCircle2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import SampleDocumentCard from "@/components/sample-document-card"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Free Sample Documents | LegalLawDocs.com",
  description: "Download free sample legal documents to see the quality of our AI-generated documents",
}

export default function FreeSamplesPage() {
  // Sample document categories
  const categories = [
    { id: "all", name: "All Samples" },
    { id: "business", name: "Business" },
    { id: "employment", name: "Employment" },
    { id: "real-estate", name: "Real Estate" },
    { id: "website", name: "Website Legal" },
  ]

  // Sample document data
  const sampleDocuments = [
    {
      id: "nda",
      title: "Non-Disclosure Agreement",
      description: "Protect your confidential information with this comprehensive NDA template.",
      category: "business",
      downloadCount: 2543,
      imageSrc: "/placeholder.svg?height=180&width=400",
      previewUrl: "/samples/nda-preview.pdf",
      downloadUrl: "/samples/nda-sample.pdf",
    },
    {
      id: "service-agreement",
      title: "Service Agreement",
      description: "Establish clear terms for services with this professionally crafted agreement.",
      category: "business",
      downloadCount: 1876,
      imageSrc: "/placeholder.svg?height=180&width=400",
      previewUrl: "/samples/service-agreement-preview.pdf",
      downloadUrl: "/samples/service-agreement-sample.pdf",
    },
    {
      id: "llc-operating",
      title: "LLC Operating Agreement",
      description: "Define the financial and functional decisions of your LLC with this essential document.",
      category: "business",
      downloadCount: 1654,
      imageSrc: "/placeholder.svg?height=180&width=400",
      previewUrl: "/samples/llc-operating-preview.pdf",
      downloadUrl: "/samples/llc-operating-sample.pdf",
    },
    {
      id: "employment-contract",
      title: "Employment Contract",
      description: "A comprehensive employment agreement that protects both employer and employee.",
      category: "employment",
      downloadCount: 1432,
      imageSrc: "/placeholder.svg?height=180&width=400",
      previewUrl: "/samples/employment-contract-preview.pdf",
      downloadUrl: "/samples/employment-contract-sample.pdf",
    },
    {
      id: "independent-contractor",
      title: "Independent Contractor Agreement",
      description: "Clearly define the relationship between your business and contractors.",
      category: "employment",
      downloadCount: 987,
      imageSrc: "/placeholder.svg?height=180&width=400",
      previewUrl: "/samples/independent-contractor-preview.pdf",
      downloadUrl: "/samples/independent-contractor-sample.pdf",
    },
    {
      id: "privacy-policy",
      title: "Privacy Policy",
      description: "A customizable privacy policy for your website or application.",
      category: "website",
      downloadCount: 1765,
      imageSrc: "/placeholder.svg?height=180&width=400",
      previewUrl: "/samples/privacy-policy-preview.pdf",
      downloadUrl: "/samples/privacy-policy-sample.pdf",
    },
    {
      id: "terms-of-service",
      title: "Terms of Service",
      description: "Establish the rules and guidelines for using your website or service.",
      category: "website",
      downloadCount: 1543,
      imageSrc: "/placeholder.svg?height=180&width=400",
      previewUrl: "/samples/terms-of-service-preview.pdf",
      downloadUrl: "/samples/terms-of-service-sample.pdf",
    },
    {
      id: "lease-agreement",
      title: "Lease Agreement",
      description: "A comprehensive lease agreement for residential or commercial properties.",
      category: "real-estate",
      downloadCount: 1234,
      imageSrc: "/placeholder.svg?height=180&width=400",
      previewUrl: "/samples/lease-agreement-preview.pdf",
      downloadUrl: "/samples/lease-agreement-sample.pdf",
    },
    {
      id: "rental-application",
      title: "Rental Application",
      description: "Screen potential tenants with this detailed rental application form.",
      category: "real-estate",
      downloadCount: 1098,
      imageSrc: "/placeholder.svg?height=180&width=400",
      previewUrl: "/samples/rental-application-preview.pdf",
      downloadUrl: "/samples/rental-application-sample.pdf",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-50 to-slate-100 py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <Badge className="bg-blue-100 text-primary hover:bg-blue-200">Free Samples</Badge>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Try Before You Subscribe</h1>
            <p className="text-lg text-muted-foreground">
              Download these free sample documents to experience the quality and effectiveness of our AI-powered legal
              document platform.
            </p>
            <div className="relative max-w-md mx-auto mt-6">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search for sample documents..." className="pl-10 pr-4 py-6" />
            </div>
          </div>
        </div>
      </section>

      {/* Samples Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <Tabs defaultValue="all" className="space-y-8">
            <TabsList className="flex flex-wrap h-auto justify-center">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {sampleDocuments
                    .filter((doc) => category.id === "all" || doc.category === category.id)
                    .map((document) => (
                      <SampleDocumentCard
                        key={document.id}
                        title={document.title}
                        description={document.description}
                        imageSrc={document.imageSrc}
                        downloadCount={document.downloadCount}
                        previewUrl={document.previewUrl}
                        downloadUrl={document.downloadUrl}
                      />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">Why Our Documents Stand Out</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our AI-powered platform delivers customized legal documents with unmatched quality, accuracy, and
              compliance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">State-Specific Compliance</h3>
              <p className="text-muted-foreground">
                All documents automatically adjust to meet the specific legal requirements of each state.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">Attorney-Reviewed</h3>
              <p className="text-muted-foreground">
                Our templates are created and reviewed by experienced attorneys to ensure legal accuracy.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">Customizable</h3>
              <p className="text-muted-foreground">
                Every document can be fully customized to your specific business needs and requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-primary text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold">Ready for Full Access?</h2>
              <p className="text-lg opacity-90">
                Get unlimited access to all document templates and advanced features with a subscription.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="secondary" size="lg" asChild>
                <Link href="/pricing">View Pricing</Link>
              </Button>
              <Button
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white/10"
                size="lg"
                asChild
              >
                <Link href="/signup">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

