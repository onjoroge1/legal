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
    title: "AI-Powered Generation",
    description:
      "Our advanced AI understands legal terminology and structure, generating documents that read like they were drafted by experienced attorneys.",
    color: "primary" as const,
  },
  {
    icon: Shield,
    title: "State-Specific Compliance",
    description:
      "Every document automatically adapts to your state's legal requirements. From California to New York, we keep up with changing regulations.",
    color: "accent" as const,
  },
  {
    icon: Clock,
    title: "Ready in Minutes",
    description:
      "No more waiting days for document preparation. Answer a few simple questions and receive your professionally formatted document instantly.",
    color: "primary" as const,
  },
  {
    icon: Globe,
    title: "All 50 States Covered",
    description:
      "Our legal database covers all 50 US states, ensuring your documents comply with local, state, and federal requirements wherever you operate.",
    color: "accent" as const,
  },
  {
    icon: Lock,
    title: "Bank-Level Security",
    description:
      "Your sensitive legal information is protected with 256-bit encryption, SOC 2 compliance, and strict data privacy protocols.",
    color: "primary" as const,
  },
  {
    icon: RefreshCw,
    title: "Always Up-to-Date",
    description:
      "Our legal team continuously updates templates to reflect the latest legislative changes, ensuring ongoing compliance for all documents.",
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
            Built for <span className="gradient-text">Legal Precision</span>
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
            Every feature is designed to make legal document creation faster,
            more accurate, and fully compliant.
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
