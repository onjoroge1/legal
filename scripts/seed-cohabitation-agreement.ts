import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function seedCohabitationAgreement() {
  try {
    console.log('Starting cohabitation agreement seed...')

    // Create or update the template
    const template = await prisma.documentTemplate.upsert({
      where: { id: 'cohabitation-agreement' },
      update: {
        name: 'Cohabitation Agreement',
        description: 'Legal agreement for unmarried couples or roommates living together',
        content: `# COHABITATION AGREEMENT

This Cohabitation Agreement (the "Agreement") is made and entered into on [DATE] by and between:

[PARTY_1_NAME] ("Party 1") and
[PARTY_2_NAME] ("Party 2")

## ARTICLE I - PARTIES AND PURPOSE
1.1 The parties currently reside or will reside at: [RESIDENCE_ADDRESS]
1.2 The cohabitation began or will begin on: [START_DATE]
1.3 Purpose of cohabitation: [COHABITATION_PURPOSE]

## ARTICLE II - RESIDENCE
2.1 Property Ownership/Lease: [PROPERTY_STATUS]
2.2 Lease Terms: [LEASE_TERMS]
2.3 Property Title: [PROPERTY_TITLE]
2.4 Housing Expenses: [HOUSING_EXPENSES]
2.5 Household Expenses: [HOUSEHOLD_EXPENSES]

## ARTICLE III - FINANCIAL ARRANGEMENTS
3.1 Joint Accounts: [JOINT_ACCOUNTS]
3.2 Separate Accounts: [SEPARATE_ACCOUNTS]
3.3 Pre-existing Debts: [PRE_EXISTING_DEBTS]
3.4 Future Debts: [FUTURE_DEBTS]
3.5 Financial Support: [FINANCIAL_SUPPORT]

## ARTICLE IV - PROPERTY RIGHTS
4.1 Pre-existing Property: [PRE_EXISTING_PROPERTY]
4.2 Future Property: [FUTURE_PROPERTY]
4.3 Personal Property Division: [PERSONAL_PROPERTY_DIVISION]

## ARTICLE V - TERMINATION
5.1 Notice Period: [NOTICE_PERIOD]
5.2 Residence upon Termination: [RESIDENCE_TERMINATION]
5.3 Dispute Resolution: [DISPUTE_RESOLUTION]

## ARTICLE VI - ADDITIONAL PROVISIONS
6.1 Estate Planning: [ESTATE_PLANNING]
6.2 Pets: [PET_ARRANGEMENTS]
6.3 Disability: [DISABILITY_PROVISIONS]
6.4 Children: [CHILDREN_PROVISIONS]
6.5 Future Children: [FUTURE_CHILDREN_PROVISIONS]

## ARTICLE VII - GOVERNING LAW AND EXECUTION
7.1 Governing Law: [GOVERNING_LAW]
7.2 Notarization: [NOTARIZATION_REQUIREMENTS]
7.3 Witnesses: [WITNESS_REQUIREMENTS]
7.4 Periodic Review: [PERIODIC_REVIEW]

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
            'Parties and Purpose',
            'Residence',
            'Financial Arrangements',
            'Property Rights',
            'Termination',
            'Additional Provisions',
            'Governing Law and Execution'
          ]
        }
      },
      create: {
        id: 'cohabitation-agreement',
        name: 'Cohabitation Agreement',
        description: 'Legal agreement for unmarried couples or roommates living together',
        content: `# COHABITATION AGREEMENT

This Cohabitation Agreement (the "Agreement") is made and entered into on [DATE] by and between:

[PARTY_1_NAME] ("Party 1") and
[PARTY_2_NAME] ("Party 2")

## ARTICLE I - PARTIES AND PURPOSE
1.1 The parties currently reside or will reside at: [RESIDENCE_ADDRESS]
1.2 The cohabitation began or will begin on: [START_DATE]
1.3 Purpose of cohabitation: [COHABITATION_PURPOSE]

## ARTICLE II - RESIDENCE
2.1 Property Ownership/Lease: [PROPERTY_STATUS]
2.2 Lease Terms: [LEASE_TERMS]
2.3 Property Title: [PROPERTY_TITLE]
2.4 Housing Expenses: [HOUSING_EXPENSES]
2.5 Household Expenses: [HOUSEHOLD_EXPENSES]

## ARTICLE III - FINANCIAL ARRANGEMENTS
3.1 Joint Accounts: [JOINT_ACCOUNTS]
3.2 Separate Accounts: [SEPARATE_ACCOUNTS]
3.3 Pre-existing Debts: [PRE_EXISTING_DEBTS]
3.4 Future Debts: [FUTURE_DEBTS]
3.5 Financial Support: [FINANCIAL_SUPPORT]

## ARTICLE IV - PROPERTY RIGHTS
4.1 Pre-existing Property: [PRE_EXISTING_PROPERTY]
4.2 Future Property: [FUTURE_PROPERTY]
4.3 Personal Property Division: [PERSONAL_PROPERTY_DIVISION]

## ARTICLE V - TERMINATION
5.1 Notice Period: [NOTICE_PERIOD]
5.2 Residence upon Termination: [RESIDENCE_TERMINATION]
5.3 Dispute Resolution: [DISPUTE_RESOLUTION]

## ARTICLE VI - ADDITIONAL PROVISIONS
6.1 Estate Planning: [ESTATE_PLANNING]
6.2 Pets: [PET_ARRANGEMENTS]
6.3 Disability: [DISABILITY_PROVISIONS]
6.4 Children: [CHILDREN_PROVISIONS]
6.5 Future Children: [FUTURE_CHILDREN_PROVISIONS]

## ARTICLE VII - GOVERNING LAW AND EXECUTION
7.1 Governing Law: [GOVERNING_LAW]
7.2 Notarization: [NOTARIZATION_REQUIREMENTS]
7.3 Witnesses: [WITNESS_REQUIREMENTS]
7.4 Periodic Review: [PERIODIC_REVIEW]

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
            'Parties and Purpose',
            'Residence',
            'Financial Arrangements',
            'Property Rights',
            'Termination',
            'Additional Provisions',
            'Governing Law and Execution'
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
        id: 'cohabitation-agreement-questions',
        name: 'Cohabitation Agreement Questionnaire',
        description: 'Questions for creating a Cohabitation Agreement',
        templateId: template.id,
        questions: {
          create: [
            // Parties and Purpose Section
            {
              label: 'What are the full legal names of the parties to the agreement?',
              type: 'text',
              required: true,
              section: 'Parties and Purpose'
            },
            {
              label: 'What is the current address where the parties reside or will reside together?',
              type: 'text',
              required: true,
              section: 'Parties and Purpose'
            },
            {
              label: 'What is the date when cohabitation began or will begin?',
              type: 'date',
              required: true,
              section: 'Parties and Purpose'
            },
            {
              label: 'What is the date of this agreement?',
              type: 'date',
              required: true,
              section: 'Parties and Purpose'
            },
            {
              label: 'What is the purpose of the cohabitation?',
              type: 'select',
              required: true,
              section: 'Parties and Purpose',
              options: {
                create: [
                  { value: 'romantic', label: 'Romantic relationship' },
                  { value: 'roommates', label: 'Roommates' },
                  { value: 'other', label: 'Other' }
                ]
              }
            },

            // Residence Section
            {
              label: 'Who owns or leases the residence?',
              type: 'select',
              required: true,
              section: 'Residence',
              options: {
                create: [
                  { value: 'joint', label: 'Joint ownership/lease' },
                  { value: 'party1', label: 'Party 1 only' },
                  { value: 'party2', label: 'Party 2 only' }
                ]
              }
            },
            {
              label: 'If leased, who is responsible for the lease payments and what are the payment terms?',
              type: 'textarea',
              required: false,
              section: 'Residence'
            },
            {
              label: 'If owned, who holds the title to the property?',
              type: 'text',
              required: false,
              section: 'Residence'
            },
            {
              label: 'How will monthly housing expenses be divided?',
              type: 'textarea',
              required: true,
              section: 'Residence'
            },
            {
              label: 'How will general household expenses be divided?',
              type: 'textarea',
              required: true,
              section: 'Residence'
            },

            // Financial Arrangements Section
            {
              label: 'Will the parties maintain joint financial accounts? If so, what type and for what purpose?',
              type: 'textarea',
              required: true,
              section: 'Financial Arrangements'
            },
            {
              label: 'Will the parties maintain separate financial accounts? What will these be used for?',
              type: 'textarea',
              required: true,
              section: 'Financial Arrangements'
            },
            {
              label: 'How will personal debts that existed before cohabitation be handled?',
              type: 'textarea',
              required: true,
              section: 'Financial Arrangements'
            },
            {
              label: 'How will debts incurred during cohabitation be handled?',
              type: 'textarea',
              required: true,
              section: 'Financial Arrangements'
            },
            {
              label: 'Will either party be financially supporting the other? If so, what are the terms?',
              type: 'textarea',
              required: true,
              section: 'Financial Arrangements'
            },

            // Property Rights Section
            {
              label: 'What property does each party own separately before cohabitation?',
              type: 'textarea',
              required: true,
              section: 'Property Rights'
            },
            {
              label: 'How will property acquired during cohabitation be owned?',
              type: 'select',
              required: true,
              section: 'Property Rights',
              options: {
                create: [
                  { value: 'joint', label: 'Jointly' },
                  { value: 'separate', label: 'Separately' },
                  { value: 'mixed', label: 'Mixed (specify in details)' }
                ]
              }
            },
            {
              label: 'How will personal property be divided if the cohabitation ends?',
              type: 'textarea',
              required: true,
              section: 'Property Rights'
            },

            // Termination Section
            {
              label: 'What happens to the residence if the relationship ends?',
              type: 'textarea',
              required: true,
              section: 'Termination'
            },
            {
              label: 'What notice period is required if one party wishes to end the cohabitation?',
              type: 'text',
              required: true,
              section: 'Termination'
            },
            {
              label: 'How will disputes be resolved during cohabitation or upon termination?',
              type: 'textarea',
              required: true,
              section: 'Termination'
            },

            // Additional Provisions Section
            {
              label: 'Are there any agreements regarding estate planning?',
              type: 'textarea',
              required: false,
              section: 'Additional Provisions'
            },
            {
              label: 'Are there any pets? Who owns them and who will keep them if the relationship ends?',
              type: 'textarea',
              required: false,
              section: 'Additional Provisions'
            },
            {
              label: 'What happens if one party becomes disabled or unable to work?',
              type: 'textarea',
              required: true,
              section: 'Additional Provisions'
            },
            {
              label: 'Are there any children from previous relationships living in the home? If so, what arrangements apply?',
              type: 'textarea',
              required: false,
              section: 'Additional Provisions'
            },
            {
              label: 'Are the parties planning to have children together? If so, what arrangements would apply?',
              type: 'textarea',
              required: false,
              section: 'Additional Provisions'
            },

            // Governing Law and Execution Section
            {
              label: 'What state\'s law will govern this agreement?',
              type: 'text',
              required: true,
              section: 'Governing Law and Execution'
            },
            {
              label: 'Does this agreement need to be notarized?',
              type: 'select',
              required: true,
              section: 'Governing Law and Execution',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Does this agreement need to be witnessed? If so, by how many witnesses?',
              type: 'text',
              required: true,
              section: 'Governing Law and Execution'
            },
            {
              label: 'Will the parties review and potentially revise this agreement periodically?',
              type: 'select',
              required: true,
              section: 'Governing Law and Execution',
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

    console.log('Cohabitation agreement seed completed successfully!')
  } catch (error) {
    console.error('Error seeding cohabitation agreement:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the seed function if this file is executed directly
if (require.main === module) {
  seedCohabitationAgreement()
    .catch((error) => {
      console.error('Error running cohabitation agreement seed:', error)
      process.exit(1)
    })
} 