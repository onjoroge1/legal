import {
  FileText,
  Building2,
  Users,
  Briefcase,
  Home,
  Handshake,
  ScrollText,
  Scale,
  Mail,
  DollarSign,
  User,
  AlertCircle,
  Receipt,
  Car,
  FileSignature,
} from "lucide-react"

export type CategoryId =
  | "business"
  | "employment"
  | "real-estate"
  | "estate-planning"
  | "legal-letters"
  | "financial"
  | "personal"

export type MonetizationTier = "basic" | "high-value" | "premium"

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

  // ── Sprint 2: SEO enrichment fields ──────────────────────────────────────
  /** Slugs of related documents (same or cross-category) */
  relatedDocuments: string[]
  /** Slugs of related blog posts — populated as blog content is created */
  relatedBlogs: string[]
  /** Whether state-specific variants will be generated (e.g. california-nda) */
  stateEligible: boolean
  /** Whether city-specific variants make sense for this document type */
  cityEligible: boolean
  /** Whether international variants are planned */
  internationalEligible: boolean
  /** Practice areas for lawyer marketplace matching */
  practiceAreas: string[]
  /** Whether this page should show the lawyer listing block */
  lawyerListingEnabled: boolean
  /** Determines ad pricing tier in the lawyer marketplace */
  monetizationTier: MonetizationTier
  /** Suggested monthly listing price (USD) for lawyer advertisers */
  suggestedListingPrice: number
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
    relatedDocuments: [
      "independent-contractor-agreement",
      "service-agreement",
      "employment-contract",
      "non-compete-agreement",
      "partnership-agreement",
    ],
    relatedBlogs: [],
    stateEligible: true,
    cityEligible: false,
    internationalEligible: true,
    practiceAreas: ["business-contracts", "intellectual-property", "startups"],
    lawyerListingEnabled: true,
    monetizationTier: "high-value",
    suggestedListingPrice: 249,
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
    relatedDocuments: [
      "partnership-agreement",
      "non-disclosure-agreement",
      "service-agreement",
      "purchase-agreement",
    ],
    relatedBlogs: [],
    stateEligible: true,
    cityEligible: false,
    internationalEligible: false,
    practiceAreas: ["business-formation", "startups", "corporate-law"],
    lawyerListingEnabled: true,
    monetizationTier: "premium",
    suggestedListingPrice: 349,
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
    relatedDocuments: [
      "llc-operating-agreement",
      "non-disclosure-agreement",
      "service-agreement",
      "purchase-agreement",
    ],
    relatedBlogs: [],
    stateEligible: true,
    cityEligible: false,
    internationalEligible: true,
    practiceAreas: ["business-formation", "business-contracts", "corporate-law"],
    lawyerListingEnabled: true,
    monetizationTier: "high-value",
    suggestedListingPrice: 299,
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
    relatedDocuments: [
      "non-disclosure-agreement",
      "independent-contractor-agreement",
      "purchase-agreement",
      "non-compete-agreement",
    ],
    relatedBlogs: [],
    stateEligible: true,
    cityEligible: false,
    internationalEligible: true,
    practiceAreas: ["business-contracts", "intellectual-property"],
    lawyerListingEnabled: true,
    monetizationTier: "basic",
    suggestedListingPrice: 149,
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
    relatedDocuments: [
      "service-agreement",
      "bill-of-sale",
      "payment-plan-agreement",
      "non-disclosure-agreement",
    ],
    relatedBlogs: [],
    stateEligible: true,
    cityEligible: false,
    internationalEligible: true,
    practiceAreas: ["business-contracts", "real-estate", "corporate-law"],
    lawyerListingEnabled: true,
    monetizationTier: "high-value",
    suggestedListingPrice: 249,
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
    relatedDocuments: [
      "non-disclosure-agreement",
      "non-compete-agreement",
      "independent-contractor-agreement",
      "demand-letter",
    ],
    relatedBlogs: [],
    stateEligible: true,
    cityEligible: false,
    internationalEligible: true,
    practiceAreas: ["employment-law", "labor-law", "business-contracts"],
    lawyerListingEnabled: true,
    monetizationTier: "high-value",
    suggestedListingPrice: 249,
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
    relatedDocuments: [
      "non-disclosure-agreement",
      "service-agreement",
      "non-compete-agreement",
      "employment-contract",
    ],
    relatedBlogs: [],
    stateEligible: true,
    cityEligible: false,
    internationalEligible: true,
    practiceAreas: ["employment-law", "business-contracts"],
    lawyerListingEnabled: true,
    monetizationTier: "basic",
    suggestedListingPrice: 149,
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
    relatedDocuments: [
      "employment-contract",
      "non-disclosure-agreement",
      "independent-contractor-agreement",
      "service-agreement",
    ],
    relatedBlogs: [],
    stateEligible: true,
    cityEligible: false,
    internationalEligible: false,
    practiceAreas: ["employment-law", "business-contracts", "intellectual-property"],
    lawyerListingEnabled: true,
    monetizationTier: "high-value",
    suggestedListingPrice: 249,
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
    relatedDocuments: [
      "commercial-lease-agreement",
      "demand-letter",
      "notice-of-breach",
      "payment-plan-agreement",
    ],
    relatedBlogs: [],
    stateEligible: true,
    cityEligible: true,
    internationalEligible: true,
    practiceAreas: ["real-estate", "landlord-tenant", "property-management"],
    lawyerListingEnabled: true,
    monetizationTier: "premium",
    suggestedListingPrice: 349,
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
    relatedDocuments: [
      "residential-lease-agreement",
      "purchase-agreement",
      "service-agreement",
      "demand-letter",
    ],
    relatedBlogs: [],
    stateEligible: true,
    cityEligible: true,
    internationalEligible: false,
    practiceAreas: ["real-estate", "business-contracts", "landlord-tenant"],
    lawyerListingEnabled: true,
    monetizationTier: "premium",
    suggestedListingPrice: 349,
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
    relatedDocuments: [
      "last-will-and-testament",
      "general-release-of-liability",
      "affidavit",
    ],
    relatedBlogs: [],
    stateEligible: true,
    cityEligible: false,
    internationalEligible: true,
    practiceAreas: ["estate-planning", "elder-law", "probate"],
    lawyerListingEnabled: true,
    monetizationTier: "premium",
    suggestedListingPrice: 349,
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
    relatedDocuments: [
      "power-of-attorney",
      "affidavit",
      "general-release-of-liability",
    ],
    relatedBlogs: [],
    stateEligible: true,
    cityEligible: false,
    internationalEligible: true,
    practiceAreas: ["estate-planning", "probate", "elder-law"],
    lawyerListingEnabled: true,
    monetizationTier: "premium",
    suggestedListingPrice: 399,
  },

  // ── LEGAL LETTERS ─────────────────────────────────────────────────────────
  {
    title: "Demand Letter",
    slug: "demand-letter",
    legacySlug: "demand_letter",
    category: "legal-letters",
    icon: Mail,
    description: "Formally demand payment or action before legal proceedings.",
    longDescription:
      "A Demand Letter puts the other party on notice that you intend to pursue legal remedies if they do not fulfill an obligation. Our AI drafts clear, professional demand language that establishes a paper trail and demonstrates good-faith effort before litigation.",
    popular: true,
    color: "primary",
    price: 19,
    subscriptionPrice: 9,
    keywords: ["demand letter", "demand letter template", "payment demand letter", "legal demand letter"],
    relatedDocuments: [
      "cease-and-desist-letter",
      "notice-of-breach",
      "payment-plan-agreement",
      "debt-settlement-agreement",
    ],
    relatedBlogs: [],
    stateEligible: true,
    cityEligible: false,
    internationalEligible: true,
    practiceAreas: ["litigation", "collections", "business-contracts", "landlord-tenant"],
    lawyerListingEnabled: true,
    monetizationTier: "high-value",
    suggestedListingPrice: 199,
  },
  {
    title: "Cease and Desist Letter",
    slug: "cease-and-desist-letter",
    legacySlug: "cease_and_desist_letter",
    category: "legal-letters",
    icon: AlertCircle,
    description: "Order someone to stop harmful, infringing, or unlawful activity.",
    longDescription:
      "A Cease and Desist Letter formally demands that a person or entity stop a specific behavior — whether it's copyright infringement, defamation, harassment, or contract violation. Our AI generates firm, legally accurate language appropriate to your situation.",
    popular: true,
    color: "accent",
    price: 19,
    subscriptionPrice: 9,
    keywords: [
      "cease and desist letter",
      "cease and desist template",
      "copyright infringement letter",
      "harassment cease and desist",
    ],
    relatedDocuments: [
      "demand-letter",
      "notice-of-breach",
      "complaint-letter",
      "non-disclosure-agreement",
    ],
    relatedBlogs: [],
    stateEligible: true,
    cityEligible: false,
    internationalEligible: true,
    practiceAreas: ["intellectual-property", "litigation", "employment-law"],
    lawyerListingEnabled: true,
    monetizationTier: "high-value",
    suggestedListingPrice: 249,
  },
  {
    title: "Notice of Breach of Contract",
    slug: "notice-of-breach",
    legacySlug: "notice_of_breach",
    category: "legal-letters",
    icon: FileSignature,
    description: "Formally notify a party of their failure to perform contractual obligations.",
    longDescription:
      "A Notice of Breach of Contract formally informs the breaching party of the specific contractual obligations they have failed to meet, the timeline for cure, and the consequences of inaction. Serves as a critical paper-trail document before termination or litigation.",
    popular: false,
    color: "primary",
    price: 19,
    subscriptionPrice: 9,
    keywords: ["notice of breach", "breach of contract letter", "contract default notice", "breach notice template"],
    relatedDocuments: [
      "demand-letter",
      "cease-and-desist-letter",
      "complaint-letter",
      "service-agreement",
    ],
    relatedBlogs: [],
    stateEligible: true,
    cityEligible: false,
    internationalEligible: true,
    practiceAreas: ["business-contracts", "litigation", "landlord-tenant"],
    lawyerListingEnabled: true,
    monetizationTier: "basic",
    suggestedListingPrice: 149,
  },
  {
    title: "Complaint Letter",
    slug: "complaint-letter",
    legacySlug: "complaint_letter",
    category: "legal-letters",
    icon: Mail,
    description: "Draft a formal complaint to a business, agency, or individual.",
    longDescription:
      "A Complaint Letter communicates dissatisfaction and requests a specific remedy — refund, correction, or action — from a company, government body, or individual. Our AI ensures your complaint is clear, factual, and professionally worded to maximize your chances of resolution.",
    popular: false,
    color: "accent",
    price: 19,
    subscriptionPrice: 9,
    keywords: ["complaint letter", "formal complaint letter", "consumer complaint letter", "complaint template"],
    relatedDocuments: [
      "demand-letter",
      "cease-and-desist-letter",
      "notice-of-breach",
    ],
    relatedBlogs: [],
    stateEligible: false,
    cityEligible: false,
    internationalEligible: true,
    practiceAreas: ["consumer-protection", "litigation", "employment-law"],
    lawyerListingEnabled: false,
    monetizationTier: "basic",
    suggestedListingPrice: 99,
  },
  {
    title: "Final Notice Before Legal Action",
    slug: "final-notice-before-legal-action",
    legacySlug: "final_notice_before_legal_action",
    category: "legal-letters",
    icon: AlertCircle,
    description: "Last written warning before filing a claim or lawsuit.",
    longDescription:
      "A Final Notice Before Legal Action is your last formal communication before escalating to court or a collection agency. It clearly states the amount owed or action required, the deadline to comply, and the specific legal remedies you intend to pursue.",
    popular: false,
    color: "primary",
    price: 19,
    subscriptionPrice: 9,
    keywords: ["final notice letter", "pre-legal action notice", "last chance letter", "final demand letter"],
    relatedDocuments: [
      "demand-letter",
      "notice-of-breach",
      "debt-settlement-agreement",
      "payment-plan-agreement",
    ],
    relatedBlogs: [],
    stateEligible: true,
    cityEligible: false,
    internationalEligible: true,
    practiceAreas: ["collections", "litigation", "landlord-tenant"],
    lawyerListingEnabled: true,
    monetizationTier: "basic",
    suggestedListingPrice: 149,
  },
  {
    title: "Debt Settlement Letter",
    slug: "debt-settlement-letter",
    legacySlug: "debt_settlement_letter",
    category: "legal-letters",
    icon: DollarSign,
    description: "Negotiate and document a partial debt settlement agreement.",
    longDescription:
      "A Debt Settlement Letter proposes or confirms a reduced payoff amount to settle an outstanding debt in full. Our AI ensures the language protects you from future claims once the agreed amount is paid.",
    popular: false,
    color: "accent",
    price: 19,
    subscriptionPrice: 9,
    keywords: ["debt settlement letter", "debt negotiation letter", "settle debt letter", "debt payoff letter"],
    relatedDocuments: [
      "demand-letter",
      "final-notice-before-legal-action",
      "debt-settlement-agreement",
      "payment-plan-agreement",
    ],
    relatedBlogs: [],
    stateEligible: true,
    cityEligible: false,
    internationalEligible: false,
    practiceAreas: ["collections", "consumer-protection", "banking-finance"],
    lawyerListingEnabled: true,
    monetizationTier: "basic",
    suggestedListingPrice: 149,
  },
  {
    title: "Landlord Notice to Vacate",
    slug: "landlord-notice-to-vacate",
    legacySlug: "landlord_notice_to_vacate",
    category: "legal-letters",
    icon: Home,
    description: "Formally notify a tenant to vacate the property by a specific date.",
    longDescription:
      "A Landlord Notice to Vacate formally informs a tenant that they must leave the property, whether due to lease expiration, non-payment, or lease violations. Our AI generates state-compliant notices with correct notice periods and required statutory language.",
    popular: false,
    color: "primary",
    price: 19,
    subscriptionPrice: 9,
    keywords: ["notice to vacate", "eviction notice", "landlord notice", "tenant eviction letter"],
    relatedDocuments: [
      "residential-lease-agreement",
      "demand-letter",
      "notice-of-breach",
      "final-notice-before-legal-action",
    ],
    relatedBlogs: [],
    stateEligible: true,
    cityEligible: true,
    internationalEligible: false,
    practiceAreas: ["landlord-tenant", "real-estate", "litigation"],
    lawyerListingEnabled: true,
    monetizationTier: "high-value",
    suggestedListingPrice: 199,
  },

  // ── FINANCIAL ─────────────────────────────────────────────────────────────
  {
    title: "Promissory Note",
    slug: "promissory-note",
    legacySlug: "promissory_note",
    category: "financial",
    icon: Receipt,
    description: "Document a loan with a legally binding promise to repay.",
    longDescription:
      "A Promissory Note is a written promise to repay a specific amount by a certain date or on demand. Our AI includes all required terms: principal, interest rate, payment schedule, late fees, and default provisions.",
    popular: true,
    color: "primary",
    price: 19,
    subscriptionPrice: 9,
    keywords: ["promissory note", "promissory note template", "loan note", "ious legal document"],
    relatedDocuments: [
      "loan-agreement",
      "payment-plan-agreement",
      "debt-settlement-agreement",
      "bill-of-sale",
    ],
    relatedBlogs: [],
    stateEligible: true,
    cityEligible: false,
    internationalEligible: false,
    practiceAreas: ["banking-finance", "collections", "business-contracts"],
    lawyerListingEnabled: true,
    monetizationTier: "high-value",
    suggestedListingPrice: 199,
  },
  {
    title: "Loan Agreement",
    slug: "loan-agreement",
    legacySlug: "loan_agreement",
    category: "financial",
    icon: DollarSign,
    description: "Formal agreement between lender and borrower with repayment terms.",
    longDescription:
      "A Loan Agreement is a comprehensive contract that specifies loan amount, interest rate, repayment schedule, collateral (if any), and consequences of default. More detailed than a promissory note and appropriate for larger loans.",
    popular: false,
    color: "accent",
    price: 19,
    subscriptionPrice: 9,
    keywords: ["loan agreement", "personal loan agreement", "loan contract template", "private loan agreement"],
    relatedDocuments: [
      "promissory-note",
      "payment-plan-agreement",
      "debt-settlement-agreement",
    ],
    relatedBlogs: [],
    stateEligible: true,
    cityEligible: false,
    internationalEligible: false,
    practiceAreas: ["banking-finance", "business-contracts", "collections"],
    lawyerListingEnabled: true,
    monetizationTier: "high-value",
    suggestedListingPrice: 249,
  },
  {
    title: "Payment Plan Agreement",
    slug: "payment-plan-agreement",
    legacySlug: "payment_plan_agreement",
    category: "financial",
    icon: Receipt,
    description: "Structure an installment payment schedule for a debt or purchase.",
    longDescription:
      "A Payment Plan Agreement allows a debtor and creditor to agree on a structured schedule for repaying a debt in installments. Includes payment dates, amounts, interest (if applicable), and default consequences.",
    popular: false,
    color: "primary",
    price: 19,
    subscriptionPrice: 9,
    keywords: ["payment plan agreement", "installment agreement", "payment schedule template", "debt payment plan"],
    relatedDocuments: [
      "promissory-note",
      "loan-agreement",
      "debt-settlement-agreement",
      "demand-letter",
    ],
    relatedBlogs: [],
    stateEligible: false,
    cityEligible: false,
    internationalEligible: true,
    practiceAreas: ["collections", "consumer-protection", "banking-finance"],
    lawyerListingEnabled: false,
    monetizationTier: "basic",
    suggestedListingPrice: 99,
  },
  {
    title: "Bill of Sale",
    slug: "bill-of-sale",
    legacySlug: "bill_of_sale",
    category: "financial",
    icon: FileText,
    description: "Transfer ownership of personal property with a legal record.",
    longDescription:
      "A Bill of Sale is a legal document that records the transfer of ownership of personal property — vehicles, equipment, goods — from seller to buyer. Includes item description, sale price, condition, and as-is clauses where applicable.",
    popular: false,
    color: "accent",
    price: 19,
    subscriptionPrice: 9,
    keywords: ["bill of sale", "bill of sale template", "vehicle bill of sale", "personal property bill of sale"],
    relatedDocuments: [
      "purchase-agreement",
      "vehicle-bill-of-sale",
      "promissory-note",
      "payment-plan-agreement",
    ],
    relatedBlogs: [],
    stateEligible: true,
    cityEligible: false,
    internationalEligible: false,
    practiceAreas: ["business-contracts", "real-estate"],
    lawyerListingEnabled: false,
    monetizationTier: "basic",
    suggestedListingPrice: 99,
  },
  {
    title: "Debt Settlement Agreement",
    slug: "debt-settlement-agreement",
    legacySlug: "debt_settlement_agreement",
    category: "financial",
    icon: DollarSign,
    description: "Formally settle a debt for less than the full amount owed.",
    longDescription:
      "A Debt Settlement Agreement is a binding contract between debtor and creditor that settles an outstanding debt for an agreed reduced sum. Protects both parties — the debtor from future claims, the creditor from a total loss.",
    popular: false,
    color: "primary",
    price: 19,
    subscriptionPrice: 9,
    keywords: [
      "debt settlement agreement",
      "settle debt contract",
      "debt forgiveness agreement",
      "debt payoff agreement",
    ],
    relatedDocuments: [
      "promissory-note",
      "payment-plan-agreement",
      "debt-settlement-letter",
      "demand-letter",
    ],
    relatedBlogs: [],
    stateEligible: false,
    cityEligible: false,
    internationalEligible: false,
    practiceAreas: ["collections", "banking-finance", "consumer-protection"],
    lawyerListingEnabled: true,
    monetizationTier: "high-value",
    suggestedListingPrice: 199,
  },

  // ── PERSONAL ──────────────────────────────────────────────────────────────
  {
    title: "Affidavit",
    slug: "affidavit",
    legacySlug: "affidavit",
    category: "personal",
    icon: FileSignature,
    description: "Sworn written statement of facts for legal proceedings.",
    longDescription:
      "An Affidavit is a sworn written statement used as evidence in legal proceedings, government applications, or business transactions. Our AI guides you through the required components: declarant identity, statement of facts, oath, and notarization block.",
    popular: true,
    color: "primary",
    price: 19,
    subscriptionPrice: 9,
    keywords: ["affidavit", "affidavit template", "sworn statement", "affidavit of fact"],
    relatedDocuments: [
      "power-of-attorney",
      "general-release-of-liability",
      "last-will-and-testament",
    ],
    relatedBlogs: [],
    stateEligible: true,
    cityEligible: false,
    internationalEligible: true,
    practiceAreas: ["litigation", "estate-planning", "immigration"],
    lawyerListingEnabled: true,
    monetizationTier: "basic",
    suggestedListingPrice: 149,
  },
  {
    title: "General Release of Liability",
    slug: "general-release-of-liability",
    legacySlug: "general_release_of_liability",
    category: "personal",
    icon: FileText,
    description: "Waive your right to make future claims against another party.",
    longDescription:
      "A General Release of Liability waives a party's right to bring future claims arising from a specific event or agreement. Commonly used after settlements, accidents, or service transactions where one party agrees not to sue.",
    popular: false,
    color: "accent",
    price: 19,
    subscriptionPrice: 9,
    keywords: ["release of liability", "liability waiver", "general release", "hold harmless agreement"],
    relatedDocuments: [
      "affidavit",
      "demand-letter",
      "service-agreement",
      "power-of-attorney",
    ],
    relatedBlogs: [],
    stateEligible: true,
    cityEligible: false,
    internationalEligible: false,
    practiceAreas: ["litigation", "business-contracts", "personal-injury"],
    lawyerListingEnabled: true,
    monetizationTier: "basic",
    suggestedListingPrice: 149,
  },
  {
    title: "Vehicle Bill of Sale",
    slug: "vehicle-bill-of-sale",
    legacySlug: "vehicle_bill_of_sale",
    category: "personal",
    icon: Car,
    description: "Transfer ownership of a vehicle with a legally valid sales record.",
    longDescription:
      "A Vehicle Bill of Sale records the private-party sale of a car, truck, motorcycle, or other vehicle. Our AI includes the required DMV-ready fields: VIN, odometer disclosure, sale price, condition acknowledgment, and as-is clause.",
    popular: false,
    color: "primary",
    price: 19,
    subscriptionPrice: 9,
    keywords: ["vehicle bill of sale", "car bill of sale", "auto bill of sale", "dmv bill of sale"],
    relatedDocuments: [
      "bill-of-sale",
      "promissory-note",
      "general-release-of-liability",
    ],
    relatedBlogs: [],
    stateEligible: true,
    cityEligible: false,
    internationalEligible: false,
    practiceAreas: ["consumer-protection", "business-contracts"],
    lawyerListingEnabled: false,
    monetizationTier: "basic",
    suggestedListingPrice: 99,
  },
  {
    title: "Personal Property Agreement",
    slug: "personal-property-agreement",
    legacySlug: "personal_property_agreement",
    category: "personal",
    icon: User,
    description: "Define ownership, use, or transfer terms for personal property.",
    longDescription:
      "A Personal Property Agreement documents the agreed terms between two parties regarding the use, custody, sharing, or transfer of personal property — furniture, electronics, valuables — without a formal sale. Useful for cohabitation, separation, or informal loans.",
    popular: false,
    color: "accent",
    price: 19,
    subscriptionPrice: 9,
    keywords: ["personal property agreement", "property sharing agreement", "personal property contract"],
    relatedDocuments: [
      "bill-of-sale",
      "vehicle-bill-of-sale",
      "general-release-of-liability",
    ],
    relatedBlogs: [],
    stateEligible: false,
    cityEligible: false,
    internationalEligible: false,
    practiceAreas: ["consumer-protection", "family-law"],
    lawyerListingEnabled: false,
    monetizationTier: "basic",
    suggestedListingPrice: 99,
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

/** Resolve related documents from slug list */
export function getRelatedDocuments(slugs: string[]): CatalogDocument[] {
  return slugs
    .map((s) => getDocumentBySlug(s))
    .filter((d): d is CatalogDocument => d !== undefined)
}

/** The canonical URL path for a document: /documents/[category]/[slug] */
export function getDocumentPath(doc: CatalogDocument): string {
  return `/documents/${doc.category}/${doc.slug}`
}

/** Canonical absolute URL */
export function getDocumentCanonicalUrl(doc: CatalogDocument): string {
  return `https://legallawdocs.com/documents/${doc.category}/${doc.slug}`
}
