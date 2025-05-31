import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface QuestionInput {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect' | 'date' | 'number' | 'boolean';
  required: boolean;
  helpText: string | null;
  placeholder: string | null;
  section: string;
  questionnaireId: string;
  options?: {
    create: {
      id: string;
      value: string;
      label: string;
    }[];
  };
}

interface SelectOptionInput {
  questionLabel: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}

async function main() {
  console.log('Starting family law template seed...')

  // Create or update the family law category
  const familyLawCategory = await prisma.category.upsert({
    where: { id: 'family-law-category' },
    update: {},
    create: {
      id: 'family-law-category',
      name: 'Family Law',
      slug: 'family-law',
      description: 'Legal documents and contracts related to family matters, including child care, custody, and support agreements.',
    },
  })

  console.log('Family Law category created/updated')

  // Create Child Care Contract template and questionnaire
  const childCareContract = await prisma.documentTemplate.upsert({
    where: { id: 'child-care-contract' },
    update: {},
    create: {
      id: 'child-care-contract',
      name: 'Child Care Contract',
      description: 'A comprehensive agreement between parents/guardians and child care providers outlining the terms and conditions of child care services.',
      content: `# Child Care Contract

This Child Care Contract (the "Contract") is made and entered into on [DATE] by and between:

[PARENT/GUARDIAN NAME(S)] ("Parents/Guardians")
[ADDRESS]
[PHONE]
[EMAIL]

and

[CHILD CARE PROVIDER NAME] ("Provider")
[ADDRESS]
[PHONE]
[EMAIL]

## 1. Children Receiving Care
[CHILDREN DETAILS]

## 2. Care Arrangement
- Start Date: [START DATE]
- Type: [FIXED-TERM/ONGOING]
- End Date (if fixed-term): [END DATE]
- Location: [CARE LOCATION]

## 3. Schedule
[REGULAR HOURS AND DAYS]

## 4. Financial Terms
- Regular Rate: [RATE]
- Overtime Rate: [OVERTIME RATE]
- Payment Schedule: [PAYMENT SCHEDULE]
- Payment Method: [PAYMENT METHOD]
- Late Payment Fee: [LATE FEE]
- Advance Deposit: [DEPOSIT AMOUNT]

## 5. Policies
[POLICIES DETAILS]

## 6. Emergency Contacts
[EMERGENCY CONTACTS]

## 7. Authorized Pick-up Persons
[AUTHORIZED PERSONS]

## 8. Termination
[TERMINATION POLICY]

IN WITNESS WHEREOF, the parties have executed this Contract as of the date first written above.

Parents/Guardians:
_____________________
Date: _______________

Provider:
_____________________
Date: _______________`,
      type: 'document',
      categoryId: familyLawCategory.id,
      version: '1.0.0',
      state: 'active',
      metadata: {
        variables: [
          'DATE',
          'PARENT/GUARDIAN NAME(S)',
          'ADDRESS',
          'PHONE',
          'EMAIL',
          'CHILD CARE PROVIDER NAME',
          'CHILDREN DETAILS',
          'START DATE',
          'FIXED-TERM/ONGOING',
          'END DATE',
          'CARE LOCATION',
          'REGULAR HOURS AND DAYS',
          'RATE',
          'OVERTIME RATE',
          'PAYMENT SCHEDULE',
          'PAYMENT METHOD',
          'LATE FEE',
          'DEPOSIT AMOUNT',
          'POLICIES DETAILS',
          'EMERGENCY CONTACTS',
          'AUTHORIZED PERSONS',
          'TERMINATION POLICY'
        ]
      },
      variables: []
    },
  })

  const childCareQuestionnaire = await prisma.questionnaire.upsert({
    where: { id: 'child-care-contract-questions' },
    update: {},
    create: {
      id: 'child-care-contract-questions',
      name: 'Child Care Contract Questions',
      description: 'Questions for gathering information to create a child care contract',
      templateId: childCareContract.id,
      metadata: {}
    },
  })

  // Create Child Care Contract questions
  const childCareQuestions: QuestionInput[] = [
    {
      id: 'child-care-contract-questions-1',
      label: 'Date',
      type: 'date',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Contract Information',
      questionnaireId: childCareQuestionnaire.id
    },
    {
      id: 'child-care-contract-questions-2',
      label: 'Parent/Guardian Names',
      type: 'text',
      required: true,
      helpText: 'Enter full names of all parents/guardians',
      placeholder: 'John Doe, Jane Doe',
      section: 'Contract Information',
      questionnaireId: childCareQuestionnaire.id
    },
    {
      id: 'child-care-contract-questions-3',
      label: 'Address',
      type: 'text',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Contract Information',
      questionnaireId: childCareQuestionnaire.id
    },
    {
      id: 'child-care-contract-questions-4',
      label: 'Phone',
      type: 'text',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Contract Information',
      questionnaireId: childCareQuestionnaire.id
    },
    {
      id: 'child-care-contract-questions-5',
      label: 'Email',
      type: 'text',
      required: true,
      helpText: 'Enter a valid email address',
      placeholder: 'example@email.com',
      section: 'Contract Information',
      questionnaireId: childCareQuestionnaire.id
    },
    {
      id: 'child-care-contract-questions-6',
      label: 'Child Care Provider Name',
      type: 'text',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Provider Information',
      questionnaireId: childCareQuestionnaire.id
    },
    {
      id: 'child-care-contract-questions-7',
      label: 'Children Details',
      type: 'textarea',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Children Information',
      questionnaireId: childCareQuestionnaire.id
    },
    {
      id: 'child-care-contract-questions-8',
      label: 'Start Date',
      type: 'date',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Care Arrangement',
      questionnaireId: childCareQuestionnaire.id
    },
    {
      id: 'child-care-contract-questions-9',
      label: 'Contract Type',
      type: 'select',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Care Arrangement',
      questionnaireId: childCareQuestionnaire.id
    },
    {
      id: 'child-care-contract-questions-10',
      label: 'End Date',
      type: 'date',
      required: false,
      helpText: null,
      placeholder: null,
      section: 'Care Arrangement',
      questionnaireId: childCareQuestionnaire.id
    },
    {
      id: 'child-care-contract-questions-11',
      label: 'Care Location',
      type: 'text',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Care Arrangement',
      questionnaireId: childCareQuestionnaire.id
    },
    {
      id: 'child-care-contract-questions-12',
      label: 'Regular Hours and Days',
      type: 'textarea',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Schedule',
      questionnaireId: childCareQuestionnaire.id
    },
    {
      id: 'child-care-contract-questions-13',
      label: 'Rate',
      type: 'text',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Financial Terms',
      questionnaireId: childCareQuestionnaire.id
    },
    {
      id: 'child-care-contract-questions-14',
      label: 'Overtime Rate',
      type: 'text',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Financial Terms',
      questionnaireId: childCareQuestionnaire.id
    },
    {
      id: 'child-care-contract-questions-15',
      label: 'Payment Schedule',
      type: 'select',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Financial Terms',
      questionnaireId: childCareQuestionnaire.id
    },
    {
      id: 'child-care-contract-questions-16',
      label: 'Payment Method',
      type: 'select',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Financial Terms',
      questionnaireId: childCareQuestionnaire.id
    },
    {
      id: 'child-care-contract-questions-17',
      label: 'Late Fee',
      type: 'text',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Financial Terms',
      questionnaireId: childCareQuestionnaire.id
    },
    {
      id: 'child-care-contract-questions-18',
      label: 'Deposit Amount',
      type: 'text',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Financial Terms',
      questionnaireId: childCareQuestionnaire.id
    },
    {
      id: 'child-care-contract-questions-19',
      label: 'Policies Details',
      type: 'textarea',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Policies',
      questionnaireId: childCareQuestionnaire.id
    },
    {
      id: 'child-care-contract-questions-20',
      label: 'Emergency Contacts',
      type: 'textarea',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Emergency Information',
      questionnaireId: childCareQuestionnaire.id
    },
    {
      id: 'child-care-contract-questions-21',
      label: 'Authorized Persons',
      type: 'textarea',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Emergency Information',
      questionnaireId: childCareQuestionnaire.id
    },
    {
      id: 'child-care-contract-questions-22',
      label: 'Termination Policy',
      type: 'textarea',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Termination',
      questionnaireId: childCareQuestionnaire.id
    }
  ]

  for (const question of childCareQuestions) {
    const questionId = `${childCareQuestionnaire.id}-${question.id}`
    await prisma.question.upsert({
      where: { id: questionId },
      update: question,
      create: {
        ...question,
        id: questionId
      },
    })
  }

  // Create Child Care Contract options
  const childCareSelectOptions: SelectOptionInput[] = [
    {
      questionLabel: 'Contract Type',
      options: [
        { value: 'fixed-term', label: 'Fixed Term' },
        { value: 'ongoing', label: 'Ongoing' }
      ]
    },
    {
      questionLabel: 'Payment Schedule',
      options: [
        { value: 'weekly', label: 'Weekly' },
        { value: 'bi-weekly', label: 'Bi-weekly' },
        { value: 'monthly', label: 'Monthly' }
      ]
    },
    {
      questionLabel: 'Payment Method',
      options: [
        { value: 'cash', label: 'Cash' },
        { value: 'check', label: 'Check' },
        { value: 'bank-transfer', label: 'Bank Transfer' },
        { value: 'credit-card', label: 'Credit Card' }
      ]
    }
  ]

  for (const { questionLabel, options } of childCareSelectOptions) {
    const question = await prisma.question.findFirst({
      where: { 
        questionnaireId: childCareQuestionnaire.id,
        label: questionLabel 
      }
    })
    if (question) {
      for (const option of options) {
        const optionId = `${question.id}-${option.value}`
        await prisma.questionOption.upsert({
          where: { id: optionId },
          update: {
            value: option.value,
            label: option.label,
            questionId: question.id
          },
          create: {
            id: optionId,
            value: option.value,
            label: option.label,
            questionId: question.id
          }
        })
      }
    }
  }

  console.log('Child Care Contract template, questionnaire, questions, and options created/updated')

  // Create Child Medical Consent template and questionnaire
  const childMedicalConsent = await prisma.documentTemplate.upsert({
    where: { id: 'child-medical-consent' },
    update: {},
    create: {
      id: 'child-medical-consent',
      name: 'Child Medical Consent',
      description: 'A legal document authorizing a temporary caregiver to make medical decisions for a child in the absence of parents or legal guardians.',
      content: `# Child Medical Consent Form

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

Medical Conditions: [MEDICAL_CONDITIONS]
Allergies: [ALLERGIES]
Current Medications: [MEDICATIONS]
Immunization Status: [IMMUNIZATION_STATUS]
Last Tetanus Shot: [TETANUS_DATE]

## 3. Authorized Treatments
Authorized Medical Treatments: [AUTHORIZED_TREATMENTS]
Unauthorized Medical Treatments: [UNAUTHORIZED_TREATMENTS]
Religious Restrictions: [RELIGIOUS_RESTRICTIONS]
Blood Transfusion Authorization: [BLOOD_TRANSFUSION_AUTH]
Preferred Medical Facilities: [PREFERRED_HOSPITALS]

## 4. Emergency Contacts
Secondary Emergency Contacts: [EMERGENCY_CONTACTS]

## 5. Documentation
- Health Insurance Cards Attached: [INSURANCE_CARDS_ATTACHED]
- Immunization Records Attached: [IMMUNIZATION_RECORDS_ATTACHED]
- Number of Originals Executed: [NUMBER_OF_ORIGINALS]

## 6. Authentication
[NOTARIZATION_REQUIREMENTS]
[WITNESS_REQUIREMENTS]

By signing below, I/we authorize the above-named caregiver to consent to medical treatment for my/our child.

Parent/Guardian Signature: _____________________
Date: _______________

Caregiver Signature: _____________________
Date: _______________

[NOTARY_BLOCK]

[WITNESS_SIGNATURES]`,
      type: 'document',
      categoryId: familyLawCategory.id,
      version: '1.0.0',
      state: 'active',
      metadata: {
        variables: [
          'DATE',
          'PARENT_GUARDIAN_NAMES',
          'PARENT_GUARDIAN_ADDRESS',
          'PARENT_GUARDIAN_PHONE',
          'PARENT_GUARDIAN_EMAIL',
          'CHILD_NAME',
          'CHILD_DOB',
          'CHILD_ADDRESS',
          'CAREGIVER_NAME',
          'CAREGIVER_RELATIONSHIP',
          'CAREGIVER_ADDRESS',
          'CAREGIVER_PHONE',
          'CAREGIVER_EMAIL',
          'START_DATE',
          'END_DATE',
          'AUTHORIZATION_PURPOSE',
          'PRIMARY_DOCTOR',
          'INSURANCE_PROVIDER',
          'POLICY_NUMBER',
          'GROUP_NUMBER',
          'MEDICAL_CONDITIONS',
          'ALLERGIES',
          'MEDICATIONS',
          'IMMUNIZATION_STATUS',
          'TETANUS_DATE',
          'AUTHORIZED_TREATMENTS',
          'UNAUTHORIZED_TREATMENTS',
          'RELIGIOUS_RESTRICTIONS',
          'BLOOD_TRANSFUSION_AUTH',
          'PREFERRED_HOSPITALS',
          'EMERGENCY_CONTACTS',
          'INSURANCE_CARDS_ATTACHED',
          'IMMUNIZATION_RECORDS_ATTACHED',
          'NUMBER_OF_ORIGINALS',
          'NOTARIZATION_REQUIREMENTS',
          'WITNESS_REQUIREMENTS',
          'NOTARY_BLOCK',
          'WITNESS_SIGNATURES'
        ]
      },
      variables: []
    },
  })

  const childMedicalConsentQuestionnaire = await prisma.questionnaire.upsert({
    where: { id: 'child-medical-consent-questions' },
    update: {},
    create: {
      id: 'child-medical-consent-questions',
      name: 'Child Medical Consent Questions',
      description: 'Questions for gathering information to create a child medical consent form',
      templateId: childMedicalConsent.id,
      metadata: {}
    },
  })

  // Create Child Medical Consent questions
  const childMedicalConsentQuestions: QuestionInput[] = [
    {
      id: 'child-medical-consent-questions-1',
      label: 'Date',
      type: 'date',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Consent Information',
      questionnaireId: childMedicalConsentQuestionnaire.id
    },
    {
      id: 'child-medical-consent-questions-2',
      label: 'Parent/Guardian Names',
      type: 'text',
      required: true,
      helpText: 'Enter full names of all parents/guardians',
      placeholder: 'John Doe, Jane Doe',
      section: 'Consent Information',
      questionnaireId: childMedicalConsentQuestionnaire.id
    },
    {
      id: 'child-medical-consent-questions-3',
      label: 'Parent/Guardian Address',
      type: 'text',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Consent Information',
      questionnaireId: childMedicalConsentQuestionnaire.id
    },
    {
      id: 'child-medical-consent-questions-4',
      label: 'Parent/Guardian Phone',
      type: 'text',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Consent Information',
      questionnaireId: childMedicalConsentQuestionnaire.id
    },
    {
      id: 'child-medical-consent-questions-5',
      label: 'Parent/Guardian Email',
      type: 'text',
      required: true,
      helpText: 'Enter a valid email address',
      placeholder: 'example@email.com',
      section: 'Consent Information',
      questionnaireId: childMedicalConsentQuestionnaire.id
    },
    {
      id: 'child-medical-consent-questions-6',
      label: 'Child Name',
      type: 'text',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Child Information',
      questionnaireId: childMedicalConsentQuestionnaire.id
    },
    {
      id: 'child-medical-consent-questions-7',
      label: 'Child Date of Birth',
      type: 'date',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Child Information',
      questionnaireId: childMedicalConsentQuestionnaire.id
    },
    {
      id: 'child-medical-consent-questions-8',
      label: 'Child Address',
      type: 'text',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Child Information',
      questionnaireId: childMedicalConsentQuestionnaire.id
    },
    {
      id: 'child-medical-consent-questions-9',
      label: 'Caregiver Name',
      type: 'text',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Caregiver Information',
      questionnaireId: childMedicalConsentQuestionnaire.id
    },
    {
      id: 'child-medical-consent-questions-10',
      label: 'Caregiver Relationship',
      type: 'text',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Caregiver Information',
      questionnaireId: childMedicalConsentQuestionnaire.id
    },
    {
      id: 'child-medical-consent-questions-11',
      label: 'Caregiver Address',
      type: 'text',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Caregiver Information',
      questionnaireId: childMedicalConsentQuestionnaire.id
    },
    {
      id: 'child-medical-consent-questions-12',
      label: 'Caregiver Phone',
      type: 'text',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Caregiver Information',
      questionnaireId: childMedicalConsentQuestionnaire.id
    },
    {
      id: 'child-medical-consent-questions-13',
      label: 'Caregiver Email',
      type: 'text',
      required: true,
      helpText: 'Enter a valid email address',
      placeholder: 'example@email.com',
      section: 'Caregiver Information',
      questionnaireId: childMedicalConsentQuestionnaire.id
    },
    {
      id: 'child-medical-consent-questions-14',
      label: 'Start Date',
      type: 'date',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Authorization Period',
      questionnaireId: childMedicalConsentQuestionnaire.id
    },
    {
      id: 'child-medical-consent-questions-15',
      label: 'End Date',
      type: 'date',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Authorization Period',
      questionnaireId: childMedicalConsentQuestionnaire.id
    },
    {
      id: 'child-medical-consent-questions-16',
      label: 'Authorization Purpose',
      type: 'textarea',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Authorization Period',
      questionnaireId: childMedicalConsentQuestionnaire.id
    },
    {
      id: 'child-medical-consent-questions-17',
      label: 'Primary Doctor',
      type: 'text',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Medical Information',
      questionnaireId: childMedicalConsentQuestionnaire.id
    },
    {
      id: 'child-medical-consent-questions-18',
      label: 'Insurance Provider',
      type: 'text',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Medical Information',
      questionnaireId: childMedicalConsentQuestionnaire.id
    },
    {
      id: 'child-medical-consent-questions-19',
      label: 'Policy Number',
      type: 'text',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Medical Information',
      questionnaireId: childMedicalConsentQuestionnaire.id
    },
    {
      id: 'child-medical-consent-questions-20',
      label: 'Group Number',
      type: 'text',
      required: false,
      helpText: null,
      placeholder: null,
      section: 'Medical Information',
      questionnaireId: childMedicalConsentQuestionnaire.id
    },
    {
      id: 'child-medical-consent-questions-21',
      label: 'Medical Conditions',
      type: 'textarea',
      required: false,
      helpText: null,
      placeholder: null,
      section: 'Medical Information',
      questionnaireId: childMedicalConsentQuestionnaire.id
    },
    {
      id: 'child-medical-consent-questions-22',
      label: 'Allergies',
      type: 'textarea',
      required: false,
      helpText: null,
      placeholder: null,
      section: 'Medical Information',
      questionnaireId: childMedicalConsentQuestionnaire.id
    },
    {
      id: 'child-medical-consent-questions-23',
      label: 'Current Medications',
      type: 'textarea',
      required: false,
      helpText: null,
      placeholder: null,
      section: 'Medical Information',
      questionnaireId: childMedicalConsentQuestionnaire.id
    },
    {
      id: 'child-medical-consent-questions-24',
      label: 'Immunization Status',
      type: 'select',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Medical Information',
      questionnaireId: childMedicalConsentQuestionnaire.id
    },
    {
      id: 'child-medical-consent-questions-25',
      label: 'Last Tetanus Shot',
      type: 'date',
      required: false,
      helpText: null,
      placeholder: null,
      section: 'Medical Information',
      questionnaireId: childMedicalConsentQuestionnaire.id
    },
    {
      id: 'child-medical-consent-questions-26',
      label: 'Authorized Treatments',
      type: 'textarea',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Authorized Treatments',
      questionnaireId: childMedicalConsentQuestionnaire.id
    },
    {
      id: 'child-medical-consent-questions-27',
      label: 'Unauthorized Treatments',
      type: 'textarea',
      required: false,
      helpText: null,
      placeholder: null,
      section: 'Authorized Treatments',
      questionnaireId: childMedicalConsentQuestionnaire.id
    },
    {
      id: 'child-medical-consent-questions-28',
      label: 'Religious Restrictions',
      type: 'textarea',
      required: false,
      helpText: null,
      placeholder: null,
      section: 'Authorized Treatments',
      questionnaireId: childMedicalConsentQuestionnaire.id
    },
    {
      id: 'child-medical-consent-questions-29',
      label: 'Blood Transfusion Authorization',
      type: 'select',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Authorized Treatments',
      questionnaireId: childMedicalConsentQuestionnaire.id
    },
    {
      id: 'child-medical-consent-questions-30',
      label: 'Preferred Hospitals',
      type: 'textarea',
      required: false,
      helpText: null,
      placeholder: null,
      section: 'Authorized Treatments',
      questionnaireId: childMedicalConsentQuestionnaire.id
    },
    {
      id: 'child-medical-consent-questions-31',
      label: 'Emergency Contacts',
      type: 'textarea',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Emergency Information',
      questionnaireId: childMedicalConsentQuestionnaire.id
    },
    {
      id: 'child-medical-consent-questions-32',
      label: 'Insurance Cards Attached',
      type: 'select',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Documentation',
      questionnaireId: childMedicalConsentQuestionnaire.id
    },
    {
      id: 'child-medical-consent-questions-33',
      label: 'Immunization Records Attached',
      type: 'select',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Documentation',
      questionnaireId: childMedicalConsentQuestionnaire.id
    },
    {
      id: 'child-medical-consent-questions-34',
      label: 'Number of Originals',
      type: 'select',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Documentation',
      questionnaireId: childMedicalConsentQuestionnaire.id
    }
  ]

  for (const question of childMedicalConsentQuestions) {
    const questionId = `${childMedicalConsentQuestionnaire.id}-${question.id}`
    await prisma.question.upsert({
      where: { id: questionId },
      update: question,
      create: {
        ...question,
        id: questionId
      },
    })
  }

  // Create Child Medical Consent options
  const childMedicalConsentSelectOptions: SelectOptionInput[] = [
    {
      questionLabel: 'Immunization Status',
      options: [
        { value: 'up-to-date', label: 'Up to Date' },
        { value: 'partial', label: 'Partial' },
        { value: 'not-up-to-date', label: 'Not Up to Date' }
      ]
    },
    {
      questionLabel: 'Blood Transfusion Authorization',
      options: [
        { value: 'authorized', label: 'Authorized' },
        { value: 'not-authorized', label: 'Not Authorized' },
        { value: 'case-by-case', label: 'Case by Case Basis' }
      ]
    },
    {
      questionLabel: 'Insurance Cards Attached',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
      ]
    },
    {
      questionLabel: 'Immunization Records Attached',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
      ]
    },
    {
      questionLabel: 'Number of Originals',
      options: [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' }
      ]
    }
  ]

  for (const { questionLabel, options } of childMedicalConsentSelectOptions) {
    const question = await prisma.question.findFirst({
      where: { 
        questionnaireId: childMedicalConsentQuestionnaire.id,
        label: questionLabel 
      }
    })
    if (question) {
      for (const option of options) {
        const optionId = `${question.id}-${option.value}`
        await prisma.questionOption.upsert({
          where: { id: optionId },
          update: {
            value: option.value,
            label: option.label,
            questionId: question.id
          },
          create: {
            id: optionId,
            value: option.value,
            label: option.label,
            questionId: question.id
          }
        })
      }
    }
  }

  console.log('Child Medical Consent template, questionnaire, questions, and options created/updated')

  // Create Child Travel Consent template and questionnaire
  const childTravelConsent = await prisma.documentTemplate.upsert({
    where: { id: 'child-travel-consent' },
    update: {},
    create: {
      id: 'child-travel-consent',
      name: 'Child Travel Consent',
      description: 'A legal document authorizing a child to travel with another adult or alone, with parental consent.',
      content: `# Child Travel Consent Form

This Child Travel Consent Form (the "Consent") is made on [DATE] by:

Parent(s)/Legal Guardian(s):
[PARENT_GUARDIAN_NAMES]
Relationship to Child: [PARENT_RELATIONSHIP]
[PARENT_GUARDIAN_ADDRESS]
[PARENT_GUARDIAN_PHONE]
[PARENT_GUARDIAN_EMAIL]

For:
Child's Name: [CHILD_NAME]
Date of Birth: [CHILD_DOB]
Place of Birth: [CHILD_BIRTHPLACE]
Passport Number: [PASSPORT_NUMBER]
Issuing Country: [PASSPORT_COUNTRY]
Expiration Date: [PASSPORT_EXPIRY]

## 1. Consent Details
[CONSENT_TYPE] hereby authorize(s) the following:

Accompanying Adult (if applicable):
[ACCOMPANYING_ADULT_NAME]
Relationship to Child: [ADULT_RELATIONSHIP]
[ADULT_CONTACT_INFO]

## 2. Travel Information
Travel Dates: [TRAVEL_DATES]
Destination Countries: [DESTINATIONS]
Purpose of Travel: [TRAVEL_PURPOSE]
Accommodation Address: [ACCOMMODATION_ADDRESS]

For Unaccompanied Travel:
Airline: [AIRLINE_INFO]
Flight Details: [FLIGHT_DETAILS]

## 3. Authorizations
Authorized Activities: [AUTHORIZED_ACTIVITIES]
Unauthorized Activities: [UNAUTHORIZED_ACTIVITIES]
Medical Authorization: [MEDICAL_AUTH]
Travel Restrictions: [TRAVEL_RESTRICTIONS]

## 4. Documentation
Birth Certificate Attached: [BIRTH_CERT_ATTACHED]
Custody Documents Attached: [CUSTODY_DOCS_ATTACHED]
Translations Provided: [TRANSLATIONS]
Number of Originals: [NUMBER_OF_ORIGINALS]

## 5. Authentication
[NOTARIZATION_REQUIREMENTS]
[WITNESS_REQUIREMENTS]

The undersigned has/have legal custody and/or parental rights of the child and is/are legally authorized to grant this consent.

Parent/Guardian Signature: _____________________
Date: _______________

[NOTARY_BLOCK]

[WITNESS_SIGNATURES]`,
      type: 'document',
      categoryId: familyLawCategory.id,
      version: '1.0.0',
      state: 'active',
      metadata: {
        variables: [
          'DATE',
          'PARENT_GUARDIAN_NAMES',
          'PARENT_RELATIONSHIP',
          'PARENT_GUARDIAN_ADDRESS',
          'PARENT_GUARDIAN_PHONE',
          'PARENT_GUARDIAN_EMAIL',
          'CHILD_NAME',
          'CHILD_DOB',
          'CHILD_BIRTHPLACE',
          'PASSPORT_NUMBER',
          'PASSPORT_COUNTRY',
          'PASSPORT_EXPIRY',
          'CONSENT_TYPE',
          'ACCOMPANYING_ADULT_NAME',
          'ADULT_RELATIONSHIP',
          'ADULT_CONTACT_INFO',
          'TRAVEL_DATES',
          'DESTINATIONS',
          'TRAVEL_PURPOSE',
          'ACCOMMODATION_ADDRESS',
          'AIRLINE_INFO',
          'FLIGHT_DETAILS',
          'AUTHORIZED_ACTIVITIES',
          'UNAUTHORIZED_ACTIVITIES',
          'MEDICAL_AUTH',
          'TRAVEL_RESTRICTIONS',
          'BIRTH_CERT_ATTACHED',
          'CUSTODY_DOCS_ATTACHED',
          'TRANSLATIONS',
          'NUMBER_OF_ORIGINALS',
          'NOTARIZATION_REQUIREMENTS',
          'WITNESS_REQUIREMENTS',
          'NOTARY_BLOCK',
          'WITNESS_SIGNATURES'
        ]
      },
      variables: []
    },
  })

  const childTravelConsentQuestionnaire = await prisma.questionnaire.upsert({
    where: { id: 'child-travel-consent-questions' },
    update: {},
    create: {
      id: 'child-travel-consent-questions',
      name: 'Child Travel Consent Questions',
      description: 'Questions for gathering information to create a child travel consent form',
      templateId: childTravelConsent.id,
      metadata: {}
    },
  })

  // Create Child Travel Consent questions
  const childTravelConsentQuestions: QuestionInput[] = [
    {
      id: 'child-travel-consent-questions-1',
      label: 'Date',
      type: 'date',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Consent Information',
      questionnaireId: childTravelConsentQuestionnaire.id
    },
    {
      id: 'child-travel-consent-questions-2',
      label: 'Parent/Guardian Names',
      type: 'text',
      required: true,
      helpText: 'Enter full names of all parents/guardians',
      placeholder: 'John Doe, Jane Doe',
      section: 'Consent Information',
      questionnaireId: childTravelConsentQuestionnaire.id
    },
    {
      id: 'child-travel-consent-questions-3',
      label: 'Parent Relationship',
      type: 'text',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Consent Information',
      questionnaireId: childTravelConsentQuestionnaire.id
    },
    {
      id: 'child-travel-consent-questions-4',
      label: 'Parent/Guardian Address',
      type: 'text',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Consent Information',
      questionnaireId: childTravelConsentQuestionnaire.id
    },
    {
      id: 'child-travel-consent-questions-5',
      label: 'Parent/Guardian Phone',
      type: 'text',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Consent Information',
      questionnaireId: childTravelConsentQuestionnaire.id
    },
    {
      id: 'child-travel-consent-questions-6',
      label: 'Parent/Guardian Email',
      type: 'text',
      required: true,
      helpText: 'Enter a valid email address',
      placeholder: 'example@email.com',
      section: 'Consent Information',
      questionnaireId: childTravelConsentQuestionnaire.id
    },
    {
      id: 'child-travel-consent-questions-7',
      label: 'Child Name',
      type: 'text',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Child Information',
      questionnaireId: childTravelConsentQuestionnaire.id
    },
    {
      id: 'child-travel-consent-questions-8',
      label: 'Child Date of Birth',
      type: 'date',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Child Information',
      questionnaireId: childTravelConsentQuestionnaire.id
    },
    {
      id: 'child-travel-consent-questions-9',
      label: 'Child Birthplace',
      type: 'text',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Child Information',
      questionnaireId: childTravelConsentQuestionnaire.id
    },
    {
      id: 'child-travel-consent-questions-10',
      label: 'Passport Number',
      type: 'text',
      required: false,
      helpText: null,
      placeholder: null,
      section: 'Child Information',
      questionnaireId: childTravelConsentQuestionnaire.id
    },
    {
      id: 'child-travel-consent-questions-11',
      label: 'Passport Country',
      type: 'text',
      required: false,
      helpText: null,
      placeholder: null,
      section: 'Child Information',
      questionnaireId: childTravelConsentQuestionnaire.id
    },
    {
      id: 'child-travel-consent-questions-12',
      label: 'Passport Expiry',
      type: 'date',
      required: false,
      helpText: null,
      placeholder: null,
      section: 'Child Information',
      questionnaireId: childTravelConsentQuestionnaire.id
    },
    {
      id: 'child-travel-consent-questions-13',
      label: 'Consent Type',
      type: 'select',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Consent Details',
      questionnaireId: childTravelConsentQuestionnaire.id
    },
    {
      id: 'child-travel-consent-questions-14',
      label: 'Accompanying Adult Name',
      type: 'text',
      required: false,
      helpText: null,
      placeholder: null,
      section: 'Consent Details',
      questionnaireId: childTravelConsentQuestionnaire.id
    },
    {
      id: 'child-travel-consent-questions-15',
      label: 'Adult Relationship',
      type: 'text',
      required: false,
      helpText: null,
      placeholder: null,
      section: 'Consent Details',
      questionnaireId: childTravelConsentQuestionnaire.id
    },
    {
      id: 'child-travel-consent-questions-16',
      label: 'Adult Contact Info',
      type: 'textarea',
      required: false,
      helpText: null,
      placeholder: null,
      section: 'Consent Details',
      questionnaireId: childTravelConsentQuestionnaire.id
    },
    {
      id: 'child-travel-consent-questions-17',
      label: 'Travel Dates',
      type: 'text',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Travel Information',
      questionnaireId: childTravelConsentQuestionnaire.id
    },
    {
      id: 'child-travel-consent-questions-18',
      label: 'Destinations',
      type: 'textarea',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Travel Information',
      questionnaireId: childTravelConsentQuestionnaire.id
    },
    {
      id: 'child-travel-consent-questions-19',
      label: 'Travel Purpose',
      type: 'textarea',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Travel Information',
      questionnaireId: childTravelConsentQuestionnaire.id
    },
    {
      id: 'child-travel-consent-questions-20',
      label: 'Accommodation Address',
      type: 'textarea',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Travel Information',
      questionnaireId: childTravelConsentQuestionnaire.id
    },
    {
      id: 'child-travel-consent-questions-21',
      label: 'Airline Info',
      type: 'textarea',
      required: false,
      helpText: null,
      placeholder: null,
      section: 'Travel Information',
      questionnaireId: childTravelConsentQuestionnaire.id
    },
    {
      id: 'child-travel-consent-questions-22',
      label: 'Flight Details',
      type: 'textarea',
      required: false,
      helpText: null,
      placeholder: null,
      section: 'Travel Information',
      questionnaireId: childTravelConsentQuestionnaire.id
    },
    {
      id: 'child-travel-consent-questions-23',
      label: 'Authorized Activities',
      type: 'textarea',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Authorizations',
      questionnaireId: childTravelConsentQuestionnaire.id
    },
    {
      id: 'child-travel-consent-questions-24',
      label: 'Unauthorized Activities',
      type: 'textarea',
      required: false,
      helpText: null,
      placeholder: null,
      section: 'Authorizations',
      questionnaireId: childTravelConsentQuestionnaire.id
    },
    {
      id: 'child-travel-consent-questions-25',
      label: 'Medical Authorization',
      type: 'select',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Authorizations',
      questionnaireId: childTravelConsentQuestionnaire.id
    },
    {
      id: 'child-travel-consent-questions-26',
      label: 'Travel Restrictions',
      type: 'textarea',
      required: false,
      helpText: null,
      placeholder: null,
      section: 'Authorizations',
      questionnaireId: childTravelConsentQuestionnaire.id
    },
    {
      id: 'child-travel-consent-questions-27',
      label: 'Birth Certificate Attached',
      type: 'select',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Documentation',
      questionnaireId: childTravelConsentQuestionnaire.id
    },
    {
      id: 'child-travel-consent-questions-28',
      label: 'Custody Docs Attached',
      type: 'select',
      required: false,
      helpText: null,
      placeholder: null,
      section: 'Documentation',
      questionnaireId: childTravelConsentQuestionnaire.id
    },
    {
      id: 'child-travel-consent-questions-29',
      label: 'Translations',
      type: 'select',
      required: false,
      helpText: null,
      placeholder: null,
      section: 'Documentation',
      questionnaireId: childTravelConsentQuestionnaire.id
    },
    {
      id: 'child-travel-consent-questions-30',
      label: 'Number of Originals',
      type: 'select',
      required: true,
      helpText: null,
      placeholder: null,
      section: 'Documentation',
      questionnaireId: childTravelConsentQuestionnaire.id
    }
  ]

  for (const question of childTravelConsentQuestions) {
    const questionId = `${childTravelConsentQuestionnaire.id}-${question.id}`
    await prisma.question.upsert({
      where: { id: questionId },
      update: question,
      create: {
        ...question,
        id: questionId
      },
    })
  }

  // Create Child Travel Consent options
  const childTravelConsentSelectOptions: SelectOptionInput[] = [
    {
      questionLabel: 'Consent Type',
      options: [
        { value: 'accompanied', label: 'Accompanied by Adult' },
        { value: 'unaccompanied', label: 'Unaccompanied Minor' }
      ]
    },
    {
      questionLabel: 'Medical Authorization',
      options: [
        { value: 'full', label: 'Full Authorization' },
        { value: 'emergency-only', label: 'Emergency Only' },
        { value: 'none', label: 'No Authorization' }
      ]
    },
    {
      questionLabel: 'Birth Certificate Attached',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
      ]
    },
    {
      questionLabel: 'Custody Docs Attached',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
      ]
    },
    {
      questionLabel: 'Translations',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
      ]
    },
    {
      questionLabel: 'Number of Originals',
      options: [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' }
      ]
    }
  ]

  for (const { questionLabel, options } of childTravelConsentSelectOptions) {
    const question = await prisma.question.findFirst({
      where: { 
        questionnaireId: childTravelConsentQuestionnaire.id,
        label: questionLabel 
      }
    })
    if (question) {
      for (const option of options) {
        const optionId = `${question.id}-${option.value}`
        await prisma.questionOption.upsert({
          where: { id: optionId },
          update: {
            value: option.value,
            label: option.label,
            questionId: question.id
          },
          create: {
            id: optionId,
            value: option.value,
            label: option.label,
            questionId: question.id
          }
        })
      }
    }
  }

  console.log('Child Travel Consent template, questionnaire, questions, and options created/updated')
  console.log('All templates, questionnaires, questions, and options created/updated successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })