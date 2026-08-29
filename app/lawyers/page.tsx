import Link from "next/link"
import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Scale,
  MapPin,
  ShieldCheck,
  Star,
  ArrowRight,
  UserRound,
  Briefcase,
} from "lucide-react"
import { prisma } from "@/lib/prisma"
import { getPracticeLabel } from "@/lib/lawyer-utils"
import { LawyerFilters } from "./lawyer-filters"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Find a Lawyer — Attorney Directory | LegalLawDocs.com",
  description:
    "Browse submitted attorney advertising profiles by practice area and state. Independently verify credentials, license status, fees, and fit before hiring.",
  keywords: [
    "find a lawyer",
    "attorney directory",
    "lawyer near me",
    "hire an attorney",
    "business lawyer",
    "estate planning attorney",
    "real estate lawyer",
  ],
  alternates: { canonical: "https://legallawdocs.com/lawyers" },
  openGraph: {
    type: "website",
    url: "https://legallawdocs.com/lawyers",
    title: "Find a Lawyer — Attorney Directory | LegalLawDocs.com",
    description:
      "Browse submitted attorney advertising profiles. LegalLawDocs does not recommend, endorse, or guarantee any listed professional.",
    siteName: "LegalLawDocs.com",
  },
}

interface PageProps {
  searchParams: Promise<{ q?: string; practiceArea?: string; state?: string }>
}

interface LawyerCard {
  id: string
  slug: string
  name: string
  firmName: string | null
  tagline: string | null
  photoUrl: string | null
  city: string | null
  stateAbbr: string | null
  practiceAreas: string[]
  featured: boolean
  verified: boolean
  tier: string
}

async function getLawyers(
  q: string,
  practiceArea: string,
  state: string
): Promise<LawyerCard[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: Record<string, any> = { active: true }

  if (q) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { firmName: { contains: q, mode: "insensitive" } },
    ]
  }

  if (practiceArea) {
    where.practiceAreas = { has: practiceArea }
  }

  if (state) {
    where.licensedStates = { has: state }
  }

  return prisma.lawyerListing.findMany({
    where,
    orderBy: [{ featured: "desc" }, { createdAt: "asc" }],
    select: {
      id: true,
      slug: true,
      name: true,
      firmName: true,
      tagline: true,
      photoUrl: true,
      city: true,
      stateAbbr: true,
      practiceAreas: true,
      featured: true,
      verified: true,
      tier: true,
    },
  })
}

function LawyerAvatar({
  name,
  photoUrl,
}: {
  name: string
  photoUrl: string | null
}) {
  if (photoUrl) {
    return (
      <img
        src={photoUrl}
        alt={name}
        className="h-16 w-16 rounded-full object-cover ring-2 ring-border/50"
      />
    )
  }
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-lg font-bold text-primary">
      {initials}
    </div>
  )
}

