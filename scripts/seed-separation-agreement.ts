import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function seedSeparationAgreement() {
  try {
    console.log('Starting separation agreement seed...')

    // Create or update the template
    const template = await prisma.documentTemplate.upsert({
      where: { id: 'separation-agreement' },
      update: {
        name: 'Separation Agreement / Acuerdo de Separación',
        description: 'Legal agreement between spouses who are separating',
        content: `# SEPARATION AGREEMENT / ACUERDO DE SEPARACIÓN

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

## ARTICLE II - CHILDREN AND CUSTODY
2.1 Children of the Marriage:
    [CHILDREN_NAMES_DOB]

2.2 Legal Custody:
    [LEGAL_CUSTODY_TERMS]

2.3 Physical Custody:
    [PHYSICAL_CUSTODY_TERMS]

2.4 Visitation/Parenting Time:
    Regular Schedule: [VISITATION_SCHEDULE]
    Holidays: [HOLIDAY_SCHEDULE]
    School Breaks: [SCHOOL_BREAK_SCHEDULE]
    Summer Vacations: [SUMMER_SCHEDULE]

## ARTICLE III - CHILD SUPPORT AND EXPENSES
3.1 Child Support:
    Amount: [CHILD_SUPPORT_AMOUNT]
    Paying Party: [PAYING_PARTY]
    Payment Schedule: [PAYMENT_SCHEDULE]

3.2 Extraordinary Expenses:
    Medical: [MEDICAL_EXPENSES]
    Educational: [EDUCATIONAL_EXPENSES]
    Extracurricular: [EXTRACURRICULAR_EXPENSES]

## ARTICLE IV - SPOUSAL SUPPORT
4.1 Alimony/Spousal Support:
    Amount: [ALIMONY_AMOUNT]
    Duration: [ALIMONY_DURATION]
    Termination Conditions: [ALIMONY_TERMINATION]

## ARTICLE V - PROPERTY DIVISION
5.1 Real Estate:
    Marital Home: [MARITAL_HOME_DISPOSITION]
    Sale Proceeds: [SALE_PROCEEDS]
    Buyout Terms: [BUYOUT_TERMS]
    Other Real Estate: [OTHER_REAL_ESTATE]

5.2 Personal Property:
    [PERSONAL_PROPERTY_DIVISION]

5.3 Financial Accounts:
    Checking/Savings: [BANK_ACCOUNTS_DIVISION]
    Investments: [INVESTMENT_ACCOUNTS_DIVISION]

5.4 Retirement and Pension:
    [RETIREMENT_DIVISION]

## ARTICLE VI - DEBTS AND LIABILITIES
6.1 Allocation of Debts:
    [DEBT_ALLOCATION]

6.2 Joint Accounts:
    Credit Cards: [CREDIT_CARDS_HANDLING]
    Other Joint Accounts: [JOINT_ACCOUNTS_HANDLING]

## ARTICLE VII - INSURANCE AND HEALTHCARE
7.1 Health Insurance:
    Coverage Terms: [HEALTH_INSURANCE_TERMS]
    Uncovered Expenses: [UNCOVERED_EXPENSES]

7.2 Life Insurance:
    [LIFE_INSURANCE_TERMS]

## ARTICLE VIII - TAX MATTERS
8.1 Tax Filing Status: [TAX_FILING_STATUS]
8.2 Exemptions and Credits: [TAX_EXEMPTIONS]
8.3 Future Tax Issues: [TAX_ISSUES]

## ARTICLE IX - BUSINESS INTERESTS
9.1 Business Division/Management:
    [BUSINESS_INTERESTS]

## ARTICLE X - GENERAL PROVISIONS
10.1 Confidentiality:
    [CONFIDENTIALITY_TERMS]

10.2 Dispute Resolution:
    [DISPUTE_RESOLUTION]

10.3 Governing Law:
    [GOVERNING_LAW]

10.4 Divorce Incorporation:
    [DIVORCE_INCORPORATION]

10.5 Legal Fees:
    [LEGAL_FEES]

10.6 Special Provisions:
    [SPECIAL_PROVISIONS]

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
            'Children and Custody',
            'Child Support and Expenses',
            'Spousal Support',
            'Property Division',
            'Debts and Liabilities',
            'Insurance and Healthcare',
            'Tax Matters',
            'Business Interests',
            'General Provisions'
          ]
        }
      },
      create: {
        id: 'separation-agreement',
        name: 'Separation Agreement / Acuerdo de Separación',
        description: 'Legal agreement between spouses who are separating',
        content: `# SEPARATION AGREEMENT / ACUERDO DE SEPARACIÓN

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

## ARTICLE II - CHILDREN AND CUSTODY
2.1 Children of the Marriage:
    [CHILDREN_NAMES_DOB]

2.2 Legal Custody:
    [LEGAL_CUSTODY_TERMS]

2.3 Physical Custody:
    [PHYSICAL_CUSTODY_TERMS]

2.4 Visitation/Parenting Time:
    Regular Schedule: [VISITATION_SCHEDULE]
    Holidays: [HOLIDAY_SCHEDULE]
    School Breaks: [SCHOOL_BREAK_SCHEDULE]
    Summer Vacations: [SUMMER_SCHEDULE]

## ARTICLE III - CHILD SUPPORT AND EXPENSES
3.1 Child Support:
    Amount: [CHILD_SUPPORT_AMOUNT]
    Paying Party: [PAYING_PARTY]
    Payment Schedule: [PAYMENT_SCHEDULE]

3.2 Extraordinary Expenses:
    Medical: [MEDICAL_EXPENSES]
    Educational: [EDUCATIONAL_EXPENSES]
    Extracurricular: [EXTRACURRICULAR_EXPENSES]

## ARTICLE IV - SPOUSAL SUPPORT
4.1 Alimony/Spousal Support:
    Amount: [ALIMONY_AMOUNT]
    Duration: [ALIMONY_DURATION]
    Termination Conditions: [ALIMONY_TERMINATION]

## ARTICLE V - PROPERTY DIVISION
5.1 Real Estate:
    Marital Home: [MARITAL_HOME_DISPOSITION]
    Sale Proceeds: [SALE_PROCEEDS]
    Buyout Terms: [BUYOUT_TERMS]
    Other Real Estate: [OTHER_REAL_ESTATE]

5.2 Personal Property:
    [PERSONAL_PROPERTY_DIVISION]

5.3 Financial Accounts:
    Checking/Savings: [BANK_ACCOUNTS_DIVISION]
    Investments: [INVESTMENT_ACCOUNTS_DIVISION]

5.4 Retirement and Pension:
    [RETIREMENT_DIVISION]

## ARTICLE VI - DEBTS AND LIABILITIES
6.1 Allocation of Debts:
    [DEBT_ALLOCATION]

6.2 Joint Accounts:
    Credit Cards: [CREDIT_CARDS_HANDLING]
    Other Joint Accounts: [JOINT_ACCOUNTS_HANDLING]

## ARTICLE VII - INSURANCE AND HEALTHCARE
7.1 Health Insurance:
    Coverage Terms: [HEALTH_INSURANCE_TERMS]
    Uncovered Expenses: [UNCOVERED_EXPENSES]

7.2 Life Insurance:
    [LIFE_INSURANCE_TERMS]

## ARTICLE VIII - TAX MATTERS
8.1 Tax Filing Status: [TAX_FILING_STATUS]
8.2 Exemptions and Credits: [TAX_EXEMPTIONS]
8.3 Future Tax Issues: [TAX_ISSUES]

## ARTICLE IX - BUSINESS INTERESTS
9.1 Business Division/Management:
    [BUSINESS_INTERESTS]

## ARTICLE X - GENERAL PROVISIONS
10.1 Confidentiality:
    [CONFIDENTIALITY_TERMS]

10.2 Dispute Resolution:
    [DISPUTE_RESOLUTION]

10.3 Governing Law:
    [GOVERNING_LAW]

10.4 Divorce Incorporation:
    [DIVORCE_INCORPORATION]

10.5 Legal Fees:
    [LEGAL_FEES]

10.6 Special Provisions:
    [SPECIAL_PROVISIONS]

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
            'Children and Custody',
            'Child Support and Expenses',
            'Spousal Support',
            'Property Division',
            'Debts and Liabilities',
            'Insurance and Healthcare',
            'Tax Matters',
            'Business Interests',
            'General Provisions'
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
        id: 'separation-agreement-questions',
        name: 'Separation Agreement Questionnaire',
        description: 'Questions for creating a Separation Agreement',
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

            // Children and Custody Section
            {
              label: 'Do the parties have children together? If so, provide full names and birthdates.',
              type: 'textarea',
              required: true,
              section: 'Children and Custody'
            },
            {
              label: 'Who will have legal custody of the children?',
              type: 'select',
              required: true,
              section: 'Children and Custody',
              options: {
                create: [
                  { value: 'joint', label: 'Joint custody' },
                  { value: 'sole_spouse1', label: 'Sole custody - Spouse 1' },
                  { value: 'sole_spouse2', label: 'Sole custody - Spouse 2' }
                ]
              }
            },
            {
              label: 'Who will have physical custody of the children?',
              type: 'select',
              required: true,
              section: 'Children and Custody',
              options: {
                create: [
                  { value: 'shared', label: 'Shared custody' },
                  { value: 'primary_spouse1', label: 'Primary custody - Spouse 1' },
                  { value: 'primary_spouse2', label: 'Primary custody - Spouse 2' },
                  { value: 'split', label: 'Split custody' }
                ]
              }
            },
            {
              label: 'What will be the visitation/parenting time schedule for the non-custodial parent?',
              type: 'textarea',
              required: true,
              section: 'Children and Custody'
            },
            {
              label: 'How will holidays, school breaks, and summer vacations be divided?',
              type: 'textarea',
              required: true,
              section: 'Children and Custody'
            },

            // Child Support and Expenses Section
            {
              label: 'What is the amount of child support to be paid?',
              type: 'text',
              required: true,
              section: 'Child Support and Expenses'
            },
            {
              label: 'Who will pay child support and how often will it be paid?',
              type: 'textarea',
              required: true,
              section: 'Child Support and Expenses'
            },
            {
              label: 'How will extraordinary expenses for the children be handled? (Medical, educational, extracurricular)',
              type: 'textarea',
              required: true,
              section: 'Child Support and Expenses'
            },

            // Spousal Support Section
            {
              label: 'Will either spouse receive alimony/spousal support?',
              type: 'select',
              required: true,
              section: 'Spousal Support',
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
              section: 'Spousal Support'
            },

            // Property Division Section
            {
              label: 'What real estate do the parties own together?',
              type: 'textarea',
              required: true,
              section: 'Property Division'
            },
            {
              label: 'How will the real estate be divided or managed?',
              type: 'textarea',
              required: true,
              section: 'Property Division'
            },
            {
              label: 'If the marital home will be sold, how will proceeds be divided?',
              type: 'textarea',
              required: false,
              section: 'Property Division'
            },
            {
              label: 'If one party will keep the marital home, will there be a buyout or refinancing?',
              type: 'textarea',
              required: false,
              section: 'Property Division'
            },
            {
              label: 'How will personal property be divided? (Furniture, appliances, vehicles, etc.)',
              type: 'textarea',
              required: true,
              section: 'Property Division'
            },
            {
              label: 'How will financial accounts be divided? (Checking, savings, investments)',
              type: 'textarea',
              required: true,
              section: 'Property Division'
            },
            {
              label: 'How will retirement accounts and pensions be divided?',
              type: 'textarea',
              required: true,
              section: 'Property Division'
            },

            // Debts and Liabilities Section
            {
              label: 'How will debts be allocated between the parties?',
              type: 'textarea',
              required: true,
              section: 'Debts and Liabilities'
            },
            {
              label: 'What happens to joint credit cards and accounts?',
              type: 'textarea',
              required: true,
              section: 'Debts and Liabilities'
            },

            // Insurance and Healthcare Section
            {
              label: 'Will either party maintain health insurance for the other or for children?',
              type: 'textarea',
              required: true,
              section: 'Insurance and Healthcare'
            },
            {
              label: 'How will uncovered medical expenses be handled?',
              type: 'textarea',
              required: true,
              section: 'Insurance and Healthcare'
            },
            {
              label: 'Will life insurance be maintained for the benefit of either spouse or children?',
              type: 'textarea',
              required: true,
              section: 'Insurance and Healthcare'
            },

            // Tax Matters Section
            {
              label: 'How will tax issues be handled? (Filing status, exemptions, credits)',
              type: 'textarea',
              required: true,
              section: 'Tax Matters'
            },

            // Business Interests Section
            {
              label: 'Are there any business interests to be addressed? How will they be handled?',
              type: 'textarea',
              required: false,
              section: 'Business Interests'
            },

            // General Provisions Section
            {
              label: 'Is there a need for confidentiality provisions?',
              type: 'select',
              required: true,
              section: 'General Provisions',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'How will future disputes be resolved? (Mediation, arbitration)',
              type: 'textarea',
              required: true,
              section: 'General Provisions'
            },
            {
              label: 'What state\'s law will govern the agreement?',
              type: 'text',
              required: true,
              section: 'General Provisions'
            },
            {
              label: 'Is this agreement intended to be incorporated into a future divorce decree?',
              type: 'select',
              required: true,
              section: 'General Provisions',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Will either party be responsible for the other\'s legal fees?',
              type: 'textarea',
              required: true,
              section: 'General Provisions'
            },
            {
              label: 'Are there any other special provisions needed?',
              type: 'textarea',
              required: false,
              section: 'General Provisions'
            }
          ]
        }
      }
    })
    console.log('Created/Updated questionnaire:', questionnaire.name)

    console.log('Separation agreement seed completed successfully!')
  } catch (error) {
    console.error('Error seeding separation agreement:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the seed function if this file is executed directly
if (require.main === module) {
  seedSeparationAgreement()
    .catch((error) => {
      console.error('Error running separation agreement seed:', error)
      process.exit(1)
    })
} 