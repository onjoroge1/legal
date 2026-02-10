"use client"

import { ReactNode, useEffect, useState } from "react"

interface StripeProviderProps {
  children: ReactNode
}

/**
 * StripeProvider component
 * Wraps children with Stripe Elements provider if Stripe is installed
 * Uses dynamic imports to avoid build-time errors when packages aren't installed
 */
export default function StripeProvider({ children }: StripeProviderProps) {
  const [stripeElements, setStripeElements] = useState<ReactNode>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Dynamically import Stripe only on client-side
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
        // Stripe packages not installed - render children without wrapper
        console.log("Stripe packages not installed. Run: npm install @stripe/react-stripe-js @stripe/stripe-js")
        setStripeElements(null)
      } finally {
        setIsLoading(false)
      }
    }

    loadStripe()
  }, [])

  // Show loading state briefly, then render
  if (isLoading) {
    return <>{children}</>
  }

  // If Stripe is loaded, wrap children with Elements
  if (stripeElements?.Elements && stripeElements?.stripePromise) {
    return (
      <stripeElements.Elements stripe={stripeElements.stripePromise}>
        {children}
      </stripeElements.Elements>
    )
  }

  // Otherwise, just render children
  return <>{children}</>
}

