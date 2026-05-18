/**
 * Intent Registry
 *
 * Maps document types to their available intents (variants).
 * Each intent has full SEO metadata to drive indexable sub-route pages.
 *
 * Tiers:
 *   "standalone" — high-volume variant; added as its own CatalogDocument entry
 *   "subroute"   — medium-volume; rendered at /documents/[category]/[slug]/[intent]
 *   "flow-only"  — low-volume or thin; exists only inside the generate flow
 *
 * Only intents with indexable: true are included in the sitemap.
 */

export type IntentTier = "standalone" | "subroute" | "flow-only"
export type IntentPriority = "high" | "medium" | "low"

export interface DocumentIntent {
  /** Internal key used in API calls and DB — underscore format: at_will */
  id: string
  /** URL slug — hyphenated format: at-will */
  slug: string
  /** Short display label for the IntentSelector UI */
  name: string
  /** One-line description for IntentSelector UI */
  description: string
  // ── SEO fields (required when indexable: true) ────────────────────────────
  seoTitle: string
  metaDescription: string
  h1: string
  shortDescription: string
  /** Practical explanation of when to choose this variant */
  whenToUse: string
  /** 3-4 key differences vs the parent document */
  keyDifferences: string[]
  /** 4 FAQs specific to this variant */
  faq: { question: string; answer: string }[]
  // ── Indexing & routing ────────────────────────────────────────────────────
  indexable: boolean
  tier: IntentTier
  priority: IntentPriority
  // ── Relationships ─────────────────────────────────────────────────────────
  /** Other intent IDs (same parent doc) to link in "related intents" block */
  relatedIntentSlugs: string[]
  /** Catalog document slugs to show in "you might also need" block */
  relatedDocumentSlugs: string[]
  // ── Monetization ─────────────────────────────────────────────────────────
  practiceAreas: string[]
  suggestedListingPrice?: number
}

// ── NDA ───────────────────────────────────────────────────────────────────────

