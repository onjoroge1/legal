/**
 * Returns the AI generation prompt addendum for a given document.
 * Accepts the new hyphenated slug (e.g. "non-disclosure-agreement") OR
 * the legacy underscore slug (e.g. "nda") for backwards compatibility
 * with existing generate API routes.
 */
export function getDocumentPrompt(slug: string, intentId?: string | null): string {
  const intentText = intentId ? `Intent: ${intentId}` : "Intent: standard"

  // Normalise: map legacy slugs and shorthand to canonical hyphenated form
  const normalised = normaliseSlug(slug)

  switch (normalised) {
    case "non-disclosure-agreement":
      return `
Ensure the NDA includes clear definitions, confidentiality obligations, exclusions, term, return of materials, remedies, and governing law.
Include a signature block for both parties. ${intentText}`.trim()

    case "llc-operating-agreement":
      return `
Include member information, capital contributions, management structure, voting/decision rules, distributions, transfer restrictions, and dissolution procedures.
Make sure the agreement reflects the selected management type. ${intentText}`.trim()

    case "employment-contract":
      return `
Include role, compensation, benefits, term (if applicable), confidentiality, IP assignment, termination, and dispute resolution.
If fixed-term, clarify end date and renewal. ${intentText}`.trim()

    case "residential-lease-agreement":
      return `
Include property address, lease term, rent schedule, security deposit, maintenance responsibilities, entry notice, and default/termination terms.
If furnished or multi-tenant, reflect those details. ${intentText}`.trim()

    case "commercial-lease-agreement":
      return `
Include permitted use, rent, term, CAM/operating expenses, insurance requirements, improvements, and default remedies.
Reflect whether gross or net lease. ${intentText}`.trim()

    case "independent-contractor-agreement":
      return `
Include scope of services, payment terms, contractor status, IP ownership, confidentiality, and termination.
If hourly, include rate and invoicing cadence. ${intentText}`.trim()

    case "partnership-agreement":
      return `
Include partnership purpose, capital contributions, profit/loss allocation, management rights, dispute resolution, and dissolution.
Reflect equal vs unequal splits. ${intentText}`.trim()

    case "power-of-attorney":
      return `
Include principal/agent details, scope of powers, effective date, durability, and revocation clause.
If limited or healthcare, narrow the scope appropriately. ${intentText}`.trim()

    case "last-will-and-testament":
      return `
Include executor appointment, beneficiary distributions, debt/tax handling, guardianship if applicable, and revocation clause. ${intentText}`.trim()

    case "service-agreement":
      return `
Include scope of services, fees, term, IP ownership, confidentiality, liability limits, and termination.
Reflect fixed fee or retainer model. ${intentText}`.trim()

    case "purchase-agreement":
      return `
Include item description, purchase price, payment terms, closing, representations, and remedies. ${intentText}`.trim()

    case "non-compete-agreement":
      return `
Include restricted activities, geographic scope, duration, consideration, enforceability, and severability.
Note state-specific enforceability limitations. ${intentText}`.trim()

    // ── Legal Letters ──────────────────────────────────────────────────────
    case "demand-letter":
      return `
Include sender identity, recipient identity, specific obligation or debt owed (with amounts and due dates), factual background, demand for action or payment, deadline (typically 10–30 days), and consequences of non-compliance.
Use firm but professional language. Reference any prior communications. ${intentText}`.trim()

    case "cease-and-desist-letter":
      return `
Identify the infringing or harmful behavior specifically (copyright, trademark, defamation, harassment, or contract violation). State the legal basis for the demand, the specific action required to cease, a cure deadline, and consequences of continued conduct including legal action and damages.
Keep the tone firm and authoritative without being inflammatory. ${intentText}`.trim()

    case "notice-of-breach":
      return `
Identify the specific contract or agreement, the clause(s) breached, the specific obligation that was not performed, the date the breach occurred, a cure period (typically 10–30 days per the contract), and the consequences if the breach is not cured (termination, damages, legal action).
Reference the specific contract date and parties. ${intentText}`.trim()

    case "complaint-letter":
      return `
Include the complainant's details, the respondent (company, agency, or individual), a factual timeline of events, the specific issue or harm caused, the remedy requested (refund, correction, apology), a response deadline, and escalation path if unresolved.
Keep the tone factual, professional, and outcome-focused. ${intentText}`.trim()

    case "final-notice-before-legal-action":
      return `
Include the full amount owed or action required, a clear final deadline (5–14 days), reference to all prior communications and attempts to resolve, the specific legal action that will be filed if compliance is not received (small claims, civil suit, collections), and a statement that no further notice will be given.
The tone should be serious and unambiguous. ${intentText}`.trim()

    case "debt-settlement-letter":
      return `
Include the original debt amount, account or reference number, the proposed reduced settlement amount, the deadline for acceptance, payment instructions, and a statement that payment of the settled amount constitutes full and final satisfaction of the debt.
If the letter is from the debtor, include financial hardship context. If from a creditor, confirm acceptance terms. ${intentText}`.trim()

    case "landlord-notice-to-vacate":
      return `
Include the property address, tenant name(s), the reason for the notice (non-payment, lease violation, end of term, no-cause), the required notice period per state law, the vacate-by date, and instructions for returning keys and the security deposit process.
Include state-required statutory language and any grace period provisions. ${intentText}`.trim()

    // ── Financial ──────────────────────────────────────────────────────────
    case "promissory-note":
      return `
Include lender and borrower names, principal amount, interest rate (annual), payment schedule (lump sum, monthly installments, or on-demand), due date, late fee provisions, default definition, and governing law.
If secured, reference the collateral. If unsecured, state that explicitly. ${intentText}`.trim()

    case "loan-agreement":
      return `
Include lender and borrower details, loan amount, disbursement method and date, interest rate (fixed or variable), amortization schedule, prepayment rights, collateral (if any), representations and warranties, events of default, and remedies.
This is more comprehensive than a promissory note — include all covenants. ${intentText}`.trim()

    case "payment-plan-agreement":
      return `
Include creditor and debtor identities, total amount owed, installment amounts, payment due dates, payment method, interest or fees (if any), default consequences (acceleration clause), and an acknowledgment that timely payments release the debtor from obligation.
Include a final balloon payment if applicable. ${intentText}`.trim()

    case "bill-of-sale":
      return `
Include seller and buyer details, complete description of the property (make, model, serial number if applicable), sale price, payment method, date of sale, condition (as-is or warranted), transfer of title statement, and signatures.
If a vehicle, include VIN and odometer reading. If equipment, include any warranty terms. ${intentText}`.trim()

    case "debt-settlement-agreement":
      return `
Include creditor and debtor identities, original debt amount, settled amount, payment date or schedule, a full and final release clause (no further claims after payment), tax implications notice (IRS Form 1099-C if applicable), and confidentiality provisions.
The release clause is critical — ensure it is broad enough to preclude future claims. ${intentText}`.trim()

    // ── Personal ──────────────────────────────────────────────────────────
    case "affidavit":
      return `
Include declarant's full name and address, the caption (jurisdiction and case/matter if applicable), numbered paragraphs of factual statements (first-person, past tense), an oath/affirmation clause, signature block, and a notary/witness block.
Statements must be factual and within the declarant's personal knowledge. Avoid legal conclusions. ${intentText}`.trim()

    case "general-release-of-liability":
      return `
Include the releasor (person giving up claims) and releasee (person being released), specific events or transactions covered, scope of claims released (known and unknown), any consideration paid, and confirmation that the release is voluntary.
If California-based, include a Section 1542 waiver. Include a severability clause. ${intentText}`.trim()

    case "vehicle-bill-of-sale":
      return `
Include seller and buyer details, vehicle information (year, make, model, VIN, color, license plate), odometer reading and disclosure (federal MVIC compliance), sale price, payment method, as-is clause (or warranty terms), date of sale, and signatures.
Specify the state where the vehicle will be registered and include any state-specific DMV fields. ${intentText}`.trim()

    case "personal-property-agreement":
      return `
Include both parties' names, detailed description of the property (item, brand, model, condition, approximate value), the nature of the arrangement (custody, shared use, loan, or transfer), duration, responsibilities for maintenance or damage, and terms for return or resolution.
Include a dispute resolution clause and what happens if one party fails to comply. ${intentText}`.trim()

    // ── Tier 1 Standalone Intent Documents ────────────────────────────────────
    case "mutual-non-disclosure-agreement":
      return `
This is a MUTUAL (bilateral) NDA — both parties have confidentiality obligations. Include mutual definitions of confidential information, mutual obligations of confidentiality and limited use, exclusions (public domain, independent development, legal compulsion), term and duration, return or destruction of materials, remedies including injunctive relief, and governing law.
Make clear in the recitals that BOTH parties are disclosing and receiving confidential information. Include a signature block for both authorized representatives. ${intentText}`.trim()

    case "unilateral-non-disclosure-agreement":
      return `
This is a UNILATERAL (one-way) NDA — only the receiving party has confidentiality obligations. Identify the disclosing party and the receiving party clearly. Include definition of confidential information, one-directional confidentiality obligation on the receiving party only, permitted use limited to the stated purpose, exclusions, term and duration, return or destruction of materials, and remedies.
The disclosing party retains freedom to use its own information as it chooses. Include signature block for both parties. ${intentText}`.trim()

    case "single-member-llc-operating-agreement":
      return `
This is for a SINGLE-MEMBER LLC with one owner (100% interest). Include the sole member's name and address, LLC name, state of formation, registered agent, effective date of the agreement, initial capital contribution, tax treatment election (default disregarded entity or S-Corp/C-Corp election), management authority (sole member manages), distribution provisions, indemnification of the member, dissolution procedures, and a statement that the member's personal assets are separate from LLC assets.
Ensure the document clearly states it is a single-member operating agreement. ${intentText}`.trim()

    case "multi-member-llc-operating-agreement":
      return `
This is for a MULTI-MEMBER LLC with two or more owners. Include a membership table listing all members, ownership percentages, and initial capital contributions, whether the LLC is member-managed or manager-managed, voting thresholds for ordinary decisions (majority) and major decisions (supermajority), profit/loss allocation (default pro-rata unless specified otherwise), distribution provisions, restrictions on transfer of membership interests and right of first refusal, admission of new members, member withdrawal and buyout procedures, dissolution and winding-up provisions, and tax treatment.
Include a deadlock resolution mechanism if members hold equal interests. ${intentText}`.trim()

    case "durable-power-of-attorney":
      return `
Include the principal's and agent's full legal names and addresses. Include the statutory durability clause for the applicable state (the power survives incapacity). List all financial powers being granted: banking, investment management, real estate, business operations, tax filing, and any 'hot powers' (gifting, amending trusts, changing beneficiary designations) only if expressly authorized.
Include a successor agent designation, specify whether effective immediately or 'springing' upon incapacity, and include the notarization and witness block required by the state. Make clear this is a financial DPOA — not a healthcare power. ${intentText}`.trim()

    case "medical-power-of-attorney":
      return `
Include the principal's and healthcare agent's full legal names and contact information. Include the scope of healthcare decision-making authority, a HIPAA authorization clause granting the agent access to protected health information, specific instructions on life-sustaining treatment, resuscitation preferences, artificial nutrition/hydration, and organ donation preferences.
Name a successor healthcare agent. Include any limitations on the agent's authority. Add the state-required statutory language and the correct witness or notarization block. Clearly distinguish this from a financial power of attorney. ${intentText}`.trim()

    case "month-to-month-lease-agreement":
      return `
Include landlord and tenant names and contact information, full rental property address and unit, monthly rent amount, due date, and grace period, accepted payment methods, security deposit amount and state-required return timeline, notice period required to terminate (confirm state law — most states require 30 days minimum), rent increase notice requirement, tenant and landlord maintenance responsibilities, pet and smoking policy, entry notice requirements, and any state-required disclosures.
Emphasize the month-to-month (periodic tenancy) nature of the agreement and the notice requirements for termination by either party. ${intentText}`.trim()

    case "at-will-employment-contract":
      return `
Include a clear, prominent at-will employment statement that either party may terminate the relationship at any time for any lawful reason. Include job title, duties, and reporting structure, start date, work location (in-person, remote, or hybrid), compensation (salary or hourly rate), pay frequency, bonus eligibility, benefits summary, PTO and leave policy, confidentiality obligations, IP assignment clause, any non-compete or non-solicitation provisions (note state law limitations), termination procedures, and an integration clause.
Do NOT include language guaranteeing continued employment or implying a fixed term. ${intentText}`.trim()

    case "triple-net-lease-agreement":
      return `
This is a TRIPLE NET (NNN) commercial lease. Include landlord and tenant identification, full property address and description, permitted use clause, lease term and commencement date, base rent and annual escalation schedule (CPI or fixed percentage), tenant's NNN obligations (property taxes, building insurance, and maintenance including HVAC, plumbing, electrical), monthly estimated NNN payment, annual CAM reconciliation process, landlord's responsibilities (if any — typically roof, structure, and foundation in modified NNN leases), tenant improvement allowance, assignment and subletting rights, renewal options and process, default and remedies, and required insurance types and minimums.
Be explicit about which expenses are included in and excluded from the tenant's NNN obligations. ${intentText}`.trim()

    // ── Business (new) ─────────────────────────────────────────────────────
    case "employee-non-disclosure-agreement":
      return `
This is an EMPLOYEE NDA signed at onboarding. Include the employee's name, title, and start date. Define confidential information broadly to cover trade secrets, client lists, pricing, software, and business strategy. State that the obligation survives termination of employment and specify the duration (typically indefinite for trade secrets or 2–5 years for other confidential information). Include a non-disparagement clause, IP assignment clause, and remedies including injunctive relief.
Do NOT include non-compete restrictions — keep this focused on confidentiality. ${intentText}`.trim()

    case "asset-purchase-agreement":
      return `
Include a complete description of all assets being purchased (equipment, inventory, IP, customer lists, goodwill), the purchase price and allocation among asset classes (required for IRS Form 8594), representations and warranties by the seller regarding title and condition, any assumed liabilities (list them explicitly), a closing date and conditions to closing, bill of sale provisions, transition assistance, and an indemnification clause.
Specify which liabilities are NOT assumed by the buyer. ${intentText}`.trim()

    case "master-service-agreement":
      return `
Include the parties' identification and relationship, scope of services framework (with reference to individual Statements of Work or Work Orders), fees and payment terms, IP ownership and license grants, confidentiality, limitation of liability, indemnification, insurance requirements, term and termination, and governing law.
The MSA should be evergreen — individual SOWs will set project-specific terms. Ensure the integration clause subordinates individual SOWs to the MSA unless expressly amended. ${intentText}`.trim()

    case "general-partnership-agreement":
      return `
Include the partnership name, principal place of business, and purpose. List all general partners with equal management rights and authority to bind the partnership. Cover capital contributions, profit and loss sharing (default equal unless specified), drawing accounts, banking authority, admission of new partners, partner withdrawal or death procedures, non-compete obligations during the partnership, and dissolution provisions.
Include a statement of joint and several liability of general partners. ${intentText}`.trim()

    // ── Employment (new) ──────────────────────────────────────────────────
    case "fixed-term-employment-contract":
      return `
Include a clear statement that this is a FIXED-TERM employment contract with a defined start date and end date. Cover job title and duties, reporting structure, compensation, benefits, PTO, work location, and termination provisions (what constitutes cause for early termination by either party). Include what happens at term expiration — automatic end vs. renewal option.
Do NOT include at-will language. Make clear the employee's rights if terminated before the end of the fixed term. ${intentText}`.trim()

    case "1099-contractor-agreement":
      return `
Include a clear contractor (not employee) status clause, with language affirming the contractor controls how services are performed. Cover scope of services, payment (hourly or project-based), invoicing cadence, expenses, IP work-for-hire assignment, confidentiality, non-solicitation of clients and employees (note state law limits), termination rights, and insurance requirements.
Include IRS independent contractor language and note that no taxes will be withheld. ${intentText}`.trim()

    // ── Real Estate (new) ─────────────────────────────────────────────────
    case "room-rental-agreement":
      return `
Include the address and specific room rented, landlord or primary tenant name, tenant name, monthly rent and due date, security deposit, shared space rules (kitchen, bathrooms, common areas), utility allocation, noise and guest policies, entry notice requirements, and termination notice period per state law.
Specify which areas are exclusively for tenant use vs. shared, and any house rules the tenant must follow. ${intentText}`.trim()

    case "sublease-agreement":
      return `
Include original tenant (sublessor) and new subtenant (sublessee) details, the property address and subleased portion, sublease term and rent, landlord's written consent or acknowledgment, the sublessee's obligations to comply with the original lease, security deposit terms, and the sublessor's residual liability under the original lease.
Include a statement that the sublessor remains primarily liable to the original landlord. ${intentText}`.trim()

    // ── Estate Planning (new) ─────────────────────────────────────────────
    case "living-will":
      return `
Include the declarant's full name and address, a statement of capacity and intent, specific healthcare directives covering: CPR and resuscitation, mechanical ventilation, artificial nutrition and hydration, dialysis, comfort care preferences, and organ and tissue donation.
Include the state-required statutory language, witness requirements (typically two witnesses who are not beneficiaries or healthcare providers), and a notarization block. Include a HIPAA authorization clause for healthcare providers. ${intentText}`.trim()

    case "simple-will":
      return `
This is a SIMPLE WILL for an uncomplicated estate. Include the testator's full name, state of domicile, and statement of capacity. Appoint an executor (and alternate). Name specific beneficiaries for specific assets and a residuary beneficiary for all other property. If minor children are involved, appoint a guardian. Include payment of debts and taxes instruction, a revocation clause revoking all prior wills, and the state-required attestation clause with witness signatures.
Keep it clear and direct — no trusts, no complex distributions. ${intentText}`.trim()

    // ── Legal Letters (new) ───────────────────────────────────────────────
    case "demand-letter-for-unpaid-invoice":
      return `
Include the sender's full name and business, the recipient's name and address, the invoice number(s) and date(s), the amount(s) owed, the original due date, a clear demand for payment of the full amount, a final payment deadline (typically 10–14 days), accepted payment methods, and a statement that failure to pay will result in legal action including filing in court and potential recovery of attorney's fees.
Reference any prior payment reminders or communications. Keep the tone firm but professional. ${intentText}`.trim()

    case "small-claims-demand-letter":
      return `
Include the claimant's name and contact details, the respondent's name and address, a concise factual description of the dispute, the specific dollar amount claimed, the legal or contractual basis for the claim, a final resolution deadline (typically 10–14 days), and explicit notice that if the demand is not met, the claimant will file in [State] Small Claims Court without further notice.
Many states require this letter as evidence of pre-litigation effort. Keep it factual and specific. ${intentText}`.trim()

    // ── Financial (new) ───────────────────────────────────────────────────
    case "secured-promissory-note":
      return `
Include lender and borrower names, principal amount, interest rate (annual, fixed or variable), repayment schedule, maturity date, a detailed description of the collateral securing the note (property address, vehicle VIN, equipment description), the security interest grant clause, default provisions, the lender's right to seize collateral upon default (referencing UCC Article 9 for personal property or state foreclosure law for real property), and governing law.
Explicitly state that this note is SECURED and identify the collateral. ${intentText}`.trim()

    case "personal-loan-agreement":
      return `
Include lender and borrower names and relationship context (friends, family), loan amount, whether interest will be charged (rate if applicable, or explicit 0% for interest-free), repayment schedule (lump sum or installments), late payment provisions, what happens upon borrower default, and whether the loan is forgiven upon the lender's death or must be repaid to the estate.
Keep the tone of a friendly but legally binding agreement. Include a consideration clause. ${intentText}`.trim()

    // ── Personal (new) ────────────────────────────────────────────────────
    case "general-affidavit":
      return `
Include the affiant's full legal name, address, and state of residence. Include the caption (county and state for notarization). Use numbered paragraphs for each factual statement written in first person, present or past tense. Each statement must be within the affiant's personal knowledge. Include the oath/affirmation language ("I declare under penalty of perjury"), a signature block, and a notary public acknowledgment block with space for notary seal.
Avoid legal conclusions — stick to facts the affiant personally knows. ${intentText}`.trim()

    default:
      return `Ensure the document includes all standard sections for this document type. ${intentText}`.trim()
  }
}

