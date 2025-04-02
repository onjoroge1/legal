import { LucideIcon, Briefcase, Scale, Building, Home, FileText, Users, Handshake, Heart, Car, GraduationCap, Gavel, ShieldCheck, Coins, ScrollText } from "lucide-react"

export interface Template {
  id: string
  name: string
  description: string
  type?: string
  category?: string
}

export interface TemplateCategory {
  id: string
  name: string
  description: string
  icon?: LucideIcon
  color?: string
  templates: Template[]
}

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  {
    id: "employment",
    name: "Employment & HR",
    description: "Employment contracts, offer letters, NDAs, and other HR documents",
    icon: Briefcase,
    color: "text-blue-500",
    templates: [
      {
        id: "standard-employment",
        name: "Standard Employment Agreement",
        description: "Full-time employment contract with standard terms",
        type: "contract",
        category: "employment"
      },
      {
        id: "contractor-agreement",
        name: "Independent Contractor Agreement",
        description: "Contract for freelancers and contractors",
        type: "contract",
        category: "employment"
      },
      {
        id: "nda-agreement",
        name: "Non-Disclosure Agreement",
        description: "Confidentiality agreement for employees",
        type: "agreement",
        category: "employment"
      }
    ]
  },
  {
    id: "business",
    name: "Business Formation",
    description: "Company formation, partnership agreements, and corporate documents",
    icon: Building,
    color: "text-green-500",
    templates: [
      {
        id: "llc-formation",
        name: "LLC Formation",
        description: "Limited Liability Company formation documents",
      },
      {
        id: "partnership-agreement",
        name: "Partnership Agreement",
        description: "General partnership agreement template",
      }
    ]
  },
  {
    id: "real-estate",
    name: "Real Estate",
    description: "Legal documents for real estate transactions",
    icon: Home,
    color: "text-purple-500",
    templates: [
      {
        id: "apartment-lease",
        name: "Apartment Lease",
        description: "Standard apartment lease agreement",
        type: "lease",
        category: "real-estate",
      },
      {
        id: "lease-termination",
        name: "Lease Termination",
        description: "Notice to terminate a lease agreement",
        type: "notice",
        category: "real-estate",
      },
      {
        id: "rental-application",
        name: "Rental Application",
        description: "Standard rental application form",
        type: "application",
        category: "real-estate",
      },
      {
        id: "sublease-agreement",
        name: "Sublease Agreement",
        description: "Agreement for subletting a property",
        type: "lease",
        category: "real-estate",
      },
      {
        id: "move-in-inspection",
        name: "Move-in Inspection",
        description: "Property condition inspection form",
        type: "inspection",
        category: "real-estate",
      },
      {
        id: "lease-amendment",
        name: "Lease Amendment",
        description: "Modify existing lease terms",
        type: "amendment",
        category: "real-estate",
      },
      {
        id: "notice-to-vacate",
        name: "Notice to Vacate",
        description: "Notice to vacate the property",
        type: "notice",
        category: "real-estate",
      },
      {
        id: "lease-renewal",
        name: "Lease Renewal",
        description: "Renew existing lease agreement",
        type: "lease",
        category: "real-estate",
      },
      {
        id: "property-management",
        name: "Property Management",
        description: "Property management agreement",
        type: "agreement",
        category: "real-estate",
      },
      {
        id: "tenant-screening",
        name: "Tenant Screening",
        description: "Tenant screening questionnaire",
        type: "application",
        category: "real-estate",
      },
      {
        id: "co-signer",
        name: "Co-Signer Agreement",
        description: "Agreement for a co-signer on a lease",
        type: "agreement",
        category: "real-estate",
      },
    ]
  },
  {
    id: "intellectual-property",
    name: "Intellectual Property",
    description: "IP assignments, licensing agreements, and patents",
    icon: FileText,
    color: "text-yellow-500",
    templates: [
      {
        id: "ip-assignment",
        name: "IP Assignment Agreement",
        description: "Transfer intellectual property rights",
      },
      {
        id: "license-agreement",
        name: "License Agreement",
        description: "License intellectual property to others",
      }
    ]
  },
  {
    id: "contracts",
    name: "General Contracts",
    description: "Service agreements, sales contracts, and general business contracts",
    icon: Scale,
    color: "text-red-500",
    templates: [
      {
        id: "service-agreement",
        name: "Service Agreement",
        description: "General service provider agreement",
      },
      {
        id: "sales-contract",
        name: "Sales Contract",
        description: "Product or service sales agreement",
      }
    ]
  },
  {
    id: "corporate",
    name: "Corporate Governance",
    description: "Board resolutions, bylaws, and corporate policies",
    icon: Users,
    color: "text-indigo-500",
    templates: [
      {
        id: "board-resolution",
        name: "Board Resolution",
        description: "Standard board meeting resolution",
      },
      {
        id: "corporate-bylaws",
        name: "Corporate Bylaws",
        description: "Company bylaws template",
      }
    ]
  },
  {
    id: "partnerships",
    name: "Partnerships & Joint Ventures",
    description: "Joint venture agreements, partnership dissolutions, and profit sharing",
    icon: Handshake,
    color: "text-emerald-500",
    templates: [
      {
        id: "joint-venture",
        name: "Joint Venture Agreement",
        description: "Establish terms for business collaboration",
      },
      {
        id: "profit-sharing",
        name: "Profit Sharing Agreement",
        description: "Define profit distribution terms",
      }
    ]
  },
  {
    id: "family",
    name: "Family & Personal",
    description: "Wills, trusts, power of attorney, and family agreements",
    icon: Heart,
    color: "text-pink-500",
    templates: [
      {
        id: "last-will",
        name: "Last Will and Testament",
        description: "Basic will template",
      },
      {
        id: "power-of-attorney",
        name: "Power of Attorney",
        description: "Authorize legal representation",
      }
    ]
  },
  {
    id: "automotive",
    name: "Automotive & Transport",
    description: "Vehicle sales, leases, and transport agreements",
    icon: Car,
    color: "text-slate-500",
    templates: [
      {
        id: "vehicle-sale",
        name: "Vehicle Sale Agreement",
        description: "Car sale contract template",
      },
      {
        id: "transport-agreement",
        name: "Transport Agreement",
        description: "Goods transportation contract",
      }
    ]
  },
  {
    id: "education",
    name: "Education & Training",
    description: "Training agreements, student contracts, and education policies",
    icon: GraduationCap,
    color: "text-orange-500",
    templates: [
      {
        id: "training-agreement",
        name: "Training Agreement",
        description: "Professional training contract",
      },
      {
        id: "student-contract",
        name: "Student Agreement",
        description: "Educational institution contract",
      }
    ]
  },
  {
    id: "legal-services",
    name: "Legal Services",
    description: "Attorney retainers, legal service agreements, and client contracts",
    icon: Gavel,
    color: "text-stone-500",
    templates: [
      {
        id: "retainer-agreement",
        name: "Attorney Retainer",
        description: "Legal services engagement",
      },
      {
        id: "legal-services",
        name: "Legal Services Agreement",
        description: "Professional services contract",
      }
    ]
  },
  {
    id: "privacy-security",
    name: "Privacy & Security",
    description: "Privacy policies, data protection, and security agreements",
    icon: ShieldCheck,
    color: "text-cyan-500",
    templates: [
      {
        id: "privacy-policy",
        name: "Privacy Policy",
        description: "Website privacy policy",
      },
      {
        id: "data-processing",
        name: "Data Processing Agreement",
        description: "GDPR compliant data handling",
      }
    ]
  },
  {
    id: "financial",
    name: "Financial & Investment",
    description: "Investment agreements, loans, and financial contracts",
    icon: Coins,
    color: "text-amber-500",
    templates: [
      {
        id: "loan-agreement",
        name: "Loan Agreement",
        description: "Personal or business loan contract",
      },
      {
        id: "investment-agreement",
        name: "Investment Agreement",
        description: "Terms for financial investment",
      }
    ]
  },
  {
    id: "settlement",
    name: "Settlement & Disputes",
    description: "Settlement agreements, releases, and dispute resolutions",
    icon: ScrollText,
    color: "text-rose-500",
    templates: [
      {
        id: "settlement-agreement",
        name: "Settlement Agreement",
        description: "Dispute resolution terms",
      },
      {
        id: "release-agreement",
        name: "Release Agreement",
        description: "Liability release contract",
      }
    ]
  }
] 