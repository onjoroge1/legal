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
  console.log("[Dashboard] Component mounting")
  const { data: session, status } = useSession()
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    console.log("[Dashboard] useEffect triggered with status:", status)
    console.log("[Dashboard] Current session:", session)
    
    let mounted = true

    const fetchDashboardData = async () => {
      try {
        console.log("[Dashboard] Fetching dashboard data from /api/dashboard")
        const response = await fetch('/api/dashboard')
        console.log("[Dashboard] Dashboard data response status:", response.status)
        
        if (!response.ok) {
          if (response.status === 401) {
            console.log("[Dashboard] Unauthorized, redirecting to login")
            router.replace('/login')
            return
          }
          throw new Error('Failed to fetch dashboard data')
        }
        const dashboardData = await response.json()
        console.log("[Dashboard] Dashboard data received:", dashboardData)
        if (mounted) {
          setData(dashboardData)
        }
      } catch (error) {
        console.error('[Dashboard] Error fetching dashboard data:', error)
        if (mounted) {
          setError('Failed to load dashboard data')
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    if (status === "authenticated") {
      console.log("[Dashboard] Session authenticated, starting data fetch")
      fetchDashboardData()
    } else if (status === "unauthenticated") {
      console.log("[Dashboard] Session unauthenticated, redirecting to login")
      router.replace('/login')
    } else if (status === "loading") {
      console.log("[Dashboard] Session status is loading")
    }

    return () => {
      console.log("[Dashboard] Component unmounting")
      mounted = false
    }
  }, [router, status, session])

  console.log("[Dashboard] Current render state:", { status, loading, error, hasSession: !!session?.user })

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500">Error loading dashboard</h2>
          <p className="text-muted-foreground">{error}</p>
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
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader user={session.user} />
      <DashboardStats
        totalDocuments={data?.totalDocuments || 0}
        recentDocuments={data?.documentsCreated || 0}
        storageUsed={data?.storage.used || 0}
        subscription={data?.subscription.type || "Free"}
      />
      <RecentDocuments documents={data?.recentDocuments || []} />
    </div>
  )
}

