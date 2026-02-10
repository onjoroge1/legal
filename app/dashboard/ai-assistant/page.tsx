import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import type { Metadata } from "next"
import { FileText, AlertTriangle, CheckCircle2, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"
import DocumentAIAnalysis from "@/components/dashboard/document-ai-analysis"
import DocumentAIRecommendations from "@/components/dashboard/document-ai-recommendations"
import DocumentAISummary from "@/components/dashboard/document-ai-summary"

export const metadata: Metadata = {
  title: "AI Document Assistant | LegalLawDocs.com",
  description: "AI-powered analysis and recommendations for your legal documents",
}

export default function AIAssistantPage() {
  // Recent documents
  const recentDocuments = [
    {
      id: "1",
      title: "Service Agreement",
      type: "Agreement",
      date: "Modified 2 days ago",
      riskScore: "medium",
    },
    {
      id: "2",
      title: "Non-Disclosure Agreement",
      type: "Contract",
      date: "Created 1 week ago",
      riskScore: "low",
    },
    {
      id: "3",
      title: "Employment Contract",
      type: "Contract",
      date: "Modified 3 days ago",
      riskScore: "high",
    },
  ]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Document Assistant</h1>
          <p className="text-muted-foreground">AI-powered analysis and recommendations for your legal documents</p>
        </div>
        <Button className="gap-1">
          <Sparkles className="h-4 w-4" />
          Analyze New Document
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recentDocuments.map((doc) => (
          <Card key={doc.id} className="overflow-hidden">
            <CardHeader className="p-6 pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="rounded-md bg-primary/10 p-2">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{doc.title}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{doc.type}</span>
                      <span>•</span>
                      <span>{doc.date}</span>
                    </div>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={`
                    ${doc.riskScore === "low" ? "bg-green-50 text-green-700" : ""}
                    ${doc.riskScore === "medium" ? "bg-yellow-50 text-yellow-700" : ""}
                    ${doc.riskScore === "high" ? "bg-red-50 text-red-700" : ""}
                  `}
                >
                  {doc.riskScore === "low" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                  {doc.riskScore === "medium" && <AlertTriangle className="h-3 w-3 mr-1" />}
                  {doc.riskScore === "high" && <AlertTriangle className="h-3 w-3 mr-1" />}
                  {doc.riskScore.charAt(0).toUpperCase() + doc.riskScore.slice(1)} Risk
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <p className="text-sm text-muted-foreground mb-4">
                {doc.riskScore === "low" &&
                  "This document appears to be well-structured with no significant issues detected."}
                {doc.riskScore === "medium" && "This document has some potential issues that should be addressed."}
                {doc.riskScore === "high" &&
                  "This document has several critical issues that require immediate attention."}
              </p>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/dashboard/ai-assistant/${doc.id}`}>
                  View Analysis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Document Analysis</CardTitle>
          <CardDescription>AI analysis of your Service Agreement</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="analysis" className="w-full">
            <TabsList className="grid grid-cols-3 w-full rounded-none border-b">
              <TabsTrigger value="analysis" className="rounded-none">
                Analysis
              </TabsTrigger>
              <TabsTrigger value="recommendations" className="rounded-none">
                Recommendations
              </TabsTrigger>
              <TabsTrigger value="summary" className="rounded-none">
                Summary
              </TabsTrigger>
            </TabsList>
            <TabsContent value="analysis" className="p-6">
              <DocumentAIAnalysis />
            </TabsContent>
            <TabsContent value="recommendations" className="p-6">
              <DocumentAIRecommendations />
            </TabsContent>
            <TabsContent value="summary" className="p-6">
              <DocumentAISummary />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

