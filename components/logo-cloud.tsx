const logos = [
  "TechVenture",
  "Greenfield Corp",
  "Atlas Legal",
  "NovaBridge",
  "Meridian Group",
  "Summit Partners",
]

export function LogoCloud() {
  return (
    <section className="py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Trusted by leading companies across the country
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {logos.map((name) => (
            <div
              key={name}
              className="flex items-center gap-2 text-muted-foreground/40 transition-colors hover:text-muted-foreground/70"
            >
              <div className="h-5 w-5 rounded-md bg-muted-foreground/10" />
              <span className="font-serif text-lg font-semibold tracking-tight">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
