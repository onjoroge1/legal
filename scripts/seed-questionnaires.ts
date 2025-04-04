import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedQuestionnaires() {
  try {
    console.log('Starting questionnaire seeding...')

    // Find the apartment lease template
    const template = await prisma.documentTemplate.findFirst({
      where: {
        id: 'apartment-lease'
      }
    })

    if (!template) {
      console.error('Apartment lease template not found')
      return
    }

    // Create the questionnaire
    const questionnaire = await prisma.questionnaire.create({
      data: {
        name: 'Apartment Lease Questionnaire',
        description: 'Questions to help generate your apartment lease agreement',
        templateId: template.id,
        questions: {
          create: [
            {
              label: 'Property Address',
              type: 'text',
              required: true,
              section: 'Property Details',
              helpText: 'Enter the complete address of the rental property',
              placeholder: 'e.g. 123 Main St, Apt 4B, City, State, ZIP'
            },
            {
              label: 'Lease Term',
              type: 'select',
              required: true,
              section: 'Lease Terms',
              helpText: 'Select the duration of the lease',
              options: {
                create: [
                  { value: '6', label: '6 months' },
                  { value: '12', label: '12 months' },
                  { value: '24', label: '24 months' }
                ]
              }
            },
            {
              label: 'Monthly Rent',
              type: 'text',
              required: true,
              section: 'Financial Terms',
              helpText: 'Enter the monthly rent amount in USD',
              placeholder: 'e.g. 1500'
            },
            {
              label: 'Security Deposit',
              type: 'text',
              required: true,
              section: 'Financial Terms',
              helpText: 'Enter the security deposit amount in USD',
              placeholder: 'e.g. 1500'
            },
            {
              label: 'Utilities Included',
              type: 'select',
              required: true,
              section: 'Utilities and Services',
              helpText: 'Select which utilities are included in the rent',
              options: {
                create: [
                  { value: 'none', label: 'None' },
                  { value: 'water', label: 'Water Only' },
                  { value: 'water_gas', label: 'Water and Gas' },
                  { value: 'all', label: 'All Utilities' }
                ]
              }
            },
            {
              label: 'Pet Policy',
              type: 'select',
              required: true,
              section: 'Pet Policy',
              helpText: 'Select the pet policy for this property',
              options: {
                create: [
                  { value: 'no_pets', label: 'No Pets Allowed' },
                  { value: 'cats_only', label: 'Cats Only' },
                  { value: 'dogs_only', label: 'Dogs Only' },
                  { value: 'cats_and_dogs', label: 'Cats and Dogs Allowed' },
                  { value: 'case_by_case', label: 'Case by Case Basis' }
                ]
              }
            },
            {
              label: 'Additional Terms',
              type: 'textarea',
              required: false,
              section: 'Additional Terms',
              helpText: 'Enter any additional terms or conditions for the lease',
              placeholder: 'Enter any special conditions or terms...'
            }
          ]
        }
      },
      include: {
        questions: {
          include: {
            options: true
          }
        }
      }
    })

    console.log('Created questionnaire:', {
      id: questionnaire.id,
      name: questionnaire.name,
      questionCount: questionnaire.questions.length
    })

    console.log('Seeding completed successfully')
  } catch (error) {
    console.error('Error during seeding:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the seeding
seedQuestionnaires().catch(console.error) 