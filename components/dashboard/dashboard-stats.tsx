import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, FilePlus, BarChart3, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface DashboardStatsProps {
  totalDocuments: number
  recentDocuments: number
  storageUsed: number
  subscription: string
}

export default function DashboardStats({
  totalDocuments,
  recentDocuments,
  storageUsed,
  subscription,
}: DashboardStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalDocuments}</div>
          <p className="text-xs text-muted-foreground">All your documents</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Recent Documents</CardTitle>
          <FilePlus className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{recentDocuments}</div>
          <p className="text-xs text-muted-foreground">Last 30 days</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Subscription</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{subscription}</div>
          <p className="text-xs text-muted-foreground">Current plan</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Upgrade Plan</CardTitle>
          <Sparkles className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {subscription === "Free" ? (
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Unlock premium features</div>
              <Button asChild size="sm" className="w-full">
                <Link href="/dashboard/billing">
                  Upgrade Now
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-2xl font-bold">{storageUsed}%</div>
              <p className="text-xs text-muted-foreground">Storage used</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 