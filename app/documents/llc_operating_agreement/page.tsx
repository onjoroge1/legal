import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Shield,
  CheckCircle2,
  Clock,
  DollarSign,
  Scale,
  MapPin,
  ArrowRight,
  Star,
  Sparkles,
  Lock,
  Zap,
  Users,
  Download,
  ArrowLeft,
  Building2,
  TrendingUp,
  FileCheck,
  AlertCircle,
  Eye,
} from "lucide-react"
import { getDocumentBySlug } from "@/lib/document-data"
import { Footer } from "@/components/footer"

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  const document = getDocumentBySlug("llc_operating_agreement")
  
  if (!document) {
    return {}
  }

  const title = "LLC Operating Agreement Generator - Create Online | LegalLawDocs.com"
  const description = "Create a professional LLC operating agreement online. State-compliant templates with AI-powered customization. Define ownership, profit distribution, and management structure. Generate in minutes."
  const url = "https://legallawdocs.com/documents/llc_operating_agreement"
  const ogImage = "https://legallawdocs.com/images/og-llc-operating-agreement.png"

  return {
    title,
    description,
    keywords: "LLC operating agreement, LLC agreement template, operating agreement generator, create LLC operating agreement, LLC formation documents, business operating agreement, multi-member LLC agreement, single member LLC agreement",
    authors: [{ name: "LegalLawDocs.com" }],
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    openGraph: {
      type: "website",
      url,
      title: "LLC Operating Agreement Generator - Create Online",
      description: "Create a professional LLC operating agreement online. State-compliant templates with AI-powered customization.",
      siteName: "LegalLawDocs.com",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "LegalLawDocs.com - LLC Operating Agreement Generator",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "LLC Operating Agreement Generator - Create Online",
      description: "Create a professional LLC operating agreement online. State-compliant templates with AI-powered customization.",
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  }
}

const statesCovered = [
  "California", "New York", "Texas", "Florida", "Illinois",
  "Pennsylvania", "Ohio", "Georgia", "North Carolina", "Michigan",
  "New Jersey", "Virginia", "Washington", "Arizona", "Massachusetts",
  "All 50 States",
]

const included = [
  "Member Ownership Percentages",
  "Capital Contributions & Distributions",
  "Management Structure (Member-Managed vs Manager-Managed)",
  "Voting Rights & Decision-Making Procedures",
  "Profit & Loss Allocation",
  "Transfer Restrictions & Buyout Provisions",
  "Dissolution Procedures",
  "Dispute Resolution Mechanisms",
  "State-Specific Compliance Provisions",
  "Amendments & Modification Procedures",
]

const reviews = [
  { name: "Michael Chen", role: "Startup Founder", rating: 5, text: "Created our multi-member LLC operating agreement in 15 minutes. Our attorney reviewed it and said it was more comprehensive than most templates. Saved us $1,200." },
  { name: "Jennifer Martinez", role: "Business Owner", rating: 5, text: "The AI asked all the right questions about profit distribution and voting rights. The final document was exactly what we needed for our 3-member LLC." },
  { name: "David Thompson", role: "Entrepreneur", rating: 5, text: "Finally, an affordable way to create a proper operating agreement. The state-specific provisions were spot-on for California." },
]

