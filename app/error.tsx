"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Scale, RefreshCw, ArrowLeft } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 border border-primary/30">
              <Scale className="h-4 w-4 text-primary" />
            </div>
            <span className="font-serif text-xl font-bold text-foreground">
              Legal<span className="text-primary">Law</span>Docs
            </span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-24">
        <div className="text-center max-w-lg">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-destructive/10 border border-destructive/20">
            <Scale className="h-10 w-10 text-destructive" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-foreground mb-4">
            Something Went Wrong
          </h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            We encountered an unexpected error while processing your request.
            Please try again, and if the problem persists, contact our support
            team for assistance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => reset()}
              className="shadow-md shadow-primary/20"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
          {error.digest && (
            <p className="mt-8 text-xs text-muted-foreground">
              Error ID: {error.digest}
            </p>
          )}
        </div>
      </main>
    </div>
  )
}
