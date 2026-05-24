/**
 * Code-defined questionnaire for each document type.
 *
 * These are used as the PRIMARY source of questions in the /generate flow.
 * The database questionnaire system (DocumentTemplate / Questionnaire) is
 * treated as an optional override — if the DB returns data, it wins;
 * if the DB is empty (the common case), these definitions are used instead.
 *
 * Shape matches the DocumentForm `Question` interface exactly.
 */

export interface FormQuestion {
  id: string
  label: string
  type: "text" | "textarea" | "select" | "radio" | "state"
  required: boolean
  section: string
  helpText?: string
  placeholder?: string
  options?: Array<{ value: string; label?: string }>
}

// ─── Reusable building blocks ─────────────────────────────────────────────────

const Q = {
  state: (id = "state", label = "Governing State", required = true): FormQuestion => ({
    id,
    label,
    type: "state",
    required,
    section: "Jurisdiction",
    helpText: "Which state's law governs this document?",
  }),

  text: (id: string, label: string, section: string, opts?: Partial<FormQuestion>): FormQuestion => ({
    id,
    label,
    type: "text",
    required: true,
    section,
    ...opts,
  }),

  textarea: (id: string, label: string, section: string, opts?: Partial<FormQuestion>): FormQuestion => ({
    id,
    label,
    type: "textarea",
    required: false,
    section,
    ...opts,
  }),

  radio: (id: string, label: string, section: string, options: string[], opts?: Partial<FormQuestion>): FormQuestion => ({
    id,
    label,
    type: "radio",
    required: true,
    section,
    options: options.map((o) => ({ value: o, label: o })),
    ...opts,
  }),

  select: (id: string, label: string, section: string, options: string[], opts?: Partial<FormQuestion>): FormQuestion => ({
    id,
    label,
    type: "select",
    required: true,
    section,
    options: options.map((o) => ({ value: o, label: o })),
    ...opts,
  }),
}

// ─── Document question definitions ───────────────────────────────────────────

