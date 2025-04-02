"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, Settings } from "lucide-react"
import { toast } from "sonner"

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
      return
    }

    if (status === "authenticated") {
      checkAdminStatus()
    }
  }, [status, router])

  const checkAdminStatus = async () => {
    try {
      const response = await fetch("/api/admin/check")
      if (!response.ok) {
        throw new Error("Failed to check admin status")
      }
      const data = await response.json()
      setIsAdmin(data.isAdmin)
      
      if (!data.isAdmin) {
        toast.error("You don't have permission to access this page")
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Error checking admin status:", error)
      toast.error("Failed to verify admin status")
      router.push("/dashboard")
    }
  }

  if (status === "loading" || isAdmin === null) {
    return <div className="p-8">Loading...</div>
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Management
            </CardTitle>
            <CardDescription>
              Manage user accounts and permissions
            </CardDescription>
              </CardHeader>
              <CardContent>
            <Button onClick={() => router.push("/admin/users")}>
              Manage Users
            </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Template Management
            </CardTitle>
            <CardDescription>
              Manage document templates and fields
            </CardDescription>
                </CardHeader>
                <CardContent>
            <Button onClick={() => router.push("/admin/templates")}>
              Manage Templates
            </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              System Settings
            </CardTitle>
            <CardDescription>
              Configure system-wide settings
            </CardDescription>
                </CardHeader>
                <CardContent>
            <Button onClick={() => router.push("/admin/settings")}>
              Configure Settings
            </Button>
                </CardContent>
              </Card>
            </div>
      </div>
  )
}

