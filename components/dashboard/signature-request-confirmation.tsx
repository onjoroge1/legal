"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Mail } from "lucide-react"

/**
 * SignatureRequestConfirmation component
 * Confirmation message after sending signature request
 */
export default function SignatureRequestConfirmation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          Request Sent
        </CardTitle>
        <CardDescription>Signature request has been sent successfully</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>The signer will receive an email with instructions to sign the document.</span>
          </div>
          <Button variant="outline" className="w-full">
            View Status
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}




