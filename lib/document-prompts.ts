export function getDocumentPrompt(
  slug: string,
  intentId?: string | null,
  formData?: Record<string, any>
): string {
  const data = formData || {}

  switch (slug) {
    // ══════════════════════════════════════════════════════════════════════════
    // 1. NDA (NON-DISCLOSURE AGREEMENT)
    // ══════════════════════════════════════════════════════════════════════════
    case "nda": {
      const parts = [
        "Generate a complete Non-Disclosure Agreement.",
        "",
        "PARTIES:",
        `- Disclosing Party: ${data.disclosingPartyName || "[DISCLOSING PARTY]"}, address: ${data.disclosingPartyAddress || "[ADDRESS]"}`,
        `- Receiving Party: ${data.receivingPartyName || "[RECEIVING PARTY]"}, address: ${data.receivingPartyAddress || "[ADDRESS]"}`,
        "",
        `PURPOSE: ${data.ndaPurpose || "Business discussions between the parties"}`,
        "",
        "REQUIRED SECTIONS:",
        "1. DEFINITIONS - Define 'Confidential Information' broadly",
        `2. SCOPE OF CONFIDENTIAL INFORMATION - ${data.confidentialInfoDescription || "All proprietary business information"}`,
        data.includesTradeSecrets === "yes" ? "   - Explicitly include trade secrets with enhanced protections" : "",
        data.exclusions ? `   - Additional exclusions: ${data.exclusions}` : "",
        data.permittedDisclosures ? `   - Permitted disclosures: ${data.permittedDisclosures}` : "",
        "3. OBLIGATIONS OF RECEIVING PARTY",
        "4. EXCLUSIONS FROM CONFIDENTIALITY (publicly known, independently developed, etc.)",
        `5. TERM - Duration: ${data.ndaDuration?.replace(/_/g, " ") || "2 years"}`,
        `   - Survival period after termination: ${data.survivalPeriod?.replace(/_/g, " ") || "2 years"}`,
        `   - Breach notification: ${data.breachNotificationPeriod?.replace(/_/g, " ") || "immediately"}`,
        `6. RETURN OF MATERIALS - Method: ${data.returnOfMaterials?.replace(/_/g, " ") || "return or destroy"}`,
        "7. REMEDIES FOR BREACH",
        `8. DISPUTE RESOLUTION - Method: ${data.disputeMethod?.replace(/_/g, " ") || "litigation"}`,
        "9. GOVERNING LAW",
        "10. SEVERABILITY",
        "11. ENTIRE AGREEMENT",
        "12. SIGNATURE BLOCKS for both parties",
      ]

      if (intentId === "mutual") {
        parts.push("", "TYPE: Mutual NDA - BOTH parties share and receive confidential information. All obligations must be reciprocal.")
      } else if (intentId === "unilateral") {
        parts.push("", "TYPE: Unilateral NDA - Only the Disclosing Party shares confidential information.")
      }

      if (data.hasNonCompete === "yes") {
        parts.push(`Include NON-COMPETE CLAUSE: Duration ${data.nonCompeteDuration?.replace(/_/g, " ") || "1 year"}, geographic scope: ${data.nonCompeteScope || "as reasonably determined"}.`)
      }
      if (data.hasNonSolicitation === "yes") {
        parts.push(`Include NON-SOLICITATION CLAUSE: Duration ${data.nonSolicitationDuration?.replace(/_/g, " ") || "1 year"}.`)
      }
      if (data.injunctiveRelief === "yes") {
        parts.push("Include INJUNCTIVE RELIEF provision allowing immediate court orders without posting bond.")
      }

      return parts.filter(Boolean).join("\n")
    }

    // ══════════════════════════════════════════════════════════════════════════
    // 2. LLC OPERATING AGREEMENT
    // ══════════════════════════════════════════════════════════════════════════
    case "llc_operating_agreement": {
      const parts = [
        "Generate a complete LLC Operating Agreement.",
        "",
        "COMPANY INFORMATION:",
        `- LLC Name: ${data.llcName || "[LLC NAME]"}`,
        `- State of Formation: ${data.state || data.STATE || "[STATE]"}`,
        `- Formation Date: ${data.formationDate || "[DATE]"}`,
        `- Principal Office: ${data.principalOffice || "[ADDRESS]"}`,
        `- Business Purpose: ${data.businessPurpose || "any lawful business"}`,
        `- Registered Agent: ${data.registeredAgent || "[AGENT NAME]"}, address: ${data.registeredAgentAddress || "[AGENT ADDRESS]"}`,
        "",
        "REQUIRED SECTIONS:",
        "1. FORMATION AND NAME",
        "2. PURPOSE AND POWERS",
        "3. TERM (duration of the LLC)",
        "4. MEMBERS AND MEMBERSHIP INTERESTS",
      ]

      if (intentId === "single_member") {
        parts.push(
          `   - Single Member: ${data.memberName || "[MEMBER NAME]"}`,
          `   - Capital Contribution: ${data.initialContribution || "[AMOUNT]"}`,
          "   Structure for one owner with full authority.",
        )
      } else if (intentId === "multi_member") {
        parts.push(
          `   - Member 1: ${data.member1Name || "[MEMBER 1]"}, contribution: ${data.member1Contribution || "[AMOUNT]"}, ownership: ${data.member1Ownership || "[%]"}`,
          `   - Member 2: ${data.member2Name || "[MEMBER 2]"}, contribution: ${data.member2Contribution || "[AMOUNT]"}, ownership: ${data.member2Ownership || "[%]"}`,
          data.member3Name ? `   - Member 3: ${data.member3Name}, contribution: ${data.member3Contribution || "[AMOUNT]"}, ownership: ${data.member3Ownership || "[%]"}` : "",
          "   Include voting rights proportional to ownership and joint decision-making provisions.",
        )
      } else if (intentId === "manager_managed") {
        parts.push(
          `   - Designated Manager: ${data.managerName || "[MANAGER]"}`,
          "   Include manager authority, duties, liability protections, and removal procedures.",
        )
      }

      parts.push(
        "5. CAPITAL CONTRIBUTIONS",
        "6. ALLOCATIONS AND DISTRIBUTIONS OF PROFITS AND LOSSES",
        `   - Distribution frequency: ${data.distributionFrequency?.replace(/_/g, " ") || "quarterly"}`,
        "7. MANAGEMENT AND VOTING",
        `   - Management type: ${data.managementType?.replace(/_/g, " ") || "member-managed"}`,
        "8. TRANSFER OF MEMBERSHIP INTERESTS",
        "9. DISSOLUTION AND WINDING UP",
        "10. INDEMNIFICATION",
        "11. AMENDMENTS",
        "12. GOVERNING LAW",
        "13. SIGNATURE BLOCKS for all members",
      )

      if (data.taxElection) {
        parts.push(`TAX ELECTION: ${data.taxElection.replace(/_/g, " ")}. Include appropriate tax provisions.`)
      }
      if (data.additionalCapitalRequired === "yes") {
        parts.push("Include ADDITIONAL CAPITAL CALL provisions with member obligations and failure-to-contribute consequences.")
      }

      return parts.filter(Boolean).join("\n")
    }

    // ══════════════════════════════════════════════════════════════════════════
    // 3. EMPLOYMENT CONTRACT
    // ══════════════════════════════════════════════════════════════════════════
    case "employment_contract": {
      const parts = [
        "Generate a complete Employment Contract.",
        "",
        "PARTIES:",
        `- Employer: ${data.companyName || "[EMPLOYER]"}, address: ${data.companyAddress || "[ADDRESS]"}`,
        `- Employee: ${data.employeeName || "[EMPLOYEE]"}, address: ${data.employeeAddress || "[ADDRESS]"}`,
        "",
        "POSITION DETAILS:",
        `- Title: ${data.jobTitle || "[JOB TITLE]"}`,
        `- Department: ${data.department || "N/A"}`,
        `- Reports to: ${data.reportsTo || "N/A"}`,
        `- Start Date: ${data.startDate || "[DATE]"}`,
        `- Work Location: ${data.workLocation || "[LOCATION]"}`,
        `- Schedule: ${data.schedule || "Full-time"}`,
        "",
        "COMPENSATION:",
        `- Base Salary: ${data.salary || "[SALARY]"} per ${data.payFrequency || "year"}`,
        `- Pay Frequency: ${data.payFrequency?.replace(/_/g, " ") || "bi-weekly"}`,
        data.hasBonus === "yes" ? `- Bonus: ${data.bonusStructure || "Performance-based bonus as determined by employer"}` : "",
        data.hasEquity === "yes" ? `- Equity: ${data.equityDetails || "Stock options subject to vesting schedule"}` : "",
        "",
        "REQUIRED SECTIONS:",
        "1. EMPLOYMENT TERMS (position, duties, reporting)",
        "2. COMPENSATION AND BENEFITS",
        `   - Benefits: ${data.benefits || "Standard company benefits package"}`,
        `   - PTO: ${data.ptoPolicy || "Per company policy"}`,
        "3. CONFIDENTIALITY AND NON-DISCLOSURE",
        "4. INTELLECTUAL PROPERTY ASSIGNMENT (all work product belongs to employer)",
        "5. TERMINATION",
      ]

      if (intentId === "at_will") {
        parts.push("   - AT-WILL employment: Either party may terminate at any time with or without cause.")
        parts.push(`   - Notice period: ${data.noticePeriod?.replace(/_/g, " ") || "2 weeks"}`)
      } else if (intentId === "fixed_term") {
        parts.push(`   - FIXED-TERM contract for ${data.termLength || "the specified duration"}`)
        parts.push("   - Include end date, renewal terms, and early termination provisions.")
      } else if (intentId === "executive") {
        parts.push("   - EXECUTIVE agreement with enhanced protections")
        parts.push("   - Include signing bonus, equity vesting, golden parachute, and change-of-control provisions.")
      } else if (intentId === "contract_to_hire") {
        parts.push("   - CONTRACT-TO-HIRE arrangement")
        parts.push(`   - Evaluation period: ${data.evaluationPeriod || "90 days"}`)
        parts.push("   - Include criteria and timeline for conversion to permanent employment.")
      }

      parts.push(
        "6. NON-SOLICITATION",
        "7. DISPUTE RESOLUTION",
        "8. GOVERNING LAW",
        "9. ENTIRE AGREEMENT",
        "10. SIGNATURE BLOCKS",
      )

      if (data.hasNonCompete === "yes") {
        parts.push(`Include NON-COMPETE: Duration ${data.nonCompetePeriod || "1 year"}, scope: ${data.nonCompeteScope || "as specified"}.`)
      }
      if (data.hasSeverance === "yes") {
        parts.push(`Include SEVERANCE: ${data.severanceDetails || "Severance package upon termination without cause"}.`)
      }

      return parts.filter(Boolean).join("\n")
    }

    // ══════════════════════════════════════════════════════════════════════════
    // 4. RESIDENTIAL LEASE AGREEMENT
    // ══════════════════════════════════════════════════════════════════════════
    case "residential_lease_agreement": {
      const parts = [
        "Generate a complete Residential Lease Agreement.",
        "",
        "PARTIES:",
        `- Landlord: ${data.landlordName || "[LANDLORD]"}, address: ${data.landlordAddress || "[ADDRESS]"}`,
        `- Tenant: ${data.tenantName || "[TENANT]"}, address: ${data.tenantAddress || "[ADDRESS]"}`,
        data.additionalTenants ? `- Additional Tenants: ${data.additionalTenants}` : "",
        "",
        "PROPERTY:",
        `- Property Address: ${data.propertyAddress || "[PROPERTY ADDRESS]"}`,
        `- Property Type: ${data.propertyType?.replace(/_/g, " ") || "residential"}`,
        `- Bedrooms: ${data.bedrooms || "N/A"}, Bathrooms: ${data.bathrooms || "N/A"}`,
        data.includedAppliances ? `- Included Appliances/Furnishings: ${data.includedAppliances}` : "",
        "",
        "LEASE TERMS:",
        `- Lease Start: ${data.leaseStartDate || "[START DATE]"}`,
        `- Lease Term: ${data.leaseTerm?.replace(/_/g, " ") || "1 year"}`,
        `- Monthly Rent: ${data.monthlyRent || "[RENT AMOUNT]"}`,
        `- Rent Due Date: ${data.rentDueDay || "1st"} of each month`,
        `- Late Fee: ${data.lateFee || "per state law"}`,
        `- Security Deposit: ${data.securityDeposit || "[DEPOSIT AMOUNT]"}`,
        "",
        "REQUIRED SECTIONS:",
        "1. PARTIES AND PROPERTY DESCRIPTION",
        "2. LEASE TERM AND RENEWAL",
        "3. RENT (amount, due date, payment method, late fees, grace period)",
        "4. SECURITY DEPOSIT (amount, conditions for return, deductions, timeline per state law)",
        "5. UTILITIES AND SERVICES (who pays what)",
        `   ${data.utilitiesIncluded ? `Included: ${data.utilitiesIncluded}` : ""}`,
        "6. MAINTENANCE AND REPAIRS (landlord vs tenant responsibilities)",
        "7. USE OF PREMISES (residential only, occupancy limits, noise)",
        "8. ALTERATIONS AND MODIFICATIONS",
        "9. ENTRY AND ACCESS (landlord's right to enter with notice per state law)",
        "10. INSURANCE (renter's insurance requirement)",
        "11. DEFAULT AND REMEDIES",
        "12. TERMINATION AND MOVE-OUT PROCEDURES",
        "13. GOVERNING LAW",
        "14. SIGNATURE BLOCKS",
      ]

      if (intentId === "multi_tenant") {
        parts.push("Include joint and several liability for multiple tenants.")
      } else if (intentId === "furnished") {
        parts.push("Include FURNISHED RENTAL provisions: furniture inventory, condition report, damage responsibility.")
      }

      if (data.petPolicy && data.petPolicy !== "no_pets") {
        parts.push(`PET POLICY: Allowed with deposit of ${data.petDeposit || "per policy"}. Include pet addendum provisions (breed/weight restrictions, damage liability).`)
      } else {
        parts.push("PET POLICY: No pets allowed.")
      }
      if (data.autoRenewal === "yes") {
        parts.push("Include AUTO-RENEWAL provisions with required notice to terminate.")
      }
      if (data.parkingSpaces) {
        parts.push(`PARKING: ${data.parkingSpaces} spaces included.`)
      }

      return parts.filter(Boolean).join("\n")
    }

    // ══════════════════════════════════════════════════════════════════════════
    // 5. COMMERCIAL LEASE AGREEMENT
    // ══════════════════════════════════════════════════════════════════════════
    case "commercial_lease_agreement": {
      const parts = [
        "Generate a complete Commercial Lease Agreement.",
        "",
        "PARTIES:",
        `- Landlord: ${data.landlordName || "[LANDLORD]"}, address: ${data.landlordAddress || "[ADDRESS]"}`,
        `- Tenant: ${data.tenantBusinessName || "[TENANT BUSINESS]"}, address: ${data.tenantAddress || "[ADDRESS]"}`,
        "",
        "PROPERTY:",
        `- Property Address: ${data.propertyAddress || "[PROPERTY ADDRESS]"}`,
        `- Square Footage: ${data.squareFootage || "[SQ FT]"}`,
        `- Permitted Use: ${data.permittedUse || "[PERMITTED USE]"}`,
        data.parkingSpaces ? `- Parking: ${data.parkingSpaces} spaces` : "",
        data.commonAreaAccess ? `- Common Areas: ${data.commonAreaAccess}` : "",
        "",
        "LEASE TERMS:",
        `- Start Date: ${data.leaseStartDate || "[START DATE]"}`,
        `- Term: ${data.leaseTerm?.replace(/_/g, " ") || data.customTerm || "[TERM]"}`,
        `- Monthly Base Rent: ${data.monthlyBaseRent || "[RENT]"}`,
        `- Security Deposit: ${data.securityDeposit || "[DEPOSIT]"}`,
        data.camCharges ? `- CAM Charges: ${data.camCharges}` : "",
        "",
        "REQUIRED SECTIONS:",
        "1. PARTIES AND PREMISES DESCRIPTION",
        "2. LEASE TERM, COMMENCEMENT, AND EXPIRATION",
        "3. BASE RENT AND PAYMENT TERMS",
        "4. ADDITIONAL RENT (operating expenses, taxes, insurance)",
        "5. COMMON AREA MAINTENANCE (CAM) CHARGES",
        "6. SECURITY DEPOSIT",
        "7. PERMITTED USE",
        "8. MAINTENANCE AND REPAIRS (landlord vs tenant)",
        "9. ALTERATIONS AND IMPROVEMENTS",
        `10. INSURANCE REQUIREMENTS - ${data.insuranceRequirements || "General liability, property insurance"}`,
        "11. INDEMNIFICATION",
        "12. ASSIGNMENT AND SUBLETTING",
        `13. DEFAULT AND REMEDIES (cure period: ${data.defaultCurePeriod?.replace(/_/g, " ") || "30 days"})`,
        "14. SURRENDER AND HOLDOVER",
        "15. GOVERNING LAW",
        "16. SIGNATURE BLOCKS",
      ]

      if (intentId === "gross") {
        parts.push("LEASE TYPE: Gross Lease - Landlord covers most operating expenses within the base rent.")
      } else if (intentId === "net") {
        parts.push(`LEASE TYPE: Net Lease - Tenant pays additional expenses: ${data.expenseResponsibilities || "property taxes, insurance, maintenance (NNN)"}`)
      }

      if (data.hasTenantImprovement === "yes") {
        parts.push(`TENANT IMPROVEMENTS: Allowance of ${data.tiAmount || "[AMOUNT]"}. Scope: ${data.tiScope || "as agreed"}.`)
      }
      if (data.landlordImprovements) {
        parts.push(`LANDLORD IMPROVEMENTS: ${data.landlordImprovements}`)
      }
      if (data.hasRentEscalation === "yes") {
        parts.push(`RENT ESCALATION: Annual increase at ${data.escalationRate || "3% per year"}.`)
      }
      if (data.hasRenewalOption === "yes") {
        parts.push(`RENEWAL OPTIONS: ${data.renewalTerms || "Per negotiated terms"}.`)
      }

      return parts.filter(Boolean).join("\n")
    }

    // ══════════════════════════════════════════════════════════════════════════
    // 6. INDEPENDENT CONTRACTOR AGREEMENT
    // ══════════════════════════════════════════════════════════════════════════
    case "independent_contractor_agreement": {
      const parts = [
        "Generate a complete Independent Contractor Agreement.",
        "",
        "PARTIES:",
        `- Company/Client: ${data.clientName || "[CLIENT]"}, address: ${data.clientAddress || "[ADDRESS]"}`,
        `- Contractor: ${data.contractorName || "[CONTRACTOR]"}, address: ${data.contractorAddress || "[ADDRESS]"}`,
        "",
        "ENGAGEMENT DETAILS:",
        `- Services: ${data.servicesDescription || "[DESCRIPTION OF SERVICES]"}`,
        `- Start Date: ${data.startDate || "[START DATE]"}`,
        `- Term: ${data.contractDuration?.replace(/_/g, " ") || "[TERM]"}`,
        data.deliverables ? `- Deliverables: ${data.deliverables}` : "",
        "",
        "COMPENSATION:",
      ]

      if (intentId === "project_based") {
        parts.push(
          `- Project Fee: ${data.projectFee || "[AMOUNT]"}`,
          `- Milestone Schedule: ${data.milestoneSchedule || "As defined in Statement of Work"}`,
          "This is a PROJECT-BASED contract with specific deliverables.",
        )
      } else if (intentId === "ongoing") {
        parts.push(
          `- Monthly Fee: ${data.monthlyFee || "[AMOUNT]"}`,
          "This is an ONGOING services agreement with recurring payments.",
        )
      } else if (intentId === "hourly") {
        parts.push(
          `- Hourly Rate: ${data.hourlyRate || "[RATE]"}`,
          `- Invoicing: ${data.invoicingSchedule?.replace(/_/g, " ") || "monthly"}`,
          "Include hour tracking and reporting requirements.",
        )
      }

      parts.push(
        `- Payment Terms: ${data.paymentTerms?.replace(/_/g, " ") || "Net 30"}`,
        "",
        "REQUIRED SECTIONS:",
        "1. ENGAGEMENT AND SCOPE OF SERVICES",
        "2. COMPENSATION AND PAYMENT",
        "3. INDEPENDENT CONTRACTOR STATUS (explicitly NOT an employee - no benefits, taxes, workers comp)",
        "4. TERM AND TERMINATION",
        `   - Termination notice: ${data.terminationNotice?.replace(/_/g, " ") || "30 days"}`,
        "5. INTELLECTUAL PROPERTY OWNERSHIP",
        `   - Work product ownership: ${data.ipOwnership?.replace(/_/g, " ") || "client owns all work product"}`,
        "6. CONFIDENTIALITY AND NON-DISCLOSURE",
        "7. REPRESENTATIONS AND WARRANTIES",
        "8. INDEMNIFICATION",
        "9. LIABILITY LIMITATION",
        "10. INSURANCE (contractor maintains own insurance)",
        "11. GOVERNING LAW",
        "12. DISPUTE RESOLUTION",
        "13. ENTIRE AGREEMENT",
        "14. SIGNATURE BLOCKS",
      )

      if (data.hasNonCompete === "yes") {
        parts.push(`Include NON-COMPETE: Duration ${data.nonCompeteDuration?.replace(/_/g, " ") || "1 year"}.`)
      }
      if (data.expenseReimbursement === "yes") {
        parts.push(`Include EXPENSE REIMBURSEMENT provisions: ${data.expenseTerms || "pre-approved expenses with receipts"}.`)
      }

      return parts.filter(Boolean).join("\n")
    }

    // ══════════════════════════════════════════════════════════════════════════
    // 7. PARTNERSHIP AGREEMENT
    // ══════════════════════════════════════════════════════════════════════════
    case "partnership_agreement": {
      const parts = [
        "Generate a complete Partnership Agreement.",
        "",
        "PARTNERSHIP INFORMATION:",
        `- Partnership Name: ${data.partnershipName || "[PARTNERSHIP NAME]"}`,
        `- Principal Office: ${data.principalOffice || "[ADDRESS]"}`,
        `- Business Purpose: ${data.businessPurpose || "[PURPOSE]"}`,
        `- Effective Date: ${data.effectiveDate || "[DATE]"}`,
        `- Term: ${data.partnershipTermType === "fixed" ? `Fixed until ${data.partnershipEndDate || "[END DATE]"}` : "Indefinite (ongoing)"}`,
        "",
        "PARTNERS:",
        `- Partner 1: ${data.partner1Name || "[PARTNER 1]"}, address: ${data.partner1Address || "[ADDRESS]"}, role: ${data.partner1Role || "General Partner"}`,
        `  Contribution: ${data.partner1Contribution || "[AMOUNT]"} (${data.partner1ContributionType?.replace(/_/g, " ") || "cash"})`,
        `- Partner 2: ${data.partner2Name || "[PARTNER 2]"}, address: ${data.partner2Address || "[ADDRESS]"}, role: ${data.partner2Role || "General Partner"}`,
        `  Contribution: ${data.partner2Contribution || "[AMOUNT]"} (${data.partner2ContributionType?.replace(/_/g, " ") || "cash"})`,
      ]

      if (data.partner3Name) {
        parts.push(`- Partner 3: ${data.partner3Name}, address: ${data.partner3Address || "[ADDRESS]"}`)
      }
      if (data.partner4Name) {
        parts.push(`- Partner 4: ${data.partner4Name}, address: ${data.partner4Address || "[ADDRESS]"}`)
      }
      if (data.additionalPartners) {
        parts.push(`- Additional Partners: ${data.additionalPartners}`)
      }

      parts.push(
        "",
        `Total Initial Capital: ${data.totalCapital || "[TOTAL]"}`,
        "",
        "REQUIRED SECTIONS:",
        "1. FORMATION AND NAME",
        "2. PURPOSE AND TERM",
        "3. PARTNERS AND CAPITAL CONTRIBUTIONS (detail each partner's contribution type and amount)",
        "4. OWNERSHIP INTERESTS",
      )

      if (intentId === "equal_split") {
        parts.push("   All partners share EQUALLY in ownership, profits, and losses.")
      } else if (intentId === "unequal_split") {
        parts.push(`   UNEQUAL split: ${data.ownershipPercentages || "As specified by partners"}`)
      }

      parts.push(
        "5. PROFIT AND LOSS ALLOCATION",
        `   - Distribution frequency: ${data.distributionFrequency?.replace(/_/g, " ") || "quarterly"}`,
        intentId === "unequal_split" && data.profitPercentages ? `   - Profit sharing: ${data.profitPercentages}` : "",
        data.reserveFundPercentage ? `   - Reserve fund: ${data.reserveFundPercentage} of profits` : "",
        "6. MANAGEMENT AND DECISION MAKING",
        `   - Structure: ${data.managementStructure?.replace(/_/g, " ") || "equal management"}`,
      )

      if (data.managementStructure === "managing_partner") {
        parts.push(`   - Managing Partner: ${data.managingPartner || "[NAME]"} with authority for day-to-day operations`)
      } else if (data.managementStructure === "committee") {
        parts.push(`   - Committee Members: ${data.committeeMembers || "[MEMBERS]"}`)
      }

      parts.push(
        `   - Individual spending limit: ${data.spendingLimit || "$5,000"} without other partner approval`,
        `   - Banking authority: ${data.bankingAuthority?.replace(/_/g, " ") || "any partner"}`,
        data.unanimousDecisions ? `   - Unanimous consent required for: ${data.unanimousDecisions}` : "",
        "7. ADDITIONAL CAPITAL CALLS",
        data.additionalCapitalCalls === "yes" ? `   Method: ${data.capitalCallMethod?.replace(/_/g, " ") || "pro rata"}` : "   Not permitted without unanimous consent.",
        "8. TRANSFER OF PARTNERSHIP INTERESTS",
        `   - Right of first refusal: ${data.rightOfFirstRefusal === "yes" ? "Yes" : "No"}`,
        "9. WITHDRAWAL AND EXIT",
        `   - Notice period: ${data.exitNoticePeriod?.replace(/_/g, " ") || "90 days"}`,
        `   - Buyout valuation: ${data.buyoutMethod?.replace(/_/g, " ") || "fair market value"}`,
        data.buyoutFormula ? `   - Buyout formula: ${data.buyoutFormula}` : "",
        "10. DEATH, DISABILITY, AND INCAPACITY",
        `    - Provision: ${data.deathDisabilityProvisions?.replace(/_/g, " ") || "remaining partners buy out estate"}`,
        "11. DISPUTE RESOLUTION",
        `    - Method: ${data.disputeMethod?.replace(/_/g, " ") || "mediation then arbitration"}`,
        data.arbitrationBinding ? `    - Arbitration type: ${data.arbitrationBinding}` : "",
        "12. NON-COMPETE (for departing partners)",
      )

      if (data.hasNonCompete === "yes") {
        parts.push(`    Duration: ${data.nonCompeteDuration?.replace(/_/g, " ") || "1 year"}, scope: ${data.nonCompeteScope || "as specified"}`)
      } else {
        parts.push("    No non-compete clause included.")
      }

      parts.push(
        "13. DISSOLUTION AND WINDING UP",
        "14. INDEMNIFICATION",
        "15. GOVERNING LAW",
        "16. ENTIRE AGREEMENT",
        "17. SIGNATURE BLOCKS for all partners",
      )

      if (data.guaranteedPayments === "yes") {
        parts.push(`Include GUARANTEED PAYMENTS: ${data.guaranteedPaymentAmounts || "As specified per partner"}`)
      }

      return parts.filter(Boolean).join("\n")
    }

    // ══════════════════════════════════════════════════════════════════════════
    // 8. POWER OF ATTORNEY
    // ══════════════════════════════════════════════════════════════════════════
    case "power_of_attorney": {
      const parts = [
        "Generate a complete Power of Attorney document.",
        "",
        "PARTIES:",
        `- Principal: ${data.principalName || "[PRINCIPAL]"}, address: ${data.principalAddress || "[ADDRESS]"}, DOB: ${data.principalDOB || "[DOB]"}`,
        `- Agent (Attorney-in-Fact): ${data.agentName || "[AGENT]"}, address: ${data.agentAddress || "[ADDRESS]"}, relationship: ${data.agentRelationship || "[RELATIONSHIP]"}`,
        data.alternateAgent ? `- Alternate Agent: ${data.alternateAgent}, address: ${data.alternateAgentAddress || "[ADDRESS]"}` : "",
        "",
        "REQUIRED SECTIONS:",
        "1. APPOINTMENT OF AGENT",
        "2. POWERS GRANTED",
      ]

      if (intentId === "general") {
        parts.push(
          "   TYPE: General Power of Attorney - BROAD authority over all financial and legal matters:",
          "   - Banking and financial transactions",
          "   - Real estate transactions",
          "   - Tax matters",
          "   - Business operations",
          "   - Legal proceedings",
          "   - Government benefits",
          `   Specific powers: ${data.specificPowers || "All financial and legal matters"}`,
        )
      } else if (intentId === "limited") {
        parts.push(
          "   TYPE: Limited Power of Attorney - NARROWLY scoped to specific acts only:",
          `   - Specific powers: ${data.specificPowers || "[SPECIFIC POWERS]"}`,
          `   - Limitations: ${data.limitations || "Only the powers expressly stated herein"}`,
          data.transactionDetails ? `   - Transaction details: ${data.transactionDetails}` : "",
        )
      } else if (intentId === "healthcare") {
        parts.push(
          "   TYPE: Healthcare Power of Attorney - Medical decision-making authority:",
          "   - Consent to or refuse medical treatment",
          "   - Access medical records",
          "   - Choose healthcare providers",
          "   - Make end-of-life decisions",
          `   Specific healthcare wishes: ${data.healthcareWishes || "Agent to act in principal's best interest"}`,
        )
        if (data.hipaaAuthorization === "yes") {
          parts.push("   Include HIPAA AUTHORIZATION for full access to medical records.")
        }
        if (data.endOfLifeDirectives === "yes") {
          parts.push(`   Include END-OF-LIFE DIRECTIVES: ${data.endOfLifeWishes || "Agent to make decisions consistent with principal's wishes"}`)
        }
      }

      parts.push(
        "3. EFFECTIVE DATE AND DURATION",
        `   - Effective: ${data.effectiveDate || "immediately upon execution"}`,
      )

      if (data.isDurable === "yes") {
        parts.push("   DURABLE: This POA remains effective even if the principal becomes incapacitated.")
      }
      if (data.isSpringing === "yes") {
        parts.push(`   SPRINGING: This POA only becomes effective upon: ${data.springingEvent || "principal's incapacity as certified by physician"}`)
      }

      parts.push(
        "4. AGENT'S DUTIES AND OBLIGATIONS (fiduciary duty, duty to account)",
        `   - Agent compensation: ${data.agentCompensation?.replace(/_/g, " ") || "no compensation"}`,
        "5. THIRD-PARTY RELIANCE",
        "6. REVOCATION",
        "7. GOVERNING LAW",
        "8. NOTARIZATION AND WITNESS REQUIREMENTS (per state law)",
        "9. SIGNATURE BLOCKS (principal, agent, witnesses, notary)",
      )

      return parts.filter(Boolean).join("\n")
    }

    // ══════════════════════════════════════════════════════════════════════════
    // 9. LAST WILL AND TESTAMENT
    // ══════════════════════════════════════════════════════════════════════════
    case "last_will_testament": {
      const parts = [
        "Generate a complete Last Will and Testament.",
        "",
        "TESTATOR INFORMATION:",
        `- Full Legal Name: ${data.testatorName || "[TESTATOR]"}`,
        `- Address: ${data.testatorAddress || "[ADDRESS]"}`,
        `- Date of Birth: ${data.testatorDOB || "[DOB]"}`,
        `- State of Residence: ${data.state || data.STATE || "[STATE]"}`,
        `- Marital Status: ${data.maritalStatus || "[STATUS]"}`,
        data.spouseName ? `- Spouse: ${data.spouseName}` : "",
        "",
        "REQUIRED SECTIONS (generate ALL of these):",
        "",
        "1. PREAMBLE AND DECLARATION",
        "   State testator's full name, residence, sound mind, and that this is their last will revoking all prior wills.",
        "",
        "2. FAMILY DECLARATIONS",
        `   Declare marital status${data.spouseName ? ` (married to ${data.spouseName})` : ""} and family members.`,
        "",
        "3. APPOINTMENT OF EXECUTOR",
        `   - Primary Executor: ${data.executorName || "[EXECUTOR]"} (relationship: ${data.executorRelationship || "[RELATIONSHIP]"})`,
        `   - Alternate Executor: ${data.alternateExecutor || "as determined by the court"}`,
        `   - Compensation: ${data.executorCompensation?.replace(/_/g, " ") || "reasonable compensation"}`,
        "   Grant executor full powers to manage estate, pay debts, sell property, and distribute assets.",
        "",
        "4. DEBTS, TAXES, AND EXPENSES",
        `   - Handling method: ${data.debtHandling?.replace(/_/g, " ") || "pay from residual estate first"}`,
        "   Direct all legally enforceable debts, funeral expenses, and estate taxes to be paid.",
        "",
        "5. SPECIFIC BEQUESTS",
      ]

      if (data.hasSpecificBequests === "yes") {
        parts.push(`   Include these specific bequests: ${data.specificBequests || "[SPECIFIC ITEMS TO SPECIFIC PEOPLE]"}`)
      } else {
        parts.push("   No specific bequests (all assets pass through residual estate).")
      }

      parts.push(
        "",
        "6. CHARITABLE BEQUESTS",
      )
      if (data.hasCharitableBequests === "yes") {
        parts.push(`   Include these charitable gifts: ${data.charitableBequests || "[CHARITABLE DONATIONS]"}`)
      } else {
        parts.push("   No charitable bequests.")
      }

      parts.push(
        "",
        "7. RESIDUAL ESTATE",
        `   All remaining assets to: ${data.residualBeneficiary || data.spouseName || "[RESIDUAL BENEFICIARY]"}`,
        `   Primary beneficiaries and shares: ${data.primaryBeneficiaries || "100% to residual beneficiary"}`,
        "",
        "8. GUARDIANSHIP OF MINOR CHILDREN",
      )

      if (data.hasMinorChildren === "yes") {
        parts.push(
          `   - Guardian: ${data.guardianName || "[GUARDIAN]"}`,
          `   - Alternate Guardian: ${data.alternateGuardian || "as determined by the court"}`,
        )
        if (data.childrensTrust === "yes") {
          parts.push(
            `   - Create TRUST for minors' inheritance managed by: ${data.trusteeName || "[TRUSTEE]"}`,
            `   - Distribution age: ${data.trustDistributionAge === "staged" ? "Staged distributions" : `Age ${data.trustDistributionAge || "21"}`}`,
          )
        }
      } else {
        parts.push("   Testator has no minor children; no guardianship provisions needed.")
      }

      parts.push(
        "",
        "9. SIMULTANEOUS DEATH CLAUSE",
        "   If a beneficiary dies within 30 days of testator, treat as if beneficiary predeceased testator.",
        "",
        "10. NO-CONTEST CLAUSE (IN TERROREM)",
        "    Any beneficiary who contests this will forfeits their share.",
        "",
        "11. SEVERABILITY",
        "",
        "12. GOVERNING LAW",
        `    Governed by the laws of ${data.state || data.STATE || "[STATE]"}.`,
        "",
        "13. SELF-PROVING AFFIDAVIT",
        `    Include a self-proving affidavit per ${data.state || data.STATE || "[STATE]"} law so the will can be admitted to probate without witness testimony.`,
        "",
        "14. SIGNATURE AND WITNESS BLOCK",
        "    - Testator signature line with date",
        "    - Two (2) witness signature lines with printed names and addresses",
        "    - Notary acknowledgment block",
      )

      if (data.funeralWishes) {
        parts.push(`\nFUNERAL/MEMORIAL WISHES: ${data.funeralWishes}`)
      }
      if (data.digitalAssets) {
        parts.push(`\nDIGITAL ASSETS: ${data.digitalAssets}`)
      }

      return parts.filter(Boolean).join("\n")
    }

    // ══════════════════════════════════════════════════════════════════════════
    // 10. SERVICE AGREEMENT
    // ══════════════════════════════════════════════════════════════════════════
    case "service_agreement": {
      const parts = [
        "Generate a complete Service Agreement.",
        "",
        "PARTIES:",
        `- Service Provider: ${data.providerName || "[PROVIDER]"}, address: ${data.providerAddress || "[ADDRESS]"}`,
        `- Client: ${data.clientName || "[CLIENT]"}, address: ${data.clientAddress || "[ADDRESS]"}`,
        "",
        "SERVICE DETAILS:",
        `- Description: ${data.servicesDescription || "[SERVICES]"}`,
        `- Deliverables: ${data.deliverables || "[DELIVERABLES]"}`,
        `- Effective Date: ${data.effectiveDate || "[DATE]"}`,
        `- Term: ${data.term?.replace(/_/g, " ") || "1 year"}`,
        "",
        "COMPENSATION:",
      ]

      if (intentId === "fixed_fee") {
        parts.push(
          `- Total Fee: ${data.totalFee || "[AMOUNT]"}`,
          `- Milestone Schedule: ${data.milestonePayments || "As defined in scope"}`,
          "TYPE: Fixed-fee agreement with milestone-based payments.",
        )
      } else if (intentId === "retainer") {
        parts.push(
          `- Monthly Retainer: ${data.retainerAmount || "[AMOUNT]"}`,
          `- Scope included: ${data.retainerScope || "As defined"}`,
          data.overageRate ? `- Overage rate: ${data.overageRate}` : "",
          "TYPE: Retainer agreement with scope limits.",
        )
      }

      parts.push(
        `- Payment Terms: ${data.paymentTerms?.replace(/_/g, " ") || "Net 30"}`,
        data.latePaymentFee ? `- Late Fee: ${data.latePaymentFee}` : "",
        "",
        "REQUIRED SECTIONS:",
        "1. SCOPE OF SERVICES AND DELIVERABLES",
        "2. COMPENSATION AND PAYMENT SCHEDULE",
        "3. TERM AND RENEWAL",
        "4. PERFORMANCE STANDARDS",
        data.performanceStandards ? `   - SLAs: ${data.performanceStandards}` : "",
        data.acceptanceCriteria ? `   - Acceptance criteria: ${data.acceptanceCriteria}` : "",
        `   - Revision rounds: ${data.revisionLimit || "2"}`,
        "5. INTELLECTUAL PROPERTY",
        `   - Ownership: ${data.ipOwnership?.replace(/_/g, " ") || "client owns all work product"}`,
        "6. CONFIDENTIALITY",
        data.confidentiality === "yes" ? "   Include detailed confidentiality clause." : "",
        "7. REPRESENTATIONS AND WARRANTIES",
        "8. INDEMNIFICATION",
        "9. LIMITATION OF LIABILITY",
        `   - Cap: ${data.liabilityLimitation?.replace(/_/g, " ") || "limited to total fees paid"}`,
        "10. TERMINATION",
        data.earlyTerminationFee === "yes" ? "    Include early termination fee provisions." : "",
        "11. NON-SOLICITATION",
        data.hasNonSolicitation === "yes" ? "    Include non-solicitation clause." : "",
        "12. DISPUTE RESOLUTION",
        `    Method: ${data.disputeResolution?.replace(/_/g, " ") || "mediation"}`,
        "13. GOVERNING LAW",
        "14. ENTIRE AGREEMENT",
        "15. SIGNATURE BLOCKS",
      )

      return parts.filter(Boolean).join("\n")
    }

    // ══════════════════════════════════════════════════════════════════════════
    // 11. PURCHASE AGREEMENT
    // ══════════════════════════════════════════════════════════════════════════
    case "purchase_agreement": {
      const parts = [
        "Generate a complete Purchase Agreement.",
        "",
        "PARTIES:",
        `- Seller: ${data.sellerName || "[SELLER]"}, address: ${data.sellerAddress || "[ADDRESS]"}`,
        `- Buyer: ${data.buyerName || "[BUYER]"}, address: ${data.buyerAddress || "[ADDRESS]"}`,
        "",
      ]

      if (intentId === "asset") {
        parts.push(
          "TYPE: Asset Purchase Agreement",
          `- Items: ${data.itemDescription || "[ASSET DESCRIPTION]"}`,
          `- Condition: ${data.itemCondition?.replace(/_/g, " ") || "as-is"}`,
          data.serialNumbers ? `- Identifiers: ${data.serialNumbers}` : "",
          data.inventoryList ? `- Inventory: ${data.inventoryList}` : "",
        )
      } else if (intentId === "service") {
        parts.push(
          "TYPE: Service Purchase Agreement",
          `- Services: ${data.serviceDescription || "[SERVICE DESCRIPTION]"}`,
          `- Delivery Timeline: ${data.deliveryTimeline || "[TIMELINE]"}`,
        )
      }

      parts.push(
        "",
        "TRANSACTION TERMS:",
        `- Purchase Price: ${data.purchasePrice || "[PRICE]"}`,
        `- Payment Method: ${data.paymentMethod?.replace(/_/g, " ") || "lump sum"}`,
        data.financingTerms ? `- Financing: ${data.financingTerms}` : "",
        data.installmentSchedule ? `- Installments: ${data.installmentSchedule}` : "",
        `- Closing Date: ${data.closingDate || "[DATE]"}`,
        "",
        "REQUIRED SECTIONS:",
        "1. PARTIES AND RECITALS",
        "2. DESCRIPTION OF ITEMS/SERVICES",
        "3. PURCHASE PRICE AND PAYMENT TERMS",
        "4. CLOSING AND TRANSFER OF TITLE",
        "5. REPRESENTATIONS AND WARRANTIES",
      )

      if (data.hasWarranty === "yes") {
        parts.push(`   WARRANTY: ${data.warrantyDetails || "Standard warranty"}, duration: ${data.warrantyDuration?.replace(/_/g, " ") || "90 days"}`)
      }
      if (data.asIsDisclosure === "yes") {
        parts.push("   AS-IS DISCLOSURE: Buyer accepts in current condition without warranty.")
      }

      parts.push(
        "6. INSPECTION AND DUE DILIGENCE",
      )
      if (data.hasInspectionPeriod === "yes") {
        parts.push(
          `   Period: ${data.inspectionPeriod?.replace(/_/g, " ") || "10 business days"}`,
          `   Terms: ${data.inspectionContingency || "Buyer may cancel if material defects found"}`,
        )
      }
      if (data.titleSearch === "yes") {
        parts.push("   Title search required to verify clear ownership.")
      }
      if (data.serviceAcceptanceCriteria) {
        parts.push(`   Service acceptance: ${data.serviceAcceptanceCriteria}`)
      }

      parts.push(
        "7. EARNEST MONEY",
      )
      if (data.hasEarnestMoney === "yes") {
        parts.push(`   Deposit: ${data.earnestMoneyAmount || "[AMOUNT]"}, held in escrow.`)
      } else {
        parts.push("   No earnest money deposit required.")
      }

      parts.push(
        "8. RISK OF LOSS",
        "9. DEFAULT AND REMEDIES",
        "10. INDEMNIFICATION",
        "11. GOVERNING LAW",
        "12. ENTIRE AGREEMENT",
        "13. SIGNATURE BLOCKS",
      )

      return parts.filter(Boolean).join("\n")
    }

    // ══════════════════════════════════════════════════════════════════════════
    // 12. NON-COMPETE AGREEMENT
    // ══════════════════════════════════════════════════════════════════════════
    case "non_compete_agreement": {
      const parts = [
        "Generate a complete Non-Compete Agreement.",
        "",
        "PARTIES:",
        `- Company: ${data.companyName || "[COMPANY]"}, address: ${data.companyAddress || "[ADDRESS]"}`,
        `- Individual: ${data.individualName || "[INDIVIDUAL]"}, address: ${data.individualAddress || "[ADDRESS]"}`,
      ]

      if (intentId === "employee") {
        parts.push(
          `  Title: ${data.employeeTitle || "[TITLE]"}`,
          data.employeeDepartment ? `  Department: ${data.employeeDepartment}` : "",
          "",
          "TYPE: Employment-based Non-Compete",
          `Consideration: ${data.considerationType?.replace(/_/g, " ") || "initial employment"}`,
        )
      } else if (intentId === "contractor") {
        parts.push(
          `  Role: ${data.contractorRole || "[ROLE]"}`,
          "",
          "TYPE: Contractor-based Non-Compete",
          `Consideration: ${data.contractorConsideration || "access to proprietary information"}`,
        )
      }

      parts.push(
        "",
        "RESTRICTIONS:",
        `- Effective Date: ${data.effectiveDate || "[DATE]"}`,
        `- Duration: ${data.duration?.replace(/_/g, " ") || "1 year"} after termination of employment/engagement`,
        `- Geographic Scope: ${data.geographicScope || "[SCOPE]"}`,
        `- Restricted Activities: ${data.restrictedActivities || "[ACTIVITIES]"}`,
        `- Competitor Definition: ${data.competitorDefinition || "[DEFINITION]"}`,
        "",
        "REQUIRED SECTIONS:",
        "1. PARTIES AND RECITALS",
        "2. DEFINITIONS (competitor, restricted activity, restricted territory)",
        "3. NON-COMPETE COVENANT (activities, duration, geographic scope)",
        "4. CONSIDERATION",
      )

      if (data.hasAdditionalCompensation === "yes") {
        parts.push(`   Additional compensation: ${data.additionalCompensationAmount || "[AMOUNT]"}`)
      }

      parts.push(
        "5. EXCEPTIONS AND PERMITTED ACTIVITIES",
        data.permittedActivities ? `   Permitted: ${data.permittedActivities}` : "",
        data.carveOuts ? `   Carve-outs: ${data.carveOuts}` : "",
        data.industryExclusions ? `   Industry exclusions: ${data.industryExclusions}` : "",
        "6. ENFORCEMENT AND REMEDIES",
        `   Remedies: ${data.remedies?.replace(/_/g, " ") || "injunctive relief and damages"}`,
        data.liquidatedDamagesAmount ? `   Liquidated damages: ${data.liquidatedDamagesAmount}` : "",
        "7. SEVERABILITY",
      )

      if (data.severability === "yes") {
        parts.push("   Include severability clause to preserve enforceable portions.")
      }
      if (data.blueLinePencil === "yes") {
        parts.push("   Include BLUE PENCIL / JUDICIAL MODIFICATION clause allowing courts to narrow overly broad restrictions.")
      }

      parts.push(
        "8. ATTORNEY'S FEES",
        `   ${data.attorneyFees?.replace(/_/g, " ") || "prevailing party recovers fees"}`,
        "9. STATE-SPECIFIC ENFORCEABILITY NOTES",
        `   Include specific enforceability considerations for ${data.state || data.STATE || "[STATE]"} law.`,
        "   Note: Some states (CA, ND, OK) broadly ban non-competes. Flag if applicable.",
        "10. GOVERNING LAW",
        "11. ENTIRE AGREEMENT",
        "12. SIGNATURE BLOCKS",
      )

      return parts.filter(Boolean).join("\n")
    }

    default:
      return `Generate a complete, professionally formatted legal document. Include all standard sections for this document type with proper legal language and state-specific provisions.`
  }
}
