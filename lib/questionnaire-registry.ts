/**
 * Questionnaire Registry
 * Static branching questionnaires for all document types.
 * Questions support conditional visibility (showWhen) and intent filtering (forIntents).
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ShowWhenCondition {
  /** The question ID whose value determines visibility */
  field: string
  /** Show this question when the parent field equals this value (or one of these values) */
  value: string | string[]
}

export interface RegistryQuestion {
  id: string
  label: string
  type: "text" | "textarea" | "select" | "radio" | "state" | "number" | "date" | "checkbox"
  required: boolean
  section: string
  /** Controls ordering of sections in the UI. Lower numbers appear first. */
  sectionOrder: number
  helpText?: string
  placeholder?: string
  options?: Array<{ value: string; label?: string }>
  /** Only show this question when another question has a specific value */
  showWhen?: ShowWhenCondition
  /** Only show this question for specific intents. undefined/empty = show for all. */
  forIntents?: string[]
}

// ─── Visibility Helpers ──────────────────────────────────────────────────────

/**
 * Check if a single question should be visible based on its showWhen condition
 * and the visibility of its parent (recursive for chains like A → B → C).
 */
function isQuestionVisible(
  question: RegistryQuestion,
  formData: Record<string, any>,
  allQuestions: RegistryQuestion[]
): boolean {
  if (!question.showWhen) return true

  const { field, value } = question.showWhen
  const currentValue = formData[field]

  // First, check if the parent question itself is visible
  const parentQuestion = allQuestions.find((q) => q.id === field)
  if (parentQuestion && !isQuestionVisible(parentQuestion, formData, allQuestions)) {
    return false
  }

  // Then check the value match
  if (Array.isArray(value)) {
    return value.includes(String(currentValue ?? ""))
  }
  return String(currentValue ?? "") === value
}

/**
 * Get all questions for a document type, filtered by intent.
 * Does NOT apply showWhen filtering (that happens in the form component based on live formData).
 */
export function getRegistryQuestions(
  slug: string,
  intentId?: string | null
): RegistryQuestion[] {
  const allQuestions = QUESTIONNAIRE_REGISTRY[slug]
  if (!allQuestions) return []

  if (!intentId) return allQuestions

  return allQuestions.filter(
    (q) => !q.forIntents || q.forIntents.length === 0 || q.forIntents.includes(intentId)
  )
}

/**
 * Get visible questions given current form data and intent.
 * Applies both forIntents and showWhen filtering.
 */
export function getVisibleQuestions(
  slug: string,
  formData: Record<string, any>,
  intentId?: string | null
): RegistryQuestion[] {
  const intentFiltered = getRegistryQuestions(slug, intentId)
  return intentFiltered.filter((q) => isQuestionVisible(q, formData, intentFiltered))
}

/**
 * Given the full question set and current formData, return IDs of fields
 * that should be cleared because their parent condition is no longer met.
 */
export function getFieldsToClear(
  questions: RegistryQuestion[],
  formData: Record<string, any>
): string[] {
  const toClear: string[] = []
  for (const q of questions) {
    if (q.showWhen && formData[q.id] !== undefined) {
      if (!isQuestionVisible(q, formData, questions)) {
        toClear.push(q.id)
      }
    }
  }
  return toClear
}

// ─── Registry ────────────────────────────────────────────────────────────────

