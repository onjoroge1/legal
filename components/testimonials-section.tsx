import Image from "next/image"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "LegalLawDocs saved our startup thousands in legal fees. We generated our operating agreement, NDAs, and contractor agreements in under an hour.",
    author: "Sarah Chen",
    role: "Founder, TechVenture Inc.",
    avatar: "/images/avatar-sarah.jpg",
    rating: 5,
    color: "primary" as const,
  },
  {
    quote:
      "As a real estate investor, I need lease agreements customized for different states. This platform handles compliance automatically - it's been a game-changer.",
    author: "Marcus Williams",
    role: "Real Estate Investor",
    avatar: "/images/avatar-marcus.jpg",
    rating: 5,
    color: "accent" as const,
  },
  {
    quote:
      "The AI compliance review caught a clause in our employment contract that wasn't valid in New York. That alone saved us from potential litigation.",
    author: "Jennifer Park",
    role: "HR Director, Greenfield Corp.",
    avatar: "/images/avatar-jennifer.jpg",
    rating: 5,
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
            Testimonials
          </p>
          <h2 className="mt-3 text-balance font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Trusted by <span className="gradient-text">Thousands</span>
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
            See what our customers have to say about creating legal documents
            with LegalLawDocs.
          </p>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => {
            const isAccent = t.color === "accent"
            return (
              <div
                key={t.author}
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

                <div className="mb-5 flex items-center justify-between">
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={`star-${t.author}-${i}`}
                        className="h-4 w-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <Quote className={`h-8 w-8 ${isAccent ? "text-accent/20" : "text-primary/20"}`} />
                </div>

                <blockquote className="flex-1 text-pretty leading-relaxed text-muted-foreground">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="mt-6 flex items-center gap-4 border-t border-border/50 pt-5">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-primary/20">
                    <Image
                      src={t.avatar || "/placeholder.svg"}
                      alt={t.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{t.author}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
