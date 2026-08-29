import {
  Brain,
  Shield,
  Clock,
  Globe,
  Lock,
  RefreshCw,
} from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Assisted Drafting",
    description:
      "The drafting assistant organizes your answers into a structured first draft. It can make mistakes, so review every clause and citation.",
    color: "primary" as const,
  },
  {
    icon: Shield,
    title: "Jurisdiction-Aware Questions",
    description:
      "Select a state to surface relevant prompts and drafting notes. This does not establish that the result satisfies current law.",
    color: "accent" as const,
  },
  {
    icon: Clock,
    title: "Guided Workflow",
    description:
      "Answer plain-language questions, preview the assembled draft, and correct details before downloading it for review.",
    color: "primary" as const,
  },
  {
    icon: Globe,
    title: "52 Document Types",
    description:
      "Browse business, employment, real estate, estate planning, financial, personal, and legal-letter drafting workflows.",
    color: "accent" as const,
  },
  {
    icon: Lock,
    title: "Stripe-Hosted Payments",
    description:
      "When payments are enabled, card entry occurs on Stripe-hosted checkout. LegalLawDocs does not receive your full card number.",
    color: "primary" as const,
  },
  {
    icon: RefreshCw,
    title: "Visible Review Flags",
    description:
      "The generator marks unresolved placeholders and citations that need attention instead of presenting them as confirmed legal conclusions.",
    color: "accent" as const,
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 lg:py-32">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-accent/4 blur-[120px]" />
        <div className="absolute left-0 bottom-1/4 h-[300px] w-[300px] rounded-full bg-primary/4 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Platform Features
          </p>
          <h2 className="mt-3 text-balance font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Built for a <span className="gradient-text">Clear Drafting Workflow</span>
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
            Use the software to assemble and revise a draft, then have a licensed attorney
            determine whether it is accurate and appropriate for your situation.
          </p>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const isAccent = feature.color === "accent"
            return (
              <div
                key={feature.title}
                className="group relative rounded-2xl border border-border/50 bg-card/60 p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                {/* Colored top border line */}
                <div
                  className={`absolute inset-x-0 top-0 h-px rounded-t-2xl ${
                    isAccent
                      ? "bg-gradient-to-r from-transparent via-accent/50 to-transparent"
                      : "bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                  }`}
                />
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${
                    isAccent
                      ? "border border-accent/20 bg-accent/10"
                      : "border border-primary/20 bg-primary/10"
                  }`}
                >
                  <feature.icon
                    className={`h-5 w-5 ${isAccent ? "text-accent" : "text-primary"}`}
                  />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
