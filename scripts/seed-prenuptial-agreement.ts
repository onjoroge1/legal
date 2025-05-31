import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function seedPrenuptialAgreement() {
  try {
    console.log('Starting prenuptial agreement seed...')

    // Create or update the template
    const template = await prisma.documentTemplate.upsert({
      where: { id: 'prenuptial-agreement' },
      update: {
        name: 'Prenuptial Agreement',
        description: 'Legal agreement between parties planning to marry',
        content: `# PRENUPTIAL AGREEMENT

This Prenuptial Agreement (the "Agreement") is made and entered into on [DATE] by and between:

[PARTY_1_NAME] ("Party 1") and
[PARTY_2_NAME] ("Party 2")

## ARTICLE I - PARTIES AND MARRIAGE
1.1 Party 1's Information:
    - Full Legal Name: [PARTY_1_NAME]
    - Current Address: [PARTY_1_ADDRESS]
    - Date of Birth: [PARTY_1_DOB]

1.2 Party 2's Information:
    - Full Legal Name: [PARTY_2_NAME]
    - Current Address: [PARTY_2_ADDRESS]
    - Date of Birth: [PARTY_2_DOB]

1.3 Marriage Information:
    - Contemplated Date of Marriage: [MARRIAGE_DATE]
    - Location of Marriage: [MARRIAGE_LOCATION]

## ARTICLE II - PRIOR MARRIAGES AND CHILDREN
2.1 Prior Marriages: [PRIOR_MARRIAGES]
2.2 Children from Previous Relationships: [PREVIOUS_CHILDREN]
2.3 Future Children: [FUTURE_CHILDREN_PLANS]

## ARTICLE III - ASSETS AND DEBTS
3.1 Party 1's Assets:
    - Description: [PARTY_1_ASSETS]
    - Estimated Values: [PARTY_1_ASSET_VALUES]

3.2 Party 2's Assets:
    - Description: [PARTY_2_ASSETS]
    - Estimated Values: [PARTY_2_ASSET_VALUES]

3.3 Party 1's Debts:
    - Description: [PARTY_1_DEBTS]
    - Amounts: [PARTY_1_DEBT_AMOUNTS]

3.4 Party 2's Debts:
    - Description: [PARTY_2_DEBTS]
    - Amounts: [PARTY_2_DEBT_AMOUNTS]

## ARTICLE IV - INCOME AND FINANCIAL MATTERS
4.1 Current Income:
    - Party 1: [PARTY_1_INCOME]
    - Party 2: [PARTY_2_INCOME]

4.2 Income Sources:
    - Party 1: [PARTY_1_INCOME_SOURCES]
    - Party 2: [PARTY_2_INCOME_SOURCES]

4.3 Expected Inheritances/Gifts: [EXPECTED_INHERITANCES]

## ARTICLE V - PROPERTY RIGHTS
5.1 Premarital Property: [PREMARITAL_PROPERTY_TREATMENT]
5.2 Property Acquired During Marriage: [MARITAL_PROPERTY_TREATMENT]
5.3 Joint Accounts: [JOINT_ACCOUNTS]
5.4 Asset Commingling: [ASSET_COMMINGLING]
5.5 Household Expenses: [HOUSEHOLD_EXPENSES]

## ARTICLE VI - SUPPORT AND BENEFITS
6.1 Spousal Support: [SPOUSAL_SUPPORT]
6.2 Retirement Accounts: [RETIREMENT_ACCOUNTS]
6.3 Estate Rights: [ESTATE_RIGHTS]

## ARTICLE VII - SPECIAL PROVISIONS
7.1 Business Interests: [BUSINESS_INTERESTS]
7.2 Debt Responsibility: [DEBT_RESPONSIBILITY]
7.3 Sunset Provisions: [SUNSET_PROVISIONS]
7.4 Escalator Clauses: [ESCALATOR_CLAUSES]
7.5 Modification Terms: [MODIFICATION_TERMS]
7.6 Governing Law: [GOVERNING_LAW]
7.7 Religious Considerations: [RELIGIOUS_CONSIDERATIONS]
7.8 Lifestyle Provisions: [LIFESTYLE_PROVISIONS]

## ARTICLE VIII - EXECUTION
8.1 Legal Counsel: [LEGAL_COUNSEL]
8.2 Financial Disclosures: [FINANCIAL_DISCLOSURES]
8.3 Execution Requirements: [EXECUTION_REQUIREMENTS]
8.4 Signing Date: [SIGNING_DATE]

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

___________________________      ___________________________
[PARTY_1_SIGNATURE]              [PARTY_2_SIGNATURE]
[PARTY_1_NAME]                   [PARTY_2_NAME]

Date: [DATE]                     Date: [DATE]`,
        categoryId: 'cm9bh3u2s0001vbcg20r64fyg',
        type: 'document',
        version: '1.0.0',
        state: 'published',
        metadata: {
          sections: [
            'Parties and Marriage',
            'Prior Marriages and Children',
            'Assets and Debts',
            'Income and Financial Matters',
            'Property Rights',
            'Support and Benefits',
            'Special Provisions',
            'Execution'
          ]
        }
      },
      create: {
        id: 'prenuptial-agreement',
        name: 'Prenuptial Agreement',
        description: 'Legal agreement between parties planning to marry',
        content: `# PRENUPTIAL AGREEMENT

This Prenuptial Agreement (the "Agreement") is made and entered into on [DATE] by and between:

[PARTY_1_NAME] ("Party 1") and
[PARTY_2_NAME] ("Party 2")

## ARTICLE I - PARTIES AND MARRIAGE
1.1 Party 1's Information:
    - Full Legal Name: [PARTY_1_NAME]
    - Current Address: [PARTY_1_ADDRESS]
    - Date of Birth: [PARTY_1_DOB]

1.2 Party 2's Information:
    - Full Legal Name: [PARTY_2_NAME]
    - Current Address: [PARTY_2_ADDRESS]
    - Date of Birth: [PARTY_2_DOB]

1.3 Marriage Information:
    - Contemplated Date of Marriage: [MARRIAGE_DATE]
    - Location of Marriage: [MARRIAGE_LOCATION]

## ARTICLE II - PRIOR MARRIAGES AND CHILDREN
2.1 Prior Marriages: [PRIOR_MARRIAGES]
2.2 Children from Previous Relationships: [PREVIOUS_CHILDREN]
2.3 Future Children: [FUTURE_CHILDREN_PLANS]

## ARTICLE III - ASSETS AND DEBTS
3.1 Party 1's Assets:
    - Description: [PARTY_1_ASSETS]
    - Estimated Values: [PARTY_1_ASSET_VALUES]

3.2 Party 2's Assets:
    - Description: [PARTY_2_ASSETS]
    - Estimated Values: [PARTY_2_ASSET_VALUES]

3.3 Party 1's Debts:
    - Description: [PARTY_1_DEBTS]
    - Amounts: [PARTY_1_DEBT_AMOUNTS]

3.4 Party 2's Debts:
    - Description: [PARTY_2_DEBTS]
    - Amounts: [PARTY_2_DEBT_AMOUNTS]

## ARTICLE IV - INCOME AND FINANCIAL MATTERS
4.1 Current Income:
    - Party 1: [PARTY_1_INCOME]
    - Party 2: [PARTY_2_INCOME]

4.2 Income Sources:
    - Party 1: [PARTY_1_INCOME_SOURCES]
    - Party 2: [PARTY_2_INCOME_SOURCES]

4.3 Expected Inheritances/Gifts: [EXPECTED_INHERITANCES]

## ARTICLE V - PROPERTY RIGHTS
5.1 Premarital Property: [PREMARITAL_PROPERTY_TREATMENT]
5.2 Property Acquired During Marriage: [MARITAL_PROPERTY_TREATMENT]
5.3 Joint Accounts: [JOINT_ACCOUNTS]
5.4 Asset Commingling: [ASSET_COMMINGLING]
5.5 Household Expenses: [HOUSEHOLD_EXPENSES]

## ARTICLE VI - SUPPORT AND BENEFITS
6.1 Spousal Support: [SPOUSAL_SUPPORT]
6.2 Retirement Accounts: [RETIREMENT_ACCOUNTS]
6.3 Estate Rights: [ESTATE_RIGHTS]

## ARTICLE VII - SPECIAL PROVISIONS
7.1 Business Interests: [BUSINESS_INTERESTS]
7.2 Debt Responsibility: [DEBT_RESPONSIBILITY]
7.3 Sunset Provisions: [SUNSET_PROVISIONS]
7.4 Escalator Clauses: [ESCALATOR_CLAUSES]
7.5 Modification Terms: [MODIFICATION_TERMS]
7.6 Governing Law: [GOVERNING_LAW]
7.7 Religious Considerations: [RELIGIOUS_CONSIDERATIONS]
7.8 Lifestyle Provisions: [LIFESTYLE_PROVISIONS]

## ARTICLE VIII - EXECUTION
8.1 Legal Counsel: [LEGAL_COUNSEL]
8.2 Financial Disclosures: [FINANCIAL_DISCLOSURES]
8.3 Execution Requirements: [EXECUTION_REQUIREMENTS]
8.4 Signing Date: [SIGNING_DATE]

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

___________________________      ___________________________
[PARTY_1_SIGNATURE]              [PARTY_2_SIGNATURE]
[PARTY_1_NAME]                   [PARTY_2_NAME]

Date: [DATE]                     Date: [DATE]`,
        categoryId: 'cm9bh3u2s0001vbcg20r64fyg',
        type: 'document',
        version: '1.0.0',
        state: 'published',
        metadata: {
          sections: [
            'Parties and Marriage',
            'Prior Marriages and Children',
            'Assets and Debts',
            'Income and Financial Matters',
            'Property Rights',
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
        id: 'prenuptial-agreement-questions',
        name: 'Prenuptial Agreement Questionnaire',
        description: 'Questions for creating a Prenuptial Agreement',
        templateId: template.id,
        questions: {
          create: [
            // Parties and Marriage Section
            {
              label: 'What are the full legal names of both parties?',
              type: 'text',
              required: true,
              section: 'Parties and Marriage'
            },
            {
              label: 'What are the current addresses of both parties?',
              type: 'text',
              required: true,
              section: 'Parties and Marriage'
            },
            {
              label: 'What are the dates of birth of both parties?',
              type: 'date',
              required: true,
              section: 'Parties and Marriage'
            },
            {
              label: 'What is the contemplated date of marriage?',
              type: 'date',
              required: true,
              section: 'Parties and Marriage'
            },
            {
              label: 'Where will the marriage take place? (City, state, country)',
              type: 'text',
              required: true,
              section: 'Parties and Marriage'
            },

            // Prior Marriages and Children Section
            {
              label: 'Has either party been married before? If so, provide details.',
              type: 'textarea',
              required: true,
              section: 'Prior Marriages and Children'
            },
            {
              label: 'Does either party have children from previous relationships? If so, provide names and ages.',
              type: 'textarea',
              required: true,
              section: 'Prior Marriages and Children'
            },
            {
              label: 'Do the parties plan to have children together?',
              type: 'select',
              required: true,
              section: 'Prior Marriages and Children',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' },
                  { value: 'undecided', label: 'Undecided' }
                ]
              }
            },

            // Assets and Debts Section
            {
              label: 'What assets does each party own prior to marriage? (Real estate, investments, businesses, vehicles, etc.)',
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
              label: 'What debts does each party have prior to marriage? (Mortgages, loans, credit cards, etc.)',
              type: 'textarea',
              required: true,
              section: 'Assets and Debts'
            },

            // Income and Financial Matters Section
            {
              label: 'What is the current income of each party?',
              type: 'textarea',
              required: true,
              section: 'Income and Financial Matters'
            },
            {
              label: 'What are the sources of income for each party?',
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

            // Property Rights Section
            {
              label: 'How will premarital property be treated during the marriage?',
              type: 'select',
              required: true,
              section: 'Property Rights',
              options: {
                create: [
                  { value: 'separate', label: 'Remain separate' },
                  { value: 'marital', label: 'Become marital' },
                  { value: 'mixed', label: 'Mixed (specify in details)' }
                ]
              }
            },
            {
              label: 'How will property acquired during the marriage be treated?',
              type: 'select',
              required: true,
              section: 'Property Rights',
              options: {
                create: [
                  { value: 'marital', label: 'Marital property' },
                  { value: 'separate', label: 'Separate property' },
                  { value: 'mixed', label: 'Mixed (specify in details)' }
                ]
              }
            },
            {
              label: 'How will joint accounts be handled during the marriage?',
              type: 'textarea',
              required: true,
              section: 'Property Rights'
            },
            {
              label: 'Will there be any commingling of assets?',
              type: 'select',
              required: true,
              section: 'Property Rights',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'How will household expenses be divided during the marriage?',
              type: 'textarea',
              required: true,
              section: 'Property Rights'
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
              label: 'How will estate rights be affected?',
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
              label: 'What law will govern this agreement?',
              type: 'text',
              required: true,
              section: 'Special Provisions'
            },
            {
              label: 'Are there any religious considerations that should be included?',
              type: 'textarea',
              required: false,
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
              label: 'Has each party consulted with independent legal counsel?',
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
              label: 'Will financial disclosures be attached to the agreement?',
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
              label: 'What are the execution requirements for this agreement?',
              type: 'textarea',
              required: true,
              section: 'Execution'
            },
            {
              label: 'When will this agreement be signed relative to the wedding date?',
              type: 'text',
              required: true,
              section: 'Execution'
            }
          ]
        }
      }
    })
    console.log('Created/Updated questionnaire:', questionnaire.name)

    console.log('Prenuptial agreement seed completed successfully!')
  } catch (error) {
    console.error('Error seeding prenuptial agreement:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the seed function if this file is executed directly
if (require.main === module) {
  seedPrenuptialAgreement()
    .catch((error) => {
      console.error('Error running prenuptial agreement seed:', error)
      process.exit(1)
    })
} 