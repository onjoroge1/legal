import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

async function restoreDatabase(backupFile: string) {
  try {
    console.log(`Starting database restore from: ${backupFile}`)
    
    // Read backup file
    const backupPath = path.join(process.cwd(), 'prisma', 'backups', backupFile)
    if (!fs.existsSync(backupPath)) {
      throw new Error(`Backup file not found: ${backupFile}`)
    }

    const data = JSON.parse(fs.readFileSync(backupPath, 'utf8'))

    // Restore data in a transaction
    await prisma.$transaction(async (tx) => {
      // Clear existing data
      await tx.questionDependency.deleteMany()
      await tx.questionOption.deleteMany()
      await tx.question.deleteMany()
      await tx.questionnaire.deleteMany()
      await tx.templateField.deleteMany()
      await tx.documentTemplate.deleteMany()
      await tx.category.deleteMany()
      await tx.user.deleteMany()

      // Restore data
      if (data.users) await tx.user.createMany({ data: data.users })
      if (data.categories) await tx.category.createMany({ data: data.categories })
      if (data.documentTemplates) await tx.documentTemplate.createMany({ data: data.documentTemplates })
      if (data.templateFields) await tx.templateField.createMany({ data: data.templateFields })
      if (data.questionnaires) await tx.questionnaire.createMany({ data: data.questionnaires })
      if (data.questions) await tx.question.createMany({ data: data.questions })
      if (data.questionOptions) await tx.questionOption.createMany({ data: data.questionOptions })
      if (data.questionDependencies) await tx.questionDependency.createMany({ data: data.questionDependencies })
    })

    console.log('Database restored successfully')
  } catch (error) {
    console.error('Error during restore:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Get backup file from command line argument
const backupFile = process.argv[2]
if (!backupFile) {
  console.error('Please provide a backup file name')
  process.exit(1)
}

// Run the restore
restoreDatabase(backupFile) 