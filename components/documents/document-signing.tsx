"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Mail, PenTool, Send, CheckCircle2, Lock } from "lucide-react"
import { toast } from "@/lib/safe-toast"

interface DocumentSigningProps {
  documentId?: string
  documentTitle: string
  onSignComplete?: () => void
  onSaveDocument?: () => Promise<string | null>
  slug?: string
}

/**
 * DocumentSigning component
 * Handles document signing and sending for signature
 * Only available for paid users - redirects to checkout for free users
 */
export default function DocumentSigning({ 
  documentId, 
  documentTitle,
  onSignComplete,
  onSaveDocument,
  slug
}: DocumentSigningProps) {
  const router = useRouter()
  const params = useParams()
  const { data: session } = useSession()
  const documentSlug = slug || (params?.slug as string)
  
  const [signerEmail, setSignerEmail] = useState("")
  const [signerName, setSignerName] = useState("")
  const [message, setMessage] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [isSigning, setIsSigning] = useState(false)
  const [signature, setSignature] = useState("")
  const [showSignDialog, setShowSignDialog] = useState(false)
  const [showSendDialog, setShowSendDialog] = useState(false)
  const [hasSubscription, setHasSubscription] = useState(false)
  const [isCheckingSubscription, setIsCheckingSubscription] = useState(true)

  // Check subscription status
  useEffect(() => {
    const checkSubscription = async () => {
      if (!session?.user?.email) {
        setIsCheckingSubscription(false)
        return
      }

      try {
        const response = await fetch("/api/user/subscription")
        if (response.ok) {
          const data = await response.json()
          setHasSubscription(data.subscription?.isActive || false)
        }
      } catch (error) {
        console.error("Error checking subscription:", error)
      } finally {
        setIsCheckingSubscription(false)
      }
    }

    checkSubscription()
  }, [session])

  const handleRequiresPayment = () => {
    toast.error("This feature requires a paid plan")
    // If user is logged in, redirect to billing to upgrade
    // If not logged in, redirect to checkout
    if (session?.user?.email) {
      router.push("/dashboard/billing")
    } else {
      router.push(`/documents/${documentSlug}/checkout`)
    }
  }

  const handleSendForSignature = async () => {
    if (!signerEmail || !signerName) {
      toast.error("Please provide signer email and name")
      return
    }

    let docId = documentId

    // If no document ID, try to save document first
    if (!docId && onSaveDocument) {
      toast.info("Saving document...")
      docId = await onSaveDocument() || undefined
      if (!docId) {
        toast.error("Failed to save document. Please try again.")
        return
      }
    }

    if (!docId) {
      toast.error("Document must be saved before sending for signature")
      return
    }

    setIsSending(true)
    try {
      const response = await fetch("/api/documents/send-for-signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentId: docId,
          signerEmail,
          signerName,
          message: message || `Please review and sign the ${documentTitle}`,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to send document for signature")
      }

      toast.success("Document sent for signature successfully")
      setShowSendDialog(false)
      setSignerEmail("")
      setSignerName("")
      setMessage("")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to send document")
    } finally {
      setIsSending(false)
    }
  }

  const handleSignDocument = async () => {
    if (!signature.trim()) {
      toast.error("Please provide your signature")
      return
    }

    let docId = documentId

    // If no document ID, try to save document first
    if (!docId && onSaveDocument) {
      toast.info("Saving document...")
      docId = await onSaveDocument() || undefined
      if (!docId) {
        toast.error("Failed to save document. Please try again.")
        return
      }
    }

    if (!docId) {
      toast.error("Document must be saved before signing")
      return
    }

    setIsSigning(true)
    try {
      const response = await fetch("/api/documents/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentId: docId,
          signature,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to sign document")
      }

      toast.success("Document signed successfully")
      setShowSignDialog(false)
      setSignature("")
      onSignComplete?.()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to sign document")
    } finally {
      setIsSigning(false)
    }
  }

  // Show loading state while checking subscription
  if (isCheckingSubscription && session?.user?.email) {
    return (
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <Button variant="outline" className="flex-1" disabled>
          <PenTool className="mr-2 h-4 w-4" />
          Loading...
        </Button>
        <Button className="flex-1" disabled>
          <Send className="mr-2 h-4 w-4" />
          Loading...
        </Button>
      </div>
    )
  }

  // Only paid users (with subscription) can use signing features
  // Free users and non-logged-in users need to pay first
  const canUseSigning = hasSubscription === true

  return (
    <div className="flex flex-col sm:flex-row gap-3 mt-6">
      {/* Sign Document Button */}
      <Dialog open={showSignDialog} onOpenChange={setShowSignDialog}>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={(e) => {
              if (!canUseSigning) {
                e.preventDefault()
                handleRequiresPayment()
              }
            }}
          >
            {canUseSigning ? (
              <>
                <PenTool className="mr-2 h-4 w-4" />
                Sign Document
              </>
            ) : (
              <>
                <Lock className="mr-2 h-4 w-4" />
                Sign Document (Premium)
              </>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign Document</DialogTitle>
            <DialogDescription>
              Enter your signature to sign this {documentTitle}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="signature">Your Signature</Label>
              <Textarea
                id="signature"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                placeholder="Type your full name or draw your signature"
                rows={3}
                className="font-serif"
              />
              <p className="text-xs text-muted-foreground">
                By signing, you acknowledge that you have read and agree to the terms of this document.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSignDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSignDocument} disabled={isSigning || !signature.trim()}>
              {isSigning ? "Signing..." : "Sign Document"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Send for Signature Button */}
      <Dialog open={showSendDialog} onOpenChange={setShowSendDialog}>
        <DialogTrigger asChild>
          <Button 
            className="flex-1"
            onClick={(e) => {
              if (!canUseSigning) {
                e.preventDefault()
                handleRequiresPayment()
              }
            }}
          >
            {canUseSigning ? (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send for Signature
              </>
            ) : (
              <>
                <Lock className="mr-2 h-4 w-4" />
                Send for Signature (Premium)
              </>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Document for Signature</DialogTitle>
            <DialogDescription>
              Send this {documentTitle} to another party for their signature
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="signerName">
                Signer Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="signerName"
                value={signerName}
                onChange={(e) => setSignerName(e.target.value)}
                placeholder="Enter full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signerEmail">
                Signer Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="signerEmail"
                type="email"
                value={signerEmail}
                onChange={(e) => setSignerEmail(e.target.value)}
                placeholder="signer@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Add a personal message..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSendDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendForSignature} disabled={isSending || !signerEmail || !signerName}>
              {isSending ? (
                <>
                  <Mail className="mr-2 h-4 w-4 animate-pulse" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send for Signature
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

