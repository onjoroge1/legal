import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function seedLegalDocuments() {
  console.log('Starting legal documents seed...')

  // Use existing Corporate Governance category ID
  const CORPORATE_CATEGORY_ID = 'cm9bhpeod000xvbl04d2dxx55'

  // Create Corporate Resolution template
  await prisma.documentTemplate.upsert({
    where: { id: 'corporate-resolution' },
    update: {
      categoryId: CORPORATE_CATEGORY_ID,
      name: 'Corporate Resolution',
      description: 'Formal documentation of corporate decisions and authorizations',
      type: 'document',
      version: '1.0.0',
      state: 'published'
    },
    create: {
      id: 'corporate-resolution',
      name: 'Corporate Resolution',
      description: 'Formal documentation of corporate decisions and authorizations',
      categoryId: CORPORATE_CATEGORY_ID,
      type: 'document',
      version: '1.0.0',
      state: 'published',
      content: `# CORPORATE RESOLUTION
[CORPORATION_NAME]

## RESOLUTION TYPE
☐ Board Resolution
☐ Shareholder Resolution

## MEETING DETAILS
Date: [MEETING_DATE]
Type: [MEETING_TYPE]
Location: [MEETING_LOCATION]
Quorum: [QUORUM_STATUS]

## RESOLUTION
WHEREAS, [BACKGROUND_AND_CONTEXT]

NOW, THEREFORE, BE IT RESOLVED, that [RESOLUTION_TEXT]

## VOTING RESULTS
[VOTING_RESULTS]

## AUTHORIZATION
The following person(s) are authorized to execute documents related to this resolution:
[AUTHORIZED_PERSONS]

## IMPLEMENTATION
Terms and Conditions: [TERMS_CONDITIONS]
Effective Date: [EFFECTIVE_DATE]

## CERTIFICATION
I, [CERTIFYING_OFFICER], do hereby certify that:
1. I am the duly appointed [OFFICER_TITLE] of [CORPORATION_NAME]
2. The foregoing resolution was duly adopted at a meeting of the [MEETING_BODY]
3. Said resolution has not been modified, amended, or rescinded and remains in full force and effect as of the date hereof.

IN WITNESS WHEREOF, I have executed this Certificate as of [CERTIFICATION_DATE]

___________________________
[CERTIFYING_OFFICER_NAME]
[OFFICER_TITLE]

## ATTACHMENTS
[LIST_OF_ATTACHMENTS]`,
      type: 'document',
      version: '1.0.0',
      state: 'published',
      metadata: {
        sections: [
          'Basic Information',
          'Meeting Details',
          'Resolution Content',
          'Authorization',
          'Implementation',
          'Certification',
          'Additional Information'
        ]
      }
    }
  })
  console.log('Created/Updated template: Corporate Resolution')

  // Create Corporate Resolution questionnaire
  await prisma.questionnaire.upsert({
    where: { id: 'corporate-resolution-questions' },
    update: {},
    create: {
      id: 'corporate-resolution-questions',
      name: 'Corporate Resolution Questionnaire',
      description: 'Questions for creating a Corporate Resolution',
      templateId: 'corporate-resolution',
      questions: {
        create: [
          {
            label: 'What is the exact legal name of the corporation?',
            type: 'text',
            required: true,
            section: 'Basic Information',
            helpText: 'Enter the complete legal name of the corporation as registered',
            placeholder: 'e.g., Acme Corporation, Inc.'
          },
          {
            label: 'What type of resolution is being prepared?',
            type: 'select',
            required: true,
            section: 'Basic Information',
            helpText: 'Select whether this is a Board or Shareholder resolution',
            options: {
              create: [
                { value: 'board', label: 'Board Resolution' },
                { value: 'shareholder', label: 'Shareholder Resolution' }
              ]
            }
          },
          {
            label: 'What is the specific action or decision being authorized?',
            type: 'textarea',
            required: true,
            section: 'Resolution Content',
            helpText: 'Describe in detail the action or decision that this resolution authorizes',
            placeholder: 'e.g., Authorization to enter into a specific contract, approval of merger, etc.'
          },
          {
            label: 'What is the date of the meeting where this resolution was or will be adopted?',
            type: 'date',
            required: true,
            section: 'Meeting Details',
            helpText: 'Enter the date when the resolution was or will be adopted'
          },
          {
            label: 'Was this a regular or special meeting?',
            type: 'select',
            required: true,
            section: 'Meeting Details',
            helpText: 'Indicate the type of meeting',
            options: {
              create: [
                { value: 'regular', label: 'Regular Meeting' },
                { value: 'special', label: 'Special Meeting' }
              ]
            }
          },
          {
            label: 'Where was the meeting held?',
            type: 'text',
            required: true,
            section: 'Meeting Details',
            helpText: 'Specify the physical location or virtual meeting platform',
            placeholder: 'e.g., Corporate Headquarters, 123 Main St, or Zoom Video Conference'
          },
          {
            label: 'Who was present at the meeting?',
            type: 'textarea',
            required: true,
            section: 'Meeting Details',
            helpText: 'List all directors or shareholders present',
            placeholder: 'Name and title of each person present'
          },
          {
            label: 'Was a quorum present?',
            type: 'select',
            required: true,
            section: 'Meeting Details',
            helpText: 'Confirm if a quorum was present for the meeting',
            options: {
              create: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]
            }
          },
          {
            label: 'What was the voting result?',
            type: 'select',
            required: true,
            section: 'Resolution Content',
            helpText: 'Indicate the outcome of the vote',
            options: {
              create: [
                { value: 'unanimous', label: 'Unanimous' },
                { value: 'majority', label: 'Majority in Favor' },
                { value: 'specific', label: 'Specific Count' }
              ]
            }
          },
          {
            label: 'Does this resolution ratify prior actions?',
            type: 'select',
            required: true,
            section: 'Resolution Content',
            helpText: 'Indicate if this resolution confirms previous actions',
            options: {
              create: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]
            }
          },
          {
            label: 'Who is authorized to execute documents related to this resolution?',
            type: 'textarea',
            required: true,
            section: 'Authorization',
            helpText: 'List all persons authorized to execute documents',
            placeholder: 'Name and title of each authorized person'
          },
          {
            label: 'Are there any specific terms or conditions for implementing this resolution?',
            type: 'textarea',
            required: false,
            section: 'Implementation',
            helpText: 'Detail any specific terms, conditions, or limitations',
            placeholder: 'e.g., Budget limitations, time constraints, specific requirements'
          },
          {
            label: 'What is the effective date of the resolution?',
            type: 'date',
            required: true,
            section: 'Implementation',
            helpText: 'Enter the date when the resolution becomes effective'
          },
          {
            label: 'Who will certify this resolution?',
            type: 'text',
            required: true,
            section: 'Certification',
            helpText: 'Enter the name and title of the certifying officer',
            placeholder: 'e.g., John Smith, Corporate Secretary'
          },
          {
            label: 'Does this resolution replace or amend any previous resolutions?',
            type: 'select',
            required: true,
            section: 'Additional Information',
            helpText: 'Indicate if this resolution modifies any existing resolutions',
            options: {
              create: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]
            }
          },
          {
            label: 'Are there any relevant attachments or exhibits to include?',
            type: 'textarea',
            required: false,
            section: 'Additional Information',
            helpText: 'List any documents that should be attached to the resolution',
            placeholder: 'e.g., Contracts, agreements, certificates'
          },
          {
            label: 'Does this require filing with any government agencies?',
            type: 'select',
            required: true,
            section: 'Additional Information',
            helpText: 'Indicate if this resolution needs to be filed with any agencies',
            options: {
              create: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]
            }
          },
          {
            label: 'Is this resolution subject to any regulatory approvals?',
            type: 'select',
            required: true,
            section: 'Additional Information',
            helpText: 'Indicate if any regulatory approvals are needed',
            options: {
              create: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]
            }
          },
          {
            label: 'Are there any related resolutions that should be cross-referenced?',
            type: 'textarea',
            required: false,
            section: 'Additional Information',
            helpText: 'List any related resolutions',
            placeholder: 'Resolution dates and descriptions'
          },
          {
            label: 'Does this resolution have an expiration date?',
            type: 'date',
            required: false,
            section: 'Implementation',
            helpText: 'If applicable, enter the date when this resolution expires'
          }
        ]
      }
    }
  })
  console.log('Created/Updated questionnaire:', 'Corporate Resolution Questionnaire')

  // Create Certificate of Incumbency template
  await prisma.documentTemplate.upsert({
    where: { id: 'certificate-of-incumbency' },
    update: {
      categoryId: CORPORATE_CATEGORY_ID,
      name: 'Certificate of Incumbency',
      description: 'Official certification of current directors and officers of the corporation',
      type: 'document',
      version: '1.0.0',
      state: 'published'
    },
    create: {
      id: 'certificate-of-incumbency',
      name: 'Certificate of Incumbency',
      description: 'Official certification of current directors and officers of the corporation',
      categoryId: CORPORATE_CATEGORY_ID,
      type: 'document',
      version: '1.0.0',
      state: 'published',
      content: `# CERTIFICATE OF INCUMBENCY

I, [CERTIFYING_OFFICER], do hereby certify that I am the duly appointed and acting [OFFICER_TITLE] of [CORPORATION_NAME], a corporation organized and existing under the laws of the State of [STATE] (the "Corporation"), and as such, I am authorized to execute and deliver this Certificate of Incumbency.

I further certify that as of the date hereof:

## 1. CORPORATE STATUS
The Corporation is duly organized, validly existing, and in good standing under the laws of the State of [STATE].
[FOREIGN_QUALIFICATIONS]

## 2. DIRECTORS
The following persons are the duly elected or appointed directors of the Corporation:

[DIRECTORS_LIST]
Election/Appointment Date: [DIRECTORS_APPOINTMENT_DATE]
Term Expiration: [DIRECTORS_TERM_EXPIRATION]

## 3. OFFICERS
The following persons are the duly elected or appointed officers of the Corporation, holding the offices set forth opposite their respective names:

[OFFICERS_LIST]
Appointment Date: [OFFICERS_APPOINTMENT_DATE]
Term of Office: [OFFICERS_TERM]

## 4. RECENT CHANGES
[RECENT_CHANGES]

## 5. SPECIMEN SIGNATURES
The following are true and correct specimen signatures of the current officers:

[SPECIMEN_SIGNATURES]

## 6. PURPOSE
This Certificate is issued for [PURPOSE] at the request of [REQUESTING_PARTY].

## 7. ATTACHMENTS
The following documents are attached hereto and incorporated herein by reference:
[ATTACHMENTS_LIST]

IN WITNESS WHEREOF, I have hereunto set my hand and affixed the corporate seal of the Corporation this [CERTIFICATION_DATE].

___________________________
[CERTIFYING_OFFICER_NAME]
[OFFICER_TITLE]

ATTEST:
___________________________
[ATTESTING_OFFICER]
[ATTESTING_OFFICER_TITLE]

[CORPORATE_SEAL]`,
      type: 'document',
      version: '1.0.0',
      state: 'published',
      metadata: {
        sections: [
          'Basic Information',
          'Corporate Status',
          'Directors',
          'Officers',
          'Signatures',
          'Purpose',
          'Attachments'
        ]
      }
    }
  })
  console.log('Created/Updated template:', 'Certificate of Incumbency')

  // Create Certificate of Incumbency questionnaire
  await prisma.questionnaire.upsert({
    where: { id: 'certificate-of-incumbency-questions' },
    update: {},
    create: {
      id: 'certificate-of-incumbency-questions',
      name: 'Certificate of Incumbency Questionnaire',
      description: 'Questions for creating a Certificate of Incumbency',
      templateId: 'certificate-of-incumbency',
      questions: {
        create: [
          {
            label: 'What is the exact legal name of the corporation?',
            type: 'text',
            required: true,
            section: 'Basic Information',
            helpText: 'Enter the complete legal name of the corporation as registered',
            placeholder: 'e.g., Acme Corporation, Inc.'
          },
          {
            label: 'What is the state of incorporation?',
            type: 'select',
            required: true,
            section: 'Basic Information',
            helpText: 'Select the state where the corporation is incorporated',
            options: {
              create: [
                { value: 'DE', label: 'Delaware' },
                { value: 'CA', label: 'California' },
                { value: 'NY', label: 'New York' },
                { value: 'TX', label: 'Texas' },
                { value: 'FL', label: 'Florida' }
              ]
            }
          },
          {
            label: 'Who is the certifying officer?',
            type: 'text',
            required: true,
            section: 'Basic Information',
            helpText: 'Usually the Corporate Secretary',
            placeholder: 'e.g., John Smith, Corporate Secretary'
          },
          {
            label: 'What is the date of certification?',
            type: 'date',
            required: true,
            section: 'Basic Information',
            helpText: 'Enter the date when this certificate will be signed'
          },
          {
            label: 'Who are the current directors of the corporation?',
            type: 'textarea',
            required: true,
            section: 'Directors',
            helpText: 'List the full legal names of all current directors',
            placeholder: '1. John Smith\n2. Jane Doe\n3. Robert Johnson'
          },
          {
            label: 'When were the current directors elected or appointed?',
            type: 'date',
            required: true,
            section: 'Directors',
            helpText: 'Enter the date when the current directors were elected or appointed'
          },
          {
            label: 'When do the current directors\' terms expire?',
            type: 'date',
            required: true,
            section: 'Directors',
            helpText: 'Enter the expiration date of the current directors\' terms'
          },
          {
            label: 'Who are the current officers of the corporation?',
            type: 'textarea',
            required: true,
            section: 'Officers',
            helpText: 'List the names and titles of all current officers',
            placeholder: 'President: John Smith\nSecretary: Jane Doe\nTreasurer: Robert Johnson'
          },
          {
            label: 'When were the current officers appointed?',
            type: 'date',
            required: true,
            section: 'Officers',
            helpText: 'Enter the date when the current officers were appointed'
          },
          {
            label: 'What is the term of office for each current officer?',
            type: 'textarea',
            required: true,
            section: 'Officers',
            helpText: 'Specify the term length for each officer position',
            placeholder: 'President: 1 year term\nSecretary: 1 year term\nTreasurer: 1 year term'
          },
          {
            label: 'Is there any change in directors or officers that occurred recently?',
            type: 'textarea',
            required: false,
            section: 'Officers',
            helpText: 'Describe any recent changes in directors or officers',
            placeholder: 'e.g., John Smith replaced Jane Doe as CFO on [date]'
          },
          {
            label: 'Are specimen signatures of the officers required on the certificate?',
            type: 'select',
            required: true,
            section: 'Signatures',
            helpText: 'Indicate if specimen signatures need to be included',
            options: {
              create: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]
            }
          },
          {
            label: 'What is the purpose for which this certificate is being issued?',
            type: 'textarea',
            required: true,
            section: 'Purpose',
            helpText: 'Specify the purpose or intended use of this certificate',
            placeholder: 'e.g., Bank account opening, Contract execution authorization'
          },
          {
            label: 'Who is requesting this certificate?',
            type: 'text',
            required: true,
            section: 'Purpose',
            helpText: 'Enter the name of the person or entity requesting this certificate',
            placeholder: 'e.g., First National Bank'
          },
          {
            label: 'Will this certificate be used for international purposes requiring apostille?',
            type: 'select',
            required: true,
            section: 'Purpose',
            helpText: 'Indicate if apostille certification will be needed',
            options: {
              create: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]
            }
          },
          {
            label: 'Do you need to attach copies of relevant corporate documents?',
            type: 'multiselect',
            required: true,
            section: 'Attachments',
            helpText: 'Select which corporate documents should be attached',
            options: {
              create: [
                { value: 'articles', label: 'Articles of Incorporation' },
                { value: 'bylaws', label: 'Bylaws' },
                { value: 'resolutions', label: 'Relevant Resolutions' },
                { value: 'good-standing', label: 'Certificate of Good Standing' }
              ]
            }
          },
          {
            label: 'Is the corporation in good standing with the state?',
            type: 'select',
            required: true,
            section: 'Corporate Status',
            helpText: 'Confirm if the corporation is in good standing',
            options: {
              create: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]
            }
          },
          {
            label: 'Is the corporation authorized to transact business in other states?',
            type: 'textarea',
            required: false,
            section: 'Corporate Status',
            helpText: 'List any states where the corporation is qualified to do business',
            placeholder: 'e.g., Qualified in: CA, NY, TX'
          },
          {
            label: 'What corporate seal will be used for this certificate?',
            type: 'select',
            required: true,
            section: 'Signatures',
            helpText: 'Specify which corporate seal will be used',
            options: {
              create: [
                { value: 'official', label: 'Official Corporate Seal' },
                { value: 'none', label: 'No Seal Required' }
              ]
            }
          },
          {
            label: 'Who will attest to the Certificate of Incumbency?',
            type: 'text',
            required: true,
            section: 'Signatures',
            helpText: 'Enter the name and title of the attesting officer',
            placeholder: 'e.g., Jane Doe, Assistant Secretary'
          }
        ]
      }
    }
  })
  console.log('Created/Updated questionnaire:', 'Certificate of Incumbency Questionnaire')

  // Create Consent to Action Without Meeting template
  await prisma.documentTemplate.upsert({
    where: { id: 'consent-to-action' },
    update: {
      categoryId: CORPORATE_CATEGORY_ID,
      name: 'Consent to Action Without Meeting',
      description: 'Written consent for corporate actions without a formal meeting',
      type: 'document',
      version: '1.0.0',
      state: 'published'
    },
    create: {
      id: 'consent-to-action',
      name: 'Consent to Action Without Meeting',
      description: 'Written consent for corporate actions without a formal meeting',
      categoryId: CORPORATE_CATEGORY_ID,
      type: 'document',
      version: '1.0.0',
      state: 'published',
      content: `# CONSENT TO ACTION WITHOUT MEETING

## CORPORATE INFORMATION
[CORPORATION_NAME]

## CONSENT TYPE
☐ Board Consent
☐ Shareholder Consent

## ACTION DETAILS
Effective Date: [EFFECTIVE_DATE]
Action Being Approved: [ACTION_DETAILS]

## CONSENT STATUS
☐ Unanimous Consent
☐ Majority Consent
Voting Power Represented: [VOTING_POWER_PERCENTAGE]%

## LEGAL COMPLIANCE
State Law Permits Written Consent: [STATE_LAW_PERMITS]
Articles/Bylaws Permit Written Consent: [ARTICLES_BYLAWS_PERMIT]
Notice to Non-Consenting Parties: [NOTICE_PROVIDED]

## EXECUTION DETAILS
Executed in Counterparts: [EXECUTED_IN_COUNTERPARTS]
Storage Method: [STORAGE_METHOD]
Notice to Non-Consenting Parties: [NOTICE_TO_NON_CONSENTING]

## ADDITIONAL INFORMATION
Part of Larger Transaction: [PART_OF_LARGER_TRANSACTION]
Ratifies Previous Actions: [RATIFIES_PREVIOUS_ACTIONS]
Conflicts of Interest: [CONFLICTS_OF_INTEREST]
Government Filing Required: [GOVERNMENT_FILING_REQUIRED]
Execution Deadline: [EXECUTION_DEADLINE]
Delivery Mechanism: [DELIVERY_MECHANISM]

## CERTIFICATION
I, [CERTIFYING_OFFICER], do hereby certify that:
1. I am the duly appointed [OFFICER_TITLE] of [CORPORATION_NAME]
2. The foregoing consent was duly executed by the required parties
3. All necessary approvals and authorizations have been obtained
4. This consent has been properly recorded in the corporate records

IN WITNESS WHEREOF, I have executed this Certificate as of [CERTIFICATION_DATE]

___________________________
[CERTIFYING_OFFICER_NAME]
[OFFICER_TITLE]

## ATTACHMENTS
[LIST_OF_ATTACHMENTS]`,
      type: 'document',
      version: '1.0.0',
      state: 'published',
      metadata: {
        sections: [
          'Basic Information',
          'Consent Details',
          'Legal Compliance',
          'Execution',
          'Additional Information',
          'Certification',
          'Attachments'
        ]
      }
    }
  })
  console.log('Created/Updated template:', 'Consent to Action Without Meeting')

  // Create Consent to Action Without Meeting questionnaire
  await prisma.questionnaire.upsert({
    where: { id: 'consent-to-action-questions' },
    update: {},
    create: {
      id: 'consent-to-action-questions',
      name: 'Consent to Action Without Meeting Questionnaire',
      description: 'Questions for creating a Consent to Action Without Meeting',
      templateId: 'consent-to-action',
      questions: {
        create: [
          {
            label: 'What is the exact legal name of the corporation?',
            type: 'text',
            required: true,
            section: 'Basic Information',
            helpText: 'Enter the complete legal name of the corporation as registered',
            placeholder: 'e.g., Acme Corporation, Inc.'
          },
          {
            label: 'Is this a board consent or shareholder consent?',
            type: 'select',
            required: true,
            section: 'Basic Information',
            helpText: 'Select the type of consent being prepared',
            options: {
              create: [
                { value: 'board', label: 'Board Consent' },
                { value: 'shareholder', label: 'Shareholder Consent' }
              ]
            }
          },
          {
            label: 'What specific action(s) are being approved?',
            type: 'textarea',
            required: true,
            section: 'Consent Details',
            helpText: 'Describe in detail the action(s) being approved',
            placeholder: 'e.g., Approval of merger, authorization of new stock issuance, etc.'
          },
          {
            label: 'What is the effective date of the consent?',
            type: 'date',
            required: true,
            section: 'Consent Details',
            helpText: 'Enter the date when the consent becomes effective'
          },
          {
            label: 'Are all directors/shareholders consenting, or just a majority?',
            type: 'select',
            required: true,
            section: 'Consent Details',
            helpText: 'Indicate whether this is a unanimous or majority consent',
            options: {
              create: [
                { value: 'unanimous', label: 'Unanimous Consent' },
                { value: 'majority', label: 'Majority Consent' }
              ]
            }
          },
          {
            label: 'What percentage of voting power do the consenting parties represent?',
            type: 'number',
            required: true,
            section: 'Consent Details',
            helpText: 'Enter the percentage of total voting power represented by consenting parties',
            placeholder: 'e.g., 75'
          },
          {
            label: 'Does the state law allow for this action to be taken by written consent?',
            type: 'select',
            required: true,
            section: 'Legal Compliance',
            helpText: 'Confirm if state law permits this action by written consent',
            options: {
              create: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]
            }
          },
          {
            label: 'Do the Articles of Incorporation and Bylaws permit action by written consent?',
            type: 'select',
            required: true,
            section: 'Legal Compliance',
            helpText: 'Confirm if corporate documents permit this action by written consent',
            options: {
              create: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]
            }
          },
          {
            label: 'If not unanimous, was proper notice given to non-consenting parties as required?',
            type: 'select',
            required: true,
            section: 'Legal Compliance',
            helpText: 'Confirm if proper notice was provided to non-consenting parties',
            options: {
              create: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]
            }
          },
          {
            label: 'Will the consent be executed in counterparts?',
            type: 'select',
            required: true,
            section: 'Execution',
            helpText: 'Indicate if the consent will be signed in multiple copies',
            options: {
              create: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]
            }
          },
          {
            label: 'How will the executed consent be stored in corporate records?',
            type: 'text',
            required: true,
            section: 'Execution',
            helpText: 'Describe the method of storing the executed consent',
            placeholder: 'e.g., Digital storage in corporate records system'
          },
          {
            label: 'Will notice of the action be provided to non-consenting directors/shareholders?',
            type: 'select',
            required: true,
            section: 'Execution',
            helpText: 'Indicate if notice will be provided to non-consenting parties',
            options: {
              create: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]
            }
          },
          {
            label: 'Is this consent part of a larger transaction requiring multiple consents?',
            type: 'select',
            required: true,
            section: 'Additional Information',
            helpText: 'Indicate if this is part of a larger transaction',
            options: {
              create: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]
            }
          },
          {
            label: 'Does this consent ratify previous actions?',
            type: 'select',
            required: true,
            section: 'Additional Information',
            helpText: 'Indicate if this consent ratifies previous actions',
            options: {
              create: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]
            }
          },
          {
            label: 'Who will certify the consent as a corporate record?',
            type: 'text',
            required: true,
            section: 'Additional Information',
            helpText: 'Enter the name and title of the certifying officer',
            placeholder: 'e.g., John Smith, Corporate Secretary'
          },
          {
            label: 'Are there any exhibits or attachments to this consent?',
            type: 'multiselect',
            required: true,
            section: 'Additional Information',
            helpText: 'Select any documents that will be attached to the consent',
            options: {
              create: [
                { value: 'board-minutes', label: 'Board Minutes' },
                { value: 'shareholder-list', label: 'Shareholder List' },
                { value: 'voting-agreement', label: 'Voting Agreement' },
                { value: 'other', label: 'Other Documents' }
              ]
            }
          },
          {
            label: 'Do any directors or shareholders have conflicts of interest regarding this action?',
            type: 'select',
            required: true,
            section: 'Additional Information',
            helpText: 'Indicate if there are any conflicts of interest',
            options: {
              create: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]
            }
          },
          {
            label: 'Will this consent be filed with any government agency?',
            type: 'select',
            required: true,
            section: 'Additional Information',
            helpText: 'Indicate if filing with a government agency is required',
            options: {
              create: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]
            }
          },
          {
            label: 'Is there a deadline by which this consent must be executed?',
            type: 'date',
            required: false,
            section: 'Additional Information',
            helpText: 'Enter the deadline for execution if applicable'
          },
          {
            label: 'What is the mechanism for delivery of the signed consent?',
            type: 'select',
            required: true,
            section: 'Additional Information',
            helpText: 'Select the method of delivery for signed consents',
            options: {
              create: [
                { value: 'email', label: 'Email' },
                { value: 'physical', label: 'Physical Delivery' },
                { value: 'both', label: 'Both Email and Physical' }
              ]
            }
          }
        ]
      }
    }
  })
  console.log('Created/Updated questionnaire:', 'Consent to Action Without Meeting Questionnaire')

  // Create Consent to be Director and Officer template
  const consentToServeTemplate = await prisma.documentTemplate.upsert({
    where: { id: 'consent-to-serve' },
    update: {
      categoryId: CORPORATE_CATEGORY_ID,
      name: 'Consent to be Director and Officer',
      description: 'Written consent for an individual to serve as director and/or officer',
      type: 'document',
      version: '1.0.0',
      state: 'published'
    },
    create: {
      id: 'consent-to-serve',
      name: 'Consent to be Director and Officer',
      description: 'Written consent for an individual to serve as director and/or officer',
      categoryId: CORPORATE_CATEGORY_ID,
      type: 'document',
      version: '1.0.0',
      state: 'published',
      content: `# CONSENT TO SERVE AS DIRECTOR AND/OR OFFICER

## CORPORATE INFORMATION
[CORPORATION_NAME]

## INDIVIDUAL INFORMATION
Name: [INDIVIDUAL_NAME]
Position(s): [POSITIONS]
Effective Date: [EFFECTIVE_DATE]
Term: [TERM]

## APPOINTMENT DETAILS
Type: [APPOINTMENT_TYPE]
Replacing: [REPLACING_NAME]

## ACKNOWLEDGMENTS
☐ I have received and reviewed the Articles of Incorporation and Bylaws
☐ I understand my fiduciary duties
☐ I am aware of any conflicts of interest
☐ I meet all qualification requirements in the Bylaws
☐ I am not subject to any limiting agreements

## CONTACT INFORMATION
[CONTACT_DETAILS]

## ADDITIONAL INFORMATION
Electronic Notice Consent: [ELECTRONIC_NOTICE_CONSENT]
Specimen Signature Required: [SPECIMEN_SIGNATURE_REQUIRED]
Background Information: [BACKGROUND_INFORMATION]
Part of Reorganization: [PART_OF_REORGANIZATION]
Restrictions/Conditions: [RESTRICTIONS]

## CERTIFICATION
I, [INDIVIDUAL_NAME], do hereby consent to serve as [POSITIONS] of [CORPORATION_NAME] and acknowledge that I have read and understand the above statements.

IN WITNESS WHEREOF, I have executed this Consent as of [EXECUTION_DATE]

___________________________
[INDIVIDUAL_NAME]

## ATTACHMENTS
[LIST_OF_ATTACHMENTS]`,
      type: 'document',
      version: '1.0.0',
      state: 'published',
      metadata: {
        sections: [
          'Basic Information',
          'Appointment Details',
          'Acknowledgments',
          'Contact Information',
          'Additional Information',
          'Certification',
          'Attachments'
        ]
      }
    }
  })
  console.log('Created/Updated template:', 'Consent to be Director and Officer')

  // Create Consent to be Director and Officer questionnaire
  await prisma.questionnaire.upsert({
    where: { id: 'consent-to-serve-questions' },
    update: {},
    create: {
      id: 'consent-to-serve-questions',
      name: 'Consent to be Director and Officer Questionnaire',
      description: 'Questions for creating a Consent to be Director and Officer',
      templateId: consentToServeTemplate.id,
      questions: {
        create: [
          {
            label: 'What is the exact legal name of the corporation?',
            type: 'text',
            required: true,
            section: 'Basic Information',
            helpText: 'Enter the complete legal name of the corporation as registered',
            placeholder: 'e.g., Acme Corporation, Inc.'
          },
          {
            label: 'What is the full legal name of the individual consenting to serve?',
            type: 'text',
            required: true,
            section: 'Basic Information',
            helpText: 'Enter the complete legal name of the individual',
            placeholder: 'e.g., John Smith'
          },
          {
            label: 'What position(s) is the individual accepting?',
            type: 'multiselect',
            required: true,
            section: 'Basic Information',
            helpText: 'Select all positions the individual will hold',
            options: {
              create: [
                { value: 'director', label: 'Director' },
                { value: 'president', label: 'President' },
                { value: 'vice-president', label: 'Vice President' },
                { value: 'secretary', label: 'Secretary' },
                { value: 'treasurer', label: 'Treasurer' },
                { value: 'other', label: 'Other Officer Position' }
              ]
            }
          },
          {
            label: 'What is the effective date of the appointment?',
            type: 'date',
            required: true,
            section: 'Basic Information',
            helpText: 'Enter the date when the appointment becomes effective'
          },
          {
            label: 'What is the term of appointment?',
            type: 'text',
            required: true,
            section: 'Basic Information',
            helpText: 'Specify the duration of the appointment',
            placeholder: 'e.g., 1 year, Until next annual meeting, etc.'
          },
          {
            label: 'Is this an initial appointment or filling a vacancy?',
            type: 'select',
            required: true,
            section: 'Appointment Details',
            helpText: 'Indicate the type of appointment',
            options: {
              create: [
                { value: 'initial', label: 'Initial Appointment' },
                { value: 'vacancy', label: 'Filling a Vacancy' }
              ]
            }
          },
          {
            label: 'Is the individual replacing someone? If so, whom?',
            type: 'text',
            required: false,
            section: 'Appointment Details',
            helpText: 'Enter the name of the person being replaced, if applicable',
            placeholder: 'e.g., Jane Doe, Previous Secretary'
          },
          {
            label: 'Does the individual acknowledge receipt of the corporation\'s Articles and Bylaws?',
            type: 'select',
            required: true,
            section: 'Acknowledgments',
            helpText: 'Confirm if the individual has received and reviewed the corporate documents',
            options: {
              create: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]
            }
          },
          {
            label: 'Does the individual acknowledge understanding of fiduciary duties?',
            type: 'select',
            required: true,
            section: 'Acknowledgments',
            helpText: 'Confirm if the individual understands their fiduciary responsibilities',
            options: {
              create: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]
            }
          },
          {
            label: 'Is the individual aware of any conflicts of interest?',
            type: 'select',
            required: true,
            section: 'Acknowledgments',
            helpText: 'Indicate if the individual has any conflicts of interest',
            options: {
              create: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]
            }
          },
          {
            label: 'Is the individual currently serving as director or officer of any competing businesses?',
            type: 'select',
            required: true,
            section: 'Acknowledgments',
            helpText: 'Indicate if the individual serves in similar roles at competing businesses',
            options: {
              create: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]
            }
          },
          {
            label: 'Does the individual meet all qualification requirements in the Bylaws?',
            type: 'select',
            required: true,
            section: 'Acknowledgments',
            helpText: 'Confirm if the individual meets all required qualifications',
            options: {
              create: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]
            }
          },
          {
            label: 'Is the individual subject to any agreements that might limit their ability to serve?',
            type: 'select',
            required: true,
            section: 'Acknowledgments',
            helpText: 'Indicate if there are any limiting agreements',
            options: {
              create: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]
            }
          },
          {
            label: 'What contact information should be included for corporate records?',
            type: 'textarea',
            required: true,
            section: 'Contact Information',
            helpText: 'Enter all relevant contact information',
            placeholder: 'Address, phone, email, etc.'
          },
          {
            label: 'Does the individual consent to electronic notice of meetings?',
            type: 'select',
            required: true,
            section: 'Contact Information',
            helpText: 'Indicate if electronic notice is acceptable',
            options: {
              create: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]
            }
          },
          {
            label: 'Does the individual need to provide a specimen signature?',
            type: 'select',
            required: true,
            section: 'Additional Information',
            helpText: 'Indicate if a specimen signature is required',
            options: {
              create: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]
            }
          },
          {
            label: 'Does the individual need to disclose relevant background information?',
            type: 'select',
            required: true,
            section: 'Additional Information',
            helpText: 'Indicate if background information disclosure is required',
            options: {
              create: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]
            }
          },
          {
            label: 'Is this consent part of a reorganization or change in control?',
            type: 'select',
            required: true,
            section: 'Additional Information',
            helpText: 'Indicate if this is part of a larger corporate change',
            options: {
              create: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]
            }
          },
          {
            label: 'Will this consent be included in the corporate minute book?',
            type: 'select',
            required: true,
            section: 'Additional Information',
            helpText: 'Indicate if this consent will be recorded in the minute book',
            options: {
              create: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]
            }
          },
          {
            label: 'Does the individual have any restrictions or conditions on their consent?',
            type: 'textarea',
            required: false,
            section: 'Additional Information',
            helpText: 'Describe any restrictions or conditions on the consent',
            placeholder: 'e.g., Term limits, specific responsibilities, etc.'
          }
        ]
      }
    }
  })
  console.log('Created/Updated questionnaire:', 'Consent to be Director and Officer Questionnaire')

  // Create Directors' Organizational Meeting template
  const directorsOrgMeetingTemplate = await prisma.documentTemplate.upsert({
    where: { id: 'directors-org-meeting' },
    update: {
      categoryId: CORPORATE_CATEGORY_ID,
      name: 'Directors\' Organizational Meeting',
      description: 'Documentation of the initial organizational meeting of the board of directors',
      type: 'document',
      version: '1.0.0',
      state: 'published'
    },
    create: {
      id: 'directors-org-meeting',
      name: 'Directors\' Organizational Meeting',
      description: 'Documentation of the initial organizational meeting of the board of directors',
      categoryId: CORPORATE_CATEGORY_ID,
      type: 'document',
      version: '1.0.0',
      state: 'published',
      content: `# DIRECTORS' ORGANIZATIONAL MEETING

## CORPORATE INFORMATION
[CORPORATION_NAME]
Date of Incorporation: [INCORPORATION_DATE]

## MEETING DETAILS
Date: [MEETING_DATE]
Time: [MEETING_TIME]
Location: [MEETING_LOCATION]
Incorporators Present: [INCORPORATORS_LIST]

## CORPORATE STATUS
Certificate of Incorporation Status: [CERTIFICATE_STATUS]

## INITIAL DIRECTORS
[DIRECTORS_LIST]

## CORPORATE GOVERNANCE
Bylaws: [BYLAWS_STATUS]
Corporate Seal: [SEAL_STATUS]
Stock Certificate Form: [STOCK_CERTIFICATE_STATUS]

## SHARES AND STOCK
Initial Shares: [SHARES_DETAILS]
Consideration: [CONSIDERATION_DETAILS]

## ADDITIONAL MATTERS
Pre-incorporation Agreements: [AGREEMENTS_STATUS]
Banking Resolutions: [BANKING_RESOLUTIONS]
Expense Reimbursement: [EXPENSE_REIMBURSEMENT]
Temporary Representative: [TEMPORARY_REPRESENTATIVE]
Organizational Resolutions: [ORGANIZATIONAL_RESOLUTIONS]
Incorporator Resignation: [INCORPORATOR_RESIGNATION]
Record Maintenance: [RECORD_MAINTENANCE]

## CERTIFICATION
I, [SECRETARY_NAME], do hereby certify that the foregoing is a true and correct record of the proceedings of the Organizational Meeting of the Incorporators of [CORPORATION_NAME] held on [MEETING_DATE].

IN WITNESS WHEREOF, I have executed this Certificate as of [CERTIFICATION_DATE]

___________________________
[SECRETARY_NAME]
Secretary

## ATTACHMENTS
[LIST_OF_ATTACHMENTS]`,
      type: 'document',
      version: '1.0.0',
      state: 'published',
      metadata: {
        sections: [
          'Basic Information',
          'Meeting Details',
          'Corporate Status',
          'Initial Directors',
          'Corporate Governance',
          'Shares and Stock',
          'Additional Matters',
          'Certification',
          'Attachments'
        ]
      }
    }
  })
  console.log('Created/Updated template:', 'Incorporators\' Organizational Meeting')

  // Create Incorporators' Organizational Meeting questionnaire
  await prisma.questionnaire.upsert({
    where: { id: 'incorporators-meeting-questions' },
    update: {},
    create: {
      id: 'incorporators-meeting-questions',
      name: 'Incorporators\' Organizational Meeting Questionnaire',
      description: 'Questions for creating an Incorporators\' Organizational Meeting document',
      templateId: incorporatorsMeetingTemplate.id,
      questions: {
        create: [
          {
            label: 'What is the exact legal name of the corporation?',
            type: 'text',
            required: true,
            section: 'Basic Information',
            helpText: 'Enter the complete legal name of the corporation as registered',
            placeholder: 'e.g., Acme Corporation, Inc.'
          },
          {
            label: 'Who is/are the incorporator(s)?',
            type: 'textarea',
            required: true,
            section: 'Meeting Details',
            helpText: 'List all incorporators with their full names',
            placeholder: '1. John Smith\n2. Jane Doe'
          },
          {
            label: 'What is the date, time, and location of the meeting?',
            type: 'text',
            required: true,
            section: 'Meeting Details',
            helpText: 'Enter the complete meeting details',
            placeholder: 'e.g., January 1, 2024, 10:00 AM, Corporate Headquarters'
          },
          {
            label: 'Has the Certificate of Incorporation been filed and accepted by the state?',
            type: 'select',
            required: true,
            section: 'Corporate Status',
            helpText: 'Indicate if the Certificate has been filed and accepted',
            options: {
              create: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]
            }
          },
          {
            label: 'What is the date of incorporation?',
            type: 'date',
            required: true,
            section: 'Basic Information',
            helpText: 'Enter the date when the corporation was incorporated'
          },
          {
            label: 'Who will be appointed as the initial board of directors?',
            type: 'textarea',
            required: true,
            section: 'Initial Directors',
            helpText: 'List all initial directors with their full names',
            placeholder: '1. John Smith\n2. Jane Doe\n3. Robert Johnson'
          },
          {
            label: 'Will the incorporator(s) adopt initial bylaws?',
            type: 'select',
            required: true,
            section: 'Corporate Governance',
            helpText: 'Indicate if initial bylaws will be adopted',
            options: {
              create: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]
            }
          },
          {
            label: 'Will the corporate seal be adopted?',
            type: 'select',
            required: true,
            section: 'Corporate Governance',
            helpText: 'Indicate if a corporate seal will be adopted',
            options: {
              create: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]
            }
          },
          {
            label: 'Will the form of stock certificate be approved?',
            type: 'select',
            required: true,
            section: 'Corporate Governance',
            helpText: 'Indicate if a stock certificate form will be approved',
            options: {
              create: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]
            }
          },
          {
            label: 'Will any pre-incorporation agreements be ratified?',
            type: 'select',
            required: true,
            section: 'Additional Matters',
            helpText: 'Indicate if pre-incorporation agreements will be ratified',
            options: {
              create: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]
            }
          },
          {
            label: 'Will any banking resolutions be adopted?',
            type: 'select',
            required: true,
            section: 'Additional Matters',
            helpText: 'Indicate if banking resolutions will be adopted',
            options: {
              create: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]
            }
          },
          {
            label: 'Will the incorporator(s) authorize the reimbursement of incorporation expenses?',
            type: 'select',
            required: true,
            section: 'Additional Matters',
            helpText: 'Indicate if incorporation expenses will be reimbursed',
            options: {
              create: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]
            }
          },
          {
            label: 'Who will be designated to act on behalf of the corporation until directors are elected?',
            type: 'text',
            required: true,
            section: 'Additional Matters',
            helpText: 'Enter the name of the temporary representative',
            placeholder: 'e.g., John Smith'
          },
          {
            label: 'Will any organizational resolutions be adopted?',
            type: 'select',
            required: true,
            section: 'Additional Matters',
            helpText: 'Indicate if organizational resolutions will be adopted',
            options: {
              create: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]
            }
          },
          {
            label: 'Will the incorporator(s) resign after completing their organizational duties?',
            type: 'select',
            required: true,
            section: 'Additional Matters',
            helpText: 'Indicate if incorporators will resign',
            options: {
              create: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]
            }
          },
          {
            label: 'Who will maintain the records of the incorporator actions?',
            type: 'text',
            required: true,
            section: 'Additional Matters',
            helpText: 'Enter the name of the record keeper',
            placeholder: 'e.g., Jane Doe'
          },
          {
            label: 'Will the incorporator(s) authorize the initial issuance of shares?',
            type: 'select',
            required: true,
            section: 'Shares and Stock',
            helpText: 'Indicate if initial shares will be issued',
            options: {
              create: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]
            }
          },
          {
            label: 'What will be the consideration for the initial shares?',
            type: 'textarea',
            required: true,
            section: 'Shares and Stock',
            helpText: 'Describe the consideration for shares',
            placeholder: 'e.g., Cash payment of $X, Services valued at $Y'
          },
          {
            label: 'Will the incorporator(s) appoint officers?',
            type: 'select',
            required: true,
            section: 'Additional Matters',
            helpText: 'Indicate if officers will be appointed',
            options: {
              create: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]
            }
          },
          {
            label: 'Will the incorporator(s) call for the first meeting of shareholders?',
            type: 'select',
            required: true,
            section: 'Additional Matters',
            helpText: 'Indicate if the first shareholders meeting will be called',
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
  console.log('Created/Updated questionnaire:', 'Incorporators\' Organizational Meeting Questionnaire')

  await prisma.$disconnect()
} 