import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function seedChildMedicalConsent() {
  try {
    console.log('Starting child medical consent seed...')
    
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

    // Create Child Medical Consent template
    const template = await prisma.documentTemplate.upsert({
      where: { id: 'child-medical-consent' },
      update: {
        name: 'Child Medical Consent',
        description: 'A legal document authorizing a temporary caregiver to make medical decisions for a child in the absence of parents or legal guardians.',
        content: `# CHILD MEDICAL CONSENT FORM

This Child Medical Consent Form (the "Consent") is made on [DATE] by:

Parent(s)/Legal Guardian(s):
[PARENT_GUARDIAN_NAMES]
[PARENT_GUARDIAN_ADDRESS]
[PARENT_GUARDIAN_PHONE]
[PARENT_GUARDIAN_EMAIL]

For the benefit of:
Child's Name: [CHILD_NAME]
Date of Birth: [CHILD_DOB]
Address: [CHILD_ADDRESS]

Authorizing:
Temporary Caregiver: [CAREGIVER_NAME]
Relationship to Child: [CAREGIVER_RELATIONSHIP]
Address: [CAREGIVER_ADDRESS]
Phone: [CAREGIVER_PHONE]
Email: [CAREGIVER_EMAIL]

## 1. Duration of Authorization
This consent is valid from [START_DATE] to [END_DATE]
Purpose: [AUTHORIZATION_PURPOSE]

## 2. Medical Information
Primary Healthcare Provider: [PRIMARY_DOCTOR]
Health Insurance Provider: [INSURANCE_PROVIDER]
Policy Number: [POLICY_NUMBER]
Group Number: [GROUP_NUMBER]

## 3. Medical History
Medical Conditions: [MEDICAL_CONDITIONS]
Allergies: [ALLERGIES]
Current Medications: [MEDICATIONS]

## 4. Medication Authorization
Medications Caregiver May Administer: [AUTHORIZED_MEDICATIONS]

## 5. Immunization Status
Status: [IMMUNIZATION_STATUS]
Last Tetanus Shot: [TETANUS_DATE]

## 6. Religious Restrictions
Religious Objections to Treatment: [RELIGIOUS_RESTRICTIONS]

## 7. Blood Transfusion Authorization
Blood Transfusions Authorized: [BLOOD_TRANSFUSION_AUTH]

## 8. Preferred Medical Facilities
Preferred Hospital/Facilities: [PREFERRED_HOSPITALS]

## 9. Emergency Contacts
Secondary Contacts: [EMERGENCY_CONTACTS]

## 10. Documentation
Notarization Required: [NOTARIZATION_REQUIRED]
Witnesses Required: [WITNESSES_REQUIRED]
Attached Documents: [ATTACHED_DOCUMENTS]

## Signatures
_________________
Parent/Legal Guardian Signature
Date: [PARENT_SIGN_DATE]

_________________
Temporary Caregiver Signature
Date: [CAREGIVER_SIGN_DATE]

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
            'Caregiver Information',
            'Authorization Details',
            'Medical Information',
            'Medical History',
            'Medication Authorization',
            'Immunization Status',
            'Religious Restrictions',
            'Emergency Information',
            'Documentation'
          ]
        }
      },
      create: {
        id: 'child-medical-consent',
        name: 'Child Medical Consent',
        description: 'A legal document authorizing a temporary caregiver to make medical decisions for a child in the absence of parents or legal guardians.',
        content: `# CHILD MEDICAL CONSENT FORM

This Child Medical Consent Form (the "Consent") is made on [DATE] by:

Parent(s)/Legal Guardian(s):
[PARENT_GUARDIAN_NAMES]
[PARENT_GUARDIAN_ADDRESS]
[PARENT_GUARDIAN_PHONE]
[PARENT_GUARDIAN_EMAIL]

For the benefit of:
Child's Name: [CHILD_NAME]
Date of Birth: [CHILD_DOB]
Address: [CHILD_ADDRESS]

Authorizing:
Temporary Caregiver: [CAREGIVER_NAME]
Relationship to Child: [CAREGIVER_RELATIONSHIP]
Address: [CAREGIVER_ADDRESS]
Phone: [CAREGIVER_PHONE]
Email: [CAREGIVER_EMAIL]

## 1. Duration of Authorization
This consent is valid from [START_DATE] to [END_DATE]
Purpose: [AUTHORIZATION_PURPOSE]

## 2. Medical Information
Primary Healthcare Provider: [PRIMARY_DOCTOR]
Health Insurance Provider: [INSURANCE_PROVIDER]
Policy Number: [POLICY_NUMBER]
Group Number: [GROUP_NUMBER]

## 3. Medical History
Medical Conditions: [MEDICAL_CONDITIONS]
Allergies: [ALLERGIES]
Current Medications: [MEDICATIONS]

## 4. Medication Authorization
Medications Caregiver May Administer: [AUTHORIZED_MEDICATIONS]

## 5. Immunization Status
Status: [IMMUNIZATION_STATUS]
Last Tetanus Shot: [TETANUS_DATE]

## 6. Religious Restrictions
Religious Objections to Treatment: [RELIGIOUS_RESTRICTIONS]

## 7. Blood Transfusion Authorization
Blood Transfusions Authorized: [BLOOD_TRANSFUSION_AUTH]

## 8. Preferred Medical Facilities
Preferred Hospital/Facilities: [PREFERRED_HOSPITALS]

## 9. Emergency Contacts
Secondary Contacts: [EMERGENCY_CONTACTS]

## 10. Documentation
Notarization Required: [NOTARIZATION_REQUIRED]
Witnesses Required: [WITNESSES_REQUIRED]
Attached Documents: [ATTACHED_DOCUMENTS]

## Signatures
_________________
Parent/Legal Guardian Signature
Date: [PARENT_SIGN_DATE]

_________________
Temporary Caregiver Signature
Date: [CAREGIVER_SIGN_DATE]

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
            'Caregiver Information',
            'Authorization Details',
            'Medical Information',
            'Medical History',
            'Medication Authorization',
            'Immunization Status',
            'Religious Restrictions',
            'Emergency Information',
            'Documentation'
          ]
        }
      }
    })
    console.log('Created/Updated template:', template.name)

    // Create Child Medical Consent questionnaire
    const questionnaire = await prisma.questionnaire.upsert({
      where: { id: `${template.id}-questions` },
      update: {
        questions: {
          deleteMany: {},
          create: [
            // Child Information Section
            {
              label: 'What is the full legal name of the child?',
              type: 'TEXT',
              required: true,
              section: 'Child Information'
            },
            {
              label: 'What is the child\'s date of birth?',
              type: 'DATE',
              required: true,
              section: 'Child Information'
            },
            {
              label: 'What is the child\'s home address?',
              type: 'TEXT',
              required: true,
              section: 'Child Information'
            },
            // Parent/Guardian Information Section
            {
              label: 'What is the full legal name of the parent(s)/legal guardian(s) giving consent?',
              type: 'TEXT',
              required: true,
              section: 'Parent/Guardian Information'
            },
            {
              label: 'What is the relationship of the consenting adult to the child?',
              type: 'TEXT',
              required: true,
              section: 'Parent/Guardian Information'
            },
            {
              label: 'What is the contact information for the parent(s)/legal guardian(s)? (Address, phone, email)',
              type: 'TEXTAREA',
              required: true,
              section: 'Parent/Guardian Information'
            },
            // Caregiver Information Section
            {
              label: 'What is the full legal name of the temporary caregiver being authorized?',
              type: 'TEXT',
              required: true,
              section: 'Caregiver Information'
            },
            {
              label: 'What is the relationship of the temporary caregiver to the child?',
              type: 'TEXT',
              required: true,
              section: 'Caregiver Information'
            },
            {
              label: 'What is the contact information for the temporary caregiver? (Address, phone, email)',
              type: 'TEXTAREA',
              required: true,
              section: 'Caregiver Information'
            },
            // Authorization Details Section
            {
              label: 'What is the time period for which this consent is valid? (Start and end dates)',
              type: 'TEXT',
              required: true,
              section: 'Authorization Details'
            },
            {
              label: 'What is the purpose of this temporary authorization? (Travel, school, temporary custody, etc.)',
              type: 'TEXTAREA',
              required: true,
              section: 'Authorization Details'
            },
            // Medical Information Section
            {
              label: 'What is the child\'s health insurance information? (Provider, policy number, group number)',
              type: 'TEXTAREA',
              required: true,
              section: 'Medical Information'
            },
            {
              label: 'Who is the child\'s primary healthcare provider? (Name, address, phone)',
              type: 'TEXTAREA',
              required: true,
              section: 'Medical Information'
            },
            // Medical History Section
            {
              label: 'Does the child have any known medical conditions? If so, what are they?',
              type: 'TEXTAREA',
              required: true,
              section: 'Medical History'
            },
            {
              label: 'Does the child have any known allergies? If so, what are they?',
              type: 'TEXTAREA',
              required: true,
              section: 'Medical History'
            },
            {
              label: 'What medications is the child currently taking? (Name, dosage, frequency)',
              type: 'TEXTAREA',
              required: true,
              section: 'Medical History'
            },
            // Medication Authorization Section
            {
              label: 'Are there medications that the caregiver is authorized to administer?',
              type: 'TEXTAREA',
              required: true,
              section: 'Medication Authorization'
            },
            // Immunization Status Section
            {
              label: 'What is the child\'s immunization status?',
              type: 'SELECT',
              required: true,
              section: 'Immunization Status',
              options: {
                create: [
                  { value: 'up-to-date', label: 'Up to Date' },
                  { value: 'partial', label: 'Partial' },
                  { value: 'not-up-to-date', label: 'Not Up to Date' }
                ]
              }
            },
            {
              label: 'When was the child\'s last tetanus shot?',
              type: 'DATE',
              required: true,
              section: 'Immunization Status'
            },
            // Religious Restrictions Section
            {
              label: 'Are there any religious objections to certain medical treatments?',
              type: 'TEXTAREA',
              required: false,
              section: 'Religious Restrictions'
            },
            // Emergency Information Section
            {
              label: 'In case of emergency, are blood transfusions authorized?',
              type: 'SELECT',
              required: true,
              section: 'Emergency Information',
              options: {
                create: [
                  { value: 'authorized', label: 'Authorized' },
                  { value: 'not-authorized', label: 'Not Authorized' },
                  { value: 'case-by-case', label: 'Case by Case Basis' }
                ]
              }
            },
            {
              label: 'Are there preferred hospitals or medical facilities for treatment?',
              type: 'TEXTAREA',
              required: false,
              section: 'Emergency Information'
            },
            {
              label: 'Are there secondary emergency contacts if parents cannot be reached?',
              type: 'TEXTAREA',
              required: true,
              section: 'Emergency Information'
            },
            // Documentation Section
            {
              label: 'Does this consent need to be notarized?',
              type: 'SELECT',
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
              type: 'TEXT',
              required: true,
              section: 'Documentation'
            },
            {
              label: 'Will copies of health insurance cards be attached to this consent?',
              type: 'SELECT',
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
              label: 'Will copies of the child\'s immunization records be attached?',
              type: 'SELECT',
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
              label: 'Is this consent being executed in multiple originals?',
              type: 'SELECT',
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
            }
          ]
        }
      },
      create: {
        id: `${template.id}-questions`,
        name: 'Child Medical Consent Questionnaire',
        description: 'Questions for creating a Child Medical Consent form',
        templateId: template.id,
        questions: {
          create: [
            // Child Information Section
            {
              label: 'What is the full legal name of the child?',
              type: 'TEXT',
              required: true,
              section: 'Child Information'
            },
            {
              label: 'What is the child\'s date of birth?',
              type: 'DATE',
              required: true,
              section: 'Child Information'
            },
            {
              label: 'What is the child\'s home address?',
              type: 'TEXT',
              required: true,
              section: 'Child Information'
            },
            // Parent/Guardian Information Section
            {
              label: 'What is the full legal name of the parent(s)/legal guardian(s) giving consent?',
              type: 'TEXT',
              required: true,
              section: 'Parent/Guardian Information'
            },
            {
              label: 'What is the relationship of the consenting adult to the child?',
              type: 'TEXT',
              required: true,
              section: 'Parent/Guardian Information'
            },
            {
              label: 'What is the contact information for the parent(s)/legal guardian(s)? (Address, phone, email)',
              type: 'TEXTAREA',
              required: true,
              section: 'Parent/Guardian Information'
            },
            // Caregiver Information Section
            {
              label: 'What is the full legal name of the temporary caregiver being authorized?',
              type: 'TEXT',
              required: true,
              section: 'Caregiver Information'
            },
            {
              label: 'What is the relationship of the temporary caregiver to the child?',
              type: 'TEXT',
              required: true,
              section: 'Caregiver Information'
            },
            {
              label: 'What is the contact information for the temporary caregiver? (Address, phone, email)',
              type: 'TEXTAREA',
              required: true,
              section: 'Caregiver Information'
            },
            // Authorization Details Section
            {
              label: 'What is the time period for which this consent is valid? (Start and end dates)',
              type: 'TEXT',
              required: true,
              section: 'Authorization Details'
            },
            {
              label: 'What is the purpose of this temporary authorization? (Travel, school, temporary custody, etc.)',
              type: 'TEXTAREA',
              required: true,
              section: 'Authorization Details'
            },
            // Medical Information Section
            {
              label: 'What is the child\'s health insurance information? (Provider, policy number, group number)',
              type: 'TEXTAREA',
              required: true,
              section: 'Medical Information'
            },
            {
              label: 'Who is the child\'s primary healthcare provider? (Name, address, phone)',
              type: 'TEXTAREA',
              required: true,
              section: 'Medical Information'
            },
            // Medical History Section
            {
              label: 'Does the child have any known medical conditions? If so, what are they?',
              type: 'TEXTAREA',
              required: true,
              section: 'Medical History'
            },
            {
              label: 'Does the child have any known allergies? If so, what are they?',
              type: 'TEXTAREA',
              required: true,
              section: 'Medical History'
            },
            {
              label: 'What medications is the child currently taking? (Name, dosage, frequency)',
              type: 'TEXTAREA',
              required: true,
              section: 'Medical History'
            },
            // Medication Authorization Section
            {
              label: 'Are there medications that the caregiver is authorized to administer?',
              type: 'TEXTAREA',
              required: true,
              section: 'Medication Authorization'
            },
            // Immunization Status Section
            {
              label: 'What is the child\'s immunization status?',
              type: 'SELECT',
              required: true,
              section: 'Immunization Status',
              options: {
                create: [
                  { value: 'up-to-date', label: 'Up to Date' },
                  { value: 'partial', label: 'Partial' },
                  { value: 'not-up-to-date', label: 'Not Up to Date' }
                ]
              }
            },
            {
              label: 'When was the child\'s last tetanus shot?',
              type: 'DATE',
              required: true,
              section: 'Immunization Status'
            },
            // Religious Restrictions Section
            {
              label: 'Are there any religious objections to certain medical treatments?',
              type: 'TEXTAREA',
              required: false,
              section: 'Religious Restrictions'
            },
            // Emergency Information Section
            {
              label: 'In case of emergency, are blood transfusions authorized?',
              type: 'SELECT',
              required: true,
              section: 'Emergency Information',
              options: {
                create: [
                  { value: 'authorized', label: 'Authorized' },
                  { value: 'not-authorized', label: 'Not Authorized' },
                  { value: 'case-by-case', label: 'Case by Case Basis' }
                ]
              }
            },
            {
              label: 'Are there preferred hospitals or medical facilities for treatment?',
              type: 'TEXTAREA',
              required: false,
              section: 'Emergency Information'
            },
            {
              label: 'Are there secondary emergency contacts if parents cannot be reached?',
              type: 'TEXTAREA',
              required: true,
              section: 'Emergency Information'
            },
            // Documentation Section
            {
              label: 'Does this consent need to be notarized?',
              type: 'SELECT',
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
              type: 'TEXT',
              required: true,
              section: 'Documentation'
            },
            {
              label: 'Will copies of health insurance cards be attached to this consent?',
              type: 'SELECT',
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
              label: 'Will copies of the child\'s immunization records be attached?',
              type: 'SELECT',
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
              label: 'Is this consent being executed in multiple originals?',
              type: 'SELECT',
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
            }
          ]
        }
      }
    })
    console.log('Created/Updated questionnaire:', questionnaire.name)

    console.log('Child medical consent seed completed successfully!')
  } catch (error) {
    console.error('Error seeding child medical consent:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the seed function
if (require.main === module) {
  seedChildMedicalConsent()
    .catch((error) => {
      console.error('Error running seed:', error)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
} 