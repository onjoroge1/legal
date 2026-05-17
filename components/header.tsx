"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Menu, Scale, LayoutDashboard, ChevronDown, FileText } from "lucide-react"
import { useSession, signOut } from "next-auth/react"

const categoryNav = [
  { label: "Business", href: "/documents/business" },
  { label: "Employment", href: "/documents/employment" },
  { label: "Real Estate", href: "/documents/real-estate" },
  { label: "Estate Planning", href: "/documents/estate-planning" },
  { label: "Legal Letters", href: "/documents/legal-letters" },
  { label: "Financial", href: "/documents/financial" },
  { label: "Personal", href: "/documents/personal" },
]

const navLinks = [
  { label: "Documents", href: "/documents" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Blog", href: "/blog" },
]

export function Header() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [docsOpen, setDocsOpen] = useState(false)
  const { data: session, status } = useSession()

  const initials =
    session?.user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) ||
    session?.user?.email?.[0].toUpperCase() ||
    "U"

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 border border-primary/30">
            <Scale className="h-4 w-4 text-primary" />
          </div>
          <span className="font-serif text-xl font-bold text-foreground">
            Legal<span className="text-primary">Law</span>Docs
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {/* Documents dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDocsOpen(true)}
            onMouseLeave={() => setDocsOpen(false)}
          >
            <button
              className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
              aria-expanded={docsOpen}
              aria-haspopup="true"
            >
              Documents
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${docsOpen ? "rotate-180" : ""}`} />
            </button>

            {docsOpen && (
              <div className="absolute left-0 top-full z-50 mt-1 w-56 rounded-xl border border-border/50 bg-card/95 p-2 shadow-xl backdrop-blur-xl">
                <Link
                  href="/documents"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  <FileText className="h-3.5 w-3.5" />
                  All Documents
                </Link>
                <div className="my-1.5 border-t border-border/40" />
                {categoryNav.map((cat) => (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop auth */}
        <div className="hidden items-center gap-3 md:flex">
          {status === "authenticated" && session?.user ? (
            <>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
                <Link href="/dashboard">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={session.user.image || undefined} alt={session.user.name || "User"} />
                  <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                </Avatar>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={async () => {
                    try {
                      await signOut({ callbackUrl: "/", redirect: true })
                      router.push("/")
                    } catch {
                      router.push("/")
                    }
                  }}
                >
                  Sign Out
                </Button>
              </div>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
                <Link href="/login">Log In</Link>
              </Button>
              <Button size="sm" className="shadow-md shadow-primary/20" asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Toggle menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-card border-border/40 overflow-y-auto">
            <div className="flex flex-col gap-6 pt-8">
              <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 border border-primary/30">
                  <Scale className="h-4 w-4 text-primary" />
                </div>
                <span className="font-serif text-xl font-bold text-foreground">
                  Legal<span className="text-primary">Law</span>Docs
                </span>
              </Link>

              <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                <Link
                  href="/documents"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  All Documents
                </Link>
                <div className="mt-1 mb-1">
                  <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
                    Categories
                  </p>
                  {categoryNav.map((cat) => (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                      onClick={() => setOpen(false)}
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
                <Link href="/#pricing" className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary" onClick={() => setOpen(false)}>Pricing</Link>
                <Link href="/blog" className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary" onClick={() => setOpen(false)}>Blog</Link>
              </nav>

              <div className="flex flex-col gap-3 pt-4 border-t border-border/40">
                {status === "authenticated" && session?.user ? (
                  <>
                    <div className="flex items-center gap-3 px-3 py-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={session.user.image || undefined} alt={session.user.name || "User"} />
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{session.user.name || "User"}</p>
                        <p className="text-xs text-muted-foreground">{session.user.email}</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full bg-transparent border-border/60" asChild>
                      <Link href="/dashboard" onClick={() => setOpen(false)}>
                        <LayoutDashboard className="mr-2 h-4 w-4" />Dashboard
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent border-border/60"
                      onClick={async () => {
                        setOpen(false)
                        try {
                          await signOut({ callbackUrl: "/", redirect: true })
                          router.push("/")
                        } catch {
                          router.push("/")
                        }
                      }}
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="w-full bg-transparent border-border/60" asChild>
                      <Link href="/login" onClick={() => setOpen(false)}>Log In</Link>
                    </Button>
                    <Button className="w-full shadow-md shadow-primary/20" asChild>
                      <Link href="/signup" onClick={() => setOpen(false)}>Get Started</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
