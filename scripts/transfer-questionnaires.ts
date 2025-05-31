import { PrismaClient } from '@prisma/client'
import seedBusinessFormation from './seed-business-formation'

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('Starting questionnaire transfer...')
    
    // Run the business formation seed which includes questionnaires
    await seedBusinessFormation()
    
    console.log('Questionnaire transfer completed successfully!')
  } catch (error) {
    console.error('Error transferring questionnaires:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  }) 