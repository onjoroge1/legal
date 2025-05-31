import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedChildVisitationLetter() {
  try {
    console.log('Starting child visitation letter seed...')

    // Create or update the template
    const template = await prisma.documentTemplate.upsert({
      where: { id: 'child-visitation-letter' },
      update: {
        name: 'Child Visitation Letter',
        description: 'Formal letter requesting changes to child visitation arrangements',
        content: `# CHILD VISITATION LETTER

[PARENT_NAME]
[PARENT_ADDRESS]
[PARENT_PHONE]
[PARENT_EMAIL]
[DATE]

[OTHER_PARENT_NAME]
[OTHER_PARENT_ADDRESS]

Dear [OTHER_PARENT_NAME],

I am writing to formally request changes to our current visitation arrangements for our child(ren), [CHILD_NAMES_AND_AGES].

## CURRENT ARRANGEMENTS
[EXISTING_COURT_ORDER]
[CURRENT_VISITATION_ARRANGEMENTS]

## REQUESTED CHANGES
[REQUESTED_CHANGES]
[REASON_FOR_CHANGES]
[TEMPORARY_OR_PERMANENT]
[TEMPORARY_DURATION]

## PROPOSED SCHEDULE
[PROPOSED_DAYS_AND_TIMES]
[EXCHANGE_DETAILS]
[SPECIAL_OCCASIONS]

## CONDITIONS AND COMMUNICATION
[VISITATION_CONDITIONS]
[COMMUNICATION_PLAN]
[MISSED_VISITATION_PLAN]
[SCHEDULE_CHANGE_PROCESS]

## SAFETY AND RELOCATION
[SAFETY_CONCERNS]
[RELOCATION_PLANS]

## ADDITIONAL CONSIDERATIONS
[EDUCATION_HEALTH_COMMUNICATION]
[ACTIVITY_RESTRICTIONS]
[RESPONSE_TIMELINE]
[FORMAL_PROCESS]

I look forward to your response regarding this proposal. Please contact me at [PARENT_PHONE] or [PARENT_EMAIL] to discuss these matters further.

Sincerely,

[PARENT_SIGNATURE]
[PARENT_NAME]`,
        categoryId: 'cm9bh3u2s0001vbcg20r64fyg',
        type: 'document',
        version: '1.0.0',
        state: 'published',
        metadata: {
          sections: [
            'Parent Information',
            'Current Arrangements',
            'Requested Changes',
            'Proposed Schedule',
            'Conditions and Communication',
            'Safety and Relocation',
            'Additional Considerations'
          ]
        }
      },
      create: {
        id: 'child-visitation-letter',
        name: 'Child Visitation Letter',
        description: 'Formal letter requesting changes to child visitation arrangements',
        content: `# CHILD VISITATION LETTER

[PARENT_NAME]
[PARENT_ADDRESS]
[PARENT_PHONE]
[PARENT_EMAIL]
[DATE]

[OTHER_PARENT_NAME]
[OTHER_PARENT_ADDRESS]

Dear [OTHER_PARENT_NAME],

I am writing to formally request changes to our current visitation arrangements for our child(ren), [CHILD_NAMES_AND_AGES].

## CURRENT ARRANGEMENTS
[EXISTING_COURT_ORDER]
[CURRENT_VISITATION_ARRANGEMENTS]

## REQUESTED CHANGES
[REQUESTED_CHANGES]
[REASON_FOR_CHANGES]
[TEMPORARY_OR_PERMANENT]
[TEMPORARY_DURATION]

## PROPOSED SCHEDULE
[PROPOSED_DAYS_AND_TIMES]
[EXCHANGE_DETAILS]
[SPECIAL_OCCASIONS]

## CONDITIONS AND COMMUNICATION
[VISITATION_CONDITIONS]
[COMMUNICATION_PLAN]
[MISSED_VISITATION_PLAN]
[SCHEDULE_CHANGE_PROCESS]

## SAFETY AND RELOCATION
[SAFETY_CONCERNS]
[RELOCATION_PLANS]

## ADDITIONAL CONSIDERATIONS
[EDUCATION_HEALTH_COMMUNICATION]
[ACTIVITY_RESTRICTIONS]
[RESPONSE_TIMELINE]
[FORMAL_PROCESS]

I look forward to your response regarding this proposal. Please contact me at [PARENT_PHONE] or [PARENT_EMAIL] to discuss these matters further.

Sincerely,

[PARENT_SIGNATURE]
[PARENT_NAME]`,
        categoryId: 'cm9bh3u2s0001vbcg20r64fyg',
        type: 'document',
        version: '1.0.0',
        state: 'published',
        metadata: {
          sections: [
            'Parent Information',
            'Current Arrangements',
            'Requested Changes',
            'Proposed Schedule',
            'Conditions and Communication',
            'Safety and Relocation',
            'Additional Considerations'
          ]
        }
      }
    })
    console.log('Created/Updated template:', template.name)

    // Create the questionnaire
    const questionnaire = await prisma.questionnaire.upsert({
      where: { id: `${template.id}-questions` },
      update: {
        questions: {
          deleteMany: {},  // Clear existing questions first
          create: [
            // Parent Information Section
            {
              label: 'What is the full legal name of the parent/guardian writing the letter?',
              type: 'TEXT',
              required: true,
              section: 'Parent Information'
            },
            {
              label: 'What is the relationship to the child(ren)?',
              type: 'TEXT',
              required: true,
              section: 'Parent Information'
            },
            {
              label: 'What is the contact information for the parent writing the letter? (Address, phone, email)',
              type: 'TEXTAREA',
              required: true,
              section: 'Parent Information'
            },
            {
              label: 'What are the full legal names and ages of the child(ren) involved?',
              type: 'TEXTAREA',
              required: true,
              section: 'Parent Information'
            },
            {
              label: 'What is the full legal name of the other parent/guardian?',
              type: 'TEXT',
              required: true,
              section: 'Parent Information'
            },

            // Current Arrangements Section
            {
              label: 'Is there a current court order regarding custody and visitation?',
              type: 'SELECT',
              required: true,
              section: 'Current Arrangements',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'If yes, what court issued the order and what is the case number?',
              type: 'TEXT',
              required: false,
              section: 'Current Arrangements'
            },
            {
              label: 'What are the current visitation arrangements?',
              type: 'TEXTAREA',
              required: true,
              section: 'Current Arrangements'
            },

            // Requested Changes Section
            {
              label: 'What specific changes to visitation are being requested?',
              type: 'TEXTAREA',
              required: true,
              section: 'Requested Changes'
            },
            {
              label: 'What is the reason for the requested changes?',
              type: 'TEXTAREA',
              required: true,
              section: 'Requested Changes'
            },
            {
              label: 'Are these changes intended to be temporary or permanent?',
              type: 'SELECT',
              required: true,
              section: 'Requested Changes',
              options: {
                create: [
                  { value: 'temporary', label: 'Temporary' },
                  { value: 'permanent', label: 'Permanent' }
                ]
              }
            },
            {
              label: 'If temporary, what is the proposed duration?',
              type: 'TEXT',
              required: false,
              section: 'Requested Changes'
            },

            // Proposed Schedule Section
            {
              label: 'What specific days and times are being proposed for visitation?',
              type: 'TEXTAREA',
              required: true,
              section: 'Proposed Schedule'
            },
            {
              label: 'How will exchanges of the child(ren) take place? (Location, time, who will transport)',
              type: 'TEXTAREA',
              required: true,
              section: 'Proposed Schedule'
            },
            {
              label: 'Are there any special occasions (birthdays, holidays) that need specific arrangements?',
              type: 'TEXTAREA',
              required: true,
              section: 'Proposed Schedule'
            },

            // Conditions and Communication Section
            {
              label: 'Are there any proposed conditions for the visitation? (Supervision, location restrictions, etc.)',
              type: 'TEXTAREA',
              required: true,
              section: 'Conditions and Communication'
            },
            {
              label: 'How will communication between parents occur during visitation periods?',
              type: 'TEXTAREA',
              required: true,
              section: 'Conditions and Communication'
            },
            {
              label: 'How will missed visitations be handled or made up?',
              type: 'TEXTAREA',
              required: true,
              section: 'Conditions and Communication'
            },
            {
              label: 'What is the proposed process for making changes to the visitation schedule?',
              type: 'TEXTAREA',
              required: true,
              section: 'Conditions and Communication'
            },

            // Safety and Relocation Section
            {
              label: 'Are there any concerns regarding the child\'s safety or well-being during visitation?',
              type: 'TEXTAREA',
              required: true,
              section: 'Safety and Relocation'
            },
            {
              label: 'Is either parent planning to relocate in the near future?',
              type: 'SELECT',
              required: true,
              section: 'Safety and Relocation',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },

            // Additional Considerations Section
            {
              label: 'How will the parents communicate about the child\'s education, health, and welfare?',
              type: 'TEXTAREA',
              required: true,
              section: 'Additional Considerations'
            },
            {
              label: 'Are there any proposed restrictions on activities during visitation?',
              type: 'TEXTAREA',
              required: true,
              section: 'Additional Considerations'
            },
            {
              label: 'What is the requested timeline for response to this visitation proposal?',
              type: 'TEXT',
              required: true,
              section: 'Additional Considerations'
            },
            {
              label: 'Is this letter being sent as part of a formal mediation or legal process?',
              type: 'SELECT',
              required: true,
              section: 'Additional Considerations',
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
        name: 'Child Visitation Letter Questionnaire',
        description: 'Questions for creating a Child Visitation Letter',
        templateId: template.id,
        questions: {
          create: [
            // Parent Information Section
            {
              label: 'What is the full legal name of the parent/guardian writing the letter?',
              type: 'TEXT',
              required: true,
              section: 'Parent Information'
            },
            {
              label: 'What is the relationship to the child(ren)?',
              type: 'TEXT',
              required: true,
              section: 'Parent Information'
            },
            {
              label: 'What is the contact information for the parent writing the letter? (Address, phone, email)',
              type: 'TEXTAREA',
              required: true,
              section: 'Parent Information'
            },
            {
              label: 'What are the full legal names and ages of the child(ren) involved?',
              type: 'TEXTAREA',
              required: true,
              section: 'Parent Information'
            },
            {
              label: 'What is the full legal name of the other parent/guardian?',
              type: 'TEXT',
              required: true,
              section: 'Parent Information'
            },

            // Current Arrangements Section
            {
              label: 'Is there a current court order regarding custody and visitation?',
              type: 'SELECT',
              required: true,
              section: 'Current Arrangements',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'If yes, what court issued the order and what is the case number?',
              type: 'TEXT',
              required: false,
              section: 'Current Arrangements'
            },
            {
              label: 'What are the current visitation arrangements?',
              type: 'TEXTAREA',
              required: true,
              section: 'Current Arrangements'
            },

            // Requested Changes Section
            {
              label: 'What specific changes to visitation are being requested?',
              type: 'TEXTAREA',
              required: true,
              section: 'Requested Changes'
            },
            {
              label: 'What is the reason for the requested changes?',
              type: 'TEXTAREA',
              required: true,
              section: 'Requested Changes'
            },
            {
              label: 'Are these changes intended to be temporary or permanent?',
              type: 'SELECT',
              required: true,
              section: 'Requested Changes',
              options: {
                create: [
                  { value: 'temporary', label: 'Temporary' },
                  { value: 'permanent', label: 'Permanent' }
                ]
              }
            },
            {
              label: 'If temporary, what is the proposed duration?',
              type: 'TEXT',
              required: false,
              section: 'Requested Changes'
            },

            // Proposed Schedule Section
            {
              label: 'What specific days and times are being proposed for visitation?',
              type: 'TEXTAREA',
              required: true,
              section: 'Proposed Schedule'
            },
            {
              label: 'How will exchanges of the child(ren) take place? (Location, time, who will transport)',
              type: 'TEXTAREA',
              required: true,
              section: 'Proposed Schedule'
            },
            {
              label: 'Are there any special occasions (birthdays, holidays) that need specific arrangements?',
              type: 'TEXTAREA',
              required: true,
              section: 'Proposed Schedule'
            },

            // Conditions and Communication Section
            {
              label: 'Are there any proposed conditions for the visitation? (Supervision, location restrictions, etc.)',
              type: 'TEXTAREA',
              required: true,
              section: 'Conditions and Communication'
            },
            {
              label: 'How will communication between parents occur during visitation periods?',
              type: 'TEXTAREA',
              required: true,
              section: 'Conditions and Communication'
            },
            {
              label: 'How will missed visitations be handled or made up?',
              type: 'TEXTAREA',
              required: true,
              section: 'Conditions and Communication'
            },
            {
              label: 'What is the proposed process for making changes to the visitation schedule?',
              type: 'TEXTAREA',
              required: true,
              section: 'Conditions and Communication'
            },

            // Safety and Relocation Section
            {
              label: 'Are there any concerns regarding the child\'s safety or well-being during visitation?',
              type: 'TEXTAREA',
              required: true,
              section: 'Safety and Relocation'
            },
            {
              label: 'Is either parent planning to relocate in the near future?',
              type: 'SELECT',
              required: true,
              section: 'Safety and Relocation',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },

            // Additional Considerations Section
            {
              label: 'How will the parents communicate about the child\'s education, health, and welfare?',
              type: 'TEXTAREA',
              required: true,
              section: 'Additional Considerations'
            },
            {
              label: 'Are there any proposed restrictions on activities during visitation?',
              type: 'TEXTAREA',
              required: true,
              section: 'Additional Considerations'
            },
            {
              label: 'What is the requested timeline for response to this visitation proposal?',
              type: 'TEXT',
              required: true,
              section: 'Additional Considerations'
            },
            {
              label: 'Is this letter being sent as part of a formal mediation or legal process?',
              type: 'SELECT',
              required: true,
              section: 'Additional Considerations',
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

    console.log('Child visitation letter seed completed successfully!')
  } catch (error) {
    console.error('Error in child visitation letter seed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the seed function if this file is being run directly
if (require.main === module) {
  seedChildVisitationLetter()
    .catch((error) => {
      console.error('Error running seed:', error)
      process.exit(1)
    })
} 