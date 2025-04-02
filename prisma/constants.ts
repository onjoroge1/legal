export interface Template {
  id: string
  name: string
  description: string
  type?: string
  category?: string
}

export interface TemplateCategory {
  id: string
  name: string
  description: string
  templates: Template[]
}

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  {
    id: "employment",
    name: "Employment & HR",
    description: "Employment contracts, offer letters, NDAs, and other HR documents",
    templates: [
      {
        id: "standard-employment",
        name: "Standard Employment Agreement",
        description: "Full-time employment contract with standard terms",
        type: "contract",
        category: "employment"
      },
      {
        id: "contractor-agreement",
        name: "Independent Contractor Agreement",
        description: "Contract for freelancers and contractors",
        type: "contract",
        category: "employment"
      },
      {
        id: "nda-agreement",
        name: "Non-Disclosure Agreement",
        description: "Confidentiality agreement for employees",
        type: "agreement",
        category: "employment"
      }
    ]
  },
  {
    id: "business",
    name: "Business Formation",
    description: "Company formation, partnership agreements, and corporate documents",
    templates: [
      {
        id: "llc-formation",
        name: "LLC Formation",
        description: "Limited Liability Company formation documents",
      },
      {
        id: "partnership-agreement",
        name: "Partnership Agreement",
        description: "General partnership agreement template",
      }
    ]
  },
  {
    id: "real-estate",
    name: "Real Estate",
    description: "Legal documents for real estate transactions",
    templates: [
      {
        id: "apartment-lease",
        name: "Apartment Lease",
        description: "Standard apartment lease agreement",
        type: "lease",
        category: "real-estate",
      },
      {
        id: "lease-termination",
        name: "Lease Termination",
        description: "Notice to terminate a lease agreement",
        type: "notice",
        category: "real-estate",
      },
      {
        id: "rental-application",
        name: "Rental Application",
        description: "Standard rental application form",
        type: "application",
        category: "real-estate",
      }
    ]
  },
  {
    id: "intellectual-property",
    name: "Intellectual Property",
    description: "IP assignments, licensing agreements, and patents",
    templates: [
      {
        id: "ip-assignment",
        name: "IP Assignment Agreement",
        description: "Transfer intellectual property rights",
      },
      {
        id: "license-agreement",
        name: "License Agreement",
        description: "License intellectual property to others",
      }
    ]
  },
  {
    id: "contracts",
    name: "General Contracts",
    description: "Service agreements, sales contracts, and general business contracts",
    templates: [
      {
        id: "service-agreement",
        name: "Service Agreement",
        description: "General service provider agreement",
      },
      {
        id: "sales-contract",
        name: "Sales Contract",
        description: "Product or service sales agreement",
      }
    ]
  },
  {
    id: "corporate",
    name: "Corporate Governance",
    description: "Board resolutions, bylaws, and corporate policies",
    templates: [
      {
        id: "board-resolution",
        name: "Board Resolution",
        description: "Standard board meeting resolution",
      },
      {
        id: "corporate-bylaws",
        name: "Corporate Bylaws",
        description: "Company bylaws template",
      }
    ]
  },
  {
    id: "partnerships",
    name: "Partnerships & Joint Ventures",
    description: "Joint venture agreements, partnership dissolutions, and profit sharing",
    templates: [
      {
        id: "joint-venture",
        name: "Joint Venture Agreement",
        description: "Establish terms for business collaboration",
      },
      {
        id: "profit-sharing",
        name: "Profit Sharing Agreement",
        description: "Define profit distribution terms",
      }
    ]
  },
  {
    id: "family",
    name: "Family & Personal",
    description: "Wills, trusts, power of attorney, and family agreements",
    templates: [
      {
        id: "last-will",
        name: "Last Will and Testament",
        description: "Basic will template",
      },
      {
        id: "power-of-attorney",
        name: "Power of Attorney",
        description: "Authorize legal representation",
      }
    ]
  }
] 