"use client"

import type { ReactNode } from "react"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

interface StripeProviderProps {
  children: ReactNode
}

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
const stripePromise = publishableKey ? loadStripe(publishableKey) : null

export default function StripeProvider({ children }: StripeProviderProps) {
  if (!stripePromise) {
    return <>{children}</>
  }

  return <Elements stripe={stripePromise}>{children}</Elements>
}
