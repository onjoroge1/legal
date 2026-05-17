import Link from "next/link"
import { Scale, ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface SponsoredLegalServicesBlockProps {
  documentTitle: string
  practiceAreas: string[]
  monetizationTier: "basic" | "high-value" | "premium"
}

const PRACTICE_AREA_LABELS: Record<string, string> = {
  "business-contracts": "Business Contracts",
  "intellectual-property": "Intellectual Property",
  startups: "Startup Law",
  "real-estate": "Real Estate",
  "landlord-tenant": "Landlord-Tenant",
  "property-management": "Property Management",
  "estate-planning": "Estate Planning",
  "elder-law": "Elder Law",
  probate: "Probate",
  "employment-law": "Employment Law",
  litigation: "Litigation",
  collections: "Debt & Collections",
  "banking-finance": "Banking & Finance",
  "consumer-protection": "Consumer Protection",
  "personal-injury": "Personal Injury",
  immigration: "Immigration",
  "family-law": "Family Law",
}

function getPracticeLabel(area: string): string {
  return PRACTICE_AREA_LABELS[area] ?? area.replace(/-/g, " ")
}

export function SponsoredLegalServicesBlock({
  documentTitle,
  practiceAreas,
  monetizationTier,
}: SponsoredLegalServicesBlockProps) {
  const areaLabels = practiceAreas.map(getPracticeLabel)
  const primaryArea = areaLabels[0] ?? "legal"
  const tier = monetizationTier

  return (
    <section className="border-t border-border/40 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 lg:p-12">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
            {/* Left: Explanation */}
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                  <Scale className="h-5 w-5 text-primary" />
                </div>
                <Badge className="border-primary/30 bg-primary/10 text-primary text-xs" variant="outline">
                  Find a Lawyer
                </Badge>
              </div>

              <h2 className="mt-5 font-serif text-2xl font-bold text-foreground md:text-3xl">
                Need a {primaryArea} Attorney?
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Our AI-generated {documentTitle} is a great starting point, but complex situations may
                benefit from a licensed attorney&apos;s review. Connect with experienced{" "}
                {areaLabels.join(", ")} attorneys in your area.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "Review your AI-generated document before signing",
                  "Provide state-specific advice tailored to your facts",
                  "Represent you if a dispute escalates to court",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <Star className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-sm text-secondary-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact">
                  <Button className="gap-2">
                    Find a {primaryArea} Lawyer <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right: Lawyer CTA placeholder */}
            <div className="w-full shrink-0 lg:w-80">
              <div className="rounded-2xl border-2 border-dashed border-primary/20 bg-background p-6 text-center">
                <Scale className="mx-auto h-10 w-10 text-primary/40" />
                <h3 className="mt-4 font-semibold text-foreground">
                  Are you a {primaryArea} Attorney?
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Advertise your services to clients actively searching for{" "}
                  {areaLabels.join(" and ")} help.{" "}
                  {tier === "premium"
                    ? "High-intent clients. Premium placement available."
                    : tier === "high-value"
                    ? "Targeted placement for serious clients."
                    : "Reach clients at the moment they need legal help."}
                </p>
                <Link href="/contact?type=lawyer-listing" className="mt-5 block">
                  <Button variant="outline" className="w-full gap-2 border-primary/30 text-primary hover:bg-primary/5">
                    List Your Practice <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <p className="mt-3 text-xs text-muted-foreground">
                  No commitment. Cancel anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
