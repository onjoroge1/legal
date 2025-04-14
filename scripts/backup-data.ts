import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function backupData() {
  try {
    console.log('Starting data backup...')

    // Create backup directory if it doesn't exist
    const backupDir = path.join(process.cwd(), 'prisma', 'backups')
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true })
    }

    // Get all data from each model
    const users = await prisma.user.findMany()
    const documents = await prisma.document.findMany({
      include: {
        parties: true,
        collaborators: true,
        signatures: true
      }
    })
    const categories = await prisma.category.findMany()
    const templates = await prisma.documentTemplate.findMany()
    const questionnaires = await prisma.questionnaire.findMany()
    const questions = await prisma.question.findMany()
    const questionOptions = await prisma.questionOption.findMany()
    const questionDependencies = await prisma.questionDependency.findMany()
    const templateFields = await prisma.templateField.findMany()
    const fieldOptions = await prisma.fieldOption.findMany()
    const fieldDependencies = await prisma.fieldDependency.findMany()

    // Create backup object
    const backup = {
      users,
      documents,
      categories,
      templates,
      questionnaires,
      questions,
      questionOptions,
      questionDependencies,
      templateFields,
      fieldOptions,
      fieldDependencies,
      timestamp: new Date().toISOString()
    }

    // Save backup to file
    const backupPath = path.join(backupDir, `backup-${new Date().toISOString().replace(/[:.]/g, '-')}.json`)
    fs.writeFileSync(backupPath, JSON.stringify(backup, null, 2))

    console.log(`Backup completed successfully! Saved to: ${backupPath}`)
  } catch (error) {
    console.error('Error during backup:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

backupData() 