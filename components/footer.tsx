import Link from "next/link"
import { Scale } from "lucide-react"

const footerLinks = {
  Documents: [
    { label: "Business Documents", href: "/documents/business" },
    { label: "Employment Documents", href: "/documents/employment" },
    { label: "Real Estate Documents", href: "/documents/real-estate" },
    { label: "Estate Planning", href: "/documents/estate-planning" },
    { label: "Legal Letters", href: "/documents/legal-letters" },
    { label: "Financial Documents", href: "/documents/financial" },
  ],
  "Popular Templates": [
    { label: "Non-Disclosure Agreement", href: "/documents/business/non-disclosure-agreement" },
    { label: "LLC Operating Agreement", href: "/documents/business/llc-operating-agreement" },
    { label: "Residential Lease Agreement", href: "/documents/real-estate/residential-lease-agreement" },
    { label: "Power of Attorney", href: "/documents/estate-planning/power-of-attorney" },
    { label: "Employment Contract", href: "/documents/employment/employment-contract" },
    { label: "Partnership Agreement", href: "/documents/business/partnership-agreement" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Help Center", href: "/help" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
}

export function Footer() {
  return (
    <footer className="relative border-t border-border/40">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/80 to-background" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 lg:px-8 lg:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
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
              AI-assisted, state-aware document drafting for self-help users. Drafts are starting
              points and require careful review before use.
            </p>
            <p className="mt-5 max-w-xs text-xs leading-relaxed text-muted-foreground">
              We do not review your facts, represent you, or determine whether a draft is suitable
              or enforceable for your situation.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-sm font-semibold text-foreground">{section}</h3>
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
            &copy; {new Date().getFullYear()} LegalLawDocs.com. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">Self-help drafting software. No legal advice.</p>
        </div>
      </div>
    </footer>
  )
}
