"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import BillingHistory from "@/components/dashboard/billing-history"
import PaymentMethodCard from "@/components/dashboard/payment-method-card"

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

export default function BillingPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [billingHistory, setBillingHistory] = useState<BillingHistory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchSubscriptionData()
  }, [])

  const fetchSubscriptionData = async () => {
    try {
      const response = await fetch("/api/billing/subscription")
      const data = await response.json()
      setSubscription(data.subscription)
      setBillingHistory(data.billingHistory)
    } catch (error) {
      console.error("Error fetching subscription data:", error)
      toast({
        title: "Error",
        description: "Failed to load subscription data",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
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
                <PaymentMethodCard type="visa" last4="4242" expiry="09/2024" isDefault={true} />

                <PaymentMethodCard type="mastercard" last4="5678" expiry="12/2025" isDefault={false} />

                <Card className="flex flex-col items-center justify-center p-6 h-[180px] border-dashed">
                  <Button variant="outline" className="gap-1">
                    Add Payment Method
                  </Button>
                </Card>
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

