"use client"

import React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Scale,
  ArrowLeft,
  Lock,
  Shield,
  CheckCircle2,
  FileText,
  Sparkles,
  Loader2,
  Crown,
  Zap,
} from "lucide-react"
import { getDocumentBySlug } from "@/lib/document-catalog"
import { useSession } from "next-auth/react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "@/lib/safe-toast"
import DocumentPreview from "@/components/documents/document-preview"

export default function CheckoutPage() {
  const router = useRouter()
  const params = useParams()
  const category = params?.category as string
  const slug = params?.slug as string
  const doc = getDocumentBySlug(slug)
  const { data: session } = useSession()

  const [isProcessing, setIsProcessing] = useState(false)
  const [isCheckingSubscription, setIsCheckingSubscription] = useState(true)
  const [paymentType, setPaymentType] = useState<"single" | "subscription">("subscription")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [previewContent, setPreviewContent] = useState<string | null>(null)

  // Pre-fill from session if signed in
  useEffect(() => {
    if (session?.user?.email) {
      setEmail(session.user.email)
      setName(session.user.name || "")
    }
  }, [session])

  // Subscribers skip checkout entirely — they already have access
  useEffect(() => {
    const check = async () => {
      if (!session?.user?.email) { setIsCheckingSubscription(false); return }
      try {
        const data = await fetch("/api/user/subscription").then((r) => r.json())
        if (data.subscription?.isActive) {
          router.push(`/documents/${category}/${slug}/generate`)
          return
        }
      } catch {}
      setIsCheckingSubscription(false)
    }
    check()
  }, [session, slug, category, router])

  useEffect(() => {
    if (!doc) router.push("/documents")
  }, [doc, router])

  // Load generated document from sessionStorage for the preview
  useEffect(() => {
    const content = sessionStorage.getItem("document-content")
    if (content) setPreviewContent(content)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const emailToUse = session?.user?.email || email
    if (!emailToUse) { setError("Email is required"); return }
    if (!emailToUse.includes("@")) { setError("Please enter a valid email address"); return }

    setIsProcessing(true)
    try {
      const formData = (() => { try { return JSON.parse(sessionStorage.getItem("document-data") || "{}") } catch { return {} } })()
      const intent = sessionStorage.getItem("document-intent") || null
      const documentContent = sessionStorage.getItem("document-content") || null

      const res = await fetch("/api/payment/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentType,
          slug: doc?.legacySlug ?? slug,
          formData,
          documentContent,
          intent,
          // Guest fields — ignored by API if session exists
          guestEmail: emailToUse,
          guestName: name || emailToUse.split("@")[0],
        }),
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result.error || "Failed to create checkout session")
      window.location.href = result.url
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to start checkout"
      setError(msg)
      toast.error(msg)
      setIsProcessing(false)
    }
  }

  if (isCheckingSubscription) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">Checking subscription status...</p>
        </div>
      </div>
    )
  }

  if (!doc) return null

  const singlePrice = doc.price
  const subscriptionPrice = doc.subscriptionPrice

  return (
    <div className="min-h-screen">
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
            href={`/documents/${category}/${slug}/generate`}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Document
          </Link>

          <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:gap-14">
            {/* Left: plan picker + contact + pay button */}
            <div className="flex-1">
              <h1 className="font-serif text-3xl font-bold text-foreground">
                Complete Your <span className="gradient-text">Purchase</span>
              </h1>
              <p className="mt-2 text-muted-foreground">
                {session?.user?.email
                  ? `Signed in as ${session.user.email}.`
                  : "No account needed — just your email."}
              </p>

              {/* Plan selection */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <Card
                  className={`cursor-pointer transition-all ${paymentType === "subscription" ? "border-primary bg-primary/5 shadow-md" : "border-border/50 hover:border-primary/30"}`}
                  onClick={() => setPaymentType("subscription")}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">Monthly Subscription</CardTitle>
                        <Badge variant="outline" className="border-primary/30 bg-primary/10 text-xs text-primary">
                          <Crown className="mr-1 h-3 w-3" />Best Value
                        </Badge>
                      </div>
                      {paymentType === "subscription" && <CheckCircle2 className="h-5 w-5 text-primary" />}
                    </div>
                    <CardDescription>Unlimited documents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground">${subscriptionPrice}.99<span className="text-lg text-muted-foreground">/mo</span></div>
                    <p className="mt-2 text-sm text-muted-foreground">Generate unlimited documents. Cancel anytime.</p>
                    <div className="mt-3 flex items-center gap-1 text-xs text-primary">
                      <Zap className="h-3 w-3" />Save ${singlePrice - subscriptionPrice} on this document
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className={`cursor-pointer transition-all ${paymentType === "single" ? "border-primary bg-primary/5 shadow-md" : "border-border/50 hover:border-primary/30"}`}
                  onClick={() => setPaymentType("single")}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Single Document</CardTitle>
                      {paymentType === "single" && <CheckCircle2 className="h-5 w-5 text-primary" />}
                    </div>
                    <CardDescription>One-time payment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground">${singlePrice}.99</div>
                    <p className="mt-2 text-sm text-muted-foreground">Download this document once. No subscription.</p>
                  </CardContent>
                </Card>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                {/* Contact info — minimal, no password */}
                <div className="rounded-xl border border-border/50 bg-card/60 p-6">
                  <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-foreground">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/15 text-xs font-bold text-primary">1</span>
                    Your Email
                  </h2>
                  <p className="mt-1 mb-4 text-xs text-muted-foreground">
                    We'll send your document here and create an account so you can access it anytime.
                  </p>
                  <div className="space-y-3">
                    {session?.user?.email ? (
                      <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                        <span className="text-sm text-foreground">{session.user.email}</span>
                      </div>
                    ) : (
                      <>
                        <div>
                          <label htmlFor="name" className="mb-1.5 block text-sm text-muted-foreground">Full Name</label>
                          <Input
                            id="name"
                            placeholder="Jane Smith"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border-border/60 bg-secondary/30 focus-visible:ring-primary"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="mb-1.5 block text-sm text-muted-foreground">Email Address <span className="text-destructive">*</span></label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="jane@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="border-border/60 bg-secondary/30 focus-visible:ring-primary"
                          />
                          <p className="mt-1 text-xs text-muted-foreground">
                            Already have an account?{" "}
                            <Link href="/auth/signin" className="text-primary hover:underline">Sign in</Link>
                          </p>
                        </div>
                      </>
                    )}
                    {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
                  </div>
                </div>

                {/* Payment section */}
                <div className="rounded-xl border border-border/50 bg-card/60 p-6">
                  <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-foreground">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent/15 text-xs font-bold text-accent">2</span>
                    Secure Payment
                  </h2>
                  <div className="mt-5 flex items-start gap-3 rounded-lg border border-border/40 bg-secondary/20 p-4">
                    <Shield className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                    <div>
                      <p className="text-sm font-medium text-foreground">You'll be taken to Stripe's secure checkout</p>
                      <p className="mt-1 text-xs text-muted-foreground">Card details are entered on Stripe's PCI-compliant page. We never see your card number.</p>
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
                    <><Loader2 className="h-4 w-4 animate-spin" />Redirecting to payment...</>
                  ) : (
                    <><Lock className="h-4 w-4" />{paymentType === "subscription" ? `Subscribe — $${subscriptionPrice}.99/month` : `Pay $${singlePrice}.99 & Download`}</>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1"><Lock className="h-3 w-3" />SSL Encrypted</div>
                  <span className="text-border">|</span>
                  <div className="flex items-center gap-1"><Shield className="h-3 w-3" />PCI Compliant</div>
                  <span className="text-border">|</span>
                  <span>30-Day Money Back</span>
                </div>
              </form>
            </div>

            {/* Right: document preview + order summary */}
            <div className="w-full shrink-0 lg:w-80">
              <div className="sticky top-24 space-y-5">

                {/* Document preview — watermarked teaser */}
                {previewContent && (
                  <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/80">
                    <div className="border-b border-border/40 bg-secondary/40 px-5 py-3 flex items-center justify-between">
                      <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Your Document</h2>
                      <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    {/* Fixed-height scrollable preview with bottom fade */}
                    <div className="relative max-h-72 overflow-hidden">
                      <div className="overflow-y-auto max-h-72 p-4">
                        <DocumentPreview template={previewContent} watermark={true} />
                      </div>
                      {/* Bottom gradient fade */}
                      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-card/95 to-transparent" />
                    </div>
                    <div className="px-4 pb-4 pt-2 text-center">
                      <p className="text-xs text-muted-foreground">
                        <Lock className="inline h-3 w-3 mr-1 align-middle" />
                        Complete purchase to unlock your full document
                      </p>
                    </div>
                  </div>
                )}

                {/* Order summary */}
                <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/80">
                  <div className="border-b border-border/40 bg-secondary/40 p-5">
                    <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Order Summary</h2>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{doc.title}</h3>
                        <p className="text-xs text-muted-foreground">AI-Generated, State Compliant</p>
                      </div>
                    </div>
                    <div className="mt-5 space-y-3 border-t border-border/40 pt-5">
                      {paymentType === "subscription" ? (
                        <>
                          <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">Monthly subscription</span><span className="text-foreground">${subscriptionPrice}.99/mo</span></div>
                          <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">Unlimited documents</span><span className="text-accent">Included</span></div>
                          <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">Cancel anytime</span><span className="text-accent">Yes</span></div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">Document generation</span><span className="text-foreground">${singlePrice}.99</span></div>
                          <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">State compliance</span><span className="text-accent">Included</span></div>
                          <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">PDF & DOCX download</span><span className="text-accent">Included</span></div>
                        </>
                      )}
                    </div>
                    <div className="mt-5 border-t border-border/40 pt-5">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">{paymentType === "subscription" ? "Monthly Total" : "Total"}</span>
                        <span className="text-xl font-bold text-foreground">
                          ${paymentType === "subscription" ? subscriptionPrice : singlePrice}.99
                          {paymentType === "subscription" && <span className="text-sm text-muted-foreground">/mo</span>}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border/50 bg-card/60 p-5">
                  <div className="space-y-3">
                    {[
                      { icon: Sparkles, text: "AI-powered customization", color: "text-primary" },
                      { icon: Shield, text: "State statute citations included", color: "text-accent" },
                      { icon: CheckCircle2, text: "Instant PDF & DOCX download", color: "text-primary" },
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