export default async function LLCOperatingAgreementPage() {
  const document = getDocumentBySlug("llc_operating_agreement")

  if (!document) {
    notFound()
  }

  const Icon = document.icon
  const isAccent = document.color === "accent"

  // Structured Data for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is an LLC Operating Agreement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An LLC Operating Agreement is a legal document that outlines the ownership structure, management procedures, profit distribution, and operating rules for a Limited Liability Company. While not required in all states, it's essential for defining member rights, preventing disputes, and protecting the LLC's limited liability status. The agreement covers capital contributions, voting rights, profit/loss allocation, transfer restrictions, and dissolution procedures."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need an Operating Agreement for my LLC?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While only a few states legally require an LLC Operating Agreement, it's highly recommended for all LLCs. Without one, your LLC will default to state law, which may not reflect your business needs. An operating agreement protects members' interests, clarifies ownership percentages, establishes management structure, and helps maintain the LLC's liability protection. It's especially critical for multi-member LLCs to prevent disputes."
        }
      },
      {
        "@type": "Question",
        "name": "What should be included in an LLC Operating Agreement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A comprehensive LLC Operating Agreement should include: member names and ownership percentages, capital contributions and future funding requirements, management structure (member-managed vs manager-managed), voting rights and decision-making procedures, profit and loss allocation methods, transfer restrictions and buyout provisions, dissolution procedures, dispute resolution mechanisms, and state-specific compliance requirements. Our AI-powered generator ensures all essential provisions are included."
        }
      },
      {
        "@type": "Question",
        "name": "Can I create an LLC Operating Agreement online?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can create a professional LLC Operating Agreement online using our AI-powered generator. Our tool asks smart questions to customize every clause to your specific situation and state requirements. The generated document is legally compliant, state-specific, and ready to sign. However, we always recommend having an attorney review complex agreements or high-stakes business arrangements."
        }
      },
      {
        "@type": "Question",
        "name": "What's the difference between member-managed and manager-managed LLCs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A member-managed LLC means all members participate in daily operations and decision-making. This is common for small businesses where owners are actively involved. A manager-managed LLC designates specific members or external managers to handle operations, while other members act as passive investors. The operating agreement must clearly specify which structure applies, as this affects voting rights, decision-making authority, and fiduciary duties."
        }
      },
      {
        "@type": "Question",
        "name": "How much does it cost to create an LLC Operating Agreement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Creating an LLC Operating Agreement typically costs $500-$2,000 with an attorney, or $50-$200 with online templates. Our AI-powered generator creates a comprehensive, state-compliant operating agreement for $19.99 per document, or $9.99/month with our subscription for unlimited documents. This includes all essential provisions, state-specific compliance, and both PDF and DOCX formats."
        }
      },
      {
        "@type": "Question",
        "name": "Is an Operating Agreement required for a single-member LLC?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While not legally required in most states, an Operating Agreement is still recommended for single-member LLCs. It helps maintain the separation between personal and business assets, strengthening liability protection. It also establishes procedures for adding members, transferring ownership, or dissolving the LLC. Banks and investors often require an operating agreement, even for single-member LLCs."
        }
      },
      {
        "@type": "Question",
        "name": "Can I modify my LLC Operating Agreement later?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, LLC Operating Agreements can be amended, but the process depends on what your original agreement specifies. Most agreements require a majority or supermajority vote of members to approve amendments. The amendment should be in writing, signed by all members, and kept with your original operating agreement. Our generator includes amendment procedures in the document."
        }
      },
    ]
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://legallawdocs.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Documents",
        "item": "https://legallawdocs.com/documents"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "LLC Operating Agreement",
        "item": "https://legallawdocs.com/documents/llc_operating_agreement"
      }
    ]
  }

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "LLC Operating Agreement Generator",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "description": "Create professional, state-compliant LLC Operating Agreements online with AI-powered customization. Define ownership structure, profit distribution, and management procedures.",
    "offers": {
      "@type": "Offer",
      "price": "19.99",
      "priceCurrency": "USD"
    },
    "featureList": [
      "AI-powered customization",
      "State-specific compliance",
      "Member-managed and manager-managed options",
      "Profit distribution calculations",
      "Voting rights configuration",
      "Transfer restrictions",
      "PDF and DOCX export",
      "Digital signature ready"
    ]
  }

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Create an LLC Operating Agreement",
    "description": "Step-by-step guide to creating a professional LLC Operating Agreement online",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Answer AI Questions",
        "text": "Our AI will ask you questions about your LLC structure, including member information, ownership percentages, management type, profit distribution, and state requirements.",
        "position": 1
      },
      {
        "@type": "HowToStep",
        "name": "Review Generated Document",
        "text": "Preview your customized LLC Operating Agreement with all clauses tailored to your specific situation and state compliance requirements.",
        "position": 2
      },
      {
        "@type": "HowToStep",
        "name": "Complete Purchase",
        "text": "Choose between a single document purchase ($19.99) or monthly subscription ($9.99/month) for unlimited documents.",
        "position": 3
      },
      {
        "@type": "HowToStep",
        "name": "Download and Sign",
        "text": "Download your LLC Operating Agreement in PDF or DOCX format. Have all members sign the document and keep it with your business records.",
        "position": 4
      }
    ]
  }

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <div className="min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/30 bg-primary/15">
                <Scale className="h-4 w-4 text-primary" />
              </div>
              <span className="font-serif text-xl font-bold text-foreground">
                Legal<span className="text-primary">Law</span>Docs
              </span>
            </Link>
            <Link href="/documents" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to Documents
            </Link>
          </div>
        </header>

        <main>
          {/* Hero Section - Answer First Approach */}
          <section className="relative overflow-hidden border-b border-border/40 py-16 lg:py-24">
            <div className="pointer-events-none absolute inset-0 grid-pattern animate-grid-fade" />
            <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
            <div className="pointer-events-none absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
              {/* Breadcrumbs */}
              <nav className="mb-6" aria-label="Breadcrumb">
                <ol className="flex items-center gap-2 text-sm text-muted-foreground">
                  <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                  <li>/</li>
                  <li><Link href="/documents" className="hover:text-primary transition-colors">Documents</Link></li>
                  <li>/</li>
                  <li className="text-foreground">LLC Operating Agreement</li>
                </ol>
              </nav>

              <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
                {/* Left info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    <Badge className="gap-1 border-primary/30 bg-primary/10 text-primary" variant="outline">
                      <Sparkles className="h-3 w-3" />
                      AI-Powered
                    </Badge>
                    <Badge className="gap-1 border-accent/30 bg-accent/10 text-accent" variant="outline">
                      <Shield className="h-3 w-3" />
                      Legally Compliant
                    </Badge>
                    <Badge className="gap-1 border-border bg-secondary text-secondary-foreground" variant="outline">
                      <Star className="h-3 w-3 fill-primary text-primary" />
                      Popular
                    </Badge>
                  </div>

                  {/* H1 - Intent Optimized */}
                  <h1 className="font-serif text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
                    Online LLC Operating Agreement Generator
                  </h1>

                  {/* Subheadline - Styled Paragraph */}
                  <p className="mt-4 text-lg font-semibold text-foreground">
                    Create a professional LLC operating agreement that defines ownership, profit distribution, and management structure
                  </p>

                  {/* Intro Paragraph - Answers What/Who/Why */}
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                    An <strong>LLC Operating Agreement</strong> is a critical legal document that establishes the rules, ownership structure, and operating procedures for your Limited Liability Company. Whether you're forming a single-member or multi-member LLC, this agreement protects your business interests, clarifies member rights, and helps maintain your LLC's liability protection. Our AI-powered generator creates a comprehensive, state-compliant operating agreement tailored to your specific business needs in minutes, saving you hundreds in legal fees.
                  </p>

                  <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                    <Link href="/documents/llc_operating_agreement/generate">
                      <Button size="lg" className="gap-2 shadow-lg shadow-primary/20">
                        Generate My Operating Agreement
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                      <span className="text-2xl font-bold text-foreground">19.99</span>
                      <span className="text-sm text-muted-foreground">per document</span>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-accent" />
                      <span className="text-sm text-muted-foreground">Ready in ~5 minutes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Download className="h-4 w-4 text-accent" />
                      <span className="text-sm text-muted-foreground">PDF & DOCX download</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-accent" />
                      <span className="text-sm text-muted-foreground">Bank-level encryption</span>
                    </div>
                  </div>
                </div>

                {/* Right - Document preview card */}
                <div className="w-full shrink-0 lg:w-96">
                  <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm">
                    {/* Preview header */}
                    <div className="border-b border-border/40 bg-secondary/40 p-5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                            isAccent
                              ? "border border-accent/20 bg-accent/10"
                              : "border border-primary/20 bg-primary/10"
                          }`}
                        >
                          <Icon className={`h-6 w-6 ${isAccent ? "text-accent" : "text-primary"}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{document.title}</h3>
                          <p className="text-xs text-muted-foreground">AI-Generated Template</p>
                        </div>
                      </div>
                    </div>

                    {/* Preview body */}
                    <div className="p-5">
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        What you get
                      </p>
                      <div className="mt-4 space-y-3">
                        {[
                          { icon: Zap, text: "AI-customized clauses", color: "text-primary" },
                          { icon: MapPin, text: "State-specific provisions", color: "text-accent" },
                          { icon: Shield, text: "Compliance verification", color: "text-primary" },
                          { icon: Users, text: "Single & multi-member options", color: "text-accent" },
                          { icon: Lock, text: "Digital signature ready", color: "text-primary" },
                          { icon: Download, text: "PDF & DOCX formats", color: "text-accent" },
                        ].map((item) => (
                          <div key={item.text} className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/60">
                              <item.icon className={`h-4 w-4 ${item.color}`} />
                            </div>
                            <span className="text-sm text-secondary-foreground">{item.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Preview footer */}
                    <div className="border-t border-border/40 bg-secondary/30 p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">One-time payment</p>
                          <p className="text-2xl font-bold text-foreground">${document.price}.99</p>
                        </div>
                        <Link href="/documents/llc_operating_agreement/generate">
                          <Button className="gap-2 shadow-md shadow-primary/20">
                            Get Started
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What is an LLC Operating Agreement? */}
          <section className="border-b border-border/40 py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="mx-auto max-w-3xl">
                <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                  What is an LLC Operating Agreement?
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                  <p>
                    An <strong>LLC Operating Agreement</strong> is a foundational legal document that governs how your Limited Liability Company operates, manages its affairs, and distributes profits among members. Think of it as the "constitution" for your LLC—it establishes the rules, rights, and responsibilities that guide your business operations.
                  </p>
                  <p>
                    While only a few states (California, Delaware, Maine, Missouri, and New York) legally require an operating agreement, it's considered essential business practice for all LLCs. Without one, your LLC defaults to your state's default LLC laws, which may not align with your business goals or member expectations.
                  </p>
                  <p>
                    The operating agreement serves multiple critical functions: it defines member ownership percentages and capital contributions, establishes whether the LLC is member-managed or manager-managed, outlines profit and loss distribution methods, sets voting rights and decision-making procedures, includes transfer restrictions to protect member interests, and provides dissolution procedures if the business ends.
                  </p>
                  <p>
                    For multi-member LLCs, the operating agreement is especially crucial as it prevents disputes by clearly defining each member's role, financial stake, and decision-making authority. Even single-member LLCs benefit from having an operating agreement, as it helps maintain the legal separation between personal and business assets, strengthening liability protection.
                  </p>
                  <p>
                    Banks, lenders, and investors often require an operating agreement before extending credit or making investments. Having a professionally drafted, state-compliant operating agreement demonstrates that your business is properly structured and legally sound.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Why Use an LLC Operating Agreement? */}
          <section className="border-b border-border/40 py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="mx-auto max-w-3xl">
                <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                  Why Use an LLC Operating Agreement?
                </h2>
                <div className="mt-6 space-y-6">
                  <div className="rounded-xl border border-border/40 bg-card/40 p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Protect Limited Liability Status</h3>
                        <p className="mt-2 text-muted-foreground">
                          An operating agreement helps maintain the legal separation between your personal assets and business assets. This separation is crucial for preserving your LLC's limited liability protection. Without clear documentation, courts may "pierce the corporate veil" and hold members personally liable for business debts.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border/40 bg-card/40 p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                        <Users className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Prevent Member Disputes</h3>
                        <p className="mt-2 text-muted-foreground">
                          Clear rules prevent conflicts. The operating agreement establishes voting procedures, profit distribution methods, and decision-making authority upfront. When disputes arise, the agreement provides a framework for resolution, potentially saving thousands in legal fees and preserving business relationships.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border/40 bg-card/40 p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <TrendingUp className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Customize Business Rules</h3>
                        <p className="mt-2 text-muted-foreground">
                          State default laws are one-size-fits-all. Your operating agreement lets you customize rules to fit your business model. You can specify profit distribution that differs from ownership percentages, establish supermajority voting for major decisions, or create transfer restrictions that protect member interests.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border/40 bg-card/40 p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                        <FileCheck className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Meet Business Requirements</h3>
                        <p className="mt-2 text-muted-foreground">
                          Many banks require an operating agreement before opening a business account. Investors and lenders want to see proper documentation. Having a professional operating agreement demonstrates that your business is well-structured and legally compliant, making it easier to secure financing and partnerships.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border/40 bg-card/40 p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <AlertCircle className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Avoid State Default Rules</h3>
                        <p className="mt-2 text-muted-foreground">
                          Without an operating agreement, your LLC operates under state default rules, which may not suit your needs. For example, some states require equal profit distribution regardless of capital contributions. An operating agreement lets you override these defaults with rules that match your business structure.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="border-b border-border/40 py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                  How It Works
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Creating your LLC Operating Agreement is simple and takes just minutes
                </p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    step: "1",
                    title: "Answer AI Questions",
                    description: "Our AI asks smart questions about your LLC structure, members, ownership, management type, and state requirements.",
                    icon: Zap,
                  },
                  {
                    step: "2",
                    title: "AI Generates Document",
                    description: "Our system creates a comprehensive operating agreement with all clauses customized to your specific situation.",
                    icon: Sparkles,
                  },
                  {
                    step: "3",
                    title: "Preview & Purchase",
                    description: "Review your watermarked preview, then choose between single document purchase or monthly subscription.",
                    icon: Eye,
                  },
                  {
                    step: "4",
                    title: "Download & Sign",
                    description: "Download your professional operating agreement in PDF or DOCX format. Have all members sign and file with your records.",
                    icon: Download,
                  },
                ].map((item, index) => (
                  <div key={item.step} className="relative">
                    <div className="rounded-2xl border border-border/50 bg-card/60 p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-xl font-bold text-primary">
                        {item.step}
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                    </div>
                    {index < 3 && (
                      <ArrowRight className="absolute -right-4 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 text-primary/60 md:block lg:h-8 lg:w-8" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* What's Included */}
          <section className="border-b border-border/40 py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-sm font-semibold uppercase tracking-widest text-accent">Comprehensive Coverage</p>
                <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">
                  {"What's Included in Your Operating Agreement"}
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Every operating agreement generated by our AI includes these essential sections, customized to your needs.
                </p>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {included.map((item, i) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-border/40 bg-card/40 p-4 transition-colors hover:border-primary/20 hover:bg-card/60"
                  >
                    <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold ${
                      i % 2 === 0
                        ? "bg-primary/15 text-primary"
                        : "bg-accent/15 text-accent"
                    }`}>
                      {i + 1}
                    </div>
                    <span className="text-sm font-medium text-secondary-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="border-b border-border/40 py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="mx-auto max-w-3xl">
                <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                  Best Practices for LLC Operating Agreements
                </h2>
                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Be Specific About Capital Contributions</h3>
                    <p className="mt-2 text-muted-foreground">
                      Clearly document each member's initial capital contribution, whether it's cash, property, services, or intellectual property. Specify the valuation method and include provisions for future capital calls. This prevents disputes when members have different expectations about contributions and ownership percentages.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Define Profit Distribution Clearly</h3>
                    <p className="mt-2 text-muted-foreground">
                      Specify exactly how profits and losses will be allocated. You can distribute profits equally, based on ownership percentages, or using a custom formula. Be explicit about when distributions occur, how they're calculated, and whether members can take draws before profits are distributed.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Establish Clear Voting Procedures</h3>
                    <p className="mt-2 text-muted-foreground">
                      Define which decisions require unanimous consent, majority vote, or supermajority. Common decisions requiring supermajority include admitting new members, amending the operating agreement, dissolving the LLC, or selling major assets. Clear voting rules prevent deadlocks and ensure smooth operations.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Include Transfer Restrictions</h3>
                    <p className="mt-2 text-muted-foreground">
                      Protect your LLC from unwanted members by including transfer restrictions. Common provisions include right of first refusal (existing members can buy before outsiders), approval requirements for transfers, and buyout procedures. These restrictions maintain control and prevent disruptive ownership changes.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Plan for Disputes and Dissolution</h3>
                    <p className="mt-2 text-muted-foreground">
                      Include dispute resolution mechanisms such as mediation or arbitration clauses. Define dissolution procedures, including what triggers dissolution, how assets are distributed, and the process for winding up business affairs. Planning for worst-case scenarios protects all members.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Keep It Updated</h3>
                    <p className="mt-2 text-muted-foreground">
                      Review and update your operating agreement as your business grows. When you add members, change profit distribution, or modify management structure, amend the agreement accordingly. Keep signed copies with your business records and ensure all members have access to the current version.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* States Covered */}
          <section className="border-b border-border/40 py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
                <div className="flex-1">
                  <p className="text-sm font-semibold uppercase tracking-widest text-primary">Nationwide Coverage</p>
                  <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">
                    Compliant Across <span className="gradient-text">All 50 States</span>
                  </h2>
                  <p className="mt-4 max-w-lg text-muted-foreground leading-relaxed">
                    Our AI automatically adapts your operating agreement to include state-specific provisions,
                    referencing the correct statutes and compliance requirements for your jurisdiction. Each state
                    has unique LLC laws regarding management structure, member rights, and operating procedures.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {statesCovered.map((state) => (
                      <Badge
                        key={state}
                        variant="outline"
                        className={`border-border/60 bg-secondary/40 text-secondary-foreground ${state === "All 50 States" ? "border-primary/40 bg-primary/10 text-primary font-semibold" : ""}`}
                      >
                        {state === "All 50 States" ? (
                          <><MapPin className="mr-1 h-3 w-3" />{state}</>
                        ) : state}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="w-full shrink-0 lg:w-80">
                  <div className="rounded-2xl border border-accent/20 bg-accent/5 p-6">
                    <Shield className="h-8 w-8 text-accent" />
                    <h3 className="mt-4 text-lg font-semibold text-foreground">State-Specific Compliance</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      California LLCs require specific provisions for member-managed vs manager-managed structures.
                      Delaware LLCs benefit from flexible operating agreement terms. New York requires certain
                      disclosures. Our generator includes all state-specific requirements automatically.
                    </p>
                    <div className="mt-5 space-y-2.5">
                      {["State LLC statutes", "Management requirements", "Member rights", "Dissolution procedures"].map((item) => (
                        <div key={item} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-accent" />
                          <span className="text-sm text-secondary-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Reviews */}
          <section className="border-b border-border/40 py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">Trusted By Thousands</p>
                <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">
                  What Our Users Say
                </h2>
              </div>

              <div className="mt-12 grid gap-6 md:grid-cols-3">
                {reviews.map((review) => (
                  <div key={review.name} className="rounded-2xl border border-border/50 bg-card/60 p-6">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {`"${review.text}"`}
                    </p>
                    <div className="mt-4 border-t border-border/40 pt-4">
                      <p className="text-sm font-semibold text-foreground">{review.name}</p>
                      <p className="text-xs text-muted-foreground">{review.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="border-b border-border/40 py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="mx-auto max-w-3xl">
                <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                  Frequently Asked Questions
                </h2>
                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">What is an LLC Operating Agreement?</h3>
                    <p className="mt-2 text-muted-foreground">
                      An LLC Operating Agreement is a legal document that outlines the ownership structure, management procedures, profit distribution, and operating rules for a Limited Liability Company. While not required in all states, it's essential for defining member rights, preventing disputes, and protecting the LLC's limited liability status. The agreement covers capital contributions, voting rights, profit/loss allocation, transfer restrictions, and dissolution procedures.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Do I need an Operating Agreement for my LLC?</h3>
                    <p className="mt-2 text-muted-foreground">
                      While only a few states legally require an LLC Operating Agreement, it's highly recommended for all LLCs. Without one, your LLC will default to state law, which may not reflect your business needs. An operating agreement protects members' interests, clarifies ownership percentages, establishes management structure, and helps maintain the LLC's liability protection. It's especially critical for multi-member LLCs to prevent disputes.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground">What should be included in an LLC Operating Agreement?</h3>
                    <p className="mt-2 text-muted-foreground">
                      A comprehensive LLC Operating Agreement should include: member names and ownership percentages, capital contributions and future funding requirements, management structure (member-managed vs manager-managed), voting rights and decision-making procedures, profit and loss allocation methods, transfer restrictions and buyout provisions, dissolution procedures, dispute resolution mechanisms, and state-specific compliance requirements. Our AI-powered generator ensures all essential provisions are included.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Can I create an LLC Operating Agreement online?</h3>
                    <p className="mt-2 text-muted-foreground">
                      Yes, you can create a professional LLC Operating Agreement online using our AI-powered generator. Our tool asks smart questions to customize every clause to your specific situation and state requirements. The generated document is legally compliant, state-specific, and ready to sign. However, we always recommend having an attorney review complex agreements or high-stakes business arrangements.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground">What's the difference between member-managed and manager-managed LLCs?</h3>
                    <p className="mt-2 text-muted-foreground">
                      A member-managed LLC means all members participate in daily operations and decision-making. This is common for small businesses where owners are actively involved. A manager-managed LLC designates specific members or external managers to handle operations, while other members act as passive investors. The operating agreement must clearly specify which structure applies, as this affects voting rights, decision-making authority, and fiduciary duties.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground">How much does it cost to create an LLC Operating Agreement?</h3>
                    <p className="mt-2 text-muted-foreground">
                      Creating an LLC Operating Agreement typically costs $500-$2,000 with an attorney, or $50-$200 with online templates. Our AI-powered generator creates a comprehensive, state-compliant operating agreement for $19.99 per document, or $9.99/month with our subscription for unlimited documents. This includes all essential provisions, state-specific compliance, and both PDF and DOCX formats.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Is an Operating Agreement required for a single-member LLC?</h3>
                    <p className="mt-2 text-muted-foreground">
                      While not legally required in most states, an Operating Agreement is still recommended for single-member LLCs. It helps maintain the separation between personal and business assets, strengthening liability protection. It also establishes procedures for adding members, transferring ownership, or dissolving the LLC. Banks and investors often require an operating agreement, even for single-member LLCs.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Can I modify my LLC Operating Agreement later?</h3>
                    <p className="mt-2 text-muted-foreground">
                      Yes, LLC Operating Agreements can be amended, but the process depends on what your original agreement specifies. Most agreements require a majority or supermajority vote of members to approve amendments. The amendment should be in writing, signed by all members, and kept with your original operating agreement. Our generator includes amendment procedures in the document.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Related Documents */}
          <section className="border-b border-border/40 py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                Related Documents
              </h2>
              <p className="mt-4 text-muted-foreground">
                You may also need these related business documents
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { title: "Partnership Agreement", href: "/documents/partnership_agreement", description: "Establish terms for business partnerships" },
                  { title: "Non-Disclosure Agreement", href: "/documents/non_disclosure_agreement", description: "Protect confidential business information" },
                  { title: "Service Agreement", href: "/documents/service_agreement", description: "Define terms for professional services" },
                ].map((doc) => (
                  <Link
                    key={doc.title}
                    href={doc.href}
                    className="group rounded-xl border border-border/50 bg-card/60 p-6 transition-all hover:border-primary/30 hover:bg-card/80"
                  >
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{doc.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{doc.description}</p>
                    <ArrowRight className="mt-4 h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 lg:py-24">
            <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
              <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                Ready to Create Your LLC Operating Agreement?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Answer a few AI-powered questions, pay $19.99, and download your professionally
                crafted, legally compliant operating agreement in minutes.
              </p>
              <Link href="/documents/llc_operating_agreement/generate" className="mt-8 inline-block">
                <Button size="lg" className="gap-2 shadow-lg shadow-primary/20">
                  Generate My Operating Agreement Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}

