"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Plus, Crown, CalendarClock, AlertTriangle } from "lucide-react"

interface DashboardStatsProps {
  totalDocuments: number
  recentDocuments: number
  subscription: {
    type: string
    status: string
    endDate: string | null
  }
}

export default function DashboardStats({
  totalDocuments,
  recentDocuments,
  subscription,
}: DashboardStatsProps) {
  const isActive = subscription.status === "active"
  const isExpired = subscription.status === "expired"
  const hasSub = subscription.type !== "free"

  // Format renewal/expiry date
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return null
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  const endDateFormatted = formatDate(subscription.endDate)

  // Determine subscription display
  const getSubLabel = () => {
    if (isActive && hasSub) return "Active subscription"
    if (isExpired) return `Expired ${endDateFormatted || ""}`
    if (hasSub && !isActive) return "Inactive"
    return "No active subscription"
  }

  const getSubColor = () => {
    if (isActive && hasSub) return "text-accent"
    if (isExpired) return "text-amber-500"
    return "text-muted-foreground"
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Link href="/dashboard/documents">
        <Card className="cursor-pointer transition-colors hover:bg-muted/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDocuments}</div>
            <p className="text-xs text-muted-foreground">
              {recentDocuments} created this month
            </p>
          </CardContent>
        </Card>
      </Link>

      <Link href="/dashboard/billing">
        <Card className="cursor-pointer transition-colors hover:bg-muted/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscription</CardTitle>
            {isExpired ? (
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            ) : (
              <Crown className={`h-4 w-4 ${isActive && hasSub ? "text-accent" : "text-muted-foreground"}`} />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold capitalize ${getSubColor()}`}>
              {subscription.type === "free" ? "Free" : subscription.type}
            </div>
            <p className={`text-xs ${getSubColor()}`}>
              {getSubLabel()}
            </p>
          </CardContent>
        </Card>
      </Link>

      <Link href="/dashboard/billing">
        <Card className="cursor-pointer transition-colors hover:bg-muted/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {isActive && hasSub ? "Renewal Date" : "Plan"}
            </CardTitle>
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isActive && hasSub && endDateFormatted ? (
              <>
                <div className="text-2xl font-bold text-foreground">{endDateFormatted}</div>
                <p className="text-xs text-muted-foreground">Next billing date</p>
              </>
            ) : isExpired && endDateFormatted ? (
              <>
                <div className="text-2xl font-bold text-amber-500">{endDateFormatted}</div>
                <p className="text-xs text-amber-500">Subscription expired</p>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold text-primary">Upgrade</div>
                <p className="text-xs text-muted-foreground">Get unlimited documents</p>
              </>
            )}
          </CardContent>
        </Card>
      </Link>

      <Link href="/documents">
        <Card className="cursor-pointer transition-colors hover:border-primary hover:bg-primary/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
            <Plus className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">Create</div>
            <p className="text-xs text-muted-foreground">
              New document
            </p>
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}
