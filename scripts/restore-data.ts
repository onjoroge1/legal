import { PrismaClient } from "@prisma/client"
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function restoreData() {
  try {
    console.log('Starting data restoration...')
    
    // Use the specific backup file
    const backupDir = path.join(process.cwd(), 'backups')
    const backupFile = 'backup-2025-04-14T15-50-21-737Z.json'
    const backupPath = path.join(backupDir, backupFile)
    
    if (!fs.existsSync(backupPath)) {
      throw new Error(`Backup file ${backupFile} not found`)
    }
    
    const backupData = JSON.parse(fs.readFileSync(backupPath, 'utf-8'))
    console.log(`Restoring from backup: ${backupFile}`)

    // First, clear existing data
    console.log('Clearing existing data...')
    await prisma.$executeRaw`DELETE FROM "DocumentCollaborator"`
    await prisma.$executeRaw`DELETE FROM "DocumentSignature"`
    await prisma.$executeRaw`DELETE FROM "DocumentParty"`
    await prisma.$executeRaw`DELETE FROM "Document"`
    await prisma.$executeRaw`DELETE FROM "DocumentTemplate"`
    await prisma.$executeRaw`DELETE FROM "Category"`
    await prisma.$executeRaw`DELETE FROM "User"`

    // Restore Users
    console.log('Restoring users...')
    for (const user of backupData.users) {
      await prisma.user.create({
        data: user
      })
    }

    // Restore Categories
    console.log('Restoring categories...')
    for (const category of backupData.categories || []) {
      await prisma.category.create({
        data: category
      })
    }

    // Restore Document Templates
    console.log('Restoring document templates...')
    for (const template of backupData.templates || []) {
      await prisma.documentTemplate.create({
        data: template
      })
    }

    // Restore Documents
    console.log('Restoring documents...')
    for (const document of backupData.documents || []) {
      await prisma.document.create({
        data: document
      })
    }

    console.log('Data restoration completed successfully!')
  } catch (error) {
    console.error('Error during restoration:', error)
  } finally {
    await prisma.$disconnect()
  }
}

restoreData() 