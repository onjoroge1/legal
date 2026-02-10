/**
 * Template Categories Constants
 * Defines available document template categories
 */

export interface Template {
  id: string
  code: string
  name: string
  description: string
  category: string
}

export interface TemplateCategory {
  id: string
  name: string
  slug: string
  description: string
  templates: Template[]
}

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  {
    id: "1",
    name: "Business Documents",
    slug: "business",
    description: "Legal documents for business operations",
    templates: [
      {
        id: "1",
        code: "nda",
        name: "Non-Disclosure Agreement",
        description: "Protect confidential information",
        category: "business"
      },
      {
        id: "2",
        code: "llc_operating_agreement",
        name: "LLC Operating Agreement",
        description: "Operating agreement for LLCs",
        category: "business"
      }
    ]
  },
  {
    id: "2",
    name: "Employment",
    slug: "employment",
    description: "Employment and HR documents",
    templates: []
  },
  {
    id: "3",
    name: "Real Estate",
    slug: "real-estate",
    description: "Real estate contracts and agreements",
    templates: []
  },
  {
    id: "4",
    name: "Personal",
    slug: "personal",
    description: "Personal legal documents",
    templates: []
  }
]

