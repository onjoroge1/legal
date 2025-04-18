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
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

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
  const { toast } = useToast()

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
        throw new Error(data.message || "Failed to create checkout session")
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url
    } catch (error) {
      console.error("Upgrade error:", error)
      toast({
        title: "Error",
        description: "Failed to process upgrade. Please try again.",
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
        <Button>
          Upgrade Plan
        </Button>
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
                    {subscription?.tier || "Free"} Plan
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Status: <span className="capitalize">{subscription?.status || "Active"}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">
                    {subscription?.tier === "free"
                      ? "Free"
                      : subscription?.tier === "standard"
                      ? "$49/month"
                      : "$99/month"}
                  </p>
                  {subscription?.endDate && (
                    <p className="text-sm text-muted-foreground">
                      Renews on {formatDate(subscription.endDate)}
                    </p>
                  )}
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-2">Available Plans</h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Free</CardTitle>
                      <CardDescription>Basic features for personal use</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li>• 1 free basic document</li>
                        <li>• Preview advanced documents</li>
                        <li>• PDF format only</li>
                        <li>• Basic customization</li>
                        <li>• Community support</li>
                      </ul>
                      <Button
                        className="w-full mt-4"
                        variant={subscription?.tier === "free" ? "default" : "outline"}
                        disabled={subscription?.tier === "free"}
                      >
                        Current Plan
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Standard</CardTitle>
                      <CardDescription>Perfect for small businesses</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li>• Unlimited document generation</li>
                        <li>• All document formats</li>
                        <li>• Advanced customization</li>
                        <li>• Priority support</li>
                        <li>• Basic collaboration</li>
                      </ul>
                      <Button
                        className="w-full mt-4"
                        variant={subscription?.tier === "standard" ? "default" : "outline"}
                        onClick={() => handleUpgrade("standard")}
                        disabled={isLoading || subscription?.tier === "standard"}
                      >
                        {subscription?.tier === "standard"
                          ? "Current Plan"
                          : subscription?.tier === "premium"
                          ? "Downgrade"
                          : "Upgrade"}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Premium</CardTitle>
                      <CardDescription>For growing businesses</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li>• Everything in Standard</li>
                        <li>• Document collaboration</li>
                        <li>• Electronic signatures</li>
                        <li>• Custom templates</li>
                        <li>• 24/7 priority support</li>
                      </ul>
                      <Button
                        className="w-full mt-4"
                        variant={subscription?.tier === "premium" ? "default" : "outline"}
                        onClick={() => handleUpgrade("premium")}
                        disabled={isLoading || subscription?.tier === "premium"}
                      >
                        {subscription?.tier === "premium"
                          ? "Current Plan"
                          : subscription?.tier === "standard"
                          ? "Upgrade"
                          : "Upgrade"}
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
                    <Elements stripe={stripePromise}>
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
                    </Elements>
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
              <div className="space-y-4">
                {billingHistory.length === 0 ? (
                  <p className="text-muted-foreground">No billing history found</p>
                ) : (
                  billingHistory.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between py-4 border-b last:border-0"
                    >
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(transaction.date)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(transaction.amount)}</p>
                        <p className="text-sm text-muted-foreground capitalize">
                          {transaction.status}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

