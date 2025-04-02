import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="text-2xl font-bold text-primary">
          <Link href="/">LegalLawDocs.com</Link>
        </div>
        <nav className="hidden md:flex gap-6">
          <a href="/#features" className="text-sm font-medium transition-colors hover:text-primary">
            Features
          </a>
          <a href="/#samples" className="text-sm font-medium transition-colors hover:text-primary">
            Sample Docs
          </a>
          <a href="/#pricing" className="text-sm font-medium transition-colors hover:text-primary">
            Pricing
          </a>
          <a href="/#how-it-works" className="text-sm font-medium transition-colors hover:text-primary">
            How It Works
          </a>
          <a href="/#states" className="text-sm font-medium transition-colors hover:text-primary">
            State Compliance
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

