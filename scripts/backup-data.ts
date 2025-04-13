import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function backupData() {
  try {
    console.log('Starting data backup...')
    
    // Backup Users
    const users = await prisma.user.findMany({
      include: {
        accounts: true,
        sessions: true,
        documents: true,
        collaboratedDocs: true,
        signatures: true
      }
    })

    // Backup Documents
    const documents = await prisma.document.findMany({
      include: {
        parties: true,
        collaborators: true,
        signatures: true,
        template: true
      }
    })

    // Backup Document Templates
    const templates = await prisma.documentTemplate.findMany({
      include: {
        fields: {
          include: {
            options: true,
            dependencies: true
          }
        },
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

    // Backup Categories
    const categories = await prisma.category.findMany()

    // Create backup directory if it doesn't exist
    const backupDir = path.join(process.cwd(), 'backups')
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir)
    }

    // Save backup data
    const backupData = {
      timestamp: new Date().toISOString(),
      users,
      documents,
      templates,
      categories
    }

    const backupPath = path.join(backupDir, `backup-${new Date().toISOString().replace(/[:.]/g, '-')}.json`)
    fs.writeFileSync(backupPath, JSON.stringify(backupData, null, 2))

    console.log(`Backup completed successfully! Data saved to: ${backupPath}`)
  } catch (error) {
    console.error('Error during backup:', error)
  } finally {
    await prisma.$disconnect()
  }
}

backupData() 