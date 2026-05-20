import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { prisma } from "@/lib/prisma"
import LawyerForm from "../../lawyer-form"

interface EditLawyerPageProps {
  params: Promise<{ id: string }>
}

export default async function EditLawyerPage({ params }: EditLawyerPageProps) {
  const { id } = await params

  const lawyer = await prisma.lawyerListing.findUnique({ where: { id } })

  if (!lawyer) notFound()

  const initialData = {
    name: lawyer.name,
    slug: lawyer.slug,
    email: lawyer.email,
    phone: lawyer.phone ?? "",
    tagline: lawyer.tagline ?? "",
    bio: lawyer.bio,
    firmName: lawyer.firmName ?? "",
    photoUrl: lawyer.photoUrl ?? "",
    websiteUrl: lawyer.websiteUrl ?? "",
    city: lawyer.city ?? "",
    stateAbbr: lawyer.stateAbbr ?? "",
    practiceAreas: lawyer.practiceAreas,
    licensedStates: lawyer.licensedStates,
    yearsExperience: lawyer.yearsExperience?.toString() ?? "",
    featured: lawyer.featured,
    verified: lawyer.verified,
    active: lawyer.active,
    tier: lawyer.tier,
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-6">
        <Link
          href="/admin/lawyers"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Lawyers
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight">Edit: {lawyer.name}</h1>
        <p className="text-sm text-muted-foreground mt-1">/{lawyer.slug}</p>
      </div>
      <LawyerForm initialData={initialData} lawyerId={id} />
    </div>
  )
}
