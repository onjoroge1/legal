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
  "california", "texas", "new-york", "florida", "georgia",
  "illinois", "pennsylvania", "ohio", "michigan", "washington",
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
