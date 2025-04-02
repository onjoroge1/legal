import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Share2 } from "lucide-react"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

interface DocumentPreviewPageProps {
  params: {
    id: string
  }
}

export function generateMetadata({ params }: DocumentPreviewPageProps): Metadata {
  return {
    title: `${getDocumentTitle(params.id)} Preview | LegalLawDocs.com`,
    description: `Preview the ${getDocumentTitle(params.id)} sample document before downloading`,
  }
}

function getDocumentTitle(id: string): string {
  const documentTitles: Record<string, string> = {
    nda: "Non-Disclosure Agreement",
    "service-agreement": "Service Agreement",
    "llc-operating": "LLC Operating Agreement",
    "employment-contract": "Employment Contract",
    "independent-contractor": "Independent Contractor Agreement",
    "privacy-policy": "Privacy Policy",
    "terms-of-service": "Terms of Service",
    "lease-agreement": "Lease Agreement",
    "rental-application": "Rental Application",
  }

  return documentTitles[id] || "Document"
}

export default function DocumentPreviewPage({ params }: DocumentPreviewPageProps) {
  const documentTitle = getDocumentTitle(params.id)
  const previewUrl = `/samples/${params.id}-preview.pdf`
  const downloadUrl = `/samples/${params.id}-sample.pdf`

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1 container py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link href="/free-samples">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{documentTitle}</h1>
              <p className="text-muted-foreground">Sample Document Preview</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button size="sm" className="gap-1" asChild>
              <Link href={downloadUrl} download>
                <Download className="h-4 w-4" />
                Download
              </Link>
            </Button>
          </div>
        </div>

        <div className="border rounded-md overflow-hidden bg-white mb-8">
          <iframe src={previewUrl} className="w-full h-[70vh]" title={`${documentTitle} preview`} />
        </div>

        <div className="bg-muted p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">About This Document</h2>
          <p className="mb-4">
            This is a sample version of our {documentTitle.toLowerCase()}. The full version includes:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Complete customization options for your specific needs</li>
            <li>State-specific compliance features</li>
            <li>Additional clauses and provisions not included in the sample</li>
            <li>Editable format with revision history</li>
            <li>Legal guidance and explanations for each section</li>
          </ul>
          <div className="flex justify-center">
            <Button size="lg" asChild>
              <Link href="/pricing">Get Full Access</Link>
            </Button>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

