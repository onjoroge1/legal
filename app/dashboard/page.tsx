"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import DashboardStats from "@/components/dashboard/dashboard-stats"
import RecentDocuments from "@/components/dashboard/recent-documents"
import { useSession } from "next-auth/react"

interface User {
  id: string
  email: string
  name: string | null
}

interface DashboardData {
  totalDocuments: number
  documentsCreated: number
  storage: {
    used: number
    total: number
  }
  subscription: {
    type: string
    status: string
  }
  recentDocuments: Array<{
    id: string
    title: string
    createdAt: string
    type: string
  }>
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    let mounted = true

    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/dashboard', {
          credentials: 'include', // Ensure cookies are sent with the request
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          console.error("[Dashboard] Error response data:", errorData)
          
          if (response.status === 401) {
            router.replace('/login')
            return
          }
          throw new Error(errorData.message || 'Failed to fetch dashboard data')
        }
        const dashboardData = await response.json()
        if (mounted) {
          setData(dashboardData)
        }
      } catch (error) {
        console.error('[Dashboard] Error fetching dashboard data:', error)
        if (mounted) {
          setError(error instanceof Error ? error.message : 'Failed to load dashboard data')
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    if (status === "authenticated") {
      fetchDashboardData()
    } else if (status === "unauthenticated") {
      router.replace('/login')
    }

    return () => {
      mounted = false
    }
  }, [router, status, session])

  if (status === "loading" || loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500">Error loading dashboard</h2>
          <p className="text-muted-foreground mt-2">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  if (!session?.user) {
    return null
  }

  return (
    <div className="flex-1 flex flex-col">
      <DashboardHeader user={session.user} />
      <div className="flex-1 px-4 md:px-8 py-6">
        <DashboardStats
          totalDocuments={data?.totalDocuments || 0}
          recentDocuments={data?.documentsCreated || 0}
          storageUsed={data?.storage.used || 0}
          subscription={data?.subscription || { type: "free", status: "inactive" }}
        />
        <div className="mt-6">
          <RecentDocuments documents={data?.recentDocuments || []} />
        </div>
      </div>
    </div>
  )
}

