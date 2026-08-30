import Link from "next/link"
import { notFound } from "next/navigation"
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
  ArrowLeft,
  Phone,
  Globe,
  Mail,
  Briefcase,
  Clock,
  FileText,
} from "lucide-react"
import { prisma } from "@/lib/prisma"
import { documentCatalog, getDocumentPath } from "@/lib/document-catalog"
import { getPracticeLabel, getStateName } from "@/lib/lawyer-utils"
import type { Metadata } from "next"

// Keep dynamic — lawyers can be added at any time
export const dynamic = "force-dynamic"

interface PageProps {
  params: Promise<{ slug: string }>
}

interface LawyerProfile {
  active: boolean
  bio: string
  city: string | null
  email: string
  featured: boolean
  firmName: string | null
  licensedStates: string[]
  name: string
  phone: string | null
  photoUrl: string | null
  practiceAreas: string[]
  stateAbbr: string | null
  tagline: string | null
  verified: boolean
  websiteUrl: string | null
  yearsExperience: number | null
}

async function getLawyer(slug: string): Promise<LawyerProfile | null> {
  return prisma.lawyerListing.findUnique({
    where: { slug },
  })
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const lawyer = await getLawyer(slug)

  if (!lawyer || !lawyer.active) {
    return { title: "Lawyer Not Found | LegalLawDocs.com" }
  }

  const location = [lawyer.city, lawyer.stateAbbr].filter(Boolean).join(", ")
  const description =
    lawyer.tagline ??
    `${lawyer.name}${lawyer.firmName ? ` at ${lawyer.firmName}` : ""}${location ? ` — ${location}` : ""}. View profile, practice areas, and contact information.`

  return {
    title: `${lawyer.name} — Attorney Profile | LegalLawDocs.com`,
    description,
    alternates: {
      canonical: `https://legallawdocs.com/lawyers/${slug}`,
    },
    openGraph: {
      type: "profile",
      url: `https://legallawdocs.com/lawyers/${slug}`,
      title: `${lawyer.name} — Attorney | LegalLawDocs.com`,
      description,
      siteName: "LegalLawDocs.com",
      ...(lawyer.photoUrl ? { images: [{ url: lawyer.photoUrl }] } : {}),
    },
  }
}

/** Obfuscate email: split at @ to make scraping harder */
function ObfuscatedEmail({ email }: { email: string }) {
  const [user, domain] = email.split("@")
  return (
    <a
      href={`mailto:${email}`}
      className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
    >
      <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
      <span>
        {user}
        <span>&#64;</span>
        {domain}
      </span>
    </a>
  )
}

