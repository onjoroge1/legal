import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as crypto from 'crypto'

const prisma = new PrismaClient()

// Configuration
const CONFIG = {
  ENCRYPTION_KEY: process.env.BACKUP_ENCRYPTION_KEY,
  DRY_RUN: process.env.DRY_RUN === 'true'
}

// Get 32-byte encryption key
function getEncryptionKey(): Buffer {
  if (!CONFIG.ENCRYPTION_KEY) {
    throw new Error('BACKUP_ENCRYPTION_KEY environment variable must be set')
  }
  // If key is in hex format, convert to buffer
  if (CONFIG.ENCRYPTION_KEY.length === 64 && /^[0-9a-f]+$/i.test(CONFIG.ENCRYPTION_KEY)) {
    return Buffer.from(CONFIG.ENCRYPTION_KEY, 'hex')
  }
  // If key is not 32 bytes, hash it to get 32 bytes
  return crypto.createHash('sha256').update(CONFIG.ENCRYPTION_KEY).digest()
}

// Decrypt data from file
function decryptData(encryptedData: string): any {
  const { iv, encryptedData: data, authTag } = JSON.parse(encryptedData)
  const key = getEncryptionKey()
  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    key,
    Buffer.from(iv, 'hex')
  )
  decipher.setAuthTag(Buffer.from(authTag, 'hex'))
  let decrypted = decipher.update(data, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return JSON.parse(decrypted)
}

async function restoreFromBackup(backupFile: string) {
  try {
    console.log('Starting restore process...')
    console.log(`Reading backup file: ${backupFile}`)
    
    if (!fs.existsSync(backupFile)) {
      throw new Error(`Backup file not found: ${backupFile}`)
    }

    const encryptedData = fs.readFileSync(backupFile, 'utf8')
    const backup = decryptData(encryptedData)

    console.log('Backup decrypted successfully')
    console.log('Backup metadata:', backup.metadata || 'No metadata')
    console.log('Backup version:', backup.version)
    console.log('Backup timestamp:', backup.timestamp)

    if (CONFIG.DRY_RUN) {
      console.log('\nDRY RUN MODE - Previewing changes:')
      console.log(`Categories to restore: ${backup.data.categories?.length || 0}`)
      console.log(`Document templates to restore: ${backup.data.documentTemplates?.length || 0}`)
      console.log(`Questionnaires to restore: ${backup.data.questionnaires?.length || 0}`)
      console.log(`Questions to restore: ${backup.data.questions?.length || 0}`)
      console.log(`Question options to restore: ${backup.data.questionOptions?.length || 0}`)
      console.log(`Question dependencies to restore: ${backup.data.questionDependencies?.length || 0}`)
      console.log('\nNo changes were made to the database (dry run mode)')
      return
    }

    // Start transaction
    await prisma.$transaction(async (tx) => {
      console.log('Starting database transaction...')

      // Restore categories
      console.log('Restoring categories...')
      for (const category of backup.data.categories) {
        await tx.category.upsert({
          where: { id: category.id },
          update: {
            name: category.name,
            slug: category.slug,
            description: category.description
          },
          create: category
        })
      }

      // Restore document templates
      console.log('Restoring document templates...')
      for (const template of backup.data.documentTemplates) {
        await tx.documentTemplate.upsert({
          where: { id: template.id },
          update: {
            name: template.name,
            type: template.type,
            description: template.description,
            content: template.content,
            state: template.state,
            categoryId: template.categoryId,
            version: template.version,
            metadata: template.metadata,
            variables: template.variables
          },
          create: template
        })
      }

      // Restore questionnaires with their questions and options
      console.log('Restoring questionnaires...')
      for (const questionnaire of backup.data.questionnaires) {
        await tx.questionnaire.upsert({
          where: { id: questionnaire.id },
          update: {
            name: questionnaire.name,
            description: questionnaire.description,
            templateId: questionnaire.templateId,
            metadata: questionnaire.metadata
          },
          create: questionnaire
        })
      }

      // Restore questions
      console.log('Restoring questions...')
      for (const question of backup.data.questions) {
        await tx.question.upsert({
          where: { id: question.id },
          update: {
            label: question.label,
            type: question.type,
            required: question.required,
            section: question.section,
            helpText: question.helpText,
            placeholder: question.placeholder,
            questionnaireId: question.questionnaireId
          },
          create: question
        })
      }

      // Restore question options
      console.log('Restoring question options...')
      for (const option of backup.data.questionOptions) {
        await tx.questionOption.upsert({
          where: { id: option.id },
          update: {
            value: option.value,
            label: option.label,
            questionId: option.questionId
          },
          create: option
        })
      }

      // Restore question dependencies
      if (backup.data.questionDependencies.length > 0) {
        console.log('Restoring question dependencies...')
        for (const dependency of backup.data.questionDependencies) {
          await tx.questionDependency.upsert({
            where: { id: dependency.id },
            update: {
              questionId: dependency.questionId,
              dependsOnQuestionId: dependency.dependsOnQuestionId,
              conditionType: dependency.conditionType,
              conditionValue: dependency.conditionValue
            },
            create: dependency
          })
        }
      }

      console.log('All data restored successfully')
    })

    console.log('Restore completed successfully')
  } catch (error) {
    console.error('Error during restore:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

async function main() {
  const args = process.argv.slice(2)
  const backupFile = args[0]

  if (!backupFile) {
    console.error('Please provide the backup file path')
    process.exit(1)
  }

  if (!CONFIG.ENCRYPTION_KEY) {
    console.error('BACKUP_ENCRYPTION_KEY environment variable must be set')
    process.exit(1)
  }

  try {
    if (CONFIG.DRY_RUN) {
      console.log('DRY RUN MODE - No changes will be made to the database')
    }
    await restoreFromBackup(backupFile)
  } catch (error) {
    console.error('Restore failed:', error)
    process.exit(1)
  }
}

main() 