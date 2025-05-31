import { PrismaClient, Question } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('Testing database connection...')
    
    // Test connection by getting count of questionnaires
    const questionnaireCount = await prisma.questionnaire.count()
    console.log(`Found ${questionnaireCount} questionnaires in the database`)
    
    // Get first questionnaire with its questions
    const questionnaire = await prisma.questionnaire.findFirst({
      include: {
        questions: true,
        template: true
      }
    })
    
    if (questionnaire) {
      console.log('\nSample Questionnaire:')
      console.log('Name:', questionnaire.name)
      console.log('Description:', questionnaire.description)
      console.log('\nQuestions:')
      questionnaire.questions.forEach((q: Question, i: number) => {
        console.log(`${i + 1}. ${q.label} (${q.type})`)
      })
    } else {
      console.log('No questionnaires found in the database')
    }
    
  } catch (error) {
    console.error('Error testing database connection:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 