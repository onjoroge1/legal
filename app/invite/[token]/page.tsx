"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, CheckCircle2, XCircle, Mail } from "lucide-react"
import { toast } from "@/lib/safe-toast"
import Link from "next/link"
import { useSession } from "next-auth/react"

export default function InviteAcceptancePage() {
  const params = useParams()
  const router = useRouter()
  const { data: session, status } = useSession()
  const token = params?.token as string
  const [isLoading, setIsLoading] = useState(true)
  const [isAccepting, setIsAccepting] = useState(false)
  const [invitation, setInvitation] = useState<{
    email: string
    role: string
    teamName: string
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (token) {
      fetchInvitation()
    }
  }, [token])

  const fetchInvitation = async () => {
    try {
      const response = await fetch(`/api/team/invite/accept?token=${token}`)
      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Invalid or expired invitation")
        return
      }

      setInvitation(data.invitation)
    } catch (error) {
      setError("Failed to load invitation")
    } finally {
      setIsLoading(false)
    }
  }

  const handleAccept = async () => {
    if (!session) {
      // Redirect to signup with invite token
      router.push(`/signup?invite=${token}`)
      return
    }

    setIsAccepting(true)
    try {
      const response = await fetch("/api/team/invite/accept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to accept invitation")
      }

      toast.success("Invitation accepted! You've been added to the team.")
      router.push("/dashboard/team")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to accept invitation")
    } finally {
      setIsAccepting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading invitation...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <XCircle className="h-12 w-12 text-destructive" />
            </div>
            <CardTitle className="text-center">Invalid Invitation</CardTitle>
            <CardDescription className="text-center">{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/">Go to Homepage</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <Mail className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-center">Team Invitation</CardTitle>
          <CardDescription className="text-center">
            You've been invited to join a team
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {invitation && (
            <>
              <div className="rounded-md border p-4 bg-muted/50">
                <p className="text-sm font-medium mb-2">Invitation Details</p>
                <p className="text-sm text-muted-foreground">
                  <strong>Email:</strong> {invitation.email}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Role:</strong> <span className="capitalize">{invitation.role}</span>
                </p>
                {invitation.teamName && (
                  <p className="text-sm text-muted-foreground">
                    <strong>Team:</strong> {invitation.teamName}
                  </p>
                )}
              </div>

              {!session ? (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground text-center">
                    You need to sign in or create an account to accept this invitation.
                  </p>
                  <div className="flex gap-2">
                    <Button asChild variant="outline" className="flex-1">
                      <Link href={`/login?invite=${token}`}>Sign In</Link>
                    </Button>
                    <Button asChild className="flex-1">
                      <Link href={`/signup?invite=${token}`}>Sign Up</Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={handleAccept}
                  disabled={isAccepting}
                  className="w-full"
                >
                  {isAccepting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Accepting...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Accept Invitation
                    </>
                  )}
                </Button>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

