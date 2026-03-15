export function getDocumentPrompt(
  slug: string,
  intentId?: string | null,
  formData?: Record<string, any>
): string {
  const intentText = intentId ? `Intent: ${intentId}` : "Intent: standard"
  const data = formData || {}

  switch (slug) {
    case "nda": {
      const parts = [
        "Generate a complete Non-Disclosure Agreement.",
        "Include clear definitions of confidential information, obligations, exclusions, term, return of materials, remedies, and governing law.",
        "Include a signature block for both parties.",
      ]
      if (intentId === "mutual") {
        parts.push("This is a Mutual NDA where both parties share and receive confidential information. Include reciprocal obligations.")
      } else if (intentId === "unilateral") {
        parts.push("This is a Unilateral NDA where only the disclosing party shares confidential information.")
      }
      if (data.hasNonCompete === "yes") {
        parts.push(`Include a non-compete clause with duration of ${data.nonCompeteDuration || "1 year"} and geographic scope: ${data.nonCompeteScope || "as specified"}.`)
      }
      if (data.hasNonSolicitation === "yes") {
        parts.push(`Include a non-solicitation clause for ${data.nonSolicitationDuration || "1 year"}.`)
      }
      if (data.injunctiveRelief === "yes") {
        parts.push("Include an injunctive relief provision allowing immediate court orders for breaches.")
      }
      parts.push(intentText)
      return parts.join("\n")
    }

    case "llc_operating_agreement": {
      const parts = [
        "Generate a complete LLC Operating Agreement.",
        "Include member information, capital contributions, management structure, voting/decision rules, distributions, transfer restrictions, and dissolution procedures.",
      ]
      if (intentId === "single_member") {
        parts.push("This is a Single-Member LLC. Structure the agreement for one owner with full authority.")
      } else if (intentId === "multi_member") {
        parts.push("This is a Multi-Member LLC. Include provisions for multiple members with voting rights and profit sharing.")
      } else if (intentId === "manager_managed") {
        parts.push(`This is a Manager-Managed LLC. Include designated manager authority for ${data.managerName || "the appointed manager"}.`)
      }
      if (data.taxElection) {
        parts.push(`Tax classification: ${data.taxElection.replace(/_/g, " ")}.`)
      }
      if (data.additionalCapitalRequired === "yes") {
        parts.push("Include provisions for additional capital calls.")
      }
      parts.push(intentText)
      return parts.join("\n")
    }

    case "employment_contract": {
      const parts = [
        "Generate a complete Employment Contract.",
        "Include role, compensation, benefits, confidentiality, IP assignment, termination, and dispute resolution.",
      ]
      if (intentId === "at_will") {
        parts.push("This is an at-will employment agreement. Either party may terminate at any time.")
      } else if (intentId === "fixed_term") {
        parts.push(`This is a fixed-term contract for ${data.termLength || "the specified duration"}. Clarify end date and renewal terms.`)
      } else if (intentId === "executive") {
        parts.push("This is an executive employment agreement. Include enhanced compensation, signing bonus, equity, and golden parachute provisions.")
      } else if (intentId === "contract_to_hire") {
        parts.push("This is a contract-to-hire arrangement. Include criteria and timeline for conversion to permanent employment.")
      }
      if (data.hasBonus === "yes") {
        parts.push("Include bonus structure provisions.")
      }
      if (data.hasEquity === "yes") {
        parts.push("Include stock option/equity provisions with vesting schedule.")
      }
      if (data.hasNonCompete === "yes") {
        parts.push(`Include a non-compete clause for ${data.nonCompetePeriod || "1 year"} covering ${data.nonCompeteScope || "the specified scope"}.`)
      }
      if (data.hasSeverance === "yes") {
        parts.push("Include severance package provisions.")
      }
      parts.push(intentText)
      return parts.join("\n")
    }

    case "residential_lease_agreement": {
      const parts = [
        "Generate a complete Residential Lease Agreement.",
        "Include property description, lease term, rent schedule, security deposit, maintenance responsibilities, entry notice, and default/termination terms.",
      ]
      if (intentId === "multi_tenant") {
        parts.push("This is a multi-tenant lease. Include provisions for multiple tenants and joint/several liability.")
      } else if (intentId === "furnished") {
        parts.push("This is a furnished rental. Include furniture inventory and condition report provisions.")
      }
      if (data.petPolicy && data.petPolicy !== "no_pets") {
        parts.push(`Include pet policy provisions with a pet deposit of ${data.petDeposit || "the specified amount"}.`)
      }
      if (data.autoRenewal === "yes") {
        parts.push("Include auto-renewal provisions.")
      }
      parts.push(intentText)
      return parts.join("\n")
    }

    case "commercial_lease_agreement": {
      const parts = [
        "Generate a complete Commercial Lease Agreement.",
        "Include permitted use, rent, term, CAM/operating expenses, insurance requirements, improvements, and default remedies.",
      ]
      if (intentId === "gross") {
        parts.push("This is a Gross Lease where the landlord covers most property expenses included in rent.")
      } else if (intentId === "net") {
        parts.push("This is a Net Lease where the tenant covers specified property expenses in addition to base rent.")
      }
      if (data.hasTenantImprovement === "yes") {
        parts.push(`Include tenant improvement allowance of ${data.tiAmount || "the specified amount"}.`)
      }
      if (data.hasRentEscalation === "yes") {
        parts.push(`Include annual rent escalation at ${data.escalationRate || "the specified rate"}.`)
      }
      if (data.hasRenewalOption === "yes") {
        parts.push("Include renewal option provisions.")
      }
      parts.push(intentText)
      return parts.join("\n")
    }

    case "independent_contractor_agreement": {
      const parts = [
        "Generate a complete Independent Contractor Agreement.",
        "Include scope of services, payment terms, contractor status, IP ownership, confidentiality, and termination.",
      ]
      if (intentId === "project_based") {
        parts.push("This is a project-based contract with specific deliverables and milestones.")
      } else if (intentId === "ongoing") {
        parts.push("This is an ongoing services agreement with recurring payments.")
      } else if (intentId === "hourly") {
        parts.push(`This is an hourly rate contract at ${data.hourlyRate || "the specified rate"}. Include invoicing cadence and hour tracking.`)
      }
      if (data.hasNonCompete === "yes") {
        parts.push(`Include a non-compete clause for ${data.nonCompeteDuration || "the specified period"}.`)
      }
      if (data.expenseReimbursement === "yes") {
        parts.push("Include expense reimbursement provisions.")
      }
      parts.push(intentText)
      return parts.join("\n")
    }

    case "partnership_agreement": {
      const parts = [
        "Generate a complete Partnership Agreement.",
        "Include partnership purpose, capital contributions, profit/loss allocation, management rights, dispute resolution, and dissolution.",
      ]
      if (intentId === "equal_split") {
        parts.push("This is an equal split partnership. All partners share equally in ownership, profits, and losses.")
      } else if (intentId === "unequal_split") {
        parts.push("This is an unequal split partnership. Include specific ownership and profit-sharing percentages as specified.")
      }
      if (data.managementStructure === "managing_partner") {
        parts.push(`Include provisions for a designated managing partner: ${data.managingPartner || "as specified"}.`)
      } else if (data.managementStructure === "committee") {
        parts.push("Include provisions for a management committee structure.")
      }
      if (data.hasNonCompete === "yes") {
        parts.push(`Include a non-compete clause for departing partners lasting ${data.nonCompeteDuration || "1 year"} within ${data.nonCompeteScope || "the specified scope"}.`)
      } else if (data.hasNonCompete === "no") {
        parts.push("Do not include a non-compete clause.")
      }
      if (data.guaranteedPayments === "yes") {
        parts.push("Include guaranteed payment (salary) provisions for specified partners.")
      }
      if (data.disputeMethod) {
        parts.push(`Use ${data.disputeMethod.replace(/_/g, " ")} as the primary dispute resolution method.`)
      }
      parts.push("Include exit provisions, buyout terms, and death/disability provisions.")
      parts.push(intentText)
      return parts.join("\n")
    }

    case "power_of_attorney": {
      const parts = [
        "Generate a complete Power of Attorney document.",
        "Include principal/agent details, scope of powers, effective date, and revocation clause.",
      ]
      if (intentId === "general") {
        parts.push("This is a General Power of Attorney granting broad authority over financial and legal matters.")
      } else if (intentId === "limited") {
        parts.push("This is a Limited Power of Attorney. Narrowly scope the powers to the specific acts described.")
      } else if (intentId === "healthcare") {
        parts.push("This is a Healthcare Power of Attorney. Include medical decision-making authority.")
        if (data.hipaaAuthorization === "yes") {
          parts.push("Include HIPAA authorization for medical records access.")
        }
        if (data.endOfLifeDirectives === "yes") {
          parts.push("Include end-of-life directive provisions.")
        }
      }
      if (data.isDurable === "yes") {
        parts.push("This is a Durable POA that remains effective upon incapacity of the principal.")
      }
      if (data.isSpringing === "yes") {
        parts.push("This is a Springing POA that only becomes effective upon the specified triggering event.")
      }
      parts.push(intentText)
      return parts.join("\n")
    }

    case "last_will_testament": {
      const parts = [
        "Generate a complete Last Will and Testament.",
        "Include executor appointment, beneficiary distributions, debt/tax handling, and revocation clause.",
      ]
      if (intentId === "guardian") {
        parts.push("Include guardianship provisions for minor children.")
      }
      if (data.hasMinorChildren === "yes") {
        parts.push("Include guardian designation and provisions for minor children.")
        if (data.childrensTrust === "yes") {
          parts.push(`Include a trust for minor children's inheritance managed by ${data.trusteeName || "the designated trustee"}.`)
        }
      }
      if (data.hasSpecificBequests === "yes") {
        parts.push("Include specific bequests as detailed in the form data.")
      }
      if (data.hasCharitableBequests === "yes") {
        parts.push("Include charitable bequests as specified.")
      }
      parts.push(intentText)
      return parts.join("\n")
    }

    case "service_agreement": {
      const parts = [
        "Generate a complete Service Agreement.",
        "Include scope of services, fees, term, IP ownership, confidentiality, liability limits, and termination.",
      ]
      if (intentId === "fixed_fee") {
        parts.push("This is a fixed-fee agreement. Include milestone-based payment schedule.")
      } else if (intentId === "retainer") {
        parts.push(`This is a retainer agreement for ${data.retainerAmount || "the specified amount"} per month. Include scope limits and overage rates.`)
      }
      if (data.earlyTerminationFee === "yes") {
        parts.push("Include early termination fee provisions.")
      }
      parts.push(intentText)
      return parts.join("\n")
    }

    case "purchase_agreement": {
      const parts = [
        "Generate a complete Purchase Agreement.",
        "Include item/service description, purchase price, payment terms, closing, representations, and remedies.",
      ]
      if (intentId === "asset") {
        parts.push("This is an Asset Purchase Agreement. Include detailed asset descriptions, condition, and title transfer.")
      } else if (intentId === "service") {
        parts.push("This is a Service Purchase Agreement. Include delivery timeline and acceptance criteria.")
      }
      if (data.hasWarranty === "yes") {
        parts.push(`Include warranty provisions for ${data.warrantyDuration || "the specified period"}.`)
      }
      if (data.hasInspectionPeriod === "yes") {
        parts.push("Include inspection contingency provisions.")
      }
      if (data.hasEarnestMoney === "yes") {
        parts.push(`Include earnest money deposit of ${data.earnestMoneyAmount || "the specified amount"}.`)
      }
      parts.push(intentText)
      return parts.join("\n")
    }

    case "non_compete_agreement": {
      const parts = [
        "Generate a complete Non-Compete Agreement.",
        "Include restricted activities, geographic scope, duration, consideration, enforceability, and severability.",
        "Note state-specific enforceability limitations.",
      ]
      if (intentId === "employee") {
        parts.push("This non-compete is tied to employment. Include employment-related consideration.")
      } else if (intentId === "contractor") {
        parts.push("This non-compete is tied to a contractor engagement. Include contractor-specific provisions.")
      }
      if (data.hasAdditionalCompensation === "yes") {
        parts.push("Include additional compensation provisions for the non-compete obligation.")
      }
      if (data.severability === "yes") {
        parts.push("Include a severability clause.")
      }
      if (data.blueLinePencil === "yes") {
        parts.push("Include a blue pencil / judicial modification clause allowing courts to modify overly broad restrictions.")
      }
      parts.push(intentText)
      return parts.join("\n")
    }

    default:
      return `Ensure the document includes all standard sections for this document type. ${intentText}`
  }
}
