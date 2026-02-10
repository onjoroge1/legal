import { FileText, MapPin, ShieldCheck, Timer } from "lucide-react"

const stats = [
  { value: "500K+", label: "Documents Generated", icon: FileText, color: "text-primary" },
  { value: "50", label: "State Jurisdictions", icon: MapPin, color: "text-accent" },
  { value: "99.7%", label: "Compliance Rate", icon: ShieldCheck, color: "text-primary" },
  { value: "<2 min", label: "Average Generation Time", icon: Timer, color: "text-accent" },
]

export function StatsSection() {
  return (
    <section className="relative border-y border-border/50">
      {/* Subtle gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/3 via-card/80 to-accent/3" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-14 md:grid-cols-4 lg:px-8 lg:py-20">
        {stats.map((stat, i) => (
          <div key={stat.label} className="group flex flex-col items-center gap-3 text-center">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-secondary ${i % 2 === 0 ? "border-primary/20" : "border-accent/20"} border`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <p className={`font-serif text-3xl font-bold md:text-4xl ${stat.color}`}>
              {stat.value}
            </p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
