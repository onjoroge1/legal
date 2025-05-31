import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'
import * as crypto from 'crypto'

const prisma = new PrismaClient()

// Configuration
const CONFIG = {
  BACKUP_DIR: process.env.BACKUP_DIR || path.join(process.cwd(), 'prisma', 'backups'),
  ENCRYPTION_KEY: process.env.BACKUP_ENCRYPTION_KEY || crypto.randomBytes(32).toString('hex'),
  RETENTION_DAYS: 7,
  BACKUP_PREFIX: 'backup-',
  BACKUP_EXTENSION: '.enc.json'
}

// Ensure backup directory exists and has proper permissions
function ensureBackupDirectory() {
  if (!fs.existsSync(CONFIG.BACKUP_DIR)) {
    fs.mkdirSync(CONFIG.BACKUP_DIR, { recursive: true, mode: 0o700 })
  }
}

// Get 32-byte encryption key
function getEncryptionKey(): Buffer {
  // If key is in hex format, convert to buffer
  if (CONFIG.ENCRYPTION_KEY.length === 64 && /^[0-9a-f]+$/i.test(CONFIG.ENCRYPTION_KEY)) {
    return Buffer.from(CONFIG.ENCRYPTION_KEY, 'hex')
  }
  // If key is not 32 bytes, hash it to get 32 bytes
  return crypto.createHash('sha256').update(CONFIG.ENCRYPTION_KEY).digest()
}

// Encrypt data before writing to file
function encryptData(data: any): string {
  const iv = crypto.randomBytes(16)
  const key = getEncryptionKey()
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
  let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex')
  encrypted += cipher.final('hex')
  const authTag = cipher.getAuthTag()
  return JSON.stringify({
    iv: iv.toString('hex'),
    encryptedData: encrypted,
    authTag: authTag.toString('hex')
  })
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

async function backupDatabase() {
  try {
    console.log('Starting database backup...')
    ensureBackupDirectory()
    
    // Get current timestamp for filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const backupFile = path.join(CONFIG.BACKUP_DIR, `${CONFIG.BACKUP_PREFIX}${timestamp}${CONFIG.BACKUP_EXTENSION}`)

    // Fetch all data from the database
    const data = {
      timestamp: new Date().toISOString(),
      version: '1.0',
      data: {
        users: await prisma.user.findMany(),
        categories: await prisma.category.findMany(),
        documentTemplates: await prisma.documentTemplate.findMany(),
        templateFields: await prisma.templateField.findMany(),
        questionnaires: await prisma.questionnaire.findMany(),
        questions: await prisma.question.findMany(),
        questionOptions: await prisma.questionOption.findMany(),
        questionDependencies: await prisma.questionDependency.findMany(),
      }
    }

    // Encrypt and write data to backup file
    const encryptedData = encryptData(data)
    fs.writeFileSync(backupFile, encryptedData)
    console.log(`Backup completed successfully: ${backupFile}`)

    // Verify backup
    try {
      const verifyData = decryptData(fs.readFileSync(backupFile, 'utf8'))
      if (verifyData.timestamp === data.timestamp) {
        console.log('Backup verification successful')
      } else {
        throw new Error('Backup verification failed')
      }
    } catch (error) {
      console.error('Backup verification failed:', error)
      fs.unlinkSync(backupFile)
      throw error
    }

    // Clean up old backups
    const files = fs.readdirSync(CONFIG.BACKUP_DIR)
    const backupFiles = files.filter(file => 
      file.startsWith(CONFIG.BACKUP_PREFIX) && 
      file.endsWith(CONFIG.BACKUP_EXTENSION)
    )
    backupFiles.sort().reverse()

    if (backupFiles.length > CONFIG.RETENTION_DAYS) {
      const filesToDelete = backupFiles.slice(CONFIG.RETENTION_DAYS)
      for (const file of filesToDelete) {
        fs.unlinkSync(path.join(CONFIG.BACKUP_DIR, file))
        console.log(`Deleted old backup: ${file}`)
      }
    }

  } catch (error) {
    console.error('Error during backup:', error)
    // Add error notification here (e.g., email, Slack, etc.)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

function hasBackupForToday(): boolean {
  if (!fs.existsSync(CONFIG.BACKUP_DIR)) {
    return false
  }

  const today = new Date().toISOString().split('T')[0]
  const files = fs.readdirSync(CONFIG.BACKUP_DIR)
  return files.some(file => 
    file.startsWith(`${CONFIG.BACKUP_PREFIX}${today}`) && 
    file.endsWith(CONFIG.BACKUP_EXTENSION)
  )
}

async function createFullStateBackup(outputPath?: string) {
  try {
    console.log('Creating full state backup...')
    ensureBackupDirectory()
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const backupFile = outputPath || path.join(CONFIG.BACKUP_DIR, `full-state-${timestamp}${CONFIG.BACKUP_EXTENSION}`)

    // Fetch all data from the database with detailed logging
    console.log('Fetching database contents...')
    const data = {
      timestamp: new Date().toISOString(),
      version: '1.0',
      metadata: {
        type: 'full-state-backup',
        description: 'Complete database state backup for migration purposes'
      },
      data: {
        users: await prisma.user.findMany(),
        categories: await prisma.category.findMany(),
        documentTemplates: await prisma.documentTemplate.findMany({
          include: {
            category: true,
            fields: true
          }
        }),
        templateFields: await prisma.templateField.findMany(),
        questionnaires: await prisma.questionnaire.findMany({
          include: {
            questions: {
              include: {
                options: true,
                dependencies: true
              }
            }
          }
        }),
        questions: await prisma.question.findMany({
          include: {
            options: true,
            dependencies: true
          }
        }),
        questionOptions: await prisma.questionOption.findMany(),
        questionDependencies: await prisma.questionDependency.findMany(),
      }
    }

    // Log counts for verification
    console.log('Data snapshot created:')
    Object.entries(data.data).forEach(([key, value]) => {
      console.log(`- ${key}: ${Array.isArray(value) ? value.length : 0} records`)
    })

    // Encrypt and write data to backup file
    const encryptedData = encryptData(data)
    fs.writeFileSync(backupFile, encryptedData)
    console.log(`Full state backup completed successfully: ${backupFile}`)

    // Verify backup
    try {
      const verifyData = decryptData(fs.readFileSync(backupFile, 'utf8'))
      if (verifyData.timestamp === data.timestamp) {
        console.log('Backup verification successful')
        return backupFile
      } else {
        throw new Error('Backup verification failed')
      }
    } catch (error) {
      console.error('Backup verification failed:', error)
      fs.unlinkSync(backupFile)
      throw error
    }
  } catch (error) {
    console.error('Error during full state backup:', error)
    throw error
  }
}

async function main() {
  const args = process.argv.slice(2)
  const command = args[0]

  try {
    if (command === '--full-state') {
      const outputPath = args[1]
      await createFullStateBackup(outputPath)
      return
    }

    console.log('Checking for today\'s backup...')
    
    if (hasBackupForToday()) {
      console.log('Backup already exists for today')
      return
    }

    console.log('No backup found for today, creating one...')
    await backupDatabase()
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

main() 