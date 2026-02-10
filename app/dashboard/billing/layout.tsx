import type { Metadata } from "next"
import BillingPage from "./page"
import StripeProvider from "@/components/dashboard/stripe-provider"

export const metadata: Metadata = {
  title: "Billing | LegalLawDocs.com",
  description: "Manage your subscription and billing information",
}

export default function BillingLayout() {
  return (
    <StripeProvider>
      <BillingPage />
    </StripeProvider>
  )
} 