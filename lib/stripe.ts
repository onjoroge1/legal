import Stripe from "stripe"

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn("STRIPE_SECRET_KEY is not set in environment variables")
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  typescript: true,
})

/**
 * Map internal tier names to Stripe price IDs
 */
export function getPriceIdForTier(tier: string): string | null {
  switch (tier) {
    case "starter":
      return process.env.STRIPE_STANDARD_PRICE_ID || null
    case "professional":
      return process.env.STRIPE_PREMIUM_PRICE_ID || null
    default:
      return null
  }
}

/**
 * Map Stripe price IDs back to internal tier names
 */
export function getTierForPriceId(priceId: string): string {
  if (priceId === process.env.STRIPE_STANDARD_PRICE_ID) {
    return "starter"
  }
  if (priceId === process.env.STRIPE_PREMIUM_PRICE_ID) {
    return "professional"
  }
  return "free"
}

/**
 * Get or create a Stripe customer for a user
 */
export async function getOrCreateStripeCustomer(
  email: string,
  name?: string,
  existingCustomerId?: string | null
): Promise<string> {
  // If user already has a Stripe customer ID, verify it exists
  if (existingCustomerId) {
    try {
      const customer = await stripe.customers.retrieve(existingCustomerId)
      if (!customer.deleted) {
        return existingCustomerId
      }
    } catch {
      // Customer not found, create a new one
    }
  }

  // Create a new Stripe customer
  const customer = await stripe.customers.create({
    email,
    name: name || undefined,
    metadata: {
      source: "legallawdocs",
    },
  })

  return customer.id
}
