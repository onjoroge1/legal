import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    // Find the SWOT analysis template
    const template = await prisma.documentTemplate.findFirst({
      where: {
        code: 'swot-analysis'
      },
      include: {
        questionnaires: {
          include: {
            questions: {
              include: {
                options: true,
                dependencies: true
              }
            }
          }
        }
      }
    })

    if (!template) {
      console.log('Template not found')
      return
    }

    console.log('Template:', {
      id: template.id,
      name: template.name,
      code: template.code
    })

    console.log('\nQuestionnaires:', template.questionnaires.length)
    template.questionnaires.forEach(q => {
      console.log('\nQuestionnaire:', {
        id: q.id,
        name: q.name,
        questionsCount: q.questions.length
      })
      
      if (q.questions.length > 0) {
        console.log('\nQuestions:')
        q.questions.forEach(question => {
          console.log(`\n  ${question.label}`)
          console.log(`  Type: ${question.type}`)
          console.log(`  Section: ${question.section}`)
          console.log(`  Required: ${question.required}`)
        })
      }
    })

  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 