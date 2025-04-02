"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Eye, Download } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface DocumentSampleViewerProps {
  title: string
  documentType: "nda" | "service-agreement" | "llc-operating"
}

export default function DocumentSampleViewer({ title, documentType }: DocumentSampleViewerProps) {
  const [open, setOpen] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const { toast } = useToast()

  const handleDownload = async () => {
    setIsDownloading(true)

    try {
      // Simulate download delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Create a sample PDF-like blob (in a real app, this would be a real PDF)
      const content = `Sample ${title} document content`
      const blob = new Blob([content], { type: "application/pdf" })

      // Create a download link and trigger it
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${title.toLowerCase().replace(/\s+/g, "-")}-sample.pdf`
      document.body.appendChild(a)
      a.click()

      // Clean up
      URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast({
        title: "Download started",
        description: `Your ${title} sample is downloading.`,
      })
    } catch (error) {
      toast({
        title: "Download failed",
        description: "There was an error downloading the document.",
        variant: "destructive",
      })
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <>
      <Button variant="outline" size="sm" className="gap-2" onClick={() => setOpen(true)}>
        <Eye className="h-4 w-4" />
        View Free Sample
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>{title} - Sample Preview</DialogTitle>
            <DialogDescription>
              This is a preview of our {title.toLowerCase()}. Sign up to customize and download the full document.
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-auto mt-4 border rounded-md p-6 bg-white">
            {documentType === "nda" && <NonDisclosureAgreementSample />}
            {documentType === "service-agreement" && <ServiceAgreementSample />}
            {documentType === "llc-operating" && <LLCOperatingAgreementSample />}
          </div>
          <div className="flex justify-end mt-4 gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button variant="outline" className="gap-2" onClick={handleDownload} disabled={isDownloading}>
              <Download className="h-4 w-4" />
              {isDownloading ? "Downloading..." : "Download Sample"}
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up for Full Access</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

function NonDisclosureAgreementSample() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-center">NON-DISCLOSURE AGREEMENT</h2>

      <p>This Non-Disclosure Agreement (the "Agreement") is entered into as of [DATE] by and between:</p>

      <p>
        <strong>Disclosing Party:</strong> [DISCLOSING PARTY NAME], with an address at [ADDRESS] (the "Disclosing
        Party"); and
      </p>

      <p>
        <strong>Receiving Party:</strong> [RECEIVING PARTY NAME], with an address at [ADDRESS] (the "Receiving Party").
      </p>

      <p>
        <strong>1. Purpose.</strong> The Disclosing Party wishes to disclose certain confidential and proprietary
        information to the Receiving Party for the purpose of [PURPOSE OF DISCLOSURE] (the "Purpose").
      </p>

      <p>
        <strong>2. Definition of Confidential Information.</strong> "Confidential Information" means any information
        disclosed by the Disclosing Party to the Receiving Party, either directly or indirectly, in writing, orally or
        by inspection of tangible objects, that is designated as "Confidential," "Proprietary" or some similar
        designation, or that should reasonably be understood to be confidential given the nature of the information and
        the circumstances of disclosure.
      </p>

      <p>
        <strong>3. Obligations of Receiving Party.</strong> The Receiving Party shall:
      </p>

      <ul className="list-disc pl-8 space-y-2">
        <li>Hold the Confidential Information in strict confidence;</li>
        <li>Use the Confidential Information solely for the Purpose;</li>
        <li>Not disclose such Confidential Information to any third party;</li>
        <li>
          Take reasonable measures to protect the secrecy of and avoid disclosure and unauthorized use of the
          Confidential Information;
        </li>
        <li>
          Immediately notify the Disclosing Party in the event of any unauthorized use or disclosure of the Confidential
          Information.
        </li>
      </ul>

      <p>
        <strong>4. Term.</strong> The obligations of the Receiving Party under this Agreement shall survive until such
        time as all Confidential Information disclosed hereunder becomes publicly known and made generally available
        through no action or inaction of the Receiving Party.
      </p>

      <div className="text-center text-sm text-muted-foreground mt-8 border-t pt-4">
        <p>Sample document - Sign up to access the full version</p>
        <p>
          Additional clauses include: Exclusions, Return of Materials, No Rights Granted, No Warranty, Remedies, and
          more
        </p>
      </div>
    </div>
  )
}

function ServiceAgreementSample() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-center">SERVICE AGREEMENT</h2>

      <p>This Service Agreement (the "Agreement") is entered into as of [DATE] by and between:</p>

      <p>
        <strong>Service Provider:</strong> [SERVICE PROVIDER NAME], with an address at [ADDRESS] (the "Service
        Provider"); and
      </p>

      <p>
        <strong>Client:</strong> [CLIENT NAME], with an address at [ADDRESS] (the "Client").
      </p>

      <p>
        <strong>1. Services.</strong> Service Provider shall provide the following services to Client (the "Services"):
      </p>

      <p className="pl-4 border-l-2 border-gray-200">[DESCRIPTION OF SERVICES]</p>

      <p>
        <strong>2. Term.</strong> This Agreement shall commence on [START DATE] and shall continue until [END DATE],
        unless earlier terminated as provided herein.
      </p>

      <p>
        <strong>3. Compensation.</strong> In consideration for the Services, Client shall pay Service Provider as
        follows:
      </p>

      <p className="pl-4 border-l-2 border-gray-200">[PAYMENT TERMS, RATES, SCHEDULE]</p>

      <p>
        <strong>4. Independent Contractor Relationship.</strong> Service Provider is an independent contractor, and
        nothing contained in this Agreement shall be construed to create a partnership, joint venture, agency, or
        employment relationship between Client and Service Provider.
      </p>

      <p>
        <strong>5. Confidentiality.</strong> Service Provider acknowledges that during the engagement, Service Provider
        may have access to and become acquainted with confidential information belonging to Client. Service Provider
        agrees not to disclose any such information without Client's prior written consent.
      </p>

      <div className="text-center text-sm text-muted-foreground mt-8 border-t pt-4">
        <p>Sample document - Sign up to access the full version</p>
        <p>
          Additional clauses include: Intellectual Property, Warranties, Limitation of Liability, Termination, and more
        </p>
      </div>
    </div>
  )
}

function LLCOperatingAgreementSample() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-center">LLC OPERATING AGREEMENT</h2>

      <p className="text-center">
        <strong>[COMPANY NAME], LLC</strong>
        <br />A [STATE] Limited Liability Company
      </p>

      <p>
        This Limited Liability Company Operating Agreement (the "Agreement") is made and entered into as of [DATE] (the
        "Effective Date") by and among the Members listed on Schedule A attached hereto.
      </p>

      <p>
        <strong>ARTICLE I - ORGANIZATION</strong>
      </p>

      <p>
        <strong>1.1 Formation.</strong> The Members have formed a limited liability company under the name [COMPANY
        NAME], LLC (the "Company") on [DATE] by filing the Articles of Organization with the [STATE] Secretary of State
        in accordance with the [STATE] Limited Liability Company Act (the "Act"). The rights and obligations of the
        Members shall be as provided in the Act except as otherwise expressly provided in this Agreement.
      </p>

      <p>
        <strong>1.2 Name.</strong> The business of the Company shall be conducted under the name [COMPANY NAME], LLC or
        such other name as the Members may determine.
      </p>

      <p>
        <strong>1.3 Principal Place of Business.</strong> The principal place of business of the Company shall be
        located at [ADDRESS], or such other place as the Members may determine.
      </p>

      <p>
        <strong>1.4 Purpose.</strong> The purpose of the Company is to engage in any lawful act or activity for which
        limited liability companies may be formed under the Act.
      </p>

      <p>
        <strong>ARTICLE II - MEMBERS</strong>
      </p>

      <p>
        <strong>2.1 Initial Members.</strong> The initial Members of the Company are listed on Schedule A attached
        hereto.
      </p>

      <p>
        <strong>2.2 Capital Contributions.</strong> The initial capital contributions of the Members are set forth on
        Schedule A attached hereto.
      </p>

      <div className="text-center text-sm text-muted-foreground mt-8 border-t pt-4">
        <p>Sample document - Sign up to access the full version</p>
        <p>
          Additional articles include: Management, Distributions, Tax Provisions, Transfer Restrictions, Dissolution,
          and more
        </p>
      </div>
    </div>
  )
}

