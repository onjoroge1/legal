import { Shield, MapPin, FileCheck, Zap } from "lucide-react"

/**
 * "Why self-help users choose LegalLawDocs" section.
 *
 * Replaces the previous testimonials block, which contained unverifiable
 * customer quotes (a YMYL/E-E-A-T red flag for Google's quality raters on
 * legal sites). When real, verifiable testimonials are available — with
 * named consenting customers and links to LinkedIn or case studies — they
 * can be added back. Until then, we lead with concrete, verifiable claims
 * about what the platform is.
 */
const reasons = [
  {
    icon: MapPin,
    title: "All 50 states covered",
    body:
      "Templates incorporate state-specific statutes and clauses for every U.S. jurisdiction. We update them as state law changes.",
    color: "primary" as const,
  },
  {
    icon: FileCheck,
    title: "Draft → review → sign",
    body:
      "We don't replace your attorney — we compile a strong first draft so the conversation with one starts from a much better place.",
    color: "accent" as const,
  },
  {
    icon: Zap,
    title: "Minutes, not weeks",
    body:
      "A draft NDA, lease, or operating agreement takes under five minutes. Editable Word output means you can iterate however you want.",
    color: "primary" as const,
  },
]

export function TestimonialsSection() {
  return (
    <section className="relative border-t border-border/50 py-24 lg:py-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-card/40 to-background" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Why self-help users choose us
          </p>
          <h2 className="mt-3 text-balance font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            A faster starting line, <span className="gradient-text">not the finish line</span>
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
            LegalLawDocs is an AI-powered document assembly tool. We&apos;re not a law firm and
            we don&apos;t pretend to be. We just produce really good first drafts.
          </p>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {reasons.map((r) => {
            const Icon = r.icon
            const isAccent = r.color === "accent"
            return (
              <div
                key={r.title}
                className="group relative flex flex-col rounded-2xl border border-border/50 bg-card/60 p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 lg:p-8"
              >
                {/* Top accent line */}
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
                      ? "bg-accent/10 text-accent"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="font-serif text-xl font-bold text-foreground">{r.title}</h3>
                <p className="mt-3 flex-1 text-pretty leading-relaxed text-muted-foreground">
                  {r.body}
                </p>
              </div>
            )
          })}
        </div>

        {/* Honest trust footer — no fake numbers */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl border border-border/40 bg-card/40 px-6 py-5 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            Not a law firm. Not a substitute for an attorney.
          </span>
          <span className="hidden md:inline opacity-30">|</span>
          <span>Drafts are AI-generated and should be reviewed before signing.</span>
        </div>
      </div>
    </section>
  )
}
