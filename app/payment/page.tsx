"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, CreditCard, Shield, Zap } from "lucide-react"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"

const features = [
  {
    title: "Unlimited Documents",
    description: "Create and manage as many legal documents as you need",
    icon: Zap,
  },
  {
    title: "Secure Payments",
    description: "Your payment information is encrypted and secure",
    icon: Shield,
  },
  {
    title: "Instant Access",
    description: "Get immediate access to all premium features",
    icon: CheckCircle2,
  },
]

interface User {
  id: string
  email: string
  name: string | null
}

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

// Payment form component
function PaymentForm({ amount, tier }: { amount: number; tier: string }) {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setIsLoading(true)
    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment/success`,
        },
      })

      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message || "Something went wrong. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Payment error:", error)
      toast({
        title: "Error",
        description: "Failed to process payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <Button type="submit" className="w-full" disabled={isLoading || !stripe}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Pay ${amount}/month
      </Button>
    </form>
  )
}

export default function PaymentPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const tier = searchParams.get("tier") || "standard"
  const amount = tier === "premium" ? 29.99 : 19.99

  useEffect(() => {
    // Check if user is authenticated and get user data
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/session")
        const data = await response.json()
        
        if (!data.user) {
          toast({
            title: "Authentication Required",
            description: "Please sign in to complete your subscription.",
            variant: "destructive",
          })
          router.push("/login?redirect=/payment")
          return
        }

        setUser(data.user)

        // Create payment intent
        const paymentResponse = await fetch("/api/payment/create-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tier,
            userId: data.user.id,
            userEmail: data.user.email,
            userName: data.user.name,
          }),
        })

        const paymentData = await paymentResponse.json()
        if (!paymentResponse.ok) {
          throw new Error(paymentData.message || "Failed to create payment intent")
        }

        setClientSecret(paymentData.clientSecret)
      } catch (error) {
        console.error("Auth check failed:", error)
        toast({
          title: "Error",
          description: "Failed to verify authentication. Please try again.",
          variant: "destructive",
        })
        router.push("/login?redirect=/payment")
      }
    }
    checkAuth()
  }, [router, toast, tier])

  if (!user || !clientSecret) {
    return (
      <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl">LegalLawDocs.com</span>
            </Link>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                "LegalLawDocs.com has revolutionized how I handle legal documents. The premium features are worth every penny."
              </p>
              <footer className="text-sm">Sofia Davis, Attorney</footer>
            </blockquote>
          </div>
          <div className="relative z-20 mt-8">
            <div className="space-y-4">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-center space-x-2">
                  <feature.icon className="h-5 w-5" />
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-zinc-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="p-4 lg:p-8 h-full flex items-center">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Loading Payment Details...
              </h1>
              <p className="text-sm text-muted-foreground">
                Please wait while we set up your payment
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">LegalLawDocs.com</span>
          </Link>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "LegalLawDocs.com has revolutionized how I handle legal documents. The premium features are worth every penny."
            </p>
            <footer className="text-sm">Sofia Davis, Attorney</footer>
          </blockquote>
        </div>
        <div className="relative z-20 mt-8">
          <div className="space-y-4">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-center space-x-2">
                <feature.icon className="h-5 w-5" />
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-zinc-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="p-4 lg:p-8 h-full flex items-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Complete Your Subscription
            </h1>
            <p className="text-sm text-muted-foreground">
              Choose your payment method to continue
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>
                {tier === "premium" ? "Premium Plan" : "Standard Plan"} - ${amount}/month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <PaymentForm amount={amount} tier={tier} />
              </Elements>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Cancel
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Cancel Subscription?</AlertDialogTitle>
                    <AlertDialogDescription>
                      If you cancel now, you will remain on the free plan with limited features. You can always upgrade later from your dashboard.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex flex-col space-y-2">
                    <AlertDialogCancel className="w-full">Continue with Payment</AlertDialogCancel>
                    <div className="flex flex-col space-y-2 w-full">
                      <AlertDialogAction asChild className="w-full">
                        <Link href="/dashboard" className="w-full">
                          Continue to Free Dashboard
                        </Link>
                      </AlertDialogAction>
                      <AlertDialogAction asChild className="w-full">
                        <Link href="/#pricing" className="bg-destructive text-destructive-foreground hover:bg-destructive/90 w-full">
                          Return to Pricing
                        </Link>
                      </AlertDialogAction>
                    </div>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
} 