"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Bell, FileText, CreditCard, Users, Loader2, CheckCheck, Inbox } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Notification {
  id: string
  type: "document" | "billing" | "team" | "system"
  title: string
  message: string
  link?: string
  read: boolean
  readAt: string | null
  createdAt: string
}

const typeIcons: Record<Notification["type"], React.ElementType> = {
  document: FileText,
  billing: CreditCard,
  team: Users,
  system: Bell,
}

const typeLabels: Record<Notification["type"], string> = {
  document: "Document",
  billing: "Billing",
  team: "Team",
  system: "System",
}

export default function NotificationsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isMarkingAll, setIsMarkingAll] = useState(false)

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await fetch("/api/notifications")
      if (!response.ok) throw new Error("Failed to fetch notifications")
      const data = await response.json()
      setNotifications(data.notifications)
    } catch (error) {
      console.error("Error fetching notifications:", error)
      toast({
        title: "Error",
        description: "Failed to load notifications",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  useEffect(() => {
    fetchNotifications()
  }, [fetchNotifications])

  const handleMarkAllRead = async () => {
    setIsMarkingAll(true)
    try {
      const response = await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markAllRead: true }),
      })

      if (!response.ok) throw new Error("Failed to mark all as read")

      setNotifications((prev) =>
        prev.map((n) => ({ ...n, read: true, readAt: new Date().toISOString() }))
      )

      toast({
        title: "Success",
        description: "All notifications marked as read",
      })
    } catch (error) {
      console.error("Error marking all as read:", error)
      toast({
        title: "Error",
        description: "Failed to mark all as read",
        variant: "destructive",
      })
    } finally {
      setIsMarkingAll(false)
    }
  }

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.read) {
      try {
        const response = await fetch("/api/notifications", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ notificationId: notification.id }),
        })

        if (response.ok) {
          setNotifications((prev) =>
            prev.map((n) =>
              n.id === notification.id
                ? { ...n, read: true, readAt: new Date().toISOString() }
                : n
            )
          )
        }
      } catch (error) {
        console.error("Error marking notification as read:", error)
      }
    }

    if (notification.link) {
      router.push(notification.link)
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  if (isLoading) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading notifications...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            Stay up to date with your documents, billing, and team activity
          </p>
        </div>
        {unreadCount > 0 && (
          <Button
            variant="outline"
            onClick={handleMarkAllRead}
            disabled={isMarkingAll}
            className="gap-2"
          >
            {isMarkingAll ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <CheckCheck className="h-4 w-4" />
            )}
            Mark all as read
            <Badge variant="secondary" className="ml-1">
              {unreadCount}
            </Badge>
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="rounded-full bg-muted p-6 mb-4">
              <Inbox className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No notifications</h3>
            <p className="text-muted-foreground text-center max-w-sm">
              You're all caught up! We'll notify you when there are updates to your
              documents, billing, or team activity.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>All Notifications</CardTitle>
            <CardDescription>
              {unreadCount > 0
                ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`
                : "All notifications have been read"}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {notifications.map((notification, index) => {
                const Icon = typeIcons[notification.type]
                return (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`flex items-start gap-4 p-4 cursor-pointer transition-colors hover:bg-muted/50 ${
                      !notification.read ? "bg-blue-50/50 dark:bg-blue-950/10" : ""
                    }`}
                  >
                    <div className="relative mt-1">
                      <div
                        className={`rounded-full p-2 ${
                          !notification.read
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      {!notification.read && (
                        <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-blue-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-sm ${
                              !notification.read ? "font-semibold" : "font-medium"
                            }`}
                          >
                            {notification.title}
                          </p>
                          <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                            {notification.message}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <Badge variant="outline" className="text-xs">
                            {typeLabels[notification.type]}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(new Date(notification.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
