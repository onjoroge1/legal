import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CategoryDef {
  slug: string;
  name: string;
  description: string;
}

interface QuestionOptionDef {
  value: string;
  label: string;
}

interface QuestionDef {
  id: string;
  label: string;
  type: "text" | "date" | "select" | "textarea" | "checkbox" | "number" | "radio" | "state";
  required: boolean;
  section: string;
  helpText?: string;
  placeholder?: string;
  options?: QuestionOptionDef[];
}

interface TemplateDef {
  slug: string;
  name: string;
  type: string;
  description: string;
  category: string;
  version: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords?: string;
  content?: string;
  questionnaires: QuestionnaireDef[];
}

interface QuestionnaireDef {
  name: string;
  description: string;
  metadata?: Record<string, unknown>;
  questions: QuestionDef[];
}

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

const CATEGORIES: CategoryDef[] = [
  {
    slug: "business",
    name: "Business",
    description: "Business formation, partnerships, and commercial legal documents",
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    description: "Lease agreements, property transfers, and real estate documents",
  },
  {
    slug: "employment",
    name: "Employment",
    description: "Employment contracts, contractor agreements, and HR documents",
  },
  {
    slug: "personal",
    name: "Personal",
    description: "Wills, powers of attorney, and personal legal documents",
  },
];

// ---------------------------------------------------------------------------
// US States helper (used for state select options)
// ---------------------------------------------------------------------------

const US_STATES: QuestionOptionDef[] = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
  { value: "DC", label: "District of Columbia" },
];

// ---------------------------------------------------------------------------
// Common question fragments
// ---------------------------------------------------------------------------

function stateQuestion(section = "Basic Information"): QuestionDef {
  return {
    id: "state",
    label: "State / Jurisdiction",
    type: "select",
    required: true,
    section,
    helpText: "Select the state whose laws will govern this document",
    options: US_STATES,
  };
}

function effectiveDateQuestion(section = "Terms"): QuestionDef {
  return {
    id: "effectiveDate",
    label: "Effective Date",
    type: "date",
    required: true,
    section,
    helpText: "The date this agreement takes effect",
  };
}

// ---------------------------------------------------------------------------
// Document Templates + Questionnaires
// ---------------------------------------------------------------------------

