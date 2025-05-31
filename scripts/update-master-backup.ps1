# Script to update master backup with complete database contents

# Set paths
$masterBackupDir = "prisma/backups"
$masterBackupFile = "$masterBackupDir/master-backup.json"
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"

# Create backups directory if it doesn't exist
if (-not (Test-Path $masterBackupDir)) {
    New-Item -ItemType Directory -Path $masterBackupDir -Force
}

Write-Host "Step 1: Creating SQLite database backup..."
$sqliteBackupFile = "$masterBackupDir/sqlite_backup_$timestamp.db"
Copy-Item "prisma/dev.db" $sqliteBackupFile

Write-Host "Step 2: Exporting complete database schema and data..."
# Export schema
$schemaOutput = npx prisma db pull --print

# Create a temporary SQL file
$tempSqlFile = "$masterBackupDir/temp_queries.sql"
@"
SELECT * FROM User;
SELECT * FROM Account;
SELECT * FROM Session;
SELECT * FROM VerificationToken;
SELECT * FROM Document;
SELECT * FROM DocumentParty;
SELECT * FROM Questionnaire;
SELECT * FROM Question;
SELECT * FROM QuestionOption;
SELECT * FROM QuestionDependency;
SELECT * FROM DocumentTemplate;
SELECT * FROM TemplateField;
SELECT * FROM FieldOption;
SELECT * FROM FieldDependency;
SELECT * FROM DocumentCollaborator;
SELECT * FROM DocumentSignature;
SELECT * FROM Category;
SELECT * FROM UserDocument;
"@ | Out-File -FilePath $tempSqlFile -Encoding UTF8

# Export data using the SQL file
$dataOutput = npx prisma db execute --file $tempSqlFile --json

# Combine schema and data into master backup
$backupContent = @{
    timestamp = $timestamp
    schema = $schemaOutput
    data = $dataOutput
} | ConvertTo-Json -Depth 10

# Save to master backup file
$backupContent | Out-File -FilePath $masterBackupFile -Encoding UTF8

# Clean up temporary file
Remove-Item $tempSqlFile

Write-Host "`nMaster backup updated successfully!"
Write-Host "Backup files created:"
Write-Host "1. Master backup: $masterBackupFile"
Write-Host "2. SQLite backup: $sqliteBackupFile"

# Verify the backup
Write-Host "`nVerifying backup contents..."
$backupSize = (Get-Item $masterBackupFile).Length
Write-Host "Backup file size: $($backupSize/1KB) KB"
Write-Host "Backup timestamp: $timestamp" 