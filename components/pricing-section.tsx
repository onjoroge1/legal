import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Sparkles } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Starter",
    description: "A one-time purchase for a single document draft.",
    price: "$14–$29",
    period: "per document",
    features: [
      "Price shown on each document page",
      "AI-assisted, state-aware draft",
      "PDF & Word download",
      "Review flags and placeholders",
      "No recurring charge",
    ],
    cta: "Browse Documents",
    href: "/documents",
    popular: false,
  },
  {
    name: "Professional",
    description: "A recurring plan for ongoing drafting workflows.",
    price: "Monthly",
    period: "price confirmed at checkout",
    features: [
      "Access to all 52 document types",
      "Saved drafts in your dashboard",
      "PDF & Word downloads",
      "Document revision history",
      "Cancel from the billing dashboard",
    ],
    cta: "View Account Plans",
    href: "/dashboard/billing",
    popular: true,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="relative border-t border-border/50 py-24 lg:py-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-card/50 via-background to-card/50" />

      {/* Accent orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/2 h-[350px] w-[350px] -translate-y-1/2 rounded-full bg-primary/4 blur-[120px]" />
        <div className="absolute right-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-accent/3 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Pricing
          </p>
          <h2 className="mt-3 text-balance font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Clear <span className="gradient-text">Drafting Options</span>
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
            Choose a one-time draft or review the recurring option. The exact charge and billing
            terms are shown before you authorize payment.
          </p>
        </div>

        <div className="mx-auto mt-20 grid max-w-4xl gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1 lg:p-8 ${
                plan.popular
                  ? "border-primary/40 bg-card shadow-2xl shadow-primary/10"
                  : "border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
              }`}
            >
              {/* Top accent line for popular */}
              {plan.popular && (
                <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-primary via-accent to-primary" />
              )}

              {plan.popular && (
                <Badge className="absolute -top-3 left-6 gap-1 bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                  <Sparkles className="h-3 w-3" />
                  Most Popular
                </Badge>
              )}
              <div>
                <h3 className="font-serif text-xl font-semibold text-foreground">
                  {plan.name}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>
              <div className="mt-7">
                <span className={`font-serif text-5xl font-bold ${plan.popular ? "gradient-text" : "text-foreground"}`}>
                  {plan.price}
                </span>
                <span className="ml-2 text-sm text-muted-foreground">
                  {plan.period}
                </span>
              </div>
              <ul className="mt-8 flex-1 space-y-3.5" role="list">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${plan.popular ? "bg-primary/15" : "bg-accent/10"}`}>
                      <Check className={`h-3 w-3 ${plan.popular ? "text-primary" : "text-accent"}`} />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className={`mt-8 w-full ${plan.popular ? "shadow-lg shadow-primary/20" : ""}`}
                variant={plan.popular ? "default" : "outline"}
                size="lg"
              >
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-muted-foreground">
          Generated content is a self-help draft and not legal advice. Purchases are subject to the{" "}
          <Link href="/terms#payment" className="underline underline-offset-2">payment terms</Link>{" "}
          and <Link href="/terms#refunds" className="underline underline-offset-2">refund policy</Link>.
        </p>
      </div>
    </section>
  )
}
