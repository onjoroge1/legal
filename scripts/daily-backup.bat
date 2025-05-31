@echo off
echo Starting daily database backup check...
cd /d %~dp0..
call npm run db:backup:check
echo Backup check completed. 