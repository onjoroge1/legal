import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

interface Document {
  id: string
  title: string
  type: string
  status: string
  createdAt: string
  updatedAt: string
}

interface DashboardData {
  totalDocuments: number
  documentsCreated: number
  subscription: {
    type: string
    renewalDate: string
  }
  storage: {
    used: number
    total: number
  }
  recentDocuments: Document[]
  recentActivity: {
    id: string
    type: string
    description: string
    date: string
  }[]
}

export function useDashboardData() {
  const { data: session } = useSession()
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchDashboardData() {
      if (!session?.user) return

      try {
        const response = await fetch('/api/dashboard')
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data')
        }
        const dashboardData = await response.json()
        setData(dashboardData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [session])

  return { data, loading, error }
} 