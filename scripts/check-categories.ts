import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('Checking and updating categories...')

    // Corporate Governance
    const corporateGovernance = await prisma.category.upsert({
      where: { id: 'cm9bhpeod000xvbl04d2dxx55' },
      update: {
        name: 'Corporate Governance',
        description: 'Board resolutions, bylaws, and corporate policies'
      },
      create: {
        id: 'cm9bhpeod000xvbl04d2dxx55',
        name: 'Corporate Governance',
        description: 'Board resolutions, bylaws, and corporate policies'
      }
    })
    console.log('Corporate Governance category:', corporateGovernance)

    // Employment & HR
    const employmentHR = await prisma.category.upsert({
      where: { id: 'cm9bh3u2e0000vbcg33mxuc64' },
      update: {
        name: 'Employment & HR',
        description: 'Employment contracts, offer letters, NDAs, and other HR documents'
      },
      create: {
        id: 'cm9bh3u2e0000vbcg33mxuc64',
        name: 'Employment & HR',
        description: 'Employment contracts, offer letters, NDAs, and other HR documents'
      }
    })
    console.log('Employment & HR category:', employmentHR)

    // Get employment templates with their questionnaires and questions
    const employmentTemplates = await prisma.documentTemplate.findMany({
      where: { categoryId: 'cm9bh3u2e0000vbcg33mxuc64' },
      include: {
        questionnaires: {
          include: {
            questions: true
          }
        }
      }
    })
    
    console.log('\nEmployment & HR Templates:')
    employmentTemplates.forEach(template => {
      console.log(`\nTemplate: ${template.name}`)
      template.questionnaires.forEach(questionnaire => {
        console.log(`  Questionnaire: ${questionnaire.name}`)
        console.log(`  Questions count: ${questionnaire.questions.length}`)
      })
    })

    // Real Estate
    const realEstate = await prisma.category.upsert({
      where: { id: 'cm9bh3u330002vbcg4nkjeixo' },
      update: {
        name: 'Real Estate',
        description: 'Lease agreements, property contracts, and real estate documents'
      },
      create: {
        id: 'cm9bh3u330002vbcg4nkjeixo',
        name: 'Real Estate',
        description: 'Lease agreements, property contracts, and real estate documents'
      }
    })
    console.log('\nReal Estate category:', realEstate)

  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 