const DOCUMENT_QUESTIONS: Record<string, FormQuestion[]> = {

  // ── NON-DISCLOSURE AGREEMENT ──────────────────────────────────────────────
  "non-disclosure-agreement": [
    Q.state(),
    Q.text("disclosingPartyName", "Disclosing Party Name", "Parties", { placeholder: "Acme Corp or John Smith" }),
    Q.select("disclosingPartyType", "Disclosing Party Entity Type", "Parties", ["Corporation", "LLC", "Limited Partnership", "Sole Proprietor / Individual"], { required: false }),
    Q.text("disclosingPartyAddress", "Disclosing Party Address (City, State)", "Parties", { required: false, placeholder: "e.g., San Francisco, California" }),
    Q.text("receivingPartyName", "Receiving Party Name", "Parties", { placeholder: "Beta LLC or Jane Doe" }),
    Q.select("receivingPartyType", "Receiving Party Entity Type", "Parties", ["Corporation", "LLC", "Limited Partnership", "Sole Proprietor / Individual"], { required: false }),
    Q.text("receivingPartyAddress", "Receiving Party Address (City, State)", "Parties", { required: false, placeholder: "e.g., Austin, Texas" }),
    Q.radio("ndaType", "NDA Type", "Agreement Terms", ["Mutual (both share info)", "One-way (only one party shares)"], {}),
    Q.textarea("confidentialInfo", "What confidential information is covered?", "Agreement Terms", {
      required: true,
      placeholder: "e.g., trade secrets, business plans, customer lists, financial data, source code...",
      helpText: "Be specific — overly broad NDAs may be unenforceable.",
    }),
    Q.select("term", "Agreement Duration", "Agreement Terms", ["1 year", "2 years", "3 years", "5 years", "Indefinite"], {}),
    Q.text("purpose", "Business Purpose of Disclosure", "Agreement Terms", {
      required: true,
      placeholder: "e.g., Evaluating a potential business partnership or acquisition",
    }),
    Q.select("disputeResolution", "Dispute Resolution", "Governing Terms", ["Litigation in state court", "Binding arbitration", "Mediation then arbitration"], {}),
  ],

  // ── MUTUAL NDA ────────────────────────────────────────────────────────────
  "mutual-non-disclosure-agreement": [
    Q.state(),
    Q.text("party1Name", "First Party Name", "Parties", { placeholder: "Acme Corp" }),
    Q.select("party1Type", "First Party Entity Type", "Parties", ["Corporation", "LLC", "Limited Partnership", "Sole Proprietor / Individual"], { required: false }),
    Q.text("party1Address", "First Party Address (City, State)", "Parties", { required: false, placeholder: "e.g., San Francisco, California" }),
    Q.text("party2Name", "Second Party Name", "Parties", { placeholder: "Beta LLC" }),
    Q.select("party2Type", "Second Party Entity Type", "Parties", ["Corporation", "LLC", "Limited Partnership", "Sole Proprietor / Individual"], { required: false }),
    Q.text("party2Address", "Second Party Address (City, State)", "Parties", { required: false, placeholder: "e.g., Austin, Texas" }),
    Q.textarea("confidentialInfo", "What confidential information will be shared?", "Agreement Terms", {
      required: true,
      placeholder: "e.g., product roadmaps, pricing strategies, technical specifications, customer data...",
    }),
    Q.select("term", "Agreement Duration", "Agreement Terms", ["1 year", "2 years", "3 years", "5 years", "Indefinite"], {}),
    Q.text("purpose", "Purpose of the Mutual Disclosure", "Agreement Terms", {
      required: true,
      placeholder: "e.g., Exploring a joint venture in the healthcare sector",
    }),
  ],

  // ── UNILATERAL NDA ────────────────────────────────────────────────────────
  "unilateral-non-disclosure-agreement": [
    Q.state(),
    Q.text("disclosingPartyName", "Disclosing Party (shares information)", "Parties", { placeholder: "Acme Corp" }),
    Q.select("disclosingPartyType", "Disclosing Party Entity Type", "Parties", ["Corporation", "LLC", "Limited Partnership", "Sole Proprietor / Individual"], { required: false }),
    Q.text("disclosingPartyAddress", "Disclosing Party Address (City, State)", "Parties", { required: false, placeholder: "e.g., San Francisco, California" }),
    Q.text("receivingPartyName", "Receiving Party (must keep secret)", "Parties", { placeholder: "John Smith" }),
    Q.select("receivingPartyType", "Receiving Party Entity Type", "Parties", ["Corporation", "LLC", "Limited Partnership", "Sole Proprietor / Individual"], { required: false }),
    Q.text("receivingPartyAddress", "Receiving Party Address (City, State)", "Parties", { required: false, placeholder: "e.g., Austin, Texas" }),
    Q.textarea("confidentialInfo", "What information must be kept confidential?", "Agreement Terms", {
      required: true,
      placeholder: "e.g., proprietary software, financial projections, customer lists...",
    }),
    Q.select("term", "Confidentiality Period", "Agreement Terms", ["1 year", "2 years", "3 years", "5 years", "10 years", "Indefinite"], {}),
    Q.text("purpose", "Why is the information being shared?", "Agreement Terms", {
      required: true,
      placeholder: "e.g., Evaluating the receiving party as a potential contractor",
    }),
  ],

  // ── LLC OPERATING AGREEMENT ───────────────────────────────────────────────
  "llc-operating-agreement": [
    Q.state("state", "State of Formation", true),
    Q.text("llcName", "LLC Name", "The LLC", { placeholder: "Acme LLC" }),
    Q.text("principalAddress", "Principal Office Address", "The LLC", { placeholder: "123 Main St, Austin, TX 78701" }),
    Q.textarea("businessPurpose", "Business Purpose", "The LLC", {
      required: true,
      placeholder: "e.g., To engage in software development and related technology services",
    }),
    Q.radio("managementType", "Management Structure", "Management", ["Member-managed (all members manage)", "Manager-managed (designated manager)"], {}),
    Q.textarea("members", "Members and Ownership", "Members", {
      required: true,
      placeholder: "Name, Ownership %\nJane Smith, 60%\nJohn Doe, 40%",
      helpText: "List each member's full name and ownership percentage. Must total 100%.",
    }),
    Q.text("capitalContributions", "Initial Capital Contributions", "Finances", {
      required: false,
      placeholder: "e.g., Jane Smith: $60,000 | John Doe: $40,000",
    }),
    Q.select("profitAllocation", "Profit & Loss Allocation", "Finances", ["Pro-rata to ownership percentage", "Equal among all members", "As agreed in writing"], {}),
    Q.select("distributionFrequency", "Distribution Frequency", "Finances", ["Monthly", "Quarterly", "Annually", "At managers' discretion"], {}),
    Q.select("dissolutionVote", "Vote Required for Major Decisions", "Governance", ["Simple majority (>50%)", "Supermajority (>66%)", "Unanimous consent"], {}),
  ],

  // ── SINGLE-MEMBER LLC ─────────────────────────────────────────────────────
  "single-member-llc-operating-agreement": [
    Q.state("state", "State of Formation", true),
    Q.text("llcName", "LLC Name", "The LLC", { placeholder: "Acme LLC" }),
    Q.text("memberName", "Sole Member Name", "The Member", { placeholder: "Jane Smith" }),
    Q.text("principalAddress", "Principal Office Address", "The LLC", { placeholder: "123 Main St, Austin, TX 78701" }),
    Q.textarea("businessPurpose", "Business Purpose", "The LLC", {
      required: true,
      placeholder: "e.g., Consulting services in financial planning and advisory",
    }),
    Q.text("initialCapital", "Initial Capital Contribution", "Finances", {
      required: false,
      placeholder: "e.g., $10,000",
    }),
    Q.select("taxClassification", "Tax Classification", "Tax & Finances", ["Disregarded entity (default)", "S-Corporation election", "C-Corporation election"], {}),
    Q.radio("managementType", "Management", "Management", ["Member-managed (sole member manages)", "Manager-managed (member appoints a manager)"], {}),
  ],

  // ── MULTI-MEMBER LLC ──────────────────────────────────────────────────────
  "multi-member-llc-operating-agreement": [
    Q.state("state", "State of Formation", true),
    Q.text("llcName", "LLC Name", "The LLC", { placeholder: "Acme Ventures LLC" }),
    Q.text("principalAddress", "Principal Office Address", "The LLC", { placeholder: "123 Main St, Austin, TX 78701" }),
    Q.textarea("businessPurpose", "Business Purpose", "The LLC", {
      required: true,
      placeholder: "e.g., Real estate investment and property management",
    }),
    Q.radio("managementType", "Management Structure", "Management", ["Member-managed (all members manage equally)", "Manager-managed (one or more designated managers)"], {}),
    Q.textarea("members", "Members and Ownership Percentages", "Members", {
      required: true,
      placeholder: "Jane Smith — 50%\nJohn Doe — 30%\nAcme Holdings — 20%",
      helpText: "List each member (individual or entity) and their ownership. Must total 100%.",
    }),
    Q.textarea("capitalContributions", "Initial Capital Contributions", "Finances", {
      required: true,
      placeholder: "Jane Smith: $50,000\nJohn Doe: $30,000\nAcme Holdings: $20,000",
    }),
    Q.select("profitAllocation", "Profit & Loss Allocation", "Finances", ["Pro-rata to ownership percentage", "Equal among all members", "As agreed by members in writing"], {}),
    Q.select("distributionFrequency", "Distribution Frequency", "Finances", ["Monthly", "Quarterly", "Annually", "At managers' discretion"], {}),
    Q.select("majorDecisionVote", "Vote Required for Major Decisions", "Governance", ["Simple majority (>50%)", "Supermajority (>66%)", "Unanimous consent required"], {}),
    Q.textarea("transferRestrictions", "Transfer Restrictions (right of first refusal?)", "Exit & Transfers", {
      required: false,
      placeholder: "e.g., Members must offer their interest to existing members before selling to third parties",
    }),
  ],

  // ── PARTNERSHIP AGREEMENT ─────────────────────────────────────────────────
  "partnership-agreement": [
    Q.state(),
    Q.text("partnershipName", "Partnership Name", "The Partnership", { placeholder: "Smith & Jones Partners" }),
    Q.radio("partnershipType", "Partnership Type", "The Partnership", ["General Partnership", "Limited Partnership (LP)"], {}),
    Q.textarea("businessPurpose", "Business Purpose", "The Partnership", { required: true, placeholder: "e.g., Commercial real estate development" }),
    Q.textarea("partners", "Partners and Ownership", "Partners", {
      required: true,
      placeholder: "Jane Smith — 50% (General Partner)\nJohn Doe — 50% (General Partner)",
      helpText: "List each partner, their ownership %, and type (General or Limited).",
    }),
    Q.textarea("capitalContributions", "Capital Contributions", "Finances", { required: true, placeholder: "Jane Smith: $25,000 | John Doe: $25,000" }),
    Q.select("profitAllocation", "Profit & Loss Split", "Finances", ["Equal among all partners", "Pro-rata to ownership", "As agreed in writing"], {}),
    Q.select("dissolutionVote", "Decision-Making Threshold", "Governance", ["Simple majority", "Unanimous consent", "75% supermajority"], {}),
    Q.text("term", "Partnership Duration", "Governance", { required: false, placeholder: "e.g., 10 years, or leave blank for indefinite" }),
  ],

  // ── GENERAL PARTNERSHIP AGREEMENT ────────────────────────────────────────
  "general-partnership-agreement": [
    Q.state(),
    Q.text("partnershipName", "Partnership Name", "The Partnership", { placeholder: "Smith & Jones GP" }),
    Q.textarea("businessPurpose", "Business Purpose", "The Partnership", { required: true }),
    Q.textarea("partners", "Partners and Ownership", "Partners", {
      required: true,
      placeholder: "Jane Smith — 50%\nJohn Doe — 50%",
    }),
    Q.textarea("capitalContributions", "Capital Contributions", "Finances", { required: true }),
    Q.select("profitAllocation", "Profit & Loss Split", "Finances", ["Equal shares", "Pro-rata to capital contribution", "Custom (describe below)"], {}),
    Q.textarea("specialTerms", "Special Terms or Custom Profit Split", "Finances", { required: false }),
    Q.select("dissolutionVote", "Decision Voting", "Governance", ["Majority rules", "Unanimous consent", "Supermajority (66%)"], {}),
  ],

  // ── SERVICE AGREEMENT ─────────────────────────────────────────────────────
  "service-agreement": [
    Q.state(),
    Q.text("clientName", "Client Name", "Parties", { placeholder: "Acme Corp" }),
    Q.text("providerName", "Service Provider Name", "Parties", { placeholder: "Jane Smith Consulting LLC" }),
    Q.textarea("scopeOfServices", "Scope of Services", "Services", {
      required: true,
      placeholder: "e.g., Website design and development including up to 10 pages, mobile-responsive...",
    }),
    Q.text("projectStartDate", "Project Start Date", "Timeline", { placeholder: "e.g., January 1, 2026" }),
    Q.text("projectEndDate", "Project End Date or Duration", "Timeline", { placeholder: "e.g., March 31, 2026, or 90 days from start" }),
    Q.radio("paymentType", "Payment Structure", "Payment", ["Fixed fee", "Hourly rate", "Milestone-based"], {}),
    Q.text("paymentAmount", "Payment Amount", "Payment", { placeholder: "e.g., $5,000 fixed, or $150/hour" }),
    Q.select("paymentSchedule", "Payment Schedule", "Payment", ["Net 15", "Net 30", "50% upfront / 50% on completion", "Monthly", "Per milestone"], {}),
    Q.radio("ipOwnership", "Intellectual Property Ownership", "IP & Confidentiality", ["Client owns all work product", "Provider retains all IP; client gets license", "Shared ownership"], {}),
    Q.radio("terminationNotice", "Termination Notice Period", "Termination", ["7 days", "14 days", "30 days", "60 days"], {}),
  ],

  // ── INDEPENDENT CONTRACTOR AGREEMENT ─────────────────────────────────────
  "independent-contractor-agreement": [
    Q.state(),
    Q.text("clientName", "Client / Hiring Party Name", "Parties", { placeholder: "Acme Corp" }),
    Q.text("contractorName", "Contractor Name", "Parties", { placeholder: "John Smith or Smith Consulting LLC" }),
    Q.textarea("servicesDescription", "Description of Services", "Services", {
      required: true,
      placeholder: "e.g., Software development services, including backend API development using Python/Django...",
    }),
    Q.text("startDate", "Start Date", "Timeline", { placeholder: "e.g., February 1, 2026" }),
    Q.text("endDate", "End Date (or leave blank for ongoing)", "Timeline", { required: false, placeholder: "e.g., December 31, 2026" }),
    Q.radio("compensationType", "Compensation Type", "Payment", ["Hourly rate", "Fixed project fee", "Monthly retainer"], {}),
    Q.text("compensationAmount", "Rate / Fee Amount", "Payment", { placeholder: "e.g., $125/hour or $10,000 fixed" }),
    Q.select("invoiceSchedule", "Invoice / Payment Schedule", "Payment", ["Weekly", "Bi-weekly", "Monthly", "On project milestones", "Net 30"], {}),
    Q.radio("ipOwnership", "Who Owns Work Product?", "IP & Confidentiality", ["Client owns all deliverables (work-for-hire)", "Contractor retains IP, grants license to client", "Specified in a separate IP agreement"], {}),
    Q.radio("nonCompete", "Non-Compete Clause?", "Restrictions", ["No non-compete", "6-month non-compete in same industry", "1-year non-compete in same industry"], {}),
  ],

  // ── 1099 CONTRACTOR AGREEMENT ─────────────────────────────────────────────
  "1099-contractor-agreement": [
    Q.state(),
    Q.text("companyName", "Company Name", "Parties", { placeholder: "Acme Corp" }),
    Q.text("contractorName", "Contractor Name", "Parties", { placeholder: "Jane Smith" }),
    Q.textarea("servicesDescription", "Services to Be Performed", "Services", {
      required: true,
      placeholder: "e.g., Graphic design for marketing campaigns and brand collateral",
    }),
    Q.text("hourlyRate", "Hourly Rate or Project Fee", "Payment", { placeholder: "e.g., $75/hour" }),
    Q.select("paymentTerms", "Payment Terms", "Payment", ["Net 15", "Net 30", "Weekly", "Bi-weekly", "Per milestone"], {}),
    Q.radio("workLocation", "Where Will Work Be Performed?", "Work Arrangement", ["Fully remote", "On-site at company location", "Hybrid"], {}),
    Q.text("contractDuration", "Contract Duration", "Timeline", { placeholder: "e.g., 6 months, or ongoing until terminated" }),
  ],

  // ── EMPLOYMENT CONTRACT ───────────────────────────────────────────────────
  "employment-contract": [
    Q.state(),
    Q.text("employerName", "Employer Name", "Parties", { placeholder: "Acme Corp" }),
    Q.text("employeeName", "Employee Name", "Parties", { placeholder: "Jane Smith" }),
    Q.text("jobTitle", "Job Title", "Role & Compensation", { placeholder: "e.g., Senior Software Engineer" }),
    Q.textarea("jobDuties", "Primary Job Duties", "Role & Compensation", {
      required: true,
      placeholder: "e.g., Design and implement backend systems, lead code reviews, mentor junior engineers...",
    }),
    Q.text("startDate", "Start Date", "Role & Compensation", { placeholder: "e.g., March 1, 2026" }),
    Q.radio("employmentType", "Employment Type", "Role & Compensation", ["Full-time", "Part-time"], {}),
    Q.text("salary", "Salary or Hourly Rate", "Role & Compensation", { placeholder: "e.g., $120,000/year or $65/hour" }),
    Q.select("payFrequency", "Pay Frequency", "Role & Compensation", ["Weekly", "Bi-weekly", "Semi-monthly", "Monthly"], {}),
    Q.textarea("benefits", "Benefits (if any)", "Role & Compensation", {
      required: false,
      placeholder: "e.g., Health insurance (employer pays 80%), 401k match up to 4%, 15 days PTO",
    }),
    Q.radio("employmentTerm", "Employment Term", "Duration", ["At-will (either party may terminate anytime)", "Fixed term (specify below)"], {}),
    Q.text("fixedTermEnd", "Fixed Term End Date (if applicable)", "Duration", { required: false, placeholder: "e.g., December 31, 2026" }),
    Q.radio("ipAssignment", "Intellectual Property", "IP & Confidentiality", ["Employee assigns all work product to employer", "Employee retains IP created outside work hours"], {}),
  ],

  // ── AT-WILL EMPLOYMENT CONTRACT ───────────────────────────────────────────
  "at-will-employment-contract": [
    Q.state(),
    Q.text("employerName", "Employer Name", "Parties", { placeholder: "Acme Corp" }),
    Q.text("employeeName", "Employee Name", "Parties", { placeholder: "John Doe" }),
    Q.text("jobTitle", "Job Title", "Role", { placeholder: "e.g., Marketing Manager" }),
    Q.textarea("jobDuties", "Primary Duties", "Role", { required: true, placeholder: "Key responsibilities..." }),
    Q.text("startDate", "Start Date", "Role", { placeholder: "e.g., March 1, 2026" }),
    Q.text("salary", "Compensation", "Compensation", { placeholder: "e.g., $85,000/year" }),
    Q.select("payFrequency", "Pay Frequency", "Compensation", ["Weekly", "Bi-weekly", "Semi-monthly", "Monthly"], {}),
    Q.textarea("benefits", "Benefits", "Compensation", { required: false, placeholder: "Health insurance, PTO, 401k..." }),
    Q.select("noticePeriod", "Notice Period on Termination", "At-Will Terms", ["No notice required", "2 weeks notice preferred", "30 days notice preferred"], {}),
  ],

  // ── FIXED-TERM EMPLOYMENT ─────────────────────────────────────────────────
  "fixed-term-employment-contract": [
    Q.state(),
    Q.text("employerName", "Employer Name", "Parties", { placeholder: "Acme Corp" }),
    Q.text("employeeName", "Employee Name", "Parties", { placeholder: "Jane Smith" }),
    Q.text("jobTitle", "Job Title", "Role", { placeholder: "e.g., Project Manager" }),
    Q.textarea("jobDuties", "Primary Duties", "Role", { required: true }),
    Q.text("startDate", "Contract Start Date", "Contract Term", { placeholder: "e.g., January 6, 2026" }),
    Q.text("endDate", "Contract End Date", "Contract Term", { required: true, placeholder: "e.g., December 31, 2026" }),
    Q.text("salary", "Compensation", "Compensation", { placeholder: "e.g., $90,000/year" }),
    Q.select("payFrequency", "Pay Frequency", "Compensation", ["Weekly", "Bi-weekly", "Semi-monthly", "Monthly"], {}),
    Q.radio("renewalOption", "Contract Renewal", "Contract Term", ["Automatically renews unless notice given", "Expires without renewal", "Subject to mutual agreement"], {}),
  ],

  // ── NON-COMPETE AGREEMENT ─────────────────────────────────────────────────
  "non-compete-agreement": [
    Q.state(),
    Q.text("employerName", "Company / Employer Name", "Parties", { placeholder: "Acme Corp" }),
    Q.text("employeeName", "Employee / Individual Name", "Parties", { placeholder: "John Smith" }),
    Q.text("jobTitle", "Position / Role", "Parties", { placeholder: "e.g., VP of Sales" }),
    Q.select("restrictionPeriod", "Restriction Period After Employment", "Restriction Terms", ["6 months", "1 year", "2 years", "3 years"], {}),
    Q.textarea("geographicScope", "Geographic Scope of Restriction", "Restriction Terms", {
      required: true,
      placeholder: "e.g., Within 50 miles of company's principal office, or nationwide, or specific states",
    }),
    Q.textarea("restrictedActivities", "Restricted Activities / Industry", "Restriction Terms", {
      required: true,
      placeholder: "e.g., Working for or founding any company in the SaaS CRM software space",
    }),
    Q.text("consideration", "Consideration for Agreement", "Consideration", {
      required: true,
      placeholder: "e.g., Employment offer, $5,000 severance, stock options",
      helpText: "Non-competes must be supported by consideration. State what value the employee receives.",
    }),
  ],

  // ── EMPLOYEE NDA ──────────────────────────────────────────────────────────
  "employee-non-disclosure-agreement": [
    Q.state(),
    Q.text("employerName", "Employer Name", "Parties", { placeholder: "Acme Corp" }),
    Q.text("employerAddress", "Employer Business Address", "Parties", { required: false, placeholder: "e.g., 123 Main St, Austin, TX 78701" }),
    Q.text("employeeName", "Employee Name", "Parties", { placeholder: "Jane Smith" }),
    Q.text("jobTitle", "Employee's Position", "Parties", { placeholder: "e.g., Software Engineer" }),
    Q.textarea("confidentialInfo", "Types of Confidential Information", "Confidentiality", {
      required: true,
      placeholder: "e.g., trade secrets, customer lists, pricing data, source code, product roadmaps, financial data",
    }),
    Q.select("confidentialityTerm", "Confidentiality Period After Employment", "Confidentiality", ["1 year", "2 years", "5 years", "Indefinite (while information remains secret)"], {}),
    Q.radio("returnOfMaterials", "Return of Materials on Termination", "Obligations", ["Employee must return all materials immediately", "Employee must certify destruction of copies"], {}),
  ],

  // ── RESIDENTIAL LEASE ─────────────────────────────────────────────────────
  "residential-lease-agreement": [
    Q.state(),
    Q.text("landlordName", "Landlord / Lessor Name", "Parties", { placeholder: "John Smith" }),
    Q.text("tenantNames", "Tenant(s) Full Name(s)", "Parties", { placeholder: "Jane Doe and Robert Doe" }),
    Q.text("propertyAddress", "Rental Property Address", "Property", {
      required: true,
      placeholder: "123 Main St, Apt 4B, Austin, TX 78701",
    }),
    Q.radio("propertyType", "Property Type", "Property", ["Apartment / Unit", "Single-family home", "Condo", "Room in shared house", "Duplex"], {}),
    Q.text("leaseStartDate", "Lease Start Date", "Lease Terms", { placeholder: "e.g., February 1, 2026" }),
    Q.text("leaseEndDate", "Lease End Date", "Lease Terms", { placeholder: "e.g., January 31, 2027" }),
    Q.text("monthlyRent", "Monthly Rent Amount", "Rent & Deposits", { required: true, placeholder: "e.g., $2,200" }),
    Q.text("rentDueDay", "Rent Due Day", "Rent & Deposits", { placeholder: "e.g., 1st of each month" }),
    Q.text("securityDeposit", "Security Deposit Amount", "Rent & Deposits", { placeholder: "e.g., $2,200 (equal to one month's rent)" }),
    Q.select("lateFee", "Late Fee", "Rent & Deposits", ["No late fee", "$25 after 3 days", "$50 after 3 days", "$100 after 5 days", "5% of monthly rent"], {}),
    Q.radio("petsAllowed", "Pets", "Additional Terms", ["No pets allowed", "Pets allowed with $500 pet deposit", "Pets allowed (case by case)"], {}),
    Q.radio("utilitiesIncluded", "Utilities", "Additional Terms", ["Tenant pays all utilities", "Landlord pays water/trash; tenant pays electric/gas", "All utilities included in rent"], {}),
  ],

  // ── COMMERCIAL LEASE ──────────────────────────────────────────────────────
  "commercial-lease-agreement": [
    Q.state(),
    Q.text("landlordName", "Landlord / Lessor", "Parties", { placeholder: "Smith Properties LLC" }),
    Q.text("tenantName", "Tenant / Lessee (Business Name)", "Parties", { placeholder: "Acme Retail Corp" }),
    Q.text("propertyAddress", "Property Address", "Property", {
      required: true,
      placeholder: "100 Commerce Blvd, Suite 200, Dallas, TX 75201",
    }),
    Q.text("squareFootage", "Square Footage / Space", "Property", { placeholder: "e.g., 2,500 sq ft" }),
    Q.text("permittedUse", "Permitted Use / Business Type", "Property", {
      required: true,
      placeholder: "e.g., Retail clothing store, or professional office space",
    }),
    Q.text("leaseStartDate", "Lease Start Date", "Lease Terms", { placeholder: "e.g., March 1, 2026" }),
    Q.text("leaseTerm", "Lease Term", "Lease Terms", { placeholder: "e.g., 3 years, or 5 years" }),
    Q.text("baseRent", "Base Monthly Rent", "Rent & Expenses", { required: true, placeholder: "e.g., $4,500/month" }),
    Q.radio("leaseType", "Lease Type", "Rent & Expenses", ["Gross lease (landlord pays operating expenses)", "Net lease (tenant pays some expenses)", "Triple-net / NNN (tenant pays all expenses)"], {}),
    Q.text("securityDeposit", "Security Deposit", "Rent & Expenses", { placeholder: "e.g., $9,000 (2 months)" }),
    Q.radio("tenantImprovements", "Tenant Improvements", "Improvements", ["Tenant takes space as-is", "Landlord provides TI allowance", "Landlord builds to suit"], {}),
    Q.radio("renewalOption", "Renewal Option", "Lease Terms", ["No renewal option", "1 option to renew for same term", "2 options to renew for same term"], {}),
  ],

  // ── MONTH-TO-MONTH LEASE ──────────────────────────────────────────────────
  "month-to-month-lease-agreement": [
    Q.state(),
    Q.text("landlordName", "Landlord Name", "Parties", { placeholder: "John Smith" }),
    Q.text("tenantNames", "Tenant(s) Name(s)", "Parties", { placeholder: "Jane Doe" }),
    Q.text("propertyAddress", "Property Address", "Property", { required: true }),
    Q.text("monthlyRent", "Monthly Rent", "Rent", { required: true, placeholder: "e.g., $1,800" }),
    Q.text("startDate", "Agreement Start Date", "Terms", { placeholder: "e.g., February 1, 2026" }),
    Q.select("noticeTerm", "Notice Required to Terminate", "Terms", ["15 days", "30 days", "60 days"], {
      helpText: "Most states require 30 days for month-to-month leases.",
    }),
    Q.text("securityDeposit", "Security Deposit", "Rent", { required: false, placeholder: "e.g., $1,800" }),
    Q.radio("utilitiesIncluded", "Utilities", "Additional Terms", ["Tenant pays all utilities", "All utilities included", "Landlord pays water; tenant pays electric/gas"], {}),
  ],

  // ── TRIPLE NET LEASE ──────────────────────────────────────────────────────
  "triple-net-lease-agreement": [
    Q.state(),
    Q.text("landlordName", "Landlord Name", "Parties", { placeholder: "Prime Properties LP" }),
    Q.text("tenantName", "Tenant Name", "Parties", { placeholder: "National Retail Corp" }),
    Q.text("propertyAddress", "Property Address", "Property", { required: true }),
    Q.text("squareFootage", "Leased Square Footage", "Property", { placeholder: "e.g., 10,000 sq ft" }),
    Q.text("leaseTerm", "Lease Term", "Lease Terms", { required: true, placeholder: "e.g., 10 years" }),
    Q.text("baseRent", "Base Rent ($/sq ft/year or $/month)", "Rent", { required: true, placeholder: "e.g., $18/sq ft/year" }),
    Q.text("rentCommencement", "Rent Commencement Date", "Lease Terms", { placeholder: "e.g., April 1, 2026" }),
    Q.radio("annualEscalation", "Annual Rent Escalation", "Rent", ["Fixed % increase (specify below)", "CPI-indexed increase", "No escalation"], {}),
    Q.text("escalationRate", "Escalation Rate (if fixed)", "Rent", { required: false, placeholder: "e.g., 3% per year" }),
    Q.textarea("nnnExpenses", "NNN Expenses Tenant Is Responsible For", "NNN Terms", {
      required: true,
      placeholder: "Property taxes, property insurance premiums, all maintenance and repairs, utilities...",
    }),
    Q.radio("renewalOptions", "Renewal Options", "Lease Terms", ["No option to renew", "One 5-year option", "Two 5-year options"], {}),
  ],

  // ── ROOM RENTAL AGREEMENT ─────────────────────────────────────────────────
  "room-rental-agreement": [
    Q.state(),
    Q.text("landlordName", "Landlord / Primary Tenant Name", "Parties", { placeholder: "John Smith" }),
    Q.text("tenantName", "Room Renter Name", "Parties", { placeholder: "Jane Doe" }),
    Q.text("propertyAddress", "Property Address", "Property", { required: true }),
    Q.text("roomDescription", "Room Description", "Property", { placeholder: "e.g., Second bedroom, north side of house" }),
    Q.text("monthlyRent", "Monthly Rent for Room", "Rent", { required: true, placeholder: "e.g., $800" }),
    Q.text("startDate", "Start Date", "Terms", { placeholder: "e.g., February 1, 2026" }),
    Q.text("endDate", "End Date (or month-to-month)", "Terms", { required: false, placeholder: "Leave blank for month-to-month" }),
    Q.text("securityDeposit", "Security Deposit", "Rent", { required: false, placeholder: "e.g., $800" }),
    Q.textarea("sharedSpaces", "Shared Areas & Rules", "House Rules", {
      required: false,
      placeholder: "e.g., Kitchen, living room, and 1 bathroom shared. No smoking. Quiet hours 10pm-8am.",
    }),
  ],

  // ── SUBLEASE ──────────────────────────────────────────────────────────────
  "sublease-agreement": [
    Q.state(),
    Q.text("sublessorName", "Sublessor Name (original tenant)", "Parties", { placeholder: "Jane Smith" }),
    Q.text("sublesseeName", "Sublessee Name (new tenant)", "Parties", { placeholder: "John Doe" }),
    Q.text("landlordName", "Master Landlord Name", "Parties", { placeholder: "Smith Properties LLC" }),
    Q.text("propertyAddress", "Property Address", "Property", { required: true }),
    Q.text("subleaseStartDate", "Sublease Start Date", "Sublease Terms", { required: true }),
    Q.text("subleaseEndDate", "Sublease End Date", "Sublease Terms", { required: true }),
    Q.text("subMonthlyRent", "Monthly Rent (sublessee to sublessor)", "Rent", { required: true, placeholder: "e.g., $1,500" }),
    Q.text("securityDeposit", "Security Deposit", "Rent", { required: false, placeholder: "e.g., $1,500" }),
    Q.radio("landlordApproval", "Has Landlord Approved This Sublease?", "Approval", ["Yes, written approval obtained", "Approval pending", "Master lease permits subletting without approval"], {}),
  ],

  // ── POWER OF ATTORNEY ─────────────────────────────────────────────────────
  "power-of-attorney": [
    Q.state(),
    Q.text("principalName", "Principal Name (granting power)", "Parties", { placeholder: "Jane Smith", helpText: "The person granting authority." }),
    Q.text("agentName", "Agent / Attorney-in-Fact Name", "Parties", { placeholder: "John Smith", helpText: "The person receiving authority." }),
    Q.text("agentRelationship", "Agent's Relationship to Principal", "Parties", { placeholder: "e.g., Spouse, adult child, sibling, trusted friend" }),
    Q.radio("poaType", "Type of Power of Attorney", "Scope & Powers", ["General (broad authority)", "Limited / Special (specific purpose)", "Springing (activates on incapacity)"], {}),
    Q.radio("durability", "Is This Durable?", "Scope & Powers", ["Yes — remains effective if principal becomes incapacitated", "No — terminates if principal becomes incapacitated"], {
      helpText: "A 'durable' POA survives incapacity. This is usually preferred.",
    }),
    Q.textarea("grantedPowers", "Powers Granted", "Scope & Powers", {
      required: true,
      placeholder: "e.g., Real estate transactions, banking and financial management, business operations, tax matters...",
    }),
    Q.text("effectiveDate", "Effective Date", "Scope & Powers", { placeholder: "e.g., Immediately upon signing, or upon incapacity" }),
    Q.text("expirationDate", "Expiration Date (if any)", "Scope & Powers", { required: false, placeholder: "Leave blank if no expiration" }),
    Q.radio("successorAgent", "Successor Agent?", "Succession", ["No successor designated", "Yes — name a backup below"], {}),
    Q.text("successorAgentName", "Successor Agent Name (if any)", "Succession", { required: false }),
  ],

  // ── DURABLE POWER OF ATTORNEY ─────────────────────────────────────────────
  "durable-power-of-attorney": [
    Q.state(),
    Q.text("principalName", "Principal Name", "Parties", { placeholder: "Jane Smith" }),
    Q.text("agentName", "Primary Agent Name", "Parties", { placeholder: "John Smith" }),
    Q.text("agentRelationship", "Agent's Relationship", "Parties", { placeholder: "e.g., Spouse" }),
    Q.text("successorAgent", "Successor Agent Name (backup)", "Parties", { required: false, placeholder: "e.g., Mary Smith (daughter)" }),
    Q.textarea("grantedPowers", "Financial Powers Granted", "Powers", {
      required: true,
      placeholder: "e.g., Banking, real estate, investments, taxes, business management, government benefits...",
    }),
    Q.radio("giftingPower", "Include Gifting Power?", "Powers", ["No gifting authority", "Agent may make gifts up to annual IRS exclusion limit"], {}),
    Q.radio("selfDealing", "Self-Dealing", "Powers", ["Agent may NOT benefit personally from transactions", "Agent may benefit with principal's express consent"], {}),
    Q.text("effectiveDate", "Effective Date", "Effective Date", { placeholder: "Immediately upon signing" }),
  ],

  // ── MEDICAL POWER OF ATTORNEY ──────────────────────────────────────────────
  "medical-power-of-attorney": [
    Q.state(),
    Q.text("principalName", "Patient / Principal Name", "Parties", { placeholder: "Jane Smith" }),
    Q.text("agentName", "Healthcare Agent Name", "Parties", { placeholder: "John Smith", helpText: "Who can make medical decisions if you cannot?" }),
    Q.text("agentRelationship", "Agent's Relationship", "Parties", { placeholder: "e.g., Spouse, adult child" }),
    Q.text("successorAgent", "Alternate Agent (backup)", "Parties", { required: false, placeholder: "e.g., Mary Smith" }),
    Q.textarea("healthcareDecisions", "Healthcare Decisions Agent Can Make", "Powers", {
      required: true,
      placeholder: "e.g., Consent to or refuse medical treatment, select/discharge healthcare providers, review medical records...",
    }),
    Q.radio("lifeSustaining", "Life-Sustaining Treatment", "End-of-Life Wishes", ["Agent decides based on principal's known wishes", "Always provide all life-sustaining treatment", "Withhold life-sustaining treatment if no reasonable expectation of recovery"], {}),
    Q.textarea("additionalWishes", "Additional Healthcare Wishes or Instructions", "End-of-Life Wishes", {
      required: false,
      placeholder: "e.g., Principal wishes to remain at home if possible; organ donation preferences...",
    }),
  ],

  // ── LAST WILL & TESTAMENT ─────────────────────────────────────────────────
  "last-will-and-testament": [
    Q.state(),
    Q.text("testatorName", "Your Full Legal Name (Testator)", "The Testator", { required: true, placeholder: "Jane Alice Smith" }),
    Q.text("testatorAddress", "Your Current Address", "The Testator", { required: true }),
    Q.text("executorName", "Executor Name (who manages your estate)", "Executor", {
      required: true,
      placeholder: "John Smith",
      helpText: "The executor carries out the will's instructions. Choose a trustworthy adult.",
    }),
    Q.text("alternateExecutor", "Alternate Executor (backup)", "Executor", { required: false, placeholder: "Mary Smith" }),
    Q.textarea("beneficiaries", "Beneficiaries and Their Inheritance", "Beneficiaries", {
      required: true,
      placeholder: "John Smith (spouse) — 50% of estate\nSarah Smith (daughter) — 25%\nMichael Smith (son) — 25%",
    }),
    Q.textarea("specificBequests", "Specific Bequests (optional)", "Specific Gifts", {
      required: false,
      placeholder: "e.g., My 1967 Mustang to my son Michael. My jewelry collection to my daughter Sarah.",
    }),
    Q.textarea("residuaryEstate", "Residuary Estate (everything else goes to...)", "Residuary Estate", {
      required: true,
      placeholder: "e.g., Equally to my surviving children, or 100% to my spouse",
    }),
    Q.radio("minorGuardian", "Do You Have Minor Children?", "Minor Children", ["No", "Yes — I want to name a guardian"], {}),
    Q.text("guardianName", "Guardian for Minor Children (if applicable)", "Minor Children", { required: false }),
    Q.radio("petTrust", "Do You Have Pets to Provide For?", "Pets", ["No", "Yes — include a pet care provision"], {}),
  ],

  // ── SIMPLE WILL ───────────────────────────────────────────────────────────
  "simple-will": [
    Q.state(),
    Q.text("testatorName", "Your Full Legal Name", "The Testator", { required: true }),
    Q.text("executorName", "Executor Name", "Executor", { required: true }),
    Q.textarea("beneficiaries", "Who Inherits Your Estate?", "Beneficiaries", {
      required: true,
      placeholder: "Spouse — 100%, or\nSpouse — 50%, Children equally — 50%",
    }),
    Q.textarea("specificGifts", "Specific Gifts (optional)", "Specific Gifts", { required: false }),
    Q.text("guardianName", "Guardian for Minor Children (if applicable)", "Minor Children", { required: false }),
  ],

  // ── LIVING WILL ───────────────────────────────────────────────────────────
  "living-will": [
    Q.state(),
    Q.text("principalName", "Your Full Legal Name", "Your Identity", { required: true }),
    Q.radio("lifeSustaining", "Life-Sustaining Treatment", "End-of-Life Preferences", [
      "Withhold if terminal and no reasonable expectation of recovery",
      "Always provide all available life-sustaining treatment",
      "Use my healthcare agent's judgment based on my wishes",
    ], {}),
    Q.radio("artificialNutrition", "Artificial Nutrition & Hydration", "End-of-Life Preferences", ["Withhold if treatment would only prolong dying", "Continue as long as medically possible", "Defer to healthcare agent"], {}),
    Q.radio("painManagement", "Pain Management", "End-of-Life Preferences", ["Maximize comfort care even if it shortens life", "Comfort care but do not hasten death"], {}),
    Q.radio("organDonation", "Organ Donation", "Final Wishes", ["I wish to donate all usable organs and tissue", "I do not wish to donate organs", "Donate specific organs only (specify below)"], {}),
    Q.text("organDetails", "Specific Organ Donation Details (if applicable)", "Final Wishes", { required: false }),
    Q.textarea("additionalDirectives", "Any Additional Directives or Wishes", "Additional", { required: false }),
    Q.text("healthcareAgentName", "Healthcare Agent Name (if separate document)", "Healthcare Agent", { required: false }),
  ],

  // ── PROMISSORY NOTE ───────────────────────────────────────────────────────
  "promissory-note": [
    Q.state(),
    Q.text("lenderName", "Lender Name", "Parties", { placeholder: "John Smith or First Bank LLC" }),
    Q.text("borrowerName", "Borrower Name", "Parties", { placeholder: "Jane Doe" }),
    Q.text("principalAmount", "Principal Loan Amount", "Loan Terms", { required: true, placeholder: "e.g., $15,000" }),
    Q.text("interestRate", "Annual Interest Rate", "Loan Terms", { placeholder: "e.g., 6% or 0% (interest-free)" }),
    Q.text("loanDate", "Date of Loan / Execution Date", "Loan Terms", { placeholder: "e.g., January 15, 2026" }),
    Q.select("repaymentSchedule", "Repayment Schedule", "Repayment", ["Monthly installments", "Bi-weekly installments", "Lump sum at maturity", "Interest-only monthly, principal at maturity"], {}),
    Q.text("maturityDate", "Maturity Date (final payment due)", "Repayment", { required: true, placeholder: "e.g., January 15, 2028" }),
    Q.radio("collateral", "Is This Note Secured by Collateral?", "Security", ["Unsecured (no collateral)", "Secured — collateral described below"], {}),
    Q.text("collateralDescription", "Collateral Description (if secured)", "Security", { required: false, placeholder: "e.g., 2019 Toyota Camry VIN 1234..." }),
    Q.radio("prepayment", "Prepayment Penalty", "Additional Terms", ["No prepayment penalty", "Prepayment penalty applies (specify below)"], {}),
  ],

  // ── SECURED PROMISSORY NOTE ───────────────────────────────────────────────
  "secured-promissory-note": [
    Q.state(),
    Q.text("lenderName", "Lender Name", "Parties", { placeholder: "John Smith" }),
    Q.text("borrowerName", "Borrower Name", "Parties", { placeholder: "Jane Doe" }),
    Q.text("principalAmount", "Principal Amount", "Loan Terms", { required: true, placeholder: "e.g., $50,000" }),
    Q.text("interestRate", "Annual Interest Rate", "Loan Terms", { required: true, placeholder: "e.g., 7.5%" }),
    Q.text("loanDate", "Date of Note", "Loan Terms", { placeholder: "e.g., January 15, 2026" }),
    Q.text("maturityDate", "Maturity Date", "Repayment", { required: true }),
    Q.select("repaymentSchedule", "Repayment Schedule", "Repayment", ["Monthly installments", "Quarterly installments", "Lump sum at maturity", "Interest only; principal at maturity"], {}),
    Q.textarea("collateralDescription", "Collateral Description", "Collateral", {
      required: true,
      placeholder: "e.g., Real property located at 123 Main St, Austin TX 78701, with legal description...",
    }),
    Q.radio("defaultRemedies", "Default Remedies", "Default", ["Acceleration of full balance", "Foreclosure on collateral", "Both acceleration and foreclosure"], {}),
  ],

  // ── LOAN AGREEMENT ────────────────────────────────────────────────────────
  "loan-agreement": [
    Q.state(),
    Q.text("lenderName", "Lender Name", "Parties", { placeholder: "First Capital LLC" }),
    Q.text("borrowerName", "Borrower Name", "Parties", { placeholder: "Acme Corp" }),
    Q.text("loanAmount", "Loan Amount", "Loan Terms", { required: true, placeholder: "e.g., $100,000" }),
    Q.text("interestRate", "Annual Interest Rate", "Loan Terms", { required: true, placeholder: "e.g., 8%" }),
    Q.text("loanPurpose", "Purpose of Loan", "Loan Terms", { placeholder: "e.g., Working capital for business expansion" }),
    Q.text("disbursementDate", "Disbursement Date", "Loan Terms", { placeholder: "e.g., February 1, 2026" }),
    Q.text("maturityDate", "Final Repayment Date", "Repayment", { required: true }),
    Q.select("repaymentSchedule", "Repayment Schedule", "Repayment", ["Monthly", "Quarterly", "Semi-annual", "Annual", "Lump sum at maturity"], {}),
    Q.radio("secured", "Secured or Unsecured?", "Security", ["Unsecured", "Secured by collateral (describe below)"], {}),
    Q.text("collateral", "Collateral (if secured)", "Security", { required: false }),
    Q.radio("guaranty", "Personal Guaranty?", "Guaranty", ["No guaranty required", "Personal guaranty by owner(s) required"], {}),
  ],

  // ── PERSONAL LOAN AGREEMENT ───────────────────────────────────────────────
  "personal-loan-agreement": [
    Q.state(),
    Q.text("lenderName", "Lender Name", "Parties", { placeholder: "John Smith" }),
    Q.text("borrowerName", "Borrower Name", "Parties", { placeholder: "Jane Doe" }),
    Q.text("loanAmount", "Loan Amount", "Loan Terms", { required: true, placeholder: "e.g., $5,000" }),
    Q.text("interestRate", "Interest Rate (or 0% if interest-free)", "Loan Terms", { placeholder: "e.g., 5% or 0%" }),
    Q.text("repaymentDate", "Repayment Date", "Repayment", { required: true, placeholder: "e.g., December 31, 2026" }),
    Q.select("repaymentMethod", "How Will It Be Repaid?", "Repayment", ["Single lump sum", "Monthly payments", "Bi-weekly payments"], {}),
    Q.text("paymentAmount", "Monthly Payment Amount (if installments)", "Repayment", { required: false, placeholder: "e.g., $450/month" }),
    Q.radio("lateFee", "Late Payment Fee", "Additional Terms", ["No late fee", "$25 flat fee after 10 days", "5% of payment after 5 days"], {}),
  ],

  // ── PAYMENT PLAN AGREEMENT ────────────────────────────────────────────────
  "payment-plan-agreement": [
    Q.state(),
    Q.text("creditorName", "Creditor / Lender Name", "Parties", { placeholder: "Acme Services LLC" }),
    Q.text("debtorName", "Debtor Name", "Parties", { placeholder: "John Smith" }),
    Q.text("totalAmountOwed", "Total Amount Owed", "Debt Details", { required: true, placeholder: "e.g., $8,500" }),
    Q.text("debtOrigin", "Origin of Debt", "Debt Details", { placeholder: "e.g., Outstanding invoice #1042 for web development services" }),
    Q.text("paymentAmount", "Payment Amount Per Installment", "Payment Plan", { required: true, placeholder: "e.g., $500" }),
    Q.select("paymentFrequency", "Payment Frequency", "Payment Plan", ["Weekly", "Bi-weekly", "Monthly"], {}),
    Q.text("firstPaymentDate", "First Payment Date", "Payment Plan", { required: true }),
    Q.text("finalPaymentDate", "Estimated Final Payment Date", "Payment Plan", { required: false }),
    Q.radio("interestOnBalance", "Interest on Remaining Balance", "Payment Plan", ["No interest", "Simple interest at agreed rate (specify)", "0% if payments made on time"], {}),
    Q.text("interestRate", "Interest Rate (if applicable)", "Payment Plan", { required: false, placeholder: "e.g., 5% annually" }),
  ],

  // ── BILL OF SALE ──────────────────────────────────────────────────────────
  "bill-of-sale": [
    Q.state(),
    Q.text("sellerName", "Seller Name", "Parties", { placeholder: "John Smith" }),
    Q.text("buyerName", "Buyer Name", "Parties", { placeholder: "Jane Doe" }),
    Q.textarea("itemDescription", "Item / Property Description", "Item Being Sold", {
      required: true,
      placeholder: "e.g., 2019 MacBook Pro 16-inch, Space Gray, Serial Number XYZ123...",
    }),
    Q.text("salePrice", "Sale Price", "Sale Terms", { required: true, placeholder: "e.g., $1,200" }),
    Q.text("saleDate", "Date of Sale", "Sale Terms", { placeholder: "e.g., January 15, 2026" }),
    Q.radio("conditionWarranty", "Condition / Warranty", "Sale Terms", ["Sold as-is, no warranty", "Seller warrants item is in working condition", "Seller provides limited 30-day warranty"], {}),
    Q.radio("paymentMethod", "Payment Method", "Sale Terms", ["Cash", "Check", "Bank wire / ACH", "Venmo / Zelle", "Financing / Payment plan"], {}),
  ],

  // ── VEHICLE BILL OF SALE ──────────────────────────────────────────────────
  "vehicle-bill-of-sale": [
    Q.state(),
    Q.text("sellerName", "Seller Name", "Parties", { placeholder: "John Smith" }),
    Q.text("buyerName", "Buyer Name", "Parties", { placeholder: "Jane Doe" }),
    Q.text("vehicleYear", "Vehicle Year", "Vehicle Details", { required: true, placeholder: "e.g., 2019" }),
    Q.text("vehicleMake", "Vehicle Make", "Vehicle Details", { required: true, placeholder: "e.g., Toyota" }),
    Q.text("vehicleModel", "Vehicle Model", "Vehicle Details", { required: true, placeholder: "e.g., Camry LE" }),
    Q.text("vin", "VIN (Vehicle Identification Number)", "Vehicle Details", { required: true, placeholder: "17-character VIN" }),
    Q.text("odometer", "Odometer Reading at Sale", "Vehicle Details", { required: true, placeholder: "e.g., 42,500 miles" }),
    Q.text("salePrice", "Sale Price", "Sale Terms", { required: true, placeholder: "e.g., $14,500" }),
    Q.text("saleDate", "Date of Sale", "Sale Terms", { required: true }),
    Q.radio("conditionWarranty", "As-Is or With Warranty?", "Sale Terms", ["Sold as-is, no warranty", "Seller warrants no known mechanical defects"], {}),
    Q.radio("odometerDisclosure", "Odometer Disclosure Required?", "Sale Terms", ["Yes — federal law requires disclosure for vehicles under 10 years old", "No — vehicle is 10+ years old"], {}),
  ],

  // ── DEMAND LETTER ─────────────────────────────────────────────────────────
  "demand-letter": [
    Q.state(),
    Q.text("senderName", "Sender Name (who is demanding?)", "Parties", { placeholder: "Jane Smith or Acme Corp" }),
    Q.text("recipientName", "Recipient Name (who must pay/act?)", "Parties", { placeholder: "John Doe" }),
    Q.textarea("demandDescription", "What Are You Demanding?", "The Demand", {
      required: true,
      placeholder: "e.g., Payment of $5,000 owed for freelance web development services invoiced on Dec 1, 2025...",
    }),
    Q.text("amountOwed", "Amount Owed (if monetary claim)", "The Demand", { required: false, placeholder: "e.g., $5,000" }),
    Q.text("deadline", "Response / Payment Deadline", "The Demand", { required: true, placeholder: "e.g., 14 days from date of this letter" }),
    Q.textarea("backgroundFacts", "Background Facts Supporting Your Claim", "Background", {
      required: true,
      placeholder: "Brief chronology: date of agreement, services performed, invoices sent, non-payment dates...",
    }),
    Q.radio("nextStep", "If Recipient Fails to Respond", "Consequences", ["Small claims court", "Civil litigation", "Collections agency", "Mediation or arbitration"], {}),
  ],

  // ── DEMAND LETTER FOR UNPAID INVOICE ──────────────────────────────────────
  "demand-letter-for-unpaid-invoice": [
    Q.state(),
    Q.text("senderName", "Your Name or Company", "Parties", { placeholder: "Jane Smith Consulting" }),
    Q.text("recipientName", "Client / Debtor Name", "Parties", { placeholder: "Acme Corp" }),
    Q.text("invoiceNumber", "Invoice Number(s)", "Invoice Details", { required: true, placeholder: "e.g., Invoice #1042" }),
    Q.text("invoiceDate", "Invoice Date", "Invoice Details", { placeholder: "e.g., December 1, 2025" }),
    Q.text("amountDue", "Total Amount Due", "Invoice Details", { required: true, placeholder: "e.g., $3,500" }),
    Q.text("serviceDescription", "Services / Goods Provided", "Invoice Details", { required: true, placeholder: "e.g., Website redesign project per contract dated Oct 1, 2025" }),
    Q.text("paymentDeadline", "Payment Deadline", "Demand", { required: true, placeholder: "e.g., 10 days from this letter" }),
    Q.radio("legalAction", "Threatened Next Step", "Demand", ["Small claims court", "Civil lawsuit", "Collections agency", "Credit reporting"], {}),
  ],

  // ── CEASE AND DESIST ──────────────────────────────────────────────────────
  "cease-and-desist-letter": [
    Q.state(),
    Q.text("senderName", "Sender Name", "Parties", { placeholder: "Jane Smith or TechCo LLC" }),
    Q.text("recipientName", "Recipient Name", "Parties", { placeholder: "John Doe" }),
    Q.radio("violationType", "Type of Violation", "The Issue", ["Intellectual property infringement (trademark/copyright)", "Defamation / harassment", "Breach of contract", "Debt collection (cease contact)", "Unfair business practice", "Other"], {}),
    Q.textarea("violationDescription", "Describe the Harmful Activity", "The Issue", {
      required: true,
      placeholder: "e.g., Respondent has been using our registered trademark 'Acme' on competing products since January 2026...",
    }),
    Q.text("demandedAction", "What Must Recipient Do?", "The Demand", {
      required: true,
      placeholder: "e.g., Immediately cease all use of the Acme trademark and destroy infringing materials",
    }),
    Q.text("deadline", "Compliance Deadline", "The Demand", { required: true, placeholder: "e.g., 10 days from the date of this letter" }),
    Q.textarea("legalBasis", "Legal Basis for Claim", "Legal Basis", {
      required: false,
      placeholder: "e.g., 15 U.S.C. § 1125 (Lanham Act), state common law trademark rights...",
    }),
  ],

  // ── NOTICE OF BREACH ──────────────────────────────────────────────────────
  "notice-of-breach": [
    Q.state(),
    Q.text("noticingParty", "Party Giving Notice", "Parties", { placeholder: "Acme Corp" }),
    Q.text("breachingParty", "Party in Breach", "Parties", { placeholder: "Beta Services LLC" }),
    Q.text("contractName", "Contract Being Breached", "Contract Details", { required: true, placeholder: "e.g., Master Service Agreement dated March 1, 2025" }),
    Q.textarea("breachDescription", "Describe the Breach in Detail", "The Breach", {
      required: true,
      placeholder: "e.g., Breaching party failed to deliver Phase 2 software by October 31, 2025 as required by Section 4.2...",
    }),
    Q.text("cureDeadline", "Deadline to Cure the Breach", "Cure & Consequences", { required: true, placeholder: "e.g., 30 days from date of this notice" }),
    Q.textarea("requiredCure", "What Action Is Required to Cure?", "Cure & Consequences", {
      required: true,
      placeholder: "e.g., Deliver fully tested Phase 2 software meeting the specifications in Exhibit A",
    }),
    Q.radio("ifNotCured", "If Breach Is Not Cured", "Cure & Consequences", ["We will terminate the contract", "We will seek damages in court", "We will terminate AND seek damages"], {}),
  ],

  // ── DEBT SETTLEMENT LETTER ────────────────────────────────────────────────
  "debt-settlement-letter": [
    Q.state(),
    Q.text("debtorName", "Debtor Name (you)", "Parties", { placeholder: "Jane Smith" }),
    Q.text("creditorName", "Creditor Name", "Parties", { placeholder: "First National Bank" }),
    Q.text("originalDebtAmount", "Original Debt Amount", "Debt Details", { required: true, placeholder: "e.g., $12,000" }),
    Q.text("settlementOffer", "Settlement Amount You're Offering", "Settlement Offer", {
      required: true,
      placeholder: "e.g., $6,000 (50 cents on the dollar)",
    }),
    Q.radio("paymentTiming", "How Will Settlement Be Paid?", "Settlement Offer", ["Lump sum within 10 days of acceptance", "Lump sum within 30 days", "In 3 monthly installments"], {}),
    Q.textarea("hardshipExplanation", "Brief Explanation of Financial Hardship", "Settlement Offer", {
      required: false,
      placeholder: "e.g., Job loss, medical expenses, or other documented hardship...",
    }),
    Q.text("responseDeadline", "Offer Expiration Date", "Settlement Offer", { placeholder: "e.g., 30 days from date of this letter" }),
  ],

  // ── DEBT SETTLEMENT AGREEMENT ─────────────────────────────────────────────
  "debt-settlement-agreement": [
    Q.state(),
    Q.text("creditorName", "Creditor Name", "Parties", { placeholder: "First National Bank" }),
    Q.text("debtorName", "Debtor Name", "Parties", { placeholder: "Jane Smith" }),
    Q.text("originalDebtAmount", "Original Debt Balance", "Debt Details", { required: true, placeholder: "e.g., $15,000" }),
    Q.text("settledAmount", "Agreed Settlement Amount", "Settlement Terms", { required: true, placeholder: "e.g., $8,000" }),
    Q.select("paymentSchedule", "Settlement Payment Schedule", "Settlement Terms", ["Lump sum immediately", "Lump sum within 30 days", "3 equal monthly payments", "6 equal monthly payments"], {}),
    Q.radio("creditReporting", "Credit Reporting", "Settlement Terms", ["Creditor will report as 'Settled in Full'", "Creditor will report as 'Paid in Full'", "Creditor will delete tradeline"], {}),
    Q.radio("release", "Scope of Release", "Release", ["Creditor releases all claims related to this specific debt", "Full and final release of all claims between parties"], {}),
  ],

  // ── AFFIDAVIT ─────────────────────────────────────────────────────────────
  "affidavit": [
    Q.state(),
    Q.text("affiantName", "Affiant Name (person making the sworn statement)", "The Affiant", { required: true, placeholder: "Jane Smith" }),
    Q.text("affiantAddress", "Affiant Address", "The Affiant", { required: true }),
    Q.text("affiantTitle", "Affiant's Title or Capacity (if relevant)", "The Affiant", { required: false, placeholder: "e.g., Vice President of Acme Corp" }),
    Q.textarea("statementFacts", "Sworn Statement of Facts", "The Statement", {
      required: true,
      placeholder: "State each fact clearly and sequentially:\n1. On January 1, 2026, I witnessed...\n2. The document in question...\n3. To the best of my knowledge...",
      helpText: "Each fact should be specific, based on personal knowledge, and numbered.",
    }),
    Q.text("purpose", "Purpose of This Affidavit", "The Statement", {
      required: true,
      placeholder: "e.g., In support of a court proceeding, to establish identity, for real estate closing...",
    }),
  ],

  // ── GENERAL AFFIDAVIT ─────────────────────────────────────────────────────
  "general-affidavit": [
    Q.state(),
    Q.text("affiantName", "Affiant Name", "The Affiant", { required: true }),
    Q.text("affiantAddress", "Affiant Address", "The Affiant", {}),
    Q.textarea("statementFacts", "Sworn Statement of Facts", "The Statement", {
      required: true,
      placeholder: "Number each fact:\n1. ...\n2. ...",
    }),
    Q.text("purpose", "Purpose of Affidavit", "The Statement", { required: true }),
  ],

  // ── GENERAL RELEASE OF LIABILITY ──────────────────────────────────────────
  "general-release-of-liability": [
    Q.state(),
    Q.text("releasorName", "Releasor Name (giving up claims)", "Parties", { placeholder: "Jane Smith" }),
    Q.text("releaseeName", "Releasee Name (being released)", "Parties", { placeholder: "Acme Events LLC" }),
    Q.textarea("claimsReleased", "What Claims Are Being Released?", "Release Scope", {
      required: true,
      placeholder: "e.g., All claims arising from participation in the marathon event on January 15, 2026, including personal injury, property damage, or death...",
    }),
    Q.text("consideration", "Consideration (what releasor receives)", "Consideration", {
      required: true,
      placeholder: "e.g., Permission to participate in the event, $100 payment, or other value",
    }),
    Q.radio("futureClaims", "Does Release Cover Future Claims?", "Release Scope", ["Yes — includes future claims from the described activity", "No — only claims up to date of signing"], {}),
    Q.radio("indemnification", "Indemnification", "Release Scope", ["Releasor also agrees to indemnify releasee", "Release only — no indemnification"], {}),
  ],

  // ── PURCHASE AGREEMENT ────────────────────────────────────────────────────
  "purchase-agreement": [
    Q.state(),
    Q.text("sellerName", "Seller Name", "Parties", { placeholder: "John Smith or Acme Corp" }),
    Q.text("buyerName", "Buyer Name", "Parties", { placeholder: "Jane Doe or Beta LLC" }),
    Q.textarea("propertyDescription", "Description of Property / Items Being Purchased", "Purchase Details", {
      required: true,
      placeholder: "e.g., Real estate at 123 Main St, Austin TX 78701, or 500 units of Product X at $10/unit",
    }),
    Q.text("purchasePrice", "Purchase Price", "Purchase Details", { required: true, placeholder: "e.g., $250,000" }),
    Q.text("depositAmount", "Earnest Money / Deposit Amount", "Financials", { required: false, placeholder: "e.g., $5,000" }),
    Q.text("closingDate", "Closing / Delivery Date", "Timeline", { required: true, placeholder: "e.g., March 15, 2026" }),
    Q.radio("financing", "Payment Method", "Financials", ["Cash / wire transfer", "Conventional financing (mortgage)", "Seller financing", "Assumption of existing loan"], {}),
    Q.textarea("contingencies", "Contingencies / Conditions", "Conditions", {
      required: false,
      placeholder: "e.g., Subject to satisfactory home inspection, buyer financing approval, clear title...",
    }),
    Q.radio("riskOfLoss", "Risk of Loss Transfers At", "Terms", ["Closing / delivery", "Execution of this agreement"], {}),
  ],

  // ── MASTER SERVICE AGREEMENT ──────────────────────────────────────────────
  "master-service-agreement": [
    Q.state(),
    Q.text("clientName", "Client Name", "Parties", { placeholder: "Acme Corp" }),
    Q.text("providerName", "Service Provider Name", "Parties", { placeholder: "Tech Solutions LLC" }),
    Q.textarea("serviceTypes", "Types of Services Covered by This MSA", "Services", {
      required: true,
      placeholder: "e.g., Software development, IT consulting, system integration, maintenance and support",
    }),
    Q.radio("sow", "How Are Specific Projects Scoped?", "Services", ["Separate Statements of Work (SOWs)", "Individual project orders", "Verbal authorization"], {}),
    Q.select("paymentTerms", "Payment Terms", "Payment", ["Net 15", "Net 30", "Net 45", "Monthly retainer", "Per SOW"], {}),
    Q.radio("ipOwnership", "Intellectual Property", "IP & Confidentiality", ["Client owns all deliverables", "Provider retains IP; client gets license", "Specified per SOW"], {}),
    Q.radio("limitOfLiability", "Limitation of Liability Cap", "Liability", ["Fees paid in last 3 months", "Fees paid in last 12 months", "No limitation (uncapped)"], {}),
    Q.select("msamTerm", "MSA Term", "Duration", ["1 year, auto-renewing", "2 years, auto-renewing", "3 years, auto-renewing", "Perpetual until terminated"], {}),
    Q.radio("terminationNotice", "Termination Notice", "Duration", ["30 days written notice", "60 days written notice", "90 days written notice"], {}),
  ],

  // ── ASSET PURCHASE AGREEMENT ──────────────────────────────────────────────
  "asset-purchase-agreement": [
    Q.state(),
    Q.text("sellerName", "Seller Name", "Parties", { placeholder: "Acme Corp" }),
    Q.text("buyerName", "Buyer Name", "Parties", { placeholder: "Beta Holdings LLC" }),
    Q.textarea("purchasedAssets", "Assets Being Purchased", "Assets", {
      required: true,
      placeholder: "e.g., All equipment listed in Schedule A, customer contracts, intellectual property, goodwill, inventory...",
    }),
    Q.textarea("excludedAssets", "Assets NOT Being Purchased (if any)", "Assets", {
      required: false,
      placeholder: "e.g., Cash, accounts receivable, employee liabilities, real property lease...",
    }),
    Q.text("purchasePrice", "Total Purchase Price", "Purchase Price", { required: true, placeholder: "e.g., $750,000" }),
    Q.text("allocationSummary", "Price Allocation (for tax purposes)", "Purchase Price", {
      required: false,
      placeholder: "e.g., Equipment: $200K, Goodwill: $400K, IP: $150K",
    }),
    Q.text("closingDate", "Closing Date", "Timeline", { required: true }),
    Q.radio("assumedLiabilities", "Are Any Liabilities Being Assumed?", "Liabilities", ["No liabilities assumed", "Specific liabilities assumed (listed in schedule)", "All ordinary course liabilities assumed"], {}),
    Q.select("earnout", "Earnout / Contingent Payment?", "Purchase Price", ["No earnout", "Earnout based on revenue targets", "Earnout based on EBITDA targets"], {}),
  ],

  // ── LANDLORD NOTICE TO VACATE ─────────────────────────────────────────────
  "landlord-notice-to-vacate": [
    Q.state(),
    Q.text("landlordName", "Landlord / Property Owner Name", "Parties", { placeholder: "John Smith" }),
    Q.text("tenantNames", "Tenant Name(s)", "Parties", { placeholder: "Jane Doe" }),
    Q.text("propertyAddress", "Rental Property Address", "Property", { required: true }),
    Q.radio("noticeType", "Reason for Notice to Vacate", "Notice Type", [
      "Non-payment of rent",
      "Lease violation (non-monetary)",
      "End of lease term (no renewal)",
      "Owner move-in",
      "Property sale",
    ], {}),
    Q.text("vacateByDate", "Required Vacate-By Date", "Notice", { required: true, placeholder: "e.g., February 28, 2026" }),
    Q.text("rentAmountDue", "Rent Amount Past Due (if applicable)", "Notice", { required: false, placeholder: "e.g., $2,200 for January 2026" }),
    Q.textarea("violationDescription", "Description of Lease Violation (if applicable)", "Notice", {
      required: false,
      placeholder: "e.g., Tenant has kept an unauthorized dog on premises since December 2025 in violation of Section 12 of the lease...",
    }),
    Q.text("noticePeriod", "Notice Period", "Notice", { helpText: "State law controls the required period. Common: 3-day (non-payment), 30-day (no-fault), 60-day (long-term tenants).", required: false }),
  ],

  // ── COMPLAINT LETTER ──────────────────────────────────────────────────────
  "complaint-letter": [
    Q.state("state", "Governing State", false),
    Q.text("senderName", "Your Name", "Parties", { placeholder: "Jane Smith" }),
    Q.text("recipientName", "Recipient / Company Name", "Parties", { placeholder: "Acme Corp Customer Service" }),
    Q.text("subjectMatter", "Subject of Complaint", "The Complaint", {
      required: true,
      placeholder: "e.g., Defective product, poor service, billing error, unfulfilled warranty...",
    }),
    Q.textarea("factualBackground", "What Happened? (Facts Only)", "The Complaint", {
      required: true,
      placeholder: "Date of purchase, what was promised, what was delivered, all prior attempts to resolve...",
    }),
    Q.text("desiredResolution", "What Resolution Do You Want?", "Resolution", {
      required: true,
      placeholder: "e.g., Full refund of $399, replacement product, written apology, account credit",
    }),
    Q.text("deadline", "Response Deadline", "Resolution", { placeholder: "e.g., 14 days from receipt of this letter" }),
  ],

  // ── FINAL NOTICE BEFORE LEGAL ACTION ──────────────────────────────────────
  "final-notice-before-legal-action": [
    Q.state("state", "Governing State", true),
    Q.text("senderName", "Sender Name", "Parties", { placeholder: "Jane Smith or Acme Corp" }),
    Q.text("recipientName", "Recipient Name", "Parties", { placeholder: "John Doe" }),
    Q.text("amountOwed", "Amount Owed", "Claim Details", { required: true, placeholder: "e.g., $4,500" }),
    Q.textarea("basisForClaim", "Basis for the Claim", "Claim Details", {
      required: true,
      placeholder: "e.g., Unpaid balance for services rendered under contract dated Sept 1, 2025; prior demand letter sent Oct 15, 2025 was ignored",
    }),
    Q.text("paymentDeadline", "Final Payment Deadline", "Demand", { required: true, placeholder: "e.g., 10 days from date of this letter" }),
    Q.radio("plannedLegalAction", "Intended Legal Action If Not Paid", "Demand", ["Small claims court", "Civil lawsuit in state court", "Collections + credit reporting"], {}),
  ],

  // ── SMALL CLAIMS DEMAND LETTER ────────────────────────────────────────────
  "small-claims-demand-letter": [
    Q.state(),
    Q.text("plaintiffName", "Your Name (Plaintiff)", "Parties", { placeholder: "Jane Smith" }),
    Q.text("defendantName", "Other Party (Defendant)", "Parties", { placeholder: "John Doe" }),
    Q.text("amountClaimed", "Total Amount of Claim", "Claim", { required: true, placeholder: "e.g., $3,500" }),
    Q.textarea("claimDetails", "Basis for Your Claim", "Claim", {
      required: true,
      placeholder: "e.g., On Oct 1, 2025, Defendant hired me to build a website for $3,500. I completed the work on Nov 15, 2025. Despite three invoices and multiple emails, Defendant has not paid.",
    }),
    Q.text("paymentDeadline", "Payment Deadline", "Demand", { required: true, placeholder: "e.g., 14 days from date of letter" }),
    Q.text("smallClaimsCourt", "Which Small Claims Court Will You File In?", "Demand", {
      required: false,
      placeholder: "e.g., Los Angeles County Small Claims Court",
    }),
  ],

  // ── PERSONAL PROPERTY AGREEMENT ───────────────────────────────────────────
  "personal-property-agreement": [
    Q.state(),
    Q.text("party1Name", "Party 1 Name", "Parties", { placeholder: "John Smith" }),
    Q.text("party2Name", "Party 2 Name", "Parties", { placeholder: "Jane Doe" }),
    Q.radio("agreementType", "Type of Agreement", "Agreement Details", ["Transfer of ownership", "Loan / temporary use", "Division of jointly owned property"], {}),
    Q.textarea("propertyDescription", "Description of Personal Property", "Property", {
      required: true,
      placeholder: "e.g., Furniture, electronics, jewelry, vehicles — describe each item with make/model/serial numbers where applicable",
    }),
    Q.text("valueEstimate", "Estimated Fair Market Value", "Property", { required: false, placeholder: "e.g., $2,500 total" }),
    Q.text("agreementDate", "Effective Date", "Agreement Details", { placeholder: "e.g., January 15, 2026" }),
    Q.textarea("additionalTerms", "Additional Terms or Conditions", "Agreement Details", { required: false }),
  ],

}

// ─── Generic fallback for unconfigured document types ─────────────────────────

const DEFAULT_QUESTIONS: FormQuestion[] = [
  Q.state(),
  Q.text("party1Name", "First Party / Your Name or Company", "Parties", { placeholder: "Jane Smith or Acme Corp" }),
  Q.text("party2Name", "Second Party Name", "Parties", { placeholder: "John Doe or Beta LLC" }),
  Q.textarea("description", "Brief Description of the Agreement", "Details", {
    required: true,
    placeholder: "Describe the key terms, obligations, and purpose of this document...",
  }),
  Q.text("effectiveDate", "Effective Date", "Details", { placeholder: "e.g., January 1, 2026" }),
  Q.textarea("additionalTerms", "Additional Terms or Special Instructions", "Details", {
    required: false,
    placeholder: "Any other important details the document should include...",
  }),
]

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Returns hardcoded form questions for a given document slug.
 * Falls back to a generic question set if no specific definition exists.
 * These questions are used when the DB questionnaire API returns empty data.
 */
export function getDocumentQuestions(slug: string): FormQuestion[] {
  return DOCUMENT_QUESTIONS[slug] ?? DEFAULT_QUESTIONS
}
