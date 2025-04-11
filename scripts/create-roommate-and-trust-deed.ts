import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createRoommateAndTrustDeedTemplates() {
  try {
    console.log('Creating Roommate Agreement and Deed of Trust templates...')

    // Get the real estate category
    const realEstateCategory = await prisma.category.findUnique({
      where: { id: 'real-estate' }
    })

    if (!realEstateCategory) {
      throw new Error('Real estate category not found')
    }

    // Create Roommate Agreement template
    const roommateAgreement = await prisma.documentTemplate.create({
      data: {
        id: 'roommate-agreement',
        name: 'Roommate Agreement',
        type: 'agreement',
        description: 'A comprehensive agreement between roommates sharing a rental property',
        content: [
          '# Roommate Agreement',
          '',
          'This Roommate Agreement is made on {agreementDate} between the following roommates:',
          '{roommateNames}',
          '',
          '## 1. Property',
          'Address: {propertyAddress}',
          '',
          '## 2. Lease Information',
          'Original Lease Date: {leaseDate}',
          'Primary Tenant(s): {primaryTenant}',
          '',
          '## 3. Rent and Security Deposit',
          'Total Monthly Rent: ${totalRent}',
          '',
          'Rent Division:',
          '{rentDivision}',
          '',
          'Rent Due Date: {rentDueDate}',
          'Rent Collection Method: {rentCollection}',
          '',
          'Security Deposit Responsibilities:',
          '{depositResponsibilities}',
          '',
          'Security Deposit Return Plan:',
          '{depositReturn}',
          '',
          '## 4. Utilities and Household Expenses',
          'Utility Division Method: {utilityDivision}',
          '',
          'Utility Accounts:',
          '{utilityAccounts}',
          '',
          'Household Supplies:',
          '{householdSupplies}',
          '',
          'Food Arrangements:',
          '{foodArrangements}',
          '',
          '## 5. Household Responsibilities',
          'Chore Division:',
          '{choreDivision}',
          '',
          '## 6. House Rules',
          'Guest Policy:',
          '{guestPolicy}',
          '',
          'Quiet Hours:',
          '{quietHours}',
          '',
          'Party/Gathering Rules:',
          '{partyRules}',
          '',
          'Smoking Policy:',
          '{smokingPolicy}',
          '',
          'Alcohol/Substance Policy:',
          '{substancePolicy}',
          '',
          'Pet Policy:',
          '{petPolicy}',
          '',
          '## 7. Personal Property and Common Areas',
          'Personal Property Rules:',
          '{propertyRules}',
          '',
          'Common Areas:',
          '{commonAreas}',
          '',
          'Private Areas:',
          '{privateAreas}',
          '',
          '## 8. Moving Out',
          'Notice Period:',
          '{noticePeriod}',
          '',
          'Replacement Roommate Process:',
          '{replacementProcess}',
          '',
          '## 9. Default and Dispute Resolution',
          'Late Payment Consequences:',
          '{latePaymentConsequences}',
          '',
          'Dispute Resolution Process:',
          '{disputeResolution}',
          '',
          'Agreement Violations:',
          '{violationConsequences}',
          '',
          '## 10. Modifications',
          'This agreement can be modified by: {modificationProcess}',
          '',
          '## Signatures',
          '',
          '{signatureBlock}'
        ].join('\n'),
        categoryId: realEstateCategory.id,
        version: '1.0.0',
        metadata: {
          category: 'real-estate',
          type: 'agreement',
          version: '1.0.0'
        }
      }
    })

    // Create Roommate Agreement questionnaire
    const roommateAgreementQuestionnaire = await prisma.questionnaire.create({
      data: {
        name: 'Roommate Agreement Questionnaire',
        description: 'Questions for generating a roommate agreement',
        templateId: roommateAgreement.id,
        questions: {
          create: [
            {
              label: 'What is the complete address of the rental property?',
              type: 'text',
              required: true,
              section: 'Property Information'
            },
            {
              label: 'What are the full names of all roommates?',
              type: 'textarea',
              required: true,
              section: 'Roommate Information'
            },
            {
              label: 'What is the date of the original lease agreement?',
              type: 'date',
              required: true,
              section: 'Lease Information'
            },
            {
              label: 'Who is the primary tenant on the lease with the landlord?',
              type: 'text',
              required: true,
              section: 'Lease Information'
            },
            {
              label: 'What is the total monthly rent for the entire unit?',
              type: 'text',
              required: true,
              section: 'Rent'
            },
            {
              label: 'How will the rent be divided among roommates?',
              type: 'textarea',
              required: true,
              section: 'Rent'
            },
            {
              label: "What is each roommate's specific amount of rent?",
              type: 'textarea',
              required: true,
              section: 'Rent'
            },
            {
              label: 'What is the rent payment due date?',
              type: 'text',
              required: true,
              section: 'Rent'
            },
            {
              label: 'How will rent be collected and submitted to the landlord?',
              type: 'textarea',
              required: true,
              section: 'Rent'
            },
            {
              label: 'How will security deposit responsibilities be handled?',
              type: 'textarea',
              required: true,
              section: 'Security Deposit'
            },
            {
              label: 'How will the security deposit be returned at move-out?',
              type: 'textarea',
              required: true,
              section: 'Security Deposit'
            },
            {
              label: 'How will utilities be divided?',
              type: 'select',
              required: true,
              section: 'Utilities',
              options: {
                create: [
                  { value: 'equal', label: 'Equal Shares' },
                  { value: 'usage', label: 'Based on Usage' },
                  { value: 'custom', label: 'Custom Division' }
                ]
              }
            },
            {
              label: "Which roommate's name will be on each utility account?",
              type: 'textarea',
              required: true,
              section: 'Utilities'
            },
            {
              label: 'How will household supplies be purchased and shared?',
              type: 'textarea',
              required: true,
              section: 'Household Expenses'
            },
            {
              label: 'How will food be handled?',
              type: 'select',
              required: true,
              section: 'Food',
              options: {
                create: [
                  { value: 'separate', label: 'Separate' },
                  { value: 'shared', label: 'Shared' },
                  { value: 'mixed', label: 'Mixed (Some Shared, Some Separate)' }
                ]
              }
            },
            {
              label: 'How will household chores be divided?',
              type: 'textarea',
              required: true,
              section: 'Household Responsibilities'
            },
            {
              label: 'What are the rules for guests?',
              type: 'textarea',
              required: true,
              section: 'House Rules',
              helpText: 'Include frequency, duration, overnight stays, etc.'
            },
            {
              label: 'What are the quiet hours?',
              type: 'text',
              required: true,
              section: 'House Rules'
            },
            {
              label: 'What are the rules regarding parties or gatherings?',
              type: 'textarea',
              required: true,
              section: 'House Rules'
            },
            {
              label: 'What are the smoking policies?',
              type: 'textarea',
              required: true,
              section: 'House Rules'
            },
            {
              label: 'What are the alcohol/substance policies?',
              type: 'textarea',
              required: true,
              section: 'House Rules'
            },
            {
              label: 'What are the pet policies?',
              type: 'textarea',
              required: true,
              section: 'House Rules'
            },
            {
              label: 'How will personal property be respected?',
              type: 'textarea',
              required: true,
              section: 'Property Rules'
            },
            {
              label: 'What common areas and items can be used by all roommates?',
              type: 'textarea',
              required: true,
              section: 'Common Areas'
            },
            {
              label: 'What private areas are off-limits to other roommates?',
              type: 'textarea',
              required: true,
              section: 'Private Areas'
            },
            {
              label: 'What is the procedure if a roommate wants to move out before the lease ends?',
              type: 'textarea',
              required: true,
              section: 'Moving Out'
            },
            {
              label: 'What notice period is required if a roommate wants to move out?',
              type: 'text',
              required: true,
              section: 'Moving Out'
            },
            {
              label: 'What is the process for finding a replacement roommate?',
              type: 'textarea',
              required: true,
              section: 'Moving Out'
            },
            {
              label: 'Do all roommates need to approve a new roommate?',
              type: 'select',
              required: true,
              section: 'Moving Out',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' },
                  { value: 'majority', label: 'Majority Approval Required' }
                ]
              }
            },
            {
              label: 'What happens if a roommate does not pay rent or utilities on time?',
              type: 'textarea',
              required: true,
              section: 'Default and Resolution'
            },
            {
              label: 'What is the procedure for resolving disputes?',
              type: 'textarea',
              required: true,
              section: 'Default and Resolution'
            },
            {
              label: 'How will violations of the roommate agreement be handled?',
              type: 'textarea',
              required: true,
              section: 'Default and Resolution'
            },
            {
              label: 'Under what circumstances can a roommate be asked to leave?',
              type: 'textarea',
              required: true,
              section: 'Default and Resolution'
            },
            {
              label: "What happens if the landlord terminates the lease due to a roommate's actions?",
              type: 'textarea',
              required: true,
              section: 'Default and Resolution'
            },
            {
              label: 'How can this roommate agreement be modified?',
              type: 'textarea',
              required: true,
              section: 'Modifications'
            }
          ]
        }
      }
    })

    // Create Deed of Trust template
    const deedOfTrust = await prisma.documentTemplate.create({
      data: {
        id: 'deed-of-trust',
        name: 'Deed of Trust',
        type: 'deed',
        description: 'A legal document used to secure a loan with real property as collateral',
        content: [
          '# Deed of Trust',
          '',
          'This Deed of Trust is made on {deedDate} between:',
          '',
          'TRUSTOR/BORROWER(S):',
          '{trustorName}',
          'residing at {trustorAddress}',
          '',
          'BENEFICIARY/LENDER:',
          '{beneficiaryName}',
          'residing at {beneficiaryAddress}',
          '',
          'TRUSTEE:',
          '{trusteeName}',
          'residing at {trusteeAddress}',
          '',
          '## Property',
          'Legal Description:',
          '{legalDescription}',
          '',
          'Property Address: {propertyAddress}',
          'County: {propertyCounty}',
          'State: {propertyState}',
          '',
          '## Loan Information',
          'Principal Amount: ${principalAmount}',
          'Interest Rate: {interestRate}%',
          'Maturity Date: {maturityDate}',
          '',
          'Payment Terms:',
          'Monthly Payment: ${monthlyPayment}',
          'Due Date: {paymentDueDate}',
          '',
          'Balloon Payment (if applicable):',
          '{balloonPayment}',
          '',
          'Associated Promissory Note:',
          'Date: {noteDate}',
          '',
          '## Default Provisions',
          '{defaultProvisions}',
          '',
          'Grace Period: {gracePeriod}',
          '',
          'Late Payment Penalties:',
          '{latePenalties}',
          '',
          'Prepayment Penalties:',
          '{prepaymentPenalties}',
          '',
          '## Insurance and Taxes',
          'Insurance Requirements:',
          '{insuranceRequirements}',
          '',
          'Tax Responsibilities:',
          '{taxResponsibilities}',
          '',
          'Impound/Escrow Requirements:',
          '{impoundRequirements}',
          '',
          '## Property Maintenance',
          '{maintenanceRequirements}',
          '',
          '## Transfer Restrictions',
          '{transferRestrictions}',
          '',
          '## Acceleration Conditions',
          '{accelerationConditions}',
          '',
          '## Reconveyance',
          '{reconveyanceProcess}',
          '',
          '## Foreclosure',
          '{foreclosureProcess}',
          '',
          '## Subordination',
          '{subordinationProvisions}',
          '',
          '## Additional Provisions',
          '{additionalProvisions}',
          '',
          '## Signatures',
          '',
          '_________________',
          'Trustor/Borrower Signature',
          '',
          '_________________',
          'Beneficiary/Lender Signature',
          '',
          '_________________',
          'Trustee Signature',
          '',
          'NOTARY ACKNOWLEDGMENT',
          '{notaryAcknowledgment}'
        ].join('\n'),
        categoryId: realEstateCategory.id,
        version: '1.0.0',
        metadata: {
          category: 'real-estate',
          type: 'deed',
          version: '1.0.0'
        }
      }
    })

    // Create Deed of Trust questionnaire
    const deedOfTrustQuestionnaire = await prisma.questionnaire.create({
      data: {
        name: 'Deed of Trust Questionnaire',
        description: 'Questions for generating a deed of trust',
        templateId: deedOfTrust.id,
        questions: {
          create: [
            {
              label: 'What is the date of the deed of trust?',
              type: 'date',
              required: true,
              section: 'Basic Information'
            },
            {
              label: 'What is the full legal name of the trustor/borrower(s)?',
              type: 'text',
              required: true,
              section: 'Trustor Information'
            },
            {
              label: 'What is the address of the trustor/borrower(s)?',
              type: 'textarea',
              required: true,
              section: 'Trustor Information'
            },
            {
              label: 'What is the full legal name of the beneficiary/lender?',
              type: 'text',
              required: true,
              section: 'Beneficiary Information'
            },
            {
              label: 'What is the address of the beneficiary/lender?',
              type: 'textarea',
              required: true,
              section: 'Beneficiary Information'
            },
            {
              label: 'What is the full legal name of the trustee?',
              type: 'text',
              required: true,
              section: 'Trustee Information'
            },
            {
              label: 'What is the address of the trustee?',
              type: 'textarea',
              required: true,
              section: 'Trustee Information'
            },
            {
              label: 'What is the legal description of the property?',
              type: 'textarea',
              required: true,
              section: 'Property Information'
            },
            {
              label: 'What is the street address of the property?',
              type: 'text',
              required: true,
              section: 'Property Information'
            },
            {
              label: 'What county and state is the property located in?',
              type: 'text',
              required: true,
              section: 'Property Information'
            },
            {
              label: 'What is the principal amount of the loan?',
              type: 'text',
              required: true,
              section: 'Loan Terms'
            },
            {
              label: 'What is the interest rate of the loan?',
              type: 'text',
              required: true,
              section: 'Loan Terms'
            },
            {
              label: 'What is the maturity date of the loan?',
              type: 'date',
              required: true,
              section: 'Loan Terms'
            },
            {
              label: 'What are the payment terms?',
              type: 'textarea',
              required: true,
              section: 'Payment Terms',
              helpText: 'Include monthly payment amount and due date'
            },
            {
              label: 'Are there any balloon payment provisions?',
              type: 'textarea',
              required: false,
              section: 'Payment Terms'
            },
            {
              label: 'Is there a promissory note associated with this deed of trust? What is its date?',
              type: 'text',
              required: true,
              section: 'Associated Documents'
            },
            {
              label: 'What happens in the event of default?',
              type: 'textarea',
              required: true,
              section: 'Default Provisions'
            },
            {
              label: 'What grace period exists for late payments?',
              type: 'text',
              required: true,
              section: 'Default Provisions'
            },
            {
              label: 'Are there late payment penalties?',
              type: 'textarea',
              required: true,
              section: 'Penalties'
            },
            {
              label: 'Are there prepayment penalties?',
              type: 'textarea',
              required: true,
              section: 'Penalties'
            },
            {
              label: 'What property insurance requirements are there?',
              type: 'textarea',
              required: true,
              section: 'Insurance and Taxes'
            },
            {
              label: 'Who is responsible for paying property taxes?',
              type: 'text',
              required: true,
              section: 'Insurance and Taxes'
            },
            {
              label: 'Are there any impound/escrow requirements for taxes and insurance?',
              type: 'textarea',
              required: true,
              section: 'Insurance and Taxes'
            },
            {
              label: 'What are the requirements regarding property maintenance?',
              type: 'textarea',
              required: true,
              section: 'Maintenance'
            },
            {
              label: 'Are there restrictions on selling or transferring the property?',
              type: 'textarea',
              required: true,
              section: 'Transfer Restrictions',
              helpText: 'Include due-on-sale clause if applicable'
            },
            {
              label: 'Under what conditions can the lender accelerate the loan?',
              type: 'textarea',
              required: true,
              section: 'Acceleration'
            },
            {
              label: 'What is the process for reconveyance upon payment in full?',
              type: 'textarea',
              required: true,
              section: 'Reconveyance'
            },
            {
              label: 'What is the process for foreclosure in case of default?',
              type: 'textarea',
              required: true,
              section: 'Foreclosure'
            },
            {
              label: 'Are there any subordination provisions?',
              type: 'textarea',
              required: true,
              section: 'Subordination'
            },
            {
              label: 'Are there any riders or addenda to this deed of trust?',
              type: 'textarea',
              required: false,
              section: 'Additional Provisions'
            }
          ]
        }
      }
    })

    console.log('Successfully created templates:', {
      roommateAgreement: roommateAgreement.id,
      roommateAgreementQuestionnaire: roommateAgreementQuestionnaire.id,
      deedOfTrust: deedOfTrust.id,
      deedOfTrustQuestionnaire: deedOfTrustQuestionnaire.id
    })
  } catch (error) {
    console.error('Failed to create templates:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the creation
createRoommateAndTrustDeedTemplates() 