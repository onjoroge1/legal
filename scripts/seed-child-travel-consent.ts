import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function seedChildTravelConsent() {
  try {
    console.log('Starting child travel consent seed...')
    
    // Get or create the Family Law category
    const category = await prisma.category.upsert({
      where: { id: 'cm9bh3u2s0001vbcg20r64fyg' },
      update: {
        name: 'Family Law',
        slug: 'family-law',
        description: 'Family law documents and agreements'
      },
      create: {
        id: 'cm9bh3u2s0001vbcg20r64fyg',
        name: 'Family Law',
        slug: 'family-law',
        description: 'Family law documents and agreements'
      }
    })
    console.log('Created/Updated category:', category.name)

    // Create Child Travel Consent template
    const template = await prisma.documentTemplate.upsert({
      where: { id: 'child-travel-consent' },
      update: {
        name: 'Child Travel Consent',
        description: 'A legal document authorizing a child to travel with a specified adult or alone.',
        content: `# CHILD TRAVEL CONSENT FORM

This Child Travel Consent Form (the "Consent") is made on [DATE] by:

Parent(s)/Legal Guardian(s):
[PARENT_GUARDIAN_NAMES]
[PARENT_GUARDIAN_ADDRESS]
[PARENT_GUARDIAN_PHONE]
[PARENT_GUARDIAN_EMAIL]

For the benefit of:
Child's Name: [CHILD_NAME]
Date of Birth: [CHILD_DOB]
Place of Birth: [CHILD_POB]
Passport Number: [PASSPORT_NUMBER]
Passport Country: [PASSPORT_COUNTRY]
Passport Expiration: [PASSPORT_EXPIRATION]

Authorizing Travel With:
Accompanying Adult: [ACCOMPANYING_ADULT_NAME]
Relationship to Child: [ACCOMPANYING_ADULT_RELATIONSHIP]
Address: [ACCOMPANYING_ADULT_ADDRESS]
Phone: [ACCOMPANYING_ADULT_PHONE]
Email: [ACCOMPANYING_ADULT_EMAIL]

## 1. Travel Details
Travel Dates: [TRAVEL_DATES]
Destination(s): [DESTINATIONS]
Purpose of Travel: [TRAVEL_PURPOSE]
Accommodation Address: [ACCOMMODATION_ADDRESS]

## 2. Travel Arrangements
Traveling Alone: [TRAVELING_ALONE]
Airline Details: [AIRLINE_DETAILS]
Flight Information: [FLIGHT_INFO]

## 3. Authorization Details
Authorized Activities: [AUTHORIZED_ACTIVITIES]
Unauthorized Activities: [UNAUTHORIZED_ACTIVITIES]
Medical Authorization: [MEDICAL_AUTHORIZATION]
Travel Restrictions: [TRAVEL_RESTRICTIONS]

## 4. Parental Consent
Consent From: [CONSENT_FROM]
Reason for Single Parent Consent: [SINGLE_PARENT_REASON]

## 5. Documentation
Notarization Required: [NOTARIZATION_REQUIRED]
Witnesses Required: [WITNESSES_REQUIRED]
Birth Certificate Attached: [BIRTH_CERTIFICATE_ATTACHED]
Custody Documents Attached: [CUSTODY_DOCUMENTS_ATTACHED]
Translation Required: [TRANSLATION_REQUIRED]
Translation Languages: [TRANSLATION_LANGUAGES]
Number of Originals: [NUMBER_OF_ORIGINALS]
Country Requirements Verified: [COUNTRY_REQUIREMENTS_VERIFIED]

## Signatures
_________________
Parent/Legal Guardian Signature
Date: [PARENT_SIGN_DATE]

_________________
Accompanying Adult Signature (if applicable)
Date: [ACCOMPANYING_ADULT_SIGN_DATE]

[WITNESS_BLOCK]

[NOTARY_BLOCK]`,
        categoryId: category.id,
        type: 'document',
        version: '1.0.0',
        state: 'published',
        metadata: {
          sections: [
            'Child Information',
            'Parent/Guardian Information',
            'Accompanying Adult Information',
            'Travel Details',
            'Authorization Details',
            'Documentation'
          ]
        }
      },
      create: {
        id: 'child-travel-consent',
        name: 'Child Travel Consent',
        description: 'A legal document authorizing a child to travel with a specified adult or alone.',
        content: `# CHILD TRAVEL CONSENT FORM

This Child Travel Consent Form (the "Consent") is made on [DATE] by:

Parent(s)/Legal Guardian(s):
[PARENT_GUARDIAN_NAMES]
[PARENT_GUARDIAN_ADDRESS]
[PARENT_GUARDIAN_PHONE]
[PARENT_GUARDIAN_EMAIL]

For the benefit of:
Child's Name: [CHILD_NAME]
Date of Birth: [CHILD_DOB]
Place of Birth: [CHILD_POB]
Passport Number: [PASSPORT_NUMBER]
Passport Country: [PASSPORT_COUNTRY]
Passport Expiration: [PASSPORT_EXPIRATION]

Authorizing Travel With:
Accompanying Adult: [ACCOMPANYING_ADULT_NAME]
Relationship to Child: [ACCOMPANYING_ADULT_RELATIONSHIP]
Address: [ACCOMPANYING_ADULT_ADDRESS]
Phone: [ACCOMPANYING_ADULT_PHONE]
Email: [ACCOMPANYING_ADULT_EMAIL]

## 1. Travel Details
Travel Dates: [TRAVEL_DATES]
Destination(s): [DESTINATIONS]
Purpose of Travel: [TRAVEL_PURPOSE]
Accommodation Address: [ACCOMMODATION_ADDRESS]

## 2. Travel Arrangements
Traveling Alone: [TRAVELING_ALONE]
Airline Details: [AIRLINE_DETAILS]
Flight Information: [FLIGHT_INFO]

## 3. Authorization Details
Authorized Activities: [AUTHORIZED_ACTIVITIES]
Unauthorized Activities: [UNAUTHORIZED_ACTIVITIES]
Medical Authorization: [MEDICAL_AUTHORIZATION]
Travel Restrictions: [TRAVEL_RESTRICTIONS]

## 4. Parental Consent
Consent From: [CONSENT_FROM]
Reason for Single Parent Consent: [SINGLE_PARENT_REASON]

## 5. Documentation
Notarization Required: [NOTARIZATION_REQUIRED]
Witnesses Required: [WITNESSES_REQUIRED]
Birth Certificate Attached: [BIRTH_CERTIFICATE_ATTACHED]
Custody Documents Attached: [CUSTODY_DOCUMENTS_ATTACHED]
Translation Required: [TRANSLATION_REQUIRED]
Translation Languages: [TRANSLATION_LANGUAGES]
Number of Originals: [NUMBER_OF_ORIGINALS]
Country Requirements Verified: [COUNTRY_REQUIREMENTS_VERIFIED]

## Signatures
_________________
Parent/Legal Guardian Signature
Date: [PARENT_SIGN_DATE]

_________________
Accompanying Adult Signature (if applicable)
Date: [ACCOMPANYING_ADULT_SIGN_DATE]

[WITNESS_BLOCK]

[NOTARY_BLOCK]`,
        categoryId: category.id,
        type: 'document',
        version: '1.0.0',
        state: 'published',
        metadata: {
          sections: [
            'Child Information',
            'Parent/Guardian Information',
            'Accompanying Adult Information',
            'Travel Details',
            'Authorization Details',
            'Documentation'
          ]
        }
      }
    })
    console.log('Created/Updated template:', template.name)

    // Create Child Travel Consent questionnaire
    const questionnaire = await prisma.questionnaire.upsert({
      where: { id: `${template.id}-questions` },
      update: {
        questions: {
          deleteMany: {},
          create: [
            // Child Information Section
            {
              label: 'What is the full legal name of the child?',
              type: 'text',
              required: true,
              section: 'Child Information'
            },
            {
              label: 'What is the child\'s date of birth?',
              type: 'date',
              required: true,
              section: 'Child Information'
            },
            {
              label: 'What is the child\'s place of birth?',
              type: 'text',
              required: true,
              section: 'Child Information'
            },
            {
              label: 'What is the child\'s passport number (if applicable)?',
              type: 'text',
              required: false,
              section: 'Child Information'
            },
            {
              label: 'What country issued the child\'s passport?',
              type: 'text',
              required: false,
              section: 'Child Information'
            },
            {
              label: 'What is the passport expiration date?',
              type: 'date',
              required: false,
              section: 'Child Information'
            },
            // Parent/Guardian Information Section
            {
              label: 'What is the full legal name of the parent(s)/legal guardian(s) giving consent?',
              type: 'text',
              required: true,
              section: 'Parent/Guardian Information'
            },
            {
              label: 'What is the relationship of the consenting adult(s) to the child?',
              type: 'text',
              required: true,
              section: 'Parent/Guardian Information'
            },
            {
              label: 'What is the contact information for the consenting parent(s)/guardian(s)? (Address, phone, email)',
              type: 'textarea',
              required: true,
              section: 'Parent/Guardian Information'
            },
            {
              label: 'Is this consent from both parents or just one parent?',
              type: 'select',
              required: true,
              section: 'Parent/Guardian Information',
              options: {
                create: [
                  { value: 'both', label: 'Both Parents' },
                  { value: 'one', label: 'One Parent' }
                ]
              }
            },
            {
              label: 'If only one parent is consenting, what is the reason? (Sole custody, other parent deceased, etc.)',
              type: 'textarea',
              required: false,
              section: 'Parent/Guardian Information'
            },
            // Accompanying Adult Information Section
            {
              label: 'What is the full legal name of the adult traveling with the child?',
              type: 'text',
              required: true,
              section: 'Accompanying Adult Information'
            },
            {
              label: 'What is the relationship of this adult to the child?',
              type: 'text',
              required: true,
              section: 'Accompanying Adult Information'
            },
            {
              label: 'What is the contact information for the accompanying adult? (Address, phone, email)',
              type: 'textarea',
              required: true,
              section: 'Accompanying Adult Information'
            },
            // Travel Details Section
            {
              label: 'Is the child traveling alone? If so, what airline and flight details?',
              type: 'textarea',
              required: true,
              section: 'Travel Details'
            },
            {
              label: 'What are the travel dates? (Departure and return)',
              type: 'text',
              required: true,
              section: 'Travel Details'
            },
            {
              label: 'What is the destination country/countries?',
              type: 'text',
              required: true,
              section: 'Travel Details'
            },
            {
              label: 'What is the purpose of travel? (Vacation, school trip, visiting family, etc.)',
              type: 'textarea',
              required: true,
              section: 'Travel Details'
            },
            {
              label: 'What is the address where the child will be staying during travel?',
              type: 'textarea',
              required: true,
              section: 'Travel Details'
            },
            // Authorization Details Section
            {
              label: 'Are there any specific activities that are being authorized during travel?',
              type: 'textarea',
              required: false,
              section: 'Authorization Details'
            },
            {
              label: 'Are there any specific activities that are NOT authorized during travel?',
              type: 'textarea',
              required: false,
              section: 'Authorization Details'
            },
            {
              label: 'Is the accompanying adult authorized to seek medical treatment for the child if necessary?',
              type: 'select',
              required: true,
              section: 'Authorization Details',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Are there any travel restrictions or specific conditions that should be noted?',
              type: 'textarea',
              required: false,
              section: 'Authorization Details'
            },
            // Documentation Section
            {
              label: 'Does this consent need to be notarized?',
              type: 'select',
              required: true,
              section: 'Documentation',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Does this consent need to be witnessed? If so, by how many witnesses?',
              type: 'text',
              required: true,
              section: 'Documentation'
            },
            {
              label: 'Will copies of the child\'s birth certificate be attached?',
              type: 'select',
              required: true,
              section: 'Documentation',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Will copies of custody documents be attached (if applicable)?',
              type: 'select',
              required: true,
              section: 'Documentation',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Will this consent be translated? If so, into what language(s)?',
              type: 'textarea',
              required: false,
              section: 'Documentation'
            },
            {
              label: 'Is this consent being executed in multiple originals?',
              type: 'select',
              required: true,
              section: 'Documentation',
              options: {
                create: [
                  { value: '1', label: '1' },
                  { value: '2', label: '2' },
                  { value: '3', label: '3' },
                  { value: '4', label: '4' }
                ]
              }
            },
            {
              label: 'Has this consent been verified to meet the requirements of all countries being visited?',
              type: 'select',
              required: true,
              section: 'Documentation',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            }
          ]
        }
      },
      create: {
        id: `${template.id}-questions`,
        name: 'Child Travel Consent Questionnaire',
        description: 'Questions for creating a Child Travel Consent form',
        templateId: template.id,
        questions: {
          create: [
            // Child Information Section
            {
              label: 'What is the full legal name of the child?',
              type: 'text',
              required: true,
              section: 'Child Information'
            },
            {
              label: 'What is the child\'s date of birth?',
              type: 'date',
              required: true,
              section: 'Child Information'
            },
            {
              label: 'What is the child\'s place of birth?',
              type: 'text',
              required: true,
              section: 'Child Information'
            },
            {
              label: 'What is the child\'s passport number (if applicable)?',
              type: 'text',
              required: false,
              section: 'Child Information'
            },
            {
              label: 'What country issued the child\'s passport?',
              type: 'text',
              required: false,
              section: 'Child Information'
            },
            {
              label: 'What is the passport expiration date?',
              type: 'date',
              required: false,
              section: 'Child Information'
            },
            // Parent/Guardian Information Section
            {
              label: 'What is the full legal name of the parent(s)/legal guardian(s) giving consent?',
              type: 'text',
              required: true,
              section: 'Parent/Guardian Information'
            },
            {
              label: 'What is the relationship of the consenting adult(s) to the child?',
              type: 'text',
              required: true,
              section: 'Parent/Guardian Information'
            },
            {
              label: 'What is the contact information for the consenting parent(s)/guardian(s)? (Address, phone, email)',
              type: 'textarea',
              required: true,
              section: 'Parent/Guardian Information'
            },
            {
              label: 'Is this consent from both parents or just one parent?',
              type: 'select',
              required: true,
              section: 'Parent/Guardian Information',
              options: {
                create: [
                  { value: 'both', label: 'Both Parents' },
                  { value: 'one', label: 'One Parent' }
                ]
              }
            },
            {
              label: 'If only one parent is consenting, what is the reason? (Sole custody, other parent deceased, etc.)',
              type: 'textarea',
              required: false,
              section: 'Parent/Guardian Information'
            },
            // Accompanying Adult Information Section
            {
              label: 'What is the full legal name of the adult traveling with the child?',
              type: 'text',
              required: true,
              section: 'Accompanying Adult Information'
            },
            {
              label: 'What is the relationship of this adult to the child?',
              type: 'text',
              required: true,
              section: 'Accompanying Adult Information'
            },
            {
              label: 'What is the contact information for the accompanying adult? (Address, phone, email)',
              type: 'textarea',
              required: true,
              section: 'Accompanying Adult Information'
            },
            // Travel Details Section
            {
              label: 'Is the child traveling alone? If so, what airline and flight details?',
              type: 'textarea',
              required: true,
              section: 'Travel Details'
            },
            {
              label: 'What are the travel dates? (Departure and return)',
              type: 'text',
              required: true,
              section: 'Travel Details'
            },
            {
              label: 'What is the destination country/countries?',
              type: 'text',
              required: true,
              section: 'Travel Details'
            },
            {
              label: 'What is the purpose of travel? (Vacation, school trip, visiting family, etc.)',
              type: 'textarea',
              required: true,
              section: 'Travel Details'
            },
            {
              label: 'What is the address where the child will be staying during travel?',
              type: 'textarea',
              required: true,
              section: 'Travel Details'
            },
            // Authorization Details Section
            {
              label: 'Are there any specific activities that are being authorized during travel?',
              type: 'textarea',
              required: false,
              section: 'Authorization Details'
            },
            {
              label: 'Are there any specific activities that are NOT authorized during travel?',
              type: 'textarea',
              required: false,
              section: 'Authorization Details'
            },
            {
              label: 'Is the accompanying adult authorized to seek medical treatment for the child if necessary?',
              type: 'select',
              required: true,
              section: 'Authorization Details',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Are there any travel restrictions or specific conditions that should be noted?',
              type: 'textarea',
              required: false,
              section: 'Authorization Details'
            },
            // Documentation Section
            {
              label: 'Does this consent need to be notarized?',
              type: 'select',
              required: true,
              section: 'Documentation',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Does this consent need to be witnessed? If so, by how many witnesses?',
              type: 'text',
              required: true,
              section: 'Documentation'
            },
            {
              label: 'Will copies of the child\'s birth certificate be attached?',
              type: 'select',
              required: true,
              section: 'Documentation',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Will copies of custody documents be attached (if applicable)?',
              type: 'select',
              required: true,
              section: 'Documentation',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Will this consent be translated? If so, into what language(s)?',
              type: 'textarea',
              required: false,
              section: 'Documentation'
            },
            {
              label: 'Is this consent being executed in multiple originals?',
              type: 'select',
              required: true,
              section: 'Documentation',
              options: {
                create: [
                  { value: '1', label: '1' },
                  { value: '2', label: '2' },
                  { value: '3', label: '3' },
                  { value: '4', label: '4' }
                ]
              }
            },
            {
              label: 'Has this consent been verified to meet the requirements of all countries being visited?',
              type: 'select',
              required: true,
              section: 'Documentation',
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

    console.log('Child travel consent seed completed successfully!')
  } catch (error) {
    console.error('Error seeding child travel consent:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the seed function
if (require.main === module) {
  seedChildTravelConsent()
    .catch((error) => {
      console.error('Error running seed:', error)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
} 