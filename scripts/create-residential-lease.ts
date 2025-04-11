import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createResidentialLease() {
  try {
    console.log('Creating Residential Lease Agreement template...')

    // Get the real estate category
    const realEstateCategory = await prisma.category.findUnique({
      where: { id: 'real-estate' }
    })

    if (!realEstateCategory) {
      throw new Error('Real estate category not found')
    }

    // Create Residential Lease Agreement template
    const residentialLease = await prisma.documentTemplate.create({
      data: {
        id: 'residential-lease',
        name: 'Residential Lease Agreement',
        type: 'lease',
        description: 'Standard residential property lease agreement',
        content: [
          '# Residential Lease Agreement',
          '',
          'This Lease Agreement ("Agreement") is made on {signingDate} between:',
          '',
          'Landlord: {landlordName}',
          'Address: {landlordAddress}',
          'Contact: {landlordContact}',
          '',
          'Tenant(s): {tenantNames}',
          '',
          '## 1. Property',
          'Property Address: {propertyAddress}',
          '',
          '## 2. Term',
          'Lease Type: {leaseType}',
          'Start Date: {startDate}',
          'End Date: {endDate}',
          '',
          '## 3. Rent',
          'Monthly Rent Amount: ${monthlyRent}',
          'Due Date: {rentDueDate}',
          'Payment Method: {paymentMethod}',
          'Payment Location: {paymentLocation}',
          '',
          'Late Fee: ${lateFee}',
          'Late Fee Assessment: {lateFeeAssessment}',
          '',
          '## 4. Security Deposit',
          'Security Deposit Amount: ${securityDeposit}',
          'Additional Deposits:',
          '{additionalDeposits}',
          '',
          'Deposit Withholding Conditions:',
          '{depositWithholdingConditions}',
          '',
          '## 5. Occupancy',
          'Authorized Occupants:',
          '{authorizedOccupants}',
          '',
          '## 6. Pets',
          'Pet Policy: {petPolicy}',
          'Allowed Pets: {allowedPets}',
          'Pet Deposit: ${petDeposit}',
          'Pet Rent: ${petRent}',
          '',
          '## 7. Utilities and Services',
          'Utility Responsibilities:',
          '{utilityResponsibilities}',
          '',
          '## 8. Maintenance and Property Care',
          'Landscaping Responsibility: {landscapingResponsibility}',
          'Snow Removal Responsibility: {snowRemovalResponsibility}',
          '',
          'Included Appliances:',
          '{includedAppliances}',
          '',
          'Included Furnishings:',
          '{includedFurnishings}',
          '',
          '## 9. Parking and Storage',
          'Parking Arrangement: {parkingArrangement}',
          'Storage Areas: {storageAreas}',
          '',
          '## 10. Maintenance and Repairs',
          'Tenant Responsibilities:',
          '{tenantMaintenance}',
          '',
          'Landlord Responsibilities:',
          '{landlordMaintenance}',
          '',
          'Repair Request Procedure:',
          '{repairProcedure}',
          '',
          '## 11. Property Modifications',
          'Allowed Modifications:',
          '{allowedModifications}',
          '',
          '## 12. Use Restrictions',
          'Smoking Policy: {smokingPolicy}',
          'Noise Restrictions: {noiseRestrictions}',
          'Business Use: {businessUsePolicy}',
          '',
          '## 13. Subletting and Assignment',
          'Subletting Policy:',
          '{sublettingPolicy}',
          '',
          '## 14. Termination and Renewal',
          'Notice Period: {noticePeriod}',
          'Early Termination: {earlyTermination}',
          '',
          '## 15. Entry and Inspection',
          'Entry Notice Requirements: {entryNotice}',
          '',
          '## 16. Insurance',
          'Required Tenant Insurance:',
          '{requiredInsurance}',
          '',
          '## 17. Rules and Regulations',
          '{rulesAndRegulations}',
          '',
          '## 18. Default and Remedies',
          '{defaultAndRemedies}',
          '',
          '## 19. Governing Law',
          'This agreement is governed by the laws of {governingLaw}',
          '',
          '## 20. Disclosures',
          'Lead-Based Paint Disclosure:',
          '{leadPaintDisclosure}',
          '',
          'Additional Disclosures:',
          '{additionalDisclosures}',
          '',
          '## Signatures',
          '',
          'Landlord: _________________',
          'Date: {landlordSignDate}',
          '',
          'Tenant(s):',
          '_________________',
          'Date: {tenantSignDate}'
        ].join('\n'),
        categoryId: realEstateCategory.id,
        version: '1.0.0',
        metadata: {
          category: 'real-estate',
          type: 'residential-lease',
          version: '1.0.0'
        }
      }
    })

    // Create questionnaire
    const questionnaire = await prisma.questionnaire.create({
      data: {
        name: 'Residential Lease Agreement Questionnaire',
        description: 'Questions for generating a residential lease agreement',
        templateId: residentialLease.id,
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
              label: 'What is the full legal name of each tenant/lessee?',
              type: 'textarea',
              required: true,
              section: 'Parties'
            },
            {
              label: 'What is the complete address of the rental property (including unit number)?',
              type: 'text',
              required: true,
              section: 'Property'
            },
            {
              label: 'What is the term of the lease?',
              type: 'text',
              required: true,
              section: 'Term',
              helpText: 'Start and end dates'
            },
            {
              label: 'Is this a fixed-term lease or month-to-month tenancy?',
              type: 'select',
              required: true,
              section: 'Term',
              options: {
                create: [
                  { value: 'fixed', label: 'Fixed Term' },
                  { value: 'monthly', label: 'Month-to-Month' }
                ]
              }
            },
            {
              label: 'What is the monthly rent amount?',
              type: 'text',
              required: true,
              section: 'Rent'
            },
            {
              label: 'When is rent due each month?',
              type: 'text',
              required: true,
              section: 'Rent'
            },
            {
              label: 'What is the acceptable form of payment?',
              type: 'textarea',
              required: true,
              section: 'Rent'
            },
            {
              label: 'Where and to whom should rent be paid?',
              type: 'textarea',
              required: true,
              section: 'Rent'
            },
            {
              label: 'Is there a late fee?',
              type: 'textarea',
              required: true,
              section: 'Rent',
              helpText: 'Include amount and when it is assessed'
            },
            {
              label: 'What is the amount of the security deposit?',
              type: 'text',
              required: true,
              section: 'Deposits'
            },
            {
              label: 'Are there any other deposits required?',
              type: 'textarea',
              required: false,
              section: 'Deposits',
              helpText: 'Pet, cleaning, etc.'
            },
            {
              label: 'Under what conditions can the security deposit be withheld?',
              type: 'textarea',
              required: true,
              section: 'Deposits'
            },
            {
              label: 'Who are the authorized occupants?',
              type: 'textarea',
              required: true,
              section: 'Occupancy',
              helpText: 'Names and ages'
            },
            {
              label: 'Are pets allowed?',
              type: 'textarea',
              required: true,
              section: 'Pets',
              helpText: 'Include types, sizes, and number allowed'
            },
            {
              label: 'Is there a pet deposit or pet rent?',
              type: 'textarea',
              required: false,
              section: 'Pets',
              helpText: 'Include amounts if applicable'
            },
            {
              label: 'Who is responsible for utilities?',
              type: 'textarea',
              required: true,
              section: 'Utilities',
              helpText: 'List each utility and responsible party'
            },
            {
              label: 'Who is responsible for landscaping and snow removal?',
              type: 'textarea',
              required: true,
              section: 'Maintenance'
            },
            {
              label: 'What appliances are included with the rental?',
              type: 'textarea',
              required: true,
              section: 'Appliances'
            },
            {
              label: 'What furnishings are included?',
              type: 'textarea',
              required: false,
              section: 'Furnishings'
            },
            {
              label: 'What is the parking arrangement?',
              type: 'textarea',
              required: true,
              section: 'Parking'
            },
            {
              label: 'Are there any storage areas included?',
              type: 'textarea',
              required: false,
              section: 'Storage'
            },
            {
              label: "What are the tenant's maintenance responsibilities?",
              type: 'textarea',
              required: true,
              section: 'Maintenance'
            },
            {
              label: "What are the landlord's maintenance responsibilities?",
              type: 'textarea',
              required: true,
              section: 'Maintenance'
            },
            {
              label: 'What is the procedure for requesting repairs?',
              type: 'textarea',
              required: true,
              section: 'Maintenance'
            },
            {
              label: 'What modifications can the tenant make to the property?',
              type: 'textarea',
              required: true,
              section: 'Modifications'
            },
            {
              label: 'Is smoking permitted on the premises?',
              type: 'select',
              required: true,
              section: 'Use Restrictions',
              options: {
                create: [
                  { value: 'no', label: 'No Smoking Allowed' },
                  { value: 'outside', label: 'Outside Only' },
                  { value: 'yes', label: 'Smoking Allowed' }
                ]
              }
            },
            {
              label: 'What are the noise restrictions?',
              type: 'textarea',
              required: true,
              section: 'Use Restrictions'
            },
            {
              label: 'Are there restrictions on business use of the property?',
              type: 'textarea',
              required: true,
              section: 'Use Restrictions'
            },
            {
              label: 'Is subletting or assignment permitted?',
              type: 'textarea',
              required: true,
              section: 'Subletting',
              helpText: 'Include conditions if applicable'
            },
            {
              label: 'What is the required notice period to terminate or renew the lease?',
              type: 'text',
              required: true,
              section: 'Termination'
            },
            {
              label: 'What are the early termination provisions?',
              type: 'textarea',
              required: true,
              section: 'Termination'
            },
            {
              label: "What are the landlord's right of entry provisions?",
              type: 'textarea',
              required: true,
              section: 'Entry',
              helpText: 'Include notice required'
            },
            {
              label: 'What insurance is the tenant required to maintain?',
              type: 'textarea',
              required: true,
              section: 'Insurance'
            },
            {
              label: 'What rules and regulations apply to the property?',
              type: 'textarea',
              required: true,
              section: 'Rules'
            },
            {
              label: 'What are the default provisions and remedies?',
              type: 'textarea',
              required: true,
              section: 'Default'
            },
            {
              label: 'What is the governing law for the agreement?',
              type: 'text',
              required: true,
              section: 'Legal'
            },
            {
              label: 'Are there any lead-based paint or other hazardous material disclosures required?',
              type: 'textarea',
              required: true,
              section: 'Disclosures'
            },
            {
              label: 'What additional disclosures are required by state or local law?',
              type: 'textarea',
              required: true,
              section: 'Disclosures'
            }
          ]
        }
      }
    })

    console.log('Successfully created template:', {
      residentialLease: residentialLease.id,
      questionnaire: questionnaire.id
    })
  } catch (error) {
    console.error('Failed to create template:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the creation
createResidentialLease() 