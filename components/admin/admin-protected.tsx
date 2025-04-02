"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, AlertTriangle } from "lucide-react"

interface AdminProtectedProps {
  children: React.ReactNode
}

export default function AdminProtected({ children }: AdminProtectedProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  // In a real app, you would check for admin authentication status
  // This is a simplified example for demonstration purposes
  useEffect(() => {
    // Check if user is already authenticated as admin
    const adminAuth = localStorage.getItem("adminAuthenticated")

    // Also check for the general auth token cookie
    const hasAuthToken = document.cookie.split(";").some((item) => item.trim().startsWith("auth_token="))

    if (adminAuth === "true" && hasAuthToken) {
      setIsAuthenticated(true)
    } else if (!hasAuthToken) {
      // If not even logged in, redirect to login
      router.push("/login?from=/admin")
    }
  }, [router])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would validate against your backend
    // This is just a simple example with a hardcoded password
    if (password === "admin123") {
      localStorage.setItem("adminAuthenticated", "true")
      setIsAuthenticated(true)
      setError("")
    } else {
      setError("Invalid admin password")
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Admin Access
            </CardTitle>
            <CardDescription>Enter your admin password to access the dashboard</CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Admin Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                  />
                </div>
                {error && (
                  <div className="flex items-center gap-2 text-sm text-red-500">
                    <AlertTriangle className="h-4 w-4" />
                    {error}
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.push("/")}>
                Cancel
              </Button>
              <Button type="submit">Access Dashboard</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}