export const QUESTIONNAIRE_REGISTRY: Record<string, RegistryQuestion[]> = {

  // ══════════════════════════════════════════════════════════════════════════
  // 1. PARTNERSHIP AGREEMENT
  // ══════════════════════════════════════════════════════════════════════════
  partnership_agreement: [
    // ── Basic Information ──
    { id: "partnershipName", label: "Partnership / Business Name", type: "text", required: true, section: "Basic Information", sectionOrder: 1, placeholder: "e.g., Smith & Doe Consulting" },
    { id: "state", label: "State / Jurisdiction", type: "state", required: true, section: "Basic Information", sectionOrder: 1, helpText: "State whose laws will govern this agreement" },
    { id: "effectiveDate", label: "Effective Date", type: "date", required: true, section: "Basic Information", sectionOrder: 1 },
    { id: "businessPurpose", label: "Business Purpose / Activity", type: "textarea", required: true, section: "Basic Information", sectionOrder: 1, placeholder: "Describe the primary business activities of the partnership" },
    { id: "partnershipTermType", label: "Partnership Term", type: "select", required: true, section: "Basic Information", sectionOrder: 1, options: [{ value: "indefinite", label: "Indefinite (ongoing)" }, { value: "fixed", label: "Fixed Term" }] },
    { id: "partnershipEndDate", label: "Partnership End Date", type: "date", required: true, section: "Basic Information", sectionOrder: 1, showWhen: { field: "partnershipTermType", value: "fixed" } },
    { id: "principalOffice", label: "Principal Office Address", type: "text", required: true, section: "Basic Information", sectionOrder: 1, placeholder: "e.g., 100 Main St, Suite 200, Boston, MA 02101" },

    // ── Partners ──
    { id: "numberOfPartners", label: "Number of Partners", type: "select", required: true, section: "Partners", sectionOrder: 2, options: [{ value: "2", label: "2 Partners" }, { value: "3", label: "3 Partners" }, { value: "4", label: "4 Partners" }, { value: "5_plus", label: "5 or More" }] },
    { id: "partner1Name", label: "Partner 1 Full Legal Name", type: "text", required: true, section: "Partners", sectionOrder: 2 },
    { id: "partner1Address", label: "Partner 1 Address", type: "text", required: true, section: "Partners", sectionOrder: 2 },
    { id: "partner1Role", label: "Partner 1 Role / Title", type: "text", required: false, section: "Partners", sectionOrder: 2, placeholder: "e.g., Managing Partner, General Partner" },
    { id: "partner2Name", label: "Partner 2 Full Legal Name", type: "text", required: true, section: "Partners", sectionOrder: 2 },
    { id: "partner2Address", label: "Partner 2 Address", type: "text", required: true, section: "Partners", sectionOrder: 2 },
    { id: "partner2Role", label: "Partner 2 Role / Title", type: "text", required: false, section: "Partners", sectionOrder: 2, placeholder: "e.g., General Partner, Silent Partner" },
    { id: "partner3Name", label: "Partner 3 Full Legal Name", type: "text", required: true, section: "Partners", sectionOrder: 2, showWhen: { field: "numberOfPartners", value: ["3", "4", "5_plus"] } },
    { id: "partner3Address", label: "Partner 3 Address", type: "text", required: true, section: "Partners", sectionOrder: 2, showWhen: { field: "numberOfPartners", value: ["3", "4", "5_plus"] } },
    { id: "partner4Name", label: "Partner 4 Full Legal Name", type: "text", required: true, section: "Partners", sectionOrder: 2, showWhen: { field: "numberOfPartners", value: ["4", "5_plus"] } },
    { id: "partner4Address", label: "Partner 4 Address", type: "text", required: true, section: "Partners", sectionOrder: 2, showWhen: { field: "numberOfPartners", value: ["4", "5_plus"] } },
    { id: "additionalPartners", label: "Additional Partner Details", type: "textarea", required: true, section: "Partners", sectionOrder: 2, helpText: "List names and addresses for all remaining partners", showWhen: { field: "numberOfPartners", value: "5_plus" } },

    // ── Capital & Ownership ──
    { id: "totalCapital", label: "Total Initial Capital", type: "text", required: true, section: "Capital & Ownership", sectionOrder: 3, placeholder: "e.g., $100,000" },
    { id: "partner1Contribution", label: "Partner 1 Capital Contribution", type: "text", required: true, section: "Capital & Ownership", sectionOrder: 3, placeholder: "e.g., $50,000" },
    { id: "partner1ContributionType", label: "Partner 1 Contribution Type", type: "select", required: true, section: "Capital & Ownership", sectionOrder: 3, options: [{ value: "cash", label: "Cash" }, { value: "property", label: "Property" }, { value: "services", label: "Services" }, { value: "mixed", label: "Mixed (Cash + Property/Services)" }] },
    { id: "partner2Contribution", label: "Partner 2 Capital Contribution", type: "text", required: true, section: "Capital & Ownership", sectionOrder: 3, placeholder: "e.g., $50,000" },
    { id: "partner2ContributionType", label: "Partner 2 Contribution Type", type: "select", required: true, section: "Capital & Ownership", sectionOrder: 3, options: [{ value: "cash", label: "Cash" }, { value: "property", label: "Property" }, { value: "services", label: "Services" }, { value: "mixed", label: "Mixed (Cash + Property/Services)" }] },
    { id: "ownershipPercentages", label: "Ownership Percentages", type: "textarea", required: true, section: "Capital & Ownership", sectionOrder: 3, helpText: "Specify each partner's ownership percentage (must total 100%)", placeholder: "e.g., Partner 1: 60%, Partner 2: 40%", forIntents: ["unequal_split"] },
    { id: "additionalCapitalCalls", label: "Allow Additional Capital Calls?", type: "radio", required: true, section: "Capital & Ownership", sectionOrder: 3, options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    { id: "capitalCallMethod", label: "Capital Call Method", type: "select", required: true, section: "Capital & Ownership", sectionOrder: 3, showWhen: { field: "additionalCapitalCalls", value: "yes" }, options: [{ value: "pro_rata", label: "Pro-Rata (by ownership %)" }, { value: "equal", label: "Equal Amounts" }, { value: "voluntary", label: "Voluntary" }] },

    // ── Profit & Loss Distribution ──
    { id: "distributionFrequency", label: "Profit Distribution Frequency", type: "select", required: true, section: "Profit & Loss Distribution", sectionOrder: 4, options: [{ value: "monthly", label: "Monthly" }, { value: "quarterly", label: "Quarterly" }, { value: "annually", label: "Annually" }, { value: "as_available", label: "As Available" }] },
    { id: "profitPercentages", label: "Profit Sharing Percentages", type: "textarea", required: true, section: "Profit & Loss Distribution", sectionOrder: 4, helpText: "May differ from ownership percentages", placeholder: "e.g., Partner 1: 60%, Partner 2: 40%", forIntents: ["unequal_split"] },
    { id: "reserveFundPercentage", label: "Reserve Fund Percentage", type: "text", required: false, section: "Profit & Loss Distribution", sectionOrder: 4, placeholder: "e.g., 10%", helpText: "Percentage of profits retained as operating reserve" },
    { id: "guaranteedPayments", label: "Include Guaranteed Payments (Salaries)?", type: "radio", required: true, section: "Profit & Loss Distribution", sectionOrder: 4, options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    { id: "guaranteedPaymentAmounts", label: "Guaranteed Payment Details", type: "textarea", required: true, section: "Profit & Loss Distribution", sectionOrder: 4, helpText: "Specify guaranteed payment amounts per partner", placeholder: "e.g., Managing Partner receives $5,000/month", showWhen: { field: "guaranteedPayments", value: "yes" } },

    // ── Management ──
    { id: "managementStructure", label: "Management Structure", type: "select", required: true, section: "Management & Decision Making", sectionOrder: 5, options: [{ value: "equal_management", label: "Equal Management (all partners)" }, { value: "managing_partner", label: "Designated Managing Partner" }, { value: "committee", label: "Management Committee" }] },
    { id: "managingPartner", label: "Managing Partner Name", type: "text", required: true, section: "Management & Decision Making", sectionOrder: 5, showWhen: { field: "managementStructure", value: "managing_partner" } },
    { id: "committeeMembers", label: "Management Committee Members", type: "textarea", required: true, section: "Management & Decision Making", sectionOrder: 5, showWhen: { field: "managementStructure", value: "committee" }, placeholder: "List committee member names" },
    { id: "spendingLimit", label: "Individual Spending Authority Limit", type: "text", required: true, section: "Management & Decision Making", sectionOrder: 5, placeholder: "e.g., $5,000", helpText: "Amount a single partner can spend without approval from other partners" },
    { id: "bankingAuthority", label: "Banking Authority", type: "select", required: true, section: "Management & Decision Making", sectionOrder: 5, options: [{ value: "any_partner", label: "Any Partner" }, { value: "managing_partner_only", label: "Managing Partner Only" }, { value: "dual_signature", label: "Dual Signature Required" }] },
    { id: "unanimousDecisions", label: "Decisions Requiring Unanimous Consent", type: "textarea", required: false, section: "Management & Decision Making", sectionOrder: 5, placeholder: "e.g., Taking on debt over $50,000, admitting new partners, selling business assets" },

    // ── Dispute Resolution ──
    { id: "disputeMethod", label: "Primary Dispute Resolution Method", type: "select", required: true, section: "Dispute Resolution", sectionOrder: 6, options: [{ value: "mediation", label: "Mediation First" }, { value: "arbitration", label: "Arbitration" }, { value: "litigation", label: "Litigation (Court)" }, { value: "mediation_then_arbitration", label: "Mediation, then Arbitration" }] },
    { id: "arbitrationBinding", label: "Arbitration Type", type: "radio", required: true, section: "Dispute Resolution", sectionOrder: 6, showWhen: { field: "disputeMethod", value: ["arbitration", "mediation_then_arbitration"] }, options: [{ value: "binding", label: "Binding" }, { value: "non_binding", label: "Non-Binding" }] },
    { id: "hasNonCompete", label: "Include Non-Compete Clause for Partners?", type: "radio", required: true, section: "Dispute Resolution", sectionOrder: 6, options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    { id: "nonCompeteDuration", label: "Non-Compete Duration After Exit", type: "select", required: true, section: "Dispute Resolution", sectionOrder: 6, showWhen: { field: "hasNonCompete", value: "yes" }, options: [{ value: "6_months", label: "6 Months" }, { value: "1_year", label: "1 Year" }, { value: "2_years", label: "2 Years" }, { value: "3_years", label: "3 Years" }] },
    { id: "nonCompeteScope", label: "Non-Compete Geographic Scope", type: "text", required: true, section: "Dispute Resolution", sectionOrder: 6, showWhen: { field: "hasNonCompete", value: "yes" }, placeholder: "e.g., Within 50 miles of principal office" },

    // ── Exit & Dissolution ──
    { id: "exitNoticePeriod", label: "Required Notice Period for Withdrawal", type: "select", required: true, section: "Exit & Dissolution", sectionOrder: 7, options: [{ value: "30_days", label: "30 Days" }, { value: "60_days", label: "60 Days" }, { value: "90_days", label: "90 Days" }, { value: "180_days", label: "180 Days" }] },
    { id: "buyoutMethod", label: "Buyout Valuation Method", type: "select", required: true, section: "Exit & Dissolution", sectionOrder: 7, options: [{ value: "book_value", label: "Book Value" }, { value: "fair_market_value", label: "Fair Market Value (appraised)" }, { value: "formula", label: "Pre-Agreed Formula" }, { value: "negotiation", label: "Negotiation" }] },
    { id: "buyoutFormula", label: "Buyout Formula Description", type: "textarea", required: true, section: "Exit & Dissolution", sectionOrder: 7, showWhen: { field: "buyoutMethod", value: "formula" }, placeholder: "e.g., 3x average annual profits over the last 3 years" },
    { id: "rightOfFirstRefusal", label: "Right of First Refusal for Remaining Partners?", type: "radio", required: true, section: "Exit & Dissolution", sectionOrder: 7, options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    { id: "deathDisabilityProvisions", label: "Death/Disability Provisions", type: "select", required: true, section: "Exit & Dissolution", sectionOrder: 7, options: [{ value: "buyout_estate", label: "Remaining partners buy out estate" }, { value: "estate_continues", label: "Estate/heir may continue as partner" }, { value: "dissolve", label: "Partnership dissolves" }, { value: "insurance_funded", label: "Insurance-funded buyout" }] },
  ],

  // ══════════════════════════════════════════════════════════════════════════
  // 2. NDA (NON-DISCLOSURE AGREEMENT)
  // ══════════════════════════════════════════════════════════════════════════
  nda: [
    // ── Basic Information ──
    { id: "state", label: "Governing State", type: "state", required: true, section: "Basic Information", sectionOrder: 1 },
    { id: "effectiveDate", label: "Effective Date", type: "date", required: true, section: "Basic Information", sectionOrder: 1 },
    { id: "ndaPurpose", label: "Purpose of the NDA", type: "textarea", required: true, section: "Basic Information", sectionOrder: 1, placeholder: "e.g., Exploring a potential business partnership between the parties" },

    // ── Parties ──
    { id: "disclosingPartyName", label: "Disclosing Party Name", type: "text", required: true, section: "Parties", sectionOrder: 2, placeholder: "Person or company sharing confidential information" },
    { id: "disclosingPartyAddress", label: "Disclosing Party Address", type: "text", required: true, section: "Parties", sectionOrder: 2 },
    { id: "receivingPartyName", label: "Receiving Party Name", type: "text", required: true, section: "Parties", sectionOrder: 2, placeholder: "Person or company receiving confidential information" },
    { id: "receivingPartyAddress", label: "Receiving Party Address", type: "text", required: true, section: "Parties", sectionOrder: 2 },
    { id: "partyBAlsoDiscloses", label: "Will the Receiving Party also disclose confidential information?", type: "radio", required: true, section: "Parties", sectionOrder: 2, forIntents: ["mutual"], options: [{ value: "yes", label: "Yes (both parties disclose)" }, { value: "no", label: "No (only the disclosing party)" }] },

    // ── Confidential Information ──
    { id: "confidentialInfoDescription", label: "Description of Confidential Information", type: "textarea", required: true, section: "Confidential Information", sectionOrder: 3, placeholder: "Describe the types of information to be protected" },
    { id: "includesTradeSecrets", label: "Includes Trade Secrets?", type: "radio", required: true, section: "Confidential Information", sectionOrder: 3, options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    { id: "exclusions", label: "Information Excluded from Confidentiality", type: "textarea", required: false, section: "Confidential Information", sectionOrder: 3, helpText: "Standard exclusions (publicly known, independently developed) are always included", placeholder: "Any additional exclusions beyond standard ones" },
    { id: "permittedDisclosures", label: "Permitted Disclosures", type: "textarea", required: false, section: "Confidential Information", sectionOrder: 3, placeholder: "e.g., May share with attorneys, accountants, and employees who need to know" },

    // ── Terms & Duration ──
    { id: "ndaDuration", label: "NDA Duration", type: "select", required: true, section: "Terms & Duration", sectionOrder: 4, options: [{ value: "1_year", label: "1 Year" }, { value: "2_years", label: "2 Years" }, { value: "3_years", label: "3 Years" }, { value: "5_years", label: "5 Years" }, { value: "indefinite", label: "Indefinite (until terminated)" }] },
    { id: "survivalPeriod", label: "Confidentiality Survival Period After Termination", type: "select", required: true, section: "Terms & Duration", sectionOrder: 4, options: [{ value: "1_year", label: "1 Year" }, { value: "2_years", label: "2 Years" }, { value: "3_years", label: "3 Years" }, { value: "5_years", label: "5 Years" }, { value: "indefinite", label: "Indefinite" }] },
    { id: "returnOfMaterials", label: "Return of Materials Method", type: "select", required: true, section: "Terms & Duration", sectionOrder: 4, options: [{ value: "return", label: "Return all materials" }, { value: "destroy", label: "Destroy all materials" }, { value: "return_or_destroy", label: "Return or destroy (at disclosing party's choice)" }] },
    { id: "breachNotificationPeriod", label: "Breach Notification Period", type: "select", required: true, section: "Terms & Duration", sectionOrder: 4, options: [{ value: "immediately", label: "Immediately" }, { value: "24_hours", label: "Within 24 hours" }, { value: "48_hours", label: "Within 48 hours" }, { value: "5_business_days", label: "Within 5 business days" }] },

    // ── Additional Clauses ──
    { id: "hasNonSolicitation", label: "Include Non-Solicitation Clause?", type: "radio", required: true, section: "Additional Clauses", sectionOrder: 5, options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    { id: "nonSolicitationDuration", label: "Non-Solicitation Duration", type: "select", required: true, section: "Additional Clauses", sectionOrder: 5, showWhen: { field: "hasNonSolicitation", value: "yes" }, options: [{ value: "1_year", label: "1 Year" }, { value: "2_years", label: "2 Years" }, { value: "3_years", label: "3 Years" }] },
    { id: "hasNonCompete", label: "Include Non-Compete Clause?", type: "radio", required: true, section: "Additional Clauses", sectionOrder: 5, options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    { id: "nonCompeteDuration", label: "Non-Compete Duration", type: "select", required: true, section: "Additional Clauses", sectionOrder: 5, showWhen: { field: "hasNonCompete", value: "yes" }, options: [{ value: "6_months", label: "6 Months" }, { value: "1_year", label: "1 Year" }, { value: "2_years", label: "2 Years" }] },
    { id: "nonCompeteScope", label: "Non-Compete Geographic Scope", type: "text", required: true, section: "Additional Clauses", sectionOrder: 5, showWhen: { field: "hasNonCompete", value: "yes" }, placeholder: "e.g., United States, or specific states/regions" },
    { id: "disputeMethod", label: "Dispute Resolution Method", type: "select", required: true, section: "Additional Clauses", sectionOrder: 5, options: [{ value: "litigation", label: "Litigation (Court)" }, { value: "arbitration", label: "Binding Arbitration" }, { value: "mediation_then_arbitration", label: "Mediation, then Arbitration" }] },
    { id: "injunctiveRelief", label: "Include Injunctive Relief Provision?", type: "radio", required: true, section: "Additional Clauses", sectionOrder: 5, helpText: "Allows seeking immediate court orders to stop breaches", options: [{ value: "yes", label: "Yes (recommended)" }, { value: "no", label: "No" }] },
  ],

  // ══════════════════════════════════════════════════════════════════════════
  // 3. LLC OPERATING AGREEMENT
  // ══════════════════════════════════════════════════════════════════════════
  llc_operating_agreement: [
    // ── Company Information ──
    { id: "llcName", label: "LLC Name", type: "text", required: true, section: "Company Information", sectionOrder: 1, placeholder: "e.g., Acme Solutions LLC" },
    { id: "state", label: "State of Formation", type: "state", required: true, section: "Company Information", sectionOrder: 1 },
    { id: "effectiveDate", label: "Effective Date", type: "date", required: true, section: "Company Information", sectionOrder: 1 },
    { id: "businessPurpose", label: "Business Purpose", type: "textarea", required: true, section: "Company Information", sectionOrder: 1, placeholder: "Describe the primary business activities of the LLC" },
    { id: "registeredAgent", label: "Registered Agent Name & Address", type: "text", required: true, section: "Company Information", sectionOrder: 1, placeholder: "Name and address of registered agent for service of process" },
    { id: "principalOffice", label: "Principal Office Address", type: "text", required: true, section: "Company Information", sectionOrder: 1 },

    // ── Members & Ownership ──
    { id: "member1Name", label: "Member 1 Full Legal Name", type: "text", required: true, section: "Members & Ownership", sectionOrder: 2 },
    { id: "member1Address", label: "Member 1 Address", type: "text", required: true, section: "Members & Ownership", sectionOrder: 2 },
    { id: "member1Ownership", label: "Member 1 Ownership Percentage", type: "text", required: true, section: "Members & Ownership", sectionOrder: 2, placeholder: "e.g., 100% or 50%", forIntents: ["single_member", "multi_member", "manager_managed"] },
    { id: "numberOfMembers", label: "Number of Additional Members", type: "select", required: true, section: "Members & Ownership", sectionOrder: 2, forIntents: ["multi_member", "manager_managed"], options: [{ value: "1", label: "1 Additional Member (2 total)" }, { value: "2", label: "2 Additional Members (3 total)" }, { value: "3", label: "3 Additional Members (4 total)" }, { value: "4_plus", label: "4+ Additional Members" }] },
    { id: "member2Name", label: "Member 2 Full Legal Name", type: "text", required: true, section: "Members & Ownership", sectionOrder: 2, forIntents: ["multi_member", "manager_managed"] },
    { id: "member2Address", label: "Member 2 Address", type: "text", required: true, section: "Members & Ownership", sectionOrder: 2, forIntents: ["multi_member", "manager_managed"] },
    { id: "member2Ownership", label: "Member 2 Ownership Percentage", type: "text", required: true, section: "Members & Ownership", sectionOrder: 2, forIntents: ["multi_member", "manager_managed"] },
    { id: "member3Name", label: "Member 3 Full Legal Name", type: "text", required: true, section: "Members & Ownership", sectionOrder: 2, forIntents: ["multi_member", "manager_managed"], showWhen: { field: "numberOfMembers", value: ["2", "3", "4_plus"] } },
    { id: "member3Ownership", label: "Member 3 Ownership Percentage", type: "text", required: true, section: "Members & Ownership", sectionOrder: 2, forIntents: ["multi_member", "manager_managed"], showWhen: { field: "numberOfMembers", value: ["2", "3", "4_plus"] } },
    { id: "additionalMembers", label: "Additional Member Details", type: "textarea", required: true, section: "Members & Ownership", sectionOrder: 2, forIntents: ["multi_member", "manager_managed"], showWhen: { field: "numberOfMembers", value: "4_plus" }, helpText: "List names, addresses, and ownership percentages" },
    { id: "managerName", label: "Designated Manager Name", type: "text", required: true, section: "Members & Ownership", sectionOrder: 2, forIntents: ["manager_managed"], helpText: "Person responsible for day-to-day management" },
    { id: "managerCompensation", label: "Manager Compensation", type: "text", required: false, section: "Members & Ownership", sectionOrder: 2, forIntents: ["manager_managed"], placeholder: "e.g., $8,000/month" },

    // ── Capital Contributions ──
    { id: "member1Contribution", label: "Member 1 Initial Capital Contribution", type: "text", required: true, section: "Capital Contributions", sectionOrder: 3, placeholder: "e.g., $50,000 cash" },
    { id: "member2Contribution", label: "Member 2 Initial Capital Contribution", type: "text", required: true, section: "Capital Contributions", sectionOrder: 3, forIntents: ["multi_member", "manager_managed"] },
    { id: "additionalCapitalRequired", label: "Allow Additional Capital Calls?", type: "radio", required: true, section: "Capital Contributions", sectionOrder: 3, options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    { id: "capitalCallProcedure", label: "Capital Call Procedure", type: "textarea", required: true, section: "Capital Contributions", sectionOrder: 3, showWhen: { field: "additionalCapitalRequired", value: "yes" }, placeholder: "Describe the process for requesting additional capital" },

    // ── Financial ──
    { id: "distributionFrequency", label: "Distribution Frequency", type: "select", required: true, section: "Financial", sectionOrder: 4, options: [{ value: "monthly", label: "Monthly" }, { value: "quarterly", label: "Quarterly" }, { value: "annually", label: "Annually" }, { value: "as_determined", label: "As Determined by Members/Manager" }] },
    { id: "fiscalYearEnd", label: "Fiscal Year End", type: "select", required: true, section: "Financial", sectionOrder: 4, options: [{ value: "december", label: "December 31 (Calendar Year)" }, { value: "march", label: "March 31" }, { value: "june", label: "June 30" }, { value: "september", label: "September 30" }] },
    { id: "taxElection", label: "Tax Classification", type: "select", required: true, section: "Financial", sectionOrder: 4, options: [{ value: "disregarded", label: "Disregarded Entity (Single-Member)" }, { value: "partnership", label: "Partnership (Multi-Member default)" }, { value: "s_corp", label: "S-Corporation Election" }, { value: "c_corp", label: "C-Corporation Election" }] },

    // ── Management & Voting ──
    { id: "votingStructure", label: "Voting Structure", type: "select", required: true, section: "Management & Voting", sectionOrder: 5, forIntents: ["multi_member", "manager_managed"], options: [{ value: "per_capita", label: "Per Capita (one vote per member)" }, { value: "by_ownership", label: "By Ownership Percentage" }] },
    { id: "majorityThreshold", label: "Majority Decision Threshold", type: "select", required: true, section: "Management & Voting", sectionOrder: 5, forIntents: ["multi_member", "manager_managed"], options: [{ value: "simple_majority", label: "Simple Majority (>50%)" }, { value: "two_thirds", label: "Two-Thirds (66.7%)" }, { value: "three_quarters", label: "Three-Quarters (75%)" }] },
    { id: "spendingAuthority", label: "Individual Spending Authority Limit", type: "text", required: true, section: "Management & Voting", sectionOrder: 5, placeholder: "e.g., $5,000" },
    { id: "unanimousDecisions", label: "Decisions Requiring Unanimous Consent", type: "textarea", required: false, section: "Management & Voting", sectionOrder: 5, placeholder: "e.g., Amending operating agreement, admitting new members, selling major assets" },

    // ── Transfer & Exit ──
    { id: "transferRestrictions", label: "Transfer of Membership Interests", type: "select", required: true, section: "Transfer & Exit", sectionOrder: 6, options: [{ value: "prohibited", label: "Transfers Prohibited" }, { value: "consent_required", label: "Requires Member/Manager Consent" }, { value: "right_of_first_refusal", label: "Right of First Refusal" }, { value: "unrestricted", label: "Unrestricted" }] },
    { id: "buyoutMethod", label: "Buyout Valuation Method", type: "select", required: true, section: "Transfer & Exit", sectionOrder: 6, options: [{ value: "book_value", label: "Book Value" }, { value: "fair_market_value", label: "Fair Market Value" }, { value: "formula", label: "Pre-Agreed Formula" }, { value: "appraisal", label: "Independent Appraisal" }] },
    { id: "dissolutionTriggers", label: "Events Triggering Dissolution", type: "textarea", required: false, section: "Transfer & Exit", sectionOrder: 6, placeholder: "e.g., Unanimous vote, bankruptcy, court order, loss of all members" },
    { id: "disputeResolution", label: "Dispute Resolution Method", type: "select", required: true, section: "Transfer & Exit", sectionOrder: 6, options: [{ value: "mediation", label: "Mediation" }, { value: "arbitration", label: "Binding Arbitration" }, { value: "litigation", label: "Litigation" }, { value: "mediation_then_arbitration", label: "Mediation, then Arbitration" }] },
  ],

  // ══════════════════════════════════════════════════════════════════════════
  // 4. EMPLOYMENT CONTRACT
  // ══════════════════════════════════════════════════════════════════════════
  employment_contract: [
    // ── Parties ──
    { id: "employerName", label: "Employer / Company Name", type: "text", required: true, section: "Parties", sectionOrder: 1 },
    { id: "employerAddress", label: "Employer Address", type: "text", required: true, section: "Parties", sectionOrder: 1 },
    { id: "employeeName", label: "Employee Full Legal Name", type: "text", required: true, section: "Parties", sectionOrder: 1 },
    { id: "employeeAddress", label: "Employee Address", type: "text", required: true, section: "Parties", sectionOrder: 1 },

    // ── Employment Details ──
    { id: "jobTitle", label: "Job Title", type: "text", required: true, section: "Employment Details", sectionOrder: 2, placeholder: "e.g., Senior Software Engineer" },
    { id: "department", label: "Department", type: "text", required: false, section: "Employment Details", sectionOrder: 2, placeholder: "e.g., Engineering" },
    { id: "startDate", label: "Start Date", type: "date", required: true, section: "Employment Details", sectionOrder: 2 },
    { id: "state", label: "State of Employment", type: "state", required: true, section: "Employment Details", sectionOrder: 2 },
    { id: "workSchedule", label: "Work Schedule", type: "select", required: true, section: "Employment Details", sectionOrder: 2, options: [{ value: "full_time", label: "Full-Time (40 hrs/week)" }, { value: "part_time", label: "Part-Time" }, { value: "flexible", label: "Flexible Schedule" }] },
    { id: "workLocation", label: "Work Location", type: "select", required: true, section: "Employment Details", sectionOrder: 2, options: [{ value: "onsite", label: "On-Site" }, { value: "remote", label: "Remote" }, { value: "hybrid", label: "Hybrid" }] },
    { id: "termLength", label: "Contract Term Length", type: "text", required: true, section: "Employment Details", sectionOrder: 2, forIntents: ["fixed_term"], placeholder: "e.g., 12 months, 2 years" },
    { id: "renewalTerms", label: "Renewal Terms", type: "select", required: true, section: "Employment Details", sectionOrder: 2, forIntents: ["fixed_term"], options: [{ value: "auto_renew", label: "Auto-Renew" }, { value: "mutual_agreement", label: "By Mutual Agreement" }, { value: "no_renewal", label: "No Renewal (ends on date)" }] },
    { id: "conversionCriteria", label: "Conversion to Full-Time Criteria", type: "textarea", required: true, section: "Employment Details", sectionOrder: 2, forIntents: ["contract_to_hire"], placeholder: "Describe the criteria for converting to permanent employment" },
    { id: "conversionTimeline", label: "Conversion Review Timeline", type: "text", required: true, section: "Employment Details", sectionOrder: 2, forIntents: ["contract_to_hire"], placeholder: "e.g., After 90 days, after 6 months" },

    // ── Compensation ──
    { id: "salary", label: "Base Salary / Compensation", type: "text", required: true, section: "Compensation", sectionOrder: 3, placeholder: "e.g., $120,000 per year" },
    { id: "payFrequency", label: "Pay Frequency", type: "select", required: true, section: "Compensation", sectionOrder: 3, options: [{ value: "weekly", label: "Weekly" }, { value: "bi_weekly", label: "Bi-Weekly" }, { value: "semi_monthly", label: "Semi-Monthly" }, { value: "monthly", label: "Monthly" }] },
    { id: "hasBonus", label: "Include Bonus Structure?", type: "radio", required: true, section: "Compensation", sectionOrder: 3, options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    { id: "bonusStructure", label: "Bonus Details", type: "textarea", required: true, section: "Compensation", sectionOrder: 3, showWhen: { field: "hasBonus", value: "yes" }, placeholder: "e.g., Annual performance bonus up to 20% of salary based on KPIs" },
    { id: "hasEquity", label: "Include Equity/Stock Options?", type: "radio", required: true, section: "Compensation", sectionOrder: 3, options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    { id: "equityDetails", label: "Equity / Stock Option Details", type: "textarea", required: true, section: "Compensation", sectionOrder: 3, showWhen: { field: "hasEquity", value: "yes" }, placeholder: "e.g., 10,000 stock options vesting over 4 years with 1-year cliff" },
    { id: "signingBonus", label: "Signing Bonus Amount", type: "text", required: false, section: "Compensation", sectionOrder: 3, forIntents: ["executive"], placeholder: "e.g., $25,000" },
    { id: "goldenParachute", label: "Golden Parachute / Severance Package", type: "textarea", required: false, section: "Compensation", sectionOrder: 3, forIntents: ["executive"], placeholder: "Describe executive severance terms (e.g., 12 months base salary + benefits continuation)" },

    // ── Benefits ──
    { id: "benefitsDescription", label: "Benefits Package Description", type: "textarea", required: false, section: "Benefits", sectionOrder: 4, placeholder: "e.g., Health, dental, vision insurance, 401(k) matching" },
    { id: "ptoDays", label: "Paid Time Off (PTO) Days Per Year", type: "number", required: true, section: "Benefits", sectionOrder: 4, placeholder: "e.g., 20" },
    { id: "hasProbation", label: "Include Probationary Period?", type: "radio", required: true, section: "Benefits", sectionOrder: 4, options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    { id: "probationLength", label: "Probationary Period Length", type: "select", required: true, section: "Benefits", sectionOrder: 4, showWhen: { field: "hasProbation", value: "yes" }, options: [{ value: "30_days", label: "30 Days" }, { value: "60_days", label: "60 Days" }, { value: "90_days", label: "90 Days" }, { value: "6_months", label: "6 Months" }] },

    // ── Confidentiality & IP ──
    { id: "confidentialityRequired", label: "Require Confidentiality Agreement?", type: "radio", required: true, section: "Confidentiality & IP", sectionOrder: 5, options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    { id: "ipAssignment", label: "Work Product / IP Assignment", type: "select", required: true, section: "Confidentiality & IP", sectionOrder: 5, options: [{ value: "all_employer", label: "All work product belongs to employer" }, { value: "related_only", label: "Only work related to job duties" }, { value: "negotiated", label: "To be negotiated" }] },
    { id: "hasNonCompete", label: "Include Non-Compete Clause?", type: "radio", required: true, section: "Confidentiality & IP", sectionOrder: 5, options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    { id: "nonCompetePeriod", label: "Non-Compete Period After Employment", type: "select", required: true, section: "Confidentiality & IP", sectionOrder: 5, showWhen: { field: "hasNonCompete", value: "yes" }, options: [{ value: "6_months", label: "6 Months" }, { value: "1_year", label: "1 Year" }, { value: "2_years", label: "2 Years" }] },
    { id: "nonCompeteScope", label: "Non-Compete Geographic Scope", type: "text", required: true, section: "Confidentiality & IP", sectionOrder: 5, showWhen: { field: "hasNonCompete", value: "yes" }, placeholder: "e.g., Within the United States" },

    // ── Termination ──
    { id: "noticePeriod", label: "Termination Notice Period", type: "select", required: true, section: "Termination", sectionOrder: 6, options: [{ value: "at_will", label: "At-Will (no notice required)" }, { value: "2_weeks", label: "2 Weeks" }, { value: "30_days", label: "30 Days" }, { value: "60_days", label: "60 Days" }, { value: "90_days", label: "90 Days" }] },
    { id: "hasSeverance", label: "Include Severance Package?", type: "radio", required: true, section: "Termination", sectionOrder: 6, options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    { id: "severanceTerms", label: "Severance Terms", type: "textarea", required: true, section: "Termination", sectionOrder: 6, showWhen: { field: "hasSeverance", value: "yes" }, placeholder: "e.g., 2 weeks pay per year of service, up to 26 weeks" },
    { id: "terminationForCause", label: "Define Termination for Cause Events", type: "textarea", required: false, section: "Termination", sectionOrder: 6, placeholder: "e.g., Fraud, willful misconduct, material breach, conviction of felony" },
  ],

  // ══════════════════════════════════════════════════════════════════════════
  // 5. RESIDENTIAL LEASE AGREEMENT
  // ══════════════════════════════════════════════════════════════════════════
  residential_lease_agreement: [
    // ── Parties ──
    { id: "landlordName", label: "Landlord / Property Owner Name", type: "text", required: true, section: "Parties", sectionOrder: 1 },
    { id: "landlordAddress", label: "Landlord Address", type: "text", required: true, section: "Parties", sectionOrder: 1 },
    { id: "tenantName", label: "Primary Tenant Full Legal Name", type: "text", required: true, section: "Parties", sectionOrder: 1 },
    { id: "tenantEmail", label: "Tenant Email", type: "text", required: false, section: "Parties", sectionOrder: 1 },
    { id: "numberOfTenants", label: "Number of Additional Tenants", type: "select", required: true, section: "Parties", sectionOrder: 1, forIntents: ["multi_tenant"], options: [{ value: "1", label: "1 Additional Tenant" }, { value: "2", label: "2 Additional Tenants" }, { value: "3_plus", label: "3 or More" }] },
    { id: "additionalTenants", label: "Additional Tenant Names", type: "textarea", required: true, section: "Parties", sectionOrder: 1, forIntents: ["multi_tenant"], placeholder: "List all additional tenant full legal names" },
    { id: "jointSeveralLiability", label: "Joint and Several Liability?", type: "radio", required: true, section: "Parties", sectionOrder: 1, forIntents: ["multi_tenant"], helpText: "Each tenant is individually responsible for the full rent", options: [{ value: "yes", label: "Yes (recommended)" }, { value: "no", label: "No" }] },

    // ── Property Details ──
    { id: "propertyAddress", label: "Property Address", type: "text", required: true, section: "Property Details", sectionOrder: 2 },
    { id: "propertyType", label: "Property Type", type: "select", required: true, section: "Property Details", sectionOrder: 2, options: [{ value: "apartment", label: "Apartment" }, { value: "house", label: "House" }, { value: "condo", label: "Condominium" }, { value: "townhouse", label: "Townhouse" }, { value: "duplex", label: "Duplex" }] },
    { id: "bedrooms", label: "Number of Bedrooms", type: "number", required: true, section: "Property Details", sectionOrder: 2 },
    { id: "bathrooms", label: "Number of Bathrooms", type: "number", required: true, section: "Property Details", sectionOrder: 2 },
    { id: "furnishedInventory", label: "Furnished Items Inventory", type: "textarea", required: true, section: "Property Details", sectionOrder: 2, forIntents: ["furnished"], placeholder: "List all furnished items and their condition" },
    { id: "conditionReport", label: "Move-in Condition Report Required?", type: "radio", required: true, section: "Property Details", sectionOrder: 2, forIntents: ["furnished"], options: [{ value: "yes", label: "Yes (recommended)" }, { value: "no", label: "No" }] },

    // ── Lease Terms ──
    { id: "state", label: "State", type: "state", required: true, section: "Lease Terms", sectionOrder: 3 },
    { id: "leaseStartDate", label: "Lease Start Date", type: "date", required: true, section: "Lease Terms", sectionOrder: 3 },
    { id: "leaseEndDate", label: "Lease End Date", type: "date", required: true, section: "Lease Terms", sectionOrder: 3 },
    { id: "leaseType", label: "Lease Type", type: "select", required: true, section: "Lease Terms", sectionOrder: 3, options: [{ value: "fixed", label: "Fixed-Term" }, { value: "month_to_month", label: "Month-to-Month" }] },
    { id: "autoRenewal", label: "Auto-Renewal at End of Term?", type: "radio", required: true, section: "Lease Terms", sectionOrder: 3, options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    { id: "renewalTerms", label: "Renewal Terms", type: "textarea", required: true, section: "Lease Terms", sectionOrder: 3, showWhen: { field: "autoRenewal", value: "yes" }, placeholder: "e.g., Converts to month-to-month at same rate" },

    // ── Financial Terms ──
    { id: "rentAmount", label: "Monthly Rent Amount", type: "text", required: true, section: "Financial Terms", sectionOrder: 4, placeholder: "e.g., $1,500" },
    { id: "rentDueDate", label: "Rent Due Date", type: "select", required: true, section: "Financial Terms", sectionOrder: 4, options: [{ value: "1st", label: "1st of each month" }, { value: "15th", label: "15th of each month" }, { value: "last_day", label: "Last day of each month" }] },
    { id: "securityDeposit", label: "Security Deposit Amount", type: "text", required: true, section: "Financial Terms", sectionOrder: 4, placeholder: "e.g., $1,500" },
    { id: "lateFee", label: "Late Payment Fee", type: "text", required: true, section: "Financial Terms", sectionOrder: 4, placeholder: "e.g., $50 or 5% of rent" },
    { id: "paymentMethods", label: "Accepted Payment Methods", type: "textarea", required: false, section: "Financial Terms", sectionOrder: 4, placeholder: "e.g., Check, bank transfer, online portal" },

    // ── Policies ──
    { id: "petPolicy", label: "Pet Policy", type: "select", required: true, section: "Policies", sectionOrder: 5, options: [{ value: "no_pets", label: "No Pets Allowed" }, { value: "cats_only", label: "Cats Only" }, { value: "small_pets", label: "Small Pets (under 25 lbs)" }, { value: "all_pets", label: "All Pets with Approval" }] },
    { id: "petDeposit", label: "Pet Deposit Amount", type: "text", required: true, section: "Policies", sectionOrder: 5, showWhen: { field: "petPolicy", value: ["cats_only", "small_pets", "all_pets"] }, placeholder: "e.g., $300" },
    { id: "petRestrictions", label: "Pet Restrictions", type: "textarea", required: false, section: "Policies", sectionOrder: 5, showWhen: { field: "petPolicy", value: ["cats_only", "small_pets", "all_pets"] }, placeholder: "e.g., Maximum 2 pets, no aggressive breeds" },
    { id: "smokingPolicy", label: "Smoking Policy", type: "select", required: true, section: "Policies", sectionOrder: 5, options: [{ value: "no_smoking", label: "No Smoking Anywhere" }, { value: "outside_only", label: "Outside Only" }, { value: "designated_areas", label: "Designated Areas Only" }] },
    { id: "guestPolicy", label: "Guest Stay Policy", type: "select", required: true, section: "Policies", sectionOrder: 5, options: [{ value: "no_limit", label: "No Restrictions" }, { value: "14_days", label: "Guests limited to 14 consecutive days" }, { value: "7_days", label: "Guests limited to 7 consecutive days" }, { value: "approval_required", label: "Landlord Approval Required for Extended Stays" }] },

    // ── Utilities & Maintenance ──
    { id: "utilitiesIncluded", label: "Utilities Included in Rent", type: "textarea", required: false, section: "Utilities & Maintenance", sectionOrder: 6, placeholder: "e.g., Water, trash. Tenant pays electric, gas, internet." },
    { id: "maintenanceResponsibility", label: "Maintenance Responsibilities", type: "select", required: true, section: "Utilities & Maintenance", sectionOrder: 6, options: [{ value: "landlord_all", label: "Landlord handles all maintenance" }, { value: "tenant_minor", label: "Tenant handles minor repairs (under $100)" }, { value: "shared", label: "Shared responsibility" }] },
    { id: "landscapingResponsibility", label: "Landscaping / Yard Maintenance", type: "select", required: false, section: "Utilities & Maintenance", sectionOrder: 6, options: [{ value: "landlord", label: "Landlord" }, { value: "tenant", label: "Tenant" }, { value: "not_applicable", label: "Not Applicable" }] },
  ],

  // ══════════════════════════════════════════════════════════════════════════
  // 6. INDEPENDENT CONTRACTOR AGREEMENT
  // ══════════════════════════════════════════════════════════════════════════
  independent_contractor_agreement: [
    // ── Parties ──
    { id: "clientName", label: "Client / Company Name", type: "text", required: true, section: "Parties", sectionOrder: 1 },
    { id: "clientAddress", label: "Client Address", type: "text", required: true, section: "Parties", sectionOrder: 1 },
    { id: "contractorName", label: "Contractor Full Legal Name", type: "text", required: true, section: "Parties", sectionOrder: 1 },
    { id: "contractorAddress", label: "Contractor Address", type: "text", required: true, section: "Parties", sectionOrder: 1 },
    { id: "contractorBusinessName", label: "Contractor Business Name (if applicable)", type: "text", required: false, section: "Parties", sectionOrder: 1 },

    // ── Scope of Work ──
    { id: "servicesDescription", label: "Description of Services", type: "textarea", required: true, section: "Scope of Work", sectionOrder: 2, placeholder: "Describe the services to be performed in detail" },
    { id: "deliverables", label: "Specific Deliverables", type: "textarea", required: true, section: "Scope of Work", sectionOrder: 2, placeholder: "List all expected deliverables" },
    { id: "projectMilestones", label: "Project Milestones & Deadlines", type: "textarea", required: true, section: "Scope of Work", sectionOrder: 2, forIntents: ["project_based"], placeholder: "e.g., Phase 1 by March 1, Phase 2 by April 15, Final delivery by May 30" },
    { id: "workLocation", label: "Work Location", type: "select", required: true, section: "Scope of Work", sectionOrder: 2, options: [{ value: "remote", label: "Remote" }, { value: "client_site", label: "Client's Site" }, { value: "contractor_choice", label: "Contractor's Choice" }] },
    { id: "reportingRequirements", label: "Reporting Requirements", type: "select", required: true, section: "Scope of Work", sectionOrder: 2, options: [{ value: "weekly", label: "Weekly Status Reports" }, { value: "bi_weekly", label: "Bi-Weekly Updates" }, { value: "monthly", label: "Monthly Reports" }, { value: "milestone_based", label: "At Each Milestone" }, { value: "none", label: "None" }] },

    // ── Terms ──
    { id: "effectiveDate", label: "Effective / Start Date", type: "date", required: true, section: "Terms", sectionOrder: 3 },
    { id: "endDate", label: "End Date", type: "date", required: true, section: "Terms", sectionOrder: 3, forIntents: ["project_based"] },
    { id: "state", label: "Governing State", type: "state", required: true, section: "Terms", sectionOrder: 3 },
    { id: "terminationNotice", label: "Termination Notice Period", type: "select", required: true, section: "Terms", sectionOrder: 3, options: [{ value: "immediately", label: "Immediate" }, { value: "7_days", label: "7 Days" }, { value: "14_days", label: "14 Days" }, { value: "30_days", label: "30 Days" }] },
    { id: "renewalTerms", label: "Renewal / Extension Terms", type: "textarea", required: false, section: "Terms", sectionOrder: 3, forIntents: ["ongoing"], placeholder: "e.g., Auto-renews annually unless 30-day notice given" },

    // ── Compensation ──
    { id: "hourlyRate", label: "Hourly Rate", type: "text", required: true, section: "Compensation", sectionOrder: 4, forIntents: ["hourly"], placeholder: "e.g., $150/hour" },
    { id: "maxHoursPerWeek", label: "Maximum Hours Per Week", type: "number", required: false, section: "Compensation", sectionOrder: 4, forIntents: ["hourly"], placeholder: "e.g., 40" },
    { id: "invoicingCadence", label: "Invoicing Schedule", type: "select", required: true, section: "Compensation", sectionOrder: 4, forIntents: ["hourly"], options: [{ value: "weekly", label: "Weekly" }, { value: "bi_weekly", label: "Bi-Weekly" }, { value: "monthly", label: "Monthly" }] },
    { id: "projectFee", label: "Total Project Fee", type: "text", required: true, section: "Compensation", sectionOrder: 4, forIntents: ["project_based"], placeholder: "e.g., $25,000" },
    { id: "paymentSchedule", label: "Payment Schedule", type: "textarea", required: true, section: "Compensation", sectionOrder: 4, forIntents: ["project_based"], placeholder: "e.g., 50% upfront, 25% at midpoint, 25% on completion" },
    { id: "retainerAmount", label: "Monthly Retainer Amount", type: "text", required: true, section: "Compensation", sectionOrder: 4, forIntents: ["ongoing"], placeholder: "e.g., $5,000/month" },
    { id: "retainerScope", label: "Retainer Scope (Hours/Services Included)", type: "textarea", required: true, section: "Compensation", sectionOrder: 4, forIntents: ["ongoing"], placeholder: "e.g., Up to 30 hours/month of consulting services" },
    { id: "paymentTerms", label: "Payment Terms", type: "select", required: true, section: "Compensation", sectionOrder: 4, options: [{ value: "upon_receipt", label: "Due Upon Receipt" }, { value: "net_15", label: "Net 15 Days" }, { value: "net_30", label: "Net 30 Days" }, { value: "net_45", label: "Net 45 Days" }] },
    { id: "expenseReimbursement", label: "Expense Reimbursement?", type: "radio", required: true, section: "Compensation", sectionOrder: 4, options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    { id: "expenseTerms", label: "Expense Reimbursement Terms", type: "textarea", required: true, section: "Compensation", sectionOrder: 4, showWhen: { field: "expenseReimbursement", value: "yes" }, placeholder: "e.g., Pre-approved expenses over $100, receipts required" },

    // ── IP & Confidentiality ──
    { id: "ipOwnership", label: "Work Product / IP Ownership", type: "select", required: true, section: "IP & Confidentiality", sectionOrder: 5, options: [{ value: "client_owns", label: "Client Owns All Work Product" }, { value: "contractor_licenses", label: "Contractor Retains, Licenses to Client" }, { value: "joint_ownership", label: "Joint Ownership" }] },
    { id: "confidentialityRequired", label: "Require Confidentiality?", type: "radio", required: true, section: "IP & Confidentiality", sectionOrder: 5, options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    { id: "hasNonCompete", label: "Include Non-Compete?", type: "radio", required: true, section: "IP & Confidentiality", sectionOrder: 5, options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    { id: "nonCompeteDuration", label: "Non-Compete Duration", type: "select", required: true, section: "IP & Confidentiality", sectionOrder: 5, showWhen: { field: "hasNonCompete", value: "yes" }, options: [{ value: "6_months", label: "6 Months" }, { value: "1_year", label: "1 Year" }, { value: "2_years", label: "2 Years" }] },
    { id: "nonCompeteScope", label: "Non-Compete Scope", type: "text", required: true, section: "IP & Confidentiality", sectionOrder: 5, showWhen: { field: "hasNonCompete", value: "yes" }, placeholder: "e.g., Cannot work for direct competitors in same industry" },

    // ── Insurance & Liability ──
    { id: "liabilityInsuranceRequired", label: "Liability Insurance Required?", type: "radio", required: true, section: "Insurance & Liability", sectionOrder: 6, options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    { id: "indemnification", label: "Indemnification", type: "select", required: true, section: "Insurance & Liability", sectionOrder: 6, options: [{ value: "mutual", label: "Mutual Indemnification" }, { value: "contractor_only", label: "Contractor Indemnifies Client" }, { value: "none", label: "No Indemnification" }] },
    { id: "liabilityLimitation", label: "Limitation of Liability", type: "select", required: true, section: "Insurance & Liability", sectionOrder: 6, options: [{ value: "contract_value", label: "Limited to Total Contract Value" }, { value: "12_months_fees", label: "Limited to 12 Months of Fees" }, { value: "unlimited", label: "No Cap (Unlimited)" }] },
  ],

  // ══════════════════════════════════════════════════════════════════════════
  // 7. POWER OF ATTORNEY
  // ══════════════════════════════════════════════════════════════════════════
  power_of_attorney: [
    // ── Principal Information ──
    { id: "principalName", label: "Principal Full Legal Name", type: "text", required: true, section: "Principal Information", sectionOrder: 1, helpText: "Person granting authority" },
    { id: "principalAddress", label: "Principal Address", type: "text", required: true, section: "Principal Information", sectionOrder: 1 },
    { id: "principalDOB", label: "Principal Date of Birth", type: "date", required: true, section: "Principal Information", sectionOrder: 1 },
    { id: "state", label: "State", type: "state", required: true, section: "Principal Information", sectionOrder: 1 },

    // ── Agent Information ──
    { id: "agentName", label: "Agent (Attorney-in-Fact) Full Legal Name", type: "text", required: true, section: "Agent Information", sectionOrder: 2, helpText: "Person receiving authority to act" },
    { id: "agentAddress", label: "Agent Address", type: "text", required: true, section: "Agent Information", sectionOrder: 2 },
    { id: "agentRelationship", label: "Relationship to Principal", type: "text", required: true, section: "Agent Information", sectionOrder: 2, placeholder: "e.g., Spouse, child, attorney, trusted friend" },
    { id: "alternateAgentName", label: "Successor / Alternate Agent Name", type: "text", required: false, section: "Agent Information", sectionOrder: 2, helpText: "Acts if primary agent is unable or unwilling" },
    { id: "alternateAgentAddress", label: "Successor Agent Address", type: "text", required: false, section: "Agent Information", sectionOrder: 2, showWhen: { field: "alternateAgentName", value: [] } },

    // ── Powers Granted ──
    { id: "isDurable", label: "Durable Power of Attorney?", type: "radio", required: true, section: "Powers Granted", sectionOrder: 3, helpText: "Remains effective if principal becomes incapacitated", options: [{ value: "yes", label: "Yes (remains effective if incapacitated)" }, { value: "no", label: "No (terminates upon incapacity)" }] },
    { id: "generalPowersConfirm", label: "Grant Broad General Authority?", type: "radio", required: true, section: "Powers Granted", sectionOrder: 3, forIntents: ["general"], helpText: "Covers financial, legal, and property matters", options: [{ value: "yes", label: "Yes, grant broad authority" }, { value: "limited_list", label: "I want to specify certain powers" }] },
    { id: "generalPowersCustom", label: "Specify General Powers to Include", type: "textarea", required: true, section: "Powers Granted", sectionOrder: 3, forIntents: ["general"], showWhen: { field: "generalPowersConfirm", value: "limited_list" }, placeholder: "List the specific financial and legal powers to grant" },
    { id: "limitations", label: "Specific Powers Granted", type: "textarea", required: true, section: "Powers Granted", sectionOrder: 3, forIntents: ["limited"], placeholder: "e.g., Authority to sell property at 123 Main St, sign closing documents, and deposit proceeds" },
    { id: "limitedExpiration", label: "Limited POA Expiration Event", type: "text", required: false, section: "Powers Granted", sectionOrder: 3, forIntents: ["limited"], placeholder: "e.g., Upon closing of property sale, or December 31, 2025" },
    { id: "healthcareScope", label: "Healthcare Decision Scope", type: "textarea", required: true, section: "Powers Granted", sectionOrder: 3, forIntents: ["healthcare"], placeholder: "e.g., All medical decisions, choice of physicians, facility selection, treatment consent" },
    { id: "hipaaAuthorization", label: "Include HIPAA Authorization?", type: "radio", required: true, section: "Powers Granted", sectionOrder: 3, forIntents: ["healthcare"], helpText: "Allows agent to access medical records", options: [{ value: "yes", label: "Yes (recommended)" }, { value: "no", label: "No" }] },
    { id: "endOfLifeDirectives", label: "Include End-of-Life Directives?", type: "radio", required: true, section: "Powers Granted", sectionOrder: 3, forIntents: ["healthcare"], options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    { id: "endOfLifeDetails", label: "End-of-Life Preferences", type: "textarea", required: true, section: "Powers Granted", sectionOrder: 3, forIntents: ["healthcare"], showWhen: { field: "endOfLifeDirectives", value: "yes" }, placeholder: "e.g., Do not resuscitate if terminal condition, withdraw life support after 30 days if no recovery" },

    // ── Effective Period ──
    { id: "effectiveDate", label: "Effective Date", type: "date", required: true, section: "Effective Period", sectionOrder: 4 },
    { id: "expirationDate", label: "Expiration Date", type: "date", required: false, section: "Effective Period", sectionOrder: 4, helpText: "Leave blank if no expiration (continues until revoked)" },
    { id: "isSpringing", label: "Springing Power of Attorney?", type: "radio", required: true, section: "Effective Period", sectionOrder: 4, helpText: "Only takes effect upon a triggering event (e.g., incapacity)", options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No (effective immediately)" }] },
    { id: "springingTrigger", label: "Triggering Event / Condition", type: "textarea", required: true, section: "Effective Period", sectionOrder: 4, showWhen: { field: "isSpringing", value: "yes" }, placeholder: "e.g., Upon written certification of incapacity by two licensed physicians" },

    // ── Limitations & Oversight ──
    { id: "excludedPowers", label: "Powers Specifically Excluded", type: "textarea", required: false, section: "Limitations & Oversight", sectionOrder: 5, placeholder: "e.g., Cannot change beneficiaries, cannot make gifts over $15,000" },
    { id: "agentCompensation", label: "Agent Compensation", type: "select", required: true, section: "Limitations & Oversight", sectionOrder: 5, options: [{ value: "none", label: "No Compensation" }, { value: "reasonable", label: "Reasonable Compensation" }, { value: "specified", label: "Specified Amount" }] },
    { id: "accountingRequired", label: "Accounting / Record-Keeping Required?", type: "radio", required: true, section: "Limitations & Oversight", sectionOrder: 5, helpText: "Agent must maintain records of all transactions", options: [{ value: "yes", label: "Yes (recommended)" }, { value: "no", label: "No" }] },
  ],

  // ══════════════════════════════════════════════════════════════════════════
  // 8. LAST WILL & TESTAMENT
  // ══════════════════════════════════════════════════════════════════════════
  last_will_testament: [
    // ── Testator Information ──
    { id: "testatorName", label: "Testator Full Legal Name", type: "text", required: true, section: "Testator Information", sectionOrder: 1, helpText: "Person making the will" },
    { id: "testatorAddress", label: "Testator Address", type: "text", required: true, section: "Testator Information", sectionOrder: 1 },
    { id: "testatorDOB", label: "Date of Birth", type: "date", required: true, section: "Testator Information", sectionOrder: 1 },
    { id: "state", label: "State of Residence", type: "state", required: true, section: "Testator Information", sectionOrder: 1 },
    { id: "maritalStatus", label: "Marital Status", type: "select", required: true, section: "Testator Information", sectionOrder: 1, options: [{ value: "single", label: "Single" }, { value: "married", label: "Married" }, { value: "divorced", label: "Divorced" }, { value: "widowed", label: "Widowed" }, { value: "domestic_partner", label: "Domestic Partner" }] },
    { id: "spouseName", label: "Spouse / Partner Name", type: "text", required: true, section: "Testator Information", sectionOrder: 1, showWhen: { field: "maritalStatus", value: ["married", "domestic_partner"] } },

    // ── Executor ──
    { id: "executorName", label: "Executor Full Legal Name", type: "text", required: true, section: "Executor", sectionOrder: 2, helpText: "Person responsible for carrying out the will" },
    { id: "executorRelationship", label: "Executor Relationship to Testator", type: "text", required: true, section: "Executor", sectionOrder: 2, placeholder: "e.g., Spouse, child, attorney, trusted friend" },
    { id: "alternateExecutor", label: "Alternate Executor Name", type: "text", required: false, section: "Executor", sectionOrder: 2, helpText: "Acts if primary executor is unable or unwilling" },
    { id: "executorCompensation", label: "Executor Compensation", type: "select", required: true, section: "Executor", sectionOrder: 2, options: [{ value: "none", label: "No Compensation" }, { value: "reasonable", label: "Reasonable Compensation" }, { value: "statutory", label: "Statutory Fee (per state law)" }, { value: "percentage", label: "Percentage of Estate" }] },

    // ── Beneficiaries & Distribution ──
    { id: "primaryBeneficiaries", label: "Primary Beneficiaries and Their Shares", type: "textarea", required: true, section: "Beneficiaries & Distribution", sectionOrder: 3, placeholder: "e.g., Jane Doe (spouse) - 50%, John Doe Jr. (son) - 25%, Sarah Doe (daughter) - 25%" },
    { id: "residualBeneficiary", label: "Residual Estate Beneficiary", type: "text", required: true, section: "Beneficiaries & Distribution", sectionOrder: 3, helpText: "Receives anything not specifically bequeathed" },
    { id: "hasSpecificBequests", label: "Include Specific Bequests?", type: "radio", required: true, section: "Beneficiaries & Distribution", sectionOrder: 3, helpText: "Specific items to specific people (e.g., jewelry, vehicles)", options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    { id: "specificBequests", label: "Specific Bequests", type: "textarea", required: true, section: "Beneficiaries & Distribution", sectionOrder: 3, showWhen: { field: "hasSpecificBequests", value: "yes" }, placeholder: "e.g., Wedding ring to daughter Sarah, Classic car to son John, $10,000 to brother Michael" },
    { id: "hasCharitableBequests", label: "Include Charitable Bequests?", type: "radio", required: true, section: "Beneficiaries & Distribution", sectionOrder: 3, options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    { id: "charitableBequests", label: "Charitable Bequests", type: "textarea", required: true, section: "Beneficiaries & Distribution", sectionOrder: 3, showWhen: { field: "hasCharitableBequests", value: "yes" }, placeholder: "e.g., $5,000 to American Red Cross, 5% of estate to local food bank" },

    // ── Guardianship ──
    { id: "hasMinorChildren", label: "Do you have minor children?", type: "radio", required: true, section: "Guardianship", sectionOrder: 4, options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    { id: "guardianName", label: "Guardian for Minor Children", type: "text", required: true, section: "Guardianship", sectionOrder: 4, showWhen: { field: "hasMinorChildren", value: "yes" } },
    { id: "alternateGuardian", label: "Alternate Guardian", type: "text", required: false, section: "Guardianship", sectionOrder: 4, showWhen: { field: "hasMinorChildren", value: "yes" } },
    { id: "childrensTrust", label: "Create Trust for Minor Children's Inheritance?", type: "radio", required: true, section: "Guardianship", sectionOrder: 4, showWhen: { field: "hasMinorChildren", value: "yes" }, helpText: "Holds assets until children reach a specified age", options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    { id: "trusteeName", label: "Trustee Name", type: "text", required: true, section: "Guardianship", sectionOrder: 4, showWhen: { field: "childrensTrust", value: "yes" } },
    { id: "trustDistributionAge", label: "Age for Trust Distribution", type: "select", required: true, section: "Guardianship", sectionOrder: 4, showWhen: { field: "childrensTrust", value: "yes" }, options: [{ value: "18", label: "18 years old" }, { value: "21", label: "21 years old" }, { value: "25", label: "25 years old" }, { value: "staged", label: "Staged (e.g., 25% at 21, rest at 25)" }] },

    // ── Debts & Final Wishes ──
    { id: "debtHandling", label: "Debt and Tax Handling", type: "select", required: true, section: "Debts & Final Wishes", sectionOrder: 5, options: [{ value: "residual_estate", label: "Pay from residual estate first" }, { value: "pro_rata", label: "Deduct proportionally from all beneficiaries" }, { value: "specific_source", label: "Pay from specific source" }] },
    { id: "funeralWishes", label: "Funeral / Memorial Wishes", type: "textarea", required: false, section: "Debts & Final Wishes", sectionOrder: 5, placeholder: "e.g., Cremation preferred, memorial service at First Baptist Church" },
    { id: "digitalAssets", label: "Digital Assets Instructions", type: "textarea", required: false, section: "Debts & Final Wishes", sectionOrder: 5, placeholder: "e.g., Grant executor access to email, social media, crypto wallets" },
  ],

  // ══════════════════════════════════════════════════════════════════════════
  // 9. COMMERCIAL LEASE AGREEMENT
  // ══════════════════════════════════════════════════════════════════════════
  commercial_lease_agreement: [
    // ── Parties ──
    { id: "landlordName", label: "Landlord / Property Owner Name", type: "text", required: true, section: "Parties", sectionOrder: 1 },
    { id: "landlordAddress", label: "Landlord Address", type: "text", required: true, section: "Parties", sectionOrder: 1 },
    { id: "tenantBusinessName", label: "Tenant Business Name", type: "text", required: true, section: "Parties", sectionOrder: 1 },
    { id: "tenantAddress", label: "Tenant Business Address", type: "text", required: true, section: "Parties", sectionOrder: 1 },

    // ── Property ──
    { id: "propertyAddress", label: "Leased Property Address", type: "text", required: true, section: "Property", sectionOrder: 2 },
    { id: "squareFootage", label: "Rentable Square Footage", type: "number", required: true, section: "Property", sectionOrder: 2 },
    { id: "permittedUse", label: "Permitted Use of Premises", type: "textarea", required: true, section: "Property", sectionOrder: 2, placeholder: "e.g., General office use, retail sales, medical practice" },
    { id: "parkingSpaces", label: "Number of Parking Spaces Included", type: "number", required: false, section: "Property", sectionOrder: 2 },
    { id: "commonAreaAccess", label: "Common Area Access", type: "textarea", required: false, section: "Property", sectionOrder: 2, placeholder: "e.g., Lobby, restrooms, elevators, loading dock" },

    // ── Lease Terms ──
    { id: "state", label: "State", type: "state", required: true, section: "Lease Terms", sectionOrder: 3 },
    { id: "leaseStartDate", label: "Lease Start Date (Commencement)", type: "date", required: true, section: "Lease Terms", sectionOrder: 3 },
    { id: "leaseTerm", label: "Lease Term Length", type: "select", required: true, section: "Lease Terms", sectionOrder: 3, options: [{ value: "1_year", label: "1 Year" }, { value: "2_years", label: "2 Years" }, { value: "3_years", label: "3 Years" }, { value: "5_years", label: "5 Years" }, { value: "10_years", label: "10 Years" }, { value: "custom", label: "Custom" }] },
    { id: "customTerm", label: "Custom Lease Term", type: "text", required: true, section: "Lease Terms", sectionOrder: 3, showWhen: { field: "leaseTerm", value: "custom" }, placeholder: "e.g., 7 years" },
    { id: "hasRenewalOption", label: "Renewal Option?", type: "radio", required: true, section: "Lease Terms", sectionOrder: 3, options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    { id: "renewalTerms", label: "Renewal Terms", type: "textarea", required: true, section: "Lease Terms", sectionOrder: 3, showWhen: { field: "hasRenewalOption", value: "yes" }, placeholder: "e.g., Two 5-year renewal options at fair market value" },

    // ── Financial Terms ──
    { id: "monthlyBaseRent", label: "Monthly Base Rent", type: "text", required: true, section: "Financial Terms", sectionOrder: 4, placeholder: "e.g., $5,000" },
    { id: "expenseResponsibilities", label: "Tenant Expense Responsibilities", type: "textarea", required: true, section: "Financial Terms", sectionOrder: 4, forIntents: ["net"], helpText: "For net leases, specify which expenses tenant pays", placeholder: "e.g., Property taxes, insurance, maintenance (NNN) or specific categories" },
    { id: "camCharges", label: "Common Area Maintenance (CAM) Charges", type: "text", required: false, section: "Financial Terms", sectionOrder: 4, placeholder: "e.g., $500/month or proportionate share" },
    { id: "securityDeposit", label: "Security Deposit", type: "text", required: true, section: "Financial Terms", sectionOrder: 4, placeholder: "e.g., $10,000" },
    { id: "hasRentEscalation", label: "Include Annual Rent Escalation?", type: "radio", required: true, section: "Financial Terms", sectionOrder: 4, options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    { id: "escalationRate", label: "Annual Escalation Rate", type: "text", required: true, section: "Financial Terms", sectionOrder: 4, showWhen: { field: "hasRentEscalation", value: "yes" }, placeholder: "e.g., 3% per year or CPI adjustment" },

    // ── Improvements ──
    { id: "hasTenantImprovement", label: "Tenant Improvement (TI) Allowance?", type: "radio", required: true, section: "Improvements", sectionOrder: 5, options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    { id: "tiAmount", label: "TI Allowance Amount", type: "text", required: true, section: "Improvements", sectionOrder: 5, showWhen: { field: "hasTenantImprovement", value: "yes" }, placeholder: "e.g., $25,000 or $15/sq ft" },
    { id: "tiScope", label: "TI Scope of Work", type: "textarea", required: true, section: "Improvements", sectionOrder: 5, showWhen: { field: "hasTenantImprovement", value: "yes" }, placeholder: "Describe permitted improvements" },
    { id: "landlordImprovements", label: "Landlord Pre-Occupancy Improvements", type: "textarea", required: false, section: "Improvements", sectionOrder: 5, placeholder: "Any improvements landlord agrees to complete before occupancy" },

    // ── Insurance & Default ──
    { id: "insuranceRequirements", label: "Tenant Insurance Requirements", type: "textarea", required: true, section: "Insurance & Default", sectionOrder: 6, placeholder: "e.g., General liability ($1M/$2M), property insurance, workers comp" },
    { id: "defaultCurePeriod", label: "Default Cure Period", type: "select", required: true, section: "Insurance & Default", sectionOrder: 6, options: [{ value: "10_days", label: "10 Days" }, { value: "15_days", label: "15 Days" }, { value: "30_days", label: "30 Days" }] },
  ],

  // ══════════════════════════════════════════════════════════════════════════
  // 10. SERVICE AGREEMENT
  // ══════════════════════════════════════════════════════════════════════════
  service_agreement: [
    // ── Parties ──
    { id: "providerName", label: "Service Provider Name", type: "text", required: true, section: "Parties", sectionOrder: 1 },
    { id: "providerAddress", label: "Provider Address", type: "text", required: true, section: "Parties", sectionOrder: 1 },
    { id: "clientName", label: "Client Name", type: "text", required: true, section: "Parties", sectionOrder: 1 },
    { id: "clientAddress", label: "Client Address", type: "text", required: true, section: "Parties", sectionOrder: 1 },

    // ── Agreement Details ──
    { id: "state", label: "Governing State", type: "state", required: true, section: "Agreement Details", sectionOrder: 2 },
    { id: "effectiveDate", label: "Effective Date", type: "date", required: true, section: "Agreement Details", sectionOrder: 2 },
    { id: "servicesDescription", label: "Description of Services", type: "textarea", required: true, section: "Agreement Details", sectionOrder: 2, placeholder: "Detailed description of services to be provided" },
    { id: "term", label: "Agreement Term", type: "select", required: true, section: "Agreement Details", sectionOrder: 2, options: [{ value: "3_months", label: "3 Months" }, { value: "6_months", label: "6 Months" }, { value: "1_year", label: "1 Year" }, { value: "2_years", label: "2 Years" }, { value: "ongoing", label: "Ongoing (until terminated)" }] },
    { id: "deliverables", label: "Specific Deliverables", type: "textarea", required: true, section: "Agreement Details", sectionOrder: 2, placeholder: "List all expected deliverables and milestones" },

    // ── Compensation ──
    { id: "totalFee", label: "Total Fixed Fee", type: "text", required: true, section: "Compensation", sectionOrder: 3, forIntents: ["fixed_fee"], placeholder: "e.g., $15,000" },
    { id: "milestonePayments", label: "Milestone Payment Schedule", type: "textarea", required: true, section: "Compensation", sectionOrder: 3, forIntents: ["fixed_fee"], placeholder: "e.g., 30% upon signing, 40% at midpoint, 30% on completion" },
    { id: "retainerAmount", label: "Monthly Retainer Amount", type: "text", required: true, section: "Compensation", sectionOrder: 3, forIntents: ["retainer"], placeholder: "e.g., $3,000/month" },
    { id: "retainerScope", label: "Hours / Scope Included in Retainer", type: "textarea", required: true, section: "Compensation", sectionOrder: 3, forIntents: ["retainer"], placeholder: "e.g., Up to 20 hours/month of consulting. Additional hours at $200/hr." },
    { id: "overageRate", label: "Overage Rate (beyond retainer scope)", type: "text", required: false, section: "Compensation", sectionOrder: 3, forIntents: ["retainer"], placeholder: "e.g., $200/hour" },
    { id: "paymentTerms", label: "Payment Terms", type: "select", required: true, section: "Compensation", sectionOrder: 3, options: [{ value: "upon_receipt", label: "Due Upon Receipt" }, { value: "net_15", label: "Net 15" }, { value: "net_30", label: "Net 30" }, { value: "net_45", label: "Net 45" }] },
    { id: "latePaymentFee", label: "Late Payment Fee", type: "text", required: false, section: "Compensation", sectionOrder: 3, placeholder: "e.g., 1.5% per month on overdue balances" },

    // ── Performance ──
    { id: "performanceStandards", label: "Performance Standards / SLAs", type: "textarea", required: false, section: "Performance", sectionOrder: 4, placeholder: "e.g., 99.9% uptime, 4-hour response time for critical issues" },
    { id: "acceptanceCriteria", label: "Acceptance Criteria for Deliverables", type: "textarea", required: false, section: "Performance", sectionOrder: 4, placeholder: "e.g., Client has 10 business days to review and accept each deliverable" },
    { id: "revisionLimit", label: "Number of Revisions Included", type: "select", required: true, section: "Performance", sectionOrder: 4, options: [{ value: "1", label: "1 Round" }, { value: "2", label: "2 Rounds" }, { value: "3", label: "3 Rounds" }, { value: "unlimited", label: "Unlimited" }] },

    // ── Legal Terms ──
    { id: "liabilityLimitation", label: "Limitation of Liability", type: "select", required: true, section: "Legal Terms", sectionOrder: 5, options: [{ value: "contract_value", label: "Limited to Total Fees Paid" }, { value: "12_months", label: "Limited to 12 Months of Fees" }, { value: "none", label: "No Limitation" }] },
    { id: "confidentiality", label: "Include Confidentiality Clause?", type: "radio", required: true, section: "Legal Terms", sectionOrder: 5, options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    { id: "ipOwnership", label: "Work Product / IP Ownership", type: "select", required: true, section: "Legal Terms", sectionOrder: 5, options: [{ value: "client_owns", label: "Client Owns All Work Product" }, { value: "provider_licenses", label: "Provider Retains, Licenses to Client" }, { value: "joint", label: "Joint Ownership" }] },
    { id: "hasNonSolicitation", label: "Include Non-Solicitation Clause?", type: "radio", required: true, section: "Legal Terms", sectionOrder: 5, options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    { id: "disputeResolution", label: "Dispute Resolution", type: "select", required: true, section: "Legal Terms", sectionOrder: 5, options: [{ value: "mediation", label: "Mediation" }, { value: "arbitration", label: "Binding Arbitration" }, { value: "litigation", label: "Litigation" }] },

    // ── Termination ──
    { id: "terminationNotice", label: "Termination Notice Period", type: "select", required: true, section: "Termination", sectionOrder: 6, options: [{ value: "15_days", label: "15 Days" }, { value: "30_days", label: "30 Days" }, { value: "60_days", label: "60 Days" }, { value: "90_days", label: "90 Days" }] },
    { id: "earlyTerminationFee", label: "Early Termination Fee?", type: "radio", required: true, section: "Termination", sectionOrder: 6, options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    { id: "earlyTerminationAmount", label: "Early Termination Fee Amount", type: "text", required: true, section: "Termination", sectionOrder: 6, showWhen: { field: "earlyTerminationFee", value: "yes" }, placeholder: "e.g., 50% of remaining contract value" },
  ],

  // ══════════════════════════════════════════════════════════════════════════
  // 11. PURCHASE AGREEMENT
  // ══════════════════════════════════════════════════════════════════════════
  purchase_agreement: [
    // ── Parties ──
    { id: "sellerName", label: "Seller Name", type: "text", required: true, section: "Parties", sectionOrder: 1 },
    { id: "sellerAddress", label: "Seller Address", type: "text", required: true, section: "Parties", sectionOrder: 1 },
    { id: "buyerName", label: "Buyer Name", type: "text", required: true, section: "Parties", sectionOrder: 1 },
    { id: "buyerAddress", label: "Buyer Address", type: "text", required: true, section: "Parties", sectionOrder: 1 },

    // ── Item Details ──
    { id: "itemDescription", label: "Description of Items / Assets Being Sold", type: "textarea", required: true, section: "Item Details", sectionOrder: 2, forIntents: ["asset"], placeholder: "Detailed description of the asset(s) being purchased" },
    { id: "serviceDescription", label: "Description of Services Being Purchased", type: "textarea", required: true, section: "Item Details", sectionOrder: 2, forIntents: ["service"], placeholder: "Detailed description of services to be delivered" },
    { id: "deliveryTimeline", label: "Service Delivery Timeline", type: "textarea", required: true, section: "Item Details", sectionOrder: 2, forIntents: ["service"], placeholder: "e.g., Phase 1 by Jan 15, Phase 2 by Feb 28, completion by March 30" },
    { id: "itemCondition", label: "Condition of Items", type: "select", required: true, section: "Item Details", sectionOrder: 2, forIntents: ["asset"], options: [{ value: "new", label: "New" }, { value: "used_excellent", label: "Used - Excellent" }, { value: "used_good", label: "Used - Good" }, { value: "used_fair", label: "Used - Fair" }, { value: "as_is", label: "As-Is" }] },
    { id: "serialNumbers", label: "Serial Numbers / Identifiers", type: "textarea", required: false, section: "Item Details", sectionOrder: 2, forIntents: ["asset"], placeholder: "List serial numbers, VIN numbers, or other identifiers" },
    { id: "inventoryList", label: "Complete Inventory List", type: "textarea", required: false, section: "Item Details", sectionOrder: 2, forIntents: ["asset"], placeholder: "Itemized list of all assets included in the purchase" },

    // ── Transaction Terms ──
    { id: "purchasePrice", label: "Total Purchase Price", type: "text", required: true, section: "Transaction Terms", sectionOrder: 3, placeholder: "e.g., $50,000" },
    { id: "paymentMethod", label: "Payment Method", type: "select", required: true, section: "Transaction Terms", sectionOrder: 3, options: [{ value: "lump_sum", label: "Lump Sum at Closing" }, { value: "financing", label: "Financing / Loan" }, { value: "installments", label: "Installment Payments" }, { value: "escrow", label: "Through Escrow" }] },
    { id: "financingTerms", label: "Financing Terms", type: "textarea", required: true, section: "Transaction Terms", sectionOrder: 3, showWhen: { field: "paymentMethod", value: "financing" }, placeholder: "e.g., 20% down, 5% APR, 60-month term" },
    { id: "installmentSchedule", label: "Installment Payment Schedule", type: "textarea", required: true, section: "Transaction Terms", sectionOrder: 3, showWhen: { field: "paymentMethod", value: "installments" }, placeholder: "e.g., $10,000 upon signing, $10,000/month for 4 months" },
    { id: "closingDate", label: "Closing / Transfer Date", type: "date", required: true, section: "Transaction Terms", sectionOrder: 3 },
    { id: "state", label: "Governing State", type: "state", required: true, section: "Transaction Terms", sectionOrder: 3 },
    { id: "hasEarnestMoney", label: "Include Earnest Money Deposit?", type: "radio", required: true, section: "Transaction Terms", sectionOrder: 3, options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    { id: "earnestMoneyAmount", label: "Earnest Money Amount", type: "text", required: true, section: "Transaction Terms", sectionOrder: 3, showWhen: { field: "hasEarnestMoney", value: "yes" }, placeholder: "e.g., $5,000" },

    // ── Warranties ──
    { id: "hasWarranty", label: "Include Warranty?", type: "radio", required: true, section: "Warranties & Representations", sectionOrder: 4, options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    { id: "warrantyDetails", label: "Warranty Terms", type: "textarea", required: true, section: "Warranties & Representations", sectionOrder: 4, showWhen: { field: "hasWarranty", value: "yes" }, placeholder: "e.g., 90-day warranty against defects in materials and workmanship" },
    { id: "warrantyDuration", label: "Warranty Duration", type: "select", required: true, section: "Warranties & Representations", sectionOrder: 4, showWhen: { field: "hasWarranty", value: "yes" }, options: [{ value: "30_days", label: "30 Days" }, { value: "90_days", label: "90 Days" }, { value: "1_year", label: "1 Year" }, { value: "2_years", label: "2 Years" }] },
    { id: "asIsDisclosure", label: "As-Is Disclosure (no warranty)", type: "radio", required: true, section: "Warranties & Representations", sectionOrder: 4, forIntents: ["asset"], helpText: "Buyer accepts item in current condition without any warranty", options: [{ value: "yes", label: "Include As-Is Disclosure" }, { value: "no", label: "Not Applicable" }] },

    // ── Inspection & Due Diligence ──
    { id: "hasInspectionPeriod", label: "Include Inspection Period?", type: "radio", required: true, section: "Inspection & Due Diligence", sectionOrder: 5, options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    { id: "inspectionPeriod", label: "Inspection Period Length", type: "select", required: true, section: "Inspection & Due Diligence", sectionOrder: 5, showWhen: { field: "hasInspectionPeriod", value: "yes" }, options: [{ value: "5_days", label: "5 Business Days" }, { value: "10_days", label: "10 Business Days" }, { value: "15_days", label: "15 Business Days" }, { value: "30_days", label: "30 Days" }] },
    { id: "inspectionContingency", label: "Inspection Contingency Terms", type: "textarea", required: true, section: "Inspection & Due Diligence", sectionOrder: 5, showWhen: { field: "hasInspectionPeriod", value: "yes" }, placeholder: "e.g., Buyer may cancel if inspection reveals material defects" },
    { id: "titleSearch", label: "Title Search Required?", type: "radio", required: true, section: "Inspection & Due Diligence", sectionOrder: 5, forIntents: ["asset"], helpText: "Verify clear ownership/title of assets", options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    { id: "serviceAcceptanceCriteria", label: "Service Acceptance Criteria", type: "textarea", required: true, section: "Inspection & Due Diligence", sectionOrder: 5, forIntents: ["service"], placeholder: "e.g., Services accepted upon passing quality review within 5 business days" },
  ],

  // ══════════════════════════════════════════════════════════════════════════
  // 12. NON-COMPETE AGREEMENT
  // ══════════════════════════════════════════════════════════════════════════
  non_compete_agreement: [
    // ── Parties ──
    { id: "companyName", label: "Company / Employer Name", type: "text", required: true, section: "Parties", sectionOrder: 1 },
    { id: "companyAddress", label: "Company Address", type: "text", required: true, section: "Parties", sectionOrder: 1 },
    { id: "individualName", label: "Individual (Employee/Contractor) Full Legal Name", type: "text", required: true, section: "Parties", sectionOrder: 1 },
    { id: "individualAddress", label: "Individual Address", type: "text", required: true, section: "Parties", sectionOrder: 1 },
    { id: "contractorRole", label: "Contractor Role / Title", type: "text", required: true, section: "Parties", sectionOrder: 1, forIntents: ["contractor"], placeholder: "e.g., Senior Consultant, Software Developer" },
    { id: "employeeTitle", label: "Employee Job Title", type: "text", required: true, section: "Parties", sectionOrder: 1, forIntents: ["employee"] },
    { id: "employeeDepartment", label: "Employee Department", type: "text", required: false, section: "Parties", sectionOrder: 1, forIntents: ["employee"] },

    // ── Restrictions ──
    { id: "state", label: "Governing State", type: "state", required: true, section: "Restrictions", sectionOrder: 2 },
    { id: "effectiveDate", label: "Effective Date", type: "date", required: true, section: "Restrictions", sectionOrder: 2 },
    { id: "restrictedActivities", label: "Restricted Activities", type: "textarea", required: true, section: "Restrictions", sectionOrder: 2, placeholder: "e.g., Cannot work for, consult with, or have ownership in competing businesses in the same industry" },
    { id: "competitorDefinition", label: "How Are Competitors Defined?", type: "textarea", required: true, section: "Restrictions", sectionOrder: 2, placeholder: "e.g., Any business engaged in cloud computing services, or any company listed in Exhibit A" },
    { id: "duration", label: "Non-Compete Duration", type: "select", required: true, section: "Restrictions", sectionOrder: 2, options: [{ value: "6_months", label: "6 Months" }, { value: "1_year", label: "1 Year" }, { value: "18_months", label: "18 Months" }, { value: "2_years", label: "2 Years" }, { value: "3_years", label: "3 Years" }] },
    { id: "geographicScope", label: "Geographic Scope", type: "text", required: true, section: "Restrictions", sectionOrder: 2, placeholder: "e.g., Within 50 miles of company offices, statewide, nationwide" },

    // ── Consideration ──
    { id: "considerationType", label: "Consideration Provided", type: "select", required: true, section: "Consideration", sectionOrder: 3, forIntents: ["employee"], options: [{ value: "initial_employment", label: "Initial Employment (new hire)" }, { value: "continued_employment", label: "Continued Employment (existing employee)" }, { value: "additional_compensation", label: "Additional Compensation" }, { value: "promotion", label: "Promotion / New Role" }] },
    { id: "contractorConsideration", label: "Consideration for Non-Compete", type: "textarea", required: true, section: "Consideration", sectionOrder: 3, forIntents: ["contractor"], placeholder: "e.g., Access to proprietary systems, $5,000 signing bonus" },
    { id: "hasAdditionalCompensation", label: "Additional Compensation for Non-Compete?", type: "radio", required: true, section: "Consideration", sectionOrder: 3, options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    { id: "additionalCompensationAmount", label: "Additional Compensation Details", type: "textarea", required: true, section: "Consideration", sectionOrder: 3, showWhen: { field: "hasAdditionalCompensation", value: "yes" }, placeholder: "e.g., $10,000 signing bonus, or $500/month during restriction period" },

    // ── Exceptions ──
    { id: "permittedActivities", label: "Permitted Activities (Exceptions)", type: "textarea", required: false, section: "Exceptions", sectionOrder: 4, placeholder: "e.g., Passive investments under 5%, teaching, non-competing consulting" },
    { id: "carveOuts", label: "Specific Company/Industry Carve-Outs", type: "textarea", required: false, section: "Exceptions", sectionOrder: 4, placeholder: "e.g., Does not apply to non-profit organizations" },
    { id: "industryExclusions", label: "Industry Exclusions", type: "textarea", required: false, section: "Exceptions", sectionOrder: 4, placeholder: "e.g., Does not apply to unrelated industries like real estate or food service" },

    // ── Enforcement ──
    { id: "remedies", label: "Remedies for Breach", type: "select", required: true, section: "Enforcement", sectionOrder: 5, options: [{ value: "injunctive_and_damages", label: "Injunctive Relief + Monetary Damages" }, { value: "injunctive_only", label: "Injunctive Relief Only" }, { value: "damages_only", label: "Monetary Damages Only" }, { value: "liquidated_damages", label: "Liquidated Damages (pre-set amount)" }] },
    { id: "liquidatedDamagesAmount", label: "Liquidated Damages Amount", type: "text", required: true, section: "Enforcement", sectionOrder: 5, showWhen: { field: "remedies", value: "liquidated_damages" }, placeholder: "e.g., $50,000" },
    { id: "severability", label: "Include Severability Clause?", type: "radio", required: true, section: "Enforcement", sectionOrder: 5, helpText: "If a court finds part unenforceable, the rest remains valid", options: [{ value: "yes", label: "Yes (recommended)" }, { value: "no", label: "No" }] },
    { id: "blueLinePencil", label: "Include Blue Pencil / Judicial Modification?", type: "radio", required: true, section: "Enforcement", sectionOrder: 5, helpText: "Allows a court to modify overly broad restrictions rather than voiding them entirely", options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    { id: "attorneyFees", label: "Attorney's Fees Provision", type: "select", required: true, section: "Enforcement", sectionOrder: 5, options: [{ value: "prevailing_party", label: "Prevailing Party Recovers Fees" }, { value: "each_own", label: "Each Party Pays Own Fees" }, { value: "company_recovers", label: "Company Recovers if Breach Proven" }] },
  ],
}
