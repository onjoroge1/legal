"use client"

import { ReactNode } from "react"
import { useCanPerformAction } from "@/hooks/use-permissions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock } from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"

interface PermissionGateProps {
  action: "generate" | "download" | "preview" | "collaborate" | "customize" | "ai-review"
  children: ReactNode
  fallback?: ReactNode
  showUpgradePrompt?: boolean
}

/**
 * PermissionGate component
 * Only renders children if user has permission for the action
 */
export function PermissionGate({
  action,
  children,
  fallback,
  showUpgradePrompt = true,
}: PermissionGateProps) {
  const { data: session } = useSession()
  const { allowed, isLoading } = useCanPerformAction(action)

  if (isLoading) {
    return <div className="animate-pulse">Loading...</div>
  }

  if (!allowed) {
    if (fallback) {
      return <>{fallback}</>
    }

    if (showUpgradePrompt) {
      return (
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Upgrade Required
            </CardTitle>
            <CardDescription>
              This feature requires a paid plan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {action === "generate" && "Generate unlimited documents with a Professional plan"}
                {action === "download" && "Download documents in any format with a paid plan"}
                {action === "preview" && "Preview documents with any plan"}
                {action === "collaborate" && "Collaborate on documents with a Professional plan"}
                {action === "customize" && "Customize documents with a paid plan"}
                {action === "ai-review" && "Get AI-powered document review with a paid plan"}
              </p>
              <div className="flex gap-2">
                <Button asChild>
                  <Link href="/dashboard/billing">View Plans</Link>
                </Button>
                {!session && (
                  <Button variant="outline" asChild>
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )
    }

    return null
  }

  return <>{children}</>
}




