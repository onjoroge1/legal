/**
 * Intent Registry
 * Maps document types to their available intents
 */

export interface Intent {
  id: string
  name: string
  description: string
  metadata?: Record<string, any>
}

export const INTENT_REGISTRY: Record<string, Intent[]> = {
  nda: [
    {
      id: "mutual",
      name: "Mutual NDA",
      description: "Both parties share confidential information",
    },
    {
      id: "unilateral",
      name: "Unilateral NDA",
      description: "Only one party shares confidential information",
    },
  ],
  employment_contract: [
    {
      id: "at_will",
      name: "At-Will Employment",
      description: "Employment can be terminated by either party at any time",
    },
    {
      id: "fixed_term",
      name: "Fixed-Term Contract",
      description: "Employment for a specific duration with defined end date",
    },
    {
      id: "executive",
      name: "Executive Contract",
      description: "High-level executive employment with additional benefits",
    },
    {
      id: "contract_to_hire",
      name: "Contract-to-Hire",
      description: "Temporary contract with potential for permanent employment",
    },
  ],
  residential_lease_agreement: [
    {
      id: "single_tenant",
      name: "Single Tenant",
      description: "Lease agreement for one tenant",
    },
    {
      id: "multi_tenant",
      name: "Multiple Tenants",
      description: "Lease agreement for multiple tenants (roommates, family)",
    },
    {
      id: "furnished",
      name: "Furnished Rental",
      description: "Lease includes furnished property",
    },
  ],
  llc_operating_agreement: [
    {
      id: "single_member",
      name: "Single-Member LLC",
      description: "LLC with one owner",
    },
    {
      id: "multi_member",
      name: "Multi-Member LLC",
      description: "LLC with multiple owners/members",
    },
    {
      id: "manager_managed",
      name: "Manager-Managed",
      description: "LLC managed by designated managers",
    },
  ],
  independent_contractor_agreement: [
    {
      id: "project_based",
      name: "Project-Based",
      description: "Contract for a specific project or deliverable",
    },
    {
      id: "ongoing",
      name: "Ongoing Services",
      description: "Continuous service agreement with no fixed end date",
    },
    {
      id: "hourly",
      name: "Hourly Rate",
      description: "Payment based on hours worked",
    },
  ],
  partnership_agreement: [
    {
      id: "equal_split",
      name: "Equal Split",
      description: "Partners share ownership and profits equally",
    },
    {
      id: "unequal_split",
      name: "Unequal Split",
      description: "Partners share ownership and profits by agreed percentages",
    },
  ],
  power_of_attorney: [
    {
      id: "general",
      name: "General POA",
      description: "Broad authority over financial and legal matters",
    },
    {
      id: "limited",
      name: "Limited POA",
      description: "Authority limited to specific acts or timeframe",
    },
    {
      id: "healthcare",
      name: "Healthcare POA",
      description: "Authority over healthcare decisions",
    },
  ],
  last_will_testament: [
    {
      id: "simple",
      name: "Simple Will",
      description: "Basic will with asset distribution",
    },
    {
      id: "guardian",
      name: "Will with Guardianship",
      description: "Includes guardianship provisions for minors",
    },
  ],
  commercial_lease_agreement: [
    {
      id: "gross",
      name: "Gross Lease",
      description: "Landlord covers most property expenses",
    },
    {
      id: "net",
      name: "Net Lease",
      description: "Tenant covers some or all property expenses",
    },
  ],
  service_agreement: [
    {
      id: "fixed_fee",
      name: "Fixed Fee",
      description: "Single fee for defined services",
    },
    {
      id: "retainer",
      name: "Retainer",
      description: "Ongoing services with recurring payments",
    },
  ],
  purchase_agreement: [
    {
      id: "asset",
      name: "Asset Purchase",
      description: "Purchase of assets or goods",
    },
    {
      id: "service",
      name: "Service Purchase",
      description: "Purchase of services or deliverables",
    },
  ],
  non_compete_agreement: [
    {
      id: "employee",
      name: "Employee Non-Compete",
      description: "Restrictions tied to employment",
    },
    {
      id: "contractor",
      name: "Contractor Non-Compete",
      description: "Restrictions tied to contractor engagement",
    },
  ],
}

/**
 * Get intents for a document slug
 */
export function getIntentsForDocument(slug: string): Intent[] {
  return INTENT_REGISTRY[slug] || []
}

/**
 * Get intent by ID for a document
 */
export function getIntentForDocument(slug: string, intentId: string): Intent | undefined {
  const intents = getIntentsForDocument(slug)
  return intents.find((intent) => intent.id === intentId)
}
