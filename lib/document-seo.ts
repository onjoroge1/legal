import type { CatalogDocument } from "./document-catalog"

export interface DocumentSeo {
  title: string
  description: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  ogImageAlt: string
  keywords: string[]
}

const BASE_URL = "https://legallawdocs.com"
const DEFAULT_IMAGE = `${BASE_URL}/images/hero-legal.jpg`

/** Keyed by new hyphenated slug */
const seoBySlug: Record<string, DocumentSeo> = {
  "non-disclosure-agreement": {
    title: "Non-Disclosure Agreement (NDA) Template | LegalLawDocs.com",
    description:
      "Create a Non-Disclosure Agreement online in minutes. Protect confidential information with a state‑compliant NDA and instant PDF & DOCX download.",
    ogTitle: "Non-Disclosure Agreement (NDA) Generator",
    ogDescription: "Build a professional NDA with state‑specific compliance and instant download.",
    ogImage: DEFAULT_IMAGE,
    ogImageAlt: "LegalLawDocs.com - NDA Generator",
    keywords: [
      "nda",
      "non disclosure agreement",
      "nda template",
      "confidentiality agreement",
      "nda generator",
      "create nda",
      "mutual nda",
      "unilateral nda",
    ],
  },
  "llc-operating-agreement": {
    title: "LLC Operating Agreement Template — Create Online | LegalLawDocs.com",
    description:
      "Create an LLC Operating Agreement online. Define ownership, management, and distributions with a state‑compliant template. Instant download.",
    ogTitle: "LLC Operating Agreement Generator",
    ogDescription: "Generate a compliant LLC Operating Agreement in minutes.",
    ogImage: DEFAULT_IMAGE,
    ogImageAlt: "LegalLawDocs.com - LLC Operating Agreement",
    keywords: [
      "llc operating agreement",
      "operating agreement",
      "llc agreement",
      "single member llc",
      "multi member llc",
      "llc template",
      "create llc agreement",
    ],
  },
  "employment-contract": {
    title: "Employment Contract Template — Create Online | LegalLawDocs.com",
    description:
      "Create an employment contract online with state‑specific compliance. Define role, pay, benefits, and termination clearly. Instant download.",
    ogTitle: "Employment Contract Generator",
    ogDescription: "Build a professional employment agreement with clear terms.",
    ogImage: DEFAULT_IMAGE,
    ogImageAlt: "LegalLawDocs.com - Employment Contract",
    keywords: [
      "employment contract",
      "employment agreement",
      "job contract",
      "at will employment",
      "fixed term employment",
      "employment template",
    ],
  },
  "residential-lease-agreement": {
    title: "Residential Lease Agreement Template — Create Online | LegalLawDocs.com",
    description:
      "Create a residential lease agreement online. Set rent, term, deposits, and policies with state‑compliant terms and mandatory disclosures.",
    ogTitle: "Residential Lease Agreement Generator",
    ogDescription: "Generate a compliant residential lease with clear terms.",
    ogImage: DEFAULT_IMAGE,
    ogImageAlt: "LegalLawDocs.com - Residential Lease Agreement",
    keywords: [
      "residential lease agreement",
      "rental agreement",
      "lease template",
      "tenant landlord agreement",
      "rent agreement",
      "lease generator",
    ],
  },
  "independent-contractor-agreement": {
    title: "Independent Contractor Agreement Template | LegalLawDocs.com",
    description:
      "Create an independent contractor agreement online. Define scope, payment, and IP ownership with state‑compliant terms. Instant download.",
    ogTitle: "Independent Contractor Agreement Generator",
    ogDescription: "Build a contractor agreement with clear scope and payment terms.",
    ogImage: DEFAULT_IMAGE,
    ogImageAlt: "LegalLawDocs.com - Contractor Agreement",
    keywords: [
      "independent contractor agreement",
      "contractor contract",
      "freelance agreement",
      "contractor template",
      "1099 agreement",
    ],
  },
  "partnership-agreement": {
    title: "Partnership Agreement Template — Create Online | LegalLawDocs.com",
    description:
      "Create a partnership agreement online. Define ownership, profit splits, and management with enforceable terms. Instant download.",
    ogTitle: "Partnership Agreement Generator",
    ogDescription: "Generate a clear partnership agreement in minutes.",
    ogImage: DEFAULT_IMAGE,
    ogImageAlt: "LegalLawDocs.com - Partnership Agreement",
    keywords: [
      "partnership agreement",
      "business partnership contract",
      "partner agreement",
      "profit sharing agreement",
      "partnership template",
    ],
  },
  "power-of-attorney": {
    title: "Power of Attorney Form — Create Online | LegalLawDocs.com",
    description:
      "Create a Power of Attorney online. Grant authority for legal or financial decisions with state‑specific witness and notarization requirements.",
    ogTitle: "Power of Attorney Generator",
    ogDescription: "Generate a POA with clear authority and state compliance.",
    ogImage: DEFAULT_IMAGE,
    ogImageAlt: "LegalLawDocs.com - Power of Attorney",
    keywords: [
      "power of attorney",
      "poa form",
      "durable power of attorney",
      "medical power of attorney",
      "poa template",
    ],
  },
  "last-will-and-testament": {
    title: "Last Will & Testament — Make a Will Online | LegalLawDocs.com",
    description:
      "Make a Last Will & Testament online in minutes. Create a legally valid will with state‑specific witness requirements and instant download.",
    ogTitle: "Last Will & Testament — Make a Will Online",
    ogDescription: "Create a legally valid will with state‑specific requirements and instant download.",
    ogImage: DEFAULT_IMAGE,
    ogImageAlt: "LegalLawDocs.com - Last Will & Testament",
    keywords: [
      "last will and testament",
      "make a will",
      "online will",
      "will template",
      "estate planning document",
      "create a will",
    ],
  },
  "commercial-lease-agreement": {
    title: "Commercial Lease Agreement Template | LegalLawDocs.com",
    description:
      "Create a commercial lease agreement online. Define rent, term, CAM charges, and responsibilities with compliant, professional terms.",
    ogTitle: "Commercial Lease Agreement Generator",
    ogDescription: "Generate a commercial lease with clear rent and responsibility terms.",
    ogImage: DEFAULT_IMAGE,
    ogImageAlt: "LegalLawDocs.com - Commercial Lease Agreement",
    keywords: [
      "commercial lease agreement",
      "commercial lease",
      "business lease",
      "commercial lease template",
      "cam charges",
    ],
  },
  "service-agreement": {
    title: "Service Agreement Template — Create Online | LegalLawDocs.com",
    description:
      "Create a service agreement online. Define scope, fees, IP ownership, and termination with professional terms. Instant download.",
    ogTitle: "Service Agreement Generator",
    ogDescription: "Build a service agreement with clear scope and fee terms.",
    ogImage: DEFAULT_IMAGE,
    ogImageAlt: "LegalLawDocs.com - Service Agreement",
    keywords: [
      "service agreement",
      "professional services contract",
      "service contract",
      "service agreement template",
      "retainer agreement",
    ],
  },
  "purchase-agreement": {
    title: "Purchase Agreement Template — Create Online | LegalLawDocs.com",
    description:
      "Create a purchase agreement online. Document price, payment terms, closing, and warranties with clear, enforceable language.",
    ogTitle: "Purchase Agreement Generator",
    ogDescription: "Generate a purchase agreement with clear terms and conditions.",
    ogImage: DEFAULT_IMAGE,
    ogImageAlt: "LegalLawDocs.com - Purchase Agreement",
    keywords: [
      "purchase agreement",
      "sales agreement",
      "asset purchase agreement",
      "purchase contract",
      "purchase agreement template",
    ],
  },
  "non-compete-agreement": {
    title: "Non-Compete Agreement Template — Create Online | LegalLawDocs.com",
    description:
      "Create a non‑compete agreement online with state‑specific limitations. Protect business interests with enforceable non-compete terms.",
    ogTitle: "Non-Compete Agreement Generator",
    ogDescription: "Generate a compliant non‑compete agreement with enforceable terms.",
    ogImage: DEFAULT_IMAGE,
    ogImageAlt: "LegalLawDocs.com - Non-Compete Agreement",
    keywords: [
      "non compete agreement",
      "noncompete contract",
      "restrictive covenant",
      "non compete template",
      "non compete generator",
    ],
  },

  // ── Legal Letters ──────────────────────────────────────────────────────────
  "demand-letter": {
    title: "Demand Letter Template — Create Online | LegalLawDocs.com",
    description:
      "Create a professional demand letter online in minutes. Formally demand payment or action before filing a lawsuit. State-compliant with instant PDF download.",
    ogTitle: "Demand Letter Generator",
    ogDescription: "Draft a professional demand letter and establish your paper trail before litigation.",
    ogImage: DEFAULT_IMAGE,
    ogImageAlt: "LegalLawDocs.com - Demand Letter",
    keywords: [
      "demand letter",
      "demand letter template",
      "payment demand letter",
      "legal demand letter",
      "demand letter generator",
      "debt demand letter",
    ],
  },
  "cease-and-desist-letter": {
    title: "Cease and Desist Letter Template | LegalLawDocs.com",
    description:
      "Create a cease and desist letter online. Stop copyright infringement, harassment, defamation, or contract violations with professionally worded legal language.",
    ogTitle: "Cease and Desist Letter Generator",
    ogDescription: "Stop harmful or infringing behavior with a professionally worded cease and desist letter.",
    ogImage: DEFAULT_IMAGE,
    ogImageAlt: "LegalLawDocs.com - Cease and Desist Letter",
    keywords: [
      "cease and desist letter",
      "cease and desist template",
      "copyright infringement letter",
      "harassment cease and desist",
      "trademark cease and desist",
      "cease and desist generator",
    ],
  },
  "notice-of-breach": {
    title: "Notice of Breach of Contract Template | LegalLawDocs.com",
    description:
      "Create a notice of breach of contract online. Formally notify a party of their failure to perform and set a cure deadline before taking legal action.",
    ogTitle: "Notice of Breach of Contract Generator",
    ogDescription: "Document a contract breach with a formal notice and set a legal cure deadline.",
    ogImage: DEFAULT_IMAGE,
    ogImageAlt: "LegalLawDocs.com - Notice of Breach",
    keywords: [
      "notice of breach",
      "breach of contract letter",
      "contract default notice",
      "breach notice template",
      "cure notice contract",
    ],
  },
  "complaint-letter": {
    title: "Formal Complaint Letter Template — Create Online | LegalLawDocs.com",
    description:
      "Create a formal complaint letter online. Professionally communicate dissatisfaction and request a specific remedy from a business, agency, or individual.",
    ogTitle: "Complaint Letter Generator",
    ogDescription: "Write a clear, professional complaint letter that maximizes your chances of resolution.",
    ogImage: DEFAULT_IMAGE,
    ogImageAlt: "LegalLawDocs.com - Complaint Letter",
    keywords: [
      "complaint letter",
      "formal complaint letter",
      "consumer complaint letter",
      "complaint template",
      "business complaint letter",
    ],
  },
  "final-notice-before-legal-action": {
    title: "Final Notice Before Legal Action Template | LegalLawDocs.com",
    description:
      "Create a final notice before legal action online. Send a last formal warning before filing a lawsuit or claim, with clear deadline and consequences.",
    ogTitle: "Final Notice Before Legal Action Generator",
    ogDescription: "Send a compelling last warning before escalating to court or collections.",
    ogImage: DEFAULT_IMAGE,
    ogImageAlt: "LegalLawDocs.com - Final Notice Before Legal Action",
    keywords: [
      "final notice letter",
      "pre-legal action notice",
      "last chance letter",
      "final demand letter",
      "notice before lawsuit",
    ],
  },
  "debt-settlement-letter": {
    title: "Debt Settlement Letter Template | LegalLawDocs.com",
    description:
      "Create a debt settlement letter online. Propose or confirm a reduced payoff amount and protect yourself from future claims once the agreed sum is paid.",
    ogTitle: "Debt Settlement Letter Generator",
    ogDescription: "Negotiate a reduced debt payoff with a professionally drafted settlement letter.",
    ogImage: DEFAULT_IMAGE,
    ogImageAlt: "LegalLawDocs.com - Debt Settlement Letter",
    keywords: [
      "debt settlement letter",
      "debt negotiation letter",
      "settle debt letter",
      "debt payoff letter",
      "debt reduction letter",
    ],
  },
  "landlord-notice-to-vacate": {
    title: "Landlord Notice to Vacate Template — Create Online | LegalLawDocs.com",
    description:
      "Create a landlord notice to vacate online. State-compliant eviction notices with the correct notice period and mandatory statutory language for your jurisdiction.",
    ogTitle: "Landlord Notice to Vacate Generator",
    ogDescription: "Generate a state-compliant notice to vacate with correct statutory language.",
    ogImage: DEFAULT_IMAGE,
    ogImageAlt: "LegalLawDocs.com - Landlord Notice to Vacate",
    keywords: [
      "notice to vacate",
      "eviction notice",
      "landlord notice",
      "tenant eviction letter",
      "notice to quit",
      "pay or quit notice",
    ],
  },

  // ── Financial ──────────────────────────────────────────────────────────────
  "promissory-note": {
    title: "Promissory Note Template — Create Online | LegalLawDocs.com",
    description:
      "Create a promissory note online. Document a loan with a legally binding promise to repay, including principal, interest, payment schedule, and default provisions.",
    ogTitle: "Promissory Note Generator",
    ogDescription: "Document any loan with a legally binding promissory note and clear repayment terms.",
    ogImage: DEFAULT_IMAGE,
    ogImageAlt: "LegalLawDocs.com - Promissory Note",
    keywords: [
      "promissory note",
      "promissory note template",
      "loan note",
      "ious legal document",
      "promissory note generator",
      "personal loan note",
    ],
  },
  "loan-agreement": {
    title: "Loan Agreement Template — Create Online | LegalLawDocs.com",
    description:
      "Create a personal or business loan agreement online. Define loan amount, interest rate, repayment schedule, collateral, and default terms with state compliance.",
    ogTitle: "Loan Agreement Generator",
    ogDescription: "Generate a comprehensive loan agreement with full repayment and default terms.",
    ogImage: DEFAULT_IMAGE,
    ogImageAlt: "LegalLawDocs.com - Loan Agreement",
    keywords: [
      "loan agreement",
      "personal loan agreement",
      "loan contract template",
      "private loan agreement",
      "lending agreement",
    ],
  },
  "payment-plan-agreement": {
    title: "Payment Plan Agreement Template | LegalLawDocs.com",
    description:
      "Create a payment plan agreement online. Structure an installment payment schedule for a debt or purchase, with payment dates, amounts, and default terms.",
    ogTitle: "Payment Plan Agreement Generator",
    ogDescription: "Formalize an installment repayment schedule with a clear payment plan agreement.",
    ogImage: DEFAULT_IMAGE,
    ogImageAlt: "LegalLawDocs.com - Payment Plan Agreement",
    keywords: [
      "payment plan agreement",
      "installment agreement",
      "payment schedule template",
      "debt payment plan",
      "installment payment contract",
    ],
  },
  "bill-of-sale": {
    title: "Bill of Sale Template — Create Online | LegalLawDocs.com",
    description:
      "Create a bill of sale online. Transfer ownership of personal property — vehicles, equipment, goods — with a legally valid sales record and as-is clause.",
    ogTitle: "Bill of Sale Generator",
    ogDescription: "Transfer personal property ownership with a legally valid bill of sale.",
    ogImage: DEFAULT_IMAGE,
    ogImageAlt: "LegalLawDocs.com - Bill of Sale",
    keywords: [
      "bill of sale",
      "bill of sale template",
      "vehicle bill of sale",
      "personal property bill of sale",
      "bill of sale generator",
    ],
  },
  "debt-settlement-agreement": {
    title: "Debt Settlement Agreement Template | LegalLawDocs.com",
    description:
      "Create a debt settlement agreement online. Formally settle a debt for less than the full amount owed with a binding contract that protects both parties from future claims.",
    ogTitle: "Debt Settlement Agreement Generator",
    ogDescription: "Settle a debt for a reduced sum and protect both parties with a binding agreement.",
    ogImage: DEFAULT_IMAGE,
    ogImageAlt: "LegalLawDocs.com - Debt Settlement Agreement",
    keywords: [
      "debt settlement agreement",
      "settle debt contract",
      "debt forgiveness agreement",
      "debt payoff agreement",
      "debt reduction contract",
    ],
  },

  // ── Personal ───────────────────────────────────────────────────────────────
  "affidavit": {
    title: "Affidavit Template — Create Online | LegalLawDocs.com",
    description:
      "Create an affidavit online. Draft a sworn written statement of facts for legal proceedings, government applications, or business transactions with notarization block.",
    ogTitle: "Affidavit Generator",
    ogDescription: "Draft a sworn affidavit with all required components: facts, oath, and notarization block.",
    ogImage: DEFAULT_IMAGE,
    ogImageAlt: "LegalLawDocs.com - Affidavit",
    keywords: [
      "affidavit",
      "affidavit template",
      "sworn statement",
      "affidavit of fact",
      "affidavit generator",
      "notarized affidavit",
    ],
  },
  "general-release-of-liability": {
    title: "General Release of Liability Template | LegalLawDocs.com",
    description:
      "Create a general release of liability online. Waive future claims arising from a specific event or agreement with a legally binding liability waiver.",
    ogTitle: "General Release of Liability Generator",
    ogDescription: "Protect against future claims with a comprehensive liability release and waiver.",
    ogImage: DEFAULT_IMAGE,
    ogImageAlt: "LegalLawDocs.com - General Release of Liability",
    keywords: [
      "release of liability",
      "liability waiver",
      "general release",
      "hold harmless agreement",
      "liability release form",
      "waiver of claims",
    ],
  },
  "vehicle-bill-of-sale": {
    title: "Vehicle Bill of Sale Template — Create Online | LegalLawDocs.com",
    description:
      "Create a vehicle bill of sale online. State-compliant car, truck, and motorcycle sale records with VIN, odometer disclosure, and DMV-required fields.",
    ogTitle: "Vehicle Bill of Sale Generator",
    ogDescription: "Generate a DMV-ready vehicle bill of sale with odometer disclosure and VIN fields.",
    ogImage: DEFAULT_IMAGE,
    ogImageAlt: "LegalLawDocs.com - Vehicle Bill of Sale",
    keywords: [
      "vehicle bill of sale",
      "car bill of sale",
      "auto bill of sale",
      "dmv bill of sale",
      "motorcycle bill of sale",
      "truck bill of sale",
    ],
  },
  "personal-property-agreement": {
    title: "Personal Property Agreement Template | LegalLawDocs.com",
    description:
      "Create a personal property agreement online. Define ownership, use, or transfer terms for personal property — furniture, electronics, or valuables — between two parties.",
    ogTitle: "Personal Property Agreement Generator",
    ogDescription: "Document custody, sharing, or transfer of personal property with a clear agreement.",
    ogImage: DEFAULT_IMAGE,
    ogImageAlt: "LegalLawDocs.com - Personal Property Agreement",
    keywords: [
      "personal property agreement",
      "property sharing agreement",
      "personal property contract",
      "property custody agreement",
    ],
  },

  // ── Tier 1 Standalone Intent Documents ────────────────────────────────────
  "mutual-non-disclosure-agreement": {
    title: "Mutual Non-Disclosure Agreement Template | LegalLawDocs.com",
    description:
      "Create a mutual NDA online in minutes. Protect confidential information shared in both directions with a state-compliant bilateral non-disclosure agreement and instant PDF download.",
    ogTitle: "Mutual NDA Generator — Bilateral Non-Disclosure Agreement",
    ogDescription: "Build a mutual NDA that protects both parties' confidential information with state-specific compliance.",
    ogImage: DEFAULT_IMAGE,
    ogImageAlt: "LegalLawDocs.com - Mutual Non-Disclosure Agreement",
    keywords: [
      "mutual nda",
      "mutual non-disclosure agreement",
      "bilateral nda",
      "two-way nda",
      "mutual confidentiality agreement",
      "mutual nda template",
      "create mutual nda",
    ],
  },
  "unilateral-non-disclosure-agreement": {
    title: "Unilateral Non-Disclosure Agreement Template | LegalLawDocs.com",
    description:
      "Create a one-way NDA online. Protect confidential information you share with vendors, employees, or partners with a state-compliant unilateral non-disclosure agreement.",
    ogTitle: "Unilateral NDA Generator — One-Way Non-Disclosure Agreement",
    ogDescription: "Generate a one-way NDA that protects information you disclose with enforceable confidentiality obligations.",
    ogImage: DEFAULT_IMAGE,
    ogImageAlt: "LegalLawDocs.com - Unilateral Non-Disclosure Agreement",
    keywords: [
      "unilateral nda",
      "one-way nda",
      "unilateral non-disclosure agreement",
      "one-sided nda",
      "unilateral confidentiality agreement",
      "unilateral nda template",
    ],
  },
  "single-member-llc-operating-agreement": {
    title: "Single-Member LLC Operating Agreement Template | LegalLawDocs.com",
    description:
      "Create a single-member LLC operating agreement online. Establish your one-owner LLC's management rules, distributions, and liability protections with state-specific compliance and instant download.",
    ogTitle: "Single-Member LLC Operating Agreement Generator",
    ogDescription: "Generate a compliant single-member LLC operating agreement to protect your liability shield and satisfy banking requirements.",
    ogImage: DEFAULT_IMAGE,
    ogImageAlt: "LegalLawDocs.com - Single-Member LLC Operating Agreement",
    keywords: [
      "single member llc operating agreement",
      "single member llc",
      "sole member llc",
      "smllc operating agreement",
      "one member llc agreement",
      "single member llc template",
    ],
  },
  "multi-member-llc-operating-agreement": {
    title: "Multi-Member LLC Operating Agreement Template | LegalLawDocs.com",
    description:
      "Create a multi-member LLC operating agreement online. Define ownership splits, voting rights, profit distributions, and member exit procedures with state-compliant terms and instant download.",
    ogTitle: "Multi-Member LLC Operating Agreement Generator",
    ogDescription: "Generate a comprehensive multi-member LLC operating agreement with custom ownership splits and management structure.",
    ogImage: DEFAULT_IMAGE,
    ogImageAlt: "LegalLawDocs.com - Multi-Member LLC Operating Agreement",
    keywords: [
      "multi member llc operating agreement",
      "multi-member llc",
      "multiple member llc",
      "llc partnership agreement",
      "member managed llc agreement",
      "multi member llc template",
    ],
  },
  "durable-power-of-attorney": {
    title: "Durable Power of Attorney Form — Create Online | LegalLawDocs.com",
    description:
      "Create a durable power of attorney online. Grant an agent authority that survives incapacity with state-specific durability language, notarization requirements, and instant download.",
    ogTitle: "Durable Power of Attorney Generator",
    ogDescription: "Generate a durable POA that remains effective if you become incapacitated — tailored to your state's requirements.",
    ogImage: DEFAULT_IMAGE,
    ogImageAlt: "LegalLawDocs.com - Durable Power of Attorney",
    keywords: [
      "durable power of attorney",
      "durable poa",
      "financial power of attorney",
      "durable power of attorney form",
      "durable poa template",
      "durable power of attorney generator",
    ],
  },
  "medical-power-of-attorney": {
    title: "Medical Power of Attorney Form — Create Online | LegalLawDocs.com",
    description:
      "Create a medical power of attorney online. Designate a healthcare agent with state-specific statutory language, HIPAA authorization, and correct witness or notarization requirements.",
    ogTitle: "Medical Power of Attorney Generator",
    ogDescription: "Generate a medical POA that gives your agent clear healthcare decision authority with full state compliance.",
    ogImage: DEFAULT_IMAGE,
    ogImageAlt: "LegalLawDocs.com - Medical Power of Attorney",
    keywords: [
      "medical power of attorney",
      "healthcare power of attorney",
      "healthcare proxy",
      "medical poa",
      "health care directive",
      "medical poa form",
    ],
  },
  "month-to-month-lease-agreement": {
    title: "Month-to-Month Lease Agreement Template | LegalLawDocs.com",
    description:
      "Create a month-to-month lease agreement online. Flexible rental contracts that renew monthly with your state's required notice periods, rent increase rules, and mandatory disclosures.",
    ogTitle: "Month-to-Month Lease Agreement Generator",
    ogDescription: "Generate a compliant month-to-month rental agreement with flexible terms and state-required notice provisions.",
    ogImage: DEFAULT_IMAGE,
    ogImageAlt: "LegalLawDocs.com - Month-to-Month Lease Agreement",
    keywords: [
      "month to month lease",
      "month-to-month rental agreement",
      "month to month lease agreement",
      "rolling lease agreement",
      "flexible lease template",
      "month to month lease generator",
    ],
  },
  "at-will-employment-contract": {
    title: "At-Will Employment Contract Template | LegalLawDocs.com",
    description:
      "Create an at-will employment contract online. Formalize the employment relationship with clear compensation, benefits, and policy terms while preserving at-will status. State-compliant with instant download.",
    ogTitle: "At-Will Employment Contract Generator",
    ogDescription: "Generate an at-will employment contract with clear compensation and policy terms tailored to your state's labor laws.",
    ogImage: DEFAULT_IMAGE,
    ogImageAlt: "LegalLawDocs.com - At-Will Employment Contract",
    keywords: [
      "at will employment contract",
      "at-will employment agreement",
      "at will employment letter",
      "at will job offer letter",
      "at will contract template",
      "at will employment contract generator",
    ],
  },
  "triple-net-lease-agreement": {
    title: "Triple Net (NNN) Lease Agreement Template | LegalLawDocs.com",
    description:
      "Create a triple net lease agreement online. Structure NNN commercial leases where tenants pay base rent plus property taxes, insurance, and maintenance with professional, enforceable terms.",
    ogTitle: "Triple Net Lease Agreement Generator",
    ogDescription: "Generate a professional NNN lease agreement with full CAM, tax, and insurance pass-through provisions.",
    ogImage: DEFAULT_IMAGE,
    ogImageAlt: "LegalLawDocs.com - Triple Net Lease Agreement",
    keywords: [
      "triple net lease",
      "nnn lease",
      "triple net lease agreement",
      "nnn lease template",
      "triple net commercial lease",
      "nnn lease generator",
    ],
  },
}

export function getDocumentSeo(slug: string): DocumentSeo | null {
  return seoBySlug[slug] || null
}

/** Canonical URL uses new /documents/[category]/[slug] structure */
export function getCanonicalUrl(doc: CatalogDocument): string {
  return `${BASE_URL}/documents/${doc.category}/${doc.slug}`
}

/** Fallback for pages that don't have a full CatalogDocument */
export function getCanonicalUrlByParts(category: string, slug: string): string {
  return `${BASE_URL}/documents/${category}/${slug}`
}
