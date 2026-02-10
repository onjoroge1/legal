"use client"

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"
import type { ReactNode } from "react"
import { usePathname } from "next/navigation"

interface SessionProviderProps {
  children: ReactNode
}

/**
 * SessionProvider wrapper component
 * Provides session context to all child components
 * Always wraps children with NextAuthSessionProvider so useSession works everywhere
 * Configures refetch behavior based on route type
 */
export function SessionProvider({ children }: SessionProviderProps) {
  const pathname = usePathname()
  
  // List of public routes that don't need frequent session checks
  const publicRoutes = [
    "/", // Home page
    "/login",
    "/signup",
    "/documents", // Documents listing page
  ]
  
  // Check if current path is a public route
  const isPublicRoute = publicRoutes.includes(pathname || "")
  
  // Check if it's a public document detail page (not generate/checkout/preview/download)
  const isPublicDocumentPage = pathname?.startsWith("/documents/") && 
                                !pathname?.includes("/dashboard") &&
                                !pathname?.includes("/generate") &&
                                !pathname?.includes("/checkout") &&
                                !pathname?.includes("/preview") &&
                                !pathname?.includes("/download")
  
  // Always provide SessionProvider, but configure refetch behavior
  // On public pages, disable automatic refetching to reduce API calls
  // On protected pages, enable refetching for better session management
  const shouldRefetch = !isPublicRoute && !isPublicDocumentPage
  
  return (
    <NextAuthSessionProvider 
      refetchInterval={shouldRefetch ? 0 : 0} 
      refetchOnWindowFocus={shouldRefetch}
    >
      {children}
    </NextAuthSessionProvider>
  )
}

