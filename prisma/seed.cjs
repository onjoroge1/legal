const { PrismaClient } = require("@prisma/client")
const { hash } = require("bcryptjs")

const prisma = new PrismaClient()

const documentTypes = [
  {
    title: "Non-Disclosure Agreement",
    slug: "nda",
    category: "business",
    description: "Protect confidential information shared between parties.",
  },
  {
    title: "LLC Operating Agreement",
    slug: "llc_operating_agreement",
    category: "business",
    description: "Define ownership structure and operating procedures for your LLC.",
  },
  {
    title: "Employment Contract",
    slug: "employment_contract",
    category: "employment",
    description: "Comprehensive employment agreements with state-specific provisions.",
  },
  {
    title: "Residential Lease Agreement",
    slug: "residential_lease_agreement",
    category: "real-estate",
    description: "Legally binding lease agreements compliant with local tenant laws.",
  },
  {
    title: "Independent Contractor Agreement",
    slug: "independent_contractor_agreement",
    category: "employment",
    description: "Define the terms of engagement with freelancers and contractors.",
  },
  {
    title: "Partnership Agreement",
    slug: "partnership_agreement",
    category: "business",
    description: "Establish clear terms for business partnerships and profit sharing.",
  },
  {
    title: "Power of Attorney",
    slug: "power_of_attorney",
    category: "personal",
    description: "Authorize someone to act on your behalf in legal or financial matters.",
  },
  {
    title: "Last Will & Testament",
    slug: "last_will_testament",
    category: "personal",
    description: "Protect your legacy with a state-compliant will document.",
  },
  {
    title: "Commercial Lease Agreement",
    slug: "commercial_lease_agreement",
    category: "real-estate",
    description: "Professional commercial property lease with full legal protections.",
  },
  {
    title: "Service Agreement",
    slug: "service_agreement",
    category: "business",
    description: "Define terms for professional services and deliverables.",
  },
  {
    title: "Purchase Agreement",
    slug: "purchase_agreement",
    category: "business",
    description: "Legally binding purchase agreements for goods and services.",
  },
  {
    title: "Non-Compete Agreement",
    slug: "non_compete_agreement",
    category: "employment",
    description: "Protect your business with enforceable non-compete clauses.",
  },
]

