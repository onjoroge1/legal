import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function seedMarriageAffidavit() {
  try {
    console.log('Starting marriage affidavit seed...')

    // Create or update the template
    const template = await prisma.documentTemplate.upsert({
      where: { id: 'marriage-affidavit' },
      update: {
        name: 'Marriage Affidavit',
        description: 'Legal affidavit for proving marriage status or single status',
        content: `# MARRIAGE AFFIDAVIT

I, [AFFIANT_NAME], being duly sworn, depose and state as follows:

## AFFIANT INFORMATION
1. My current address is: [AFFIANT_ADDRESS]
2. My date of birth is: [AFFIANT_DOB]

## PURPOSE AND STATUS
3. The purpose of this affidavit is: [AFFIDAVIT_PURPOSE]
4. My marital status is: [MARITAL_STATUS]

## MARRIAGE INFORMATION (if applicable)
5. My spouse's full legal name is: [SPOUSE_NAME]
6. The date of our marriage is: [MARRIAGE_DATE]
7. The marriage was performed in: [MARRIAGE_LOCATION]
8. The marriage was officiated by: [MARRIAGE_OFFICIANT]
9. The witnesses to our marriage were: [MARRIAGE_WITNESSES]
10. A marriage license was obtained from: [MARRIAGE_LICENSE_JURISDICTION]
11. The marriage was registered with civil authorities: [MARRIAGE_REGISTRATION]

## DIVORCE INFORMATION (if applicable)
12. The date of divorce is: [DIVORCE_DATE]
13. The jurisdiction where divorce was granted: [DIVORCE_JURISDICTION]

## USAGE AND REQUIREMENTS
14. This affidavit is being used for: [AFFIDAVIT_USAGE]
15. Supporting documents attached: [SUPPORTING_DOCUMENTS]
16. Notarization required: [NOTARIZATION_REQUIRED]
17. Apostille required: [APOSTILLE_REQUIRED]
18. Witness requirements: [WITNESS_REQUIREMENTS]
19. Receiving entity: [RECEIVING_ENTITY]
20. Format requirements: [FORMAT_REQUIREMENTS]
21. Submission deadline: [SUBMISSION_DEADLINE]

## ACKNOWLEDGMENT
I understand that making false statements in this affidavit may subject me to penalties under the law.

___________________________      ___________________________
[AFFIANT_SIGNATURE]              [NOTARY_SIGNATURE]
[AFFIANT_NAME]                   [NOTARY_NAME]
Date: [DATE]                     Date: [DATE]`,
        categoryId: 'cm9bh3u2s0001vbcg20r64fyg',
        type: 'document',
        version: '1.0.0',
        state: 'published',
        metadata: {
          sections: [
            'Affiant Information',
            'Purpose and Status',
            'Marriage Information',
            'Divorce Information',
            'Usage and Requirements',
            'Acknowledgment'
          ]
        }
      },
      create: {
        id: 'marriage-affidavit',
        name: 'Marriage Affidavit',
        description: 'Legal affidavit for proving marriage status or single status',
        content: `# MARRIAGE AFFIDAVIT

I, [AFFIANT_NAME], being duly sworn, depose and state as follows:

## AFFIANT INFORMATION
1. My current address is: [AFFIANT_ADDRESS]
2. My date of birth is: [AFFIANT_DOB]

## PURPOSE AND STATUS
3. The purpose of this affidavit is: [AFFIDAVIT_PURPOSE]
4. My marital status is: [MARITAL_STATUS]

## MARRIAGE INFORMATION (if applicable)
5. My spouse's full legal name is: [SPOUSE_NAME]
6. The date of our marriage is: [MARRIAGE_DATE]
7. The marriage was performed in: [MARRIAGE_LOCATION]
8. The marriage was officiated by: [MARRIAGE_OFFICIANT]
9. The witnesses to our marriage were: [MARRIAGE_WITNESSES]
10. A marriage license was obtained from: [MARRIAGE_LICENSE_JURISDICTION]
11. The marriage was registered with civil authorities: [MARRIAGE_REGISTRATION]

## DIVORCE INFORMATION (if applicable)
12. The date of divorce is: [DIVORCE_DATE]
13. The jurisdiction where divorce was granted: [DIVORCE_JURISDICTION]

## USAGE AND REQUIREMENTS
14. This affidavit is being used for: [AFFIDAVIT_USAGE]
15. Supporting documents attached: [SUPPORTING_DOCUMENTS]
16. Notarization required: [NOTARIZATION_REQUIRED]
17. Apostille required: [APOSTILLE_REQUIRED]
18. Witness requirements: [WITNESS_REQUIREMENTS]
19. Receiving entity: [RECEIVING_ENTITY]
20. Format requirements: [FORMAT_REQUIREMENTS]
21. Submission deadline: [SUBMISSION_DEADLINE]

## ACKNOWLEDGMENT
I understand that making false statements in this affidavit may subject me to penalties under the law.

___________________________      ___________________________
[AFFIANT_SIGNATURE]              [NOTARY_SIGNATURE]
[AFFIANT_NAME]                   [NOTARY_NAME]
Date: [DATE]                     Date: [DATE]`,
        categoryId: 'cm9bh3u2s0001vbcg20r64fyg',
        type: 'document',
        version: '1.0.0',
        state: 'published',
        metadata: {
          sections: [
            'Affiant Information',
            'Purpose and Status',
            'Marriage Information',
            'Divorce Information',
            'Usage and Requirements',
            'Acknowledgment'
          ]
        }
      }
    })
    console.log('Created/Updated template:', template.name)

    // First, delete any existing questionnaire for this template
    await prisma.questionnaire.deleteMany({
      where: {
        templateId: template.id
      }
    })

    // Create the questionnaire
    const questionnaire = await prisma.questionnaire.create({
      data: {
        id: 'marriage-affidavit-questions',
        name: 'Marriage Affidavit Questionnaire',
        description: 'Questions for creating a Marriage Affidavit',
        templateId: template.id,
        questions: {
          create: [
            // Affiant Information Section
            {
              label: 'What is the full legal name of the person making the affidavit?',
              type: 'text',
              required: true,
              section: 'Affiant Information'
            },
            {
              label: 'What is the current address of the affiant?',
              type: 'text',
              required: true,
              section: 'Affiant Information'
            },
            {
              label: 'What is the affiant\'s date of birth?',
              type: 'date',
              required: true,
              section: 'Affiant Information'
            },

            // Purpose and Status Section
            {
              label: 'What is the purpose of the affidavit?',
              type: 'select',
              required: true,
              section: 'Purpose and Status',
              options: {
                create: [
                  { value: 'marriage', label: 'Proof of marriage' },
                  { value: 'single', label: 'Single status' },
                  { value: 'divorced', label: 'Divorced status' },
                  { value: 'other', label: 'Other' }
                ]
              }
            },

            // Marriage Information Section
            {
              label: 'What is the full legal name of the spouse?',
              type: 'text',
              required: false,
              section: 'Marriage Information'
            },
            {
              label: 'What is the date of marriage?',
              type: 'date',
              required: false,
              section: 'Marriage Information'
            },
            {
              label: 'Where was the marriage performed? (City, county, state, country)',
              type: 'text',
              required: false,
              section: 'Marriage Information'
            },
            {
              label: 'Who officiated the marriage?',
              type: 'text',
              required: false,
              section: 'Marriage Information'
            },
            {
              label: 'Were there witnesses? Who were they?',
              type: 'textarea',
              required: false,
              section: 'Marriage Information'
            },
            {
              label: 'Was a marriage license obtained? From what jurisdiction?',
              type: 'text',
              required: false,
              section: 'Marriage Information'
            },
            {
              label: 'Was the marriage registered with civil authorities?',
              type: 'select',
              required: false,
              section: 'Marriage Information',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },

            // Divorce Information Section
            {
              label: 'Is the affiant confirming never married or divorced status?',
              type: 'select',
              required: true,
              section: 'Divorce Information',
              options: {
                create: [
                  { value: 'never', label: 'Never married' },
                  { value: 'divorced', label: 'Divorced' }
                ]
              }
            },
            {
              label: 'If divorced, what is the date of divorce and jurisdiction where it was granted?',
              type: 'text',
              required: false,
              section: 'Divorce Information'
            },

            // Usage and Requirements Section
            {
              label: 'Is this affidavit being used for immigration purposes?',
              type: 'select',
              required: true,
              section: 'Usage and Requirements',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Is this affidavit being used for name change purposes?',
              type: 'select',
              required: true,
              section: 'Usage and Requirements',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Is this affidavit being used for insurance or benefits purposes?',
              type: 'select',
              required: true,
              section: 'Usage and Requirements',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Is this affidavit being used to correct official records?',
              type: 'select',
              required: true,
              section: 'Usage and Requirements',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'What supporting documents will be attached to this affidavit?',
              type: 'textarea',
              required: true,
              section: 'Usage and Requirements'
            },
            {
              label: 'Will this affidavit need to be notarized?',
              type: 'select',
              required: true,
              section: 'Usage and Requirements',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Will this affidavit need to be apostilled for use in a foreign country?',
              type: 'select',
              required: true,
              section: 'Usage and Requirements',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Does the affiant understand the penalties for making false statements in an affidavit?',
              type: 'select',
              required: true,
              section: 'Usage and Requirements',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Does the affidavit need to be witnessed? If so, by how many witnesses?',
              type: 'text',
              required: true,
              section: 'Usage and Requirements'
            },
            {
              label: 'What governmental agency or entity will receive this affidavit?',
              type: 'text',
              required: true,
              section: 'Usage and Requirements'
            },
            {
              label: 'Is there a specific format required by the receiving entity?',
              type: 'textarea',
              required: false,
              section: 'Usage and Requirements'
            },
            {
              label: 'Is this affidavit time-sensitive or is there a deadline for submission?',
              type: 'text',
              required: false,
              section: 'Usage and Requirements'
            }
          ]
        }
      }
    })
    console.log('Created/Updated questionnaire:', questionnaire.name)

    console.log('Marriage affidavit seed completed successfully!')
  } catch (error) {
    console.error('Error seeding marriage affidavit:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the seed function if this file is executed directly
if (require.main === module) {
  seedMarriageAffidavit()
    .catch((error) => {
      console.error('Error running marriage affidavit seed:', error)
      process.exit(1)
    })
} 