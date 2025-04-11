import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createCommercialTemplates() {
  try {
    console.log('Creating commercial lease templates...')

    // Get the real estate category
    const realEstateCategory = await prisma.category.findUnique({
      where: { id: 'real-estate' }
    })

    if (!realEstateCategory) {
      throw new Error('Real estate category not found')
    }

    // Create Commercial Lease Agreement template
    const commercialLease = await prisma.documentTemplate.create({
      data: {
        id: 'commercial-lease',
        name: 'Commercial Lease Agreement',
        type: 'lease',
        description: 'Comprehensive commercial property lease agreement',
        content: [
          '# Commercial Lease Agreement',
          '',
          'This Commercial Lease Agreement ("Lease") is made on {signingDate} between:',
          '',
          'Landlord: {landlordName}',
          'Address: {landlordAddress}',
          'Contact: {landlordContact}',
          '',
          'Tenant: {tenantName}',
          'Address: {tenantAddress}',
          'Contact: {tenantContact}',
          'Entity Type: {tenantEntityType}',
          '',
          '## 1. Premises',
          'Property Address: {propertyAddress}',
          'Legal Description: {legalDescription}',
          'Square Footage: {squareFootage}',
          'Intended Use: {intendedUse}',
          '',
          '## 2. Term',
          'Lease Term: {leaseTerm}',
          'Start Date: {startDate}',
          'End Date: {endDate}',
          'Renewal Options: {renewalOptions}',
          '',
          '## 3. Rent and Payments',
          'Base Rent: ${baseRent}',
          'Payment Frequency: {paymentFrequency}',
          'Payment Method: {paymentMethod}',
          'Rent Escalation: {rentEscalation}',
          '',
          '## 4. Security Deposit',
          'Amount: ${securityDeposit}',
          'Withholding Conditions: {depositWithholding}',
          '',
          '## 5. Utilities and Maintenance',
          'Utilities Responsibility: {utilitiesResponsibility}',
          'Maintenance Responsibility: {maintenanceResponsibility}',
          'Property Tax Responsibility: {taxResponsibility}',
          'Insurance Responsibility: {insuranceResponsibility}',
          '',
          '## 6. Common Area Maintenance',
          'CAM Charges: {camCharges}',
          '',
          '## 7. Improvements and Alterations',
          'Tenant Improvement Allowance: {improvementAllowance}',
          'Alteration Restrictions: {alterationRestrictions}',
          '',
          '## 8. Use and Operations',
          'Exclusive Use Provisions: {exclusiveUse}',
          'Signage Rights: {signageRights}',
          '',
          '## 9. Assignment and Subletting',
          '{subleasingTerms}',
          '',
          '## 10. Default and Remedies',
          'Default Provisions: {defaultProvisions}',
          'Landlord Remedies: {landlordRemedies}',
          '',
          '## 11. Insurance and Liability',
          'Required Coverage: {requiredInsurance}',
          'Guarantor Requirements: {guarantorRequirements}',
          '',
          '## 12. Termination and Surrender',
          'Early Termination: {earlyTermination}',
          'Holdover Rate: {holdoverRate}',
          'Premises Return Requirements: {premisesReturn}',
          '',
          '## 13. Additional Provisions',
          'Quiet Enjoyment: {quietEnjoyment}',
          'Landlord Entry Rights: {entryRights}',
          'Dispute Resolution: {disputeResolution}',
          'Governing Law: {governingLaw}',
          '',
          '## 14. Signatures',
          '',
          'Landlord: _________________',
          'Date: {landlordSignDate}',
          '',
          'Tenant: _________________',
          'Date: {tenantSignDate}'
        ].join('\n'),
        categoryId: realEstateCategory.id,
        version: '1.0.0',
        metadata: {
          category: 'real-estate',
          type: 'commercial-lease',
          version: '1.0.0'
        }
      }
    })

    // Create Commercial Lease Application template
    const commercialApplication = await prisma.documentTemplate.create({
      data: {
        id: 'commercial-lease-application',
        name: 'Commercial Lease Application',
        type: 'application',
        description: 'Application form for commercial property lease',
        content: [
          '# Commercial Lease Application',
          '',
          '## 1. Business Information',
          'Business Legal Name: {businessName}',
          'Entity Type: {entityType}',
          'Federal Tax ID (EIN): {taxId}',
          'Years in Operation: {yearsOperating}',
          'Business Description: {businessDescription}',
          '',
          '## 2. Contact Information',
          'Current Business Address: {currentAddress}',
          'Phone: {businessPhone}',
          'Email: {businessEmail}',
          '',
          '## 3. Principal Owners/Officers',
          '{principalOwners}',
          '',
          'Primary Decision Maker:',
          'Name: {decisionMakerName}',
          'Title: {decisionMakerTitle}',
          'Contact: {decisionMakerContact}',
          '',
          '## 4. Property Interest',
          'Desired Property: {desiredProperty}',
          'Desired Lease Term: {desiredTerm}',
          'Desired Move-in Date: {moveInDate}',
          'Intended Use: {intendedUse}',
          'Required Modifications: {requiredModifications}',
          '',
          '## 5. Financial Information',
          'Annual Sales/Revenue:',
          'Current Year: ${currentYearSales}',
          'Previous Year: ${previousYearSales}',
          'Monthly Net Income: ${monthlyNetIncome}',
          '',
          'Outstanding Loans/Debts: {outstandingDebts}',
          'Bankruptcy History: {bankruptcyHistory}',
          'Eviction History: {evictionHistory}',
          '',
          '## 6. Current Leases',
          '{currentLeases}',
          '',
          '## 7. References',
          'Banking References: {bankingReferences}',
          'Trade References: {tradeReferences}',
          'Landlord References: {landlordReferences}',
          '',
          '## 8. Additional Information',
          'Supporting Documents: {supportingDocuments}',
          'Personal Guarantors: {personalGuarantors}',
          '',
          '## 9. Operations',
          'Lease Start Date: {leaseStartDate}',
          'Number of Employees: {employeeCount}',
          'Hours of Operation: {operatingHours}',
          'Signage Requirements: {signageRequirements}',
          'Insurance Coverage: {insuranceCoverage}',
          '',
          '## 10. Certification',
          '',
          'I certify that all information provided in this application is true and accurate.',
          '',
          'Signature: _________________',
          'Name: {signerName}',
          'Title: {signerTitle}',
          'Date: {signingDate}'
        ].join('\n'),
        categoryId: realEstateCategory.id,
        version: '1.0.0',
        metadata: {
          category: 'real-estate',
          type: 'commercial-application',
          version: '1.0.0'
        }
      }
    })

    // Create questionnaire for Commercial Lease Agreement
    const leaseQuestionnaire = await prisma.questionnaire.create({
      data: {
        name: 'Commercial Lease Agreement Questionnaire',
        description: 'Questions for generating a commercial lease agreement',
        templateId: commercialLease.id,
        questions: {
          create: [
            {
              label: 'What is the full legal name of the landlord/lessor?',
              type: 'text',
              required: true,
              section: 'Parties'
            },
            {
              label: "What is the landlord's complete address and contact information?",
              type: 'textarea',
              required: true,
              section: 'Parties'
            },
            {
              label: 'What is the full legal name of the tenant/lessee?',
              type: 'text',
              required: true,
              section: 'Parties'
            },
            {
              label: "What is the tenant's current address and contact information?",
              type: 'textarea',
              required: true,
              section: 'Parties'
            },
            {
              label: 'Is the tenant an individual or business entity?',
              type: 'select',
              required: true,
              section: 'Parties',
              options: {
                create: [
                  { value: 'individual', label: 'Individual' },
                  { value: 'corporation', label: 'Corporation' },
                  { value: 'llc', label: 'LLC' },
                  { value: 'partnership', label: 'Partnership' },
                  { value: 'other', label: 'Other' }
                ]
              }
            },
            {
              label: 'What is the complete street address of the leased premises?',
              type: 'text',
              required: true,
              section: 'Property Details'
            },
            {
              label: 'What is the legal description of the property?',
              type: 'textarea',
              required: false,
              section: 'Property Details'
            },
            {
              label: 'What is the square footage of the leased space?',
              type: 'text',
              required: true,
              section: 'Property Details'
            },
            {
              label: 'What is the intended use of the premises?',
              type: 'textarea',
              required: true,
              section: 'Property Details'
            },
            {
              label: 'What is the term of the lease?',
              type: 'text',
              required: true,
              section: 'Lease Terms'
            },
            {
              label: 'Is there an option to renew?',
              type: 'select',
              required: true,
              section: 'Lease Terms',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'What is the base rent amount?',
              type: 'text',
              required: true,
              section: 'Rent and Payments'
            },
            {
              label: 'How often is rent due?',
              type: 'select',
              required: true,
              section: 'Rent and Payments',
              options: {
                create: [
                  { value: 'monthly', label: 'Monthly' },
                  { value: 'quarterly', label: 'Quarterly' },
                  { value: 'annually', label: 'Annually' }
                ]
              }
            },
            {
              label: 'What is the rent payment method and where should payments be sent?',
              type: 'textarea',
              required: true,
              section: 'Rent and Payments'
            },
            {
              label: 'Is there a rent escalation clause?',
              type: 'textarea',
              required: false,
              section: 'Rent and Payments'
            },
            {
              label: 'What security deposit is required?',
              type: 'text',
              required: true,
              section: 'Security Deposit'
            },
            {
              label: 'Under what conditions can the security deposit be withheld?',
              type: 'textarea',
              required: true,
              section: 'Security Deposit'
            },
            {
              label: 'Who is responsible for utilities?',
              type: 'textarea',
              required: true,
              section: 'Utilities and Maintenance'
            },
            {
              label: 'Who is responsible for maintenance and repairs?',
              type: 'textarea',
              required: true,
              section: 'Utilities and Maintenance'
            },
            {
              label: 'Who is responsible for property taxes?',
              type: 'select',
              required: true,
              section: 'Utilities and Maintenance',
              options: {
                create: [
                  { value: 'landlord', label: 'Landlord' },
                  { value: 'tenant', label: 'Tenant' },
                  { value: 'shared', label: 'Shared' }
                ]
              }
            },
            {
              label: 'Who is responsible for property insurance?',
              type: 'select',
              required: true,
              section: 'Utilities and Maintenance',
              options: {
                create: [
                  { value: 'landlord', label: 'Landlord' },
                  { value: 'tenant', label: 'Tenant' },
                  { value: 'shared', label: 'Shared' }
                ]
              }
            },
            {
              label: 'Are Common Area Maintenance (CAM) charges applicable?',
              type: 'textarea',
              required: true,
              section: 'CAM Charges'
            },
            {
              label: 'Are there any tenant improvement allowances?',
              type: 'textarea',
              required: false,
              section: 'Improvements'
            },
            {
              label: 'Are there any exclusive use provisions?',
              type: 'textarea',
              required: false,
              section: 'Use and Operations'
            },
            {
              label: 'What signage rights does the tenant have?',
              type: 'textarea',
              required: true,
              section: 'Use and Operations'
            },
            {
              label: 'Are there restrictions on alterations or improvements?',
              type: 'textarea',
              required: true,
              section: 'Improvements'
            },
            {
              label: 'What are the requirements for returning the premises at lease end?',
              type: 'textarea',
              required: true,
              section: 'Termination'
            },
            {
              label: 'Are subleasing or assignment permitted?',
              type: 'textarea',
              required: true,
              section: 'Assignment and Subletting'
            },
            {
              label: 'What are the default provisions?',
              type: 'textarea',
              required: true,
              section: 'Default and Remedies'
            },
            {
              label: 'What remedies are available to the landlord in case of default?',
              type: 'textarea',
              required: true,
              section: 'Default and Remedies'
            },
            {
              label: 'What insurance coverage must the tenant maintain?',
              type: 'textarea',
              required: true,
              section: 'Insurance'
            },
            {
              label: 'Are there any guarantor requirements?',
              type: 'textarea',
              required: false,
              section: 'Insurance'
            },
            {
              label: 'What are the circumstances for early termination?',
              type: 'textarea',
              required: true,
              section: 'Termination'
            },
            {
              label: 'What is the holdover rent rate if tenant remains after lease expiration?',
              type: 'text',
              required: true,
              section: 'Termination'
            },
            {
              label: 'What are the quiet enjoyment provisions?',
              type: 'textarea',
              required: true,
              section: 'Additional Provisions'
            },
            {
              label: 'What are the entry rights of the landlord?',
              type: 'textarea',
              required: true,
              section: 'Additional Provisions'
            },
            {
              label: 'What dispute resolution methods will be used?',
              type: 'textarea',
              required: true,
              section: 'Additional Provisions'
            },
            {
              label: 'What is the governing law for the agreement?',
              type: 'text',
              required: true,
              section: 'Additional Provisions'
            }
          ]
        }
      }
    })

    // Create questionnaire for Commercial Lease Application
    const applicationQuestionnaire = await prisma.questionnaire.create({
      data: {
        name: 'Commercial Lease Application Questionnaire',
        description: 'Questions for commercial lease application',
        templateId: commercialApplication.id,
        questions: {
          create: [
            {
              label: 'What is the full legal name of the business applying for the lease?',
              type: 'text',
              required: true,
              section: 'Business Information'
            },
            {
              label: 'What type of business entity is it?',
              type: 'select',
              required: true,
              section: 'Business Information',
              options: {
                create: [
                  { value: 'llc', label: 'LLC' },
                  { value: 'corporation', label: 'Corporation' },
                  { value: 'sole_proprietorship', label: 'Sole Proprietorship' },
                  { value: 'partnership', label: 'Partnership' },
                  { value: 'other', label: 'Other' }
                ]
              }
            },
            {
              label: "What is the business's federal tax ID (EIN)?",
              type: 'text',
              required: true,
              section: 'Business Information'
            },
            {
              label: 'How long has the business been operating?',
              type: 'text',
              required: true,
              section: 'Business Information'
            },
            {
              label: 'What is the nature of the business/business description?',
              type: 'textarea',
              required: true,
              section: 'Business Information'
            },
            {
              label: 'What is the current business address?',
              type: 'text',
              required: true,
              section: 'Contact Information'
            },
            {
              label: 'What is the business phone number and email?',
              type: 'text',
              required: true,
              section: 'Contact Information'
            },
            {
              label: 'Who are the principal owners/officers?',
              type: 'textarea',
              required: true,
              section: 'Business Information',
              helpText: 'Include names, titles, and ownership percentages'
            },
            {
              label: 'What are the contact details for the primary decision maker?',
              type: 'textarea',
              required: true,
              section: 'Contact Information'
            },
            {
              label: 'What premises is the business applying for?',
              type: 'text',
              required: true,
              section: 'Property Interest'
            },
            {
              label: 'What is the desired lease term?',
              type: 'text',
              required: true,
              section: 'Property Interest'
            },
            {
              label: 'What is the desired move-in date?',
              type: 'date',
              required: true,
              section: 'Property Interest'
            },
            {
              label: 'What will be the intended use of the premises?',
              type: 'textarea',
              required: true,
              section: 'Property Interest'
            },
            {
              label: 'What modifications or improvements would the business need to make?',
              type: 'textarea',
              required: false,
              section: 'Property Interest'
            },
            {
              label: "What are the business's gross annual sales/revenue for the past 2-3 years?",
              type: 'textarea',
              required: true,
              section: 'Financial Information'
            },
            {
              label: "What is the business's monthly net income?",
              type: 'text',
              required: true,
              section: 'Financial Information'
            },
            {
              label: 'Does the business have any outstanding loans or debts?',
              type: 'textarea',
              required: true,
              section: 'Financial Information'
            },
            {
              label: 'Has the business ever filed for bankruptcy?',
              type: 'select',
              required: true,
              section: 'Financial Information',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Has the business ever been evicted?',
              type: 'select',
              required: true,
              section: 'Financial Information',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Does the business currently lease other properties?',
              type: 'textarea',
              required: true,
              section: 'Current Leases'
            },
            {
              label: "Who are the business's banking references?",
              type: 'textarea',
              required: true,
              section: 'References',
              helpText: 'Include bank name, contact, and account numbers'
            },
            {
              label: "Who are the business's trade references?",
              type: 'textarea',
              required: true,
              section: 'References'
            },
            {
              label: "Who are the business's current and previous landlords?",
              type: 'textarea',
              required: true,
              section: 'References'
            },
            {
              label: 'What supporting documents will be provided?',
              type: 'textarea',
              required: true,
              section: 'Documentation',
              helpText: 'List tax returns, financial statements, etc.'
            },
            {
              label: 'Will personal guarantees be provided?',
              type: 'textarea',
              required: true,
              section: 'Documentation'
            },
            {
              label: 'What is the desired lease commencement date?',
              type: 'date',
              required: true,
              section: 'Operations'
            },
            {
              label: 'How many employees will work at this location?',
              type: 'text',
              required: true,
              section: 'Operations'
            },
            {
              label: "What are the business's hours of operation?",
              type: 'text',
              required: true,
              section: 'Operations'
            },
            {
              label: 'Will the business need signage?',
              type: 'textarea',
              required: true,
              section: 'Operations'
            },
            {
              label: 'What insurance coverage does the business carry?',
              type: 'textarea',
              required: true,
              section: 'Insurance'
            }
          ]
        }
      }
    })

    console.log('Successfully created templates:', {
      commercialLease: commercialLease.id,
      commercialApplication: commercialApplication.id,
      leaseQuestionnaire: leaseQuestionnaire.id,
      applicationQuestionnaire: applicationQuestionnaire.id
    })
  } catch (error) {
    console.error('Failed to create templates:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the creation
createCommercialTemplates() 