function LawyerAvatar({
  name,
  photoUrl,
  size = "lg",
}: {
  name: string
  photoUrl: string | null
  size?: "lg" | "xl"
}) {
  const dim = size === "xl" ? "h-24 w-24 text-3xl" : "h-16 w-16 text-lg"
  if (photoUrl) {
    return (
      <img
        src={photoUrl}
        alt={name}
        className={`${dim} rounded-full object-cover ring-2 ring-border/50`}
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
    <div
      className={`flex ${dim} items-center justify-center rounded-full border border-primary/20 bg-primary/10 font-bold text-primary`}
    >
      {initials}
    </div>
  )
}

export default async function LawyerProfilePage({ params }: PageProps) {
  const { slug } = await params
  const lawyer = await getLawyer(slug)

  if (!lawyer || !lawyer.active) {
    notFound()
  }

  // Find documents from the catalog that share at least one practice area
  const relatedDocs = documentCatalog
    .filter((doc) =>
      doc.practiceAreas.some((area) => lawyer.practiceAreas.includes(area)),
    )
    .slice(0, 6)

  const location = [lawyer.city, lawyer.stateAbbr].filter(Boolean).join(", ")

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Breadcrumb-style nav */}
        <div className="border-b border-border/30 bg-secondary/20">
          <div className="mx-auto max-w-7xl px-4 py-3 lg:px-8">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link
                href="/lawyers"
                className="hover:text-foreground transition-colors"
              >
                Lawyers
              </Link>
              <span>/</span>
              <span className="text-foreground">{lawyer.name}</span>
            </nav>
          </div>
        </div>

        {/* Profile header banner */}
        <section className="relative overflow-hidden border-b border-border/40 py-12">
          <div className="pointer-events-none absolute inset-0 grid-pattern animate-grid-fade opacity-50" />
          <div className="pointer-events-none absolute -left-40 top-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
              <LawyerAvatar
                name={lawyer.name}
                photoUrl={lawyer.photoUrl}
                size="xl"
              />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {lawyer.featured && (
                    <Badge
                      variant="outline"
                      className="gap-1 border-primary/30 bg-primary/10 text-xs text-primary"
                    >
                      <Star className="h-2.5 w-2.5" />
                      Featured
                    </Badge>
                  )}
                  {lawyer.verified && (
                    <Badge
                      variant="outline"
                      className="gap-1 border-accent/30 bg-accent/10 text-xs text-accent"
                    >
                      <ShieldCheck className="h-2.5 w-2.5" />
                      Profile Reviewed
                    </Badge>
                  )}
                </div>
                <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                  {lawyer.name}
                </h1>
                {lawyer.firmName && (
                  <p className="mt-1 text-lg text-muted-foreground">
                    {lawyer.firmName}
                  </p>
                )}
                {location && (
                  <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 shrink-0" />
                    <span>{location}</span>
                  </div>
                )}
                {lawyer.tagline && (
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground max-w-2xl">
                    {lawyer.tagline}
                  </p>
                )}
                <p className="mt-4 max-w-2xl text-xs leading-relaxed text-muted-foreground">
                  This is an advertising profile. &ldquo;Profile Reviewed&rdquo; means the listing
                  received an administrative review; it is not an endorsement or a guarantee of
                  identity, licensing, experience, availability, outcome, or fees. Verify directly
                  with the relevant licensing authority before hiring.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main content */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-3">
              {/* Left column — 2/3 */}
              <div className="lg:col-span-2 space-y-10">
                {/* Bio */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                    About
                  </h2>
                  <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed space-y-4">
                    {lawyer.bio.split("\n\n").map((para: string, i: number) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>

                {/* Practice areas */}
                {lawyer.practiceAreas.length > 0 && (
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-primary" />
                      Practice Areas
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {lawyer.practiceAreas.map((area: string) => (
                        <Badge
                          key={area}
                          variant="outline"
                          className="border-primary/30 bg-primary/5 text-sm text-foreground px-3 py-1"
                        >
                          {getPracticeLabel(area)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Licensed states */}
                {lawyer.licensedStates.length > 0 && (
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <Scale className="h-5 w-5 text-primary" />
                      Licensed States
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {lawyer.licensedStates.map((abbr: string) => (
                        <Badge
                          key={abbr}
                          variant="outline"
                          className="border-border/60 text-sm text-muted-foreground"
                          title={getStateName(abbr)}
                        >
                          {abbr}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Years of experience */}
                {lawyer.yearsExperience != null && (
                  <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/60 px-5 py-4 w-fit">
                    <Clock className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
                        Experience
                      </p>
                      <p className="text-lg font-bold text-foreground">
                        {lawyer.yearsExperience}{" "}
                        {lawyer.yearsExperience === 1 ? "year" : "years"}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right column — 1/3 contact card */}
              <div className="space-y-6">
                <div className="rounded-2xl border border-border/50 bg-card/80 p-6 sticky top-24">
                  <h2 className="font-semibold text-foreground mb-5">
                    Contact {lawyer.name.split(" ")[0]}
                  </h2>

                  <div className="space-y-4">
                    {lawyer.phone && (
                      <a
                        href={`tel:${lawyer.phone.replace(/\D/g, "")}`}
                        className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
                      >
                        <Phone className="h-4 w-4 shrink-0 text-muted-foreground" />
                        {lawyer.phone}
                      </a>
                    )}

                    <ObfuscatedEmail email={lawyer.email} />

                    {lawyer.websiteUrl && (
                      <a
                        href={lawyer.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
                      >
                        <Globe className="h-4 w-4 shrink-0 text-muted-foreground" />
                        {lawyer.websiteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                      </a>
                    )}
                  </div>

                  <div className="mt-6 border-t border-border/30 pt-5 space-y-3">
                    <Button
                      asChild
                      className="w-full"
                      size="lg"
                    >
                      <a href={`mailto:${lawyer.email}`}>
                        Get a Consultation
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>

                    {lawyer.websiteUrl && (
                      <Button asChild variant="outline" className="w-full">
                        <a
                          href={lawyer.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Globe className="mr-2 h-4 w-4" />
                          Visit Website
                        </a>
                      </Button>
                    )}
                  </div>

                  <p className="mt-4 text-xs text-muted-foreground text-center">
                    Contact this attorney directly. LegalLawDocs.com does not
                    provide legal advice.
                  </p>
                </div>

                {/* Back link */}
                <div>
                  <Link
                    href="/lawyers"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Find more lawyers
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related documents */}
        {relatedDocs.length > 0 && (
          <section className="border-t border-border/40 bg-secondary/20 py-16">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="mb-10">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                  Relevant Documents
                </p>
                <h2 className="mt-2 font-serif text-2xl font-bold text-foreground md:text-3xl">
                  Documents {lawyer.name.split(" ")[0]} can help with
                </h2>
                <p className="mt-3 text-muted-foreground">
                  These legal documents align with this attorney&apos;s practice
                  areas.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedDocs.map((doc) => {
                  const DocIcon = doc.icon
                  const isAccent = doc.color === "accent"
                  return (
                    <Link
                      key={doc.slug}
                      href={getDocumentPath(doc)}
                      className="group flex items-start gap-4 rounded-2xl border border-border/50 bg-card/80 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${isAccent ? "border border-accent/20 bg-accent/10" : "border border-primary/20 bg-primary/10"}`}
                      >
                        <DocIcon
                          className={`h-5 w-5 ${isAccent ? "text-accent" : "text-primary"}`}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-foreground text-sm leading-snug">
                          {doc.title}
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                          {doc.description}
                        </p>
                      </div>
                      <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:text-primary group-hover:opacity-100" />
                    </Link>
                  )
                })}
              </div>

              <div className="mt-8 text-center">
                <Button asChild variant="outline">
                  <Link href="/documents">
                    <FileText className="mr-2 h-4 w-4" />
                    Browse All Documents
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Back to directory CTA */}
        <section className="border-t border-border/40 py-12">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
            <p className="text-muted-foreground mb-4">
              Looking for a different attorney?
            </p>
            <Button asChild variant="outline" size="lg">
              <Link href="/lawyers">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Lawyer Directory
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
