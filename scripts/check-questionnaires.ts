import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('Checking questionnaires...')

    const questionnaires = await prisma.questionnaire.findMany({
      include: {
        template: true,
        questions: {
          include: {
            options: true
          }
        }
      }
    })

    for (const questionnaire of questionnaires) {
      console.log(`\nQuestionnaire: ${questionnaire.name}`)
      console.log(`Template: ${questionnaire.template.name}`)
      console.log(`Questions count: ${questionnaire.questions.length}`)
      
      if (questionnaire.questions.length > 0) {
        console.log('\nQuestions:')
        questionnaire.questions.forEach(question => {
          console.log(`\n  Label: ${question.label}`)
          console.log(`  Type: ${question.type}`)
          console.log(`  Section: ${question.section}`)
          if (question.options.length > 0) {
            console.log('  Options:')
            question.options.forEach(option => {
              console.log(`    - ${option.value} (${option.label || option.value})`)
            })
          }
        })
      }
    }

  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 