const ndaIntents: DocumentIntent[] = [
  {
    id: "mutual",
    slug: "mutual",
    name: "Mutual NDA",
    description: "Both parties share confidential information",
    seoTitle: "Mutual NDA Template — Create Online | LegalLawDocs.com",
    metaDescription:
      "Create a mutual non-disclosure agreement online. Both parties share confidential information under equal protection. State-compliant with instant PDF & DOCX download.",
    h1: "Mutual Non-Disclosure Agreement",
    shortDescription:
      "A Mutual NDA (also called a bilateral NDA) binds both parties to keep each other's confidential information private. Used when two companies or individuals are sharing sensitive information in both directions — during joint ventures, partnerships, or merger discussions.",
    whenToUse:
      "Choose a Mutual NDA when both parties will be sharing confidential information with each other — for example, two businesses exploring a partnership or joint venture.",
    keyDifferences: [
      "Both parties are bound by equal confidentiality obligations",
      "Both parties are simultaneously a 'disclosing party' and a 'receiving party'",
      "Remedies and penalties apply symmetrically to both sides",
      "Best for joint ventures, partnerships, and merger discussions",
    ],
    faq: [
      {
        question: "What is a mutual NDA?",
        answer:
          "A mutual NDA (bilateral NDA) is a confidentiality agreement where both parties agree to keep each other's information confidential. Unlike a one-way NDA, both parties are simultaneously disclosing and receiving confidential information.",
      },
      {
        question: "When should I use a mutual NDA instead of a one-way NDA?",
        answer:
          "Use a mutual NDA when both parties are sharing sensitive information. Common situations include exploring a business partnership, merger discussions, or joint product development where both sides have proprietary information to protect.",
      },
      {
        question: "Is a mutual NDA harder to enforce than a one-way NDA?",
        answer:
          "No — both types are equally enforceable when properly drafted. The key is ensuring the definition of confidential information and the obligations are clearly stated for both parties.",
      },
      {
        question: "Can a mutual NDA be used for employment?",
        answer:
          "Yes, but it's less common. A one-way NDA (from employee to employer) is more typical for employment. A mutual NDA makes sense when the employer is also sharing proprietary information with the employee, such as trade secrets they'll need to perform their role.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "high",
    relatedIntentSlugs: ["unilateral"],
    relatedDocumentSlugs: ["independent-contractor-agreement", "service-agreement", "partnership-agreement"],
    practiceAreas: ["business-contracts", "intellectual-property", "startups"],
    suggestedListingPrice: 249,
  },
  {
    id: "unilateral",
    slug: "unilateral",
    name: "One-Way NDA",
    description: "Only one party shares confidential information",
    seoTitle: "One-Way NDA Template (Unilateral NDA) | LegalLawDocs.com",
    metaDescription:
      "Create a one-way non-disclosure agreement online. Protect your confidential information when you are the only disclosing party. Instant PDF & DOCX download.",
    h1: "One-Way (Unilateral) Non-Disclosure Agreement",
    shortDescription:
      "A unilateral NDA protects one party's confidential information when only they are disclosing. The receiving party agrees to keep the disclosing party's information confidential. Most commonly used when sharing ideas, business plans, or trade secrets with a potential partner, employee, or vendor.",
    whenToUse:
      "Choose a one-way NDA when only you are sharing confidential information and the other party is not disclosing anything sensitive in return.",
    keyDifferences: [
      "Only one party (disclosing party) shares confidential information",
      "Only the receiving party has confidentiality obligations",
      "Simpler structure — clearly defines who is protected",
      "Common for vendor relationships, employee onboarding, and investor pitches",
    ],
    faq: [
      {
        question: "What is a one-way (unilateral) NDA?",
        answer:
          "A one-way NDA protects a single disclosing party. Only one side shares confidential information, and only the receiving party is bound by confidentiality obligations. This is the most common NDA type.",
      },
      {
        question: "Is a one-way NDA enforceable?",
        answer:
          "Yes, when properly drafted. The key requirements are a clear definition of what is confidential, specific obligations for the receiving party, a defined term, and valid consideration (usually the business relationship itself).",
      },
      {
        question: "Can an employee be asked to sign a one-way NDA?",
        answer:
          "Yes. Employers routinely ask employees and contractors to sign one-way NDAs protecting the company's trade secrets, customer lists, and proprietary processes.",
      },
      {
        question: "What is the difference between a one-way NDA and a confidentiality agreement?",
        answer:
          "They are the same thing. 'Non-disclosure agreement,' 'NDA,' and 'confidentiality agreement' are all used interchangeably to describe a contract that obligates one or both parties to keep information secret.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["mutual"],
    relatedDocumentSlugs: ["service-agreement", "employment-contract", "independent-contractor-agreement"],
    practiceAreas: ["business-contracts", "intellectual-property"],
    suggestedListingPrice: 199,
  },
]

// ── Employment Contract ────────────────────────────────────────────────────────

const employmentContractIntents: DocumentIntent[] = [
  {
    id: "at_will",
    slug: "at-will",
    name: "At-Will Employment",
    description: "Either party can end employment at any time",
    seoTitle: "At-Will Employment Contract Template | LegalLawDocs.com",
    metaDescription:
      "Create an at-will employment contract online. Either party can terminate at any time. Includes compensation, benefits, IP assignment, and confidentiality clauses.",
    h1: "At-Will Employment Contract",
    shortDescription:
      "An at-will employment contract establishes the employment relationship while making clear that either the employer or employee can terminate at any time, for any lawful reason, with or without notice. The standard arrangement in most U.S. states.",
    whenToUse:
      "Use an at-will contract for most standard U.S. employment relationships where you want flexibility to end the arrangement without a fixed term.",
    keyDifferences: [
      "Either party may terminate at any time, for any lawful reason",
      "No guaranteed employment period or severance obligation (unless specified)",
      "Explicit at-will statement protects employers in most states",
      "Standard for the majority of U.S. private-sector jobs",
    ],
    faq: [
      {
        question: "What does at-will employment mean?",
        answer:
          "At-will employment means either the employer or employee can end the employment relationship at any time, for any legal reason, without notice — unless a contract says otherwise. Most U.S. states are at-will by default.",
      },
      {
        question: "Do I need a written at-will employment contract?",
        answer:
          "Not legally required in most states, but highly recommended. A written contract documents compensation, benefits, IP ownership, confidentiality, and other terms — reducing disputes later.",
      },
      {
        question: "Can an at-will employee still sue for wrongful termination?",
        answer:
          "Yes. At-will does not mean unlimited. Termination is still illegal if it's based on protected characteristics (race, gender, religion, etc.) or violates other laws. The at-will clause protects against non-discriminatory terminations.",
      },
      {
        question: "Should I include a severance clause in an at-will contract?",
        answer:
          "It is optional but can help attract talent. If you include severance, specify the conditions (e.g., termination without cause only) and the amount to avoid ambiguity.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "high",
    relatedIntentSlugs: ["fixed_term", "executive"],
    relatedDocumentSlugs: ["non-compete-agreement", "non-disclosure-agreement", "independent-contractor-agreement"],
    practiceAreas: ["employment-law", "business-contracts"],
    suggestedListingPrice: 249,
  },
  {
    id: "fixed_term",
    slug: "fixed-term",
    name: "Fixed-Term Contract",
    description: "Employment for a specific duration with defined end date",
    seoTitle: "Fixed-Term Employment Contract Template | LegalLawDocs.com",
    metaDescription:
      "Create a fixed-term employment contract online. Define a specific employment period, renewal terms, and end-of-contract provisions. Instant PDF download.",
    h1: "Fixed-Term Employment Contract",
    shortDescription:
      "A fixed-term employment contract sets a defined start and end date for the employment relationship. Used for project-based roles, seasonal workers, or positions with a predictable end point.",
    whenToUse:
      "Use a fixed-term contract when hiring for a defined project period, covering a leave of absence, or bringing on seasonal staff.",
    keyDifferences: [
      "Employment automatically ends on the specified end date",
      "Includes renewal or conversion-to-permanent provisions",
      "Early termination clauses define notice and severance obligations",
      "Often used for project roles, maternity cover, and seasonal positions",
    ],
    faq: [
      {
        question: "What happens when a fixed-term contract expires?",
        answer:
          "The employment ends automatically unless renewed. The contract should specify whether it auto-renews, converts to at-will, or simply terminates. Many employees expect notice before expiry.",
      },
      {
        question: "Can a fixed-term employee be terminated early?",
        answer:
          "Yes, but the contract should specify the conditions and consequences. Without an early-termination clause, the employer may owe the employee wages for the remaining contract period.",
      },
      {
        question: "Is a fixed-term contract the same as a temp contract?",
        answer:
          "Not exactly. A fixed-term contract is directly between employer and employee. A temp arrangement typically involves a staffing agency. Fixed-term employees usually have more protections.",
      },
      {
        question: "How long can a fixed-term contract run?",
        answer:
          "There is no federal cap in the U.S. However, repeatedly renewing fixed-term contracts may create implied permanent employment in some states. Review state law if renewing multiple times.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["at_will", "executive"],
    relatedDocumentSlugs: ["non-compete-agreement", "independent-contractor-agreement"],
    practiceAreas: ["employment-law"],
    suggestedListingPrice: 199,
  },
  {
    id: "executive",
    slug: "executive",
    name: "Executive Contract",
    description: "High-level executive employment with additional benefits",
    seoTitle: "Executive Employment Contract Template | LegalLawDocs.com",
    metaDescription:
      "Create an executive employment contract online. Covers equity, bonuses, change-of-control provisions, and severance for C-suite and senior leadership roles.",
    h1: "Executive Employment Contract",
    shortDescription:
      "An executive employment contract covers the elevated terms for C-suite and senior leadership roles: equity grants, performance bonuses, change-of-control provisions, and enhanced severance.",
    whenToUse:
      "Use an executive contract for CEO, CFO, CTO, and VP-level hires where standard employment templates do not cover equity, golden parachutes, or complex bonus structures.",
    keyDifferences: [
      "Covers equity compensation (stock options, RSUs) and bonus structures",
      "Includes change-of-control and golden parachute provisions",
      "Enhanced severance and notice requirements",
      "Detailed non-compete and IP assignment clauses",
    ],
    faq: [
      {
        question: "What should be in an executive employment contract?",
        answer:
          "Beyond standard terms, executive contracts typically include: base salary, annual bonus target, equity grants (type, vesting, cliff), benefits, severance terms (often 6–24 months), change-of-control protections, non-compete scope, and dispute resolution.",
      },
      {
        question: "What is a golden parachute clause?",
        answer:
          "A golden parachute is a provision that provides significant compensation to a senior executive if they are terminated following a company acquisition or merger. It typically includes accelerated vesting and a cash severance payment.",
      },
      {
        question: "Do executive contracts require an attorney to be enforceable?",
        answer:
          "Not legally required, but strongly recommended for high-value arrangements. Our template covers all standard provisions, and we recommend attorney review for equity and tax-related clauses.",
      },
      {
        question: "What is the notice period for executive terminations?",
        answer:
          "Typically 30–90 days for executives, versus 0–2 weeks for standard employees. The contract should specify notice requirements for both voluntary resignation and employer-initiated termination.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["at_will", "fixed_term"],
    relatedDocumentSlugs: ["non-compete-agreement", "non-disclosure-agreement"],
    practiceAreas: ["employment-law", "corporate-law"],
    suggestedListingPrice: 299,
  },
  {
    id: "contract_to_hire",
    slug: "contract-to-hire",
    name: "Contract-to-Hire",
    description: "Temporary contract with potential for permanent employment",
    seoTitle: "Contract-to-Hire Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create a contract-to-hire agreement online. Define the trial period, conversion terms, and what happens if permanent employment does not follow.",
    h1: "Contract-to-Hire Employment Agreement",
    shortDescription:
      "A contract-to-hire agreement sets out the terms of a temporary engagement with a defined evaluation period and clear provisions for converting to permanent employment.",
    whenToUse:
      "Use when you want to evaluate a candidate for a full-time role before committing, or when a candidate wants to try the role before accepting a permanent offer.",
    keyDifferences: [
      "Defines a trial period (typically 3–6 months)",
      "Specifies the conversion terms for permanent employment",
      "Clarifies IP and work ownership during the contract phase",
      "Avoids misclassification — treats the worker as an employee during trial",
    ],
    faq: [
      {
        question: "Is a contract-to-hire worker an employee or contractor?",
        answer:
          "It depends on how the arrangement is structured. If the worker is on your payroll during the trial, they are an employee. If through a staffing agency, they may be the agency's employee. This distinction affects tax withholding and benefits.",
      },
      {
        question: "What if we decide not to convert to permanent?",
        answer:
          "The contract simply ends on the agreed date. You should specify in the contract that no conversion guarantee is implied, and confirm any notice required before the end date.",
      },
      {
        question: "Can I use an independent contractor agreement instead?",
        answer:
          "Only if the worker is genuinely independent. If they work set hours under your direction, use an employment agreement. Misclassifying employees as contractors carries significant tax and legal risk.",
      },
      {
        question: "Should the contract-to-hire rate be higher than the permanent rate?",
        answer:
          "Often yes — contractors typically receive a higher hourly rate since they do not get benefits. The contract should specify the trial compensation separately from the expected permanent salary.",
      },
    ],
    indexable: false,
    tier: "flow-only",
    priority: "low",
    relatedIntentSlugs: ["at_will"],
    relatedDocumentSlugs: ["independent-contractor-agreement", "employment-contract"],
    practiceAreas: ["employment-law"],
  },
]

// ── Residential Lease ─────────────────────────────────────────────────────────

const residentialLeaseIntents: DocumentIntent[] = [
  {
    id: "single_tenant",
    slug: "single-tenant",
    name: "Single Tenant",
    description: "Lease agreement for one tenant",
    seoTitle: "Single Tenant Lease Agreement | LegalLawDocs.com",
    metaDescription: "Create a residential lease for a single tenant. State-compliant with all required disclosures.",
    h1: "Single Tenant Residential Lease",
    shortDescription: "A single-tenant residential lease covers one individual or family renting a property.",
    whenToUse: "Use when renting to one person or a family unit on a single lease.",
    keyDifferences: [
      "One leaseholder responsible for all obligations",
      "Simpler signature and liability structure",
      "No joint-and-several liability considerations",
    ],
    faq: [
      {
        question: "What is a single-tenant lease?",
        answer: "A single-tenant lease is a rental agreement with one person or family as the leaseholder, responsible for all rent and obligations.",
      },
      {
        question: "Can multiple people live in a single-tenant lease?",
        answer: "Yes — the 'single tenant' refers to one primary leaseholder, not the number of occupants. You can list additional occupants separately.",
      },
      {
        question: "What disclosures are required in my state?",
        answer: "Our AI automatically includes state-specific mandatory disclosures, such as lead paint disclosures (pre-1978 homes), mold disclosures, and habitability notices.",
      },
      {
        question: "Should I require renters insurance?",
        answer: "Yes, most landlords require renters insurance. You can add a clause requiring the tenant to maintain a minimum coverage amount throughout the lease.",
      },
    ],
    indexable: false,
    tier: "flow-only",
    priority: "low",
    relatedIntentSlugs: ["multi_tenant", "month_to_month"],
    relatedDocumentSlugs: ["residential-lease-agreement"],
    practiceAreas: ["landlord-tenant"],
  },
  {
    id: "multi_tenant",
    slug: "multi-tenant",
    name: "Multiple Tenants",
    description: "Lease agreement for multiple tenants (roommates, family)",
    seoTitle: "Multi-Tenant Lease Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create a multi-tenant (roommate) lease agreement online. Covers joint-and-several liability, individual obligations, and shared space rules.",
    h1: "Multi-Tenant Residential Lease Agreement",
    shortDescription:
      "A multi-tenant lease covers multiple co-tenants who all share responsibility for the rental. Joint-and-several liability means each tenant is fully responsible for the entire rent obligation.",
    whenToUse:
      "Use when renting to roommates, couples, or multiple co-tenants who will each sign the lease and share liability.",
    keyDifferences: [
      "All co-tenants sign and are jointly and severally liable",
      "Each tenant is fully responsible for the entire rent (not just their share)",
      "Should address what happens if one tenant wants to leave early",
      "May include separate sections for shared vs. private spaces",
    ],
    faq: [
      {
        question: "What does joint-and-several liability mean in a lease?",
        answer:
          "It means each co-tenant is individually responsible for the full rent. If one roommate doesn't pay, the landlord can pursue any of the other tenants for the full amount.",
      },
      {
        question: "Can I add or remove tenants from a multi-tenant lease?",
        answer:
          "Generally yes, but it requires a lease amendment signed by all parties. Most landlords require a new application and credit check for replacement tenants.",
      },
      {
        question: "Should roommates have a separate roommate agreement?",
        answer:
          "Yes. A roommate agreement covers internal rules (chores, quiet hours, guest policies) between co-tenants — matters the landlord doesn't need to be involved in.",
      },
      {
        question: "What happens if one tenant wants to leave before the lease ends?",
        answer:
          "The remaining tenants remain obligated for the full rent. The lease should address subletting and early-exit procedures. The departing tenant may still be liable unless released by the landlord.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["single_tenant", "month_to_month"],
    relatedDocumentSlugs: ["residential-lease-agreement", "month-to-month-lease-agreement"],
    practiceAreas: ["landlord-tenant", "real-estate"],
    suggestedListingPrice: 199,
  },
  {
    id: "month_to_month",
    slug: "month-to-month",
    name: "Month-to-Month",
    description: "Flexible rolling lease with no fixed end date",
    seoTitle: "Month-to-Month Lease Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create a month-to-month lease agreement online. State-compliant rolling lease with correct notice periods and termination provisions.",
    h1: "Month-to-Month Lease Agreement",
    shortDescription:
      "A month-to-month lease automatically renews each month until either party gives notice. More flexible than a fixed-term lease, but either party can end it with proper notice (typically 30 days).",
    whenToUse:
      "Use when flexibility is more important than a fixed commitment — ideal for tenants in transition or landlords who may sell or renovate soon.",
    keyDifferences: [
      "No fixed end date — renews automatically each month",
      "Either party can terminate with proper notice (usually 30 days)",
      "Landlord can change rent or terms with proper notice",
      "Less security for tenant; more flexibility for both parties",
    ],
    faq: [
      {
        question: "What notice is required to end a month-to-month lease?",
        answer:
          "Most states require 30 days' written notice from either party. Some states (California, Oregon) require 60 days for landlord-initiated termination after 12+ months of tenancy. Our AI includes state-specific notice requirements.",
      },
      {
        question: "Can a landlord raise rent during a month-to-month lease?",
        answer:
          "Yes, with proper notice — typically 30 days (or as required by state law). In rent-controlled cities, increases may be capped by local ordinance.",
      },
      {
        question: "Is a month-to-month lease less legally binding than a fixed-term lease?",
        answer:
          "No. A month-to-month lease is fully enforceable. Both parties still have the same obligations under landlord-tenant law — the only difference is the duration and termination flexibility.",
      },
      {
        question: "Can a fixed-term lease convert to month-to-month?",
        answer:
          "Yes. Most fixed-term leases include a holdover clause that converts to month-to-month if neither party takes action after the fixed term ends.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "high",
    relatedIntentSlugs: ["single_tenant", "multi_tenant"],
    relatedDocumentSlugs: ["residential-lease-agreement", "month-to-month-lease-agreement", "landlord-notice-to-vacate"],
    practiceAreas: ["landlord-tenant", "real-estate"],
    suggestedListingPrice: 249,
  },
  {
    id: "furnished",
    slug: "furnished",
    name: "Furnished Rental",
    description: "Lease includes furnished property",
    seoTitle: "Furnished Apartment Lease Agreement | LegalLawDocs.com",
    metaDescription:
      "Create a furnished rental lease agreement online. Includes furniture inventory, condition documentation, and damage liability provisions.",
    h1: "Furnished Rental Lease Agreement",
    shortDescription:
      "A furnished rental lease includes provisions for the furniture and appliances provided by the landlord, including an inventory, condition documentation, and rules around damage liability.",
    whenToUse: "Use when renting a property that includes furniture, appliances, or other personal property belonging to the landlord.",
    keyDifferences: [
      "Includes a furniture and appliance inventory (attached as exhibit)",
      "Specifies condition at move-in and tenant liability for damage",
      "May carry a higher security deposit due to furnishing value",
      "Defines what 'normal wear and tear' means for furnished items",
    ],
    faq: [
      {
        question: "Should I include a furniture inventory in a furnished lease?",
        answer:
          "Absolutely. A detailed inventory listing all items and their condition at move-in is the most important protection for both landlord and tenant in a furnished rental.",
      },
      {
        question: "Who is responsible for furniture damage?",
        answer:
          "The tenant is responsible for damage beyond normal wear and tear. The lease should clearly define which items are included, their condition at move-in, and what constitutes acceptable wear.",
      },
      {
        question: "Can I charge a higher security deposit for a furnished unit?",
        answer:
          "Many states allow a higher security deposit for furnished rentals (sometimes 2–3× monthly rent vs. 1–2× for unfurnished). Check your state's security deposit cap.",
      },
      {
        question: "What if the tenant damages furniture?",
        answer:
          "Document the damage with photos and a written notice. You can deduct the cost of repair or replacement (less depreciation) from the security deposit, as long as you provide an itemized statement within the state-required timeframe.",
      },
    ],
    indexable: false,
    tier: "flow-only",
    priority: "low",
    relatedIntentSlugs: ["single_tenant", "multi_tenant"],
    relatedDocumentSlugs: ["residential-lease-agreement"],
    practiceAreas: ["landlord-tenant"],
  },
]

// ── LLC Operating Agreement ────────────────────────────────────────────────────

const llcIntents: DocumentIntent[] = [
  {
    id: "single_member",
    slug: "single-member",
    name: "Single-Member LLC",
    description: "LLC with one owner",
    seoTitle: "Single-Member LLC Operating Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create a single-member LLC operating agreement online. Establish your LLC's management structure, ownership, and tax treatment as a sole owner.",
    h1: "Single-Member LLC Operating Agreement",
    shortDescription:
      "A single-member LLC operating agreement documents the operating rules for an LLC with one owner. Even though it's just you, this agreement establishes your business's structure, protects your limited liability, and is required by many banks and states.",
    whenToUse:
      "Use when forming an LLC with a single owner. This agreement protects your personal liability shield and establishes clear operating rules.",
    keyDifferences: [
      "Only one member — no profit-sharing or voting provisions needed",
      "Simpler management structure (member-managed by default)",
      "Tax treatment is typically as a sole proprietor (pass-through) or S-Corp",
      "Required by most banks to open a business bank account",
    ],
    faq: [
      {
        question: "Do I need an operating agreement for a single-member LLC?",
        answer:
          "Most states do not legally require it, but you absolutely should have one. Banks require it to open accounts, and it helps protect your personal liability shield by proving you treat the LLC as a separate entity.",
      },
      {
        question: "Can a single-member LLC be taxed as an S-Corp?",
        answer:
          "Yes. By default, a single-member LLC is taxed as a sole proprietor. You can elect S-Corp tax treatment (Form 2553) to potentially reduce self-employment taxes if the LLC is profitable enough.",
      },
      {
        question: "What should a single-member LLC operating agreement include?",
        answer:
          "At minimum: member name and ownership percentage (100%), capital contribution, management structure, how profits are distributed, and dissolution procedures.",
      },
      {
        question: "Can I add a second member to a single-member LLC later?",
        answer:
          "Yes, but you will need to amend the operating agreement to reflect the new membership, ownership percentage, and profit-sharing arrangement.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "high",
    relatedIntentSlugs: ["multi_member", "manager_managed"],
    relatedDocumentSlugs: ["llc-operating-agreement", "partnership-agreement", "non-disclosure-agreement"],
    practiceAreas: ["business-contracts", "startups", "corporate-law"],
    suggestedListingPrice: 299,
  },
  {
    id: "multi_member",
    slug: "multi-member",
    name: "Multi-Member LLC",
    description: "LLC with multiple owners/members",
    seoTitle: "Multi-Member LLC Operating Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create a multi-member LLC operating agreement online. Define ownership percentages, profit sharing, voting rights, and management structure for multiple owners.",
    h1: "Multi-Member LLC Operating Agreement",
    shortDescription:
      "A multi-member LLC operating agreement governs an LLC with two or more owners. It defines ownership percentages, voting rights, profit and loss allocation, and the procedures for adding or removing members.",
    whenToUse:
      "Use when forming or operating an LLC with two or more owners who need clearly defined rights, responsibilities, and profit-sharing arrangements.",
    keyDifferences: [
      "Defines ownership percentage for each member",
      "Covers voting rights and quorum requirements for decisions",
      "Allocates profits and losses per agreed percentages",
      "Includes buy-sell and member exit provisions",
    ],
    faq: [
      {
        question: "How are profits distributed in a multi-member LLC?",
        answer:
          "By default, profits are distributed in proportion to ownership percentage. However, your operating agreement can specify different distribution ratios if agreed by all members.",
      },
      {
        question: "What happens if a member wants to leave a multi-member LLC?",
        answer:
          "The operating agreement should include a buy-sell provision (also called a buyout clause) that determines how the departing member's interest is valued and purchased.",
      },
      {
        question: "How do voting rights work in a multi-member LLC?",
        answer:
          "Voting rights can be proportional to ownership (one dollar = one vote) or equal per member (one member = one vote). Define this clearly in the agreement.",
      },
      {
        question: "Is a multi-member LLC taxed differently than a single-member LLC?",
        answer:
          "Yes. A multi-member LLC is taxed as a partnership by default (filing Form 1065) with profits and losses passing through to members. It can also elect S-Corp or C-Corp taxation.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "high",
    relatedIntentSlugs: ["single_member", "manager_managed"],
    relatedDocumentSlugs: ["llc-operating-agreement", "partnership-agreement"],
    practiceAreas: ["business-contracts", "corporate-law"],
    suggestedListingPrice: 349,
  },
  {
    id: "manager_managed",
    slug: "manager-managed",
    name: "Manager-Managed",
    description: "LLC managed by designated managers",
    seoTitle: "Manager-Managed LLC Operating Agreement | LegalLawDocs.com",
    metaDescription:
      "Create a manager-managed LLC operating agreement. Designate managers with authority to run day-to-day operations while members retain ownership rights.",
    h1: "Manager-Managed LLC Operating Agreement",
    shortDescription:
      "In a manager-managed LLC, designated managers (who may or may not be members) handle day-to-day operations. Members retain ownership rights but are not involved in daily management.",
    whenToUse:
      "Use when some members are passive investors who do not want to be involved in operations, or when you want professional managers running the business.",
    keyDifferences: [
      "Separates management (managers) from ownership (members)",
      "Managers have authority to bind the LLC in contracts",
      "Members vote only on major decisions (asset sales, dissolution)",
      "Suitable for passive investor structures and outside management",
    ],
    faq: [
      {
        question: "What is a manager-managed LLC?",
        answer:
          "A manager-managed LLC delegates operational control to one or more designated managers, who may or may not be LLC members. Members are typically passive investors.",
      },
      {
        question: "Can a non-member be a manager of an LLC?",
        answer:
          "Yes. LLCs can designate outside professionals (such as a hired CEO or property manager) as managers without giving them any ownership interest.",
      },
      {
        question: "What decisions still require member approval?",
        answer:
          "Typically: admitting new members, major asset sales, dissolution, and amendments to the operating agreement. Day-to-day business decisions are delegated to managers.",
      },
      {
        question: "Is a manager-managed LLC right for real estate investing?",
        answer:
          "Very commonly yes. Real estate LLCs often use a manager-managed structure where a property manager handles operations and passive investors simply receive distributions.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["single_member", "multi_member"],
    relatedDocumentSlugs: ["llc-operating-agreement", "partnership-agreement"],
    practiceAreas: ["business-contracts", "real-estate", "corporate-law"],
    suggestedListingPrice: 249,
  },
]

// ── Independent Contractor ────────────────────────────────────────────────────

const contractorIntents: DocumentIntent[] = [
  {
    id: "project_based",
    slug: "project-based",
    name: "Project-Based",
    description: "Contract for a specific project or deliverable",
    seoTitle: "Project-Based Contractor Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create a project-based independent contractor agreement online. Define scope, deliverables, payment milestones, and IP ownership for a fixed project.",
    h1: "Project-Based Independent Contractor Agreement",
    shortDescription:
      "A project-based contractor agreement defines the scope, deliverables, timeline, and payment for a specific project. The engagement ends when the project is complete.",
    whenToUse: "Use when hiring a contractor for a defined project with clear deliverables and an end point.",
    keyDifferences: [
      "Tied to specific deliverables, not hours worked",
      "Engagement ends upon project completion or acceptance",
      "Payment often milestone-based (50% upfront, 50% on delivery)",
      "IP ownership provisions are especially important",
    ],
    faq: [
      {
        question: "What should a project-based contractor agreement include?",
        answer:
          "Project scope and deliverables, payment amount and milestones, timeline, revision and acceptance criteria, IP ownership, confidentiality, and what happens if scope changes.",
      },
      {
        question: "Who owns the work product?",
        answer:
          "Without a written agreement, contractors typically retain copyright. To ensure your company owns the work, include an explicit IP assignment clause (or 'work made for hire' language where applicable).",
      },
      {
        question: "What happens if the contractor delivers late?",
        answer:
          "Include a late delivery clause with defined remedies — this could be a fee reduction, the right to cancel and not pay remaining milestones, or a specific cure period.",
      },
      {
        question: "Should I pay a deposit upfront?",
        answer:
          "Common practice is 25–50% upfront to cover contractor time and materials, with the remainder on delivery or acceptance. Specify the conditions for each milestone payment.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["ongoing", "hourly"],
    relatedDocumentSlugs: ["independent-contractor-agreement", "service-agreement", "non-disclosure-agreement"],
    practiceAreas: ["business-contracts"],
    suggestedListingPrice: 149,
  },
  {
    id: "ongoing",
    slug: "ongoing",
    name: "Ongoing Services",
    description: "Continuous service agreement with no fixed end date",
    seoTitle: "Ongoing Contractor Agreement Template | LegalLawDocs.com",
    metaDescription: "Create an ongoing independent contractor agreement for continuous services with no fixed end date. Includes termination and renewal terms.",
    h1: "Ongoing Independent Contractor Agreement",
    shortDescription: "An ongoing contractor agreement covers a continuous service relationship with no fixed project end date. Either party can terminate with notice.",
    whenToUse: "Use for recurring services like content creation, IT support, or consulting where work continues indefinitely.",
    keyDifferences: [
      "No fixed end date — continues until terminated",
      "Either party can terminate with defined notice period",
      "Payment is typically monthly or per deliverable",
      "Scope may be defined broadly with SOW amendments",
    ],
    faq: [
      {
        question: "How do I protect myself in an ongoing contractor relationship?",
        answer: "Include a clear termination clause with notice period, define deliverables and payment terms, and ensure IP ownership is documented. Review and update SOWs periodically.",
      },
      {
        question: "Can an ongoing contractor relationship create an employment relationship?",
        answer: "Potentially, if the contractor works exclusively for you under close supervision. Ensure the contractor has genuine independence and works for multiple clients.",
      },
      {
        question: "What notice is required to end an ongoing contractor agreement?",
        answer: "Typically 14–30 days' written notice. Specify this in the agreement to avoid disputes about when the relationship ends.",
      },
      {
        question: "Should I use a master agreement plus statements of work?",
        answer: "Yes — this is best practice for ongoing engagements. The master agreement covers legal terms, while SOWs define specific project scope, timeline, and payment for each engagement.",
      },
    ],
    indexable: false,
    tier: "flow-only",
    priority: "low",
    relatedIntentSlugs: ["project_based", "hourly"],
    relatedDocumentSlugs: ["independent-contractor-agreement", "service-agreement"],
    practiceAreas: ["business-contracts"],
  },
  {
    id: "hourly",
    slug: "hourly",
    name: "Hourly Rate",
    description: "Payment based on hours worked",
    seoTitle: "Hourly Contractor Agreement Template | LegalLawDocs.com",
    metaDescription: "Create an hourly independent contractor agreement online. Set hourly rate, invoicing schedule, and maximum hours with proper contractor protections.",
    h1: "Hourly Independent Contractor Agreement",
    shortDescription: "An hourly contractor agreement sets a rate per hour, defines invoicing cadence, and may include a maximum weekly or monthly hours cap.",
    whenToUse: "Use when work volume is unpredictable and you want to pay only for actual hours worked rather than a fixed project price.",
    keyDifferences: [
      "Payment is per hour of work, not per deliverable",
      "Often includes maximum hours per week or billing cap",
      "Contractor submits timesheets or invoices with hours logged",
      "Time tracking expectations should be specified",
    ],
    faq: [
      {
        question: "How should hours be tracked in an hourly contractor agreement?",
        answer: "Specify the time-tracking method (time tracking app, timesheet, honor system) and how invoices should be submitted. Weekly or bi-weekly invoicing is most common.",
      },
      {
        question: "Should I include a maximum hours cap?",
        answer: "Yes, to control costs. Define a weekly or monthly maximum. Any hours beyond the cap require written approval from you before they're billed.",
      },
      {
        question: "What rate should I pay an hourly contractor?",
        answer: "Contractor rates are typically 30–50% higher than an equivalent full-time employee's hourly rate to account for benefits, self-employment taxes, and overhead.",
      },
      {
        question: "Is an hourly contractor an employee?",
        answer: "Not automatically — hourly payment does not determine employment status. What matters is whether the worker has independence, works for multiple clients, and controls their own methods.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["project_based", "ongoing"],
    relatedDocumentSlugs: ["independent-contractor-agreement", "service-agreement"],
    practiceAreas: ["business-contracts"],
    suggestedListingPrice: 149,
  },
]

// ── Partnership ────────────────────────────────────────────────────────────────

const partnershipIntents: DocumentIntent[] = [
  {
    id: "equal_split",
    slug: "equal-split",
    name: "Equal Split",
    description: "Partners share ownership and profits equally",
    seoTitle: "Equal Partnership Agreement Template | LegalLawDocs.com",
    metaDescription: "Create an equal partnership agreement online. 50/50 ownership, equal profit sharing, and shared decision-making rights.",
    h1: "Equal Partnership Agreement",
    shortDescription: "An equal partnership agreement divides ownership, profits, losses, and management rights equally among all partners.",
    whenToUse: "Use when all partners are contributing equally and want a clean 50/50 (or equal N-way) ownership split.",
    keyDifferences: [
      "Ownership percentage is equal for all partners",
      "Profits and losses split equally",
      "All major decisions require mutual agreement",
      "Deadlock resolution clause is especially important",
    ],
    faq: [
      {
        question: "What happens if equal partners disagree?",
        answer: "A 50/50 partnership can deadlock easily. Your agreement should include a deadlock resolution mechanism: mediation, arbitration, or a buyout provision triggered by an unresolvable dispute.",
      },
      {
        question: "Can partners have unequal roles with equal ownership?",
        answer: "Yes. Ownership percentage and job responsibilities are separate. One partner may handle operations while the other handles sales — both still own 50%.",
      },
      {
        question: "Do equal partners pay equal taxes?",
        answer: "Yes, profits and losses are typically split equally and each partner pays taxes on their share, regardless of how much cash was actually distributed.",
      },
      {
        question: "What if one partner contributes more capital?",
        answer: "The agreement can create a separate capital account tracking each partner's contributions, with a preferential return before profits are split equally.",
      },
    ],
    indexable: false,
    tier: "flow-only",
    priority: "low",
    relatedIntentSlugs: ["unequal_split"],
    relatedDocumentSlugs: ["partnership-agreement", "llc-operating-agreement"],
    practiceAreas: ["business-contracts"],
  },
  {
    id: "unequal_split",
    slug: "unequal-split",
    name: "Unequal Split",
    description: "Partners share ownership by agreed percentages",
    seoTitle: "Unequal Partnership Agreement Template | LegalLawDocs.com",
    metaDescription: "Create a partnership agreement with custom ownership percentages. Define profit shares, voting rights, and management authority by agreed allocation.",
    h1: "Unequal Ownership Partnership Agreement",
    shortDescription: "An unequal partnership agreement defines custom ownership percentages and profit-sharing ratios that reflect each partner's contribution, role, or negotiated terms.",
    whenToUse: "Use when partners have contributed different capital amounts, have different roles, or have negotiated a specific ownership split (e.g., 60/40 or 70/30).",
    keyDifferences: [
      "Custom ownership percentage for each partner",
      "Profits and losses allocated per agreed percentages (not necessarily equal)",
      "Voting rights may be proportional or equal per partner",
      "Capital accounts track each partner's contributions separately",
    ],
    faq: [
      {
        question: "How do we decide ownership percentages?",
        answer: "Percentages typically reflect capital contributed, sweat equity, skills brought, or negotiated value. Document the rationale clearly — it helps avoid disputes later.",
      },
      {
        question: "Do voting rights have to match ownership?",
        answer: "No. You can separate voting rights from economic rights. For example, a 30% minority partner could still have veto rights on major decisions by agreement.",
      },
      {
        question: "What is a capital account?",
        answer: "A capital account tracks each partner's contributions (cash, property) and their share of profits/losses. It determines how much each partner receives upon dissolution.",
      },
      {
        question: "Can we change the ownership split later?",
        answer: "Yes, but all partners must agree and the change must be documented in a signed amendment. Changes may have tax implications.",
      },
    ],
    indexable: false,
    tier: "flow-only",
    priority: "low",
    relatedIntentSlugs: ["equal_split"],
    relatedDocumentSlugs: ["partnership-agreement", "llc-operating-agreement"],
    practiceAreas: ["business-contracts"],
  },
]

// ── Power of Attorney ──────────────────────────────────────────────────────────

const poaIntents: DocumentIntent[] = [
  {
    id: "general",
    slug: "general",
    name: "General POA",
    description: "Broad authority over financial and legal matters",
    seoTitle: "General Power of Attorney Form | LegalLawDocs.com",
    metaDescription:
      "Create a general power of attorney online. Grant broad financial and legal authority to an agent with state-compliant witness and notarization requirements.",
    h1: "General Power of Attorney",
    shortDescription:
      "A general power of attorney grants broad authority to an agent to handle financial and legal matters on the principal's behalf — typically used when the principal is temporarily unavailable or incapacitated.",
    whenToUse: "Use when you need someone to handle a wide range of financial and legal matters and the authority ends if you become incapacitated (unless it is also durable).",
    keyDifferences: [
      "Grants broad authority over financial, legal, and property matters",
      "Terminates automatically upon incapacity (unless also durable)",
      "Most comprehensive POA type",
      "Does not cover healthcare decisions (requires healthcare POA)",
    ],
    faq: [
      {
        question: "What is a general power of attorney?",
        answer: "A general POA grants your agent broad authority to act on your behalf in financial and legal matters — signing contracts, managing bank accounts, handling real estate. It does not cover healthcare decisions.",
      },
      {
        question: "Does a general POA end if I become incapacitated?",
        answer: "By default, yes. If you want it to continue after incapacity, you need a 'durable' power of attorney. A general POA is typically used for temporary or specific situations.",
      },
      {
        question: "What is the difference between general and limited POA?",
        answer: "A general POA grants broad authority. A limited (or special) POA restricts authority to specific acts or a defined time period — such as selling a house while you are abroad.",
      },
      {
        question: "Does a general POA require notarization?",
        answer: "Most states require notarization and some require witness signatures. Our AI automatically includes the requirements for your state.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["limited", "healthcare"],
    relatedDocumentSlugs: ["power-of-attorney", "durable-power-of-attorney", "medical-power-of-attorney", "last-will-and-testament"],
    practiceAreas: ["estate-planning", "elder-law"],
    suggestedListingPrice: 299,
  },
  {
    id: "limited",
    slug: "limited",
    name: "Limited POA",
    description: "Authority limited to specific acts or timeframe",
    seoTitle: "Limited Power of Attorney Form | LegalLawDocs.com",
    metaDescription:
      "Create a limited (special) power of attorney online. Grant authority for a specific act, transaction, or time period with automatic termination.",
    h1: "Limited (Special) Power of Attorney",
    shortDescription:
      "A limited power of attorney (also called a special POA) grants authority only for specific acts — signing one document, completing one real estate transaction, or acting during a defined period.",
    whenToUse: "Use when you need to authorize a specific action only — such as selling a vehicle, closing on a property, or managing bank accounts while you travel abroad.",
    keyDifferences: [
      "Authority restricted to defined acts, transactions, or time period",
      "Automatically terminates when the specific task is complete",
      "Lower risk — agent cannot act beyond the specified scope",
      "Often used for single real estate closings or vehicle sales",
    ],
    faq: [
      {
        question: "When would I use a limited power of attorney?",
        answer: "Common uses: authorizing someone to sign a real estate closing in your absence, sell a vehicle, operate a bank account while you travel, or manage a specific investment.",
      },
      {
        question: "How specific does a limited POA need to be?",
        answer: "The more specific, the better. Clearly describe the authorized act, the parties involved, any relevant dates, and the termination condition. Vague authority can lead to misuse.",
      },
      {
        question: "Does a limited POA need to be notarized?",
        answer: "Yes, in most states, particularly for real estate transactions. Banks and title companies typically require notarization regardless of state law.",
      },
      {
        question: "When does a limited POA expire?",
        answer: "It expires when the specified task is complete, the specified date arrives, or you revoke it. It automatically becomes void upon your death or (in most states) incapacity.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["general", "healthcare"],
    relatedDocumentSlugs: ["power-of-attorney", "durable-power-of-attorney"],
    practiceAreas: ["estate-planning", "real-estate"],
    suggestedListingPrice: 199,
  },
  {
    id: "healthcare",
    slug: "healthcare",
    name: "Healthcare POA",
    description: "Authority over healthcare decisions",
    seoTitle: "Healthcare Power of Attorney Form | LegalLawDocs.com",
    metaDescription:
      "Create a healthcare power of attorney online. Designate someone to make medical decisions on your behalf if you cannot. State-compliant with witness requirements.",
    h1: "Healthcare Power of Attorney",
    shortDescription:
      "A healthcare power of attorney designates an agent to make medical and healthcare decisions on your behalf if you are unable to do so. Also called a healthcare proxy or medical POA.",
    whenToUse:
      "Use to designate a trusted person to make medical decisions for you in case of incapacity due to accident, surgery, or illness.",
    keyDifferences: [
      "Limited to healthcare and medical decisions only",
      "Takes effect only when you are unable to make decisions yourself",
      "Often paired with a living will for complete advance care planning",
      "State forms often required — our AI uses state-specific templates",
    ],
    faq: [
      {
        question: "What is a healthcare power of attorney?",
        answer:
          "A healthcare POA (also called a healthcare proxy or medical POA) authorizes a trusted person to make medical decisions if you are incapacitated. It is separate from a financial POA.",
      },
      {
        question: "What decisions can a healthcare agent make?",
        answer:
          "Your agent can consent to or refuse medical treatments, choose providers, access medical records, and make end-of-life decisions — unless you restrict their authority in the document.",
      },
      {
        question: "What is the difference between a healthcare POA and a living will?",
        answer:
          "A healthcare POA appoints a person to decide. A living will (advance directive) documents your specific wishes (e.g., no resuscitation). Having both is best practice.",
      },
      {
        question: "Does a healthcare POA need to be notarized?",
        answer:
          "Requirements vary by state. Some states require notarization, some require two witnesses, and some require both. Our AI includes the correct requirements for your state.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "high",
    relatedIntentSlugs: ["general", "limited"],
    relatedDocumentSlugs: ["power-of-attorney", "medical-power-of-attorney", "durable-power-of-attorney", "last-will-and-testament"],
    practiceAreas: ["estate-planning", "elder-law", "healthcare-law"],
    suggestedListingPrice: 349,
  },
]

// ── Last Will & Testament ─────────────────────────────────────────────────────

const lastWillIntents: DocumentIntent[] = [
  {
    id: "simple",
    slug: "simple",
    name: "Simple Will",
    description: "Basic will with asset distribution",
    seoTitle: "Simple Will Template — Create a Basic Will Online | LegalLawDocs.com",
    metaDescription:
      "Create a simple last will and testament online. Distribute your assets, name an executor, and protect your estate without complex trust arrangements.",
    h1: "Simple Last Will and Testament",
    shortDescription:
      "A simple will is the most common form of last will and testament — it directs how your assets are distributed, names an executor, and can specify burial preferences. Appropriate for most people with straightforward estate planning needs.",
    whenToUse: "Use for straightforward estates without minor children or complex asset structures.",
    keyDifferences: [
      "No guardianship provisions (for use without minor children)",
      "Straightforward asset distribution to named beneficiaries",
      "Appoints executor to administer the estate",
      "Simpler signing requirements than more complex wills",
    ],
    faq: [
      {
        question: "Who should use a simple will?",
        answer: "A simple will is appropriate for adults without minor children, with clear beneficiaries, and without complex asset structures (trusts, business interests, international assets).",
      },
      {
        question: "What assets does a will control?",
        answer: "Only 'probate assets' — property owned in your name alone. Assets with beneficiary designations (life insurance, retirement accounts, joint accounts) pass outside the will.",
      },
      {
        question: "How many witnesses do I need to sign a will?",
        answer: "Most states require two witnesses who are not beneficiaries. Some states (Louisiana, Vermont) have different requirements. Our AI includes state-specific signing instructions.",
      },
      {
        question: "Does a simple will avoid probate?",
        answer: "No. A will must go through probate — the court process for validating and administering the estate. A living trust avoids probate, but that is a more complex arrangement.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["guardian"],
    relatedDocumentSlugs: ["last-will-and-testament", "power-of-attorney", "durable-power-of-attorney"],
    practiceAreas: ["estate-planning", "probate"],
    suggestedListingPrice: 299,
  },
  {
    id: "guardian",
    slug: "guardian",
    name: "Will with Guardianship",
    description: "Includes guardianship provisions for minor children",
    seoTitle: "Will with Guardianship Provisions — Create Online | LegalLawDocs.com",
    metaDescription:
      "Create a last will and testament with guardianship provisions for minor children. Name a guardian and protect your children's future.",
    h1: "Last Will and Testament with Guardianship Provisions",
    shortDescription:
      "A will with guardianship provisions names a guardian for your minor children in the event of your death. This is the most important provision in any parent's estate plan.",
    whenToUse: "Use if you have minor children and want to designate who will care for them if you and the other parent both pass away.",
    keyDifferences: [
      "Includes formal guardianship designation for minor children",
      "Can establish a testamentary trust for managing children's inheritance",
      "Names a guardian separately from the executor",
      "Should name alternate guardians in case the primary is unable to serve",
    ],
    faq: [
      {
        question: "What happens to my children if I die without naming a guardian?",
        answer: "A court decides who cares for your minor children, often after contested proceedings among relatives. Naming a guardian in your will is the most important step any parent can take.",
      },
      {
        question: "Can I name different people as guardian and executor?",
        answer: "Yes, and often advisable. The guardian cares for your children day-to-day. The executor administers the estate. These are different skills — it's fine to choose different trusted people.",
      },
      {
        question: "Can I also set up a trust for my children in my will?",
        answer: "Yes — a testamentary trust is created within the will and activates upon your death. It holds assets for your children until they reach a specified age (often 18 or 25).",
      },
      {
        question: "Does my spouse automatically get custody of our children?",
        answer: "Yes, if you and your spouse are the legal parents and your spouse survives you. The guardianship provision matters when both parents are deceased or the surviving parent is unfit.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["simple"],
    relatedDocumentSlugs: ["last-will-and-testament", "power-of-attorney", "medical-power-of-attorney"],
    practiceAreas: ["estate-planning", "family-law", "probate"],
    suggestedListingPrice: 349,
  },
]

// ── Commercial Lease ──────────────────────────────────────────────────────────

const commercialLeaseIntents: DocumentIntent[] = [
  {
    id: "gross",
    slug: "gross",
    name: "Gross Lease",
    description: "Landlord covers most property expenses",
    seoTitle: "Gross Commercial Lease Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create a gross commercial lease agreement online. Landlord covers taxes, insurance, and maintenance. Tenant pays a fixed monthly rent.",
    h1: "Gross Commercial Lease Agreement",
    shortDescription:
      "In a gross lease, the tenant pays a fixed monthly rent and the landlord covers most operating expenses — property taxes, insurance, and maintenance. Common for office and retail spaces.",
    whenToUse: "Use when the tenant wants cost predictability and the landlord is willing to take on operating expense risk.",
    keyDifferences: [
      "Tenant pays flat monthly rent only",
      "Landlord absorbs operating expenses (taxes, insurance, maintenance)",
      "Simpler for tenants — no variable cost exposure",
      "Landlord typically builds operating costs into the base rent",
    ],
    faq: [
      {
        question: "What is a gross lease?",
        answer: "A gross lease has the tenant paying a single fixed rent amount while the landlord covers operating costs (taxes, insurance, maintenance). Also called a 'full-service lease.'",
      },
      {
        question: "Is a gross lease better for tenants?",
        answer: "Often yes — predictable costs make budgeting easier. But landlords typically price gross leases higher to compensate for bearing the operating expense risk.",
      },
      {
        question: "What is a modified gross lease?",
        answer: "A modified gross lease splits responsibility for some expenses. For example, the tenant may pay utilities while the landlord covers taxes and insurance.",
      },
      {
        question: "How long are gross commercial leases typically?",
        answer: "Commercial gross leases typically run 1–5 years, with options to renew. Longer terms often come with rent escalation clauses (e.g., 3% annual increases).",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["net"],
    relatedDocumentSlugs: ["commercial-lease-agreement", "service-agreement"],
    practiceAreas: ["real-estate", "landlord-tenant", "business-contracts"],
    suggestedListingPrice: 299,
  },
  {
    id: "net",
    slug: "net",
    name: "Net / Triple Net Lease",
    description: "Tenant covers property expenses in addition to rent",
    seoTitle: "Net Lease Agreement Template (NNN) | LegalLawDocs.com",
    metaDescription:
      "Create a net or triple-net (NNN) commercial lease agreement online. Tenant pays rent plus taxes, insurance, and maintenance costs.",
    h1: "Net Lease Agreement (Triple Net / NNN)",
    shortDescription:
      "In a net lease, the tenant pays base rent plus some or all operating expenses. A triple net (NNN) lease requires the tenant to pay rent, property taxes, insurance, and maintenance — making it highly predictable for landlords.",
    whenToUse:
      "Use for commercial properties, retail spaces, and investment properties where the landlord wants to minimize operating expense exposure.",
    keyDifferences: [
      "Tenant pays base rent plus operating costs (taxes, insurance, maintenance)",
      "Triple net (NNN): tenant covers all three major expense categories",
      "Lower base rent — tenant absorbs cost volatility",
      "Most common structure for retail and commercial investment properties",
    ],
    faq: [
      {
        question: "What is a triple net (NNN) lease?",
        answer: "In a triple net lease, the tenant pays rent plus all three 'nets': property taxes, building insurance, and maintenance costs. The landlord receives a predictable net income.",
      },
      {
        question: "Why would a tenant agree to a triple net lease?",
        answer: "NNN leases typically come with lower base rent than gross leases. For stable businesses confident in their operating costs, the lower rent can outweigh the expense exposure.",
      },
      {
        question: "What is CAM in a commercial lease?",
        answer: "Common Area Maintenance (CAM) charges cover shared building costs — lobbies, parking lots, landscaping. In NNN and multi-tenant buildings, these are often passed through to tenants.",
      },
      {
        question: "How long do NNN leases typically run?",
        answer: "NNN leases are typically longer than gross leases — often 5–20 years for major retail tenants. The tenant's long-term commitment justifies investment in the space.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "high",
    relatedIntentSlugs: ["gross"],
    relatedDocumentSlugs: ["commercial-lease-agreement", "triple-net-lease-agreement", "service-agreement"],
    practiceAreas: ["real-estate", "landlord-tenant", "business-contracts"],
    suggestedListingPrice: 349,
  },
]

// ── Service Agreement ──────────────────────────────────────────────────────────

const serviceAgreementIntents: DocumentIntent[] = [
  {
    id: "fixed_fee",
    slug: "fixed-fee",
    name: "Fixed Fee",
    description: "Single fee for defined services",
    seoTitle: "Fixed-Fee Service Agreement Template | LegalLawDocs.com",
    metaDescription: "Create a fixed-fee service agreement online. Set a defined scope and flat price for professional services.",
    h1: "Fixed-Fee Service Agreement",
    shortDescription: "A fixed-fee service agreement defines a specific scope of work for a flat price. Both parties know the total cost upfront.",
    whenToUse: "Use when the scope is well-defined and you want price certainty for both the client and the provider.",
    keyDifferences: [
      "Total price fixed regardless of time spent",
      "Scope must be clearly defined to avoid scope creep",
      "Risk on provider if the work takes longer than estimated",
      "Best for projects with predictable, measurable deliverables",
    ],
    faq: [
      {
        question: "What happens if the project requires more work than expected?",
        answer: "Without a change order clause, the provider must absorb the additional cost. Always include a change order provision defining how out-of-scope requests are priced.",
      },
      {
        question: "How should payment be structured in a fixed-fee agreement?",
        answer: "Common structures: 50% upfront + 50% on completion; milestone-based payments; or full payment upfront for smaller engagements. Define the conditions for each payment.",
      },
      {
        question: "Who bears the risk in a fixed-fee arrangement?",
        answer: "The provider bears time risk — if the work takes longer, they absorb it. The client bears scope risk — if they ask for more, they pay extra. Clear scope definitions protect both parties.",
      },
      {
        question: "What is the difference between a fixed-fee service agreement and a retainer?",
        answer: "A fixed-fee agreement prices a specific project. A retainer is an ongoing arrangement where the client pays a regular fee for access to a defined amount of the provider's time.",
      },
    ],
    indexable: false,
    tier: "flow-only",
    priority: "low",
    relatedIntentSlugs: ["retainer"],
    relatedDocumentSlugs: ["service-agreement", "independent-contractor-agreement"],
    practiceAreas: ["business-contracts"],
  },
  {
    id: "retainer",
    slug: "retainer",
    name: "Retainer",
    description: "Ongoing services with recurring payments",
    seoTitle: "Retainer Agreement Template — Create Online | LegalLawDocs.com",
    metaDescription:
      "Create a retainer agreement online. Define monthly fee, available hours, service scope, and terms for ongoing professional services.",
    h1: "Retainer Agreement",
    shortDescription:
      "A retainer agreement provides ongoing access to a professional's services for a recurring monthly fee. The client retains the provider's time and availability — ideal for legal, consulting, PR, and marketing relationships.",
    whenToUse: "Use for ongoing advisory or services relationships where the client wants guaranteed access to the provider's time on a recurring basis.",
    keyDifferences: [
      "Monthly recurring fee for ongoing access",
      "Defines included hours or deliverables per period",
      "Rollover or forfeit provisions for unused time",
      "Easier to plan workload for the provider",
    ],
    faq: [
      {
        question: "What is a retainer agreement?",
        answer: "A retainer is a recurring fee arrangement where a client pays a regular amount (usually monthly) to retain a professional's services and availability.",
      },
      {
        question: "Do unused retainer hours roll over?",
        answer: "Typically no — unused hours expire at the end of each period. The agreement should explicitly state whether hours roll over, are forfeited, or can be applied to the next month's overage.",
      },
      {
        question: "What happens when a client needs more hours than the retainer covers?",
        answer: "Include an overage clause defining the hourly rate for additional hours beyond the retainer amount.",
      },
      {
        question: "How much notice is required to end a retainer?",
        answer: "Typically 30 days' written notice. This should be explicitly stated. Without it, both parties may be unclear about when obligations end.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["fixed_fee"],
    relatedDocumentSlugs: ["service-agreement", "independent-contractor-agreement"],
    practiceAreas: ["business-contracts"],
    suggestedListingPrice: 149,
  },
]

// ── Purchase Agreement ─────────────────────────────────────────────────────────

const purchaseAgreementIntents: DocumentIntent[] = [
  {
    id: "asset",
    slug: "asset",
    name: "Asset Purchase",
    description: "Purchase of specific assets or goods",
    seoTitle: "Asset Purchase Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create an asset purchase agreement online. Document the purchase of business assets, equipment, or inventory with clear title transfer and warranty terms.",
    h1: "Asset Purchase Agreement",
    shortDescription:
      "An asset purchase agreement documents the transfer of specific assets — business equipment, inventory, intellectual property, or real property — from seller to buyer.",
    whenToUse: "Use when buying or selling specific business assets rather than an entire company.",
    keyDifferences: [
      "Buyer selects specific assets to acquire",
      "Seller retains liabilities not explicitly assumed",
      "More complex due diligence required per asset",
      "Common in business acquisitions and equipment sales",
    ],
    faq: [
      {
        question: "What is the difference between an asset purchase and a stock purchase?",
        answer: "In an asset purchase, you buy specific assets. In a stock purchase, you buy the company (including all liabilities). Asset purchases are more common because buyers can cherry-pick what they want.",
      },
      {
        question: "What warranties should be in an asset purchase agreement?",
        answer: "Seller should warrant: they own the assets free and clear, assets are in the described condition, no known encumbrances, and no pending litigation affecting the assets.",
      },
      {
        question: "Do I need to do due diligence in an asset purchase?",
        answer: "Yes. Verify ownership, condition, any liens or encumbrances, and whether any permits or contracts transfer with the asset.",
      },
      {
        question: "What happens to employees in an asset purchase?",
        answer: "The buyer typically has no obligation to hire the seller's employees. If you want to keep staff, include specific terms for employee transition.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["service"],
    relatedDocumentSlugs: ["purchase-agreement", "bill-of-sale", "non-disclosure-agreement"],
    practiceAreas: ["business-contracts", "corporate-law"],
    suggestedListingPrice: 249,
  },
  {
    id: "service",
    slug: "service",
    name: "Service Purchase",
    description: "Purchase of professional services",
    seoTitle: "Service Purchase Agreement Template | LegalLawDocs.com",
    metaDescription: "Create a service purchase agreement online. Document the purchase of professional services with clear deliverables, payment terms, and IP provisions.",
    h1: "Service Purchase Agreement",
    shortDescription: "A service purchase agreement documents the purchase of professional services — consulting, software development, design, etc. — with clear deliverables and payment terms.",
    whenToUse: "Use when purchasing defined services (not goods) from a vendor or professional.",
    keyDifferences: [
      "Covers services delivered rather than physical assets",
      "Deliverables and acceptance criteria are key",
      "IP ownership of work product must be specified",
      "Often includes service level expectations",
    ],
    faq: [
      {
        question: "Is a service purchase agreement the same as a service agreement?",
        answer: "Similar, but a purchase agreement is often used for a one-time or defined engagement where 'purchase' framing makes sense — like buying a consulting deliverable.",
      },
      {
        question: "Who owns the work product in a service purchase?",
        answer: "Without a written assignment clause, the provider may retain IP rights. Include an explicit IP assignment to ensure the buyer owns all deliverables.",
      },
      {
        question: "What are acceptable deliverables?",
        answer: "Define acceptance criteria clearly — what does 'done' look like? Include a review and revision process and a deadline for raising deficiencies.",
      },
      {
        question: "Can I request changes after signing?",
        answer: "Only within the scope defined in the agreement. Changes to scope should go through a formal change order signed by both parties to avoid disputes.",
      },
    ],
    indexable: false,
    tier: "flow-only",
    priority: "low",
    relatedIntentSlugs: ["asset"],
    relatedDocumentSlugs: ["service-agreement", "purchase-agreement"],
    practiceAreas: ["business-contracts"],
  },
]

// ── Non-Compete ────────────────────────────────────────────────────────────────

const nonCompeteIntents: DocumentIntent[] = [
  {
    id: "employee",
    slug: "employee",
    name: "Employee Non-Compete",
    description: "Restrictions tied to employment",
    seoTitle: "Employee Non-Compete Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create an employee non-compete agreement online. Restrict former employees from competing, with state-compliant geographic and time limitations.",
    h1: "Employee Non-Compete Agreement",
    shortDescription:
      "An employee non-compete restricts an employee from working for competitors or starting a competing business after leaving. Enforceability varies significantly by state.",
    whenToUse: "Use when hiring employees who will have access to trade secrets, client relationships, or other protectable business interests.",
    keyDifferences: [
      "Tied to employment relationship",
      "Requires adequate consideration (job offer or promotion)",
      "Many states restrict enforceability or ban them entirely",
      "Scope (geography, duration, industry) must be reasonable",
    ],
    faq: [
      {
        question: "Are employee non-compete agreements enforceable?",
        answer: "It depends on the state. California bans most non-competes. Minnesota, North Dakota, and others have strict limits. Many states enforce them only if the scope is reasonable.",
      },
      {
        question: "What consideration is required for a non-compete?",
        answer: "For new employees: the job offer itself. For existing employees: a raise, promotion, or other benefit of value. Simply presenting a non-compete without additional benefit to a current employee may not be enforceable.",
      },
      {
        question: "What is a reasonable non-compete restriction?",
        answer: "Courts look at: geographic area (city vs. nationwide), duration (6 months to 2 years is common), and industry scope. The narrower the restriction, the more likely it is to be upheld.",
      },
      {
        question: "Can I include a non-solicitation clause instead?",
        answer: "Yes — non-solicitation (prohibiting poaching of clients and employees) is generally more enforceable than non-compete and may be sufficient for your business interests.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["contractor"],
    relatedDocumentSlugs: ["non-compete-agreement", "employment-contract", "non-disclosure-agreement"],
    practiceAreas: ["employment-law", "business-contracts"],
    suggestedListingPrice: 199,
  },
  {
    id: "contractor",
    slug: "contractor",
    name: "Contractor Non-Compete",
    description: "Restrictions tied to a contractor engagement",
    seoTitle: "Contractor Non-Compete Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create a contractor non-compete agreement online. Restrict independent contractors from competing or soliciting clients during and after engagement.",
    h1: "Contractor Non-Compete Agreement",
    shortDescription:
      "A contractor non-compete restricts an independent contractor from working for competitors or soliciting clients during and after the engagement.",
    whenToUse: "Use when engaging contractors who will access proprietary information, client relationships, or trade secrets.",
    keyDifferences: [
      "Applies to independent contractors, not employees",
      "Different consideration than employment-based non-competes",
      "Must not improperly convert contractor to employee status",
      "Non-solicitation provisions are often more enforceable",
    ],
    faq: [
      {
        question: "Can I restrict a contractor from working with my competitors?",
        answer: "Yes, but restrictions must be carefully drafted to avoid implying an employment relationship. Courts look at whether the restriction prevents the contractor from practicing their profession.",
      },
      {
        question: "Are contractor non-competes harder to enforce?",
        answer: "They face the same enforceability challenges as employee non-competes, plus additional scrutiny because restricting a contractor's business can look like misclassification.",
      },
      {
        question: "What is the difference between a non-compete and a non-solicitation for contractors?",
        answer: "A non-compete restricts industry participation broadly. A non-solicitation only restricts approaching your specific clients or employees. Non-solicitation is narrower and more commonly enforced.",
      },
      {
        question: "Should the contractor non-compete be in the main agreement or separate?",
        answer: "Either works. Including it in the main contractor agreement is common. Signing it separately makes it easier to enforce as a standalone document if disputed.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["employee"],
    relatedDocumentSlugs: ["non-compete-agreement", "independent-contractor-agreement", "non-disclosure-agreement"],
    practiceAreas: ["employment-law", "business-contracts"],
    suggestedListingPrice: 199,
  },
]

// ── New Documents: Cease and Desist ──────────────────────────────────────────

const ceaseAndDesistIntents: DocumentIntent[] = [
  {
    id: "copyright",
    slug: "copyright",
    name: "Copyright Infringement",
    description: "Stop unauthorized use of your copyrighted work",
    seoTitle: "Copyright Infringement Cease and Desist Letter | LegalLawDocs.com",
    metaDescription:
      "Create a copyright infringement cease and desist letter online. Stop unauthorized use of your photos, videos, music, or written work.",
    h1: "Copyright Infringement Cease and Desist Letter",
    shortDescription:
      "A copyright cease and desist letter formally demands that a person or entity stop using your copyrighted work without permission — and documents the infringement before pursuing a DMCA takedown or lawsuit.",
    whenToUse: "Use when someone is using your photos, videos, music, articles, or software without your permission.",
    keyDifferences: [
      "Cites specific copyrighted work and registration (if any)",
      "References the DMCA and relevant copyright statutes",
      "Demands immediate removal and cessation of use",
      "May request accounting of revenue earned from the infringement",
    ],
    faq: [
      {
        question: "What should I include in a copyright cease and desist?",
        answer: "Identify the copyrighted work (with registration number if registered), describe the infringement specifically, demand cessation and removal, set a deadline, and state the legal consequences.",
      },
      {
        question: "Do I need to register my copyright before sending a cease and desist?",
        answer: "No — copyright exists from the moment you create an original work. However, registration is required to sue for statutory damages (up to $150,000 per work for willful infringement).",
      },
      {
        question: "What is a DMCA takedown vs. a cease and desist?",
        answer: "A DMCA takedown is a specific request to a platform (YouTube, web host) to remove infringing content. A cease and desist is a direct letter to the infringer. Both can be used together.",
      },
      {
        question: "What if they ignore the cease and desist?",
        answer: "You can proceed to a DMCA takedown notice, pursue litigation, or contact their hosting provider. Courts often look favorably on plaintiffs who first tried to resolve the matter informally.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "high",
    relatedIntentSlugs: ["trademark", "harassment"],
    relatedDocumentSlugs: ["cease-and-desist-letter", "demand-letter"],
    practiceAreas: ["intellectual-property", "litigation"],
    suggestedListingPrice: 249,
  },
  {
    id: "trademark",
    slug: "trademark",
    name: "Trademark Infringement",
    description: "Stop unauthorized use of your trademark or brand",
    seoTitle: "Trademark Infringement Cease and Desist Letter | LegalLawDocs.com",
    metaDescription:
      "Create a trademark infringement cease and desist letter online. Protect your brand name, logo, or slogan from unauthorized use.",
    h1: "Trademark Infringement Cease and Desist Letter",
    shortDescription:
      "A trademark cease and desist letter demands that a party stop using a name, logo, or slogan that infringes on your registered or common-law trademark.",
    whenToUse: "Use when someone is using a name, logo, or phrase that is confusingly similar to your trademark in a way that could mislead consumers.",
    keyDifferences: [
      "References trademark registration number (USPTO or state)",
      "Addresses likelihood of consumer confusion",
      "May demand rebranding, not just cessation",
      "Relevant for both registered and common-law trademarks",
    ],
    faq: [
      {
        question: "Do I need a registered trademark to send a cease and desist?",
        answer: "No. Common-law trademark rights arise from use in commerce. However, a registered trademark (®) strengthens your position significantly and allows federal court jurisdiction.",
      },
      {
        question: "What should I demand in a trademark cease and desist?",
        answer: "Demand: immediate cessation of use, removal from all materials, rebranding timeline, written confirmation of compliance, and potentially an accounting of sales during the infringement period.",
      },
      {
        question: "What if the other party claims they own the name?",
        answer: "They may file a response asserting their own rights. A trademark attorney can evaluate conflicting claims. Cease and desist letters sometimes start disputes that require formal resolution.",
      },
      {
        question: "Can a cease and desist be used against a domain name infringer?",
        answer: "Yes. You can also file a UDRP (Uniform Domain-Name Dispute-Resolution Policy) complaint for cybersquatting, but a cease and desist is a lower-cost first step.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["copyright", "harassment"],
    relatedDocumentSlugs: ["cease-and-desist-letter", "demand-letter"],
    practiceAreas: ["intellectual-property", "business-contracts"],
    suggestedListingPrice: 249,
  },
  {
    id: "harassment",
    slug: "harassment",
    name: "Harassment / Defamation",
    description: "Stop harassment, defamation, or unwanted contact",
    seoTitle: "Harassment Cease and Desist Letter Template | LegalLawDocs.com",
    metaDescription:
      "Create a harassment or defamation cease and desist letter online. Demand that someone stop making false statements, threatening contact, or harassing behavior.",
    h1: "Harassment and Defamation Cease and Desist Letter",
    shortDescription:
      "A harassment or defamation cease and desist demands that a person stop making false statements about you, engaging in threatening behavior, or making unwanted contact.",
    whenToUse: "Use when someone is harassing you, spreading false information, or engaging in unwanted contact that you want formally documented before escalating legally.",
    keyDifferences: [
      "Addresses specific harassing acts or false statements",
      "Documents the behavior before further legal action",
      "May reference defamation statutes if false statements of fact are made",
      "Serves as evidence that the behavior was brought to the person's attention",
    ],
    faq: [
      {
        question: "Can a cease and desist stop online harassment?",
        answer: "It can be an important step — it puts the harasser on formal notice. However, for immediate threats, contact law enforcement. A cease and desist documents the behavior for potential civil action.",
      },
      {
        question: "What is the difference between harassment and defamation?",
        answer: "Harassment involves repeated unwanted contact or behavior. Defamation involves making false statements of fact that damage your reputation. Both can be addressed in the same letter.",
      },
      {
        question: "Should I send a harassment cease and desist through a lawyer?",
        answer: "A letter from an attorney carries more weight. However, a well-drafted cease and desist on its own is a meaningful first step and often sufficient to stop the behavior.",
      },
      {
        question: "What if they ignore the cease and desist?",
        answer: "You can pursue a restraining order (civil harassment restraining order), defamation lawsuit, or report continued harassment to law enforcement, with the cease and desist as documented evidence.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["copyright", "trademark"],
    relatedDocumentSlugs: ["cease-and-desist-letter", "demand-letter", "complaint-letter"],
    practiceAreas: ["litigation", "consumer-protection"],
    suggestedListingPrice: 199,
  },
]

// ── New Documents: Landlord Notice to Vacate ──────────────────────────────────

const landlordNoticeIntents: DocumentIntent[] = [
  {
    id: "non_payment",
    slug: "non-payment",
    name: "Non-Payment of Rent",
    description: "Notice to vacate due to unpaid rent",
    seoTitle: "Pay or Quit Notice (Non-Payment) | LegalLawDocs.com",
    metaDescription:
      "Create a pay-or-quit notice for non-payment of rent. State-compliant with correct notice period and required statutory language.",
    h1: "Notice to Vacate for Non-Payment of Rent",
    shortDescription:
      "A pay-or-quit notice demands that a tenant pay overdue rent within the state-required notice period or vacate the property. The first step in the eviction process for non-payment.",
    whenToUse: "Use when a tenant has failed to pay rent and you want to begin the formal eviction process.",
    keyDifferences: [
      "Gives tenant the option to pay or vacate",
      "Notice period varies by state (3–5 days common)",
      "Must include exact amount owed to be valid",
      "Filing date and service method must comply with state law",
    ],
    faq: [
      {
        question: "What is a pay-or-quit notice?",
        answer: "A pay-or-quit notice demands that the tenant pay all overdue rent within the notice period or vacate. It is the required first step before filing for eviction in most states.",
      },
      {
        question: "What happens if the tenant pays within the notice period?",
        answer: "You must accept the payment and the eviction process stops. If they pay late again, you start the process over.",
      },
      {
        question: "How must the notice be served?",
        answer: "Requirements vary by state — typically personal service, posting on the door, or certified mail. Check your state's eviction procedures. Improper service can invalidate the notice.",
      },
      {
        question: "Can I start eviction proceedings before the notice period expires?",
        answer: "No. You must wait until the notice period expires without payment or vacating before filing with the court.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "high",
    relatedIntentSlugs: ["lease_violation", "end_of_term"],
    relatedDocumentSlugs: ["landlord-notice-to-vacate", "demand-letter", "residential-lease-agreement"],
    practiceAreas: ["landlord-tenant", "real-estate"],
    suggestedListingPrice: 199,
  },
  {
    id: "lease_violation",
    slug: "lease-violation",
    name: "Lease Violation",
    description: "Notice to cure lease violation or vacate",
    seoTitle: "Lease Violation Notice to Vacate | LegalLawDocs.com",
    metaDescription:
      "Create a cure-or-quit notice for lease violations. Demand tenants correct a violation or vacate within the state-required notice period.",
    h1: "Notice to Vacate for Lease Violation",
    shortDescription:
      "A cure-or-quit notice demands that a tenant correct a specific lease violation (unauthorized pets, guests, smoking, property damage) within the notice period or vacate.",
    whenToUse: "Use when a tenant is violating lease terms other than non-payment — such as keeping unauthorized pets, causing damage, or engaging in prohibited activities.",
    keyDifferences: [
      "Addresses a specific lease violation, not rent non-payment",
      "Gives tenant opportunity to cure the violation",
      "Must cite the specific lease clause violated",
      "Some violations are incurable (illegal activity) — no cure period",
    ],
    faq: [
      {
        question: "What is a cure-or-quit notice?",
        answer: "It demands that the tenant fix a specific lease violation within the notice period or vacate. Unlike a pay-or-quit notice, it addresses non-monetary lease breaches.",
      },
      {
        question: "What if the violation is illegal activity?",
        answer: "Some states allow landlords to issue an unconditional quit notice for illegal activity, drug manufacturing, or serious property damage — no cure period required.",
      },
      {
        question: "How specific does the notice need to be?",
        answer: "Very specific. Name the tenant, describe the violation in detail, cite the lease clause, state the cure deadline, and describe what action is needed to cure.",
      },
      {
        question: "What if the tenant cures the violation but it happens again?",
        answer: "Most states require you to start the process over. However, repeated violations may eventually support an unconditional eviction after a pattern is established.",
      },
    ],
    indexable: false,
    tier: "flow-only",
    priority: "low",
    relatedIntentSlugs: ["non_payment", "end_of_term"],
    relatedDocumentSlugs: ["landlord-notice-to-vacate", "notice-of-breach"],
    practiceAreas: ["landlord-tenant"],
  },
  {
    id: "end_of_term",
    slug: "end-of-term",
    name: "End of Lease Term",
    description: "Notice to vacate at end of lease (no renewal)",
    seoTitle: "End of Lease Notice to Vacate | LegalLawDocs.com",
    metaDescription:
      "Create an end-of-lease notice to vacate online. Formally inform tenants that their lease will not be renewed and they must vacate by the end date.",
    h1: "End of Lease Term Notice to Vacate",
    shortDescription:
      "An end-of-term notice informs a tenant that their lease will not be renewed and they must vacate by the lease end date. Required notice period varies by state and tenancy length.",
    whenToUse: "Use to give proper notice that you will not renew a fixed-term lease or that you are terminating a month-to-month tenancy.",
    keyDifferences: [
      "No violation required — the lease simply ends",
      "Notice period depends on tenancy length (30–90 days common)",
      "Must be given before lease expires for fixed-term renewals",
      "Some cities require additional just-cause requirements",
    ],
    faq: [
      {
        question: "How much notice must I give for end of lease?",
        answer: "Most states: 30 days for month-to-month, 60 days for tenancies over 1 year (California requires 60–90 days based on length). Fixed-term leases often need no notice if they contain an expiration clause.",
      },
      {
        question: "Do I need to give a reason for not renewing?",
        answer: "In most states no — but some cities (San Francisco, New York, Portland) require 'just cause' for non-renewal. Check your local ordinances.",
      },
      {
        question: "What if the tenant refuses to leave?",
        answer: "After the notice period expires, file for eviction ('unlawful detainer' or 'summary possession') with your local court. Do not attempt a self-help eviction (changing locks, removing belongings) — it is illegal.",
      },
      {
        question: "Can I keep a security deposit if the tenant overstays?",
        answer: "You may be entitled to additional rent for the holdover period, but the security deposit is for move-out damages. Document any damages and provide an itemized statement within the state-required timeframe.",
      },
    ],
    indexable: false,
    tier: "flow-only",
    priority: "low",
    relatedIntentSlugs: ["non_payment", "lease_violation"],
    relatedDocumentSlugs: ["landlord-notice-to-vacate", "residential-lease-agreement", "month-to-month-lease-agreement"],
    practiceAreas: ["landlord-tenant"],
  },
]

// ── New Documents: Promissory Note ────────────────────────────────────────────

const promissoryNoteIntents: DocumentIntent[] = [
  {
    id: "interest_bearing",
    slug: "interest-bearing",
    name: "With Interest",
    description: "Loan with a stated annual interest rate",
    seoTitle: "Interest-Bearing Promissory Note Template | LegalLawDocs.com",
    metaDescription:
      "Create an interest-bearing promissory note online. Document a loan with a stated interest rate, payment schedule, and default provisions.",
    h1: "Interest-Bearing Promissory Note",
    shortDescription:
      "An interest-bearing promissory note documents a loan with a stated annual interest rate, defining how interest accrues and is paid alongside principal.",
    whenToUse: "Use when lending money and expecting both principal and interest repayment.",
    keyDifferences: [
      "States the annual interest rate explicitly",
      "Defines how interest accrues (simple vs. compound)",
      "Payment schedule covers both principal and interest",
      "Late fees typically include interest on overdue amounts",
    ],
    faq: [
      {
        question: "What interest rate can I charge on a promissory note?",
        answer: "State usury laws cap maximum interest rates. Most states allow 6–25% annually depending on the loan type. Exceeding the cap can make the note unenforceable or trigger penalties.",
      },
      {
        question: "What is the difference between simple and compound interest?",
        answer: "Simple interest accrues only on the principal. Compound interest accrues on both the principal and accumulated interest. Most personal promissory notes use simple interest.",
      },
      {
        question: "Should I charge interest on a family loan?",
        answer: "The IRS requires a minimum interest rate (the Applicable Federal Rate) for loans over $10,000 to avoid imputed gift tax. Check current AFR rates before drafting the note.",
      },
      {
        question: "Can I include a prepayment penalty?",
        answer: "Yes, but it must be disclosed clearly. Many borrowers prefer loans without prepayment penalties. Some states restrict prepayment penalties on consumer loans.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["interest_free", "secured", "demand"],
    relatedDocumentSlugs: ["promissory-note", "loan-agreement", "payment-plan-agreement"],
    practiceAreas: ["banking-finance", "business-contracts"],
    suggestedListingPrice: 149,
  },
  {
    id: "interest_free",
    slug: "interest-free",
    name: "Interest-Free",
    description: "Loan with no interest charged",
    seoTitle: "Interest-Free Promissory Note Template | LegalLawDocs.com",
    metaDescription:
      "Create an interest-free (zero interest) promissory note online. Document a no-interest loan with repayment schedule and default terms.",
    h1: "Interest-Free Promissory Note",
    shortDescription:
      "An interest-free promissory note documents a loan with no interest charge — often used for family loans, employer advances, or friendly personal loans.",
    whenToUse: "Use when lending money to a family member, friend, or employee without charging interest.",
    keyDifferences: [
      "Zero percent interest rate — principal repayment only",
      "IRS gift tax considerations for loans over $10,000 between family members",
      "Still legally enforceable for repayment",
      "Simpler payment schedule (principal only)",
    ],
    faq: [
      {
        question: "Is a no-interest loan legal?",
        answer: "Yes, but for family loans over $10,000, the IRS may impute interest at the Applicable Federal Rate if none is charged, treating the difference as a gift. Consult a tax advisor for large amounts.",
      },
      {
        question: "Can I still enforce an interest-free promissory note?",
        answer: "Yes. The absence of interest does not affect enforceability. The lender can still sue for the unpaid principal if the borrower defaults.",
      },
      {
        question: "Should I charge at least a small amount of interest?",
        answer: "For loans over $10,000 between family members, charging at least the IRS Applicable Federal Rate avoids gift tax treatment of the foregone interest.",
      },
      {
        question: "What happens if the borrower defaults on an interest-free note?",
        answer: "You can pursue the outstanding balance in court. Include a default clause specifying whether you can accelerate repayment and whether the borrower owes your legal costs.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "high",
    relatedIntentSlugs: ["interest_bearing", "secured", "demand"],
    relatedDocumentSlugs: ["promissory-note", "loan-agreement", "debt-settlement-agreement"],
    practiceAreas: ["banking-finance", "consumer-protection"],
    suggestedListingPrice: 149,
  },
  {
    id: "secured",
    slug: "secured",
    name: "Secured",
    description: "Loan backed by collateral",
    seoTitle: "Secured Promissory Note Template | LegalLawDocs.com",
    metaDescription:
      "Create a secured promissory note online. Document a collateral-backed loan with lien provisions and remedies for default.",
    h1: "Secured Promissory Note",
    shortDescription: "A secured promissory note is backed by specific collateral (real estate, vehicle, equipment) that the lender can claim if the borrower defaults.",
    whenToUse: "Use when lending a larger amount and wanting to secure repayment against specific collateral.",
    keyDifferences: [
      "Borrower pledges specific collateral to secure repayment",
      "Lender has a security interest that may need to be perfected (UCC filing)",
      "Default allows lender to claim the collateral",
      "Provides stronger legal protection for lender",
    ],
    faq: [
      {
        question: "What can be used as collateral in a secured promissory note?",
        answer: "Common collateral: real estate (secured by a mortgage or deed of trust), vehicles (secured by a lien on the title), equipment, inventory, or accounts receivable.",
      },
      {
        question: "What is a UCC filing?",
        answer: "For personal property collateral, lenders file a UCC-1 financing statement with the state to 'perfect' their security interest — publicly recording their claim on the collateral.",
      },
      {
        question: "What happens to the collateral if the borrower defaults?",
        answer: "The lender can repossess (personal property) or foreclose (real property) on the collateral, following state-specific procedures. The borrower typically has a cure period.",
      },
      {
        question: "Is a secured promissory note better than an unsecured one?",
        answer: "Better for the lender — it provides a concrete remedy in case of default. For the borrower, it means risking the specific asset. Both parties should clearly understand the terms.",
      },
    ],
    indexable: false,
    tier: "flow-only",
    priority: "low",
    relatedIntentSlugs: ["interest_bearing", "interest_free"],
    relatedDocumentSlugs: ["promissory-note", "loan-agreement"],
    practiceAreas: ["banking-finance"],
  },
  {
    id: "demand",
    slug: "demand",
    name: "On Demand",
    description: "Loan repayable whenever lender requests",
    seoTitle: "Demand Promissory Note Template | LegalLawDocs.com",
    metaDescription: "Create a demand promissory note online. Document a loan repayable in full upon the lender's request, with interest provisions.",
    h1: "Demand Promissory Note",
    shortDescription: "A demand promissory note makes the loan repayable in full whenever the lender makes a written demand, rather than on a fixed schedule.",
    whenToUse: "Use for short-term or informal loans where the lender wants flexibility to call in the loan at any time.",
    keyDifferences: [
      "No fixed repayment schedule — due when demanded",
      "Lender has maximum flexibility to call the loan",
      "Borrower faces uncertainty about repayment timing",
      "May include a reasonable notice period before demand is due",
    ],
    faq: [
      {
        question: "What is a demand promissory note?",
        answer: "A demand note is repayable immediately (or within a short notice period) upon the lender's written request, rather than on a fixed schedule.",
      },
      {
        question: "How quickly can a lender call a demand note?",
        answer: "Typically upon written notice. The note can specify a minimum notice period (e.g., 30 days) to give the borrower time to arrange repayment.",
      },
      {
        question: "Is a demand note enforceable?",
        answer: "Yes. Courts enforce demand notes as long as they meet basic contract requirements and the demand is made in accordance with the note's terms.",
      },
      {
        question: "When should I use a demand note vs. a scheduled repayment note?",
        answer: "Use a demand note for short-term, informal loans or bridge financing where flexibility matters. Use a scheduled note for larger or longer-term loans where the borrower needs predictability.",
      },
    ],
    indexable: false,
    tier: "flow-only",
    priority: "low",
    relatedIntentSlugs: ["interest_bearing", "interest_free"],
    relatedDocumentSlugs: ["promissory-note", "loan-agreement"],
    practiceAreas: ["banking-finance"],
  },
]

// ── New Documents: Demand Letter ──────────────────────────────────────────────

const demandLetterIntents: DocumentIntent[] = [
  {
    id: "payment",
    slug: "payment",
    name: "Payment Demand",
    description: "Demand repayment of a debt or unpaid invoice",
    seoTitle: "Payment Demand Letter Template | LegalLawDocs.com",
    metaDescription:
      "Create a payment demand letter online. Formally demand repayment of an overdue debt or unpaid invoice before pursuing legal action.",
    h1: "Payment Demand Letter",
    shortDescription:
      "A payment demand letter formally demands repayment of a specific amount — unpaid invoices, loans, or debts — before pursuing legal action.",
    whenToUse: "Use when a client, customer, or borrower owes you money and informal requests have not worked.",
    keyDifferences: [
      "Specifies the exact amount owed with documentation",
      "Sets a clear payment deadline",
      "Creates a paper trail before legal action",
      "May reference applicable interest and late fees",
    ],
    faq: [
      {
        question: "How long should I give for a payment demand?",
        answer: "10–30 days is standard. For smaller amounts, 10–14 days is reasonable. For larger debts, 30 days gives the debtor time to arrange payment without appearing unserious.",
      },
      {
        question: "What if they don't pay after the demand letter?",
        answer: "File in small claims court (for smaller amounts) or pursue civil litigation. The demand letter establishes that you made a good-faith effort to resolve before suing.",
      },
      {
        question: "Should I attach invoices and documentation?",
        answer: "Yes. Include all supporting documentation: original invoices, contracts, receipts, or statements. This strengthens the demand and shows you are prepared to prove your claim.",
      },
      {
        question: "Is a demand letter legally required before suing?",
        answer: "Generally no, but many courts view failure to send one negatively. Small claims courts sometimes require a demand letter. It also shows good faith and may settle the matter without litigation.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "high",
    relatedIntentSlugs: ["services", "property"],
    relatedDocumentSlugs: ["demand-letter", "final-notice-before-legal-action", "payment-plan-agreement"],
    practiceAreas: ["collections", "litigation", "business-contracts"],
    suggestedListingPrice: 149,
  },
  {
    id: "services",
    slug: "services",
    name: "Services Dispute",
    description: "Demand resolution for unsatisfactory or undelivered services",
    seoTitle: "Services Dispute Demand Letter Template | LegalLawDocs.com",
    metaDescription:
      "Create a services dispute demand letter online. Formally demand compensation or resolution for undelivered or substandard professional services.",
    h1: "Services Dispute Demand Letter",
    shortDescription:
      "A services dispute demand letter demands resolution — a refund, corrective work, or damages — when a service provider has failed to deliver agreed services.",
    whenToUse: "Use when a contractor, vendor, or service provider has failed to deliver work or delivered substandard work and informal resolution has failed.",
    keyDifferences: [
      "Identifies the specific services that were not delivered or were defective",
      "References the contract or agreement",
      "Demands specific remedy (refund, redo, damages)",
      "Documents the failure before filing a claim",
    ],
    faq: [
      {
        question: "What should I include in a services dispute demand?",
        answer: "The original agreement, what was promised vs. what was delivered, specific deficiencies, your requested remedy, and a response deadline.",
      },
      {
        question: "Can I demand a full refund for bad service?",
        answer: "You can demand it, but courts typically award proportional damages — the difference between contract value and what was actually delivered. Document all deficiencies with evidence.",
      },
      {
        question: "What if the contractor says the work is complete?",
        answer: "Reference the acceptance criteria in the contract. If there are none, refer to industry standards. Offer to have a third party evaluate the work if needed.",
      },
      {
        question: "How does a demand letter help in a contractor dispute?",
        answer: "It formally documents the dispute, puts the contractor on notice, and may trigger their insurance claim. It also demonstrates good faith before you file a BBB complaint, chargeback, or lawsuit.",
      },
    ],
    indexable: false,
    tier: "flow-only",
    priority: "low",
    relatedIntentSlugs: ["payment"],
    relatedDocumentSlugs: ["demand-letter", "complaint-letter", "notice-of-breach"],
    practiceAreas: ["consumer-protection", "business-contracts"],
  },
  {
    id: "property",
    slug: "property",
    name: "Property Damage",
    description: "Demand compensation for property damage",
    seoTitle: "Property Damage Demand Letter Template | LegalLawDocs.com",
    metaDescription:
      "Create a property damage demand letter online. Formally demand compensation for damage caused to your property.",
    h1: "Property Damage Demand Letter",
    shortDescription:
      "A property damage demand letter formally demands reimbursement for damage caused to your property — from a landlord, tenant, vehicle accident, neighbor, or contractor.",
    whenToUse: "Use when someone has damaged your property and you want to formally demand compensation before filing an insurance claim or lawsuit.",
    keyDifferences: [
      "Identifies the damaged property with description and photos",
      "Documents repair costs with estimates or receipts",
      "Demands specific dollar amount",
      "References the responsible party's duty of care",
    ],
    faq: [
      {
        question: "What evidence should I include with a property damage demand?",
        answer: "Photos of the damage, repair estimates or invoices, receipts for emergency repairs, and any witness statements or police reports.",
      },
      {
        question: "Should I go through insurance or send a demand letter first?",
        answer: "Often both. If the other party has insurance, you may file a claim. A demand letter directly to the responsible party can accelerate resolution, especially if the amount is below their deductible.",
      },
      {
        question: "What if they dispute the amount of damage?",
        answer: "Get multiple repair estimates and include them all. If needed, request a joint inspection. Mediating the dispute informally is faster than litigation.",
      },
      {
        question: "Can I include my time and inconvenience?",
        answer: "You can include consequential damages (hotel costs, lost income) but courts typically don't award pain and suffering in property damage cases unless there was an intentional tort.",
      },
    ],
    indexable: false,
    tier: "flow-only",
    priority: "low",
    relatedIntentSlugs: ["payment"],
    relatedDocumentSlugs: ["demand-letter", "complaint-letter", "general-release-of-liability"],
    practiceAreas: ["consumer-protection", "litigation"],
  },
]

// ── Registry map ──────────────────────────────────────────────────────────────

export const INTENT_REGISTRY: Record<string, DocumentIntent[]> = {
  // Original 12 documents (legacy underscore keys for API/DB compat)
  nda: ndaIntents,
  employment_contract: employmentContractIntents,
  residential_lease_agreement: residentialLeaseIntents,
  llc_operating_agreement: llcIntents,
  independent_contractor_agreement: contractorIntents,
  partnership_agreement: partnershipIntents,
  power_of_attorney: poaIntents,
  last_will_testament: lastWillIntents,
  commercial_lease_agreement: commercialLeaseIntents,
  service_agreement: serviceAgreementIntents,
  purchase_agreement: purchaseAgreementIntents,
  non_compete_agreement: nonCompeteIntents,
  // 16 new documents
  cease_and_desist_letter: ceaseAndDesistIntents,
  landlord_notice_to_vacate: landlordNoticeIntents,
  promissory_note: promissoryNoteIntents,
  demand_letter: demandLetterIntents,
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** All intents for a document — accepts legacy underscore OR new hyphenated slug */
export function getIntentsForDocument(slug: string): DocumentIntent[] {
  // Normalise hyphenated to underscore for legacy key lookup
  const key = slug.replace(/-/g, "_")
  return INTENT_REGISTRY[key] || INTENT_REGISTRY[slug] || []
}

/** Single intent by ID for a document */
export function getIntentForDocument(
  slug: string,
  intentId: string
): DocumentIntent | undefined {
  const intents = getIntentsForDocument(slug)
  return intents.find((i) => i.id === intentId || i.slug === intentId)
}

/** All indexable subroute intents across all documents (for sitemap) */
export function getAllIndexableSubrouteIntents(): {
  legacySlug: string
  intent: DocumentIntent
}[] {
  return Object.entries(INTENT_REGISTRY).flatMap(([legacySlug, intents]) =>
    intents
      .filter((i) => i.indexable && i.tier === "subroute")
      .map((intent) => ({ legacySlug, intent }))
  )
}
