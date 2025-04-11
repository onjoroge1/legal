import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createLeaseTerminationNotice() {
  try {
    console.log('Creating Commercial Lease Termination Notice template...')

    // Get the real estate category
    const realEstateCategory = await prisma.category.findUnique({
      where: { id: 'real-estate' }
    })

    if (!realEstateCategory) {
      throw new Error('Real estate category not found')
    }

    // Create Commercial Lease Termination Notice template
    const terminationNotice = await prisma.documentTemplate.create({
      data: {
        id: 'commercial-lease-termination-notice',
        name: 'Commercial Lease Termination Notice',
        type: 'notice',
        description: 'Official notice to terminate a commercial lease agreement',
        content: [
          '# Commercial Lease Termination Notice',
          '',
          'Date of Notice: {noticeDate}',
          '',
          'From:',
          'Landlord: {landlordName}',
          'Address: {landlordAddress}',
          'Contact: {landlordContact}',
          '',
          'To:',
          'Tenant: {tenantName}',
          'Address: {tenantAddress}',
          'Contact: {tenantContact}',
          '',
          'Re: Termination of Lease Agreement for:',
          'Property Address: {propertyAddress}',
          '',
          '## Notice Details',
          'Original Lease Date: {originalLeaseDate}',
          'Current Termination Date: {currentTerminationDate}',
          'Effective Termination Date: {effectiveTerminationDate}',
          '',
          'Initiating Party: {initiatingParty}',
          '',
          '## Reason for Termination',
          '{terminationReason}',
          '',
          'Lease Violations (if applicable):',
          '{leaseViolations}',
          '',
          'Previous Cure Notices (if applicable):',
          '{previousCureNotices}',
          '',
          '## Required Notice Period',
          '{requiredNoticePeriod}',
          '',
          '## Tenant Obligations',
          'Premises Condition Requirements:',
          '{premisesConditions}',
          '',
          'Keys/Access Return Procedure:',
          '{keyReturnProcedure}',
          '',
          'Final Inspection Process:',
          '{inspectionProcess}',
          '',
          '## Financial Matters',
          'Security Deposit Handling:',
          '{depositHandling}',
          '',
          'Early Termination Fees:',
          '{terminationFees}',
          '',
          'Outstanding Amounts Due:',
          '{outstandingAmounts}',
          '',
          '## Additional Requirements',
          'Personal Property Removal:',
          '{propertyRemoval}',
          '',
          'Non-Compliance Consequences:',
          '{nonComplianceConsequences}',
          '',
          '## Acknowledgment',
          'Receipt Acknowledgment Method:',
          '{acknowledgmentMethod}',
          '',
          'Questions Contact:',
          '{questionsContact}',
          '',
          'Delivery Method:',
          '{deliveryMethod}',
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
          type: 'termination-notice',
          version: '1.0.0'
        }
      }
    })

    // Create questionnaire
    const questionnaire = await prisma.questionnaire.create({
      data: {
        name: 'Commercial Lease Termination Notice Questionnaire',
        description: 'Questions for generating a commercial lease termination notice',
        templateId: terminationNotice.id,
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
              label: "What is the tenant's current address and contact information?",
              type: 'textarea',
              required: true,
              section: 'Parties'
            },
            {
              label: 'What is the complete address of the leased premises?',
              type: 'text',
              required: true,
              section: 'Property'
            },
            {
              label: 'What is the date of the original lease agreement?',
              type: 'date',
              required: true,
              section: 'Lease Details'
            },
            {
              label: 'What is the current termination date of the lease?',
              type: 'date',
              required: true,
              section: 'Termination Details'
            },
            {
              label: 'What is the date of this termination notice?',
              type: 'date',
              required: true,
              section: 'Notice Details'
            },
            {
              label: 'What is the effective date of the termination?',
              type: 'date',
              required: true,
              section: 'Termination Details'
            },
            {
              label: 'Who is initiating the termination?',
              type: 'select',
              required: true,
              section: 'Termination Details',
              options: {
                create: [
                  { value: 'landlord', label: 'Landlord' },
                  { value: 'tenant', label: 'Tenant' }
                ]
              }
            },
            {
              label: 'What is the reason for termination?',
              type: 'textarea',
              required: true,
              section: 'Termination Details'
            },
            {
              label: 'If for cause, what lease provisions have been violated?',
              type: 'textarea',
              required: false,
              section: 'Violations'
            },
            {
              label: 'If for cause, were any cure notices previously sent? When?',
              type: 'textarea',
              required: false,
              section: 'Violations'
            },
            {
              label: 'What is the required notice period per the lease?',
              type: 'text',
              required: true,
              section: 'Notice Requirements'
            },
            {
              label: "What are the tenant's obligations regarding the condition of the premises upon vacating?",
              type: 'textarea',
              required: true,
              section: 'Tenant Obligations'
            },
            {
              label: 'What are the procedures for returning keys and access devices?',
              type: 'textarea',
              required: true,
              section: 'Tenant Obligations'
            },
            {
              label: 'What is the process for the final inspection?',
              type: 'textarea',
              required: true,
              section: 'Inspection'
            },
            {
              label: 'How will the security deposit be handled?',
              type: 'textarea',
              required: true,
              section: 'Financial Matters'
            },
            {
              label: 'Are there any early termination fees applicable?',
              type: 'textarea',
              required: true,
              section: 'Financial Matters'
            },
            {
              label: 'What outstanding amounts are due from the tenant?',
              type: 'textarea',
              required: true,
              section: 'Financial Matters'
            },
            {
              label: 'Are there any personal property removal requirements?',
              type: 'textarea',
              required: true,
              section: 'Property Removal'
            },
            {
              label: 'What are the consequences if the tenant does not vacate by the termination date?',
              type: 'textarea',
              required: true,
              section: 'Non-Compliance'
            },
            {
              label: 'How should the tenant acknowledge receipt of this notice?',
              type: 'textarea',
              required: true,
              section: 'Acknowledgment'
            },
            {
              label: 'Who should the tenant contact regarding questions about the termination?',
              type: 'textarea',
              required: true,
              section: 'Contact Information'
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
                  { value: 'posting', label: 'Posting on Property' },
                  { value: 'email', label: 'Email' },
                  { value: 'other', label: 'Other' }
                ]
              }
            }
          ]
        }
      }
    })

    console.log('Successfully created template:', {
      terminationNotice: terminationNotice.id,
      questionnaire: questionnaire.id
    })
  } catch (error) {
    console.error('Failed to create template:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the creation
createLeaseTerminationNotice() 