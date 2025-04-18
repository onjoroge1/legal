-- AlterTable
ALTER TABLE "Document" ADD COLUMN "deletedAt" DATETIME;

-- AlterTable
ALTER TABLE "DocumentTemplate" ADD COLUMN "deletedAt" DATETIME; 