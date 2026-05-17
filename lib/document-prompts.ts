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
  }
  return legacyMap[slug] ?? slug
}
