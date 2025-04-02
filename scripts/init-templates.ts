import { PrismaClient } from '@prisma/client'
import { TemplateService } from '../lib/template-service'

async function main() {
  try {
    console.log('Creating sample templates...')
    await TemplateService.createSampleTemplates()
    console.log('Sample templates created successfully')
  } catch (error) {
    console.error('Error creating sample templates:', error)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    const prisma = new PrismaClient()
    await prisma.$disconnect()
  }) 