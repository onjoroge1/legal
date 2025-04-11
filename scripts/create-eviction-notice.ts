import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createEvictionNotice() {
  try {
    console.log('Creating Eviction Notice template...')

    // Get the real estate category
    const realEstateCategory = await prisma.category.findUnique({
      where: { id: 'cm9bhpf6d000yvbl0qw9aqww3' }
    })

    if (!realEstateCategory) {
      throw new Error('Real estate category not found')
    }

    // Create Eviction Notice template
    const evictionNotice = await prisma.documentTemplate.create({
      data: {
        id: 'eviction-notice',
        name: 'Eviction Notice',
        type: 'notice',
        description: 'Official notice to evict tenants from a rental property',
        content: [
          '# Eviction Notice',
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
          'Additional Occupants:',
          '{additionalOccupants}',
          '',
          'Property Address:',
          '{propertyAddress}',
          '',
          '## Notice Details',
          'Original Lease Date: {originalLeaseDate}',
          'Notice Type: {noticeType}',
          '',
          '## Reason for Eviction',
          '{evictionReason}',
          '',
          'For Non-Payment:',
          'Amount Due: ${rentDue}',
          'Period Covered: {rentPeriod}',
          '',
          'For Lease Violation:',
          'Violated Provision: {violatedProvision}',
          'Violation Details: {violationDetails}',
          '',
          '## Required Action',
          'Days to Remedy: {daysToRemedy}',
          'Deadline to Pay/Cure/Vacate: {deadlineDate}',
          '',
          '## Payment/Cure Instructions',
          'Acceptable Payment Method: {paymentMethod}',
          'Payment Location: {paymentLocation}',
          '',
          '## Legal Information',
          'Non-Compliance Consequences: {nonComplianceConsequences}',
          'Governing Laws: {governingLaws}',
          'Local Restrictions: {localRestrictions}',
          '',
          '## Service Information',
          'Server Name: {serverName}',
          'Service Method: {serviceMethod}',
          'Proof of Service: {proofOfService}',
          '',
          '## Contact Information',
          'Questions Contact: {questionsContact}',
          '',
          '## Signature',
          '',
          'Landlord/Agent: _________________',
          'Name: {signerName}',
          'Date: {signDate}',
          '',
          'Proof of Service Documentation Attached: □ Yes □ No'
        ].join('\n'),
        categoryId: realEstateCategory.id,
        version: '1.0.0',
        metadata: {
          category: 'real-estate',
          type: 'eviction',
          version: '1.0.0'
        }
      }
    })

    // Create questionnaire
    const questionnaire = await prisma.questionnaire.create({
      data: {
        name: 'Eviction Notice Questionnaire',
        description: 'Questions for generating an eviction notice',
        templateId: evictionNotice.id,
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
              label: 'What are the full names of all other occupants?',
              type: 'textarea',
              required: false,
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
              label: 'What is the date of this eviction notice?',
              type: 'date',
              required: true,
              section: 'Notice Details'
            },
            {
              label: 'What type of eviction notice is this?',
              type: 'select',
              required: true,
              section: 'Notice Type',
              options: {
                create: [
                  { value: 'pay_quit', label: 'Pay or Quit' },
                  { value: 'cure_quit', label: 'Cure or Quit' },
                  { value: 'unconditional_quit', label: 'Unconditional Quit' }
                ]
              }
            },
            {
              label: 'What is the specific reason for eviction?',
              type: 'textarea',
              required: true,
              section: 'Eviction Reason'
            },
            {
              label: 'If for non-payment, what is the amount of rent due?',
              type: 'text',
              required: false,
              section: 'Non-Payment'
            },
            {
              label: 'If for non-payment, what period does the unpaid rent cover?',
              type: 'text',
              required: false,
              section: 'Non-Payment'
            },
            {
              label: 'If for lease violation, what specific provision was violated?',
              type: 'textarea',
              required: false,
              section: 'Lease Violation'
            },
            {
              label: 'If for lease violation, what are the details of the violation?',
              type: 'textarea',
              required: false,
              section: 'Lease Violation',
              helpText: 'Include date and description'
            },
            {
              label: 'How many days does the tenant have to remedy the situation?',
              type: 'text',
              required: true,
              section: 'Remedy Period'
            },
            {
              label: 'What is the exact date by which the tenant must pay/cure/vacate?',
              type: 'date',
              required: true,
              section: 'Deadline'
            },
            {
              label: 'What is the acceptable method of payment or cure?',
              type: 'textarea',
              required: true,
              section: 'Payment/Cure'
            },
            {
              label: 'Where and to whom should payment be made?',
              type: 'textarea',
              required: true,
              section: 'Payment/Cure'
            },
            {
              label: 'What will happen if the tenant fails to comply with the notice?',
              type: 'textarea',
              required: true,
              section: 'Non-Compliance'
            },
            {
              label: 'What state and local laws govern this eviction process?',
              type: 'textarea',
              required: true,
              section: 'Legal'
            },
            {
              label: 'Are there any specific requirements based on local eviction moratoriums or restrictions?',
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
      evictionNotice: evictionNotice.id,
      questionnaire: questionnaire.id
    })
  } catch (error) {
    console.error('Failed to create template:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the creation
createEvictionNotice() 