import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('Checking and updating categories...')

    // Corporate Governance
    const corporateGovernance = await prisma.category.upsert({
      where: {
        id: 'corporate-governance'
      },
      create: {
        id: 'corporate-governance',
        name: 'Corporate Governance',
        slug: 'corporate',
        description: 'Board resolutions, bylaws, and corporate policies'
      },
      update: {}
    })
    console.log('Corporate Governance category:', corporateGovernance)

    // Employment & HR
    const employmentHR = await prisma.category.upsert({
      where: {
        id: 'employment-hr'
      },
      create: {
        id: 'employment-hr',
        name: 'Employment & HR',
        slug: 'employment',
        description: 'Employment contracts, offer letters, NDAs, and other HR documents'
      },
      update: {}
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
      where: {
        id: 'real-estate'
      },
      create: {
        id: 'real-estate',
        name: 'Real Estate',
        slug: 'real-estate',
        description: 'Legal documents for real estate transactions'
      },
      update: {}
    })
    console.log('\nReal Estate category:', realEstate)

    console.log('Categories:', {
      corporateGovernance: corporateGovernance.id,
      employmentHR: employmentHR.id,
      realEstate: realEstate.id
    })

  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 