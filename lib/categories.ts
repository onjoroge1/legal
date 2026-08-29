import {
  Building2,
  Briefcase,
  Home,
  ScrollText,
  Mail,
  DollarSign,
  User,
} from "lucide-react"
import type { CategoryId } from "./document-catalog"

export interface CategoryMeta {
  id: CategoryId
  label: string
  shortLabel: string
  description: string
  /** Used in page titles and headings */
  heading: string
  icon: typeof Building2
  color: "primary" | "accent"
  /** SEO meta description for the category hub page */
  seoDescription: string
  seoTitle: string
  keywords: string[]
}

export const categories: CategoryMeta[] = [
  {
    id: "business",
    label: "Business",
    shortLabel: "Business",
    heading: "Business Legal Documents",
    description:
      "NDAs, operating agreements, service contracts, purchase agreements, and partnership documents for companies of all sizes.",
    icon: Building2,
    color: "primary",
    seoTitle: "Business Legal Documents — Create Online | LegalLawDocs.com",
    seoDescription:
      "Create AI-assisted business document drafts online — NDAs, LLC operating agreements, service agreements, purchase agreements, and partnership contracts. State-aware inputs; attorney review required.",
    keywords: [
      "business legal documents",
      "business contracts online",
      "nda template",
      "llc operating agreement",
      "service agreement",
      "purchase agreement",
    ],
  },
  {
    id: "employment",
    label: "Employment",
    shortLabel: "Employment",
    heading: "Employment Legal Documents",
    description:
      "Employment contract, independent contractor, and non-compete drafts with state-aware questions and review notes.",
    icon: Briefcase,
    color: "accent",
    seoTitle: "Employment Legal Documents — Create Online | LegalLawDocs.com",
    seoDescription:
      "Create employment legal documents online — employment contracts, contractor agreements, and non-compete agreements. State-specific provisions, AI-powered, instant download.",
    keywords: [
      "employment contract template",
      "independent contractor agreement",
      "non-compete agreement",
      "employment legal documents",
    ],
  },
  {
    id: "real-estate",
    label: "Real Estate",
    shortLabel: "Real Estate",
    heading: "Real Estate Legal Documents",
    description:
      "Residential and commercial lease agreements with mandatory state disclosures, tenant rights provisions, and CAM charge clauses.",
    icon: Home,
    color: "primary",
    seoTitle: "Real Estate Legal Documents — Create Online | LegalLawDocs.com",
    seoDescription:
      "Create real estate document drafts online — residential and commercial lease workflows with state-aware questions and disclosure review notes.",
    keywords: [
      "residential lease agreement",
      "commercial lease agreement",
      "rental agreement template",
      "real estate legal documents",
    ],
  },
  {
    id: "estate-planning",
    label: "Estate Planning",
    shortLabel: "Estate",
    heading: "Estate Planning Documents",
    description:
      "Powers of attorney and wills that meet your state's witness, notarization, and signature requirements.",
    icon: ScrollText,
    color: "accent",
    seoTitle: "Estate Planning Documents — Create Online | LegalLawDocs.com",
    seoDescription:
      "Create estate planning documents online — power of attorney and last will & testament with state-specific witness and notarization requirements. Instant download.",
    keywords: [
      "power of attorney",
      "last will and testament",
      "estate planning documents",
      "make a will online",
    ],
  },
  {
    id: "legal-letters",
    label: "Legal Letters",
    shortLabel: "Letters",
    heading: "Legal Letters & Notices",
    description:
      "Cease-and-desist letters, demand letters, breach-of-contract notices, and other formal legal correspondence.",
    icon: Mail,
    color: "primary",
    seoTitle: "Legal Letters & Notices — Create Online | LegalLawDocs.com",
    seoDescription:
      "Create AI-assisted legal-letter drafts online — cease-and-desist letters, demand letters, and breach-of-contract notices. Attorney review required before sending.",
    keywords: [
      "cease and desist letter",
      "demand letter template",
      "legal letter generator",
      "breach of contract notice",
    ],
  },
  {
    id: "financial",
    label: "Financial",
    shortLabel: "Financial",
    heading: "Financial & Loan Documents",
    description:
      "Promissory notes, loan agreements, and debt settlement documents with proper disclosure and repayment schedules.",
    icon: DollarSign,
    color: "accent",
    seoTitle: "Financial & Loan Documents — Create Online | LegalLawDocs.com",
    seoDescription:
      "Create financial legal documents online — promissory notes, personal loan agreements, and debt settlement letters with proper disclosures. AI-powered, instant download.",
    keywords: [
      "promissory note template",
      "loan agreement",
      "debt settlement letter",
      "financial legal documents",
    ],
  },
  {
    id: "personal",
    label: "Personal",
    shortLabel: "Personal",
    heading: "Personal Legal Documents",
    description:
      "Roommate agreements, bill of sale, personal property agreements, and other everyday legal documents for individuals.",
    icon: User,
    color: "primary",
    seoTitle: "Personal Legal Documents — Create Online | LegalLawDocs.com",
    seoDescription:
      "Create AI-assisted personal document drafts online — roommate agreements, bills of sale, and other individual forms. State-aware inputs; attorney review required.",
    keywords: [
      "roommate agreement template",
      "bill of sale",
      "personal legal documents",
      "individual legal forms",
    ],
  },
]

/** O(1) lookup by category id */
const categoryMap = new Map<CategoryId, CategoryMeta>(
  categories.map((c) => [c.id, c])
)

export function getCategoryMeta(id: CategoryId): CategoryMeta | undefined {
  return categoryMap.get(id)
}

/** All valid category ids */
export const categoryIds: CategoryId[] = categories.map((c) => c.id)
