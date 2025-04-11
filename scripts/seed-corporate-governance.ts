import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function seedCorporateGovernance() {
  console.log('Starting corporate governance seed...')

  // Ensure corporate category exists
  const category = await prisma.category.upsert({
    where: { id: 'cm9bhpeod000xvbl04d2dxx55' },
    update: {
      name: 'Corporate Governance',
      slug: 'corporate',
      description: 'Board resolutions, bylaws, and corporate policies'
    },
    create: {
      id: 'cm9bhpeod000xvbl04d2dxx55',
      name: 'Corporate Governance',
      slug: 'corporate',
      description: 'Board resolutions, bylaws, and corporate policies'
    }
  })
  console.log('Created/Updated category:', category.name)

  // Create templates in batch
  const templates = [
    {
      id: 'minute-book-rights-inspection',
      name: 'Minute Book Rights of Inspection',
      description: 'Document outlining the rights and procedures for inspecting corporate records',
      content: `# MINUTE BOOK RIGHTS OF INSPECTION
[CORPORATION_NAME]

## REQUEST FOR INSPECTION
This document outlines the request for inspection of corporate records by [REQUESTOR_NAME], a [RELATIONSHIP] of [CORPORATION_NAME].

## CORPORATE INFORMATION
Legal Name of Corporation: [CORPORATION_NAME]

## REQUESTOR INFORMATION
Name: [REQUESTOR_NAME]
Relationship to Corporation: [RELATIONSHIP]
[SHAREHOLDER_INFO]

## INSPECTION DETAILS
Records Requested: [RECORDS_REQUESTED]
Purpose of Inspection: [INSPECTION_PURPOSE]
Time Period: [TIME_PERIOD]
Proposed Inspection Date: [INSPECTION_DATE]
Location: [INSPECTION_LOCATION]
Accompanied By: [ACCOMPANIED_BY]
Copy Request: [COPY_REQUEST]

## CORPORATE POLICIES
Confidentiality Restrictions: [CONFIDENTIALITY_RESTRICTIONS]
Confidentiality Agreement: [CONFIDENTIALITY_AGREEMENT]
Previous Requests: [PREVIOUS_REQUESTS]
Pending Disputes: [PENDING_DISPUTES]

## LEGAL COMPLIANCE
Corporate Policy: [CORPORATE_POLICY]
Bylaws Provisions: [BYLAWS_PROVISIONS]
State Law Requirements: [STATE_LAW_REQUIREMENTS]

## SUPERVISION
Supervising Officer: [SUPERVISING_OFFICER]

## CERTIFICATION
This request for inspection has been reviewed and processed in accordance with corporate policies and applicable laws.

Date: [DATE]
________________________
[SUPERVISING_OFFICER_SIGNATURE]
[SUPERVISING_OFFICER_NAME]`
    },
    {
      id: 'board-resolution',
      name: 'Board Resolution',
      description: 'Formal decision or action taken by the board of directors',
      content: `# BOARD RESOLUTION
[CORPORATION_NAME]

## RESOLUTION
BE IT RESOLVED, that the Board of Directors of [CORPORATION_NAME] hereby:

[RESOLUTION_TEXT]

## VOTING RECORD
The following directors voted in favor of this resolution:
[DIRECTORS_IN_FAVOR]

The following directors voted against this resolution:
[DIRECTORS_AGAINST]

The following directors abstained:
[DIRECTORS_ABSTAINED]

## CERTIFICATION
This resolution was duly adopted by the Board of Directors on [DATE].

________________________
[SECRETARY_SIGNATURE]
Corporate Secretary`
    },
    {
      id: 'shareholder-meeting-notice',
      name: 'Shareholder Meeting Notice',
      description: 'Notice of annual or special meeting of shareholders',
      content: `# NOTICE OF SHAREHOLDER MEETING
[CORPORATION_NAME]

## NOTICE
Notice is hereby given that a [MEETING_TYPE] meeting of the shareholders of [CORPORATION_NAME] will be held:

Date: [MEETING_DATE]
Time: [MEETING_TIME]
Location: [MEETING_LOCATION]

## AGENDA
1. [AGENDA_ITEM_1]
2. [AGENDA_ITEM_2]
3. [AGENDA_ITEM_3]

## VOTING INFORMATION
Record Date: [RECORD_DATE]
Voting Requirements: [VOTING_REQUIREMENTS]

## PROXY INFORMATION
Proxy forms must be received by [PROXY_DEADLINE]

## ADDITIONAL INFORMATION
[ADDITIONAL_NOTES]

________________________
[SECRETARY_SIGNATURE]
Corporate Secretary`
    },
    {
      id: 'officer-appointment',
      name: 'Officer Appointment',
      description: 'Document appointing corporate officers',
      content: `# OFFICER APPOINTMENT
[CORPORATION_NAME]

## APPOINTMENT
The Board of Directors of [CORPORATION_NAME] hereby appoints:

Name: [OFFICER_NAME]
Position: [OFFICER_POSITION]
Effective Date: [EFFECTIVE_DATE]

## TERMS OF APPOINTMENT
[APPOINTMENT_TERMS]

## COMPENSATION
[COMPENSATION_DETAILS]

## CERTIFICATION
This appointment was duly approved by the Board of Directors on [DATE].

________________________
[CHAIRPERSON_SIGNATURE]
Chairperson of the Board`
    },
    {
      id: 'corporate-bylaws',
      name: 'Corporate Bylaws',
      description: 'Rules and procedures for corporate governance',
      content: `# CORPORATE BYLAWS
[CORPORATION_NAME]

## ARTICLE I - OFFICES
### Section 1. Principal Office
The principal office of the corporation shall be located at [PRINCIPAL_OFFICE].

### Section 2. Registered Office
The registered office of the corporation shall be located at [REGISTERED_OFFICE].

## ARTICLE II - SHAREHOLDERS
### Section 1. Annual Meeting
The annual meeting of shareholders shall be held on [ANNUAL_MEETING_DATE].

### Section 2. Special Meetings
Special meetings may be called by [SPECIAL_MEETING_AUTHORITY].

## ARTICLE III - DIRECTORS
### Section 1. Number and Qualification
The number of directors shall be [NUMBER_OF_DIRECTORS].

### Section 2. Election and Term
Directors shall be elected for terms of [DIRECTOR_TERM].

## ARTICLE IV - OFFICERS
### Section 1. Officers
The officers of the corporation shall be [OFFICER_POSITIONS].

### Section 2. Election and Term
Officers shall be elected by the Board of Directors.

## ARTICLE V - COMMITTEES
[COMMITTEE_STRUCTURE]

## ARTICLE VI - INDEMNIFICATION
[INDEMNIFICATION_PROVISIONS]

## ARTICLE VII - AMENDMENTS
These bylaws may be amended by [AMENDMENT_PROCEDURE].

________________________
[INCORPORATOR_SIGNATURE]
Incorporator`
    }
  ]

  // Create templates first
  for (const template of templates) {
    await prisma.documentTemplate.upsert({
      where: { id: template.id },
      update: {
        categoryId: 'cm9bhpeod000xvbl04d2dxx55',
        name: template.name,
        description: template.description,
        content: template.content,
        type: 'document',
        version: '1.0.0',
        state: 'published',
        metadata: {
          sections: template.content.split('##').slice(1).map(section => 
            section.split('\n')[0].trim()
          )
        }
      },
      create: {
        id: template.id,
        name: template.name,
        description: template.description,
        categoryId: 'cm9bhpeod000xvbl04d2dxx55',
        content: template.content,
        type: 'document',
        version: '1.0.0',
        state: 'published',
        metadata: {
          sections: template.content.split('##').slice(1).map(section => 
            section.split('\n')[0].trim()
          )
        }
      }
    })
    console.log('Created/Updated template:', template.name)
  }

  // Create questionnaires after templates
  const questionnaires = [
    {
      id: 'minute-book-rights-inspection-questions',
      name: 'Minute Book Rights of Inspection Questionnaire',
      description: 'Questions for processing a request to inspect corporate records',
      templateId: 'minute-book-rights-inspection',
      questions: [
        {
          label: 'What is the exact legal name of the corporation?',
          type: 'text',
          required: true,
          section: 'Corporate Information'
        },
        {
          label: 'Who is requesting inspection of corporate records?',
          type: 'text',
          required: true,
          section: 'Requestor Details'
        },
        {
          label: 'What is the relationship of the requestor to the corporation? (Shareholder, director, officer, etc.)',
          type: 'text',
          required: true,
          section: 'Requestor Details'
        },
        {
          label: 'If a shareholder, how many shares and what class of shares does the requestor own?',
          type: 'text',
          required: false,
          section: 'Requestor Details'
        },
        {
          label: 'What specific records are being requested for inspection?',
          type: 'textarea',
          required: true,
          section: 'Inspection Details'
        },
        {
          label: 'What is the stated purpose for the inspection?',
          type: 'textarea',
          required: true,
          section: 'Inspection Details'
        },
        {
          label: 'Is the stated purpose reasonably related to the person\'s interest as a shareholder?',
          type: 'select',
          required: true,
          section: 'Inspection Details',
          options: {
            create: [
              { value: 'Yes', label: 'Yes' },
              { value: 'No', label: 'No' },
              { value: 'Not Applicable', label: 'Not Applicable' }
            ]
          }
        },
        {
          label: 'What time period do the requested records cover?',
          type: 'text',
          required: true,
          section: 'Inspection Details'
        },
        {
          label: 'When does the requestor wish to conduct the inspection?',
          type: 'date',
          required: true,
          section: 'Inspection Details'
        },
        {
          label: 'Where will the inspection take place?',
          type: 'text',
          required: true,
          section: 'Inspection Details'
        },
        {
          label: 'Will the requestor be accompanied by anyone during the inspection?',
          type: 'text',
          required: true,
          section: 'Inspection Details'
        },
        {
          label: 'Does the requestor wish to make copies of any records?',
          type: 'select',
          required: true,
          section: 'Inspection Details',
          options: {
            create: [
              { value: 'Yes', label: 'Yes' },
              { value: 'No', label: 'No' }
            ]
          }
        },
        {
          label: 'Are any of the requested records subject to confidentiality restrictions?',
          type: 'select',
          required: true,
          section: 'Corporate Policies',
          options: {
            create: [
              { value: 'Yes', label: 'Yes' },
              { value: 'No', label: 'No' }
            ]
          }
        },
        {
          label: 'Has the requestor signed a confidentiality agreement?',
          type: 'select',
          required: true,
          section: 'Corporate Policies',
          options: {
            create: [
              { value: 'Yes', label: 'Yes' },
              { value: 'No', label: 'No' },
              { value: 'Not Required', label: 'Not Required' }
            ]
          }
        },
        {
          label: 'Has the requestor previously made similar requests?',
          type: 'select',
          required: true,
          section: 'Corporate Policies',
          options: {
            create: [
              { value: 'Yes', label: 'Yes' },
              { value: 'No', label: 'No' }
            ]
          }
        },
        {
          label: 'Are there any pending disputes between the requestor and the corporation?',
          type: 'select',
          required: true,
          section: 'Corporate Policies',
          options: {
            create: [
              { value: 'Yes', label: 'Yes' },
              { value: 'No', label: 'No' }
            ]
          }
        },
        {
          label: 'What is the corporation\'s policy regarding record inspection?',
          type: 'textarea',
          required: true,
          section: 'Legal Compliance'
        },
        {
          label: 'What do the bylaws state regarding inspection rights?',
          type: 'textarea',
          required: true,
          section: 'Legal Compliance'
        },
        {
          label: 'Does state law impose any specific requirements regarding this inspection request?',
          type: 'textarea',
          required: true,
          section: 'Legal Compliance'
        },
        {
          label: 'Who will supervise the inspection on behalf of the corporation?',
          type: 'text',
          required: true,
          section: 'Supervision'
        }
      ]
    },
    {
      id: 'board-resolution-questions',
      name: 'Board Resolution Questionnaire',
      description: 'Questions for creating a board resolution',
      templateId: 'board-resolution',
      questions: [
        {
          label: 'What is the name of the corporation?',
          type: 'text',
          required: true,
          section: 'Basic Information'
        },
        {
          label: 'What is the text of the resolution?',
          type: 'textarea',
          required: true,
          section: 'Resolution'
        },
        {
          label: 'Which directors voted in favor?',
          type: 'textarea',
          required: true,
          section: 'Voting Record'
        },
        {
          label: 'Which directors voted against?',
          type: 'textarea',
          required: true,
          section: 'Voting Record'
        },
        {
          label: 'Which directors abstained?',
          type: 'textarea',
          required: true,
          section: 'Voting Record'
        },
        {
          label: 'What is the date of adoption?',
          type: 'date',
          required: true,
          section: 'Certification'
        }
      ]
    },
    {
      id: 'shareholder-meeting-notice-questions',
      name: 'Shareholder Meeting Notice Questionnaire',
      description: 'Questions for creating a shareholder meeting notice',
      templateId: 'shareholder-meeting-notice',
      questions: [
        {
          label: 'What is the name of the corporation?',
          type: 'text',
          required: true,
          section: 'Basic Information'
        },
        {
          label: 'What type of meeting is this?',
          type: 'select',
          required: true,
          section: 'Notice',
          options: {
            create: [
              { value: 'Annual', label: 'Annual' },
              { value: 'Special', label: 'Special' }
            ]
          }
        },
        {
          label: 'What is the meeting date?',
          type: 'date',
          required: true,
          section: 'Notice'
        },
        {
          label: 'What is the meeting time?',
          type: 'text',
          required: true,
          section: 'Notice'
        },
        {
          label: 'Where is the meeting location?',
          type: 'text',
          required: true,
          section: 'Notice'
        },
        {
          label: 'What is the record date for voting?',
          type: 'date',
          required: true,
          section: 'Voting Information'
        },
        {
          label: 'What are the voting requirements?',
          type: 'textarea',
          required: true,
          section: 'Voting Information'
        },
        {
          label: 'What is the deadline for proxy forms?',
          type: 'date',
          required: true,
          section: 'Proxy Information'
        }
      ]
    },
    {
      id: 'officer-appointment-questions',
      name: 'Officer Appointment Questionnaire',
      description: 'Questions for creating an officer appointment document',
      templateId: 'officer-appointment',
      questions: [
        {
          label: 'What is the name of the corporation?',
          type: 'text',
          required: true,
          section: 'Basic Information'
        },
        {
          label: 'What is the name of the officer being appointed?',
          type: 'text',
          required: true,
          section: 'Appointment'
        },
        {
          label: 'What position is being appointed?',
          type: 'text',
          required: true,
          section: 'Appointment'
        },
        {
          label: 'What is the effective date of the appointment?',
          type: 'date',
          required: true,
          section: 'Appointment'
        },
        {
          label: 'What are the terms of the appointment?',
          type: 'textarea',
          required: true,
          section: 'Terms of Appointment'
        },
        {
          label: 'What are the compensation details?',
          type: 'textarea',
          required: true,
          section: 'Compensation'
        }
      ]
    },
    {
      id: 'corporate-bylaws-questions',
      name: 'Corporate Bylaws Questionnaire',
      description: 'Questions for creating corporate bylaws',
      templateId: 'corporate-bylaws',
      questions: [
        {
          label: 'What is the name of the corporation?',
          type: 'text',
          required: true,
          section: 'Basic Information'
        },
        {
          label: 'Where is the principal office located?',
          type: 'text',
          required: true,
          section: 'Offices'
        },
        {
          label: 'Where is the registered office located?',
          type: 'text',
          required: true,
          section: 'Offices'
        },
        {
          label: 'When is the annual meeting of shareholders held?',
          type: 'text',
          required: true,
          section: 'Shareholders'
        },
        {
          label: 'How many directors are there?',
          type: 'number',
          required: true,
          section: 'Directors'
        },
        {
          label: 'What is the term length for directors?',
          type: 'text',
          required: true,
          section: 'Directors'
        },
        {
          label: 'What officer positions are required?',
          type: 'textarea',
          required: true,
          section: 'Officers'
        },
        {
          label: 'What is the committee structure?',
          type: 'textarea',
          required: true,
          section: 'Committees'
        },
        {
          label: 'What are the indemnification provisions?',
          type: 'textarea',
          required: true,
          section: 'Indemnification'
        },
        {
          label: 'What is the amendment procedure?',
          type: 'textarea',
          required: true,
          section: 'Amendments'
        }
      ]
    }
  ]

  // Create questionnaires after templates
  for (const questionnaire of questionnaires) {
    // Ensure template exists
    const template = await prisma.documentTemplate.findUnique({
      where: { id: questionnaire.templateId }
    })

    if (!template) {
      console.log('Template not found for questionnaire:', questionnaire.name)
      continue
    }

    // First, check if questionnaire exists
    const existingQuestionnaire = await prisma.questionnaire.findUnique({
      where: { id: questionnaire.id },
      include: { 
        questions: {
          include: {
            options: true
          }
        }
      }
    })

    if (existingQuestionnaire) {
      // Update existing questionnaire metadata
      await prisma.questionnaire.update({
        where: { id: questionnaire.id },
        data: {
          name: questionnaire.name,
          description: questionnaire.description,
          templateId: questionnaire.templateId
        }
      })

      // Update or create questions
      for (const question of questionnaire.questions) {
        const existingQuestion = existingQuestionnaire.questions.find(q => q.label === question.label)

        if (existingQuestion) {
          // Update existing question
          await prisma.question.update({
            where: { id: existingQuestion.id },
            data: {
              type: question.type,
              required: question.required,
              section: question.section
            }
          })

          // Handle options if they exist
          if (question.options) {
            // Update or create options
            for (const option of question.options.create) {
              const existingOption = existingQuestion.options.find(o => o.value === option.value)
              
              if (existingOption) {
                await prisma.questionOption.update({
                  where: { id: existingOption.id },
                  data: {
                    label: option.label
                  }
                })
              } else {
                await prisma.questionOption.create({
                  data: {
                    ...option,
                    questionId: existingQuestion.id
                  }
                })
              }
            }

            // Remove options that no longer exist
            const validOptionValues = question.options.create.map(o => o.value)
            for (const existingOpt of existingQuestion.options) {
              if (!validOptionValues.includes(existingOpt.value)) {
                await prisma.questionOption.delete({
                  where: { id: existingOpt.id }
                })
              }
            }
          }
        } else {
          // Create new question
          await prisma.question.create({
            data: {
              ...question,
              questionnaireId: questionnaire.id
            }
          })
        }
      }

      // Remove questions that no longer exist in the seed data
      const validQuestionLabels = questionnaire.questions.map(q => q.label)
      for (const existingQ of existingQuestionnaire.questions) {
        if (!validQuestionLabels.includes(existingQ.label)) {
          await prisma.question.delete({
            where: { id: existingQ.id }
          })
        }
      }
    } else {
      // Create new questionnaire with all its questions
      await prisma.questionnaire.create({
        data: {
          id: questionnaire.id,
          name: questionnaire.name,
          description: questionnaire.description,
          templateId: questionnaire.templateId,
          questions: {
            create: questionnaire.questions
          }
        }
      })
    }
    console.log('Created/Updated questionnaire:', questionnaire.name)
  }

  console.log('Corporate governance seed completed successfully!')
}

// Run the seed function
seedCorporateGovernance()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 