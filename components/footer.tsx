import Link from "next/link"
import { Scale } from "lucide-react"

const footerLinks = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "Documents", href: "/documents" },
    { label: "Pricing", href: "/#pricing" },
    { label: "API Access", href: "/contact" },
  ],
  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "Legal Guides", href: "/documents" },
    { label: "State Compliance", href: "/documents" },
    { label: "Help Center", href: "/contact" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/contact" },
    { label: "Contact", href: "/contact" },
    { label: "Press", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "DMCA", href: "/dmca" },
  ],
}

export function Footer() {
  return (
    <footer className="relative border-t border-border/40">
      {/* Subtle gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/80 to-background" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 lg:px-8 lg:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 border border-primary/30">
                <Scale className="h-4 w-4 text-primary" />
              </div>
              <span className="font-serif text-xl font-bold text-foreground">
                Legal<span className="text-primary">Law</span>Docs
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              AI-powered legal document generation with state-specific
              compliance. Professional documents without expensive attorney fees.
            </p>
            {/* Trust badges */}
            <div className="mt-6 flex items-center gap-3">
              <div className="rounded-lg border border-border/50 bg-secondary/50 px-3 py-1.5">
                <span className="text-xs font-medium text-muted-foreground">SOC 2</span>
              </div>
              <div className="rounded-lg border border-border/50 bg-secondary/50 px-3 py-1.5">
                <span className="text-xs font-medium text-muted-foreground">256-bit SSL</span>
              </div>
              <div className="rounded-lg border border-border/50 bg-secondary/50 px-3 py-1.5">
                <span className="text-xs font-medium text-muted-foreground">GDPR</span>
              </div>
            </div>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-foreground">
                {category}
              </h3>
              <ul className="mt-4 space-y-2.5" role="list">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} LegalLawDocs.com. All rights
            reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            LegalLawDocs provides self-help services at your specific direction.
            We are not a law firm or a substitute for an attorney&apos;s advice.
          </p>
        </div>
      </div>
    </footer>
  )
}
