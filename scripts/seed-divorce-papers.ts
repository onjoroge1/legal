import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function seedDivorcePapers() {
  try {
    console.log('Starting divorce papers seed...')

    // Create or update the template
    const template = await prisma.documentTemplate.upsert({
      where: { id: 'divorce-papers' },
      update: {
        name: 'Separation / Divorce Papers',
        description: 'Legal documents for filing divorce or legal separation',
        content: `# SEPARATION / DIVORCE PAPERS

## JURISDICTION AND CASE INFORMATION
Court: [COURT_NAME]
State/County: [JURISDICTION]
Case Type: [CASE_TYPE]
Case Number: [CASE_NUMBER]

## PARTIES
Petitioner/Plaintiff: [PETITIONER_NAME]
Address: [PETITIONER_ADDRESS]

Respondent/Defendant: [RESPONDENT_NAME]
Address: [RESPONDENT_ADDRESS]

## MARRIAGE INFORMATION
Date of Marriage: [MARRIAGE_DATE]
Place of Marriage: [MARRIAGE_PLACE]
Date of Separation: [SEPARATION_DATE]

## JURISDICTIONAL REQUIREMENTS
Residency Status: [RESIDENCY_STATUS]
Grounds for Divorce: [DIVORCE_GROUNDS]
Type of Divorce: [DIVORCE_TYPE]

## CHILDREN OF THE MARRIAGE
Children: [CHILDREN_DETAILS]
Current Pregnancy Status: [PREGNANCY_STATUS]

## CUSTODY AND SUPPORT
Requested Custody Arrangement:
Legal Custody: [LEGAL_CUSTODY]
Physical Custody: [PHYSICAL_CUSTODY]
Visitation Schedule: [VISITATION_SCHEDULE]

Child Support:
Requested Amount: [CHILD_SUPPORT_AMOUNT]
Special Needs Considerations: [SPECIAL_NEEDS_SUPPORT]

Spousal Support:
Requested Amount: [SPOUSAL_SUPPORT_AMOUNT]
Duration: [SPOUSAL_SUPPORT_DURATION]

## PROPERTY DIVISION
Marital Property:
Real Estate: [REAL_ESTATE_DIVISION]
Vehicles: [VEHICLES_DIVISION]
Bank Accounts: [ACCOUNTS_DIVISION]
Retirement Accounts: [RETIREMENT_DIVISION]
Business Interests: [BUSINESS_DIVISION]

Separate Property:
Petitioner's Claims: [PETITIONER_SEPARATE_PROPERTY]
Respondent's Claims: [RESPONDENT_SEPARATE_PROPERTY]

## DEBT DIVISION
Marital Debts: [MARITAL_DEBTS]
Proposed Division: [DEBT_DIVISION]

## ADDITIONAL CONSIDERATIONS
Name Change Request: [NAME_CHANGE]
Temporary Orders: [TEMPORARY_ORDERS]
Existing Agreements: [EXISTING_AGREEMENTS]
Domestic Violence Issues: [DOMESTIC_VIOLENCE]
Substance Abuse Issues: [SUBSTANCE_ABUSE]
Attorney's Fees Request: [ATTORNEY_FEES]
Restraining Orders: [RESTRAINING_ORDERS]

## PROCEDURAL MATTERS
Mediation Status: [MEDIATION_STATUS]
Parenting Plan Status: [PARENTING_PLAN]
Filing Fees: [FILING_FEES]
Fee Waiver Request: [FEE_WAIVER]
Service of Process: [SERVICE_METHOD]
Military Service Status: [MILITARY_STATUS]

## CERTIFICATION
I hereby certify that the information provided in this document is true and correct to the best of my knowledge.

Date: [DATE]

___________________________
[PETITIONER_SIGNATURE]
Petitioner

___________________________
[PETITIONER_ATTORNEY_SIGNATURE]
Attorney for Petitioner (if applicable)

## NOTARY ACKNOWLEDGMENT
State of [STATE]
County of [COUNTY]

Subscribed and sworn to before me on [DATE]

___________________________
Notary Public
My Commission Expires: [EXPIRATION_DATE]`,
        categoryId: 'cm9bh3u2s0001vbcg20r64fyg',
        type: 'document',
        version: '1.0.0',
        state: 'published',
        metadata: {
          sections: [
            'Jurisdiction',
            'Parties',
            'Marriage Information',
            'Children and Custody',
            'Support',
            'Property Division',
            'Additional Matters',
            'Procedural Information'
          ]
        }
      },
      create: {
        id: 'divorce-papers',
        name: 'Separation / Divorce Papers',
        description: 'Legal documents for filing divorce or legal separation',
        content: `# SEPARATION / DIVORCE PAPERS

## JURISDICTION AND CASE INFORMATION
Court: [COURT_NAME]
State/County: [JURISDICTION]
Case Type: [CASE_TYPE]
Case Number: [CASE_NUMBER]

## PARTIES
Petitioner/Plaintiff: [PETITIONER_NAME]
Address: [PETITIONER_ADDRESS]

Respondent/Defendant: [RESPONDENT_NAME]
Address: [RESPONDENT_ADDRESS]

## MARRIAGE INFORMATION
Date of Marriage: [MARRIAGE_DATE]
Place of Marriage: [MARRIAGE_PLACE]
Date of Separation: [SEPARATION_DATE]

## JURISDICTIONAL REQUIREMENTS
Residency Status: [RESIDENCY_STATUS]
Grounds for Divorce: [DIVORCE_GROUNDS]
Type of Divorce: [DIVORCE_TYPE]

## CHILDREN OF THE MARRIAGE
Children: [CHILDREN_DETAILS]
Current Pregnancy Status: [PREGNANCY_STATUS]

## CUSTODY AND SUPPORT
Requested Custody Arrangement:
Legal Custody: [LEGAL_CUSTODY]
Physical Custody: [PHYSICAL_CUSTODY]
Visitation Schedule: [VISITATION_SCHEDULE]

Child Support:
Requested Amount: [CHILD_SUPPORT_AMOUNT]
Special Needs Considerations: [SPECIAL_NEEDS_SUPPORT]

Spousal Support:
Requested Amount: [SPOUSAL_SUPPORT_AMOUNT]
Duration: [SPOUSAL_SUPPORT_DURATION]

## PROPERTY DIVISION
Marital Property:
Real Estate: [REAL_ESTATE_DIVISION]
Vehicles: [VEHICLES_DIVISION]
Bank Accounts: [ACCOUNTS_DIVISION]
Retirement Accounts: [RETIREMENT_DIVISION]
Business Interests: [BUSINESS_DIVISION]

Separate Property:
Petitioner's Claims: [PETITIONER_SEPARATE_PROPERTY]
Respondent's Claims: [RESPONDENT_SEPARATE_PROPERTY]

## DEBT DIVISION
Marital Debts: [MARITAL_DEBTS]
Proposed Division: [DEBT_DIVISION]

## ADDITIONAL CONSIDERATIONS
Name Change Request: [NAME_CHANGE]
Temporary Orders: [TEMPORARY_ORDERS]
Existing Agreements: [EXISTING_AGREEMENTS]
Domestic Violence Issues: [DOMESTIC_VIOLENCE]
Substance Abuse Issues: [SUBSTANCE_ABUSE]
Attorney's Fees Request: [ATTORNEY_FEES]
Restraining Orders: [RESTRAINING_ORDERS]

## PROCEDURAL MATTERS
Mediation Status: [MEDIATION_STATUS]
Parenting Plan Status: [PARENTING_PLAN]
Filing Fees: [FILING_FEES]
Fee Waiver Request: [FEE_WAIVER]
Service of Process: [SERVICE_METHOD]
Military Service Status: [MILITARY_STATUS]

## CERTIFICATION
I hereby certify that the information provided in this document is true and correct to the best of my knowledge.

Date: [DATE]

___________________________
[PETITIONER_SIGNATURE]
Petitioner

___________________________
[PETITIONER_ATTORNEY_SIGNATURE]
Attorney for Petitioner (if applicable)

## NOTARY ACKNOWLEDGMENT
State of [STATE]
County of [COUNTY]

Subscribed and sworn to before me on [DATE]

___________________________
Notary Public
My Commission Expires: [EXPIRATION_DATE]`,
        categoryId: 'cm9bh3u2s0001vbcg20r64fyg',
        type: 'document',
        version: '1.0.0',
        state: 'published',
        metadata: {
          sections: [
            'Jurisdiction',
            'Parties',
            'Marriage Information',
            'Children and Custody',
            'Support',
            'Property Division',
            'Additional Matters',
            'Procedural Information'
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
        id: 'divorce-papers-questions',
        name: 'Separation / Divorce Papers Questionnaire',
        description: 'Questions for filing divorce or legal separation papers',
        templateId: template.id,
        questions: {
          create: [
            // Jurisdiction Section
            {
              label: 'What is the jurisdiction (state/county) where the divorce is being filed?',
              type: 'text',
              required: true,
              section: 'Jurisdiction'
            },
            {
              label: 'What is the case type?',
              type: 'select',
              required: true,
              section: 'Jurisdiction',
              options: {
                create: [
                  { value: 'dissolution', label: 'Dissolution of marriage' },
                  { value: 'separation', label: 'Legal separation' },
                  { value: 'annulment', label: 'Annulment' }
                ]
              }
            },
            {
              label: 'Has the residency requirement been met for filing in this jurisdiction?',
              type: 'select',
              required: true,
              section: 'Jurisdiction',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },

            // Parties Section
            {
              label: 'What are the full legal names of both spouses?',
              type: 'text',
              required: true,
              section: 'Parties'
            },
            {
              label: 'What are the current addresses of both spouses?',
              type: 'textarea',
              required: true,
              section: 'Parties'
            },
            {
              label: 'Which spouse is the petitioner/plaintiff and which is the respondent/defendant?',
              type: 'text',
              required: true,
              section: 'Parties'
            },

            // Marriage Information Section
            {
              label: 'What is the date of marriage?',
              type: 'date',
              required: true,
              section: 'Marriage Information'
            },
            {
              label: 'Where was the marriage performed? (City, state, country)',
              type: 'text',
              required: true,
              section: 'Marriage Information'
            },
            {
              label: 'What is the date of separation?',
              type: 'date',
              required: true,
              section: 'Marriage Information'
            },
            {
              label: 'Is this a fault or no-fault divorce?',
              type: 'select',
              required: true,
              section: 'Marriage Information',
              options: {
                create: [
                  { value: 'fault', label: 'Fault-based divorce' },
                  { value: 'no-fault', label: 'No-fault divorce' }
                ]
              }
            },
            {
              label: 'If fault-based, what are the grounds for divorce?',
              type: 'textarea',
              required: false,
              section: 'Marriage Information'
            },

            // Children and Custody Section
            {
              label: 'Do the parties have children together? If so, provide full names and birthdates.',
              type: 'textarea',
              required: true,
              section: 'Children and Custody'
            },
            {
              label: 'Is the wife currently pregnant?',
              type: 'select',
              required: true,
              section: 'Children and Custody',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'What child custody arrangement is being requested? (Legal and physical)',
              type: 'textarea',
              required: true,
              section: 'Children and Custody'
            },
            {
              label: 'What visitation/parenting time schedule is being requested?',
              type: 'textarea',
              required: true,
              section: 'Children and Custody'
            },
            {
              label: 'Are there any special needs children requiring additional support?',
              type: 'textarea',
              required: true,
              section: 'Children and Custody'
            },

            // Support Section
            {
              label: 'What child support amount is being requested?',
              type: 'text',
              required: true,
              section: 'Support'
            },
            {
              label: 'Is alimony/spousal support being requested? If so, how much and for how long?',
              type: 'textarea',
              required: true,
              section: 'Support'
            },

            // Property Division Section
            {
              label: 'What marital property needs to be divided? (Real estate, vehicles, accounts, etc.)',
              type: 'textarea',
              required: true,
              section: 'Property Division'
            },
            {
              label: 'What is the proposed division of marital property?',
              type: 'textarea',
              required: true,
              section: 'Property Division'
            },
            {
              label: 'What separate property does each spouse claim?',
              type: 'textarea',
              required: true,
              section: 'Property Division'
            },
            {
              label: 'What marital debts need to be divided?',
              type: 'textarea',
              required: true,
              section: 'Property Division'
            },
            {
              label: 'What is the proposed division of marital debts?',
              type: 'textarea',
              required: true,
              section: 'Property Division'
            },
            {
              label: 'Are there retirement accounts or pensions to be divided?',
              type: 'textarea',
              required: true,
              section: 'Property Division'
            },
            {
              label: 'Are there any businesses owned by the parties that need to be addressed?',
              type: 'textarea',
              required: true,
              section: 'Property Division'
            },

            // Additional Matters Section
            {
              label: 'Is a name change being requested by either spouse? If so, to what name?',
              type: 'textarea',
              required: true,
              section: 'Additional Matters'
            },
            {
              label: 'Are temporary orders needed while the divorce is pending?',
              type: 'textarea',
              required: true,
              section: 'Additional Matters'
            },
            {
              label: 'Is there a prenuptial or postnuptial agreement?',
              type: 'select',
              required: true,
              section: 'Additional Matters',
              options: {
                create: [
                  { value: 'prenup', label: 'Prenuptial agreement exists' },
                  { value: 'postnup', label: 'Postnuptial agreement exists' },
                  { value: 'both', label: 'Both agreements exist' },
                  { value: 'none', label: 'No agreements exist' }
                ]
              }
            },
            {
              label: 'Is there a proposed settlement agreement already in place?',
              type: 'select',
              required: true,
              section: 'Additional Matters',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Are there any domestic violence issues to address?',
              type: 'textarea',
              required: true,
              section: 'Additional Matters'
            },
            {
              label: 'Are there any substance abuse issues to address?',
              type: 'textarea',
              required: true,
              section: 'Additional Matters'
            },
            {
              label: 'Is either party seeking attorney\'s fees from the other?',
              type: 'select',
              required: true,
              section: 'Additional Matters',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Are there any restraining orders needed?',
              type: 'textarea',
              required: true,
              section: 'Additional Matters'
            },

            // Procedural Information Section
            {
              label: 'Is mediation required in this jurisdiction before proceeding to court?',
              type: 'select',
              required: true,
              section: 'Procedural Information',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Is there a proposed parenting plan?',
              type: 'select',
              required: true,
              section: 'Procedural Information',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'What are the filing fees in this jurisdiction?',
              type: 'text',
              required: true,
              section: 'Procedural Information'
            },
            {
              label: 'Is there a request for waiver of filing fees based on financial hardship?',
              type: 'select',
              required: true,
              section: 'Procedural Information',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Will service of process be accepted voluntarily or is formal service needed?',
              type: 'select',
              required: true,
              section: 'Procedural Information',
              options: {
                create: [
                  { value: 'voluntary', label: 'Voluntary acceptance' },
                  { value: 'formal', label: 'Formal service required' }
                ]
              }
            },
            {
              label: 'Are there any military service considerations?',
              type: 'select',
              required: true,
              section: 'Procedural Information',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Is there a separation agreement that needs to be incorporated into the divorce decree?',
              type: 'select',
              required: true,
              section: 'Procedural Information',
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

    console.log('Divorce papers seed completed successfully!')
  } catch (error) {
    console.error('Error seeding divorce papers:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the seed function if this file is executed directly
if (require.main === module) {
  seedDivorcePapers()
    .catch((error) => {
      console.error('Error running divorce papers seed:', error)
      process.exit(1)
    })
} 