export function getDocumentPrompt(slug: string, intentId?: string | null): string {
  const intentText = intentId ? `Intent: ${intentId}` : "Intent: standard"

  switch (slug) {
    case "nda":
      return `
Ensure the NDA includes clear definitions, confidentiality obligations, exclusions, term, return of materials, remedies, and governing law.
Include a signature block for both parties. ${intentText}`.trim()
    case "llc_operating_agreement":
      return `
Include member information, capital contributions, management structure, voting/decision rules, distributions, transfer restrictions, and dissolution procedures.
Make sure the agreement reflects the selected management type. ${intentText}`.trim()
    case "employment_contract":
      return `
Include role, compensation, benefits, term (if applicable), confidentiality, IP assignment, termination, and dispute resolution.
If fixed-term, clarify end date and renewal. ${intentText}`.trim()
    case "residential_lease_agreement":
      return `
Include property address, lease term, rent schedule, security deposit, maintenance responsibilities, entry notice, and default/termination terms.
If furnished or multi-tenant, reflect those details. ${intentText}`.trim()
    case "commercial_lease_agreement":
      return `
Include permitted use, rent, term, CAM/operating expenses, insurance requirements, improvements, and default remedies.
Reflect whether gross or net lease. ${intentText}`.trim()
    case "independent_contractor_agreement":
      return `
Include scope of services, payment terms, contractor status, IP ownership, confidentiality, and termination.
If hourly, include rate and invoicing cadence. ${intentText}`.trim()
    case "partnership_agreement":
      return `
Include partnership purpose, capital contributions, profit/loss allocation, management rights, dispute resolution, and dissolution.
Reflect equal vs unequal splits. ${intentText}`.trim()
    case "power_of_attorney":
      return `
Include principal/agent details, scope of powers, effective date, durability, and revocation clause.
If limited or healthcare, narrow the scope appropriately. ${intentText}`.trim()
    case "last_will_testament":
      return `
Include executor appointment, beneficiary distributions, debt/tax handling, guardianship if applicable, and revocation clause. ${intentText}`.trim()
    case "service_agreement":
      return `
Include scope of services, fees, term, IP ownership, confidentiality, liability limits, and termination.
Reflect fixed fee or retainer model. ${intentText}`.trim()
    case "purchase_agreement":
      return `
Include item description, purchase price, payment terms, closing, representations, and remedies. ${intentText}`.trim()
    case "non_compete_agreement":
      return `
Include restricted activities, geographic scope, duration, consideration, enforceability, and severability.
Note state-specific enforceability limitations. ${intentText}`.trim()
    default:
      return `Ensure the document includes all standard sections for this document type. ${intentText}`.trim()
  }
}
