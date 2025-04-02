import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      console.error("[Sample Templates] No session found")
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    console.log("[Sample Templates] Starting sample template creation")

    // Check if templates already exist
    const existingTemplates = await prisma.documentTemplate.findMany({
      where: {
        id: {
          in: ["apartment-lease", "employment-contract", "nda"]
        }
      }
    })

    if (existingTemplates.length > 0) {
      console.log("[Sample Templates] Templates already exist")
      return NextResponse.json({
        message: "Templates already exist",
        templates: existingTemplates
      })
    }

    // Create apartment lease template
    const apartmentLease = await prisma.documentTemplate.create({
      data: {
        id: "apartment-lease",
        name: "Apartment Lease Agreement",
        type: "lease",
        description: "Standard apartment lease agreement template",
        content: `# Apartment Lease Agreement

This Lease Agreement ("Agreement") is made on {{leaseStartDate}} between:

Landlord: {{landlordName}}
Tenant: {{tenantName}}

Property Address: {{propertyAddress}}

## Terms and Conditions

1. Lease Term: {{leaseTerm}} months
2. Monthly Rent: ${{rentAmount}}
3. Security Deposit: ${{securityDeposit}}
4. Utilities: {{utilities}}

## Additional Terms

{{additionalTerms}}

## Signatures

Landlord: _________________
Tenant: _________________
Date: {{signatureDate}}`,
        version: "1.0",
        category: "real-estate",
        variables: [
          "leaseStartDate",
          "landlordName",
          "tenantName",
          "propertyAddress",
          "leaseTerm",
          "rentAmount",
          "securityDeposit",
          "utilities",
          "additionalTerms",
          "signatureDate"
        ],
        metadata: {
          category: "real-estate",
          type: "lease",
          version: "1.0"
        }
      }
    })

    console.log("[Sample Templates] Created apartment lease template:", apartmentLease.id)

    // Create employment contract template
    const employmentContract = await prisma.documentTemplate.create({
      data: {
        id: "employment-contract",
        name: "Employment Contract",
        type: "employment",
        description: "Standard employment contract template",
        content: `# Employment Contract

This Employment Contract ("Contract") is made on {{startDate}} between:

Employer: {{employerName}}
Employee: {{employeeName}}

## Position and Duties

Position: {{position}}
Department: {{department}}
Start Date: {{startDate}}
Employment Type: {{employmentType}}

## Compensation

Base Salary: ${{baseSalary}}
Benefits: {{benefits}}
Bonus Structure: {{bonusStructure}}

## Terms and Conditions

{{termsAndConditions}}

## Signatures

Employer: _________________
Employee: _________________
Date: {{signatureDate}}`,
        version: "1.0",
        category: "employment",
        variables: [
          "startDate",
          "employerName",
          "employeeName",
          "position",
          "department",
          "employmentType",
          "baseSalary",
          "benefits",
          "bonusStructure",
          "termsAndConditions",
          "signatureDate"
        ],
        metadata: {
          category: "employment",
          type: "contract",
          version: "1.0"
        }
      }
    })

    console.log("[Sample Templates] Created employment contract template:", employmentContract.id)

    // Create NDA template
    const nda = await prisma.documentTemplate.create({
      data: {
        id: "nda",
        name: "Non-Disclosure Agreement",
        type: "nda",
        description: "Standard non-disclosure agreement template",
        content: `# Non-Disclosure Agreement

This Non-Disclosure Agreement ("Agreement") is made on {{startDate}} between:

Disclosing Party: {{disclosingParty}}
Receiving Party: {{receivingParty}}

## Purpose

{{purpose}}

## Confidential Information

{{confidentialInformation}}

## Term

This Agreement shall be effective from {{startDate}} until {{endDate}}.

## Obligations

{{obligations}}

## Signatures

Disclosing Party: _________________
Receiving Party: _________________
Date: {{signatureDate}}`,
        version: "1.0",
        category: "business",
        variables: [
          "startDate",
          "disclosingParty",
          "receivingParty",
          "purpose",
          "confidentialInformation",
          "endDate",
          "obligations",
          "signatureDate"
        ],
        metadata: {
          category: "business",
          type: "nda",
          version: "1.0"
        }
      }
    })

    console.log("[Sample Templates] Created NDA template:", nda.id)

    return NextResponse.json({
      message: "Sample templates created successfully",
      templates: [apartmentLease, employmentContract, nda]
    })

  } catch (error) {
    console.error("[Sample Templates] Error:", error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json(
      { error: "Failed to create sample templates" },
      { status: 500 }
    )
  }
} 