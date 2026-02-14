/**
 * Document-specific content helpers
 * Provides dynamic content based on document type
 */

export interface DocumentContent {
  included: string[]
  description: string
}

export const DOCUMENT_CONTENT: Record<string, DocumentContent> = {
  nda: {
    included: [
      "Definition of Confidential Information",
      "Obligations of Receiving Party",
      "Term & Duration Clauses",
      "Exclusions from Confidential Information",
      "Return of Materials Provision",
      "Remedies & Injunctive Relief",
      "Non-Compete / Non-Solicitation (where legal)",
      "Governing Law & Jurisdiction",
      "Digital Signature Block",
      "State-Specific Compliance Addendum",
    ],
    description: "Protect confidential information shared between parties with a legally binding agreement.",
  },
  employment_contract: {
    included: [
      "Job Title & Description",
      "Compensation & Benefits",
      "Employment Terms (at-will or fixed-term)",
      "Work Schedule & Location",
      "Non-Compete & Non-Solicitation Clauses",
      "Intellectual Property Assignment",
      "Termination Provisions",
      "Confidentiality Obligations",
      "Dispute Resolution",
      "State-Specific Employment Laws",
    ],
    description: "Comprehensive employment agreements with state-specific provisions and clear terms.",
  },
  residential_lease_agreement: {
    included: [
      "Property Description & Address",
      "Lease Term & Renewal Options",
      "Rent Amount & Payment Terms",
      "Security Deposit Provisions",
      "Tenant & Landlord Responsibilities",
      "Maintenance & Repair Clauses",
      "Pet & Smoking Policies",
      "Early Termination Terms",
      "State Tenant Protection Laws",
      "Move-in/Move-out Inspection",
    ],
    description: "Legally binding lease agreements compliant with local tenant laws and regulations.",
  },
  llc_operating_agreement: {
    included: [
      "Member Information & Ownership",
      "Capital Contributions",
      "Profit & Loss Distribution",
      "Management Structure",
      "Voting Rights & Procedures",
      "Transfer of Membership Interests",
      "Dissolution Procedures",
      "Dispute Resolution",
      "State LLC Compliance",
      "Tax Treatment Provisions",
    ],
    description: "Define ownership structure and operating procedures for your LLC.",
  },
  independent_contractor_agreement: {
    included: [
      "Services & Deliverables",
      "Payment Terms & Schedule",
      "Independent Contractor Status",
      "Intellectual Property Rights",
      "Confidentiality Provisions",
      "Term & Termination",
      "Non-Compete Clauses (if applicable)",
      "Dispute Resolution",
      "Tax Obligations",
      "State Contractor Laws",
    ],
    description: "Define the terms of engagement with freelancers and contractors.",
  },
  partnership_agreement: {
    included: [
      "Partnership Structure",
      "Capital Contributions",
      "Profit & Loss Sharing",
      "Management & Decision Making",
      "Partner Roles & Responsibilities",
      "Dispute Resolution",
      "Admission & Withdrawal of Partners",
      "Dissolution Procedures",
      "State Partnership Laws",
      "Tax Considerations",
    ],
    description: "Establish clear terms for business partnerships and profit sharing.",
  },
  power_of_attorney: {
    included: [
      "Principal & Agent Information",
      "Scope of Authority",
      "Financial Powers",
      "Healthcare Powers (if applicable)",
      "Durable vs Non-Durable",
      "Limitations & Restrictions",
      "Successor Agent Provisions",
      "State-Specific Requirements",
      "Witness & Notarization",
      "Revocation Procedures",
    ],
    description: "Authorize someone to act on your behalf in legal or financial matters.",
  },
  last_will_testament: {
    included: [
      "Testator Information",
      "Asset Distribution",
      "Beneficiary Designations",
      "Executor Appointment",
      "Guardianship Provisions (if applicable)",
      "Debt & Tax Handling",
      "Contingency Plans",
      "State Probate Laws",
      "Witness Requirements",
      "Revocation Clauses",
    ],
    description: "Protect your legacy with a state-compliant will document.",
  },
  commercial_lease_agreement: {
    included: [
      "Property Description & Use",
      "Lease Term & Options",
      "Base Rent & Additional Charges",
      "Common Area Maintenance (CAM)",
      "Tenant Improvements",
      "Assignment & Subletting",
      "Default & Remedies",
      "Insurance Requirements",
      "State Commercial Lease Laws",
      "Renewal & Termination",
    ],
    description: "Professional commercial property lease with full legal protections.",
  },
  service_agreement: {
    included: [
      "Service Description & Scope",
      "Payment Terms & Schedule",
      "Performance Standards",
      "Intellectual Property Rights",
      "Confidentiality Provisions",
      "Term & Termination",
      "Liability & Indemnification",
      "Dispute Resolution",
      "State Service Laws",
      "Force Majeure Clauses",
    ],
    description: "Define terms for professional services and deliverables.",
  },
  purchase_agreement: {
    included: [
      "Parties & Property Description",
      "Purchase Price & Payment Terms",
      "Closing Date & Conditions",
      "Inspection & Due Diligence",
      "Title & Title Insurance",
      "Default & Remedies",
      "Contingencies",
      "State Purchase Laws",
      "Warranties & Representations",
      "Closing Procedures",
    ],
    description: "Legally binding purchase agreements for goods and services.",
  },
  non_compete_agreement: {
    included: [
      "Parties & Effective Date",
      "Geographic Restrictions",
      "Time Limitations",
      "Prohibited Activities",
      "Consideration Provisions",
      "Enforceability Clauses",
      "State-Specific Compliance",
      "Remedies for Breach",
      "Severability Provisions",
      "Governing Law",
    ],
    description: "Protect your business with enforceable non-compete clauses.",
  },
}

/**
 * Get content for a document by slug
 */
export function getDocumentContent(slug: string): DocumentContent {
  return DOCUMENT_CONTENT[slug] || {
    included: [
      "State-specific legal compliance",
      "Professional formatting",
      "All required legal sections",
      "Customized clauses based on your needs",
      "Digital signature ready",
      "PDF & DOCX formats",
    ],
    description: "Generate a professional, legally binding document tailored to your specific needs.",
  }
}
