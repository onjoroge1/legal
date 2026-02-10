import { Shield, Scale, FileCheck, Lock } from "lucide-react"

const badges = [
  { icon: Shield, label: "Attorney-Drafted Templates", color: "text-primary" },
  { icon: Scale, label: "State-Compliant", color: "text-accent" },
  { icon: FileCheck, label: "AI Compliance Review", color: "text-primary" },
  { icon: Lock, label: "SOC 2 Type II Certified", color: "text-accent" },
]

export function ComplianceBanner() {
  return (
    <section className="relative overflow-hidden border-y border-border/40 py-10">
      {/* Gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/5 via-card to-accent/5" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {badges.map((badge) => (
            <div key={badge.label} className="flex items-center gap-3 rounded-full border border-border/50 bg-card/80 px-5 py-2.5 backdrop-blur-sm">
              <badge.icon className={`h-4 w-4 ${badge.color}`} />
              <span className="text-sm font-medium text-secondary-foreground">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
