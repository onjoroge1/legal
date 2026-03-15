"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import {
  Users,
  FileText,
  TrendingUp,
  TrendingDown,
  CreditCard,
  BarChart3,
  ArrowLeft,
  RefreshCw,
  Shield,
  Clock,
  Scale,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface AdminStats {
  overview: {
    totalUsers: number
    usersThisMonth: number
    userGrowth: number
    totalDocuments: number
    documentsThisMonth: number
    docGrowth: number
    paidUsers: number
    conversionRate: number
  }
  subscriptions: Record<string, number>
  recentUsers: Array<{
    id: string
    name: string
    email: string
    subscriptionTier: string
    subscriptionStatus: string
    createdAt: string
    _count: { userDocuments: number }
  }>
  recentDocuments: Array<{
    id: string
    title: string
    type: string
    status: string
    createdAt: string
    user: { name: string; email: string }
  }>
  documentsByType: Array<{
    type: string
    count: number
  }>
}

const tierColors: Record<string, string> = {
  free: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  starter: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  professional: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  enterprise: "bg-purple-500/10 text-purple-400 border-purple-500/20",
}

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/admin")
    }
  }, [status, router])

  const fetchStats = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/admin/stats")
      if (!res.ok) {
        if (res.status === 403) {
          router.push("/")
          return
        }
        throw new Error("Failed to fetch stats")
      }
      const data = await res.json()
      setStats(data)
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      fetchStats()
    }
  }, [status])

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-10 w-10 rounded-xl bg-primary/10 animate-pulse" />
            <div className="h-8 w-48 rounded-lg bg-muted animate-pulse" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="border-border/50 bg-card/50">
                <CardContent className="p-6">
                  <div className="h-4 w-24 rounded bg-muted animate-pulse mb-3" />
                  <div className="h-8 w-16 rounded bg-muted animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="border-destructive/20 max-w-md">
          <CardContent className="p-8 text-center">
            <p className="text-destructive font-medium">{error}</p>
            <Button onClick={fetchStats} variant="outline" className="mt-4">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!stats) return null

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })

  const formatTime = (dateStr: string) =>
    new Date(dateStr).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40 bg-card/30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Site
              </Link>
            </Button>
            <div className="h-6 w-px bg-border/50" />
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                <Shield className="h-4.5 w-4.5 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">Admin Dashboard</h1>
                <p className="text-xs text-muted-foreground">{session?.user?.email}</p>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={fetchStats} className="gap-2">
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        {/* Overview Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Total Users</p>
                <Users className="h-4 w-4 text-primary" />
              </div>
              <p className="mt-2 text-3xl font-bold text-foreground">
                {stats.overview.totalUsers.toLocaleString()}
              </p>
              <div className="mt-2 flex items-center gap-1.5 text-xs">
                {stats.overview.userGrowth >= 0 ? (
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5 text-destructive" />
                )}
                <span className={stats.overview.userGrowth >= 0 ? "text-emerald-400" : "text-destructive"}>
                  {stats.overview.userGrowth > 0 ? "+" : ""}{stats.overview.userGrowth}%
                </span>
                <span className="text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Documents Generated</p>
                <FileText className="h-4 w-4 text-accent" />
              </div>
              <p className="mt-2 text-3xl font-bold text-foreground">
                {stats.overview.totalDocuments.toLocaleString()}
              </p>
              <div className="mt-2 flex items-center gap-1.5 text-xs">
                {stats.overview.docGrowth >= 0 ? (
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5 text-destructive" />
                )}
                <span className={stats.overview.docGrowth >= 0 ? "text-emerald-400" : "text-destructive"}>
                  {stats.overview.docGrowth > 0 ? "+" : ""}{stats.overview.docGrowth}%
                </span>
                <span className="text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Paid Users</p>
                <CreditCard className="h-4 w-4 text-emerald-400" />
              </div>
              <p className="mt-2 text-3xl font-bold text-foreground">
                {stats.overview.paidUsers.toLocaleString()}
              </p>
              <div className="mt-2 text-xs text-muted-foreground">
                {stats.overview.conversionRate}% conversion rate
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">This Month</p>
                <BarChart3 className="h-4 w-4 text-primary" />
              </div>
              <p className="mt-2 text-3xl font-bold text-foreground">
                {stats.overview.usersThisMonth}
              </p>
              <div className="mt-2 text-xs text-muted-foreground">
                new signups &middot; {stats.overview.documentsThisMonth} docs
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subscription Breakdown + Documents by Type */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Subscription Tiers */}
          <Card className="border-border/50 bg-card/50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base">
                <CreditCard className="h-4 w-4 text-primary" />
                Subscription Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(stats.subscriptions).map(([tier, count]) => {
                const percentage = stats.overview.totalUsers > 0
                  ? Math.round((count / stats.overview.totalUsers) * 100)
                  : 0
                return (
                  <div key={tier} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className={`text-xs capitalize ${tierColors[tier] || tierColors.free}`}>
                        {tier}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{count} users</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-8 text-right">{percentage}%</span>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Top Document Types */}
          <Card className="border-border/50 bg-card/50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base">
                <Scale className="h-4 w-4 text-accent" />
                Documents by Type
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {stats.documentsByType.length > 0 ? (
                stats.documentsByType.slice(0, 8).map((item) => {
                  const maxCount = stats.documentsByType[0]?.count || 1
                  const percentage = Math.round((item.count / maxCount) * 100)
                  return (
                    <div key={item.type} className="flex items-center justify-between">
                      <span className="text-sm text-foreground truncate max-w-[200px]">{item.type}</span>
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-accent transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground w-8 text-right">{item.count}</span>
                      </div>
                    </div>
                  )
                })
              ) : (
                <p className="text-sm text-muted-foreground py-4 text-center">No documents yet</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Users + Recent Documents */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Recent Users */}
          <Card className="border-border/50 bg-card/50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base">
                <Users className="h-4 w-4 text-primary" />
                Recent Signups
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats.recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between rounded-lg border border-border/40 bg-secondary/20 px-4 py-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 ml-4">
                      <Badge variant="outline" className={`text-xs capitalize ${tierColors[user.subscriptionTier] || tierColors.free}`}>
                        {user.subscriptionTier}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {formatDate(user.createdAt)}
                      </div>
                    </div>
                  </div>
                ))}
                {stats.recentUsers.length === 0 && (
                  <p className="text-sm text-muted-foreground py-4 text-center">No users yet</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Documents */}
          <Card className="border-border/50 bg-card/50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-4 w-4 text-accent" />
                Recent Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats.recentDocuments.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between rounded-lg border border-border/40 bg-secondary/20 px-4 py-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground truncate">{doc.title || doc.type}</p>
                      <p className="text-xs text-muted-foreground truncate">{doc.user.email}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 ml-4">
                      <Badge variant="outline" className="text-xs">
                        {doc.status}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {formatTime(doc.createdAt)}
                      </div>
                    </div>
                  </div>
                ))}
                {stats.recentDocuments.length === 0 && (
                  <p className="text-sm text-muted-foreground py-4 text-center">No documents yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
