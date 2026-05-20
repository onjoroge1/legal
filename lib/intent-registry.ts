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

// ── Backward-compatible alias (generate page uses `Intent`) ───────────────────

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
  // ── Extended page content (drives 2,500-word minimum per page) ────────────
  bodyContent?: {
    /** 4 paragraphs (~175 words each) — comprehensive guide unique to this intent */
    overview: string[]
    /** 5 numbered steps explaining the creation process (~70 words each) */
    howItWorks: { step: string; description: string }[]
    /** 4 legal considerations specific to this variant (~85 words each) */
    legalConsiderations: { title: string; body: string }[]
    /** 5 common mistakes and how to avoid them (~70 words each) */
    commonMistakes: { mistake: string; fix: string }[]
    /** 4 additional FAQs beyond the base faq array (~90 words each) */
    extendedFaq: { question: string; answer: string }[]
  }
}

/** @deprecated use DocumentIntent */
export type Intent = DocumentIntent

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
    tier: "standalone",
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
    tier: "standalone",
    priority: "medium",
    relatedIntentSlugs: ["mutual"],
    relatedDocumentSlugs: ["service-agreement", "employment-contract", "independent-contractor-agreement"],
    practiceAreas: ["business-contracts", "intellectual-property"],
    suggestedListingPrice: 199,
  },
  {
    id: "investor",
    slug: "investor",
    name: "Investor NDA",
    description: "NDA for investor due diligence situations",
    seoTitle: "Investor NDA Template | LegalLawDocs.com",
    metaDescription:
      "Create an investor NDA online. Protect confidential business information shared during fundraising and investor due diligence. State-compliant with instant PDF download.",
    h1: "Investor Non-Disclosure Agreement",
    shortDescription:
      "An investor NDA protects confidential business information — financials, projections, product roadmaps — shared with potential investors during due diligence. It sets clear expectations before you open your books to angel investors, VCs, or strategic partners.",
    whenToUse:
      "Use an investor NDA when sharing confidential business data, financials, or proprietary technology with prospective investors before a funding round.",
    keyDifferences: [
      "Tailored for fundraising and due diligence contexts",
      "Covers financial projections, cap tables, and business plans",
      "Often one-way (founder to investor) with limited mutual obligations",
      "Includes provisions for return or destruction of investor materials",
    ],
    faq: [
      {
        question: "Do investors typically sign NDAs?",
        answer:
          "Many institutional VCs decline to sign NDAs at early stages, but angel investors and strategic partners often will. An NDA is more commonly expected in later-stage due diligence when sensitive financials are being shared.",
      },
      {
        question: "What information should an investor NDA protect?",
        answer:
          "Business plans, financial projections, customer lists, cap tables, technology details, and any proprietary processes shared during diligence should be covered.",
      },
      {
        question: "How long should an investor NDA last?",
        answer:
          "Typically 1–3 years. Investment discussions may be prolonged, and information remains sensitive during that period. Longer terms are appropriate for highly proprietary technology.",
      },
      {
        question: "Can I use a mutual NDA with an investor?",
        answer:
          "You can, but a one-way NDA is more common — you are the disclosing party and the investor is the receiving party. If the investor shares their own confidential fund information, a mutual NDA is appropriate.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "high",
    relatedIntentSlugs: ["mutual", "unilateral", "vendor"],
    relatedDocumentSlugs: ["non-disclosure-agreement", "partnership-agreement", "service-agreement"],
    practiceAreas: ["business-contracts", "startups", "intellectual-property"],
    suggestedListingPrice: 249,
  },
  {
    id: "vendor",
    slug: "vendor",
    name: "Vendor NDA",
    description: "NDA with a vendor or supplier",
    seoTitle: "Vendor NDA Template — Supplier Confidentiality Agreement | LegalLawDocs.com",
    metaDescription:
      "Create a vendor NDA online. Protect confidential information shared with suppliers and vendors. State-compliant one-way or mutual NDA with instant PDF download.",
    h1: "Vendor Non-Disclosure Agreement",
    shortDescription:
      "A vendor NDA protects confidential business information shared with suppliers, vendors, and service providers during the procurement process. It prevents vendors from sharing your specifications, pricing, or processes with competitors.",
    whenToUse:
      "Use a vendor NDA before sharing product specifications, pricing strategies, or operational processes with potential suppliers or service providers.",
    keyDifferences: [
      "Covers procurement, pricing, and supply chain information",
      "Typically one-way (customer to vendor) unless vendor shares proprietary methods",
      "May include non-solicitation of the customer's employees",
      "Often combined with a broader vendor or supplier agreement",
    ],
    faq: [
      {
        question: "When should I use a vendor NDA?",
        answer:
          "Before sharing product requirements, pricing targets, customer data, or manufacturing processes with any external vendor or supplier during evaluation or onboarding.",
      },
      {
        question: "Should a vendor NDA be mutual?",
        answer:
          "Make it mutual if the vendor will also share proprietary methods or pricing. If you are only sharing your information with the vendor, a one-way NDA is simpler and more protective for you.",
      },
      {
        question: "Can a vendor NDA restrict the vendor from working with competitors?",
        answer:
          "Yes, but non-compete provisions in vendor agreements face scrutiny. A non-solicitation clause (prohibiting poaching of your customers or employees) is typically more enforceable.",
      },
      {
        question: "How long should a vendor NDA last?",
        answer:
          "1–3 years is standard for most vendor relationships. For trade secrets or proprietary manufacturing processes, consider longer terms or confidentiality obligations that survive the relationship.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["unilateral", "investor", "freelancer"],
    relatedDocumentSlugs: ["non-disclosure-agreement", "service-agreement", "purchase-agreement"],
    practiceAreas: ["business-contracts", "intellectual-property"],
    suggestedListingPrice: 199,
  },
  {
    id: "freelancer",
    slug: "freelancer",
    name: "Freelancer NDA",
    description: "NDA when hiring a freelancer or contractor",
    seoTitle: "Freelancer NDA Template — Contractor Confidentiality Agreement | LegalLawDocs.com",
    metaDescription:
      "Create a freelancer NDA online. Protect confidential information shared with independent contractors and freelancers. State-compliant with instant PDF download.",
    h1: "Freelancer Non-Disclosure Agreement",
    shortDescription:
      "A freelancer NDA protects confidential business information shared with independent contractors and freelancers during a project engagement. It ensures contractors do not disclose your trade secrets, client data, or proprietary processes.",
    whenToUse:
      "Use a freelancer NDA before onboarding any independent contractor who will access confidential business information, client data, or proprietary systems.",
    keyDifferences: [
      "One-way: business shares confidential info with the freelancer",
      "Covers client data, project details, and business processes",
      "Often signed before or alongside the contractor agreement",
      "Should address IP ownership of deliverables alongside confidentiality",
    ],
    faq: [
      {
        question: "Is a freelancer NDA different from an employee NDA?",
        answer:
          "Similar in substance, but a freelancer NDA must be carefully worded to avoid implying an employment relationship. Reference the contractor's independent status and avoid language suggesting direction and control.",
      },
      {
        question: "Should I have the freelancer sign both an NDA and a contractor agreement?",
        answer:
          "You can include confidentiality provisions within the contractor agreement, or use a separate NDA. A separate NDA is easier to enforce as a standalone document and is common for larger engagements.",
      },
      {
        question: "Can a freelancer NDA restrict work with competitors?",
        answer:
          "A non-compete may be included, but enforceability against independent contractors is limited in many states. A non-solicitation clause (barring the contractor from approaching your clients) is more commonly enforced.",
      },
      {
        question: "Who owns work created under a freelancer NDA?",
        answer:
          "The NDA addresses confidentiality, not IP ownership. To ensure you own the deliverables, include a separate IP assignment clause in your contractor agreement.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["unilateral", "vendor"],
    relatedDocumentSlugs: ["non-disclosure-agreement", "independent-contractor-agreement", "service-agreement"],
    practiceAreas: ["business-contracts", "employment-law"],
    suggestedListingPrice: 149,
  },
  {
    id: "business_sale",
    slug: "business-sale",
    name: "Business Sale NDA",
    description: "NDA during business sale or M&A discussions",
    seoTitle: "Business Sale NDA Template — M&A Confidentiality Agreement | LegalLawDocs.com",
    metaDescription:
      "Create a business sale NDA online. Protect sensitive financial and operational information during M&A discussions and business acquisition negotiations. Instant PDF download.",
    h1: "Business Sale Non-Disclosure Agreement",
    shortDescription:
      "A business sale NDA protects highly sensitive financial, operational, and strategic information shared during business acquisition or merger discussions. It ensures prospective buyers cannot use or disclose confidential data if negotiations break down.",
    whenToUse:
      "Use a business sale NDA before sharing financial statements, customer lists, employee information, or proprietary processes with any prospective buyer or merger partner.",
    keyDifferences: [
      "Covers the full scope of M&A due diligence materials",
      "Often mutual — buyer and seller both share confidential information",
      "Includes non-solicitation of employees and customers",
      "Typically has a 2–5 year term to cover post-negotiation sensitivity",
    ],
    faq: [
      {
        question: "Do I need a business sale NDA even for small business sales?",
        answer:
          "Yes. Even for small businesses, sharing financials, customer lists, and supplier relationships with a prospective buyer creates significant disclosure risk. An NDA is essential before any serious discussions.",
      },
      {
        question: "Should a business sale NDA be mutual?",
        answer:
          "Often yes. The buyer may share financial capacity information, acquisition strategy, or other confidential details during negotiations. A mutual NDA protects both parties.",
      },
      {
        question: "Can the buyer share information received under the NDA with their advisors?",
        answer:
          "Yes — include a permitted disclosure clause allowing the buyer to share with their attorneys, accountants, and financial advisors, provided those advisors are also bound by confidentiality.",
      },
      {
        question: "What happens to the NDA if the deal closes?",
        answer:
          "The NDA is typically superseded by the acquisition agreement at closing. However, it remains relevant for any information about the business that was not transferred in the deal.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "high",
    relatedIntentSlugs: ["mutual", "investor"],
    relatedDocumentSlugs: ["non-disclosure-agreement", "purchase-agreement", "partnership-agreement"],
    practiceAreas: ["business-contracts", "corporate-law", "startups"],
    suggestedListingPrice: 299,
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
    tier: "standalone",
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
  {
    id: "remote_worker",
    slug: "remote-worker",
    name: "Remote Worker Contract",
    description: "Employment contract for remote or distributed employees",
    seoTitle: "Remote Worker Employment Contract Template | LegalLawDocs.com",
    metaDescription:
      "Create a remote worker employment contract online. Cover home office policies, equipment, data security, and state tax obligations for distributed employees. Instant download.",
    h1: "Remote Worker Employment Contract",
    shortDescription:
      "A remote worker employment contract addresses the unique needs of distributed employees: home office requirements, equipment policies, data security, multi-state tax considerations, and availability expectations. Essential for companies with remote-first or hybrid teams.",
    whenToUse:
      "Use when hiring employees who will work from home or a remote location, especially across state lines where multi-state tax and labor law compliance is required.",
    keyDifferences: [
      "Specifies home office requirements and equipment responsibilities",
      "Addresses data security obligations for remote environments",
      "Clarifies work-from-home availability and communication expectations",
      "Includes multi-state tax considerations for out-of-state remote workers",
    ],
    faq: [
      {
        question: "What makes a remote employment contract different?",
        answer:
          "Remote contracts must address home office setup, equipment ownership, data security, expense reimbursement, and multi-state employment tax obligations that don't apply to in-office employees.",
      },
      {
        question: "Who pays for the remote employee's home office equipment?",
        answer:
          "The contract should specify. Some employers provide equipment; others pay a stipend. Some states (like California) require employers to reimburse employees for work-related expenses regardless of the contract.",
      },
      {
        question: "What state's law applies if a remote employee works from another state?",
        answer:
          "Generally, the state where the employee physically works applies, especially for wage and hour laws and workers' compensation. Multi-state arrangements are complex — the contract should address this explicitly.",
      },
      {
        question: "Can I restrict where a remote employee works?",
        answer:
          "Yes. Many employers limit remote work to approved states to manage tax and legal complexity. The contract should specify approved work locations and require written approval for any changes.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "high",
    relatedIntentSlugs: ["at_will", "salaried_employee"],
    relatedDocumentSlugs: ["employment-contract", "non-disclosure-agreement", "non-compete-agreement"],
    practiceAreas: ["employment-law", "business-contracts"],
    suggestedListingPrice: 249,
  },
  {
    id: "hourly_employee",
    slug: "hourly-employee",
    name: "Hourly Employee Contract",
    description: "Hourly rate employment contract with overtime provisions",
    seoTitle: "Hourly Employee Contract Template | LegalLawDocs.com",
    metaDescription:
      "Create an hourly employee contract online. Define hourly rate, overtime, scheduling, and FLSA compliance for non-exempt employees. State-compliant instant download.",
    h1: "Hourly Employee Employment Contract",
    shortDescription:
      "An hourly employee contract documents employment for non-exempt workers paid on an hourly basis. It defines the hourly rate, overtime eligibility, scheduling expectations, and FLSA compliance provisions critical for properly classified hourly workers.",
    whenToUse:
      "Use for non-exempt hourly employees — retail, food service, manufacturing, hospitality — where overtime pay and FLSA classification are important considerations.",
    keyDifferences: [
      "Specifies hourly rate and pay frequency for non-exempt employees",
      "Includes overtime eligibility and calculation (1.5× after 40 hours)",
      "Addresses scheduling, minimum hours, and on-call obligations",
      "FLSA non-exempt classification language included",
    ],
    faq: [
      {
        question: "What is a non-exempt hourly employee?",
        answer:
          "A non-exempt employee is subject to FLSA overtime rules — they must be paid at least 1.5× their regular rate for hours over 40 in a workweek. Most hourly workers are non-exempt unless they meet specific salary and duties tests.",
      },
      {
        question: "Can I set a minimum number of hours for an hourly employee?",
        answer:
          "Yes. The contract can specify minimum weekly hours. However, if the employee is 'at-will,' you can also reduce hours with proper notice. Some states require additional protections for schedule changes.",
      },
      {
        question: "Does an hourly employee need a written contract?",
        answer:
          "Not legally required in most states, but highly recommended. A written contract documents the hourly rate, overtime policy, scheduling expectations, and protections for both parties.",
      },
      {
        question: "How does overtime work for hourly employees?",
        answer:
          "Under federal law, overtime is 1.5× the regular rate for hours over 40 per workweek. Some states (California, Nevada) require daily overtime. The contract should reference applicable state law.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["at_will", "salaried_employee"],
    relatedDocumentSlugs: ["employment-contract", "non-compete-agreement"],
    practiceAreas: ["employment-law", "labor-law"],
    suggestedListingPrice: 199,
  },
  {
    id: "salaried_employee",
    slug: "salaried-employee",
    name: "Salaried Employee Contract",
    description: "Salaried employment contract with exempt classification",
    seoTitle: "Salaried Employee Contract Template | LegalLawDocs.com",
    metaDescription:
      "Create a salaried employee contract online. Define annual salary, exempt status, benefits, and performance expectations for salaried professionals. Instant download.",
    h1: "Salaried Employee Employment Contract",
    shortDescription:
      "A salaried employee contract documents employment for exempt salaried workers who receive a fixed annual compensation regardless of hours worked. It defines salary, FLSA exempt classification, performance expectations, and benefits.",
    whenToUse:
      "Use for professional, administrative, or executive employees who meet FLSA salary and duties tests for exempt classification and are paid a fixed weekly salary.",
    keyDifferences: [
      "Fixed annual or weekly salary regardless of hours worked",
      "FLSA exempt classification language (professional, administrative, or executive exemption)",
      "No overtime requirement for qualifying exempt employees",
      "Often includes annual bonus targets and performance review provisions",
    ],
    faq: [
      {
        question: "What is an exempt salaried employee?",
        answer:
          "An exempt employee meets the FLSA salary threshold (currently $684/week) and satisfies the duties test for executive, administrative, or professional exemptions. They are not entitled to overtime pay.",
      },
      {
        question: "Can a salaried employee be docked pay for partial-day absences?",
        answer:
          "Generally no for exempt employees — docking pay based on hours worked can destroy the FLSA exemption. Deductions are typically limited to full-day absences under specific conditions.",
      },
      {
        question: "Does a salaried employee need a written contract?",
        answer:
          "Not legally required, but strongly recommended. A written contract documents salary, classification, performance expectations, and post-employment restrictions that protect both parties.",
      },
      {
        question: "Can a salaried contract include a performance bonus?",
        answer:
          "Yes. Include the bonus target, calculation method (revenue percentage, discretionary, etc.), and payment timing. Be clear whether the bonus is guaranteed or discretionary.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["at_will", "hourly_employee", "executive"],
    relatedDocumentSlugs: ["employment-contract", "non-compete-agreement", "non-disclosure-agreement"],
    practiceAreas: ["employment-law", "business-contracts"],
    suggestedListingPrice: 249,
  },
  {
    id: "commission_based",
    slug: "commission-based",
    name: "Commission-Based Contract",
    description: "Employment contract with commission or commission+base compensation",
    seoTitle: "Commission-Based Employment Contract Template | LegalLawDocs.com",
    metaDescription:
      "Create a commission-based employment contract online. Define commission structure, draw, clawback provisions, and sales targets for commission employees. Instant download.",
    h1: "Commission-Based Employment Contract",
    shortDescription:
      "A commission-based employment contract defines compensation tied to sales performance — whether commission-only or a base salary plus commission structure. It covers commission rates, payment timing, clawback provisions, and territory assignments.",
    whenToUse:
      "Use for sales employees, real estate agents, or any role where compensation is partly or entirely based on commissions earned from sales or bookings.",
    keyDifferences: [
      "Commission rate, structure, and calculation method defined clearly",
      "Draw against commission provisions (if applicable)",
      "Clawback clause for returned or cancelled deals",
      "Sales territory and quota provisions",
    ],
    faq: [
      {
        question: "What is a draw against commission?",
        answer:
          "A draw is an advance against future commissions — typically given to sales employees during ramp-up. If the employee earns more in commissions than the draw, they receive the difference. If less, they may owe back the draw deficit.",
      },
      {
        question: "What is a commission clawback?",
        answer:
          "A clawback provision requires the employee to return commissions on deals that later cancel or are refunded. The contract should specify the clawback period and method of recovery.",
      },
      {
        question: "What happens to commissions when a commission employee leaves?",
        answer:
          "The contract should specify whether earned but unpaid commissions are paid after departure. Many states require payment of earned commissions upon termination regardless of what the contract says.",
      },
      {
        question: "Can a commission employee be exempt from overtime?",
        answer:
          "Possibly, under the retail or service establishment exemption — if the employee's regular rate exceeds 1.5× minimum wage and more than half their earnings come from commissions. State law may differ.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["at_will", "salaried_employee"],
    relatedDocumentSlugs: ["employment-contract", "non-compete-agreement", "independent-contractor-agreement"],
    practiceAreas: ["employment-law", "business-contracts"],
    suggestedListingPrice: 249,
  },
  {
    id: "probationary_period",
    slug: "probationary-period",
    name: "Probationary Period Contract",
    description: "Employment contract with explicit probationary period",
    seoTitle: "Probationary Period Employment Contract | LegalLawDocs.com",
    metaDescription:
      "Create an employment contract with a probationary period online. Define evaluation criteria, reduced benefits, and conversion terms for new employees on probation.",
    h1: "Probationary Period Employment Contract",
    shortDescription:
      "A probationary period employment contract includes an explicit evaluation period — typically 30–90 days — during which the employer can assess fit before the employee transitions to standard status.",
    whenToUse:
      "Use when you want to formalize a trial period for new hires with clear evaluation criteria and different terms (e.g., no benefits during probation) before confirming permanent employment.",
    keyDifferences: [
      "Defines a probationary period with start and end dates",
      "May include reduced benefits or different termination notice during probation",
      "Sets evaluation criteria for successful completion",
      "Clarifies what happens at probation end (automatic conversion or written confirmation)",
    ],
    faq: [
      {
        question: "Does a probationary period protect an employer from wrongful termination claims?",
        answer:
          "Not necessarily. A probationary period does not override state wrongful termination laws or discrimination protections. Termination during probation can still be illegal if discriminatory.",
      },
      {
        question: "Can benefits be withheld during a probationary period?",
        answer:
          "Yes, for most benefits. However, some state laws require certain benefits (workers' compensation, state leave) from day one regardless of probationary status.",
      },
      {
        question: "How long should a probationary period be?",
        answer:
          "30–90 days is most common. For technical or complex roles, 90–180 days may be appropriate. Longer probation periods can create implied expectations of permanent employment if the employee passes.",
      },
      {
        question: "Can an employee be fired without notice during probation?",
        answer:
          "In most at-will states, yes — unless the contract specifies a notice requirement during probation. Document performance issues carefully regardless to support any termination decision.",
      },
    ],
    indexable: false,
    tier: "flow-only",
    priority: "low",
    relatedIntentSlugs: ["at_will", "fixed_term"],
    relatedDocumentSlugs: ["employment-contract", "independent-contractor-agreement"],
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
    tier: "standalone",
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
  {
    id: "family_member",
    slug: "family-member",
    name: "Family Member Lease",
    description: "Lease to a family member — informal but still protective",
    seoTitle: "Family Member Lease Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create a residential lease for a family member online. Protect your property and relationship with a formal lease that documents rent, terms, and expectations. Instant download.",
    h1: "Family Member Residential Lease Agreement",
    shortDescription:
      "A family member lease provides a formal rental agreement between a landlord and a family member tenant. Even in family situations, a written lease protects the property, prevents misunderstandings, and can be important for tax purposes if renting below market rate.",
    whenToUse:
      "Use when renting to a family member — parent, child, sibling — to document expectations, protect the property, and comply with IRS requirements for below-market rents.",
    keyDifferences: [
      "Acknowledges the family relationship while maintaining formal documentation",
      "Addresses below-market rent and IRS gift considerations",
      "Covers property maintenance responsibilities and guest policies",
      "Important for landlords claiming rental deductions on below-market rentals",
    ],
    faq: [
      {
        question: "Do I need a lease if I'm renting to a family member?",
        answer:
          "Yes. A written lease protects your property, documents the terms, and prevents disputes that can damage family relationships. It is also required if you want to deduct rental expenses on your taxes.",
      },
      {
        question: "Can I charge below-market rent to a family member?",
        answer:
          "Yes, but the IRS limits deductible rental expenses to the amount of rent collected if you charge below fair market value. Consult a tax advisor for amounts significantly below market.",
      },
      {
        question: "What if the family member doesn't pay rent?",
        answer:
          "The lease gives you the legal right to pursue overdue rent through normal landlord-tenant procedures. A written agreement makes the process clearer and less contentious.",
      },
      {
        question: "Does a family lease need all the same clauses as a regular lease?",
        answer:
          "Yes — a family lease should include all standard provisions: rent amount, due date, security deposit, maintenance responsibilities, and termination notice. It may be slightly less formal in tone.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["single_tenant", "month_to_month"],
    relatedDocumentSlugs: ["residential-lease-agreement", "landlord-notice-to-vacate"],
    practiceAreas: ["landlord-tenant", "real-estate"],
    suggestedListingPrice: 149,
  },
  {
    id: "student_housing",
    slug: "student-housing",
    name: "Student Housing Lease",
    description: "Lease for student tenants with academic year terms",
    seoTitle: "Student Housing Lease Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create a student housing lease agreement online. Cover academic year terms, co-signer requirements, and student-specific policies for landlords renting near campuses. Instant download.",
    h1: "Student Housing Lease Agreement",
    shortDescription:
      "A student housing lease is tailored for renting to college or university students. It addresses academic year timing, parent or guarantor co-signers, noise and guest policies appropriate for student tenants, and security deposit provisions for furnished student rentals.",
    whenToUse:
      "Use when renting to college students, especially for properties near universities where academic-year lease terms, parent guarantors, and specific student policies are appropriate.",
    keyDifferences: [
      "Lease term aligned with academic year (August–May common)",
      "Parent or guardian co-signer/guarantor provisions",
      "Noise, guest, and occupancy policies tailored for student living",
      "Furnished rental provisions including furniture inventory",
    ],
    faq: [
      {
        question: "Should I require a parent or guardian to co-sign a student lease?",
        answer:
          "Strongly recommended if the student has no income or credit history. A co-signer (guarantor) is personally liable for rent and damages, providing significant protection for the landlord.",
      },
      {
        question: "Can a student lease be shorter than 12 months?",
        answer:
          "Yes. Academic-year leases (9–10 months) are common near universities. You can also offer separate summer sub-leases. Clearly specify the lease term and what happens at the end of each period.",
      },
      {
        question: "What policies should a student housing lease include?",
        answer:
          "Guest policies (overnight guests, party size limits), quiet hours, occupancy limits, smoking, subletting rights, and consequences for violations. These are especially important with student tenants.",
      },
      {
        question: "Can I charge a higher security deposit for student tenants?",
        answer:
          "No — your state's security deposit cap applies regardless of the tenant type. However, you can require a parent guarantor and include detailed move-in inspection documentation.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["multi_tenant", "furnished"],
    relatedDocumentSlugs: ["residential-lease-agreement"],
    practiceAreas: ["landlord-tenant", "real-estate"],
    suggestedListingPrice: 149,
  },
  {
    id: "tenant_with_pets",
    slug: "tenant-with-pets",
    name: "Lease with Pet Policy",
    description: "Residential lease with explicit pet policy and pet deposit",
    seoTitle: "Pet-Friendly Lease Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create a pet-friendly residential lease agreement online. Include pet deposits, breed restrictions, and pet damage provisions that protect your property. Instant download.",
    h1: "Residential Lease Agreement with Pet Policy",
    shortDescription:
      "A lease with pet policy includes detailed provisions for tenants with pets: pet deposit or pet rent, approved pet types and breed restrictions, number limits, damage liability, and veterinary record requirements. Protects the property while accommodating pet-owning tenants.",
    whenToUse:
      "Use when a tenant has or wants to have pets, to formally document the pet policy, any additional deposits or fees, and the tenant's liability for pet-caused damage.",
    keyDifferences: [
      "Specifies approved pets, breeds, sizes, and number limits",
      "Pet deposit or non-refundable pet fee clearly defined",
      "Tenant liability for all pet-caused damage beyond normal wear",
      "Veterinary and vaccination record requirements",
    ],
    faq: [
      {
        question: "Can I charge a pet deposit in addition to the regular security deposit?",
        answer:
          "In many states yes, but total deposits may be capped by state law. Some states (California) count pet deposits toward the overall security deposit cap. Others allow separate pet deposits. Check your state's rules.",
      },
      {
        question: "Can I restrict pet breeds in a lease?",
        answer:
          "Yes in most states for regular pets. However, service animals and emotional support animals (ESAs) are protected under fair housing laws — breed restrictions cannot be applied to assistance animals.",
      },
      {
        question: "Can a 'no pets' policy be enforced against service animals?",
        answer:
          "No. The Fair Housing Act requires landlords to make reasonable accommodations for tenants with disabilities who need service animals or ESAs, even in no-pet properties.",
      },
      {
        question: "What should a pet policy clause include?",
        answer:
          "Species and breed restrictions, weight limits, number of pets, pet deposit amount and refund conditions, pet rent (if any), vaccination requirements, leash rules, and consequences for unauthorized pets.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["single_tenant", "multi_tenant"],
    relatedDocumentSlugs: ["residential-lease-agreement"],
    practiceAreas: ["landlord-tenant", "real-estate"],
    suggestedListingPrice: 149,
  },
  {
    id: "short_term_rental",
    slug: "short-term-rental",
    name: "Short-Term Rental",
    description: "30–180 day furnished short-term rental agreement",
    seoTitle: "Short-Term Rental Agreement Template (30–180 Days) | LegalLawDocs.com",
    metaDescription:
      "Create a short-term furnished rental agreement online. Cover 30–180 day stays with furniture inventory, utilities, cleaning fees, and early termination provisions. Instant download.",
    h1: "Short-Term Rental Agreement (30–180 Days)",
    shortDescription:
      "A short-term rental agreement covers furnished rentals from 30 to 180 days — longer than vacation rentals but shorter than standard leases. It addresses furniture inventory, utilities, weekly or monthly rent, and early termination provisions for temporary housing situations.",
    whenToUse:
      "Use for furnished rentals of 30–180 days — corporate housing, temporary relocation, extended travel, or medical stays — where the tenant needs a fully furnished space for a defined short period.",
    keyDifferences: [
      "Shorter defined term (30–180 days) with no renewal assumption",
      "Furnished rental with furniture inventory attached",
      "Utilities often included in the rent or itemized separately",
      "Cleaning fee and check-in/check-out procedures specified",
    ],
    faq: [
      {
        question: "Is a short-term rental agreement the same as a vacation rental agreement?",
        answer:
          "Similar but different. Vacation rentals are typically under 30 days. Short-term rentals in this context are 30–180 days — long enough to be subject to landlord-tenant law in most states, requiring a proper lease rather than a vacation rental agreement.",
      },
      {
        question: "Do short-term rentals require a license in my city?",
        answer:
          "Many cities regulate short-term rentals, including 30+ day rentals. Check your local municipal code. Some cities require registration, licensing, or owner-occupancy for any rental under 6 months.",
      },
      {
        question: "Should utilities be included in a short-term rental?",
        answer:
          "Including utilities (electric, gas, internet, water) simplifies billing and is common for corporate housing. If excluding utilities, specify how each is billed and transferred to the tenant.",
      },
      {
        question: "Can I end a short-term rental early if the tenant leaves?",
        answer:
          "The agreement should specify the early termination fee and notice required. For short stays, a full remaining rent obligation or a defined break fee (e.g., 2 weeks' rent) is common.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["furnished", "month_to_month"],
    relatedDocumentSlugs: ["residential-lease-agreement", "month-to-month-lease-agreement"],
    practiceAreas: ["landlord-tenant", "real-estate"],
    suggestedListingPrice: 149,
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
    tier: "standalone",
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
    tier: "standalone",
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
  {
    id: "designer",
    slug: "designer",
    name: "Designer Contractor",
    description: "Contractor agreement for designers and creative professionals",
    seoTitle: "Graphic Designer Contractor Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create a designer contractor agreement online. Cover creative deliverables, IP ownership, revision rounds, and payment milestones for graphic designers and creative contractors.",
    h1: "Designer Independent Contractor Agreement",
    shortDescription:
      "A designer contractor agreement covers the unique needs of creative contractors — graphic designers, web designers, UX/UI designers, illustrators, and photographers. It addresses deliverable formats, revision rounds, IP ownership, and usage rights.",
    whenToUse:
      "Use when hiring a graphic designer, web designer, photographer, illustrator, or other creative professional on a project or ongoing basis.",
    keyDifferences: [
      "Covers creative deliverables and file format requirements",
      "Defines number of revision rounds included",
      "IP assignment and usage rights are especially important for creative work",
      "Kill fee provisions for cancelled projects",
    ],
    faq: [
      {
        question: "Who owns the design work a contractor creates?",
        answer:
          "Without a written IP assignment, the contractor typically retains copyright in their creative work. To ensure your company owns the designs, include an explicit work-made-for-hire clause or IP assignment provision.",
      },
      {
        question: "What is a kill fee?",
        answer:
          "A kill fee is compensation paid to the designer if you cancel the project mid-engagement. Typically 25–50% of the remaining project fee. It's fair compensation for work done and protects the designer.",
      },
      {
        question: "How many revision rounds should I include?",
        answer:
          "2–3 rounds of revisions is standard for most design projects. Define what counts as a revision round (minor edits vs. direction changes) to avoid scope creep disputes.",
      },
      {
        question: "Can I use the designs on all platforms without restriction?",
        answer:
          "Only if your contract grants unlimited usage rights. Many designers license work for specific uses (print only, digital only, one-year term). Specify the scope of usage rights clearly.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["project_based", "developer", "marketing"],
    relatedDocumentSlugs: ["independent-contractor-agreement", "service-agreement", "non-disclosure-agreement"],
    practiceAreas: ["business-contracts", "intellectual-property"],
    suggestedListingPrice: 149,
  },
  {
    id: "developer",
    slug: "developer",
    name: "Software Developer Contractor",
    description: "Contractor agreement for software developers",
    seoTitle: "Software Developer Contractor Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create a software developer contractor agreement online. Cover code ownership, open source restrictions, IP assignment, and NDA provisions for freelance developers. Instant download.",
    h1: "Software Developer Independent Contractor Agreement",
    shortDescription:
      "A software developer contractor agreement covers the unique requirements of freelance and contract software development: code ownership, open source restrictions, IP assignment, source code escrow, and confidentiality of proprietary technology.",
    whenToUse:
      "Use when hiring a freelance software developer, mobile app developer, or technical contractor to build, maintain, or extend a software product.",
    keyDifferences: [
      "Code ownership and IP assignment provisions critical for software",
      "Open source license restrictions to prevent contamination of proprietary code",
      "Source code delivery and documentation requirements",
      "Bug warranty period after delivery",
    ],
    faq: [
      {
        question: "Who owns code written by a contractor?",
        answer:
          "Without a written assignment, the contractor retains copyright in code they write. To ensure your company owns the software, include a work-made-for-hire clause or explicit IP assignment in the contract.",
      },
      {
        question: "What are open source restrictions in a developer contract?",
        answer:
          "Many open source licenses (GPL, AGPL) require derivative works to be released under the same license. A well-drafted contract prohibits the contractor from incorporating such code into your proprietary software without approval.",
      },
      {
        question: "Should I require the developer to provide source code?",
        answer:
          "Yes. Specify that all source code, documentation, and repositories are delivered to you upon project completion or termination. Without this, the contractor could hold code hostage.",
      },
      {
        question: "Should I have a warranty period after software delivery?",
        answer:
          "Yes. Include a 30–90 day bug warranty period during which the developer fixes defects at no additional cost. Define what constitutes a 'defect' vs. a new feature request.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "high",
    relatedIntentSlugs: ["project_based", "designer"],
    relatedDocumentSlugs: ["independent-contractor-agreement", "non-disclosure-agreement", "service-agreement"],
    practiceAreas: ["business-contracts", "intellectual-property"],
    suggestedListingPrice: 199,
  },
  {
    id: "marketing",
    slug: "marketing",
    name: "Marketing Contractor",
    description: "Contractor agreement for marketing and content professionals",
    seoTitle: "Marketing Contractor Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create a marketing contractor agreement online. Cover content ownership, campaign deliverables, performance expectations, and confidentiality for marketing freelancers. Instant download.",
    h1: "Marketing Independent Contractor Agreement",
    shortDescription:
      "A marketing contractor agreement covers freelance marketing professionals — content writers, social media managers, SEO specialists, paid media managers, and marketing strategists. It addresses content ownership, platform access, performance expectations, and brand confidentiality.",
    whenToUse:
      "Use when hiring a freelance content writer, social media manager, SEO specialist, or marketing consultant on a project or ongoing retainer basis.",
    keyDifferences: [
      "Content and copy ownership assigned to the client",
      "Platform and account access terms (social media, ad accounts)",
      "Campaign performance KPIs and reporting obligations",
      "Brand confidentiality and competitive restrictions",
    ],
    faq: [
      {
        question: "Who owns blog posts and content created by a marketing contractor?",
        answer:
          "Without a written assignment, the contractor may retain copyright in content they write. Include an IP assignment clause to ensure all content created for your brand is owned by your company.",
      },
      {
        question: "How do I handle platform access when the marketing contractor relationship ends?",
        answer:
          "The contract should require the contractor to transfer or revoke access to all platforms (social media, Google Ads, CMS) at termination and within a specified number of days.",
      },
      {
        question: "Can I use a marketing contractor on a monthly retainer?",
        answer:
          "Yes. A retainer model is common for ongoing content creation or social media management. Define the monthly deliverables, included hours, and overage rate.",
      },
      {
        question: "Should I restrict a marketing contractor from working with competitors?",
        answer:
          "A non-compete is difficult to enforce against contractors. A non-solicitation provision (prohibiting the contractor from approaching your clients) is more defensible.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["ongoing", "project_based"],
    relatedDocumentSlugs: ["independent-contractor-agreement", "service-agreement", "non-disclosure-agreement"],
    practiceAreas: ["business-contracts", "intellectual-property"],
    suggestedListingPrice: 149,
  },
  {
    id: "construction",
    slug: "construction",
    name: "Construction Contractor",
    description: "Contractor agreement for construction and trades work",
    seoTitle: "Construction Contractor Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create a construction contractor agreement online. Cover project scope, materials, payment schedule, warranties, and lien waivers for construction and trade contractors. Instant download.",
    h1: "Construction Independent Contractor Agreement",
    shortDescription:
      "A construction contractor agreement covers residential and commercial construction, renovation, and trade work. It addresses project scope, materials, payment schedule, change orders, warranties, mechanic's lien waivers, and insurance requirements.",
    whenToUse:
      "Use when hiring a general contractor, subcontractor, electrician, plumber, carpenter, or other trade professional for construction or renovation work.",
    keyDifferences: [
      "Detailed project scope with materials and specifications",
      "Payment schedule tied to project milestones",
      "Mechanic's lien waiver provisions to protect property owners",
      "Insurance and licensing requirements for contractors",
    ],
    faq: [
      {
        question: "What is a mechanic's lien and how do I protect against it?",
        answer:
          "A mechanic's lien is a legal claim a contractor or subcontractor can file against your property if unpaid. Require a lien waiver from all contractors and subcontractors before each payment to protect your property.",
      },
      {
        question: "What warranties should a construction contractor provide?",
        answer:
          "A 1-year workmanship warranty is standard for most construction work. Some states impose minimum implied warranties. Require the contractor to pass through any manufacturer's warranties on materials and equipment.",
      },
      {
        question: "Should the contract cover change orders?",
        answer:
          "Yes. Change orders are the most common source of construction disputes. Require all scope changes to be in writing, signed by both parties, with agreed price and timeline adjustment before work begins.",
      },
      {
        question: "What insurance should a construction contractor carry?",
        answer:
          "At minimum: general liability ($1M per occurrence is common), workers' compensation, and commercial auto. Require a certificate of insurance naming you as an additional insured before work begins.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["project_based"],
    relatedDocumentSlugs: ["independent-contractor-agreement", "service-agreement", "purchase-agreement"],
    practiceAreas: ["business-contracts", "real-estate"],
    suggestedListingPrice: 199,
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
  {
    id: "profit_sharing",
    slug: "profit-sharing",
    name: "Profit Sharing Partnership",
    description: "Partnership with custom profit sharing arrangement",
    seoTitle: "Profit Sharing Partnership Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create a profit sharing partnership agreement online. Define custom profit and loss allocation ratios, distribution schedules, and partner capital accounts. Instant download.",
    h1: "Profit Sharing Partnership Agreement",
    shortDescription:
      "A profit sharing partnership agreement defines a customized allocation of profits and losses among partners that may differ from ownership percentages. It clearly documents each partner's share of income and the distribution schedule.",
    whenToUse:
      "Use when partners want to allocate profits differently from ownership — for example, giving a managing partner a larger profit share to reflect their operational contribution.",
    keyDifferences: [
      "Profit and loss allocation set independently from ownership percentage",
      "Distribution schedule and timing defined clearly",
      "Capital accounts track each partner's economic interest",
      "Tax implications of custom allocations addressed",
    ],
    faq: [
      {
        question: "Can profits be split differently from ownership?",
        answer:
          "Yes. Partnership agreements can allocate profits in any ratio agreed upon by the partners, even if it doesn't match ownership percentages. The IRS requires that the allocation have 'substantial economic effect.'",
      },
      {
        question: "How often should profits be distributed?",
        answer:
          "Common schedules: quarterly, annually, or upon completion of a project. The agreement should specify when distributions occur and whether partners can take draws against future profits.",
      },
      {
        question: "What is a capital account in a partnership?",
        answer:
          "A capital account tracks each partner's economic interest — initial contributions, additional investments, allocated profits and losses, and withdrawals. It determines each partner's share on dissolution.",
      },
      {
        question: "Do I need a CPA to set up a custom profit sharing arrangement?",
        answer:
          "A CPA can help ensure the allocation has 'substantial economic effect' for IRS purposes and design a tax-efficient structure. For complex arrangements, professional advice is recommended.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["unequal_split", "silent_partner"],
    relatedDocumentSlugs: ["partnership-agreement", "llc-operating-agreement"],
    practiceAreas: ["business-contracts", "corporate-law"],
    suggestedListingPrice: 249,
  },
  {
    id: "silent_partner",
    slug: "silent-partner",
    name: "Silent Partner Agreement",
    description: "Partnership with a sleeping or silent investor partner",
    seoTitle: "Silent Partner Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create a silent partner agreement online. Document the rights, profit share, and limited involvement of a sleeping or passive investor partner. Instant download.",
    h1: "Silent Partner Agreement",
    shortDescription:
      "A silent partner agreement documents the relationship between an active managing partner and a passive investor (silent partner) who contributes capital but takes no role in day-to-day operations. It defines profit share, liability limits, and reporting obligations.",
    whenToUse:
      "Use when taking on an investor who will contribute capital but not be involved in managing the business — common in restaurants, real estate, and small business ventures.",
    keyDifferences: [
      "Silent partner has no management authority or operational involvement",
      "Profit share defined proportionally to capital contribution",
      "Active partner indemnifies silent partner for operational decisions",
      "Reporting and accounting obligations to the silent partner",
    ],
    faq: [
      {
        question: "What is a silent partner?",
        answer:
          "A silent partner (sleeping partner) contributes capital to a business but takes no active role in management. They share profits and losses but rely on the active partner for operations.",
      },
      {
        question: "Is a silent partner liable for business debts?",
        answer:
          "In a general partnership, yes — even silent partners may be personally liable. To limit liability, consider structuring the investment as a limited partnership (LP) or LLC, which formally limits passive investor liability.",
      },
      {
        question: "What financial reporting does a silent partner deserve?",
        answer:
          "Silent partners typically receive regular financial statements, annual tax documents (K-1), and notification of major business decisions. Define the reporting schedule in the agreement.",
      },
      {
        question: "How does a silent partner exit the business?",
        answer:
          "The agreement should define buyout rights, valuation methods, and exit procedures. Without this, a partner exit can be contentious. Include a right-of-first-refusal and a buy-sell mechanism.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["unequal_split", "investor_partnership"],
    relatedDocumentSlugs: ["partnership-agreement", "llc-operating-agreement", "non-disclosure-agreement"],
    practiceAreas: ["business-contracts", "corporate-law"],
    suggestedListingPrice: 249,
  },
  {
    id: "investor_partnership",
    slug: "investor-partnership",
    name: "Investor Partnership",
    description: "Partnership agreement between investor and operator",
    seoTitle: "Investor Partnership Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create an investor-operator partnership agreement online. Define capital contributions, profit splits, decision-making authority, and investor protections. Instant download.",
    h1: "Investor-Operator Partnership Agreement",
    shortDescription:
      "An investor-operator partnership agreement documents the relationship between a capital investor and a business operator. The investor provides funding; the operator runs the business. It defines each party's contribution, profit share, decision rights, and exit provisions.",
    whenToUse:
      "Use when a capital investor and a business operator are forming a partnership where the investor contributes money and the operator contributes labor and expertise.",
    keyDifferences: [
      "Distinguishes between capital contribution (investor) and sweat equity (operator)",
      "Preferred return provision for the investor before profit sharing",
      "Operator authority over day-to-day decisions; investor approval for major decisions",
      "Buy-sell and exit mechanisms tailored for investor-operator structures",
    ],
    faq: [
      {
        question: "What is a preferred return in an investor partnership?",
        answer:
          "A preferred return gives the investor priority on profits up to a defined percentage (e.g., 8% annually) before profits are split with the operator. It compensates the investor for providing capital.",
      },
      {
        question: "Who has control in an investor-operator partnership?",
        answer:
          "Typically the operator controls day-to-day operations, while the investor has approval rights over major decisions (large expenditures, debt, sale of the business, bringing on new partners).",
      },
      {
        question: "How should the operator be compensated?",
        answer:
          "Operators typically receive a management fee (salary equivalent) paid before profits are distributed, plus a profit share. The management fee compensates for time; the profit share aligns incentives.",
      },
      {
        question: "What happens if the investor and operator disagree?",
        answer:
          "The agreement should define which decisions require investor consent, how disputes are resolved (mediation, arbitration), and include a buy-sell mechanism that allows either party to exit if irreconcilable.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["silent_partner", "unequal_split"],
    relatedDocumentSlugs: ["partnership-agreement", "llc-operating-agreement", "non-disclosure-agreement"],
    practiceAreas: ["business-contracts", "corporate-law", "startups"],
    suggestedListingPrice: 299,
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
    tier: "standalone",
    priority: "high",
    relatedIntentSlugs: ["general", "limited"],
    relatedDocumentSlugs: ["power-of-attorney", "medical-power-of-attorney", "durable-power-of-attorney", "last-will-and-testament"],
    practiceAreas: ["estate-planning", "elder-law", "healthcare-law"],
    suggestedListingPrice: 349,
  },
  {
    id: "elder_care",
    slug: "elder-care",
    name: "Elder Care POA",
    description: "Power of attorney for elder care situations",
    seoTitle: "Elder Care Power of Attorney Form | LegalLawDocs.com",
    metaDescription:
      "Create an elder care power of attorney online. Grant a trusted agent comprehensive authority to manage affairs for an aging parent or senior family member. State-compliant instant download.",
    h1: "Elder Care Power of Attorney",
    shortDescription:
      "An elder care POA grants a trusted family member or caregiver comprehensive authority to manage an aging person's financial, legal, and healthcare affairs. Typically combined with durable and healthcare POA provisions to create a complete elder care plan.",
    whenToUse:
      "Use when an aging parent or senior family member needs a trusted person to manage their affairs — financial, legal, and healthcare — as their capacity to do so independently declines.",
    keyDifferences: [
      "Combines financial and healthcare authority in one document",
      "Durable language ensures authority survives incapacity",
      "Addresses Medicaid planning and long-term care facility decisions",
      "May include POLST/DNR coordination for end-of-life preferences",
    ],
    faq: [
      {
        question: "What is the difference between a regular POA and an elder care POA?",
        answer:
          "An elder care POA is typically broader and specifically designed to address the needs of aging individuals — including long-term care decisions, Medicaid planning, and healthcare directives. It usually includes durable language.",
      },
      {
        question: "Can an elder care POA be used if the person already has dementia?",
        answer:
          "A POA requires the principal to have legal capacity (understand what they are signing) at the time of execution. If capacity is already significantly impaired, court-ordered guardianship or conservatorship may be necessary instead.",
      },
      {
        question: "Can I appoint the same person for financial and healthcare decisions?",
        answer:
          "Yes. Many families name one trusted person for both. Some prefer different agents — one for finances, one for healthcare — to balance different skill sets and relationships.",
      },
      {
        question: "Does an elder care POA need to be notarized?",
        answer:
          "Yes, in most states. Most POAs for financial matters require notarization, and healthcare POAs may additionally require witness signatures. Our AI includes your state's specific requirements.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "high",
    relatedIntentSlugs: ["healthcare", "general"],
    relatedDocumentSlugs: ["power-of-attorney", "durable-power-of-attorney", "medical-power-of-attorney", "last-will-and-testament"],
    practiceAreas: ["estate-planning", "elder-law"],
    suggestedListingPrice: 349,
  },
  {
    id: "real_estate",
    slug: "real-estate",
    name: "Real Estate POA",
    description: "Power of attorney for real estate transactions",
    seoTitle: "Real Estate Power of Attorney Form | LegalLawDocs.com",
    metaDescription:
      "Create a real estate power of attorney online. Authorize an agent to sign closing documents, deeds, or manage real property on your behalf. State-compliant instant download.",
    h1: "Real Estate Power of Attorney",
    shortDescription:
      "A real estate POA authorizes an agent to sign closing documents, execute deeds, and handle real estate transactions on the principal's behalf — commonly used when the property owner cannot attend a closing in person.",
    whenToUse:
      "Use when you cannot be present at a real estate closing, need to sell or transfer property remotely, or want to authorize someone to manage your real estate affairs.",
    keyDifferences: [
      "Specifically authorizes real estate transactions (purchase, sale, refinance)",
      "May be limited to a specific property and transaction",
      "Many title companies require state-specific format for real estate POAs",
      "Should specify whether the authority is limited to one transaction or ongoing",
    ],
    faq: [
      {
        question: "Can I sell my house with a power of attorney?",
        answer:
          "Yes. A properly drafted and executed real estate POA allows your agent to sign all closing documents, deeds, and transfer documents on your behalf. The title company must accept the POA.",
      },
      {
        question: "Does a real estate POA need to be recorded?",
        answer:
          "Yes, in most states. When used to convey real property, the POA (or a certified copy) is recorded with the deed in the county where the property is located.",
      },
      {
        question: "Can I give my agent ongoing real estate authority?",
        answer:
          "Yes, through a general or durable POA with real estate powers. However, for a single closing, a limited POA specific to that transaction is simpler and reduces the risk of misuse.",
      },
      {
        question: "Will a title company accept any power of attorney?",
        answer:
          "Title companies often have specific requirements — notarization, recent execution date, specific powers listed. Contact the title company in advance to confirm their requirements for your state.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "high",
    relatedIntentSlugs: ["limited", "general"],
    relatedDocumentSlugs: ["power-of-attorney", "durable-power-of-attorney", "residential-lease-agreement"],
    practiceAreas: ["estate-planning", "real-estate"],
    suggestedListingPrice: 249,
  },
  {
    id: "vehicle",
    slug: "vehicle",
    name: "Vehicle POA",
    description: "Power of attorney for vehicle title transfer",
    seoTitle: "Vehicle Power of Attorney Form — Title Transfer | LegalLawDocs.com",
    metaDescription:
      "Create a vehicle power of attorney online. Authorize someone to sign a vehicle title transfer, registration, or DMV documents on your behalf. State-compliant instant download.",
    h1: "Vehicle Power of Attorney",
    shortDescription:
      "A vehicle POA authorizes an agent to sign vehicle title transfer documents, DMV paperwork, and registration documents on the principal's behalf — used when the vehicle owner cannot be present at the title transfer.",
    whenToUse:
      "Use when you are selling or buying a vehicle and the owner cannot be present at the DMV or title transfer, or when transferring a vehicle to a family member remotely.",
    keyDifferences: [
      "Limited to vehicle title and registration transactions",
      "Most states have a specific DMV vehicle POA form",
      "Typically limited to one vehicle identified by VIN",
      "Short duration — usually effective for one specific transaction",
    ],
    faq: [
      {
        question: "Can I use a vehicle POA to sell a car I own?",
        answer:
          "Yes. A vehicle POA allows your designated agent to sign the title, complete DMV paperwork, and transfer ownership on your behalf.",
      },
      {
        question: "Does a vehicle POA need to be notarized?",
        answer:
          "Most states require notarization for vehicle title transfers. Some states also have specific DMV forms that must be used. Our AI generates state-specific vehicle POA language.",
      },
      {
        question: "Can a vehicle POA be used for a leased vehicle?",
        answer:
          "Typically no — the lease company (lienholder) owns the vehicle and must be involved in any title transfer. Check with the leasing company for their specific process.",
      },
      {
        question: "How long is a vehicle POA valid?",
        answer:
          "Vehicle POAs are typically short-term (30–90 days) and limited to the specific transaction. Some DMV forms have expiration requirements. Check your state's DMV rules.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["limited"],
    relatedDocumentSlugs: ["power-of-attorney", "vehicle-bill-of-sale", "bill-of-sale"],
    practiceAreas: ["estate-planning"],
    suggestedListingPrice: 149,
  },
  {
    id: "temporary",
    slug: "temporary",
    name: "Temporary POA",
    description: "Short-term limited power of attorney for specific situations",
    seoTitle: "Temporary Power of Attorney Form | LegalLawDocs.com",
    metaDescription:
      "Create a temporary power of attorney online. Grant limited short-term authority for travel, surgery, or specific transactions with a clear expiration date. Instant download.",
    h1: "Temporary Power of Attorney",
    shortDescription:
      "A temporary POA grants limited authority for a specific period or purpose — international travel, surgery, business travel — with a clear start and end date. Authority automatically expires when the specified date or condition is reached.",
    whenToUse:
      "Use when you need someone to handle specific affairs during a defined period — while traveling internationally, recovering from surgery, or during an extended absence.",
    keyDifferences: [
      "Clear start date and automatic expiration date",
      "Limited to specific acts or categories of decisions",
      "Does not survive incapacity (not durable) unless specified",
      "Commonly used for travel, surgery, or temporary relocation",
    ],
    faq: [
      {
        question: "What is a temporary power of attorney?",
        answer:
          "A temporary POA grants authority for a specific, defined period (e.g., 30 days while traveling) or until a specific event (e.g., return from surgery). It automatically expires at the specified date.",
      },
      {
        question: "Can a temporary POA be revoked before it expires?",
        answer:
          "Yes. You can revoke a POA at any time by providing written notice of revocation to your agent and any institutions relying on the POA. Destruction of the original document may also be effective depending on state law.",
      },
      {
        question: "What happens to a temporary POA if I become incapacitated?",
        answer:
          "Unless it includes 'durable' language, a standard temporary POA terminates if you become incapacitated. If you want it to survive incapacity, add a durability clause.",
      },
      {
        question: "Can I grant temporary POA to manage my finances during travel?",
        answer:
          "Yes. Common authorities in travel POAs include bill payment, bank account management, property maintenance decisions, and handling correspondence. Be specific about what is and isn't authorized.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["limited", "vehicle"],
    relatedDocumentSlugs: ["power-of-attorney"],
    practiceAreas: ["estate-planning"],
    suggestedListingPrice: 149,
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
  {
    id: "single_person",
    slug: "single-person",
    name: "Single Person Will",
    description: "Will for a single or unmarried person",
    seoTitle: "Single Person Last Will & Testament Template | LegalLawDocs.com",
    metaDescription:
      "Create a last will and testament for a single person online. Distribute assets to beneficiaries of your choice without intestacy rules deciding for you. Instant download.",
    h1: "Single Person Last Will and Testament",
    shortDescription:
      "A will for a single person distributes assets to chosen beneficiaries without relying on intestacy laws — which might pass assets to relatives you wouldn't choose. It names an executor, specifies beneficiaries, and can include charitable gifts.",
    whenToUse:
      "Use if you are unmarried (single, divorced, or widowed) without minor children and want to ensure your assets go to the people or organizations you choose.",
    keyDifferences: [
      "Distributes assets to named beneficiaries of your choice",
      "Prevents intestacy laws from directing assets to unwanted relatives",
      "Can include charitable gifts and specific bequests",
      "Names an executor and alternate executor",
    ],
    faq: [
      {
        question: "What happens if a single person dies without a will?",
        answer:
          "Intestacy laws apply — typically distributing assets to parents, siblings, or other relatives in a defined order that may not reflect your wishes. A will ensures you control the distribution.",
      },
      {
        question: "Can a single person leave everything to a friend?",
        answer:
          "Yes. You can leave your estate to anyone — friends, siblings, charities, or any combination. Without a will, the law may prioritize biological relatives regardless of your relationships.",
      },
      {
        question: "Do I need a lawyer to make a will?",
        answer:
          "Not legally required in most states. A properly drafted, signed, and witnessed will is legally valid without attorney involvement. Our AI generates a state-compliant will with the correct execution requirements.",
      },
      {
        question: "What should I do with my will after I sign it?",
        answer:
          "Store the original in a fireproof safe or safe deposit box. Give copies to your executor and trusted person. Tell your executor where the original is located. Review and update after major life changes.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["simple", "homeowner"],
    relatedDocumentSlugs: ["last-will-and-testament", "power-of-attorney", "affidavit"],
    practiceAreas: ["estate-planning", "probate"],
    suggestedListingPrice: 249,
  },
  {
    id: "parent",
    slug: "parent",
    name: "Parent's Will",
    description: "Will with minor children and guardianship provisions",
    seoTitle: "Parent's Last Will & Testament — Guardianship Provisions | LegalLawDocs.com",
    metaDescription:
      "Create a parent's last will and testament online. Name a guardian for your minor children and protect their inheritance with a testamentary trust. Instant download.",
    h1: "Parent's Last Will and Testament with Guardianship",
    shortDescription:
      "A parent's will names a guardian for minor children in the event both parents pass away. It can also establish a testamentary trust to manage the children's inheritance until they reach adulthood, and names a trustee to manage those assets responsibly.",
    whenToUse:
      "Use if you have minor children and want to ensure a trusted guardian is named to care for them and their inheritance is protected until they are old enough to manage it.",
    keyDifferences: [
      "Formal guardianship designation for minor children",
      "Testamentary trust to hold assets until children reach specified age",
      "Names separate trustee and guardian (can be same person)",
      "Alternate guardian named in case primary is unable to serve",
    ],
    faq: [
      {
        question: "What is the most important thing a parent can include in a will?",
        answer:
          "A guardianship designation. Without naming a guardian, a court decides who raises your children — often after contested family proceedings. Naming a guardian is the most impactful step any parent can take.",
      },
      {
        question: "Should I include a trust for my children in my will?",
        answer:
          "Yes, if your children are minors. Without a trust, a court may appoint a conservator to manage their inheritance. A testamentary trust lets you name a trustee and specify when the children receive their inheritance.",
      },
      {
        question: "At what age should children receive their inheritance?",
        answer:
          "Most parents choose 21, 25, or even 30 — staggered distributions (1/3 at 21, 1/3 at 25, balance at 30) are also common. The testamentary trust holds assets until the specified age.",
      },
      {
        question: "Does my spouse automatically get custody of our children?",
        answer:
          "Yes, if both you and your spouse are the legal parents and your spouse survives you. The guardianship designation matters if both parents die or if the surviving parent is determined to be unfit.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "high",
    relatedIntentSlugs: ["guardian", "homeowner"],
    relatedDocumentSlugs: ["last-will-and-testament", "power-of-attorney", "medical-power-of-attorney"],
    practiceAreas: ["estate-planning", "family-law", "probate"],
    suggestedListingPrice: 349,
  },
  {
    id: "homeowner",
    slug: "homeowner",
    name: "Homeowner's Will",
    description: "Will with real property to transfer",
    seoTitle: "Homeowner's Last Will & Testament Template | LegalLawDocs.com",
    metaDescription:
      "Create a homeowner's last will and testament online. Transfer your home and real property to named beneficiaries with a state-compliant will that avoids intestacy. Instant download.",
    h1: "Homeowner's Last Will and Testament",
    shortDescription:
      "A homeowner's will specifically addresses the transfer of real property — your home, land, or investment properties — to named beneficiaries. It ensures property transfers through the probate process as you intend, rather than by default intestacy rules.",
    whenToUse:
      "Use if you own real estate and want to ensure it passes to your chosen beneficiaries — rather than being distributed under intestacy laws or contested by heirs.",
    keyDifferences: [
      "Specific provisions for real property transfer to named beneficiaries",
      "Can direct property to a trust to avoid probate on the real estate",
      "Addresses mortgage and encumbrances on the property",
      "Executor given authority to manage and sell real property",
    ],
    faq: [
      {
        question: "Does a will transfer my house automatically when I die?",
        answer:
          "No. Property titled in your name alone goes through probate first. The will directs how it is distributed after the probate process validates it and appoints the executor.",
      },
      {
        question: "How can I avoid probate on my house?",
        answer:
          "Options include: joint tenancy with right of survivorship, transfer-on-death deed (available in many states), placing the property in a living trust, or beneficiary designations through a revocable trust.",
      },
      {
        question: "Can I leave my house to multiple people?",
        answer:
          "Yes. You can leave it to multiple beneficiaries as tenants in common, or direct the executor to sell the property and divide the proceeds. Specify which you prefer to avoid disputes.",
      },
      {
        question: "What happens to my mortgage when I die?",
        answer:
          "The mortgage does not disappear. Your estate must continue payments until the property is transferred or sold. If a beneficiary inherits the property, they typically assume the mortgage (federal law protects family members' right to assume).",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["simple", "parent"],
    relatedDocumentSlugs: ["last-will-and-testament", "power-of-attorney", "affidavit"],
    practiceAreas: ["estate-planning", "real-estate", "probate"],
    suggestedListingPrice: 299,
  },
  {
    id: "blended_family",
    slug: "blended-family",
    name: "Blended Family Will",
    description: "Will for blended or step-family situations",
    seoTitle: "Blended Family Last Will & Testament Template | LegalLawDocs.com",
    metaDescription:
      "Create a blended family last will and testament online. Balance the needs of a surviving spouse, biological children, and stepchildren with clear asset distribution. Instant download.",
    h1: "Blended Family Last Will and Testament",
    shortDescription:
      "A blended family will addresses the complex dynamics of step-parents, stepchildren, and biological children from multiple relationships. It balances the needs of a surviving spouse while ensuring biological children from prior relationships are not unintentionally disinherited.",
    whenToUse:
      "Use if you are in a second or subsequent marriage with children from previous relationships, and want to ensure fair distribution among your spouse and all biological and stepchildren.",
    keyDifferences: [
      "Addresses biological and stepchildren's inheritance separately",
      "May include a QTIP trust to provide for the surviving spouse while preserving assets for biological children",
      "Specifies which assets go to which relationship of children",
      "Prevents unintentional disinheritance of biological children by a surviving spouse",
    ],
    faq: [
      {
        question: "What is the biggest risk in a blended family without a proper will?",
        answer:
          "The surviving spouse may inherit everything, and biological children from a prior relationship may receive nothing if the new spouse later remarries or leaves assets to their own children.",
      },
      {
        question: "What is a QTIP trust in blended family planning?",
        answer:
          "A Qualified Terminable Interest Property (QTIP) trust provides income to the surviving spouse during their lifetime, with the principal ultimately distributed to the decedent's biological children — balancing both interests.",
      },
      {
        question: "Can I leave different amounts to biological vs. stepchildren?",
        answer:
          "Yes. You can distribute assets however you choose. Stepchildren have no automatic inheritance rights under most states' intestacy laws unless you specifically include them in your will.",
      },
      {
        question: "Should both spouses in a blended family have wills?",
        answer:
          "Yes, absolutely. Both spouses should have coordinated estate plans that address the blended family dynamics. Married couples in blended families often use mirror wills or coordinated trust-based plans.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["guardian", "parent"],
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
    tier: "standalone",
    priority: "high",
    relatedIntentSlugs: ["gross"],
    relatedDocumentSlugs: ["commercial-lease-agreement", "triple-net-lease-agreement", "service-agreement"],
    practiceAreas: ["real-estate", "landlord-tenant", "business-contracts"],
    suggestedListingPrice: 349,
  },
  {
    id: "restaurant",
    slug: "restaurant",
    name: "Restaurant Lease",
    description: "Commercial lease for restaurant or food service business",
    seoTitle: "Restaurant Commercial Lease Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create a restaurant commercial lease agreement online. Cover permitted use for food service, grease trap, ventilation, and health code provisions for restaurant tenants. Instant download.",
    h1: "Restaurant Commercial Lease Agreement",
    shortDescription:
      "A restaurant commercial lease addresses the unique requirements of food service businesses: permitted use for restaurant operations, grease traps, ventilation systems, health code compliance, liquor license transfer provisions, and extensive tenant improvement rights.",
    whenToUse:
      "Use when leasing commercial space for a restaurant, café, bar, food truck commissary, or any food service operation that requires specialized kitchen buildout and health code compliance.",
    keyDifferences: [
      "Permitted use clause covers restaurant/food service specifically",
      "Grease trap, ventilation, and hood system responsibilities",
      "Health code compliance obligations and permit transfer rights",
      "Extensive tenant improvement rights for kitchen build-out",
    ],
    faq: [
      {
        question: "What unique provisions does a restaurant lease need?",
        answer:
          "Restaurant leases must address: permitted use (food service type), grease trap installation and maintenance, ventilation/HVAC for cooking, health department compliance, liquor license assignment, and extended hours of operation.",
      },
      {
        question: "Who is responsible for grease trap maintenance?",
        answer:
          "Typically the tenant installs and maintains the grease trap. The lease should specify who pays for installation, the pumping frequency, and consequences if grease trap violations affect other tenants.",
      },
      {
        question: "Can I transfer my liquor license if I sell the restaurant?",
        answer:
          "The lease should include provisions for assignment and subletting that accommodate a restaurant sale, including the new tenant's ability to obtain the required licenses. Liquor license transfer requirements vary by state.",
      },
      {
        question: "What happens if the health department closes my restaurant?",
        answer:
          "The lease should specify whether a temporary health department closure triggers rent abatement, and whether the landlord has any obligation to ensure the premises comply with code for restaurant use.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["gross", "net"],
    relatedDocumentSlugs: ["commercial-lease-agreement", "service-agreement", "purchase-agreement"],
    practiceAreas: ["real-estate", "business-contracts", "landlord-tenant"],
    suggestedListingPrice: 349,
  },
  {
    id: "warehouse",
    slug: "warehouse",
    name: "Warehouse / Industrial Lease",
    description: "Commercial lease for warehouse or industrial property",
    seoTitle: "Warehouse Lease Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create a warehouse or industrial commercial lease online. Cover loading docks, ceiling heights, power capacity, zoning, and environmental compliance for industrial tenants. Instant download.",
    h1: "Warehouse and Industrial Lease Agreement",
    shortDescription:
      "A warehouse and industrial lease covers the specific needs of industrial tenants — loading dock access, ceiling heights, power and utility capacity, floor load ratings, outdoor storage rights, and environmental compliance provisions.",
    whenToUse:
      "Use when leasing warehouse, distribution, manufacturing, or light industrial space that requires specialized physical specifications and industrial zoning compliance.",
    keyDifferences: [
      "Specifications: ceiling height, floor load, dock doors, drive-in access",
      "Power and utility capacity provisions for industrial equipment",
      "Outdoor storage and yard rights clearly defined",
      "Environmental compliance and hazardous materials obligations",
    ],
    faq: [
      {
        question: "What physical specs should be in a warehouse lease?",
        answer:
          "Ceiling clear height, number and type of loading docks and drive-in doors, floor load rating (PSI), column spacing, electrical capacity (amps, voltage, phase), and HVAC coverage.",
      },
      {
        question: "Who is responsible for environmental compliance in a warehouse lease?",
        answer:
          "Typically the tenant is responsible for contamination caused during their occupancy. The lease should include a baseline environmental assessment and require the tenant to restore the premises to the same condition at exit.",
      },
      {
        question: "Can I store hazardous materials in a leased warehouse?",
        answer:
          "Only with specific lease authorization and compliance with OSHA, EPA, and fire code requirements. The lease should specify approved uses and prohibited materials.",
      },
      {
        question: "What is a typical lease term for industrial space?",
        answer:
          "3–10 years is common for industrial leases. Longer terms are often required for specialized build-outs. Many industrial leases are triple net, with the tenant paying property taxes, insurance, and maintenance.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["net", "gross"],
    relatedDocumentSlugs: ["commercial-lease-agreement", "service-agreement"],
    practiceAreas: ["real-estate", "business-contracts", "landlord-tenant"],
    suggestedListingPrice: 299,
  },
  {
    id: "medical_office",
    slug: "medical-office",
    name: "Medical Office Lease",
    description: "Commercial lease for medical or dental office",
    seoTitle: "Medical Office Lease Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create a medical office commercial lease online. Cover HIPAA compliance, specialized utility needs, ADA requirements, and licensing provisions for healthcare tenants. Instant download.",
    h1: "Medical Office Commercial Lease Agreement",
    shortDescription:
      "A medical office lease addresses the specific requirements of healthcare tenants: specialized utility and plumbing needs, ADA compliance, HIPAA privacy considerations, medical waste disposal, licensing requirements, and permitted use for specific healthcare specialties.",
    whenToUse:
      "Use when leasing office space for a medical practice, dental office, therapy practice, veterinary clinic, or any licensed healthcare provider.",
    keyDifferences: [
      "Permitted use covers specific medical specialty or healthcare service",
      "HIPAA considerations and patient privacy provisions",
      "ADA compliance obligations shared between landlord and tenant",
      "Specialized utilities: medical gas, plumbing, electrical for equipment",
    ],
    faq: [
      {
        question: "What does a medical office lease need beyond a standard office lease?",
        answer:
          "Medical leases must address: permitted use for specific healthcare services, specialized plumbing for operatories, medical gas installation rights, biohazardous waste disposal, ADA compliance, and HIPAA considerations for common areas.",
      },
      {
        question: "Can I transfer my medical practice lease to a buyer?",
        answer:
          "Assignment provisions are critical for medical offices — a sale of the practice requires lease assignment. Ensure the lease allows assignment to qualified successors without unreasonable landlord approval conditions.",
      },
      {
        question: "What ADA compliance obligations do landlords and tenants have?",
        answer:
          "Landlords typically handle common area ADA compliance; tenants handle their leased space. A medical office has heightened ADA obligations due to healthcare accessibility requirements under the ADA.",
      },
      {
        question: "What happens if my medical license is revoked?",
        answer:
          "The lease should address loss of required professional licenses as a default event, with notice and cure provisions. This is especially important for practices that rely on a single licensed professional.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["gross", "net"],
    relatedDocumentSlugs: ["commercial-lease-agreement", "service-agreement"],
    practiceAreas: ["real-estate", "healthcare-law", "business-contracts"],
    suggestedListingPrice: 349,
  },
  {
    id: "shared_office",
    slug: "shared-office",
    name: "Shared Office / Coworking Lease",
    description: "Lease for coworking or shared office space",
    seoTitle: "Coworking Office Lease Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create a coworking or shared office space lease online. Cover hot desks, dedicated desks, private offices, amenity access, and flexible term provisions. Instant download.",
    h1: "Shared Office Space Lease Agreement",
    shortDescription:
      "A shared office or coworking lease covers flexible workspace arrangements: hot desks, dedicated desks, private offices, and virtual memberships. It addresses shared amenity access, meeting room booking, technology use, and short-term or rolling term provisions.",
    whenToUse:
      "Use when renting individual desks, private offices, or suites in a shared workspace — or when operating a coworking facility and leasing space to individual members.",
    keyDifferences: [
      "Flexible short-term or rolling month-to-month terms",
      "Specifies desk type (hot desk, dedicated, private office) and amenities included",
      "Shared space rules: noise, guests, equipment use, food and drink",
      "Data and network security provisions for shared infrastructure",
    ],
    faq: [
      {
        question: "Is a coworking agreement a lease?",
        answer:
          "It can be structured as a license (access to space) rather than a traditional lease (exclusive possession), which gives the operator more flexibility to relocate members and manage occupancy. The distinction affects tenant protections.",
      },
      {
        question: "What should a shared office agreement cover?",
        answer:
          "Type of workspace (hot desk, dedicated, private office), included amenities (WiFi, printing, meeting rooms), hours of access, guest policies, storage rights, security deposit, notice to terminate, and conduct rules.",
      },
      {
        question: "Can I have mail delivered to a coworking address?",
        answer:
          "Many coworking spaces offer virtual mailbox services. The agreement should specify whether mail receipt is included, and whether you can use the address on business registrations and licenses.",
      },
      {
        question: "How much notice is required to end a coworking agreement?",
        answer:
          "Typically 30 days for monthly memberships. The agreement should specify the notice requirement and any lock-in period (e.g., minimum 3-month commitment).",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["gross"],
    relatedDocumentSlugs: ["commercial-lease-agreement", "service-agreement"],
    practiceAreas: ["real-estate", "business-contracts"],
    suggestedListingPrice: 199,
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
  {
    id: "freelance",
    slug: "freelance",
    name: "Freelance Services Agreement",
    description: "Service agreement for freelance work engagements",
    seoTitle: "Freelance Services Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create a freelance services agreement online. Define deliverables, payment terms, IP ownership, and revisions for freelance engagements. Instant PDF download.",
    h1: "Freelance Services Agreement",
    shortDescription:
      "A freelance services agreement covers one-time or ongoing freelance engagements for creative, technical, or professional work. It defines deliverables, payment schedule, revision process, IP ownership, and confidentiality.",
    whenToUse:
      "Use when engaging a freelancer for a defined project or ongoing work — whether for design, writing, development, consulting, or any other professional service.",
    keyDifferences: [
      "Tailored for project-based or ongoing freelance engagements",
      "IP ownership clause ensures client owns the final deliverables",
      "Revision process and acceptance criteria defined",
      "Payment milestones tied to deliverable completion",
    ],
    faq: [
      {
        question: "Is a freelance services agreement the same as an independent contractor agreement?",
        answer:
          "They cover similar ground. A freelance services agreement focuses on the deliverables and payment structure; a contractor agreement focuses more on the working relationship and status. In practice, they are often combined.",
      },
      {
        question: "Who owns the work a freelancer produces?",
        answer:
          "Without a written assignment, the freelancer typically retains copyright. Include an IP assignment clause to ensure you own all deliverables after payment.",
      },
      {
        question: "How should payment milestones be structured?",
        answer:
          "Common approach: 50% deposit upfront, 50% on delivery/acceptance. For larger projects, milestone payments (25% at each stage) reduce risk for both parties.",
      },
      {
        question: "Can I terminate a freelance agreement if I'm unhappy with the work?",
        answer:
          "The agreement should specify termination rights, notice required, and what happens to work in progress. A kill fee (partial payment for work done) is common for creative projects.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["fixed_fee", "retainer"],
    relatedDocumentSlugs: ["service-agreement", "independent-contractor-agreement", "non-disclosure-agreement"],
    practiceAreas: ["business-contracts", "intellectual-property"],
    suggestedListingPrice: 149,
  },
  {
    id: "marketing_services",
    slug: "marketing",
    name: "Marketing Services Agreement",
    description: "Service agreement for marketing agency or contractor",
    seoTitle: "Marketing Services Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create a marketing services agreement online. Cover campaign deliverables, performance KPIs, ad spend authority, content ownership, and reporting obligations. Instant download.",
    h1: "Marketing Services Agreement",
    shortDescription:
      "A marketing services agreement defines the scope of marketing engagements — paid media management, content creation, SEO, social media, or full-service agency retainers. It covers deliverables, performance expectations, ad spend authority, and IP ownership.",
    whenToUse:
      "Use when engaging a marketing agency, consultant, or specialist to manage campaigns, create content, or provide ongoing marketing strategy.",
    keyDifferences: [
      "Ad spend authority and budget approval process defined",
      "Content and campaign deliverables with performance KPIs",
      "Platform access and account ownership provisions",
      "Reporting frequency and format obligations",
    ],
    faq: [
      {
        question: "Who owns the marketing materials created under the agreement?",
        answer:
          "Without a written assignment, the agency may retain copyright in creative assets. Include an IP assignment clause to ensure all content, designs, and materials created for your brand are owned by you.",
      },
      {
        question: "How should ad spend authority be handled?",
        answer:
          "The agreement should specify the monthly ad spend budget, who controls the billing accounts, how budget overages are approved, and what happens to uncommitted budget at month end.",
      },
      {
        question: "Can I require performance guarantees in a marketing agreement?",
        answer:
          "You can include KPIs and reporting obligations, but true performance guarantees are uncommon in marketing. Agencies typically disclaim guarantees on results while committing to specific deliverables and effort.",
      },
      {
        question: "How much notice is needed to end a marketing retainer?",
        answer:
          "30 days is standard for monthly retainers. The agreement should specify what deliverables are owed during the notice period and how platform access and accounts are transferred at termination.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["retainer", "freelance"],
    relatedDocumentSlugs: ["service-agreement", "independent-contractor-agreement", "non-disclosure-agreement"],
    practiceAreas: ["business-contracts", "intellectual-property"],
    suggestedListingPrice: 149,
  },
  {
    id: "software_development",
    slug: "software-development",
    name: "Software Development Agreement",
    description: "Service agreement for software development projects",
    seoTitle: "Software Development Services Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create a software development services agreement online. Cover custom software deliverables, code ownership, testing, warranty, and support for development projects. Instant download.",
    h1: "Software Development Services Agreement",
    shortDescription:
      "A software development services agreement covers custom software development projects — defining technical specifications, milestones, code ownership, testing and acceptance, warranty period, and post-delivery support obligations.",
    whenToUse:
      "Use when engaging a software development firm or team to build custom software, mobile apps, websites, or other technology products.",
    keyDifferences: [
      "Technical specifications and milestone delivery schedule",
      "Source code ownership and open source restrictions",
      "Acceptance testing criteria and defect correction obligations",
      "Post-delivery support and warranty period",
    ],
    faq: [
      {
        question: "Who owns the custom software under a development agreement?",
        answer:
          "Without a written IP assignment, the developer typically retains copyright. Include a work-made-for-hire clause or explicit IP assignment to ensure you own the code upon payment.",
      },
      {
        question: "What is an acceptance testing process?",
        answer:
          "Acceptance testing defines how you will verify the software meets agreed specifications. Include test criteria, the review period, how defects are reported, and the correction process before final payment.",
      },
      {
        question: "Should I include a post-delivery support period?",
        answer:
          "Yes. A 30–90 day bug warranty period is standard, during which the developer fixes defects at no charge. Beyond that, ongoing support is typically a separate maintenance agreement.",
      },
      {
        question: "What happens if the developer misses milestones?",
        answer:
          "Include milestone definitions with deadlines and specify the remedy for delays — right to extend with notice, right to terminate and receive a refund of milestones paid, or delay fees.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["fixed_fee", "retainer"],
    relatedDocumentSlugs: ["service-agreement", "independent-contractor-agreement", "non-disclosure-agreement"],
    practiceAreas: ["business-contracts", "intellectual-property"],
    suggestedListingPrice: 199,
  },
  {
    id: "cleaning",
    slug: "cleaning",
    name: "Cleaning Services Agreement",
    description: "Service agreement for cleaning or janitorial services",
    seoTitle: "Cleaning Services Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create a cleaning services agreement online. Cover cleaning frequency, scope, supplies, liability for damage, and cancellation for residential or commercial cleaning. Instant download.",
    h1: "Cleaning Services Agreement",
    shortDescription:
      "A cleaning services agreement defines the terms for residential or commercial cleaning — scope of work, cleaning frequency, supplies responsibility, property access procedures, liability for damage, and cancellation policy.",
    whenToUse:
      "Use when engaging a cleaning company or individual cleaner for recurring or one-time residential or commercial cleaning services.",
    keyDifferences: [
      "Detailed cleaning scope (rooms, tasks, frequency) included",
      "Key and access code policies for property access",
      "Liability cap for accidental damage to property",
      "Cancellation notice and rescheduling policy",
    ],
    faq: [
      {
        question: "What should a cleaning services agreement include?",
        answer:
          "Service frequency and schedule, specific cleaning tasks included and excluded, supplies responsibility, property access terms, payment schedule, liability for damage, insurance requirements, and cancellation policy.",
      },
      {
        question: "Who provides cleaning supplies?",
        answer:
          "Specify in the agreement. Some cleaners bring their own products; others use client-provided supplies. If the cleaner provides supplies, confirm eco-friendly or allergy requirements.",
      },
      {
        question: "What happens if the cleaner damages something?",
        answer:
          "The agreement should require the cleaner to carry general liability insurance and define the claims process for accidental damage. Require a certificate of insurance before the first cleaning.",
      },
      {
        question: "How much notice is needed to cancel cleaning services?",
        answer:
          "24–48 hours for recurring services is standard. The agreement should specify the cancellation fee (often 50% of the service price) for short-notice cancellations.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["fixed_fee", "retainer"],
    relatedDocumentSlugs: ["service-agreement"],
    practiceAreas: ["business-contracts"],
    suggestedListingPrice: 99,
  },
  {
    id: "consulting",
    slug: "consulting",
    name: "Consulting Services Agreement",
    description: "Service agreement for business consulting engagements",
    seoTitle: "Consulting Services Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create a consulting services agreement online. Define scope, deliverables, consulting fees, confidentiality, and IP ownership for business consulting engagements. Instant download.",
    h1: "Consulting Services Agreement",
    shortDescription:
      "A consulting services agreement covers business, management, financial, or strategic consulting engagements. It defines the consulting scope, deliverables, fees, confidentiality obligations, IP ownership of recommendations, and conflict of interest provisions.",
    whenToUse:
      "Use when engaging a business consultant, management consultant, financial advisor, or strategic advisor for a defined consulting project or ongoing advisory relationship.",
    keyDifferences: [
      "Consulting deliverables and recommendations clearly defined",
      "Confidentiality protects sensitive business information shared with consultant",
      "IP ownership of recommendations, strategies, and frameworks",
      "Conflict of interest disclosure obligations",
    ],
    faq: [
      {
        question: "Who owns the consulting recommendations and strategies?",
        answer:
          "Without a written assignment, the consultant may retain rights in generic frameworks and methodologies. Include an IP assignment for client-specific deliverables while allowing the consultant to retain their general expertise and tools.",
      },
      {
        question: "Should a consulting agreement include a non-compete?",
        answer:
          "You can include a restriction on the consultant serving direct competitors during the engagement. Post-engagement non-competes are difficult to enforce against independent consultants in many states.",
      },
      {
        question: "What is a conflict of interest provision in a consulting agreement?",
        answer:
          "It requires the consultant to disclose any existing client relationships or business interests that might conflict with their objectivity when advising you. Important for financial and strategic consultants.",
      },
      {
        question: "How should consulting fees be structured?",
        answer:
          "Options: daily or hourly rate, fixed project fee, monthly retainer, or success fee (percentage of value created). Define the billing cycle and expense reimbursement policy.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["retainer", "fixed_fee"],
    relatedDocumentSlugs: ["service-agreement", "non-disclosure-agreement", "independent-contractor-agreement"],
    practiceAreas: ["business-contracts", "corporate-law"],
    suggestedListingPrice: 199,
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
  {
    id: "equipment",
    slug: "equipment",
    name: "Equipment Purchase Agreement",
    description: "Agreement for the purchase of equipment",
    seoTitle: "Equipment Purchase Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create an equipment purchase agreement online. Document equipment specifications, price, delivery, warranty, and risk of loss for business and personal equipment purchases. Instant download.",
    h1: "Equipment Purchase Agreement",
    shortDescription:
      "An equipment purchase agreement documents the sale of business or commercial equipment — machinery, tools, technology, vehicles, medical equipment — with clear specifications, delivery terms, warranty provisions, and risk of loss.",
    whenToUse:
      "Use when buying or selling business equipment, machinery, medical devices, or other tangible assets where clear specifications, delivery terms, and warranty provisions are important.",
    keyDifferences: [
      "Detailed equipment description with make, model, serial number",
      "Delivery, installation, and testing provisions",
      "Warranty terms and manufacturer warranty passthrough",
      "Risk of loss and insurance during transit",
    ],
    faq: [
      {
        question: "What should an equipment purchase agreement include?",
        answer:
          "Complete equipment description (make, model, serial number, condition), purchase price, payment terms, delivery date and responsibility, installation obligations, acceptance testing, warranty terms, and what happens if equipment is damaged in transit.",
      },
      {
        question: "Who is responsible if equipment is damaged during delivery?",
        answer:
          "Risk of loss provisions in the agreement define this. Risk typically transfers to the buyer upon delivery unless FOB origin terms apply. Require the seller to insure equipment in transit.",
      },
      {
        question: "What warranties should an equipment seller provide?",
        answer:
          "The seller should warrant that the equipment is in the described condition, free of encumbrances, and that all manufacturer's warranties are transferred to the buyer. Specify any 'as-is' provisions clearly.",
      },
      {
        question: "What is an acceptance testing provision?",
        answer:
          "For complex equipment, include an acceptance testing period (30 days is common) during which the buyer can verify the equipment functions as specified before final payment.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["asset"],
    relatedDocumentSlugs: ["purchase-agreement", "bill-of-sale", "payment-plan-agreement"],
    practiceAreas: ["business-contracts"],
    suggestedListingPrice: 199,
  },
  {
    id: "vehicle_purchase",
    slug: "vehicle",
    name: "Vehicle Purchase Agreement",
    description: "Agreement for the purchase of a vehicle",
    seoTitle: "Vehicle Purchase Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create a vehicle purchase agreement online. Document vehicle price, VIN, odometer, condition, and payment terms for private-party car and truck purchases. Instant download.",
    h1: "Vehicle Purchase Agreement",
    shortDescription:
      "A vehicle purchase agreement documents a private-party vehicle sale — specifying the vehicle year, make, model, VIN, odometer reading, purchase price, payment method, and any conditions or warranties. More comprehensive than a bill of sale alone.",
    whenToUse:
      "Use when buying or selling a vehicle privately (not through a dealer), especially for high-value vehicles where you want more than a basic bill of sale — including payment plan terms or contingencies.",
    keyDifferences: [
      "Full vehicle identification: year, make, model, VIN, color, mileage",
      "Purchase price and payment method or financing terms",
      "As-is or conditional sale provisions",
      "Title transfer and DMV registration process",
    ],
    faq: [
      {
        question: "What is the difference between a vehicle purchase agreement and a bill of sale?",
        answer:
          "A bill of sale is a simple receipt of sale. A purchase agreement is more comprehensive — it can include payment plans, contingencies (inspection, financing), and explicit warranties or as-is disclaimers.",
      },
      {
        question: "What happens to the title in a private vehicle sale?",
        answer:
          "The seller signs over the vehicle title (certificate of title) to the buyer. The buyer then registers the vehicle at the DMV. The purchase agreement documents the transaction, but the title is the official ownership transfer document.",
      },
      {
        question: "Should I inspect the vehicle before signing?",
        answer:
          "Yes. Include a pre-purchase inspection contingency in the agreement, giving you the right to have the vehicle inspected and to cancel or renegotiate if serious issues are found.",
      },
      {
        question: "Can I sell a vehicle on a payment plan?",
        answer:
          "Yes. The agreement can include installment payment terms. Retain the title until full payment is received. Consider pairing with a promissory note and recording a lien on the title for security.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["asset"],
    relatedDocumentSlugs: ["purchase-agreement", "vehicle-bill-of-sale", "promissory-note"],
    practiceAreas: ["business-contracts", "consumer-protection"],
    suggestedListingPrice: 149,
  },
  {
    id: "inventory",
    slug: "inventory",
    name: "Inventory Purchase Agreement",
    description: "Agreement for the purchase of inventory or goods",
    seoTitle: "Inventory Purchase Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create an inventory or goods purchase agreement online. Document quantity, specifications, delivery schedule, inspection rights, and payment terms for bulk goods purchases. Instant download.",
    h1: "Inventory and Goods Purchase Agreement",
    shortDescription:
      "An inventory purchase agreement documents the purchase of bulk goods or inventory — covering quantity, specifications, delivery schedule, inspection rights, payment terms, and remedies for non-conforming goods.",
    whenToUse:
      "Use when buying or selling bulk inventory, raw materials, wholesale goods, or other tangible products in a B2B transaction.",
    keyDifferences: [
      "Quantity, unit price, and total purchase price",
      "Product specifications and quality standards",
      "Delivery schedule and acceptance inspection period",
      "Remedies for non-conforming or defective goods (UCC)",
    ],
    faq: [
      {
        question: "What law governs inventory purchase agreements?",
        answer:
          "In the U.S., the Uniform Commercial Code (UCC) Article 2 governs the sale of goods. It provides default rules for warranties, delivery, inspection, rejection of non-conforming goods, and remedies.",
      },
      {
        question: "What are my rights if goods don't meet specifications?",
        answer:
          "Under the UCC, you can inspect goods upon delivery and reject non-conforming goods within a reasonable time. You can also revoke acceptance if defects are discovered later. The agreement should specify your inspection period.",
      },
      {
        question: "What is a purchase order vs. a purchase agreement?",
        answer:
          "A purchase order is typically a binding offer to buy specific goods at a specific price. A purchase agreement is a more comprehensive document governing the ongoing relationship. For one-time purchases, a purchase agreement provides more protection.",
      },
      {
        question: "How should payment terms be structured for inventory purchases?",
        answer:
          "Common terms: Net 30 (payment 30 days after delivery), 2/10 Net 30 (2% discount for payment within 10 days), or deposit plus balance on delivery. The agreement should specify late payment interest.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["asset"],
    relatedDocumentSlugs: ["purchase-agreement", "service-agreement"],
    practiceAreas: ["business-contracts"],
    suggestedListingPrice: 199,
  },
  {
    id: "business_assets",
    slug: "business-assets",
    name: "Business Asset Purchase",
    description: "Full business asset purchase agreement",
    seoTitle: "Business Asset Purchase Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create a business asset purchase agreement online. Document the purchase of an entire business's assets including equipment, IP, customer lists, and goodwill. Instant download.",
    h1: "Business Asset Purchase Agreement",
    shortDescription:
      "A business asset purchase agreement documents the acquisition of a complete business through the purchase of its assets — equipment, inventory, intellectual property, customer lists, contracts, and goodwill — rather than its stock or ownership entity.",
    whenToUse:
      "Use when buying or selling a business through an asset sale (rather than a stock sale), which allows the buyer to select which assets and liabilities to assume.",
    keyDifferences: [
      "Comprehensive schedule of all assets being purchased",
      "Seller representations and warranties on asset condition and title",
      "Assumed liabilities clearly listed (seller retains all others)",
      "Transition assistance, non-compete, and employee provisions",
    ],
    faq: [
      {
        question: "Why is an asset purchase preferred over a stock purchase?",
        answer:
          "Buyers prefer asset purchases because they can pick specific assets and avoid unknown liabilities. Sellers sometimes prefer stock sales because all proceeds are taxed at capital gains rates.",
      },
      {
        question: "What is included in a business asset sale?",
        answer:
          "Typically includes: equipment, inventory, furniture, IP (trademarks, patents, trade secrets), customer lists, domain names, contracts (if assignable), and goodwill. The agreement should specifically list all included assets.",
      },
      {
        question: "Do employees transfer in an asset sale?",
        answer:
          "No automatic transfer. The buyer typically makes employment offers to desired employees. The agreement should specify which employees the buyer intends to hire and any obligations to the workforce.",
      },
      {
        question: "What liabilities does the buyer assume in an asset purchase?",
        answer:
          "Only those specifically listed as 'assumed liabilities.' The seller retains all other liabilities. This is the key advantage of asset purchases — buyers get a clean slate on undisclosed liabilities.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "high",
    relatedIntentSlugs: ["asset"],
    relatedDocumentSlugs: ["purchase-agreement", "non-disclosure-agreement", "non-compete-agreement"],
    practiceAreas: ["business-contracts", "corporate-law"],
    suggestedListingPrice: 349,
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
  {
    id: "executive",
    slug: "executive",
    name: "Executive Non-Compete",
    description: "Non-compete agreement for executive employees",
    seoTitle: "Executive Non-Compete Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create an executive non-compete agreement online. Protect trade secrets and strategic plans from senior executives who leave for competitors. State-compliant instant download.",
    h1: "Executive Non-Compete Agreement",
    shortDescription:
      "An executive non-compete restricts senior executives — C-suite, VPs, directors — from joining competitors or starting competing businesses after leaving. Because executives have access to the most sensitive business intelligence, their non-compete terms are typically broader and longer.",
    whenToUse:
      "Use for C-suite executives, VPs, and senior directors who have access to strategic plans, key customer relationships, and proprietary business intelligence.",
    keyDifferences: [
      "Broader geographic scope appropriate for executive-level roles",
      "Longer duration (1–2 years common for executive non-competes)",
      "Tied to significant consideration (equity, severance, signing bonus)",
      "Covers solicitation of customers, employees, and investors",
    ],
    faq: [
      {
        question: "Are executive non-competes more enforceable?",
        answer:
          "Courts are more likely to enforce non-competes against executives because they have access to greater amounts of confidential information and have typically received significant compensation in exchange.",
      },
      {
        question: "What consideration is needed for an executive non-compete?",
        answer:
          "New hires: the job offer and compensation package. Existing executives: a significant additional benefit — signing bonus, equity grant, promotion, or enhanced severance — not just continued employment.",
      },
      {
        question: "How broad can an executive non-compete be?",
        answer:
          "Courts evaluate reasonableness on: geographic scope (regional, national, or global may be appropriate for executives), duration (1–2 years typical), and industry scope. The higher the executive's level, the more latitude courts give.",
      },
      {
        question: "What happens to the non-compete if the executive is fired without cause?",
        answer:
          "In many states, terminating without cause can extinguish or narrow the non-compete's enforceability. The agreement should address this — some include garden leave (continued pay during the restriction period).",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "high",
    relatedIntentSlugs: ["employee", "sales_employee"],
    relatedDocumentSlugs: ["non-compete-agreement", "employment-contract", "non-disclosure-agreement"],
    practiceAreas: ["employment-law", "corporate-law", "business-contracts"],
    suggestedListingPrice: 299,
  },
  {
    id: "sales_employee",
    slug: "sales-employee",
    name: "Sales Employee Non-Compete",
    description: "Non-compete for sales employees with customer relationship protection",
    seoTitle: "Sales Employee Non-Compete Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create a sales employee non-compete agreement online. Protect customer relationships and territory from departing sales employees. State-compliant instant download.",
    h1: "Sales Employee Non-Compete Agreement",
    shortDescription:
      "A sales employee non-compete protects customer relationships and sales territory from employees who leave to join competitors. It typically includes non-solicitation of customers and employees, in addition to competitive activity restrictions.",
    whenToUse:
      "Use for sales representatives, account managers, and business development employees who have access to customer relationships, pricing, and sales strategies.",
    keyDifferences: [
      "Non-solicitation of specific customers and prospects in addition to non-compete",
      "Territory restriction tied to the employee's actual sales territory",
      "Customer list and relationship protection provisions",
      "Often paired with non-solicitation of co-workers",
    ],
    faq: [
      {
        question: "Is a non-solicitation agreement more enforceable than a non-compete for sales employees?",
        answer:
          "Yes. Courts are more willing to enforce non-solicitation clauses (which only restrict poaching specific customers) than broad non-competes. For sales employees, non-solicitation is often the more important provision.",
      },
      {
        question: "Can I restrict a salesperson from contacting their old customers?",
        answer:
          "A properly drafted non-solicitation clause can prevent a departing salesperson from actively soliciting former customers for a defined period. It generally cannot prevent a customer from proactively contacting the salesperson.",
      },
      {
        question: "How specific does the territory restriction need to be?",
        answer:
          "The territory restriction should match the employee's actual sales territory — city, region, or specific named accounts. Restricting the entire country for a local sales rep is unlikely to be enforced.",
      },
      {
        question: "What if a salesperson brings over their client relationships from a previous job?",
        answer:
          "Document this at hiring — include a representation from the employee about what pre-existing relationships they have and clarify which (if any) are permitted. This avoids disputes later about whether a customer belonged to the company.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["employee", "executive"],
    relatedDocumentSlugs: ["non-compete-agreement", "employment-contract", "non-disclosure-agreement"],
    practiceAreas: ["employment-law", "business-contracts"],
    suggestedListingPrice: 199,
  },
  {
    id: "business_partner",
    slug: "business-partner",
    name: "Business Partner Non-Compete",
    description: "Non-compete in business sale or partnership dissolution",
    seoTitle: "Business Partner Non-Compete Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create a business partner non-compete agreement online. Protect the buyer in a business sale or prevent a departing partner from competing. State-compliant instant download.",
    h1: "Business Partner Non-Compete Agreement",
    shortDescription:
      "A business partner non-compete restricts a seller of a business or a departing partner from starting a competing business after the sale or dissolution. These are typically more enforceable than employment non-competes because the seller has received substantial consideration.",
    whenToUse:
      "Use when buying a business and requiring the seller not to compete, or when a partner leaves the business and you need to protect against immediate competition.",
    keyDifferences: [
      "Context: business sale or partnership dissolution, not employment",
      "Consideration is the purchase price — courts are more willing to enforce",
      "Geographic scope may match the business's full operating territory",
      "Often included in the purchase agreement as a condition of closing",
    ],
    faq: [
      {
        question: "Why are business sale non-competes more enforceable?",
        answer:
          "Courts recognize that a seller who receives significant consideration for their business should not immediately compete and erode the value they just sold. These non-competes are treated like commercial contracts, not employment restrictions.",
      },
      {
        question: "How long should a business sale non-compete last?",
        answer:
          "2–5 years is typical for business sales. Courts generally enforce longer restrictions in business sales because the seller received substantial value. Employment non-competes are typically limited to 1–2 years.",
      },
      {
        question: "Can a business sale non-compete cover the seller's industry globally?",
        answer:
          "For businesses that operate nationally or internationally, a broad geographic scope may be justified. Courts evaluate reasonableness relative to the business's actual market — a local business typically gets a local restriction.",
      },
      {
        question: "What if the business sale falls through?",
        answer:
          "If no sale closes, the non-compete is typically void for lack of consideration. Include the non-compete only in the closing documents, or tie it explicitly to receipt of the purchase price.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["employee", "contractor"],
    relatedDocumentSlugs: ["non-compete-agreement", "purchase-agreement", "partnership-agreement"],
    practiceAreas: ["business-contracts", "corporate-law"],
    suggestedListingPrice: 249,
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
  {
    id: "debt_collector",
    slug: "debt-collector",
    name: "Debt Collector C&D",
    description: "Cease-and-desist to debt collectors under FDCPA",
    seoTitle: "Cease and Desist to Debt Collector Letter | LegalLawDocs.com",
    metaDescription:
      "Create a cease-and-desist letter to debt collectors online. Stop harassing collection calls and contacts under your FDCPA rights. Instant PDF download.",
    h1: "Cease and Desist Letter to Debt Collector",
    shortDescription:
      "Under the Fair Debt Collection Practices Act (FDCPA), consumers have the right to send a written cease-and-desist to a debt collector, legally requiring them to stop all collection communications. This letter invokes that right.",
    whenToUse:
      "Use when you are receiving harassing calls, letters, or contacts from a third-party debt collector and want to exercise your FDCPA right to require them to stop all collection communications.",
    keyDifferences: [
      "Invokes FDCPA Section 805(c) right to cessation of communications",
      "Collector must stop all contact after receiving the letter",
      "Does not dispute the debt — sends to stop the communication",
      "Send via certified mail for proof of receipt",
    ],
    faq: [
      {
        question: "What happens after I send a cease-and-desist to a debt collector?",
        answer:
          "Under the FDCPA, after receiving your written cease-and-desist, the collector may only contact you once more — to confirm they will stop or to notify you of specific legal action. Further harassment may entitle you to damages.",
      },
      {
        question: "Does a cease-and-desist erase the debt?",
        answer:
          "No. It stops the collector's communications, but the underlying debt still exists. The creditor may still pursue the debt through other means, including filing a lawsuit.",
      },
      {
        question: "Does the FDCPA apply to all debt collectors?",
        answer:
          "The FDCPA applies to third-party debt collectors (collection agencies). Original creditors (the company you owe money to directly) are generally not covered by the FDCPA.",
      },
      {
        question: "Should I send the letter by certified mail?",
        answer:
          "Yes. Send via certified mail with return receipt requested. Keep a copy of the letter and the mailing receipt as evidence that the collector received your cease-and-desist.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "high",
    relatedIntentSlugs: ["harassment"],
    relatedDocumentSlugs: ["cease-and-desist-letter", "demand-letter", "complaint-letter"],
    practiceAreas: ["consumer-protection", "collections"],
    suggestedListingPrice: 149,
  },
  {
    id: "noise_complaint",
    slug: "noise-complaint",
    name: "Noise Complaint C&D",
    description: "Cease-and-desist for neighbor noise disturbance",
    seoTitle: "Noise Complaint Cease and Desist Letter | LegalLawDocs.com",
    metaDescription:
      "Create a noise complaint cease-and-desist letter online. Formally demand a neighbor or business stop noise disturbances before escalating to local authorities. Instant download.",
    h1: "Noise Complaint Cease and Desist Letter",
    shortDescription:
      "A noise complaint cease-and-desist formally demands that a neighbor, tenant, or nearby business stop excessive noise that violates local ordinances or interferes with your quiet enjoyment. It creates a paper trail before escalating to local authorities or legal action.",
    whenToUse:
      "Use when informal complaints to a neighbor or business have failed and you want to formally document the noise disturbance before filing with local code enforcement or pursuing legal remedies.",
    keyDifferences: [
      "References local noise ordinance violations",
      "Documents the history of the noise disturbance",
      "Creates paper trail before code enforcement or lawsuit",
      "Demands specific corrective action by a stated deadline",
    ],
    faq: [
      {
        question: "Can a cease-and-desist stop a neighbor from making noise?",
        answer:
          "It creates a formal record and may prompt the neighbor to comply. However, if they ignore it, your next steps are filing a complaint with local code enforcement, your HOA, or pursuing a nuisance claim in court.",
      },
      {
        question: "What noise ordinances should I reference?",
        answer:
          "Our AI includes your city's or county's applicable noise ordinance and quiet hours. Reference the specific decibel limits or prohibited hours in your jurisdiction.",
      },
      {
        question: "What if the noise comes from a tenant in an apartment building?",
        answer:
          "You can send the letter to the tenant directly and also notify the landlord or property manager, who may have lease enforcement obligations. The letter creates a record for both.",
      },
      {
        question: "Can a business be sent a noise cease-and-desist?",
        answer:
          "Yes. Bars, restaurants, construction sites, and industrial businesses are common targets. In addition to the cease-and-desist, consider filing with your city's noise complaint line.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["harassment", "neighbor_dispute"],
    relatedDocumentSlugs: ["cease-and-desist-letter", "complaint-letter"],
    practiceAreas: ["litigation", "consumer-protection"],
    suggestedListingPrice: 149,
  },
  {
    id: "business_interference",
    slug: "business-interference",
    name: "Business Interference C&D",
    description: "Cease-and-desist for tortious business interference",
    seoTitle: "Business Interference Cease and Desist Letter | LegalLawDocs.com",
    metaDescription:
      "Create a business interference cease-and-desist letter online. Demand a competitor stop tortious interference with your business relationships and contracts. Instant download.",
    h1: "Business Interference Cease and Desist Letter",
    shortDescription:
      "A business interference cease-and-desist demands that a competitor, former employee, or third party stop intentionally interfering with your business contracts, customer relationships, or business prospects through tortious business interference.",
    whenToUse:
      "Use when a competitor, former employee, or third party is actively inducing your customers or employees to breach their contracts with you, or spreading false information to harm your business.",
    keyDifferences: [
      "Addresses tortious interference with business contracts or relationships",
      "Cites specific conduct and its impact on business relationships",
      "May reference breach of contract, defamation, or unfair competition",
      "Demands cessation and compensation for lost business",
    ],
    faq: [
      {
        question: "What is tortious interference with business relationships?",
        answer:
          "Tortious interference occurs when a third party intentionally and improperly interferes with an existing or prospective business relationship — for example, convincing a customer to break their contract with you.",
      },
      {
        question: "Can a former employee be liable for tortious interference?",
        answer:
          "Yes, if the former employee actively induces your customers or employees to leave in violation of a non-solicitation agreement or through improper means (false statements, bribery).",
      },
      {
        question: "What damages can I recover for business interference?",
        answer:
          "You may recover lost profits, loss of business opportunities, and in egregious cases, punitive damages. The cease-and-desist creates a record and may stop the conduct before damages escalate.",
      },
      {
        question: "Can a competitor's false advertising be business interference?",
        answer:
          "False advertising that diverts your customers can give rise to business interference claims, as well as Lanham Act (federal) and state deceptive trade practices claims.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["trademark", "harassment"],
    relatedDocumentSlugs: ["cease-and-desist-letter", "demand-letter", "non-compete-agreement"],
    practiceAreas: ["business-contracts", "litigation", "intellectual-property"],
    suggestedListingPrice: 249,
  },
  {
    id: "neighbor_dispute",
    slug: "neighbor-dispute",
    name: "Neighbor Dispute C&D",
    description: "General neighbor or property dispute cease-and-desist",
    seoTitle: "Neighbor Dispute Cease and Desist Letter | LegalLawDocs.com",
    metaDescription:
      "Create a neighbor dispute cease-and-desist letter online. Formally demand a neighbor stop trespassing, property encroachment, harassment, or other disputes. Instant download.",
    h1: "Neighbor Dispute Cease and Desist Letter",
    shortDescription:
      "A neighbor dispute cease-and-desist formally demands that a neighbor stop specific problematic conduct — trespassing, property encroachment, harassment, fence disputes, or other boundary issues. It creates a record before escalating to mediation or legal action.",
    whenToUse:
      "Use when a neighbor is engaging in ongoing problematic conduct — trespassing, encroaching on your property, harassment, or boundary disputes — and informal conversations have not resolved the issue.",
    keyDifferences: [
      "Addresses specific neighbor conduct and property rights",
      "Documents the history and ongoing nature of the dispute",
      "May reference property survey, deed, or HOA rules",
      "Creates a record for HOA, mediation, or court proceedings",
    ],
    faq: [
      {
        question: "When should I send a cease-and-desist to a neighbor?",
        answer:
          "After informal conversations have failed. A formal letter signals you are serious and creates a paper trail for any future HOA hearing, mediation, or court proceeding.",
      },
      {
        question: "Can a cease-and-desist address trespassing?",
        answer:
          "Yes. The letter can formally put the neighbor on notice that their entry onto your property is unwanted and may constitute trespass. If trespassing continues, you can pursue an injunction.",
      },
      {
        question: "What if my neighbor ignores the cease-and-desist?",
        answer:
          "Options include: filing an HOA complaint, pursuing civil mediation, applying for a restraining order (harassment), or filing a nuisance or trespass lawsuit. The cease-and-desist supports all of these actions.",
      },
      {
        question: "Can a fence or encroachment dispute be addressed in a cease-and-desist?",
        answer:
          "Yes. Include a property survey or legal description, reference the encroachment, and demand removal. If unresolved, an encroachment lawsuit can compel removal or award damages.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["harassment", "noise_complaint"],
    relatedDocumentSlugs: ["cease-and-desist-letter", "complaint-letter", "demand-letter"],
    practiceAreas: ["litigation", "real-estate"],
    suggestedListingPrice: 149,
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
  {
    id: "security_deposit",
    slug: "security-deposit",
    name: "Security Deposit Demand",
    description: "Demand for return of security deposit",
    seoTitle: "Security Deposit Demand Letter Template | LegalLawDocs.com",
    metaDescription:
      "Create a security deposit demand letter online. Formally demand your landlord return your security deposit with interest within the state-required deadline. Instant download.",
    h1: "Security Deposit Return Demand Letter",
    shortDescription:
      "A security deposit demand letter formally demands that a landlord return a security deposit (with interest where applicable) within the state-required timeframe after a tenancy ends. It cites the applicable state statute and the consequences of wrongful withholding.",
    whenToUse:
      "Use when your landlord has not returned your security deposit within your state's required return period, or has made improper deductions without providing an itemized statement.",
    keyDifferences: [
      "References state security deposit return statute and required deadline",
      "Demands itemized statement of any deductions",
      "May claim statutory penalties for wrongful withholding (double/triple damages)",
      "Creates paper trail before small claims court filing",
    ],
    faq: [
      {
        question: "How long does a landlord have to return a security deposit?",
        answer:
          "It varies by state — typically 14–30 days after the tenancy ends. Some states (California: 21 days; New York: 14 days) have specific requirements. Our AI includes your state's deadline.",
      },
      {
        question: "What if the landlord made deductions I disagree with?",
        answer:
          "The landlord must provide an itemized statement of deductions. If deductions are improper (normal wear and tear is not deductible), demand return of those amounts in your letter.",
      },
      {
        question: "What are the penalties for wrongful withholding?",
        answer:
          "Many states award 2–3× the wrongfully withheld amount plus attorney's fees if the landlord willfully withholds the deposit. Reference your state's penalty provision in the demand letter.",
      },
      {
        question: "What should I do next if the landlord ignores the demand?",
        answer:
          "File in small claims court — most states allow security deposit claims in small claims, and the claim amount is well within court limits. The demand letter is your evidence of notice.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "high",
    relatedIntentSlugs: ["payment"],
    relatedDocumentSlugs: ["demand-letter", "residential-lease-agreement", "notice-of-breach"],
    practiceAreas: ["landlord-tenant", "collections"],
    suggestedListingPrice: 149,
  },
  {
    id: "unpaid_loan",
    slug: "unpaid-loan",
    name: "Unpaid Loan Demand",
    description: "Demand for repayment of a personal loan",
    seoTitle: "Unpaid Loan Demand Letter Template | LegalLawDocs.com",
    metaDescription:
      "Create an unpaid personal loan demand letter online. Formally demand repayment of money you loaned to a friend, family member, or colleague. Instant download.",
    h1: "Unpaid Personal Loan Demand Letter",
    shortDescription:
      "An unpaid loan demand letter formally demands repayment of a personal loan — money loaned to a friend, family member, or colleague — when informal requests have failed. It documents the loan, establishes a final deadline, and states the consequences of non-payment.",
    whenToUse:
      "Use when someone you loaned money to has not repaid as agreed and informal requests have not worked, and you are prepared to pursue the debt in small claims court.",
    keyDifferences: [
      "References the original loan amount, date, and agreed repayment terms",
      "Demands full repayment by a specific date",
      "States intent to pursue small claims or civil court if unpaid",
      "Provides an opportunity for the borrower to make arrangements",
    ],
    faq: [
      {
        question: "Do I need a written loan agreement to send a demand letter?",
        answer:
          "A written promissory note or loan agreement strengthens your case significantly. However, you can still demand repayment of an oral loan — you'll need other evidence (bank records, texts, witnesses) to prove the loan in court.",
      },
      {
        question: "How much can I sue for in small claims court?",
        answer:
          "Small claims limits vary by state — typically $5,000–$25,000. California allows up to $12,500; New York up to $10,000; Texas up to $20,000. Check your state's limit.",
      },
      {
        question: "Can I charge interest on an informal personal loan?",
        answer:
          "If you agreed on interest, you can demand it. Even without an explicit agreement, some states allow you to claim statutory interest. Check your state's default interest rate for loans.",
      },
      {
        question: "What if the borrower is a family member?",
        answer:
          "A demand letter, while uncomfortable, creates a necessary record if you intend to pursue the debt legally. It also signals the seriousness of the situation and may prompt repayment without court action.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["payment"],
    relatedDocumentSlugs: ["demand-letter", "promissory-note", "payment-plan-agreement"],
    practiceAreas: ["collections", "banking-finance"],
    suggestedListingPrice: 99,
  },
  {
    id: "business_dispute",
    slug: "business-dispute",
    name: "Business Dispute Demand",
    description: "General business dispute demand letter",
    seoTitle: "Business Dispute Demand Letter Template | LegalLawDocs.com",
    metaDescription:
      "Create a business dispute demand letter online. Formally demand resolution of a business disagreement — unpaid invoices, contract breaches, or property damage. Instant download.",
    h1: "Business Dispute Demand Letter",
    shortDescription:
      "A business dispute demand letter formally demands resolution of a commercial disagreement — unpaid invoices, breach of contract, property damage, or vendor disputes — before escalating to litigation. It establishes the facts, the legal basis for the claim, and a clear demand.",
    whenToUse:
      "Use when a business dispute cannot be resolved through negotiation and you want to formally put the other party on notice of your legal position before filing a lawsuit or arbitration claim.",
    keyDifferences: [
      "Establishes the factual and legal basis of the business dispute",
      "References the relevant contract or agreement",
      "Quantifies the damages with supporting documentation",
      "Signals litigation readiness while leaving room for settlement",
    ],
    faq: [
      {
        question: "Does a demand letter need to be from an attorney?",
        answer:
          "No. A well-drafted demand letter from a business owner is legally effective. However, a letter from an attorney signals greater litigation readiness and may prompt faster resolution.",
      },
      {
        question: "Should I demand a specific amount in a business dispute?",
        answer:
          "Yes, if possible. Quantify your damages with supporting documentation (invoices, receipts, contracts). A specific demand is more likely to result in a counteroffer and settlement.",
      },
      {
        question: "What if the business is in another state?",
        answer:
          "The demand letter is effective regardless of the other party's location. Your contract should specify governing law and jurisdiction. For significant disputes, consult an attorney about multi-state jurisdiction.",
      },
      {
        question: "How long before litigation should I send a demand letter?",
        answer:
          "Send the demand letter before filing. Courts look favorably on parties who attempted to resolve disputes informally. Many arbitration clauses and some court rules require a demand letter as a prerequisite.",
      },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["payment", "services"],
    relatedDocumentSlugs: ["demand-letter", "notice-of-breach", "cease-and-desist-letter"],
    practiceAreas: ["business-contracts", "litigation"],
    suggestedListingPrice: 149,
  },
]

// ── Complaint Letter ──────────────────────────────────────────────────────────

const complaintLetterIntents: DocumentIntent[] = [
  {
    id: "noise",
    slug: "noise",
    name: "Noise Complaint",
    description: "Formal complaint about noise disturbance",
    seoTitle: "Noise Complaint Letter Template | LegalLawDocs.com",
    metaDescription:
      "Create a formal noise complaint letter online. Document noise disturbances and request resolution from a landlord, neighbor, or business. Instant PDF download.",
    h1: "Formal Noise Complaint Letter",
    shortDescription:
      "A noise complaint letter formally documents noise disturbances and requests resolution — directed to a landlord, property manager, HOA, business, or directly to a neighbor. It creates a paper trail and may be required before local code enforcement will act.",
    whenToUse:
      "Use when noise from a neighbor, tenant, or nearby business is disrupting your quality of life and informal complaints have not resolved the issue.",
    keyDifferences: [
      "Documents specific noise incidents with dates, times, and descriptions",
      "Requests specific corrective action by a deadline",
      "May be directed to landlord, HOA, or directly to the noise source",
      "Creates a record for code enforcement or legal action",
    ],
    faq: [
      { question: "Who should I address a noise complaint to?", answer: "If you are a tenant, address it to your landlord or property manager. If you own your home, address it to the neighbor directly or to the HOA. Also consider filing with local code enforcement." },
      { question: "What should a noise complaint letter include?", answer: "Specific dates and times of noise incidents, description of the noise (type, duration, frequency), how it affects you, the applicable noise ordinance, your requested remedy, and a response deadline." },
      { question: "Will a complaint letter solve the problem?", answer: "Often yes — formal documentation signals seriousness. If ignored, follow up with a cease-and-desist, file with code enforcement, or pursue mediation." },
      { question: "Should I send it via certified mail?", answer: "For important disputes, yes. Certified mail provides proof of delivery, which is important if the matter escalates to legal proceedings." },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["maintenance", "neighbor"],
    relatedDocumentSlugs: ["complaint-letter", "cease-and-desist-letter", "demand-letter"],
    practiceAreas: ["consumer-protection", "landlord-tenant"],
    suggestedListingPrice: 99,
  },
  {
    id: "maintenance",
    slug: "maintenance",
    name: "Maintenance Complaint",
    description: "Formal complaint about unresolved maintenance issues",
    seoTitle: "Maintenance Complaint Letter Template | LegalLawDocs.com",
    metaDescription:
      "Create a maintenance complaint letter to your landlord online. Document unresolved repair requests and assert your right to habitable conditions. Instant download.",
    h1: "Maintenance Complaint Letter",
    shortDescription:
      "A maintenance complaint letter formally documents unresolved repair requests and demands that a landlord or property manager address habitability issues. It creates a record before withholding rent, repair-and-deduct, or filing a habitability complaint.",
    whenToUse:
      "Use when a landlord has failed to make necessary repairs affecting habitability — heating, plumbing, electrical, pest control, or structural issues — after informal requests.",
    keyDifferences: [
      "Documents all prior repair requests with dates",
      "References tenant's right to habitable conditions under state law",
      "Sets a deadline for repairs before escalating legally",
      "Supports rent withholding or repair-and-deduct remedies",
    ],
    faq: [
      { question: "What is implied warranty of habitability?", answer: "Most states require landlords to maintain rental properties in a livable condition — functional plumbing, heating, electrical, and structural integrity. Failure to do so may allow rent withholding or lease termination." },
      { question: "Can I withhold rent for unrepaired maintenance issues?", answer: "In many states, yes — but only after following specific procedures (written notice, waiting period). The complaint letter is typically the required first step." },
      { question: "What if the landlord retaliates?", answer: "Retaliation (raising rent, eviction) after a habitability complaint is illegal in most states. Document everything and consult a tenant's rights organization if you face retaliation." },
      { question: "Should I hire a repair person myself?", answer: "In many states you can 'repair and deduct' — hire a repair person and deduct the cost from rent — but only after proper notice to the landlord. Check your state's specific requirements first." },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["noise", "neighbor"],
    relatedDocumentSlugs: ["complaint-letter", "demand-letter", "notice-of-breach"],
    practiceAreas: ["landlord-tenant", "consumer-protection"],
    suggestedListingPrice: 99,
  },
  {
    id: "customer_service",
    slug: "customer-service",
    name: "Customer Service Complaint",
    description: "Formal complaint to a business about products or services",
    seoTitle: "Customer Service Complaint Letter Template | LegalLawDocs.com",
    metaDescription:
      "Create a formal customer service complaint letter online. Document your issue and demand a specific remedy from a business — refund, replacement, or correction. Instant download.",
    h1: "Customer Service Complaint Letter",
    shortDescription:
      "A customer service complaint letter formally communicates your dissatisfaction with a product or service and demands a specific remedy — refund, replacement, repair, or apology. Professional, documented complaints are more effective than phone calls.",
    whenToUse:
      "Use when you have a legitimate complaint about a product, service, or company and informal customer service channels have failed to resolve the issue.",
    keyDifferences: [
      "Documents the specific product/service issue with evidence",
      "States the specific remedy requested (refund, replacement, credit)",
      "Sets a response deadline before escalating to regulatory agencies",
      "Professional tone that maximizes resolution likelihood",
    ],
    faq: [
      { question: "Is a written complaint more effective than a phone call?", answer: "Often yes. Written complaints create a paper trail, may be reviewed by supervisors, and establish a record if you need to escalate to the BBB, state attorney general, or small claims court." },
      { question: "Who should I address a customer service complaint to?", answer: "Address it to the company's customer service department, consumer affairs department, or executive office. For regulated industries, also consider filing with the relevant regulatory agency." },
      { question: "What if the company ignores my complaint?", answer: "Escalate to the state attorney general's consumer protection office, the FTC, BBB, or your credit card company (for chargebacks on card purchases). The written complaint supports all of these actions." },
      { question: "Can I demand a full refund?", answer: "You can demand it. Companies may offer a partial refund or credit. If the product is defective or the service was not delivered as described, you may have legal rights to a full refund under your state's consumer protection laws." },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["maintenance"],
    relatedDocumentSlugs: ["complaint-letter", "demand-letter"],
    practiceAreas: ["consumer-protection"],
    suggestedListingPrice: 99,
  },
  {
    id: "harassment_complaint",
    slug: "harassment-complaint",
    name: "Harassment Complaint",
    description: "Formal complaint documenting harassment",
    seoTitle: "Harassment Complaint Letter Template | LegalLawDocs.com",
    metaDescription:
      "Create a formal harassment complaint letter online. Document workplace harassment, neighbor harassment, or personal harassment and request corrective action. Instant download.",
    h1: "Formal Harassment Complaint Letter",
    shortDescription:
      "A harassment complaint letter formally documents harassing conduct — workplace harassment, neighbor harassment, or personal harassment — and requests corrective action. It creates a critical paper trail for HR departments, law enforcement, or legal proceedings.",
    whenToUse:
      "Use to formally document and report harassment to an employer's HR department, property management, HOA, school administration, or other authority responsible for addressing the conduct.",
    keyDifferences: [
      "Documents specific harassing incidents with dates, witnesses, evidence",
      "Identifies the harasser and the authority responsible for action",
      "Requests specific corrective action and investigation",
      "Creates record for HR, EEOC, police, or legal proceedings",
    ],
    faq: [
      { question: "Should I report workplace harassment in writing?", answer: "Yes. A written complaint creates a paper trail, triggers the employer's formal investigation obligation, and protects you from retaliation claims. Verbal-only complaints may be dismissed as misunderstandings." },
      { question: "What if the harasser is my supervisor?", answer: "Report to HR or the supervisor's manager, or use any anonymous reporting mechanism your company offers. If internal reporting fails, contact the EEOC for workplace harassment." },
      { question: "Does a harassment complaint have to be sent to police?", answer: "Not necessarily. Send to the appropriate authority for your situation — HR for workplace harassment, property management for neighbor harassment, or school administration for school-based harassment. Police are appropriate when criminal conduct is involved." },
      { question: "Can a harassment complaint create a retaliation risk?", answer: "Retaliation for a good-faith harassment complaint is illegal under federal and state law. Document any changes in treatment after your complaint as potential retaliation." },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["noise", "neighbor"],
    relatedDocumentSlugs: ["complaint-letter", "cease-and-desist-letter"],
    practiceAreas: ["employment-law", "litigation", "consumer-protection"],
    suggestedListingPrice: 99,
  },
  {
    id: "neighbor",
    slug: "neighbor",
    name: "Neighbor Complaint",
    description: "Formal complaint about a neighbor's conduct",
    seoTitle: "Neighbor Complaint Letter Template | LegalLawDocs.com",
    metaDescription:
      "Create a formal neighbor complaint letter online. Document disputes about noise, trespassing, property damage, or other neighbor conduct and request resolution. Instant download.",
    h1: "Neighbor Complaint Letter",
    shortDescription:
      "A neighbor complaint letter formally documents a specific complaint about a neighbor's conduct — noise, trespassing, property encroachment, unsightly property, or other disputes — and requests corrective action from the neighbor or relevant authority.",
    whenToUse:
      "Use when a neighbor's conduct is affecting your quality of life or property and informal conversations have not resolved the issue. A written complaint is the first step before escalating to HOA, code enforcement, or legal action.",
    keyDifferences: [
      "Documents specific conduct with dates and impact",
      "May be addressed to the neighbor, HOA, or property management",
      "Requests specific corrective action by a deadline",
      "Creates record for HOA proceedings or code enforcement",
    ],
    faq: [
      { question: "Should I talk to my neighbor before sending a complaint letter?", answer: "Ideally yes — most neighbor disputes are best resolved informally first. If conversations have failed or the relationship is too strained, a written letter is the appropriate next step." },
      { question: "Can I complain to my HOA about a neighbor?", answer: "Yes, if you are both members. Most HOAs have a complaint process. Send your complaint letter to both the neighbor and the HOA simultaneously for the most effective response." },
      { question: "What if my neighbor threatens me after receiving the letter?", answer: "Document the threat and contact local law enforcement. A complaint letter that prompts threats supports a police report and potentially a restraining order." },
      { question: "How detailed should the complaint be?", answer: "Very specific — include dates, times, locations, descriptions of the conduct, any witnesses, photos or video evidence, and the specific remedy you are requesting." },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["noise", "harassment_complaint"],
    relatedDocumentSlugs: ["complaint-letter", "cease-and-desist-letter"],
    practiceAreas: ["consumer-protection", "real-estate"],
    suggestedListingPrice: 99,
  },
]

// ── Notice of Breach ──────────────────────────────────────────────────────────

const noticeOfBreachIntents: DocumentIntent[] = [
  {
    id: "service_agreement_breach",
    slug: "service-agreement-breach",
    name: "Service Agreement Breach",
    description: "Notice of breach of a service agreement",
    seoTitle: "Service Agreement Breach Notice Template | LegalLawDocs.com",
    metaDescription:
      "Create a service agreement breach notice online. Formally notify a service provider of their failure to perform and set a cure deadline before legal action. Instant download.",
    h1: "Notice of Breach of Service Agreement",
    shortDescription:
      "A service agreement breach notice formally notifies a service provider that they have failed to deliver services as agreed — citing the specific obligations breached, the impact on your business, and the cure period before you pursue legal remedies.",
    whenToUse:
      "Use when a vendor, contractor, or service provider has failed to deliver agreed services and informal requests for correction have not resulted in resolution.",
    keyDifferences: [
      "References the specific service agreement, date, and breached provisions",
      "Describes the specific service failures and their business impact",
      "Sets a cure deadline (typically 10–30 days per contract terms)",
      "States remedies if breach is not cured: termination, damages, legal action",
    ],
    faq: [
      { question: "What constitutes breach of a service agreement?", answer: "Failure to deliver services by the agreed deadline, delivery of substandard work below the contract's quality standards, failure to follow the agreed scope, or failure to meet performance standards." },
      { question: "Do I have to give the service provider a chance to cure?", answer: "The contract typically defines the cure period. Most commercial contracts require a cure notice before termination. Check your service agreement for the specific requirements." },
      { question: "Can I withhold payment if a service provider is in breach?", answer: "Possibly, depending on your contract terms. Consult the payment provisions — withholding payment without the right to do so can put you in breach. The breach notice is the safer first step." },
      { question: "What if the breach causes me lost revenue?", answer: "Document all losses caused by the breach. These become the damages you can claim in addition to the contract value. The breach notice should reference the losses you are suffering." },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["purchase_agreement_breach", "lease_agreement_breach"],
    relatedDocumentSlugs: ["notice-of-breach", "demand-letter", "service-agreement"],
    practiceAreas: ["business-contracts", "litigation"],
    suggestedListingPrice: 149,
  },
  {
    id: "lease_agreement_breach",
    slug: "lease-agreement-breach",
    name: "Lease Agreement Breach",
    description: "Notice of breach of a residential or commercial lease",
    seoTitle: "Lease Agreement Breach Notice Template | LegalLawDocs.com",
    metaDescription:
      "Create a lease agreement breach notice online. Notify a tenant of lease violations and set a cure deadline before eviction proceedings. State-compliant instant download.",
    h1: "Notice of Breach of Lease Agreement",
    shortDescription:
      "A lease agreement breach notice formally notifies a tenant of specific lease violations — non-payment, unauthorized pets, subletting, property damage, or other breaches — and sets a cure deadline before the landlord exercises remedies including eviction.",
    whenToUse:
      "Use when a tenant has violated lease terms and you want to formally document the breach and provide the legally required cure notice before pursuing eviction or damages.",
    keyDifferences: [
      "References specific lease provisions violated",
      "Required as part of the eviction process in most states",
      "Distinguishes between curable violations (pets, unauthorized occupants) and incurable violations",
      "State-specific notice periods and delivery requirements",
    ],
    faq: [
      { question: "Is a lease breach notice required before eviction?", answer: "In most states, yes. You must provide written notice of the breach and a cure period before filing for eviction (unless the violation is incurable, such as illegal activity). Check your state's requirements." },
      { question: "What violations are incurable?", answer: "Criminal activity, drug manufacturing, or serious property damage are often treated as incurable violations where the landlord can issue an unconditional quit notice without a cure period." },
      { question: "How specific does the lease breach notice need to be?", answer: "Very specific — identify the tenant, the property, the exact lease clause violated, the specific conduct that constitutes the breach, and the cure deadline." },
      { question: "Can I send a breach notice for late rent?", answer: "Yes, though most states have a separate 'pay or quit' process for non-payment. A breach notice is typically used for non-monetary violations, while a pay-or-quit notice is used for unpaid rent." },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["service_agreement_breach"],
    relatedDocumentSlugs: ["notice-of-breach", "landlord-notice-to-vacate", "residential-lease-agreement"],
    practiceAreas: ["landlord-tenant", "real-estate"],
    suggestedListingPrice: 149,
  },
  {
    id: "purchase_agreement_breach",
    slug: "purchase-agreement-breach",
    name: "Purchase Agreement Breach",
    description: "Notice of breach of a purchase agreement",
    seoTitle: "Purchase Agreement Breach Notice Template | LegalLawDocs.com",
    metaDescription:
      "Create a purchase agreement breach notice online. Formally notify a buyer or seller of their failure to perform and preserve your legal remedies. Instant download.",
    h1: "Notice of Breach of Purchase Agreement",
    shortDescription:
      "A purchase agreement breach notice formally notifies a buyer or seller of their failure to perform obligations under a purchase agreement — failure to close, failure to pay, failure to deliver goods as specified — and states the consequences of inaction.",
    whenToUse:
      "Use when the other party to a purchase agreement has failed to perform — a buyer who will not close, a seller who will not deliver, or a party who has breached a representation or warranty.",
    keyDifferences: [
      "References the specific purchase agreement and closing obligations",
      "Identifies whether the breach is by the buyer or seller",
      "States specific remedies: specific performance, damages, or contract termination",
      "Sets deadline for cure before pursuing legal remedies",
    ],
    faq: [
      { question: "What happens if a buyer backs out of a purchase agreement?", answer: "The seller may retain the earnest money deposit (if specified in the contract) and may be entitled to additional damages for lost sale opportunity, particularly if the breach was without a valid contingency." },
      { question: "Can I sue for specific performance on a purchase agreement?", answer: "Yes — courts can order a party to actually complete a purchase (specific performance) rather than just pay damages. This remedy is especially common in real estate transactions." },
      { question: "What if the seller misrepresented the goods or property?", answer: "A misrepresentation of material facts can be grounds for rescission (unwinding the contract) or fraud damages in addition to contract breach remedies." },
      { question: "How long do I have to send a breach notice?", answer: "The purchase agreement typically specifies a cure period. Act promptly — delay can be interpreted as waiving your right to enforce. Check the contract's notice provisions." },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["service_agreement_breach"],
    relatedDocumentSlugs: ["notice-of-breach", "demand-letter", "purchase-agreement"],
    practiceAreas: ["business-contracts", "real-estate", "litigation"],
    suggestedListingPrice: 149,
  },
]

// ── Promissory Note (additional intents) ──────────────────────────────────────

const promissoryNoteAdditionalIntents: DocumentIntent[] = [
  {
    id: "family_loan",
    slug: "family-loan",
    name: "Family Loan Note",
    description: "Promissory note for a loan between family members",
    seoTitle: "Family Loan Promissory Note Template | LegalLawDocs.com",
    metaDescription:
      "Create a family loan promissory note online. Document a loan between family members with IRS-compliant interest rate, repayment schedule, and default provisions. Instant download.",
    h1: "Family Loan Promissory Note",
    shortDescription:
      "A family loan promissory note documents a loan between family members — parents, siblings, or other relatives — with the terms needed for IRS compliance and to protect the lender's ability to recover the funds if repayment is not made.",
    whenToUse:
      "Use when lending money to a family member to document the loan, establish repayment terms, and comply with IRS requirements (particularly the Applicable Federal Rate for loans over $10,000).",
    keyDifferences: [
      "IRS Applicable Federal Rate compliance to avoid gift tax treatment",
      "Flexible repayment terms appropriate for family situations",
      "Simple default provisions that acknowledge the family relationship",
      "Can include forgiveness provisions for estate planning purposes",
    ],
    faq: [
      { question: "Why do I need a promissory note for a family loan?", answer: "Without documentation, the IRS may treat the loan as a gift, potentially triggering gift tax. A promissory note proves it is a loan, not a gift, especially if the borrower defaults and you want to claim a bad debt deduction." },
      { question: "What interest rate must I charge a family member?", answer: "For loans over $10,000, the IRS requires at least the Applicable Federal Rate (AFR) to avoid imputed interest treatment. AFR rates change monthly — check the current rate at the time of the loan." },
      { question: "What if the family member doesn't repay?", answer: "If you have a signed promissory note, you can pursue the debt in court or claim a bad debt deduction on your taxes if the debt becomes uncollectable. Without a note, proving the loan terms is much harder." },
      { question: "Can a family loan promissory note be forgiven?", answer: "Yes, but forgiveness may be treated as a gift and subject to gift tax if it exceeds the annual exclusion ($18,000 per recipient in 2024). Consult a tax advisor before forgiving significant amounts." },
    ],
    indexable: true,
    tier: "subroute",
    priority: "high",
    relatedIntentSlugs: ["interest_free", "interest_bearing"],
    relatedDocumentSlugs: ["promissory-note", "loan-agreement", "payment-plan-agreement"],
    practiceAreas: ["banking-finance", "estate-planning"],
    suggestedListingPrice: 149,
  },
  {
    id: "business_loan",
    slug: "business-loan",
    name: "Business Loan Note",
    description: "Promissory note for a business loan",
    seoTitle: "Business Loan Promissory Note Template | LegalLawDocs.com",
    metaDescription:
      "Create a business loan promissory note online. Document a commercial loan with interest rate, amortization, prepayment, and default provisions. Instant download.",
    h1: "Business Loan Promissory Note",
    shortDescription:
      "A business loan promissory note documents a commercial loan — from a private lender, investor, or financial partner — with commercial-grade terms including interest rate, amortization schedule, prepayment provisions, and comprehensive default remedies.",
    whenToUse:
      "Use when documenting a business loan from a private investor, business partner, or financial institution where a more comprehensive note than a personal loan is needed.",
    keyDifferences: [
      "Commercial-grade terms appropriate for business lending",
      "Amortization schedule with principal and interest breakdown",
      "Prepayment provisions and penalty clauses",
      "Cross-default provisions and financial covenant options",
    ],
    faq: [
      { question: "What is an amortization schedule?", answer: "An amortization schedule shows each payment's split between principal and interest over the life of the loan. The note can include a full schedule or reference the calculation method." },
      { question: "What is a cross-default provision?", answer: "A cross-default clause makes a default on one loan an event of default on another. Common in business lending — it protects lenders by triggering all notes if the borrower defaults on any debt." },
      { question: "Should I include a personal guarantee for a business loan?", answer: "For small businesses, lenders often require the owner to personally guarantee the note. Include a personal guarantee provision or a separate guaranty agreement." },
      { question: "What is the difference between a promissory note and a loan agreement?", answer: "A promissory note is the borrower's written promise to repay. A loan agreement is a comprehensive contract with representations, covenants, and conditions. A business loan may need both." },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["interest_bearing", "secured"],
    relatedDocumentSlugs: ["promissory-note", "loan-agreement"],
    practiceAreas: ["banking-finance", "business-contracts"],
    suggestedListingPrice: 199,
  },
  {
    id: "vehicle_loan",
    slug: "vehicle-loan",
    name: "Vehicle Loan Note",
    description: "Promissory note for a vehicle loan",
    seoTitle: "Vehicle Loan Promissory Note Template | LegalLawDocs.com",
    metaDescription:
      "Create a vehicle loan promissory note online. Document a private-party car loan with the vehicle as collateral, payment schedule, and repossession rights. Instant download.",
    h1: "Vehicle Loan Promissory Note",
    shortDescription:
      "A vehicle loan promissory note documents a private-party loan for a vehicle purchase, with the vehicle as collateral. It covers loan amount, interest rate, monthly payment schedule, and the lender's right to repossess the vehicle upon default.",
    whenToUse:
      "Use when financing a private-party vehicle sale — when the buyer cannot pay in full and will pay in installments, with the vehicle serving as collateral for the loan.",
    keyDifferences: [
      "Vehicle identified by VIN as collateral for the loan",
      "Seller retains or records a security interest in the vehicle title",
      "Repossession rights defined upon default",
      "Typically requires UCC lien filing for perfection",
    ],
    faq: [
      { question: "How do I record a security interest in a vehicle?", answer: "The lender's name is typically listed as lienholder on the vehicle title. The seller retains the title until paid off, or the lender records a lien with the DMV. The specific process depends on your state's DMV requirements." },
      { question: "Can I repossess a vehicle if the buyer stops paying?", answer: "Yes, if you have a security interest in the vehicle properly recorded on the title. Self-help repossession is allowed in most states but must be done without breach of the peace. Follow your state's repossession laws carefully." },
      { question: "What interest rate can I charge on a private vehicle loan?", answer: "State usury laws apply. Rates vary by state but typically allow 10–25% annually for vehicle loans. Exceeding the cap can make the note unenforceable." },
      { question: "Should I use a promissory note or a retail installment agreement?", answer: "A retail installment sales contract (RISC) is specifically designed for vehicle sales on credit and may be required for dealer sales. For private-party sales, a promissory note with security agreement is sufficient." },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["secured", "interest_bearing"],
    relatedDocumentSlugs: ["promissory-note", "vehicle-bill-of-sale", "purchase-agreement"],
    practiceAreas: ["banking-finance", "consumer-protection"],
    suggestedListingPrice: 149,
  },
  {
    id: "real_estate_note",
    slug: "real-estate-note",
    name: "Real Estate Note",
    description: "Promissory note secured by real property",
    seoTitle: "Real Estate Promissory Note Template | LegalLawDocs.com",
    metaDescription:
      "Create a real estate promissory note online. Document a seller-financed or private real estate loan with interest, amortization, and mortgage/deed of trust reference. Instant download.",
    h1: "Real Estate Promissory Note",
    shortDescription:
      "A real estate promissory note documents a loan secured by real property — used in seller financing, private lending, and hard money loan situations. It works alongside a mortgage or deed of trust that creates the security interest in the property.",
    whenToUse:
      "Use when seller-financing a real estate sale or making a private loan secured by real property — the note documents the debt, while the mortgage or deed of trust secures it against the property.",
    keyDifferences: [
      "Secured by real property through a companion mortgage or deed of trust",
      "Longer amortization periods (15–30 years typical for real estate)",
      "Due-on-sale clause prevents property transfer without lender consent",
      "Balloon payment provisions common in seller-financed transactions",
    ],
    faq: [
      { question: "What is the difference between a promissory note and a mortgage?", answer: "The promissory note is the borrower's promise to repay. The mortgage (or deed of trust) creates a security interest in the property that allows foreclosure if the note is not paid. Both documents are needed for a real estate loan." },
      { question: "What is a balloon payment in a real estate note?", answer: "A balloon payment is a large final payment due at the end of the note term. Common in seller-financing — the buyer makes monthly payments for 5–10 years, then refinances or pays the remaining balance in a lump sum." },
      { question: "What is a due-on-sale clause?", answer: "A due-on-sale (or acceleration) clause makes the entire loan balance due if the property is sold or transferred without the lender's consent. This prevents the buyer from transferring the property and loan to a third party." },
      { question: "Can a seller finance a home sale without a bank?", answer: "Yes — seller financing (also called owner financing or carryback financing) allows the seller to act as the lender. The note and deed of trust replace a bank mortgage. The seller collects monthly payments and forecloses if the buyer defaults." },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["secured", "interest_bearing"],
    relatedDocumentSlugs: ["promissory-note", "loan-agreement", "purchase-agreement"],
    practiceAreas: ["banking-finance", "real-estate"],
    suggestedListingPrice: 249,
  },
]

// ── Payment Plan Agreement ─────────────────────────────────────────────────────

const paymentPlanIntents: DocumentIntent[] = [
  {
    id: "unpaid_invoice",
    slug: "unpaid-invoice",
    name: "Invoice Payment Plan",
    description: "Payment plan for an unpaid invoice",
    seoTitle: "Invoice Payment Plan Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create an invoice payment plan agreement online. Structure installment payments for unpaid business invoices with interest and default provisions. Instant download.",
    h1: "Invoice Payment Plan Agreement",
    shortDescription:
      "An invoice payment plan agreement allows a debtor to pay an outstanding invoice in installments rather than a lump sum. It documents the original invoice amount, payment schedule, any interest, and default consequences.",
    whenToUse:
      "Use when a client or customer cannot pay an outstanding invoice in full and you agree to allow installment payments — either as an accommodation or in lieu of collection action.",
    keyDifferences: [
      "References the original invoice with invoice number and date",
      "Installment amounts and due dates defined",
      "Interest rate on the payment plan (if any)",
      "Acceleration clause: full balance due on missed payment",
    ],
    faq: [
      { question: "Should I charge interest on an invoice payment plan?", answer: "You can — it compensates for delayed payment and discourages future slow pay. Many businesses charge 1.5% per month (18% annually). Check your state's usury limits." },
      { question: "What happens if the debtor misses a payment?", answer: "An acceleration clause makes the full remaining balance immediately due and payable. Include this in the agreement to preserve your right to collect the full amount without further negotiation." },
      { question: "Can a payment plan agreement be used in court?", answer: "Yes. A signed payment plan agreement is a contract. If the debtor defaults, you can sue for the outstanding balance using the agreement as evidence of the debt and payment terms." },
      { question: "Should I stop work while a client is on a payment plan?", answer: "Consider it — continuing to provide services while a client is delinquent can deepen the exposure. The payment plan should address whether services continue during the repayment period." },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["personal_debt", "business_debt"],
    relatedDocumentSlugs: ["payment-plan-agreement", "demand-letter", "promissory-note"],
    practiceAreas: ["collections", "business-contracts"],
    suggestedListingPrice: 99,
  },
  {
    id: "personal_debt",
    slug: "personal-debt",
    name: "Personal Debt Payment Plan",
    description: "Payment plan for a personal debt",
    seoTitle: "Personal Debt Payment Plan Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create a personal debt payment plan agreement online. Document installment repayment of a personal debt between individuals with clear terms. Instant download.",
    h1: "Personal Debt Payment Plan Agreement",
    shortDescription:
      "A personal debt payment plan agreement documents the installment repayment of a personal debt — money borrowed between friends, family members, or individuals. It formalizes verbal repayment promises and creates enforceable documentation.",
    whenToUse:
      "Use to document a repayment arrangement for a personal debt — a loan between friends, an informal advance, or any personal financial obligation that will be repaid in installments.",
    keyDifferences: [
      "Appropriate for informal personal debt between individuals",
      "Simple structure with flexible payment amounts",
      "May include zero interest for family/friend situations",
      "Creates enforceable documentation of an informal debt",
    ],
    faq: [
      { question: "Can I use a payment plan agreement for an oral debt?", answer: "Yes. The agreement can state the original amount borrowed and the payment terms going forward. It does not need to reference a prior written agreement." },
      { question: "Should I charge interest on a personal debt?", answer: "For small informal debts, zero interest is common. For larger amounts between non-family members, nominal interest (3–6%) is reasonable. The IRS requires minimum interest for family loans over $10,000." },
      { question: "What if the person can only afford small payments?", answer: "Any payment schedule you agree to is valid. Even $50/month is enforceable if documented. The acceleration clause protects you if payments stop." },
      { question: "Is a payment plan agreement better than a promissory note?", answer: "A payment plan agreement is similar to a promissory note — both document a debt and repayment terms. A payment plan may feel less formal and more appropriate for personal relationships." },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["unpaid_invoice", "business_debt"],
    relatedDocumentSlugs: ["payment-plan-agreement", "promissory-note"],
    practiceAreas: ["collections", "consumer-protection"],
    suggestedListingPrice: 99,
  },
  {
    id: "business_debt",
    slug: "business-debt",
    name: "Business Debt Payment Plan",
    description: "Payment plan for a business debt",
    seoTitle: "Business Debt Payment Plan Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create a business debt payment plan agreement online. Document installment repayment of commercial debt with interest, security, and default provisions. Instant download.",
    h1: "Business Debt Payment Plan Agreement",
    shortDescription:
      "A business debt payment plan agreement documents the structured repayment of commercial debt — between businesses or from a business to an individual creditor — with appropriate commercial terms including interest, security, and cross-default provisions.",
    whenToUse:
      "Use when a business cannot pay a commercial debt in full and needs to negotiate an installment repayment plan with a creditor, vendor, or lender.",
    keyDifferences: [
      "Commercial-appropriate terms for business-to-business debt",
      "May include security interest on business assets",
      "Cross-default provisions for businesses with multiple creditors",
      "Business entity signatures required",
    ],
    faq: [
      { question: "Can I require a personal guarantee on a business debt payment plan?", answer: "Yes. For small business debtors, requiring the owner to personally guarantee the payment plan adds significant protection — if the business fails, you can pursue the owner individually." },
      { question: "Should I file a UCC lien as part of a business payment plan?", answer: "For significant amounts, yes. A UCC-1 financing statement perfects your security interest in the business's personal property and protects your priority over other creditors." },
      { question: "What if the business is struggling financially?", answer: "A payment plan is often preferable to litigation — you may actually collect. If the business is insolvent, consult an attorney about preferential payment rules and whether a structured plan is viable." },
      { question: "Can I report the debt to credit bureaus?", answer: "Businesses do not have personal credit reports like individuals. For business debt, your leverage is primarily the payment plan agreement itself, litigation, and any security interest you hold." },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["unpaid_invoice", "personal_debt"],
    relatedDocumentSlugs: ["payment-plan-agreement", "promissory-note", "demand-letter"],
    practiceAreas: ["collections", "business-contracts"],
    suggestedListingPrice: 99,
  },
  {
    id: "rent_arrears",
    slug: "rent-arrears",
    name: "Rent Arrears Payment Plan",
    description: "Payment plan for past-due rent",
    seoTitle: "Rent Arrears Payment Plan Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create a rent arrears payment plan agreement online. Document a structured repayment plan for overdue rent while the tenant remains in the property. Instant download.",
    h1: "Rent Arrears Payment Plan Agreement",
    shortDescription:
      "A rent arrears payment plan agreement documents a structured repayment arrangement for past-due rent — allowing the tenant to remain in the property while paying overdue amounts over time alongside regular monthly rent.",
    whenToUse:
      "Use when a tenant has fallen behind on rent and you prefer to keep them in the property under a structured repayment plan rather than pursuing eviction.",
    keyDifferences: [
      "Covers both ongoing rent and the arrears repayment schedule",
      "Specifies that failure to pay either triggers eviction proceedings",
      "Includes a written waiver of the eviction notice period (where permitted)",
      "Protects the landlord's right to proceed with eviction if plan fails",
    ],
    faq: [
      { question: "Is it better to evict or negotiate a payment plan with a delinquent tenant?", answer: "A payment plan is often faster and less expensive than eviction, which can take months and cost thousands. If the tenant has a history of good payments and a temporary hardship, a plan may be the best outcome for both parties." },
      { question: "Does a payment plan waive my right to evict?", answer: "Only if it says so. The agreement should specify that failure to comply with the payment plan terms restores your right to proceed with eviction without additional notice (where state law permits)." },
      { question: "Should the payment plan cover late fees and court costs?", answer: "Include all amounts owed — base rent arrears, late fees, and any prior legal costs — in the total repayment amount. This ensures complete resolution of the balance." },
      { question: "What if the tenant makes a partial payment?", answer: "Define in the agreement whether partial payments are accepted, and whether accepting a partial payment waives your right to the full amount. Many payment plans require full installments to count as compliant." },
    ],
    indexable: true,
    tier: "subroute",
    priority: "high",
    relatedIntentSlugs: ["personal_debt", "unpaid_invoice"],
    relatedDocumentSlugs: ["payment-plan-agreement", "residential-lease-agreement", "landlord-notice-to-vacate"],
    practiceAreas: ["landlord-tenant", "collections"],
    suggestedListingPrice: 99,
  },
]

// ── Loan Agreement ────────────────────────────────────────────────────────────

const loanAgreementIntents: DocumentIntent[] = [
  {
    id: "secured_loan",
    slug: "secured-loan",
    name: "Secured Loan Agreement",
    description: "Loan agreement backed by collateral",
    seoTitle: "Secured Loan Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create a secured loan agreement online. Document a collateral-backed loan with security interest, lien rights, and default remedies. State-compliant instant download.",
    h1: "Secured Loan Agreement",
    shortDescription:
      "A secured loan agreement documents a loan backed by specific collateral — real estate, vehicles, equipment, or other assets — giving the lender the right to claim the collateral if the borrower defaults.",
    whenToUse:
      "Use when making a significant loan and requiring the borrower to pledge specific collateral — real property, vehicles, equipment — as security for repayment.",
    keyDifferences: [
      "Collateral description and security interest provisions",
      "UCC filing requirements for personal property collateral",
      "Lender's right to repossess or foreclose on default",
      "Maintenance and insurance obligations for the collateral",
    ],
    faq: [
      { question: "What collateral can secure a loan?", answer: "Common collateral: real estate (secured by mortgage/deed of trust), vehicles (lien on title), equipment, inventory, accounts receivable, and investment accounts. The value of collateral should exceed the loan amount." },
      { question: "What is a UCC-1 filing?", answer: "A UCC-1 financing statement is filed with the state to 'perfect' a security interest in personal property (non-real estate) collateral. It publicly records the lender's claim and establishes priority over other creditors." },
      { question: "What happens if the borrower damages the collateral?", answer: "The agreement should require the borrower to maintain the collateral and carry insurance. Damage to collateral can trigger an event of default, allowing the lender to accelerate the loan." },
      { question: "How does foreclosure work for secured loans?", answer: "For real property: judicial or non-judicial foreclosure per state law. For personal property: self-help repossession (without breach of peace) per the UCC. State law governs the specific process." },
    ],
    indexable: true,
    tier: "subroute",
    priority: "high",
    relatedIntentSlugs: ["unsecured_loan", "installment_loan"],
    relatedDocumentSlugs: ["loan-agreement", "promissory-note"],
    practiceAreas: ["banking-finance", "business-contracts"],
    suggestedListingPrice: 249,
  },
  {
    id: "unsecured_loan",
    slug: "unsecured-loan",
    name: "Unsecured Loan Agreement",
    description: "Loan agreement without collateral",
    seoTitle: "Unsecured Loan Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create an unsecured personal or business loan agreement online. Document a no-collateral loan with interest rate, repayment schedule, and default provisions. Instant download.",
    h1: "Unsecured Loan Agreement",
    shortDescription:
      "An unsecured loan agreement documents a loan not backed by collateral. The lender relies on the borrower's creditworthiness and a personal guarantee. Common for personal loans, business lines of credit, and loans between individuals.",
    whenToUse:
      "Use when making a loan without collateral — typically personal loans between individuals, or when the borrower has no specific asset to pledge but is creditworthy.",
    keyDifferences: [
      "No collateral required — loan is based on borrower's promise to repay",
      "Higher interest rates common to compensate for higher lender risk",
      "Personal guarantee may be included",
      "Default remedies limited to judgment and wage/bank garnishment",
    ],
    faq: [
      { question: "Why would anyone make an unsecured loan?", answer: "Unsecured loans are common in personal relationships (friends, family), small business lending between trusted parties, or when the borrower has no suitable collateral but is creditworthy." },
      { question: "What happens if an unsecured borrower defaults?", answer: "The lender can sue for the outstanding balance and, if they win a judgment, pursue collection through wage garnishment, bank levy, or judgment liens on the borrower's property." },
      { question: "Should I require a personal guarantee on an unsecured loan?", answer: "Yes — a personal guarantee makes the borrower (or their owner, for business loans) personally liable, even if the primary borrower is a company or trust." },
      { question: "Is an unsecured loan more risky than a secured loan?", answer: "Yes. Without collateral, the lender has no specific asset to claim in default. Recovery depends entirely on the borrower's ability and willingness to pay, and the legal process of obtaining and enforcing a judgment." },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["secured_loan", "interest_free_loan"],
    relatedDocumentSlugs: ["loan-agreement", "promissory-note"],
    practiceAreas: ["banking-finance", "consumer-protection"],
    suggestedListingPrice: 199,
  },
  {
    id: "installment_loan",
    slug: "installment-loan",
    name: "Installment Loan Agreement",
    description: "Loan repayable in regular installments",
    seoTitle: "Installment Loan Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create an installment loan agreement online. Define monthly payment amounts, amortization schedule, and default terms for a structured installment loan. Instant download.",
    h1: "Installment Loan Agreement",
    shortDescription:
      "An installment loan agreement documents a loan repayable in regular, equal installments — typically monthly — with a defined amortization schedule. It is the most common loan structure for personal and business loans.",
    whenToUse:
      "Use when making or receiving a loan that will be repaid in regular monthly or periodic installments rather than a lump sum or on demand.",
    keyDifferences: [
      "Fixed installment payment amount with amortization schedule",
      "Equal periodic payments cover both principal and interest",
      "Prepayment rights and penalties defined",
      "Acceleration clause on missed payments",
    ],
    faq: [
      { question: "What is an amortization schedule?", answer: "A schedule showing each payment, split between principal and interest, over the life of the loan. Early payments are mostly interest; later payments are mostly principal. The agreement can include the full schedule or the calculation method." },
      { question: "Can the borrower pay off the loan early?", answer: "Include a prepayment clause — many lenders allow early payoff without penalty; others charge a prepayment fee to compensate for lost interest income. State the lender's policy clearly." },
      { question: "What happens if a payment is missed?", answer: "Define a grace period (typically 10–15 days), late fees, and the point at which the lender can accelerate (make the full balance due) and pursue default remedies." },
      { question: "Can I change the payment amount over time?", answer: "You can include a step-up provision (payments increase over time) or adjust for a balloon payment at the end. Any change to payment amounts requires the agreement to specify the schedule explicitly." },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["secured_loan", "unsecured_loan"],
    relatedDocumentSlugs: ["loan-agreement", "payment-plan-agreement", "promissory-note"],
    practiceAreas: ["banking-finance", "business-contracts"],
    suggestedListingPrice: 199,
  },
  {
    id: "interest_free_loan",
    slug: "interest-free-loan",
    name: "Interest-Free Loan Agreement",
    description: "Loan agreement with zero interest",
    seoTitle: "Interest-Free Loan Agreement Template | LegalLawDocs.com",
    metaDescription:
      "Create an interest-free loan agreement online. Document a zero-interest personal or family loan with repayment schedule and default provisions. Instant download.",
    h1: "Interest-Free Loan Agreement",
    shortDescription:
      "An interest-free loan agreement documents a loan with no interest charge — typically between family members, close friends, or as an employer advance. It formalizes the loan while maintaining a zero interest rate.",
    whenToUse:
      "Use when lending money interest-free — to a family member, friend, or employee — to document the loan terms and ensure the IRS recognizes it as a loan rather than a gift.",
    keyDifferences: [
      "Zero interest rate explicitly stated",
      "IRS gift tax considerations for loans over $10,000",
      "Repayment schedule for principal only",
      "Enforceable as a loan despite zero interest",
    ],
    faq: [
      { question: "Is a no-interest loan legal?", answer: "Yes, but for amounts over $10,000 between family members, the IRS may impute interest at the Applicable Federal Rate (AFR) and treat the difference as a gift. For large amounts, consider charging at least the AFR." },
      { question: "Does a no-interest loan need documentation?", answer: "Yes — without documentation, the IRS may treat the entire amount as a gift, not a loan. A written agreement that establishes a repayment obligation is essential." },
      { question: "Can I still sue if the borrower doesn't repay a no-interest loan?", answer: "Yes. Zero interest doesn't affect enforceability. You can still sue for the unpaid principal in small claims or civil court." },
      { question: "Can I forgive the loan later?", answer: "Yes, but loan forgiveness may be treated as a gift and subject to gift tax if it exceeds the annual exclusion. Forgive strategically — spread over multiple years within the annual exclusion amount." },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["unsecured_loan", "installment_loan"],
    relatedDocumentSlugs: ["loan-agreement", "promissory-note"],
    practiceAreas: ["banking-finance", "estate-planning"],
    suggestedListingPrice: 149,
  },
]

// ── Affidavit ─────────────────────────────────────────────────────────────────

const affidavitIntents: DocumentIntent[] = [
  {
    id: "proof_of_address",
    slug: "proof-of-address",
    name: "Affidavit of Address",
    description: "Sworn statement establishing proof of residence",
    seoTitle: "Affidavit of Address — Proof of Residence Template | LegalLawDocs.com",
    metaDescription:
      "Create an affidavit of address online. Sworn proof of residence for government agencies, banks, schools, or legal proceedings. Notarized and state-compliant instant download.",
    h1: "Affidavit of Address (Proof of Residence)",
    shortDescription:
      "An affidavit of address is a sworn statement establishing your residence — used when standard documents (utility bills, bank statements) are unavailable or insufficient. Accepted by government agencies, courts, schools, and financial institutions.",
    whenToUse:
      "Use when you need to prove your current address to a government agency, bank, DMV, immigration authority, or court and do not have traditional proof of address documents available.",
    keyDifferences: [
      "Sworn statement under penalty of perjury of current address",
      "Notarized for maximum acceptance by institutions",
      "Can include supporting documentation as exhibits",
      "Accepted by DMV, USCIS, courts, and financial institutions",
    ],
    faq: [
      { question: "What situations require an affidavit of address?", answer: "DMV registration without utility bills in your name, immigration applications, opening a bank account without standard ID, school enrollment, or legal proceedings where proof of domicile is required." },
      { question: "Does an affidavit of address need to be notarized?", answer: "Yes in most cases — government agencies and financial institutions typically require notarization to accept a sworn statement as proof of address." },
      { question: "What can I attach to the affidavit?", answer: "Attach any supporting documents: lease agreement, letter from your landlord, bank statements showing the address, correspondence from government agencies, or a statement from someone who lives with you." },
      { question: "Can someone else swear to my address?", answer: "In some circumstances — a landlord, parent, or spouse can sign an affidavit confirming your residence at their address. The affiant must have personal knowledge of the facts." },
    ],
    indexable: true,
    tier: "subroute",
    priority: "high",
    relatedIntentSlugs: ["lost_document", "family_court"],
    relatedDocumentSlugs: ["affidavit", "power-of-attorney"],
    practiceAreas: ["litigation", "immigration"],
    suggestedListingPrice: 99,
  },
  {
    id: "family_court",
    slug: "family-court",
    name: "Family Court Affidavit",
    description: "Affidavit for family court proceedings",
    seoTitle: "Family Court Affidavit Template | LegalLawDocs.com",
    metaDescription:
      "Create a family court affidavit online. Sworn statement of facts for child custody, divorce, or other family law proceedings. State-compliant instant download.",
    h1: "Family Court Affidavit",
    shortDescription:
      "A family court affidavit is a sworn statement of facts submitted in custody, divorce, child support, or other family law proceedings. It provides the court with firsthand factual information relevant to the matter.",
    whenToUse:
      "Use when you need to submit a sworn statement to a family court — in custody disputes, divorce proceedings, child support modifications, or protective order applications.",
    keyDifferences: [
      "Formatted for family court submission with case caption",
      "Sworn factual statements relevant to family law matter",
      "Supports motions, hearings, or declarations in family cases",
      "Must be factual and within personal knowledge",
    ],
    faq: [
      { question: "What should a family court affidavit include?", answer: "Case caption, your identity and relationship to the case, specific factual statements relevant to the issue (custody, finances, living situation), and an oath under penalty of perjury." },
      { question: "Can I include my opinions in an affidavit?", answer: "Affidavits should state facts within your personal knowledge, not legal conclusions or opinions. The court forms its own conclusions from the facts you provide." },
      { question: "Does a family court affidavit need to be notarized?", answer: "Most courts require notarization or an unsworn declaration under penalty of perjury. Check your court's local rules for the specific format required." },
      { question: "Can I submit photos or documents as evidence with my affidavit?", answer: "Yes — attach exhibits referenced in the affidavit. Number each exhibit and refer to it clearly in your sworn statements." },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["proof_of_address"],
    relatedDocumentSlugs: ["affidavit", "power-of-attorney"],
    practiceAreas: ["family-law", "litigation"],
    suggestedListingPrice: 149,
  },
  {
    id: "lost_document",
    slug: "lost-document",
    name: "Lost Document Affidavit",
    description: "Affidavit declaring a document has been lost or destroyed",
    seoTitle: "Lost Document Affidavit Template | LegalLawDocs.com",
    metaDescription:
      "Create a lost document affidavit online. Sworn statement that an important document has been lost, stolen, or destroyed for replacement with agencies and institutions. Instant download.",
    h1: "Affidavit of Lost Document",
    shortDescription:
      "A lost document affidavit is a sworn statement declaring that an important document — title, deed, contract, will, or certificate — has been lost, stolen, or destroyed. Required to replace original documents with government agencies, courts, or institutions.",
    whenToUse:
      "Use when an original document has been lost, stolen, or destroyed and you need to replace it with a government agency, court, financial institution, or insurer.",
    keyDifferences: [
      "Sworn statement of the document's prior existence and loss",
      "Indemnification against claims arising from use of the lost document",
      "Accepted by DMV, title companies, courts, and financial institutions",
      "May need to be bonded for high-value document replacement",
    ],
    faq: [
      { question: "When is a lost document affidavit needed?", answer: "Common uses: lost vehicle title (needed for DMV replacement), lost stock certificate, lost will (for probate), lost deed (for title purposes), or lost passport when applying for a replacement." },
      { question: "Does a lost document affidavit need to be notarized?", answer: "Yes in most cases. Government agencies and financial institutions typically require notarization for lost document declarations." },
      { question: "What is a lost title affidavit for vehicles?", answer: "A specific affidavit submitted to the DMV stating the vehicle title has been lost. Required to obtain a duplicate title. The DMV may have its own form, but a general lost document affidavit can supplement it." },
      { question: "Can I replace a lost will with an affidavit?", answer: "A copy of a will may be admitted to probate in some states with an affidavit explaining why the original is unavailable. However, courts typically require additional evidence that the original was not destroyed by the testator (which would revoke it)." },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["proof_of_address"],
    relatedDocumentSlugs: ["affidavit", "vehicle-bill-of-sale"],
    practiceAreas: ["litigation", "estate-planning"],
    suggestedListingPrice: 99,
  },
]

// ── General Release of Liability ──────────────────────────────────────────────

const releaseOfLiabilityIntents: DocumentIntent[] = [
  {
    id: "event_release",
    slug: "event-release",
    name: "Event Release",
    description: "Release of liability for event participants",
    seoTitle: "Event Liability Release Form Template | LegalLawDocs.com",
    metaDescription:
      "Create an event liability release form online. Protect event organizers from participant injury claims with a state-compliant release and waiver. Instant download.",
    h1: "Event Liability Release and Waiver",
    shortDescription:
      "An event liability release protects event organizers, venues, and sponsors from injury or damage claims by participants. Commonly used for community events, fundraisers, concerts, races, and any gathering with physical activity or risk.",
    whenToUse:
      "Use when organizing any event where participants may be injured — races, festivals, corporate events, charity functions, or any activity with physical risk to participants.",
    keyDifferences: [
      "Identifies the event, date, and location specifically",
      "Covers organizer, venue, volunteers, and sponsors",
      "Addresses assumption of risk for event-specific hazards",
      "Includes media release and photo permission (optional)",
    ],
    faq: [
      { question: "Is an event liability release enforceable?", answer: "Generally yes, for voluntary participants who are adults and sign knowingly. Some states (Virginia, Louisiana) restrict enforcement. Releases do not protect against gross negligence or intentional misconduct." },
      { question: "Can children sign a liability release?", answer: "Minors cannot sign binding contracts. A parent or guardian must sign on behalf of a minor, but parental releases for minors have limited enforceability in many states for negligent conduct." },
      { question: "Should I use a digital signature for event releases?", answer: "Yes — digital signatures are legally valid under the E-SIGN Act and are practical for large events. Use a signature collection platform that retains records." },
      { question: "Does a release protect against all lawsuits?", answer: "No. Releases generally protect against ordinary negligence. Gross negligence, recklessness, or intentional misconduct is typically not protected. Maintain adequate event insurance regardless." },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["sports_waiver"],
    relatedDocumentSlugs: ["general-release-of-liability", "service-agreement"],
    practiceAreas: ["litigation", "business-contracts"],
    suggestedListingPrice: 149,
  },
  {
    id: "sports_waiver",
    slug: "sports-waiver",
    name: "Sports Activity Waiver",
    description: "Liability waiver for sports and recreational activities",
    seoTitle: "Sports Liability Waiver Template | LegalLawDocs.com",
    metaDescription:
      "Create a sports and recreational activity liability waiver online. Protect gyms, coaches, leagues, and sports organizers from participant injury claims. Instant download.",
    h1: "Sports and Recreational Activity Liability Waiver",
    shortDescription:
      "A sports activity waiver protects sports organizations, gyms, coaches, and leagues from liability claims arising from participant injuries during athletic or recreational activities. It addresses the inherent risks specific to the sport or activity.",
    whenToUse:
      "Use for sports leagues, gyms, fitness studios, martial arts schools, outdoor activity operators, or any organization where participants engage in physical activity with inherent injury risk.",
    keyDifferences: [
      "Identifies the specific sport or activity and its inherent risks",
      "Covers the organization, coaches, volunteers, and facilities",
      "Assumption of risk language tailored to the specific activity",
      "Medical treatment authorization for emergencies",
    ],
    faq: [
      { question: "What inherent risks should I list in a sports waiver?", answer: "Be specific to your activity: for contact sports — collisions, concussions; for gyms — equipment injuries, overexertion; for outdoor activities — weather, terrain, wildlife. The more specific, the better the protection." },
      { question: "Does a sports waiver protect against equipment failure?", answer: "A well-drafted waiver can include equipment risk, but courts scrutinize equipment failure claims more closely than voluntary activity risks. Maintain and inspect equipment regardless." },
      { question: "How often should participants re-sign waivers?", answer: "Annually at minimum. Some organizations require a fresh signature before each season or major event. Document all signed waivers with the date of signature." },
      { question: "Should I require waivers from spectators too?", answer: "For high-risk spectator situations (batting cages, hockey arenas), spectator waivers or posted notices are common. For general sports events, participant waivers are the primary protection." },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["event_release"],
    relatedDocumentSlugs: ["general-release-of-liability", "service-agreement"],
    practiceAreas: ["litigation", "business-contracts"],
    suggestedListingPrice: 149,
  },
  {
    id: "property_damage_release",
    slug: "property-damage-release",
    name: "Property Damage Release",
    description: "Release of claims for property damage",
    seoTitle: "Property Damage Release Form Template | LegalLawDocs.com",
    metaDescription:
      "Create a property damage liability release online. Settle a property damage claim and release the responsible party from future claims upon payment. Instant download.",
    h1: "Property Damage Release of Liability",
    shortDescription:
      "A property damage release settles a property damage claim by releasing the responsible party from all further liability upon payment of an agreed amount. Used for vehicle accidents, contractor damage, neighbor incidents, and other property disputes.",
    whenToUse:
      "Use when settling a property damage claim outside of court or insurance — the responsible party pays an agreed amount and the property owner releases all future claims related to the damage.",
    keyDifferences: [
      "Identifies the specific property and damage incident",
      "Settles for a specific dollar amount",
      "Full and final release of all claims related to the damage",
      "Applies even if the full extent of damage is not yet known (releases unknown claims)",
    ],
    faq: [
      { question: "Should I settle a property damage claim with a release?", answer: "Yes — a settlement and release prevents the responsible party from claiming you accepted too much or seeking a refund, and prevents you from claiming additional damages after signing." },
      { question: "What if I discover more damage after signing a release?", answer: "A properly drafted release waives all known and unknown claims. This is why you should have a complete damage assessment before signing. Consider adding a clause reserving rights for specifically identified unknown damage." },
      { question: "Does a release need to be notarized?", answer: "Generally no — signatures from both parties are sufficient. However, for real property damage claims that may affect title, notarization may be prudent." },
      { question: "Can I release claims against an insurance company with this form?", answer: "A release can be used to settle with an insurance company. However, insurance companies typically use their own release forms. Consult an attorney before signing an insurer's release for significant claims." },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["event_release"],
    relatedDocumentSlugs: ["general-release-of-liability", "demand-letter"],
    practiceAreas: ["litigation", "consumer-protection"],
    suggestedListingPrice: 149,
  },
]

// ── Vehicle Bill of Sale ──────────────────────────────────────────────────────

const vehicleBillOfSaleIntents: DocumentIntent[] = [
  {
    id: "car",
    slug: "car",
    name: "Car Bill of Sale",
    description: "Bill of sale for a car or automobile",
    seoTitle: "Car Bill of Sale Template — Private Party Sale | LegalLawDocs.com",
    metaDescription:
      "Create a car bill of sale online. DMV-ready private party car sale record with VIN, odometer disclosure, and state-specific requirements. Instant download.",
    h1: "Car Bill of Sale",
    shortDescription:
      "A car bill of sale records a private-party automobile sale with all information required for DMV title transfer: VIN, odometer reading, sale price, condition, and buyer/seller identification. State-compliant with federal odometer disclosure.",
    whenToUse:
      "Use whenever you buy or sell a car privately — not through a dealership — to create a legal record of the transaction and facilitate DMV title transfer.",
    keyDifferences: [
      "All fields required for DMV title transfer",
      "Federal Motor Vehicle Information and Cost Savings Act odometer disclosure",
      "As-is or warranty disclosure included",
      "State-specific DMV requirements incorporated",
    ],
    faq: [
      { question: "Do I need a bill of sale to transfer a car title?", answer: "Many states require a bill of sale or an accepted form of purchase documentation for private-party title transfers. Even where not legally required, it protects both buyer and seller." },
      { question: "What odometer disclosure is required?", answer: "Federal law (MVICSA) requires the seller to disclose the odometer reading in writing for most vehicles under 10 years old. Our AI includes the required federal disclosure language." },
      { question: "Should the bill of sale include an as-is clause?", answer: "Yes, for private-party sales. An as-is clause limits your liability for defects discovered after the sale. Dealers are held to higher standards; private sellers generally can sell as-is with disclosure." },
      { question: "Do I need a notarized bill of sale?", answer: "Some states require notarization for private-party vehicle sales. Our AI includes your state's specific requirements. Even where not required, notarization adds credibility." },
    ],
    indexable: true,
    tier: "subroute",
    priority: "high",
    relatedIntentSlugs: ["motorcycle", "as_is"],
    relatedDocumentSlugs: ["vehicle-bill-of-sale", "purchase-agreement", "promissory-note"],
    practiceAreas: ["consumer-protection", "business-contracts"],
    suggestedListingPrice: 99,
  },
  {
    id: "motorcycle",
    slug: "motorcycle",
    name: "Motorcycle Bill of Sale",
    description: "Bill of sale for a motorcycle or powersport vehicle",
    seoTitle: "Motorcycle Bill of Sale Template | LegalLawDocs.com",
    metaDescription:
      "Create a motorcycle bill of sale online. DMV-ready private party sale record with VIN, odometer, and state-specific motorcycle transfer requirements. Instant download.",
    h1: "Motorcycle Bill of Sale",
    shortDescription:
      "A motorcycle bill of sale records a private-party sale of a motorcycle, scooter, or powersport vehicle with all fields required for DMV title transfer and registration.",
    whenToUse:
      "Use when buying or selling a motorcycle, scooter, ATV, or other powersport vehicle privately to create a legal sales record for DMV title transfer.",
    keyDifferences: [
      "Specific fields for motorcycle VIN, engine number, and model",
      "Odometer/mileage disclosure for eligible vehicles",
      "State DMV requirements for motorcycle title transfer",
      "May include helmet and accessories in the sale",
    ],
    faq: [
      { question: "Is a motorcycle bill of sale different from a car bill of sale?", answer: "The information is similar, but motorcycles have different VIN formats and some states have different DMV requirements for motorcycle transfers. Our AI uses the correct fields for your vehicle type." },
      { question: "What if the motorcycle doesn't have a title?", answer: "A motorcycle without a title can be difficult to register. A bill of sale alone may not be sufficient. Check your state's bonded title or lost title process for untitled vehicles." },
      { question: "Does a motorcycle require an odometer disclosure?", answer: "Federal odometer disclosure requirements apply to motorcycles (and other motor vehicles) under 10 years old that are transferred in a commercial context. For private sales, many states still require odometer disclosure." },
      { question: "Can I include accessories in the motorcycle sale?", answer: "Yes — list any included items (saddlebags, aftermarket parts, gear) in the bill of sale to avoid disputes about what was included in the sale price." },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["car", "trailer"],
    relatedDocumentSlugs: ["vehicle-bill-of-sale", "bill-of-sale"],
    practiceAreas: ["consumer-protection"],
    suggestedListingPrice: 99,
  },
  {
    id: "trailer",
    slug: "trailer",
    name: "Trailer Bill of Sale",
    description: "Bill of sale for a trailer or recreational vehicle",
    seoTitle: "Trailer Bill of Sale Template | LegalLawDocs.com",
    metaDescription:
      "Create a trailer or RV bill of sale online. Document a private-party trailer sale with VIN, weight rating, and state registration requirements. Instant download.",
    h1: "Trailer Bill of Sale",
    shortDescription:
      "A trailer bill of sale records the private-party sale of a utility trailer, travel trailer, boat trailer, RV, or other towed vehicle with the information needed for state title and registration.",
    whenToUse:
      "Use when buying or selling a utility trailer, travel trailer, horse trailer, boat trailer, or RV privately to document the sale and facilitate title transfer.",
    keyDifferences: [
      "Trailer-specific fields: type, GVWR, axle configuration",
      "May or may not require odometer depending on trailer type",
      "Some trailers are titled; others are registered only — state-specific rules",
      "Serial/VIN number for trailer identification",
    ],
    faq: [
      { question: "Do all trailers have titles?", answer: "It depends on the state and trailer weight. Many states do not title trailers under a certain weight (e.g., under 1,500–3,000 lbs). Check your state's trailer registration requirements." },
      { question: "What fields does a trailer bill of sale need?", answer: "Seller and buyer information, trailer year, make, model, VIN or serial number, GVWR, color, sale price, date, condition, and any included accessories." },
      { question: "Can I sell an untitled trailer?", answer: "Yes, if your state doesn't require a title for that trailer. A bill of sale serves as proof of purchase. The buyer registers the trailer with the DMV using the bill of sale." },
      { question: "How do I transfer an RV title?", answer: "An RV (motorhome) is titled like a vehicle and requires a standard vehicle bill of sale and title transfer. A towable travel trailer or 5th wheel uses the trailer bill of sale process." },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["car", "motorcycle"],
    relatedDocumentSlugs: ["vehicle-bill-of-sale", "bill-of-sale"],
    practiceAreas: ["consumer-protection"],
    suggestedListingPrice: 99,
  },
  {
    id: "as_is",
    slug: "as-is",
    name: "As-Is Vehicle Sale",
    description: "Vehicle bill of sale with explicit as-is disclosure",
    seoTitle: "As-Is Vehicle Bill of Sale Template | LegalLawDocs.com",
    metaDescription:
      "Create an as-is vehicle bill of sale online. Protect the seller with explicit as-is disclosure, known defects listing, and buyer acknowledgment. Instant download.",
    h1: "As-Is Vehicle Bill of Sale",
    shortDescription:
      "An as-is vehicle bill of sale includes explicit as-is disclosure language — a detailed acknowledgment that the buyer accepts the vehicle in its current condition with all known and unknown defects, limiting the seller's post-sale liability.",
    whenToUse:
      "Use when selling a vehicle with known defects, mechanical issues, or in any condition where you want the buyer to explicitly acknowledge they accept the vehicle 'as-is' with no warranty.",
    keyDifferences: [
      "Explicit as-is disclaimer with buyer's signed acknowledgment",
      "Optional disclosure of known defects (recommended for transparency)",
      "Buyer's acknowledgment of inspection opportunity",
      "No warranty expressed or implied",
    ],
    faq: [
      { question: "Does an as-is sale completely protect a seller?", answer: "It provides strong protection against post-sale claims, but sellers may still be liable for actively concealing known defects (fraud). Disclose all known material defects — as-is combined with full disclosure is the strongest protection." },
      { question: "Should I list known defects in the bill of sale?", answer: "Yes — listing known defects (check engine light, transmission issues, rust) in writing shows you disclosed them honestly and strengthens the as-is protection. Courts can set aside as-is clauses when defects were hidden." },
      { question: "Can I sell a vehicle as-is with a salvage or rebuilt title?", answer: "Yes, but the salvage or rebuilt title status must be disclosed. Failing to disclose a branded title is fraud in most states, regardless of any as-is clause." },
      { question: "Does the buyer have a right to inspect the vehicle before signing?", answer: "Include a clause acknowledging the buyer's opportunity to inspect or have the vehicle inspected. If they decline, note that in the document." },
    ],
    indexable: true,
    tier: "subroute",
    priority: "medium",
    relatedIntentSlugs: ["car"],
    relatedDocumentSlugs: ["vehicle-bill-of-sale", "general-release-of-liability"],
    practiceAreas: ["consumer-protection", "business-contracts"],
    suggestedListingPrice: 99,
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
  promissory_note: [...promissoryNoteIntents, ...promissoryNoteAdditionalIntents],
  demand_letter: demandLetterIntents,
  // 8 additional document types
  complaint_letter: complaintLetterIntents,
  notice_of_breach: noticeOfBreachIntents,
  payment_plan_agreement: paymentPlanIntents,
  loan_agreement: loanAgreementIntents,
  affidavit: affidavitIntents,
  general_release_of_liability: releaseOfLiabilityIntents,
  vehicle_bill_of_sale: vehicleBillOfSaleIntents,
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** All intents for a document — accepts legacy underscore OR new hyphenated slug */
export function getIntentsForDocument(slug: string): DocumentIntent[] {
  // Normalise hyphenated to underscore for legacy key lookup
  const key = slug.replace(/-/g, "_")
  if (INTENT_REGISTRY[key]) return INTENT_REGISTRY[key]
  if (INTENT_REGISTRY[slug]) return INTENT_REGISTRY[slug]
  // Some legacy keys drop connector words — e.g. "last_will_and_testament" → "last_will_testament"
  const stripped = key.replace(/_and_/g, "_").replace(/_or_/g, "_").replace(/_of_/g, "_")
  return INTENT_REGISTRY[stripped] || []
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
