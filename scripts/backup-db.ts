import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const BACKUP_DIR = path.join(__dirname, '../backups');
const DB_PATH = path.join(__dirname, '../prisma/dev.db');

function createBackup() {
  // Create backups directory if it doesn't exist
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }

  // Generate timestamp for backup filename
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(BACKUP_DIR, `dev.db.backup.${timestamp}`);

  try {
    // Copy the database file
    fs.copyFileSync(DB_PATH, backupPath);
    console.log(`Backup created successfully at: ${backupPath}`);
    
    // Keep only the last 5 backups
    const backups = fs.readdirSync(BACKUP_DIR)
      .filter(file => file.startsWith('dev.db.backup.'))
      .sort()
      .reverse();
    
    if (backups.length > 5) {
      backups.slice(5).forEach(oldBackup => {
        fs.unlinkSync(path.join(BACKUP_DIR, oldBackup));
        console.log(`Removed old backup: ${oldBackup}`);
      });
    }
  } catch (error) {
    console.error('Error creating backup:', error);
  }
}

// Run the backup
createBackup(); 