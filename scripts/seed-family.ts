import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function seedFamily() {
  try {
    console.log('Starting family templates seed...')

    // Delete existing questions and questionnaires for cleanup
    await prisma.questionOption.deleteMany({
      where: {
        question: {
          questionnaire: {
            templateId: {
              in: ['child-care-contract', 'child-medical-consent']
            }
          }
        }
      }
    })
    
    await prisma.questionDependency.deleteMany({
      where: {
        question: {
          questionnaire: {
            templateId: {
              in: ['child-care-contract', 'child-medical-consent']
            }
          }
        }
      }
    })

    await prisma.question.deleteMany({
      where: {
        questionnaire: {
          templateId: {
            in: ['child-care-contract', 'child-medical-consent']
          }
        }
      }
    })

    await prisma.questionnaire.deleteMany({
      where: {
        templateId: {
          in: ['child-care-contract', 'child-medical-consent']
        }
      }
    })

    // Get or create family category
    const familyCategory = await prisma.category.upsert({
      where: {
        id: "family"
      },
      update: {},
      create: {
        id: "family",
        name: "Family",
        description: "Legal documents related to family matters including child care, medical consent, and more",
        slug: "family"
      }
    })

    console.log('Found/Created family category:', familyCategory)

    // Create Child Care Contract template
    const childCareContract = await prisma.documentTemplate.upsert({
      where: { id: 'child-care-contract' },
      update: {
        name: 'Child Care Contract / Contrato de Niñera',
        type: 'contract',
        description: 'A comprehensive agreement between parents/guardians and child care providers',
        content: [
          '# Child Care Contract / Contrato de Niñera',
          '',
          'This Child Care Contract (the "Agreement") is made on {contractDate} between:',
          '',
          '## 1. Parties',
          'Parent(s)/Guardian(s):',
          '{parentName}',
          'Address: {parentAddress}',
          'Phone: {parentPhone}',
          'Email: {parentEmail}',
          '',
          'Child Care Provider:',
          '{providerName}',
          'Type: {providerType}',
          'License/Certification: {providerLicense}',
          'Address: {providerAddress}',
          'Phone: {providerPhone}',
          'Email: {providerEmail}',
          '',
          '## 2. Children',
          'This agreement is for the care of the following children:',
          '',
          '{childrenDetails}',
          '',
          'Special Needs/Medical Conditions/Allergies:',
          '{specialNeeds}',
          '',
          '## 3. Location and Schedule',
          'Care Location: {careLocation}',
          '',
          'Start Date: {startDate}',
          'Term: {contractTerm}',
          '',
          'Regular Schedule:',
          '{schedule}',
          '',
          'Holiday Schedule:',
          '{holidaySchedule}',
          '',
          '## 4. Compensation',
          'Regular Rate: {regularRate}',
          'Overtime Rate: {overtimeRate}',
          'Payment Schedule: {paymentSchedule}',
          'Payment Method: {paymentMethod}',
          '',
          'Late Payment Fee: {latePaymentFee}',
          'Deposit Required: {depositAmount}',
          '',
          '## 5. Late Pick-up Policy',
          '{latePickupPolicy}',
          '',
          '## 6. Schedule Changes',
          'Parent Notice Requirement: {parentNotice}',
          'Provider Notice Requirement: {providerNotice}',
          '',
          '## 7. Health and Safety',
          'Sick Child Policy: {sickChildPolicy}',
          'Provider Illness Policy: {providerIllnessPolicy}',
          '',
          '## 8. Meals and Supplies',
          'Meals/Snacks Provided: {mealsProvided}',
          'Required Supplies: {requiredSupplies}',
          '',
          '## 9. Activities and Transportation',
          'Planned Activities: {plannedActivities}',
          'Transportation Authorization: {transportationAuth}',
          '',
          '## 10. Discipline and Care',
          'Discipline Policy: {disciplinePolicy}',
          'Medication Policy: {medicationPolicy}',
          '',
          '## 11. Photography and Media',
          'Photography Permission: {photoPermission}',
          '',
          '## 12. Insurance and Background Check',
          'Liability Insurance: {liabilityInsurance}',
          'Background Check: {backgroundCheck}',
          '',
          '## 13. Termination',
          'Termination Notice: {terminationNotice}',
          '',
          '## 14. Emergency Contacts',
          '{emergencyContacts}',
          '',
          '## 15. Authorized Pick-up Persons',
          '{authorizedPersons}',
          '',
          '## Signatures',
          '',
          '_________________',
          'Parent/Guardian Signature',
          'Date: {parentSignDate}',
          '',
          '_________________',
          'Provider Signature',
          'Date: {providerSignDate}'
        ].join('\n'),
        categoryId: familyCategory.id,
        version: '1.0.0',
        metadata: {
          category: 'family',
          type: 'contract',
          version: '1.0.0'
        }
      },
      create: {
        id: 'child-care-contract',
        name: 'Child Care Contract / Contrato de Niñera',
        type: 'contract',
        description: 'A comprehensive agreement between parents/guardians and child care providers',
        content: [
          '# Child Care Contract / Contrato de Niñera',
          '',
          'This Child Care Contract (the "Agreement") is made on {contractDate} between:',
          '',
          '## 1. Parties',
          'Parent(s)/Guardian(s):',
          '{parentName}',
          'Address: {parentAddress}',
          'Phone: {parentPhone}',
          'Email: {parentEmail}',
          '',
          'Child Care Provider:',
          '{providerName}',
          'Type: {providerType}',
          'License/Certification: {providerLicense}',
          'Address: {providerAddress}',
          'Phone: {providerPhone}',
          'Email: {providerEmail}',
          '',
          '## 2. Children',
          'This agreement is for the care of the following children:',
          '',
          '{childrenDetails}',
          '',
          'Special Needs/Medical Conditions/Allergies:',
          '{specialNeeds}',
          '',
          '## 3. Location and Schedule',
          'Care Location: {careLocation}',
          '',
          'Start Date: {startDate}',
          'Term: {contractTerm}',
          '',
          'Regular Schedule:',
          '{schedule}',
          '',
          'Holiday Schedule:',
          '{holidaySchedule}',
          '',
          '## 4. Compensation',
          'Regular Rate: {regularRate}',
          'Overtime Rate: {overtimeRate}',
          'Payment Schedule: {paymentSchedule}',
          'Payment Method: {paymentMethod}',
          '',
          'Late Payment Fee: {latePaymentFee}',
          'Deposit Required: {depositAmount}',
          '',
          '## 5. Late Pick-up Policy',
          '{latePickupPolicy}',
          '',
          '## 6. Schedule Changes',
          'Parent Notice Requirement: {parentNotice}',
          'Provider Notice Requirement: {providerNotice}',
          '',
          '## 7. Health and Safety',
          'Sick Child Policy: {sickChildPolicy}',
          'Provider Illness Policy: {providerIllnessPolicy}',
          '',
          '## 8. Meals and Supplies',
          'Meals/Snacks Provided: {mealsProvided}',
          'Required Supplies: {requiredSupplies}',
          '',
          '## 9. Activities and Transportation',
          'Planned Activities: {plannedActivities}',
          'Transportation Authorization: {transportationAuth}',
          '',
          '## 10. Discipline and Care',
          'Discipline Policy: {disciplinePolicy}',
          'Medication Policy: {medicationPolicy}',
          '',
          '## 11. Photography and Media',
          'Photography Permission: {photoPermission}',
          '',
          '## 12. Insurance and Background Check',
          'Liability Insurance: {liabilityInsurance}',
          'Background Check: {backgroundCheck}',
          '',
          '## 13. Termination',
          'Termination Notice: {terminationNotice}',
          '',
          '## 14. Emergency Contacts',
          '{emergencyContacts}',
          '',
          '## 15. Authorized Pick-up Persons',
          '{authorizedPersons}',
          '',
          '## Signatures',
          '',
          '_________________',
          'Parent/Guardian Signature',
          'Date: {parentSignDate}',
          '',
          '_________________',
          'Provider Signature',
          'Date: {providerSignDate}'
        ].join('\n'),
        categoryId: familyCategory.id,
        version: '1.0.0',
        metadata: {
          category: 'family',
          type: 'contract',
          version: '1.0.0'
        }
      }
    })

    // Create Child Care Contract questionnaire
    const childCareQuestionnaire = await prisma.questionnaire.create({
      data: {
        id: `${childCareContract.id}-questionnaire`,
        name: 'Child Care Contract Questionnaire',
        description: 'Questions for generating a child care contract',
        templateId: childCareContract.id,
        questions: {
          create: [
            {
              label: 'What is the full legal name of the parent(s)/guardian(s)?',
              type: 'text',
              required: true,
              section: 'Parent Information'
            },
            {
              label: 'What is the contact information for the parent(s)/guardian(s)?',
              type: 'textarea',
              required: true,
              section: 'Parent Information',
              helpText: 'Include address, phone, and email'
            },
            {
              label: 'What is the full legal name of the child care provider?',
              type: 'text',
              required: true,
              section: 'Provider Information'
            },
            {
              label: 'What is the contact information for the child care provider?',
              type: 'textarea',
              required: true,
              section: 'Provider Information',
              helpText: 'Include address, phone, and email'
            },
            {
              label: 'Is the child care provider an individual or a business entity?',
              type: 'select',
              required: true,
              section: 'Provider Information',
              options: {
                create: [
                  { value: 'individual', label: 'Individual' },
                  { value: 'business', label: 'Business Entity' }
                ]
              }
            },
            {
              label: 'If a business entity, what type of entity and what licenses/certifications does it hold?',
              type: 'textarea',
              required: false,
              section: 'Provider Information'
            },
            {
              label: 'What are the full names and ages of each child receiving care?',
              type: 'textarea',
              required: true,
              section: 'Children Information'
            },
            {
              label: 'Does any child have special needs, medical conditions, or allergies that require specific care?',
              type: 'textarea',
              required: true,
              section: 'Children Information'
            },
            {
              label: 'What is the location where care will be provided?',
              type: 'select',
              required: true,
              section: 'Location and Schedule',
              options: {
                create: [
                  { value: 'provider-home', label: "Provider's Home" },
                  { value: 'family-home', label: "Family's Home" },
                  { value: 'other', label: 'Other Location' }
                ]
              }
            },
            {
              label: 'What is the start date of the child care arrangement?',
              type: 'date',
              required: true,
              section: 'Location and Schedule'
            },
            {
              label: 'Is this a fixed-term or ongoing arrangement?',
              type: 'select',
              required: true,
              section: 'Location and Schedule',
              options: {
                create: [
                  { value: 'fixed', label: 'Fixed Term' },
                  { value: 'ongoing', label: 'Ongoing' }
                ]
              }
            },
            {
              label: 'If fixed term, what is the end date?',
              type: 'date',
              required: false,
              section: 'Location and Schedule'
            },
            {
              label: 'What are the regular hours and days of care?',
              type: 'textarea',
              required: true,
              section: 'Location and Schedule',
              helpText: 'Specify for each day of the week'
            },
            {
              label: 'Will care be needed on holidays? If so, which ones?',
              type: 'textarea',
              required: true,
              section: 'Location and Schedule'
            },
            {
              label: 'What is the rate for regular care hours?',
              type: 'text',
              required: true,
              section: 'Compensation',
              helpText: 'Specify hourly, daily, or weekly rate'
            },
            {
              label: 'What is the rate for overtime or extended hours?',
              type: 'text',
              required: true,
              section: 'Compensation'
            },
            {
              label: 'What is the payment schedule?',
              type: 'select',
              required: true,
              section: 'Compensation',
              options: {
                create: [
                  { value: 'weekly', label: 'Weekly' },
                  { value: 'biweekly', label: 'Bi-weekly' },
                  { value: 'monthly', label: 'Monthly' }
                ]
              }
            },
            {
              label: 'What is the preferred payment method?',
              type: 'text',
              required: true,
              section: 'Compensation'
            },
            {
              label: 'Is there a late payment fee? If so, how much?',
              type: 'text',
              required: true,
              section: 'Compensation'
            },
            {
              label: 'Is an advance deposit required? If so, how much?',
              type: 'text',
              required: true,
              section: 'Compensation'
            },
            {
              label: 'What is the policy for late pick-ups? Is there a fee?',
              type: 'textarea',
              required: true,
              section: 'Policies'
            },
            {
              label: 'What notice is required for schedule changes by the parents?',
              type: 'text',
              required: true,
              section: 'Policies'
            },
            {
              label: 'What notice is required if the provider is unavailable?',
              type: 'text',
              required: true,
              section: 'Policies'
            },
            {
              label: 'What is the policy regarding sick children?',
              type: 'textarea',
              required: true,
              section: 'Health and Safety'
            },
            {
              label: 'What is the policy if the provider is sick?',
              type: 'textarea',
              required: true,
              section: 'Health and Safety'
            },
            {
              label: 'What meals and snacks will be provided, if any?',
              type: 'textarea',
              required: true,
              section: 'Meals and Supplies'
            },
            {
              label: 'Who will provide diapers, wipes, formula, etc. for infants?',
              type: 'textarea',
              required: true,
              section: 'Meals and Supplies'
            },
            {
              label: 'Are there activities or outings planned for the children?',
              type: 'textarea',
              required: true,
              section: 'Activities'
            },
            {
              label: 'What is the discipline policy to be followed by the provider?',
              type: 'textarea',
              required: true,
              section: 'Policies'
            },
            {
              label: 'Is the provider authorized to transport the children?',
              type: 'select',
              required: true,
              section: 'Transportation',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'If yes, under what conditions?',
              type: 'textarea',
              required: false,
              section: 'Transportation'
            },
            {
              label: 'Is the provider authorized to administer medications?',
              type: 'select',
              required: true,
              section: 'Health and Safety',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'If yes, which medications and how?',
              type: 'textarea',
              required: false,
              section: 'Health and Safety'
            },
            {
              label: 'Is the provider permitted to take photographs of the children?',
              type: 'select',
              required: true,
              section: 'Media',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Does the provider have liability insurance?',
              type: 'select',
              required: true,
              section: 'Insurance',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Has the provider undergone a background check?',
              type: 'select',
              required: true,
              section: 'Background Check',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'What is the termination policy? How much notice is required by either party?',
              type: 'textarea',
              required: true,
              section: 'Termination'
            },
            {
              label: 'What emergency contacts should be used if parents cannot be reached?',
              type: 'textarea',
              required: true,
              section: 'Emergency Contacts'
            },
            {
              label: 'Who is authorized to pick up the children besides the parents?',
              type: 'textarea',
              required: true,
              section: 'Authorized Persons'
            }
          ]
        }
      }
    })

    // Create Child Medical Consent template
    const childMedicalConsent = await prisma.documentTemplate.upsert({
      where: { id: 'child-medical-consent' },
      update: {
        name: 'Child Medical Consent / Consentimiento Médico para Niños',
        type: 'consent',
        description: 'A legal document authorizing medical treatment for a child by a temporary caregiver',
        content: [
          '# Child Medical Consent / Consentimiento Médico para Niños',
          '',
          'Date: {consentDate}',
          '',
          '## 1. Child Information',
          'Name: {childName}',
          'Date of Birth: {childDOB}',
          'Address: {childAddress}',
          '',
          '## 2. Parent/Legal Guardian Information',
          'Name: {parentName}',
          'Relationship to Child: {parentRelationship}',
          'Address: {parentAddress}',
          'Phone: {parentPhone}',
          'Email: {parentEmail}',
          '',
          '## 3. Temporary Caregiver Information',
          'Name: {caregiverName}',
          'Relationship to Child: {caregiverRelationship}',
          'Address: {caregiverAddress}',
          'Phone: {caregiverPhone}',
          'Email: {caregiverEmail}',
          '',
          '## 4. Consent Period',
          'Start Date: {consentStartDate}',
          'End Date: {consentEndDate}',
          '',
          '## 5. Purpose of Authorization',
          '{authorizationPurpose}',
          '',
          '## 6. Medical Treatment Authorization',
          'Authorized Treatments: {authorizedTreatments}',
          '',
          'Treatments NOT Authorized: {unauthorizedTreatments}',
          '',
          '## 7. Health Insurance Information',
          'Insurance Provider: {insuranceProvider}',
          'Policy Number: {policyNumber}',
          'Group Number: {groupNumber}',
          '',
          '## 8. Healthcare Provider Information',
          'Primary Care Provider: {primaryCare}',
          'Address: {doctorAddress}',
          'Phone: {doctorPhone}',
          '',
          '## 9. Medical History',
          'Medical Conditions: {medicalConditions}',
          'Allergies: {allergies}',
          'Current Medications: {medications}',
          '',
          '## 10. Medication Authorization',
          'Medications Caregiver May Administer: {authorizedMedications}',
          '',
          '## 11. Immunization Status',
          'Status: {immunizationStatus}',
          'Last Tetanus Shot: {tetanusDate}',
          '',
          '## 12. Religious Restrictions',
          'Religious Objections to Treatment: {religiousRestrictions}',
          '',
          '## 13. Blood Transfusion Authorization',
          'Blood Transfusions Authorized: {bloodTransfusionAuth}',
          '',
          '## 14. Preferred Medical Facilities',
          'Preferred Hospital/Facilities: {preferredFacilities}',
          '',
          '## 15. Emergency Contacts',
          'Secondary Contacts: {emergencyContacts}',
          '',
          '## 16. Documentation',
          'Notarization Required: {notarizationRequired}',
          'Witnesses Required: {witnessesRequired}',
          'Attached Documents: {attachedDocuments}',
          '',
          '## Signatures',
          '',
          '_________________',
          'Parent/Legal Guardian Signature',
          'Date: {parentSignDate}',
          '',
          '_________________',
          'Temporary Caregiver Signature',
          'Date: {caregiverSignDate}',
          '',
          '{witnessBlock}',
          '',
          '{notaryBlock}'
        ].join('\n'),
        categoryId: familyCategory.id,
        version: '1.0.0',
        metadata: {
          category: 'family',
          type: 'consent',
          version: '1.0.0'
        }
      },
      create: {
        id: 'child-medical-consent',
        name: 'Child Medical Consent / Consentimiento Médico para Niños',
        type: 'consent',
        description: 'A legal document authorizing medical treatment for a child by a temporary caregiver',
        content: [
          '# Child Medical Consent / Consentimiento Médico para Niños',
          '',
          'Date: {consentDate}',
          '',
          '## 1. Child Information',
          'Name: {childName}',
          'Date of Birth: {childDOB}',
          'Address: {childAddress}',
          '',
          '## 2. Parent/Legal Guardian Information',
          'Name: {parentName}',
          'Relationship to Child: {parentRelationship}',
          'Address: {parentAddress}',
          'Phone: {parentPhone}',
          'Email: {parentEmail}',
          '',
          '## 3. Temporary Caregiver Information',
          'Name: {caregiverName}',
          'Relationship to Child: {caregiverRelationship}',
          'Address: {caregiverAddress}',
          'Phone: {caregiverPhone}',
          'Email: {caregiverEmail}',
          '',
          '## 4. Consent Period',
          'Start Date: {consentStartDate}',
          'End Date: {consentEndDate}',
          '',
          '## 5. Purpose of Authorization',
          '{authorizationPurpose}',
          '',
          '## 6. Medical Treatment Authorization',
          'Authorized Treatments: {authorizedTreatments}',
          '',
          'Treatments NOT Authorized: {unauthorizedTreatments}',
          '',
          '## 7. Health Insurance Information',
          'Insurance Provider: {insuranceProvider}',
          'Policy Number: {policyNumber}',
          'Group Number: {groupNumber}',
          '',
          '## 8. Healthcare Provider Information',
          'Primary Care Provider: {primaryCare}',
          'Address: {doctorAddress}',
          'Phone: {doctorPhone}',
          '',
          '## 9. Medical History',
          'Medical Conditions: {medicalConditions}',
          'Allergies: {allergies}',
          'Current Medications: {medications}',
          '',
          '## 10. Medication Authorization',
          'Medications Caregiver May Administer: {authorizedMedications}',
          '',
          '## 11. Immunization Status',
          'Status: {immunizationStatus}',
          'Last Tetanus Shot: {tetanusDate}',
          '',
          '## 12. Religious Restrictions',
          'Religious Objections to Treatment: {religiousRestrictions}',
          '',
          '## 13. Blood Transfusion Authorization',
          'Blood Transfusions Authorized: {bloodTransfusionAuth}',
          '',
          '## 14. Preferred Medical Facilities',
          'Preferred Hospital/Facilities: {preferredFacilities}',
          '',
          '## 15. Emergency Contacts',
          'Secondary Contacts: {emergencyContacts}',
          '',
          '## 16. Documentation',
          'Notarization Required: {notarizationRequired}',
          'Witnesses Required: {witnessesRequired}',
          'Attached Documents: {attachedDocuments}',
          '',
          '## Signatures',
          '',
          '_________________',
          'Parent/Legal Guardian Signature',
          'Date: {parentSignDate}',
          '',
          '_________________',
          'Temporary Caregiver Signature',
          'Date: {caregiverSignDate}',
          '',
          '{witnessBlock}',
          '',
          '{notaryBlock}'
        ].join('\n'),
        categoryId: familyCategory.id,
        version: '1.0.0',
        metadata: {
          category: 'family',
          type: 'consent',
          version: '1.0.0'
        }
      }
    })

    // Create Child Medical Consent questionnaire
    const medicalConsentQuestionnaire = await prisma.questionnaire.create({
      data: {
        id: `${childMedicalConsent.id}-questionnaire`,
        name: 'Child Medical Consent Questionnaire',
        description: 'Questions for generating a child medical consent form',
        templateId: childMedicalConsent.id,
        questions: {
          create: [
            {
              label: 'What is the full legal name of the child?',
              type: 'text',
              required: true,
              section: 'Child Information'
            },
            {
              label: "What is the child's date of birth?",
              type: 'date',
              required: true,
              section: 'Child Information'
            },
            {
              label: "What is the child's home address?",
              type: 'textarea',
              required: true,
              section: 'Child Information'
            },
            {
              label: 'What is the full legal name of the parent(s)/legal guardian(s) giving consent?',
              type: 'text',
              required: true,
              section: 'Parent Information'
            },
            {
              label: 'What is the relationship of the consenting adult to the child?',
              type: 'text',
              required: true,
              section: 'Parent Information'
            },
            {
              label: 'What is the contact information for the parent(s)/legal guardian(s)?',
              type: 'textarea',
              required: true,
              section: 'Parent Information',
              helpText: 'Include address, phone, and email'
            },
            {
              label: 'What is the full legal name of the temporary caregiver being authorized?',
              type: 'text',
              required: true,
              section: 'Caregiver Information'
            },
            {
              label: 'What is the relationship of the temporary caregiver to the child?',
              type: 'text',
              required: true,
              section: 'Caregiver Information'
            },
            {
              label: 'What is the contact information for the temporary caregiver?',
              type: 'textarea',
              required: true,
              section: 'Caregiver Information',
              helpText: 'Include address, phone, and email'
            },
            {
              label: 'What is the start date for this consent?',
              type: 'date',
              required: true,
              section: 'Consent Period'
            },
            {
              label: 'What is the end date for this consent?',
              type: 'date',
              required: true,
              section: 'Consent Period'
            },
            {
              label: 'What is the purpose of this temporary authorization?',
              type: 'select',
              required: true,
              section: 'Authorization',
              options: {
                create: [
                  { value: 'travel', label: 'Travel' },
                  { value: 'school', label: 'School' },
                  { value: 'temporary-custody', label: 'Temporary Custody' },
                  { value: 'other', label: 'Other' }
                ]
              }
            },
            {
              label: 'What specific medical treatments or procedures are being authorized?',
              type: 'textarea',
              required: true,
              section: 'Medical Authorization'
            },
            {
              label: 'Are there any specific medical treatments that are NOT authorized?',
              type: 'textarea',
              required: true,
              section: 'Medical Authorization'
            },
            {
              label: "What is the child's health insurance information?",
              type: 'textarea',
              required: true,
              section: 'Insurance Information',
              helpText: 'Include provider, policy number, and group number'
            },
            {
              label: "Who is the child's primary healthcare provider?",
              type: 'textarea',
              required: true,
              section: 'Healthcare Provider',
              helpText: 'Include name, address, and phone'
            },
            {
              label: 'Does the child have any known medical conditions?',
              type: 'textarea',
              required: true,
              section: 'Medical History'
            },
            {
              label: 'Does the child have any known allergies?',
              type: 'textarea',
              required: true,
              section: 'Medical History'
            },
            {
              label: 'What medications is the child currently taking?',
              type: 'textarea',
              required: true,
              section: 'Medical History',
              helpText: 'Include name, dosage, and frequency'
            },
            {
              label: 'What medications is the caregiver authorized to administer?',
              type: 'textarea',
              required: true,
              section: 'Medication Authorization'
            },
            {
              label: "What is the child's immunization status?",
              type: 'textarea',
              required: true,
              section: 'Immunizations'
            },
            {
              label: "When was the child's last tetanus shot?",
              type: 'date',
              required: true,
              section: 'Immunizations'
            },
            {
              label: 'Are there any religious objections to certain medical treatments?',
              type: 'textarea',
              required: true,
              section: 'Religious Restrictions'
            },
            {
              label: 'Are blood transfusions authorized?',
              type: 'select',
              required: true,
              section: 'Medical Authorization',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Are there preferred hospitals or medical facilities for treatment?',
              type: 'textarea',
              required: true,
              section: 'Preferred Facilities'
            },
            {
              label: 'Who are the secondary emergency contacts if parents cannot be reached?',
              type: 'textarea',
              required: true,
              section: 'Emergency Contacts'
            },
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
              label: 'Does this consent need to be witnessed?',
              type: 'select',
              required: true,
              section: 'Documentation',
              options: {
                create: [
                  { value: 'no', label: 'No witnesses required' },
                  { value: 'one', label: 'One witness' },
                  { value: 'two', label: 'Two witnesses' }
                ]
              }
            },
            {
              label: 'Will copies of health insurance cards be attached?',
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
              label: "Will copies of the child's immunization records be attached?",
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

    console.log('Successfully created templates:', {
      childCareContract: childCareContract.id,
      childCareQuestionnaire: childCareQuestionnaire.id,
      childMedicalConsent: childMedicalConsent.id,
      medicalConsentQuestionnaire: medicalConsentQuestionnaire.id
    })

  } catch (error) {
    console.error('Failed to create templates. Error:', error)
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
  } finally {
    await prisma.$disconnect()
  }
}

// Run the creation
seedFamily() 