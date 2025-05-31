import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function seedSeparationBeforeDivorce() {
  try {
    console.log('Starting separation before divorce seed...')

    // Create or update the template
    const template = await prisma.documentTemplate.upsert({
      where: { id: 'separation-before-divorce' },
      update: {
        name: 'Separation Agreement (Before Divorce)',
        description: 'Legal agreement for spouses who are separating before potential divorce',
        content: `# SEPARATION AGREEMENT (BEFORE DIVORCE)

This Separation Agreement (the "Agreement") is made on [DATE] by and between:

## ARTICLE I - PARTIES AND MARRIAGE
1.1 Spouse 1:
    Full Legal Name: [SPOUSE_1_NAME]
    Current Address: [SPOUSE_1_ADDRESS]

1.2 Spouse 2:
    Full Legal Name: [SPOUSE_2_NAME]
    Current Address: [SPOUSE_2_ADDRESS]

1.3 Marriage Information:
    Date of Marriage: [MARRIAGE_DATE]
    Place of Marriage: [MARRIAGE_PLACE]
    Date of Separation: [SEPARATION_DATE]

## ARTICLE II - NATURE OF SEPARATION
2.1 Type of Separation:
    [SEPARATION_TYPE]

2.2 Duration (if trial separation):
    [TRIAL_DURATION]

2.3 Living Arrangements:
    [LIVING_ARRANGEMENTS]
    Marital Home Occupancy: [HOME_OCCUPANCY]

## ARTICLE III - CHILDREN AND TEMPORARY CUSTODY
3.1 Children of the Marriage:
    [CHILDREN_NAMES_DOB]

3.2 Temporary Legal Custody:
    [TEMP_LEGAL_CUSTODY]

3.3 Temporary Physical Custody:
    [TEMP_PHYSICAL_CUSTODY]

3.4 Temporary Visitation Schedule:
    [TEMP_VISITATION_SCHEDULE]

## ARTICLE IV - TEMPORARY SUPPORT
4.1 Temporary Child Support:
    [TEMP_CHILD_SUPPORT]

4.2 Temporary Spousal Support:
    Amount: [TEMP_SPOUSAL_SUPPORT]
    Duration: [SUPPORT_DURATION]
    Termination Conditions: [SUPPORT_TERMINATION]

## ARTICLE V - FINANCIAL ARRANGEMENTS
5.1 Household Expenses:
    General Expenses: [HOUSEHOLD_EXPENSES]
    Mortgage/Rent: [HOUSING_PAYMENT]
    Utilities: [UTILITIES_PAYMENT]

5.2 Bank Accounts:
    Joint Accounts: [JOINT_ACCOUNTS_HANDLING]
    New Accounts: [NEW_ACCOUNTS]

5.3 Credit Cards and Debts:
    [CREDIT_CARDS_DEBTS]

5.4 Personal Property:
    Property Division: [PROPERTY_DIVISION]
    Vehicles: [VEHICLE_ALLOCATION]

## ARTICLE VI - INSURANCE AND HEALTHCARE
6.1 Health Insurance:
    [HEALTH_INSURANCE]

## ARTICLE VII - PERSONAL CONDUCT
7.1 Dating During Separation:
    [DATING_TERMS]

7.2 Communication Expectations:
    [COMMUNICATION_TERMS]

## ARTICLE VIII - LEGAL IMPLICATIONS
8.1 Property Rights:
    [PROPERTY_RIGHTS_WAIVER]

8.2 Grounds for Divorce:
    [DIVORCE_GROUNDS]

8.3 Tax Matters:
    Filing Status: [TAX_FILING_STATUS]
    Exemptions: [TAX_EXEMPTIONS]

## ARTICLE IX - AGREEMENT TERMS
9.1 Review/Termination Triggers:
    [REVIEW_TRIGGERS]

9.2 Reconciliation:
    [RECONCILIATION_TERMS]

9.3 Divorce Proceedings:
    [DIVORCE_TERMS]

9.4 Legal Fees:
    [LEGAL_FEES]

9.5 Governing Law:
    [GOVERNING_LAW]

9.6 Nature of Agreement:
    This agreement is a separation agreement only and does not constitute a divorce.

## SIGNATURES

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

___________________________      ___________________________
[SPOUSE_1_SIGNATURE]             [SPOUSE_2_SIGNATURE]
[SPOUSE_1_NAME]                  [SPOUSE_2_NAME]
Date: [DATE]                     Date: [DATE]

## NOTARY ACKNOWLEDGMENT

State of _______________
County of ______________

On this [DATE], before me personally appeared [SPOUSE_1_NAME] and [SPOUSE_2_NAME], known to me (or satisfactorily proven) to be the persons whose names are subscribed to this Separation Agreement, and acknowledged that they executed the same for the purposes therein contained.

___________________________
Notary Public
My Commission Expires: [EXPIRATION_DATE]`,
        categoryId: 'cm9bh3u2s0001vbcg20r64fyg',
        type: 'document',
        version: '1.0.0',
        state: 'published',
        metadata: {
          sections: [
            'Parties and Marriage',
            'Nature of Separation',
            'Children and Temporary Custody',
            'Temporary Support',
            'Financial Arrangements',
            'Insurance and Healthcare',
            'Personal Conduct',
            'Legal Implications',
            'Agreement Terms'
          ]
        }
      },
      create: {
        id: 'separation-before-divorce',
        name: 'Separation Agreement (Before Divorce)',
        description: 'Legal agreement for spouses who are separating before potential divorce',
        content: `# SEPARATION AGREEMENT (BEFORE DIVORCE)

This Separation Agreement (the "Agreement") is made on [DATE] by and between:

## ARTICLE I - PARTIES AND MARRIAGE
1.1 Spouse 1:
    Full Legal Name: [SPOUSE_1_NAME]
    Current Address: [SPOUSE_1_ADDRESS]

1.2 Spouse 2:
    Full Legal Name: [SPOUSE_2_NAME]
    Current Address: [SPOUSE_2_ADDRESS]

1.3 Marriage Information:
    Date of Marriage: [MARRIAGE_DATE]
    Place of Marriage: [MARRIAGE_PLACE]
    Date of Separation: [SEPARATION_DATE]

## ARTICLE II - NATURE OF SEPARATION
2.1 Type of Separation:
    [SEPARATION_TYPE]

2.2 Duration (if trial separation):
    [TRIAL_DURATION]

2.3 Living Arrangements:
    [LIVING_ARRANGEMENTS]
    Marital Home Occupancy: [HOME_OCCUPANCY]

## ARTICLE III - CHILDREN AND TEMPORARY CUSTODY
3.1 Children of the Marriage:
    [CHILDREN_NAMES_DOB]

3.2 Temporary Legal Custody:
    [TEMP_LEGAL_CUSTODY]

3.3 Temporary Physical Custody:
    [TEMP_PHYSICAL_CUSTODY]

3.4 Temporary Visitation Schedule:
    [TEMP_VISITATION_SCHEDULE]

## ARTICLE IV - TEMPORARY SUPPORT
4.1 Temporary Child Support:
    [TEMP_CHILD_SUPPORT]

4.2 Temporary Spousal Support:
    Amount: [TEMP_SPOUSAL_SUPPORT]
    Duration: [SUPPORT_DURATION]
    Termination Conditions: [SUPPORT_TERMINATION]

## ARTICLE V - FINANCIAL ARRANGEMENTS
5.1 Household Expenses:
    General Expenses: [HOUSEHOLD_EXPENSES]
    Mortgage/Rent: [HOUSING_PAYMENT]
    Utilities: [UTILITIES_PAYMENT]

5.2 Bank Accounts:
    Joint Accounts: [JOINT_ACCOUNTS_HANDLING]
    New Accounts: [NEW_ACCOUNTS]

5.3 Credit Cards and Debts:
    [CREDIT_CARDS_DEBTS]

5.4 Personal Property:
    Property Division: [PROPERTY_DIVISION]
    Vehicles: [VEHICLE_ALLOCATION]

## ARTICLE VI - INSURANCE AND HEALTHCARE
6.1 Health Insurance:
    [HEALTH_INSURANCE]

## ARTICLE VII - PERSONAL CONDUCT
7.1 Dating During Separation:
    [DATING_TERMS]

7.2 Communication Expectations:
    [COMMUNICATION_TERMS]

## ARTICLE VIII - LEGAL IMPLICATIONS
8.1 Property Rights:
    [PROPERTY_RIGHTS_WAIVER]

8.2 Grounds for Divorce:
    [DIVORCE_GROUNDS]

8.3 Tax Matters:
    Filing Status: [TAX_FILING_STATUS]
    Exemptions: [TAX_EXEMPTIONS]

## ARTICLE IX - AGREEMENT TERMS
9.1 Review/Termination Triggers:
    [REVIEW_TRIGGERS]

9.2 Reconciliation:
    [RECONCILIATION_TERMS]

9.3 Divorce Proceedings:
    [DIVORCE_TERMS]

9.4 Legal Fees:
    [LEGAL_FEES]

9.5 Governing Law:
    [GOVERNING_LAW]

9.6 Nature of Agreement:
    This agreement is a separation agreement only and does not constitute a divorce.

## SIGNATURES

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

___________________________      ___________________________
[SPOUSE_1_SIGNATURE]             [SPOUSE_2_SIGNATURE]
[SPOUSE_1_NAME]                  [SPOUSE_2_NAME]
Date: [DATE]                     Date: [DATE]

## NOTARY ACKNOWLEDGMENT

State of _______________
County of ______________

On this [DATE], before me personally appeared [SPOUSE_1_NAME] and [SPOUSE_2_NAME], known to me (or satisfactorily proven) to be the persons whose names are subscribed to this Separation Agreement, and acknowledged that they executed the same for the purposes therein contained.

___________________________
Notary Public
My Commission Expires: [EXPIRATION_DATE]`,
        categoryId: 'cm9bh3u2s0001vbcg20r64fyg',
        type: 'document',
        version: '1.0.0',
        state: 'published',
        metadata: {
          sections: [
            'Parties and Marriage',
            'Nature of Separation',
            'Children and Temporary Custody',
            'Temporary Support',
            'Financial Arrangements',
            'Insurance and Healthcare',
            'Personal Conduct',
            'Legal Implications',
            'Agreement Terms'
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
        id: 'separation-before-divorce-questions',
        name: 'Separation Agreement (Before Divorce) Questionnaire',
        description: 'Questions for creating a Separation Agreement before divorce',
        templateId: template.id,
        questions: {
          create: [
            // Parties and Marriage Section
            {
              label: 'What are the full legal names of both spouses?',
              type: 'text',
              required: true,
              section: 'Parties and Marriage'
            },
            {
              label: 'What are the current addresses of both spouses?',
              type: 'text',
              required: true,
              section: 'Parties and Marriage'
            },
            {
              label: 'What is the date of marriage?',
              type: 'date',
              required: true,
              section: 'Parties and Marriage'
            },
            {
              label: 'Where was the marriage performed? (City, state, country)',
              type: 'text',
              required: true,
              section: 'Parties and Marriage'
            },
            {
              label: 'What is the date of separation? (Actual or intended)',
              type: 'date',
              required: true,
              section: 'Parties and Marriage'
            },

            // Nature of Separation Section
            {
              label: 'Is this separation intended to be a trial separation or a permanent separation leading to divorce?',
              type: 'select',
              required: true,
              section: 'Nature of Separation',
              options: {
                create: [
                  { value: 'trial', label: 'Trial separation' },
                  { value: 'permanent', label: 'Permanent separation leading to divorce' }
                ]
              }
            },
            {
              label: 'If a trial separation, what is the expected duration?',
              type: 'text',
              required: false,
              section: 'Nature of Separation'
            },
            {
              label: 'Will the parties live separately during the separation? If so, who will remain in the marital home?',
              type: 'textarea',
              required: true,
              section: 'Nature of Separation'
            },

            // Children and Temporary Custody Section
            {
              label: 'Do the parties have children together? If so, provide full names and birthdates.',
              type: 'textarea',
              required: true,
              section: 'Children and Temporary Custody'
            },
            {
              label: 'Who will have temporary legal custody of the children during separation?',
              type: 'select',
              required: true,
              section: 'Children and Temporary Custody',
              options: {
                create: [
                  { value: 'joint', label: 'Joint temporary custody' },
                  { value: 'spouse1', label: 'Spouse 1 temporary custody' },
                  { value: 'spouse2', label: 'Spouse 2 temporary custody' }
                ]
              }
            },
            {
              label: 'Who will have temporary physical custody of the children during separation?',
              type: 'select',
              required: true,
              section: 'Children and Temporary Custody',
              options: {
                create: [
                  { value: 'shared', label: 'Shared physical custody' },
                  { value: 'spouse1', label: 'Spouse 1 primary custody' },
                  { value: 'spouse2', label: 'Spouse 2 primary custody' }
                ]
              }
            },
            {
              label: 'What will be the visitation/parenting time schedule during separation?',
              type: 'textarea',
              required: true,
              section: 'Children and Temporary Custody'
            },

            // Temporary Support Section
            {
              label: 'What temporary child support arrangements will be in place?',
              type: 'textarea',
              required: true,
              section: 'Temporary Support'
            },
            {
              label: 'Will either spouse receive temporary alimony/spousal support during separation?',
              type: 'select',
              required: true,
              section: 'Temporary Support',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'If so, how much, for how long, and under what conditions does it terminate?',
              type: 'textarea',
              required: false,
              section: 'Temporary Support'
            },

            // Financial Arrangements Section
            {
              label: 'How will household expenses be handled during the separation?',
              type: 'textarea',
              required: true,
              section: 'Financial Arrangements'
            },
            {
              label: 'How will the mortgage or rent be paid during separation?',
              type: 'textarea',
              required: true,
              section: 'Financial Arrangements'
            },
            {
              label: 'How will utilities and other household bills be paid?',
              type: 'textarea',
              required: true,
              section: 'Financial Arrangements'
            },
            {
              label: 'How will joint bank accounts be handled during separation?',
              type: 'textarea',
              required: true,
              section: 'Financial Arrangements'
            },
            {
              label: 'Will new separate accounts be established?',
              type: 'select',
              required: true,
              section: 'Financial Arrangements',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'How will joint credit cards and debts be handled during separation?',
              type: 'textarea',
              required: true,
              section: 'Financial Arrangements'
            },
            {
              label: 'What personal property can each spouse take if living separately?',
              type: 'textarea',
              required: true,
              section: 'Financial Arrangements'
            },
            {
              label: 'How will vehicles be allocated between the spouses?',
              type: 'textarea',
              required: true,
              section: 'Financial Arrangements'
            },

            // Insurance and Healthcare Section
            {
              label: 'How will health insurance coverage be maintained during separation?',
              type: 'textarea',
              required: true,
              section: 'Insurance and Healthcare'
            },

            // Personal Conduct Section
            {
              label: 'Can either spouse date other people during the separation?',
              type: 'select',
              required: true,
              section: 'Personal Conduct',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'What communication expectations exist between the spouses during separation?',
              type: 'textarea',
              required: true,
              section: 'Personal Conduct'
            },

            // Legal Implications Section
            {
              label: 'Will the separation agreement address grounds for divorce if reconciliation fails?',
              type: 'select',
              required: true,
              section: 'Legal Implications',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Is either spouse waiving rights to certain property by agreeing to this separation?',
              type: 'textarea',
              required: true,
              section: 'Legal Implications'
            },
            {
              label: 'How will tax issues be handled during separation? (Filing status, exemptions)',
              type: 'textarea',
              required: true,
              section: 'Legal Implications'
            },

            // Agreement Terms Section
            {
              label: 'What will trigger a review or end of the separation agreement?',
              type: 'textarea',
              required: true,
              section: 'Agreement Terms'
            },
            {
              label: 'What happens if reconciliation occurs?',
              type: 'textarea',
              required: true,
              section: 'Agreement Terms'
            },
            {
              label: 'What happens if one party decides to proceed with divorce?',
              type: 'textarea',
              required: true,
              section: 'Agreement Terms'
            },
            {
              label: 'How will legal fees for the separation agreement be handled?',
              type: 'textarea',
              required: true,
              section: 'Agreement Terms'
            },
            {
              label: 'What state\'s law will govern the agreement?',
              type: 'text',
              required: true,
              section: 'Agreement Terms'
            },
            {
              label: 'Does the agreement need to specify that it is not a divorce?',
              type: 'select',
              required: true,
              section: 'Agreement Terms',
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

    console.log('Separation before divorce seed completed successfully!')
  } catch (error) {
    console.error('Error seeding separation before divorce:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the seed function if this file is executed directly
if (require.main === module) {
  seedSeparationBeforeDivorce()
    .catch((error) => {
      console.error('Error running separation before divorce seed:', error)
      process.exit(1)
    })
} 