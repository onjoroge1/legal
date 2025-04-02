import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import type { Metadata } from "next"
import { ArrowLeft, Send, Download, Clock, Pen } from "lucide-react"
import Link from "next/link"
import SignatureCanvas from "@/components/dashboard/signature-canvas"
import SignatureRequestForm from "@/components/dashboard/signature-request-form"
import SignatureStatus from "@/components/dashboard/signature-status"

interface DocumentSignPageProps {
  params: {
    id: string
  }
}

export function generateMetadata({ params }: DocumentSignPageProps): Metadata {
  return {
    title: `Sign Document | LegalLawDocs.com`,
    description: `Sign and request signatures for your legal document`,
  }
}

export default function DocumentSignPage({ params }: DocumentSignPageProps) {
  const documentId = params.id

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/documents">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Service Agreement</h1>
            <p className="text-muted-foreground">Electronic signature workflow</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-1">
            <Download className="h-4 w-4" />
            Download
          </Button>
          <Button className="gap-1">
            <Send className="h-4 w-4" />
            Send for Signature
          </Button>
        </div>
      </div>

      <Tabs defaultValue="sign" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sign" className="gap-1">
            <Pen className="h-4 w-4" />
            Sign Document
          </TabsTrigger>
          <TabsTrigger value="request" className="gap-1">
            <Send className="h-4 w-4" />
            Request Signatures
          </TabsTrigger>
          <TabsTrigger value="status" className="gap-1">
            <Clock className="h-4 w-4" />
            Signature Status
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sign" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sign Document</CardTitle>
              <CardDescription>Add your electronic signature to this document</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-md p-6 min-h-[400px] bg-white">
                <h2 className="text-xl font-bold text-center mb-6">SERVICE AGREEMENT</h2>
                <p className="mb-4">
                  This Service Agreement (the "Agreement") is entered into as of [Date], by and between:
                </p>
                <p className="mb-4">
                  <strong>Party 1:</strong> [Party 1 Name], with an address at [Party 1 Address] ("Client")
                </p>
                <p className="mb-4">
                  <strong>Party 2:</strong> [Party 2 Name], with an address at [Party 2 Address] ("Service Provider")
                </p>
                <p className="mb-4">
                  WHEREAS, Client wishes to engage Service Provider to provide certain services, and Service Provider is
                  willing to provide such services to Client;
                </p>
                <p className="mb-4">
                  NOW, THEREFORE, in consideration of the mutual covenants and agreements herein contained, the parties
                  hereto agree as follows:
                </p>
                <p className="mb-4">
                  <strong>1. Services.</strong> Service Provider shall provide to Client the services (the "Services")
                  described in Exhibit A attached hereto.
                </p>
                <p className="mb-4">
                  <strong>2. Term.</strong> This Agreement shall commence on [Start Date] and shall continue until [End
                  Date], unless earlier terminated as provided herein.
                </p>
                <p className="mb-4">
                  <strong>3. Compensation.</strong> In consideration for the Services, Client shall pay Service Provider
                  the amounts set forth in Exhibit B attached hereto.
                </p>

                <div className="mt-12 border-t pt-6">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="font-medium mb-2">CLIENT:</p>
                      <p className="mb-1">[Client Name]</p>
                      <div className="border-b border-dashed border-black h-10 mb-2 flex items-center">
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Signature Required</Badge>
                      </div>
                      <p>Name: [Name]</p>
                      <p>Title: [Title]</p>
                      <p>Date: [Date]</p>
                    </div>
                    <div>
                      <p className="font-medium mb-2">SERVICE PROVIDER:</p>
                      <p className="mb-1">[Service Provider Name]</p>
                      <div className="border-b border-dashed border-black h-10 mb-2 flex items-center">
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Signature Required</Badge>
                      </div>
                      <p>Name: [Name]</p>
                      <p>Title: [Title]</p>
                      <p>Date: [Date]</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Signature</CardTitle>
              <CardDescription>Draw your signature or type it</CardDescription>
            </CardHeader>
            <CardContent>
              <SignatureCanvas />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Clear</Button>
              <Button>Apply Signature</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="request" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Request Signatures</CardTitle>
              <CardDescription>Send this document to others for electronic signature</CardDescription>
            </CardHeader>
            <CardContent>
              <SignatureRequestForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="status" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Signature Status</CardTitle>
              <CardDescription>Track the status of all required signatures</CardDescription>
            </CardHeader>
            <CardContent>
              <SignatureStatus />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

