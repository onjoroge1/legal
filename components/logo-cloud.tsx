const useCases = [
  "Business agreements",
  "Employment documents",
  "Real estate drafts",
  "Estate planning",
  "Legal letters",
  "Personal documents",
]

export function LogoCloud() {
  return (
    <section className="py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Drafting tools for common document needs
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {useCases.map((name) => (
            <div
              key={name}
              className="flex items-center gap-2 text-muted-foreground/70"
            >
              <div className="h-2 w-2 rounded-full bg-primary/50" />
              <span className="text-sm font-medium">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
