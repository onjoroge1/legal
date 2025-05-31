import { PrismaClient } from '.prisma/client';
import { execSync } from 'child_process';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function setupDatabase() {
  const prisma = new PrismaClient();
  
  try {
    // Check if we're in production
    const isProduction = process.env.NODE_ENV === 'production';
    
    if (isProduction) {
      console.log('Setting up production database...');
      
      // In production, we only need to generate the Prisma client
      // since the database is already set up correctly
      execSync('npx prisma generate', { stdio: 'inherit' });
      console.log('Production database setup completed successfully');
    } else {
      // In development, we can be more aggressive
      console.log('Setting up development database...');
      execSync('npx prisma migrate reset --force', { stdio: 'inherit' });
      console.log('Development database setup completed successfully');
    }
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

setupDatabase(); 