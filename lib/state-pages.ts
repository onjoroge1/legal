/**
 * Sprint 6 — State-specific document pages
 *
 * URL pattern:  /documents/{category}/{state}-{docSlug}
 * Example:      /documents/real-estate/california-residential-lease-agreement
 *
 * Launch batch:  10 priority states × 10 state-eligible document types = 100 pages
 */

// ── US States ─────────────────────────────────────────────────────────────────

export interface USState {
  name: string   // "California"
  slug: string   // "california"
  abbr: string   // "CA"
  region: string
}

export const US_STATES: USState[] = [
  // Priority Batch 1 (launch)
  { name: "California",     slug: "california",    abbr: "CA", region: "West" },
  { name: "Texas",          slug: "texas",         abbr: "TX", region: "South" },
  { name: "New York",       slug: "new-york",      abbr: "NY", region: "Northeast" },
  { name: "Florida",        slug: "florida",       abbr: "FL", region: "South" },
  { name: "Georgia",        slug: "georgia",       abbr: "GA", region: "South" },
  { name: "Illinois",       slug: "illinois",      abbr: "IL", region: "Midwest" },
  { name: "Pennsylvania",   slug: "pennsylvania",  abbr: "PA", region: "Northeast" },
  { name: "Ohio",           slug: "ohio",          abbr: "OH", region: "Midwest" },
  { name: "Michigan",       slug: "michigan",      abbr: "MI", region: "Midwest" },
  { name: "Washington",     slug: "washington",    abbr: "WA", region: "West" },
  // Batch 2 (next sprint)
  { name: "Arizona",        slug: "arizona",       abbr: "AZ", region: "West" },
  { name: "Colorado",       slug: "colorado",      abbr: "CO", region: "West" },
  { name: "North Carolina", slug: "north-carolina",abbr: "NC", region: "South" },
  { name: "Virginia",       slug: "virginia",      abbr: "VA", region: "South" },
  { name: "New Jersey",     slug: "new-jersey",    abbr: "NJ", region: "Northeast" },
  { name: "Massachusetts",  slug: "massachusetts", abbr: "MA", region: "Northeast" },
  { name: "Tennessee",      slug: "tennessee",     abbr: "TN", region: "South" },
  { name: "Nevada",         slug: "nevada",        abbr: "NV", region: "West" },
  { name: "Minnesota",      slug: "minnesota",     abbr: "MN", region: "Midwest" },
  { name: "Wisconsin",      slug: "wisconsin",     abbr: "WI", region: "Midwest" },
]

/** States included in the Sprint 6 launch batch */
export const SPRINT6_STATE_SLUGS = [
  // Batch 1
  "california", "texas", "new-york", "florida", "georgia",
  "illinois", "pennsylvania", "ohio", "michigan", "washington",
  // Batch 2
  "arizona", "colorado", "north-carolina", "virginia", "new-jersey",
  "massachusetts", "tennessee", "nevada", "minnesota", "wisconsin",
]

// ── State-eligible documents ───────────────────────────────────────────────────

export interface StateEligibleDoc {
  slug: string          // catalog slug: "residential-lease-agreement"
  legacySlug: string    // "residential_lease_agreement"
  category: string      // "real-estate"
  title: string         // "Residential Lease Agreement"
  stateTitle: string    // "{State} Residential Lease Agreement"
}

/** Top 10 document types for initial state page batch */
export const STATE_ELIGIBLE_DOCS: StateEligibleDoc[] = [
  {
    slug: "residential-lease-agreement",
    legacySlug: "residential_lease_agreement",
    category: "real-estate",
    title: "Residential Lease Agreement",
    stateTitle: "{State} Residential Lease Agreement",
  },
  {
    slug: "llc-operating-agreement",
    legacySlug: "llc_operating_agreement",
    category: "business",
    title: "LLC Operating Agreement",
    stateTitle: "{State} LLC Operating Agreement",
  },
  {
    slug: "employment-contract",
    legacySlug: "employment_contract",
    category: "employment",
    title: "Employment Contract",
    stateTitle: "{State} Employment Contract",
  },
  {
    slug: "power-of-attorney",
    legacySlug: "power_of_attorney",
    category: "estate-planning",
    title: "Power of Attorney",
    stateTitle: "{State} Power of Attorney",
  },
  {
    slug: "last-will-and-testament",
    legacySlug: "last_will_testament",
    category: "estate-planning",
    title: "Last Will and Testament",
    stateTitle: "{State} Last Will and Testament",
  },
  {
    slug: "non-compete-agreement",
    legacySlug: "non_compete_agreement",
    category: "employment",
    title: "Non-Compete Agreement",
    stateTitle: "{State} Non-Compete Agreement",
  },
  {
    slug: "independent-contractor-agreement",
    legacySlug: "independent_contractor_agreement",
    category: "employment",
    title: "Independent Contractor Agreement",
    stateTitle: "{State} Independent Contractor Agreement",
  },
  {
    slug: "commercial-lease-agreement",
    legacySlug: "commercial_lease_agreement",
    category: "real-estate",
    title: "Commercial Lease Agreement",
    stateTitle: "{State} Commercial Lease Agreement",
  },
  {
    slug: "promissory-note",
    legacySlug: "promissory_note",
    category: "financial",
    title: "Promissory Note",
    stateTitle: "{State} Promissory Note",
  },
  {
    slug: "demand-letter",
    legacySlug: "demand_letter",
    category: "legal-letters",
    title: "Demand Letter",
    stateTitle: "{State} Demand Letter",
  },
]

// ── State × Document law notes ────────────────────────────────────────────────

/**
 * Key state-specific legal requirements for each state × doc combination.
 * These are the unique, meaningful facts that make the page non-thin.
 */
export const STATE_DOC_NOTES: Record<string, Record<string, {
  requirements: string[]
  restrictions: string[]
  noticeRequirements?: string
  faq: { question: string; answer: string }[]
}>> = {
  // ── California ───────────────────────────────────────────────────────────
  california: {
    "residential-lease-agreement": {
      requirements: [
        "Required: bed bug disclosure (Civil Code § 1954.603)",
        "Required: mold disclosure if known or suspected",
        "Required: Proposition 65 warning if applicable",
        "Required: move-in inspection checklist before tenancy begins",
        "Required: Carbon monoxide and smoke detector notice",
        "Security deposit: capped at 1 month rent (unfurnished) or 2 months (furnished) as of July 2024",
      ],
      restrictions: [
        "AB 1482 rent cap: 5% + CPI (max 10%) for covered units built before 2005",
        "Just cause required to terminate tenancy for units covered by AB 1482",
        "Late fees must be reasonable — courts scrutinize amounts above $50",
      ],
      noticeRequirements: "60 days' notice required to terminate if tenant has lived there 12+ months",
      faq: [
        {
          question: "What is the maximum security deposit in California?",
          answer: "As of July 1, 2024, SB 567 caps security deposits at one month's rent for both furnished and unfurnished rentals. Previously landlords could charge two months for unfurnished units.",
        },
        {
          question: "Does California require just cause to evict a tenant?",
          answer: "Yes, under AB 1482 (Tenant Protection Act of 2019), most landlords in California must have 'just cause' to terminate a tenancy in buildings built before 2005 with tenants who have lived there 12+ months.",
        },
        {
          question: "What disclosures are required in a California lease?",
          answer: "California requires disclosure of bed bugs, mold, lead paint (pre-1978 buildings), Proposition 65 hazardous materials, proximity to military ordnance, and known prior methamphetamine use.",
        },
        {
          question: "How much notice is required to raise rent in California?",
          answer: "Landlords must give 30 days' written notice for rent increases under 10% and 90 days' notice for increases over 10%. Rent increases for AB 1482-covered units are capped at 5% + CPI (max 10%).",
        },
      ],
    },
    "llc-operating-agreement": {
      requirements: [
        "Required to be signed by all members — LLC-1 statement of information due within 90 days of formation",
        "California LLCs pay an $800 annual minimum franchise tax",
        "Series LLCs are not recognized in California — use standard multi-member structure",
        "Registered agent with California address required",
        "Disregarded entity or partnership taxation available at federal level",
      ],
      restrictions: [
        "California does not allow verbal operating agreements — must be written",
        "Professional services LLCs (law, medicine) have additional licensing requirements",
        "LLC names must include 'LLC,' 'L.L.C.,' or 'Limited Liability Company'",
      ],
      faq: [
        {
          question: "Does California require an LLC operating agreement?",
          answer: "California Corporations Code § 17701.11 requires every LLC to have an operating agreement, though it does not need to be filed with the state. Members should sign it at or before formation.",
        },
        {
          question: "What is the California LLC annual fee?",
          answer: "All California LLCs pay a minimum $800 franchise tax annually, due the 15th day of the 4th month after the tax year begins. New LLCs formed after January 1, 2021 are exempt for their first year.",
        },
        {
          question: "Can a California LLC have a single member?",
          answer: "Yes. Single-member LLCs are fully recognized in California and are treated as disregarded entities for federal tax purposes by default. They still owe the $800 annual minimum tax.",
        },
        {
          question: "Are series LLCs allowed in California?",
          answer: "No. California does not recognize series LLCs. If you need segregated liability between business units, consider forming separate LLCs or a holding company structure.",
        },
      ],
    },
    "employment-contract": {
      requirements: [
        "At-will employment is default — reinforce with explicit at-will clause",
        "Non-compete clauses are void and unenforceable under Business & Professions Code § 16600",
        "Paid sick leave required: minimum 40 hours or 5 days per year (SB 616, effective Jan 2024)",
        "California minimum wage: $16/hour statewide (higher in many cities)",
        "Overtime required for hours over 8/day or 40/week; double time over 12/day",
      ],
      restrictions: [
        "Non-solicitation clauses for customers and co-workers are also unenforceable in California",
        "Non-disclosure agreements cannot restrict employees from disclosing sexual harassment or assault (SB 331)",
        "Arbitration agreements for employment claims are restricted — consult counsel",
      ],
      faq: [
        {
          question: "Are non-compete agreements enforceable in California?",
          answer: "No. California Business & Professions Code § 16600 voids non-compete agreements for employees, with very limited exceptions for sale of a business. Employers cannot include or enforce them.",
        },
        {
          question: "What are California's overtime rules?",
          answer: "California requires overtime at 1.5× for hours over 8 in a day or 40 in a week, and double time for hours over 12 in a day. This is more protective than federal FLSA which only triggers overtime at 40 hours/week.",
        },
        {
          question: "How much paid sick leave is required in California?",
          answer: "Under SB 616 (effective January 1, 2024), California employees accrue at least 40 hours (5 days) of paid sick leave per year. This increased from the previous 24 hours (3 days).",
        },
        {
          question: "Can California employers require arbitration?",
          answer: "AB 51 attempted to ban mandatory arbitration for employment claims, but federal courts have largely blocked enforcement. Employers may still use arbitration agreements, but these remain legally complex — consult counsel.",
        },
      ],
    },
    "power-of-attorney": {
      requirements: [
        "Must be signed by the principal before a notary public",
        "Two witnesses required if principal cannot sign (must sign by mark)",
        "California Probate Code § 4401 governs durable powers of attorney",
        "Agent must sign acknowledgment of duties (Probate Code § 4128)",
        "Statutory form available under Probate Code § 4401",
      ],
      restrictions: [
        "Agent cannot make gifts to themselves unless expressly authorized",
        "Healthcare decisions require a separate AHCD (Advance Health Care Directive)",
        "Real estate transactions may require the POA to be recorded at the county recorder",
      ],
      faq: [
        {
          question: "Does a California power of attorney need to be notarized?",
          answer: "Yes. Under California Probate Code § 4121, a durable power of attorney must be signed before a notary public to be valid. Two witnesses are required only if the principal signs by mark.",
        },
        {
          question: "What is a California durable power of attorney?",
          answer: "A durable POA in California remains effective if the principal becomes incapacitated. It must include the statutory durability clause under Probate Code § 4124: 'This power of attorney shall not be affected by subsequent incapacity of the principal.'",
        },
        {
          question: "Can a California POA authorize real estate transactions?",
          answer: "Yes, but it must specifically grant real estate powers. Additionally, the POA must be recorded with the county recorder's office where the property is located before it can be used in a real estate transaction.",
        },
        {
          question: "How do I revoke a power of attorney in California?",
          answer: "Sign a written revocation, deliver it to the agent, and notify any third parties who relied on the POA. If the POA was recorded for real estate, record the revocation in the same county.",
        },
      ],
    },
    "last-will-and-testament": {
      requirements: [
        "Must be signed by the testator in the presence of at least two witnesses",
        "Both witnesses must sign in the presence of each other and the testator",
        "Witnesses must be 18+ and not be beneficiaries (to avoid interested witness issues)",
        "Notarization not required but a self-proving affidavit (Probate Code § 8220) speeds probate",
        "Holographic wills (entirely in testator's handwriting) are valid in California",
      ],
      restrictions: [
        "Pretermitted (omitted) heirs — children born after will execution — receive intestate share",
        "Spousal right of election applies to community property",
        "California small estate affidavit applies to estates under $184,500 (2024)",
      ],
      faq: [
        {
          question: "How many witnesses are required for a California will?",
          answer: "Two witnesses are required. Both must sign in each other's presence and in the presence of the testator. Witnesses should not be named beneficiaries — an interested witness's gift may be reduced to their intestate share.",
        },
        {
          question: "Does a California will need to be notarized?",
          answer: "No, notarization is not required for a California will to be valid. However, adding a self-proving affidavit (Probate Code § 8220) eliminates the need for witnesses to testify in probate court.",
        },
        {
          question: "What happens to my estate if I die without a will in California?",
          answer: "California's intestate succession laws apply. Separate property passes to your spouse, children, or other relatives based on a priority order. Community property automatically passes to the surviving spouse.",
        },
        {
          question: "Can I disinherit my spouse in California?",
          answer: "You can disinherit a spouse from your separate property but not from their share of community property. California is a community property state — each spouse owns half of all assets acquired during marriage.",
        },
      ],
    },
    "non-compete-agreement": {
      requirements: [
        "California non-compete clauses are void under Business & Professions Code § 16600",
        "Employers must notify current and former employees of void non-compete clauses by February 14, 2024 (AB 2288)",
        "Only narrow exception: sale of a business and its goodwill (§ 16601)",
        "Employers facing civil penalties for violating § 16600 (SB 699)",
      ],
      restrictions: [
        "Any non-compete included in an employment agreement is void — even if employee signed it",
        "Employers cannot condition employment on signing a non-compete",
        "Non-solicitation of employees and customers is also broadly unenforceable",
      ],
      faq: [
        {
          question: "Are non-compete agreements legal in California?",
          answer: "No. California Business & Professions Code § 16600 voids virtually all non-compete clauses, making them unenforceable regardless of whether the employee signed the agreement.",
        },
        {
          question: "What is the new California non-compete notification law?",
          answer: "Effective January 1, 2024 (AB 2288/SB 699), California employers must notify current and former employees in writing that any non-compete clause in their contracts is void. Failure to do so exposes employers to civil penalties.",
        },
        {
          question: "Are there any exceptions to California's non-compete ban?",
          answer: "Yes, very narrow ones: (1) sale of a business where the seller agrees not to compete in the same market, and (2) dissolution of a partnership. These do not apply to typical employment relationships.",
        },
        {
          question: "Can California employers use trade secret protections instead of non-competes?",
          answer: "Yes. The California Uniform Trade Secrets Act (CUTSA) protects legitimate trade secrets. Employers can use confidentiality agreements and non-disclosure clauses — they just cannot use geographic or time-based non-compete restrictions.",
        },
      ],
    },
    "independent-contractor-agreement": {
      requirements: [
        "AB 5 (codified in Labor Code § 2750.3): ABC test determines if worker is employee or contractor",
        "Worker must be free from control, perform work outside usual business, and have independent trade",
        "Many industries have AB 5 exemptions — verify before classifying",
        "Written contract required for independent contractors (SB 988, 2024)",
        "Workers must be provided written contract before work begins",
      ],
      restrictions: [
        "Misclassifying employees as contractors triggers Cal/OSHA, workers' comp, and tax liability",
        "Freelance workers: SB 988 (Freelance Worker Protection Act) requires written contracts for work ≥ $250",
        "Platform-based contractors (gig workers) subject to ongoing Prop 22 regulatory framework",
      ],
      faq: [
        {
          question: "What is California's ABC test for independent contractors?",
          answer: "AB 5 requires workers to satisfy all three prongs to be classified as independent contractors: (A) free from control by the hiring entity, (B) performing work outside the company's usual business, and (C) independently established in their trade.",
        },
        {
          question: "Does California require a written independent contractor agreement?",
          answer: "Yes. SB 988 (Freelance Worker Protection Act), effective January 1, 2025, requires a written contract for freelance work worth $250 or more (individually or cumulatively in a 120-day period).",
        },
        {
          question: "What industries are exempt from California's AB 5?",
          answer: "Many professions have AB 5 exemptions including doctors, dentists, licensed insurance agents, real estate licensees, investment advisors, direct sales representatives, and certain creative professionals who meet specific criteria.",
        },
        {
          question: "What are the consequences of misclassifying an employee as a contractor in California?",
          answer: "Penalties include back payment of wages, overtime, benefits, payroll taxes, Cal/OSHA penalties, workers' compensation premiums, and potential civil lawsuits. The Labor Commissioner can impose significant fines.",
        },
      ],
    },
    "commercial-lease-agreement": {
      requirements: [
        "ADA accessibility compliance disclosure required",
        "Environmental hazard disclosure if known (asbestos, lead, mold)",
        "Seismic evaluation notice for older commercial buildings",
        "California minimum commercial lease term: no statutory minimum",
        "Personal guarantee often required for new businesses",
      ],
      restrictions: [
        "No rent control for commercial properties in California",
        "Cannabis business leases require additional state and local licensing compliance language",
        "Landlord must allow tenant's ADA modifications in some circumstances",
      ],
      faq: [
        {
          question: "Are there rent control laws for commercial leases in California?",
          answer: "No. California's rent control laws (AB 1482) apply only to residential properties. Commercial leases are negotiated freely between landlord and tenant without rent increase restrictions.",
        },
        {
          question: "What ADA requirements apply to California commercial leases?",
          answer: "Both landlords and tenants may share ADA compliance responsibilities. The lease should specify who is responsible for making required ADA modifications to the premises and common areas.",
        },
        {
          question: "Is a personal guarantee required for a California commercial lease?",
          answer: "It's not legally required but landlords commonly demand one, especially from new businesses or entities with limited credit history. A personal guarantee makes the business owner personally liable for lease obligations.",
        },
        {
          question: "How long can a California commercial lease be?",
          answer: "California has no statutory limit on commercial lease duration. Leases can run from month-to-month to 20+ years. Longer terms typically include rent escalation provisions tied to CPI or fixed percentages.",
        },
      ],
    },
    "promissory-note": {
      requirements: [
        "No specific form required — must include parties, amount, interest rate, repayment terms",
        "California usury limit: 10% per year for personal loans from non-exempt lenders",
        "Licensed lenders (banks, credit unions) are exempt from usury limits",
        "Secured promissory notes for real estate must be recorded",
        "Statute of limitations: 4 years from default (CCP § 337)",
      ],
      restrictions: [
        "Interest rates above 10% from unlicensed lenders are usurious and may void the contract",
        "Balloon payments and negative amortization must be clearly disclosed",
        "Collection after 4 years from default is barred by statute of limitations",
      ],
      faq: [
        {
          question: "What is California's usury limit for promissory notes?",
          answer: "California limits interest rates on personal loans from unlicensed lenders to 10% per year. Commercial loans between businesses have different rules — the usury laws are complex. Licensed lenders (banks, finance companies) are generally exempt.",
        },
        {
          question: "How long do I have to collect on a California promissory note?",
          answer: "California Code of Civil Procedure § 337 gives you 4 years from the date of default to file suit on a written promissory note. After this statute of limitations expires, the debt is time-barred.",
        },
        {
          question: "Does a California promissory note need to be notarized?",
          answer: "Notarization is not required for a promissory note to be enforceable. However, if the note is secured by real estate and you want to record it, notarization of the deed of trust or mortgage is required.",
        },
        {
          question: "Can I charge compound interest on a California promissory note?",
          answer: "Yes, if agreed in writing and within the usury limit. The note should clearly specify whether interest is simple or compound, and the compounding frequency (daily, monthly, annually).",
        },
      ],
    },
    "demand-letter": {
      requirements: [
        "No statutory form required — must clearly identify sender, recipient, and the demand",
        "For small claims (under $12,500 for individuals): demand letter not legally required but strongly advised",
        "Collections: must comply with Rosenthal Fair Debt Collection Practices Act (Cal. Civil Code § 1788)",
        "For construction defects: 45-day notice period required before filing suit",
        "Include your preferred response deadline (10-30 days is standard)",
      ],
      restrictions: [
        "Cannot include threats of criminal prosecution to collect a civil debt",
        "Must not misrepresent the amount owed or legal status of the debt",
        "Attorney fee claims require a contractual or statutory basis",
      ],
      faq: [
        {
          question: "Do I need a demand letter before suing in California small claims court?",
          answer: "There's no strict legal requirement, but California small claims court judges expect you to have made a reasonable attempt to resolve the dispute. Sending a demand letter demonstrates good faith and strengthens your position.",
        },
        {
          question: "How much can I sue for in California small claims court?",
          answer: "Individuals can sue for up to $12,500 in California small claims court. Businesses are limited to $6,250. You cannot hire an attorney to represent you in small claims court.",
        },
        {
          question: "What should a California demand letter include?",
          answer: "Your name and address, the recipient's name and address, a clear description of the dispute, the specific amount owed or action demanded, a deadline for response (typically 10–30 days), and a statement of your intent to pursue legal action if unmet.",
        },
        {
          question: "Is a California demand letter legally binding?",
          answer: "The demand letter itself is not binding, but it creates a documented record of your attempt to resolve the dispute. If the recipient responds and agrees to pay, that acceptance may form a binding settlement agreement.",
        },
      ],
    },
  },

  // ── Texas ────────────────────────────────────────────────────────────────
  texas: {
    "residential-lease-agreement": {
      requirements: [
        "Security deposit: no statutory limit, but must be returned within 30 days of move-out",
        "Required: written itemized list if deductions are made from security deposit",
        "Required: notice of landlord's name and address for repair requests",
        "Tenant right to repair-and-deduct for conditions affecting health/safety (up to 1 month's rent)",
        "Required: smoke detector disclosure and compliance with § 92.251–92.263 of Texas Property Code",
      ],
      restrictions: [
        "Texas is landlord-friendly — no statewide rent control",
        "No just-cause requirement for eviction (notice requirements apply)",
        "3-day notice required before filing eviction for non-payment",
      ],
      noticeRequirements: "30 days' notice required to terminate month-to-month tenancy",
      faq: [
        {
          question: "What is the security deposit limit in Texas?",
          answer: "Texas has no statutory cap on security deposits. However, the landlord must return the deposit within 30 days of the tenant vacating, along with a written itemized statement of any deductions.",
        },
        {
          question: "Can a Texas tenant repair-and-deduct?",
          answer: "Yes, under Texas Property Code § 92.0561, tenants can repair conditions that materially affect health or safety and deduct repair costs from rent (up to one month's rent), if the landlord fails to repair within a reasonable time after notice.",
        },
        {
          question: "How do evictions work in Texas?",
          answer: "For non-payment of rent, landlords must give a 3-day notice to vacate (or longer if the lease specifies). If the tenant doesn't leave, the landlord files a forcible detainer suit in Justice Court. The entire process can move quickly in Texas — often 3–4 weeks.",
        },
        {
          question: "Is Texas a landlord-friendly state?",
          answer: "Generally yes. Texas has no statewide rent control, no just-cause eviction requirement, and relatively streamlined eviction procedures. However, landlords must still comply with the Texas Property Code on habitability and security deposits.",
        },
      ],
    },
    "llc-operating-agreement": {
      requirements: [
        "Texas requires a Certificate of Formation filed with the Secretary of State",
        "Operating agreement is strongly recommended but not legally required to be filed",
        "Texas franchise tax: margin tax applies to LLCs with gross revenue above $2.47M (2024 threshold)",
        "Registered agent with Texas address required",
        "Series LLCs are recognized in Texas — a single LLC can have multiple series",
      ],
      restrictions: [
        "LLC name must include 'Limited Liability Company,' 'LLC,' or 'L.L.C.'",
        "Cannot use terms like 'bank,' 'trust,' or 'insurance' without appropriate licensing",
        "Professional LLCs (PLLCs) required for licensed professionals",
      ],
      faq: [
        {
          question: "Does Texas require an LLC operating agreement?",
          answer: "Texas does not require an operating agreement to be filed with the state, but the Texas Business Organizations Code encourages them. Without one, Texas default rules govern your LLC, which may not match your intentions.",
        },
        {
          question: "What is the Texas franchise tax for LLCs?",
          answer: "Texas LLCs pay a margin tax (franchise tax) based on gross revenue minus certain deductions. LLCs with revenue under $2.47 million (2024) may qualify for no-tax-due status. The rate is 0.75% for most businesses.",
        },
        {
          question: "Are series LLCs allowed in Texas?",
          answer: "Yes. Texas was one of the first states to recognize series LLCs under the Texas Business Organizations Code. A series LLC allows multiple business units with separate assets and liabilities under one LLC umbrella.",
        },
        {
          question: "What is the annual report requirement for Texas LLCs?",
          answer: "Texas LLCs must file a Public Information Report (PIR) annually by May 15 as part of the franchise tax filing. The report includes information on registered agent, officers, and directors.",
        },
      ],
    },
    "employment-contract": {
      requirements: [
        "Texas is an at-will employment state — either party can terminate at any time",
        "Texas minimum wage: $7.25/hour (federal minimum — Texas follows federal rate)",
        "Non-compete agreements are enforceable if: ancillary to otherwise enforceable agreement, reasonable in scope, time, and geography",
        "Covenants Not to Compete Act (CNCA): Texas Business & Commerce Code § 15.50",
        "Written employment contracts are not required but are strongly recommended",
      ],
      restrictions: [
        "Non-competes must be limited in time (typically 1-2 years) and geography to be enforceable",
        "Blue-penciling: Texas courts can modify overbroad non-competes rather than void them",
        "Tortious interference with employment is actionable in Texas",
      ],
      faq: [
        {
          question: "Are non-compete agreements enforceable in Texas?",
          answer: "Yes, under the Texas Covenants Not to Compete Act (§ 15.50), non-competes are enforceable if they are ancillary to an otherwise enforceable agreement (like an employment contract), and reasonable in time, geographic scope, and the activities restricted.",
        },
        {
          question: "What is Texas's minimum wage?",
          answer: "Texas follows the federal minimum wage of $7.25 per hour. Texas does not have a state minimum wage above the federal level. However, many Texas cities and employers voluntarily pay higher wages.",
        },
        {
          question: "Can Texas employers require non-disclosure agreements?",
          answer: "Yes. Texas courts routinely enforce properly drafted NDAs. Unlike non-competes, NDAs protecting legitimate trade secrets do not require the same ancillary agreement structure under the CNCA.",
        },
        {
          question: "What notice is required before terminating employment in Texas?",
          answer: "Texas is an at-will state with no statutory notice requirement for private employers. However, the Worker Adjustment and Retraining Notification Act (WARN Act) requires 60 days' notice for mass layoffs of 50+ employees.",
        },
      ],
    },
    "power-of-attorney": {
      requirements: [
        "Texas Durable Power of Attorney Act (Estates Code Title 2, Subtitle P)",
        "Must be signed by principal before a notary public, or signed by two adult witnesses",
        "Statutory form available in Texas Estates Code § 752.051",
        "Medical power of attorney separate — governed by Health & Safety Code § 166.151",
        "Must include durability language to survive incapacity",
      ],
      restrictions: [
        "Agent cannot change principal's will or beneficiary designations without express authority",
        "Self-dealing by agent requires express authorization",
        "Certain 'hot powers' (gifting, trust modification) require specific grant in the POA",
      ],
      faq: [
        {
          question: "Does a Texas power of attorney need to be notarized?",
          answer: "Yes. Under the Texas Durable Power of Attorney Act, a DPOA must be signed by the principal before a notary public, or alternatively before two adult witnesses who are not the agent, spouse, or heir of the principal.",
        },
        {
          question: "What is the difference between a Texas DPOA and a medical POA?",
          answer: "A Durable Power of Attorney (DPOA) covers financial and legal matters. A Medical Power of Attorney covers healthcare decisions. Texas law keeps these separate — you need both for complete incapacity planning.",
        },
        {
          question: "Can I use a Texas statutory power of attorney form?",
          answer: "Yes. Texas Estates Code § 752.051 provides a statutory DPOA form that is automatically recognized by banks, financial institutions, and government agencies. Our AI uses this statutory framework.",
        },
        {
          question: "How do I revoke a Texas power of attorney?",
          answer: "Sign a written notice of revocation and deliver it to the agent. Notify all third parties (banks, etc.) who may have relied on the POA. If the POA was recorded for real estate, record the revocation in the same county.",
        },
      ],
    },
    "last-will-and-testament": {
      requirements: [
        "Must be signed by the testator (or by another person at testator's direction)",
        "Two credible witnesses required, both over age 14",
        "Witnesses must sign in the testator's presence",
        "Holographic wills (in testator's own handwriting) are valid in Texas without witnesses",
        "Self-proving affidavit (Estates Code § 251.104) recommended to simplify probate",
      ],
      restrictions: [
        "Testator must be at least 18 years old, or married, or in the military",
        "Community property: cannot disinherit spouse from community property",
        "Spouses each own half of community property acquired during marriage",
      ],
      faq: [
        {
          question: "How many witnesses are required for a Texas will?",
          answer: "Two credible witnesses are required for a Texas attested will. Both must be present when the testator signs (or acknowledges the signature), and both must sign in the testator's presence. Witnesses should not be beneficiaries.",
        },
        {
          question: "What is a Texas independent administration?",
          answer: "Texas allows 'independent administration' of estates, meaning the executor can administer the estate without court supervision for each step. This makes Texas probate faster and less expensive than in many other states.",
        },
        {
          question: "Is a holographic will valid in Texas?",
          answer: "Yes. Under Texas Estates Code § 251.052, a holographic will (entirely in the testator's handwriting and signed by the testator) is valid without witnesses. However, typed wills with self-proving affidavits are more practical.",
        },
        {
          question: "What happens to community property in a Texas will?",
          answer: "Each spouse owns half of community property acquired during marriage. You can only dispose of your half in your will. Your spouse automatically retains their half regardless of what your will says.",
        },
      ],
    },
    "non-compete-agreement": {
      requirements: [
        "Governed by Texas Covenants Not to Compete Act (Business & Commerce Code § 15.50)",
        "Must be ancillary to an otherwise enforceable agreement",
        "Must be reasonable in time (courts typically allow 1-2 years), geography, and scope of activity",
        "Courts can modify overbroad covenants ('blue pencil' doctrine) rather than void them",
        "Consideration required — continued employment alone may not be sufficient in all cases",
      ],
      restrictions: [
        "Scope cannot be broader than necessary to protect a legitimate business interest",
        "Geographic area must correlate to actual business operations",
        "Courts balance employer's interest against undue hardship to the employee",
      ],
      faq: [
        {
          question: "How long can a Texas non-compete last?",
          answer: "Texas courts typically enforce non-competes up to 2 years. Agreements longer than 2 years are more scrutinized but can be enforceable if the business interest justifies it. Courts can reduce an unreasonable duration under the blue-pencil doctrine.",
        },
        {
          question: "What geographic scope is reasonable for a Texas non-compete?",
          answer: "The geographic area must match the employer's actual operational area. A Dallas-based company can likely enforce a non-compete within Dallas-Fort Worth. National restrictions may only be upheld for senior executives with truly national exposure.",
        },
        {
          question: "Can Texas courts modify an overbroad non-compete?",
          answer: "Yes. Unlike some states that void overbroad non-competes entirely, Texas courts can reform ('blue pencil') the agreement to make it reasonable and then enforce the modified version.",
        },
        {
          question: "What consideration is required for a Texas non-compete?",
          answer: "A non-compete must be ancillary to an enforceable agreement — typically an employment contract that gives the employee something of value: a job offer, raise, promotion, access to trade secrets, or specialized training.",
        },
      ],
    },
    "independent-contractor-agreement": {
      requirements: [
        "No equivalent of California's AB 5 — Texas uses the common-law control test",
        "IRS 20-factor test is commonly applied to distinguish employees from contractors",
        "Written contractor agreements are not legally required but strongly recommended",
        "Texas does not require specific contractor disclosure forms",
        "Workers' compensation: Texas is the only state that does not require it for most employers",
      ],
      restrictions: [
        "Misclassification can trigger TWC unemployment tax liability and IRS penalties",
        "Construction industry contractors: registration with TWC may be required",
        "Gig workers: Texas follows federal standards — no Prop 22 equivalent",
      ],
      faq: [
        {
          question: "How does Texas determine if a worker is an employee or contractor?",
          answer: "Texas uses a right-to-control test: the key question is whether the hiring party has the right to control the details of how the work is performed. Texas does not use California's stricter ABC test.",
        },
        {
          question: "Is workers' compensation required for Texas contractors?",
          answer: "Texas is the only state that does not mandate workers' compensation insurance for most private employers. However, contractors working on government projects must have workers' comp coverage.",
        },
        {
          question: "What should a Texas independent contractor agreement include?",
          answer: "At minimum: scope of services, payment terms, independent status clause, IP ownership, confidentiality, termination provisions, and a statement that the contractor is responsible for their own taxes.",
        },
        {
          question: "Can Texas non-compete clauses be included in contractor agreements?",
          answer: "Yes, subject to the Texas Covenants Not to Compete Act. Non-competes for contractors must be ancillary to a legitimate business interest (like trade secret access) and reasonable in time and scope.",
        },
      ],
    },
    "commercial-lease-agreement": {
      requirements: [
        "No statewide rent control for commercial properties",
        "Texas Property Code governs commercial lease terms",
        "Landlord's lien for rent: statutory lien attaches to tenant's property on premises",
        "Personal guarantee commonly required for new businesses",
        "Tenant improvements: specify who owns TI at lease end",
      ],
      restrictions: [
        "Landlord's statutory lien gives landlord leverage over tenant's equipment and inventory",
        "Oil and gas operations in commercial leases require additional state compliance",
        "Texas does not restrict CAM charges or audit rights by statute",
      ],
      faq: [
        {
          question: "What is the Texas landlord's lien for commercial leases?",
          answer: "Under Texas Property Code § 91.004, a landlord has a lien on a tenant's nonexempt property on the leased premises to secure unpaid rent. This gives Texas commercial landlords significant leverage in rent disputes.",
        },
        {
          question: "Is there rent control for commercial properties in Texas?",
          answer: "No. Texas has no rent control laws for commercial properties. Rent amounts, escalation schedules, and renewal terms are purely contractual.",
        },
        {
          question: "How is the Texas landlord's distraint remedy used?",
          answer: "Texas abolished the common-law right of distraint (self-help rent collection by seizing tenant property). Landlords must go through court for eviction — you cannot lock out a tenant or remove their property without a court order.",
        },
        {
          question: "What should a Texas commercial lease include about personal guarantees?",
          answer: "Specify whether the guarantee is absolute or limited (e.g., first 24 months of rent), whether it survives business sale, and what triggers the guarantee. A 'good-guy clause' can limit liability when a tenant vacates early.",
        },
      ],
    },
    "promissory-note": {
      requirements: [
        "Texas has no general usury limit for commercial transactions between businesses",
        "Consumer loans: Texas Constitution Article XVI § 11 — maximum 10% for consumer transactions",
        "Licensed lenders can charge higher rates under Texas Finance Code",
        "Statute of limitations: 4 years for written contracts (CPRC § 16.004)",
        "No requirement to record a promissory note unless secured by real estate",
      ],
      restrictions: [
        "Consumer interest above 10% requires a licensed lender",
        "Balloon payment loans require clear disclosure",
        "Texas Home Equity loans have additional Constitutional restrictions",
      ],
      faq: [
        {
          question: "What is Texas's usury limit for promissory notes?",
          answer: "Texas Constitution Article XVI § 11 sets a 10% annual interest rate ceiling for consumer transactions with unlicensed lenders. Commercial transactions between businesses are generally not subject to this limit.",
        },
        {
          question: "How long do I have to sue on a Texas promissory note?",
          answer: "Texas Civil Practice & Remedies Code § 16.004 gives 4 years from the date of default to file suit on a written promissory note. The limitations period begins running when the note becomes due.",
        },
        {
          question: "Does a Texas promissory note need to be witnessed or notarized?",
          answer: "No. A promissory note does not need witnesses or notarization to be enforceable in Texas. However, if the note is secured by real estate (via a deed of trust), the deed of trust must be notarized and recorded.",
        },
        {
          question: "Can I include a prepayment penalty in a Texas promissory note?",
          answer: "Yes, prepayment penalties are generally enforceable in Texas commercial notes. However, for residential mortgage notes, prepayment penalties are restricted by federal law and Texas Finance Code provisions.",
        },
      ],
    },
    "demand-letter": {
      requirements: [
        "No statutory form required in Texas",
        "Recommended for small claims (under $20,000 for individuals in Justice Court)",
        "Collections: must comply with Texas Debt Collection Act (Finance Code § 392)",
        "30-day demand required before filing suit on a dishonored check (Business & Commerce Code § 3.506)",
        "Notice to cure required before seeking attorney fees in some contract disputes",
      ],
      restrictions: [
        "Cannot threaten criminal prosecution to collect a civil debt",
        "Cannot misrepresent the amount owed or legal status",
        "Texas Finance Code § 392.304 prohibits false or misleading representations in debt collection",
      ],
      faq: [
        {
          question: "What is the Texas small claims limit?",
          answer: "Texas Justice Courts (small claims) handle cases up to $20,000. For amounts over $20,000 up to $250,000, file in County Court at Law. Cases over $250,000 go to District Court.",
        },
        {
          question: "How do I collect attorney fees in a Texas demand letter?",
          answer: "Texas allows attorney fee recovery in certain cases (breach of contract, DTPA violations) if you win. To preserve this right, your demand letter should specifically request payment of attorney fees and cite the statutory basis.",
        },
        {
          question: "Does a Texas demand letter stop the statute of limitations?",
          answer: "No. Sending a demand letter does not toll the statute of limitations. The 4-year limitation for written contracts continues to run. If you're approaching the deadline, file suit first and negotiate settlement simultaneously.",
        },
        {
          question: "What Texas statute governs debt collection demand letters?",
          answer: "The Texas Debt Collection Act (Finance Code Chapter 392) regulates third-party debt collectors and creditors. It prohibits harassment, false representations, and unfair practices — similar to the federal FDCPA but with some Texas-specific provisions.",
        },
      ],
    },
  },

  // ── New York ─────────────────────────────────────────────────────────────
  "new-york": {
    "residential-lease-agreement": {
      requirements: [
        "Housing Stability and Tenant Protection Act (HSTPA) 2019 — major tenant protections",
        "Security deposit: capped at 1 month's rent statewide (RPL § 227-e)",
        "14 days' notice required to cure lease violations before eviction (non-payment: 14 days)",
        "Required: notice of rights under NYC Admin Code (if NYC property)",
        "Required: window guard notices for buildings with children under 10",
      ],
      restrictions: [
        "Rent Stabilization: applies to NYC apartments built before 1974 with 6+ units",
        "Rent Guidelines Board sets annual allowable increases for stabilized units",
        "Good cause eviction: NYC requires cause to terminate most tenancies",
      ],
      noticeRequirements: "30 days' notice (tenant <1 year), 60 days (1-2 years), 90 days (2+ years)",
      faq: [
        {
          question: "Is New York a landlord-friendly or tenant-friendly state?",
          answer: "New York, particularly New York City, is strongly tenant-friendly. The Housing Stability and Tenant Protection Act (2019) significantly expanded tenant protections statewide, including security deposit caps, longer notice requirements, and stronger rent stabilization.",
        },
        {
          question: "What is New York's security deposit limit?",
          answer: "Since 2019, New York's RPL § 227-e caps security deposits at one month's rent for all residential rentals statewide. This applies to both market-rate and rent-stabilized apartments.",
        },
        {
          question: "What is rent stabilization in New York?",
          answer: "Rent stabilization applies to most NYC apartments built before 1974 with 6+ units. Landlords can only increase rent by the amount set annually by the NYC Rent Guidelines Board. Stabilized tenants have the right to renew their leases.",
        },
        {
          question: "How long does eviction take in New York?",
          answer: "New York has one of the longest eviction processes in the US. From notice to final removal can take 3–12+ months, especially in NYC Housing Court. The HSTPA 2019 added additional notice periods and procedural requirements.",
        },
      ],
    },
    "llc-operating-agreement": {
      requirements: [
        "LLC Law § 417: operating agreement required and must be in writing",
        "Publication requirement: LLCs must publish notice of formation in two local newspapers for 6 weeks",
        "Annual filing fee: $25 biennial report",
        "New York City: NYC Business Corporation Tax and NYC GCT may apply",
        "Low-profit LLC (L3C): available in New York for social enterprises",
      ],
      restrictions: [
        "Publication requirement cost: $1,000–$2,000+ in NYC counties",
        "Foreign LLCs must also publish upon registration",
        "Professional LLCs (PLLCs) required for licensed professionals",
      ],
      faq: [
        {
          question: "Does New York require an LLC operating agreement?",
          answer: "Yes. New York LLC Law § 417 requires every LLC to have a written operating agreement. Unlike most states, New York mandates the agreement be in writing, not just adopted orally.",
        },
        {
          question: "What is New York's LLC publication requirement?",
          answer: "New York LLCs must publish a notice of formation in two newspapers designated by the county clerk for 6 consecutive weeks within 120 days of formation. Failure to comply can result in suspension of the LLC's right to sue in New York courts.",
        },
        {
          question: "How much does it cost to form an LLC in New York?",
          answer: "State filing fee: $200. Publication costs vary by county: $40–$100 in most counties but $1,000–$2,000+ in NYC counties (Manhattan, Brooklyn, Queens, Bronx, Staten Island). Total startup costs in NYC can exceed $2,500.",
        },
        {
          question: "What taxes does a New York LLC pay?",
          answer: "Multi-member LLCs taxed as partnerships pay New York state income tax on members' shares. NYC adds the NYC Unincorporated Business Tax (UBT) at 4% on net income above $95,000 for businesses operating in the city.",
        },
      ],
    },
    "employment-contract": {
      requirements: [
        "New York minimum wage: $16/hour in NYC, Nassau, Suffolk, Westchester (July 2023); $15/hour rest of state",
        "Paid Family Leave: up to 12 weeks at 67% of average weekly wage",
        "Wage Theft Prevention Act: written wage notice required at hire",
        "Predictive scheduling ('Fair Workweek') applies in NYC for fast food and retail workers",
        "Non-compete reform: 2024 legislation pending — consult current status",
      ],
      restrictions: [
        "Non-competes: New York courts are skeptical — must protect legitimate business interest",
        "Garden leave clauses increasingly common as alternative to non-competes",
        "Salary history inquiries banned under NYC law and state Executive Order",
      ],
      faq: [
        {
          question: "What is New York's minimum wage?",
          answer: "As of January 1, 2024: $16/hour in NYC, Long Island, and Westchester County. $15/hour in the rest of New York State. The minimum wage adjusts annually; consult the NYS Department of Labor for current rates.",
        },
        {
          question: "Are non-compete agreements enforceable in New York?",
          answer: "New York courts enforce non-competes narrowly — only to protect legitimate business interests (trade secrets, confidential client relationships). The restriction must be reasonable in duration, geography, and scope. New York's legislature has periodically considered a broader ban; check current law.",
        },
        {
          question: "What is the New York Wage Theft Prevention Act?",
          answer: "The WTPA requires employers to provide a written wage notice to all new employees at the time of hire, including rate of pay, pay schedule, employer's business and contact information, and method of payment. Non-compliance carries significant penalties.",
        },
        {
          question: "What parental leave is required in New York?",
          answer: "New York Paid Family Leave (NY PFL) provides up to 12 weeks of paid, job-protected leave for bonding with a new child, caring for a seriously ill family member, or qualifying military exigencies. It's funded through employee payroll deductions.",
        },
      ],
    },
    "power-of-attorney": {
      requirements: [
        "New York General Obligations Law Article 5, Title 15 governs POAs",
        "Must be signed by principal and acknowledged before a notary",
        "Agent must sign a 'Statutory Gifts Rider' if making gifts over $500/year",
        "Statutory Short Form POA recommended (GOL § 5-1513)",
        "Third parties (banks) cannot refuse a properly executed NY Statutory Form POA",
      ],
      restrictions: [
        "Major Gifts Rider required for gifts exceeding annual exclusion to anyone other than agent",
        "Caregiver agents have special disclosure requirements",
        "Springing POAs must clearly define the triggering condition",
      ],
      faq: [
        {
          question: "Does a New York power of attorney need to be notarized?",
          answer: "Yes. Under General Obligations Law § 5-1501B, a New York POA must be signed by the principal and acknowledged before a notary public. Unlike some states, New York does not accept witnesses as an alternative to notarization for the principal's signature.",
        },
        {
          question: "What is the New York Statutory Short Form POA?",
          answer: "The Statutory Short Form Power of Attorney (GOL § 5-1513) is the standard form recommended in New York. Banks and institutions are required to accept this form. Using it avoids disputes about whether third parties must honor the document.",
        },
        {
          question: "What is a Statutory Gifts Rider in New York?",
          answer: "If you want your agent to make gifts exceeding $500 per year (to anyone other than you or the agent), you must execute a separate Statutory Gifts Rider. This extra step protects against financial abuse by requiring explicit authorization for significant gifts.",
        },
        {
          question: "Can a New York bank refuse to honor my POA?",
          answer: "Banks cannot refuse a properly executed New York Statutory Short Form POA (GOL § 5-1505). However, they can request an affidavit of validity, refuse if there's reasonable belief of abuse, or ask for more recent execution (within 10 years is generally accepted).",
        },
      ],
    },
    "last-will-and-testament": {
      requirements: [
        "Must be signed at the end by the testator (or another person at testator's direction)",
        "Two witnesses required — both must sign at testator's request in each other's presence",
        "Witnesses should not be beneficiaries (interested witnesses risk their bequest)",
        "New York EPTL § 3-2.1 governs execution formalities",
        "Notarization not required but self-proving affidavit helps",
      ],
      restrictions: [
        "Elective share: surviving spouse can elect to take the greater of $50,000 or 1/3 of the estate",
        "Children: no forced heirship, but omitted children born after will execution have rights",
        "Estate tax: New York imposes estate tax on estates over $6.94 million (2024)",
      ],
      faq: [
        {
          question: "Does New York have an estate tax?",
          answer: "Yes. New York imposes a state estate tax on estates exceeding the exemption threshold ($6.94 million in 2024). The 'cliff' provision means estates between 100–105% of the exemption can face a significantly higher effective tax rate.",
        },
        {
          question: "What is the elective share in New York?",
          answer: "A surviving spouse can elect to take the 'elective share' — the greater of $50,000 or one-third of the net estate — instead of what the will provides. This prevents a spouse from being completely disinherited.",
        },
        {
          question: "How does New York probate work?",
          answer: "A will is admitted to probate in Surrogate's Court. With a self-proving will, the process is streamlined. New York does not have a simplified small estate procedure — even small estates must go through the Surrogate's Court, though a voluntary administration process exists for estates under $50,000.",
        },
        {
          question: "Can I videotape my will signing in New York?",
          answer: "Recording the signing can help demonstrate testamentary capacity and freedom from undue influence, but the recording is not a substitute for proper execution with two witnesses. Courts have accepted video evidence in contested matters.",
        },
      ],
    },
    "non-compete-agreement": {
      requirements: [
        "No statute — governed by common law; courts apply 4-factor test",
        "Must protect legitimate business interest (trade secrets, customer relationships, confidential info)",
        "Must be reasonable in duration, geographic scope, and activities restricted",
        "Cannot impose undue hardship on employee",
        "Must not harm the public interest",
      ],
      restrictions: [
        "New York courts are skeptical of overly broad non-competes",
        "Courts will not enforce non-competes that merely prevent competition — must protect specific interests",
        "Proposed NY Senate Bill S3100A would significantly restrict non-competes — monitor status",
      ],
      faq: [
        {
          question: "How does New York enforce non-compete agreements?",
          answer: "New York courts apply a 4-part test: (1) necessary to protect a legitimate business interest, (2) does not impose undue hardship on the employee, (3) does not harm the public, and (4) reasonable in time and geography. Courts narrowly construe non-competes.",
        },
        {
          question: "What qualifies as a 'legitimate business interest' in New York?",
          answer: "New York recognizes two main legitimate interests: (1) protecting trade secrets and confidential business information, and (2) protecting client relationships built through the employer's resources. Non-competes to prevent mere competition are not enforced.",
        },
        {
          question: "Are garden leave clauses used in New York?",
          answer: "Yes, increasingly. A garden leave clause pays the employee during the restriction period — this makes non-competes more enforceable since the employee is compensated. Many New York employers use garden leave as an alternative to traditional non-competes.",
        },
        {
          question: "Is there pending legislation on non-competes in New York?",
          answer: "New York's legislature has considered bills that would significantly restrict or ban non-compete agreements. As of 2024, proposals remain active. Employers should monitor the legislative status, as the law could change substantially.",
        },
      ],
    },
    "independent-contractor-agreement": {
      requirements: [
        "New York uses an economic reality test (broader than federal standards)",
        "Freelance Isn't Free Act (FIF Act): written contract required for work ≥$800",
        "FIF Act requires payment within 30 days of work completion",
        "Retaliation against freelancers prohibited",
        "NYC Department of Consumer Affairs enforces FIF Act compliance",
      ],
      restrictions: [
        "Misclassification triggers NYS Workers' Compensation, disability insurance, and unemployment tax liability",
        "Construction industry: employees presumed if hired by a covered employer",
        "Domestic workers cannot be classified as independent contractors in New York",
      ],
      faq: [
        {
          question: "What is New York's Freelance Isn't Free Act?",
          answer: "The NYC Freelance Isn't Free Act (FIF Act) requires written contracts for freelance work worth $800 or more. Payment must be made by the agreed date, or within 30 days if no date is specified. Violations carry penalties of double damages plus attorney fees.",
        },
        {
          question: "How does New York classify workers as employees vs. contractors?",
          answer: "New York uses an 'economic reality test' that looks at the totality of the relationship, with emphasis on the degree of economic dependence on the employer. This is broader than the federal common law control test and can capture more workers as employees.",
        },
        {
          question: "Is the Freelance Isn't Free Act only in NYC?",
          answer: "The original FIF Act (2017) applies citywide in New York City. New York State passed a broader version effective May 20, 2024, extending similar protections statewide. Any freelance contract of $800+ now requires a written agreement statewide.",
        },
        {
          question: "What are the penalties for not paying a freelancer in New York?",
          answer: "Under the state Freelance Isn't Free Act, failure to pay by the agreed date or within 30 days triggers a right to double damages, attorney fees, and civil penalties. The freelancer can file a complaint with the NY Attorney General's office.",
        },
      ],
    },
    "commercial-lease-agreement": {
      requirements: [
        "New York does not impose commercial rent control except during declared emergencies",
        "Commercial tenant protection bill proposed but not enacted as of 2024 — monitor",
        "Notice of rent increases: 30 days' minimum in most commercial leases",
        "Guarantees: Article 52 of the CPLR governs enforcement of personal guarantees",
        "NYC: Commercial Lease Assistance Program (CLAP) available for small businesses",
      ],
      restrictions: [
        "COVID-19 guarantor protections: NYC Local Law 55 limited personal guarantee enforcement for certain periods — check current status",
        "Landlord's right to distrain (seize tenant property) abolished in New York",
        "Yellowstone injunctions: unique NY remedy allowing tenants to cure defaults before lease termination",
      ],
      faq: [
        {
          question: "What is a Yellowstone injunction in New York?",
          answer: "A Yellowstone injunction is a unique New York legal tool that allows a commercial tenant to toll (pause) their cure period while challenging the landlord's notice to cure in court. It prevents lease termination during litigation, preserving the tenant's right to cure.",
        },
        {
          question: "Is there rent stabilization for commercial tenants in New York?",
          answer: "No. New York's rent stabilization laws apply only to residential apartments. Commercial leases are negotiated freely. However, the state has considered commercial tenant protection legislation — monitor the legislative status.",
        },
        {
          question: "What is New York's approach to commercial lease guarantees?",
          answer: "Personal guarantees on NYC commercial leases were temporarily limited during COVID-19. Now that emergency protections have expired, guarantees are generally enforced as written. Include clear guarantee terms and consider 'good-guy' clauses to limit guarantor liability.",
        },
        {
          question: "How does eviction work for commercial tenants in New York?",
          answer: "Commercial eviction requires court process. The landlord must serve a proper notice to cure or quit, then file a holdover proceeding in Civil Court (NYC) or Supreme Court. Eviction is faster than residential but can still take several months.",
        },
      ],
    },
    "promissory-note": {
      requirements: [
        "New York usury limit: 16% per year for civil usury; 25% for criminal usury (GOL § 5-501)",
        "Corporate loans: exempt from usury — no limit between businesses",
        "Statute of limitations: 6 years for written contracts (CPLR § 213)",
        "Confessions of judgment: restricted for out-of-state debtors (CPLR § 3218)",
        "Required: clear identification of parties, amount, interest rate, repayment terms",
      ],
      restrictions: [
        "Rates above 16% are civilly usurious — contract may be voidable",
        "Rates above 25% are criminally usurious — contract is void",
        "Consumer credit: additional Truth in Lending Act (TILA) disclosure requirements",
      ],
      faq: [
        {
          question: "What is New York's usury limit for promissory notes?",
          answer: "New York General Obligations Law § 5-501 sets civil usury at 16% per year and criminal usury at 25% per year for consumer loans. Corporate loans between businesses are exempt from usury limits. Violating the criminal usury limit voids the entire loan agreement.",
        },
        {
          question: "How long do I have to sue on a New York promissory note?",
          answer: "New York CPLR § 213 provides a 6-year statute of limitations for written contracts, including promissory notes. The clock starts running from the date of default or the date payment was due.",
        },
        {
          question: "What is a confession of judgment in New York?",
          answer: "A confession of judgment (cognovit note) allows a creditor to enter judgment without a lawsuit if the debtor defaults. New York restricts confessions of judgment against out-of-state debtors (CPLR § 3218). They remain valid for in-state debtors but are controversial.",
        },
        {
          question: "Does a New York promissory note need to be notarized?",
          answer: "No. A promissory note does not require notarization to be enforceable in New York. However, if the note is secured by real estate (mortgage), the mortgage must be acknowledged before a notary and recorded with the county clerk.",
        },
      ],
    },
    "demand-letter": {
      requirements: [
        "No statutory form required — should include all material facts and clear demand",
        "Small claims court: $10,000 limit for individuals; $5,000 for corporations",
        "NYC Civil Court: up to $25,000; no attorney required for small claims",
        "Consumer protection: FTC Act and GBL § 349 (deceptive acts) may provide additional remedies",
        "30 days' notice before suing on a consumer debt (FDCPA)",
      ],
      restrictions: [
        "Cannot threaten criminal prosecution for civil debt",
        "Cannot misrepresent legal status or amount of debt",
        "New York FDCPA (Debt Collection Procedures Law): stricter than federal rules in some respects",
      ],
      faq: [
        {
          question: "What is the New York small claims court limit?",
          answer: "New York City Civil Court handles small claims up to $10,000 for individuals and $5,000 for corporations and partnerships. In city courts outside NYC, the limit is generally $5,000. Attorneys can appear in NYC small claims court only with the judge's permission.",
        },
        {
          question: "Does New York have additional debt collection protections beyond federal law?",
          answer: "Yes. New York's Debt Collection Procedures Law imposes stricter requirements than the federal FDCPA, including additional disclosures and prohibiting wage garnishment threats. NYC's debt collection regulations add another layer of protection.",
        },
        {
          question: "How do I claim attorney fees in a New York demand letter?",
          answer: "Attorney fees are generally not recoverable unless your contract provides for them or a statute authorizes it (e.g., consumer protection claims under GBL § 349, which allows fee recovery to prevailing consumers). State the contractual or statutory basis in your demand letter.",
        },
        {
          question: "How long is a New York statute of limitations for breach of contract?",
          answer: "6 years for written contracts under CPLR § 213. This is longer than most states (typically 4 years). The clock starts from the date of breach. A demand letter does not toll the limitations period — file suit before the deadline if necessary.",
        },
      ],
    },
  },

  // ── Florida ─────────────────────────────────────────────────────────────
  florida: {
    "residential-lease-agreement": {
      requirements: [
        "Florida Residential Landlord and Tenant Act (§ 83.40 et seq.) governs",
        "Security deposit: must be held in separate account or posted as surety bond",
        "Landlord must notify tenant within 30 days of lease termination if retaining deposit",
        "Required: notice of landlord's name and address for rent payments",
        "Required: 12-hour advance notice before entry (except emergencies)",
      ],
      restrictions: [
        "Florida is a landlord-friendly state — no rent control except Miami-Dade (preempted by state 2023)",
        "7-day notice for non-payment of rent before filing eviction",
        "No just-cause eviction requirement",
      ],
      noticeRequirements: "15 days' notice to terminate month-to-month tenancy",
      faq: [
        {
          question: "Is Florida landlord or tenant friendly?",
          answer: "Florida is generally considered landlord-friendly. There is no statewide rent control, a relatively quick eviction process (7-day notice for non-payment), and landlords have strong remedies for lease violations.",
        },
        {
          question: "How does Florida's security deposit process work?",
          answer: "The landlord must hold the security deposit in a separate account OR post a surety bond. Within 30 days of the tenant vacating, the landlord must return the deposit or send written notice of intended deductions with an itemized list.",
        },
        {
          question: "What notice is required for a landlord to enter a rental unit in Florida?",
          answer: "Florida § 83.53 requires at least 12 hours' advance notice before a landlord enters a rental unit, except in emergencies. Entry must be at reasonable hours (typically 7:30 AM – 8:00 PM) and for permitted purposes.",
        },
        {
          question: "How fast are evictions in Florida?",
          answer: "Florida has a relatively fast eviction process. For non-payment, landlords give a 3-day notice. If unpaid, the landlord can file for eviction immediately. The court may issue a Default Final Judgment within days. Complete process: typically 2–4 weeks.",
        },
      ],
    },
    "llc-operating-agreement": {
      requirements: [
        "Florida LLC Act (Chapter 605): operating agreement governs internal affairs",
        "No state requirement to file operating agreement — Articles of Organization filed with FDOS",
        "Annual report required by May 1 each year ($138.75 fee)",
        "Florida has no state income tax — LLC income taxed only federally",
        "Registered agent with Florida office address required",
      ],
      restrictions: [
        "Series LLCs are not available in Florida",
        "Professional services require a Professional LLC (PLLC)",
        "Foreign LLCs must register with the Florida Department of State",
      ],
      faq: [
        {
          question: "Does Florida have a state income tax for LLCs?",
          answer: "No. Florida has no personal income tax, so LLC members don't pay Florida income tax on their share of LLC profits. However, multi-member LLCs are subject to Florida's corporate income tax if they elect to be taxed as a corporation.",
        },
        {
          question: "What is Florida's LLC annual report requirement?",
          answer: "Florida LLCs must file an annual report with the Department of State by May 1 each year. The filing fee is $138.75. Failure to file by the deadline results in a $400 late fee, and failure to file by the third Friday of September results in dissolution.",
        },
        {
          question: "Are series LLCs available in Florida?",
          answer: "No. Florida does not recognize series LLCs. If you need separate liability silos for multiple business units, you must form separate LLCs in Florida.",
        },
        {
          question: "What is the registered agent requirement for a Florida LLC?",
          answer: "Every Florida LLC must maintain a registered agent with a physical street address in Florida (not a P.O. box). The agent receives official legal documents and government notices on behalf of the LLC.",
        },
      ],
    },
    "employment-contract": {
      requirements: [
        "Florida is an at-will employment state (§ 448.01)",
        "No state minimum wage above federal? No — Florida minimum wage: $13/hour (2024), rising $1/year to $15/hour by 2026",
        "Paid sick leave: no statewide requirement (preemption law bars local sick leave ordinances)",
        "Non-compete agreements: enforceable under Florida Statutes § 542.335",
        "Non-competes must be reasonable in time, geographic area, and line of business",
      ],
      restrictions: [
        "Non-competes: no blue pencil — Florida courts can reform overbroad agreements to make them enforceable",
        "Non-compete: courts must consider legitimate business interest and reasonableness",
        "Presumed reasonable: 6 months for lower-level employees; 2 years for executives and professionals",
      ],
      faq: [
        {
          question: "What is Florida's minimum wage?",
          answer: "Florida's minimum wage is $13.00/hour in 2024, increasing by $1.00 annually to reach $15.00/hour by 2026. This results from Amendment 2, passed by Florida voters in November 2020.",
        },
        {
          question: "Are non-compete agreements enforceable in Florida?",
          answer: "Yes. Florida Statute § 542.335 makes non-competes enforceable if they protect a legitimate business interest and are reasonable in time and geographic scope. Florida courts must enforce reasonable non-competes — they cannot simply refuse them as unconscionable.",
        },
        {
          question: "Does Florida require paid sick leave?",
          answer: "No. Florida has no statewide paid sick leave requirement. Moreover, Florida's preemption law (§ 218.077) prohibits local governments from requiring employers to provide sick leave benefits, meaning no city or county can mandate paid sick leave.",
        },
        {
          question: "What is the presumed reasonable duration for a Florida non-compete?",
          answer: "Under § 542.335, non-competes up to 6 months are presumed reasonable for lower-level employees. Non-competes for management or professional roles are presumed reasonable up to 2 years. Non-competes over 2 years create a rebuttable presumption of unreasonableness.",
        },
      ],
    },
    "power-of-attorney": {
      requirements: [
        "Florida Power of Attorney Act (Chapter 709): completely revised in 2011",
        "Must be signed in the presence of two witnesses AND a notary public",
        "Agent must sign acceptance of appointment",
        "Designated powers must be initialed by principal to be effective",
        "Springing POAs (effective upon incapacity) are NOT recognized in Florida",
      ],
      restrictions: [
        "Florida does not recognize springing powers of attorney created after October 1, 2011",
        "All Florida POAs are effective immediately upon execution — plan accordingly",
        "Healthcare decisions require a separate Healthcare Surrogate Designation",
        "Hot powers (gifting, trust creation, changing beneficiaries) require specific initialing",
      ],
      faq: [
        {
          question: "Does Florida recognize springing powers of attorney?",
          answer: "No. Florida's 2011 Power of Attorney Act eliminated springing POAs for documents created after October 1, 2011. Florida POAs are effective immediately upon signing. To delay effectiveness, consider a trust or other planning tool.",
        },
        {
          question: "What witnesses are required for a Florida power of attorney?",
          answer: "Florida requires two adult witnesses AND a notary public to be present when the principal signs. The witnesses cannot be the notary, the agent, or the agent's spouse, children, or those who would inherit from the principal.",
        },
        {
          question: "What are 'hot powers' in a Florida POA?",
          answer: "Certain powers (gifting, creating or modifying trusts, changing beneficiary designations, delegating POA authority) require explicit initials by the principal next to each specific grant. Simply including them in the document's text is insufficient — the principal must initial each one separately.",
        },
        {
          question: "Does Florida require a healthcare power of attorney?",
          answer: "Florida handles healthcare decisions through a separate document: the Healthcare Surrogate Designation (§ 765.202). A standard financial POA does not authorize healthcare decisions in Florida — you need both documents for complete incapacity planning.",
        },
      ],
    },
    "last-will-and-testament": {
      requirements: [
        "Florida Probate Code (Chapters 731-735) governs",
        "Two witnesses required — both must sign in the presence of each other and the testator",
        "Self-proving will allowed: notary and witnesses sign affidavit (§ 732.503)",
        "Testator must be at least 18 years old",
        "Holographic wills: NOT valid in Florida (unless executed under another state's laws)",
      ],
      restrictions: [
        "Elective share: spouse entitled to 30% of elective estate (§ 732.2065)",
        "Homestead: complex restrictions on devising homestead to anyone other than spouse or minor children",
        "Florida estate tax: no state estate tax (follows federal exemption)",
      ],
      faq: [
        {
          question: "Are holographic wills valid in Florida?",
          answer: "No. Florida does not recognize holographic wills (handwritten, unwitnessed wills) created within the state. A Florida will must be witnessed by two adults signing in the testator's presence. Exception: foreign holographic wills may be recognized if valid where executed.",
        },
        {
          question: "What are Florida's homestead devolution rules?",
          answer: "Florida's homestead law restricts how you can leave your homestead. If you have a spouse or minor children, you cannot devise (give) the homestead to anyone else. The homestead passes to the spouse for life with a remainder to descendants, or outright to descendants if no surviving spouse.",
        },
        {
          question: "Does Florida have an estate tax?",
          answer: "No. Florida has no state estate tax. Only the federal estate tax applies, which has a $13.61 million exemption per person in 2024 (indexed for inflation). This makes Florida particularly favorable for estate planning.",
        },
        {
          question: "What is the elective share in Florida?",
          answer: "A surviving spouse can elect to take 30% of the 'elective estate' (which includes more than just probate assets — it includes revocable trusts, certain joint property, etc.) instead of whatever the will provides. This prevents a spouse from being disinherited.",
        },
      ],
    },
    "non-compete-agreement": {
      requirements: [
        "Florida Statute § 542.335: one of the most enforcer-friendly non-compete statutes in the US",
        "Must protect legitimate business interest (trade secrets, substantial relationships, specialized training)",
        "Reasonableness presumed for 6 months (trade secrets), 2 years (clients), 3 years (customer lists)",
        "Courts must enforce — cannot simply refuse a facially reasonable non-compete",
        "Burden of proving unreasonableness on the employee, not the employer",
      ],
      restrictions: [
        "Geographic scope must correlate to employer's actual business area",
        "Courts cannot void overbroad non-competes — they must reform and enforce",
        "Public policy challenge almost never succeeds in Florida",
      ],
      faq: [
        {
          question: "Is Florida favorable to non-compete agreements?",
          answer: "Very much so. Florida Statute § 542.335 is one of the most pro-employer non-compete statutes in the US. Florida courts are required to enforce reasonable non-competes and presumed timeframes are provided — a stark contrast to California which bans them entirely.",
        },
        {
          question: "What are Florida's presumed-reasonable timeframes for non-competes?",
          answer: "Florida provides safe harbors: 6 months for trade secret protection, 2 years for business goodwill or substantial customer relationships, 3 years for customer or patient lists. Going beyond these periods puts the burden on the employer to prove reasonableness.",
        },
        {
          question: "Can a Florida court refuse to enforce a non-compete?",
          answer: "No. Unlike many states, Florida courts must enforce a facially reasonable non-compete — they cannot refuse on public policy grounds. If the non-compete is overbroad, the court reforms it to be reasonable and then enforces the modified version.",
        },
        {
          question: "Who has the burden of proof for Florida non-competes?",
          answer: "The employer has the burden to establish the existence of a legitimate business interest and a legitimate need for the restriction. The employee then has the burden to prove the restriction is unreasonable in time, geography, or scope.",
        },
      ],
    },
    "independent-contractor-agreement": {
      requirements: [
        "Florida uses the economic reality test and IRS 20-factor test",
        "No equivalent of California's AB 5 in Florida",
        "Construction industry: significant misclassification enforcement by Florida DOR",
        "No specific written contract requirements (unlike NY's Freelance Act)",
        "Contractors responsible for their own taxes, workers' comp, and benefits",
      ],
      restrictions: [
        "Construction workers: presumed employees unless meeting specific exceptions",
        "Misclassification in construction triggers workers' comp and payroll tax liability",
        "Gig workers: Florida follows federal classification standards",
      ],
      faq: [
        {
          question: "How does Florida classify employees vs. independent contractors?",
          answer: "Florida applies the economic reality test, looking at factors like: degree of control, permanency of the relationship, investment in tools and equipment, skill required, and whether work is an integral part of the business. No single factor is determinative.",
        },
        {
          question: "Are construction workers automatically employees in Florida?",
          answer: "Not automatically, but Florida strictly enforces misclassification in construction. The Florida Department of Revenue and workers' compensation authorities actively investigate construction contractors. Misclassification can result in back taxes, penalties, and workers' comp assessments.",
        },
        {
          question: "What taxes is a Florida independent contractor responsible for?",
          answer: "Contractors pay self-employment tax (15.3% on net self-employment income up to the Social Security wage base), federal income tax, and Florida sales tax if applicable to their services. Florida has no state income tax, which is an advantage for Florida-based contractors.",
        },
        {
          question: "Should a Florida independent contractor agreement include an indemnification clause?",
          answer: "Yes. An indemnification clause requires the contractor to hold you harmless for claims arising from their work (negligence, IP infringement, third-party injuries). This is especially important in construction, where liability exposure is higher.",
        },
      ],
    },
    "commercial-lease-agreement": {
      requirements: [
        "Florida Statute Chapter 83 (Part I) governs commercial leases",
        "No rent control for commercial properties in Florida",
        "Sales tax: Florida charges 5.5% sales tax on commercial rent (plus local surtax)",
        "No mandatory disclosure requirements for commercial landlords (unlike residential)",
        "Personal guarantee commonly required for new businesses",
      ],
      restrictions: [
        "Tenant improvements: specify ownership at lease end — no default rule in Florida",
        "Landlord's lien: statutory lien available for unpaid rent",
        "Eviction: 3-day notice for non-payment; relatively fast process (2-4 weeks)",
      ],
      faq: [
        {
          question: "Is there sales tax on commercial rent in Florida?",
          answer: "Yes. Florida charges a 5.5% state sales tax on commercial rent payments (reduced from 5.7% in 2023), plus applicable county surtax. This is a significant cost that tenants and landlords should account for in lease negotiations.",
        },
        {
          question: "How does commercial eviction work in Florida?",
          answer: "For non-payment of rent, the landlord serves a 3-day notice to pay or vacate. If the tenant doesn't comply, the landlord files a complaint in Circuit Court. Florida's commercial eviction process is relatively fast — often 2-4 weeks from filing to writ of possession.",
        },
        {
          question: "Are there disclosure requirements for Florida commercial landlords?",
          answer: "Florida has no specific commercial landlord disclosure requirements (unlike residential landlords). However, material latent defects that would affect the tenant's decision should be disclosed to avoid fraud liability.",
        },
        {
          question: "What is a landlord's lien in a Florida commercial lease?",
          answer: "Florida Statute § 83.08 gives commercial landlords a lien on tenant's property on the premises for unpaid rent. This lien can be enforced through distress proceedings — a court-supervised seizure of the tenant's property — providing additional security to landlords.",
        },
      ],
    },
    "promissory-note": {
      requirements: [
        "Florida usury: 18% per year (consumer) or 25% (criminal usury) under Florida Statute § 687.03",
        "Commercial loans between businesses: up to 25% generally allowed",
        "Statute of limitations: 5 years for written instruments (§ 95.11(2)(b))",
        "No formal filing requirement for unsecured notes",
        "Real estate secured notes: mortgage must be recorded with county clerk",
      ],
      restrictions: [
        "Interest above 18% (consumer) or 25% (commercial) is usurious",
        "Criminal usury (over 45% per year) is a 3rd degree felony in Florida",
        "Payday-style loans subject to Florida Office of Financial Regulation",
      ],
      faq: [
        {
          question: "What is Florida's usury limit for promissory notes?",
          answer: "Florida Statute § 687.03 sets civil usury at 18% per year for consumer loans and 25% per year for commercial transactions. Criminal usury (over 45%) is a felony. Licensed financial institutions are generally exempt from these limits.",
        },
        {
          question: "How long do I have to collect on a Florida promissory note?",
          answer: "Florida Statute § 95.11(2)(b) provides a 5-year statute of limitations on written instruments, including promissory notes. The clock starts from the date the note becomes due or the date of default.",
        },
        {
          question: "Can a Florida promissory note be used to finance real estate?",
          answer: "Yes, but the mortgage or deed of trust securing the note must be notarized and recorded with the county clerk where the property is located to perfect the security interest. Documentary stamp tax applies to the note amount.",
        },
        {
          question: "What is Florida's documentary stamp tax on promissory notes?",
          answer: "Florida charges documentary stamp tax (doc stamp) of $0.35 per $100 on the face amount of most promissory notes. For notes secured by Florida real estate, an additional intangible tax of $0.002 per $1 of principal may apply.",
        },
      ],
    },
    "demand-letter": {
      requirements: [
        "No statutory form required",
        "Small claims court: up to $8,000 in county court; no attorney required",
        "Florida Consumer Collection Practices Act (§ 559.72) governs debt collection letters",
        "Construction defects: 60-day notice required before suit (§ 558.004)",
        "Insurance claims: detailed demand required before bad faith claim",
      ],
      restrictions: [
        "Cannot use harassing, oppressive, or abusive language",
        "Cannot make false representations about legal status or amount",
        "Construction defect demand: 60-day notice/inspection period before litigation",
      ],
      faq: [
        {
          question: "What is Florida's small claims court limit?",
          answer: "Florida county courts handle small claims up to $8,000 (excluding attorney fees and costs). Cases above $8,000 must be filed in circuit court. Small claims proceedings are designed for non-lawyers and have simplified procedures.",
        },
        {
          question: "Does Florida require a pre-suit demand for construction defects?",
          answer: "Yes. Florida Statute § 558.004 requires homeowners to send a written construction defect notice to the contractor at least 60 days before filing suit. The contractor has the right to inspect and make a settlement offer within this period.",
        },
        {
          question: "How do I make a bad faith demand on a Florida insurance company?",
          answer: "Under Florida Statute § 624.155, you must send a Civil Remedy Notice (CRN) to the Florida Department of Financial Services and the insurer at least 60 days before filing a bad faith lawsuit. The CRN must detail the insurer's bad faith conduct.",
        },
        {
          question: "What is Florida's statute of limitations for contract claims?",
          answer: "Florida Statute § 95.11(2)(b) provides 5 years for written contracts and 4 years for oral contracts. The limitations period begins when the breach occurs, not when you discover it. A demand letter does not toll the statute of limitations — file suit before the deadline.",
        },
      ],
    },
  },

  // ── Georgia ──────────────────────────────────────────────────────────────
  georgia: {
    "residential-lease-agreement": {
      requirements: [
        "Georgia Landlord Tenant Act (O.C.G.A. §§ 44-7-1 through 44-7-81) governs",
        "Security deposit: must be returned within 30 days of termination",
        "Landlord must provide itemized list of deductions within 30 days",
        "Required: move-in/move-out inspection if landlord retains any deposit",
        "Landlord must provide name and address of property manager and where deposit is held",
      ],
      restrictions: [
        "Georgia is landlord-friendly — no rent control statewide",
        "Demand for Possession (7-day notice for non-payment) before filing eviction",
        "No just-cause eviction requirement",
      ],
      noticeRequirements: "60 days' notice recommended to terminate (30 days minimum common practice)",
      faq: [
        {
          question: "What are a Georgia landlord's security deposit obligations?",
          answer: "Georgia landlords must return the security deposit within 30 days of the tenancy ending. If deductions are made, the landlord must provide a written itemized list of damages and their costs. Failure to comply can result in the landlord forfeiting the right to the deposit.",
        },
        {
          question: "Is Georgia landlord or tenant friendly?",
          answer: "Georgia is generally landlord-friendly. There is no statewide rent control, and the eviction process is relatively straightforward with a 7-day demand for possession for non-payment. However, landlords must follow proper procedures or risk liability.",
        },
        {
          question: "Can a Georgia landlord enter a rental unit without notice?",
          answer: "Georgia law does not specify a required advance notice period for landlord entry (unlike California's 24-hour requirement). However, most leases require reasonable notice, and entering without notice can constitute harassment or constructive eviction.",
        },
        {
          question: "How does the Georgia eviction process work?",
          answer: "For non-payment: serve a Demand for Possession (7-day notice). If unpaid, file a Dispossessory Warrant in Magistrate Court. If the tenant doesn't contest, the judge may issue a writ of possession quickly. Complete process: typically 3–5 weeks in Georgia.",
        },
      ],
    },
    "llc-operating-agreement": {
      requirements: [
        "Georgia LLC Act (O.C.G.A. §§ 14-11-100 et seq.) governs",
        "Operating agreement recommended but not required to be filed",
        "Annual registration due April 1 ($50 fee)",
        "Georgia net worth tax on LLCs (phased out — check current status)",
        "Registered agent with Georgia address required",
      ],
      restrictions: [
        "Series LLCs not recognized in Georgia",
        "Professional LLCs required for licensed professionals (law, medicine, etc.)",
        "LLC name must contain 'Limited Liability Company' or 'LLC'",
      ],
      faq: [
        {
          question: "Does Georgia require an LLC to have an operating agreement?",
          answer: "Georgia does not require LLCs to file an operating agreement with the state, but having a written operating agreement is essential for all multi-member LLCs and strongly recommended for single-member LLCs. Without one, Georgia's default LLC rules govern.",
        },
        {
          question: "What are the Georgia LLC annual registration requirements?",
          answer: "Georgia LLCs must file an annual registration with the Georgia Secretary of State by April 1 each year. The filing fee is $50. Failure to file by the deadline results in the LLC being administratively dissolved.",
        },
        {
          question: "What taxes does a Georgia LLC pay?",
          answer: "Georgia LLCs are pass-through entities by default — members pay Georgia income tax (up to 5.75%) on their share of profits. Georgia eliminated its net worth tax on LLCs — check with a tax professional for current obligations.",
        },
        {
          question: "Are there restrictions on LLC names in Georgia?",
          answer: "Georgia LLC names must be distinguishable from existing business entities registered in Georgia. The name must include 'Limited Liability Company,' 'LLC,' or 'L.L.C.' Certain words (bank, trust, insurance) require additional authorization.",
        },
      ],
    },
    "employment-contract": {
      requirements: [
        "Georgia at-will employment — O.C.G.A. § 34-7-1",
        "Georgia minimum wage: $5.15/hour (but federal $7.25 applies to most employers)",
        "Non-compete agreements: Restrictive Covenants Act (O.C.G.A. § 13-8-50 et seq.) — enacted 2011",
        "RCA: courts can modify overbroad non-competes and enforce them",
        "Written non-compete required; must be initialed or signed separately",
      ],
      restrictions: [
        "Rebuttable presumption: 2 years or less is reasonable for non-competes under RCA",
        "Geographic scope can include area where employee had material contact with customers",
        "Non-solicitation of customers and employees is broadly enforceable in Georgia",
      ],
      faq: [
        {
          question: "Is Georgia's minimum wage $5.15 or $7.25 per hour?",
          answer: "Georgia's state minimum wage is $5.15/hour, one of the lowest in the country. However, the federal minimum wage of $7.25/hour supersedes state law for most employers covered by the Fair Labor Standards Act, which includes businesses with $500,000+ in annual revenue or engaged in interstate commerce.",
        },
        {
          question: "How did Georgia's Restrictive Covenants Act change non-compete law?",
          answer: "Georgia's 2011 Restrictive Covenants Act (O.C.G.A. § 13-8-50) dramatically changed the state's approach. Previously, Georgia courts often voided overbroad non-competes entirely. Now, courts can modify (blue pencil) and enforce them, making non-competes much more viable for employers.",
        },
        {
          question: "What is the maximum duration for a Georgia non-compete?",
          answer: "Under the RCA, non-competes up to 2 years are presumed reasonable. Non-competes exceeding 2 years create a rebuttable presumption of unreasonableness. Courts can reduce the duration if it's excessive but the underlying interest is legitimate.",
        },
        {
          question: "Can Georgia employers restrict employee solicitation?",
          answer: "Yes. Georgia's RCA makes non-solicitation of employees and non-solicitation of customers broadly enforceable, often with fewer restrictions than the non-compete itself. Customer non-solicitation can extend to customers the employee had 'material contact' with.",
        },
      ],
    },
    "power-of-attorney": {
      requirements: [
        "Georgia Durable Power of Attorney Act (O.C.G.A. §§ 10-6B-1 et seq.) — revised 2017",
        "Must be signed by the principal before a notary public",
        "Two witnesses required (cannot be the notary, agent, or relatives of agent)",
        "Statutory form available under O.C.G.A. § 10-6B-70",
        "Healthcare decisions: separate Georgia Advance Directive for Health Care",
      ],
      restrictions: [
        "Healthcare decisions not covered — need separate Advance Directive",
        "Hot powers (gifting, trust modification) require specific grants",
        "Agent cannot amend principal's will without express authorization",
      ],
      faq: [
        {
          question: "What witnesses are required for a Georgia power of attorney?",
          answer: "Georgia requires the principal to sign before a notary public AND two witnesses. The witnesses cannot be: the notary, the agent, the agent's spouse/children/heirs, or any person who would inherit from the principal.",
        },
        {
          question: "Does Georgia recognize springing powers of attorney?",
          answer: "Yes. Georgia allows springing POAs that take effect upon a specified event (typically a physician's certification of incapacity). The triggering condition must be clearly defined in the document.",
        },
        {
          question: "How does Georgia handle healthcare powers of attorney?",
          answer: "Healthcare decisions are handled separately through a Georgia Advance Directive for Health Care (O.C.G.A. § 31-32-2). This document combines healthcare proxy (who decides) and living will (what you want) functions. A financial POA does not authorize healthcare decisions.",
        },
        {
          question: "Is a Georgia power of attorney valid in other states?",
          answer: "Generally yes — other states typically honor a properly executed Georgia POA. However, financial institutions in other states may have their own form requirements. For real estate transactions in another state, consult local counsel.",
        },
      ],
    },
    "last-will-and-testament": {
      requirements: [
        "O.C.G.A. § 53-4-20 et seq. governs will execution in Georgia",
        "Two competent witnesses required — must sign in testator's presence",
        "Testator must sign or acknowledge signature in presence of both witnesses",
        "Self-proving affidavit available (O.C.G.A. § 53-4-24) — recommended",
        "Holographic wills: NOT valid in Georgia unless entirely handwritten AND witnessed",
      ],
      restrictions: [
        "No right of election for spouses (Georgia abolished this in 2010)",
        "Year's support: surviving spouse and minor children can petition for year's support from estate",
        "Georgia estate tax: none (follows federal exemption)",
      ],
      faq: [
        {
          question: "Can I disinherit my spouse in Georgia?",
          answer: "Largely yes. Unlike most states, Georgia eliminated the elective share (forced heirship for spouses) in 2010. However, surviving spouses and minor children can petition the probate court for 'year's support' — a priority claim against the estate for living expenses.",
        },
        {
          question: "How does Georgia probate work?",
          answer: "Georgia wills are submitted to the Probate Court of the county where the deceased lived. Georgia offers 'solemn form probate' (formal, requiring notice to heirs) and 'common form probate' (informal, no notice required). Common form is faster but more vulnerable to challenge.",
        },
        {
          question: "Does Georgia have a small estate affidavit process?",
          answer: "Yes. Georgia allows a 'Year's Support' petition and small estate affidavits for estates under $10,000. For bank accounts and vehicles, specific forms can transfer assets without formal probate.",
        },
        {
          question: "What are the witness requirements for a Georgia will?",
          answer: "Two competent witnesses (over age 14) must watch the testator sign (or acknowledge the signature) and then sign the will themselves in the testator's presence. Witnesses should not be named in the will, as it could affect their bequest or credibility.",
        },
      ],
    },
    "non-compete-agreement": {
      requirements: [
        "Governed by Georgia Restrictive Covenants Act (O.C.G.A. § 13-8-50 et seq.)",
        "Must be written — oral non-competes are not enforceable",
        "Must include specific geographic territory or scope of activity",
        "Must be for a legitimate business interest (trade secrets, customer relationships, confidential info)",
        "Courts can reform and enforce overbroad agreements",
      ],
      restrictions: [
        "Agreements over 2 years create rebuttable presumption of unreasonableness",
        "Geographic scope: courts look at where employee had customer contact",
        "Non-competes for employees terminated without cause may face higher scrutiny",
      ],
      faq: [
        {
          question: "What changed about Georgia non-compete law in 2011?",
          answer: "Before 2011, Georgia courts often voided non-compete agreements that were even slightly overbroad. The 2011 Restrictive Covenants Act changed this: courts can now reform overbroad non-competes to be reasonable and enforce them, making them viable tools for Georgia employers.",
        },
        {
          question: "Does Georgia's RCA apply to all workers?",
          answer: "The RCA applies differently based on the employee's category: (1) 'key employees' (regularly exercising management or professional authority) get full RCA protection; (2) other employees have lower protection thresholds. Sales employees are treated as key employees if they regularly access customer data.",
        },
        {
          question: "Can a Georgia non-compete define geography by customer contacts?",
          answer: "Yes. One of the innovations of Georgia's RCA is allowing the geographic area to be defined as 'the territory in which the employee had material contact with customers' — this is more flexible than traditional city/county/state boundaries.",
        },
        {
          question: "What consideration is required for a Georgia non-compete?",
          answer: "For new employees, the job offer itself is sufficient consideration. For existing employees signing new non-competes, Georgia requires additional consideration — a raise, promotion, access to trade secrets, or other tangible benefit. Continued employment alone is insufficient for existing employees.",
        },
      ],
    },
    "independent-contractor-agreement": {
      requirements: [
        "Georgia uses control test to distinguish employees from contractors",
        "Georgia self-employment tax: contractors pay self-employment taxes federally",
        "No specific written contract requirements in Georgia (unlike NY)",
        "Construction: Georgia Department of Labor scrutinizes contractor vs. employee classification",
        "Contractors must obtain their own business licenses if applicable",
      ],
      restrictions: [
        "Misclassification triggers Georgia DOL unemployment tax liability",
        "Workers' compensation: contractors generally exempt unless hiring party controls work method",
        "Professional licenses: some professions require the contracting party to verify license status",
      ],
      faq: [
        {
          question: "How does Georgia classify independent contractors?",
          answer: "Georgia uses the right-to-control test: whether the hiring party controls not just the result but the manner and means of performing the work. Factors include: control of work hours, provision of tools, payment method, and whether the work is part of the regular business.",
        },
        {
          question: "What are the consequences of misclassifying a worker in Georgia?",
          answer: "The Georgia Department of Labor can assess back unemployment insurance contributions. Misclassified workers may file claims for wages, overtime, and workers' compensation benefits. The IRS may also assess federal payroll taxes and penalties.",
        },
        {
          question: "Does Georgia require independent contractor agreements to be in writing?",
          answer: "No Georgia law requires a written independent contractor agreement, but having a written contract is strongly recommended. It documents the independent status, scope of work, payment terms, and IP ownership — all critical if the classification is later challenged.",
        },
        {
          question: "Can a Georgia independent contractor agreement include a non-compete?",
          answer: "Yes, subject to the Georgia Restrictive Covenants Act. Non-competes in contractor agreements must protect a legitimate business interest (trade secrets, customer relationships) and be reasonable in time and scope. The consideration must be something beyond just the contract itself.",
        },
      ],
    },
    "commercial-lease-agreement": {
      requirements: [
        "No statewide commercial rent control in Georgia",
        "O.C.G.A. § 44-7-1 et seq. governs landlord-tenant relationships",
        "No mandatory disclosure requirements for commercial landlords",
        "Landlord's lien: Georgia statutory lien for unpaid rent",
        "Dispossessory process available for commercial tenants",
      ],
      restrictions: [
        "Distress warrant: landlord can apply for court order to seize tenant property for unpaid rent",
        "Force majeure clauses critical after COVID-19 litigation",
        "ADA compliance: specify responsibility in lease",
      ],
      faq: [
        {
          question: "How fast is commercial eviction in Georgia?",
          answer: "Georgia's dispossessory process for commercial tenants is relatively efficient. After proper notice, the landlord files in Magistrate Court. If the tenant doesn't contest, judgment can occur within 2-3 weeks. Contested cases take longer but Georgia courts generally move at a moderate pace.",
        },
        {
          question: "What is a distress warrant in a Georgia commercial lease?",
          answer: "Under O.C.G.A. § 44-14-340, a landlord can apply for a distress warrant to seize the tenant's personal property on the leased premises to secure unpaid rent. This is a powerful remedy available to Georgia commercial landlords.",
        },
        {
          question: "Are there disclosure requirements for Georgia commercial landlords?",
          answer: "Georgia law does not impose specific commercial landlord disclosure requirements. However, failure to disclose known material defects can result in fraud liability. Include representations about the physical condition in the lease itself.",
        },
        {
          question: "How should a Georgia commercial lease address force majeure?",
          answer: "After COVID-19, Georgia courts interpreted force majeure clauses narrowly — economic hardship alone didn't excuse performance. Drafting a strong force majeure clause should specifically enumerate covered events (pandemics, government shutdowns) and define the consequences (payment deferral, termination right).",
        },
      ],
    },
    "promissory-note": {
      requirements: [
        "Georgia usury: 7% for simple contracts (O.C.G.A. § 7-4-2); 16% for written notes",
        "Commercial loans between businesses: generally not subject to usury limits above 16%",
        "Statute of limitations: 6 years for written contracts (O.C.G.A. § 9-3-24)",
        "Licensed lenders subject to Georgia Industrial Loan Act",
        "Real estate secured notes: security deed must be recorded",
      ],
      restrictions: [
        "Interest above 16% on written consumer notes may be usurious",
        "Payday loans: Georgia banned most payday lending — Industrial Loan Act restrictions",
        "Security deed (not mortgage) is Georgia's primary instrument for real estate-secured notes",
      ],
      faq: [
        {
          question: "What is Georgia's usury limit for promissory notes?",
          answer: "Georgia allows up to 7% interest when no rate is specified; for written agreements, 16% is the general limit for consumer transactions. Commercial loans between businesses typically face fewer restrictions. Licensed banks and finance companies are generally exempt.",
        },
        {
          question: "Why does Georgia use a security deed instead of a mortgage?",
          answer: "Georgia uses a security deed (deed to secure debt) rather than a traditional mortgage. The lender actually takes legal title to the property as security. This makes foreclosure faster in Georgia — non-judicial foreclosure can proceed without court involvement.",
        },
        {
          question: "How long do I have to sue on a Georgia promissory note?",
          answer: "O.C.G.A. § 9-3-24 provides 6 years to bring an action on a written contract (including promissory notes). The clock starts running from the date of breach or default.",
        },
        {
          question: "Can I include a confession of judgment in a Georgia promissory note?",
          answer: "Cognovit notes (confession of judgment) are generally not valid in Georgia for consumer debts. For commercial debts, they are theoretically valid but rarely used because Georgia courts scrutinize them carefully and they face constitutional due process challenges.",
        },
      ],
    },
    "demand-letter": {
      requirements: [
        "No statutory form required in Georgia",
        "Small claims (Magistrate Court): up to $15,000",
        "Georgia Fair Business Practices Act (O.C.G.A. § 10-1-390 et seq.) — 30-day demand before filing unfair trade practices suit",
        "Construction defect: 30-day notice before suit under Right to Repair Act",
        "Dishonored check: 10-day demand letter before criminal bad check complaint",
      ],
      restrictions: [
        "Cannot threaten criminal action to collect civil debt",
        "Cannot misrepresent amount owed or legal status",
        "Georgia Fair Business Practices Act: 30-day notice required before suit for FBPA claims",
      ],
      faq: [
        {
          question: "What is Georgia's Magistrate Court limit for small claims?",
          answer: "Georgia Magistrate Courts handle civil claims up to $15,000. No attorney is required for small claims. For amounts between $15,000 and $25,000, file in State Court or Superior Court depending on the county.",
        },
        {
          question: "Does the Georgia Fair Business Practices Act require a demand letter?",
          answer: "Yes. O.C.G.A. § 10-1-399 requires plaintiffs to send a 30-day demand letter before filing suit under the FBPA. The letter must describe the unfair or deceptive act, the injury sustained, and the relief requested. Courts can dismiss suits filed without this notice.",
        },
        {
          question: "How do I collect a bad check in Georgia?",
          answer: "Send a demand letter allowing at least 10 days to make the check good. Include the check amount plus a $30 bad check fee. If the maker still doesn't pay, you can file a civil suit in Magistrate Court or (for intentional fraud) file a criminal bad check complaint.",
        },
        {
          question: "What is Georgia's statute of limitations for contract claims?",
          answer: "O.C.G.A. § 9-3-24 gives 6 years to bring suit on a written contract. Oral contracts have a 4-year limitation (§ 9-3-26). A demand letter does not toll the statute of limitations — if close to the deadline, file suit first and settle later.",
        },
      ],
    },
  },

  // ── Illinois ─────────────────────────────────────────────────────────────
  illinois: {
    "residential-lease-agreement": {
      requirements: [
        "Chicago Residential Landlord and Tenant Ordinance (RLTO) applies to most Chicago rentals",
        "Chicago RLTO: landlord must pay interest on security deposits held more than 6 months",
        "Security deposit must be returned within 30 days with itemized list of deductions",
        "Required: written receipt for security deposit within 14 days (Chicago RLTO §5-12-080)",
        "Required: summary of RLTO attached to lease for Chicago properties",
        "Smoke and carbon monoxide detector requirements under state law",
      ],
      restrictions: [
        "Chicago RLTO: late fees limited to $10/month on first $500 rent plus 5% on remainder",
        "Chicago: 30-day notice required to terminate month-to-month tenancy",
        "Retaliatory evictions prohibited — tenant can use as affirmative defense",
      ],
      noticeRequirements: "Chicago: 30 days' written notice to terminate month-to-month tenancy",
      faq: [
        {
          question: "Does Chicago have special landlord-tenant laws beyond Illinois state law?",
          answer: "Yes. The Chicago Residential Landlord and Tenant Ordinance (RLTO) imposes additional requirements for Chicago rental properties, including mandatory security deposit interest, RLTO summary attachment, strict deduction itemization, and enhanced tenant remedies for violations.",
        },
        {
          question: "Is a landlord required to pay interest on security deposits in Illinois?",
          answer: "Under the Chicago RLTO, landlords holding security deposits for more than 6 months must pay annual interest at the rate set by the Chicago City Comptroller. This requirement applies to Chicago rentals only — there is no statewide security deposit interest requirement.",
        },
        {
          question: "What notice is required to end a lease in Illinois?",
          answer: "For month-to-month tenancies in Chicago, 30 days' written notice is required by either party. Illinois state law requires notice equal to the rental payment period for month-to-month tenancies outside Chicago. For annual leases, the lease terms govern.",
        },
        {
          question: "Can a Chicago landlord charge late fees?",
          answer: "Yes, but the Chicago RLTO limits late fees: $10/month on the first $500 of rent, plus 5% on any amount above $500. This applies to Chicago rentals. Landlords outside Chicago can charge reasonable late fees as specified in the lease.",
        },
      ],
    },
    "llc-operating-agreement": {
      requirements: [
        "Illinois LLC Act (805 ILCS 180): operating agreement governs internal affairs",
        "Annual Report due before the first day of the LLC's anniversary month ($75 fee)",
        "Illinois flat income tax: 4.95% on members' share of LLC income",
        "Registered agent with Illinois address required",
        "Series LLCs recognized in Illinois — a single LLC can have protected series",
      ],
      restrictions: [
        "LLC name must include 'Limited Liability Company,' 'L.L.C.,' or 'LLC'",
        "Professional services LLCs require additional licensing compliance",
        "Foreign LLCs must register before conducting business in Illinois",
      ],
      faq: [
        {
          question: "Does Illinois require an LLC operating agreement?",
          answer: "Illinois does not require an operating agreement to be filed with the state, but it is strongly recommended. Without one, the Illinois LLC Act's default rules govern — which may not align with member intentions, especially regarding profit sharing and management authority.",
        },
        {
          question: "What is Illinois's LLC annual report requirement?",
          answer: "Illinois LLCs must file an annual report with the Secretary of State. The report is due before the first day of the LLC's anniversary month (the month it was formed). The filing fee is $75. Late filing results in penalties and eventual dissolution.",
        },
        {
          question: "Are series LLCs available in Illinois?",
          answer: "Yes. Illinois was one of the first states to recognize series LLCs. Each series can hold separate assets and have its own members and operating agreement, with liability protection between series. The Illinois LLC Act (805 ILCS 180/37-40) governs series LLCs.",
        },
        {
          question: "What is the Illinois income tax rate for LLC members?",
          answer: "Illinois has a flat individual income tax rate of 4.95%, which applies to members' share of LLC income. Illinois also imposes a personal property replacement tax of 1.5% on LLC income. Members must file Illinois Schedule K-1-P for pass-through income.",
        },
      ],
    },
    "employment-contract": {
      requirements: [
        "Illinois minimum wage: $14/hour (2024); rises to $15/hour January 1, 2025",
        "Illinois Freedom to Work Act (IFWA, 820 ILCS 90): governs non-compete and non-solicitation agreements",
        "IFWA: non-competes require $75,000+ annual earnings; non-solicitation requires $45,000+",
        "IFWA: employer must advise employees to consult an attorney before signing",
        "IFWA: 14-day review period required before employee must sign",
        "Illinois Human Rights Act: broad protected classes including marital status and ancestry",
      ],
      restrictions: [
        "Non-competes cannot exceed 2 years under IFWA",
        "Non-solicitation of employees or customers also regulated by IFWA",
        "Salary history: Chicago and Cook County ban asking about prior compensation",
      ],
      faq: [
        {
          question: "What is Illinois's minimum wage in 2024 and 2025?",
          answer: "Illinois minimum wage is $14/hour in 2024 and rises to $15/hour on January 1, 2025. Chicago's minimum wage is higher — $15.80/hour for large employers (2024). The state minimum will match $15 beginning in 2025 per the 2019 Minimum Wage Law.",
        },
        {
          question: "What does the Illinois Freedom to Work Act require for non-compete agreements?",
          answer: "Under the IFWA (effective January 1, 2022): the employee must earn at least $75,000/year for a non-compete or $45,000/year for a non-solicitation clause. The employer must advise the employee in writing to consult an attorney and provide a 14-day review period. Non-competes cannot exceed 2 years.",
        },
        {
          question: "Does Illinois require 'garden leave' for non-compete agreements?",
          answer: "The Illinois Freedom to Work Act requires employers to provide 'adequate consideration' for non-competes, defined as 2+ years of continued employment after signing, or a sum equivalent to the employee's base salary during the restricted period (garden leave), or some other consideration.",
        },
        {
          question: "Can Illinois employers ask about salary history?",
          answer: "Cook County and Chicago ban employers from asking about an applicant's prior salary history. Statewide, Illinois's Equal Pay Act prohibits using salary history to set compensation in ways that perpetuate pay disparities. Best practice is to avoid salary history inquiries entirely.",
        },
      ],
    },
    "power-of-attorney": {
      requirements: [
        "Illinois Power of Attorney Act (755 ILCS 45): governs property and healthcare POAs",
        "Must be signed by the principal before one witness",
        "Notarization strongly recommended (required for real estate transactions)",
        "Statutory short form available under 755 ILCS 45/3-3 (property) and 45/4-10 (healthcare)",
        "Agent must sign acknowledgment of duties",
      ],
      restrictions: [
        "The witness cannot be the agent, the agent's spouse, children, or heirs of the principal",
        "Healthcare POA: agent cannot be the principal's healthcare provider",
        "Real estate transactions require recorded POA acknowledged before notary",
      ],
      faq: [
        {
          question: "Does an Illinois power of attorney need to be notarized?",
          answer: "Illinois law requires one witness signature. Notarization is not technically required for a POA to be valid, but it is strongly recommended. For real estate transactions and real property transfers, the POA must be acknowledged before a notary to be recorded with the county recorder.",
        },
        {
          question: "What is the Illinois Statutory Short Form Power of Attorney?",
          answer: "Illinois provides a Statutory Short Form under 755 ILCS 45/3-3 for property matters. Using this form creates a presumption that the document is valid and third parties (banks, financial institutions) are more likely to accept it without question.",
        },
        {
          question: "How do I create a healthcare power of attorney in Illinois?",
          answer: "Illinois requires a separate Healthcare Power of Attorney under 755 ILCS 45/4-10. It must be signed before one witness who is not the designated agent. The agent makes medical decisions when you are unable to do so yourself.",
        },
        {
          question: "When does an Illinois power of attorney become effective?",
          answer: "An Illinois POA is effective immediately upon signing unless you specify that it becomes effective upon your incapacity (a 'springing' POA). Illinois recognizes both types. Durable POAs remain effective even if you become incapacitated — include the durability language explicitly.",
        },
      ],
    },
    "last-will-and-testament": {
      requirements: [
        "Illinois Compiled Statutes 755 ILCS 5/4-3 governs will execution",
        "Two credible witnesses required — must sign at testator's request",
        "Testator must sign in the presence of both witnesses (or acknowledge prior signature)",
        "Self-proving affidavit speeds probate — recommended",
        "Testator must be 18+ and of sound mind",
      ],
      restrictions: [
        "Holographic wills are NOT recognized in Illinois — must be witnessed",
        "Elective share: surviving spouse entitled to 1/3 of estate if children exist; 1/2 if no children",
        "Illinois estate tax applies to estates over $4 million (2024)",
      ],
      faq: [
        {
          question: "Does Illinois have a state estate tax?",
          answer: "Yes. Illinois imposes a separate estate tax on estates exceeding $4 million (not indexed for inflation). The tax rate ranges from 0.8% to 16%. This threshold is significantly lower than the federal $13.61 million exemption, making Illinois estate planning important for moderately affluent individuals.",
        },
        {
          question: "What is the elective share for a surviving spouse in Illinois?",
          answer: "Under 755 ILCS 5/2-8, a surviving spouse can elect to receive 1/3 of the estate if the decedent left descendants, or 1/2 if there are no descendants. This prevents a spouse from being completely disinherited.",
        },
        {
          question: "Are holographic wills valid in Illinois?",
          answer: "No. Illinois does not recognize holographic wills (handwritten, unwitnessed wills). An Illinois will must be witnessed by two credible adults who are present when the testator signs or acknowledges the will. Always use a typed, witnessed will in Illinois.",
        },
        {
          question: "How does Illinois probate work?",
          answer: "Illinois wills are admitted to probate in the Circuit Court of the county where the decedent lived. Illinois offers supervised and independent administration. Small estates (under $100,000, no real estate) can use an affidavit process to avoid probate entirely.",
        },
      ],
    },
    "non-compete-agreement": {
      requirements: [
        "Illinois Freedom to Work Act (820 ILCS 90), effective January 1, 2022",
        "Minimum salary threshold: $75,000/year for non-competes; $45,000 for non-solicitation",
        "Employer must provide 14-day review period before employee must sign",
        "Employer must advise employee in writing to consult an attorney",
        "Must provide 'adequate consideration' — 2 years continued employment or equivalent payment",
      ],
      restrictions: [
        "Non-competes cannot exceed 2 years in duration",
        "Illinois courts scrutinize both duration and geographic scope",
        "Non-competes for workers earning under $75,000 are void and unenforceable",
      ],
      faq: [
        {
          question: "Can an Illinois employer use a non-compete with any employee?",
          answer: "No. Illinois's Freedom to Work Act restricts non-competes to employees earning at least $75,000/year. For non-solicitation agreements (restricting solicitation of customers or co-workers), the threshold is $45,000/year. Non-competes for employees below these thresholds are void.",
        },
        {
          question: "What consideration is required for an Illinois non-compete?",
          answer: "The Illinois Freedom to Work Act requires 'adequate consideration,' which can be: (1) continued employment for 2 or more years after signing, (2) payment equivalent to the base salary during the restricted period (garden leave), or (3) other mutually agreed consideration of value.",
        },
        {
          question: "How does Illinois handle overbroad non-compete agreements?",
          answer: "Illinois courts apply the 'rule of reason' and may 'blue pencil' (modify) an overbroad non-compete to make it reasonable, or void it entirely. The Freedom to Work Act also grants courts discretion to reform unenforceable provisions rather than voiding the entire agreement.",
        },
        {
          question: "What are the penalties for violating the Illinois Freedom to Work Act?",
          answer: "Employers who violate the IFWA (e.g., including non-competes for employees earning below the threshold) can be liable for employee attorneys' fees in any litigation to void the non-compete. The Illinois Attorney General can also seek civil penalties against repeat violators.",
        },
      ],
    },
    "independent-contractor-agreement": {
      requirements: [
        "Illinois uses the 'economic reality test' for contractor classification",
        "Illinois Employee Classification Act (820 ILCS 185): construction-specific misclassification rules",
        "Employee Classification Act: civil penalties up to $1,500 per misclassified worker per violation",
        "Illinois Wage Payment and Collection Act covers payment timing for contractors",
        "Written agreement recommended — should clearly establish independent status",
      ],
      restrictions: [
        "Construction workers: presumed employees unless meeting strict independent contractor tests",
        "Willful misclassification in construction: criminal penalties under Illinois law",
        "Misclassification triggers Illinois DOL unemployment tax, workers' comp, and income tax liability",
      ],
      faq: [
        {
          question: "What is Illinois's Employee Classification Act?",
          answer: "Illinois's Employee Classification Act (820 ILCS 185) specifically addresses the construction industry. It creates a rebuttable presumption that construction workers are employees, not contractors. Employers must meet strict tests to classify construction workers as independent contractors.",
        },
        {
          question: "What factors does Illinois use to determine contractor status?",
          answer: "Illinois uses the economic reality test, examining: degree of control, permanency of the relationship, opportunity for profit or loss, investment in equipment, whether the work is integral to the business, and skill required. The more economically dependent the worker, the more likely they're an employee.",
        },
        {
          question: "What are the penalties for misclassifying workers in Illinois?",
          answer: "Under the Employee Classification Act, Illinois can impose civil penalties up to $1,500 per employee per violation ($2,500 for repeat violations). Criminal penalties apply for willful misclassification. Back taxes, workers' comp assessments, and benefit claims can also result.",
        },
        {
          question: "Does Illinois require written independent contractor agreements?",
          answer: "No statute mandates written contracts for all independent contractors. However, the Illinois Freelance Worker Protection Act (effective July 1, 2024) requires written contracts for freelance services of $500 or more, with payment within 30 days of completion.",
        },
      ],
    },
    "commercial-lease-agreement": {
      requirements: [
        "No statewide commercial rent control in Illinois (Chicago RLTO is residential only)",
        "Illinois Forcible Entry and Detainer Act governs commercial eviction",
        "5-day notice for non-payment of commercial rent before filing eviction",
        "Chicago: landlord must provide written notice of lease non-renewal 60 days before expiration (for Chicago commercial leases over 1 year)",
        "Personal guarantee: common for new businesses; document with care",
      ],
      restrictions: [
        "Chicago Real Property Transfer Tax applies on lease assignments",
        "Retaliatory eviction claims can arise even in commercial context if improper motive",
        "Net lease: CAM (common area maintenance) provisions should be clearly defined",
      ],
      faq: [
        {
          question: "How does commercial eviction work in Illinois?",
          answer: "For non-payment of commercial rent in Illinois, the landlord must serve a 5-day notice to pay rent or vacate. After 5 days, the landlord can file a forcible entry and detainer (eviction) action in Circuit Court. Cook County courts can be slower — contested evictions may take weeks to months.",
        },
        {
          question: "Does Chicago impose a Real Property Transfer Tax on commercial leases?",
          answer: "Yes. Chicago's Real Property Transfer Tax applies to leases with terms exceeding 99 years and to lease assignments. For ordinary commercial leases, the transfer tax typically does not apply, but consult counsel when assigning or transferring long-term commercial leases in Chicago.",
        },
        {
          question: "Is commercial rent controlled in Illinois or Chicago?",
          answer: "No. The Chicago Residential Landlord and Tenant Ordinance (RLTO) applies only to residential properties. Commercial leases in Chicago and throughout Illinois are not subject to rent control — all terms, including rent and escalation schedules, are freely negotiated.",
        },
        {
          question: "What should an Illinois commercial lease say about CAM charges?",
          answer: "Common area maintenance (CAM) charges should be precisely defined — which costs are includable, how they're calculated, whether there are annual caps, and the tenant's audit rights. Illinois courts enforce CAM provisions as written, so specificity protects both parties.",
        },
      ],
    },
    "promissory-note": {
      requirements: [
        "Illinois Interest Act (815 ILCS 205): governs interest rates on loans",
        "Default interest rate: 5% per year if no rate is stated",
        "Written notes: parties can agree to any rate not exceeding 9% unless exempt",
        "Licensed lenders (banks, credit unions) are exempt from Illinois usury limits",
        "Statute of limitations: 10 years on written instruments (735 ILCS 5/13-206) — reduced to 5 years effective 2024 for newly filed cases",
      ],
      restrictions: [
        "Interest exceeding 9% from unlicensed lenders may be usurious",
        "Payday loans: Illinois Payday Loan Reform Act caps rates at 99% APR (though still high)",
        "Consumer installment loans: additional Consumer Installment Loan Act requirements",
      ],
      faq: [
        {
          question: "What interest rate can I charge on an Illinois promissory note?",
          answer: "The Illinois Interest Act allows parties to agree to any rate in a written promissory note, but unlicensed lenders are generally limited to 9% per year for personal loans. Commercial loans between businesses are less restricted. Licensed financial institutions are exempt from usury limits.",
        },
        {
          question: "How long do I have to collect on an Illinois promissory note?",
          answer: "Illinois traditionally provided a 10-year statute of limitations for written contracts (735 ILCS 5/13-206). For promissory notes signed after January 1, 2024, the limitations period is 5 years under recent legislative reforms. Verify the applicable period for your specific note.",
        },
        {
          question: "Does an Illinois promissory note need to be notarized?",
          answer: "Notarization is not required for an Illinois promissory note to be enforceable. However, if the note is secured by real estate (via a mortgage), the mortgage must be acknowledged before a notary and recorded with the county recorder's office to perfect the lien.",
        },
        {
          question: "What is the default interest rate in Illinois if no rate is specified?",
          answer: "Under the Illinois Interest Act (815 ILCS 205/4), if a written contract does not specify an interest rate, the legal rate is 5% per year. For judgments and other legally compelled obligations, the rate is also 9% per year unless a court orders otherwise.",
        },
      ],
    },
    "demand-letter": {
      requirements: [
        "No statutory form required",
        "Small claims: Circuit Court handles claims up to $10,000 in most Illinois counties",
        "Illinois Consumer Fraud and Deceptive Business Practices Act (815 ILCS 505): 30-day demand before suit",
        "Construction defects: 60-day notice before suit under Right to Repair Act (765 ILCS 77)",
        "Collections: must comply with Illinois Collection Agency Act if a third-party collector",
      ],
      restrictions: [
        "Cannot threaten criminal prosecution to collect a civil debt",
        "Cannot misrepresent amount owed or legal status of debt",
        "Illinois Consumer Fraud Act prohibits unfair or deceptive practices in collection attempts",
      ],
      faq: [
        {
          question: "What is the small claims limit in Illinois?",
          answer: "Illinois small claims courts (in the Circuit Court) handle cases up to $10,000. Cook County (Chicago) also handles small claims up to $10,000. The procedures are simplified and designed for self-represented parties. For amounts over $10,000, file in the regular civil division.",
        },
        {
          question: "Does the Illinois Consumer Fraud Act require a pre-suit demand?",
          answer: "The Illinois Consumer Fraud and Deceptive Business Practices Act (815 ILCS 505) does not explicitly require a pre-suit demand, but courts look favorably on good-faith attempts to resolve disputes. Additionally, many litigants send demand letters to trigger the defendant's opportunity to cure and document the violation.",
        },
        {
          question: "Can I recover attorney fees in an Illinois demand letter claim?",
          answer: "Attorney fees are generally not recoverable in Illinois contract disputes unless the contract provides for them. However, under the Illinois Consumer Fraud Act, prevailing consumers can recover attorney fees. Specify the contractual or statutory basis for fee recovery in your demand letter.",
        },
        {
          question: "What is Illinois's statute of limitations for breach of contract?",
          answer: "Illinois allows 10 years to sue on a written contract and 5 years for oral contracts (735 ILCS 5/13-206). However, recent legislation is reducing the written contract period. A demand letter does not toll the limitations period — file suit before the deadline if negotiations stall.",
        },
      ],
    },
  },

  // ── Pennsylvania ──────────────────────────────────────────────────────────
  pennsylvania: {
    "residential-lease-agreement": {
      requirements: [
        "PA Landlord and Tenant Act (68 P.S. §§ 250.101 et seq.) governs",
        "Security deposit: capped at 2 months' rent for first year; 1 month thereafter",
        "Security deposit must be returned within 30 days of tenancy termination",
        "Required: itemized list of deductions with any security deposit return",
        "Philadelphia Fair Housing Commission has additional local requirements",
      ],
      restrictions: [
        "Philadelphia: first-source hiring requirements for new residential developments",
        "No statewide rent control — Harrisburg, Philadelphia, Pittsburgh have all been preempted by state law",
        "10-day notice for non-payment of rent before filing eviction",
      ],
      noticeRequirements: "15 days' notice to terminate month-to-month tenancy (PA state law)",
      faq: [
        {
          question: "What is Pennsylvania's security deposit limit?",
          answer: "Pennsylvania's Landlord and Tenant Act caps security deposits at 2 months' rent during the first year of tenancy. After 1 year, the deposit cap drops to 1 month's rent — if the landlord holds more than 1 month at the end of year one, they must return the excess to the tenant.",
        },
        {
          question: "How quickly must a Pennsylvania landlord return a security deposit?",
          answer: "A Pennsylvania landlord must return the security deposit within 30 days of the tenant vacating the unit, along with a written itemized list of any deductions. Failure to do so forfeits the landlord's right to the deposit and may expose them to double damages.",
        },
        {
          question: "Is there rent control in Pennsylvania?",
          answer: "No. Pennsylvania state law preempts local rent control ordinances. Philadelphia, Pittsburgh, and other cities cannot impose rent control on residential landlords. All rent amounts and increases are freely negotiated between landlord and tenant.",
        },
        {
          question: "What notice is required for eviction in Pennsylvania?",
          answer: "For non-payment of rent, Pennsylvania requires a 10-day written notice to pay or vacate. For other lease violations, 15 days' notice is standard. After proper notice, the landlord files a complaint with the Magisterial District Judge. The process typically takes 4–8 weeks.",
        },
      ],
    },
    "llc-operating-agreement": {
      requirements: [
        "Pennsylvania Association Code (15 Pa. C.S. §§ 8811-8893) governs LLCs",
        "Certificate of Organization filed with PA Department of State ($125 fee)",
        "No annual report required (decennial report due every 10 years — $70 fee)",
        "Pennsylvania personal income tax: 3.07% on members' share of LLC income",
        "Registered agent with Pennsylvania address required",
      ],
      restrictions: [
        "No series LLCs in Pennsylvania — must form separate entities",
        "Professional LLCs (PLLCs) required for licensed professionals",
        "LLC name must include 'Limited Liability Company,' 'LLC,' or 'L.L.C.'",
      ],
      faq: [
        {
          question: "Does Pennsylvania require an LLC operating agreement?",
          answer: "Pennsylvania does not require an LLC operating agreement to be filed with the state, but the PA Association Code allows members to adopt one. Without an operating agreement, the statutory default rules apply — often not what members intend, especially for profit sharing and management.",
        },
        {
          question: "What are the annual requirements for a Pennsylvania LLC?",
          answer: "Pennsylvania LLCs do not file annual reports. Instead, they must file a decennial report every 10 years (in years ending in '1') to remain in good standing. The fee is $70. LLCs must also maintain a registered agent in Pennsylvania.",
        },
        {
          question: "What is the Pennsylvania corporate net income tax for LLCs?",
          answer: "Single-member LLCs are treated as disregarded entities for PA tax purposes. Multi-member LLCs are generally taxed as partnerships, with members paying PA's 3.07% personal income tax on their share. PA also has a Capital Stock/Franchise Tax that may apply to LLC assets.",
        },
        {
          question: "How does Pennsylvania's PA Association Code affect LLC operations?",
          answer: "The PA Association Code (effective 2017) modernized Pennsylvania LLC law. It clarified that operating agreements can modify most default rules, including management authority, profit/loss allocation, and dissolution procedures. Courts defer to properly drafted operating agreements.",
        },
      ],
    },
    "employment-contract": {
      requirements: [
        "Pennsylvania at-will employment: either party can terminate without cause",
        "Pennsylvania minimum wage: $7.25/hour (federal rate — PA has not raised state minimum wage since 2009)",
        "Philadelphia minimum wage: $15.37/hour (2024) for employers with 6+ employees",
        "Non-compete agreements: enforceable under common law if reasonable",
        "PA Human Relations Act: broader protected classes than federal law",
      ],
      restrictions: [
        "Non-competes must be reasonable in duration, geographic scope, and protected interest",
        "Signing non-compete as condition of existing employment requires additional consideration",
        "Philadelphia ban-the-box ordinance: restrictions on criminal history inquiries",
      ],
      faq: [
        {
          question: "What is Pennsylvania's minimum wage in 2024?",
          answer: "Pennsylvania's statewide minimum wage remains at $7.25/hour — the federal rate — because PA has not passed a state minimum wage increase since 2009. Philadelphia has a higher local minimum wage of $15.37/hour (2024) for covered employers. Pittsburgh's ordinance was preempted.",
        },
        {
          question: "Are non-compete agreements enforceable in Pennsylvania?",
          answer: "Yes, under Pennsylvania common law. Courts apply a reasonableness test: the non-compete must be ancillary to an employment relationship, supported by adequate consideration, and reasonable in duration, geographic scope, and restricted activities. PA courts do not blue-pencil — overbroad covenants are often voided entirely.",
        },
        {
          question: "Does Pennsylvania require additional consideration for mid-employment non-competes?",
          answer: "Yes. If an employer asks an existing employee to sign a non-compete (rather than presenting it as a condition of hiring), Pennsylvania courts require additional consideration beyond continued employment — such as a promotion, raise, bonus, or access to confidential information.",
        },
        {
          question: "What does Philadelphia's ban-the-box ordinance require?",
          answer: "Philadelphia's Fair Criminal Record Screening Standards ordinance prohibits employers from asking about criminal history on initial job applications. Employers can only conduct background checks after a conditional offer of employment has been made.",
        },
      ],
    },
    "power-of-attorney": {
      requirements: [
        "Pennsylvania Power of Attorney Act (20 Pa. C.S. §§ 5601 et seq.) governs",
        "Must be signed by principal before a notary public AND two adult witnesses",
        "Principal must sign a 'Notice to Principal' before execution",
        "Agent must sign 'Acknowledgment by Agent' before acting",
        "Third parties (banks) must accept a properly executed PA POA",
      ],
      restrictions: [
        "Witnesses cannot be: the notary, the agent, the agent's relatives, or anyone named in the POA",
        "Healthcare decisions require a separate PA Healthcare Power of Attorney",
        "Real estate transactions: POA must be recorded with county recorder of deeds",
      ],
      faq: [
        {
          question: "What are the execution requirements for a Pennsylvania power of attorney?",
          answer: "Pennsylvania has strict execution requirements: (1) the principal must sign before a notary, (2) two adult witnesses must also sign (who cannot be the notary, the agent, or the agent's relatives), (3) the principal must receive a statutory 'Notice to Principal' before signing, and (4) the agent must sign an 'Acknowledgment' before exercising any authority.",
        },
        {
          question: "What is the Pennsylvania 'Notice to Principal' requirement?",
          answer: "Pennsylvania law requires that before signing a POA, the principal must receive a statutory written notice explaining the importance and risks of the document. This notice must be signed by the principal and attached to the POA. Its purpose is to prevent undue influence and ensure informed consent.",
        },
        {
          question: "Can a Pennsylvania POA be used for real estate transactions?",
          answer: "Yes, but the POA must expressly grant real estate authority and must be recorded with the Recorder of Deeds in the county where the property is located before it can be used to convey or mortgage real property.",
        },
        {
          question: "Does a Pennsylvania POA survive incapacity?",
          answer: "Only if it includes the durability clause required by 20 Pa. C.S. § 5604(b): 'This power of attorney shall not be affected by subsequent disability or incapacity of the principal.' Without this language, the POA terminates automatically upon the principal's incapacity.",
        },
      ],
    },
    "last-will-and-testament": {
      requirements: [
        "Pennsylvania Consolidated Statutes Title 20 §§ 2501-2514 govern will execution",
        "Two witnesses required — must sign in testator's presence",
        "Testator must be at least 18 years old",
        "Self-proving affidavit (20 Pa. C.S. § 3132.1) speeds probate",
        "Holographic wills: valid in Pennsylvania if entirely in testator's handwriting and signed",
      ],
      restrictions: [
        "Elective share: surviving spouse can claim 1/3 of decedent's estate (20 Pa. C.S. § 2203)",
        "Pennsylvania inheritance tax: close heirs pay 4.5%-15% depending on relationship",
        "Philadelphia Register of Wills handles probate in Philadelphia County",
      ],
      faq: [
        {
          question: "Does Pennsylvania have an inheritance tax?",
          answer: "Yes. Pennsylvania's inheritance tax applies to assets passing to beneficiaries: 0% for transfers to spouses; 4.5% for direct descendants and ancestors (children, parents); 12% for siblings; 15% for other heirs. This is separate from federal estate tax and applies regardless of estate size.",
        },
        {
          question: "Are holographic wills valid in Pennsylvania?",
          answer: "Yes. Pennsylvania recognizes holographic wills — wills written entirely in the testator's own handwriting and signed by the testator, without witnesses. While valid, holographic wills are harder to probate and more likely to be challenged. A properly witnessed will is strongly preferred.",
        },
        {
          question: "What is the elective share for a surviving spouse in Pennsylvania?",
          answer: "Under 20 Pa. C.S. § 2203, a surviving spouse can elect to take 1/3 of the decedent's estate instead of what the will provides. This 'elective share' prevents complete disinheritance of a spouse from separate property assets.",
        },
        {
          question: "How does Pennsylvania probate work?",
          answer: "Wills are probated through the Register of Wills in the county where the decedent lived. Pennsylvania allows 'independent administration' without court supervision for most estates. Small estates (under $50,000 excluding real estate) can use a simplified affidavit process.",
        },
      ],
    },
    "non-compete-agreement": {
      requirements: [
        "No Pennsylvania statute — governed by common law",
        "Must be ancillary to an employment relationship or sale of a business",
        "Must be supported by adequate consideration",
        "Must be reasonable in time, geographic scope, and activities restricted",
        "Courts scrutinize non-competes that deprive employees of their sole means of livelihood",
      ],
      restrictions: [
        "Pennsylvania courts typically will not blue-pencil overbroad non-competes — void if unreasonable",
        "Non-competes signed by existing employees require fresh consideration beyond continued employment",
        "Geographic scope must match the legitimate business interest being protected",
      ],
      faq: [
        {
          question: "How does Pennsylvania treat non-compete agreements?",
          answer: "Pennsylvania courts enforce non-competes under strict common law rules. The covenant must: (1) be ancillary to employment or a business sale, (2) be supported by adequate consideration, (3) be reasonably limited in duration and geography, and (4) not impose undue hardship. Unlike some states, PA courts typically void overbroad covenants rather than modifying them.",
        },
        {
          question: "What is a reasonable duration for a Pennsylvania non-compete?",
          answer: "Pennsylvania courts most commonly enforce non-competes of 1–2 years. Restrictions up to 2 years are frequently upheld when supported by legitimate business interests. Courts have enforced some 5-year restrictions for senior executives or in connection with business sales, but longer terms face greater scrutiny.",
        },
        {
          question: "Will a Pennsylvania court modify an overbroad non-compete?",
          answer: "Generally no. Unlike Texas and some other states that 'blue pencil' non-competes, Pennsylvania courts typically refuse to modify an overbroad non-compete — they either enforce it as written or void it entirely. This makes precise drafting essential in Pennsylvania.",
        },
        {
          question: "Is a non-compete enforceable if I was laid off in Pennsylvania?",
          answer: "Courts look at this carefully. If the employer terminates the employee without cause, some Pennsylvania courts are reluctant to enforce a non-compete that would deprive the employee of their livelihood while the employer chose to end the relationship. This is not a bright-line rule, however.",
        },
      ],
    },
    "independent-contractor-agreement": {
      requirements: [
        "Pennsylvania uses the 'economic reality test' for worker classification",
        "PA Construction Workplace Misclassification Act (Act 72 of 2010): construction-specific rules",
        "Act 72: strong presumption that construction workers are employees unless 6 factors met",
        "Independent contractors must have a written contract under Act 72 in construction",
        "Contractors must obtain their own business licenses if required by the work type",
      ],
      restrictions: [
        "Misclassification in construction: civil penalties up to $1,000 per violation per day",
        "Willful misclassification under Act 72: criminal misdemeanor charges",
        "UC (unemployment compensation) liability: misclassification triggers back assessments",
      ],
      faq: [
        {
          question: "What is Pennsylvania's Construction Workplace Misclassification Act?",
          answer: "Act 72 of 2010 (43 P.S. §§ 933.1-933.17) specifically targets construction industry misclassification. It creates a strong presumption that construction workers are employees. To rebut this presumption, the contractor must meet 6 criteria: no supervision, separately established business, written contract, supplies own tools, hired multiple clients, and performs different work than the hiring entity.",
        },
        {
          question: "Does Pennsylvania require a written contractor agreement?",
          answer: "For construction workers, Act 72 requires a written independent contractor agreement. For other industries, no statute mandates a written agreement, but having one is essential to document independent status and protect both parties if classification is challenged.",
        },
        {
          question: "What are the consequences of worker misclassification in Pennsylvania?",
          answer: "Consequences include: back unemployment compensation (UC) assessments, workers' compensation penalties, PA Department of Revenue income tax assessments, civil penalties under Act 72 (construction), employee wage and benefits claims, and potential criminal misdemeanor charges for willful violations.",
        },
        {
          question: "Can a Pennsylvania independent contractor agreement include a non-compete?",
          answer: "Yes, Pennsylvania courts enforce non-competes in contractor agreements subject to the same reasonableness test applied to employment non-competes. The restriction must protect a legitimate business interest and be reasonable in time and geographic scope.",
        },
      ],
    },
    "commercial-lease-agreement": {
      requirements: [
        "No statewide commercial rent control in Pennsylvania",
        "PA Landlord-Tenant Act applies to some commercial relationships",
        "Philadelphia Realty Transfer Tax: 4.278% combined (city 3.278% + state 1%) on lease transfers",
        "Landlord's distraint: Pennsylvania allows landlords to seize tenant's personal property for rent",
        "Notice requirements depend on lease terms and type",
      ],
      restrictions: [
        "Landlord's distraint remedy (distress for rent) is available but complex to execute",
        "Philadelphia commercial leases may have additional disclosure obligations",
        "Force majeure clauses critical given COVID-19 litigation history in PA courts",
      ],
      faq: [
        {
          question: "What is Pennsylvania's landlord distraint remedy for commercial leases?",
          answer: "Pennsylvania allows commercial landlords to 'distrain' (seize) a tenant's personal property located on the premises to secure unpaid rent. This is a pre-judgment remedy that gives PA landlords significant leverage, but the procedure must be strictly followed or the landlord faces liability.",
        },
        {
          question: "Is there commercial rent control in Pennsylvania?",
          answer: "No. Pennsylvania has no commercial rent control laws, and state preemption prevents local governments from imposing rent control on any property. Commercial rents and escalation clauses are freely negotiated.",
        },
        {
          question: "What transfer taxes apply to commercial leases in Pennsylvania?",
          answer: "The Realty Transfer Tax applies to long-term commercial leases and lease assignments. In Philadelphia, the combined rate is 4.278% of the consideration. State law imposes a 1% tax; Philadelphia adds 3.278%. Consult a tax attorney before assigning a Philadelphia commercial lease.",
        },
        {
          question: "How does commercial eviction work in Pennsylvania?",
          answer: "For non-payment of commercial rent, the landlord serves notice (often 10 days under the lease). If unpaid, the landlord files a complaint with the Magisterial District Judge (MDJ). A hearing is typically scheduled within 30 days. If the tenant loses and doesn't appeal or vacate, the landlord obtains a writ of possession.",
        },
      ],
    },
    "promissory-note": {
      requirements: [
        "Pennsylvania Loan Interest and Protection Law (41 P.S. §§ 101 et seq.)",
        "Maximum lawful interest rate: 6% for consumer loans if no other rate agreed",
        "Licensed lenders can charge higher rates under the Consumer Discount Company Act",
        "Statute of limitations: 4 years for written contracts (42 Pa. C.S. § 5525)",
        "Real estate secured notes: mortgage must be recorded with county recorder",
      ],
      restrictions: [
        "Consumer loans above 6% require a licensed lender in Pennsylvania",
        "Usurious contracts: excess interest forfeited; criminal usury at 25%+ is a misdemeanor",
        "PA Home Loan Protection Act: additional requirements for residential mortgage loans",
      ],
      faq: [
        {
          question: "What is Pennsylvania's interest rate limit for promissory notes?",
          answer: "The Pennsylvania Loan Interest and Protection Law sets the default maximum at 6% for loans between natural persons. However, parties can agree to higher rates in writing. Licensed lenders under the Consumer Discount Company Act can charge significantly higher rates. Commercial loans between businesses generally have more flexibility.",
        },
        {
          question: "How long do I have to sue on a Pennsylvania promissory note?",
          answer: "Pennsylvania's statute of limitations for written contracts is 4 years (42 Pa. C.S. § 5525). The clock starts from the date of default. A demand letter does not toll the limitations period — file suit before the deadline if the debtor is not paying.",
        },
        {
          question: "Does a Pennsylvania promissory note need to be notarized?",
          answer: "No. A promissory note does not require notarization to be enforceable in Pennsylvania. However, if the note is secured by a mortgage on real estate, the mortgage must be acknowledged before a notary and recorded with the County Recorder of Deeds.",
        },
        {
          question: "What are the consequences of charging usurious interest in Pennsylvania?",
          answer: "Under the Loan Interest and Protection Law, a lender charging more than the lawful rate forfeits the right to collect any interest. If charged usury with 'corrupt intent,' the penalty is forfeiture of 3× the interest contracted for. Criminal usury (25%+ with corrupt intent) is a misdemeanor.",
        },
      ],
    },
    "demand-letter": {
      requirements: [
        "No statutory form required in Pennsylvania",
        "Small claims (Magisterial District Court): up to $12,000",
        "PA Unfair Trade Practices and Consumer Protection Law (73 P.S. § 201-1 et seq.): demand letter advisable before UTPCPL suit",
        "Construction defects: Notice and Opportunity to Repair Act (68 Pa. C.S. §§ 517.1-517.11)",
        "Dishonored check: 30-day demand required before civil bad check claim",
      ],
      restrictions: [
        "Cannot threaten criminal prosecution to collect a civil debt",
        "PA Fair Credit Extension Uniformity Act: prohibits deceptive collection practices",
        "Cannot misrepresent legal status or amount of debt",
      ],
      faq: [
        {
          question: "What is Pennsylvania's small claims court limit?",
          answer: "Pennsylvania Magisterial District Courts (MDJs) handle civil claims up to $12,000. The process is informal and designed for non-lawyers. For claims between $12,000 and $50,000, file in the Court of Common Pleas under simplified procedures (formerly called 'arbitration').",
        },
        {
          question: "Does Pennsylvania require a pre-suit notice for construction defects?",
          answer: "Yes. Pennsylvania's Notice and Opportunity to Repair Act (68 Pa. C.S. § 517.3) requires homeowners to give written notice to the contractor/builder at least 90 days before filing suit for construction defects. The contractor has the opportunity to inspect and offer a remedy.",
        },
        {
          question: "Can I recover attorney fees in a Pennsylvania demand letter claim?",
          answer: "Generally no, unless the contract provides for fee recovery. However, under the PA Unfair Trade Practices and Consumer Protection Law (UTPCPL), prevailing consumers can recover actual damages, statutory damages up to three times actual damages, and attorney fees.",
        },
        {
          question: "What is Pennsylvania's statute of limitations for contract claims?",
          answer: "Pennsylvania allows 4 years to sue on a written contract (42 Pa. C.S. § 5525). Oral contracts have a 4-year limit as well. A demand letter does not toll the limitations period. File suit before the deadline if negotiations are not progressing.",
        },
      ],
    },
  },

  // ── Ohio ─────────────────────────────────────────────────────────────────
  ohio: {
    "residential-lease-agreement": {
      requirements: [
        "Ohio Landlord-Tenant Act (ORC Chapter 5321) governs residential leases",
        "Security deposit: no statutory cap, but interest required if deposit exceeds 1 month's rent and tenancy exceeds 6 months",
        "Security deposit must be returned within 30 days of termination",
        "Landlord must provide itemized statement of deductions",
        "Required: name and address of manager or owner for notice purposes",
      ],
      restrictions: [
        "Ohio is landlord-friendly — no statewide rent control",
        "3-day notice for non-payment before filing eviction",
        "No just-cause eviction requirement",
      ],
      noticeRequirements: "30 days' notice required to terminate month-to-month tenancy",
      faq: [
        {
          question: "Is there a security deposit limit in Ohio?",
          answer: "Ohio has no statutory cap on security deposits. However, if the security deposit exceeds one month's rent and the tenancy lasts more than 6 months, the landlord must pay 5% annual interest on the excess. The deposit must be returned within 30 days of the tenant vacating.",
        },
        {
          question: "How does Ohio's eviction process work?",
          answer: "For non-payment of rent, the landlord serves a 3-day notice to pay or vacate. If unpaid, the landlord files a Forcible Entry and Detainer (FED) action in Municipal or County Court. Ohio's eviction process is relatively fast — contested cases can be resolved in 3–6 weeks.",
        },
        {
          question: "What are an Ohio landlord's repair obligations?",
          answer: "Under ORC § 5321.02, Ohio landlords must maintain the property in a fit and habitable condition, comply with health and housing codes, maintain common areas, and keep utilities, plumbing, heating, and electrical systems in working order.",
        },
        {
          question: "Can an Ohio tenant withhold rent for repairs?",
          answer: "Yes, under ORC § 5321.07, if a landlord fails to make repairs after proper notice, a tenant can deposit rent with the court and request that the court order repairs. This 'rent escrow' remedy is available for conditions that materially affect health and safety.",
        },
      ],
    },
    "llc-operating-agreement": {
      requirements: [
        "Ohio Limited Liability Company Act (ORC Chapter 1706): effective February 2022",
        "Annual Report (Combined Franchise Tax/Biennial Statement): varies by tax status",
        "Ohio Commercial Activity Tax (CAT): 0.26% on gross receipts over $150,000",
        "Registered agent with Ohio address required",
        "Series LLCs are recognized under the 2022 Ohio LLC Act",
      ],
      restrictions: [
        "LLC name must include 'Limited Liability Company,' 'LLC,' or 'L.L.C.'",
        "Professional LLCs (PLLCs) required for licensed professionals",
        "Foreign LLCs must register with Ohio Secretary of State before conducting business",
      ],
      faq: [
        {
          question: "Does Ohio require an LLC operating agreement?",
          answer: "Ohio's 2022 LLC Act does not require an operating agreement to be filed with the state, but it is strongly recommended. The revised act allows maximum flexibility for operating agreements to customize the LLC's structure. Without one, Ohio default rules apply.",
        },
        {
          question: "What is Ohio's Commercial Activity Tax?",
          answer: "Ohio's Commercial Activity Tax (CAT) applies to businesses with Ohio taxable gross receipts over $150,000 annually. The rate is 0.26% on gross receipts. LLCs with receipts under $150,000 pay no CAT and file a simplified no-tax-due return.",
        },
        {
          question: "Does Ohio recognize series LLCs?",
          answer: "Yes. Ohio's 2022 LLC Act (ORC Chapter 1706) recognizes series LLCs. Each series can have separate assets, members, and managers with liability protection between series. Series LLCs are a relatively new option in Ohio and their treatment in courts is still developing.",
        },
        {
          question: "What are the filing requirements to form an Ohio LLC?",
          answer: "File Articles of Organization with the Ohio Secretary of State ($99 filing fee online). The LLC must appoint a registered agent with an Ohio address. An operating agreement should be adopted at formation (though not filed). A biennial report may be required depending on tax elections.",
        },
      ],
    },
    "employment-contract": {
      requirements: [
        "Ohio at-will employment — either party can terminate without cause",
        "Ohio minimum wage: $10.45/hour (2024) for non-tipped employees; $5.25 for tipped",
        "Non-compete agreements: governed by Raimonde v. Van Vlerah, 325 N.E.2d 544 (Ohio 1975)",
        "Non-competes assessed for reasonableness — courts will not enforce per se unreasonable agreements",
        "Ohio Civil Rights Act: prohibits discrimination based on protected characteristics",
      ],
      restrictions: [
        "Non-competes broader than needed to protect a legitimate business interest are unenforceable",
        "Courts consider employee hardship and public interest in enforcing non-competes",
        "Salary history inquiries: Cincinnati and Toledo have local restrictions (check current status)",
      ],
      faq: [
        {
          question: "What is Ohio's minimum wage in 2024?",
          answer: "Ohio's minimum wage is $10.45/hour for non-tipped employees and $5.25/hour for tipped employees in 2024. Ohio's minimum wage adjusts annually based on the Consumer Price Index. Employers with annual gross receipts under $385,000 can pay the federal minimum wage of $7.25/hour.",
        },
        {
          question: "How does Ohio enforce non-compete agreements?",
          answer: "Ohio follows the Raimonde standard: courts enforce non-competes only to the extent reasonably necessary to protect the employer's legitimate business interests, while also weighing the hardship on the employee and public interest. Ohio courts can modify (blue pencil) unreasonable provisions.",
        },
        {
          question: "Can Ohio courts modify an overbroad non-compete?",
          answer: "Yes. Unlike Pennsylvania, Ohio courts have discretion to blue-pencil (modify) overbroad non-competes, reducing the duration or geographic scope to make them reasonable and enforceable. This is based on the Raimonde framework and gives employers some protection even if they overreach.",
        },
        {
          question: "What is required for a valid Ohio non-compete?",
          answer: "An Ohio non-compete must: (1) be part of a valid employment contract, (2) be supported by adequate consideration (job offer, promotion, raise, trade secret access), (3) be reasonable in time and geographic scope, (4) not impose undue hardship on the employee, and (5) not harm the public.",
        },
      ],
    },
    "power-of-attorney": {
      requirements: [
        "Ohio Power of Attorney Act (ORC §§ 1337.21-1337.64): governs durable POAs",
        "Must be signed by principal before a notary public",
        "Statutory form available under ORC § 1337.60",
        "Agent must sign an acknowledgment before exercising authority",
        "Third parties must accept a properly executed Ohio statutory form POA",
      ],
      restrictions: [
        "Healthcare decisions require separate Ohio Healthcare Power of Attorney (ORC § 1337.12)",
        "Real estate transactions: POA must be recorded with county recorder",
        "Gift-making authority must be expressly granted in the POA",
      ],
      faq: [
        {
          question: "Does an Ohio power of attorney need to be witnessed or notarized?",
          answer: "Ohio requires a Durable Power of Attorney to be signed before a notary public. Witnesses are not required under Ohio law (unlike some other states). The notary acknowledgment is what makes the document valid and acceptable to financial institutions.",
        },
        {
          question: "What is the Ohio Statutory Form Power of Attorney?",
          answer: "ORC § 1337.60 provides a statutory form POA that is automatically accepted by banks and financial institutions. Third parties cannot refuse a properly executed Ohio Statutory Form POA. Using this form avoids disputes about the document's validity.",
        },
        {
          question: "Does Ohio require a separate healthcare power of attorney?",
          answer: "Yes. Ohio uses a separate Healthcare Power of Attorney (ORC § 1337.12) for medical decisions, distinct from the Durable Power of Attorney for financial matters. Advance directives (living wills) are governed by ORC § 2133.02. For complete incapacity planning, you need both documents.",
        },
        {
          question: "When does an Ohio power of attorney become effective?",
          answer: "An Ohio Durable Power of Attorney is effective immediately upon signing unless you specify it is 'springing' — effective only upon your incapacity. Springing POAs must clearly define the triggering event (e.g., physician certification of incapacity). Ohio recognizes both types.",
        },
      ],
    },
    "last-will-and-testament": {
      requirements: [
        "Ohio Revised Code § 2107.03 governs will execution",
        "Two attesting witnesses required — must sign in testator's presence",
        "Testator must sign at the end of the will (or acknowledge prior signature to witnesses)",
        "Self-proving will (ORC § 2107.24): notary and witnesses sign affidavit — speeds probate",
        "Testator must be 18+ and of sound mind and memory",
      ],
      restrictions: [
        "Elective share: surviving spouse entitled to 1/3 or 1/2 of estate (ORC § 2106.01) depending on children",
        "Ohio estate tax: repealed as of January 1, 2013 — no state estate tax",
        "Holographic wills: NOT recognized in Ohio — must be witnessed",
      ],
      faq: [
        {
          question: "Does Ohio have a state estate tax?",
          answer: "No. Ohio repealed its estate tax effective January 1, 2013. Only the federal estate tax applies to Ohio residents, which has a $13.61 million exemption per person (2024). Ohio's repeal makes it relatively favorable for estate planning compared to states like Illinois and New York.",
        },
        {
          question: "What is the elective share for a surviving spouse in Ohio?",
          answer: "Under ORC § 2106.01, a surviving spouse can elect to take 1/3 of the net estate if the decedent left two or more children or their descendants, and 1/2 of the net estate if there is only one child or the decedent left no children. This prevents complete disinheritance.",
        },
        {
          question: "Are holographic wills valid in Ohio?",
          answer: "No. Ohio does not recognize holographic (handwritten, unwitnessed) wills created within the state. A valid Ohio will must be signed by the testator and attested by two witnesses who sign in the testator's presence. Always have a properly witnessed and typed will in Ohio.",
        },
        {
          question: "How does Ohio probate work?",
          answer: "Ohio wills are admitted to probate in the Probate Division of the Court of Common Pleas in the county where the decedent lived. Ohio offers 'release from administration' for small estates (under $35,000 or surviving spouse is sole beneficiary). Larger estates require standard probate administration.",
        },
      ],
    },
    "non-compete-agreement": {
      requirements: [
        "No Ohio statute — governed by common law (Raimonde v. Van Vlerah standard)",
        "Must be ancillary to a valid employment contract",
        "Must be supported by adequate consideration",
        "Must protect a legitimate business interest (trade secrets, confidential customer data, goodwill)",
        "Must be reasonable in time, geographic scope, and activities restricted",
      ],
      restrictions: [
        "Courts balance employer's interest against employee hardship and public welfare",
        "Ohio courts can modify overbroad non-competes using blue pencil doctrine",
        "Non-competes that prevent employees from earning a living are disfavored",
      ],
      faq: [
        {
          question: "What is the Raimonde standard for Ohio non-competes?",
          answer: "The Raimonde v. Van Vlerah (1975) framework requires Ohio courts to enforce non-competes only to the extent reasonably necessary to protect legitimate business interests. Courts weigh: the employer's interest in protection, the employee's hardship, and the public interest in free competition.",
        },
        {
          question: "What geographic scope is reasonable for an Ohio non-compete?",
          answer: "Ohio courts look at where the employee actually worked or had customer contact. A non-compete covering the employee's actual sales territory or service area is more likely to be enforced. Statewide or national restrictions for employees with limited geographic exposure will face greater scrutiny.",
        },
        {
          question: "How long can an Ohio non-compete last?",
          answer: "Ohio courts commonly enforce non-competes of 1–2 years. Restrictions up to 3 years can be enforced for senior executives or following a business sale. Courts have been reluctant to enforce non-competes exceeding 3 years, though they can modify rather than void them under Raimonde.",
        },
        {
          question: "Does Ohio require consideration for non-competes with existing employees?",
          answer: "Yes. Ohio requires fresh consideration — beyond continued employment — when asking existing employees to sign new non-competes. Valid consideration includes: a promotion, pay raise, access to proprietary information, specialized training, or other tangible benefits.",
        },
      ],
    },
    "independent-contractor-agreement": {
      requirements: [
        "Ohio uses the 'right to control' test for worker classification",
        "Ohio Bureau of Workers' Compensation scrutinizes contractor vs. employee status",
        "Ohio Department of Job and Family Services can reclassify workers for unemployment purposes",
        "No equivalent of California's AB 5 — Ohio uses federal and common law standards",
        "Construction: Ohio applies additional criteria for contractor classification",
      ],
      restrictions: [
        "Misclassification triggers back workers' compensation premiums, unemployment taxes, and penalties",
        "Ohio BWC can assess back premiums for up to 3 years if misclassification discovered",
        "Contractors must obtain their own licenses for regulated professions",
      ],
      faq: [
        {
          question: "How does Ohio classify workers as employees or independent contractors?",
          answer: "Ohio uses the 'right to control' test: the key question is whether the hiring party controls the details of how work is performed. Factors include: who controls work hours, provides tools, sets the work method, and whether the worker serves multiple clients. The more control exercised, the more likely the worker is an employee.",
        },
        {
          question: "What are the workers' compensation risks of misclassifying workers in Ohio?",
          answer: "The Ohio Bureau of Workers' Compensation (BWC) audits businesses and can reclassify workers as employees, requiring back premium payments. BWC can assess up to 3 years of retroactive premiums. Additionally, injured workers misclassified as contractors may sue the employer directly.",
        },
        {
          question: "Does Ohio require a written independent contractor agreement?",
          answer: "No Ohio law mandates a written agreement for all independent contractors. However, a written agreement clearly establishing the contractor's independent status, scope of work, payment terms, IP ownership, and tax responsibility is essential to defend against classification challenges.",
        },
        {
          question: "Can Ohio independent contractors form an LLC to protect their status?",
          answer: "Yes. Contractors who form an LLC and operate as a business entity (separate bank accounts, invoices, business licenses) are more likely to be treated as true independent contractors. However, the economic reality of the relationship still matters — LLC status alone doesn't prevent reclassification.",
        },
      ],
    },
    "commercial-lease-agreement": {
      requirements: [
        "No statewide commercial rent control in Ohio",
        "Ohio Revised Code Chapter 1923 governs commercial forcible entry and detainer",
        "3-day notice for non-payment before commercial eviction",
        "Landlord's lien: Ohio common law lien on tenant's goods for rent",
        "Municipal permits may be required for certain commercial uses",
      ],
      restrictions: [
        "Commercial eviction: landlord cannot self-help evict — court process required",
        "CAM charges must be clearly defined — courts require clear written allocation",
        "Force majeure provisions increasingly standard post-COVID",
      ],
      faq: [
        {
          question: "How does commercial eviction work in Ohio?",
          answer: "For non-payment of commercial rent, the landlord serves a 3-day notice to pay or vacate. If the tenant doesn't comply, the landlord files a forcible entry and detainer action in Municipal or County Court. A hearing is scheduled within 30 days. The process can move quickly in Ohio — often 3–6 weeks for uncontested evictions.",
        },
        {
          question: "Is there commercial rent control in Ohio?",
          answer: "No. Ohio has no commercial rent control at the state or local level. Commercial lease terms, rent amounts, and escalation provisions are freely negotiated. Parties should document all economic terms clearly in the lease.",
        },
        {
          question: "What should an Ohio commercial lease include about security deposits?",
          answer: "Ohio has no specific commercial security deposit statute. Commercial landlords can require any amount as a security deposit. The lease should specify: the amount, how it's held (commingled or segregated), conditions for deduction, timing of return, and whether interest is earned.",
        },
        {
          question: "What are CAM charge best practices for Ohio commercial leases?",
          answer: "Ohio courts enforce CAM provisions as written. Best practices: define exactly what expenses are included (and excluded) from CAM, establish a base-year or estimated CAM concept, provide audit rights for tenants, cap annual CAM increases (e.g., 3–5%), and reconcile estimated vs. actual charges annually.",
        },
      ],
    },
    "promissory-note": {
      requirements: [
        "Ohio usury law: 8% default rate; parties can agree to higher rate in writing (ORC § 1343.01)",
        "Written notes: maximum rate is 25% per year for most transactions",
        "Licensed financial institutions are exempt from Ohio usury limits",
        "Statute of limitations: 6 years for written contracts (ORC § 2305.06)",
        "Real estate secured notes: mortgage must be recorded with county recorder",
      ],
      restrictions: [
        "Interest above 25% is criminally usurious in Ohio",
        "Consumer loans: additional Ohio Consumer Sales Practices Act requirements",
        "Mortgage loans: Ohio CSPA and federal TILA disclosure requirements",
      ],
      faq: [
        {
          question: "What is Ohio's usury limit for promissory notes?",
          answer: "Ohio allows parties to agree in writing to any interest rate up to 25% per year (ORC § 1343.01). If no rate is specified, the default rate is 8%. Rates above 25% are criminally usurious. Licensed lenders (banks, credit unions, licensed consumer lenders) are generally exempt from these limits.",
        },
        {
          question: "How long do I have to sue on an Ohio promissory note?",
          answer: "Ohio Revised Code § 2305.06 provides a 6-year statute of limitations on written instruments, including promissory notes. The clock starts running from the date of default. A demand letter does not toll the limitations period.",
        },
        {
          question: "Does an Ohio promissory note need to be notarized?",
          answer: "No. An Ohio promissory note does not require notarization to be legally enforceable. However, if the note is secured by a mortgage on real property, the mortgage must be acknowledged before a notary and recorded with the County Recorder to perfect the lien.",
        },
        {
          question: "Can I charge compound interest on an Ohio promissory note?",
          answer: "Yes, if agreed in writing. The note should clearly specify whether interest is simple or compound and the compounding frequency (daily, monthly, annually). Total interest must remain within Ohio's 25% annual cap for non-exempt lenders.",
        },
      ],
    },
    "demand-letter": {
      requirements: [
        "No statutory form required in Ohio",
        "Small claims (Ohio Municipal/County Court): up to $6,000",
        "Ohio Consumer Sales Practices Act (ORC § 1345.01 et seq.): pre-suit demand advisable",
        "Construction defects: 60-day notice under Ohio's Residential Construction Liability Act",
        "Dishonored checks: written demand required before civil bad check claim",
      ],
      restrictions: [
        "Cannot threaten criminal action to collect civil debt",
        "Ohio CSPA prohibits unfair or deceptive consumer sales practices in collection",
        "Cannot misrepresent amount owed or legal status of the debt",
      ],
      faq: [
        {
          question: "What is Ohio's small claims court limit?",
          answer: "Ohio's small claims divisions (within Municipal and County Courts) handle cases up to $6,000. The process is informal and designed for non-lawyers. Attorneys can appear in Ohio small claims court. For claims between $6,000 and $15,000, file in the regular civil division of Municipal Court.",
        },
        {
          question: "Does Ohio's Consumer Sales Practices Act require a demand letter?",
          answer: "The Ohio CSPA (ORC § 1345.09) does not explicitly require a pre-suit demand letter, but plaintiffs must provide notice before seeking class certification. Sending a demand letter creates a record of the deceptive practice and gives the merchant an opportunity to correct it, which courts view favorably.",
        },
        {
          question: "Can I recover attorney fees in an Ohio demand letter claim?",
          answer: "Generally not for breach of contract claims, unless the contract provides for it. However, under the Ohio Consumer Sales Practices Act, a prevailing consumer can recover actual damages, noneconomic damages, and attorney fees in cases of intentional violations or matters declared deceptive by CSPA rule.",
        },
        {
          question: "What is Ohio's statute of limitations for contract claims?",
          answer: "Ohio allows 6 years to bring suit on a written contract and 6 years for oral contracts (ORC § 2305.07). A demand letter does not toll the statute of limitations. If the deadline is approaching, file suit first and attempt settlement simultaneously.",
        },
      ],
    },
  },

  // ── Michigan ──────────────────────────────────────────────────────────────
  michigan: {
    "residential-lease-agreement": {
      requirements: [
        "Michigan Security Deposit Act (MCL 554.601–554.616) governs deposit requirements",
        "Security deposit: capped at 1.5 months' rent",
        "Landlord must provide written inventory checklist within 7 days of move-in",
        "Security deposit must be returned within 30 days of termination with itemized list",
        "Required: name and address of financial institution holding deposit",
      ],
      restrictions: [
        "Michigan is generally landlord-friendly — no statewide rent control",
        "7-day notice for non-payment before filing eviction (non-payment)",
        "30-day notice for other lease violations before filing eviction",
      ],
      noticeRequirements: "30 days' notice required to terminate month-to-month tenancy in Michigan",
      faq: [
        {
          question: "What is the security deposit limit in Michigan?",
          answer: "Michigan law caps security deposits at 1.5 months' rent (MCL 554.602). This is one of the more specific caps in the US — California, New York, and some other states have similar or lower limits. The landlord must keep the deposit in a regulated financial institution.",
        },
        {
          question: "What is Michigan's move-in checklist requirement?",
          answer: "Michigan's Security Deposit Act requires landlords to provide a written inventory checklist to the tenant within 7 days of move-in. The tenant then has 7 days to note any additional damages on the form and return it. This checklist is critical for resolving end-of-tenancy deposit disputes.",
        },
        {
          question: "How does Michigan's eviction process work?",
          answer: "For non-payment of rent, the landlord gives a 7-day demand notice. For other violations, a 30-day notice is typically required. After proper notice, the landlord files a Summary Proceeding in District Court. Michigan evictions typically take 4–8 weeks, depending on the court and whether the tenant contests.",
        },
        {
          question: "Is there rent control in Michigan?",
          answer: "No. Michigan explicitly preempts local rent control ordinances — cities cannot impose rent control under the state's Rent Control Preemption Act (MCL 123.231). Rent amounts are freely negotiated between landlord and tenant.",
        },
      ],
    },
    "llc-operating-agreement": {
      requirements: [
        "Michigan LLC Act (MCL 450.4101 et seq.) governs LLCs",
        "Annual Statement required by February 15 each year ($25 fee)",
        "Michigan Business Tax or Michigan Corporate Income Tax may apply depending on elections",
        "Registered agent with Michigan address required",
        "Series LLCs are recognized in Michigan",
      ],
      restrictions: [
        "LLC name must include 'Limited Liability Company,' 'LLC,' or 'L.L.C.'",
        "Professional LLCs (PLLCs) required for licensed professionals",
        "Foreign LLCs must register with Michigan LARA before conducting business",
      ],
      faq: [
        {
          question: "Does Michigan require an LLC operating agreement?",
          answer: "Michigan does not require an operating agreement to be filed with the state (LARA), but the Michigan LLC Act allows members to adopt one. Without an operating agreement, the Michigan LLC Act's default provisions govern internal operations — often not what members intend for profit sharing and management.",
        },
        {
          question: "What is Michigan's annual statement requirement for LLCs?",
          answer: "Michigan LLCs must file an Annual Statement with the Department of Licensing and Regulatory Affairs (LARA) by February 15 each year. The filing fee is $25. Failure to file results in the LLC being revoked (administratively dissolved) after notice.",
        },
        {
          question: "What taxes does a Michigan LLC pay?",
          answer: "Michigan LLC members pay Michigan individual income tax at 4.25% on their share of LLC income. Michigan also formerly imposed a Business Tax, which was reformed — most LLCs now pay only through individual member returns. Check with a Michigan tax professional for current obligations.",
        },
        {
          question: "Does Michigan recognize series LLCs?",
          answer: "Yes. Michigan recognizes series LLCs under the Michigan LLC Act. Each series can have separate assets, members, and operating agreements, with liability protection between series. Michigan series LLCs are governed by MCL 450.4902 et seq.",
        },
      ],
    },
    "employment-contract": {
      requirements: [
        "Michigan at-will employment — Toussaint v. Blue Cross & Blue Shield (1980) exceptions apply",
        "Michigan minimum wage: $10.33/hour (2024); $15.00/hour by 2028 under Proposal 22-2",
        "Michigan Paid Medical Leave Act (PMLA): employers with 50+ employees must provide 40 hours paid sick leave/year",
        "Elliott-Larsen Civil Rights Act (ELCRA): broad state civil rights protections including LGBTQ+ (2023 amendment)",
        "Non-compete agreements: enforceable under MCL 445.774a if reasonable",
      ],
      restrictions: [
        "Non-competes must be reasonable in duration (typically 1-2 years) and geographic scope",
        "Non-competes cannot deprive employees of their sole means of livelihood",
        "Michigan does not have a minimum income threshold for non-competes",
      ],
      faq: [
        {
          question: "What is Michigan's minimum wage in 2024 and how will it change?",
          answer: "Michigan's minimum wage is $10.33/hour in 2024. Under Proposal 22-2 (passed November 2022), the minimum wage will increase to $12.48/hour in 2025, $13.73 in 2026, $14.97 in 2027, and $15.00 in 2028, with annual CPI adjustments thereafter.",
        },
        {
          question: "Are non-compete agreements enforceable in Michigan?",
          answer: "Yes. Michigan Compiled Law § 445.774a allows non-compete agreements if they are: (1) part of an employment contract, (2) reasonable as to duration, geographical area, and type of employment, and (3) not against public policy. Michigan courts scrutinize but generally enforce reasonable non-competes.",
        },
        {
          question: "What did Michigan's 2023 ELCRA amendment change?",
          answer: "Michigan's Elliott-Larsen Civil Rights Act was amended in 2023 to explicitly include sexual orientation and gender identity/expression as protected classes. Michigan became the first Midwest state to codify these protections in its civil rights statute, creating a broader scope than federal law.",
        },
        {
          question: "Does Michigan require paid sick leave?",
          answer: "Yes. Michigan's Paid Medical Leave Act (PMLA) requires employers with 50 or more employees to provide at least 40 hours (5 days) of paid medical leave per year. Employees earn 1 hour of leave per 35 hours worked. Smaller employers have no state paid sick leave requirement.",
        },
      ],
    },
    "power-of-attorney": {
      requirements: [
        "Michigan Durable Power of Attorney Act (MCL 700.5501 et seq.) governs",
        "Must be signed by principal in the presence of two witnesses",
        "Notarization strongly recommended (required for real estate transactions)",
        "Statutory form available under Michigan Estates and Protected Individuals Code",
        "Healthcare decisions: separate Michigan Patient Advocate Designation (MCL 700.5506)",
      ],
      restrictions: [
        "Witnesses cannot be: the agent, agent's spouse or relatives, or anyone inheriting from principal",
        "Healthcare decisions require separate Patient Advocate Designation",
        "Real estate POA must be recorded with Register of Deeds",
      ],
      faq: [
        {
          question: "What are the execution requirements for a Michigan power of attorney?",
          answer: "Michigan's Durable POA requires two adult witnesses who sign in the principal's presence. Witnesses cannot be the designated agent, the agent's spouse, children, or other relatives, or anyone who would inherit from the principal. Notarization is strongly recommended even though not strictly required for all POAs.",
        },
        {
          question: "Does Michigan have a separate healthcare power of attorney?",
          answer: "Yes. Michigan uses a 'Patient Advocate Designation' (MCL 700.5506) for healthcare decisions. This separate document designates someone to make medical decisions when you are unable. A financial Durable POA does not authorize healthcare decisions in Michigan — you need both documents.",
        },
        {
          question: "How do I use a Michigan POA for real estate transactions?",
          answer: "For real estate transactions, the Michigan POA must be notarized (not just witnessed) and should be recorded with the Register of Deeds in the county where the property is located. The POA must expressly grant real estate authority.",
        },
        {
          question: "When does a Michigan power of attorney terminate?",
          answer: "A Michigan Durable POA survives incapacity if it contains the durability clause. It terminates upon: (1) the principal's death, (2) written revocation by the principal, (3) court appointment of a conservator if the POA didn't contemplate this, or (4) the specified termination date or event in the document.",
        },
      ],
    },
    "last-will-and-testament": {
      requirements: [
        "Michigan Estates and Protected Individuals Code (EPIC) — MCL 700.2501 et seq.",
        "Two witnesses required — must sign in testator's presence within a reasonable time",
        "Testator must be 18+ and of sound mind",
        "Self-proving affidavit: recognized in Michigan (MCL 700.2504)",
        "Holographic wills: valid if entirely in testator's handwriting and signed (MCL 700.2502)",
      ],
      restrictions: [
        "Elective share: surviving spouse entitled to elective share calculated under complex formula (MCL 700.2202)",
        "Michigan estate tax: none — Michigan repealed its estate tax in 1993",
        "Intestate share: Michigan has specific rules for children, stepchildren, and half-relatives",
      ],
      faq: [
        {
          question: "Are holographic wills valid in Michigan?",
          answer: "Yes. Michigan recognizes holographic wills under MCL 700.2502 — wills that are entirely in the testator's own handwriting and signed by the testator. No witnesses are required for a Michigan holographic will. However, typed wills with proper witnesses and a self-proving affidavit are more reliable.",
        },
        {
          question: "What is the surviving spouse's elective share in Michigan?",
          answer: "Michigan's elective share is calculated based on the length of the marriage — the longer the marriage, the larger the potential elective share. The formula considers augmented estate assets (not just probate assets). The minimum share is 3% of augmented estate for marriages under 1 year and can reach 50% for 15+ year marriages.",
        },
        {
          question: "Does Michigan have a state estate tax?",
          answer: "No. Michigan repealed its estate tax in 1993. Only the federal estate tax applies to Michigan residents, with its $13.61 million per-person exemption (2024). Michigan is one of the majority of states that no longer imposes a separate estate or inheritance tax.",
        },
        {
          question: "How does Michigan probate work?",
          answer: "Michigan wills are probated in Probate Court in the county where the decedent lived. Michigan offers several procedures: informal administration (no court hearings for uncontested estates), formal administration (court supervised), and small estate affidavits for estates under $27,000 (2024, indexed for inflation).",
        },
      ],
    },
    "non-compete-agreement": {
      requirements: [
        "Michigan's Non-Compete Statute (MCL 445.774a): non-competes may be enforced if reasonable",
        "Must be part of a valid employment contract",
        "Must be reasonable as to duration, geographical area, and type of employment restricted",
        "Must not be contrary to the public interest",
        "Adequate consideration required: job offer, promotion, trade secret access",
      ],
      restrictions: [
        "Courts scrutinize non-competes that deprive employees of their livelihood",
        "Non-competes cannot be broader than necessary to protect legitimate business interests",
        "Michigan courts do not typically blue-pencil non-competes — may void if unreasonable",
      ],
      faq: [
        {
          question: "Does Michigan have a statute governing non-compete agreements?",
          answer: "Yes. MCL 445.774a specifically addresses non-compete agreements in employment. It allows them to be enforced if reasonable as to duration, geography, and type of employment. This gives Michigan courts a statutory basis for analysis, unlike some states that rely solely on common law.",
        },
        {
          question: "What geographic scope is reasonable for a Michigan non-compete?",
          answer: "Michigan courts have upheld non-competes ranging from specific counties to the entire state or national territory, depending on the employer's actual business footprint. The key is that the geographic scope must match where the employee had actual customer contact or access to competitive information.",
        },
        {
          question: "Can Michigan courts modify an overbroad non-compete?",
          answer: "Michigan courts generally do not blue-pencil (modify) overbroad non-competes. If a non-compete is unreasonable in duration, geography, or scope, Michigan courts are more likely to void it entirely. This makes precise, reasonable drafting essential in Michigan agreements.",
        },
        {
          question: "Are customer non-solicitation agreements treated differently than non-competes in Michigan?",
          answer: "Yes. Michigan courts generally scrutinize true non-competes (full geographic/time restrictions) more strictly than narrower non-solicitation clauses (restricting only direct customer solicitation). Non-solicitation of customers with whom the employee had actual contact is typically easier to enforce.",
        },
      ],
    },
    "independent-contractor-agreement": {
      requirements: [
        "Michigan uses the 'economic reality test' for most worker classification purposes",
        "Michigan Unemployment Insurance Agency (UIA) uses a 20-factor test for UI purposes",
        "Michigan Workers' Disability Compensation Act: separate classification test for workers' comp",
        "No equivalent to California's AB 5 in Michigan",
        "Written contractor agreements are not legally required but strongly recommended",
      ],
      restrictions: [
        "Misclassification triggers UIA assessments, workers' comp liability, and income tax withholding obligations",
        "Construction industry: Michigan Department of Labor scrutinizes contractor classification",
        "Gig workers: Michigan follows federal classification standards",
      ],
      faq: [
        {
          question: "How does Michigan classify workers as employees or contractors?",
          answer: "Michigan uses the 'economic reality test,' looking at the totality of the relationship. Key factors: degree of control over work details, investment in tools and equipment, opportunity for profit or loss, permanency of the relationship, and whether the work is integral to the company's business.",
        },
        {
          question: "What is Michigan's test for unemployment insurance contractor classification?",
          answer: "The Michigan Unemployment Insurance Agency (UIA) applies a 20-factor test based on the IRS common law rules. Workers are presumed to be employees for UI purposes, and the burden is on the employer to demonstrate independent contractor status across all 20 factors.",
        },
        {
          question: "What are the consequences of misclassifying workers in Michigan?",
          answer: "Misclassification can result in: back UIA unemployment insurance assessments (up to 3 years retroactive), workers' compensation liability for injuries, income tax withholding obligations to the Michigan Department of Treasury, and potential employee benefit claims.",
        },
        {
          question: "What should a Michigan independent contractor agreement include?",
          answer: "Key provisions: description of services, payment terms (per project, not hourly is better for contractor status), independent status declaration, contractor's obligation to pay own taxes, ownership of work product (IP assignment), confidentiality, termination provisions, and governing law (Michigan).",
        },
      ],
    },
    "commercial-lease-agreement": {
      requirements: [
        "No statewide commercial rent control in Michigan",
        "Michigan common law and contract law govern commercial leases",
        "7-day notice for non-payment of commercial rent before eviction filing",
        "Landlord's lien: Michigan common law provides lien on tenant's property for rent",
        "Detroit: some additional commercial district requirements",
      ],
      restrictions: [
        "Michigan prohibits commercial landlord self-help eviction — court process required",
        "Holdover provisions must be clearly stated — Michigan courts enforce as written",
        "Assignment and subletting restrictions must be clearly stated",
      ],
      faq: [
        {
          question: "How does commercial eviction work in Michigan?",
          answer: "For non-payment of commercial rent in Michigan, the landlord serves a 7-day notice to pay or quit. After 7 days, the landlord can file a Summary Proceedings case in District Court. Michigan commercial eviction can be relatively fast — uncontested cases may be resolved in 2–4 weeks.",
        },
        {
          question: "Is commercial rent controlled in Michigan?",
          answer: "No. Michigan has no commercial rent control at the state or local level. All rent amounts, escalation clauses, and renewal terms for commercial leases are freely negotiated between the parties.",
        },
        {
          question: "What should a Michigan commercial lease say about holdover tenancy?",
          answer: "Michigan courts enforce holdover provisions as written. If the lease specifies a holdover rate (e.g., 150% of last month's rent), courts will apply it. If silent, courts may find a month-to-month tenancy with rent at the original lease rate. Always specify holdover consequences explicitly.",
        },
        {
          question: "Are there Michigan-specific requirements for retail commercial leases?",
          answer: "Beyond standard contract requirements, Michigan retail leases should address: zoning compliance, permitted use, signage rights, hours of operation, exclusive use clauses, CAM charges (especially in shopping centers), co-tenancy provisions, and kick-out rights if anchor tenants leave.",
        },
      ],
    },
    "promissory-note": {
      requirements: [
        "Michigan usury law: maximum 7% for simple contracts; 25% for written notes (MCL 438.31)",
        "Licensed lenders (banks, credit unions, licensed finance companies) are exempt",
        "Statute of limitations: 6 years for written contracts (MCL 600.5807)",
        "Real estate secured notes: mortgage must be recorded with Register of Deeds",
        "Documentary transfer tax may apply to mortgages securing real property",
      ],
      restrictions: [
        "Interest above 25% per year is usurious for non-exempt lenders",
        "Michigan regulates payday lenders under the Deferred Presentment Service Transactions Act",
        "Consumer mortgage loans: additional TILA and Michigan Truth in Lending requirements",
      ],
      faq: [
        {
          question: "What is Michigan's usury limit for promissory notes?",
          answer: "Michigan's Interest on Money statute (MCL 438.31) allows parties to agree in writing to interest rates up to 25% per year for most transactions. Without a written agreement, the default rate is 5%. Licensed financial institutions are generally exempt from Michigan usury limits.",
        },
        {
          question: "How long do I have to collect on a Michigan promissory note?",
          answer: "Michigan's statute of limitations for written contracts is 6 years (MCL 600.5807). The clock starts from the date of default. A demand letter does not toll the limitations period — file suit before the 6-year deadline if the borrower is not paying.",
        },
        {
          question: "Does a Michigan promissory note need to be notarized?",
          answer: "Notarization is not required for a Michigan promissory note to be enforceable. However, if the note is secured by real estate (via a mortgage), the mortgage must be acknowledged before a notary and recorded with the County Register of Deeds to perfect the lien.",
        },
        {
          question: "What is the Michigan mortgage recording tax?",
          answer: "Michigan imposes a mortgage recording tax when a mortgage is recorded: $0.75 per $500 of secured debt (with county variations). This tax applies to mortgages securing promissory notes for real property. Budget for this cost when structuring real estate-secured loans in Michigan.",
        },
      ],
    },
    "demand-letter": {
      requirements: [
        "No statutory form required in Michigan",
        "Small claims (Michigan District Court): up to $6,500 for individuals",
        "Michigan Consumer Protection Act (MCPA, MCL 445.901 et seq.): 5-day notice before suit in some cases",
        "Construction defects: 30-day notice under Michigan Residential Construction Lien Act",
        "Dishonored check: 30-day demand before civil bad check action",
      ],
      restrictions: [
        "Cannot threaten criminal prosecution for civil debt",
        "Michigan Fair Debt Collection Practices Act mirrors federal FDCPA provisions",
        "Cannot misrepresent amount owed or legal status of debt",
      ],
      faq: [
        {
          question: "What is Michigan's small claims court limit?",
          answer: "Michigan District Courts handle small claims up to $6,500 for individuals and $6,500 for businesses (2024). The process is informal — no formal rules of evidence apply. Each party can appear without an attorney. For claims above $6,500, file in District Court under regular procedures.",
        },
        {
          question: "Does the Michigan Consumer Protection Act require a demand letter?",
          answer: "The MCPA (MCL 445.901) does not require a pre-suit demand letter for private claims, but sending one creates a record of the deceptive practice and provides the defendant an opportunity to resolve the matter. The AG must send a cease and desist notice before filing suit on behalf of consumers.",
        },
        {
          question: "Can I recover attorney fees in a Michigan demand letter case?",
          answer: "Michigan follows the 'American Rule' — each party pays their own attorney fees unless the contract or a statute provides otherwise. The Michigan Consumer Protection Act allows prevailing consumers to recover attorney fees. Include the statutory basis for fee recovery in your demand letter.",
        },
        {
          question: "What is Michigan's statute of limitations for contract claims?",
          answer: "Michigan allows 6 years to bring suit on a written contract (MCL 600.5807). Oral contracts have a 6-year limit as well. A demand letter does not toll the limitations period. If the deadline is approaching, file suit to preserve your rights and continue settlement negotiations simultaneously.",
        },
      ],
    },
  },

  // ── Washington ────────────────────────────────────────────────────────────
  washington: {
    "residential-lease-agreement": {
      requirements: [
        "Washington Residential Landlord-Tenant Act (RCW 59.18) governs",
        "Security deposit: must be held in a trust account; written receipt required",
        "Security deposit must be returned within 30 days of termination with itemized statement",
        "Just Cause Eviction: ESHB 1236 (2021) requires documented just cause for eviction",
        "Required: written statement of condition at move-in (jointly signed)",
      ],
      restrictions: [
        "Just cause required for most evictions — no-fault evictions restricted by ESHB 1236",
        "Seattle Rental Registration and Inspection Program: additional compliance required",
        "No statewide rent control, but Seattle has explored local regulations",
      ],
      noticeRequirements: "20 days' notice to terminate month-to-month tenancy; 14-day cure notice for violations",
      faq: [
        {
          question: "What is Washington's just cause eviction law?",
          answer: "Washington's ESHB 1236 (effective 2021) requires landlords to have a documented 'just cause' reason to evict tenants or fail to renew leases. Acceptable causes include non-payment of rent, lease violations, property sale, renovation requiring vacancy, and owner move-in. No-fault terminations are severely restricted.",
        },
        {
          question: "How does Washington's security deposit process work?",
          answer: "Landlords must hold the security deposit in a dedicated trust account and provide a written receipt. Within 30 days of the tenant vacating, the landlord must return the deposit with an itemized written statement of deductions. Failure to comply forfeits the right to keep any portion of the deposit.",
        },
        {
          question: "What disclosures are required in a Washington residential lease?",
          answer: "Washington requires: a move-in condition checklist signed by both parties, notice of the landlord's right of entry (24 hours minimum notice required), lead-based paint disclosure for pre-1978 buildings, Mold and Indoor Air Quality Notice, and notice of the Washington Residential Landlord-Tenant Act.",
        },
        {
          question: "Is there rent control in Washington state?",
          answer: "Washington state law currently preempts local rent control ordinances — cities cannot cap rent. Seattle has explored various tenant protection measures within this constraint. This preemption is periodically revisited by the legislature, so landlords and tenants should monitor legislative developments.",
        },
      ],
    },
    "llc-operating-agreement": {
      requirements: [
        "Washington LLC Act (RCW Chapter 25.15) governs LLCs",
        "Annual Report required by the LLC's anniversary date ($60 fee)",
        "Washington B&O (Business and Occupation) Tax: applies to LLC gross revenue",
        "Registered agent with Washington address required",
        "Series LLCs are NOT recognized under current Washington law",
      ],
      restrictions: [
        "LLC name must include 'Limited Liability Company,' 'LLC,' or 'L.L.C.'",
        "Professional LLCs required for licensed professionals",
        "Foreign LLCs must register with Washington Secretary of State",
      ],
      faq: [
        {
          question: "Does Washington require an LLC operating agreement?",
          answer: "Washington does not require an operating agreement to be filed with the state, but it is strongly recommended. Without one, the Washington LLC Act's default provisions apply. Washington law allows operating agreements to customize virtually all aspects of LLC governance.",
        },
        {
          question: "What is Washington's Business and Occupation (B&O) Tax?",
          answer: "Washington's B&O tax is a gross receipts tax applied to LLC revenue — not profit. The rate varies by business classification (0.471% for retail, 1.5% for services, etc.). Unlike most states' income taxes, B&O applies even if the LLC has no net income. It's a significant cost for Washington businesses.",
        },
        {
          question: "What is the annual report requirement for Washington LLCs?",
          answer: "Washington LLCs must file an Annual Report with the Secretary of State by the LLC's anniversary date each year. The filing fee is $60 online. Failure to file results in administrative dissolution after notice from the Secretary of State.",
        },
        {
          question: "Does Washington recognize series LLCs?",
          answer: "No. Washington does not currently recognize series LLCs. If you need separate liability silos for multiple business units, you must form separate LLC entities in Washington. Monitor legislative developments as Washington may adopt series LLC legislation in future sessions.",
        },
      ],
    },
    "employment-contract": {
      requirements: [
        "Washington minimum wage: $16.28/hour statewide (2024); higher in Seattle ($19.97/hour)",
        "Washington Paid Family and Medical Leave (PFML): up to 12 weeks paid leave",
        "Washington Noncompetition Covenant Act (RCW 49.62, effective 2020): significant restrictions",
        "WNCA: non-competes require annual earnings over $100,000 (employees) or $250,000 (contractors)",
        "WNCA: non-compete duration cannot exceed 18 months without clear and convincing evidence of need",
      ],
      restrictions: [
        "Non-competes void if employee/contractor earns below the income threshold",
        "Non-competes over 18 months presumptively unreasonable under WNCA",
        "Employer must disclose non-compete terms before the accepted job offer — not after",
      ],
      faq: [
        {
          question: "What is Washington's minimum wage in 2024?",
          answer: "Washington's statewide minimum wage is $16.28/hour in 2024 — one of the highest in the nation. Seattle's minimum wage is higher: $19.97/hour for large employers (500+ employees) and $17.25/hour for small employers. Washington's minimum wage adjusts annually with CPI.",
        },
        {
          question: "What does Washington's Noncompetition Covenant Act require?",
          answer: "The WNCA (RCW 49.62) imposes strict requirements: (1) non-competes are void for employees earning under $100,000/year or contractors earning under $250,000/year; (2) duration cannot exceed 18 months without clear and convincing evidence of necessity; (3) the employer must disclose the non-compete terms before the employee accepts the job offer; (4) employers must pay the employee's salary/wages during the restricted period (garden leave).",
        },
        {
          question: "Does Washington require garden leave for non-competes?",
          answer: "Yes. Washington's Noncompetition Covenant Act requires employers to pay the employee's base salary (or equivalent to the income threshold) during the period of enforcement. This 'garden leave' requirement makes Washington non-competes significantly more expensive for employers to enforce.",
        },
        {
          question: "What is Washington's Paid Family and Medical Leave program?",
          answer: "Washington PFML provides up to 12 weeks of paid leave (18 weeks combined for pregnancy/birth) at 60–90% of the employee's average weekly wage, funded by employee and employer payroll contributions. It covers bonding with a new child, serious health conditions, and qualifying military exigencies.",
        },
      ],
    },
    "power-of-attorney": {
      requirements: [
        "Washington Power of Attorney Act (RCW 11.125): comprehensive 2017 revision",
        "Must be signed before a notary public (or two witnesses if notary unavailable)",
        "Statutory form available under RCW 11.125.420",
        "Agent must sign an acceptance (RCW 11.125.300) before exercising authority",
        "Third parties must accept Washington statutory form POA within 7 business days",
      ],
      restrictions: [
        "Witnesses cannot be: the notary, the agent, or anyone who inherits from the principal",
        "Healthcare decisions require a separate Washington Healthcare Directive",
        "Real estate transactions: POA must be recorded with county auditor",
      ],
      faq: [
        {
          question: "What are the execution requirements for a Washington power of attorney?",
          answer: "Washington's 2017 Power of Attorney Act requires the principal to sign before a notary public. If a notary is unavailable, two adult witnesses may sign in place of the notary, but witnesses cannot be the agent or anyone who would inherit from the principal. The agent must also sign an acceptance before exercising any authority.",
        },
        {
          question: "Can a Washington bank refuse to honor a power of attorney?",
          answer: "Under RCW 11.125.330, financial institutions must accept a valid Washington POA within 7 business days of a written request. They can only refuse if the POA is invalid on its face, they have actual knowledge that it has been revoked, or there is reason to believe the agent is acting fraudulently.",
        },
        {
          question: "Does Washington have a statutory healthcare power of attorney?",
          answer: "Washington uses a combined Healthcare Directive (living will + healthcare proxy) under RCW 70.122. A separate Healthcare Power of Attorney can also be created. The financial Durable POA under RCW 11.125 does not authorize healthcare decisions — create both documents for complete planning.",
        },
        {
          question: "How do I revoke a Washington power of attorney?",
          answer: "Execute a written revocation of the POA and promptly notify the agent and all third parties who may have relied on it. If the POA was recorded with the county auditor for real estate purposes, record the revocation in the same county. The revocation is effective upon delivery to the agent.",
        },
      ],
    },
    "last-will-and-testament": {
      requirements: [
        "Washington Uniform Probate Code (RCW 11.12) governs will execution",
        "Two witnesses required — must sign within a reasonable time after testator signs",
        "Testator must sign in the presence of witnesses (or acknowledge prior signature)",
        "Self-proving will allowed: notary and witnesses sign affidavit (RCW 11.12.020(2))",
        "Testator must be 18+ (or married, or in military) and of sound mind",
      ],
      restrictions: [
        "Elective share: surviving spouse protected by community property laws — owns 1/2 of community property",
        "Washington estate tax: applies to estates over $2.193 million (2024) — one of lowest thresholds",
        "Holographic wills: valid in Washington if signed by testator and material portions in testator's handwriting",
      ],
      faq: [
        {
          question: "Does Washington have a state estate tax?",
          answer: "Yes. Washington imposes a state estate tax with one of the lowest thresholds in the nation: $2.193 million per person (2024). Rates range from 10% to 20%. Married couples can use portability planning, but Washington's threshold means many non-wealthy households need estate planning to minimize or avoid this tax.",
        },
        {
          question: "Are holographic wills valid in Washington?",
          answer: "Yes. Washington recognizes holographic wills under RCW 11.12.020 — wills in which the signature and material provisions are in the testator's handwriting. Witnesses are not required for a valid Washington holographic will. However, typed wills with witnesses and a self-proving affidavit are more reliable and easier to probate.",
        },
        {
          question: "How does Washington's community property law affect wills?",
          answer: "Washington is a community property state. Each spouse owns half of all property acquired during marriage. You can only dispose of your half in your will — your spouse automatically retains their half. Separate property (owned before marriage or received as gifts/inheritance) can be fully devised.",
        },
        {
          question: "How does Washington probate work?",
          answer: "Washington wills are probated in Superior Court in the county where the decedent lived. Washington offers an efficient 'nonintervention' administration where the executor acts without court supervision for most decisions. Small estates (under $100,000 with no real property) can use an affidavit procedure to avoid probate.",
        },
      ],
    },
    "non-compete-agreement": {
      requirements: [
        "Washington Noncompetition Covenant Act (RCW 49.62, effective January 1, 2020)",
        "Income threshold: non-competes require $100,000+ annual earnings for employees; $250,000 for contractors",
        "Duration: presumptively unreasonable if over 18 months",
        "Employer must disclose non-compete terms before the accepted job offer",
        "Employer must pay garden leave (base salary) during the enforcement period",
      ],
      restrictions: [
        "Non-competes for employees earning under $100,000 are void and unenforceable",
        "Non-competes over 18 months require clear and convincing evidence of necessity",
        "No non-compete can restrict an employee laid off without pay from seeking new employment",
      ],
      faq: [
        {
          question: "What is Washington's income threshold for non-compete agreements?",
          answer: "Washington's Noncompetition Covenant Act (RCW 49.62) voids non-competes for employees earning under $100,000/year and independent contractors earning under $250,000/year. These thresholds adjust annually with CPI. Non-competes for below-threshold workers are void regardless of what the employee signed.",
        },
        {
          question: "Does Washington require garden leave pay for non-competes?",
          answer: "Yes. Under RCW 49.62.020, employers must pay the employee base salary or the income threshold (whichever is higher) during the non-compete restriction period. This 'garden leave' requirement significantly increases the cost of enforcing non-competes and limits how many employers actually use them.",
        },
        {
          question: "Can Washington employers use non-solicitation agreements?",
          answer: "Non-solicitation clauses (restricting solicitation of customers or co-workers) are not explicitly covered by the Noncompetition Covenant Act if they are narrower than full non-competes. Courts analyze them under the general rule of reasonableness. For employees below the income threshold, even customer non-solicitation clauses face scrutiny.",
        },
        {
          question: "What happens if a Washington non-compete violates RCW 49.62?",
          answer: "A non-compete that violates the WNCA (e.g., applied to an employee earning below the threshold, or exceeding 18 months without justification) is void. The violating employer can be liable for the employee's attorney fees, costs, and any actual damages suffered. Courts can also impose a penalty equal to $5,000 or actual damages.",
        },
      ],
    },
    "independent-contractor-agreement": {
      requirements: [
        "Washington uses the 'economic reality test' for worker classification",
        "Washington Department of Labor and Industries (L&I) scrutinizes contractor status for workers' comp",
        "Washington Employment Security Department: separate classification test for unemployment",
        "Washington Paid Family and Medical Leave: contractors may opt in voluntarily",
        "Written contractor agreements strongly recommended to document independent status",
      ],
      restrictions: [
        "L&I presumes workers are employees — burden on hiring entity to prove contractor status",
        "Construction industry: additional Washington contractor registration requirements",
        "Misclassification triggers L&I workers' comp assessments, ESD unemployment taxes, and PFML contributions",
      ],
      faq: [
        {
          question: "How does Washington determine if a worker is an employee or contractor?",
          answer: "Washington uses the 'economic reality test' for most purposes and a specific 6-factor test for workers' compensation. L&I presumes workers are employees — the hiring entity must demonstrate the worker meets the contractor criteria. Factors include: independent business existence, equipment ownership, right to control, work for multiple clients, and profit/loss exposure.",
        },
        {
          question: "What are Washington's workers' compensation requirements for contractors?",
          answer: "Under Washington law, workers are presumed to be covered employees for workers' comp purposes. Contractors must meet a specific test to be excluded. Businesses that classify workers as contractors without meeting this test face retroactive L&I premium assessments and potential fines.",
        },
        {
          question: "What are the contractor registration requirements in Washington?",
          answer: "Construction contractors in Washington must register with L&I (Contractor Registration), carry general liability insurance ($60,000 minimum for general contractors), and provide proof of workers' comp coverage. Unregistered contractors face civil penalties and may be barred from bidding on public projects.",
        },
        {
          question: "What should a Washington independent contractor agreement include?",
          answer: "Essential provisions: scope and description of services, payment terms (project-based rather than hourly is better for contractor status), independent status declaration, contractor's tax and insurance obligations, IP ownership, confidentiality, termination rights, dispute resolution (consider arbitration), and governing Washington law.",
        },
      ],
    },
    "commercial-lease-agreement": {
      requirements: [
        "No statewide commercial rent control in Washington",
        "Washington common law and contract principles govern commercial leases",
        "3-day notice for non-payment of commercial rent before eviction filing",
        "Seattle commercial landlords: no specific additional disclosure requirements for commercial",
        "B&O tax implications for commercial landlords receiving rental income",
      ],
      restrictions: [
        "Self-help eviction is prohibited — must use unlawful detainer process",
        "Seattle: some local ordinances may apply to commercial landlords — verify current requirements",
        "Washington retail lease regulations: ensure compliance with local zoning and permitting",
      ],
      faq: [
        {
          question: "How does commercial eviction work in Washington?",
          answer: "For non-payment of commercial rent, the landlord serves a 3-day notice to pay or vacate. If unpaid, the landlord files an unlawful detainer action in Superior Court or District Court depending on the claim amount. Washington's commercial eviction process typically takes 3–6 weeks for uncontested matters.",
        },
        {
          question: "Is there commercial rent control in Washington?",
          answer: "No. Washington has no commercial rent control at the state or local level. Commercial lease rents, escalation clauses, and renewal terms are freely negotiated between landlord and tenant.",
        },
        {
          question: "What B&O tax obligations do Washington commercial landlords have?",
          answer: "Washington's Business and Occupation tax applies to commercial rental income at the 'service and other activities' rate (currently 1.5%). Commercial landlords must register with the Washington Department of Revenue and file regular B&O tax returns reporting gross rental receipts.",
        },
        {
          question: "What should a Washington commercial lease say about holdover tenancy?",
          answer: "Washington courts enforce holdover provisions as written. Specify whether holdover creates a month-to-month tenancy or a tenancy at sufferance, and set a holdover rent rate (typically 125–150% of last month's rent to discourage unauthorized holdovers). Failure to address holdover can create legal uncertainty.",
        },
      ],
    },
    "promissory-note": {
      requirements: [
        "Washington usury law: maximum 12% per year or 4 percentage points above 26-week T-bill rate (RCW 19.52.020)",
        "Licensed lenders (banks, credit unions, licensed consumer lenders) are exempt",
        "Statute of limitations: 6 years for written contracts (RCW 4.16.040)",
        "Real estate secured notes: deed of trust must be recorded with county auditor",
        "Documentary excise tax may apply to certain real estate-secured instruments",
      ],
      restrictions: [
        "Interest above the usury limit is collectible only at the legal rate — excess interest forfeited",
        "Consumer loans: additional Washington Consumer Loan Act requirements",
        "Mortgage/deed of trust recording required to perfect real property security interests",
      ],
      faq: [
        {
          question: "What is Washington's usury limit for promissory notes?",
          answer: "Washington's usury limit (RCW 19.52.020) is the greater of 12% per year or 4 percentage points above the average rate on 26-week U.S. Treasury bills. For private non-commercial loans, parties can agree to any rate in writing up to this limit. Licensed lenders are exempt. Exceeding the limit doesn't void the debt — the lender simply loses the excess interest.",
        },
        {
          question: "How long do I have to sue on a Washington promissory note?",
          answer: "Washington's statute of limitations for written contracts is 6 years (RCW 4.16.040). The clock starts from the date of default or the date payment was due. A demand letter does not toll the limitations period — file suit before the 6-year deadline.",
        },
        {
          question: "Does Washington use mortgages or deeds of trust for real estate-secured notes?",
          answer: "Washington primarily uses deeds of trust (not mortgages) to secure real property loans. A deed of trust allows non-judicial (trustee's sale) foreclosure, making it faster than judicial foreclosure. The deed of trust must be recorded with the county auditor where the property is located.",
        },
        {
          question: "What is Washington's Real Estate Excise Tax effect on promissory notes?",
          answer: "Washington's Real Estate Excise Tax (REET) applies to real property transfers. When a deed of trust secures a promissory note, the foreclosure sale triggers REET. For negotiated transfers in lieu of foreclosure, REET is calculated based on the fair market value of the property transferred.",
        },
      ],
    },
    "demand-letter": {
      requirements: [
        "No statutory form required in Washington",
        "Small claims (District Court): up to $10,000 for individuals",
        "Washington Consumer Protection Act (CPA, RCW 19.86): demand letter advisable before suit",
        "Construction defects: 45-day notice under Washington's Contractor Disclosures Act",
        "Insurance: 20-day response deadline for insurance claim demand letters",
      ],
      restrictions: [
        "Cannot threaten criminal prosecution for civil debt",
        "Washington Collection Agency Act (RCW 19.16): strict requirements for collection agencies",
        "Cannot misrepresent amount owed, legal status, or consequences of non-payment",
      ],
      faq: [
        {
          question: "What is Washington's small claims court limit?",
          answer: "Washington District Courts handle small claims up to $10,000. The process is simplified — formal rules of evidence do not apply, and parties typically represent themselves. For claims above $10,000, file in District Court under regular procedures or Superior Court depending on the amount.",
        },
        {
          question: "What are the requirements for a Washington Consumer Protection Act demand?",
          answer: "The Washington CPA (RCW 19.86) provides broad consumer remedies including treble damages (up to $25,000) and attorney fees. Before filing a CPA lawsuit, it's advisable to send a demand letter documenting the unfair or deceptive practice and giving the business an opportunity to remedy it.",
        },
        {
          question: "Can I recover attorney fees in a Washington demand letter case?",
          answer: "Washington generally follows the 'American Rule' — each party pays own attorney fees. Exceptions: the contract provides for fee recovery, or a statute authorizes it. The Washington Consumer Protection Act allows prevailing consumers to recover attorney fees. Under RCW 4.84.250, attorney fees up to $10,000 can be recovered in contract claims where judgment is under $10,000.",
        },
        {
          question: "What is Washington's statute of limitations for contract claims?",
          answer: "Washington allows 6 years to bring suit on a written contract (RCW 4.16.040) and 3 years for oral contracts (RCW 4.16.080). A demand letter does not toll the limitations period. If the deadline is approaching, file suit to preserve your rights and continue negotiations simultaneously.",
        },
      ],
    },
  },

  // ── Arizona ───────────────────────────────────────────────────────────────
  arizona: {
    "residential-lease-agreement": {
      requirements: [
        "Security deposit capped at 1.5 months' rent (ARS § 33-1321)",
        "Landlord must return deposit within 14 business days of lease end with itemized deductions",
        "Required disclosure: bed bug addendum for units with known history",
        "Smoke detector and carbon monoxide detector notice required",
        "Landlord must provide move-in inspection checklist before tenant takes possession",
        "Pool fence compliance required if property has a swimming pool (ARS § 36-1681)",
      ],
      restrictions: [
        "No statewide rent control — ARS § 33-1329 prohibits municipalities from enacting rent control",
        "Late fees must be stated in the lease; courts may reduce unreasonable amounts",
        "Landlord may not shut off utilities as an eviction tactic",
      ],
      noticeRequirements: "30 days' written notice required to terminate a month-to-month tenancy (ARS § 33-1375)",
      faq: [
        {
          question: "What is the maximum security deposit in Arizona?",
          answer: "Arizona limits security deposits to one and one-half months' rent under ARS § 33-1321. This cap applies to all residential tenancies. The landlord must return the deposit within 14 business days of the tenant vacating, with an itemized written statement of any deductions.",
        },
        {
          question: "How much notice must an Arizona landlord give before entering the unit?",
          answer: "Under ARS § 33-1343, landlords must give at least two days' notice before entering for non-emergency repairs or inspections. Emergency entries are permitted without notice. Entry must occur at reasonable times.",
        },
        {
          question: "Does Arizona have just cause eviction requirements?",
          answer: "No. Arizona does not require landlords to have just cause to terminate a tenancy. For month-to-month leases, 30 days' written notice is sufficient. For material lease violations, landlords must provide a 5-day notice to cure or quit.",
        },
        {
          question: "What disclosures are required in an Arizona residential lease?",
          answer: "Arizona requires disclosure of the landlord's name and address (or property manager), lead paint disclosures for pre-1978 properties, and bed bug history if applicable. The lease should also address pool fencing compliance if the property has a pool.",
        },
      ],
    },
    "llc-operating-agreement": {
      requirements: [
        "Arizona LLCs are governed by ARS Title 29, Chapter 7 (Arizona LLC Act)",
        "Articles of Organization filed with Arizona Corporation Commission; filing fee $50",
        "Publication requirement: LLCs formed in Maricopa or Pima County must publish a notice for 3 consecutive weeks in an approved newspaper",
        "Annual report required — due by April 1 of each year",
        "Statutory agent with Arizona address required",
        "Operating agreement does not need to be filed with the state but should be signed by all members",
      ],
      restrictions: [
        "Arizona does not recognize series LLCs — use separate entity structures for liability segregation",
        "LLC name must include 'Limited Liability Company,' 'L.L.C.,' or 'LLC'",
        "Professional LLCs (law, medicine, accounting) require additional licensing board approval",
      ],
      faq: [
        {
          question: "Does Arizona require an LLC operating agreement?",
          answer: "Arizona does not require a written operating agreement by statute, but ARS § 29-3105 allows members to adopt one. Without a written agreement, the default rules under the Arizona LLC Act govern, which may not reflect member intentions. A written operating agreement is strongly recommended.",
        },
        {
          question: "What is Arizona's LLC publication requirement?",
          answer: "LLCs formed in counties other than Maricopa and Pima must publish a notice of LLC formation in an approved newspaper for 3 consecutive weeks. LLCs in Maricopa and Pima counties are exempt from this requirement due to the ACC's online database.",
        },
        {
          question: "How much does it cost to form an LLC in Arizona?",
          answer: "The Arizona Corporation Commission charges $50 to file Articles of Organization. Expedited processing is available for an additional fee. LLCs outside Maricopa/Pima counties must budget for newspaper publication costs, typically $40–$75.",
        },
        {
          question: "Are single-member LLCs recognized in Arizona?",
          answer: "Yes. Arizona fully recognizes single-member LLCs. They provide the same liability protection as multi-member LLCs and are treated as disregarded entities for federal tax purposes by default.",
        },
      ],
    },
    "employment-contract": {
      requirements: [
        "At-will employment is the default in Arizona — include explicit at-will language",
        "Arizona minimum wage: $14.35/hour as of January 1, 2024 (indexed to inflation)",
        "Earned Paid Sick Time required: accrues at 1 hour per 30 hours worked (ARS § 23-371)",
        "Employers with 15+ employees must provide up to 40 hours paid sick leave annually",
        "E-Verify enrollment required for all Arizona employers under ARS § 23-214",
        "Include non-compete language carefully — Arizona courts enforce reasonable restrictions",
      ],
      restrictions: [
        "Non-compete agreements must be reasonable in geographic scope, duration, and protected interest",
        "Arizona prohibits discrimination based on sexual orientation and gender identity under the Arizona Civil Rights Act",
        "Wage theft is a crime under ARS § 23-355 — final paycheck due next regular payday",
      ],
      faq: [
        {
          question: "Is Arizona an at-will employment state?",
          answer: "Yes. Arizona is an at-will employment state, meaning either the employer or employee can terminate the relationship at any time for any lawful reason. Your employment contract should explicitly state this to avoid implied contract claims.",
        },
        {
          question: "What is the minimum wage in Arizona?",
          answer: "Arizona's minimum wage is $14.35 per hour as of January 1, 2024, and adjusts annually based on the cost of living (CPI). Some cities, including Flagstaff, have higher local minimum wages.",
        },
        {
          question: "Is E-Verify mandatory for Arizona employers?",
          answer: "Yes. All Arizona employers, regardless of size, must use E-Verify to confirm the employment eligibility of new hires under ARS § 23-214. Failure to comply can result in suspension or revocation of business licenses.",
        },
        {
          question: "Are non-compete agreements enforceable in Arizona?",
          answer: "Yes, Arizona enforces non-compete agreements if they are reasonable in duration, geographic scope, and protect a legitimate business interest. Unlike California, Arizona does not broadly ban non-competes. Courts may blue-pencil (narrow) unreasonable restrictions rather than void them entirely.",
        },
      ],
    },
    "power-of-attorney": {
      requirements: [
        "Governed by ARS Title 14, Chapter 5, Article 5 (Uniform Power of Attorney Act adopted 2017)",
        "Principal must be 18+ and of sound mind at time of signing",
        "Must be signed by the principal (or by another at principal's direction)",
        "Must be notarized — notarization is required for validity",
        "Two witness signatures are required in addition to notarization",
        "Durable POA language must expressly state it survives incapacity",
      ],
      restrictions: [
        "Healthcare decisions require a separate Arizona Health Care Directive or Health Care POA",
        "An agent cannot make or change a principal's will, revoke a trust the principal cannot revoke, or make gifts to themselves unless expressly authorized",
        "POA is void if principal was under undue influence or lacked mental capacity when signed",
      ],
      faq: [
        {
          question: "Does Arizona require witnesses for a power of attorney?",
          answer: "Yes. Under Arizona's Uniform Power of Attorney Act (ARS § 14-5502), a power of attorney must be signed by the principal, notarized, and signed by two witnesses. The agent, the notary, and heirs of the principal cannot serve as witnesses.",
        },
        {
          question: "What makes a power of attorney 'durable' in Arizona?",
          answer: "A durable POA in Arizona must contain language stating that the authority granted is not affected by the principal's subsequent incapacity — for example, 'This power of attorney shall not be affected by subsequent disability or incapacity of the principal.' Without durable language, the POA terminates if the principal becomes incapacitated.",
        },
        {
          question: "Can I use an Arizona POA to make healthcare decisions?",
          answer: "A standard POA does not cover healthcare decisions in Arizona. You need a separate Health Care Power of Attorney (ARS § 36-3221) or Arizona Health Care Directive to authorize an agent to make medical decisions on your behalf.",
        },
        {
          question: "When does an Arizona power of attorney expire?",
          answer: "A POA expires when the principal dies, revokes it in writing, or — for non-durable POAs — when the principal becomes incapacitated. A durable POA survives incapacity. Courts or a guardian/conservator may also terminate an agent's authority.",
        },
      ],
    },
    "last-will-and-testament": {
      requirements: [
        "Testator must be 18+ or legally married/emancipated (ARS § 14-2501)",
        "Testator must be of sound mind and not under undue influence",
        "Will must be signed by the testator (or by another in testator's presence and at direction)",
        "Two witnesses must sign the will — they must be present when testator signs",
        "Witnesses should not be beneficiaries to avoid conflicts",
        "Self-proving affidavit available if will is notarized — simplifies probate",
      ],
      restrictions: [
        "Holographic (handwritten) wills are valid in Arizona if entirely in testator's handwriting and signed",
        "Spouse has community property rights that may limit testamentary freedom over shared assets",
        "A will cannot override beneficiary designations on retirement accounts or life insurance",
      ],
      faq: [
        {
          question: "Does Arizona require a will to be notarized?",
          answer: "Notarization is not required for a valid will in Arizona. However, adding a self-proving affidavit (which is notarized) allows the will to be admitted to probate without requiring witnesses to testify, simplifying the process.",
        },
        {
          question: "Are handwritten wills valid in Arizona?",
          answer: "Yes. Arizona recognizes holographic wills under ARS § 14-2503. A holographic will must be in the testator's own handwriting and signed. It does not require witnesses. However, typed or printed wills with two witnesses are more reliable and less likely to be contested.",
        },
        {
          question: "What happens in Arizona if I die without a will?",
          answer: "Arizona intestacy laws (ARS § 14-2101 et seq.) govern distribution. For married decedents, community property passes to the surviving spouse. Separate property is split between the spouse and children. Unmarried individuals' assets pass to children, then parents, then siblings.",
        },
        {
          question: "Does Arizona have a simplified probate process?",
          answer: "Yes. Arizona offers a simplified affidavit process for estates with personal property under $75,000 and real property under $100,000. For larger estates, formal probate through the Superior Court is required. A properly drafted will speeds up the process.",
        },
      ],
    },
    "non-compete-agreement": {
      requirements: [
        "Must be supported by adequate consideration — new employment, promotion, or specific payment",
        "Must protect a legitimate business interest: trade secrets, customer relationships, or specialized training",
        "Must be reasonable in geographic scope relative to the employer's actual market",
        "Must be reasonable in duration — typically 1–2 years; courts scrutinize longer terms",
        "Must be reasonable in the scope of activities restricted",
        "Should include a non-solicitation clause separately from the non-compete",
      ],
      restrictions: [
        "Arizona courts may blue-pencil (reform) overly broad non-competes rather than void them entirely",
        "Non-competes are generally not enforceable for low-wage workers when they restrict general employment",
        "Garden leave or consideration at signing strengthens enforceability",
      ],
      faq: [
        {
          question: "Are non-compete agreements enforceable in Arizona?",
          answer: "Yes. Arizona enforces non-compete agreements if they are ancillary to a legitimate contract, protect a legitimate business interest, and are reasonable in scope, geography, and duration. Courts use a reasonableness balancing test.",
        },
        {
          question: "What duration is typically acceptable for an Arizona non-compete?",
          answer: "Arizona courts generally uphold non-competes of 1–2 years. Longer terms (3+ years) face heightened scrutiny and are more likely to be modified or struck down. The duration must be proportionate to the employer's legitimate interest.",
        },
        {
          question: "Can Arizona courts modify an overly broad non-compete?",
          answer: "Yes. Arizona applies the blue-pencil doctrine, allowing courts to narrow an unreasonable non-compete rather than void it entirely. Courts may reduce the geographic scope or duration to make it reasonable.",
        },
        {
          question: "Does a non-compete need to be signed at the start of employment?",
          answer: "It is best practice to have employees sign non-competes at the time of hire as part of the employment offer. Signing mid-employment requires additional consideration — a promotion, bonus, or other benefit — to be enforceable.",
        },
      ],
    },
    "independent-contractor-agreement": {
      requirements: [
        "Clearly establish independent contractor status — Arizona uses IRS common-law factors",
        "Specify that contractor controls the means and methods of work, not just the results",
        "Include IP ownership and work-for-hire provisions",
        "Address confidentiality and trade secret protections separately",
        "Arizona E-Verify law (ARS § 23-214) requires verification even for contractors if they are working on-site",
        "Include indemnification clause covering contractor's own negligence",
      ],
      restrictions: [
        "Misclassification of employees as contractors violates ARS § 23-901 and triggers tax and benefit liability",
        "Arizona Industrial Commission may apply its own classification test for workers' compensation",
        "Contractors must carry their own liability insurance if working on client premises",
      ],
      faq: [
        {
          question: "How does Arizona determine if a worker is an employee or contractor?",
          answer: "Arizona primarily uses the IRS common-law test (behavioral control, financial control, type of relationship) for income tax classification. The Arizona Industrial Commission uses an economic reality test for workers' compensation. Misclassification exposes businesses to back taxes, benefits, and penalties.",
        },
        {
          question: "Does Arizona's E-Verify requirement apply to contractors?",
          answer: "E-Verify is required for all employees. For independent contractors, it is required if they perform work on-site or if the contractor is an individual (not a business entity). Using a properly structured contractor agreement with a business entity can reduce this obligation.",
        },
        {
          question: "What IP provisions should an Arizona contractor agreement include?",
          answer: "Include a work-for-hire clause and an assignment of rights for all work product created under the agreement. Specify that the contractor retains rights to pre-existing IP and tools. For software or creative work, also include a license-back clause if needed.",
        },
        {
          question: "Can an Arizona contractor be subject to a non-compete?",
          answer: "Yes. Non-compete clauses in contractor agreements are enforceable in Arizona if reasonable in scope and duration. Arizona courts apply the same balancing test as for employee non-competes. Include them in the contractor agreement at the outset.",
        },
      ],
    },
    "commercial-lease-agreement": {
      requirements: [
        "No statutory form required — governed by common law and contract terms",
        "Phoenix and Scottsdale commercial leases often include tenant improvement allowances (TI) negotiated at signing",
        "Triple net (NNN) leases common in Arizona commercial market — tenant pays taxes, insurance, and maintenance",
        "Personal guarantee often required from individual principals of small business tenants",
        "Zoning compliance is tenant's responsibility — confirm zoning before signing",
        "Include a holdover rent provision — typically 125–150% of base rent",
      ],
      restrictions: [
        "Arizona does not regulate commercial lease terms — all provisions are negotiable",
        "Landlord's right to relocate tenant must be expressly stated in the lease",
        "Assignment and subletting rights must be negotiated — default is landlord approval required",
      ],
      faq: [
        {
          question: "Is a commercial lease in Arizona required to be in writing?",
          answer: "Commercial leases for more than one year must be in writing under Arizona's Statute of Frauds (ARS § 44-101). Even short-term commercial leases should be in writing to avoid disputes. Oral commercial leases of one year or less are technically enforceable but risky.",
        },
        {
          question: "What is a triple net (NNN) lease in Arizona?",
          answer: "A triple net lease requires the tenant to pay base rent plus their proportionate share of property taxes, building insurance, and common area maintenance (CAM). NNN leases are common in Arizona retail and industrial markets. Tenants should audit CAM charges annually.",
        },
        {
          question: "What is a typical lease term for commercial space in Phoenix?",
          answer: "Retail and office leases in the Phoenix metro area typically run 3–5 years. Landlords offer longer terms (5–10 years) for tenants who receive significant tenant improvement allowances. Shorter terms are available but usually at higher per-square-foot rates.",
        },
        {
          question: "Can a commercial tenant sublease space in Arizona?",
          answer: "Only if the lease expressly permits it. Most Arizona commercial leases require written landlord consent for assignment or subletting. Negotiate sublease rights upfront, particularly if your business may need to scale down or transfer the lease.",
        },
      ],
    },
    "promissory-note": {
      requirements: [
        "Must include: principal amount, interest rate, repayment schedule, and maturity date",
        "Governed by ARS § 44-1201 et seq. and the Uniform Commercial Code as adopted in Arizona",
        "Maximum interest rate: 10% per year unless a higher rate is expressly agreed in writing",
        "For consumer loans above $10,000, the agreed rate may exceed 10% if in writing",
        "Secured notes must reference and attach the security agreement or deed of trust",
        "Notarization is not required but recommended for notes secured by real property",
      ],
      restrictions: [
        "Arizona usury law limits interest to 10%/year for non-commercial loans without a written agreement",
        "Confession of judgment clauses are unenforceable in Arizona consumer transactions",
        "Prepayment penalties must be expressly stated — courts disfavor them in consumer notes",
      ],
      faq: [
        {
          question: "What is the maximum interest rate on a promissory note in Arizona?",
          answer: "Arizona's legal rate is 10% per year (ARS § 44-1201). Parties may agree in writing to a higher rate. For business-to-business loans, the contracted rate is enforceable without an upper cap. Consumer loan rates above 36% may face scrutiny under federal law.",
        },
        {
          question: "Does an Arizona promissory note need to be notarized?",
          answer: "Notarization is not required for a promissory note to be valid in Arizona. However, if the note is secured by real property (deed of trust), the deed of trust must be notarized and recorded with the county recorder.",
        },
        {
          question: "What is the statute of limitations on a promissory note in Arizona?",
          answer: "Under ARS § 12-548, the statute of limitations on a written contract (including a promissory note) is 6 years from the date of breach. The clock restarts if the debtor makes a partial payment or acknowledges the debt in writing.",
        },
        {
          question: "Can a promissory note be transferred to another person?",
          answer: "Yes. A properly drafted promissory note is a negotiable instrument under Arizona's UCC (ARS § 47-3104). The payee can transfer (endorse) it to a third party, who then has the right to collect. To restrict transferability, include a 'non-negotiable' clause.",
        },
      ],
    },
    "demand-letter": {
      requirements: [
        "No statutory form required — must clearly state the claim, amount owed, and deadline to respond",
        "Identify parties with full legal names and addresses",
        "Attach supporting documentation: contracts, invoices, payment history, communications",
        "State the specific remedy demanded — payment, performance, or cure",
        "Set a firm response deadline — typically 10–30 days",
        "Send by certified mail with return receipt and retain a copy",
      ],
      restrictions: [
        "Demand letters may not contain false statements or misrepresent the legal basis of a claim",
        "Debt collection demand letters must comply with the FDCPA if sent by a third-party collector",
        "Threatening criminal prosecution solely to collect a civil debt may violate ARS § 13-2306",
      ],
      faq: [
        {
          question: "Is a demand letter required before suing in Arizona?",
          answer: "A demand letter is not legally required before filing most civil suits in Arizona. However, it is required before filing in Small Claims Court for many contract disputes. Even when not required, it often resolves disputes without litigation and demonstrates good faith.",
        },
        {
          question: "What is the statute of limitations on contract claims in Arizona?",
          answer: "Under ARS § 12-548, written contract claims must be filed within 6 years of the breach. Oral contracts have a 3-year limitation period under ARS § 12-543. A demand letter does not toll (pause) the statute of limitations — file suit before the deadline if negotiation fails.",
        },
        {
          question: "What should an Arizona demand letter include?",
          answer: "An effective Arizona demand letter should: identify the parties, summarize the facts of the dispute, state the legal basis for your claim, specify the exact remedy demanded (dollar amount, action required), set a clear deadline, and warn of your intention to file suit if the demand is not met.",
        },
        {
          question: "Can I send a demand letter for an unpaid invoice in Arizona?",
          answer: "Yes. For unpaid invoices, include the invoice number, date of service, amount due, and any interest that has accrued. If your contract allows attorney's fees for collection, reference that provision — it creates additional incentive for the debtor to pay.",
        },
      ],
    },
  },

  // ── Colorado ──────────────────────────────────────────────────────────────
  colorado: {
    "residential-lease-agreement": {
      requirements: [
        "Security deposit: no statutory cap, but must be returned within 30 days (or 60 days if lease says so) with itemized deductions",
        "Required disclosure: mold and radon disclosures recommended; lead paint for pre-1978 buildings",
        "HB 23-1099 (2023): landlords must provide 21 days' written notice before terminating a month-to-month tenancy",
        "Required: written notice of landlord's name and address for service",
        "Landlord must provide habitable conditions under CRS § 38-12-503",
        "Smoke-free and cannabis policies must be addressed in the lease",
      ],
      restrictions: [
        "Colorado statewide rent control is prohibited under CRS § 38-12-301",
        "Late fees are capped at $50 or 5% of the monthly rent, whichever is greater (HB 21-1121)",
        "Landlord cannot charge application fees that exceed actual screening costs",
      ],
      noticeRequirements: "21 days' written notice required to terminate a month-to-month tenancy (HB 23-1099); 91 days if tenant has resided 3+ years",
      faq: [
        {
          question: "What is Colorado's rule on security deposit returns?",
          answer: "Colorado requires landlords to return the security deposit within 30 days of lease termination, along with a written itemized statement of deductions. The lease can extend this period to 60 days. Failure to comply allows tenants to recover up to 3x the wrongfully withheld amount.",
        },
        {
          question: "Are late fees capped in Colorado?",
          answer: "Yes. Under HB 21-1121, Colorado caps residential late fees at the greater of $50 or 5% of the monthly rent. Any late fee above this amount is unenforceable. Late fees can only be charged after a grace period stated in the lease.",
        },
        {
          question: "How much notice is required to terminate a month-to-month lease in Colorado?",
          answer: "Under HB 23-1099 (effective August 7, 2023), landlords must give 21 days' notice for tenancies under 6 months, 28 days for 6–12 months, 91 days for 1–3 years, and 182 days for tenancies over 3 years. Tenants must give notice equal to the rent period.",
        },
        {
          question: "Does Colorado allow landlords to prohibit subleasing?",
          answer: "Yes. Colorado landlords can prohibit subleasing in the lease agreement. If the lease is silent, tenants may sublease with reasonable notice to the landlord. Landlords cannot unreasonably withhold consent to a qualified subtenant.",
        },
      ],
    },
    "llc-operating-agreement": {
      requirements: [
        "Governed by Colorado Business Corporation Act — Title 7, Article 90 (Colorado LLC Act)",
        "Articles of Organization filed with Colorado Secretary of State; online filing fee $50",
        "Periodic report required annually — $10 filing fee, due by end of anniversary month",
        "Registered agent with Colorado street address required",
        "No publication requirement in Colorado",
        "Operating agreement does not need to be filed but should be signed by all members",
      ],
      restrictions: [
        "Colorado LLC names must include 'Limited Liability Company,' 'LLC,' or 'L.L.C.'",
        "Professional LLCs (law, medicine) require state board authorization in addition to LLC formation",
        "Series LLCs are recognized in Colorado under CRS § 7-80-204 (effective 2020)",
      ],
      faq: [
        {
          question: "Does Colorado require an LLC operating agreement?",
          answer: "Colorado does not require LLCs to have an operating agreement, but CRS § 7-80-108 allows members to adopt one. Without a written agreement, default statutory rules govern — which may not match member intentions. All LLCs should have a signed operating agreement.",
        },
        {
          question: "How much does it cost to form an LLC in Colorado?",
          answer: "Colorado charges $50 to file Articles of Organization online with the Secretary of State. The annual periodic report costs $10. There is no state income tax on LLCs at the entity level — members pay Colorado income tax on their pass-through income.",
        },
        {
          question: "Does Colorado recognize series LLCs?",
          answer: "Yes. Colorado recognizes series LLCs under CRS § 7-80-204, effective January 1, 2020. A series LLC allows a single LLC to have separate series with distinct assets and liabilities. This is useful for real estate investors holding multiple properties.",
        },
        {
          question: "What is the Colorado annual report for LLCs?",
          answer: "Colorado LLCs must file a Periodic Report with the Secretary of State each year during the anniversary month of formation. The fee is $10. Failure to file results in the LLC being placed in delinquent status and eventually administratively dissolved.",
        },
      ],
    },
    "employment-contract": {
      requirements: [
        "At-will employment is the default in Colorado — include explicit at-will language",
        "Colorado minimum wage: $14.42/hour (2024); Denver's local rate is $18.29/hour (2024)",
        "HELP Rules (COMPS Order #39): overtime required for most employees over 40 hours/week or 12 hours/day",
        "Colorado FAMLI Act: mandatory paid family and medical leave starting January 1, 2024",
        "Colorado EPEWA (2021): job postings must include salary range and benefits information",
        "Paid sick leave: 48 hours per year under HFWA (Healthy Families and Workplaces Act)",
      ],
      restrictions: [
        "SB 21-271 (2022): non-competes unenforceable for workers earning under $123,750 (2024 threshold, adjusted annually)",
        "Non-solicitation agreements are limited to workers earning at least $60,750 (2024 threshold)",
        "Employers must disclose non-compete terms in a separate signed document — not buried in employment contracts",
      ],
      faq: [
        {
          question: "Are non-compete agreements enforceable in Colorado?",
          answer: "Colorado SB 21-271 (2022) significantly restricted non-competes. They are only enforceable for workers earning at least $123,750 per year (2024 threshold, adjusted annually for inflation). The non-compete must be in a separate, signed document and narrowly tailored to protect legitimate trade secrets.",
        },
        {
          question: "What is Colorado's salary transparency requirement?",
          answer: "Under the Equal Pay for Equal Work Act (EPEWA), Colorado employers must include the salary range, benefits, and other compensation in all job postings — including remote jobs that could be performed in Colorado. Failure to comply results in fines.",
        },
        {
          question: "What is Colorado's minimum wage in 2024?",
          answer: "Colorado's state minimum wage is $14.42/hour in 2024. Denver has its own local minimum wage of $18.29/hour for 2024. Employers must pay whichever rate is higher. The state rate adjusts annually based on CPI.",
        },
        {
          question: "What is Colorado's FAMLI paid leave program?",
          answer: "The Colorado Family and Medical Leave Insurance (FAMLI) program provides up to 12 weeks of paid family and medical leave. Employers contribute 0.9% of wages, split between employer and employee. Benefits became available January 1, 2024.",
        },
      ],
    },
    "power-of-attorney": {
      requirements: [
        "Governed by Colorado's Uniform Power of Attorney Act (CRS § 15-14-701 et seq.)",
        "Principal must be 18+ and competent at time of signing",
        "Must be signed by the principal (or by another at the principal's direction)",
        "Must be notarized — two witnesses are also recommended but not required by statute",
        "Durable POA must expressly state it survives incapacity",
        "Healthcare POA and advance directive are separate documents under CRS § 15-18.5-101",
      ],
      restrictions: [
        "Agent cannot make or change principal's will, create or revoke a trust, or make gifts to themselves without express authorization",
        "POA created under duress or by undue influence is voidable",
        "Springing POA (effective on incapacity) must define how incapacity is determined — physician certification is standard",
      ],
      faq: [
        {
          question: "Does Colorado require witnesses for a power of attorney?",
          answer: "Colorado's Uniform Power of Attorney Act (CRS § 15-14-705) requires the principal's signature to be notarized. Witnesses are strongly recommended but not strictly required by statute. Financial institutions often require notarization before honoring a POA.",
        },
        {
          question: "What is a durable power of attorney in Colorado?",
          answer: "A durable POA in Colorado remains effective even if the principal becomes incapacitated. Under CRS § 15-14-704, a POA is durable if it contains language such as 'This power of attorney shall not be affected by the incapacity of the principal.' Without durable language, the POA terminates upon incapacity.",
        },
        {
          question: "Can I use a Colorado POA to make medical decisions?",
          answer: "No. A standard financial POA does not cover medical decisions in Colorado. You need a separate Medical Durable Power of Attorney under CRS § 15-18.5-101 to authorize an agent to make healthcare decisions. A Colorado Advance Directive for Medical/Surgical Treatment can also address end-of-life decisions.",
        },
        {
          question: "How do I revoke a power of attorney in Colorado?",
          answer: "To revoke a Colorado POA, sign a written revocation and notify the agent and any third parties relying on the POA (banks, financial institutions). Record the revocation with the county clerk if the POA was used for real estate transactions. A new POA automatically revokes prior POAs for the same matters unless stated otherwise.",
        },
      ],
    },
    "last-will-and-testament": {
      requirements: [
        "Testator must be 18+ or legally married (CRS § 15-11-501)",
        "Testator must be of sound mind — no undue influence or fraud",
        "Will must be signed by the testator or by another at testator's direction in testator's presence",
        "Two witnesses must sign — they should not be beneficiaries",
        "Witnesses must sign within a reasonable time after witnessing testator's signature",
        "Self-proving affidavit (with notarization) available to simplify probate",
      ],
      restrictions: [
        "Holographic (entirely handwritten) wills are valid in Colorado under CRS § 15-11-502",
        "Spouses have elective share rights under CRS § 15-11-201 — surviving spouse can claim at least 50% of the augmented estate",
        "A will cannot override beneficiary designations on retirement accounts or life insurance",
      ],
      faq: [
        {
          question: "Does Colorado require a will to be notarized?",
          answer: "Notarization is not required for a valid will in Colorado. However, adding a self-proving affidavit — which requires notarization — allows the will to be admitted to probate without witness testimony, making the process easier. We strongly recommend including one.",
        },
        {
          question: "Are handwritten wills valid in Colorado?",
          answer: "Yes. Colorado recognizes holographic wills under CRS § 15-11-502. A holographic will must be in the testator's own handwriting and signed. No witnesses are required. However, typed wills with two witnesses are less vulnerable to challenge.",
        },
        {
          question: "What is Colorado's probate process for wills?",
          answer: "Colorado offers informal (unsupervised) and formal (supervised) probate through the District Court. Most estates use informal probate, which is simpler and less expensive. Small estates under $74,000 (2024) with no real property may qualify for an affidavit procedure without probate.",
        },
        {
          question: "What rights does a surviving spouse have in Colorado?",
          answer: "Colorado is a common-law property state. The surviving spouse has an elective share right — they can claim a percentage of the 'augmented estate' (typically 50% after a long marriage) even if the will leaves them less. This right must be exercised within 9 months of death.",
        },
      ],
    },
    "non-compete-agreement": {
      requirements: [
        "Only enforceable for workers earning at least $123,750/year (2024 threshold, adjusted annually)",
        "Must be in a separate, signed document — cannot be buried in an employment contract",
        "Employer must provide the agreement 14 days before the start of employment or change of terms",
        "Must be narrowly tailored to protect trade secrets or confidential information",
        "Must include a copy of SB 21-271 disclosure or equivalent notice",
        "Geographic scope and duration must be reasonable relative to the employee's role",
      ],
      restrictions: [
        "Non-competes for workers below the earnings threshold are void and unenforceable — no reformation allowed",
        "Non-solicitation agreements have a separate lower threshold ($60,750/year) and 12-month maximum",
        "Employers who violate SB 21-271 face penalties including attorney's fees and statutory damages",
      ],
      faq: [
        {
          question: "What changed about Colorado non-competes in 2022?",
          answer: "SB 21-271 (effective August 10, 2022) dramatically restricted non-competes in Colorado. They are now only enforceable for workers earning at least $123,750/year (2024), must be in a separate signed document, and must be narrowly tailored. Non-competes for lower-wage workers are void.",
        },
        {
          question: "What is the earnings threshold for Colorado non-competes?",
          answer: "The threshold is $123,750/year as of 2024, adjusted annually for inflation. Workers earning below this amount cannot be bound by non-compete agreements, period — courts will not reform the agreement. Non-solicitation agreements have a lower threshold of $60,750/year.",
        },
        {
          question: "Can Colorado courts modify an overly broad non-compete?",
          answer: "For qualifying high-earner non-competes, Colorado courts can still apply equitable principles to reform overly broad agreements. However, for workers below the earnings threshold, the agreement is void outright — courts have no authority to modify it.",
        },
        {
          question: "How much notice must a Colorado employer give before signing a non-compete?",
          answer: "Under SB 21-271, employers must provide the non-compete agreement at least 14 days before the start of employment. For existing employees, 14 days' advance notice is also required before the new terms take effect. Last-minute signing is not enforceable.",
        },
      ],
    },
    "independent-contractor-agreement": {
      requirements: [
        "Clearly establish independent contractor status using IRS common-law factors",
        "Specify that contractor controls the methods of work, not just the results",
        "Include IP ownership clause — work for hire and assignment of rights",
        "Address Colorado-specific licensing requirements if contractor performs licensed work",
        "Specify contractor's responsibility to comply with FAMLI and other Colorado employment laws as self-employed",
        "Include indemnification clause covering contractor's own acts and omissions",
      ],
      restrictions: [
        "Colorado FAMLI program applies to self-employed individuals who opt in — address in agreement",
        "Colorado Wage Act (CRS § 8-4-101) applies to employees, not contractors — misclassification is costly",
        "Colorado Division of Labor may apply economic reality test for wage/hour classification",
      ],
      faq: [
        {
          question: "How does Colorado determine contractor vs. employee status?",
          answer: "Colorado uses a multi-factor test under the Wage Protection Act and Unemployment Insurance statutes. Key factors include whether the worker is free from control, engaged in an independent trade, and performs work outside the company's usual business. The IRS test applies for federal income tax purposes.",
        },
        {
          question: "Must Colorado contractors comply with FAMLI?",
          answer: "Self-employed workers in Colorado can opt into FAMLI coverage voluntarily. If a worker is a legitimate independent contractor, FAMLI premiums are not automatically required. However, misclassified employees who should be on payroll trigger the employer's FAMLI contribution obligation.",
        },
        {
          question: "What IP provisions should a Colorado contractor agreement include?",
          answer: "Include a work-for-hire clause, an assignment of all rights in deliverables, and a license grant for any pre-existing IP incorporated into the work. Specify that the contractor retains ownership of their own tools and background technology.",
        },
        {
          question: "Does Colorado's salary transparency law apply to contractor roles?",
          answer: "Colorado's EPEWA (Equal Pay for Equal Work Act) applies to employees, not independent contractors. However, if a role is later reclassified as employment, failure to post compensation information could trigger liability. Be explicit about the contractor relationship in writing.",
        },
      ],
    },
    "commercial-lease-agreement": {
      requirements: [
        "No statutory form required — governed by common law and the lease agreement",
        "Denver and Boulder commercial markets have strong tenant improvement allowance (TI) expectations",
        "Triple net (NNN) and gross leases both common depending on property type and market",
        "ADA compliance is the responsibility of the party making tenant improvements — specify in lease",
        "CAM (common area maintenance) charges must be defined with audit rights",
        "Force majeure clause important given Colorado's history of severe weather events",
      ],
      restrictions: [
        "Colorado does not regulate commercial lease terms — all provisions are negotiable",
        "Landlord's right to terminate or relocate must be expressly reserved in the lease",
        "Assignment and subletting require landlord's written consent unless otherwise agreed",
      ],
      faq: [
        {
          question: "What is common in a Denver commercial lease?",
          answer: "Denver commercial leases typically include triple net (NNN) structures for retail, with tenants paying base rent plus a proportionate share of taxes, insurance, and CAM. Tenant improvement allowances of $20–$60 per square foot are common for longer-term leases (5+ years).",
        },
        {
          question: "How does Colorado's altitude/climate affect commercial lease terms?",
          answer: "Colorado's weather can be severe — leases often include force majeure clauses addressing snow, ice, and natural disasters. HVAC maintenance responsibilities should be clearly allocated, as Colorado's climate stresses systems. Roof inspection warranties are important for mountain properties.",
        },
        {
          question: "Can a Colorado commercial tenant sublease their space?",
          answer: "Only if permitted by the lease. Most Colorado commercial leases require the landlord's prior written consent for subleasing. Negotiate sublease rights at the outset, especially for longer-term leases where business circumstances may change.",
        },
        {
          question: "What is the statute of frauds for Colorado commercial leases?",
          answer: "Commercial leases exceeding one year must be in writing under Colorado's Statute of Frauds (CRS § 38-10-108). Even short-term commercial leases should always be in writing to protect both parties' rights and define responsibilities clearly.",
        },
      ],
    },
    "promissory-note": {
      requirements: [
        "Must include: principal amount, interest rate, payment schedule, maturity date, and default terms",
        "Governed by CRS § 5-2-201 and Colorado's Uniform Commercial Code",
        "Legal rate of interest is 8% per year absent written agreement (CRS § 5-12-101)",
        "Commercial loans may exceed 8% by written agreement — no cap for business-to-business transactions",
        "Secured notes must reference the security agreement or deed of trust",
        "Consumer loans are subject to the Colorado Uniform Consumer Credit Code (UCCC)",
      ],
      restrictions: [
        "Colorado UCCC limits interest on consumer loans to 36% APR plus an origination fee",
        "Confession of judgment clauses are void in Colorado for consumer transactions",
        "Acceleration clauses must provide notice and cure period for consumer notes",
      ],
      faq: [
        {
          question: "What is the legal interest rate in Colorado?",
          answer: "Colorado's default legal interest rate is 8% per year (CRS § 5-12-101) for obligations where no rate is specified. Business-to-business loans may contractually agree to higher rates without an upper cap. Consumer loans are capped at 36% APR under the Colorado UCCC.",
        },
        {
          question: "What is the statute of limitations on a promissory note in Colorado?",
          answer: "Under CRS § 13-80-103.5, written contract claims — including promissory notes — must be filed within 6 years of the date of default or the final payment date. Partial payments restart the statute. Oral loan agreements have a 3-year limitation period.",
        },
        {
          question: "Does a Colorado promissory note need to be notarized?",
          answer: "A promissory note does not need to be notarized to be valid. However, a deed of trust securing real property must be notarized and recorded with the county clerk. For unsecured notes, a witness and acknowledgment strengthen enforceability.",
        },
        {
          question: "What happens if a borrower defaults on a Colorado promissory note?",
          answer: "The lender may send a formal demand letter, then pursue collection through Small Claims Court (up to $7,500), County Court, or District Court. If the note is secured, the lender can initiate non-judicial foreclosure (for real property with a deed of trust) or repossess personal property collateral.",
        },
      ],
    },
    "demand-letter": {
      requirements: [
        "No statutory form required — must clearly state the claim, amount owed, and deadline",
        "Identify parties with full legal names and addresses",
        "Attach supporting documents: contracts, invoices, correspondence, photos",
        "State a specific dollar amount or performance required",
        "Set a firm response deadline — 10–30 days is standard",
        "Send by certified mail, return receipt requested, and retain a copy",
      ],
      restrictions: [
        "Demand letters may not misrepresent the legal basis of the claim or the creditor's authority",
        "Third-party debt collectors must comply with the FDCPA and Colorado Fair Debt Collection Practices Act",
        "Threatening to report to credit bureaus or immigration authorities solely to collect is impermissible",
      ],
      faq: [
        {
          question: "Is a demand letter required before filing suit in Colorado?",
          answer: "A demand letter is not generally required before filing in Colorado civil courts. However, it is required for many Small Claims Court matters. It is also a practical step that often resolves disputes without litigation and demonstrates good faith to a judge.",
        },
        {
          question: "What is the statute of limitations for contract claims in Colorado?",
          answer: "Under CRS § 13-80-103.5, written contract claims must be filed within 6 years of the date of breach. Oral contract claims have a 3-year period under CRS § 13-80-101. A demand letter alone does not toll the statute — file suit before the deadline if needed.",
        },
        {
          question: "How should a demand letter be sent in Colorado?",
          answer: "Send by certified mail, return receipt requested, so you have proof of delivery. Keep copies of the letter and all supporting documents. Email confirmation (with read receipts or delivery confirmation) is useful as a supplement but may not constitute formal legal notice under all contracts.",
        },
        {
          question: "Can I recover attorney's fees in a Colorado contract dispute?",
          answer: "Colorado follows the American Rule — each party pays their own attorney's fees unless a contract or statute provides otherwise. Many commercial contracts include fee-shifting clauses. If your contract allows it, reference this provision in your demand letter to strengthen your negotiating position.",
        },
      ],
    },
  },

  // ── North Carolina ────────────────────────────────────────────────────────
  "north-carolina": {
    "residential-lease-agreement": {
      requirements: [
        "Security deposit caps: up to 2 weeks' rent for week-to-week; 1.5 months for month-to-month; 2 months for fixed-term over 1 month (NCGS § 42-51)",
        "Landlord must return deposit within 30 days (extended to 60 if itemizing is needed)",
        "Required: lead paint disclosure for pre-1978 properties",
        "Required: landlord's name and address for service of process (NCGS § 42-42)",
        "Smoke detector disclosure and certification required",
        "Landlord must maintain the premises in a fit and habitable condition (NCGS § 42-42)",
      ],
      restrictions: [
        "No statewide rent control — NCGS § 42-14.3 prohibits municipalities from enacting rent control",
        "Late fees cannot exceed $15 or 5% of the monthly rent, whichever is greater (NCGS § 42-46)",
        "Landlords may not engage in self-help eviction — must use the court process",
      ],
      noticeRequirements: "Month-to-month: 7 days' notice; year-to-year: 1 month's notice required to terminate (NCGS § 42-14)",
      faq: [
        {
          question: "What is the security deposit limit in North Carolina?",
          answer: "North Carolina caps security deposits at 1.5 months' rent for month-to-month leases and 2 months' rent for fixed-term leases over one month. For week-to-week tenancies, the cap is 2 weeks' rent. The deposit must be returned within 30 days (or 60 days if an itemized accounting is needed).",
        },
        {
          question: "What is the late fee limit in North Carolina?",
          answer: "Under NCGS § 42-46, a landlord can charge a late fee of up to $15 or 5% of the monthly rent, whichever is greater. The fee may only be charged once per late payment and only after a 5-day grace period following the rent due date.",
        },
        {
          question: "How much notice is required to terminate a North Carolina lease?",
          answer: "For month-to-month leases, 7 days' written notice is required. For year-to-year leases, 1 month's notice is required. Either party may give this notice. For fixed-term leases, the lease simply expires at the end of its term unless renewed.",
        },
        {
          question: "What are landlord repair obligations in North Carolina?",
          answer: "Under NCGS § 42-42, landlords must maintain the premises in a fit and habitable condition, comply with applicable housing codes, keep common areas clean and safe, maintain heating, plumbing, and electrical systems, and address known defects. Tenants must notify landlords in writing of needed repairs.",
        },
      ],
    },
    "llc-operating-agreement": {
      requirements: [
        "Governed by the North Carolina LLC Act (NCGS Chapter 57D)",
        "Articles of Organization filed with NC Secretary of State; filing fee $125",
        "Annual report required — $200 fee, due April 15 of each year",
        "Registered agent with NC street address required",
        "No publication requirement in North Carolina",
        "Operating agreement does not need to be filed but should be signed by all members",
      ],
      restrictions: [
        "NC LLC names must include 'Limited Liability Company,' 'L.L.C.,' or 'LLC'",
        "Professional LLCs require board approval — law, medicine, accounting have separate rules",
        "Series LLCs are not recognized in North Carolina",
      ],
      faq: [
        {
          question: "Does North Carolina require an LLC operating agreement?",
          answer: "North Carolina does not legally require an operating agreement, but NCGS § 57D-2-30 allows members to adopt one and it governs over default statutory rules. Without a written agreement, state defaults apply — which may not reflect the members' intentions for profit-sharing, management, or member departures.",
        },
        {
          question: "How much does it cost to form an LLC in North Carolina?",
          answer: "The NC Secretary of State charges $125 to file Articles of Organization. There is a $200 annual report fee due April 15. NC does not impose a franchise tax on LLCs (unlike C-corps), but members pay individual income tax on pass-through profits.",
        },
        {
          question: "What is North Carolina's LLC annual report requirement?",
          answer: "All North Carolina LLCs must file an annual report by April 15 of each year and pay a $200 fee. Failure to file results in administrative dissolution. The report confirms the registered agent, principal office, and member/manager information.",
        },
        {
          question: "Can a foreign LLC do business in North Carolina?",
          answer: "Yes. A foreign (out-of-state) LLC must register with the NC Secretary of State and pay a $250 filing fee before conducting business in NC. It must maintain a registered agent in NC and comply with annual report requirements.",
        },
      ],
    },
    "employment-contract": {
      requirements: [
        "At-will employment is the default in North Carolina — include explicit at-will language",
        "North Carolina minimum wage: $7.25/hour (federal rate — no state increase)",
        "E-Verify required for employers with 25 or more employees (NCGS § 64-26)",
        "No state-mandated paid sick leave law — specify any company policy in the contract",
        "Include non-compete language only if appropriate — NC courts enforce reasonable restrictions",
        "Wage Payment Act (NCGS § 95-25.1 et seq.) governs final paychecks — due by next regular payday",
      ],
      restrictions: [
        "North Carolina Retaliatory Employment Discrimination Act (REDA) prohibits retaliation for protected activity",
        "Criminal background checks have limitations for public employers and certain industries",
        "Tip pooling rules follow federal FLSA standards — include in contracts for tipped employees",
      ],
      faq: [
        {
          question: "Is North Carolina an at-will employment state?",
          answer: "Yes. North Carolina is an at-will employment state, meaning either party can terminate the relationship at any time for any lawful reason. Limited exceptions apply for terminations that violate public policy (e.g., retaliating for a workers' comp claim). Your contract should include an explicit at-will statement.",
        },
        {
          question: "Is E-Verify required for North Carolina employers?",
          answer: "Yes. Under NCGS § 64-26, all employers with 25 or more employees must use E-Verify for new hires. Employers with fewer than 25 employees are not required to use E-Verify but may do so voluntarily. Failure to comply can result in loss of government contracts.",
        },
        {
          question: "Are non-compete agreements enforceable in North Carolina?",
          answer: "Yes, if they meet a 4-part test: (1) supported by adequate consideration, (2) part of an employment contract, (3) reasonably necessary to protect legitimate business interests, and (4) reasonable in scope, geography, and duration. Courts will not reform unreasonable agreements — they are void in their entirety.",
        },
        {
          question: "When must North Carolina employers pay final wages?",
          answer: "Under NCGS § 95-25.7, final wages must be paid by the next regular payday after separation. If the employee is laid off, final pay is due on the next regular payday or within 24 hours if required by company policy. Failure to pay triggers 2x the owed amount as liquidated damages.",
        },
      ],
    },
    "power-of-attorney": {
      requirements: [
        "Governed by the North Carolina Uniform Power of Attorney Act (NCGS Chapter 32C, effective 2018)",
        "Principal must be 18+ and have legal capacity",
        "Must be signed by the principal (or by another at principal's direction)",
        "Must be notarized — acknowledged before a notary public",
        "Two witnesses required in addition to notarization (NCGS § 32C-1-105)",
        "Witnesses cannot be the agent, the notary, or anyone who will inherit from the principal",
      ],
      restrictions: [
        "Healthcare decisions require a separate Health Care Power of Attorney (NCGS Chapter 32A, Article 3)",
        "Agent cannot create or revoke a trust, make or revoke a will, or make gifts to themselves unless expressly authorized",
        "POA signed under undue influence or when principal lacked capacity is voidable",
      ],
      faq: [
        {
          question: "What formalities are required for an NC power of attorney?",
          answer: "Under the NC Uniform Power of Attorney Act (NCGS § 32C-1-105), a POA must be signed by the principal (or a directed signer), notarized, and witnessed by two qualified individuals. The agent, the notary, and heirs cannot serve as witnesses. All three requirements must be met.",
        },
        {
          question: "What makes a power of attorney durable in North Carolina?",
          answer: "Under NCGS § 32C-1-104, a POA is durable if it contains language stating that it is not affected by the principal's subsequent incapacity. A sample phrase: 'This power of attorney shall not be terminated by disability or incapacity of the principal.' Without durable language, the POA terminates on incapacity.",
        },
        {
          question: "Can I use an NC power of attorney for medical decisions?",
          answer: "A standard financial POA does not cover healthcare in North Carolina. You need a separate Health Care Power of Attorney under NCGS Chapter 32A, Article 3, which designates a Healthcare Agent. You may also create a living will (Declaration of Desire for Natural Death) for end-of-life decisions.",
        },
        {
          question: "How do I revoke a power of attorney in North Carolina?",
          answer: "Revoke an NC POA by signing a written revocation and delivering it to the agent. Notify banks, financial institutions, and others relying on the POA. If the POA was used for real estate, record the revocation with the county register of deeds. A new POA generally does not automatically revoke prior ones — explicitly revoke old POAs in writing.",
        },
      ],
    },
    "last-will-and-testament": {
      requirements: [
        "Testator must be 18+ or legally married (NCGS § 31-1)",
        "Testator must be of sound mind and not acting under undue influence",
        "Attested will: must be signed by testator in the presence of 2 witnesses",
        "Two competent witnesses must sign in the presence of the testator and each other",
        "Witnesses should not be beneficiaries to avoid conflict of interest",
        "Self-proving affidavit available if will is notarized (NCGS § 31-11.6)",
      ],
      restrictions: [
        "Holographic (handwritten) wills are not valid in North Carolina unless executed before December 1, 2012 and meet statutory requirements",
        "Spouse has elective share rights to one-half the net assets if married less than 15 years; greater percentage for longer marriages",
        "A will cannot override beneficiary designations on retirement accounts, life insurance, or joint tenancy property",
      ],
      faq: [
        {
          question: "Does North Carolina recognize handwritten wills?",
          answer: "North Carolina does not recognize holographic wills (wills entirely in the testator's handwriting without witnesses) for wills executed after December 1, 2012. All North Carolina wills must be typed or printed, signed by the testator, and witnessed by two competent adults.",
        },
        {
          question: "What is North Carolina's probate process?",
          answer: "In North Carolina, the will is filed with the Clerk of Superior Court in the county where the decedent lived. The executor is appointed and must publish a notice to creditors. Estates are typically administered through the clerk's office without court appearances for routine matters.",
        },
        {
          question: "What is the spousal elective share in North Carolina?",
          answer: "Under NCGS § 30-3.1, a surviving spouse can elect against the will and claim a portion of the decedent's net estate: 15% for marriages under 5 years; 25% for 5–10 years; 33% for 10–15 years; and 50% for marriages over 15 years. This election must be made within 6 months of the will being probated.",
        },
        {
          question: "Can a North Carolina will be self-proving?",
          answer: "Yes. Under NCGS § 31-11.6, a will can be made self-proving by attaching a notarized affidavit signed by the testator and both witnesses at the time of signing. A self-proving will can be admitted to probate without the witnesses appearing in court, simplifying the process.",
        },
      ],
    },
    "non-compete-agreement": {
      requirements: [
        "Must be ancillary to a valid employment contract — cannot be standalone",
        "Must be supported by adequate consideration — new employment counts; mid-employment requires new consideration",
        "Must protect a legitimate business interest: trade secrets, customer relationships, or specialized training",
        "Must be reasonable in geographic scope — limited to where employer actually does business",
        "Must be reasonable in duration — typically 1–2 years; courts void unreasonable agreements entirely",
        "Must be specific about the restricted activities",
      ],
      restrictions: [
        "North Carolina courts do NOT blue-pencil (reform) non-compete agreements — unreasonable terms void the entire agreement",
        "Non-competes cannot be enforced against employees terminated without cause in many situations",
        "Courts examine consideration closely — a $1 payment or vague future benefits are insufficient",
      ],
      faq: [
        {
          question: "Are non-compete agreements enforceable in North Carolina?",
          answer: "Yes, but only if they meet strict requirements: (1) part of a valid contract, (2) supported by adequate consideration, (3) protecting a legitimate business interest, (4) reasonable in scope, geography, and duration. North Carolina courts do not reform (blue-pencil) overbroad agreements — if any term is unreasonable, the entire agreement is void.",
        },
        {
          question: "What consideration is required for a North Carolina non-compete?",
          answer: "For a non-compete signed at the start of employment, the job offer itself is adequate consideration. For an existing employee, the employer must provide new consideration — a raise, bonus, promotion, or additional benefits. Courts scrutinize mid-employment non-competes carefully.",
        },
        {
          question: "Can NC courts narrow an overly broad non-compete?",
          answer: "No. North Carolina does not apply the blue-pencil doctrine to non-competes. If the agreement is found to be unreasonable in any respect — too broad geographically, too long in duration, or too vague in scope — the court will void the entire agreement rather than modify it.",
        },
        {
          question: "What duration is acceptable for a NC non-compete?",
          answer: "North Carolina courts generally uphold non-competes of 1–2 years. Three-year terms have been upheld in some cases for senior executives with access to highly sensitive trade secrets. Duration must be proportionate to the employee's role and the legitimate interest being protected.",
        },
      ],
    },
    "independent-contractor-agreement": {
      requirements: [
        "Clearly establish independent contractor status using IRS common-law factors",
        "Specify contractor controls the means and methods of work, not just the results",
        "Include IP ownership and work-for-hire provisions",
        "Address confidentiality obligations and trade secret protections",
        "E-Verify required if contractor is working on-site for an employer with 25+ employees",
        "Include indemnification clause covering contractor's own acts and negligence",
      ],
      restrictions: [
        "NC Employment Security Law uses its own classification test — misclassification risks unemployment insurance liability",
        "NC Industrial Commission may scrutinize contractor classification for workers' compensation",
        "Misclassification exposes companies to back wages, taxes, and penalties under NC Wage and Hour Act",
      ],
      faq: [
        {
          question: "How does North Carolina classify workers as contractors vs. employees?",
          answer: "North Carolina uses a multi-factor test that looks at behavioral control, financial control, and the type of relationship. The NC Employment Security Commission and Industrial Commission may apply slightly different tests for UI and workers' comp. The IRS common-law test applies for federal tax purposes.",
        },
        {
          question: "What IP provisions should a North Carolina contractor agreement include?",
          answer: "Include a work-for-hire clause, an assignment of all intellectual property created under the agreement, a license-back clause for pre-existing contractor IP incorporated into the work, and a provision requiring contractor to disclose any pre-existing IP before commencing work.",
        },
        {
          question: "Can a North Carolina contractor be subject to a non-compete?",
          answer: "Yes. Non-compete clauses in independent contractor agreements are enforceable in NC if they meet the same requirements as employee non-competes: valid contract, adequate consideration, legitimate business interest, and reasonable scope. Courts apply identical standards.",
        },
        {
          question: "What should a North Carolina independent contractor agreement include about payments?",
          answer: "Specify the fee structure (hourly, project-based, or retainer), invoicing procedures, payment terms (net 15, net 30), and late payment interest. Address expenses — which are reimbursable and the process for approval and submission. Include a provision stating contractor is responsible for self-employment taxes.",
        },
      ],
    },
    "commercial-lease-agreement": {
      requirements: [
        "No statutory form required — governed by common law and the lease agreement",
        "Charlotte and Raleigh commercial markets have active growth — TI allowances commonly negotiated",
        "Specify responsibility for HVAC, plumbing, and structural repairs — NNN vs. gross lease",
        "ADA compliance: responsibility for accessibility upgrades should be allocated in the lease",
        "Personal guarantee often required for small business tenants",
        "Include holdover provision — typically 150% of base rent",
      ],
      restrictions: [
        "NC does not regulate commercial lease terms — all provisions are negotiable",
        "Landlord must specify assignment and subletting rights — default requires written consent",
        "Mechanic's liens can attach to landlord's property for tenant improvements — lien waivers recommended",
      ],
      faq: [
        {
          question: "Is a written commercial lease required in North Carolina?",
          answer: "Leases for more than 3 years must be in writing under NC's Statute of Frauds (NCGS § 22-2). Even for shorter terms, written commercial leases are strongly advised to avoid disputes. Oral commercial leases are notoriously difficult to enforce.",
        },
        {
          question: "What is a typical commercial lease term in Charlotte or Raleigh?",
          answer: "Retail and office leases in Charlotte and Raleigh typically run 3–5 years, with options to renew. Landlords offer longer terms (5–10 years) for tenants who receive significant tenant improvement allowances. Industrial leases in the Research Triangle area commonly run 5–7 years.",
        },
        {
          question: "Who is responsible for HVAC in a North Carolina commercial lease?",
          answer: "HVAC responsibility is entirely negotiable in NC commercial leases. In NNN leases, tenants typically maintain HVAC during the lease term and landlords are responsible for capital replacement. In gross leases, the landlord covers operating costs. This must be explicitly addressed to avoid disputes.",
        },
        {
          question: "Can a North Carolina commercial tenant sublease their space?",
          answer: "Only if permitted by the lease. Most NC commercial leases require landlord's written consent for subleasing. Courts have held that landlords cannot unreasonably withhold consent for subleases to qualified subtenants if the lease requires 'reasonable consent.' Negotiate this right at lease signing.",
        },
      ],
    },
    "promissory-note": {
      requirements: [
        "Must include: principal amount, interest rate, repayment schedule, maturity date",
        "Governed by NCGS § 24-1 et seq. and the NC UCC (NCGS Chapter 25)",
        "Legal rate of interest: 8% per year absent written agreement (NCGS § 24-1)",
        "Parties may agree in writing to any higher rate for business loans",
        "Consumer loan rates are subject to stricter limits under NC Rate Law",
        "Secured notes must reference and attach the security agreement or deed of trust",
      ],
      restrictions: [
        "NC consumer installment loan act limits certain consumer loan rates",
        "Confession of judgment clauses are void in North Carolina",
        "Attorney's fees provisions must comply with NCGS § 6-21.2 — maximum 15% of outstanding balance",
      ],
      faq: [
        {
          question: "What is the maximum interest rate on a promissory note in North Carolina?",
          answer: "The default legal rate is 8% per year (NCGS § 24-1). Parties may agree in writing to higher rates for business loans. Consumer loans are subject to stricter limits under the NC Consumer Finance Act and related statutes. For commercial transactions, the contracted rate is generally enforceable.",
        },
        {
          question: "What is the statute of limitations on a promissory note in North Carolina?",
          answer: "Under NCGS § 1-52, the statute of limitations for written contracts — including promissory notes — is 3 years from the date of breach or last payment. NC's limitations period is shorter than many states. Do not delay in taking action after a default.",
        },
        {
          question: "Can attorney's fees be included in a North Carolina promissory note?",
          answer: "Yes, but they are limited by NCGS § 6-21.2. For consumer notes, attorney's fees may not exceed 15% of the outstanding balance (including principal and interest). For business notes, courts may award reasonable fees if the note expressly provides for them.",
        },
        {
          question: "Does a North Carolina promissory note need to be notarized?",
          answer: "A promissory note does not need to be notarized to be enforceable. However, a deed of trust securing real property must be notarized and recorded with the county register of deeds. Notarizing the note itself can help authenticate signatures if disputed.",
        },
      ],
    },
    "demand-letter": {
      requirements: [
        "No statutory form required — must clearly state the claim, amount, and response deadline",
        "Identify parties with full legal names and addresses",
        "Attach supporting documentation: contracts, invoices, correspondence",
        "State the specific remedy demanded — payment amount, action, or cure",
        "Set a firm response deadline — 10–30 days is standard",
        "Send by certified mail, return receipt requested, and keep a copy",
      ],
      restrictions: [
        "Demand letters must not misrepresent the legal basis of the claim",
        "Third-party collectors must comply with both FDCPA and NC Debt Collection Act (NCGS § 75-50 et seq.)",
        "NC Unfair and Deceptive Trade Practices Act (UDTP) — false demands may trigger statutory damages",
      ],
      faq: [
        {
          question: "What is the statute of limitations for contract claims in North Carolina?",
          answer: "Under NCGS § 1-52(1), written contract claims must be filed within 3 years of the breach. Oral contract claims also have a 3-year limitation period. North Carolina's shorter limitation period means acting quickly is essential. A demand letter does not toll the limitations period.",
        },
        {
          question: "Is a demand letter required before suing in North Carolina?",
          answer: "A demand letter is not required before most NC civil suits. It is good practice, demonstrates good faith, and is required before filing in Small Claims (Magistrate) Court in many districts. Send one before incurring litigation costs.",
        },
        {
          question: "Can I recover attorney's fees for a contract dispute in North Carolina?",
          answer: "Under the American Rule, each party pays their own attorney's fees. However, contracts may include fee-shifting provisions, and NCGS § 6-21.2 allows fees in notes and instruments. NC's UDTP Act (NCGS § 75-16.1) also allows fees for deceptive trade practices claims.",
        },
        {
          question: "What should I include in a North Carolina demand letter for unpaid wages?",
          answer: "For wage claims, state the dates of work, amount owed, and demand payment within a specified period. Reference the NC Wage and Hour Act (NCGS § 95-25.1 et seq.). Note that NCGS § 95-25.22 allows recovery of 2x the owed wages plus attorney's fees for willful violations.",
        },
      ],
    },
  },

  // ── Virginia ──────────────────────────────────────────────────────────────
  virginia: {
    "residential-lease-agreement": {
      requirements: [
        "Governed by the Virginia Residential Landlord and Tenant Act (VRLTA, Va. Code § 55.1-1200 et seq.)",
        "Security deposit: maximum 2 months' rent (Va. Code § 55.1-1226)",
        "Landlord must return deposit within 45 days of tenancy termination with itemized deductions",
        "Required disclosure: owner's name and address or property manager's contact information",
        "Required: move-in inspection report — landlord must offer within 5 days of possession (Va. Code § 55.1-1214)",
        "Lead paint disclosure required for pre-1978 properties",
      ],
      restrictions: [
        "No statewide rent control in Virginia — Va. Code § 55.1-1200 preempts local rent control",
        "Landlord cannot shut off utilities to force eviction — Va. Code § 55.1-1236",
        "Late fees: must be stated in the lease; cannot be charged until 5 days after the due date",
      ],
      noticeRequirements: "Month-to-month: 30 days' written notice required; fixed-term: lease simply expires",
      faq: [
        {
          question: "What is the maximum security deposit in Virginia?",
          answer: "Under Va. Code § 55.1-1226, a Virginia landlord may collect a security deposit of up to 2 months' rent. The deposit must be returned within 45 days of the tenancy termination, with an itemized written statement of deductions. Failure to return the deposit timely entitles the tenant to recover the full deposit.",
        },
        {
          question: "Does Virginia require a move-in inspection?",
          answer: "Yes. Under Va. Code § 55.1-1214, the landlord must provide the tenant with a written move-in inspection report or offer to conduct one jointly within 5 days of the tenant taking possession. This report establishes the condition of the premises and is used to assess damages at move-out.",
        },
        {
          question: "How much notice is required to end a Virginia month-to-month lease?",
          answer: "Under the VRLTA, either landlord or tenant must give 30 days' written notice to terminate a month-to-month tenancy. For written fixed-term leases, the lease simply expires at the end of the term unless renewed. Some localities may have additional requirements.",
        },
        {
          question: "What disclosures must Virginia landlords provide?",
          answer: "Virginia landlords must disclose: the owner's name and address (or the property manager's information), lead paint disclosures for pre-1978 properties, the presence of known mold, flood zone information if applicable, and the existence of any pending foreclosure on the property (Va. Code § 55.1-1217).",
        },
      ],
    },
    "llc-operating-agreement": {
      requirements: [
        "Governed by the Virginia Limited Liability Company Act (Va. Code § 13.1-1000 et seq.)",
        "Articles of Organization filed with Virginia State Corporation Commission (SCC); filing fee $100",
        "Annual registration fee: $50 per year, due by the last day of the anniversary month",
        "Registered agent with Virginia office address required",
        "No publication requirement in Virginia",
        "Operating agreement is not filed with the SCC but should be signed by all members",
      ],
      restrictions: [
        "Virginia LLC names must include 'Limited Liability Company,' 'L.L.C.,' or 'LLC'",
        "Professional LLCs (PLLC) require authorization from the applicable licensing board",
        "Series LLCs are recognized in Virginia under the 2019 amendment to the LLC Act",
      ],
      faq: [
        {
          question: "Does Virginia require an LLC operating agreement?",
          answer: "Virginia does not require an operating agreement to be filed, but Va. Code § 13.1-1023 allows LLCs to adopt one. Without a written agreement, default provisions under the Virginia LLC Act govern. A written operating agreement is essential to customize profit distributions, management structure, and exit procedures.",
        },
        {
          question: "How much does it cost to form a Virginia LLC?",
          answer: "The Virginia State Corporation Commission charges $100 to file Articles of Organization. The annual registration fee is $50, due each year. Virginia does not impose a state income tax at the LLC entity level — members pay individual income tax on their pass-through share of profits.",
        },
        {
          question: "Does Virginia recognize series LLCs?",
          answer: "Yes. Virginia amended its LLC Act in 2019 to recognize series LLCs (Va. Code § 13.1-1002). A series LLC allows different 'series' within one LLC to have separate assets, members, and liability protection. This is popular for real estate investors holding multiple properties.",
        },
        {
          question: "What is Virginia's annual LLC fee?",
          answer: "Virginia LLCs must pay a $50 annual registration fee to the State Corporation Commission, due by the last day of the month in which the anniversary of formation falls. Failure to pay results in the LLC being placed in bad standing and potentially dissolved after 5 years.",
        },
      ],
    },
    "employment-contract": {
      requirements: [
        "At-will employment is the default in Virginia — include explicit at-will language",
        "Virginia minimum wage: $12.00/hour as of January 1, 2023; $13.50/hour effective January 1, 2025",
        "Virginia Right-to-Work law (Va. Code § 40.1-58) — union membership cannot be required",
        "No state-mandated paid sick leave except for certain home health aide workers",
        "Virginia Human Rights Act expanded in 2020 to cover small employers",
        "Non-compete clauses for 'low-wage employees' are void (Va. Code § 40.1-28.7:8, effective 2020)",
      ],
      restrictions: [
        "Non-competes unenforceable for employees whose average weekly wages are at or below the average weekly wage for the Commonwealth",
        "Employer cannot require employees to arbitrate non-compete disputes through private arbitration",
        "Criminal history inquiries are restricted for state government employers (ban the box)",
      ],
      faq: [
        {
          question: "What is Virginia's minimum wage?",
          answer: "Virginia's minimum wage is $12.00/hour in 2023 and increases to $13.50/hour on January 1, 2025. Virginia's minimum wage phases to $15.00/hour by 2026, with future increases indexed to inflation.",
        },
        {
          question: "Are non-compete agreements enforceable in Virginia?",
          answer: "Virginia law (Va. Code § 40.1-28.7:8, effective July 1, 2020) prohibits non-compete agreements for 'low-wage employees' — those earning at or below the average weekly wage for Virginia. For higher-earning workers, courts apply a 3-part test: legitimate business interest, reasonable scope, and reasonable duration.",
        },
        {
          question: "Is Virginia a right-to-work state?",
          answer: "Yes. Virginia is a right-to-work state under Va. Code § 40.1-58. Employees cannot be required to join a union or pay union dues as a condition of employment. This makes Virginia attractive for employers seeking a flexible workforce.",
        },
        {
          question: "What is the statute of limitations for employment claims in Virginia?",
          answer: "Virginia's statute of limitations for most employment contract claims is 5 years for written contracts (Va. Code § 8.01-246). Claims under the Virginia Human Rights Act or wage payment laws may have shorter limitations periods. File promptly to preserve all claims.",
        },
      ],
    },
    "power-of-attorney": {
      requirements: [
        "Governed by the Virginia Uniform Power of Attorney Act (Va. Code § 64.2-1600 et seq.)",
        "Principal must be 18+ and have legal capacity",
        "Must be signed by the principal or by a directed signer at principal's direction",
        "Must be acknowledged before a notary — notarization is required for validity",
        "Durable POA language must expressly state the POA survives incapacity",
        "Healthcare decisions require a separate Virginia Advance Medical Directive or HCPOA",
      ],
      restrictions: [
        "Agent may not create or revoke principal's will, make gifts to themselves unless expressly authorized, or change trust beneficiaries without specific authority",
        "Real estate transactions using a POA must be notarized and the POA recorded with the circuit court clerk",
        "An agent acting under a Virginia POA has a fiduciary duty to act in the principal's best interest",
      ],
      faq: [
        {
          question: "What is required to create a valid power of attorney in Virginia?",
          answer: "Under the Virginia Uniform Power of Attorney Act (Va. Code § 64.2-1603), a POA must be signed by the principal (or a directed signer in the principal's presence) and acknowledged before a notary public. No witnesses are required by the POA Act, though witness signatures are recommended for extra protection.",
        },
        {
          question: "What makes a Virginia power of attorney durable?",
          answer: "A durable POA in Virginia must include language stating the authority survives incapacity — such as 'This power of attorney shall not be affected by subsequent disability or incapacity of the principal.' Under Va. Code § 64.2-1604, a POA is presumed durable unless it expressly provides otherwise.",
        },
        {
          question: "Can a Virginia POA be used for real estate transactions?",
          answer: "Yes, but the POA must be notarized and recorded in the land records of the applicable circuit court clerk before (or simultaneously with) the real estate transaction. A properly recorded POA allows the agent to sign deeds and other real property documents.",
        },
        {
          question: "How do I revoke a Virginia power of attorney?",
          answer: "Revoke a Virginia POA by signing a written revocation and delivering it to the agent. Notify financial institutions and other third parties relying on the POA. Record the revocation with the circuit court clerk if the original was recorded. A later-dated POA does not automatically revoke earlier ones.",
        },
      ],
    },
    "last-will-and-testament": {
      requirements: [
        "Testator must be 18+ (or legally married/enlisted) and of sound mind (Va. Code § 64.2-401)",
        "Will must be signed by the testator or by another at testator's direction in testator's presence",
        "Two competent witnesses must sign in testator's presence — they do not need to sign in each other's presence",
        "Witnesses should not be beneficiaries — interested witnesses create presumption of undue influence",
        "Self-proving affidavit (with notarization) available to simplify probate (Va. Code § 64.2-452)",
        "Will does not need to be recorded until probate is initiated",
      ],
      restrictions: [
        "Holographic (entirely handwritten, unwitnessed) wills are valid in Virginia (Va. Code § 64.2-403)",
        "Surviving spouse has elective share right to up to 50% of the augmented estate (Va. Code § 64.2-308.1 et seq.)",
        "A will cannot override beneficiary designations on retirement accounts, payable-on-death accounts, or joint tenancy property",
      ],
      faq: [
        {
          question: "Are handwritten wills valid in Virginia?",
          answer: "Yes. Virginia recognizes holographic wills under Va. Code § 64.2-403. A holographic will must be entirely in the testator's handwriting and signed. No witnesses are required. However, typed wills with two witnesses are more reliable and less subject to challenge.",
        },
        {
          question: "What is Virginia's probate process?",
          answer: "Virginia wills are probated in the Circuit Court (or its clerk's office) of the county or city where the decedent lived. The executor presents the will for probate, pays a probate tax (10 cents per $100 of estate value), and administers the estate. Small estates under $50,000 may use a simplified affidavit process.",
        },
        {
          question: "What is the spousal elective share in Virginia?",
          answer: "Under Va. Code § 64.2-308.1, a surviving spouse can elect against the will and claim a percentage of the 'augmented estate' — between 15% and 50% depending on the length of the marriage. This election must be filed within 6 months of the will being admitted to probate.",
        },
        {
          question: "Does Virginia require a will to be notarized?",
          answer: "Notarization is not required for a valid Virginia will. However, attaching a self-proving affidavit (notarized affidavit signed by the testator and both witnesses) allows the will to be admitted to probate without requiring witnesses to testify in court, simplifying the process significantly.",
        },
      ],
    },
    "non-compete-agreement": {
      requirements: [
        "Must protect a legitimate business interest — trade secrets, customer relationships, or specialized investment in the employee",
        "Must be reasonable in geographic scope relative to the employer's actual market area",
        "Must be reasonable in duration — Virginia courts scrutinize terms over 2 years",
        "Must be supported by adequate consideration — new employment, or new consideration for existing employees",
        "For low-wage employees (at or below VA average weekly wage), non-competes are void — Va. Code § 40.1-28.7:8",
        "Employer must disclose the covenant to the employee before the interview or offer stage",
      ],
      restrictions: [
        "Non-competes for low-wage employees are void — employers cannot contract around this prohibition",
        "Courts apply a 3-factor test: legitimate business interest, reasonable scope, reasonable duration — all three must be met",
        "Virginia does not blue-pencil (reform) non-competes — courts may void an unreasonable agreement in its entirety",
      ],
      faq: [
        {
          question: "What is Virginia's low-wage employee non-compete restriction?",
          answer: "Under Va. Code § 40.1-28.7:8 (effective July 1, 2020), non-compete agreements are void for employees whose average weekly wages are at or below the average weekly wage for the Commonwealth (approximately $1,230/week or $63,960/year in 2024). Employers who attempt to enforce a void non-compete face civil penalties.",
        },
        {
          question: "How does Virginia evaluate non-compete enforceability?",
          answer: "Virginia courts apply a 3-part test: (1) Is the restraint necessary to protect a legitimate business interest? (2) Is it reasonably limited in geographic scope? (3) Is it reasonably limited in duration? The employer bears the burden of proving all three elements. Courts will not reform overbroad agreements.",
        },
        {
          question: "What duration is acceptable for a Virginia non-compete?",
          answer: "Virginia courts generally uphold non-competes of 1–2 years. Terms of 3 years have been upheld for executives with access to highly sensitive trade secrets. Terms beyond 3 years are very risky and often voided. Duration must match the time needed to protect the legitimate business interest.",
        },
        {
          question: "Can Virginia courts reform an overbroad non-compete?",
          answer: "Virginia does not uniformly apply the blue-pencil doctrine. Some courts have modified overbroad agreements; others have voided them entirely. The safest approach is to draft narrowly tailored agreements that pass the 3-part test without relying on judicial modification.",
        },
      ],
    },
    "independent-contractor-agreement": {
      requirements: [
        "Clearly establish independent contractor status using IRS common-law factors",
        "Specify that contractor controls means and methods of work, not just the results",
        "Include IP ownership and work-for-hire provisions",
        "Address confidentiality and trade secret protection obligations",
        "Include contractor certification that they have all required business licenses",
        "Include indemnification clause covering contractor's own negligence and third-party claims",
      ],
      restrictions: [
        "Virginia uses an economic reality test for workers' comp classification under Va. Code § 65.2-101",
        "Virginia Wage Theft Law (Va. Code § 40.1-29.1) allows workers to sue for wage theft — applies to employees not contractors",
        "Misclassification as contractor when worker is actually an employee creates liability for back wages, taxes, and benefits",
      ],
      faq: [
        {
          question: "How does Virginia determine contractor vs. employee status?",
          answer: "Virginia primarily uses the IRS common-law test (behavioral control, financial control, type of relationship) for income tax classification. For workers' compensation, Virginia applies a separate test under Va. Code § 65.2-101. For unemployment insurance, the VEC uses yet another test. Misclassification exposes businesses to all three authorities.",
        },
        {
          question: "What IP provisions are essential in a Virginia contractor agreement?",
          answer: "Include: (1) work-for-hire clause for all deliverables, (2) assignment of any rights not automatically covered by work-for-hire, (3) contractor's disclosure of pre-existing IP used in the work, (4) license for the contractor to use company trademarks if needed, and (5) ownership of data and derivative works.",
        },
        {
          question: "Can a Virginia contractor be subject to a non-solicitation agreement?",
          answer: "Yes. Non-solicitation agreements with independent contractors are generally enforceable in Virginia if reasonable in scope and duration. They do not need to satisfy the 3-part non-compete test because they restrict solicitation of customers or employees, not general employment. Include them separately from non-compete provisions.",
        },
        {
          question: "What payment terms should a Virginia contractor agreement include?",
          answer: "Specify the rate (hourly, fixed-fee, or milestone-based), invoicing frequency (weekly, bi-weekly, or upon completion), payment terms (net 15 or net 30), late payment interest, and expense reimbursement procedures. Clearly state that the contractor is responsible for all self-employment taxes, benefits, and insurance.",
        },
      ],
    },
    "commercial-lease-agreement": {
      requirements: [
        "No statutory form required — governed by common law contract principles",
        "Northern Virginia (NoVA) commercial market is highly competitive — TI allowances commonly negotiated",
        "Richmond and Hampton Roads commercial markets have distinct leasing customs",
        "NNN leases common for retail; gross leases more common for office",
        "ADA compliance allocation must be addressed — typically tenant responsible for interior improvements",
        "Include environmental indemnification — Virginia's environmental liability can be significant",
      ],
      restrictions: [
        "Virginia does not regulate commercial lease terms — all provisions are negotiable",
        "Landlord's termination rights must be expressly stated — implied rights are limited",
        "Assignment and subletting require written landlord consent unless otherwise stated in the lease",
      ],
      faq: [
        {
          question: "Is a written commercial lease required in Virginia?",
          answer: "Leases for more than one year must be in writing under Virginia's Statute of Frauds (Va. Code § 11-2). Even short-term commercial leases should always be in writing. Virginia courts generally enforce written commercial leases strictly as drafted.",
        },
        {
          question: "What are typical commercial lease terms in Northern Virginia?",
          answer: "Northern Virginia office leases typically run 3–10 years, with 5-year leases most common. TI allowances range from $30–$80 per square foot for office build-outs in NoVA's competitive market. Retail leases near major corridors (Route 7, Route 1, etc.) often include percentage rent clauses.",
        },
        {
          question: "Who is responsible for repairs in a Virginia commercial lease?",
          answer: "This is entirely negotiable. NNN leases typically require tenants to maintain the space and HVAC, while the landlord handles structural and roof repairs. Gross leases often include most operating costs in the rent. The allocation must be explicitly addressed — courts will not imply repair obligations.",
        },
        {
          question: "Can a Virginia commercial tenant withhold rent for landlord breaches?",
          answer: "Virginia's commercial lease law does not provide tenants an automatic right to withhold rent for landlord defaults (unlike residential tenants). Commercial tenants must typically pursue separate legal action for landlord breaches. Include specific remedies for landlord default in the lease.",
        },
      ],
    },
    "promissory-note": {
      requirements: [
        "Must include: principal amount, interest rate, repayment schedule, maturity date, and default terms",
        "Governed by Va. Code § 6.2-300 et seq. and Virginia's UCC (Title 8A)",
        "Legal interest rate: 6% per year absent written agreement (Va. Code § 6.2-301)",
        "Parties may agree in writing to higher rates for business loans",
        "Consumer notes subject to stricter Virginia Consumer Protection Act requirements",
        "Secured notes must reference the collateral and any deed of trust or security agreement",
      ],
      restrictions: [
        "Virginia usury law caps interest for consumer loans — check Va. Code § 6.2-303 for current limits",
        "Confession of judgment clauses require strict compliance with Va. Code § 8.01-432 — limited use",
        "Prepayment penalties for residential mortgage notes are limited by Virginia law",
      ],
      faq: [
        {
          question: "What is the legal interest rate in Virginia?",
          answer: "Virginia's default legal interest rate is 6% per year (Va. Code § 6.2-301). Business-to-business transactions may agree to higher rates in writing. Consumer loan rates are regulated separately. Judgment interest accrues at 6% from the date of judgment under Va. Code § 6.2-302.",
        },
        {
          question: "What is the statute of limitations on a promissory note in Virginia?",
          answer: "Under Va. Code § 8.01-246, written contract claims — including promissory notes — must be filed within 5 years of the breach or maturity date. Partial payments or written acknowledgment of the debt can restart the limitations period. Act promptly after default.",
        },
        {
          question: "Does a Virginia promissory note need to be notarized?",
          answer: "A promissory note does not need to be notarized to be valid. However, if the note is secured by real property via a deed of trust, that deed of trust must be notarized and recorded with the circuit court clerk. Notarizing the note itself adds an extra layer of authentication.",
        },
        {
          question: "Can Virginia courts award attorney's fees in promissory note disputes?",
          answer: "Virginia follows the American Rule — each party pays their own attorney's fees. However, if the promissory note contains a fee-shifting clause, Virginia courts will enforce it. Include a specific attorney's fees provision in the note for the best chance of recovery.",
        },
      ],
    },
    "demand-letter": {
      requirements: [
        "No statutory form required — clearly state the claim, amount, and deadline for response",
        "Identify all parties with full legal names and addresses",
        "Attach supporting documentation: contracts, invoices, photographs, communications",
        "State the exact remedy demanded — payment amount, specific performance, or cure",
        "Set a firm response deadline — 10–30 days is standard",
        "Send by certified mail, return receipt requested, and keep a complete copy",
      ],
      restrictions: [
        "Demand letters must not misrepresent facts or the legal basis of the claim",
        "Virginia Consumer Protection Act (Va. Code § 59.1-196 et seq.) prohibits deceptive collection practices",
        "Third-party debt collectors must comply with the FDCPA",
      ],
      faq: [
        {
          question: "What is the statute of limitations for contract claims in Virginia?",
          answer: "Under Va. Code § 8.01-246, written contract claims must be filed within 5 years of breach. Oral contract claims have a 3-year limitation period. A demand letter does not toll the limitations period — if negotiations fail, file suit before the deadline.",
        },
        {
          question: "Is a demand letter required before suing in Virginia?",
          answer: "A demand letter is not generally required before filing civil suit in Virginia. However, Virginia General District Court rules suggest sending demand letters for consumer debt claims, and it is required practice before filing in small claims court. It also demonstrates good faith.",
        },
        {
          question: "Can I recover attorney's fees in a Virginia contract dispute?",
          answer: "Virginia follows the American Rule — attorney's fees are not recoverable unless a contract or statute provides for them. Include a fee-shifting clause in your contracts. Under the Virginia Consumer Protection Act, prevailing plaintiffs may recover fees in deceptive practices claims.",
        },
        {
          question: "What should a Virginia demand letter for unpaid rent include?",
          answer: "For commercial unpaid rent, state the lease terms, the amounts due by month, any applicable late fees, and the contractual default cure period. Reference the specific lease provisions for default and landlord's remedies. Virginia commercial landlords can pursue eviction (unlawful detainer) and simultaneously sue for unpaid rent.",
        },
      ],
    },
  },

  // ── New Jersey ────────────────────────────────────────────────────────────
  "new-jersey": {
    "residential-lease-agreement": {
      requirements: [
        "Truth in Renting Act (NJSA 46:8-45 et seq.) requires standard disclosure to tenants",
        "Security deposit: capped at 1.5 months' rent (NJSA 46:8-21.2)",
        "Landlord must return deposit within 30 days of lease termination with itemized deductions",
        "Required: lead paint disclosure for pre-1978 properties",
        "Required: landlord registration with municipality — failure limits ability to evict",
        "Habitability warranty: landlord must maintain the premises (NJSA 2A:42-85 et seq.)",
      ],
      restrictions: [
        "Anti-Eviction Act (NJSA 2A:18-61.1): requires just cause to evict any residential tenant — even without a lease",
        "Rent control ordinances exist in many NJ municipalities — check local rules",
        "Landlords cannot discriminate against Section 8 voucher holders (source of income discrimination is prohibited)",
      ],
      noticeRequirements: "Month-to-month: one month's written notice required to terminate; fixed-term: lease expires at end of term",
      faq: [
        {
          question: "Does New Jersey require just cause to evict a tenant?",
          answer: "Yes. New Jersey's Anti-Eviction Act (NJSA 2A:18-61.1) requires landlords to have just cause to evict residential tenants in most circumstances. Just cause includes nonpayment of rent, lease violations, and disorderly conduct. Landlords cannot simply evict without a valid legal reason, even for month-to-month tenants.",
        },
        {
          question: "What is the security deposit limit in New Jersey?",
          answer: "New Jersey caps security deposits at 1.5 months' rent under NJSA 46:8-21.2. The deposit must be held in a separate account and the landlord must provide the tenant with information about where it is held within 30 days. The deposit must be returned within 30 days of tenancy end.",
        },
        {
          question: "Does New Jersey have rent control?",
          answer: "New Jersey does not have a statewide rent control law, but many municipalities — including Newark, Jersey City, Hoboken, Trenton, and others — have their own rent control ordinances. Always check local rules before setting rent or raising it for an existing tenant.",
        },
        {
          question: "Can New Jersey landlords refuse to rent to Section 8 tenants?",
          answer: "No. New Jersey's Law Against Discrimination (LAD, NJSA 10:5-1 et seq.) prohibits discrimination based on 'source of lawful income,' which includes Section 8 housing vouchers. Landlords must consider Section 8 applicants using the same criteria as other applicants.",
        },
      ],
    },
    "llc-operating-agreement": {
      requirements: [
        "Governed by the New Jersey Revised Uniform Limited Liability Company Act (RULLCA, NJSA 42:2C-1 et seq.)",
        "Certificate of Formation filed with NJ Division of Revenue and Enterprise Services; filing fee $125",
        "Annual report required — $75 fee, due the last day of the anniversary month",
        "Registered agent with NJ street address required",
        "No publication requirement in New Jersey",
        "Operating agreement does not need to be filed but should be signed by all members",
      ],
      restrictions: [
        "NJ LLC names must include 'Limited Liability Company,' 'L.L.C.,' or 'LLC'",
        "Professional LLCs require authorization from the applicable professional licensing board",
        "Series LLCs are not recognized in New Jersey",
      ],
      faq: [
        {
          question: "Does New Jersey require an LLC operating agreement?",
          answer: "New Jersey's RULLCA does not require a written operating agreement, but it allows members to adopt one under NJSA 42:2C-11. Without a written agreement, default statutory provisions govern — which may conflict with member intentions on profit sharing, management rights, and member exits.",
        },
        {
          question: "How much does it cost to form a New Jersey LLC?",
          answer: "The NJ Division of Revenue charges $125 to file a Certificate of Formation. The annual report fee is $75. New Jersey imposes an $800 minimum LLC fee annually ($1,500 if the LLC has revenues over $250,000). Members also pay NJ income tax on their pass-through income.",
        },
        {
          question: "What is the New Jersey LLC annual fee?",
          answer: "New Jersey LLCs pay an annual minimum fee of $800 to $5,600 depending on total income from New Jersey sources. This is separate from the $75 annual report fee. High-revenue LLCs pay more. These fees are due on the 15th day of the 4th month following the end of the tax year.",
        },
        {
          question: "Can a foreign LLC do business in New Jersey?",
          answer: "Yes. A foreign LLC must file an Application for Registration with the NJ Division of Revenue ($125 fee) before transacting business in New Jersey. It must maintain a registered agent in NJ and file annual reports. Failure to register does not void contracts but subjects the LLC to penalties.",
        },
      ],
    },
    "employment-contract": {
      requirements: [
        "At-will employment is the default in New Jersey — include explicit at-will language",
        "New Jersey minimum wage: $15.13/hour for most employers (2024); $13.73 for seasonal/small employers",
        "NJ WARN Act (NJSA 34:21-2): 90 days' notice required for mass layoffs in establishments with 100+ employees",
        "Paid sick leave required: 40 hours per year (NJ Earned Sick Leave Law)",
        "NJ Family Leave Act: 12 weeks of unpaid leave for employers with 30+ employees",
        "New Jersey Salary History Law (NJSA 34:6B-20): employers cannot ask about salary history",
      ],
      restrictions: [
        "NJ Law Against Discrimination (LAD) is among the broadest in the US — covers many protected classes",
        "Non-compete agreements are enforceable at common law but proposed legislation may restrict them further",
        "Employers with 50+ employees must provide Temporary Disability Insurance (TDI) and Family Leave Insurance (FLI)",
      ],
      faq: [
        {
          question: "What is New Jersey's minimum wage in 2024?",
          answer: "New Jersey's minimum wage is $15.13/hour for most employers in 2024. Seasonal employees and employers with fewer than 6 employees pay $13.73/hour. Agricultural workers have a different rate. The state minimum wage adjusts annually based on CPI.",
        },
        {
          question: "Are non-compete agreements enforceable in New Jersey?",
          answer: "New Jersey courts enforce non-competes at common law if they are reasonable in scope, protect a legitimate business interest, and are not unduly burdensome on the employee. NJ courts are generally more employer-friendly than nearby states like California. Proposed legislation to restrict non-competes has been introduced but not yet enacted.",
        },
        {
          question: "What is New Jersey's paid sick leave law?",
          answer: "The NJ Earned Sick Leave Law (NJSA 34:11D-1 et seq.) requires all employers to provide employees 1 hour of sick leave for every 30 hours worked, up to 40 hours per year. Leave can be used for the employee's own or a family member's illness, preventive care, or domestic violence situations.",
        },
        {
          question: "Can New Jersey employers ask about salary history?",
          answer: "No. Under NJSA 34:6B-20 (effective January 1, 2020), New Jersey employers cannot ask job applicants about their salary history during the hiring process. Employers also cannot use prior salary information to set starting pay. Violations can result in civil penalties and civil suits.",
        },
      ],
    },
    "power-of-attorney": {
      requirements: [
        "Governed by the New Jersey Uniform Power of Attorney Act (NJSA 46:2B-8.9 et seq.)",
        "Principal must be 18+ and competent at time of signing",
        "Must be signed by the principal or by a directed signer at principal's direction",
        "Must be acknowledged before a notary — notarization required for real estate transactions",
        "Two witnesses recommended but not strictly required by statute",
        "Durable POA must expressly state it survives incapacity",
      ],
      restrictions: [
        "Healthcare decisions require a separate NJ Advance Directive (NJSA 26:2H-53 et seq.) or proxy directive",
        "Agent may not create or revoke principal's will, make gifts to themselves without specific authority, or change beneficiaries",
        "Financial institutions may refuse to honor older POAs — specify 'durable' and include acceptance provisions",
      ],
      faq: [
        {
          question: "What formalities are required for a New Jersey power of attorney?",
          answer: "A New Jersey POA must be signed by the principal and notarized. Two witnesses are strongly recommended for added validity, especially for real estate transactions. The POA must be recorded with the county recording office before it can be used to convey real property.",
        },
        {
          question: "What makes a New Jersey POA durable?",
          answer: "A NJ POA is durable if it includes language stating it is not affected by the principal's subsequent incapacity — such as 'This power of attorney shall not be terminated by disability or incapacity.' Under NJSA 46:2B-8.11, a durable POA remains effective even if the principal becomes incompetent.",
        },
        {
          question: "Can I use a New Jersey POA for healthcare decisions?",
          answer: "No. A standard financial POA does not cover healthcare in New Jersey. You need a separate NJ Advance Directive, which includes a proxy directive (designating a healthcare agent) and an instruction directive (specifying end-of-life wishes). These are governed by NJSA 26:2H-53 et seq.",
        },
        {
          question: "Can a bank refuse to honor a New Jersey POA?",
          answer: "Yes. Under New Jersey law, financial institutions may require their own internal POA form or require an indemnification agreement. They may also refuse a POA if it is older than a certain period (often 1–3 years). Including an acknowledgment and acceptance clause in your POA and presenting it with supporting documentation helps.",
        },
      ],
    },
    "last-will-and-testament": {
      requirements: [
        "Testator must be 18+ and of sound mind (NJSA 3B:3-2)",
        "Will must be signed by the testator (or by another at testator's direction in testator's presence)",
        "Two witnesses must sign within a reasonable time after witnessing testator's signature",
        "Witnesses should not be beneficiaries — interested witness creates rebuttable presumption of undue influence",
        "Self-proving affidavit (with notarization) available to simplify probate (NJSA 3B:3-4)",
        "Will does not need to be filed or registered until probate",
      ],
      restrictions: [
        "Holographic (handwritten, unwitnessed) wills are generally not valid in New Jersey",
        "Surviving spouse has elective share right — can claim a portion of the augmented estate (NJSA 3B:8-1)",
        "A will cannot override beneficiary designations on insurance, retirement accounts, or POD accounts",
      ],
      faq: [
        {
          question: "Are handwritten wills valid in New Jersey?",
          answer: "Generally no. New Jersey does not broadly recognize holographic wills. A will that does not meet the standard formalities (signature plus two witnesses) may only be admitted to probate by clear and convincing evidence that the decedent intended it as a will. Typed, witnessed wills are far more reliable.",
        },
        {
          question: "What is New Jersey's probate process?",
          answer: "In New Jersey, wills are filed with the Surrogate's Court in the county where the decedent resided. The Surrogate's Court handles probate with minimal court involvement for uncontested estates. The executor pays a filing fee based on the size of the estate and administers the estate.",
        },
        {
          question: "What rights does a surviving spouse have in New Jersey?",
          answer: "Under NJSA 3B:8-1, a surviving spouse can elect against the will and claim a portion of the 'augmented estate.' This elective share must be claimed within 6 months of probate. New Jersey's elective share rules are based on the Uniform Probate Code framework.",
        },
        {
          question: "Does New Jersey have an estate tax?",
          answer: "New Jersey eliminated its estate tax in 2018. However, New Jersey still has an inheritance tax that varies by the relationship of the beneficiary to the decedent. Direct heirs (children, spouses) are exempt, but siblings and unrelated individuals pay tax rates of up to 16%. Plan accordingly.",
        },
      ],
    },
    "non-compete-agreement": {
      requirements: [
        "Must protect a legitimate business interest — trade secrets, confidential information, or specialized training",
        "Must be reasonable in geographic scope — limited to the employer's actual business area",
        "Must be reasonable in duration — 1–2 years is standard; longer terms face heightened scrutiny",
        "Must be supported by adequate consideration — new employment, or fresh consideration for existing employees",
        "Include clear definition of restricted activities — overly vague restrictions may be void",
        "Proposed NJ non-compete legislation (not yet enacted) would further restrict agreements",
      ],
      restrictions: [
        "NJ courts are employee-friendly and scrutinize non-competes carefully",
        "Courts may grant partial enforcement or reforming (blue-penciling) of overbroad agreements",
        "Non-competes that prevent a worker from earning a living in their field are disfavored",
      ],
      faq: [
        {
          question: "Are non-compete agreements enforceable in New Jersey?",
          answer: "Yes. New Jersey enforces non-compete agreements at common law if they: (1) protect a legitimate business interest, (2) impose no undue hardship on the employee, and (3) are not injurious to the public. Courts balance these factors and may partially enforce overly broad agreements.",
        },
        {
          question: "What duration is typical for a New Jersey non-compete?",
          answer: "New Jersey courts generally uphold non-competes of 1–2 years. Terms beyond 2 years face significant scrutiny. Courts consider whether the duration is proportionate to the employee's access to confidential information and the nature of the employer's competitive concerns.",
        },
        {
          question: "Can NJ courts modify an overbroad non-compete?",
          answer: "Yes. New Jersey applies a modified blue-pencil approach — courts may reform an overbroad non-compete to make it reasonable, rather than voiding it entirely. This makes drafting important: even an imperfect agreement may be partially enforced.",
        },
        {
          question: "What is New Jersey's proposed non-compete legislation?",
          answer: "New Jersey has had pending legislation (A3715/S1769) that would significantly restrict non-competes, including: limiting duration to 1 year, requiring payment of salary during the restriction period (garden leave), banning non-competes for low-wage workers, and more. As of 2024, this legislation has not been enacted.",
        },
      ],
    },
    "independent-contractor-agreement": {
      requirements: [
        "Clearly establish independent contractor status — New Jersey uses the ABC test for wage/hour classification",
        "ABC Test: worker must be (A) free from control, (B) performing work outside the company's usual course, and (C) independently established in the trade",
        "Specify that contractor controls the means and methods of work",
        "Include IP ownership and work-for-hire provisions",
        "Address confidentiality and trade secret protections",
        "Include indemnification clause for contractor's own acts and omissions",
      ],
      restrictions: [
        "New Jersey's ABC test is strict — many workers classified as contractors in other states are employees in NJ",
        "NJ wage law penalties for misclassification are severe — back wages, penalties, and stop-work orders",
        "NJ Construction Industry Independent Contractor Act (NJSA 34:20-1) creates additional rules for construction",
      ],
      faq: [
        {
          question: "How does New Jersey determine contractor vs. employee status?",
          answer: "New Jersey uses the strict ABC test for wage and hour law and unemployment insurance. To be a contractor, the worker must: (A) be free from the company's control, (B) perform work outside the usual course of the company's business or off-site, and (C) be independently established in the trade. All three prongs must be satisfied.",
        },
        {
          question: "What is the risk of misclassifying workers in New Jersey?",
          answer: "NJ misclassification penalties include back wages, unpaid benefits, penalties up to $2,500 per violation (and higher for repeat violations), public posting requirements, and stop-work orders for construction contractors. NJ actively investigates misclassification through its task force.",
        },
        {
          question: "What IP provisions should a NJ contractor agreement include?",
          answer: "Include: (1) work-for-hire clause for all work product, (2) assignment of rights for anything not covered by work-for-hire, (3) disclosure of pre-existing IP incorporated into the work, and (4) license-back clause if contractor needs to use their own background IP. Be specific about ownership of software, data, and creative works.",
        },
        {
          question: "Can a New Jersey contractor agreement include a non-compete clause?",
          answer: "Yes, but carefully. Non-competes with independent contractors are evaluated under the same common-law framework as employee non-competes. However, if a NJ court later reclassifies the contractor as an employee, NJ wage laws and its employment law protections will apply, potentially voiding the non-compete for low-wage workers.",
        },
      ],
    },
    "commercial-lease-agreement": {
      requirements: [
        "No statutory form required — governed by common law and UCC Article 2A for equipment leases",
        "NJ commercial real estate market (NYC metro spillover) has strong TI allowance expectations",
        "NNN and modified gross leases both common depending on property type",
        "ADA compliance: responsibility for tenant improvements should be allocated in the lease",
        "CAM charges must be clearly defined and subject to audit rights",
        "Personal guarantee standard for small business tenants",
      ],
      restrictions: [
        "NJ does not regulate commercial lease terms — all provisions are negotiable",
        "Assignment and subletting typically require landlord's written consent",
        "NJ's tenant-friendly courts may give relief in cases of landlord breach",
      ],
      faq: [
        {
          question: "Is a written commercial lease required in New Jersey?",
          answer: "Leases for more than 3 years must be in writing and recorded under NJ's Statute of Frauds (NJSA 25:1-11). Even shorter commercial leases should be in writing to define the parties' rights. Oral commercial leases are legally valid but extremely risky and difficult to enforce.",
        },
        {
          question: "What is typical for commercial lease terms in New Jersey?",
          answer: "Northern New Jersey (Essex, Bergen, Hudson counties) commercial leases often mirror New York City practices — 5–10 year terms with TI allowances of $40–$100/sq ft for office build-outs. Southern NJ and suburban markets have shorter terms (3–5 years) and lower TI. Retail leases include percentage rent for high-traffic areas.",
        },
        {
          question: "What taxes should a NJ commercial tenant expect?",
          answer: "Commercial tenants in New Jersey may be responsible for their proportionate share of real property taxes under an NNN lease. NJ has some of the highest property tax rates in the country. Tax base years and cap provisions should be negotiated into longer leases to protect tenants from sudden tax increases.",
        },
        {
          question: "Can a NJ commercial tenant sublease their space?",
          answer: "Only if the lease permits. Most NJ commercial leases require written landlord consent for subleasing. Unlike residential leases, commercial landlords have broad discretion to approve or reject subtenants, subject only to any 'reasonableness' standard in the lease. Negotiate sublease rights at the outset.",
        },
      ],
    },
    "promissory-note": {
      requirements: [
        "Must include: principal, interest rate, payment schedule, maturity date, and default provisions",
        "Governed by NJSA 31:1-1 et seq. and the NJ UCC (NJSA 12A:3-101 et seq.)",
        "No general usury limit for commercial loans — business borrowers agree to market rates",
        "Consumer loan rates regulated under NJ Consumer Finance Licensing Act",
        "Usury ceiling is 16%/year for certain consumer transactions under NJSA 31:1-1",
        "Secured notes must reference and attach the security agreement",
      ],
      restrictions: [
        "NJ's usury laws exempt most commercial lenders from rate caps",
        "Confession of judgment clauses are prohibited in NJ consumer loan documents",
        "Predatory lending practices are regulated under the NJ Home Ownership Security Act for residential mortgages",
      ],
      faq: [
        {
          question: "What is the usury limit in New Jersey?",
          answer: "New Jersey's general usury rate is 16% per year for consumer transactions under NJSA 31:1-1. However, licensed lenders, financial institutions, and many commercial transactions are exempt from this cap. Business-to-business loans may carry higher rates if agreed upon in writing.",
        },
        {
          question: "What is the statute of limitations on a promissory note in New Jersey?",
          answer: "Under NJSA 2A:14-1, the statute of limitations for written contract claims — including promissory notes — is 6 years from the date of breach or the last payment date. Partial payments or written acknowledgment can reset the clock. Oral loans have a 6-year limitation period as well.",
        },
        {
          question: "Does a NJ promissory note need to be notarized?",
          answer: "Notarization is not required for a promissory note to be valid. However, for notes secured by real property (a mortgage or deed of trust), the mortgage must be notarized and recorded with the county clerk. Notarizing the note itself helps authenticate it if signatures are disputed.",
        },
        {
          question: "Can a NJ promissory note include a late fee?",
          answer: "Yes. Include a specific late fee provision — a flat amount or a percentage of the overdue payment. For consumer notes, late fees should be reasonable and disclosed upfront. For commercial notes, the parties have wide latitude to agree on late charges. Specify the grace period before the late fee applies.",
        },
      ],
    },
    "demand-letter": {
      requirements: [
        "No statutory form required — must clearly state the claim, amount, and deadline",
        "Identify all parties with full legal names and addresses",
        "Attach supporting documentation: contracts, invoices, correspondence",
        "State the exact remedy demanded — payment, specific performance, or cure",
        "Set a firm response deadline — 10–30 days is standard",
        "Send by certified mail, return receipt requested, and keep a complete copy",
      ],
      restrictions: [
        "NJ Consumer Fraud Act (NJSA 56:8-1 et seq.) imposes liability for unfair or deceptive practices",
        "Third-party debt collectors must comply with FDCPA and NJ Debt Collection Practices Regulations",
        "Threatening actions you have no legal basis to take may constitute harassment",
      ],
      faq: [
        {
          question: "What is the statute of limitations for contract claims in New Jersey?",
          answer: "Under NJSA 2A:14-1, written and oral contract claims must both be filed within 6 years of the breach. NJ's 6-year period is longer than many states. However, a demand letter does not toll the limitations period — file suit before the deadline if negotiations fail.",
        },
        {
          question: "Is a demand letter required before suing in New Jersey?",
          answer: "A demand letter is not legally required before filing most civil suits in NJ. However, for Small Claims Court (up to $5,000), sending a demand letter first is standard practice and demonstrates good faith. It often resolves disputes without the cost and delay of litigation.",
        },
        {
          question: "Can I recover attorney's fees in a New Jersey contract dispute?",
          answer: "Under the American Rule, each party pays its own attorney's fees. However, NJ's Consumer Fraud Act allows fee recovery for successful plaintiffs. If your contract has a fee-shifting clause, NJ courts will enforce it. Reference the fee provision in your demand letter to add leverage.",
        },
        {
          question: "What should I include in a New Jersey demand letter for a security deposit?",
          answer: "State the date of move-out, the deposit amount, and the fact that it was not returned within 30 days as required by NJSA 46:8-21.1. Note that the tenant is entitled to 100% of the withheld deposit plus court costs if the landlord acted in bad faith. Demand the return of the full deposit within a specific number of days.",
        },
      ],
    },
  },

  // ── Massachusetts ─────────────────────────────────────────────────────────
  massachusetts: {
    "residential-lease-agreement": {
      requirements: [
        "Security deposit: equal to ONE month's rent only — no more (MGL c.186 § 15B)",
        "Landlord must return deposit within 30 days of tenancy end with itemized deductions",
        "Last month's rent collected at signing is separate from security deposit — both allowed",
        "Required: written statement of the deposit's location (bank account information)",
        "Required: lead paint disclosure for all rentals built before 1978 (MGL c.111 § 197A)",
        "Required: written receipt for any amount received from tenant at move-in",
      ],
      restrictions: [
        "No statewide rent control — Boston and Cambridge rent control was repealed by ballot in 1994",
        "Landlord cannot charge a pet deposit, additional fees beyond first/last/security",
        "Landlord cannot charge an application fee that exceeds actual credit/background check cost",
      ],
      noticeRequirements: "Month-to-month: notice equal to the interval between rent payments (typically 30 days) required to terminate",
      faq: [
        {
          question: "What can a Massachusetts landlord collect at the start of a tenancy?",
          answer: "Under MGL c.186 § 15B, a Massachusetts landlord may collect: (1) first month's rent, (2) last month's rent, (3) security deposit equal to one month's rent, and (4) a lock/key deposit if applicable. Nothing more. Charging more than one month's security deposit is illegal and subjects the landlord to triple damages.",
        },
        {
          question: "What are the rules for returning a Massachusetts security deposit?",
          answer: "The landlord must return the deposit within 30 days of the tenancy ending, with a written itemized statement of deductions. Failure to return the deposit within 30 days, or failure to provide itemized deductions, entitles the tenant to recover the full deposit plus interest, 3x wrongful withholding damages, and attorney's fees.",
        },
        {
          question: "Does Massachusetts require lead paint disclosure?",
          answer: "Yes. Any rental property built before 1978 must comply with the Massachusetts Lead Law (MGL c.111 § 197A). Landlords must disclose known lead paint, provide a lead paint pamphlet, and must de-lead the unit if a child under 6 lives there. Non-compliance creates significant liability.",
        },
        {
          question: "Is it legal to discriminate against tenants with children in Massachusetts?",
          answer: "No. Massachusetts law prohibits housing discrimination based on familial status (presence of children) under MGL c.151B. Landlords cannot refuse to rent to families with children under 18 unless they qualify as housing for older persons (55+ communities). Violators face civil rights complaints and significant liability.",
        },
      ],
    },
    "llc-operating-agreement": {
      requirements: [
        "Governed by the Massachusetts Uniform Limited Liability Company Act (MGL c.156C, effective 2012)",
        "Certificate of Organization filed with Corporations Division of Secretary of State; filing fee $500",
        "Annual report required — $500 fee, due annually on the anniversary of organization",
        "Resident agent with Massachusetts street address required",
        "No publication requirement in Massachusetts",
        "Operating agreement does not need to be filed but should be signed by all members",
      ],
      restrictions: [
        "MA LLC names must include 'Limited Liability Company,' 'L.L.C.,' or 'LLC'",
        "Professional LLCs require board authorization — attorneys, accountants, engineers have separate rules",
        "Series LLCs are not formally recognized in Massachusetts",
      ],
      faq: [
        {
          question: "Does Massachusetts require an LLC operating agreement?",
          answer: "Massachusetts law (MGL c.156C § 3) does not require an operating agreement but allows members to adopt one. Without a written agreement, Massachusetts default rules govern. The default rules may not match member intentions on critical issues like distributions, voting, and member dissociation.",
        },
        {
          question: "How much does it cost to form a Massachusetts LLC?",
          answer: "The Massachusetts Secretary of State charges $500 to file a Certificate of Organization. The annual report costs $500. Massachusetts is one of the more expensive states to form and maintain an LLC. Members pay Massachusetts personal income tax on their pass-through share of profits at the applicable rate.",
        },
        {
          question: "What is Massachusetts' tax treatment of LLCs?",
          answer: "Massachusetts generally follows federal treatment — LLCs are pass-through entities taxed at the member level. However, Massachusetts imposes a corporate excise tax on LLCs with revenues over $6 million, treating them similarly to corporations for that portion. The state income tax rate is 5% (5.4% for short-term capital gains).",
        },
        {
          question: "What is the Massachusetts annual report for LLCs?",
          answer: "All Massachusetts LLCs must file an Annual Report with the Secretary of State and pay the $500 fee by the anniversary date of the Certificate of Organization. Late reports incur additional fees. Failure to file results in administrative dissolution of the LLC.",
        },
      ],
    },
    "employment-contract": {
      requirements: [
        "At-will employment is the default in Massachusetts — include explicit at-will language",
        "Massachusetts minimum wage: $15.00/hour (2024); tipped employees $6.75/hour plus tips",
        "Massachusetts Earned Sick Time Law: 40 hours paid sick time per year for employers with 11+ employees",
        "Massachusetts PFML: paid family and medical leave contributions required for most employees",
        "Non-compete Act (MGL c.149 § 24L, effective 2018): significant restrictions on non-competes",
        "Salary history ban: employers may not ask about prior salary (MGL c.149 § 105A)",
      ],
      restrictions: [
        "Non-competes unenforceable for hourly workers, employees terminated without cause, and undergraduate/graduate students",
        "Non-competes must not exceed 1 year, must provide garden leave pay or other consideration",
        "Massachusetts is a joint employer state — specify that your company is the sole employer in the contract",
      ],
      faq: [
        {
          question: "What is Massachusetts' Non-Compete Agreement Act?",
          answer: "Effective October 1, 2018, Massachusetts restricts non-competes significantly. They: (1) may not exceed 1 year, (2) must provide garden leave pay (50% of base salary) or other mutually agreed consideration, (3) cannot cover nonexempt employees or workers terminated without cause, and (4) must be provided at least 10 days before hire and signed separately.",
        },
        {
          question: "What is Massachusetts' minimum wage in 2024?",
          answer: "Massachusetts' minimum wage is $15.00/hour in 2024. Tipped employees earn a minimum of $6.75/hour, but must reach $15.00/hour including tips or the employer makes up the difference. The minimum wage adjusts annually.",
        },
        {
          question: "What is Massachusetts' PFML program?",
          answer: "Massachusetts Paid Family and Medical Leave (PFML) provides employees up to 12 weeks of paid family leave and up to 20 weeks of paid medical leave per year. Employers with 25+ employees share premium costs with employees. Benefits are funded through payroll contributions.",
        },
        {
          question: "Can Massachusetts employers ask about prior salaries?",
          answer: "No. Under MGL c.149 § 105A (effective July 1, 2018), Massachusetts employers cannot ask about a job applicant's salary history at any stage of the hiring process. They can discuss the position's compensation and tell applicants the expected salary range.",
        },
      ],
    },
    "power-of-attorney": {
      requirements: [
        "Governed by MGL c.190B Article V (Massachusetts Uniform Probate Code, adopted 2012)",
        "Principal must be 18+ and have legal capacity",
        "Must be signed by the principal or by a directed signer at principal's direction",
        "Notarization strongly recommended — required for real estate and financial institution acceptance",
        "Durable POA language must expressly state it survives incapacity",
        "Healthcare decisions require a separate Massachusetts Health Care Proxy (MGL c.201D)",
      ],
      restrictions: [
        "Agent may not make or revoke principal's will, make gifts to themselves beyond personal needs, or change trust beneficiaries without express authority",
        "Massachusetts Probate and Family Court can review and terminate an agent's authority if abuse is suspected",
        "A POA signed under undue influence or when principal lacked capacity is voidable",
      ],
      faq: [
        {
          question: "What formalities are required for a Massachusetts power of attorney?",
          answer: "Under MGL c.190B § 5-501, a Massachusetts POA must be signed by the principal (or directed signer) in the presence of two witnesses who also sign. Notarization is highly recommended and required for real estate transactions and financial institution acceptance.",
        },
        {
          question: "What makes a Massachusetts POA durable?",
          answer: "Under MGL c.190B § 5-501, a POA is durable if it expressly states it is not affected by the principal's subsequent incapacity or disability. A common phrase: 'This power of attorney shall not be affected by disability, incapacity, or uncertainty as to whether the principal is dead or alive.' Without such language, the POA terminates on incapacity.",
        },
        {
          question: "Can a Massachusetts POA be used for healthcare decisions?",
          answer: "No. A standard financial POA does not cover healthcare in Massachusetts. A separate Health Care Proxy (MGL c.201D) is required to authorize another person to make healthcare decisions. A Massachusetts Medical Orders for Life-Sustaining Treatment (MOLST) form can also address end-of-life care.",
        },
        {
          question: "How do I revoke a Massachusetts power of attorney?",
          answer: "Revoke a Massachusetts POA by signing a written revocation and notifying the agent and all third parties relying on it. Record the revocation with the Registry of Deeds if the original was used for real estate. File the revocation with the Probate and Family Court if the agent has been abusing authority.",
        },
      ],
    },
    "last-will-and-testament": {
      requirements: [
        "Testator must be 18+ and of sound mind (MGL c.190B § 2-501)",
        "Will must be signed by the testator (or by another at testator's direction in testator's presence)",
        "Two witnesses must sign within a reasonable time after witnessing testator's signature",
        "Witnesses should not be beneficiaries — interested witnesses may create a presumption of undue influence",
        "Self-proving affidavit (with notarization) available (MGL c.190B § 2-504)",
        "Massachusetts adopted the Uniform Probate Code — formal and informal probate both available",
      ],
      restrictions: [
        "Holographic (handwritten, unwitnessed) wills are not valid in Massachusetts",
        "Surviving spouse has elective share right to at least 25% of the estate (MGL c.190B § 2-202)",
        "A will cannot override beneficiary designations on IRAs, life insurance, or POD accounts",
      ],
      faq: [
        {
          question: "Does Massachusetts recognize handwritten wills?",
          answer: "No. Massachusetts does not recognize holographic wills. All wills must be in writing (typed or printed), signed by the testator, and witnessed by two competent adults. Any will that does not meet these requirements is not valid in Massachusetts.",
        },
        {
          question: "What is Massachusetts' probate process?",
          answer: "Massachusetts uses the Uniform Probate Code and offers informal probate (no court hearing for uncontested estates) and formal probate (supervised by the Probate and Family Court). Informal probate is faster and less expensive. Estates must be filed in the county where the decedent lived.",
        },
        {
          question: "What rights does a surviving spouse have in Massachusetts?",
          answer: "Under MGL c.190B § 2-202, a surviving spouse can elect against the will and receive their elective share of the augmented estate. The share depends on the length of the marriage, ranging from a small percentage for short marriages to a larger share for longer marriages. The election must be made within 9 months of death.",
        },
        {
          question: "Does Massachusetts have an estate tax?",
          answer: "Yes. Massachusetts has its own estate tax on estates over $2 million (as of 2023 — this threshold was raised from $1 million). The top rate is 16%. This is separate from the federal estate tax. Careful estate planning is essential for Massachusetts residents with significant assets.",
        },
      ],
    },
    "non-compete-agreement": {
      requirements: [
        "Governed by MGL c.149 § 24L (Massachusetts Non-Compete Agreement Act, effective October 1, 2018)",
        "Must not exceed 1 year in duration (or 2 years for breach or garden leave situations)",
        "Must provide 'garden leave' pay — 50% of base salary during the restriction period — OR equivalent consideration",
        "Must be provided at least 10 business days before hire or promotion and signed separately",
        "Cannot apply to nonexempt employees, employees terminated without cause, or certain other workers",
        "Must be reasonable in geographic scope and scope of restricted activities",
      ],
      restrictions: [
        "Non-competes are void for: nonexempt employees, employees laid off or terminated without cause, undergraduate/graduate students, and employees under 18",
        "A garden leave alternative to the 1-year limit allows 2-year agreements if garden leave pay is provided",
        "Choice-of-law clauses in non-competes for MA-based employees must apply Massachusetts law",
      ],
      faq: [
        {
          question: "What is Massachusetts' Non-Compete Agreement Act?",
          answer: "The Massachusetts Non-Compete Agreement Act (MGL c.149 § 24L) took effect October 1, 2018 and created strict requirements: (1) maximum 1-year duration, (2) garden leave pay of 50% of base salary or other mutually agreed consideration, (3) must be provided 10+ business days before signing, (4) not enforceable against hourly workers, students, or employees terminated without cause.",
        },
        {
          question: "What is 'garden leave' pay in a Massachusetts non-compete?",
          answer: "Garden leave pay requires the employer to continue paying the employee at least 50% of their base salary during the non-compete restriction period. This is the quid pro quo for restricting the employee's ability to work. Alternatively, parties can agree to 'other mutually-agreed consideration,' but courts scrutinize whether this is adequate.",
        },
        {
          question: "Can a non-compete apply to an employee fired without cause in Massachusetts?",
          answer: "No. Under MGL c.149 § 24L(c)(4), non-compete agreements are unenforceable against employees who are terminated without cause. An employee laid off or fired without good reason is free from any non-compete obligation, regardless of what the agreement says.",
        },
        {
          question: "Can a Massachusetts employer use another state's law to enforce a non-compete?",
          answer: "No. Under MGL c.149 § 24L(g), a choice-of-law clause in a non-compete that applies another state's law to a Massachusetts-based employee is void. Massachusetts law governs. Employers cannot evade the Act by choosing a more permissive state's law.",
        },
      ],
    },
    "independent-contractor-agreement": {
      requirements: [
        "Massachusetts uses one of the strictest ABC tests in the country (MGL c.149 § 148B)",
        "ABC Test: (A) free from control in performance of services, (B) work performed outside usual course of business OR off all of the company's premises, (C) independently established in the trade",
        "All three prongs must be met — failure of any one prong means the worker is an employee",
        "Include IP ownership, work-for-hire, and confidentiality provisions",
        "Contractor must provide their own tools and equipment",
        "Include indemnification clause covering contractor's acts, omissions, and tax obligations",
      ],
      restrictions: [
        "Massachusetts' ABC test is exceptionally strict — even experienced consultants working in their area of expertise often fail Prong B",
        "Misclassification penalties: back wages, triple damages, civil penalties, and criminal liability for willful violations",
        "Construction contractors have additional requirements under the MA construction contractor registration law",
      ],
      faq: [
        {
          question: "How does Massachusetts classify workers as contractors vs. employees?",
          answer: "Massachusetts uses a strict ABC test under MGL c.149 § 148B. A worker is presumed an employee. To qualify as a contractor, all three prongs must be met: (A) freedom from control, (B) work is outside the company's usual course of business OR performed off-premises, and (C) the worker has an independently established business. Courts interpret these strictly.",
        },
        {
          question: "Why is Massachusetts' ABC test considered the strictest?",
          answer: "Most ABC tests require that the work be performed outside the company's usual course of business AND off-premises, but Massachusetts uses 'OR' — meaning satisfying just one is sufficient. However, Prong B is still strictly applied, and workers who do the company's core work (e.g., a writer for a media company) almost always fail.",
        },
        {
          question: "What are the penalties for misclassification in Massachusetts?",
          answer: "Penalties include: back wages, triple damages, civil penalties up to $10,000 per violation for first offenses ($25,000 for subsequent), criminal penalties for willful violations, and public disclosure. Massachusetts actively enforces these through joint task force investigations.",
        },
        {
          question: "What IP provisions should a Massachusetts contractor agreement include?",
          answer: "Include a work-for-hire clause for all deliverables, an assignment of all rights in work product, contractor's disclosure of pre-existing IP used, and a license-back for any background IP incorporated. Note that if a court recharacterizes the contractor as an employee, IP ownership rules change significantly.",
        },
      ],
    },
    "commercial-lease-agreement": {
      requirements: [
        "No statutory form required — governed by common law contract principles",
        "Boston and Cambridge commercial markets are highly competitive with significant TI expectations",
        "Life sciences, biotech, and tech sectors drive high demand in Cambridge (Kendall Square) and Boston (Seaport)",
        "NNN and modified gross leases both common depending on property type and submarket",
        "ADA compliance: allocate responsibility for accessibility improvements clearly in the lease",
        "Include HVAC maintenance responsibilities — critical in New England's climate",
      ],
      restrictions: [
        "Massachusetts does not regulate commercial lease terms — all provisions are negotiable",
        "Boston zoning changes may affect permitted use provisions — check current zoning before signing",
        "Mechanic's liens can attach to landlord's property for tenant improvements — include lien waiver requirements",
      ],
      faq: [
        {
          question: "Is a written commercial lease required in Massachusetts?",
          answer: "Leases for more than one year must be in writing under Massachusetts' Statute of Frauds (MGL c.259 § 1). Even for shorter terms, written commercial leases are essential to protect both parties. Massachusetts courts strictly enforce the terms of written commercial leases.",
        },
        {
          question: "What are typical commercial lease terms in Boston?",
          answer: "Class A office space in Boston's financial district and Seaport typically commands $60–$90/sq ft on 5–10 year leases. Life sciences lab space in Kendall Square has reached $100+/sq ft. TI allowances of $50–$150/sq ft are common for longer leases. The market is highly competitive with low vacancies.",
        },
        {
          question: "Who maintains HVAC in a Massachusetts commercial lease?",
          answer: "HVAC responsibility is entirely negotiable. In NNN leases, tenants typically maintain and repair HVAC during the term, with landlords responsible for capital replacement. Massachusetts winters and summers create significant HVAC demand — specify maintenance schedules and responsibilities clearly.",
        },
        {
          question: "What is the Massachusetts landlord's warranty of suitability for commercial space?",
          answer: "Unlike residential leases, commercial landlords in Massachusetts do not owe a warranty of habitability. However, some courts have recognized an implied warranty of suitability for commercial premises. Include specific representations about the condition of the premises in the lease to define landlord's obligations clearly.",
        },
      ],
    },
    "promissory-note": {
      requirements: [
        "Must include: principal, interest rate, repayment schedule, maturity date, and default terms",
        "Governed by MGL c.140 § 90 et seq. and Massachusetts UCC (MGL c.106 § 3-101 et seq.)",
        "Usury limit: 20% per year for most consumer loans (MGL c.271 § 49)",
        "Licensed lenders and commercial transactions are generally exempt from the usury cap",
        "Consumer loan disclosures required under MGL c.140 § 90 for small loans",
        "Secured notes must reference and attach the security agreement",
      ],
      restrictions: [
        "Predatory lending is regulated under MGL c.183C (Predatory Home Loan Practices Act) for residential mortgages",
        "Confession of judgment clauses are void in Massachusetts consumer transactions",
        "Late fees and default interest rates should be specified — courts may limit unconscionable charges",
      ],
      faq: [
        {
          question: "What is the usury limit for Massachusetts promissory notes?",
          answer: "Massachusetts' usury law (MGL c.271 § 49) sets a criminal limit of 20% per year. However, many commercial lenders are exempt from this cap. For business-to-business loans, the contracted rate is typically enforceable. Consumer loans face the 20% cap unless a licensed lender exception applies.",
        },
        {
          question: "What is the statute of limitations on a Massachusetts promissory note?",
          answer: "Under MGL c.260 § 2, the statute of limitations for written contract claims — including promissory notes — is 6 years from the date of breach. Oral loan agreements also have a 6-year limitation period. Partial payments reset the limitations clock.",
        },
        {
          question: "Does a Massachusetts promissory note need to be notarized?",
          answer: "Notarization is not required for a promissory note to be valid. A deed of trust or mortgage securing real property must be notarized and recorded with the Registry of Deeds. Notarizing the note itself provides additional evidence of authenticity if signatures are disputed.",
        },
        {
          question: "Can a Massachusetts promissory note be transferred to another creditor?",
          answer: "Yes. A negotiable promissory note under the Massachusetts UCC (MGL c.106 Article 3) can be endorsed and transferred to a third party, who becomes a holder in due course with the right to collect. To prevent transfer, include a 'non-negotiable' or 'not transferable without consent' clause.",
        },
      ],
    },
    "demand-letter": {
      requirements: [
        "No statutory form required — must clearly state the claim, amount, and deadline for response",
        "Identify all parties with full legal names and addresses",
        "Attach supporting documentation: contracts, invoices, correspondence, photographs",
        "State the exact remedy demanded — dollar amount, specific performance, or cure",
        "Set a firm response deadline — 10–30 days is standard",
        "Send by certified mail, return receipt requested, and keep a complete copy",
      ],
      restrictions: [
        "Massachusetts Consumer Protection Act (MGL c.93A) allows triple damages for unfair or deceptive acts — relevant to both creditors and debtors",
        "Third-party debt collectors must comply with FDCPA and Massachusetts debt collection regulations",
        "Threats of criminal action to collect a civil debt may constitute extortion under Massachusetts law",
      ],
      faq: [
        {
          question: "What is the statute of limitations for contract claims in Massachusetts?",
          answer: "Under MGL c.260 § 2, written and oral contract claims must both be filed within 6 years of the breach. A demand letter does not toll the limitations period — if the deadline approaches, file suit to preserve your rights.",
        },
        {
          question: "How does the Massachusetts Consumer Protection Act affect demand letters?",
          answer: "MGL c.93A requires businesses to respond to written demand letters within 30 days with a good faith offer of settlement. Failure to respond adequately can result in automatic treble (triple) damages if the court finds the violation was willful or knowing. Include a demand under c.93A if applicable.",
        },
        {
          question: "What should a Massachusetts c.93A demand letter include?",
          answer: "A c.93A demand letter must: identify yourself and the defendant, describe the allegedly unfair or deceptive act, state the resulting injury and damages sought, and request a reasonable relief offer within 30 days. This demand is a legal prerequisite to filing a c.93A lawsuit.",
        },
        {
          question: "Can I recover attorney's fees in a Massachusetts contract dispute?",
          answer: "Under the American Rule, attorney's fees are not automatically recoverable. However, Massachusetts c.93A allows successful plaintiffs to recover fees in consumer protection cases. If your contract includes a fee-shifting clause, Massachusetts courts will enforce it.",
        },
      ],
    },
  },

  // ── Tennessee ─────────────────────────────────────────────────────────────
  tennessee: {
    "residential-lease-agreement": {
      requirements: [
        "Governed by the Tennessee Uniform Residential Landlord and Tenant Act (URLTA, TCA § 66-28-101 et seq.) — applies in counties with 75,000+ population",
        "Security deposit: no statutory cap but must be deposited in a separate escrow account",
        "Landlord must return deposit within 30 days of tenancy end with itemized deductions",
        "Required: written notice of landlord's name and address for service (TCA § 66-28-302)",
        "Required: lead paint disclosure for pre-1978 properties",
        "Landlord must maintain the premises in a safe and habitable condition (TCA § 66-28-304)",
      ],
      restrictions: [
        "No statewide rent control in Tennessee",
        "Late fees must be stated in the lease — maximum $30 or 10% of monthly rent, whichever is greater",
        "URLTA does not apply in all counties — rural counties may follow different rules",
      ],
      noticeRequirements: "Month-to-month: 30 days' written notice required; week-to-week: 10 days' notice",
      faq: [
        {
          question: "Does Tennessee's landlord-tenant law apply everywhere in the state?",
          answer: "No. The Tennessee Uniform Residential Landlord and Tenant Act (URLTA) only applies in counties with a population of 75,000 or more. This includes Shelby, Davidson, Knox, Hamilton, and other large counties. Smaller counties follow general contract and property law. Check whether URLTA applies to your county.",
        },
        {
          question: "What is Tennessee's rule for returning security deposits?",
          answer: "Tennessee requires landlords to return the security deposit within 30 days of the tenant vacating (or the lease end, whichever is later), with an itemized statement of deductions. The deposit must be held in a separate escrow account. Improper withholding allows tenants to sue for the deposit plus court costs.",
        },
        {
          question: "Are late fees limited in Tennessee?",
          answer: "Under TCA § 66-28-201(c), late fees in Tennessee residential leases are capped at the greater of $30 or 10% of the monthly rent. Late fees may only be charged after the rent is 5 days past due. Fees above this cap are unenforceable.",
        },
        {
          question: "What are a Tennessee landlord's repair obligations?",
          answer: "Under URLTA (TCA § 66-28-304), landlords must keep the premises habitable, maintain plumbing and heating, and comply with applicable housing codes. Tenants must notify the landlord of needed repairs in writing. If the landlord fails to repair within 14 days (or a shorter period for emergencies), tenants may pursue remedies.",
        },
      ],
    },
    "llc-operating-agreement": {
      requirements: [
        "Governed by the Tennessee Revised Limited Liability Company Act (TCA § 48-249-101 et seq.)",
        "Articles of Organization filed with TN Secretary of State; filing fee $300",
        "Annual report required — no fee for standard annual report; due on the first day of the 4th month of the tax year",
        "Registered agent with Tennessee street address required",
        "No publication requirement in Tennessee",
        "Operating agreement is not filed but should be signed by all members",
      ],
      restrictions: [
        "TN LLC names must include 'Limited Liability Company,' 'LLC,' or 'L.L.C.'",
        "Professional LLCs require licensing board authorization",
        "Tennessee recognizes series LLCs under TCA § 48-249-309",
      ],
      faq: [
        {
          question: "Does Tennessee require an LLC operating agreement?",
          answer: "Tennessee does not require a written operating agreement, but TCA § 48-249-203 allows members to adopt one. Without a written agreement, Tennessee default rules govern all key aspects of LLC operations — distributions, voting, management, and member exits. A written operating agreement is strongly recommended.",
        },
        {
          question: "How much does it cost to form a Tennessee LLC?",
          answer: "Tennessee charges $300 to file Articles of Organization with the Secretary of State. Annual reports are required but carry no additional fee (as of 2024). Tennessee does not impose a franchise tax on LLCs organized as pass-through entities for tax purposes.",
        },
        {
          question: "Does Tennessee recognize series LLCs?",
          answer: "Yes. Tennessee recognizes series LLCs under TCA § 48-249-309. Each series of a Tennessee series LLC can have distinct assets, members, and liabilities. This structure is useful for real estate investors and businesses with multiple operating units that need liability segregation.",
        },
        {
          question: "What is Tennessee's tax treatment of LLCs?",
          answer: "Tennessee has no personal income tax on earned wages (eliminated for investment income as of 2022). LLCs with pass-through income are not subject to state income tax at the entity level. However, Tennessee does impose a franchise and excise tax on businesses with nexus in Tennessee — LLCs may owe these taxes if they meet the threshold.",
        },
      ],
    },
    "employment-contract": {
      requirements: [
        "At-will employment is the default in Tennessee — include explicit at-will language",
        "Tennessee minimum wage: $7.25/hour (federal rate — no state increase)",
        "Tennessee is a right-to-work state (TCA § 50-1-201) — union membership cannot be required",
        "No state-mandated paid sick leave or paid family leave in Tennessee",
        "Include non-compete provisions carefully — Tennessee courts enforce reasonable restrictions",
        "Tennessee Employment Security Law governs unemployment insurance — misclassification risks apply",
      ],
      restrictions: [
        "Tennessee Human Rights Act prohibits discrimination based on race, sex, color, religion, national origin, age, and disability",
        "Tennessee Public Protection Act: employees may not be discharged for refusing to participate in illegal activity",
        "Tip pooling follows federal FLSA rules — include in contracts for tipped employees",
      ],
      faq: [
        {
          question: "Is Tennessee an at-will employment state?",
          answer: "Yes. Tennessee is an at-will employment state, meaning employment can be terminated by either party at any time for any lawful reason. The Tennessee Supreme Court has limited exceptions for public policy violations (e.g., firing someone for filing a workers' comp claim). Include explicit at-will language in all employment contracts.",
        },
        {
          question: "Does Tennessee have a state minimum wage?",
          answer: "No. Tennessee has no state minimum wage law. The federal minimum wage of $7.25/hour applies. Tennessee employers in industries covered by the FLSA must pay the federal rate. Some cities (Nashville, Memphis) have explored higher local wages, but state preemption may apply.",
        },
        {
          question: "Is Tennessee a right-to-work state?",
          answer: "Yes. Under TCA § 50-1-201, Tennessee is a right-to-work state. Employees cannot be required to join a union or pay union dues as a condition of employment. This makes Tennessee attractive for manufacturing and other industries that may face union organizing efforts.",
        },
        {
          question: "Are non-compete agreements enforceable in Tennessee?",
          answer: "Yes. Tennessee courts enforce non-competes that are: (1) supported by adequate consideration, (2) protecting a legitimate business interest, and (3) reasonable in scope, geography, and duration. Tennessee courts apply the blue-pencil doctrine to reform overbroad agreements rather than void them entirely.",
        },
      ],
    },
    "power-of-attorney": {
      requirements: [
        "Governed by TCA § 34-6-101 et seq. (Tennessee Durable Power of Attorney Act)",
        "Principal must be 18+ and have legal capacity",
        "Must be signed by the principal (or another at principal's direction)",
        "Must be notarized — acknowledgment before a notary is required for validity",
        "Two witnesses required in addition to notarization (TCA § 34-6-102)",
        "Healthcare decisions require a separate Tennessee Health Care Advance Directive (TCA § 68-11-1801 et seq.)",
      ],
      restrictions: [
        "Agent may not create or revoke principal's will, make gifts beyond personal needs, or change trust beneficiaries without specific authority",
        "POA for real estate must be notarized and may need to be recorded with the county register of deeds",
        "A POA made under duress or when principal lacked capacity is voidable",
      ],
      faq: [
        {
          question: "What are the witness and notarization requirements for a Tennessee POA?",
          answer: "Under TCA § 34-6-102, a Tennessee power of attorney must be signed by the principal, acknowledged before a notary public, and signed by two witnesses. The agent, the notary, and heirs of the principal cannot serve as witnesses. All three formalities must be completed for the POA to be valid.",
        },
        {
          question: "What makes a Tennessee power of attorney durable?",
          answer: "Under TCA § 34-6-102, a POA is durable if it expressly states that it is not terminated by the principal's subsequent disability or incapacity. A standard phrase: 'This power of attorney shall not be terminated by disability, incapacity, or uncertainty as to whether the principal is dead or alive.'",
        },
        {
          question: "Can I use a Tennessee POA for medical decisions?",
          answer: "No. A standard financial POA does not authorize healthcare decisions in Tennessee. You need a separate Tennessee Advance Directive (TCA § 68-11-1801), which includes a designation of healthcare agent and instructions for end-of-life care. Tennessee law requires a separate document for healthcare authority.",
        },
        {
          question: "Does a Tennessee POA need to be recorded?",
          answer: "Recording is not required for most purposes, but if the POA will be used for real estate transactions, it should be recorded with the county register of deeds in the county where the property is located. Recording gives constructive notice to third parties that the agent has authority.",
        },
      ],
    },
    "last-will-and-testament": {
      requirements: [
        "Testator must be 18+ or legally emancipated (TCA § 32-1-102)",
        "Testator must be of sound mind and not acting under undue influence",
        "Will must be signed by the testator (or another at testator's direction in testator's presence)",
        "Two witnesses must sign the will — they must witness the testator's signing",
        "Witnesses should not be beneficiaries",
        "Self-proving affidavit available if will is notarized — simplifies probate (TCA § 32-2-110)",
      ],
      restrictions: [
        "Holographic (handwritten, unwitnessed) wills are valid in Tennessee if entirely in testator's handwriting and signed (TCA § 32-1-105)",
        "Spouse has elective share rights — may claim a portion of the estate regardless of the will (TCA § 31-4-101)",
        "A will cannot override beneficiary designations on retirement accounts or life insurance",
      ],
      faq: [
        {
          question: "Are handwritten wills valid in Tennessee?",
          answer: "Yes. Tennessee recognizes holographic wills under TCA § 32-1-105. A holographic will must be entirely in the testator's handwriting and signed. No witnesses are required. However, typed wills with two witnesses are more reliable and less vulnerable to challenge.",
        },
        {
          question: "What is Tennessee's probate process for wills?",
          answer: "Wills are probated in the Chancery or Circuit Court of the county where the decedent lived. The executor files the will, pays a filing fee, and is appointed by the court. Tennessee offers simplified procedures for small estates (under $50,000 in personal property) through a small estate affidavit.",
        },
        {
          question: "Does Tennessee have an estate tax?",
          answer: "No. Tennessee eliminated its state estate tax (formerly called the inheritance tax) effective January 1, 2016. Tennessee residents are only subject to the federal estate tax. The federal exemption is $13.61 million per individual (2024). This makes Tennessee attractive for estate planning.",
        },
        {
          question: "What is the spousal elective share in Tennessee?",
          answer: "Under TCA § 31-4-101, a surviving spouse can elect against the will and claim their elective share. The share depends on the length of the marriage — ranging from 10% for marriages under 3 years to up to 40% for marriages over 12 years. The election must be filed within 9 months of death.",
        },
      ],
    },
    "non-compete-agreement": {
      requirements: [
        "Must be supported by adequate consideration — new employment, or new benefits for existing employees",
        "Must protect a legitimate business interest — trade secrets, customer relationships, or specialized training",
        "Must be reasonable in geographic scope — limited to where the employee actually worked or the employer's market",
        "Must be reasonable in duration — typically 1–2 years; courts scrutinize longer terms",
        "Must be specific in scope — identify the restricted activities clearly",
        "Tennessee courts may blue-pencil (reform) overbroad agreements",
      ],
      restrictions: [
        "Tennessee courts apply a reasonableness standard — neither overly restrictive nor injurious to the public",
        "Non-competes for low-wage workers with no access to trade secrets face heightened scrutiny",
        "Garden leave or additional consideration strengthens enforceability for mid-employment agreements",
      ],
      faq: [
        {
          question: "Are non-compete agreements enforceable in Tennessee?",
          answer: "Yes. Tennessee enforces non-compete agreements if they protect a legitimate business interest and are reasonable in scope, geography, and duration. Courts apply a balancing test weighing the employer's interest against harm to the employee and the public. Tennessee courts have broad discretion to reform overbroad agreements.",
        },
        {
          question: "What duration is acceptable for a Tennessee non-compete?",
          answer: "Tennessee courts generally uphold non-competes of 1–2 years. Longer terms (3 years) have been upheld for senior executives with access to highly sensitive trade secrets. The duration must be proportionate to the employee's role and the nature of the information being protected.",
        },
        {
          question: "Will Tennessee courts reform an overbroad non-compete?",
          answer: "Yes. Tennessee applies the blue-pencil doctrine — courts may narrow the geographic scope or duration of a non-compete rather than void it entirely. This means employers should draft their agreements carefully, as a poorly drafted agreement may be modified but not eliminated.",
        },
        {
          question: "What consideration is required for a Tennessee non-compete?",
          answer: "For non-competes signed at the start of employment, the job offer itself is sufficient consideration. For existing employees, the employer must provide additional consideration — a raise, bonus, promotion, or other benefit. Courts scrutinize mid-employment non-competes without new consideration.",
        },
      ],
    },
    "independent-contractor-agreement": {
      requirements: [
        "Clearly establish independent contractor status using IRS common-law factors",
        "Specify contractor controls the means and methods of work, not just the results",
        "Include IP ownership, work-for-hire, and confidentiality provisions",
        "Include indemnification clause for contractor's own acts, omissions, and tax obligations",
        "Address contractor's responsibility for own workers' compensation and liability insurance",
        "Tennessee Construction Contractors License required for construction work over $25,000",
      ],
      restrictions: [
        "Tennessee Employment Security Law has its own classification criteria — misclassification triggers UI liability",
        "Workers classified as contractors who are later found to be employees are entitled to back wages under Tennessee wage laws",
        "Tennessee Department of Labor may audit contractor classifications — maintain records supporting contractor status",
      ],
      faq: [
        {
          question: "How does Tennessee determine contractor vs. employee classification?",
          answer: "Tennessee uses the IRS common-law test for income tax purposes and its own factors for unemployment insurance under the Tennessee Employment Security Law. Key factors include behavioral control, financial control, and the permanency and nature of the working relationship. Misclassification can trigger liability under both.",
        },
        {
          question: "What IP provisions should a Tennessee contractor agreement include?",
          answer: "Include a work-for-hire clause, an assignment of all rights in deliverables not covered by work-for-hire, disclosure requirements for pre-existing IP incorporated into the work, and a license-back clause if the contractor needs to retain rights to background IP. Specify data ownership and return obligations.",
        },
        {
          question: "Does Tennessee have specific contractor licensing requirements?",
          answer: "Yes. Tennessee requires contractors performing commercial construction, home improvement, or electrical/plumbing/HVAC work to be licensed by the Tennessee Contractors Licensing Board. Agreements for licensed work should verify the contractor's license number and require them to maintain it throughout the project.",
        },
        {
          question: "Can a Tennessee contractor agreement include a non-solicitation clause?",
          answer: "Yes. Non-solicitation clauses are generally enforceable against contractors in Tennessee if they meet the same reasonableness standard as employee agreements. They restrict soliciting the company's clients or employees for a defined period after the engagement ends. Keep the scope narrow and the duration reasonable.",
        },
      ],
    },
    "commercial-lease-agreement": {
      requirements: [
        "No statutory form required — governed by common law contract principles",
        "Nashville and Memphis commercial markets are active — Nashville especially for hospitality and tech",
        "NNN and modified gross leases both common depending on property type",
        "Specify responsibility for HVAC maintenance — critical in Tennessee's climate",
        "Personal guarantee typically required for small business tenants",
        "Include force majeure provision addressing severe weather events",
      ],
      restrictions: [
        "Tennessee does not regulate commercial lease terms — all provisions are negotiable",
        "Assignment and subletting typically require written landlord consent",
        "Landlord's right to relocate tenant must be expressly reserved in the lease",
      ],
      faq: [
        {
          question: "Is a written commercial lease required in Tennessee?",
          answer: "Under TCA § 29-2-101 (Statute of Frauds), leases for more than one year must be in writing. Even short-term commercial leases should always be in writing to clearly define the parties' rights and obligations. Tennessee courts strictly enforce the terms of written commercial leases.",
        },
        {
          question: "What is a typical commercial lease term in Nashville?",
          answer: "Nashville commercial leases typically run 3–7 years for retail and office space. The Nashville commercial market has been growing rapidly, with significant development in the Gulch, Germantown, and East Nashville. TI allowances of $20–$60/sq ft are common for office leases.",
        },
        {
          question: "Who is responsible for HVAC in a Tennessee commercial lease?",
          answer: "HVAC responsibility is negotiable. In NNN leases, tenants typically maintain HVAC systems during the lease term, while landlords replace them at end of useful life. In gross or modified gross leases, operating costs including HVAC may be included in the base rent. Specify clearly — disputes about HVAC are among the most common.",
        },
        {
          question: "Can a Tennessee commercial tenant sublease space?",
          answer: "Only if the lease permits. Most Tennessee commercial leases require written landlord consent for subleasing. Negotiate sublease rights upfront, particularly for longer leases where business circumstances may change. Without an express sublease right, the tenant needs the landlord's approval.",
        },
      ],
    },
    "promissory-note": {
      requirements: [
        "Must include: principal, interest rate, payment schedule, maturity date, and default terms",
        "Governed by TCA § 47-14-101 et seq. and Tennessee's UCC (TCA § 47-3-101 et seq.)",
        "Legal rate of interest: 10% per year absent written agreement (TCA § 47-14-103)",
        "Parties may agree to higher rates for business loans in writing",
        "Usury: consumer loans capped at 24% for amounts under $1,000; higher for larger amounts",
        "Secured notes must reference and attach the security agreement or deed of trust",
      ],
      restrictions: [
        "Tennessee usury law caps certain consumer loan rates — check TCA § 47-14-102 for current limits",
        "Confession of judgment clauses are void in Tennessee",
        "Prepayment provisions must be clearly stated — courts disfavor hidden prepayment penalties",
      ],
      faq: [
        {
          question: "What is the legal interest rate in Tennessee?",
          answer: "Tennessee's default legal interest rate is 10% per year under TCA § 47-14-103. Parties can agree to higher rates in writing for business loans. Consumer loan rates are subject to separate limits under TCA § 47-14-102. Judgment interest accrues at 10% per year under TCA § 47-14-121.",
        },
        {
          question: "What is the statute of limitations on a promissory note in Tennessee?",
          answer: "Under TCA § 28-3-109, written contract claims — including promissory notes — must be filed within 6 years of the date of default. Oral contract claims have a 6-year limitation as well. Partial payments or written acknowledgment of the debt can restart the limitations period.",
        },
        {
          question: "Does a Tennessee promissory note need to be notarized?",
          answer: "A promissory note does not need to be notarized to be valid. If the note is secured by real property (deed of trust), that deed of trust must be notarized and recorded with the county register of deeds. Notarizing the note itself adds authentication value.",
        },
        {
          question: "Can a Tennessee promissory note be transferred?",
          answer: "Yes. A properly drafted negotiable promissory note under the Tennessee UCC (TCA § 47-3-104) can be endorsed and transferred to a third party. The transferee becomes a holder with the right to enforce the note. Include a 'non-negotiable' clause if you want to restrict transfers.",
        },
      ],
    },
    "demand-letter": {
      requirements: [
        "No statutory form required — must clearly state the claim, amount, and deadline for response",
        "Identify all parties with full legal names and addresses",
        "Attach supporting documentation: contracts, invoices, photographs, communications",
        "State the exact remedy demanded — payment, performance, or cure",
        "Set a firm response deadline — 10–30 days is standard",
        "Send by certified mail, return receipt requested, and keep a complete copy",
      ],
      restrictions: [
        "Tennessee Consumer Protection Act (TCA § 47-18-101 et seq.) prohibits unfair or deceptive acts",
        "Third-party debt collectors must comply with the FDCPA",
        "Threatening criminal prosecution solely to collect a civil debt may constitute extortion",
      ],
      faq: [
        {
          question: "What is the statute of limitations for contract claims in Tennessee?",
          answer: "Under TCA § 28-3-109, written contract claims must be filed within 6 years of the breach. Oral contract claims also carry a 6-year period. A demand letter does not toll the limitations period — file suit before the deadline if negotiations fail.",
        },
        {
          question: "Is a demand letter required before suing in Tennessee?",
          answer: "A demand letter is not legally required before filing most civil suits in Tennessee. However, it is practical, demonstrates good faith, and is often required or encouraged by Tennessee courts in small claims matters. Sending one before filing saves time and money if it resolves the dispute.",
        },
        {
          question: "Can I recover attorney's fees in a Tennessee contract dispute?",
          answer: "Tennessee follows the American Rule — each party pays their own attorney's fees unless a contract or statute provides otherwise. If your contract includes a fee-shifting clause, Tennessee courts will enforce it. Tennessee's Consumer Protection Act (TCA § 47-18-109) also allows fees for deceptive practice claims.",
        },
        {
          question: "What should a Tennessee demand letter for unpaid wages include?",
          answer: "For unpaid wage claims in Tennessee, state the dates worked, the rate of pay, and the total amount owed. Reference TCA § 50-2-103 (Wage Regulations Act) and demand payment within a specific period. Tennessee allows recovery of unpaid wages in court, and the Tennessee Department of Labor can also investigate wage complaints.",
        },
      ],
    },
  },

  // ── Nevada ────────────────────────────────────────────────────────────────
  nevada: {
    "residential-lease-agreement": {
      requirements: [
        "Security deposit: maximum 3 months' rent (NRS § 118A.242)",
        "Landlord must return deposit within 30 days of tenancy end with itemized deductions",
        "Required: written disclosure of landlord's name and address (NRS § 118A.260)",
        "Required: notice of any nuisance ordinance that affects the property",
        "Required: lead paint disclosure for pre-1978 properties",
        "Required: disclosure of known flooding or drainage issues (NRS § 113.135)",
      ],
      restrictions: [
        "No statewide rent control in Nevada — NRS § 118A.300 prohibits local rent control ordinances for most properties",
        "Late fees must be stated in the lease and must be reasonable",
        "Landlord cannot use self-help eviction — must follow court eviction process",
      ],
      noticeRequirements: "Month-to-month: 30 days' written notice required; week-to-week: 7 days' notice",
      faq: [
        {
          question: "What is the maximum security deposit in Nevada?",
          answer: "Nevada caps security deposits at 3 months' rent under NRS § 118A.242. This is higher than many states. The deposit must be returned within 30 days of the tenant vacating the premises, with an itemized statement of deductions. Failure to return the deposit allows the tenant to sue for the deposit plus damages.",
        },
        {
          question: "Does Nevada have rent control?",
          answer: "No. Nevada does not have statewide rent control, and NRS § 118A.300 generally prohibits local governments from enacting rent control ordinances for most rental properties. Landlords can raise rent with proper notice as permitted by the lease.",
        },
        {
          question: "How much notice is required to end a Nevada month-to-month lease?",
          answer: "Nevada requires 30 days' written notice from either landlord or tenant to terminate a month-to-month tenancy under NRS § 118A.300. For week-to-week tenancies, 7 days' notice is required. Either party may give the required notice.",
        },
        {
          question: "What disclosures are required in a Nevada residential lease?",
          answer: "Nevada requires: the landlord's name, address, and contact information; disclosure of any flood/drainage issues; lead paint disclosure for pre-1978 properties; notice of applicable nuisance ordinances; and disclosure of any pending foreclosure proceedings. The lease should be in writing and signed by both parties.",
        },
      ],
    },
    "llc-operating-agreement": {
      requirements: [
        "Governed by the Nevada Limited Liability Company Act (NRS Chapter 86)",
        "Articles of Organization filed with Nevada Secretary of State; filing fee $75",
        "Annual list of managers/members and registered agent required — $200 filing fee, due each year",
        "Registered agent with Nevada street address required",
        "No publication requirement in Nevada",
        "Operating agreement does not need to be filed but should be signed by all members",
      ],
      restrictions: [
        "Nevada LLC names must include 'Limited Liability Company,' 'L.L.C.,' or 'LLC'",
        "Nevada LLC owners (members and managers) have broad protection from personal liability — one of the strongest in the US",
        "Series LLCs are recognized in Nevada under NRS § 86.296.2",
      ],
      faq: [
        {
          question: "Why is Nevada popular for LLC formation?",
          answer: "Nevada is a popular state for LLCs because of its strong liability protection, no state corporate income tax, no state franchise tax on LLCs, and privacy (members and managers can be individuals or other entities, with less disclosure than many states). Nevada's charging order protection is among the strongest in the US.",
        },
        {
          question: "How much does it cost to form a Nevada LLC?",
          answer: "The Nevada Secretary of State charges $75 to file Articles of Organization. However, the annual list of managers/members and registered agent costs $200 per year. Nevada has no state income tax on individuals or LLCs, making ongoing costs low after the initial formation.",
        },
        {
          question: "Does Nevada recognize series LLCs?",
          answer: "Yes. Nevada recognizes series LLCs under NRS § 86.296.2. A Nevada series LLC allows different series within one LLC to have separate assets, members, and limited liability. This is popular for real estate investors with multiple properties.",
        },
        {
          question: "Does a Nevada LLC offer privacy protection?",
          answer: "Yes. Nevada allows LLCs to have members and managers who are other entities (not just individuals), providing a layer of privacy. Nevada does not require disclosure of members' names in filed documents (only the registered agent and managers). This makes Nevada popular for businesses seeking privacy.",
        },
      ],
    },
    "employment-contract": {
      requirements: [
        "At-will employment is the default in Nevada — include explicit at-will language",
        "Nevada minimum wage: $12.00/hour for employees with health benefits; $12.00/hour without as of July 2024",
        "Nevada is a right-to-work state (NRS § 613.230) — union membership cannot be required",
        "No state income tax in Nevada — residents do not pay state income tax",
        "Nevada requires final pay on the next regular payday or within 3 days if employer initiates termination (NRS § 608.020)",
        "Non-compete agreements enforceable after SB 291 (2017) if reasonable",
      ],
      restrictions: [
        "Nevada law requires payment of at least 8 hours per day in overtime for salaried non-exempt employees earning under 1.5x minimum wage",
        "Nevada prohibits discrimination in employment based on sexual orientation and gender identity",
        "Daily overtime (8+ hours/day) is required for non-exempt employees — different from federal law",
      ],
      faq: [
        {
          question: "What is Nevada's minimum wage?",
          answer: "Nevada's minimum wage is $12.00/hour as of July 1, 2024. Nevada's tiered wage system (lower wage for employers offering health benefits) was eliminated with AB 456, bringing all workers to the same minimum. Las Vegas and Reno employers should also check for any local ordinances.",
        },
        {
          question: "Does Nevada require daily overtime?",
          answer: "Yes. Nevada is one of few states requiring daily overtime. Non-exempt employees earn 1.5x pay for hours worked over 8 in a single day AND over 40 in a week. Employees earning more than 1.5x the minimum wage may waive daily overtime by mutual written agreement.",
        },
        {
          question: "Are non-compete agreements enforceable in Nevada?",
          answer: "Yes. Nevada SB 291 (effective October 1, 2017) codified standards for non-compete enforcement. Courts must: (1) find the restraint is reasonably necessary to protect the employer, (2) not impose undue hardship on the employee, and (3) not be against public policy. Nevada courts actively blue-pencil (reform) overbroad agreements.",
        },
        {
          question: "When must final paychecks be issued in Nevada?",
          answer: "If an employer terminates an employee, Nevada requires final pay within 3 days of the termination date (NRS § 608.020). If the employee quits, payment is due by the next regular payday. Failure to timely pay allows the employee to recover wages plus interest and the employer faces daily penalty of $5,000 per day.",
        },
      ],
    },
    "power-of-attorney": {
      requirements: [
        "Governed by NRS Chapter 162A (Nevada Uniform Power of Attorney Act, adopted 2017)",
        "Principal must be 18+ and have legal capacity",
        "Must be signed by the principal (or another at principal's direction)",
        "Must be notarized — acknowledgment before a notary is required",
        "Two witness signatures recommended but not strictly required by statute",
        "Durable POA must expressly state it survives incapacity",
      ],
      restrictions: [
        "Healthcare decisions require a separate Nevada Advance Directive or Durable POA for Health Care (NRS § 162A.700 et seq.)",
        "Agent may not make gifts to themselves beyond basic care and maintenance unless expressly authorized",
        "Real estate transactions require the POA to be recorded with the county recorder",
      ],
      faq: [
        {
          question: "What is required to create a valid Nevada power of attorney?",
          answer: "Under NRS § 162A.220, a Nevada POA must be signed by the principal and notarized. Two witness signatures are recommended for additional validity, particularly for real estate or financial institution use. Nevada adopted the Uniform Power of Attorney Act in 2017, which provides a statutory short form.",
        },
        {
          question: "What makes a Nevada POA durable?",
          answer: "Under NRS § 162A.200, a POA is durable if it contains language stating it is not affected by the principal's subsequent incapacity. A common formulation: 'This power of attorney shall not be terminated by disability or incapacity of the principal.' Without durable language, the POA terminates on incapacity.",
        },
        {
          question: "Can a Nevada POA be used for healthcare decisions?",
          answer: "A standard financial POA does not cover healthcare in Nevada. A separate Durable Power of Attorney for Health Care (NRS § 162A.700 et seq.) or Advance Directive is needed to authorize an agent to make medical decisions. Nevada's Advance Directive can also address life-sustaining treatment preferences.",
        },
        {
          question: "Does a Nevada POA need to be recorded?",
          answer: "Recording is not required for most purposes but is essential if the POA will be used for real estate transactions. Record the POA with the county recorder's office where the real property is located. Recording provides constructive notice to third parties and enables title companies to rely on the agent's authority.",
        },
      ],
    },
    "last-will-and-testament": {
      requirements: [
        "Testator must be 18+ and of sound mind (NRS § 133.020)",
        "Will must be signed by the testator (or another at testator's direction in testator's presence)",
        "Two witnesses must sign in the presence of the testator — they need not sign in each other's presence",
        "Witnesses should not be beneficiaries — interested witnesses face challenges",
        "Self-proving affidavit available with notarization (NRS § 133.050)",
        "No notarization required for a valid will — only the self-proving affidavit requires notarization",
      ],
      restrictions: [
        "Holographic (handwritten, unwitnessed) wills are valid in Nevada if entirely in testator's handwriting and signed (NRS § 133.090)",
        "Surviving spouse has elective share rights (NRS § 123.150) — community property state rules apply",
        "Nevada is a community property state — half of community property automatically belongs to the surviving spouse",
      ],
      faq: [
        {
          question: "Is Nevada a community property state?",
          answer: "Yes. Nevada is a community property state, meaning property acquired during marriage is owned equally by both spouses. A will can only dispose of the decedent's half of community property and all separate property. This significantly limits testamentary freedom over community assets.",
        },
        {
          question: "Are handwritten wills valid in Nevada?",
          answer: "Yes. Nevada recognizes holographic wills under NRS § 133.090. A holographic will must be entirely in the testator's handwriting and signed. No witnesses are required. However, typed wills with two witnesses are more reliable and less likely to be challenged.",
        },
        {
          question: "What is Nevada's probate process?",
          answer: "Nevada offers summary administration for small estates (under $100,000 in probate assets) and general administration for larger estates through the District Court. Nevada's probate process can be lengthy and expensive for large estates — trusts are often used to avoid probate.",
        },
        {
          question: "Does Nevada have an estate tax?",
          answer: "No. Nevada has no state estate tax or inheritance tax. Nevada residents are only subject to the federal estate tax, which currently exempts estates under $13.61 million per individual (2024). Nevada's lack of estate tax makes it attractive for estate planning.",
        },
      ],
    },
    "non-compete-agreement": {
      requirements: [
        "Must be supported by adequate consideration — new employment or additional benefits for existing employees",
        "Must protect a legitimate business interest — trade secrets, customer relationships, or training",
        "Must be reasonable in geographic scope relative to the employer's market",
        "Must be reasonable in duration — 1–2 years is standard; courts scrutinize longer terms",
        "Nevada SB 291 (2017) codified court authority to reform overbroad non-competes",
        "Include specific restricted activities — overly vague restrictions may be void",
      ],
      restrictions: [
        "Nevada courts actively blue-pencil (reform) overbroad non-competes rather than voiding them",
        "NRS § 613.200 prohibits terminating employees for filing wage claims — non-competes cannot interfere with this right",
        "Non-competes cannot prevent employees from using general skills and knowledge (as opposed to confidential information)",
      ],
      faq: [
        {
          question: "Are non-compete agreements enforceable in Nevada?",
          answer: "Yes. Nevada SB 291 (2017) codified the standards for non-compete enforcement. Under NRS § 613.195, courts evaluate whether the restriction is reasonably necessary to protect the employer's legitimate interests. Nevada courts actively reform (blue-pencil) overbroad agreements rather than voiding them.",
        },
        {
          question: "What does Nevada's SB 291 require for non-competes?",
          answer: "Under NRS § 613.195 (effective October 1, 2017): (1) the agreement must not impose greater restrictions than necessary, (2) courts must reform (not void) overbroad agreements, and (3) if the employer terminates the employee without cause, the non-compete is unenforceable. This last point is significant — terminating someone without cause releases them from any non-compete.",
        },
        {
          question: "What happens if a Nevada employer fires an employee without cause?",
          answer: "Under NRS § 613.195(5), if an employer terminates an employee without cause, any non-compete agreement with that employee is void and unenforceable. This is a strong protection for workers — employers who lay off employees cannot then enforce non-competes against them.",
        },
        {
          question: "What is a reasonable geographic scope for a Nevada non-compete?",
          answer: "The geographic scope must match the employer's actual business area. For a Las Vegas business, restricting competition in Clark County and surrounding areas is typically reasonable. State-wide or national restrictions are harder to justify unless the employee was a senior executive with national responsibilities.",
        },
      ],
    },
    "independent-contractor-agreement": {
      requirements: [
        "Clearly establish independent contractor status using IRS common-law factors and Nevada's ABC test for specific industries",
        "Specify that contractor controls the means and methods of work, not just the results",
        "Include IP ownership, work-for-hire, and confidentiality provisions",
        "Address contractor's obligation to carry their own liability insurance and workers' compensation",
        "Nevada's Contractor License Board: most construction contractors must be licensed (NRS § 624.010)",
        "Include indemnification clause covering contractor's own acts and omissions",
      ],
      restrictions: [
        "AB 5 (California-style ABC test) was NOT adopted in Nevada — traditional IRS test applies in most industries",
        "Nevada Employment Security Division may apply a modified test for unemployment insurance classification",
        "Construction workers have a presumption of employment under certain conditions — use written agreements",
      ],
      faq: [
        {
          question: "How does Nevada classify workers as contractors vs. employees?",
          answer: "Nevada primarily uses the IRS common-law test (behavioral control, financial control, type of relationship) for income tax classification. For unemployment insurance, Nevada's Employment Security Division applies a slightly different test. Nevada did not adopt California's strict ABC test, making it somewhat easier to establish contractor status.",
        },
        {
          question: "What IP provisions should a Nevada contractor agreement include?",
          answer: "Include: (1) work-for-hire designation for all deliverables, (2) assignment of remaining IP rights, (3) contractor's representation that the work does not infringe third-party rights, (4) license-back for pre-existing contractor IP incorporated in deliverables, and (5) provisions addressing ownership of data and derivative works.",
        },
        {
          question: "Does Nevada require contractors to be licensed?",
          answer: "Yes, for construction work. Nevada's Contractors' License Law (NRS § 624.010 et seq.) requires most contractors performing construction, remodeling, or repair work to be licensed by the Nevada State Contractors Board. Unlicensed contractors cannot collect compensation in Nevada courts for construction work.",
        },
        {
          question: "What payment terms should a Nevada contractor agreement include?",
          answer: "Specify the rate (hourly, fixed-fee, or milestone), invoicing frequency, payment terms (net 15 or net 30), late payment interest, and expense reimbursement procedures. State clearly that the contractor is responsible for all self-employment taxes, workers' compensation, and health insurance.",
        },
      ],
    },
    "commercial-lease-agreement": {
      requirements: [
        "No statutory form required — governed by common law contract principles",
        "Las Vegas and Reno commercial markets are driven by hospitality, gaming, and tech sectors",
        "NNN leases are dominant in Las Vegas retail and industrial markets",
        "Personal guarantee standard for small business tenants",
        "Include force majeure provision — gaming and hospitality tenants particularly need pandemic protections",
        "CAM charges: define clearly, including audit rights — Las Vegas landlords have significant CAM structures",
      ],
      restrictions: [
        "Nevada does not regulate commercial lease terms — all provisions are negotiable",
        "Liquor license approval may affect permitted use clauses for hospitality tenants",
        "Gaming-related businesses must comply with Nevada Gaming Commission regulations — include in lease terms",
      ],
      faq: [
        {
          question: "Is a written commercial lease required in Nevada?",
          answer: "Leases for more than one year must be in writing under Nevada's Statute of Frauds (NRS § 111.205). Even short-term commercial leases should be in writing to protect both parties. Nevada courts strictly enforce the terms of written commercial leases.",
        },
        {
          question: "What is the Las Vegas commercial real estate market like?",
          answer: "Las Vegas has a highly active commercial market driven by hospitality, gaming, logistics, and light manufacturing. The Industrial submarket (near the airport) has very low vacancy. Retail along Las Vegas Blvd and resort corridor commands premium rents. NNN leases are standard for most retail and industrial properties.",
        },
        {
          question: "What should a gaming or hospitality business include in a Nevada commercial lease?",
          answer: "Include: specific permitted use language covering gaming, liquor, entertainment licenses; co-tenancy provisions if adjacent anchor tenants are important; force majeure clauses addressing government-ordered closures; landlord's obligations to maintain common areas to hotel/resort standards; and exclusivity provisions for unique F&B or gaming concepts.",
        },
        {
          question: "Who is responsible for HVAC in a Nevada commercial lease?",
          answer: "HVAC responsibility is negotiable. Nevada's extreme summer heat makes HVAC a critical issue. In NNN leases, tenants typically maintain HVAC during the term; landlords may cap their replacement obligation. Negotiate a landlord-replacement obligation for HVAC units over a certain age or cost threshold.",
        },
      ],
    },
    "promissory-note": {
      requirements: [
        "Must include: principal, interest rate, payment schedule, maturity date, and default terms",
        "Governed by NRS § 99.040 et seq. and Nevada's UCC (NRS Chapter 104 Article 3)",
        "No statutory usury limit for business-to-business commercial loans in Nevada",
        "Consumer loan rates regulated under Nevada Financial Institutions Division",
        "For notes secured by real property, the deed of trust must be recorded with county recorder",
        "Notarization not required for the note itself — required for the deed of trust",
      ],
      restrictions: [
        "Consumer loans are subject to NRS § 675 (Small Loan Act) — various rate limits apply",
        "Confession of judgment clauses have limitations in Nevada — seek legal advice before including",
        "Unconscionable interest rates in consumer transactions may be voided by courts",
      ],
      faq: [
        {
          question: "Does Nevada have a usury law for promissory notes?",
          answer: "Nevada does not have a general usury cap for business-to-business commercial loans. Parties may agree to any interest rate for commercial transactions. Consumer loans are subject to the Nevada Small Loan Act and related regulations. The absence of a commercial usury cap makes Nevada attractive for business lending.",
        },
        {
          question: "What is the statute of limitations on a promissory note in Nevada?",
          answer: "Under NRS § 11.190, the statute of limitations for written contracts — including promissory notes — is 6 years from the date of breach or default. Oral contracts have a 3-year limitation period. Partial payments or written acknowledgment of the debt can restart the clock.",
        },
        {
          question: "Does a Nevada promissory note need to be notarized?",
          answer: "The promissory note itself does not need to be notarized to be valid. However, if the note is secured by real property via a deed of trust, the deed of trust must be notarized and recorded with the county recorder. Notarizing the note provides additional authentication.",
        },
        {
          question: "What happens if a borrower defaults on a Nevada promissory note?",
          answer: "The lender sends a demand letter, then may file suit in Nevada District Court (or Justice Court for amounts under $15,000). For notes secured by a deed of trust, Nevada allows non-judicial foreclosure through a trustee's sale, which is faster than judicial foreclosure. The lender can also pursue a deficiency judgment after foreclosure in certain circumstances.",
        },
      ],
    },
    "demand-letter": {
      requirements: [
        "No statutory form required — must clearly state the claim, amount, and deadline",
        "Identify all parties with full legal names and addresses",
        "Attach supporting documentation: contracts, invoices, communications",
        "State the exact remedy demanded — payment, performance, or cure",
        "Set a firm response deadline — 10–30 days is standard",
        "Send by certified mail, return receipt requested, and keep a complete copy",
      ],
      restrictions: [
        "Nevada Deceptive Trade Practices Act (NRS § 598.0903 et seq.) prohibits unfair collection practices",
        "Third-party debt collectors must comply with the FDCPA",
        "Threatening actions you cannot legally take may constitute extortion or harassment under Nevada law",
      ],
      faq: [
        {
          question: "What is the statute of limitations for contract claims in Nevada?",
          answer: "Under NRS § 11.190, written contract claims must be filed within 6 years of the breach. Oral contracts have a 3-year limitation period under NRS § 11.190(3). A demand letter does not toll the limitations period — file suit before the deadline expires if negotiations do not resolve the dispute.",
        },
        {
          question: "Is a demand letter required before suing in Nevada?",
          answer: "A demand letter is not legally required before filing most civil suits in Nevada. However, it is required before filing in Small Claims Court for many types of claims. It also demonstrates good faith and often resolves disputes without the cost and delay of litigation.",
        },
        {
          question: "Can I recover attorney's fees in a Nevada contract dispute?",
          answer: "Nevada follows the American Rule — attorney's fees are not automatically recoverable. However, Nevada courts can award fees if a contract provides for them, or if a statute authorizes them. Nevada has an 'offer of judgment' rule (NRCP 68) that can shift fees if a party rejects a reasonable settlement offer and then fares worse at trial.",
        },
        {
          question: "What should a Nevada demand letter for unpaid wages include?",
          answer: "State the dates worked, the agreed compensation, and the amount unpaid. Reference NRS § 608.040 (penalty for failure to pay wages) — employers who fail to pay wages face a daily penalty of $5,000. Note the Nevada Labor Commissioner also investigates wage claims as an alternative to private lawsuit.",
        },
      ],
    },
  },

  // ── Minnesota ─────────────────────────────────────────────────────────────
  minnesota: {
    "residential-lease-agreement": {
      requirements: [
        "Governed by Minnesota Landlord and Tenant Act (Minn. Stat. § 504B.001 et seq.)",
        "Security deposit: no statutory cap — must be deposited in a trust account (Minn. Stat. § 504B.178)",
        "Landlord must return deposit within 21 days of tenancy end with itemized deductions",
        "Required: landlord's name and address for service disclosed in the lease (Minn. Stat. § 504B.181)",
        "Required: lead paint disclosure for pre-1978 properties",
        "Landlord must maintain the premises in compliance with the Covenants of Habitability (Minn. Stat. § 504B.161)",
      ],
      restrictions: [
        "No statewide rent control in Minnesota — though some municipalities (Minneapolis, St. Paul) have enacted local rent control",
        "Landlord may not discriminate based on source of income (Section 8) in many Minnesota jurisdictions",
        "Late fees must be reasonable and stated in the lease — Minnesota courts scrutinize excessive fees",
      ],
      noticeRequirements: "Month-to-month: notice equal to the rent period (typically one month) required to terminate",
      faq: [
        {
          question: "What is Minnesota's rule for returning security deposits?",
          answer: "Minnesota requires landlords to return the security deposit within 21 days of the lease ending, with an itemized written statement of deductions (Minn. Stat. § 504B.178). If the landlord wrongfully withholds any portion, the tenant can recover the withheld amount plus statutory damages of up to $500, and attorney's fees.",
        },
        {
          question: "Does Minneapolis or St. Paul have rent control?",
          answer: "Yes. Minneapolis enacted a rent stabilization ordinance capping rent increases at 3% per year. St. Paul also enacted rent control (capped at 3%), though it has been modified. These local ordinances apply within city limits — landlords in these cities must comply regardless of the state preemption debate.",
        },
        {
          question: "Can a Minnesota landlord discriminate against Section 8 tenants?",
          answer: "In most Minnesota jurisdictions, no. Minnesota's Human Rights Act (Minn. Stat. § 363A.09) prohibits discrimination based on 'participation in public assistance programs,' which includes Section 8 housing vouchers. Many local ordinances reinforce this protection. Landlords must consider Section 8 applicants equally.",
        },
        {
          question: "What are Minnesota's habitability requirements for landlords?",
          answer: "Under Minn. Stat. § 504B.161, landlords must maintain the premises in compliance with applicable health and safety codes, provide adequate heat (68°F minimum from October 1 to April 30), maintain plumbing and electrical systems, and ensure the property is free from pests. Tenants can withhold rent or repair-and-deduct if conditions are not fixed.",
        },
      ],
    },
    "llc-operating-agreement": {
      requirements: [
        "Governed by the Minnesota Revised Uniform Limited Liability Company Act (Minn. Stat. § 322C.0101 et seq.)",
        "Articles of Organization filed with MN Secretary of State; filing fee $155 online ($135 by mail)",
        "Annual renewal required — $45 fee, due by December 31 of each year",
        "Registered agent with Minnesota street address required",
        "No publication requirement in Minnesota",
        "Operating agreement does not need to be filed but should be signed by all members",
      ],
      restrictions: [
        "MN LLC names must include 'Limited Liability Company,' 'LLC,' or 'L.L.C.'",
        "Professional LLCs require state board authorization",
        "Series LLCs are not specifically authorized in Minnesota's LLC Act",
      ],
      faq: [
        {
          question: "Does Minnesota require an LLC operating agreement?",
          answer: "Minnesota's LLC Act (Minn. Stat. § 322C.0105) does not require an operating agreement but allows members to adopt one. Without a written agreement, default statutory provisions govern — which may not align with member intentions for profit distributions, management, voting, or member exits. A written operating agreement is essential.",
        },
        {
          question: "How much does it cost to form and maintain a Minnesota LLC?",
          answer: "The Minnesota Secretary of State charges $155 online ($135 by mail) to file Articles of Organization. The annual renewal fee is $45, due by December 31. Minnesota has a state income tax (up to 9.85% for individuals) — members pay tax on their pass-through share of LLC income.",
        },
        {
          question: "What is Minnesota's LLC annual renewal requirement?",
          answer: "All Minnesota LLCs must file an Annual Renewal with the Secretary of State by December 31 of each year and pay the $45 fee. Failure to file results in the LLC being placed in default status. If the LLC remains in default for 60 days after December 31, it may be administratively dissolved.",
        },
        {
          question: "Can a foreign LLC do business in Minnesota?",
          answer: "Yes. A foreign LLC must file a Certificate of Authority with the MN Secretary of State ($185 fee) before conducting business in Minnesota. It must maintain a registered agent in MN and file annual renewals. Unauthorized practice of business can subject the LLC to civil penalties.",
        },
      ],
    },
    "employment-contract": {
      requirements: [
        "At-will employment is the default in Minnesota — include explicit at-will language",
        "Minnesota minimum wage: $10.85/hour (large employers — annual gross revenue over $500,000) as of January 1, 2024",
        "Minnesota requires earned sick and safe time — 48 hours per year effective January 1, 2024 (Minn. Stat. § 181.9445)",
        "Minnesota PAID Leave Program begins January 1, 2026 — employer contributions required starting 2025",
        "Non-compete agreements for employees are banned under Minn. Stat. § 181.988 (effective January 1, 2023)",
        "Include non-solicitation provisions separately — these remain enforceable with reasonable scope",
      ],
      restrictions: [
        "Minnesota banned employee non-compete agreements effective January 1, 2023 — non-competes in employment contracts signed on or after this date are void and unenforceable",
        "Non-solicitation agreements (customer and employee) remain enforceable if reasonable in scope and duration",
        "Minnesota Pregnancy and Parenting Leave Act requires employers with 21+ employees to provide up to 12 weeks of unpaid leave",
      ],
      faq: [
        {
          question: "Are non-compete agreements enforceable in Minnesota?",
          answer: "No. Minnesota Stat. § 181.988 (effective January 1, 2023) bans non-compete agreements for employees. Any non-compete agreement with an employee — regardless of when the employee signed it — is void and unenforceable if it was entered on or after January 1, 2023. Non-competes for independent contractors are not affected by this ban.",
        },
        {
          question: "What replaced non-competes in Minnesota?",
          answer: "Employers can still use non-solicitation agreements (restricting solicitation of customers and employees), confidentiality agreements, and trade secret protections. These remain enforceable in Minnesota if they are reasonable in scope, geography, and duration. They are a key substitute for non-competes post-2023.",
        },
        {
          question: "What is Minnesota's earned sick and safe time law?",
          answer: "Effective January 1, 2024, Minnesota requires employers of all sizes to provide employees with 1 hour of paid sick and safe leave for every 30 hours worked, up to 48 hours per year. Leave can be used for illness, medical appointments, domestic violence situations, or care for family members.",
        },
        {
          question: "What is Minnesota's minimum wage in 2024?",
          answer: "Minnesota's minimum wage is $10.85/hour for large employers (annual gross revenue over $500,000) and $8.85/hour for small employers as of January 1, 2024. Minneapolis has a local minimum wage of $15.57/hour (2024) for all employers. Employers must pay whichever rate is higher.",
        },
      ],
    },
    "power-of-attorney": {
      requirements: [
        "Governed by Minn. Stat. § 523 (Minnesota POA Act, pre-Uniform POA)",
        "Principal must be 18+ and have legal capacity",
        "Must be signed by the principal (or another at principal's direction)",
        "Must be acknowledged before a notary public — notarization is required",
        "Durable POA must contain specific durable language (Minn. Stat. § 523.07)",
        "Healthcare decisions require a separate Minnesota Health Care Directive (Minn. Stat. § 145C)",
      ],
      restrictions: [
        "Agent cannot make gifts to themselves beyond reasonable care and maintenance unless expressly authorized",
        "Minnesota courts can review POAs if abuse is suspected and appoint a guardian or conservator",
        "POA used for real estate must be recorded with the county recorder",
      ],
      faq: [
        {
          question: "What are the formalities for a Minnesota power of attorney?",
          answer: "Under Minn. Stat. § 523.01, a Minnesota POA must be signed by the principal and notarized. Witness signatures are recommended but not strictly required. For real estate transactions, the POA must be notarized and recorded with the county recorder in the county where the property is located.",
        },
        {
          question: "What makes a Minnesota POA durable?",
          answer: "Under Minn. Stat. § 523.07, a POA is durable if it contains language stating it is not terminated by the principal's disability or incapacity. A standard phrase: 'This power of attorney shall not be affected by disability or incapacity of the principal.' Without durable language, the POA terminates upon the principal's incapacity.",
        },
        {
          question: "Can I use a Minnesota POA for healthcare decisions?",
          answer: "No. A standard financial POA does not cover healthcare decisions in Minnesota. You need a separate Health Care Directive under Minn. Stat. § 145C, which designates a health care agent and provides instructions for medical care. Minnesota's directive can address end-of-life decisions and specific treatment preferences.",
        },
        {
          question: "How do I revoke a Minnesota power of attorney?",
          answer: "Revoke a Minnesota POA by signing a written revocation and delivering it to the agent and all third parties relying on it. Record the revocation with the county recorder if the original was used for real estate. A later-dated POA generally revokes earlier ones for the same matters, but explicit revocation is safest.",
        },
      ],
    },
    "last-will-and-testament": {
      requirements: [
        "Testator must be 18+ and of sound mind (Minn. Stat. § 524.2-501)",
        "Will must be signed by the testator (or another at testator's direction in testator's presence)",
        "Two witnesses must sign within a reasonable time after witnessing testator's signature",
        "Witnesses should not be beneficiaries — interested witnesses face challenges to validity",
        "Self-proving affidavit available with notarization (Minn. Stat. § 524.2-504)",
        "Minnesota adopted the Uniform Probate Code — both informal and formal probate available",
      ],
      restrictions: [
        "Holographic (handwritten, unwitnessed) wills are NOT valid in Minnesota — must have two witnesses",
        "Surviving spouse has elective share rights under the Uniform Probate Code (Minn. Stat. § 524.2-202)",
        "A will cannot override beneficiary designations on retirement accounts, life insurance, or POD accounts",
      ],
      faq: [
        {
          question: "Does Minnesota recognize handwritten wills?",
          answer: "No. Minnesota does not recognize holographic wills. All wills must be in writing, signed by the testator, and witnessed by two competent adults who sign in the testator's presence. A handwritten, unwitnessed will is not valid in Minnesota.",
        },
        {
          question: "What is Minnesota's probate process?",
          answer: "Minnesota uses the Uniform Probate Code, offering informal probate (handled by the registrar without court hearings) and formal probate (supervised by the District Court). Most uncontested estates use informal probate, which is less expensive and faster. File in the county where the decedent lived.",
        },
        {
          question: "What is the spousal elective share in Minnesota?",
          answer: "Under Minn. Stat. § 524.2-202, a surviving spouse can elect against the will and claim an elective share of the augmented estate. The percentage depends on the length of the marriage. This election protects spouses who may be disinherited by the will.",
        },
        {
          question: "Does Minnesota have an estate tax?",
          answer: "Yes. Minnesota has its own estate tax on estates over $3 million (2024 threshold). The rate ranges from 13% to 16%. This is separate from the federal estate tax exemption. Minnesota residents with estates between $3 million and $13.61 million (the federal exemption) face state tax but not federal tax.",
        },
      ],
    },
    "non-compete-agreement": {
      requirements: [
        "Minnesota banned employee non-competes effective January 1, 2023 (Minn. Stat. § 181.988)",
        "Non-solicitation agreements (customers and employees) remain enforceable if reasonable",
        "Non-competes with independent contractors are NOT banned — contractor agreements can include them",
        "Confidentiality agreements and trade secret protections are unaffected by the ban",
        "Existing non-competes signed before January 1, 2023 remain valid but may face challenges",
        "For contractor agreements, include non-compete with reasonable scope and duration",
      ],
      restrictions: [
        "Any non-compete signed by an employee on or after January 1, 2023 is void — no reformation allowed",
        "Employers cannot circumvent the ban by calling an employee an 'independent contractor' — proper classification is essential",
        "Garden leave provisions do not save employee non-competes in Minnesota",
      ],
      faq: [
        {
          question: "Can Minnesota employers use non-compete agreements?",
          answer: "No, for employees. Minnesota Stat. § 181.988 (effective January 1, 2023) bans non-compete agreements with employees entirely. There are no exceptions — the ban applies regardless of the employee's salary, role, or access to trade secrets. Non-competes with independent contractors (not employees) are not affected.",
        },
        {
          question: "What alternatives to non-competes work in Minnesota?",
          answer: "Minnesota employers can use: (1) non-solicitation agreements restricting solicitation of specific customers and employees, (2) confidentiality/NDA agreements protecting trade secrets, (3) invention assignment agreements, and (4) IP ownership clauses. These alternatives remain enforceable if reasonable in scope and duration.",
        },
        {
          question: "Does Minnesota's non-compete ban apply to existing agreements?",
          answer: "The ban applies to agreements signed on or after January 1, 2023. Pre-2023 non-competes may still be enforceable under prior case law. However, courts may scrutinize pre-2023 agreements more closely given the legislative trend against non-competes.",
        },
        {
          question: "Can a Minnesota employer include a non-compete in an independent contractor agreement?",
          answer: "Yes. The Minnesota ban only applies to employee non-competes. A properly classified independent contractor can agree to a non-compete if it meets the traditional reasonableness standards: protects a legitimate business interest and is reasonable in scope, geography, and duration. Misclassifying employees as contractors does not evade the ban.",
        },
      ],
    },
    "independent-contractor-agreement": {
      requirements: [
        "Clearly establish independent contractor status using IRS common-law factors",
        "Specify that contractor controls the means and methods of work, not just the results",
        "Include IP ownership, work-for-hire, and confidentiality provisions",
        "Non-compete clauses are valid in contractor agreements — employee ban does not apply",
        "Include indemnification clause for contractor's acts, omissions, and tax obligations",
        "Contractor's obligation to carry their own insurance should be explicitly stated",
      ],
      restrictions: [
        "Minnesota Department of Employment uses its own worker classification test for UI — careful drafting is essential",
        "Misclassifying employees as contractors to evade the non-compete ban or other employment laws triggers significant penalties",
        "Minnesota's earned sick leave law (Minn. Stat. § 181.9445) applies to employees — contractors are exempt if properly classified",
      ],
      faq: [
        {
          question: "How does Minnesota determine contractor vs. employee status?",
          answer: "Minnesota uses a multi-factor test that considers behavioral control, financial control, and the nature of the relationship — similar to the IRS common-law test. Minnesota's Department of Employment and Economic Development applies a separate test for unemployment insurance purposes. Misclassification in Minnesota triggers penalties and back wages.",
        },
        {
          question: "Can a Minnesota contractor agreement include a non-compete?",
          answer: "Yes. The Minnesota ban on non-competes (Minn. Stat. § 181.988) applies only to employee agreements. A properly classified independent contractor can agree to a non-compete. Courts evaluate these under traditional reasonableness standards — the restriction must protect a legitimate interest and be reasonable in scope and duration.",
        },
        {
          question: "What IP provisions are essential in a Minnesota contractor agreement?",
          answer: "Include: (1) work-for-hire designation for all deliverables, (2) assignment of any remaining IP rights, (3) contractor's representation that work is original and does not infringe third-party rights, (4) license-back clause for pre-existing contractor IP incorporated in the work, and (5) data ownership and return provisions.",
        },
        {
          question: "Does Minnesota's paid sick leave law apply to contractors?",
          answer: "No. Minnesota's earned sick and safe time law applies to employees, not independent contractors. If a worker is a legitimate contractor, the paid leave requirement does not apply. However, if a contractor is later reclassified as an employee, the employer faces liability for unaccrued sick leave and potential penalties.",
        },
      ],
    },
    "commercial-lease-agreement": {
      requirements: [
        "No statutory form required — governed by common law contract principles",
        "Minneapolis and St. Paul commercial markets driven by finance, retail, healthcare, and technology sectors",
        "NNN and modified gross leases both common depending on property type",
        "HVAC maintenance allocation is critical — Minnesota winters create extreme demands on heating systems",
        "ADA compliance: allocate responsibility for accessibility improvements in the lease",
        "Include force majeure provision for extreme winter events and public health emergencies",
      ],
      restrictions: [
        "Minnesota does not regulate commercial lease terms — all provisions are negotiable",
        "Minneapolis commercial development is subject to city zoning and development requirements",
        "Assignment and subletting require written landlord consent unless otherwise agreed",
      ],
      faq: [
        {
          question: "Is a written commercial lease required in Minnesota?",
          answer: "Leases for more than one year must be in writing under Minnesota's Statute of Frauds (Minn. Stat. § 513.05). Even short-term commercial leases should be in writing to define the parties' rights and obligations clearly. Minnesota courts strictly enforce the terms of written commercial leases.",
        },
        {
          question: "What is the Minneapolis commercial real estate market like?",
          answer: "Minneapolis has a healthy commercial market with office, retail, and industrial sectors. The downtown Minneapolis skyway system is unique — specify in commercial leases whether the tenant has skyway access rights. The Twin Cities industrial market (including 494/694 corridors) is strong for logistics and light manufacturing.",
        },
        {
          question: "Who is responsible for HVAC in a Minnesota commercial lease?",
          answer: "HVAC allocation is critically important in Minnesota given the extreme winter climate. In NNN leases, tenants typically maintain HVAC during the lease term. Include a landlord-replacement obligation for HVAC units older than 10–15 years or that cost more than a specified threshold to repair. Specify winter emergency response obligations.",
        },
        {
          question: "Can a Minnesota commercial tenant sublease their space?",
          answer: "Only if the lease permits. Most Minnesota commercial leases require the landlord's written consent for subleasing. Courts may require landlords to act reasonably if the lease includes a 'reasonableness' standard. Negotiate sublease rights at the outset, particularly for longer-term leases.",
        },
      ],
    },
    "promissory-note": {
      requirements: [
        "Must include: principal, interest rate, payment schedule, maturity date, and default terms",
        "Governed by Minn. Stat. § 334.01 et seq. and Minnesota UCC (Minn. Stat. § 336.3-101 et seq.)",
        "Legal rate of interest: 6% per year absent written agreement (Minn. Stat. § 334.01)",
        "Parties may agree in writing to higher rates for business loans — no cap for commercial transactions",
        "Consumer loan rates are subject to Minnesota Consumer Credit Code limits",
        "Secured notes must reference the security agreement or deed of trust",
      ],
      restrictions: [
        "Minnesota consumer loan usury limits apply to personal, family, and household purpose loans",
        "Confession of judgment clauses are void in Minnesota",
        "Attorney's fees provisions are enforceable if included in the note — follow reasonable fee standards",
      ],
      faq: [
        {
          question: "What is the legal interest rate in Minnesota?",
          answer: "Minnesota's default legal interest rate is 6% per year under Minn. Stat. § 334.01. Parties can agree to higher rates in writing for business loans — there is no upper cap for commercial transactions. Consumer loan rates are regulated separately. Judgment interest accrues at 10% per year under Minn. Stat. § 549.09.",
        },
        {
          question: "What is the statute of limitations on a promissory note in Minnesota?",
          answer: "Under Minn. Stat. § 541.05, the statute of limitations for written contract claims — including promissory notes — is 6 years from the date of breach or the last payment. Oral contracts have a 6-year limitation period as well. Partial payments restart the limitations clock.",
        },
        {
          question: "Does a Minnesota promissory note need to be notarized?",
          answer: "The promissory note itself does not need to be notarized. If the note is secured by real property via a mortgage or deed of trust, that mortgage must be notarized and recorded with the county recorder. Notarizing the note provides additional authentication if signatures are disputed.",
        },
        {
          question: "Can a Minnesota promissory note include a prepayment penalty?",
          answer: "Yes, for commercial loans. Include a specific prepayment penalty provision — a yield maintenance fee or a percentage of the remaining balance. For consumer loans (personal, family, or household purpose), Minnesota law limits prepayment penalties. Always specify the prepayment terms clearly to avoid disputes.",
        },
      ],
    },
    "demand-letter": {
      requirements: [
        "No statutory form required — must clearly state the claim, amount, and deadline",
        "Identify all parties with full legal names and addresses",
        "Attach supporting documentation: contracts, invoices, correspondence, photos",
        "State the exact remedy demanded — payment, performance, or cure",
        "Set a firm response deadline — 10–30 days is standard",
        "Send by certified mail, return receipt requested, and keep a complete copy",
      ],
      restrictions: [
        "Minnesota Consumer Fraud Act (Minn. Stat. § 325F.68 et seq.) prohibits unfair or deceptive practices",
        "Third-party debt collectors must comply with FDCPA and Minnesota Collection Agency Act",
        "Threatening actions you cannot legally take may constitute harassment under Minnesota law",
      ],
      faq: [
        {
          question: "What is the statute of limitations for contract claims in Minnesota?",
          answer: "Under Minn. Stat. § 541.05, written contract claims must be filed within 6 years of the breach. Oral contracts also have a 6-year limitation period. A demand letter does not toll the limitations period — file suit before the deadline if negotiations fail.",
        },
        {
          question: "Is a demand letter required before suing in Minnesota?",
          answer: "A demand letter is not legally required before filing most civil suits in Minnesota. However, Minnesota's conciliation (small claims) court requires plaintiffs to make a demand before filing. Even where not required, demand letters demonstrate good faith and often resolve disputes without litigation.",
        },
        {
          question: "Can I recover attorney's fees in a Minnesota contract dispute?",
          answer: "Under the American Rule, attorney's fees are not automatically recoverable. However, Minnesota's Consumer Fraud Act (Minn. Stat. § 8.31) allows fees for successful plaintiffs in consumer protection cases. If your contract includes a fee-shifting clause, Minnesota courts will enforce it.",
        },
        {
          question: "What should a Minnesota demand letter for unpaid wages include?",
          answer: "State the dates of work, the agreed wage rate, and the total owed. Reference Minn. Stat. § 181.13 (final wage payment requirements). Minnesota allows employees to file wage claims with the Department of Labor and Industry as an alternative to private lawsuit. Note both remedies in your demand.",
        },
      ],
    },
  },

  // ── Wisconsin ─────────────────────────────────────────────────────────────
  wisconsin: {
    "residential-lease-agreement": {
      requirements: [
        "Governed by Wis. Stat. § 704 (Wisconsin Landlord-Tenant Law) and ATCP 134 (Admin Code)",
        "Security deposit: no statutory cap — must be returned within 21 days of tenant vacating (Wis. Stat. § 704.28)",
        "Required: landlord must provide written disclosure of standard withholding reasons at move-in",
        "Required: joint walkthrough offered at move-in and available at move-out",
        "Required: lead paint disclosure for pre-1978 properties",
        "ATCP 134: comprehensive landlord/tenant rules including disclosure requirements, receipt requirements, and repair obligations",
      ],
      restrictions: [
        "No statewide rent control in Wisconsin — Wis. Stat. § 66.1015 prohibits local rent regulation",
        "Wisconsin ATCP 134 limits when landlords can charge for carpet cleaning, painting, and other wear-and-tear items",
        "Landlords cannot include 'confession of judgment' clauses in residential leases",
      ],
      noticeRequirements: "Month-to-month: 28 days' written notice required to terminate (Wis. Stat. § 704.19); increased from 14 days effective April 2018",
      faq: [
        {
          question: "What is Wisconsin's security deposit return deadline?",
          answer: "Wisconsin requires landlords to return the security deposit within 21 days of the tenant vacating and providing their forwarding address. The landlord must include an itemized statement of deductions. Failure to comply allows the tenant to sue for double the wrongfully withheld amount plus attorney's fees.",
        },
        {
          question: "What does Wisconsin ATCP 134 require from landlords?",
          answer: "Wisconsin's ATCP 134 (Administrative Code) imposes additional requirements on landlords beyond the Landlord-Tenant Law. Key requirements include: providing a disclosure at move-in listing standard allowable deductions, conducting a walk-through inspection, maintaining receipts for security deposits, and providing written information about the lease and tenant rights.",
        },
        {
          question: "How much notice is required to end a Wisconsin month-to-month lease?",
          answer: "Wisconsin requires 28 days' written notice to terminate a month-to-month residential tenancy under Wis. Stat. § 704.19. Either the landlord or tenant can give this notice. For leases specifying a different notice period, the greater of 28 days or the contractual period typically applies.",
        },
        {
          question: "Can a Wisconsin landlord charge for carpet cleaning?",
          answer: "Under ATCP 134.06, a landlord can only deduct for carpet cleaning if the carpet was professionally cleaned before the tenant moved in AND the tenant left it in worse condition than normal wear and tear. If the carpet was not professionally cleaned before move-in, the landlord cannot charge for cleaning at move-out.",
        },
      ],
    },
    "llc-operating-agreement": {
      requirements: [
        "Governed by the Wisconsin Uniform Limited Liability Company Law (Wis. Stat. § 183.0101 et seq.)",
        "Articles of Organization filed with Wisconsin Department of Financial Institutions; online filing fee $130",
        "Annual report required — $25 fee, due by the end of the quarter that includes the LLC's anniversary date",
        "Registered agent with Wisconsin street address required",
        "No publication requirement in Wisconsin",
        "Operating agreement does not need to be filed but should be signed by all members",
      ],
      restrictions: [
        "WI LLC names must include 'Limited Liability Company,' 'LLC,' or 'L.L.C.'",
        "Professional service corporations or LLPs are common alternatives for licensed professionals",
        "Series LLCs are not specifically authorized in Wisconsin's LLC Act",
      ],
      faq: [
        {
          question: "Does Wisconsin require an LLC operating agreement?",
          answer: "Wisconsin's LLC law (Wis. Stat. § 183.0105) does not require a written operating agreement but allows members to adopt one. Without a written agreement, Wisconsin's default rules govern all aspects of LLC operations — including profit distributions, management, and member exits. A written operating agreement is strongly recommended.",
        },
        {
          question: "How much does it cost to form and maintain a Wisconsin LLC?",
          answer: "Wisconsin charges $130 to file Articles of Organization online. The annual report fee is $25. Wisconsin does not impose a franchise tax on LLCs organized as pass-through entities. Members pay Wisconsin state income tax (up to 7.65%) on their pass-through share of LLC income.",
        },
        {
          question: "What is Wisconsin's LLC annual report requirement?",
          answer: "All Wisconsin LLCs must file an Annual Report with the Department of Financial Institutions and pay the $25 fee by the end of the quarter in which the LLC's anniversary date falls. Failure to file results in the LLC being placed in delinquent status and eventually administratively dissolved.",
        },
        {
          question: "Can a foreign LLC do business in Wisconsin?",
          answer: "Yes. A foreign LLC must register with the Wisconsin Department of Financial Institutions (filing fee $100) before conducting business in Wisconsin. It must maintain a registered agent in Wisconsin and file annual reports. Unregistered foreign LLCs cannot enforce contracts in Wisconsin courts.",
        },
      ],
    },
    "employment-contract": {
      requirements: [
        "At-will employment is the default in Wisconsin — include explicit at-will language",
        "Wisconsin minimum wage: $7.25/hour (federal rate — no state increase)",
        "Wisconsin is a right-to-work state (Wis. Stat. § 111.04) — union membership cannot be required",
        "No state-mandated paid sick leave or paid family leave in Wisconsin (except Milwaukee's local ordinance)",
        "Wisconsin Fair Employment Act (Wis. Stat. § 111.31) prohibits discrimination in employment",
        "Non-compete agreements enforceable under Wis. Stat. § 103.465 if reasonable",
      ],
      restrictions: [
        "Non-competes must be reasonably necessary to protect employer's legitimate business interests",
        "Wisconsin courts may modify (blue-pencil) unreasonable non-competes",
        "Wis. Stat. § 109.01: final wages must be paid by the next regular payday following termination",
      ],
      faq: [
        {
          question: "Is Wisconsin an at-will employment state?",
          answer: "Yes. Wisconsin is an at-will employment state, meaning either party can terminate the employment relationship at any time for any lawful reason. Wisconsin recognizes limited exceptions for public policy violations. Include an explicit at-will clause in all employment contracts.",
        },
        {
          question: "Is Wisconsin a right-to-work state?",
          answer: "Yes. Wisconsin enacted right-to-work legislation in 2015 (Wis. Stat. § 111.04). Employees cannot be required to join a union or pay union dues as a condition of employment. This applies to both private and public sector employment in Wisconsin.",
        },
        {
          question: "Are non-compete agreements enforceable in Wisconsin?",
          answer: "Yes. Under Wis. Stat. § 103.465, non-compete agreements are enforceable in Wisconsin if they are reasonably necessary to protect legitimate business interests and are reasonable in geographic scope, duration, and restricted activities. Wisconsin courts may modify overbroad agreements (blue-pencil) rather than voiding them.",
        },
        {
          question: "When must final wages be paid in Wisconsin?",
          answer: "Under Wis. Stat. § 109.01, Wisconsin employers must pay final wages by the next regular payday following the date of termination — regardless of whether the employer or employee initiated the separation. Failure to pay timely allows the employee to file a wage complaint with the Wisconsin Department of Workforce Development.",
        },
      ],
    },
    "power-of-attorney": {
      requirements: [
        "Governed by Wis. Stat. § 244 (Wisconsin Uniform Power of Attorney for Finances and Property Act, adopted 2010)",
        "Principal must be 18+ and have legal capacity",
        "Must be signed by the principal (or another at principal's direction in principal's presence)",
        "Must be notarized — notarization is required for validity",
        "Two witness signatures required in addition to notarization (Wis. Stat. § 244.05)",
        "Healthcare decisions require a separate Wisconsin Advance Directive or Health Care POA",
      ],
      restrictions: [
        "Agent may not make gifts to themselves beyond personal care and maintenance unless expressly authorized",
        "POA for real estate must be recorded with the county register of deeds before use",
        "Wisconsin courts can terminate a POA if the agent is abusing authority",
      ],
      faq: [
        {
          question: "What are the formalities for a Wisconsin power of attorney?",
          answer: "Under Wis. Stat. § 244.05, a Wisconsin POA for finances and property must be signed by the principal (or directed signer), notarized, and signed by two qualified witnesses. The agent, the notary, and heirs of the principal may not serve as witnesses. All three requirements must be met.",
        },
        {
          question: "What makes a Wisconsin POA durable?",
          answer: "Under Wis. Stat. § 244.04, a Wisconsin POA is durable if it expressly states it is not terminated by the principal's subsequent incapacity. A common phrase: 'This power of attorney shall not be terminated by disability or incapacity of the principal.' Without this language, the POA terminates on incapacity.",
        },
        {
          question: "Can a Wisconsin POA be used for healthcare decisions?",
          answer: "No. A standard financial POA does not cover healthcare in Wisconsin. A separate Wisconsin Advance Directive (Wis. Stat. § 154.01 et seq.) or Health Care Power of Attorney is required to authorize an agent to make healthcare decisions. Wisconsin law requires separate documents for financial and healthcare authority.",
        },
        {
          question: "Does a Wisconsin POA need to be recorded?",
          answer: "Recording is required if the POA will be used for real estate transactions. Record the POA with the county register of deeds before using it to convey, mortgage, or otherwise deal with real property. Recording provides constructive notice to third parties and enables title companies to rely on the agent's authority.",
        },
      ],
    },
    "last-will-and-testament": {
      requirements: [
        "Testator must be 18+ and of sound mind (Wis. Stat. § 853.01)",
        "Will must be signed by the testator (or another at testator's direction in testator's presence)",
        "Two witnesses must sign in the presence of the testator — they need not sign in each other's presence",
        "Witnesses should not be beneficiaries — interested witnesses face challenges",
        "Self-proving affidavit available with notarization (Wis. Stat. § 853.04)",
        "No notarization required for a valid will — only the self-proving affidavit requires notarization",
      ],
      restrictions: [
        "Holographic (handwritten, unwitnessed) wills are NOT valid in Wisconsin — two witnesses required",
        "Surviving spouse has elective share rights and marital property rights (Wis. Stat. § 861.02 et seq.)",
        "Wisconsin is a marital property state — certain assets are marital property regardless of title",
      ],
      faq: [
        {
          question: "Does Wisconsin recognize handwritten wills?",
          answer: "No. Wisconsin does not recognize holographic wills. All wills must be in writing, signed by the testator, and witnessed by two competent adults. An unwitnessed handwritten will is not valid in Wisconsin regardless of how clearly it expresses the testator's intentions.",
        },
        {
          question: "What is Wisconsin's marital property law and how does it affect wills?",
          answer: "Wisconsin is a marital property state (similar to community property). Property acquired during marriage is generally 'marital property' owned equally by both spouses. A will can only dispose of the testator's half of marital property plus all separate property. The surviving spouse automatically retains their half of marital property regardless of the will.",
        },
        {
          question: "What is Wisconsin's probate process?",
          answer: "Wisconsin wills are probated in the Circuit Court of the county where the decedent lived. Wisconsin offers a summary settlement procedure for small estates (under $50,000 in probate assets). Larger estates go through formal administration, which involves publishing notice to creditors and filing accountings with the court.",
        },
        {
          question: "Does Wisconsin have an estate tax?",
          answer: "No. Wisconsin does not have a state estate tax or inheritance tax. Wisconsin residents are only subject to the federal estate tax (currently exempting estates under $13.61 million per individual in 2024). Wisconsin's lack of estate and inheritance taxes makes it straightforward for most estates.",
        },
      ],
    },
    "non-compete-agreement": {
      requirements: [
        "Must be in writing and signed by the employee (Wis. Stat. § 103.465)",
        "Must protect a reasonably necessary legitimate business interest",
        "Must be reasonable in geographic scope — limited to employer's actual service area",
        "Must be reasonable in duration — typically 1–2 years; courts scrutinize longer terms",
        "Must be supported by adequate consideration — new employment or specific additional benefits",
        "Wisconsin courts may blue-pencil (reform) overbroad agreements — draft carefully",
      ],
      restrictions: [
        "Wis. Stat. § 103.465 requires all non-competes to be 'reasonably necessary for the protection of the employer'",
        "Courts apply a reasonableness standard — all factors (scope, duration, geography) must be reasonable",
        "Non-competes for low-wage workers with no access to trade secrets face heightened scrutiny",
      ],
      faq: [
        {
          question: "Are non-compete agreements enforceable in Wisconsin?",
          answer: "Yes. Wisconsin enforces non-compete agreements under Wis. Stat. § 103.465 if they: (1) are in writing and signed, (2) are reasonably necessary to protect the employer's legitimate business interests, (3) are reasonable in duration, geographic scope, and restricted activities, and (4) are supported by adequate consideration. Courts may reform overbroad agreements.",
        },
        {
          question: "Will Wisconsin courts reform an overbroad non-compete?",
          answer: "Yes. Wisconsin courts apply the blue-pencil doctrine, allowing them to narrow an overbroad non-compete rather than voiding it entirely. Courts can reduce the geographic scope or duration to make the agreement reasonable. Draft carefully — an imperfect agreement may be enforced in a modified form.",
        },
        {
          question: "What duration is reasonable for a Wisconsin non-compete?",
          answer: "Wisconsin courts generally uphold non-competes of 1–2 years. Terms of 3 years have been upheld in some cases for senior executives with access to highly sensitive trade secrets. The duration must be proportionate to the employer's legitimate interest in protecting its business.",
        },
        {
          question: "What consideration is required for a Wisconsin non-compete?",
          answer: "For non-competes signed at the start of employment, the job offer itself is sufficient consideration. For existing employees, additional consideration is required — a raise, bonus, promotion, or other benefit. Courts scrutinize mid-employment non-competes without new consideration and may find them unenforceable.",
        },
      ],
    },
    "independent-contractor-agreement": {
      requirements: [
        "Clearly establish independent contractor status using IRS common-law factors",
        "Specify that contractor controls means and methods of work, not just the results",
        "Include IP ownership, work-for-hire, and confidentiality provisions",
        "Non-compete clauses are valid in contractor agreements under Wis. Stat. § 103.465",
        "Include indemnification clause for contractor's own acts, omissions, and tax obligations",
        "Wisconsin Contractor Registration required for construction work (Wis. Stat. § 101.654)",
      ],
      restrictions: [
        "Wisconsin Department of Workforce Development uses its own classification test for UI purposes",
        "Misclassification of employees as contractors triggers back wages, UI contributions, and penalties",
        "Construction contractors must be registered with Wisconsin DSPS — include license verification in agreement",
      ],
      faq: [
        {
          question: "How does Wisconsin determine contractor vs. employee status?",
          answer: "Wisconsin uses a multi-factor test for UI purposes under the Wisconsin Employment Security Law. The IRS common-law test applies for income tax classification. Key factors include control over the work, method of payment, provision of tools, permanency of the relationship, and whether the worker is independently established. All factors are weighed.",
        },
        {
          question: "Does Wisconsin require contractor registration?",
          answer: "Yes. Wisconsin requires residential contractors, remodelers, and home improvement contractors to register with the Department of Safety and Professional Services (DSPS) under Wis. Stat. § 101.654. Construction agreements should verify the contractor's registration and require them to maintain it throughout the project.",
        },
        {
          question: "What IP provisions should a Wisconsin contractor agreement include?",
          answer: "Include: (1) work-for-hire clause for all deliverables, (2) assignment of any rights not covered by work-for-hire, (3) contractor's disclosure of pre-existing IP incorporated into the work, (4) license-back clause for any background contractor IP used, and (5) data ownership and confidentiality obligations.",
        },
        {
          question: "Can a Wisconsin contractor be subject to a non-compete?",
          answer: "Yes. Non-compete clauses in independent contractor agreements are enforceable in Wisconsin under the same Wis. Stat. § 103.465 standards as employee non-competes. The agreement must be in writing, protect a legitimate business interest, and be reasonable in scope, duration, and geography.",
        },
      ],
    },
    "commercial-lease-agreement": {
      requirements: [
        "No statutory form required — governed by common law contract principles",
        "Milwaukee and Madison commercial markets are active — healthcare, finance, and tech are key sectors",
        "NNN and modified gross leases both common depending on property type",
        "HVAC maintenance is critical — Wisconsin winters create extreme heating demands",
        "Include snow removal and parking lot maintenance responsibilities",
        "Personal guarantee standard for small business tenants",
      ],
      restrictions: [
        "Wisconsin does not regulate commercial lease terms — all provisions are negotiable",
        "Landlord's right to relocate or terminate must be expressly stated",
        "Assignment and subletting require written landlord consent unless otherwise agreed",
      ],
      faq: [
        {
          question: "Is a written commercial lease required in Wisconsin?",
          answer: "Leases for more than one year must be in writing under Wisconsin's Statute of Frauds (Wis. Stat. § 706.02). Even short-term commercial leases should be in writing to define the parties' rights clearly. Wisconsin courts strictly enforce the terms of written commercial leases.",
        },
        {
          question: "What is the Milwaukee commercial real estate market like?",
          answer: "Milwaukee has a growing commercial market with active development downtown and in the Historic Third Ward. Office space along the Lakefront and in the CBD typically runs 3–5 year leases. The Milwaukee 7-region (including Waukesha, Kenosha, and Racine) has significant industrial and logistics real estate activity.",
        },
        {
          question: "Who is responsible for HVAC in a Wisconsin commercial lease?",
          answer: "HVAC responsibility is entirely negotiable. Wisconsin winters (regularly below -10°F) make heating system reliability critical. In NNN leases, tenants maintain HVAC during the term; landlords often handle replacement. Include a capital replacement obligation for HVAC units over a certain age or cost. Specify emergency response obligations for system failures in winter.",
        },
        {
          question: "Can a Wisconsin commercial tenant sublease space?",
          answer: "Only if the lease permits. Most Wisconsin commercial leases require written landlord consent for subleasing. Negotiate sublease rights at the outset, especially for longer leases. Without an express sublease right, the tenant needs the landlord's approval before subleasing to any third party.",
        },
      ],
    },
    "promissory-note": {
      requirements: [
        "Must include: principal, interest rate, payment schedule, maturity date, and default terms",
        "Governed by Wis. Stat. § 138.052 et seq. and Wisconsin UCC (Wis. Stat. § 403.101 et seq.)",
        "No statutory usury cap for commercial loans — business parties may agree to any rate",
        "Consumer loan rates regulated under Wisconsin Consumer Acts (Wis. Stat. § 422.201 et seq.)",
        "Maximum rate for consumer installment loans: 18% per year (or 21.99% APR for certain loans)",
        "Secured notes must reference and attach the security agreement or mortgage",
      ],
      restrictions: [
        "Wisconsin consumer loan act limits rates for personal, family, and household purpose loans",
        "Confession of judgment clauses are void in Wisconsin consumer transactions",
        "Prepayment penalties must be clearly disclosed in consumer loan documents",
      ],
      faq: [
        {
          question: "Does Wisconsin have a usury limit for promissory notes?",
          answer: "Wisconsin does not have a general usury cap for commercial (business) loans. Parties can agree to any interest rate for business-to-business transactions. Consumer loans are subject to Wisconsin's Consumer Act rate limits. Business lenders should clearly define the purpose of the loan to establish which rules apply.",
        },
        {
          question: "What is the statute of limitations on a promissory note in Wisconsin?",
          answer: "Under Wis. Stat. § 893.43, the statute of limitations for written contract claims — including promissory notes — is 6 years from the date of breach. Oral contracts have a 6-year limitation period as well. Partial payments or written acknowledgment of the debt restart the limitations clock.",
        },
        {
          question: "Does a Wisconsin promissory note need to be notarized?",
          answer: "A promissory note does not need to be notarized to be valid. However, a mortgage or security interest in real property must be notarized and recorded with the county register of deeds. Notarizing the note itself provides additional evidence of authenticity if signatures are contested.",
        },
        {
          question: "Can a Wisconsin promissory note be transferred?",
          answer: "Yes. A properly drafted negotiable promissory note under the Wisconsin UCC (Wis. Stat. § 403.104) can be endorsed and transferred to a third party, who becomes a holder with the right to enforce the note. Include a 'non-negotiable' clause if you want to restrict transfers.",
        },
      ],
    },
    "demand-letter": {
      requirements: [
        "No statutory form required — must clearly state the claim, amount, and deadline for response",
        "Identify all parties with full legal names and addresses",
        "Attach supporting documentation: contracts, invoices, correspondence, photographs",
        "State the exact remedy demanded — payment, performance, or cure",
        "Set a firm response deadline — 10–30 days is standard",
        "Send by certified mail, return receipt requested, and keep a complete copy",
      ],
      restrictions: [
        "Wisconsin Deceptive Trade Practices Act (Wis. Stat. § 100.18) prohibits unfair or deceptive collection practices",
        "Third-party debt collectors must comply with FDCPA and Wisconsin debt collection rules",
        "Threatening actions you cannot legally take may constitute harassment under Wisconsin law",
      ],
      faq: [
        {
          question: "What is the statute of limitations for contract claims in Wisconsin?",
          answer: "Under Wis. Stat. § 893.43, written contract claims must be filed within 6 years of the breach. Oral contracts have a 6-year limitation period as well. A demand letter does not toll the limitations period — file suit before the deadline if negotiations fail.",
        },
        {
          question: "Is a demand letter required before suing in Wisconsin?",
          answer: "A demand letter is not legally required before filing most civil suits in Wisconsin. However, Wisconsin small claims court (up to $10,000) discourages litigation without first attempting to resolve the dispute. Sending a demand letter first demonstrates good faith and often resolves the matter without going to court.",
        },
        {
          question: "Can I recover attorney's fees in a Wisconsin contract dispute?",
          answer: "Wisconsin follows the American Rule — each party pays their own attorney's fees unless a contract or statute provides otherwise. If your contract includes a fee-shifting clause, Wisconsin courts will enforce it. Wisconsin's consumer protection statutes (Wis. Stat. § 100.18) allow fees in deceptive trade practices cases.",
        },
        {
          question: "What should a Wisconsin demand letter for a security deposit include?",
          answer: "State the move-out date, the deposit amount, and the failure to return it within 21 days as required by Wis. Stat. § 704.28. Note that Wisconsin allows tenants to recover double the wrongfully withheld deposit amount plus attorney's fees. Demand return of the full deposit within a specific number of days and reference the double damages remedy.",
        },
      ],
    },
  },
}

// For states not in the detailed data map, use generic notes
function getGenericStateNotes(stateName: string, docTitle: string) {
  return {
    requirements: [
      `Comply with ${stateName} state-specific statutes governing ${docTitle.toLowerCase()}s`,
      `All parties must be of legal capacity under ${stateName} law`,
      `Disputes governed by ${stateName} law and courts`,
      `Consider consulting a ${stateName}-licensed attorney for complex situations`,
    ],
    restrictions: [
      `Ensure compliance with ${stateName} consumer protection laws`,
      `Verify any professional licensing requirements in ${stateName}`,
    ],
    faq: [
      {
        question: `Is this ${docTitle} valid in ${stateName}?`,
        answer: `Yes. Our AI generates a ${docTitle} compliant with ${stateName} law. The document is tailored based on your answers and the legal requirements of ${stateName}.`,
      },
      {
        question: `Do I need a lawyer to create a ${docTitle} in ${stateName}?`,
        answer: `Many people use AI-generated ${docTitle}s without an attorney for standard situations. However, for complex matters or high-value transactions, consulting a ${stateName}-licensed attorney is recommended.`,
      },
      {
        question: `How do I make a ${docTitle} legally binding in ${stateName}?`,
        answer: `Generally, a ${docTitle} is legally binding in ${stateName} when: (1) both parties have legal capacity, (2) there is consideration, (3) the terms are clear and definite, and (4) both parties consent without duress. Some document types require witnesses or notarization.`,
      },
      {
        question: `Where do I file a ${docTitle} in ${stateName}?`,
        answer: `Most ${docTitle}s do not need to be filed with the government — they are private agreements. Exceptions include real estate documents (recorded with the county recorder) and court filings (filed with the appropriate court).`,
      },
    ],
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export interface ParsedStatePageSlug {
  state: USState
  doc: StateEligibleDoc
  stateSlug: string
  docSlug: string
}

/**
 * Parse a URL slug like "california-residential-lease-agreement" into
 * { state: USState, doc: StateEligibleDoc }.
 * Returns null if the slug doesn't match a known state + doc combination.
 */
export function parseStatePageSlug(slug: string): ParsedStatePageSlug | null {
  for (const state of US_STATES) {
    if (!slug.startsWith(state.slug + "-")) continue
    const docSlug = slug.slice(state.slug.length + 1)
    const doc = STATE_ELIGIBLE_DOCS.find((d) => d.slug === docSlug)
    if (doc) {
      return { state, doc, stateSlug: state.slug, docSlug }
    }
  }
  return null
}

/**
 * Generate all static params for the Sprint 6 state page batch.
 * Returns category/slug pairs for the existing [category]/[slug] route.
 */
export function getStatePageStaticParams(): { category: string; slug: string }[] {
  const params: { category: string; slug: string }[] = []
  for (const stateSlug of SPRINT6_STATE_SLUGS) {
    const state = US_STATES.find((s) => s.slug === stateSlug)
    if (!state) continue
    for (const doc of STATE_ELIGIBLE_DOCS) {
      params.push({
        category: doc.category,
        slug: `${state.slug}-${doc.slug}`,
      })
    }
  }
  return params
}

/**
 * Get all page data for a state × doc page.
 * Returns null if combination is not supported.
 */
export function getStatePageData(stateSlug: string, docSlug: string) {
  const state = US_STATES.find((s) => s.slug === stateSlug)
  if (!state) return null

  const doc = STATE_ELIGIBLE_DOCS.find((d) => d.slug === docSlug)
  if (!doc) return null

  const stateNotes = STATE_DOC_NOTES[stateSlug]?.[docSlug]
  const notes = stateNotes ?? getGenericStateNotes(state.name, doc.title)

  const pageTitle = `${state.name} ${doc.title}`
  const seoTitle = `${state.name} ${doc.title} Template | LegalLawDocs.com`
  const metaDescription = `Create a ${state.name} ${doc.title.toLowerCase()} online. AI-generated, state-compliant with ${state.abbr} law requirements. Instant PDF & DOCX download.`

  return {
    state,
    doc,
    pageTitle,
    seoTitle,
    metaDescription,
    h1: pageTitle,
    notes,
  }
}

/**
 * Returns the canonical URL for a state page.
 */
export function getStatePageUrl(stateSlug: string, docSlug: string, docCategory: string): string {
  return `/documents/${docCategory}/${stateSlug}-${docSlug}`
}

/**
 * Returns sibling state pages (same doc, different states) for cross-linking.
 */
export function getSiblingStatePages(docSlug: string, currentStateSlug: string): {
  stateName: string
  stateSlug: string
  url: string
  category: string
}[] {
  const doc = STATE_ELIGIBLE_DOCS.find((d) => d.slug === docSlug)
  if (!doc) return []
  return SPRINT6_STATE_SLUGS
    .filter((slug) => slug !== currentStateSlug)
    .map((slug) => {
      const state = US_STATES.find((s) => s.slug === slug)!
      return {
        stateName: state.name,
        stateSlug: slug,
        url: getStatePageUrl(slug, docSlug, doc.category),
        category: doc.category,
      }
    })
}
