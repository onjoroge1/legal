"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Search, FilePlus } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { signOut } from "next-auth/react"
import { User } from "next-auth"

interface DashboardHeaderProps {
  user: User
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (searchQuery.trim()) {
      toast({
        title: "Search initiated",
        description: `Searching for "${searchQuery}"...`,
      })

      // In a real app, this would trigger a search API call
      // For now, we'll just clear the search field after a delay
      setTimeout(() => {
        setSearchQuery("")
      }, 2000)
    }
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {user.name || user.email}</h1>
        <p className="text-muted-foreground">Manage your legal documents and templates</p>
      </div>
      <div className="flex items-center gap-2">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search documents..."
            className="w-full rounded-md pl-8 md:w-[200px] lg:w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        <Button variant="outline" size="icon">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button asChild>
          <Link href="/dashboard/create">
            <FilePlus className="mr-2 h-4 w-4" />
            New Document
          </Link>
        </Button>
        <Button variant="outline" onClick={() => signOut()}>
          Sign Out
        </Button>
      </div>
    </div>
  )
}