const TEMPLATES: TemplateDef[] = [
  // -----------------------------------------------------------------------
  // 1. NDA
  // -----------------------------------------------------------------------
  {
    slug: "nda",
    name: "Non-Disclosure Agreement",
    type: "Non-Disclosure Agreement",
    description: "Protect confidential information shared between parties.",
    category: "business",
    version: "1.0.0",
    seoTitle: "Non-Disclosure Agreement (NDA) - Create Online | LegalLawDocs",
    seoDescription:
      "Generate a legally binding Non-Disclosure Agreement customized to your state. Protect trade secrets and confidential business information with our AI-powered NDA generator.",
    seoKeywords: "NDA, non-disclosure agreement, confidentiality agreement, trade secret protection",
    questionnaires: [
      {
        name: "Non-Disclosure Agreement Questionnaire",
        description: "Questions to generate a customized NDA",
        metadata: { intent: "standard" },
        questions: [
          // -- Parties section --
          {
            id: "disclosingPartyName",
            label: "Disclosing Party Name",
            type: "text",
            required: true,
            section: "Parties",
            helpText: "The full legal name of the party sharing confidential information",
            placeholder: "e.g., Acme Corporation",
          },
          {
            id: "disclosingPartyAddress",
            label: "Disclosing Party Address",
            type: "text",
            required: true,
            section: "Parties",
            helpText: "Full mailing address of the disclosing party",
            placeholder: "e.g., 123 Main St, Suite 100, New York, NY 10001",
          },
          {
            id: "receivingPartyName",
            label: "Receiving Party Name",
            type: "text",
            required: true,
            section: "Parties",
            helpText: "The full legal name of the party receiving confidential information",
            placeholder: "e.g., Jane Doe or Beta Inc.",
          },
          {
            id: "receivingPartyAddress",
            label: "Receiving Party Address",
            type: "text",
            required: true,
            section: "Parties",
            helpText: "Full mailing address of the receiving party",
            placeholder: "e.g., 456 Oak Ave, Los Angeles, CA 90001",
          },
          // -- Terms section --
          effectiveDateQuestion("Terms"),
          {
            id: "duration",
            label: "Agreement Duration",
            type: "select",
            required: true,
            section: "Terms",
            helpText: "How long confidentiality obligations remain in effect",
            options: [
              { value: "1_year", label: "1 Year" },
              { value: "2_years", label: "2 Years" },
              { value: "3_years", label: "3 Years" },
              { value: "5_years", label: "5 Years" },
              { value: "indefinite", label: "Indefinite" },
            ],
          },
          stateQuestion("Terms"),
          {
            id: "confidentialInfoDescription",
            label: "Description of Confidential Information",
            type: "textarea",
            required: true,
            section: "Terms",
            helpText: "Describe the types of confidential information covered by this agreement",
            placeholder:
              "e.g., business plans, financial data, customer lists, proprietary technology, trade secrets",
          },
          // -- Additional section --
          {
            id: "mutualOrUnilateral",
            label: "Type of NDA",
            type: "select",
            required: true,
            section: "Additional",
            helpText: "Mutual means both parties share; unilateral means only one party discloses",
            options: [
              { value: "mutual", label: "Mutual (both parties)" },
              { value: "unilateral", label: "Unilateral (one-way)" },
            ],
          },
          {
            id: "nonCompeteClause",
            label: "Include Non-Compete Clause",
            type: "checkbox",
            required: false,
            section: "Additional",
            helpText: "Restricts the receiving party from competing during and after the agreement",
          },
          {
            id: "nonSolicitationClause",
            label: "Include Non-Solicitation Clause",
            type: "checkbox",
            required: false,
            section: "Additional",
            helpText:
              "Prevents the receiving party from soliciting employees or clients of the disclosing party",
          },
        ],
      },
    ],
  },

  // -----------------------------------------------------------------------
  // 2. LLC Operating Agreement
  // -----------------------------------------------------------------------
  {
    slug: "llc_operating_agreement",
    name: "LLC Operating Agreement",
    type: "LLC Operating Agreement",
    description: "Define ownership structure and operating procedures for your LLC.",
    category: "business",
    version: "1.0.0",
    seoTitle: "LLC Operating Agreement - Create Online | LegalLawDocs",
    seoDescription:
      "Create a comprehensive LLC Operating Agreement tailored to your state. Define member roles, profit distribution, and management structure with our AI-powered generator.",
    seoKeywords: "LLC operating agreement, limited liability company, LLC formation, operating agreement template",
    questionnaires: [
      {
        name: "LLC Operating Agreement Questionnaire",
        description: "Questions to generate an LLC Operating Agreement",
        metadata: { intent: "standard" },
        questions: [
          // -- Company Information --
          {
            id: "companyName",
            label: "LLC Name",
            type: "text",
            required: true,
            section: "Company Information",
            helpText: "The full legal name of the LLC, including 'LLC' designation",
            placeholder: "e.g., Acme Ventures LLC",
          },
          stateQuestion("Company Information"),
          effectiveDateQuestion("Company Information"),
          {
            id: "businessPurpose",
            label: "Business Purpose",
            type: "textarea",
            required: true,
            section: "Company Information",
            helpText: "Describe the primary business activities of the LLC",
            placeholder: "e.g., Software development and consulting services",
          },
          {
            id: "registeredAgent",
            label: "Registered Agent Name",
            type: "text",
            required: true,
            section: "Company Information",
            helpText: "Person or entity designated to receive legal documents on behalf of the LLC",
            placeholder: "e.g., John Smith or ABC Registered Agents Inc.",
          },
          // -- Members & Ownership --
          {
            id: "numberOfMembers",
            label: "Number of Members",
            type: "number",
            required: true,
            section: "Members & Ownership",
            helpText: "Total number of LLC members/owners",
            placeholder: "e.g., 2",
          },
          {
            id: "memberDetails",
            label: "Member Names and Ownership Percentages",
            type: "textarea",
            required: true,
            section: "Members & Ownership",
            helpText: "List each member with their ownership percentage",
            placeholder: "e.g., John Smith - 60%, Jane Doe - 40%",
          },
          {
            id: "capitalContributions",
            label: "Initial Capital Contributions",
            type: "textarea",
            required: true,
            section: "Members & Ownership",
            helpText: "Describe each member's initial capital contribution",
            placeholder: "e.g., John Smith: $60,000 cash; Jane Doe: $40,000 cash",
          },
          // -- Management --
          {
            id: "managementStructure",
            label: "Management Structure",
            type: "select",
            required: true,
            section: "Management",
            helpText: "How the LLC will be managed day-to-day",
            options: [
              { value: "member_managed", label: "Member-Managed (all members participate)" },
              { value: "manager_managed", label: "Manager-Managed (designated managers)" },
            ],
          },
          {
            id: "votingRights",
            label: "Voting Rights",
            type: "select",
            required: true,
            section: "Management",
            helpText: "How voting power is allocated among members",
            options: [
              { value: "ownership_percentage", label: "Based on ownership percentage" },
              { value: "equal_vote", label: "Equal vote per member" },
            ],
          },
          // -- Financial --
          {
            id: "profitDistribution",
            label: "Profit Distribution Method",
            type: "select",
            required: true,
            section: "Financial Terms",
            helpText: "How profits and losses will be divided among members",
            options: [
              { value: "ownership_percentage", label: "According to ownership percentage" },
              { value: "custom", label: "Custom distribution schedule" },
            ],
          },
          {
            id: "fiscalYearEnd",
            label: "Fiscal Year End",
            type: "select",
            required: true,
            section: "Financial Terms",
            helpText: "The end date of the LLC's fiscal year",
            options: [
              { value: "december_31", label: "December 31 (Calendar Year)" },
              { value: "march_31", label: "March 31" },
              { value: "june_30", label: "June 30" },
              { value: "september_30", label: "September 30" },
            ],
          },
        ],
      },
    ],
  },

  // -----------------------------------------------------------------------
  // 3. Independent Contractor Agreement
  // -----------------------------------------------------------------------
  {
    slug: "independent_contractor_agreement",
    name: "Independent Contractor Agreement",
    type: "Independent Contractor Agreement",
    description: "Define the terms of engagement with freelancers and contractors.",
    category: "employment",
    version: "1.0.0",
    seoTitle: "Independent Contractor Agreement - Create Online | LegalLawDocs",
    seoDescription:
      "Generate a professional Independent Contractor Agreement with clear payment terms, IP ownership, and confidentiality clauses. Compliant with your state's laws.",
    seoKeywords:
      "independent contractor agreement, freelancer contract, 1099 contractor, contractor agreement template",
    questionnaires: [
      {
        name: "Independent Contractor Agreement Questionnaire",
        description: "Questions to generate an Independent Contractor Agreement",
        metadata: { intent: "standard" },
        questions: [
          // -- Parties --
          {
            id: "clientName",
            label: "Client / Company Name",
            type: "text",
            required: true,
            section: "Parties",
            helpText: "The legal name of the hiring company or individual",
            placeholder: "e.g., Acme Corporation",
          },
          {
            id: "clientAddress",
            label: "Client Address",
            type: "text",
            required: true,
            section: "Parties",
            helpText: "Full mailing address of the client",
            placeholder: "e.g., 100 Business Blvd, Suite 200, Austin, TX 78701",
          },
          {
            id: "contractorName",
            label: "Contractor Name",
            type: "text",
            required: true,
            section: "Parties",
            helpText: "Full legal name of the independent contractor",
            placeholder: "e.g., Jane Smith",
          },
          {
            id: "contractorAddress",
            label: "Contractor Address",
            type: "text",
            required: true,
            section: "Parties",
            helpText: "Full mailing address of the contractor",
            placeholder: "e.g., 200 Freelancer Lane, Portland, OR 97201",
          },
          // -- Scope of Work --
          {
            id: "servicesDescription",
            label: "Description of Services",
            type: "textarea",
            required: true,
            section: "Scope of Work",
            helpText: "Detailed description of the services the contractor will provide",
            placeholder: "e.g., Web application development including front-end and back-end coding",
          },
          {
            id: "deliverables",
            label: "Deliverables",
            type: "textarea",
            required: false,
            section: "Scope of Work",
            helpText: "Specific deliverables expected from the contractor",
            placeholder: "e.g., Completed website, source code, documentation",
          },
          // -- Terms --
          effectiveDateQuestion("Terms"),
          {
            id: "contractEndDate",
            label: "Contract End Date",
            type: "date",
            required: false,
            section: "Terms",
            helpText: "Leave blank for ongoing engagement with termination notice",
          },
          stateQuestion("Terms"),
          {
            id: "terminationNotice",
            label: "Termination Notice Period",
            type: "select",
            required: true,
            section: "Terms",
            helpText: "How much advance notice is required to terminate the contract",
            options: [
              { value: "7_days", label: "7 Days" },
              { value: "14_days", label: "14 Days" },
              { value: "30_days", label: "30 Days" },
              { value: "60_days", label: "60 Days" },
            ],
          },
          // -- Compensation --
          {
            id: "paymentStructure",
            label: "Payment Structure",
            type: "select",
            required: true,
            section: "Compensation",
            helpText: "How the contractor will be compensated",
            options: [
              { value: "hourly", label: "Hourly Rate" },
              { value: "fixed_project", label: "Fixed Project Fee" },
              { value: "retainer", label: "Monthly Retainer" },
              { value: "milestone", label: "Milestone-Based" },
            ],
          },
          {
            id: "paymentAmount",
            label: "Payment Amount",
            type: "text",
            required: true,
            section: "Compensation",
            helpText: "The agreed compensation amount",
            placeholder: "e.g., $75/hour or $5,000 per project",
          },
          {
            id: "paymentSchedule",
            label: "Payment Schedule",
            type: "select",
            required: true,
            section: "Compensation",
            helpText: "How often payments will be made",
            options: [
              { value: "weekly", label: "Weekly" },
              { value: "biweekly", label: "Bi-Weekly" },
              { value: "monthly", label: "Monthly" },
              { value: "upon_completion", label: "Upon Completion" },
              { value: "milestone", label: "Per Milestone" },
            ],
          },
          // -- IP & Confidentiality --
          {
            id: "ipOwnership",
            label: "Intellectual Property Ownership",
            type: "select",
            required: true,
            section: "IP & Confidentiality",
            helpText: "Who will own the intellectual property created during the engagement",
            options: [
              { value: "client_owns", label: "Client owns all work product" },
              { value: "contractor_licenses", label: "Contractor retains ownership, licenses to client" },
              { value: "joint_ownership", label: "Joint ownership" },
            ],
          },
          {
            id: "confidentialityClause",
            label: "Include Confidentiality Clause",
            type: "checkbox",
            required: false,
            section: "IP & Confidentiality",
            helpText: "Protect sensitive business information shared with the contractor",
          },
        ],
      },
    ],
  },

  // -----------------------------------------------------------------------
  // 4. Residential Lease Agreement
  // -----------------------------------------------------------------------
  {
    slug: "residential_lease_agreement",
    name: "Residential Lease Agreement",
    type: "Residential Lease Agreement",
    description: "Legally binding lease agreements compliant with local tenant laws.",
    category: "real-estate",
    version: "1.0.0",
    seoTitle: "Residential Lease Agreement - Create Online | LegalLawDocs",
    seoDescription:
      "Generate a state-compliant Residential Lease Agreement with proper tenant protections, security deposit terms, and maintenance obligations. Ready in minutes.",
    seoKeywords: "residential lease agreement, rental agreement, lease template, tenant agreement, landlord lease",
    questionnaires: [
      {
        name: "Residential Lease Agreement Questionnaire",
        description: "Questions to generate a Residential Lease Agreement",
        metadata: { intent: "standard" },
        questions: [
          // -- Parties --
          {
            id: "landlordName",
            label: "Landlord / Property Owner Name",
            type: "text",
            required: true,
            section: "Parties",
            helpText: "Full legal name of the landlord or property management company",
            placeholder: "e.g., John Smith or ABC Property Management LLC",
          },
          {
            id: "landlordAddress",
            label: "Landlord Mailing Address",
            type: "text",
            required: true,
            section: "Parties",
            helpText: "Address where tenants can send notices and correspondence",
            placeholder: "e.g., 100 Owner St, Suite 5, Miami, FL 33101",
          },
          {
            id: "tenantName",
            label: "Tenant Name(s)",
            type: "text",
            required: true,
            section: "Parties",
            helpText: "Full legal name(s) of all tenants on the lease",
            placeholder: "e.g., Jane Doe and John Doe",
          },
          // -- Property --
          {
            id: "propertyAddress",
            label: "Property Address",
            type: "text",
            required: true,
            section: "Property Details",
            helpText: "Complete address of the rental property",
            placeholder: "e.g., 456 Elm Street, Apt 2B, Chicago, IL 60601",
          },
          {
            id: "propertyType",
            label: "Property Type",
            type: "select",
            required: true,
            section: "Property Details",
            helpText: "Type of residential property being leased",
            options: [
              { value: "apartment", label: "Apartment" },
              { value: "house", label: "Single-Family House" },
              { value: "condo", label: "Condominium" },
              { value: "townhouse", label: "Townhouse" },
              { value: "duplex", label: "Duplex" },
              { value: "studio", label: "Studio" },
            ],
          },
          {
            id: "furnished",
            label: "Furnished?",
            type: "select",
            required: true,
            section: "Property Details",
            options: [
              { value: "unfurnished", label: "Unfurnished" },
              { value: "partially_furnished", label: "Partially Furnished" },
              { value: "fully_furnished", label: "Fully Furnished" },
            ],
          },
          // -- Lease Terms --
          stateQuestion("Lease Terms"),
          {
            id: "leaseStartDate",
            label: "Lease Start Date",
            type: "date",
            required: true,
            section: "Lease Terms",
            helpText: "The first day of the lease period",
          },
          {
            id: "leaseEndDate",
            label: "Lease End Date",
            type: "date",
            required: true,
            section: "Lease Terms",
            helpText: "The last day of the lease period",
          },
          {
            id: "leaseType",
            label: "Lease Type",
            type: "select",
            required: true,
            section: "Lease Terms",
            helpText: "Whether the lease auto-renews or is a fixed term",
            options: [
              { value: "fixed_term", label: "Fixed Term" },
              { value: "month_to_month", label: "Month-to-Month" },
            ],
          },
          // -- Financial --
          {
            id: "monthlyRent",
            label: "Monthly Rent Amount",
            type: "text",
            required: true,
            section: "Financial Terms",
            helpText: "Monthly rent in US dollars",
            placeholder: "e.g., $1,500",
          },
          {
            id: "rentDueDate",
            label: "Rent Due Date",
            type: "select",
            required: true,
            section: "Financial Terms",
            helpText: "Day of the month rent is due",
            options: [
              { value: "1st", label: "1st of the month" },
              { value: "15th", label: "15th of the month" },
            ],
          },
          {
            id: "securityDeposit",
            label: "Security Deposit Amount",
            type: "text",
            required: true,
            section: "Financial Terms",
            helpText: "Amount of security deposit (subject to state limits)",
            placeholder: "e.g., $1,500",
          },
          {
            id: "lateFee",
            label: "Late Payment Fee",
            type: "text",
            required: false,
            section: "Financial Terms",
            helpText: "Fee charged for late rent payments (subject to state limits)",
            placeholder: "e.g., $50 or 5% of monthly rent",
          },
          // -- Policies --
          {
            id: "petPolicy",
            label: "Pet Policy",
            type: "select",
            required: true,
            section: "Policies",
            helpText: "Whether pets are allowed on the premises",
            options: [
              { value: "no_pets", label: "No Pets Allowed" },
              { value: "pets_allowed", label: "Pets Allowed (with deposit)" },
              { value: "case_by_case", label: "Case-by-Case Approval" },
            ],
          },
          {
            id: "smokingPolicy",
            label: "Smoking Policy",
            type: "select",
            required: true,
            section: "Policies",
            options: [
              { value: "no_smoking", label: "No Smoking" },
              { value: "designated_areas", label: "Designated Areas Only" },
            ],
          },
          {
            id: "utilitiesIncluded",
            label: "Utilities Included",
            type: "textarea",
            required: false,
            section: "Policies",
            helpText: "List any utilities included in the rent",
            placeholder: "e.g., Water, trash removal; tenant pays electric and gas",
          },
        ],
      },
    ],
  },

  // -----------------------------------------------------------------------
  // 5. Employment Contract
  // -----------------------------------------------------------------------
  {
    slug: "employment_contract",
    name: "Employment Contract",
    type: "Employment Contract",
    description: "Comprehensive employment agreements with state-specific provisions.",
    category: "employment",
    version: "1.0.0",
    seoTitle: "Employment Contract - Create Online | LegalLawDocs",
    seoDescription:
      "Create a professional Employment Contract with compensation details, benefits, confidentiality clauses, and state-specific compliance. AI-powered and legally sound.",
    seoKeywords: "employment contract, employment agreement, job contract, hiring agreement, employee contract",
    questionnaires: [
      {
        name: "Employment Contract Questionnaire",
        description: "Questions to generate an Employment Contract",
        metadata: { intent: "standard" },
        questions: [
          // -- Parties --
          {
            id: "employerName",
            label: "Employer / Company Name",
            type: "text",
            required: true,
            section: "Parties",
            helpText: "Full legal name of the employing company",
            placeholder: "e.g., Acme Corporation",
          },
          {
            id: "employerAddress",
            label: "Employer Address",
            type: "text",
            required: true,
            section: "Parties",
            placeholder: "e.g., 100 Corporate Dr, New York, NY 10001",
          },
          {
            id: "employeeName",
            label: "Employee Full Name",
            type: "text",
            required: true,
            section: "Parties",
            placeholder: "e.g., Jane Smith",
          },
          {
            id: "employeeAddress",
            label: "Employee Address",
            type: "text",
            required: true,
            section: "Parties",
            placeholder: "e.g., 200 Residential Ave, Brooklyn, NY 11201",
          },
          // -- Employment Details --
          {
            id: "jobTitle",
            label: "Job Title",
            type: "text",
            required: true,
            section: "Employment Details",
            placeholder: "e.g., Senior Software Engineer",
          },
          {
            id: "department",
            label: "Department",
            type: "text",
            required: false,
            section: "Employment Details",
            placeholder: "e.g., Engineering",
          },
          {
            id: "startDate",
            label: "Start Date",
            type: "date",
            required: true,
            section: "Employment Details",
          },
          stateQuestion("Employment Details"),
          {
            id: "employmentType",
            label: "Employment Type",
            type: "select",
            required: true,
            section: "Employment Details",
            helpText: "The nature of the employment relationship",
            options: [
              { value: "at_will", label: "At-Will Employment" },
              { value: "fixed_term", label: "Fixed-Term Contract" },
              { value: "probationary", label: "Probationary Period" },
            ],
          },
          {
            id: "workSchedule",
            label: "Work Schedule",
            type: "select",
            required: true,
            section: "Employment Details",
            options: [
              { value: "full_time", label: "Full-Time (40 hours/week)" },
              { value: "part_time", label: "Part-Time" },
              { value: "flexible", label: "Flexible Schedule" },
            ],
          },
          {
            id: "workLocation",
            label: "Work Location",
            type: "select",
            required: true,
            section: "Employment Details",
            options: [
              { value: "onsite", label: "On-Site" },
              { value: "remote", label: "Fully Remote" },
              { value: "hybrid", label: "Hybrid" },
            ],
          },
          // -- Compensation --
          {
            id: "salaryAmount",
            label: "Annual Salary / Hourly Rate",
            type: "text",
            required: true,
            section: "Compensation",
            helpText: "Base compensation amount",
            placeholder: "e.g., $85,000/year or $45/hour",
          },
          {
            id: "payFrequency",
            label: "Pay Frequency",
            type: "select",
            required: true,
            section: "Compensation",
            options: [
              { value: "weekly", label: "Weekly" },
              { value: "biweekly", label: "Bi-Weekly" },
              { value: "semimonthly", label: "Semi-Monthly" },
              { value: "monthly", label: "Monthly" },
            ],
          },
          {
            id: "benefits",
            label: "Benefits Description",
            type: "textarea",
            required: false,
            section: "Compensation",
            helpText: "Describe benefits such as health insurance, 401k, PTO, etc.",
            placeholder: "e.g., Health/dental/vision insurance, 15 days PTO, 401k with 4% match",
          },
          // -- Confidentiality & IP --
          {
            id: "confidentialityRequired",
            label: "Include Confidentiality Agreement",
            type: "checkbox",
            required: false,
            section: "Confidentiality & IP",
            helpText: "Require employee to maintain confidentiality of company information",
          },
          {
            id: "ipAssignment",
            label: "Include IP Assignment Clause",
            type: "checkbox",
            required: false,
            section: "Confidentiality & IP",
            helpText: "Assign all work-related intellectual property to the employer",
          },
          {
            id: "nonCompetePeriod",
            label: "Non-Compete Period After Termination",
            type: "select",
            required: false,
            section: "Confidentiality & IP",
            helpText: "Duration of non-compete restriction (enforceability varies by state)",
            options: [
              { value: "none", label: "No Non-Compete" },
              { value: "6_months", label: "6 Months" },
              { value: "1_year", label: "1 Year" },
              { value: "2_years", label: "2 Years" },
            ],
          },
        ],
      },
    ],
  },

  // -----------------------------------------------------------------------
  // 6. Last Will & Testament
  // -----------------------------------------------------------------------
  {
    slug: "last_will_testament",
    name: "Last Will & Testament",
    type: "Last Will & Testament",
    description: "Protect your legacy with a state-compliant will document.",
    category: "personal",
    version: "1.0.0",
    seoTitle: "Last Will and Testament - Create Online | LegalLawDocs",
    seoDescription:
      "Create a legally valid Last Will and Testament tailored to your state. Designate beneficiaries, appoint executors, and protect your family's future.",
    seoKeywords: "last will and testament, will template, estate planning, beneficiary designation",
    questionnaires: [
      {
        name: "Last Will & Testament Questionnaire",
        description: "Questions to generate a Last Will and Testament",
        metadata: { intent: "standard" },
        questions: [
          // -- Testator Information --
          {
            id: "testatorFullName",
            label: "Your Full Legal Name (Testator)",
            type: "text",
            required: true,
            section: "Testator Information",
            helpText: "The person making the will",
            placeholder: "e.g., Robert James Wilson",
          },
          {
            id: "testatorAddress",
            label: "Your Current Address",
            type: "text",
            required: true,
            section: "Testator Information",
            placeholder: "e.g., 789 Heritage Lane, Dallas, TX 75201",
          },
          {
            id: "dateOfBirth",
            label: "Date of Birth",
            type: "date",
            required: true,
            section: "Testator Information",
          },
          stateQuestion("Testator Information"),
          {
            id: "maritalStatus",
            label: "Marital Status",
            type: "select",
            required: true,
            section: "Testator Information",
            options: [
              { value: "single", label: "Single" },
              { value: "married", label: "Married" },
              { value: "divorced", label: "Divorced" },
              { value: "widowed", label: "Widowed" },
              { value: "domestic_partnership", label: "Domestic Partnership" },
            ],
          },
          // -- Executor --
          {
            id: "executorName",
            label: "Executor Name",
            type: "text",
            required: true,
            section: "Executor",
            helpText: "The person responsible for carrying out the will",
            placeholder: "e.g., Sarah Wilson",
          },
          {
            id: "executorRelationship",
            label: "Relationship to Testator",
            type: "text",
            required: true,
            section: "Executor",
            placeholder: "e.g., Spouse, Adult Child, Attorney",
          },
          {
            id: "alternateExecutorName",
            label: "Alternate Executor Name",
            type: "text",
            required: false,
            section: "Executor",
            helpText: "Backup executor in case the primary cannot serve",
            placeholder: "e.g., Michael Wilson",
          },
          // -- Beneficiaries --
          {
            id: "beneficiaries",
            label: "Beneficiaries and Bequests",
            type: "textarea",
            required: true,
            section: "Beneficiaries",
            helpText: "List each beneficiary and what they should receive",
            placeholder:
              "e.g., Sarah Wilson (spouse) - 50% of all assets; Michael Wilson (son) - 25%; Emily Wilson (daughter) - 25%",
          },
          {
            id: "residualEstate",
            label: "Residual Estate Beneficiary",
            type: "text",
            required: true,
            section: "Beneficiaries",
            helpText: "Who receives any remaining assets not specifically bequeathed",
            placeholder: "e.g., Equally among surviving children",
          },
          {
            id: "specificBequests",
            label: "Specific Bequests (Optional)",
            type: "textarea",
            required: false,
            section: "Beneficiaries",
            helpText: "Specific items you want to leave to specific people",
            placeholder: "e.g., Family home at 123 Oak St to Sarah Wilson; Antique collection to Michael Wilson",
          },
          // -- Guardianship --
          {
            id: "hasMinorChildren",
            label: "Do You Have Minor Children?",
            type: "checkbox",
            required: false,
            section: "Guardianship",
            helpText: "Check if you need to designate a guardian for minor children",
          },
          {
            id: "guardianName",
            label: "Guardian for Minor Children",
            type: "text",
            required: false,
            section: "Guardianship",
            helpText: "Person who will care for your minor children",
            placeholder: "e.g., Mary Johnson (sister)",
          },
          {
            id: "alternateGuardianName",
            label: "Alternate Guardian",
            type: "text",
            required: false,
            section: "Guardianship",
            helpText: "Backup guardian if primary cannot serve",
          },
          // -- Additional Provisions --
          {
            id: "debtsAndTaxes",
            label: "Instructions for Debts and Taxes",
            type: "textarea",
            required: false,
            section: "Additional Provisions",
            helpText: "How debts, taxes, and funeral expenses should be handled",
            placeholder: "e.g., All debts and taxes to be paid from the general estate before distribution",
          },
          {
            id: "funeralWishes",
            label: "Funeral / Burial Wishes",
            type: "textarea",
            required: false,
            section: "Additional Provisions",
            helpText: "Any specific wishes for funeral arrangements",
            placeholder: "e.g., Cremation preferred; ashes to be scattered at Lake Tahoe",
          },
        ],
      },
    ],
  },

  // -----------------------------------------------------------------------
  // 7. Power of Attorney
  // -----------------------------------------------------------------------
  {
    slug: "power_of_attorney",
    name: "Power of Attorney",
    type: "Power of Attorney",
    description: "Authorize someone to act on your behalf in legal or financial matters.",
    category: "personal",
    version: "1.0.0",
    seoTitle: "Power of Attorney - Create Online | LegalLawDocs",
    seoDescription:
      "Create a Power of Attorney document to designate a trusted agent for financial, legal, or healthcare decisions. State-compliant and ready for notarization.",
    seoKeywords: "power of attorney, POA, durable power of attorney, healthcare proxy, legal authority",
    questionnaires: [
      {
        name: "Power of Attorney Questionnaire",
        description: "Questions to generate a Power of Attorney document",
        metadata: { intent: "standard" },
        questions: [
          // -- Principal --
          {
            id: "principalName",
            label: "Principal (Your Full Name)",
            type: "text",
            required: true,
            section: "Principal Information",
            helpText: "The person granting authority (you)",
            placeholder: "e.g., Robert James Wilson",
          },
          {
            id: "principalAddress",
            label: "Principal Address",
            type: "text",
            required: true,
            section: "Principal Information",
            placeholder: "e.g., 100 Main St, Denver, CO 80201",
          },
          {
            id: "principalDateOfBirth",
            label: "Date of Birth",
            type: "date",
            required: true,
            section: "Principal Information",
          },
          stateQuestion("Principal Information"),
          // -- Agent --
          {
            id: "agentName",
            label: "Agent (Attorney-in-Fact) Name",
            type: "text",
            required: true,
            section: "Agent Information",
            helpText: "The person who will act on your behalf",
            placeholder: "e.g., Sarah Wilson",
          },
          {
            id: "agentAddress",
            label: "Agent Address",
            type: "text",
            required: true,
            section: "Agent Information",
            placeholder: "e.g., 200 Elm St, Denver, CO 80202",
          },
          {
            id: "agentRelationship",
            label: "Relationship to Principal",
            type: "text",
            required: true,
            section: "Agent Information",
            placeholder: "e.g., Spouse, Adult Child, Attorney",
          },
          {
            id: "alternateAgentName",
            label: "Alternate Agent Name",
            type: "text",
            required: false,
            section: "Agent Information",
            helpText: "Backup agent if the primary agent is unable to serve",
          },
          // -- Powers --
          {
            id: "poaType",
            label: "Type of Power of Attorney",
            type: "select",
            required: true,
            section: "Powers Granted",
            helpText: "The scope of authority granted to the agent",
            options: [
              { value: "general", label: "General (broad authority over financial and legal matters)" },
              { value: "limited", label: "Limited / Special (specific acts or timeframe)" },
              { value: "healthcare", label: "Healthcare (medical decisions only)" },
              { value: "financial", label: "Financial (financial decisions only)" },
            ],
          },
          {
            id: "isDurable",
            label: "Durable Power of Attorney",
            type: "checkbox",
            required: false,
            section: "Powers Granted",
            helpText: "If checked, authority continues even if you become incapacitated",
          },
          {
            id: "specificPowers",
            label: "Specific Powers Granted",
            type: "textarea",
            required: false,
            section: "Powers Granted",
            helpText: "Detail specific powers if using Limited/Special POA",
            placeholder:
              "e.g., Authority to sell real property at 123 Oak St; manage bank accounts at First National Bank",
          },
          {
            id: "powersExcluded",
            label: "Powers Excluded / Limitations",
            type: "textarea",
            required: false,
            section: "Powers Granted",
            helpText: "Any actions the agent is NOT authorized to perform",
            placeholder: "e.g., Agent may not make gifts exceeding $500; may not change beneficiary designations",
          },
          // -- Effective Period --
          effectiveDateQuestion("Effective Period"),
          {
            id: "expirationDate",
            label: "Expiration Date",
            type: "date",
            required: false,
            section: "Effective Period",
            helpText: "Leave blank for indefinite duration (until revoked or principal's death)",
          },
          {
            id: "springingPoa",
            label: "Springing Power of Attorney",
            type: "checkbox",
            required: false,
            section: "Effective Period",
            helpText: "If checked, the POA only takes effect upon your incapacitation",
          },
        ],
      },
    ],
  },

  // -----------------------------------------------------------------------
  // 8. Bill of Sale (Purchase Agreement)
  // -----------------------------------------------------------------------
  {
    slug: "purchase_agreement",
    name: "Purchase Agreement / Bill of Sale",
    type: "Purchase Agreement",
    description: "Legally binding purchase agreements for goods and services.",
    category: "business",
    version: "1.0.0",
    seoTitle: "Purchase Agreement & Bill of Sale - Create Online | LegalLawDocs",
    seoDescription:
      "Generate a legally binding Purchase Agreement or Bill of Sale for goods, vehicles, or business assets. State-compliant with seller and buyer protections.",
    seoKeywords: "purchase agreement, bill of sale, asset purchase, goods sale contract, vehicle bill of sale",
    questionnaires: [
      {
        name: "Purchase Agreement / Bill of Sale Questionnaire",
        description: "Questions to generate a Purchase Agreement or Bill of Sale",
        metadata: { intent: "standard" },
        questions: [
          // -- Parties --
          {
            id: "sellerName",
            label: "Seller Name",
            type: "text",
            required: true,
            section: "Parties",
            helpText: "Full legal name of the seller",
            placeholder: "e.g., John Smith or ABC Company LLC",
          },
          {
            id: "sellerAddress",
            label: "Seller Address",
            type: "text",
            required: true,
            section: "Parties",
            placeholder: "e.g., 100 Commerce St, Phoenix, AZ 85001",
          },
          {
            id: "buyerName",
            label: "Buyer Name",
            type: "text",
            required: true,
            section: "Parties",
            placeholder: "e.g., Jane Doe or XYZ Corporation",
          },
          {
            id: "buyerAddress",
            label: "Buyer Address",
            type: "text",
            required: true,
            section: "Parties",
            placeholder: "e.g., 200 Market Ave, Scottsdale, AZ 85251",
          },
          // -- Item Details --
          {
            id: "saleType",
            label: "Type of Sale",
            type: "select",
            required: true,
            section: "Item Details",
            options: [
              { value: "personal_property", label: "Personal Property / Goods" },
              { value: "vehicle", label: "Vehicle" },
              { value: "business_assets", label: "Business Assets" },
              { value: "equipment", label: "Equipment / Machinery" },
              { value: "other", label: "Other" },
            ],
          },
          {
            id: "itemDescription",
            label: "Detailed Description of Item(s)",
            type: "textarea",
            required: true,
            section: "Item Details",
            helpText: "Include make, model, serial numbers, or other identifying details",
            placeholder:
              "e.g., 2022 Toyota Camry SE, VIN: 1234567890, Color: Silver, Mileage: 25,000",
          },
          {
            id: "itemCondition",
            label: "Condition of Item(s)",
            type: "select",
            required: true,
            section: "Item Details",
            options: [
              { value: "new", label: "New" },
              { value: "like_new", label: "Like New" },
              { value: "good", label: "Good" },
              { value: "fair", label: "Fair" },
              { value: "as_is", label: "As-Is (no warranty)" },
            ],
          },
          // -- Transaction Terms --
          {
            id: "purchasePrice",
            label: "Purchase Price",
            type: "text",
            required: true,
            section: "Transaction Terms",
            helpText: "Total agreed purchase price",
            placeholder: "e.g., $15,000",
          },
          {
            id: "paymentMethod",
            label: "Payment Method",
            type: "select",
            required: true,
            section: "Transaction Terms",
            options: [
              { value: "cash", label: "Cash" },
              { value: "check", label: "Check" },
              { value: "wire_transfer", label: "Wire Transfer" },
              { value: "financing", label: "Financing" },
              { value: "installments", label: "Installment Payments" },
            ],
          },
          {
            id: "closingDate",
            label: "Transaction / Closing Date",
            type: "date",
            required: true,
            section: "Transaction Terms",
            helpText: "Date when ownership transfers to the buyer",
          },
          stateQuestion("Transaction Terms"),
          {
            id: "warrantyIncluded",
            label: "Include Seller Warranty",
            type: "checkbox",
            required: false,
            section: "Transaction Terms",
            helpText: "If checked, seller provides warranty on the item sold",
          },
          {
            id: "warrantyDetails",
            label: "Warranty Details",
            type: "textarea",
            required: false,
            section: "Transaction Terms",
            helpText: "Describe warranty terms if applicable",
            placeholder: "e.g., 30-day warranty on mechanical components",
          },
        ],
      },
    ],
  },

  // -----------------------------------------------------------------------
  // Additional templates to match document-data.ts
  // -----------------------------------------------------------------------

  // 9. Partnership Agreement
  {
    slug: "partnership_agreement",
    name: "Partnership Agreement",
    type: "Partnership Agreement",
    description: "Establish clear terms for business partnerships and profit sharing.",
    category: "business",
    version: "1.0.0",
    seoTitle: "Partnership Agreement - Create Online | LegalLawDocs",
    seoDescription:
      "Create a comprehensive Partnership Agreement defining profit sharing, management roles, and dispute resolution. State-compliant and AI-powered.",
    seoKeywords: "partnership agreement, business partnership, profit sharing agreement, partner contract",
    questionnaires: [
      {
        name: "Partnership Agreement Questionnaire",
        description: "Questions to generate a Partnership Agreement",
        metadata: { intent: "standard" },
        questions: [
          {
            id: "partnerAName",
            label: "Partner A Full Name",
            type: "text",
            required: true,
            section: "Partners",
            placeholder: "e.g., John Smith",
          },
          {
            id: "partnerAAddress",
            label: "Partner A Address",
            type: "text",
            required: true,
            section: "Partners",
            placeholder: "e.g., 100 Main St, Boston, MA 02101",
          },
          {
            id: "partnerBName",
            label: "Partner B Full Name",
            type: "text",
            required: true,
            section: "Partners",
            placeholder: "e.g., Jane Doe",
          },
          {
            id: "partnerBAddress",
            label: "Partner B Address",
            type: "text",
            required: true,
            section: "Partners",
            placeholder: "e.g., 200 Oak Ave, Cambridge, MA 02139",
          },
          {
            id: "partnershipName",
            label: "Partnership / Business Name",
            type: "text",
            required: true,
            section: "Business Information",
            placeholder: "e.g., Smith & Doe Consulting",
          },
          {
            id: "businessPurpose",
            label: "Business Purpose",
            type: "textarea",
            required: true,
            section: "Business Information",
            placeholder: "e.g., Management consulting and advisory services",
          },
          stateQuestion("Business Information"),
          effectiveDateQuestion("Business Information"),
          {
            id: "capitalContributions",
            label: "Capital Contributions",
            type: "textarea",
            required: true,
            section: "Financial Terms",
            helpText: "Each partner's initial contribution of cash, property, or services",
            placeholder: "e.g., Partner A: $50,000 cash; Partner B: $50,000 cash",
          },
          {
            id: "profitSplit",
            label: "Profit and Loss Sharing",
            type: "text",
            required: true,
            section: "Financial Terms",
            helpText: "How profits and losses will be divided",
            placeholder: "e.g., 50/50 or 60/40",
          },
          {
            id: "managementRoles",
            label: "Management Responsibilities",
            type: "textarea",
            required: false,
            section: "Management",
            helpText: "Describe each partner's management duties",
            placeholder: "e.g., Partner A handles operations; Partner B handles sales and marketing",
          },
          {
            id: "disputeResolution",
            label: "Dispute Resolution Method",
            type: "select",
            required: true,
            section: "Management",
            options: [
              { value: "mediation", label: "Mediation" },
              { value: "arbitration", label: "Binding Arbitration" },
              { value: "litigation", label: "Litigation" },
            ],
          },
        ],
      },
    ],
  },

  // 10. Commercial Lease Agreement
  {
    slug: "commercial_lease_agreement",
    name: "Commercial Lease Agreement",
    type: "Commercial Lease Agreement",
    description: "Professional commercial property lease with full legal protections.",
    category: "real-estate",
    version: "1.0.0",
    seoTitle: "Commercial Lease Agreement - Create Online | LegalLawDocs",
    seoDescription:
      "Generate a Commercial Lease Agreement with CAM charges, permitted use, and tenant improvement clauses. Compliant with your state's commercial lease laws.",
    seoKeywords:
      "commercial lease agreement, commercial rental, office lease, retail lease, commercial property lease",
    questionnaires: [
      {
        name: "Commercial Lease Agreement Questionnaire",
        description: "Questions to generate a Commercial Lease Agreement",
        metadata: { intent: "standard" },
        questions: [
          {
            id: "landlordName",
            label: "Landlord / Property Owner Name",
            type: "text",
            required: true,
            section: "Parties",
            placeholder: "e.g., Commercial Properties LLC",
          },
          {
            id: "tenantName",
            label: "Tenant / Business Name",
            type: "text",
            required: true,
            section: "Parties",
            placeholder: "e.g., Tech Startup Inc.",
          },
          {
            id: "propertyAddress",
            label: "Property Address",
            type: "text",
            required: true,
            section: "Property Details",
            placeholder: "e.g., 500 Business Park Dr, Suite 300, San Jose, CA 95110",
          },
          {
            id: "squareFootage",
            label: "Square Footage",
            type: "number",
            required: true,
            section: "Property Details",
            placeholder: "e.g., 2500",
          },
          {
            id: "permittedUse",
            label: "Permitted Use",
            type: "text",
            required: true,
            section: "Property Details",
            helpText: "What the tenant is allowed to use the space for",
            placeholder: "e.g., General office use, software development",
          },
          stateQuestion("Lease Terms"),
          {
            id: "leaseStartDate",
            label: "Lease Start Date",
            type: "date",
            required: true,
            section: "Lease Terms",
          },
          {
            id: "leaseTerm",
            label: "Lease Term",
            type: "select",
            required: true,
            section: "Lease Terms",
            options: [
              { value: "1_year", label: "1 Year" },
              { value: "2_years", label: "2 Years" },
              { value: "3_years", label: "3 Years" },
              { value: "5_years", label: "5 Years" },
              { value: "10_years", label: "10 Years" },
            ],
          },
          {
            id: "monthlyRent",
            label: "Monthly Base Rent",
            type: "text",
            required: true,
            section: "Financial Terms",
            placeholder: "e.g., $5,000",
          },
          {
            id: "leaseType",
            label: "Lease Type",
            type: "select",
            required: true,
            section: "Financial Terms",
            helpText: "Determines who pays property expenses",
            options: [
              { value: "gross", label: "Gross Lease (landlord pays expenses)" },
              { value: "net", label: "Net Lease (tenant pays some expenses)" },
              { value: "triple_net", label: "Triple Net (NNN - tenant pays all expenses)" },
              { value: "modified_gross", label: "Modified Gross" },
            ],
          },
          {
            id: "camCharges",
            label: "Estimated Monthly CAM Charges",
            type: "text",
            required: false,
            section: "Financial Terms",
            helpText: "Common Area Maintenance charges, if applicable",
            placeholder: "e.g., $500/month",
          },
          {
            id: "securityDeposit",
            label: "Security Deposit",
            type: "text",
            required: true,
            section: "Financial Terms",
            placeholder: "e.g., $10,000",
          },
        ],
      },
    ],
  },

  // 11. Service Agreement
  {
    slug: "service_agreement",
    name: "Service Agreement",
    type: "Service Agreement",
    description: "Define terms for professional services and deliverables.",
    category: "business",
    version: "1.0.0",
    seoTitle: "Service Agreement - Create Online | LegalLawDocs",
    seoDescription:
      "Create a professional Service Agreement with clear scope, payment terms, and liability provisions. AI-powered and state-compliant.",
    seoKeywords: "service agreement, professional services contract, consulting agreement, service contract",
    questionnaires: [
      {
        name: "Service Agreement Questionnaire",
        description: "Questions to generate a Service Agreement",
        metadata: { intent: "standard" },
        questions: [
          {
            id: "providerName",
            label: "Service Provider Name",
            type: "text",
            required: true,
            section: "Parties",
            placeholder: "e.g., Consulting Experts LLC",
          },
          {
            id: "clientName",
            label: "Client Name",
            type: "text",
            required: true,
            section: "Parties",
            placeholder: "e.g., Acme Corporation",
          },
          stateQuestion("Parties"),
          effectiveDateQuestion("Agreement Details"),
          {
            id: "servicesDescription",
            label: "Description of Services",
            type: "textarea",
            required: true,
            section: "Agreement Details",
            placeholder: "e.g., Strategic business consulting, market analysis, and reporting",
          },
          {
            id: "term",
            label: "Agreement Duration",
            type: "select",
            required: true,
            section: "Agreement Details",
            options: [
              { value: "3_months", label: "3 Months" },
              { value: "6_months", label: "6 Months" },
              { value: "1_year", label: "1 Year" },
              { value: "ongoing", label: "Ongoing (until terminated)" },
            ],
          },
          {
            id: "fees",
            label: "Service Fees",
            type: "text",
            required: true,
            section: "Compensation",
            placeholder: "e.g., $5,000/month or $150/hour",
          },
          {
            id: "paymentTerms",
            label: "Payment Terms",
            type: "select",
            required: true,
            section: "Compensation",
            options: [
              { value: "net_15", label: "Net 15 Days" },
              { value: "net_30", label: "Net 30 Days" },
              { value: "net_60", label: "Net 60 Days" },
              { value: "upon_completion", label: "Upon Completion" },
            ],
          },
          {
            id: "liabilityLimit",
            label: "Liability Limitation",
            type: "textarea",
            required: false,
            section: "Legal Terms",
            helpText: "Maximum liability cap for the service provider",
            placeholder: "e.g., Total liability shall not exceed the fees paid under this agreement",
          },
          {
            id: "confidentialityClause",
            label: "Include Confidentiality Clause",
            type: "checkbox",
            required: false,
            section: "Legal Terms",
          },
        ],
      },
    ],
  },

  // 12. Non-Compete Agreement
  {
    slug: "non_compete_agreement",
    name: "Non-Compete Agreement",
    type: "Non-Compete Agreement",
    description: "Protect your business with enforceable non-compete clauses.",
    category: "employment",
    version: "1.0.0",
    seoTitle: "Non-Compete Agreement - Create Online | LegalLawDocs",
    seoDescription:
      "Generate an enforceable Non-Compete Agreement with proper geographic scope and duration limits. Tailored to your state's enforceability requirements.",
    seoKeywords:
      "non-compete agreement, non-competition clause, restrictive covenant, employee non-compete",
    questionnaires: [
      {
        name: "Non-Compete Agreement Questionnaire",
        description: "Questions to generate a Non-Compete Agreement",
        metadata: { intent: "standard" },
        questions: [
          {
            id: "employerName",
            label: "Employer / Company Name",
            type: "text",
            required: true,
            section: "Parties",
            placeholder: "e.g., Tech Solutions Inc.",
          },
          {
            id: "employeeName",
            label: "Employee / Contractor Name",
            type: "text",
            required: true,
            section: "Parties",
            placeholder: "e.g., Jane Smith",
          },
          stateQuestion("Parties"),
          effectiveDateQuestion("Restrictions"),
          {
            id: "restrictedActivities",
            label: "Restricted Activities",
            type: "textarea",
            required: true,
            section: "Restrictions",
            helpText: "Activities the employee/contractor is prohibited from engaging in",
            placeholder:
              "e.g., Working for a direct competitor in the SaaS industry; soliciting current clients",
          },
          {
            id: "duration",
            label: "Non-Compete Duration",
            type: "select",
            required: true,
            section: "Restrictions",
            helpText: "Duration after termination (enforceability varies by state)",
            options: [
              { value: "6_months", label: "6 Months" },
              { value: "1_year", label: "1 Year" },
              { value: "18_months", label: "18 Months" },
              { value: "2_years", label: "2 Years" },
            ],
          },
          {
            id: "geographicScope",
            label: "Geographic Scope",
            type: "text",
            required: true,
            section: "Restrictions",
            helpText: "The geographic area where the non-compete applies",
            placeholder: "e.g., Within 50 miles of employer's principal office; or State of California",
          },
          {
            id: "consideration",
            label: "Consideration Provided",
            type: "textarea",
            required: true,
            section: "Consideration",
            helpText: "What the employee receives in exchange for agreeing to the non-compete",
            placeholder:
              "e.g., Employment; $5,000 signing bonus; access to proprietary training programs",
          },
          {
            id: "remedies",
            label: "Remedies for Breach",
            type: "select",
            required: true,
            section: "Enforcement",
            options: [
              { value: "injunctive_relief", label: "Injunctive Relief" },
              { value: "damages", label: "Monetary Damages" },
              { value: "both", label: "Both Injunctive Relief and Damages" },
            ],
          },
        ],
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Seed logic
// ---------------------------------------------------------------------------

async function main() {
  console.log("Starting database seed...\n");

  // -----------------------------------------------------------------------
  // 1. Upsert categories
  // -----------------------------------------------------------------------
  console.log("Seeding categories...");
  const categoryMap: Record<string, string> = {};

  for (const cat of CATEGORIES) {
    // Category has no unique constraint on slug in Prisma, so we manually
    // check for existence and create or update accordingly.
    const existing = await prisma.category.findFirst({
      where: { slug: cat.slug },
    });

    let category;
    if (existing) {
      category = await prisma.category.update({
        where: { id: existing.id },
        data: {
          name: cat.name,
          description: cat.description,
        },
      });
      console.log(`  Updated category: ${cat.name}`);
    } else {
      category = await prisma.category.create({
        data: {
          name: cat.name,
          slug: cat.slug,
          description: cat.description,
        },
      });
      console.log(`  Created category: ${cat.name}`);
    }

    categoryMap[cat.slug] = category.id;
  }

  console.log(`  Total categories: ${Object.keys(categoryMap).length}\n`);

  // -----------------------------------------------------------------------
  // 2. Upsert templates + questionnaires + questions + options
  // -----------------------------------------------------------------------
  console.log("Seeding document templates and questionnaires...");
  let templatesCreated = 0;
  let templatesUpdated = 0;
  let questionnairesSeeded = 0;
  let questionsSeeded = 0;

  for (const tpl of TEMPLATES) {
    const categoryId = categoryMap[tpl.category];
    if (!categoryId) {
      console.warn(`  WARNING: No category found for slug "${tpl.category}", skipping ${tpl.slug}`);
      continue;
    }

    // Upsert the DocumentTemplate using the unique slug field
    const existingTemplate = await prisma.documentTemplate.findUnique({
      where: { slug: tpl.slug },
    });

    let template;
    if (existingTemplate) {
      template = await prisma.documentTemplate.update({
        where: { slug: tpl.slug },
        data: {
          name: tpl.name,
          type: tpl.type,
          description: tpl.description,
          categoryId,
          version: tpl.version,
          seoTitle: tpl.seoTitle,
          seoDescription: tpl.seoDescription,
          seoKeywords: tpl.seoKeywords,
          content: tpl.content,
        },
      });
      templatesUpdated++;
      console.log(`  Updated template: ${tpl.name}`);
    } else {
      template = await prisma.documentTemplate.create({
        data: {
          name: tpl.name,
          type: tpl.type,
          description: tpl.description,
          slug: tpl.slug,
          categoryId,
          version: tpl.version,
          seoTitle: tpl.seoTitle,
          seoDescription: tpl.seoDescription,
          seoKeywords: tpl.seoKeywords,
          content: tpl.content,
        },
      });
      templatesCreated++;
      console.log(`  Created template: ${tpl.name}`);
    }

    // -----------------------------------------------------------------------
    // For each questionnaire, delete existing ones for this template and
    // recreate them. This ensures questions and options stay in sync.
    // (We already upserted the template itself, so this is safe.)
    // -----------------------------------------------------------------------
    // Delete existing questionnaires (cascade will remove questions + options)
    await prisma.questionnaire.deleteMany({
      where: { templateId: template.id },
    });

    for (const qDef of tpl.questionnaires) {
      const questionnaire = await prisma.questionnaire.create({
        data: {
          name: qDef.name,
          description: qDef.description,
          templateId: template.id,
          metadata: (qDef.metadata ?? {}) as any,
        },
      });

      questionnairesSeeded++;

      // Create questions for this questionnaire
      for (const q of qDef.questions) {
        await prisma.question.create({
          data: {
            label: q.label,
            type: q.type,
            required: q.required,
            section: q.section,
            helpText: q.helpText,
            placeholder: q.placeholder,
            questionnaireId: questionnaire.id,
            options: q.options
              ? {
                  create: q.options.map((opt) => ({
                    value: opt.value,
                    label: opt.label,
                  })),
                }
              : undefined,
          },
        });
        questionsSeeded++;
      }
    }
  }

  console.log(`\n--- Seed Summary ---`);
  console.log(`Categories:      ${Object.keys(categoryMap).length}`);
  console.log(`Templates created: ${templatesCreated}`);
  console.log(`Templates updated: ${templatesUpdated}`);
  console.log(`Questionnaires:  ${questionnairesSeeded}`);
  console.log(`Questions:       ${questionsSeeded}`);
  console.log(`\nSeed completed successfully!`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
