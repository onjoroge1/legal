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

interface Signer {
  id: string
  name: string
  email: string
  role: string
  order: number
}

export default function SignatureRequestForm() {
  const [signers, setSigners] = useState<Signer[]>([
    { id: "1", name: "John Smith", email: "john.smith@example.com", role: "Client", order: 1 },
    { id: "2", name: "", email: "", role: "Service Provider", order: 2 },
  ])
  const [sequentialSigning, setSequentialSigning] = useState(true)
  const [message, setMessage] = useState("Please review and sign this Service Agreement.")
  const [expirationDays, setExpirationDays] = useState("14")

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

  const updateSigner = (id: string, field: keyof Signer, value: string | number) => {
    setSigners(signers.map((signer) => (signer.id === id ? { ...signer, [field]: value } : signer)))
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

      <div className="pt-2 flex justify-end">
        <Button className="gap-1">
          <Calendar className="h-4 w-4" />
          Schedule for Later
        </Button>
      </div>
    </div>
  )
}