const INTENT_REGISTRY = {
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
      description: "Lease agreement for multiple tenants",
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

const CATEGORY_MAP = {
  business: {
    name: "Business",
    description: "Business and commercial legal documents",
  },
  "real-estate": {
    name: "Real Estate",
    description: "Lease agreements and property-related documents",
  },
  employment: {
    name: "Employment",
    description: "Employment contracts and HR documents",
  },
  personal: {
    name: "Personal",
    description: "Personal legal documents",
  },
}

const COMMON_STATE_QUESTION = {
  label: "State/Jurisdiction",
  type: "state",
  required: true,
  section: "Basic Information",
  helpText: "Used to apply state-specific legal provisions",
}

function getIntentsForDocument(slug) {
  return INTENT_REGISTRY[slug] || []
}

function getTemplateContent(slug) {
  switch (slug) {
    case "nda":
      return `
NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into on {contractDate}, between:

{disclosingParty} ("Disclosing Party")
and
{receivingParty} ("Receiving Party")

1. Purpose
The parties are engaged in discussions regarding {relationship} (the "Purpose").

2. Definition of Confidential Information
{confidentialInfo}

3. Obligations of Receiving Party
The Receiving Party agrees to hold Confidential Information in strict confidence and use it only for the Purpose.

4. Exclusions
Confidential Information does not include information that is public, independently developed, or rightfully received.

5. Term
This Agreement shall remain in effect for {duration}.

6. Return of Materials
All Confidential Information shall be returned or destroyed upon request.

7. Non-Solicitation
{nonSolicitation}

8. Non-Compete
{nonCompete}

9. Remedies and Injunctive Relief
The Disclosing Party may seek injunctive relief in case of breach.

10. Governing Law
This Agreement is governed by the laws of the State of {state}.

11. Miscellaneous
Entire agreement, amendments, severability, and waiver provisions apply.

Additional Provisions:
{additional}
`.trim()
    case "llc_operating_agreement":
      return `
LLC OPERATING AGREEMENT

This Operating Agreement is entered into on {contractDate} for {companyName}, a limited liability company formed in {state}.

1. Members and Ownership
{members}

2. Ownership Structure
{ownershipStructure}

3. Management
{managementType}

4. Capital Contributions
{capitalContributions}

5. Distributions
{distributions}

6. Meetings and Voting
{meetingFrequency}

7. Transfer of Interests
No transfer without consent unless otherwise stated.

8. Dissolution
The LLC may be dissolved by member vote.

9. Governing Law
This Agreement is governed by the laws of the State of {state}.

Additional Provisions:
{additional}
`.trim()
    case "employment_contract":
      return `
EMPLOYMENT CONTRACT

This Employment Contract is entered into on {contractDate}, between {employerName} ("Employer") and {employeeName} ("Employee").

1. Position
{positionTitle}

2. Start Date
{startDate}

3. Compensation
{compensation}

4. Employment Type
{employmentType}

5. Term (if applicable)
{termLength}

6. Benefits/Bonus (if applicable)
{benefitsBonus}

7. Confidentiality and IP
Employee agrees to confidentiality and IP assignment as required.

8. Termination
Termination provisions apply per state law and agreement terms.

9. Governing Law
This Contract is governed by the laws of the State of {state}.
`.trim()
    case "residential_lease_agreement":
      return `
RESIDENTIAL LEASE AGREEMENT

This Lease is entered into on {contractDate} between {landlordName} ("Landlord") and {tenantName} ("Tenant").

1. Property
{propertyAddress}

2. Term
Start Date: {leaseStartDate}
End Date: {leaseEndDate}

3. Rent
{rentAmount}

4. Security Deposit
{securityDeposit}

5. Pet Policy
{petPolicy}

6. Furnishings (if applicable)
{furnishings}

7. Maintenance and Repairs
Tenant and Landlord responsibilities apply as required by law.

8. Entry and Inspection
Landlord will provide notice as required by law.

9. Governing Law
This Lease is governed by the laws of the State of {state}.
`.trim()
    case "independent_contractor_agreement":
      return `
INDEPENDENT CONTRACTOR AGREEMENT

This Agreement is entered into on {contractDate} between {clientName} ("Client") and {contractorName} ("Contractor").

1. Services
{services}

2. Payment Terms
{paymentTerms}

3. Term
{term}

4. Intellectual Property
{ipOwnership}

5. Confidentiality
{confidentiality}

6. Independent Contractor Status
Contractor is not an employee and is responsible for taxes.

7. Termination
Either party may terminate as provided herein.

8. Governing Law
This Agreement is governed by the laws of the State of {state}.
`.trim()
    case "partnership_agreement":
      return `
PARTNERSHIP AGREEMENT

This Agreement is entered into on {contractDate} between {partnerA} and {partnerB}.

1. Purpose
{businessPurpose}

2. Contributions
{capitalContributions}

3. Profit/Loss Sharing
{profitSplit}

4. Management
{managementRoles}

5. Term
{term}

6. Dispute Resolution
Partners agree to resolve disputes in good faith and mediation where possible.

7. Dissolution
The partnership may be dissolved by mutual agreement.

8. Governing Law
This Agreement is governed by the laws of the State of {state}.
`.trim()
    case "power_of_attorney":
      return `
POWER OF ATTORNEY

This Power of Attorney is executed on {contractDate} by {principalName} ("Principal").

1. Agent
{agentName}

2. Powers Granted
{powersGranted}

3. Effective Date
{effectiveDate}

4. Durability
{durable}

5. Revocation
This Power of Attorney may be revoked in writing by the Principal.

6. Governing Law
This document is governed by the laws of the State of {state}.
`.trim()
    case "last_will_testament":
      return `
LAST WILL AND TESTAMENT

I, {testatorName}, residing in {state}, declare this to be my Last Will and Testament.

1. Executor
{executorName}

2. Beneficiaries
{beneficiaries}

3. Guardianship (if applicable)
{guardianship}

4. Debts and Taxes
Debts and taxes shall be paid from the estate before distributions.

5. Governing Law
This Will is governed by the laws of the State of {state}.
`.trim()
    case "commercial_lease_agreement":
      return `
COMMERCIAL LEASE AGREEMENT

This Lease is entered into on {contractDate} between {landlordName} and {tenantName}.

1. Property
{propertyAddress}

2. Permitted Use
{permittedUse}

3. Rent
{rentAmount}

4. Term
{term}

5. CAM Charges
{camCharges}

6. Insurance
Tenant shall maintain insurance as required.

7. Default and Remedies
Default provisions apply as stated herein.

8. Governing Law
This Lease is governed by the laws of the State of {state}.
`.trim()
    case "service_agreement":
      return `
SERVICE AGREEMENT

This Agreement is entered into on {contractDate} between {providerName} ("Provider") and {clientName} ("Client").

1. Services
{services}

2. Fees
{fees}

3. Term
{term}

4. Intellectual Property
{ipOwnership}

5. Liability
{liability}

6. Confidentiality
Provider and Client shall protect confidential information.

7. Termination
Either party may terminate as provided herein.

8. Governing Law
This Agreement is governed by the laws of the State of {state}.
`.trim()
    case "purchase_agreement":
      return `
PURCHASE AGREEMENT

This Agreement is entered into on {contractDate} between {buyerName} ("Buyer") and {sellerName} ("Seller").

1. Purchase Item
{itemDescription}

2. Purchase Price
{purchasePrice}

3. Closing Date
{closingDate}

4. Representations and Warranties
Each party represents it has authority to enter this Agreement.

5. Governing Law
This Agreement is governed by the laws of the State of {state}.
`.trim()
    case "non_compete_agreement":
      return `
NON-COMPETE AGREEMENT

This Agreement is entered into on {contractDate} between {employerName} and {employeeName}.

1. Restricted Activities
{restrictedActivities}

2. Duration
{duration}

3. Geographic Scope
{geography}

4. Consideration
{consideration}

5. Enforceability
This Agreement is subject to state law limitations on restrictive covenants.

6. Governing Law
This Agreement is governed by the laws of the State of {state}.
`.trim()
    default:
      return `
LEGAL DOCUMENT

This document is entered into on {contractDate}.

1. Parties
{partyA} and {partyB}

2. Terms
{terms}

3. Governing Law
This document is governed by the laws of the State of {state}.
`.trim()
  }
}

function getBaseQuestions(slug) {
  switch (slug) {
    case "nda":
      return [
        { ...COMMON_STATE_QUESTION, id: "state" },
        {
          id: "disclosingParty",
          label: "Disclosing Party Name",
          type: "text",
          required: true,
          section: "Parties",
          placeholder: "Full legal name",
        },
        {
          id: "receivingParty",
          label: "Receiving Party Name",
          type: "text",
          required: true,
          section: "Parties",
          placeholder: "Full legal name",
        },
        {
          id: "relationship",
          label: "Business Relationship",
          type: "text",
          required: true,
          section: "Agreement Details",
          placeholder: "e.g., partnership discussions",
        },
        {
          id: "confidentialInfo",
          label: "Confidential Information",
          type: "textarea",
          required: true,
          section: "Agreement Details",
          placeholder: "Describe the confidential information",
        },
        {
          id: "duration",
          label: "Duration",
          type: "select",
          required: true,
          section: "Agreement Details",
          options: [
            { value: "1 year", label: "1 year" },
            { value: "2 years", label: "2 years" },
            { value: "3 years", label: "3 years" },
            { value: "5 years", label: "5 years" },
            { value: "indefinite", label: "Indefinite" },
          ],
        },
        {
          id: "nonSolicitation",
          label: "Include non-solicitation clause?",
          type: "radio",
          required: true,
          section: "Additional Clauses",
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ],
        },
        {
          id: "nonCompete",
          label: "Include non-compete clause?",
          type: "radio",
          required: true,
          section: "Additional Clauses",
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ],
        },
        {
          id: "additional",
          label: "Additional Provisions",
          type: "textarea",
          required: false,
          section: "Additional Clauses",
          placeholder: "Optional",
        },
      ]
    case "llc_operating_agreement":
      return [
        { ...COMMON_STATE_QUESTION, id: "state" },
        {
          id: "companyName",
          label: "LLC Name",
          type: "text",
          required: true,
          section: "Basic Information",
        },
        {
          id: "members",
          label: "Members",
          type: "textarea",
          required: true,
          section: "Members",
          placeholder: "List members and ownership percentages",
        },
        {
          id: "ownershipStructure",
          label: "Ownership Structure",
          type: "textarea",
          required: true,
          section: "Members",
        },
        {
          id: "managementType",
          label: "Management Type",
          type: "select",
          required: true,
          section: "Management",
          options: [
            { value: "member-managed", label: "Member-managed" },
            { value: "manager-managed", label: "Manager-managed" },
          ],
        },
        {
          id: "capitalContributions",
          label: "Capital Contributions",
          type: "textarea",
          required: true,
          section: "Financial Terms",
        },
        {
          id: "distributions",
          label: "Distributions",
          type: "textarea",
          required: true,
          section: "Financial Terms",
        },
        {
          id: "meetingFrequency",
          label: "Meeting Frequency",
          type: "text",
          required: false,
          section: "Management",
        },
        {
          id: "additional",
          label: "Additional Provisions",
          type: "textarea",
          required: false,
          section: "Additional Terms",
        },
      ]
    case "employment_contract":
      return [
        { ...COMMON_STATE_QUESTION, id: "state" },
        {
          id: "employerName",
          label: "Employer Name",
          type: "text",
          required: true,
          section: "Parties",
        },
        {
          id: "employeeName",
          label: "Employee Name",
          type: "text",
          required: true,
          section: "Parties",
        },
        {
          id: "positionTitle",
          label: "Position Title",
          type: "text",
          required: true,
          section: "Employment Details",
        },
        {
          id: "startDate",
          label: "Start Date",
          type: "text",
          required: true,
          section: "Employment Details",
        },
        {
          id: "compensation",
          label: "Compensation",
          type: "text",
          required: true,
          section: "Compensation",
          placeholder: "e.g., $80,000/year",
        },
        {
          id: "employmentType",
          label: "Employment Type",
          type: "select",
          required: true,
          section: "Employment Details",
          options: [
            { value: "at-will", label: "At-will" },
            { value: "fixed-term", label: "Fixed-term" },
          ],
        },
        {
          id: "termLength",
          label: "Term Length (if fixed-term)",
          type: "text",
          required: false,
          section: "Employment Details",
        },
        {
          id: "benefitsBonus",
          label: "Benefits / Bonus",
          type: "textarea",
          required: false,
          section: "Compensation",
        },
      ]
    case "residential_lease_agreement":
      return [
        { ...COMMON_STATE_QUESTION, id: "state" },
        {
          id: "landlordName",
          label: "Landlord Name",
          type: "text",
          required: true,
          section: "Parties",
        },
        {
          id: "tenantName",
          label: "Tenant Name",
          type: "text",
          required: true,
          section: "Parties",
        },
        {
          id: "propertyAddress",
          label: "Property Address",
          type: "text",
          required: true,
          section: "Property Details",
        },
        {
          id: "rentAmount",
          label: "Monthly Rent",
          type: "text",
          required: true,
          section: "Financial Terms",
        },
        {
          id: "leaseStartDate",
          label: "Lease Start Date",
          type: "text",
          required: true,
          section: "Lease Terms",
        },
        {
          id: "leaseEndDate",
          label: "Lease End Date",
          type: "text",
          required: true,
          section: "Lease Terms",
        },
        {
          id: "securityDeposit",
          label: "Security Deposit",
          type: "text",
          required: true,
          section: "Financial Terms",
        },
        {
          id: "petPolicy",
          label: "Pet Policy",
          type: "text",
          required: false,
          section: "Additional Terms",
        },
      ]
    case "independent_contractor_agreement":
      return [
        { ...COMMON_STATE_QUESTION, id: "state" },
        {
          id: "clientName",
          label: "Client Name",
          type: "text",
          required: true,
          section: "Parties",
        },
        {
          id: "contractorName",
          label: "Contractor Name",
          type: "text",
          required: true,
          section: "Parties",
        },
        {
          id: "services",
          label: "Services",
          type: "textarea",
          required: true,
          section: "Services",
        },
        {
          id: "paymentTerms",
          label: "Payment Terms",
          type: "text",
          required: true,
          section: "Payment",
        },
        {
          id: "term",
          label: "Term",
          type: "text",
          required: true,
          section: "Term",
        },
        {
          id: "ipOwnership",
          label: "IP Ownership",
          type: "text",
          required: false,
          section: "Intellectual Property",
        },
        {
          id: "confidentiality",
          label: "Confidentiality",
          type: "text",
          required: false,
          section: "Confidentiality",
        },
      ]
    case "partnership_agreement":
      return [
        { ...COMMON_STATE_QUESTION, id: "state" },
        {
          id: "partnerA",
          label: "Partner A Name",
          type: "text",
          required: true,
          section: "Parties",
        },
        {
          id: "partnerB",
          label: "Partner B Name",
          type: "text",
          required: true,
          section: "Parties",
        },
        {
          id: "businessPurpose",
          label: "Business Purpose",
          type: "textarea",
          required: true,
          section: "Purpose",
        },
        {
          id: "capitalContributions",
          label: "Capital Contributions",
          type: "textarea",
          required: true,
          section: "Financial Terms",
        },
        {
          id: "profitSplit",
          label: "Profit/Loss Split",
          type: "text",
          required: true,
          section: "Financial Terms",
        },
        {
          id: "managementRoles",
          label: "Management Roles",
          type: "textarea",
          required: false,
          section: "Management",
        },
        {
          id: "term",
          label: "Term",
          type: "text",
          required: false,
          section: "Term",
        },
      ]
    case "power_of_attorney":
      return [
        { ...COMMON_STATE_QUESTION, id: "state" },
        {
          id: "principalName",
          label: "Principal Name",
          type: "text",
          required: true,
          section: "Parties",
        },
        {
          id: "agentName",
          label: "Agent Name",
          type: "text",
          required: true,
          section: "Parties",
        },
        {
          id: "powersGranted",
          label: "Powers Granted",
          type: "textarea",
          required: true,
          section: "Powers",
        },
        {
          id: "effectiveDate",
          label: "Effective Date",
          type: "text",
          required: true,
          section: "Effective Date",
        },
        {
          id: "durable",
          label: "Is this durable?",
          type: "radio",
          required: true,
          section: "Powers",
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ],
        },
      ]
    case "last_will_testament":
      return [
        { ...COMMON_STATE_QUESTION, id: "state" },
        {
          id: "testatorName",
          label: "Testator Name",
          type: "text",
          required: true,
          section: "Basic Information",
        },
        {
          id: "executorName",
          label: "Executor Name",
          type: "text",
          required: true,
          section: "Executor",
        },
        {
          id: "beneficiaries",
          label: "Beneficiaries",
          type: "textarea",
          required: true,
          section: "Beneficiaries",
        },
        {
          id: "guardianship",
          label: "Guardianship (if applicable)",
          type: "textarea",
          required: false,
          section: "Additional Terms",
        },
      ]
    case "commercial_lease_agreement":
      return [
        { ...COMMON_STATE_QUESTION, id: "state" },
        {
          id: "landlordName",
          label: "Landlord Name",
          type: "text",
          required: true,
          section: "Parties",
        },
        {
          id: "tenantName",
          label: "Tenant Name",
          type: "text",
          required: true,
          section: "Parties",
        },
        {
          id: "propertyAddress",
          label: "Property Address",
          type: "text",
          required: true,
          section: "Property Details",
        },
        {
          id: "permittedUse",
          label: "Permitted Use",
          type: "text",
          required: true,
          section: "Lease Terms",
        },
        {
          id: "rentAmount",
          label: "Rent Amount",
          type: "text",
          required: true,
          section: "Financial Terms",
        },
        {
          id: "term",
          label: "Term",
          type: "text",
          required: true,
          section: "Lease Terms",
        },
        {
          id: "camCharges",
          label: "CAM Charges",
          type: "text",
          required: false,
          section: "Financial Terms",
        },
      ]
    case "service_agreement":
      return [
        { ...COMMON_STATE_QUESTION, id: "state" },
        {
          id: "providerName",
          label: "Provider Name",
          type: "text",
          required: true,
          section: "Parties",
        },
        {
          id: "clientName",
          label: "Client Name",
          type: "text",
          required: true,
          section: "Parties",
        },
        {
          id: "services",
          label: "Services",
          type: "textarea",
          required: true,
          section: "Services",
        },
        {
          id: "fees",
          label: "Fees",
          type: "text",
          required: true,
          section: "Payment",
        },
        {
          id: "term",
          label: "Term",
          type: "text",
          required: true,
          section: "Term",
        },
        {
          id: "ipOwnership",
          label: "IP Ownership",
          type: "text",
          required: false,
          section: "Intellectual Property",
        },
        {
          id: "liability",
          label: "Liability Terms",
          type: "textarea",
          required: false,
          section: "Liability",
        },
      ]
    case "purchase_agreement":
      return [
        { ...COMMON_STATE_QUESTION, id: "state" },
        {
          id: "buyerName",
          label: "Buyer Name",
          type: "text",
          required: true,
          section: "Parties",
        },
        {
          id: "sellerName",
          label: "Seller Name",
          type: "text",
          required: true,
          section: "Parties",
        },
        {
          id: "itemDescription",
          label: "Item/Property Description",
          type: "textarea",
          required: true,
          section: "Purchase Details",
        },
        {
          id: "purchasePrice",
          label: "Purchase Price",
          type: "text",
          required: true,
          section: "Purchase Details",
        },
        {
          id: "closingDate",
          label: "Closing Date",
          type: "text",
          required: true,
          section: "Purchase Details",
        },
      ]
    case "non_compete_agreement":
      return [
        { ...COMMON_STATE_QUESTION, id: "state" },
        {
          id: "employerName",
          label: "Employer Name",
          type: "text",
          required: true,
          section: "Parties",
        },
        {
          id: "employeeName",
          label: "Employee Name",
          type: "text",
          required: true,
          section: "Parties",
        },
        {
          id: "restrictedActivities",
          label: "Restricted Activities",
          type: "textarea",
          required: true,
          section: "Restrictions",
        },
        {
          id: "duration",
          label: "Duration",
          type: "text",
          required: true,
          section: "Restrictions",
        },
        {
          id: "geography",
          label: "Geographic Scope",
          type: "text",
          required: true,
          section: "Restrictions",
        },
        {
          id: "consideration",
          label: "Consideration",
          type: "text",
          required: false,
          section: "Restrictions",
        },
      ]
    default:
      return [
        { ...COMMON_STATE_QUESTION, id: "state" },
        {
          id: "partyA",
          label: "Party A",
          type: "text",
          required: true,
          section: "Parties",
        },
        {
          id: "partyB",
          label: "Party B",
          type: "text",
          required: true,
          section: "Parties",
        },
        {
          id: "terms",
          label: "Terms",
          type: "textarea",
          required: true,
          section: "Terms",
        },
      ]
  }
}

