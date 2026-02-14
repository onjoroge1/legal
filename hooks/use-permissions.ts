"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import type { FeaturePermissions } from "@/lib/permissions"

/**
 * React hook to get user permissions
 */
export function usePermissions() {
  const { data: session } = useSession()
  const [permissions, setPermissions] = useState<FeaturePermissions | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPermissions = async () => {
      if (!session?.user?.email) {
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch("/api/permissions/check")
        if (response.ok) {
          const data = await response.json()
          setPermissions(data.permissions)
        }
      } catch (error) {
        console.error("Error fetching permissions:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPermissions()
  }, [session])

  return { permissions, isLoading }
}

/**
 * React hook to check if user can perform an action
 */
export function useCanPerformAction(action: "generate" | "download" | "preview" | "collaborate" | "customize" | "ai-review") {
  const { data: session } = useSession()
  const [allowed, setAllowed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkPermission = async () => {
      // Allow generate and preview for everyone (including non-logged-in users)
      // Payment will be required at checkout/download stage
      if (action === "generate" || action === "preview") {
        setAllowed(true)
        setIsLoading(false)
        return
      }

      // For other actions, check permissions
      if (!session?.user?.email) {
        setAllowed(false)
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/permissions/check?action=${action}`)
        if (response.ok) {
          const data = await response.json()
          setAllowed(data.allowed)
        }
      } catch (error) {
        console.error("Error checking permission:", error)
        setAllowed(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkPermission()
  }, [session, action])

  return { allowed, isLoading }
}




