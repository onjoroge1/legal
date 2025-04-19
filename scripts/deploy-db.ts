import { PrismaClient } from '@prisma/client'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

async function deployDatabase() {
  try {
    // Run migrations
    console.log('Running database migrations...')
    await execAsync('npx prisma migrate deploy')
    
    // Run seed if needed
    const prisma = new PrismaClient()
    const userCount = await prisma.user.count()
    
    if (userCount === 0) {
      console.log('Database is empty, running seed...')
      await execAsync('npx prisma db seed')
    }
    
    console.log('Database deployment completed successfully')
  } catch (error) {
    console.error('Error deploying database:', error)
    process.exit(1)
  }
}

deployDatabase() 