function withIntentQuestions(slug, intentId, questions) {
  const extra = []

  if (slug === "employment_contract") {
    if (intentId === "fixed_term") {
      extra.push({
        id: "contractEndDate",
        label: "Contract End Date",
        type: "text",
        required: true,
        section: "Employment Details",
      })
    }
    if (intentId === "executive") {
      extra.push({
        id: "benefitsBonus",
        label: "Executive Benefits/Bonus",
        type: "textarea",
        required: false,
        section: "Compensation",
      })
    }
    if (intentId === "contract_to_hire") {
      extra.push({
        id: "conversionDate",
        label: "Conversion Date (if applicable)",
        type: "text",
        required: false,
        section: "Employment Details",
      })
    }
  }

  if (slug === "residential_lease_agreement") {
    if (intentId === "multi_tenant") {
      extra.push({
        id: "numberOfTenants",
        label: "Number of Tenants",
        type: "text",
        required: true,
        section: "Parties",
      })
    }
    if (intentId === "furnished") {
      extra.push({
        id: "furnishings",
        label: "Furnishings Included",
        type: "textarea",
        required: false,
        section: "Property Details",
      })
    }
  }

  if (slug === "llc_operating_agreement") {
    if (intentId === "single_member") {
      extra.push({
        id: "singleMemberName",
        label: "Single Member Name",
        type: "text",
        required: false,
        section: "Members",
      })
    }
    if (intentId === "multi_member") {
      extra.push({
        id: "numberOfMembers",
        label: "Number of Members",
        type: "text",
        required: false,
        section: "Members",
      })
    }
    if (intentId === "manager_managed") {
      extra.push({
        id: "managerName",
        label: "Manager Name",
        type: "text",
        required: false,
        section: "Management",
      })
    }
  }

  if (slug === "independent_contractor_agreement") {
    if (intentId === "hourly") {
      extra.push({
        id: "hourlyRate",
        label: "Hourly Rate",
        type: "text",
        required: true,
        section: "Payment",
      })
    }
    if (intentId === "project_based") {
      extra.push({
        id: "deliverables",
        label: "Deliverables",
        type: "textarea",
        required: false,
        section: "Services",
      })
    }
  }

  if (slug === "partnership_agreement") {
    if (intentId === "unequal_split") {
      extra.push({
        id: "ownershipPercentages",
        label: "Ownership Percentages",
        type: "textarea",
        required: true,
        section: "Financial Terms",
      })
    }
  }

  if (slug === "power_of_attorney") {
    if (intentId === "limited") {
      extra.push({
        id: "limitations",
        label: "Limitations / Scope",
        type: "textarea",
        required: true,
        section: "Powers",
      })
    }
    if (intentId === "healthcare") {
      extra.push({
        id: "healthcareScope",
        label: "Healthcare Decision Scope",
        type: "textarea",
        required: false,
        section: "Powers",
      })
    }
  }

  if (slug === "last_will_testament") {
    if (intentId === "guardian") {
      extra.push({
        id: "guardianName",
        label: "Guardian Name",
        type: "text",
        required: true,
        section: "Guardianship",
      })
    }
  }

  if (slug === "commercial_lease_agreement") {
    if (intentId === "net") {
      extra.push({
        id: "expenseResponsibilities",
        label: "Expense Responsibilities",
        type: "textarea",
        required: true,
        section: "Financial Terms",
      })
    }
  }

  if (slug === "service_agreement") {
    if (intentId === "retainer") {
      extra.push({
        id: "retainerAmount",
        label: "Retainer Amount",
        type: "text",
        required: true,
        section: "Payment",
      })
    }
  }

  if (slug === "purchase_agreement") {
    if (intentId === "asset") {
      extra.push({
        id: "assetDetails",
        label: "Asset Details",
        type: "textarea",
        required: false,
        section: "Purchase Details",
      })
    }
    if (intentId === "service") {
      extra.push({
        id: "serviceScope",
        label: "Service Scope",
        type: "textarea",
        required: false,
        section: "Purchase Details",
      })
    }
  }

  if (slug === "non_compete_agreement") {
    if (intentId === "contractor") {
      extra.push({
        id: "contractorRole",
        label: "Contractor Role",
        type: "text",
        required: false,
        section: "Parties",
      })
    }
  }

  return [...questions, ...extra]
}

