"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Plus, HardDrive, Crown } from "lucide-react"

interface DashboardStatsProps {
  totalDocuments: number
  recentDocuments: number
  storageUsed: number
  subscription: {
    type: string
    status: string
  }
}

export default function DashboardStats({
  totalDocuments,
  recentDocuments,
  storageUsed,
  subscription,
}: DashboardStatsProps) {
  const storagePercentage = (storageUsed / 100) * 100 // Assuming 100GB total for now

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
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

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
          <HardDrive className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{storageUsed}%</div>
          <p className="text-xs text-muted-foreground">
            {storagePercentage.toFixed(1)} GB of 100 GB used
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Subscription</CardTitle>
          <Crown className={`h-4 w-4 ${subscription.status === "active" ? "text-accent" : "text-muted-foreground"}`} />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold capitalize ${subscription.status === "active" ? "text-accent" : ""}`}>
            {subscription.type === "free" ? "Free" : subscription.type}
          </div>
          <p className={`text-xs ${subscription.status === "active" ? "text-accent" : "text-muted-foreground"}`}>
            {subscription.status === "active" ? "Active subscription" : "No active subscription"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
          <Plus className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Create</div>
          <p className="text-xs text-muted-foreground">
            New document or template
          </p>
        </CardContent>
      </Card>
    </div>
  )
}


