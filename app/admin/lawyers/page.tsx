import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import LawyersTable from "./lawyers-table"

interface SearchParams {
  q?: string
}

async function getLawyers(q?: string) {
  const where = q
    ? {
        OR: [
          { name: { contains: q, mode: "insensitive" as const } },
          { email: { contains: q, mode: "insensitive" as const } },
        ],
      }
    : {}

  return prisma.lawyerListing.findMany({
    where,
    orderBy: { createdAt: "desc" },
  })
}

export default async function AdminLawyersPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect("/login")

  const params = await searchParams
  const q = params.q ?? ""
  const lawyers = await getLawyers(q || undefined)

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Lawyer Listings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {lawyers.length} listing{lawyers.length !== 1 ? "s" : ""}
            {q ? ` matching "${q}"` : ""}
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/lawyers/new">
            <Plus className="h-4 w-4 mr-1.5" />
            Add Lawyer
          </Link>
        </Button>
      </div>

      <LawyersTable lawyers={lawyers} currentQ={q} />
    </div>
  )
}
