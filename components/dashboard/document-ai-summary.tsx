import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy, Download } from "lucide-react"

export default function DocumentAISummary() {
  const documentSummary = {
    title: "Service Agreement",
    parties: [
      { role: "Client", name: "[Client Name]" },
      { role: "Service Provider", name: "[Service Provider Name]" },
    ],
    effectiveDate: "[Date]",
    termLength: "From [Start Date] until [End Date]",
    keyProvisions: [
      "Services to be provided as described in Exhibit A",
      "Compensation as set forth in Exhibit B",
      "Independent contractor relationship established",
      "Confidentiality obligations for Service Provider",
    ],
    missingElements: [
      "Force Majeure clause",
      "Specific payment terms and schedule",
      "Termination for convenience provision",
      "Dispute resolution mechanism",
    ],
    plainLanguageSummary:
      "This agreement establishes a relationship between a client and service provider. The provider will deliver services as outlined in an attachment to the agreement, and the client will pay according to terms in another attachment. The provider is considered an independent contractor, not an employee. The provider must keep the client's confidential information private. The agreement is missing several important provisions that should be added for better protection of both parties.",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Document Summary</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Copy className="h-4 w-4" />
            Copy
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Document Type</h4>
            <p>{documentSummary.title}</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Effective Date</h4>
            <p>{documentSummary.effectiveDate}</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Parties</h4>
            <div>
              {documentSummary.parties.map((party, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Badge variant="outline">{party.role}</Badge>
                  <span>{party.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Term Length</h4>
            <p>{documentSummary.termLength}</p>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Key Provisions</h4>
          <ul className="list-disc pl-5 space-y-1">
            {documentSummary.keyProvisions.map((provision, index) => (
              <li key={index} className="text-sm">
                {provision}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Missing Elements</h4>
          <ul className="list-disc pl-5 space-y-1">
            {documentSummary.missingElements.map((element, index) => (
              <li key={index} className="text-sm text-amber-600">
                {element}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Plain Language Summary</h4>
          <div className="bg-muted/50 p-4 rounded-md border text-sm">{documentSummary.plainLanguageSummary}</div>
        </div>
      </div>

      <div className="pt-4 border-t">
        <Button className="w-full">Generate Comprehensive Legal Analysis</Button>
      </div>
    </div>
  )
}