export default async function LawyersPage({ searchParams }: PageProps) {
  const params = await searchParams
  const q = params.q?.trim() ?? ""
  const practiceArea = params.practiceArea ?? ""
  const state = params.state ?? ""

  const lawyers = await getLawyers(q, practiceArea, state)
  const hasFilters = Boolean(q || practiceArea || state)

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border/40 py-16 lg:py-24">
          <div className="pointer-events-none absolute inset-0 grid-pattern animate-grid-fade" />
          <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
          <div className="pointer-events-none absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="flex items-center justify-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                  <Scale className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                  Attorney Directory
                </p>
              </div>
              <h1 className="mt-4 font-serif text-4xl font-bold text-foreground md:text-5xl">
                Find a <span className="gradient-text">Lawyer</span>
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Browse advertising profiles submitted for the directory. Confirm credentials and
                license status with the relevant bar or licensing authority before hiring anyone.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Badge
                  variant="outline"
                  className="gap-1 border-primary/30 bg-primary/10 text-primary"
                >
                  <ShieldCheck className="h-3 w-3" />
                  Advertising Profiles
                </Badge>
                <Badge
                  variant="outline"
                  className="gap-1 border-border/60 text-muted-foreground"
                >
                  Filter by Location
                </Badge>
                <Badge
                  variant="outline"
                  className="gap-1 border-border/60 text-muted-foreground"
                >
                  <Briefcase className="h-3 w-3" />
                  Filter by Practice Area
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Filter bar */}
        <section className="sticky top-0 z-10 border-b border-border/40 bg-background/95 py-4 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <Suspense fallback={<div className="h-10 animate-pulse rounded-lg bg-muted" />}>
              <LawyerFilters
                currentQ={q}
                currentPracticeArea={practiceArea}
                currentState={state}
              />
            </Suspense>
          </div>
        </section>

        {/* Results */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            {lawyers.length > 0 ? (
              <>
                <p className="mb-8 text-sm text-muted-foreground">
                  {lawyers.length} attorney{lawyers.length !== 1 ? "s" : ""}{" "}
                  {hasFilters ? "matching your search" : "in our directory"}
                </p>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {lawyers.map((lawyer: LawyerCard) => (
                    <div
                      key={lawyer.id}
                      className="group relative flex flex-col rounded-2xl border border-border/50 bg-card/80 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                    >
                      {/* Badges row */}
                      <div className="mb-4 flex items-center gap-2">
                        {lawyer.featured && (
                          <Badge className="gap-1 border-primary/30 bg-primary/10 text-xs text-primary" variant="outline">
                            <Star className="h-2.5 w-2.5" />
                            Featured
                          </Badge>
                        )}
                        {lawyer.verified && (
                          <Badge className="gap-1 border-accent/30 bg-accent/10 text-xs text-accent" variant="outline">
                            <ShieldCheck className="h-2.5 w-2.5" />
                            Profile Reviewed
                          </Badge>
                        )}
                      </div>

                      {/* Avatar + name */}
                      <div className="flex items-start gap-4">
                        <LawyerAvatar
                          name={lawyer.name}
                          photoUrl={lawyer.photoUrl}
                        />
                        <div className="min-w-0 flex-1">
                          <h2 className="truncate font-semibold text-foreground">
                            {lawyer.name}
                          </h2>
                          {lawyer.firmName && (
                            <p className="truncate text-sm text-muted-foreground">
                              {lawyer.firmName}
                            </p>
                          )}
                          {(lawyer.city || lawyer.stateAbbr) && (
                            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3 shrink-0" />
                              <span className="truncate">
                                {[lawyer.city, lawyer.stateAbbr]
                                  .filter(Boolean)
                                  .join(", ")}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Tagline */}
                      {lawyer.tagline && (
                        <p className="mt-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                          {lawyer.tagline}
                        </p>
                      )}

                      {/* Practice area badges */}
                      {lawyer.practiceAreas.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {lawyer.practiceAreas.slice(0, 3).map((area: string) => (
                            <Badge
                              key={area}
                              variant="outline"
                              className="border-border/60 text-xs text-muted-foreground"
                            >
                              {getPracticeLabel(area)}
                            </Badge>
                          ))}
                          {lawyer.practiceAreas.length > 3 && (
                            <Badge
                              variant="outline"
                              className="border-border/60 text-xs text-muted-foreground"
                            >
                              +{lawyer.practiceAreas.length - 3} more
                            </Badge>
                          )}
                        </div>
                      )}

                      {/* CTA */}
                      <div className="mt-6 pt-4 border-t border-border/30">
                        <Button asChild className="w-full gap-2" size="sm">
                          <Link href={`/lawyers/${lawyer.slug}`}>
                            View Profile
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              /* Empty state */
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border/50 bg-card">
                  <UserRound className="h-8 w-8 text-muted-foreground" />
                </div>
                <h2 className="mt-6 font-serif text-2xl font-bold text-foreground">
                  {hasFilters ? "No attorneys found" : "No attorneys listed yet"}
                </h2>
                <p className="mt-3 max-w-md text-muted-foreground">
                  {hasFilters
                    ? "Try adjusting your filters or search terms to find attorneys in other areas."
                    : "We're building out our attorney directory. Be among the first lawyers listed on LegalLawDocs.com."}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  {hasFilters && (
                    <Button variant="outline" asChild>
                      <Link href="/lawyers">Clear Filters</Link>
                    </Button>
                  )}
                  <Button asChild>
                    <Link href="/contact?type=lawyer-listing">
                      {hasFilters
                        ? "List Your Practice"
                        : "Be the First Lawyer Listed"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Bottom CTA for attorneys */}
        <section className="border-t border-border/40 bg-secondary/20 py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 lg:p-12">
              <div className="mx-auto max-w-2xl text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Scale className="h-5 w-5 text-primary" />
                  <Badge
                    variant="outline"
                    className="border-primary/30 bg-primary/10 text-primary text-xs"
                  >
                    For Attorneys
                  </Badge>
                </div>
                <h2 className="font-serif text-3xl font-bold text-foreground">
                  Apply for the{" "}
                  <span className="gradient-text">directory pilot</span>
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Apply for a clearly labeled directory profile. Acceptance, placement, pricing,
                  traffic, and reporting are subject to written pilot terms. Leads are not guaranteed.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Button asChild size="lg">
                    <Link href="/contact?type=lawyer-listing">
                      Apply for a Listing
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/documents">Browse Documents</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
