"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import {
  LayoutDashboard,
  FileText,
  FilePlus,
  Settings,
  Users,
  CreditCard,
  HelpCircle,
  FileIcon as FileTemplate,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
// Import the LogoutButton component
import LogoutButton from "@/components/logout-button"
import { useEffect, useState } from "react"

interface Subscription {
  tier: string
  status: string
}

export default function DashboardSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [subscription, setSubscription] = useState<Subscription | null>(null)

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const response = await fetch("/api/billing/subscription")
        const data = await response.json()
        setSubscription(data.subscription)
      } catch (error) {
        console.error("Error fetching subscription:", error)
      }
    }

    if (session?.user) {
      fetchSubscription()
    }
  }, [session])

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "My Documents",
      icon: FileText,
      href: "/dashboard/documents",
      active: pathname === "/dashboard/documents",
    },
    {
      label: "Templates",
      icon: FileTemplate,
      href: "/dashboard/templates",
      active: pathname === "/dashboard/templates",
    },
    {
      label: "Create New",
      icon: FilePlus,
      href: "/dashboard/create",
      active: pathname === "/dashboard/create",
    },
    {
      label: "Team Members",
      icon: Users,
      href: "/dashboard/team",
      active: pathname === "/dashboard/team",
    },
    {
      label: "Billing",
      icon: CreditCard,
      href: "/dashboard/billing",
      active: pathname === "/dashboard/billing",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      active: pathname === "/dashboard/settings",
    },
  ]

  // Get user's initials from their name
  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  // Format subscription tier for display
  const formatSubscriptionTier = (tier: string | undefined) => {
    if (!tier) return "Free Plan"
    return `${tier.charAt(0).toUpperCase() + tier.slice(1)} Plan`
  }

  return (
    <div className="hidden border-r bg-background md:block w-64">
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg text-primary">
            LegalLawDocs.com
          </Link>
        </div>
        <ScrollArea className="flex-1 py-2">
          <nav className="grid gap-1 px-2">
            {routes.map((route, i) => (
              <Button key={i} variant={route.active ? "secondary" : "ghost"} className="justify-start" asChild>
                <Link href={route.href}>
                  <route.icon className="mr-2 h-4 w-4" />
                  {route.label}
                </Link>
              </Button>
            ))}
          </nav>
        </ScrollArea>
        <div className="border-t p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="rounded-full h-8 w-8 bg-primary/10 flex items-center justify-center text-primary font-medium">
              {getInitials(session?.user?.name)}
            </div>
            <div>
              <p className="text-sm font-medium">{session?.user?.name || "User"}</p>
              <p className="text-xs text-muted-foreground">{formatSubscriptionTier(subscription?.tier)}</p>
            </div>
          </div>
          <div className="grid gap-1">
            <Button variant="ghost" size="sm" className="justify-start">
              <HelpCircle className="mr-2 h-4 w-4" />
              Help & Support
            </Button>
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  )
}

