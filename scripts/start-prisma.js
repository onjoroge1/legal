const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  try {
    // Test the connection
    await prisma.$connect()
    console.log('Successfully connected to the database')
    
    // Keep the connection alive
    process.on('SIGINT', async () => {
      await prisma.$disconnect()
      process.exit(0)
    })
    
    console.log('Prisma server is running...')
  } catch (error) {
    console.error('Error connecting to the database:', error)
    process.exit(1)
  }
}

main() 