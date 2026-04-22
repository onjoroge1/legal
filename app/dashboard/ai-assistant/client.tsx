"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  FileText,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Loader2,
  Info,
  ArrowRight,
  ShieldCheck,
} from "lucide-react"

type Doc = { id: string; title: string; type: string; updatedAt: string }

type Issue = { title: string; description: string; severity: "low" | "medium" | "high" }
type Recommendation = { title: string; description: string }

type Analysis = {
  riskScore: "low" | "medium" | "high"
  riskReason: string
  issues: Issue[]
  recommendations: Recommendation[]
  summary: string
  keyTerms: string[]
  documentType: string
}

const riskColors = {
  low: "bg-green-50 text-green-700 border-green-200",
  medium: "bg-yellow-50 text-yellow-700 border-yellow-200",
  high: "bg-red-50 text-red-700 border-red-200",
}

const severityIcon = {
  low: <CheckCircle2 className="h-4 w-4 text-green-500" />,
  medium: <AlertTriangle className="h-4 w-4 text-yellow-500" />,
  high: <AlertTriangle className="h-4 w-4 text-red-500" />,
}

export default function AIAssistantClient({ documents }: { documents: Doc[] }) {
  const [selectedDoc, setSelectedDoc] = useState<Doc | null>(null)
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const analyze = async (doc: Doc) => {
    setSelectedDoc(doc)
    setAnalysis(null)
    setError(null)
    setLoading(true)

    try {
      const res = await fetch("/api/documents/ai-analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentId: doc.id }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Analysis failed")
      setAnalysis(data.analysis)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to analyze document")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Document Assistant</h1>
          <p className="text-muted-foreground">
            Select a document below to get AI-powered analysis, risk scoring, and recommendations.
          </p>
        </div>
        <ShieldCheck className="h-8 w-8 text-primary opacity-60" />
      </div>

      {/* Document list */}
      {documents.length === 0 ? (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            You don&apos;t have any documents yet.{" "}
            <a href="/documents" className="underline">
              Generate your first document
            </a>{" "}
            to get started.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {documents.map((doc) => (
            <Card
              key={doc.id}
              className={`cursor-pointer transition-all hover:border-primary/50 ${
                selectedDoc?.id === doc.id ? "border-primary bg-primary/5" : ""
              }`}
              onClick={() => analyze(doc)}
            >
              <CardHeader className="p-5 pb-3">
                <div className="flex items-start gap-3">
                  <div className="rounded-md bg-primary/10 p-2 shrink-0">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <CardTitle className="text-base leading-tight truncate">{doc.title}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">{doc.type}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-5 pt-0">
                <p className="text-xs text-muted-foreground mb-3">
                  Updated {new Date(doc.updatedAt).toLocaleDateString()}
                </p>
                <Button
                  size="sm"
                  variant={selectedDoc?.id === doc.id ? "default" : "outline"}
                  className="w-full gap-1"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Analyze
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Analysis results */}
      {(loading || analysis || error) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              {loading ? "Analyzing document..." : selectedDoc?.title}
            </CardTitle>
            {!loading && analysis && (
              <CardDescription>AI analysis — {analysis.documentType}</CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {loading && (
              <div className="flex items-center gap-3 py-8 justify-center text-muted-foreground">
                <Loader2 className="h-6 w-6 animate-spin" />
                Running AI analysis on your document...
              </div>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {analysis && (
              <div className="space-y-6">
                {/* Risk score */}
                <div className="flex items-start gap-4">
                  <div className={`rounded-lg border px-4 py-3 ${riskColors[analysis.riskScore]}`}>
                    <p className="text-xs font-medium uppercase tracking-wide opacity-70">Risk Score</p>
                    <p className="text-xl font-bold capitalize">{analysis.riskScore}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-1">Executive Summary</p>
                    <p className="text-sm text-muted-foreground">{analysis.summary}</p>
                    <p className="text-xs text-muted-foreground mt-2 italic">{analysis.riskReason}</p>
                  </div>
                </div>

                {/* Key terms */}
                <div>
                  <p className="text-sm font-medium mb-2">Key Legal Terms</p>
                  <div className="flex flex-wrap gap-2">
                    {analysis.keyTerms.map((term) => (
                      <Badge key={term} variant="secondary" className="text-xs">
                        {term}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Issues */}
                <div>
                  <p className="text-sm font-medium mb-3">Issues Found</p>
                  <div className="space-y-3">
                    {analysis.issues.map((issue, i) => (
                      <div key={i} className="flex gap-3 rounded-lg border p-3">
                        <div className="mt-0.5 shrink-0">{severityIcon[issue.severity]}</div>
                        <div>
                          <p className="text-sm font-medium">{issue.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{issue.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <p className="text-sm font-medium mb-3">Recommendations</p>
                  <div className="space-y-3">
                    {analysis.recommendations.map((rec, i) => (
                      <div key={i} className="flex gap-3 rounded-lg bg-muted/50 p-3">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-medium">{rec.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{rec.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
