"use client"

import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Session } from "next-auth"

interface DashboardHeaderProps {
  user: NonNullable<Session["user"]>
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || user.email?.[0].toUpperCase() || "U"

  return (
    <div className="flex items-center justify-between border-b bg-background px-4 py-4 md:px-8">
      <div className="flex-1">
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back{user.name ? `, ${user.name.split(" ")[0]}` : ""}!
        </h1>
        <p className="text-sm text-muted-foreground">
          Here's what's happening with your documents today.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-[200px] pl-8"
            />
          </div>
        </div>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary"></span>
        </Button>

        <Avatar>
          <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}




