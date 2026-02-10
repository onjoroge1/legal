"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Scale,
  ArrowLeft,
  Lock,
  Shield,
  CreditCard,
  CheckCircle2,
  FileText,
  Sparkles,
  Loader2,
} from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [form, setForm] = useState({
    email: "",
    name: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    router.push("/documents/nda/generate")
  }

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 16)
    return cleaned.replace(/(\d{4})(?=\d)/g, "$1 ")
  }

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 4)
    if (cleaned.length > 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`
    }
    return cleaned
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/30 bg-primary/15">
              <Scale className="h-4 w-4 text-primary" />
            </div>
            <span className="font-serif text-xl font-bold text-foreground">
              Legal<span className="text-primary">Law</span>Docs
            </span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Lock className="h-4 w-4 text-accent" />
            Secure Checkout
          </div>
        </div>
      </header>

      <main className="py-12 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <Link
            href="/documents/nda"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to NDA Details
          </Link>

          <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:gap-14">
            {/* Left - Payment form */}
            <div className="flex-1">
              <h1 className="font-serif text-3xl font-bold text-foreground">
                Complete Your <span className="gradient-text">Purchase</span>
              </h1>
              <p className="mt-2 text-muted-foreground">
                One-time payment. No subscriptions. No hidden fees.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                {/* Contact info */}
                <div className="rounded-xl border border-border/50 bg-card/60 p-6">
                  <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-foreground">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/15 text-xs font-bold text-primary">
                      1
                    </span>
                    Contact Information
                  </h2>
                  <div className="mt-5 space-y-4">
                    <div>
                      <label htmlFor="name" className="mb-1.5 block text-sm text-muted-foreground">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        placeholder="John Smith"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                        className="border-border/60 bg-secondary/30 focus-visible:ring-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-sm text-muted-foreground">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                        className="border-border/60 bg-secondary/30 focus-visible:ring-primary"
                      />
                      <p className="mt-1 text-xs text-muted-foreground">
                        {"We'll send your completed document to this email."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Payment info */}
                <div className="rounded-xl border border-border/50 bg-card/60 p-6">
                  <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-foreground">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent/15 text-xs font-bold text-accent">
                      2
                    </span>
                    Payment Details
                  </h2>
                  <div className="mt-5 space-y-4">
                    <div>
                      <label htmlFor="card" className="mb-1.5 block text-sm text-muted-foreground">
                        Card Number
                      </label>
                      <div className="relative">
                        <Input
                          id="card"
                          placeholder="4242 4242 4242 4242"
                          value={form.cardNumber}
                          onChange={(e) =>
                            setForm({ ...form, cardNumber: formatCardNumber(e.target.value) })
                          }
                          required
                          className="border-border/60 bg-secondary/30 pl-10 focus-visible:ring-primary"
                        />
                        <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label htmlFor="expiry" className="mb-1.5 block text-sm text-muted-foreground">
                          Expiry Date
                        </label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          value={form.expiry}
                          onChange={(e) =>
                            setForm({ ...form, expiry: formatExpiry(e.target.value) })
                          }
                          required
                          className="border-border/60 bg-secondary/30 focus-visible:ring-primary"
                        />
                      </div>
                      <div className="flex-1">
                        <label htmlFor="cvc" className="mb-1.5 block text-sm text-muted-foreground">
                          CVC
                        </label>
                        <Input
                          id="cvc"
                          placeholder="123"
                          value={form.cvc}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              cvc: e.target.value.replace(/\D/g, "").slice(0, 4),
                            })
                          }
                          required
                          className="border-border/60 bg-secondary/30 focus-visible:ring-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full gap-2 shadow-lg shadow-primary/20"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4" />
                      Pay $19.99 & Start Generating
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Lock className="h-3 w-3" />
                    SSL Encrypted
                  </div>
                  <span className="text-border">|</span>
                  <div className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    PCI Compliant
                  </div>
                  <span className="text-border">|</span>
                  <span>30-Day Money Back</span>
                </div>
              </form>
            </div>

            {/* Right - Order summary */}
            <div className="w-full shrink-0 lg:w-80">
              <div className="sticky top-24 space-y-5">
                <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/80">
                  <div className="border-b border-border/40 bg-secondary/40 p-5">
                    <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                      Order Summary
                    </h2>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">Non-Disclosure Agreement</h3>
                        <p className="text-xs text-muted-foreground">AI-Generated, State Compliant</p>
                      </div>
                    </div>

                    <div className="mt-5 space-y-3 border-t border-border/40 pt-5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Document generation</span>
                        <span className="text-foreground">$19.99</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">State compliance</span>
                        <span className="text-accent">Included</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">PDF & DOCX export</span>
                        <span className="text-accent">Included</span>
                      </div>
                    </div>

                    <div className="mt-5 border-t border-border/40 pt-5">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">Total</span>
                        <span className="text-xl font-bold text-foreground">$19.99</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust signals */}
                <div className="rounded-2xl border border-border/50 bg-card/60 p-5">
                  <div className="space-y-3">
                    {[
                      { icon: Sparkles, text: "AI-powered customization", color: "text-primary" },
                      { icon: Shield, text: "Legally compliant in all 50 states", color: "text-accent" },
                      { icon: CheckCircle2, text: "Reviewed by legal professionals", color: "text-primary" },
                      { icon: Lock, text: "Bank-level data encryption", color: "text-accent" },
                    ].map((item) => (
                      <div key={item.text} className="flex items-center gap-2.5">
                        <item.icon className={`h-4 w-4 shrink-0 ${item.color}`} />
                        <span className="text-xs text-secondary-foreground">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
