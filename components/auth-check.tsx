"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

interface AuthCheckProps {
  children: React.ReactNode
  requireAuth?: boolean
}

/**
 * AuthCheck component - Protects routes that require authentication
 * Redirects to login if user is not authenticated
 */
export default function AuthCheck({ 
  children, 
  requireAuth = true 
}: AuthCheckProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (requireAuth && status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, requireAuth, router])

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  // If auth is required and user is not authenticated, don't render children
  // (redirect will happen in useEffect)
  if (requireAuth && status === "unauthenticated") {
    return null
  }

  return <>{children}</>
}





