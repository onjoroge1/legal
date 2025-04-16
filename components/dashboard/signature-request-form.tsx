"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, GripVertical, Calendar } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { sign } from "jsonwebtoken"

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || 'your-secret-key'

interface Signer {
  id: string
  name: string
  email: string
  role: string
  order: number
}

interface SignatureRequestFormProps {
  documentId: string
  parties: Array<{
    id: string
    name: string
    email: string
  }>
}

export default function SignatureRequestForm({ documentId, parties }: SignatureRequestFormProps) {
  const [signers, setSigners] = useState<Signer[]>(() => {
    // Pre-populate signers with saved party information, ensuring unique emails
    return parties.map((party, index) => ({
      id: party.id,
      name: party.name || '',
      email: party.email || '',
      role: index === 0 ? "Client" : "Service Provider",
      order: index + 1,
    }))
  })
  const [sequentialSigning, setSequentialSigning] = useState(true)
  const [message, setMessage] = useState("Please review and sign this document.")
  const [expirationDays, setExpirationDays] = useState("14")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const addSigner = () => {
    const newSigner: Signer = {
      id: `${signers.length + 1}`,
      name: "",
      email: "",
      role: "Other",
      order: signers.length + 1,
    }
    setSigners([...signers, newSigner])
  }

  const removeSigner = (id: string) => {
    if (signers.length <= 1) return
    setSigners(signers.filter((signer) => signer.id !== id))
  }

  const updateSigner = async (id: string, field: keyof Signer, value: string | number) => {
    const updatedSigners = signers.map((signer) => 
      signer.id === id ? { ...signer, [field]: value } : signer
    )
    setSigners(updatedSigners)

    try {
      // Save changes to the database
      const response = await fetch(`/api/documents/${documentId}/parties`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          parties: updatedSigners.map(signer => ({
            name: signer.name,
            email: signer.email,
            role: signer.role,
          }))
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update parties')
      }

      toast({
        title: "Success",
        description: "Party information updated successfully",
      })
    } catch (error) {
      console.error('Error updating parties:', error)
      toast({
        title: "Error",
        description: "Failed to update party information",
        variant: "destructive",
      })
    }
  }

  const generateSigningLink = (partyId: string) => {
    const token = sign(
      {
        documentId,
        partyId,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days
      },
      JWT_SECRET
    )

    return `${window.location.origin}/sign/${token}`
  }

  const handleSendRequest = async () => {
    // Validate emails are unique
    const emails = signers.map(s => s.email.toLowerCase().trim())
    const uniqueEmails = new Set(emails)
    if (emails.length !== uniqueEmails.size) {
      toast({
        title: "Error",
        description: "Each signer must have a unique email address",
        variant: "destructive",
      })
      return
    }

    // Validate all required fields
    const invalidSigners = signers.filter(s => !s.name || !s.email || !s.role)
    if (invalidSigners.length > 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields for each signer",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      // Generate signing links for each signer
      const signingLinks = signers.map(signer => ({
        partyId: signer.id,
        email: signer.email.toLowerCase().trim(),
        name: signer.name.trim(),
        role: signer.role,
        link: generateSigningLink(signer.id),
      }))

      // Send emails with signing links
      const response = await fetch('/api/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          signingLinks,
          message,
          expirationDays,
          sequentialSigning,
        }),
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
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Signers</h3>

        <div className="space-y-4">
          {signers.map((signer, index) => (
            <div key={signer.id} className="flex items-start gap-3 border rounded-md p-4">
              <div className="mt-2 text-muted-foreground">
                <GripVertical className="h-5 w-5" />
              </div>

              <div className="flex-1 grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor={`name-${signer.id}`}>Name</Label>
                  <Input
                    id={`name-${signer.id}`}
                    value={signer.name}
                    onChange={(e) => updateSigner(signer.id, "name", e.target.value)}
                    placeholder="Full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`email-${signer.id}`}>Email</Label>
                  <Input
                    id={`email-${signer.id}`}
                    type="email"
                    value={signer.email}
                    onChange={(e) => updateSigner(signer.id, "email", e.target.value)}
                    placeholder="Email address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`role-${signer.id}`}>Role</Label>
                  <Select value={signer.role} onValueChange={(value) => updateSigner(signer.id, "role", value)}>
                    <SelectTrigger id={`role-${signer.id}`}>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Client">Client</SelectItem>
                      <SelectItem value="Service Provider">Service Provider</SelectItem>
                      <SelectItem value="Witness">Witness</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2">
                <Badge variant="outline">{sequentialSigning ? `Order: ${signer.order}` : "No Order"}</Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSigner(signer.id)}
                  disabled={signers.length <= 1}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" onClick={addSigner} className="gap-1">
          <Plus className="h-4 w-4" />
          Add Another Signer
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="sequential-signing">Sequential Signing</Label>
            <p className="text-sm text-muted-foreground">Signers will receive the document in the order listed above</p>
          </div>
          <Switch id="sequential-signing" checked={sequentialSigning} onCheckedChange={setSequentialSigning} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="expiration">Signature Request Expires After</Label>
          <Select value={expirationDays} onValueChange={setExpirationDays}>
            <SelectTrigger id="expiration" className="w-full">
              <SelectValue placeholder="Select expiration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 days</SelectItem>
              <SelectItem value="14">14 days</SelectItem>
              <SelectItem value="30">30 days</SelectItem>
              <SelectItem value="60">60 days</SelectItem>
              <SelectItem value="90">90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Email Message</Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Add a message to the email"
            rows={3}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Signing Parties</Label>
        {parties.map((party) => (
          <div key={party.id} className="flex items-center gap-2">
            <Input
              value={party.email}
              readOnly
              className="flex-1"
            />
            <Button
              variant="outline"
              onClick={() => {
                const link = generateSigningLink(party.id)
                navigator.clipboard.writeText(link)
                toast({
                  title: "Link Copied",
                  description: "Signing link copied to clipboard",
                })
              }}
            >
              Copy Link
            </Button>
          </div>
        ))}
      </div>

      <div className="pt-2 flex justify-end">
        <Button className="gap-1" type="submit" disabled={isLoading}>
          <Calendar className="h-4 w-4" />
          {isLoading ? "Sending..." : "Send Signature Requests"}
        </Button>
      </div>
    </div>
  )
}

