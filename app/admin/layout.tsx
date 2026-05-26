import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Scale, Users, ShieldCheck } from "lucide-react"

async function getIsAdmin(email: string): Promise<boolean> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { isAdmin: true },
    })
    return user?.isAdmin ?? false
  } catch {
    return false
  }
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    redirect("/login")
  }

  const isAdmin = await getIsAdmin(session.user.email)

  if (!isAdmin) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-border bg-card flex flex-col">
        <div className="flex items-center gap-2 px-5 py-5 border-b border-border">
          <Scale className="h-5 w-5 text-primary" />
          <span className="font-semibold text-sm tracking-wide">Admin</span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          <Link
            href="/admin/lawyers"
            className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            <Users className="h-4 w-4 text-muted-foreground" />
            Lawyers
          </Link>
          <Link
            href="/admin/facts"
            className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
            Verified Facts
          </Link>
        </nav>
        <div className="px-5 py-4 border-t border-border">
          <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
        </div>
      </aside>

      {/* Main area */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
