"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Github, Mail, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { z } from "zod"
import { signIn } from "next-auth/react"

// Create a schema for form validation
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  rememberMe: z.boolean().optional(),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const [formValues, setFormValues] = useState<LoginFormValues>({
    email: "",
    password: "",
    rememberMe: false,
  })

  const validateForm = () => {
    try {
      loginSchema.parse(formValues)
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message)
      }
      return false
    }
  }

  const handleSocialLogin = async (provider: string) => {
    try {
      setIsLoading(true)
      setError(null)
      await signIn(provider, { callbackUrl: "/dashboard" })
    } catch (error) {
      console.error(`[LoginForm] ${provider} login error:`, error)
      setError(`Failed to login with ${provider}`)
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    console.log("[LoginForm] Starting login process with email:", formValues.email)
    
    if (!validateForm()) {
      console.log("[LoginForm] Form validation failed")
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      console.log("[LoginForm] Attempting to sign in with NextAuth")
      const result = await signIn("credentials", {
        email: formValues.email,
        password: formValues.password,
        redirect: false,
        callbackUrl: "/dashboard"
      })

      console.log("[LoginForm] Sign in result:", result)

      if (result?.error) {
        console.log("[LoginForm] Sign in failed:", result.error)
        setError("Invalid email or password")
        toast({
          title: "Authentication Error",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        })
        return
      }

      if (result?.url) {
        console.log("[LoginForm] Sign in successful, redirecting to:", result.url)
        router.push(result.url)
      } else {
        console.log("[LoginForm] Sign in successful, redirecting to dashboard")
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("[LoginForm] Login error:", error)
      setError('An unexpected error occurred')
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      <Button
        variant="outline"
        onClick={() => handleSocialLogin("google")}
        disabled={isLoading}
        className="w-full"
      >
        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Continue with Google
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={formValues.email}
              onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formValues.password}
              onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
              disabled={isLoading}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rememberMe"
                checked={formValues.rememberMe}
                onCheckedChange={(checked) =>
                  setFormValues({ ...formValues, rememberMe: checked as boolean })
                }
              />
              <Label htmlFor="rememberMe">Remember me</Label>
            </div>
            <Link
              href="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          {error && (
            <div className="text-sm text-red-500">{error}</div>
          )}
          <Button disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
        </div>
      </form>

      <p className="px-8 text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link href="/signup" className="underline underline-offset-4 hover:text-primary">
          Sign up
        </Link>
      </p>
    </div>
  )
}

