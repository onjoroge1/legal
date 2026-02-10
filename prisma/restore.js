const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function restoreDatabase() {
  try {
    console.log('Starting database restoration...');
    
    // Get the most recent backup file
    const backupsDir = path.join(__dirname, 'backups');
    const backupFiles = fs.readdirSync(backupsDir)
      .filter(file => file.startsWith('backup-') && file.endsWith('.json'))
      .sort()
      .reverse();
    
    if (backupFiles.length === 0) {
      throw new Error('No backup files found');
    }

    const mostRecentBackup = backupFiles[0];
    const backupPath = path.join(backupsDir, mostRecentBackup);
    console.log(`Reading backup file from: ${backupPath}`);
    
    const backupData = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
    console.log('Backup data loaded successfully');

    // Clear existing data
    console.log('Clearing existing data...');
    await prisma.$transaction([
      prisma.documentCollaborator.deleteMany(),
      prisma.documentSignature.deleteMany(),
      prisma.userDocument.deleteMany(),
      prisma.documentTemplate.deleteMany(),
      prisma.category.deleteMany(),
      prisma.user.deleteMany(),
    ]);
    console.log('Existing data cleared');

    // Restore users
    if (backupData.users && backupData.users.length > 0) {
      console.log(`Restoring ${backupData.users.length} users...`);
      for (const user of backupData.users) {
        await prisma.user.create({
          data: {
            ...user,
            createdAt: new Date(user.createdAt),
            updatedAt: new Date(user.updatedAt),
          },
        });
      }
      console.log('Users restored successfully');
    } else {
      console.log('No users found in backup data');
    }

    // Restore categories
    if (backupData.categories && backupData.categories.length > 0) {
      console.log(`Restoring ${backupData.categories.length} categories...`);
      for (const category of backupData.categories) {
        await prisma.category.create({
          data: {
            ...category,
            createdAt: new Date(category.createdAt),
            updatedAt: new Date(category.updatedAt),
            deletedAt: category.deletedAt ? new Date(category.deletedAt) : null,
          },
        });
      }
      console.log('Categories restored successfully');
    } else {
      console.log('No categories found in backup data');
    }

    // Restore document templates
    if (backupData.documentTemplates && backupData.documentTemplates.length > 0) {
      console.log(`Restoring ${backupData.documentTemplates.length} document templates...`);
      for (const template of backupData.documentTemplates) {
        await prisma.documentTemplate.create({
          data: {
            ...template,
            createdAt: new Date(template.createdAt),
            updatedAt: new Date(template.updatedAt),
            deletedAt: template.deletedAt ? new Date(template.deletedAt) : null,
          },
        });
      }
      console.log('Document templates restored successfully');
    } else {
      console.log('No document templates found in backup data');
    }

    console.log('Database restoration completed successfully');
  } catch (error) {
    console.error('Error during database restoration:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

restoreDatabase()
  .then(() => {
    console.log('Restore script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Restore script failed:', error);
    process.exit(1);
  }); 