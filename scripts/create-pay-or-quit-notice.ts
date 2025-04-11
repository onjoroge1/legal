import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createPayOrQuitNotice() {
  try {
    console.log('Creating Notice to Pay Rent or Quit template...')

    // Get the real estate category
    const realEstateCategory = await prisma.category.findUnique({
      where: { id: 'real-estate' }
    })

    if (!realEstateCategory) {
      throw new Error('Real estate category not found')
    }

    // Create Notice to Pay Rent or Quit template
    const payOrQuitNotice = await prisma.documentTemplate.create({
      data: {
        id: 'pay-or-quit-notice',
        name: 'Notice to Pay Rent or Quit',
        type: 'notice',
        description: 'Official notice demanding payment of overdue rent or vacation of property',
        content: [
          '# Notice to Pay Rent or Quit',
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
          'Additional Occupants:',
          '{additionalOccupants}',
          '',
          'Property Address:',
          '{propertyAddress}',
          '',
          '## Notice Details',
          'Original Lease Date: {originalLeaseDate}',
          '',
          '## Rent Due',
          'Total Amount Due: ${rentDue}',
          'Period Covered: {rentPeriod}',
          '',
          'Late Fees: ${lateFees}',
          '',
          '## Required Action',
          'You must either:',
          '1. Pay the total amount due of ${totalDue} within {daysToPayOrQuit} days, or',
          '2. Vacate the premises by {vacateDate}',
          '',
          '## Payment Instructions',
          'Acceptable Payment Methods: {paymentMethods}',
          'Payment Location: {paymentLocation}',
          'Payment Hours: {paymentHours}',
          '',
          '## Legal Information',
          'Failure to comply with this notice may result in:',
          '{nonComplianceConsequences}',
          '',
          'This notice is governed by: {governingLaws}',
          '',
          'Applicable Eviction Moratorium Information:',
          '{moratoriumInfo}',
          '',
          '## Service Information',
          'Server Name: {serverName}',
          'Service Method: {serviceMethod}',
          '',
          'Proof of Service Documentation: {proofOfService}',
          '',
          '## Contact Information',
          'For questions regarding this notice, contact:',
          '{questionsContact}',
          '',
          '## Signatures',
          '',
          'Landlord/Agent: _________________',
          'Name: {signerName}',
          'Date: {signDate}'
        ].join('\n'),
        categoryId: realEstateCategory.id,
        version: '1.0.0',
        metadata: {
          category: 'real-estate',
          type: 'pay-or-quit',
          version: '1.0.0'
        }
      }
    })

    // Create questionnaire
    const questionnaire = await prisma.questionnaire.create({
      data: {
        name: 'Notice to Pay Rent or Quit Questionnaire',
        description: 'Questions for generating a notice to pay rent or quit',
        templateId: payOrQuitNotice.id,
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
              label: 'What are the names of all other occupants?',
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
              label: 'What is the date of the original lease or rental agreement?',
              type: 'date',
              required: true,
              section: 'Lease Details'
            },
            {
              label: 'What is the date of this notice?',
              type: 'date',
              required: true,
              section: 'Notice Details'
            },
            {
              label: 'What is the total amount of rent due?',
              type: 'text',
              required: true,
              section: 'Rent Due'
            },
            {
              label: 'What period does the unpaid rent cover?',
              type: 'text',
              required: true,
              section: 'Rent Due'
            },
            {
              label: 'Are there any late fees included in the amount due?',
              type: 'text',
              required: true,
              section: 'Rent Due',
              helpText: 'If so, specify amount'
            },
            {
              label: 'How many days does the tenant have to pay or vacate?',
              type: 'text',
              required: true,
              section: 'Timeline'
            },
            {
              label: 'What is the exact date by which the tenant must pay or vacate?',
              type: 'date',
              required: true,
              section: 'Timeline'
            },
            {
              label: 'What is the acceptable method of payment?',
              type: 'textarea',
              required: true,
              section: 'Payment'
            },
            {
              label: 'Where and to whom should payment be made?',
              type: 'textarea',
              required: true,
              section: 'Payment'
            },
            {
              label: 'What days/hours is payment accepted?',
              type: 'text',
              required: true,
              section: 'Payment'
            },
            {
              label: 'What will happen if the tenant fails to pay or vacate by the deadline?',
              type: 'textarea',
              required: true,
              section: 'Consequences'
            },
            {
              label: 'What state and local laws govern this notice?',
              type: 'textarea',
              required: true,
              section: 'Legal'
            },
            {
              label: 'Who will be serving this notice?',
              type: 'text',
              required: true,
              section: 'Service'
            },
            {
              label: 'What is the method of service?',
              type: 'select',
              required: true,
              section: 'Service',
              options: {
                create: [
                  { value: 'personal', label: 'Personal Delivery' },
                  { value: 'posting', label: 'Posting' },
                  { value: 'certified', label: 'Certified Mail' }
                ]
              }
            },
            {
              label: 'Is proof of service documentation required?',
              type: 'select',
              required: true,
              section: 'Service',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Is a statement acknowledging applicable eviction moratoriums needed?',
              type: 'textarea',
              required: true,
              section: 'Legal'
            },
            {
              label: 'Who should the tenant contact with questions?',
              type: 'textarea',
              required: true,
              section: 'Contact'
            },
            {
              label: "What is the landlord's or agent's signature?",
              type: 'text',
              required: true,
              section: 'Signature'
            }
          ]
        }
      }
    })

    console.log('Successfully created template:', {
      payOrQuitNotice: payOrQuitNotice.id,
      questionnaire: questionnaire.id
    })
  } catch (error) {
    console.error('Failed to create template:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the creation
createPayOrQuitNotice() 