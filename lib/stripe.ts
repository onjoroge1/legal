import Stripe from "stripe"

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set")
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2026-09-30.endive",
  typescript: true,
  timeout: 8000,
  maxNetworkRetries: 0,
})

export const PRICE_IDS = {
  starter: process.env.STRIPE_STANDARD_PRICE_ID!,
  professional: process.env.STRIPE_PREMIUM_PRICE_ID!,
}
