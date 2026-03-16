"use client"

import React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useParams, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
  Crown,
  Zap,
  ExternalLink,
} from "lucide-react"
import { getDocumentBySlug } from "@/lib/document-data"
import { useSession, signIn } from "next-auth/react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "@/lib/safe-toast"

export default function CheckoutPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const slug = params?.slug as string
  const document = getDocumentBySlug(slug)
  const { data: session, status: sessionStatus } = useSession()

  const [isProcessing, setIsProcessing] = useState(false)
  const [isCheckingSubscription, setIsCheckingSubscription] = useState(true)
  const [paymentType, setPaymentType] = useState<"single" | "subscription">("single")
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  })
  const [emailExists, setEmailExists] = useState<boolean | null>(null)
  const [isCheckingEmail, setIsCheckingEmail] = useState(false)
  const [accountError, setAccountError] = useState<string | null>(null)
  const [isCreatingAccount, setIsCreatingAccount] = useState(false)

  // Show canceled message from Stripe redirect
  const canceled = searchParams?.get("canceled")

  // Pre-fill form for logged-in users
  useEffect(() => {
    if (session?.user?.email && !form.email) {
      setForm(prev => ({
        ...prev,
        email: session.user.email || "",
        name: session.user.name || "",
      }))
      setEmailExists(true)
    }
  }, [session, form.email])

  // Check subscription status
  useEffect(() => {
    const checkSubscription = async () => {
      if (sessionStatus === "loading") return

      if (!session?.user?.email) {
        setIsCheckingSubscription(false)
        return
      }

      try {
        const response = await fetch("/api/user/subscription")
        const data = await response.json()

        if (data.subscription?.isActive) {
          // Redirect — subscriber already has access
          router.push(`/dashboard/documents`)
          return
        }
      } catch (error) {
        console.error("Error checking subscription:", error)
      } finally {
        setIsCheckingSubscription(false)
      }
    }

    checkSubscription()
  }, [session, sessionStatus, slug, router])

  useEffect(() => {
    if (!document) {
      router.push("/documents")
    }
  }, [document, router])

  // Debounced email check for new users
  useEffect(() => {
    if (session?.user?.email) return // Skip for logged-in users

    const checkEmail = async () => {
      if (!form.email || !form.email.includes("@")) {
        setEmailExists(null)
        return
      }

      setIsCheckingEmail(true)
      try {
        const response = await fetch(`/api/auth/check-email?email=${encodeURIComponent(form.email)}`)
        if (response.ok) {
          const data = await response.json()
          setEmailExists(data.exists)
        }
      } catch (error) {
        console.error("Error checking email:", error)
      } finally {
        setIsCheckingEmail(false)
      }
    }

    const timeoutId = setTimeout(checkEmail, 500)
    return () => clearTimeout(timeoutId)
  }, [form.email, session?.user?.email])

  if (isCheckingSubscription || sessionStatus === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">Checking account status...</p>
        </div>
      </div>
    )
  }

  // Handle account creation or sign-in for unauthenticated users
  const handleAccountSetup = async (): Promise<boolean> => {
    setAccountError(null)
    setIsCreatingAccount(true)

    try {
      if (emailExists === false) {
        // New user — create account
        if (!form.password || form.password.length < 6) {
          setAccountError("Password must be at least 6 characters")
          setIsCreatingAccount(false)
          return false
        }

        if (form.password !== form.confirmPassword) {
          setAccountError("Passwords do not match")
          setIsCreatingAccount(false)
          return false
        }

        const signupResponse = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password,
          }),
        })

        const signupResult = await signupResponse.json()

        if (!signupResponse.ok) {
          setAccountError(signupResult.error || "Failed to create account")
          setIsCreatingAccount(false)
          return false
        }

        // Sign in the newly created user
        const signInResult = await signIn("credentials", {
          email: form.email,
          password: form.password,
          redirect: false,
        })

        if (signInResult?.error) {
          setAccountError("Account created but sign-in failed. Please try signing in manually.")
          setIsCreatingAccount(false)
          return false
        }

        return true
      } else if (emailExists === true) {
        // Existing user — sign in
        if (!form.password) {
          setAccountError("Password is required to sign in")
          setIsCreatingAccount(false)
          return false
        }

        const signInResult = await signIn("credentials", {
          email: form.email,
          password: form.password,
          redirect: false,
        })

        if (signInResult?.error) {
          setAccountError("Invalid email or password")
          setIsCreatingAccount(false)
          return false
        }

        return true
      }

      return false
    } catch (error) {
      console.error("Account setup error:", error)
      setAccountError("An error occurred. Please try again.")
      return false
    } finally {
      setIsCreatingAccount(false)
    }
  }

  /**
   * Main submit handler:
   * 1. Ensure user is signed in (create account if needed)
   * 2. Also persist document data in localStorage for after Stripe redirect
   * 3. Call /api/payment/create-checkout to get Stripe Checkout URL
   * 4. Redirect to Stripe's hosted checkout
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // If user is not logged in, set up account first
    if (!session?.user?.email) {
      if (!form.email || !form.name) {
        setAccountError("Email and name are required")
        return
      }

      if (emailExists === null) {
        setAccountError("Please wait while we check your email...")
        return
      }

      const accountSetupSuccess = await handleAccountSetup()
      if (!accountSetupSuccess) return

      // Check if the newly signed-in user has a subscription
      try {
        const subResponse = await fetch("/api/user/subscription")
        const subData = await subResponse.json()
        if (subData.subscription?.isActive) {
          // Subscriber — skip checkout entirely
          router.push("/dashboard/documents")
          return
        }
      } catch (err) {
        console.error("Error checking subscription after sign-in:", err)
      }
      // No subscription — reload to show payment form as authenticated user
      window.location.reload()
      return
    }

    setIsProcessing(true)
    setAccountError(null)

    try {
      // Persist document data in localStorage so it survives the Stripe redirect
      const documentData = sessionStorage.getItem("document-data")
      const documentIntent = sessionStorage.getItem("document-intent")
      const documentContent = sessionStorage.getItem("document-content")

      if (documentData) localStorage.setItem("document-data", documentData)
      if (documentIntent) localStorage.setItem("document-intent", documentIntent)
      if (documentContent) localStorage.setItem("document-content", documentContent)
      localStorage.setItem("document-slug", slug)

      // Map our payment type to Stripe tier
      const tier = paymentType === "subscription" ? "professional" : "starter"

      // Create Stripe Checkout Session
      const response = await fetch("/api/payment/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tier,
          documentSlug: slug,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to create checkout session")
      }

      if (!result.url) {
        throw new Error("No checkout URL returned")
      }

      // Redirect to Stripe Checkout
      window.location.href = result.url
    } catch (error) {
      console.error("Checkout error:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to start checkout"
      setAccountError(errorMessage)
      toast.error(errorMessage)
      setIsProcessing(false)
    }
  }

  if (!document) {
    return null
  }

  const singlePrice = document.price
  const subscriptionPrice = document.subscriptionPrice

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
            href={`/documents/${slug}/preview`}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Preview
          </Link>

          {canceled && (
            <Alert className="mt-6 border-amber-500/30 bg-amber-500/10">
              <AlertDescription className="text-amber-600">
                Payment was canceled. You can try again when you&apos;re ready.
              </AlertDescription>
            </Alert>
          )}

          <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:gap-14">
            {/* Left — Payment form */}
            <div className="flex-1">
              <h1 className="font-serif text-3xl font-bold text-foreground">
                Complete Your <span className="gradient-text">Purchase</span>
              </h1>
              <p className="mt-2 text-muted-foreground">
                {session?.user?.email
                  ? `Signed in as ${session.user.email}. Choose your plan below.`
                  : "Create an account or sign in, then choose your plan."}
              </p>
              {session?.user?.email && (
                <Alert className="mt-4">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>
                    You&apos;re signed in. Your document will be saved to your account after payment.
                  </AlertDescription>
                </Alert>
              )}

              {/* Payment Type Selection */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <Card
                  className={`cursor-pointer transition-all ${
                    paymentType === "single"
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border/50 hover:border-primary/30"
                  }`}
                  onClick={() => setPaymentType("single")}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Single Document</CardTitle>
                      {paymentType === "single" && (
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <CardDescription>One-time payment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground">${singlePrice}.99</div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Download this document once. No subscription.
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className={`cursor-pointer transition-all ${
                    paymentType === "subscription"
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border/50 hover:border-primary/30"
                  }`}
                  onClick={() => setPaymentType("subscription")}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">Monthly Subscription</CardTitle>
                        <Badge variant="outline" className="border-primary/30 bg-primary/10 text-xs text-primary">
                          <Crown className="mr-1 h-3 w-3" />
                          Best Value
                        </Badge>
                      </div>
                      {paymentType === "subscription" && (
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <CardDescription>Unlimited documents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground">${subscriptionPrice}.99<span className="text-lg text-muted-foreground">/mo</span></div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Generate unlimited documents. Cancel anytime.
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-xs text-primary">
                      <Zap className="h-3 w-3" />
                      Save ${singlePrice - subscriptionPrice} on this document
                    </div>
                  </CardContent>
                </Card>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                {/* Contact info — only for unauthenticated users */}
                {!session?.user?.email && (
                  <div className="rounded-xl border border-border/50 bg-card/60 p-6">
                    <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-foreground">
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/15 text-xs font-bold text-primary">
                        1
                      </span>
                      Account Setup
                    </h2>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Create an account or sign in to save your document and manage purchases.
                    </p>
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
                          We&apos;ll send your receipt and document access to this email.
                        </p>
                        {isCheckingEmail && (
                          <p className="mt-1 text-xs text-primary">Checking account...</p>
                        )}
                        {emailExists === true && (
                          <p className="mt-1 text-xs text-primary">Account found. Please sign in below.</p>
                        )}
                        {emailExists === false && (
                          <p className="mt-1 text-xs text-muted-foreground">New account will be created.</p>
                        )}
                      </div>

                      {/* Password fields */}
                      <div>
                        <label htmlFor="password" className="mb-1.5 block text-sm text-muted-foreground">
                          {emailExists === true ? "Password (Sign In)" : "Create Password"}
                          <span className="text-destructive"> *</span>
                        </label>
                        <Input
                          id="password"
                          type="password"
                          placeholder={emailExists === true ? "Enter your password" : "Create a password (min 6 characters)"}
                          value={form.password}
                          onChange={(e) => setForm({ ...form, password: e.target.value })}
                          required
                          className="border-border/60 bg-secondary/30 focus-visible:ring-primary"
                        />
                      </div>
                      {emailExists === false && (
                        <div>
                          <label htmlFor="confirmPassword" className="mb-1.5 block text-sm text-muted-foreground">
                            Confirm Password
                            <span className="text-destructive"> *</span>
                          </label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            value={form.confirmPassword}
                            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                            required
                            className="border-border/60 bg-secondary/30 focus-visible:ring-primary"
                          />
                        </div>
                      )}
                      {accountError && (
                        <Alert variant="destructive">
                          <AlertDescription>{accountError}</AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </div>
                )}

                {/* Payment info — Stripe Checkout redirect */}
                <div className="rounded-xl border border-border/50 bg-card/60 p-6">
                  <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-foreground">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent/15 text-xs font-bold text-accent">
                      {session?.user?.email ? "1" : "2"}
                    </span>
                    Payment
                  </h2>
                  <div className="mt-4 rounded-lg border border-border/40 bg-secondary/20 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#635BFF]/10">
                        <CreditCard className="h-5 w-5 text-[#635BFF]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Secure Payment via Stripe</p>
                        <p className="text-xs text-muted-foreground">
                          You&apos;ll be redirected to Stripe&apos;s secure checkout to complete your payment.
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["Visa", "Mastercard", "Amex", "Apple Pay", "Google Pay"].map((method) => (
                        <span
                          key={method}
                          className="rounded-md border border-border/40 bg-background/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                        >
                          {method}
                        </span>
                      ))}
                    </div>
                  </div>

                  {accountError && session?.user?.email && (
                    <Alert variant="destructive" className="mt-4">
                      <AlertDescription>{accountError}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full gap-2 shadow-lg shadow-primary/20"
                  disabled={isProcessing || isCreatingAccount}
                >
                  {isCreatingAccount ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {emailExists === true ? "Signing in..." : "Creating account..."}
                    </>
                  ) : isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Redirecting to Stripe...
                    </>
                  ) : !session?.user?.email ? (
                    <>
                      <Lock className="h-4 w-4" />
                      {emailExists === true
                        ? "Sign In & Continue to Payment"
                        : "Create Account & Continue to Payment"}
                    </>
                  ) : (
                    <>
                      <ExternalLink className="h-4 w-4" />
                      {paymentType === "subscription"
                        ? `Subscribe for $${subscriptionPrice}.99/month`
                        : `Pay $${singlePrice}.99 — Proceed to Checkout`}
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
                    Stripe Secure
                  </div>
                  <span className="text-border">|</span>
                  <span>30-Day Money Back</span>
                </div>
              </form>
            </div>

            {/* Right — Order summary */}
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
                        <h3 className="font-semibold text-foreground">{document.title}</h3>
                        <p className="text-xs text-muted-foreground">AI-Generated, State Compliant</p>
                      </div>
                    </div>

                    <div className="mt-5 space-y-3 border-t border-border/40 pt-5">
                      {paymentType === "subscription" ? (
                        <>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Monthly subscription</span>
                            <span className="text-foreground">${subscriptionPrice}.99/mo</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Unlimited documents</span>
                            <span className="text-accent">Included</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">All document types</span>
                            <span className="text-accent">Included</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Cancel anytime</span>
                            <span className="text-accent">Yes</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Document generation</span>
                            <span className="text-foreground">${singlePrice}.99</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">State compliance</span>
                            <span className="text-accent">Included</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">PDF & DOCX export</span>
                            <span className="text-accent">Included</span>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="mt-5 border-t border-border/40 pt-5">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">
                          {paymentType === "subscription" ? "Monthly Total" : "Total"}
                        </span>
                        <span className="text-xl font-bold text-foreground">
                          ${paymentType === "subscription" ? subscriptionPrice : singlePrice}.99
                          {paymentType === "subscription" && <span className="text-sm text-muted-foreground">/mo</span>}
                        </span>
                      </div>
                      {paymentType === "subscription" && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          Billed monthly. Cancel anytime.
                        </p>
                      )}
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
