"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Trash2, CreditCard, Check } from "lucide-react"
import BillingHistory from "@/components/dashboard/billing-history"
import PaymentMethodForm from "@/components/dashboard/payment-method-form"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
// Stripe will be loaded dynamically in the component
// This avoids build-time errors when packages aren't installed

interface Subscription {
  tier: string
  status: string
  startDate: string | null
  endDate: string | null
}

interface BillingHistory {
  id: string
  amount: number
  status: string
  date: string
  description: string
}

interface PaymentMethod {
  id: string
  type: string
  last4: string
  expiry: string
  isDefault: boolean
}

export default function BillingPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [billingHistory, setBillingHistory] = useState<BillingHistory[]>([])
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddingPaymentMethod, setIsAddingPaymentMethod] = useState(false)
  const [stripeElements, setStripeElements] = useState<any>(null)
  const { toast } = useToast()

  // Dynamically load Stripe on client-side
  useEffect(() => {
    const loadStripe = async () => {
      try {
        const [stripeReact, stripeJs] = await Promise.all([
          import("@stripe/react-stripe-js"),
          import("@stripe/stripe-js"),
        ])

        const stripePromise = stripeJs.loadStripe(
          process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
        )

        setStripeElements({
          Elements: stripeReact.Elements,
          stripePromise,
        })
      } catch (error) {
        // Stripe not installed - will show message in UI
        console.log("Stripe packages not installed. Run: npm install @stripe/react-stripe-js @stripe/stripe-js")
      }
    }

    loadStripe()
  }, [])

  useEffect(() => {
    fetchBillingData()
  }, [])

  const fetchBillingData = async () => {
    try {
      const response = await fetch("/api/billing/subscription")
      const data = await response.json()
      setSubscription(data.subscription)
      setBillingHistory(data.billingHistory)
      setPaymentMethods(data.paymentMethods || [])
    } catch (error) {
      console.error("Error fetching billing data:", error)
      toast({
        title: "Error",
        description: "Failed to load billing data",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemovePaymentMethod = async (paymentMethodId: string) => {
    try {
      const response = await fetch("/api/payment/remove-method", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentMethodId }),
      })

      if (!response.ok) {
        throw new Error("Failed to remove payment method")
      }

      toast({
        title: "Success",
        description: "Payment method removed successfully",
      })

      // Refresh payment methods
      await fetchBillingData()
    } catch (error) {
      console.error("Error removing payment method:", error)
      toast({
        title: "Error",
        description: "Failed to remove payment method",
        variant: "destructive",
      })
    }
  }

  const handleSetDefaultPaymentMethod = async (paymentMethodId: string) => {
    try {
      const response = await fetch("/api/payment/set-default", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentMethodId }),
      })

      if (!response.ok) {
        throw new Error("Failed to set default payment method")
      }

      toast({
        title: "Success",
        description: "Default payment method updated successfully",
      })

      // Refresh payment methods
      await fetchBillingData()
    } catch (error) {
      console.error("Error setting default payment method:", error)
      toast({
        title: "Error",
        description: "Failed to set default payment method",
        variant: "destructive",
      })
    }
  }

  const handleUpgrade = async (tier: string) => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/payment/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tier }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session")
      }

      // If URL is provided, redirect to Stripe Checkout
      // Otherwise, refresh billing data (for development mode)
      if (data.url && data.url.startsWith("https://")) {
        window.location.href = data.url
      } else {
        // Development mode - just refresh the data
        toast({
          title: "Success",
          description: `Successfully upgraded to ${tier} plan`,
        })
        await fetchBillingData()
        // Reload page to show updated subscription
        window.location.reload()
      }
    } catch (error) {
      console.error("Upgrade error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process upgrade. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Billing & Subscription</h1>
          <p className="text-muted-foreground">Manage your subscription, payment methods, and billing history</p>
        </div>
        {subscription?.tier !== "professional" && (
          <Button onClick={() => handleUpgrade("professional")} disabled={isLoading}>
            Upgrade to Professional
          </Button>
        )}
      </div>

      <Tabs defaultValue="subscription" className="space-y-4">
        <TabsList>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="billing">Billing History</TabsTrigger>
        </TabsList>

        <TabsContent value="subscription" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>
                Your current subscription status and plan details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold capitalize">
                    {subscription?.tier === "free" ? "Free" : subscription?.tier === "starter" ? "Starter" : subscription?.tier === "professional" ? "Professional" : "Free"} Plan
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Status: <span className="capitalize">{subscription?.status || "Active"}</span>
                  </p>
                  {subscription?.tier !== "free" && subscription?.status === "active" && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {subscription?.tier === "professional" && subscription?.endDate
                        ? `Active until ${formatDate(subscription.endDate)}`
                        : subscription?.tier === "starter"
                        ? "Pay per document"
                        : ""}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">
                    {subscription?.tier === "free"
                      ? "Free"
                      : subscription?.tier === "starter"
                      ? "Per-document access"
                      : subscription?.tier === "professional"
                      ? "Recurring plan"
                      : "Free"}
                  </p>
                  {subscription?.endDate && subscription?.tier === "professional" && (
                    <p className="text-sm text-muted-foreground">
                      Renews on {formatDate(subscription.endDate)}
                    </p>
                  )}
                  {subscription?.tier === "starter" && (
                    <p className="text-sm text-muted-foreground">
                      Pay per document
                    </p>
                  )}
                </div>
              </div>

              {subscription?.tier !== "free" && subscription?.status === "active" && (
                <div className="border-t pt-4">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="text-destructive hover:text-destructive">
                        Cancel Subscription
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Cancel Subscription</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to cancel your subscription? You will lose access to premium features at the end of your billing period.
                          {subscription?.endDate && (
                            <span className="block mt-2 font-medium">
                              Your subscription will remain active until {formatDate(subscription.endDate)}.
                            </span>
                          )}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={async () => {
                            try {
                              const response = await fetch("/api/billing/cancel", {
                                method: "POST",
                              })
                              if (response.ok) {
                                toast({
                                  title: "Success",
                                  description: "Subscription cancelled successfully",
                                })
                                await fetchBillingData()
                              } else {
                                throw new Error("Failed to cancel subscription")
                              }
                            } catch (error) {
                              toast({
                                title: "Error",
                                description: "Failed to cancel subscription",
                                variant: "destructive",
                              })
                            }
                          }}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Cancel Subscription
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}

              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-2">Available Plans</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Free</CardTitle>
                      <CardDescription>Basic features for personal use</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <span className="text-3xl font-bold">Free</span>
                      </div>
                      <ul className="space-y-2 text-sm mb-4">
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          <span>Preview documents</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          <span>Basic templates</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          <span>Community support</span>
                        </li>
                      </ul>
                      <Button
                        className="w-full"
                        variant={subscription?.tier === "free" ? "default" : "outline"}
                        disabled={subscription?.tier === "free"}
                      >
                        {subscription?.tier === "free" ? "Current Plan" : "Select Plan"}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className={subscription?.tier === "starter" ? "border-primary" : ""}>
                    <CardHeader>
                      <CardTitle>Starter</CardTitle>
                      <CardDescription>Perfect for individuals with occasional legal document needs</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <span className="text-3xl font-bold">$14–$29</span>
                        <span className="text-muted-foreground ml-2">per document</span>
                      </div>
                      <ul className="space-y-2 text-sm mb-4">
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          <span>Single document generation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          <span>State-aware questions and references</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          <span>PDF & Word download</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          <span>Email support</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          <span>Review flags and placeholders</span>
                        </li>
                      </ul>
                      <Button
                        className="w-full"
                        variant={subscription?.tier === "starter" ? "default" : "outline"}
                        onClick={() => handleUpgrade("starter")}
                        disabled={isLoading || subscription?.tier === "starter"}
                      >
                        {subscription?.tier === "starter"
                          ? "Current Plan"
                          : "Select Plan"}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className={subscription?.tier === "professional" ? "border-primary" : ""}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Professional</CardTitle>
                        <Badge className="bg-primary">Recurring</Badge>
                      </div>
                      <CardDescription>Ideal for small businesses and frequent document needs</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <span className="text-xl font-bold">Price confirmed by Stripe</span>
                      </div>
                      <ul className="space-y-2 text-sm mb-4">
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          <span>Unlimited document generation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          <span>All 52 document types</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          <span>State-aware drafting and review flags</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          <span>Document revision history</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          <span>Saved dashboard access</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          <span>Cancel from the billing dashboard</span>
                        </li>
                      </ul>
                      <Button
                        className="w-full"
                        variant={subscription?.tier === "professional" ? "default" : "default"}
                        onClick={() => handleUpgrade("professional")}
                        disabled={isLoading || subscription?.tier === "professional"}
                      >
                        {subscription?.tier === "professional"
                          ? "Current Plan"
                          : "Review at Checkout"}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment-methods" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {paymentMethods.map((method) => (
                  <Card key={method.id} className="relative">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <CreditCard className="h-6 w-6" />
                          <div>
                            <p className="font-medium">
                              {method.type} ending in {method.last4}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Expires {method.expiry}
                            </p>
                          </div>
                        </div>
                        {method.isDefault && (
                          <Badge variant="secondary">Default</Badge>
                        )}
                      </div>
                      <div className="mt-4 flex items-center space-x-2">
                        {!method.isDefault && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSetDefaultPaymentMethod(method.id)}
                          >
                            Set as Default
                          </Button>
                        )}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Remove Payment Method</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to remove this payment method? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleRemovePaymentMethod(method.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Remove
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Dialog>
                  <DialogTrigger asChild>
                    <Card className="flex flex-col items-center justify-center p-6 h-[180px] border-dashed cursor-pointer hover:border-primary">
                      <Button variant="outline" className="gap-1">
                        <CreditCard className="h-4 w-4" />
                        Add Payment Method
                      </Button>
                    </Card>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Payment Method</DialogTitle>
                      <DialogDescription>
                        Add a new payment method to your account
                      </DialogDescription>
                    </DialogHeader>
                    {stripeElements?.Elements && stripeElements?.stripePromise ? (
                      <stripeElements.Elements stripe={stripeElements.stripePromise}>
                        <PaymentMethodForm
                          onSuccess={() => {
                            fetchBillingData()
                            toast({
                              title: "Success",
                              description: "Payment method added successfully",
                            })
                          }}
                          onError={(error) => {
                            toast({
                              title: "Error",
                              description: error,
                              variant: "destructive",
                            })
                          }}
                        />
                      </stripeElements.Elements>
                    ) : (
                      <div className="p-4">
                        <p className="text-sm text-muted-foreground mb-4">
                          Stripe packages not installed. Please run: npm install @stripe/react-stripe-js @stripe/stripe-js
                        </p>
                        <PaymentMethodForm
                          onSuccess={() => {
                            fetchBillingData()
                            toast({
                              title: "Success",
                              description: "Payment method added successfully",
                            })
                          }}
                          onError={(error) => {
                            toast({
                              title: "Error",
                              description: error,
                              variant: "destructive",
                            })
                          }}
                        />
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>
                View your past transactions and invoices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BillingHistory items={billingHistory} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
