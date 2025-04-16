"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, AlertCircle, Users } from "lucide-react"
import { useRouter } from "next/navigation"

interface Party {
  id: string
  name: string
  email: string
  type: string
}

interface SignatureRequestConfirmationProps {
  documentId: string
  documentTitle: string
  parties: Party[]
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function SignatureRequestConfirmation({
  documentId,
  documentTitle,
  parties,
  isOpen,
  onClose,
  onConfirm,
}: SignatureRequestConfirmationProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleConfirm = async () => {
    setIsLoading(true)
    try {
      await onConfirm()
      onClose()
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateParties = () => {
    onClose()
    router.push(`/dashboard/documents/${documentId}/sign?tab=request`)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Confirm Signature Request</DialogTitle>
          <DialogDescription>
            Please review the details before sending the signature request.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <h4 className="font-medium">Document Details</h4>
            <div className="text-sm text-muted-foreground">
              <p>Title: {documentTitle}</p>
              <p>ID: {documentId}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Signing Parties</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={handleUpdateParties}
                className="gap-1"
              >
                <Users className="h-4 w-4" />
                Update Parties
              </Button>
            </div>
            <div className="space-y-2">
              {parties.map((party) => (
                <div key={party.id} className="flex items-center justify-between p-3 border rounded-md">
                  <div className="space-y-1">
                    <p className="font-medium">{party.name}</p>
                    <p className="text-sm text-muted-foreground">{party.email}</p>
                  </div>
                  <Badge variant="outline">{party.type}</Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-2 p-3 border rounded-md bg-yellow-50">
            <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium">Important Notice</p>
              <p className="text-sm text-muted-foreground">
                Once sent, the signature request cannot be cancelled. Please ensure all details are correct before proceeding.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={isLoading}>
            {isLoading ? "Sending..." : "Confirm and Send"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 