function getTemplateVariables(questions) {
  const variables = {}
  questions.forEach((q) => {
    if (q.id) {
      variables[q.id] = { fieldId: q.id }
    }
  })
  variables.contractDate = { fieldId: "contractDate" }
  variables.state = { fieldId: "state" }
  return variables
}

function getAllQuestions(slug, baseQuestions, intents) {
  const combined = [...baseQuestions]
  intents.forEach((intent) => {
    const withIntent = withIntentQuestions(slug, intent.id, baseQuestions)
    withIntent.forEach((q) => {
      if (q.id && !combined.find((c) => c.id === q.id)) {
        combined.push(q)
      }
    })
  })
  return combined
}

async function main() {
  const seedMode = (process.env.SEED_MODE || "reset").toLowerCase()
  console.log(`Seeding database... (mode: ${seedMode})`)

  const categoryBySlug = {}
  for (const [slug, info] of Object.entries(CATEGORY_MAP)) {
    const existing = await prisma.category.findFirst({
      where: { slug },
      select: { id: true },
    })

    const category = existing
      ? await prisma.category.update({
          where: { id: existing.id },
          data: { name: info.name, description: info.description },
          select: { id: true },
        })
      : await prisma.category.create({
          data: { name: info.name, slug, description: info.description },
          select: { id: true },
        })

    categoryBySlug[slug] = category
  }

  const adminEmail = "admin@example.com"
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  })

  if (!existingAdmin) {
    const hashedPassword = await hash("admin123", 12)
    await prisma.user.create({
      data: {
        name: "Admin User",
        email: adminEmail,
        password: hashedPassword,
        isAdmin: true,
      },
    })
  }

  for (const doc of documentTypes) {
    const category = categoryBySlug[doc.category]
    if (!category) {
      console.warn(`No category found for ${doc.slug}`)
      continue
    }

    const intents = getIntentsForDocument(doc.slug)
    const baseQuestions = getBaseQuestions(doc.slug)
    const allQuestions = getAllQuestions(doc.slug, baseQuestions, intents)
    const templateContent = getTemplateContent(doc.slug)
    const variables = getTemplateVariables(allQuestions)

    let templateId
    const existingTemplate = await prisma.documentTemplate.findFirst({
      where: { slug: doc.slug, deletedAt: null },
      select: { id: true },
    })

    if (existingTemplate && seedMode === "missing") {
      templateId = existingTemplate.id
    } else {
      const template = await prisma.documentTemplate.upsert({
        where: { slug: doc.slug },
        update: {
          name: doc.title,
          type: doc.title,
          description: doc.description,
          content: templateContent,
          categoryId: category.id,
          metadata: intents.length > 0 ? { intents } : {},
          variables,
        },
        create: {
          name: doc.title,
          type: doc.title,
          description: doc.description,
          content: templateContent,
          categoryId: category.id,
          slug: doc.slug,
          metadata: intents.length > 0 ? { intents } : {},
          variables,
        },
        select: { id: true },
      })
      templateId = template.id
    }

    if (seedMode !== "missing") {
      await prisma.questionnaire.deleteMany({
        where: { templateId },
      })
    }

    if (intents.length === 0) {
      if (seedMode === "missing") {
        const existingCount = await prisma.questionnaire.count({
          where: { templateId },
        })
        if (existingCount > 0) {
          continue
        }
      }

      const questions = baseQuestions
      await prisma.questionnaire.create({
        data: {
          name: `${doc.title} Questionnaire`,
          description: `Standard questions for ${doc.title}`,
          templateId,
          metadata: { intent: "standard" },
          questions: {
            create: questions.map((q) => ({
              label: q.label,
              type: q.type,
              required: q.required,
              section: q.section,
              helpText: q.helpText,
              placeholder: q.placeholder,
              options: q.options
                ? {
                    create: q.options.map((opt) => ({
                      value: opt.value,
                      label: opt.label || opt.value,
                    })),
                  }
                : undefined,
            })),
          },
        },
      })
    } else {
      for (const intent of intents) {
        if (seedMode === "missing") {
          const existingCount = await prisma.questionnaire.count({
            where: {
              templateId,
              metadata: { path: ["intent"], equals: intent.id },
            },
          })
          if (existingCount > 0) {
            continue
          }
        }

        const questions = withIntentQuestions(doc.slug, intent.id, baseQuestions)
        await prisma.questionnaire.create({
          data: {
            name: intent.name,
            description: intent.description,
            templateId,
            metadata: { intent: intent.id },
            questions: {
              create: questions.map((q) => ({
                label: q.label,
                type: q.type,
                required: q.required,
                section: q.section,
                helpText: q.helpText,
                placeholder: q.placeholder,
                options: q.options
                  ? {
                      create: q.options.map((opt) => ({
                        value: opt.value,
                        label: opt.label || opt.value,
                      })),
                    }
                  : undefined,
              })),
            },
          },
        })
      }
    }
  }

  console.log("Seed completed.")
}

main()
  .catch((error) => {
    console.error("Seed error:", error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
