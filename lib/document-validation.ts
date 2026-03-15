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
  intentId?: string | null,
  visibleQuestionIds?: string[]
): ValidationErrors {
  const errors: ValidationErrors = {}

  if (!slug) return errors

  // Helper: skip validation for hidden fields
  const isVisible = (fieldId: string) =>
    !visibleQuestionIds || visibleQuestionIds.includes(fieldId)

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

      if (intentId === "multi_tenant" && isVisible("numberOfTenants") && !formData.numberOfTenants) {
        errors.numberOfTenants = "Number of tenants is required for multi-tenant leases"
      }
      break
    }
    case "commercial_lease_agreement": {
      const rent = parseNumber(formData.monthlyBaseRent)
      if (formData.monthlyBaseRent && rent === null) {
        errors.monthlyBaseRent = "Enter a valid numeric rent amount"
      }
      if (intentId === "net" && isVisible("expenseResponsibilities") && !formData.expenseResponsibilities) {
        errors.expenseResponsibilities = "Expense responsibilities are required for net leases"
      }
      break
    }
    case "employment_contract": {
      if (intentId === "fixed_term" && isVisible("termLength") && !formData.termLength) {
        errors.termLength = "Term length is required for fixed-term employment"
      }
      if (intentId === "contract_to_hire" && isVisible("conversionCriteria") && !formData.conversionCriteria) {
        errors.conversionCriteria = "Conversion criteria is required for contract-to-hire"
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
      if (intentId === "asset" && isVisible("itemDescription") && !formData.itemDescription) {
        errors.itemDescription = "Item description is required for asset purchases"
      }
      break
    }
    case "independent_contractor_agreement": {
      if (intentId === "hourly" && isVisible("hourlyRate") && !formData.hourlyRate) {
        errors.hourlyRate = "Hourly rate is required for hourly contracts"
      }
      break
    }
    case "partnership_agreement": {
      if (intentId === "unequal_split" && isVisible("ownershipPercentages") && !formData.ownershipPercentages) {
        errors.ownershipPercentages = "Ownership percentages are required for unequal splits"
      }
      // Cross-field: buyout formula required when method is "formula"
      if (isVisible("buyoutFormula") && formData.buyoutMethod === "formula" && !formData.buyoutFormula) {
        errors.buyoutFormula = "Buyout formula description is required"
      }
      break
    }
    case "power_of_attorney": {
      if (intentId === "limited" && isVisible("limitations") && !formData.limitations) {
        errors.limitations = "Specific powers are required for a limited power of attorney"
      }
      if (intentId === "healthcare" && isVisible("healthcareScope") && !formData.healthcareScope) {
        errors.healthcareScope = "Healthcare decision scope is required"
      }
      break
    }
    case "last_will_testament": {
      if (intentId === "guardian" && isVisible("guardianName") && formData.hasMinorChildren === "yes" && !formData.guardianName) {
        errors.guardianName = "Guardian name is required when adding guardianship"
      }
      break
    }
    case "service_agreement": {
      if (intentId === "retainer" && isVisible("retainerAmount") && !formData.retainerAmount) {
        errors.retainerAmount = "Retainer amount is required for retainer agreements"
      }
      break
    }
    case "non_compete_agreement": {
      if (intentId === "contractor" && isVisible("contractorRole") && !formData.contractorRole) {
        errors.contractorRole = "Contractor role is required for contractor non-competes"
      }
      break
    }
    case "llc_operating_agreement": {
      if (intentId === "manager_managed" && isVisible("managerName") && !formData.managerName) {
        errors.managerName = "Manager name is required for manager-managed LLCs"
      }
      break
    }
    case "nda": {
      const state = String(formData.state || "")
      if (state === "California" && formData.hasNonCompete === "yes") {
        errors.hasNonCompete = "Non-compete clauses are generally not enforceable in California"
      }
      break
    }
    default:
      break
  }

  return errors
}
