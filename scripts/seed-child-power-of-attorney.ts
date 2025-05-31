import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function seedChildPowerOfAttorney() {
  try {
    console.log('Starting child power of attorney seed...')

    // Create or update the template
    const template = await prisma.documentTemplate.upsert({
      where: { id: 'child-power-of-attorney' },
      update: {
        name: 'Power of Attorney for Child',
        description: 'Legal document delegating parental authority for a child',
        content: `# POWER OF ATTORNEY FOR CHILD

This Power of Attorney for Child (the "Power of Attorney") is made on [DATE] by:

## ARTICLE I - PARTIES
1.1 Parent(s)/Legal Guardian(s) ("Principal"):
    Full Legal Name: [PARENT_NAME]
    Relationship to Child: [PARENT_RELATIONSHIP]
    Address: [PARENT_ADDRESS]
    Phone: [PARENT_PHONE]
    Email: [PARENT_EMAIL]

1.2 Child:
    Full Legal Name: [CHILD_NAME]
    Date of Birth: [CHILD_DOB]
    Current Address: [CHILD_ADDRESS]

1.3 Attorney-in-Fact:
    Full Legal Name: [ATTORNEY_NAME]
    Relationship to Child: [ATTORNEY_RELATIONSHIP]
    Address: [ATTORNEY_ADDRESS]
    Phone: [ATTORNEY_PHONE]
    Email: [ATTORNEY_EMAIL]

## ARTICLE II - TERM AND DURATION
2.1 Effective Period:
    Start Date: [START_DATE]
    End Date: [END_DATE]
    Type of Arrangement: [ARRANGEMENT_TYPE]

2.2 Reason for Delegation (if temporary):
    [DELEGATION_REASON]

## ARTICLE III - POWERS GRANTED
3.1 Educational Powers:
    [EDUCATION_POWERS]

3.2 Medical Care Powers:
    [MEDICAL_POWERS]
    
3.3 Medical Restrictions:
    [MEDICAL_RESTRICTIONS]

3.4 Daily Care and Activities:
    [DAILY_CARE_POWERS]

3.5 Travel Authority:
    [TRAVEL_POWERS]
    Travel Restrictions: [TRAVEL_RESTRICTIONS]

3.6 Religious Upbringing:
    [RELIGIOUS_POWERS]

3.7 Government Benefits:
    [BENEFITS_AUTHORITY]

3.8 Financial Matters:
    [FINANCIAL_POWERS]

## ARTICLE IV - LIMITATIONS AND RESTRICTIONS
4.1 Excluded Powers:
    [EXCLUDED_POWERS]

4.2 Revocation Terms:
    [REVOCATION_TERMS]

4.3 Parental Rights Statement:
    [PARENTAL_RIGHTS_STATEMENT]

## ARTICLE V - EXECUTION REQUIREMENTS
5.1 Notarization:
    [NOTARIZATION_REQUIRED]

5.2 Witness Requirements:
    [WITNESS_REQUIREMENTS]

5.3 Filing Requirements:
    [FILING_REQUIREMENTS]

5.4 Duration Limitations:
    [DURATION_LIMITS]

5.5 Supporting Documents:
    [SUPPORTING_DOCUMENTS]

5.6 Number of Originals:
    [NUMBER_OF_ORIGINALS]

## SIGNATURES

Principal(s):
___________________________      ___________________________
[PARENT_SIGNATURE]               Date: [DATE]
[PARENT_NAME]

Attorney-in-Fact:
___________________________      ___________________________
[ATTORNEY_SIGNATURE]             Date: [DATE]
[ATTORNEY_NAME]

## NOTARY ACKNOWLEDGMENT

State of _______________
County of ______________

On this [DATE], before me personally appeared [PARENT_NAME] and [ATTORNEY_NAME], known to me (or satisfactorily proven) to be the persons whose names are subscribed to this Power of Attorney, and acknowledged that they executed the same for the purposes therein contained.

___________________________
Notary Public
My Commission Expires: [EXPIRATION_DATE]

## WITNESSES

1. ___________________________      ___________________________
   Signature                         Date
   [WITNESS_1_NAME]
   [WITNESS_1_ADDRESS]

2. ___________________________      ___________________________
   Signature                         Date
   [WITNESS_2_NAME]
   [WITNESS_2_ADDRESS]`,
        categoryId: 'cm9bh3u2s0001vbcg20r64fyg',
        type: 'document',
        version: '1.0.0',
        state: 'published',
        metadata: {
          sections: [
            'Parties',
            'Term and Duration',
            'Powers Granted',
            'Limitations and Restrictions',
            'Execution Requirements'
          ]
        }
      },
      create: {
        id: 'child-power-of-attorney',
        name: 'Power of Attorney for Child',
        description: 'Legal document delegating parental authority for a child',
        content: `# POWER OF ATTORNEY FOR CHILD

This Power of Attorney for Child (the "Power of Attorney") is made on [DATE] by:

## ARTICLE I - PARTIES
1.1 Parent(s)/Legal Guardian(s) ("Principal"):
    Full Legal Name: [PARENT_NAME]
    Relationship to Child: [PARENT_RELATIONSHIP]
    Address: [PARENT_ADDRESS]
    Phone: [PARENT_PHONE]
    Email: [PARENT_EMAIL]

1.2 Child:
    Full Legal Name: [CHILD_NAME]
    Date of Birth: [CHILD_DOB]
    Current Address: [CHILD_ADDRESS]

1.3 Attorney-in-Fact:
    Full Legal Name: [ATTORNEY_NAME]
    Relationship to Child: [ATTORNEY_RELATIONSHIP]
    Address: [ATTORNEY_ADDRESS]
    Phone: [ATTORNEY_PHONE]
    Email: [ATTORNEY_EMAIL]

## ARTICLE II - TERM AND DURATION
2.1 Effective Period:
    Start Date: [START_DATE]
    End Date: [END_DATE]
    Type of Arrangement: [ARRANGEMENT_TYPE]

2.2 Reason for Delegation (if temporary):
    [DELEGATION_REASON]

## ARTICLE III - POWERS GRANTED
3.1 Educational Powers:
    [EDUCATION_POWERS]

3.2 Medical Care Powers:
    [MEDICAL_POWERS]
    
3.3 Medical Restrictions:
    [MEDICAL_RESTRICTIONS]

3.4 Daily Care and Activities:
    [DAILY_CARE_POWERS]

3.5 Travel Authority:
    [TRAVEL_POWERS]
    Travel Restrictions: [TRAVEL_RESTRICTIONS]

3.6 Religious Upbringing:
    [RELIGIOUS_POWERS]

3.7 Government Benefits:
    [BENEFITS_AUTHORITY]

3.8 Financial Matters:
    [FINANCIAL_POWERS]

## ARTICLE IV - LIMITATIONS AND RESTRICTIONS
4.1 Excluded Powers:
    [EXCLUDED_POWERS]

4.2 Revocation Terms:
    [REVOCATION_TERMS]

4.3 Parental Rights Statement:
    [PARENTAL_RIGHTS_STATEMENT]

## ARTICLE V - EXECUTION REQUIREMENTS
5.1 Notarization:
    [NOTARIZATION_REQUIRED]

5.2 Witness Requirements:
    [WITNESS_REQUIREMENTS]

5.3 Filing Requirements:
    [FILING_REQUIREMENTS]

5.4 Duration Limitations:
    [DURATION_LIMITS]

5.5 Supporting Documents:
    [SUPPORTING_DOCUMENTS]

5.6 Number of Originals:
    [NUMBER_OF_ORIGINALS]

## SIGNATURES

Principal(s):
___________________________      ___________________________
[PARENT_SIGNATURE]               Date: [DATE]
[PARENT_NAME]

Attorney-in-Fact:
___________________________      ___________________________
[ATTORNEY_SIGNATURE]             Date: [DATE]
[ATTORNEY_NAME]

## NOTARY ACKNOWLEDGMENT

State of _______________
County of ______________

On this [DATE], before me personally appeared [PARENT_NAME] and [ATTORNEY_NAME], known to me (or satisfactorily proven) to be the persons whose names are subscribed to this Power of Attorney, and acknowledged that they executed the same for the purposes therein contained.

___________________________
Notary Public
My Commission Expires: [EXPIRATION_DATE]

## WITNESSES

1. ___________________________      ___________________________
   Signature                         Date
   [WITNESS_1_NAME]
   [WITNESS_1_ADDRESS]

2. ___________________________      ___________________________
   Signature                         Date
   [WITNESS_2_NAME]
   [WITNESS_2_ADDRESS]`,
        categoryId: 'cm9bh3u2s0001vbcg20r64fyg',
        type: 'document',
        version: '1.0.0',
        state: 'published',
        metadata: {
          sections: [
            'Parties',
            'Term and Duration',
            'Powers Granted',
            'Limitations and Restrictions',
            'Execution Requirements'
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
        id: 'child-power-of-attorney-questions',
        name: 'Power of Attorney for Child Questionnaire',
        description: 'Questions for creating a Power of Attorney for Child',
        templateId: template.id,
        questions: {
          create: [
            // Parties Section
            {
              label: 'What is the full legal name of the parent(s)/legal guardian(s) granting the power of attorney?',
              type: 'text',
              required: true,
              section: 'Parties'
            },
            {
              label: 'What is the relationship to the child? (Mother, father, legal guardian)',
              type: 'select',
              required: true,
              section: 'Parties',
              options: {
                create: [
                  { value: 'mother', label: 'Mother' },
                  { value: 'father', label: 'Father' },
                  { value: 'guardian', label: 'Legal Guardian' }
                ]
              }
            },
            {
              label: 'What is the contact information for the parent(s)/guardian(s)? (Address, phone, email)',
              type: 'textarea',
              required: true,
              section: 'Parties'
            },
            {
              label: 'What is the full legal name of the child?',
              type: 'text',
              required: true,
              section: 'Parties'
            },
            {
              label: 'What is the child\'s date of birth?',
              type: 'date',
              required: true,
              section: 'Parties'
            },
            {
              label: 'What is the child\'s current address?',
              type: 'text',
              required: true,
              section: 'Parties'
            },
            {
              label: 'What is the full legal name of the attorney-in-fact (person receiving authority)?',
              type: 'text',
              required: true,
              section: 'Parties'
            },
            {
              label: 'What is the relationship of the attorney-in-fact to the child?',
              type: 'text',
              required: true,
              section: 'Parties'
            },
            {
              label: 'What is the contact information for the attorney-in-fact? (Address, phone, email)',
              type: 'textarea',
              required: true,
              section: 'Parties'
            },

            // Term and Duration Section
            {
              label: 'What is the time period for which this power of attorney is valid? (Start and end dates)',
              type: 'textarea',
              required: true,
              section: 'Term and Duration'
            },
            {
              label: 'Is this a temporary or indefinite arrangement?',
              type: 'select',
              required: true,
              section: 'Term and Duration',
              options: {
                create: [
                  { value: 'temporary', label: 'Temporary' },
                  { value: 'indefinite', label: 'Indefinite' }
                ]
              }
            },
            {
              label: 'If temporary, what is the reason for the temporary delegation of authority?',
              type: 'textarea',
              required: false,
              section: 'Term and Duration'
            },

            // Powers Granted Section
            {
              label: 'What powers are being granted regarding the child\'s education? (School enrollment, access to records, etc.)',
              type: 'textarea',
              required: true,
              section: 'Powers Granted'
            },
            {
              label: 'What powers are being granted regarding the child\'s medical care? (Routine care, emergency treatment, etc.)',
              type: 'textarea',
              required: true,
              section: 'Powers Granted'
            },
            {
              label: 'Are there any specific medical treatments that are NOT authorized?',
              type: 'textarea',
              required: true,
              section: 'Powers Granted'
            },
            {
              label: 'What powers are being granted regarding the child\'s daily care and activities?',
              type: 'textarea',
              required: true,
              section: 'Powers Granted'
            },
            {
              label: 'What powers are being granted regarding travel with the child?',
              type: 'textarea',
              required: true,
              section: 'Powers Granted'
            },
            {
              label: 'Are there any restrictions on where the child may travel?',
              type: 'textarea',
              required: true,
              section: 'Powers Granted'
            },
            {
              label: 'What decisions about the child\'s religious upbringing can the attorney-in-fact make, if any?',
              type: 'textarea',
              required: false,
              section: 'Powers Granted'
            },
            {
              label: 'Can the attorney-in-fact apply for government benefits on behalf of the child?',
              type: 'select',
              required: true,
              section: 'Powers Granted',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Can the attorney-in-fact handle the child\'s financial matters? If so, what specifically?',
              type: 'textarea',
              required: true,
              section: 'Powers Granted'
            },

            // Limitations and Restrictions Section
            {
              label: 'Are there any powers specifically excluded from this delegation?',
              type: 'textarea',
              required: true,
              section: 'Limitations and Restrictions'
            },
            {
              label: 'Under what circumstances can this power of attorney be revoked?',
              type: 'textarea',
              required: true,
              section: 'Limitations and Restrictions'
            },
            {
              label: 'Does the document need to specify that parental rights are not being terminated?',
              type: 'select',
              required: true,
              section: 'Limitations and Restrictions',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },

            // Execution Requirements Section
            {
              label: 'Does this power of attorney need to be notarized?',
              type: 'select',
              required: true,
              section: 'Execution Requirements',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Does this power of attorney need to be witnessed? If so, by how many witnesses?',
              type: 'text',
              required: true,
              section: 'Execution Requirements'
            },
            {
              label: 'Does this document need to be filed with any court or government agency?',
              type: 'select',
              required: true,
              section: 'Execution Requirements',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Does the state where the child resides limit the duration of a power of attorney for a child?',
              type: 'textarea',
              required: true,
              section: 'Execution Requirements'
            },
            {
              label: 'Will copies of the child\'s birth certificate or custody orders be attached?',
              type: 'select',
              required: true,
              section: 'Execution Requirements',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Is this power of attorney being executed in multiple originals?',
              type: 'select',
              required: true,
              section: 'Execution Requirements',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            }
          ]
        }
      }
    })
    console.log('Created/Updated questionnaire:', questionnaire.name)

    console.log('Child power of attorney seed completed successfully!')
  } catch (error) {
    console.error('Error seeding child power of attorney:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the seed function if this file is executed directly
if (require.main === module) {
  seedChildPowerOfAttorney()
    .catch((error) => {
      console.error('Error running child power of attorney seed:', error)
      process.exit(1)
    })
} 