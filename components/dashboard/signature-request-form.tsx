"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Send, UserPlus } from "lucide-react"

/**
 * SignatureRequestForm component
 * Form to request signatures from other parties
 */
export default function SignatureRequestForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Request Signature
        </CardTitle>
        <CardDescription>Send this document for signature</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signer-email">Signer Email</Label>
            <Input id="signer-email" type="email" placeholder="signer@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signer-name">Signer Name</Label>
            <Input id="signer-name" placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea id="message" placeholder="Add a personal message..." />
          </div>
          <Button className="w-full">
            <Send className="mr-2 h-4 w-4" />
            Send Signature Request
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

