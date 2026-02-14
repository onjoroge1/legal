"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Send, Download, Clock, Pen, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import SignatureCanvas from "@/components/dashboard/signature-canvas"
import SignatureRequestForm from "@/components/dashboard/signature-request-form"
import SignatureStatus from "@/components/dashboard/signature-status"
import SignatureRequestConfirmation from "@/components/dashboard/signature-request-confirmation"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { use } from "react"
import { useSearchParams } from 'next/navigation'

interface DocumentParty {
  id: string
  name: string
  type: string
  email: string
  signed: boolean
  signedAt?: string
}

interface Document {
  id: string
  title: string
  content: string
  parties: DocumentParty[]
}

interface DocumentSignPageProps {
  params: Promise<{
    id: string
  }>
}

export default function DocumentSignPage({ params }: DocumentSignPageProps) {
  const resolvedParams = use(params)
  const documentId = resolvedParams.id
  const searchParams = useSearchParams()
  const defaultTab = searchParams.get('tab') || 'sign'
  const [document, setDocument] = useState<Document | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await fetch(`/api/documents/by-id/${documentId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch document')
        }
        const data = await response.json()
        setDocument(data)
      } catch (error) {
        console.error('Error fetching document:', error)
        toast({
          title: "Error",
          description: "Failed to load document. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchDocument()
  }, [documentId, toast])

  const handleSign = async (partyId: string, signature: string) => {
    try {
      const response = await fetch(`/api/documents/${documentId}/sign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ partyId, signature }),
      })

      if (!response.ok) {
        throw new Error('Failed to save signature')
      }

      // Update local state
      setDocument(prev => {
        if (!prev) return null
        return {
          ...prev,
          parties: prev.parties.map(party => 
            party.id === partyId 
              ? { ...party, signed: true, signedAt: new Date().toISOString() }
              : party
          )
        }
      })

      toast({
        title: "Success",
        description: "Signature saved successfully",
      })
    } catch (error) {
      console.error('Error saving signature:', error)
      toast({
        title: "Error",
        description: "Failed to save signature. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSendForSignature = async () => {
    setIsConfirmationOpen(true)
  }

  const handleConfirmSignatureRequest = async () => {
    try {
      const response = await fetch(`/api/documents/${documentId}/send-signature-request`, {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to send signature requests')
      }

      toast({
        title: "Success",
        description: "Signature requests sent successfully",
      })
    } catch (error) {
      console.error('Error sending signature requests:', error)
      toast({
        title: "Error",
        description: "Failed to send signature requests",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!document) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Document not found</p>
          <Button variant="outline" asChild>
            <Link href="/dashboard/documents">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Documents
            </Link>
          </Button>
        </div>
      </div>
    )
  }

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
            <h1 className="text-2xl font-bold tracking-tight">{document.title}</h1>
            <p className="text-muted-foreground">Electronic signature workflow</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-1">
            <Download className="h-4 w-4" />
            Download
          </Button>
          <Button className="gap-1" onClick={handleSendForSignature}>
            <Send className="h-4 w-4" />
            Send for Signature
          </Button>
        </div>
      </div>

      <Tabs defaultValue={defaultTab} className="space-y-4">
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
                <div className="max-w-4xl mx-auto">
                  {/* Document Header */}
                  <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold mb-2">{document.title}</h1>
                    <p className="text-sm text-gray-500">Document ID: {document.id}</p>
                  </div>

                  {/* Document Content */}
                  <div className="prose max-w-none">
                    <div className="whitespace-pre-wrap">{document.content}</div>
                  </div>

                  {/* Signature Areas */}
                  <div className="mt-12 space-y-8">
                    {document.parties.map((party) => (
                      <div key={party.id} className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{party.name}</h3>
                          <Badge variant={party.signed ? "default" : "secondary"}>
                            {party.signed ? "Signed" : "Pending Signature"}
                          </Badge>
                        </div>
                        <div className="border rounded-md p-4 min-h-[100px] bg-gray-50">
                          {party.signed ? (
                            <div className="flex items-center justify-center h-full">
                              <div className="text-center">
                                <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
                                <p className="text-sm text-gray-500">Signed on {party.signedAt}</p>
                              </div>
                            </div>
                          ) : (
                            <SignatureCanvas
                              onSign={(signature: string) => handleSign(party.id, signature)}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="request" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Request Signatures</CardTitle>
              <CardDescription>Send this document to others for electronic signature</CardDescription>
            </CardHeader>
            <CardContent>
              <SignatureRequestForm 
                documentId={documentId} 
                parties={document?.parties || []} 
              />
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
              <SignatureStatus documentId={documentId} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {document && (
        <SignatureRequestConfirmation
          documentId={document.id}
          documentTitle={document.title}
          parties={document.parties}
          isOpen={isConfirmationOpen}
          onClose={() => setIsConfirmationOpen(false)}
          onConfirm={handleConfirmSignatureRequest}
        />
      )}
    </div>
  )
}

