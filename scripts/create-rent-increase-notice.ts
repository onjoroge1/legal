import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createRentIncreaseNotice() {
  try {
    console.log('Creating Rent Increase Notice template...')

    // Get the real estate category
    const realEstateCategory = await prisma.category.findUnique({
      where: { id: 'cm9bhpf6d000yvbl0qw9aqww3' }
    })

    if (!realEstateCategory) {
      throw new Error('Real estate category not found')
    }

    // Create Rent Increase Notice template
    const rentIncreaseNotice = await prisma.documentTemplate.create({
      data: {
        id: 'rent-increase-notice',
        name: 'Rent Increase Notice',
        type: 'notice',
        description: 'Official notice of rent increase for rental property',
        content: [
          '# Rent Increase Notice',
          '',
          'Date: {noticeDate}',
          '',
          'From:',
          'Landlord: {landlordName}',
          'Address: {landlordAddress}',
          'Contact: {landlordContact}',
          '',
          'To:',
          'Tenant: {tenantName}',
          '',
          'Property Address:',
          '{propertyAddress}',
          '',
          '## Notice Details',
          'Original Lease Date: {originalLeaseDate}',
          '',
          '## Rent Increase Information',
          'Current Rent Amount: ${currentRent}',
          'New Rent Amount: ${newRent}',
          'Dollar Amount Increase: ${rentIncrease}',
          'Percentage Increase: {percentageIncrease}%',
          '',
          'Effective Date: {effectiveDate}',
          '',
          'Notice Period: {noticePeriod} days',
          '(Required by state law: {requiredNotice} days)',
          '',
          'Lease Status: {leaseStatus}',
          '',
          '## Reason for Increase',
          '{increaseReason}',
          '',
          '## Additional Changes',
          'Changes to Other Fees/Charges:',
          '{feeChanges}',
          '',
          '## Acknowledgment',
          'Receipt Acknowledgment Method:',
          '{acknowledgmentMethod}',
          '',
          '## Questions',
          'For questions about this increase, please contact:',
          '{questionsContact}',
          '',
          '## Tenant Options',
          'If you do not wish to accept this increase:',
          '{tenantOptions}',
          '',
          '## Delivery Method',
          'This notice is being delivered via: {deliveryMethod}',
          '',
          '## Signatures',
          '',
          'Landlord/Agent: _________________',
          'Date: {landlordSignDate}',
          '',
          'Tenant Acknowledgment: _________________',
          'Date: {tenantSignDate}'
        ].join('\n'),
        categoryId: realEstateCategory.id,
        version: '1.0.0',
        metadata: {
          category: 'real-estate',
          type: 'rent-increase',
          version: '1.0.0'
        }
      }
    })

    // Create questionnaire
    const questionnaire = await prisma.questionnaire.create({
      data: {
        name: 'Rent Increase Notice Questionnaire',
        description: 'Questions for generating a rent increase notice',
        templateId: rentIncreaseNotice.id,
        questions: {
          create: [
            {
              label: 'What is the full legal name of the landlord/lessor?',
              type: 'text',
              required: true,
              section: 'Parties'
            },
            {
              label: "What is the landlord's address and contact information?",
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
              label: 'What is the complete address of the rental property (including unit number)?',
              type: 'text',
              required: true,
              section: 'Property'
            },
            {
              label: 'What is the date of the original lease or rental agreement?',
              type: 'date',
              required: true,
              section: 'Lease Details'
            },
            {
              label: 'What is the date of this rent increase notice?',
              type: 'date',
              required: true,
              section: 'Notice Details'
            },
            {
              label: 'What is the current rent amount?',
              type: 'text',
              required: true,
              section: 'Rent Details'
            },
            {
              label: 'What is the new rent amount?',
              type: 'text',
              required: true,
              section: 'Rent Details'
            },
            {
              label: 'What is the dollar amount of the increase?',
              type: 'text',
              required: true,
              section: 'Rent Details'
            },
            {
              label: 'What is the percentage of the increase?',
              type: 'text',
              required: true,
              section: 'Rent Details'
            },
            {
              label: 'What is the effective date of the rent increase?',
              type: 'date',
              required: true,
              section: 'Timing'
            },
            {
              label: "How many days' notice is being provided?",
              type: 'text',
              required: true,
              section: 'Timing'
            },
            {
              label: 'What is the minimum notice required by state law?',
              type: 'text',
              required: true,
              section: 'Legal Requirements'
            },
            {
              label: 'Is this increase occurring at the end of a lease term or during a month-to-month tenancy?',
              type: 'select',
              required: true,
              section: 'Lease Status',
              options: {
                create: [
                  { value: 'lease_end', label: 'End of Lease Term' },
                  { value: 'month_to_month', label: 'Month-to-Month Tenancy' }
                ]
              }
            },
            {
              label: 'What is the reason for the rent increase?',
              type: 'textarea',
              required: false,
              section: 'Reason',
              helpText: 'Optional, but may be required in some jurisdictions'
            },
            {
              label: 'Are there any changes to other fees or charges?',
              type: 'textarea',
              required: false,
              section: 'Additional Changes'
            },
            {
              label: 'How should the tenant acknowledge receipt of this notice?',
              type: 'textarea',
              required: true,
              section: 'Acknowledgment'
            },
            {
              label: 'Who should the tenant contact with questions about the increase?',
              type: 'textarea',
              required: true,
              section: 'Contact Information'
            },
            {
              label: 'What options does the tenant have if they do not wish to accept the increase?',
              type: 'textarea',
              required: true,
              section: 'Tenant Options'
            },
            {
              label: 'What method of delivery is being used for this notice?',
              type: 'select',
              required: true,
              section: 'Delivery',
              options: {
                create: [
                  { value: 'personal', label: 'Personal Delivery' },
                  { value: 'certified', label: 'Certified Mail' },
                  { value: 'regular', label: 'Regular Mail' },
                  { value: 'posting', label: 'Posting on Property' },
                  { value: 'email', label: 'Email' }
                ]
              }
            }
          ]
        }
      }
    })

    console.log('Successfully created template:', {
      rentIncreaseNotice: rentIncreaseNotice.id,
      questionnaire: questionnaire.id
    })
  } catch (error) {
    console.error('Failed to create template:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the creation
createRentIncreaseNotice() 