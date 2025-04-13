import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function restoreData() {
  try {
    console.log('Starting data restoration...')
    
    // Get the most recent backup file
    const backupDir = path.join(process.cwd(), 'backups')
    const files = fs.readdirSync(backupDir)
    const backupFiles = files.filter(file => file.startsWith('backup-'))
    if (backupFiles.length === 0) {
      throw new Error('No backup files found')
    }
    
    const latestBackup = backupFiles.sort().pop()
    const backupPath = path.join(backupDir, latestBackup!)
    const backupData = JSON.parse(fs.readFileSync(backupPath, 'utf-8'))

    console.log(`Restoring from backup: ${latestBackup}`)

    // Restore Categories first (they might be referenced by other models)
    for (const category of backupData.categories) {
      await prisma.category.upsert({
        where: { id: category.id },
        create: category,
        update: category
      })
    }

    // Restore Document Templates
    for (const template of backupData.templates) {
      const { fields, questionnaires, ...templateData } = template
      await prisma.documentTemplate.upsert({
        where: { id: template.id },
        create: templateData,
        update: templateData
      })

      // Restore template fields
      for (const field of fields) {
        const { options, dependencies, ...fieldData } = field
        await prisma.templateField.upsert({
          where: { id: field.id },
          create: fieldData,
          update: fieldData
        })

        // Restore field options
        for (const option of options) {
          await prisma.fieldOption.upsert({
            where: { id: option.id },
            create: option,
            update: option
          })
        }

        // Restore field dependencies
        for (const dependency of dependencies) {
          await prisma.fieldDependency.upsert({
            where: { id: dependency.id },
            create: dependency,
            update: dependency
          })
        }
      }

      // Restore questionnaires
      for (const questionnaire of questionnaires) {
        const { questions, ...questionnaireData } = questionnaire
        await prisma.questionnaire.upsert({
          where: { id: questionnaire.id },
          create: questionnaireData,
          update: questionnaireData
        })

        // Restore questions
        for (const question of questions) {
          const { options, dependencies, ...questionData } = question
          await prisma.question.upsert({
            where: { id: question.id },
            create: questionData,
            update: questionData
          })

          // Restore question options
          for (const option of options) {
            await prisma.questionOption.upsert({
              where: { id: option.id },
              create: option,
              update: option
            })
          }

          // Restore question dependencies
          for (const dependency of dependencies) {
            await prisma.questionDependency.upsert({
              where: { id: dependency.id },
              create: dependency,
              update: dependency
            })
          }
        }
      }
    }

    // Restore Users
    for (const user of backupData.users) {
      const { accounts, sessions, documents, collaboratedDocs, signatures, userDocuments, ...userData } = user
      
      // First check if a user with this email already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: userData.email }
      })

      if (existingUser) {
        // Update the existing user
        await prisma.user.update({
          where: { id: existingUser.id },
          data: userData
        })
      } else {
        // Create new user if no email conflict
        await prisma.user.create({
          data: userData
        })
      }

      // Restore user accounts
      for (const account of accounts) {
        await prisma.account.upsert({
          where: { id: account.id },
          create: account,
          update: account
        })
      }

      // Restore user sessions
      for (const session of sessions) {
        await prisma.session.upsert({
          where: { id: session.id },
          create: session,
          update: session
        })
      }
    }

    // Restore Documents
    for (const document of backupData.documents) {
      const { parties, collaborators, signatures, template, ...documentData } = document
      await prisma.document.upsert({
        where: { id: document.id },
        create: documentData,
        update: documentData
      })

      // Restore document parties
      for (const party of parties) {
        await prisma.documentParty.upsert({
          where: { id: party.id },
          create: party,
          update: party
        })
      }

      // Restore document collaborators
      for (const collaborator of collaborators) {
        await prisma.documentCollaborator.upsert({
          where: { id: collaborator.id },
          create: collaborator,
          update: collaborator
        })
      }

      // Restore document signatures
      for (const signature of signatures) {
        await prisma.documentSignature.upsert({
          where: { id: signature.id },
          create: signature,
          update: signature
        })
      }
    }

    console.log('Data restoration completed successfully!')
  } catch (error) {
    console.error('Error during restoration:', error)
  } finally {
    await prisma.$disconnect()
  }
}

restoreData() 