import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createDeedTemplates() {
  try {
    console.log('Creating Warranty Deed and Quitclaim Deed templates...')

    // Get the real estate category
    const realEstateCategory = await prisma.category.findUnique({
      where: { id: 'real-estate' }
    })

    if (!realEstateCategory) {
      throw new Error('Real estate category not found')
    }

    // Create Warranty Deed template
    const warrantyDeed = await prisma.documentTemplate.create({
      data: {
        id: 'warranty-deed',
        name: 'Warranty Deed',
        type: 'deed',
        description: 'A legal document that provides the highest level of protection to the buyer of real property',
        content: [
          '# Warranty Deed',
          '',
          'This Warranty Deed is made on {deedDate}, between:',
          '',
          'GRANTOR(S):',
          '{grantorName}',
          'residing at {grantorAddress}',
          '',
          'and',
          '',
          'GRANTEE(S):',
          '{granteeName}',
          'residing at {granteeAddress}',
          '',
          '## Property Description',
          'For and in consideration of {consideration} and other good and valuable consideration, the receipt and sufficiency of which is hereby acknowledged, the Grantor does hereby grant, bargain, sell, and convey unto the Grantee the following described real property:',
          '',
          'Legal Description:',
          '{legalDescription}',
          '',
          'Property Address: {propertyAddress}',
          'County: {propertyCounty}',
          'State: {propertyState}',
          '',
          '## Title Warranties',
          'The Grantor hereby covenants with the Grantee that:',
          '',
          '1. The Grantor is lawfully seized of the property in fee simple;',
          '2. The Grantor has good right and full power to convey the property;',
          '3. The property is free from all encumbrances, except as stated herein:',
          '{encumbrances}',
          '4. The Grantor warrants and will defend the title to the property against the lawful claims of all persons.',
          '',
          '## Exceptions and Reservations',
          '{exceptionsReservations}',
          '',
          '## Marital Status',
          'Grantor\'s Marital Status: {grantorMaritalStatus}',
          '',
          '## Prior Deed Reference',
          '{priorDeedReference}',
          '',
          '## Tax Parcel Information',
          'Tax Parcel ID: {taxParcelId}',
          '',
          '## Signatures',
          '',
          '_________________',
          'Grantor Signature',
          '',
          '_________________',
          'Grantor Spouse Signature (if applicable)',
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

    // Create Warranty Deed questionnaire
    const warrantyDeedQuestionnaire = await prisma.questionnaire.create({
      data: {
        name: 'Warranty Deed Questionnaire',
        description: 'Questions for generating a warranty deed',
        templateId: warrantyDeed.id,
        questions: {
          create: [
            {
              label: 'What is the date of the deed?',
              type: 'date',
              required: true,
              section: 'Basic Information'
            },
            {
              label: 'What is the full legal name of the grantor(s)?',
              type: 'text',
              required: true,
              section: 'Grantor Information'
            },
            {
              label: 'What is the address of the grantor(s)?',
              type: 'textarea',
              required: true,
              section: 'Grantor Information'
            },
            {
              label: 'What is the marital status of the grantor(s)?',
              type: 'select',
              required: true,
              section: 'Grantor Information',
              options: {
                create: [
                  { value: 'single', label: 'Single' },
                  { value: 'married', label: 'Married' },
                  { value: 'divorced', label: 'Divorced' },
                  { value: 'widowed', label: 'Widowed' }
                ]
              }
            },
            {
              label: 'What is the full legal name of the grantee(s)?',
              type: 'text',
              required: true,
              section: 'Grantee Information'
            },
            {
              label: 'What is the address of the grantee(s)?',
              type: 'textarea',
              required: true,
              section: 'Grantee Information'
            },
            {
              label: 'What is the consideration amount for this transfer?',
              type: 'text',
              required: true,
              section: 'Consideration',
              helpText: 'Enter the amount paid for the property'
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
              label: 'In what county and state is the property located?',
              type: 'text',
              required: true,
              section: 'Property Information'
            },
            {
              label: 'What is the tax parcel ID number?',
              type: 'text',
              required: true,
              section: 'Property Information'
            },
            {
              label: 'Are there any existing encumbrances on the property?',
              type: 'textarea',
              required: true,
              section: 'Encumbrances',
              helpText: 'List any mortgages, liens, easements, or other encumbrances'
            },
            {
              label: 'Are there any exceptions or reservations to the warranty?',
              type: 'textarea',
              required: true,
              section: 'Exceptions'
            },
            {
              label: 'What is the prior deed reference information?',
              type: 'textarea',
              required: true,
              section: 'Prior Deed',
              helpText: 'Include recording information of previous deed'
            }
          ]
        }
      }
    })

    // Create Quitclaim Deed template
    const quitclaimDeed = await prisma.documentTemplate.create({
      data: {
        id: 'quitclaim-deed',
        name: 'Quitclaim Deed',
        type: 'deed',
        description: 'A legal document that transfers any interest the grantor may have in a property without any warranties of title',
        content: [
          '# Quitclaim Deed',
          '',
          'This Quitclaim Deed is made on {deedDate}, between:',
          '',
          'GRANTOR(S):',
          '{grantorName}',
          'residing at {grantorAddress}',
          '',
          'and',
          '',
          'GRANTEE(S):',
          '{granteeName}',
          'residing at {granteeAddress}',
          '',
          '## Property Description',
          'The Grantor, for and in consideration of {consideration} and other good and valuable consideration, the receipt and sufficiency of which is hereby acknowledged, does hereby remise, release, and quitclaim unto the Grantee all right, title, interest, claim, and demand which the Grantor has in and to the following described real property:',
          '',
          'Legal Description:',
          '{legalDescription}',
          '',
          'Property Address: {propertyAddress}',
          'County: {propertyCounty}',
          'State: {propertyState}',
          '',
          '## Nature of Interest',
          'This deed transfers only the interest of the Grantor, if any, in the property, without warranty of title or any other warranty.',
          '',
          '## Purpose of Transfer',
          '{transferPurpose}',
          '',
          '## Marital Status',
          'Grantor\'s Marital Status: {grantorMaritalStatus}',
          '',
          '## Tax Parcel Information',
          'Tax Parcel ID: {taxParcelId}',
          '',
          '## Prior Deed Reference',
          '{priorDeedReference}',
          '',
          '## Signatures',
          '',
          '_________________',
          'Grantor Signature',
          '',
          '_________________',
          'Grantor Spouse Signature (if applicable)',
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

    // Create Quitclaim Deed questionnaire
    const quitclaimDeedQuestionnaire = await prisma.questionnaire.create({
      data: {
        name: 'Quitclaim Deed Questionnaire',
        description: 'Questions for generating a quitclaim deed',
        templateId: quitclaimDeed.id,
        questions: {
          create: [
            {
              label: 'What is the date of the deed?',
              type: 'date',
              required: true,
              section: 'Basic Information'
            },
            {
              label: 'What is the full legal name of the grantor(s)?',
              type: 'text',
              required: true,
              section: 'Grantor Information'
            },
            {
              label: 'What is the address of the grantor(s)?',
              type: 'textarea',
              required: true,
              section: 'Grantor Information'
            },
            {
              label: 'What is the marital status of the grantor(s)?',
              type: 'select',
              required: true,
              section: 'Grantor Information',
              options: {
                create: [
                  { value: 'single', label: 'Single' },
                  { value: 'married', label: 'Married' },
                  { value: 'divorced', label: 'Divorced' },
                  { value: 'widowed', label: 'Widowed' }
                ]
              }
            },
            {
              label: 'What is the full legal name of the grantee(s)?',
              type: 'text',
              required: true,
              section: 'Grantee Information'
            },
            {
              label: 'What is the address of the grantee(s)?',
              type: 'textarea',
              required: true,
              section: 'Grantee Information'
            },
            {
              label: 'What is the consideration amount for this transfer?',
              type: 'text',
              required: true,
              section: 'Consideration',
              helpText: 'Enter the amount paid for the transfer'
            },
            {
              label: 'What is the purpose of this quitclaim transfer?',
              type: 'textarea',
              required: true,
              section: 'Transfer Purpose',
              helpText: 'Example: divorce settlement, clearing title, gift, etc.'
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
              label: 'In what county and state is the property located?',
              type: 'text',
              required: true,
              section: 'Property Information'
            },
            {
              label: 'What is the tax parcel ID number?',
              type: 'text',
              required: true,
              section: 'Property Information'
            },
            {
              label: 'What is the prior deed reference information?',
              type: 'textarea',
              required: false,
              section: 'Prior Deed',
              helpText: 'Include recording information of previous deed if available'
            }
          ]
        }
      }
    })

    console.log('Successfully created templates:', {
      warrantyDeed: warrantyDeed.id,
      warrantyDeedQuestionnaire: warrantyDeedQuestionnaire.id,
      quitclaimDeed: quitclaimDeed.id,
      quitclaimDeedQuestionnaire: quitclaimDeedQuestionnaire.id
    })
  } catch (error) {
    console.error('Failed to create templates:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the creation
createDeedTemplates() 