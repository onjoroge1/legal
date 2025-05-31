const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function restoreDatabase() {
  try {
    console.log('Starting database restoration...');
    
    // Read the backup file
    const backupPath = path.join(__dirname, 'backups', 'full-state-2025-04-20T22-05-43-781Z.enc.json');
    console.log('Reading backup file from:', backupPath);
    
    if (!fs.existsSync(backupPath)) {
      throw new Error(`Backup file not found at ${backupPath}`);
    }
    
    const fileContent = fs.readFileSync(backupPath, 'utf8');
    console.log('File content length:', fileContent.length);
    
    const backupData = JSON.parse(fileContent);
    console.log('Backup data structure:', Object.keys(backupData));
    
    // Clear existing data
    console.log('Clearing existing data...');
    await prisma.$transaction([
      prisma.userDocument.deleteMany(),
      prisma.documentSignature.deleteMany(),
      prisma.documentCollaborator.deleteMany(),
      prisma.document.deleteMany(),
      prisma.session.deleteMany(),
      prisma.account.deleteMany(),
      prisma.user.deleteMany(),
    ]);
    
    console.log('Existing data cleared');
    
    // Restore data
    console.log('Restoring data...');
    
    // Restore users first
    if (backupData.users && Array.isArray(backupData.users)) {
      console.log(`Restoring ${backupData.users.length} users...`);
      for (const user of backupData.users) {
        try {
          const createdUser = await prisma.user.create({
            data: {
              ...user,
              createdAt: new Date(user.createdAt),
              updatedAt: new Date(user.updatedAt),
              emailVerified: user.emailVerified ? new Date(user.emailVerified) : null,
              verificationTokenExpiry: user.verificationTokenExpiry ? new Date(user.verificationTokenExpiry) : null,
              resetTokenExpiry: user.resetTokenExpiry ? new Date(user.resetTokenExpiry) : null,
              subscriptionStartDate: user.subscriptionStartDate ? new Date(user.subscriptionStartDate) : null,
              subscriptionEndDate: user.subscriptionEndDate ? new Date(user.subscriptionEndDate) : null,
              lastPasswordChange: user.lastPasswordChange ? new Date(user.lastPasswordChange) : null,
            },
          });
          console.log('Created user:', createdUser.email);
        } catch (error) {
          console.error('Error creating user:', user.email, error);
        }
      }
    } else {
      console.log('No users found in backup data');
    }
    
    // Restore accounts
    if (backupData.accounts && Array.isArray(backupData.accounts)) {
      console.log(`Restoring ${backupData.accounts.length} accounts...`);
      for (const account of backupData.accounts) {
        try {
          const createdAccount = await prisma.account.create({
            data: account,
          });
          console.log('Created account for user:', createdAccount.userId);
        } catch (error) {
          console.error('Error creating account:', account.userId, error);
        }
      }
    } else {
      console.log('No accounts found in backup data');
    }
    
    // Restore sessions
    if (backupData.sessions && Array.isArray(backupData.sessions)) {
      console.log(`Restoring ${backupData.sessions.length} sessions...`);
      for (const session of backupData.sessions) {
        try {
          const createdSession = await prisma.session.create({
            data: {
              ...session,
              expires: new Date(session.expires),
            },
          });
          console.log('Created session for user:', createdSession.userId);
        } catch (error) {
          console.error('Error creating session:', session.userId, error);
        }
      }
    } else {
      console.log('No sessions found in backup data');
    }
    
    // Restore documents
    if (backupData.documents && Array.isArray(backupData.documents)) {
      console.log(`Restoring ${backupData.documents.length} documents...`);
      for (const document of backupData.documents) {
        try {
          const createdDocument = await prisma.document.create({
            data: {
              ...document,
              createdAt: new Date(document.createdAt),
              updatedAt: new Date(document.updatedAt),
            },
          });
          console.log('Created document:', createdDocument.id);
        } catch (error) {
          console.error('Error creating document:', document.id, error);
        }
      }
    } else {
      console.log('No documents found in backup data');
    }
    
    // Restore document collaborators
    if (backupData.documentCollaborators && Array.isArray(backupData.documentCollaborators)) {
      console.log(`Restoring ${backupData.documentCollaborators.length} document collaborators...`);
      for (const collaborator of backupData.documentCollaborators) {
        try {
          const createdCollaborator = await prisma.documentCollaborator.create({
            data: collaborator,
          });
          console.log('Created collaborator for document:', createdCollaborator.documentId);
        } catch (error) {
          console.error('Error creating collaborator:', collaborator.documentId, error);
        }
      }
    } else {
      console.log('No document collaborators found in backup data');
    }
    
    // Restore document signatures
    if (backupData.documentSignatures && Array.isArray(backupData.documentSignatures)) {
      console.log(`Restoring ${backupData.documentSignatures.length} document signatures...`);
      for (const signature of backupData.documentSignatures) {
        try {
          const createdSignature = await prisma.documentSignature.create({
            data: {
              ...signature,
              signedAt: new Date(signature.signedAt),
            },
          });
          console.log('Created signature for document:', createdSignature.documentId);
        } catch (error) {
          console.error('Error creating signature:', signature.documentId, error);
        }
      }
    } else {
      console.log('No document signatures found in backup data');
    }
    
    // Restore user documents
    if (backupData.userDocuments && Array.isArray(backupData.userDocuments)) {
      console.log(`Restoring ${backupData.userDocuments.length} user documents...`);
      for (const userDoc of backupData.userDocuments) {
        try {
          const createdUserDoc = await prisma.userDocument.create({
            data: userDoc,
          });
          console.log('Created user document:', createdUserDoc.id);
        } catch (error) {
          console.error('Error creating user document:', userDoc.id, error);
        }
      }
    } else {
      console.log('No user documents found in backup data');
    }
    
    console.log('Database restoration completed successfully!');
  } catch (error) {
    console.error('Error restoring database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

restoreDatabase(); 