export interface DocumentSeo {
  title: string
  description: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  ogImageAlt: string
  keywords: string[]
}

const BASE_URL = "https://www.legallawdocs.com"
const DEFAULT_IMAGE = `${BASE_URL}/images/hero-legal.jpg`

const seoBySlug: Record<string, DocumentSeo> = {
  nda: {
    title: "NDA Template - Create a Non-Disclosure Agreement | LegalLawDocs.com",
    description:
      "Create a Non-Disclosure Agreement online in minutes. Protect confidential information with a state‑compliant NDA and instant download.",
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
  llc_operating_agreement: {
    title: "LLC Operating Agreement - Create Online | LegalLawDocs.com",
    description:
      "Create an LLC Operating Agreement online. Define ownership, management, and distributions with a state‑compliant template.",
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
  employment_contract: {
    title: "Employment Contract - Create Online | LegalLawDocs.com",
    description:
      "Create an employment contract online with state‑specific compliance. Define role, pay, benefits, and termination clearly.",
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
  residential_lease_agreement: {
    title: "Residential Lease Agreement - Create Online | LegalLawDocs.com",
    description:
      "Create a residential lease agreement online. Set rent, term, deposits, and policies with state‑compliant terms.",
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
  independent_contractor_agreement: {
    title: "Independent Contractor Agreement | LegalLawDocs.com",
    description:
      "Create an independent contractor agreement online. Define scope, payment, and IP ownership with state‑compliant terms.",
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
  partnership_agreement: {
    title: "Partnership Agreement - Create Online | LegalLawDocs.com",
    description:
      "Create a partnership agreement online. Define ownership, profit splits, and management with enforceable terms.",
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
  power_of_attorney: {
    title: "Power of Attorney - Create Online | LegalLawDocs.com",
    description:
      "Create a Power of Attorney online. Grant authority for legal or financial decisions with state‑specific requirements.",
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
  last_will_testament: {
    title: "Last Will & Testament - Make a Will | LegalLawDocs.com",
    description:
      "Make a Last Will & Testament online in minutes. Create a legally valid will with state‑specific requirements and instant download.",
    ogTitle: "Last Will & Testament - Make a Will Online",
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
  commercial_lease_agreement: {
    title: "Commercial Lease Agreement | LegalLawDocs.com",
    description:
      "Create a commercial lease agreement online. Define rent, term, CAM, and responsibilities with compliant terms.",
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
  service_agreement: {
    title: "Service Agreement - Create Online | LegalLawDocs.com",
    description:
      "Create a service agreement online. Define scope, fees, IP, and termination with professional terms.",
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
  purchase_agreement: {
    title: "Purchase Agreement - Create Online | LegalLawDocs.com",
    description:
      "Create a purchase agreement online. Document price, terms, closing, and warranties with clear language.",
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
  non_compete_agreement: {
    title: "Non-Compete Agreement - Create Online | LegalLawDocs.com",
    description:
      "Create a non‑compete agreement online with state‑specific limitations. Protect business interests with enforceable terms.",
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
}

export function getDocumentSeo(slug: string): DocumentSeo | null {
  return seoBySlug[slug] || null
}

export function getCanonicalUrl(slug: string): string {
  return `${BASE_URL}/documents/${slug}`
}
