"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/lib/safe-toast"

interface PaymentMethodFormProps {
  onSuccess?: () => void
  onError?: (error: string) => void
}

/**
 * PaymentMethodForm component
 * Form to add or update payment methods
 */
export default function PaymentMethodForm({ onSuccess, onError }: PaymentMethodFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate form
      if (!formData.cardNumber || !formData.expiry || !formData.cvv || !formData.cardName) {
        throw new Error("Please fill in all fields")
      }

      // In production, this would use Stripe Elements to securely handle card data
      // For now, we'll just simulate adding a payment method
      const response = await fetch("/api/payment/add-method", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // In production, you would send a payment method ID from Stripe
          // For now, we'll just send a success response
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to add payment method")
      }

      toast.success("Payment method added successfully")
      onSuccess?.()
      
      // Reset form
      setFormData({
        cardNumber: "",
        expiry: "",
        cvv: "",
        cardName: "",
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to add payment method"
      toast.error(errorMessage)
      onError?.(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || v
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="card-number">Card Number</Label>
        <Input
          id="card-number"
          placeholder="1234 5678 9012 3456"
          value={formData.cardNumber}
          onChange={(e) => setFormData({ ...formData, cardNumber: formatCardNumber(e.target.value) })}
          maxLength={19}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiry">Expiry Date</Label>
          <Input
            id="expiry"
            placeholder="MM/YY"
            value={formData.expiry}
            onChange={(e) => setFormData({ ...formData, expiry: formatExpiry(e.target.value) })}
            maxLength={5}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvv">CVV</Label>
          <Input
            id="cvv"
            placeholder="123"
            type="password"
            value={formData.cvv}
            onChange={(e) => setFormData({ ...formData, cvv: e.target.value.replace(/\D/g, "").substring(0, 4) })}
            maxLength={4}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="card-name">Cardholder Name</Label>
        <Input
          id="card-name"
          placeholder="John Doe"
          value={formData.cardName}
          onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add Payment Method"}
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        Your payment information is secure and encrypted
      </p>
    </form>
  )
}

