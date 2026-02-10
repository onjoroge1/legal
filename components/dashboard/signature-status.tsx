"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, XCircle } from "lucide-react"

interface SignatureStatusProps {
  status?: "pending" | "signed" | "declined"
  signerName?: string
  signedAt?: string
}

/**
 * SignatureStatus component
 * Displays the status of document signatures
 */
export default function SignatureStatus({ 
  status = "pending", 
  signerName = "Signer",
  signedAt 
}: SignatureStatusProps) {
  const statusConfig = {
    pending: {
      icon: Clock,
      label: "Pending",
      variant: "secondary" as const,
      color: "text-yellow-500"
    },
    signed: {
      icon: CheckCircle2,
      label: "Signed",
      variant: "default" as const,
      color: "text-green-500"
    },
    declined: {
      icon: XCircle,
      label: "Declined",
      variant: "destructive" as const,
      color: "text-red-500"
    }
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <Card>
      <CardHeader>
        <CardTitle>Signature Status</CardTitle>
        <CardDescription>Current status of document signatures</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Icon className={`h-5 w-5 ${config.color}`} />
            <div className="flex-1">
              <p className="font-medium">{signerName}</p>
              {signedAt && (
                <p className="text-sm text-muted-foreground">Signed on {signedAt}</p>
              )}
            </div>
            <Badge variant={config.variant}>{config.label}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

