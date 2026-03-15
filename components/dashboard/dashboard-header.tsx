"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { User } from "next-auth"

interface DashboardHeaderProps {
  user: User
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [unreadCount, setUnreadCount] = useState(0)

  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || user.email?.[0].toUpperCase() || "U"

  // Fetch unread notification count
  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const response = await fetch("/api/notifications")
        if (response.ok) {
          const data = await response.json()
          const unread = (data.notifications || []).filter((n: any) => !n.read).length
          setUnreadCount(unread)
        }
      } catch {
        // Silently fail - notification count is non-critical
      }
    }
    fetchUnreadCount()
  }, [])

  // Navigate to documents page with search query on Enter
  const handleSearch = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && searchQuery.trim()) {
        router.push(`/dashboard/documents?search=${encodeURIComponent(searchQuery.trim())}`)
      }
    },
    [searchQuery, router]
  )

  return (
    <div className="flex items-center justify-between border-b bg-background px-4 py-4 md:px-8">
      <div className="flex-1">
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back{user.name ? `, ${user.name.split(" ")[0]}` : ""}!
        </h1>
        <p className="text-sm text-muted-foreground">
          Here&apos;s what&apos;s happening with your documents today.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search documents..."
              className="w-[200px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
        </div>

        <Button variant="ghost" size="icon" className="relative" asChild>
          <Link href="/dashboard/notifications">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </Link>
        </Button>

        <Avatar>
          <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
