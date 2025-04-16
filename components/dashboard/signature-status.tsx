"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface SignatureStatusProps {
  documentId: string
}

interface SignatureStatus {
  id: string
  name: string
  email: string
  type: string
  signed: boolean
  signedAt: string | null
}

interface SignatureStatusResponse {
  documentId: string
  documentTitle: string
  status: SignatureStatus[]
  allSigned: boolean
}

export default function SignatureStatus({ documentId }: SignatureStatusProps) {
  const [statuses, setStatuses] = useState<SignatureStatus[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(`/api/documents/${documentId}/signature-status`)
        if (!response.ok) {
          throw new Error('Failed to fetch signature status')
        }
        const data: SignatureStatusResponse = await response.json()
        setStatuses(data.status)
      } catch (error) {
        console.error('Error fetching signature status:', error)
        toast({
          title: "Error",
          description: "Failed to load signature status. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchStatus()
  }, [documentId, toast])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {statuses.map((status) => (
        <Card key={status.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{status.name}</span>
              <Badge variant={status.signed ? 'default' : 'secondary'}>
                {status.signed ? 'Signed' : 'Pending'}
              </Badge>
            </CardTitle>
            {status.signed ? (
              <div className="flex items-center gap-2 text-green-500 text-sm">
                <CheckCircle2 className="h-4 w-4" />
                <span>Signed on {new Date(status.signedAt!).toLocaleDateString()}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Clock className="h-4 w-4" />
                <span>Waiting for signature</span>
              </div>
            )}
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}

