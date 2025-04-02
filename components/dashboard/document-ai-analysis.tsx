import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react"

export default function DocumentAIAnalysis() {
  const analysisResults = [
    {
      category: "Completeness",
      score: 85,
      status: "good",
      issues: [
        {
          severity: "medium",
          description: "Missing specific payment terms in Section 3",
          recommendation: "Add details about payment schedule and late fees",
        },
      ],
    },
    {
      category: "Clarity",
      score: 72,
      status: "warning",
      issues: [
        {
          severity: "medium",
          description: "Ambiguous language in Section 2 regarding term length",
          recommendation: "Specify exact start and end dates or clear duration",
        },
        {
          severity: "low",
          description: "Complex sentence structure in Section 5",
          recommendation: "Simplify language for better readability",
        },
      ],
    },
    {
      category: "Legal Compliance",
      score: 65,
      status: "warning",
      issues: [
        {
          severity: "high",
          description: "Missing required clauses for California jurisdiction",
          recommendation: "Add California-specific provisions for service agreements",
        },
        {
          severity: "medium",
          description: "Outdated reference to superseded regulation",
          recommendation: "Update regulatory references to current laws",
        },
      ],
    },
    {
      category: "Risk Assessment",
      score: 78,
      status: "warning",
      issues: [
        {
          severity: "medium",
          description: "Limited liability clause may be unenforceable",
          recommendation: "Revise liability limitations to ensure enforceability",
        },
      ],
    },
  ]

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Overall Document Health</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {analysisResults.map((result) => (
            <div key={result.category} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{result.category}</span>
                <Badge
                  variant="outline"
                  className={`
                    ${result.status === "good" ? "bg-green-50 text-green-700" : ""}
                    ${result.status === "warning" ? "bg-yellow-50 text-yellow-700" : ""}
                    ${result.status === "critical" ? "bg-red-50 text-red-700" : ""}
                  `}
                >
                  {result.score}%
                </Badge>
              </div>
              <Progress
                value={result.score}
                className={`h-2 ${
                  result.score >= 80 ? "bg-green-100" : result.score >= 60 ? "bg-yellow-100" : "bg-red-100"
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Identified Issues</h3>
        <div className="space-y-4">
          {analysisResults.flatMap((result) =>
            result.issues.map((issue, index) => (
              <div
                key={`${result.category}-${index}`}
                className={`border rounded-md p-4 ${
                  issue.severity === "high"
                    ? "border-red-200 bg-red-50"
                    : issue.severity === "medium"
                      ? "border-yellow-200 bg-yellow-50"
                      : "border-blue-200 bg-blue-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 ${
                      issue.severity === "high"
                        ? "text-red-500"
                        : issue.severity === "medium"
                          ? "text-yellow-500"
                          : "text-blue-500"
                    }`}
                  >
                    {issue.severity === "high" && <AlertCircle className="h-5 w-5" />}
                    {issue.severity === "medium" && <AlertTriangle className="h-5 w-5" />}
                    {issue.severity === "low" && <CheckCircle2 className="h-5 w-5" />}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{result.category} Issue</span>
                      <Badge
                        variant="outline"
                        className={`
                          ${issue.severity === "high" ? "bg-red-100 text-red-700" : ""}
                          ${issue.severity === "medium" ? "bg-yellow-100 text-yellow-700" : ""}
                          ${issue.severity === "low" ? "bg-blue-100 text-blue-700" : ""}
                        `}
                      >
                        {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)} Severity
                      </Badge>
                    </div>
                    <p className="text-sm">{issue.description}</p>
                    <p className="text-sm font-medium mt-1">Recommendation:</p>
                    <p className="text-sm">{issue.recommendation}</p>
                  </div>
                </div>
              </div>
            )),
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button className="gap-1">
          Fix Issues with AI
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

