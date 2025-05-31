import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function seedPostnuptialAgreement() {
  try {
    console.log('Starting postnuptial agreement seed...')

    // Create or update the template
    const template = await prisma.documentTemplate.upsert({
      where: { id: 'postnuptial-agreement' },
      update: {
        name: 'Postnuptial Agreement',
        description: 'Legal agreement between spouses after marriage',
        content: `# POSTNUPTIAL AGREEMENT

This Postnuptial Agreement (the "Agreement") is made and entered into on [AGREEMENT_DATE] by and between:

[SPOUSE_1_NAME] ("Spouse 1") and
[SPOUSE_2_NAME] ("Spouse 2")

## ARTICLE I - PARTIES AND MARRIAGE
1.1 Spouse 1's Information:
    - Full Legal Name: [SPOUSE_1_NAME]
    - Current Address: [SPOUSE_1_ADDRESS]

1.2 Spouse 2's Information:
    - Full Legal Name: [SPOUSE_2_NAME]
    - Current Address: [SPOUSE_2_ADDRESS]

1.3 Marriage Information:
    - Date of Marriage: [MARRIAGE_DATE]
    - Location of Marriage: [MARRIAGE_LOCATION]

1.4 Purpose of Agreement:
    [AGREEMENT_PURPOSE]

## ARTICLE II - CHILDREN
2.1 Children from Previous Relationships:
    [PREVIOUS_CHILDREN]

2.2 Children of Current Marriage:
    [CURRENT_CHILDREN]

2.3 Provisions for Existing Children:
    [EXISTING_CHILDREN_PROVISIONS]

2.4 Provisions for Future Children:
    [FUTURE_CHILDREN_PROVISIONS]

## ARTICLE III - ASSETS AND DEBTS
3.1 Spouse 1's Individual Assets:
    - Description: [SPOUSE_1_ASSETS]
    - Estimated Values: [SPOUSE_1_ASSET_VALUES]

3.2 Spouse 2's Individual Assets:
    - Description: [SPOUSE_2_ASSETS]
    - Estimated Values: [SPOUSE_2_ASSET_VALUES]

3.3 Jointly Owned Assets:
    - Description: [JOINT_ASSETS]
    - Estimated Values: [JOINT_ASSET_VALUES]

3.4 Individual Debts:
    - Spouse 1: [SPOUSE_1_DEBTS]
    - Spouse 2: [SPOUSE_2_DEBTS]

3.5 Joint Debts:
    [JOINT_DEBTS]

## ARTICLE IV - INCOME AND FINANCIAL MATTERS
4.1 Current Income:
    - Spouse 1: [SPOUSE_1_INCOME]
    - Spouse 2: [SPOUSE_2_INCOME]

4.2 Income Sources:
    - Spouse 1: [SPOUSE_1_INCOME_SOURCES]
    - Spouse 2: [SPOUSE_2_INCOME_SOURCES]

4.3 Expected Inheritances/Gifts: [EXPECTED_INHERITANCES]

## ARTICLE V - PROPERTY RIGHTS AND DIVISION
5.1 Pre-Marriage Property Classification: [PREMARRIAGE_PROPERTY]
5.2 Marital Property Classification: [MARITAL_PROPERTY]
5.3 Property Division in Divorce: [PROPERTY_DIVISION]
5.4 Household Expenses: [HOUSEHOLD_EXPENSES]

## ARTICLE VI - SUPPORT AND BENEFITS
6.1 Spousal Support/Alimony: [SPOUSAL_SUPPORT]
6.2 Retirement Accounts: [RETIREMENT_ACCOUNTS]
6.3 Estate Rights: [ESTATE_RIGHTS]

## ARTICLE VII - SPECIAL PROVISIONS
7.1 Business Interests: [BUSINESS_INTERESTS]
7.2 Debt Responsibility: [DEBT_RESPONSIBILITY]
7.3 Sunset Provisions: [SUNSET_PROVISIONS]
7.4 Escalator Clauses: [ESCALATOR_CLAUSES]
7.5 Modification Terms: [MODIFICATION_TERMS]
7.6 Governing Law: [GOVERNING_LAW]
7.7 Lifestyle Provisions: [LIFESTYLE_PROVISIONS]

## ARTICLE VIII - EXECUTION
8.1 Legal Counsel: [LEGAL_COUNSEL]
8.2 Financial Disclosures: [FINANCIAL_DISCLOSURES]
8.3 Execution Requirements: [EXECUTION_REQUIREMENTS]

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

___________________________      ___________________________
[SPOUSE_1_SIGNATURE]             [SPOUSE_2_SIGNATURE]
[SPOUSE_1_NAME]                  [SPOUSE_2_NAME]

Date: [DATE]                     Date: [DATE]`,
        categoryId: 'cm9bh3u2s0001vbcg20r64fyg',
        type: 'document',
        version: '1.0.0',
        state: 'published',
        metadata: {
          sections: [
            'Parties and Marriage',
            'Children',
            'Assets and Debts',
            'Income and Financial Matters',
            'Property Rights and Division',
            'Support and Benefits',
            'Special Provisions',
            'Execution'
          ]
        }
      },
      create: {
        id: 'postnuptial-agreement',
        name: 'Postnuptial Agreement',
        description: 'Legal agreement between spouses after marriage',
        content: `# POSTNUPTIAL AGREEMENT

This Postnuptial Agreement (the "Agreement") is made and entered into on [AGREEMENT_DATE] by and between:

[SPOUSE_1_NAME] ("Spouse 1") and
[SPOUSE_2_NAME] ("Spouse 2")

## ARTICLE I - PARTIES AND MARRIAGE
1.1 Spouse 1's Information:
    - Full Legal Name: [SPOUSE_1_NAME]
    - Current Address: [SPOUSE_1_ADDRESS]

1.2 Spouse 2's Information:
    - Full Legal Name: [SPOUSE_2_NAME]
    - Current Address: [SPOUSE_2_ADDRESS]

1.3 Marriage Information:
    - Date of Marriage: [MARRIAGE_DATE]
    - Location of Marriage: [MARRIAGE_LOCATION]

1.4 Purpose of Agreement:
    [AGREEMENT_PURPOSE]

## ARTICLE II - CHILDREN
2.1 Children from Previous Relationships:
    [PREVIOUS_CHILDREN]

2.2 Children of Current Marriage:
    [CURRENT_CHILDREN]

2.3 Provisions for Existing Children:
    [EXISTING_CHILDREN_PROVISIONS]

2.4 Provisions for Future Children:
    [FUTURE_CHILDREN_PROVISIONS]

## ARTICLE III - ASSETS AND DEBTS
3.1 Spouse 1's Individual Assets:
    - Description: [SPOUSE_1_ASSETS]
    - Estimated Values: [SPOUSE_1_ASSET_VALUES]

3.2 Spouse 2's Individual Assets:
    - Description: [SPOUSE_2_ASSETS]
    - Estimated Values: [SPOUSE_2_ASSET_VALUES]

3.3 Jointly Owned Assets:
    - Description: [JOINT_ASSETS]
    - Estimated Values: [JOINT_ASSET_VALUES]

3.4 Individual Debts:
    - Spouse 1: [SPOUSE_1_DEBTS]
    - Spouse 2: [SPOUSE_2_DEBTS]

3.5 Joint Debts:
    [JOINT_DEBTS]

## ARTICLE IV - INCOME AND FINANCIAL MATTERS
4.1 Current Income:
    - Spouse 1: [SPOUSE_1_INCOME]
    - Spouse 2: [SPOUSE_2_INCOME]

4.2 Income Sources:
    - Spouse 1: [SPOUSE_1_INCOME_SOURCES]
    - Spouse 2: [SPOUSE_2_INCOME_SOURCES]

4.3 Expected Inheritances/Gifts: [EXPECTED_INHERITANCES]

## ARTICLE V - PROPERTY RIGHTS AND DIVISION
5.1 Pre-Marriage Property Classification: [PREMARRIAGE_PROPERTY]
5.2 Marital Property Classification: [MARITAL_PROPERTY]
5.3 Property Division in Divorce: [PROPERTY_DIVISION]
5.4 Household Expenses: [HOUSEHOLD_EXPENSES]

## ARTICLE VI - SUPPORT AND BENEFITS
6.1 Spousal Support/Alimony: [SPOUSAL_SUPPORT]
6.2 Retirement Accounts: [RETIREMENT_ACCOUNTS]
6.3 Estate Rights: [ESTATE_RIGHTS]

## ARTICLE VII - SPECIAL PROVISIONS
7.1 Business Interests: [BUSINESS_INTERESTS]
7.2 Debt Responsibility: [DEBT_RESPONSIBILITY]
7.3 Sunset Provisions: [SUNSET_PROVISIONS]
7.4 Escalator Clauses: [ESCALATOR_CLAUSES]
7.5 Modification Terms: [MODIFICATION_TERMS]
7.6 Governing Law: [GOVERNING_LAW]
7.7 Lifestyle Provisions: [LIFESTYLE_PROVISIONS]

## ARTICLE VIII - EXECUTION
8.1 Legal Counsel: [LEGAL_COUNSEL]
8.2 Financial Disclosures: [FINANCIAL_DISCLOSURES]
8.3 Execution Requirements: [EXECUTION_REQUIREMENTS]

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

___________________________      ___________________________
[SPOUSE_1_SIGNATURE]             [SPOUSE_2_SIGNATURE]
[SPOUSE_1_NAME]                  [SPOUSE_2_NAME]

Date: [DATE]                     Date: [DATE]`,
        categoryId: 'cm9bh3u2s0001vbcg20r64fyg',
        type: 'document',
        version: '1.0.0',
        state: 'published',
        metadata: {
          sections: [
            'Parties and Marriage',
            'Children',
            'Assets and Debts',
            'Income and Financial Matters',
            'Property Rights and Division',
            'Support and Benefits',
            'Special Provisions',
            'Execution'
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
        id: 'postnuptial-agreement-questions',
        name: 'Postnuptial Agreement Questionnaire',
        description: 'Questions for creating a Postnuptial Agreement',
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
              label: 'What is the date of this postnuptial agreement?',
              type: 'date',
              required: true,
              section: 'Parties and Marriage'
            },
            {
              label: 'What is the purpose or motivation for creating this postnuptial agreement?',
              type: 'textarea',
              required: true,
              section: 'Parties and Marriage'
            },

            // Children Section
            {
              label: 'Does either spouse have children from previous relationships? If so, provide names and ages.',
              type: 'textarea',
              required: true,
              section: 'Children'
            },
            {
              label: 'Do the spouses have children together? If so, provide names and ages.',
              type: 'textarea',
              required: true,
              section: 'Children'
            },
            {
              label: 'Are there any provisions that apply specifically to existing children?',
              type: 'textarea',
              required: false,
              section: 'Children'
            },
            {
              label: 'Are there any provisions for future children?',
              type: 'textarea',
              required: false,
              section: 'Children'
            },

            // Assets and Debts Section
            {
              label: 'What assets does each spouse currently own? (Real estate, investments, businesses, vehicles, etc.)',
              type: 'textarea',
              required: true,
              section: 'Assets and Debts'
            },
            {
              label: 'What is the estimated value of each asset?',
              type: 'textarea',
              required: true,
              section: 'Assets and Debts'
            },
            {
              label: 'What assets are owned jointly by the spouses?',
              type: 'textarea',
              required: true,
              section: 'Assets and Debts'
            },
            {
              label: 'What debts does each spouse have individually?',
              type: 'textarea',
              required: true,
              section: 'Assets and Debts'
            },
            {
              label: 'What debts do the spouses have jointly?',
              type: 'textarea',
              required: true,
              section: 'Assets and Debts'
            },

            // Income and Financial Matters Section
            {
              label: 'What is the current income of each spouse?',
              type: 'textarea',
              required: true,
              section: 'Income and Financial Matters'
            },
            {
              label: 'What are the sources of income for each spouse?',
              type: 'textarea',
              required: true,
              section: 'Income and Financial Matters'
            },
            {
              label: 'Are there expected inheritances or gifts that should be addressed?',
              type: 'textarea',
              required: false,
              section: 'Income and Financial Matters'
            },

            // Property Rights and Division Section
            {
              label: 'How will property acquired before the marriage be classified?',
              type: 'select',
              required: true,
              section: 'Property Rights and Division',
              options: {
                create: [
                  { value: 'separate', label: 'Separate property' },
                  { value: 'marital', label: 'Marital property' },
                  { value: 'mixed', label: 'Mixed (specify in details)' }
                ]
              }
            },
            {
              label: 'How will property acquired during the marriage be classified?',
              type: 'select',
              required: true,
              section: 'Property Rights and Division',
              options: {
                create: [
                  { value: 'marital', label: 'Marital property' },
                  { value: 'separate', label: 'Separate property' },
                  { value: 'mixed', label: 'Mixed (specify in details)' }
                ]
              }
            },
            {
              label: 'How will property be divided in case of divorce?',
              type: 'textarea',
              required: true,
              section: 'Property Rights and Division'
            },
            {
              label: 'How will household expenses be divided during the marriage?',
              type: 'textarea',
              required: true,
              section: 'Property Rights and Division'
            },

            // Support and Benefits Section
            {
              label: 'Will either spouse waive or limit rights to spousal support/alimony in case of divorce?',
              type: 'textarea',
              required: true,
              section: 'Support and Benefits'
            },
            {
              label: 'How will retirement accounts and pensions be handled?',
              type: 'textarea',
              required: true,
              section: 'Support and Benefits'
            },
            {
              label: 'How will estate rights be affected? (Inheritance rights, elective share, etc.)',
              type: 'textarea',
              required: true,
              section: 'Support and Benefits'
            },

            // Special Provisions Section
            {
              label: 'Are there any special provisions for business interests?',
              type: 'textarea',
              required: false,
              section: 'Special Provisions'
            },
            {
              label: 'Are there any provisions regarding debt responsibility?',
              type: 'textarea',
              required: true,
              section: 'Special Provisions'
            },
            {
              label: 'Are there sunset provisions? (Agreement expires after certain number of years)',
              type: 'textarea',
              required: false,
              section: 'Special Provisions'
            },
            {
              label: 'Are there escalator clauses? (Benefits increase based on length of marriage)',
              type: 'textarea',
              required: false,
              section: 'Special Provisions'
            },
            {
              label: 'How will this agreement be modified if needed?',
              type: 'textarea',
              required: true,
              section: 'Special Provisions'
            },
            {
              label: 'What law will govern this agreement? (Which state)',
              type: 'text',
              required: true,
              section: 'Special Provisions'
            },
            {
              label: 'Are there any lifestyle provisions or expectations to be included?',
              type: 'textarea',
              required: false,
              section: 'Special Provisions'
            },

            // Execution Section
            {
              label: 'Has each spouse consulted with independent legal counsel?',
              type: 'select',
              required: true,
              section: 'Execution',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Will updated financial disclosures be attached to the agreement?',
              type: 'select',
              required: true,
              section: 'Execution',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'What are the execution requirements for this agreement? (Witnesses, notarization)',
              type: 'textarea',
              required: true,
              section: 'Execution'
            }
          ]
        }
      }
    })
    console.log('Created/Updated questionnaire:', questionnaire.name)

    console.log('Postnuptial agreement seed completed successfully!')
  } catch (error) {
    console.error('Error seeding postnuptial agreement:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the seed function if this file is executed directly
if (require.main === module) {
  seedPostnuptialAgreement()
    .catch((error) => {
      console.error('Error running postnuptial agreement seed:', error)
      process.exit(1)
    })
} 