/** Map legacy / shorthand slugs to new hyphenated canonical slug */
function normaliseSlug(slug: string): string {
  const legacyMap: Record<string, string> = {
    // ── Original 12 documents ─────────────────────────────────────────────
    nda: "non-disclosure-agreement",
    llc_operating_agreement: "llc-operating-agreement",
    employment_contract: "employment-contract",
    residential_lease_agreement: "residential-lease-agreement",
    independent_contractor_agreement: "independent-contractor-agreement",
    partnership_agreement: "partnership-agreement",
    power_of_attorney: "power-of-attorney",
    last_will_testament: "last-will-and-testament",
    commercial_lease_agreement: "commercial-lease-agreement",
    service_agreement: "service-agreement",
    purchase_agreement: "purchase-agreement",
    non_compete_agreement: "non-compete-agreement",
    // ── Legal Letters ─────────────────────────────────────────────────────
    demand_letter: "demand-letter",
    cease_and_desist_letter: "cease-and-desist-letter",
    notice_of_breach: "notice-of-breach",
    complaint_letter: "complaint-letter",
    final_notice_before_legal_action: "final-notice-before-legal-action",
    debt_settlement_letter: "debt-settlement-letter",
    landlord_notice_to_vacate: "landlord-notice-to-vacate",
    // ── Financial ─────────────────────────────────────────────────────────
    promissory_note: "promissory-note",
    loan_agreement: "loan-agreement",
    payment_plan_agreement: "payment-plan-agreement",
    bill_of_sale: "bill-of-sale",
    debt_settlement_agreement: "debt-settlement-agreement",
    // ── Personal ─────────────────────────────────────────────────────────
    // (affidavit slug is the same as legacySlug — no mapping needed)
    general_release_of_liability: "general-release-of-liability",
    vehicle_bill_of_sale: "vehicle-bill-of-sale",
    personal_property_agreement: "personal-property-agreement",
    // ── Tier 1 Standalone Intent Documents ───────────────────────────────
    mutual_nda: "mutual-non-disclosure-agreement",
    unilateral_nda: "unilateral-non-disclosure-agreement",
    single_member_llc: "single-member-llc-operating-agreement",
    multi_member_llc: "multi-member-llc-operating-agreement",
    durable_power_of_attorney: "durable-power-of-attorney",
    medical_power_of_attorney: "medical-power-of-attorney",
    month_to_month_lease: "month-to-month-lease-agreement",
    at_will_employment_contract: "at-will-employment-contract",
    triple_net_lease: "triple-net-lease-agreement",
    // ── New catalog documents ─────────────────────────────────────────────
    employee_nda: "employee-non-disclosure-agreement",
    asset_purchase_agreement: "asset-purchase-agreement",
    master_service_agreement: "master-service-agreement",
    general_partnership_agreement: "general-partnership-agreement",
    fixed_term_employment_contract: "fixed-term-employment-contract",
    "1099_contractor_agreement": "1099-contractor-agreement",
    room_rental_agreement: "room-rental-agreement",
    sublease_agreement: "sublease-agreement",
    living_will: "living-will",
    simple_will: "simple-will",
    demand_letter_unpaid_invoice: "demand-letter-for-unpaid-invoice",
    small_claims_demand_letter: "small-claims-demand-letter",
    secured_promissory_note: "secured-promissory-note",
    personal_loan_agreement: "personal-loan-agreement",
    general_affidavit: "general-affidavit",
  }
  return legacyMap[slug] ?? slug
}
