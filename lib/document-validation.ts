export type ValidationErrors = Record<string, string>

function parseNumber(value: unknown): number | null {
  if (value === null || value === undefined) return null
  const raw = String(value).replace(/[^0-9.]/g, "")
  if (!raw) return null
  const parsed = Number(raw)
  return Number.isFinite(parsed) ? parsed : null
}

function parseDate(value: unknown): Date | null {
  if (value === null || value === undefined) return null
  const parsed = new Date(String(value))
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

export function getDocumentValidation(
  slug: string,
  formData: Record<string, any>,
  intentId?: string | null
): ValidationErrors {
  const errors: ValidationErrors = {}

  if (!slug) return errors

  switch (slug) {
    case "residential_lease_agreement": {
      const rent = parseNumber(formData.rentAmount)
      if (formData.rentAmount && rent === null) {
        errors.rentAmount = "Enter a valid numeric rent amount"
      }
      const deposit = parseNumber(formData.securityDeposit)
      if (formData.securityDeposit && deposit === null) {
        errors.securityDeposit = "Enter a valid numeric deposit amount"
      }

      const start = parseDate(formData.leaseStartDate)
      const end = parseDate(formData.leaseEndDate)
      if (formData.leaseStartDate && !start) {
        errors.leaseStartDate = "Enter a valid start date"
      }
      if (formData.leaseEndDate && !end) {
        errors.leaseEndDate = "Enter a valid end date"
      }
      if (start && end && end <= start) {
        errors.leaseEndDate = "End date must be after the start date"
      }

      if (intentId === "multi_tenant" && !formData.numberOfTenants) {
        errors.numberOfTenants = "Number of tenants is required for multi-tenant leases"
      }
      break
    }
    case "commercial_lease_agreement": {
      const rent = parseNumber(formData.rentAmount)
      if (formData.rentAmount && rent === null) {
        errors.rentAmount = "Enter a valid numeric rent amount"
      }
      if (intentId === "net" && !formData.expenseResponsibilities) {
        errors.expenseResponsibilities = "Expense responsibilities are required for net leases"
      }
      break
    }
    case "employment_contract": {
      const employmentType = String(formData.employmentType || "").toLowerCase()
      if (employmentType === "fixed-term" && !formData.termLength) {
        errors.termLength = "Term length is required for fixed-term employment"
      }
      if (intentId === "fixed_term" && !formData.termLength) {
        errors.termLength = "Term length is required for fixed-term employment"
      }
      break
    }
    case "purchase_agreement": {
      const price = parseNumber(formData.purchasePrice)
      if (formData.purchasePrice && price === null) {
        errors.purchasePrice = "Enter a valid purchase price"
      }
      const closing = parseDate(formData.closingDate)
      if (formData.closingDate && !closing) {
        errors.closingDate = "Enter a valid closing date"
      }
      if (intentId === "asset" && !formData.itemDescription) {
        errors.itemDescription = "Item description is required for asset purchases"
      }
      break
    }
    case "independent_contractor_agreement": {
      if (intentId === "hourly" && !formData.hourlyRate) {
        errors.hourlyRate = "Hourly rate is required for hourly contracts"
      }
      break
    }
    case "partnership_agreement": {
      if (intentId === "unequal_split" && !formData.ownershipPercentages) {
        errors.ownershipPercentages = "Ownership percentages are required for unequal splits"
      }
      break
    }
    case "power_of_attorney": {
      if (intentId === "limited" && !formData.limitations) {
        errors.limitations = "Limitations are required for a limited power of attorney"
      }
      break
    }
    case "last_will_testament": {
      if (intentId === "guardian" && !formData.guardianName) {
        errors.guardianName = "Guardian name is required when adding guardianship"
      }
      break
    }
    case "service_agreement": {
      if (intentId === "retainer" && !formData.retainerAmount) {
        errors.retainerAmount = "Retainer amount is required for retainer agreements"
      }
      break
    }
    case "non_compete_agreement": {
      if (intentId === "contractor" && !formData.contractorRole) {
        errors.contractorRole = "Contractor role is required for contractor non-competes"
      }
      break
    }
    case "llc_operating_agreement": {
      if (intentId === "manager_managed" && !formData.managerName) {
        errors.managerName = "Manager name is required for manager-managed LLCs"
      }
      break
    }
    case "nda": {
      const state = String(formData.state || "")
      if (state === "California" && String(formData.nonCompete || "").toLowerCase() === "yes") {
        errors.nonCompete = "Non-compete clauses are generally not enforceable in California"
      }
      break
    }
    default:
      break
  }

  return errors
}
