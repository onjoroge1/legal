import { ClipboardList, Cpu, Download, CheckCircle2 } from "lucide-react"

const steps = [
  {
    step: "01",
    icon: ClipboardList,
    title: "Choose Your Document",
    description:
      "Select from 52 guided drafting workflows across common business, property, employment, estate, financial, and personal needs.",
    color: "primary" as const,
  },
  {
    step: "02",
    icon: Cpu,
    title: "Answer Simple Questions",
    description:
      "The questionnaire collects names, dates, choices, and terms in plain language, then places your answers into a structured draft.",
    color: "accent" as const,
  },
  {
    step: "03",
    icon: CheckCircle2,
    title: "Inspect Review Flags",
    description:
      "Check every placeholder, source, and warning. A surfaced source is a review aid, not a legal conclusion or guarantee.",
    color: "primary" as const,
  },
  {
    step: "04",
    icon: Download,
    title: "Download & Review",
    description:
      "Download the draft as Word or PDF and have a licensed attorney in your jurisdiction review it before you rely on or sign it.",
    color: "accent" as const,
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 lg:py-32">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/3 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            How It Works
          </p>
          <h2 className="mt-3 text-balance font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Four Simple Steps to <span className="gradient-text">Your First Draft</span>
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
            Compile a strong starting draft in minutes. Our AI handles the heavy
            lifting; you and your attorney handle the rest.
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const isAccent = step.color === "accent"
            return (
              <div key={step.step} className="relative">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="absolute right-0 top-16 hidden h-px w-full translate-x-1/2 lg:block">
                    <div className="h-full w-full bg-gradient-to-r from-border via-primary/30 to-border" />
                  </div>
                )}
                <div className="relative flex flex-col items-center text-center">
                  {/* Step number badge */}
                  <div className="relative mb-5">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl border ${
                        isAccent
                          ? "border-accent/30 bg-accent/10"
                          : "border-primary/30 bg-primary/10"
                      }`}
                    >
                      <step.icon
                        className={`h-7 w-7 ${isAccent ? "text-accent" : "text-primary"}`}
                      />
                    </div>
                    <div
                      className={`absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                        isAccent
                          ? "bg-accent text-accent-foreground"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      {step.step}
                    </div>
                  </div>

                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
