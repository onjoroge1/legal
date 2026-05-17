import {
  FileText,
  Building2,
  Users,
  Briefcase,
  Home,
  Handshake,
  ScrollText,
  Scale,
  Heart,
} from "lucide-react"

export type CategoryId =
  | "business"
  | "employment"
  | "real-estate"
  | "estate-planning"
  | "legal-letters"
  | "financial"
  | "personal"

export interface CatalogDocument {
  title: string
  /** New hyphenated slug — used in URL: /documents/[category]/[slug] */
  slug: string
  /** Old underscore slug — used as key in legacy libs during migration */
  legacySlug: string
  category: CategoryId
  icon: typeof FileText
  description: string
  longDescription: string
  popular: boolean
  color: "primary" | "accent"
  price: number
  subscriptionPrice: number
  keywords: string[]
}

export const documentCatalog: CatalogDocument[] = [
  // ── BUSINESS ─────────────────────────────────────────────────────────────
  {
    title: "Non-Disclosure Agreement",
    slug: "non-disclosure-agreement",
    legacySlug: "nda",
    category: "business",
    icon: FileText,
    description: "Protect confidential information shared between parties.",
    longDescription:
      "A Non-Disclosure Agreement (NDA) legally binds parties to keep shared information confidential. Our AI tailors the agreement to mutual or one-way disclosure, specific industries, and your state's trade-secret statutes.",
    popular: true,
    color: "primary",
    price: 19,
    subscriptionPrice: 9,
    keywords: ["nda", "non disclosure agreement", "confidentiality agreement", "nda template"],
  },
  {
    title: "LLC Operating Agreement",
    slug: "llc-operating-agreement",
    legacySlug: "llc_operating_agreement",
    category: "business",
    icon: Building2,
    description: "Define ownership structure and operating procedures for your LLC.",
    longDescription:
      "An LLC Operating Agreement establishes how your limited liability company is managed, how profits are split, and what happens when members join or leave. Required or strongly recommended in most states.",
    popular: true,
    color: "accent",
    price: 19,
    subscriptionPrice: 9,
    keywords: ["llc operating agreement", "operating agreement", "llc agreement", "single member llc"],
  },
  {
    title: "Partnership Agreement",
    slug: "partnership-agreement",
    legacySlug: "partnership_agreement",
    category: "business",
    icon: Handshake,
    description: "Establish clear terms for business partnerships and profit sharing.",
    longDescription:
      "A Partnership Agreement defines each partner's contributions, rights, profit/loss allocation, and exit provisions. Prevent future disputes by getting the terms in writing from day one.",
    popular: false,
    color: "accent",
    price: 19,
    subscriptionPrice: 9,
    keywords: ["partnership agreement", "business partnership contract", "partner agreement", "profit sharing agreement"],
  },
  {
    title: "Service Agreement",
    slug: "service-agreement",
    legacySlug: "service_agreement",
    category: "business",
    icon: FileText,
    description: "Define terms for professional services and deliverables.",
    longDescription:
      "A Service Agreement sets the scope of work, fees, timelines, IP ownership, confidentiality, and termination terms between a service provider and their client. Works for fixed-fee or retainer engagements.",
    popular: false,
    color: "accent",
    price: 19,
    subscriptionPrice: 9,
    keywords: ["service agreement", "professional services contract", "service contract", "retainer agreement"],
  },
  {
    title: "Purchase Agreement",
    slug: "purchase-agreement",
    legacySlug: "purchase_agreement",
    category: "business",
    icon: Handshake,
    description: "Legally binding purchase agreements for goods and services.",
    longDescription:
      "A Purchase Agreement documents the sale of goods, assets, or services — including price, payment schedule, closing conditions, representations, and warranties. Essential for any significant transaction.",
    popular: false,
    color: "primary",
    price: 19,
    subscriptionPrice: 9,
    keywords: ["purchase agreement", "sales agreement", "asset purchase agreement", "purchase contract"],
  },

  // ── EMPLOYMENT ────────────────────────────────────────────────────────────
  {
    title: "Employment Contract",
    slug: "employment-contract",
    legacySlug: "employment_contract",
    category: "employment",
    icon: Briefcase,
    description: "Comprehensive employment agreements with state-specific provisions.",
    longDescription:
      "An Employment Contract clearly defines the role, compensation, benefits, start date, termination terms, and post-employment obligations. Our AI adjusts for at-will vs. fixed-term arrangements and your state's labor laws.",
    popular: false,
    color: "primary",
    price: 19,
    subscriptionPrice: 9,
    keywords: ["employment contract", "employment agreement", "job contract", "at will employment"],
  },
  {
    title: "Independent Contractor Agreement",
    slug: "independent-contractor-agreement",
    legacySlug: "independent_contractor_agreement",
    category: "employment",
    icon: Users,
    description: "Define the terms of engagement with freelancers and contractors.",
    longDescription:
      "An Independent Contractor Agreement establishes the working relationship, scope of services, payment terms, IP ownership, and contractor status. Helps businesses avoid misclassification risk.",
    popular: false,
    color: "primary",
    price: 19,
    subscriptionPrice: 9,
    keywords: ["independent contractor agreement", "contractor contract", "freelance agreement", "1099 agreement"],
  },
  {
    title: "Non-Compete Agreement",
    slug: "non-compete-agreement",
    legacySlug: "non_compete_agreement",
    category: "employment",
    icon: Briefcase,
    description: "Protect your business with enforceable non-compete clauses.",
    longDescription:
      "A Non-Compete Agreement prevents employees or contractors from working with competitors for a defined period after leaving. Our AI flags state-specific enforceability limitations (e.g., California's near-total ban) so you know exactly where the agreement stands.",
    popular: false,
    color: "accent",
    price: 19,
    subscriptionPrice: 9,
    keywords: ["non compete agreement", "noncompete contract", "restrictive covenant", "non compete template"],
  },

  // ── REAL ESTATE ───────────────────────────────────────────────────────────
  {
    title: "Residential Lease Agreement",
    slug: "residential-lease-agreement",
    legacySlug: "residential_lease_agreement",
    category: "real-estate",
    icon: Home,
    description: "Legally binding lease agreements compliant with local tenant laws.",
    longDescription:
      "A Residential Lease Agreement sets rent, lease term, security deposit, maintenance responsibilities, and tenant/landlord rights. Our AI incorporates your state's mandatory disclosures and habitability standards.",
    popular: true,
    color: "accent",
    price: 19,
    subscriptionPrice: 9,
    keywords: ["residential lease agreement", "rental agreement", "lease template", "tenant landlord agreement"],
  },
  {
    title: "Commercial Lease Agreement",
    slug: "commercial-lease-agreement",
    legacySlug: "commercial_lease_agreement",
    category: "real-estate",
    icon: Building2,
    description: "Professional commercial property lease with full legal protections.",
    longDescription:
      "A Commercial Lease Agreement covers permitted use, rent schedule, CAM charges, lease improvements, insurance requirements, and default remedies. Structured for gross, net, or triple-net configurations.",
    popular: false,
    color: "primary",
    price: 19,
    subscriptionPrice: 9,
    keywords: ["commercial lease agreement", "commercial lease", "business lease", "cam charges"],
  },

  // ── ESTATE PLANNING ───────────────────────────────────────────────────────
  {
    title: "Power of Attorney",
    slug: "power-of-attorney",
    legacySlug: "power_of_attorney",
    category: "estate-planning",
    icon: ScrollText,
    description: "Authorize someone to act on your behalf in legal or financial matters.",
    longDescription:
      "A Power of Attorney grants a trusted agent authority to make legal, financial, or healthcare decisions on your behalf. Our AI tailors the scope (general, limited, or durable) and meets your state's notarization and witness requirements.",
    popular: true,
    color: "primary",
    price: 19,
    subscriptionPrice: 9,
    keywords: ["power of attorney", "poa form", "durable power of attorney", "medical power of attorney"],
  },
  {
    title: "Last Will & Testament",
    slug: "last-will-and-testament",
    legacySlug: "last_will_testament",
    category: "estate-planning",
    icon: Scale,
    description: "Protect your legacy with a state-compliant will document.",
    longDescription:
      "A Last Will & Testament specifies how your assets are distributed, who serves as executor, and (if applicable) who cares for minor children. Our AI ensures state-specific witness and signature requirements are met.",
    popular: false,
    color: "accent",
    price: 19,
    subscriptionPrice: 9,
    keywords: ["last will and testament", "make a will", "online will", "will template", "estate planning document"],
  },
]

// ── Lookup helpers ────────────────────────────────────────────────────────────

/** Look up by new hyphenated slug */
export function getDocumentBySlug(slug: string): CatalogDocument | undefined {
  return documentCatalog.find((doc) => doc.slug === slug)
}

/** Look up by legacy underscore slug (used by existing generate/prompt APIs) */
export function getDocumentByLegacySlug(legacySlug: string): CatalogDocument | undefined {
  return documentCatalog.find((doc) => doc.legacySlug === legacySlug)
}

/** All documents in a given category */
export function getDocumentsByCategory(category: CategoryId): CatalogDocument[] {
  return documentCatalog.filter((doc) => doc.category === category)
}

/** The canonical URL path for a document: /documents/[category]/[slug] */
export function getDocumentPath(doc: CatalogDocument): string {
  return `/documents/${doc.category}/${doc.slug}`
}

/** Canonical absolute URL */
export function getDocumentCanonicalUrl(doc: CatalogDocument): string {
  return `https://legallawdocs.com/documents/${doc.category}/${doc.slug}`
}
