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

    default:
      return `Ensure the document includes all standard sections for this document type. ${intentText}`.trim()
  }
}

/** Map legacy / shorthand slugs to new hyphenated canonical slug */
function normaliseSlug(slug: string): string {
  const legacyMap: Record<string, string> = {
    // Legacy underscore slugs
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
  }
  return legacyMap[slug] ?? slug
}
