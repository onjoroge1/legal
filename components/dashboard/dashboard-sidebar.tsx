"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import {
  LayoutDashboard,
  FileText,
  Settings,
  CreditCard,
  Users,
  LogOut,
  Menu,
  X,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Documents", href: "/dashboard/documents", icon: FileText },
  { name: "Templates", href: "/dashboard/templates", icon: Sparkles },
  { name: "Team", href: "/dashboard/team", icon: Users },
  { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export default function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [displayName, setDisplayName] = useState<string | null>(null)

  // Fetch the current user's name from the database
  useEffect(() => {
    const fetchUserName = async () => {
      if (!session?.user?.email) return

      try {
        const response = await fetch("/api/user/name")
        if (response.ok) {
          const data = await response.json()
          setDisplayName(data.name || (data.firstName && data.lastName 
            ? `${data.firstName} ${data.lastName}`.trim()
            : session?.user?.email || "User"))
        } else {
          // Fallback to session name
          setDisplayName(session?.user?.name || session?.user?.email || "User")
        }
      } catch (error) {
        console.error("Error fetching user name:", error)
        // Fallback to session name
        setDisplayName(session?.user?.name || session?.user?.email || "User")
      }
    }

    fetchUserName()
    
    // Also refetch when session changes
    if (session?.user) {
      fetchUserName()
    }

    // Listen for custom event when user name is updated
    const handleUserNameUpdate = () => {
      fetchUserName()
    }
    
    window.addEventListener("userNameUpdated", handleUserNameUpdate)
    
    return () => {
      window.removeEventListener("userNameUpdated", handleUserNameUpdate)
    }
  }, [session])

  const handleSignOut = async () => {
    try {
      await signOut({ 
        callbackUrl: "/",
        redirect: true 
      })
      // Fallback: manually redirect if signOut doesn't redirect
      router.push("/")
    } catch (error) {
      console.error("Sign out error:", error)
      // Ensure redirect even on error
      router.push("/")
    }
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 border border-primary/30">
            <FileText className="h-4 w-4 text-primary" />
          </div>
          <span className="font-serif text-lg font-bold">
            Legal<span className="text-primary">Law</span>Docs
          </span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="border-t p-4">
        <div className="mb-3 px-3">
          <p className="text-sm font-medium">{displayName || session?.user?.name || session?.user?.email || "User"}</p>
          <p className="text-xs text-muted-foreground">{session?.user?.email}</p>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 border-r bg-background md:flex md:flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" className="fixed left-4 top-4 z-50">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  )
}


