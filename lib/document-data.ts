import {
  FileText,
  Building2,
  Users,
  Briefcase,
  Home,
  Handshake,
} from "lucide-react"

export interface DocumentType {
  title: string
  slug: string
  category: "business" | "real-estate" | "employment" | "personal"
  icon: typeof FileText
  description: string
  popular: boolean
  color: "primary" | "accent"
  price: number
  subscriptionPrice: number
}

export const documentTypes: DocumentType[] = [
  {
    title: "Non-Disclosure Agreement",
    slug: "non_disclosure_agreement",
    category: "business",
    icon: FileText,
    description: "Protect confidential information shared between parties.",
    popular: true,
    color: "primary",
    price: 19,
    subscriptionPrice: 9,
  },
  {
    title: "LLC Operating Agreement",
    slug: "llc_operating_agreement",
    category: "business",
    icon: Building2,
    description: "Define ownership structure and operating procedures for your LLC.",
    popular: true,
    color: "accent",
    price: 19,
    subscriptionPrice: 9,
  },
  {
    title: "Employment Contract",
    slug: "employment_contract",
    category: "employment",
    icon: Briefcase,
    description: "Comprehensive employment agreements with state-specific provisions.",
    popular: false,
    color: "primary",
    price: 19,
    subscriptionPrice: 9,
  },
  {
    title: "Residential Lease Agreement",
    slug: "residential_lease_agreement",
    category: "real-estate",
    icon: Home,
    description: "Legally binding lease agreements compliant with local tenant laws.",
    popular: true,
    color: "accent",
    price: 19,
    subscriptionPrice: 9,
  },
  {
    title: "Independent Contractor Agreement",
    slug: "independent_contractor_agreement",
    category: "employment",
    icon: Users,
    description: "Define the terms of engagement with freelancers and contractors.",
    popular: false,
    color: "primary",
    price: 19,
    subscriptionPrice: 9,
  },
  {
    title: "Partnership Agreement",
    slug: "partnership_agreement",
    category: "business",
    icon: Handshake,
    description: "Establish clear terms for business partnerships and profit sharing.",
    popular: false,
    color: "accent",
    price: 19,
    subscriptionPrice: 9,
  },
  {
    title: "Power of Attorney",
    slug: "power_of_attorney",
    category: "personal",
    icon: FileText,
    description: "Authorize someone to act on your behalf in legal or financial matters.",
    popular: true,
    color: "primary",
    price: 19,
    subscriptionPrice: 9,
  },
  {
    title: "Last Will & Testament",
    slug: "last_will_testament",
    category: "personal",
    icon: FileText,
    description: "Protect your legacy with a state-compliant will document.",
    popular: false,
    color: "accent",
    price: 19,
    subscriptionPrice: 9,
  },
  {
    title: "Commercial Lease Agreement",
    slug: "commercial_lease_agreement",
    category: "real-estate",
    icon: Building2,
    description: "Professional commercial property lease with full legal protections.",
    popular: false,
    color: "primary",
    price: 19,
    subscriptionPrice: 9,
  },
  {
    title: "Service Agreement",
    slug: "service_agreement",
    category: "business",
    icon: FileText,
    description: "Define terms for professional services and deliverables.",
    popular: false,
    color: "accent",
    price: 19,
    subscriptionPrice: 9,
  },
  {
    title: "Purchase Agreement",
    slug: "purchase_agreement",
    category: "business",
    icon: Handshake,
    description: "Legally binding purchase agreements for goods and services.",
    popular: false,
    color: "primary",
    price: 19,
    subscriptionPrice: 9,
  },
  {
    title: "Non-Compete Agreement",
    slug: "non_compete_agreement",
    category: "employment",
    icon: Briefcase,
    description: "Protect your business with enforceable non-compete clauses.",
    popular: false,
    color: "accent",
    price: 19,
    subscriptionPrice: 9,
  },
]

export function getDocumentBySlug(slug: string): DocumentType | undefined {
  return documentTypes.find((doc) => doc.slug === slug)
}


