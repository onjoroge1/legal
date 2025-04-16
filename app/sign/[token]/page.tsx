"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2 } from "lucide-react"
import SignatureCanvas from "@/components/dashboard/signature-canvas"
import { useToast } from "@/components/ui/use-toast"

interface DocumentParty {
  id: string
  name: string
  type: string
  signed: boolean
  signedAt?: string
}

interface Document {
  id: string
  title: string
  content: string
  parties: DocumentParty[]
}

export default function PublicSignPage({ params }: { params: { token: string } }) {
  const router = useRouter()
  const [document, setDocument] = useState<Document | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentParty, setCurrentParty] = useState<DocumentParty | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await fetch(`/api/sign/${params.token}`)
        if (!response.ok) {
          throw new Error('Failed to fetch document')
        }
        const data = await response.json()
        setDocument(data.document)
        setCurrentParty(data.party)
      } catch (error) {
        console.error('Error fetching document:', error)
        toast({
          title: "Error",
          description: "Invalid or expired signing link",
          variant: "destructive",
        })
        router.push('/')
      } finally {
        setIsLoading(false)
      }
    }

    fetchDocument()
  }, [params.token, router, toast])

  const handleSign = async (signature: string) => {
    try {
      const response = await fetch(`/api/sign/${params.token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ signature }),
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
            party.id === currentParty?.id 
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!document || !currentParty) {
    return null
  }

  return (
    <div className="container max-w-4xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>{document.title}</CardTitle>
          <CardDescription>Please review and sign the document</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Document Content */}
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap">{document.content}</div>
          </div>

          {/* Signature Area */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{currentParty.name}</h3>
              <Badge variant={currentParty.signed ? "default" : "secondary"}>
                {currentParty.signed ? "Signed" : "Pending Signature"}
              </Badge>
            </div>
            <div className="border rounded-md p-4 min-h-[100px] bg-gray-50">
              {currentParty.signed ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Signed on {currentParty.signedAt}</p>
                  </div>
                </div>
              ) : (
                <SignatureCanvas onSign={handleSign} />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 