import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Plus, Check, ArrowRight } from "lucide-react"

export default function DocumentAIRecommendations() {
  const recommendations = [
    {
      id: "1",
      category: "Missing Clauses",
      title: "Add Force Majeure Clause",
      description:
        "This document lacks a force majeure clause, which protects parties in case of unforeseeable circumstances that prevent fulfillment of obligations.",
      suggestedText:
        "Neither party shall be liable for any failure or delay in performance under this Agreement to the extent said failures or delays are proximately caused by causes beyond that party's reasonable control and occurring without its fault or negligence...",
      importance: "high",
    },
    {
      id: "2",
      category: "Legal Compliance",
      title: "Update Governing Law for California",
      description:
        "Since this agreement is for services in California, it should include California-specific provisions.",
      suggestedText:
        "This Agreement shall be governed by and construed in accordance with the laws of the State of California, without giving effect to any choice of law or conflict of law provisions. The parties consent to the exclusive jurisdiction and venue in the state and federal courts located in [County], California.",
      importance: "high",
    },
    {
      id: "3",
      category: "Clarity Improvement",
      title: "Clarify Payment Terms",
      description: "The payment terms in Section 3 are ambiguous and could lead to disputes.",
      suggestedText:
        "Client shall pay Service Provider within thirty (30) days of receipt of an invoice. Invoices will be submitted on the 1st of each month. Late payments shall accrue interest at a rate of 1.5% per month or the maximum rate permitted by law, whichever is less.",
      importance: "medium",
    },
    {
      id: "4",
      category: "Risk Mitigation",
      title: "Revise Limitation of Liability",
      description: "The current limitation of liability clause may be too broad to be enforceable.",
      suggestedText:
        "IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES. EACH PARTY'S TOTAL CUMULATIVE LIABILITY SHALL NOT EXCEED THE TOTAL AMOUNT PAID BY CLIENT TO SERVICE PROVIDER UNDER THIS AGREEMENT DURING THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO LIABILITY.",
      importance: "medium",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">AI-Generated Recommendations</h3>
        <Button variant="outline" className="gap-1">
          <Check className="h-4 w-4" />
          Apply All
        </Button>
      </div>

      <div className="space-y-6">
        {recommendations.map((recommendation) => (
          <div key={recommendation.id} className="border rounded-md overflow-hidden">
            <div className="bg-muted p-4 flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Lightbulb
                  className={`h-5 w-5 mt-0.5 ${
                    recommendation.importance === "high" ? "text-amber-500" : "text-blue-500"
                  }`}
                />
                <div>
                  <h4 className="font-medium">{recommendation.title}</h4>
                  <p className="text-sm text-muted-foreground">{recommendation.category}</p>
                </div>
              </div>
              <Badge
                variant="outline"
                className={`
                  ${recommendation.importance === "high" ? "bg-amber-50 text-amber-700" : ""}
                  ${recommendation.importance === "medium" ? "bg-blue-50 text-blue-700" : ""}
                  ${recommendation.importance === "low" ? "bg-green-50 text-green-700" : ""}
                `}
              >
                {recommendation.importance.charAt(0).toUpperCase() + recommendation.importance.slice(1)} Priority
              </Badge>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-sm">{recommendation.description}</p>
              <div className="bg-muted/50 p-3 rounded-md border text-sm font-mono">{recommendation.suggestedText}</div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  Edit Suggestion
                </Button>
                <Button size="sm" className="gap-1">
                  <Plus className="h-4 w-4" />
                  Apply
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-4 border-t">
        <Button variant="outline" className="gap-1">
          <Lightbulb className="h-4 w-4" />
          Generate More Recommendations
        </Button>
        <Button className="gap-1">
          Apply Selected
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

