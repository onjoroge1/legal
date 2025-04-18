/*
  Warnings:

  - You are about to drop the `Questionnaire` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Template` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `category` on the `DocumentTemplate` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `DocumentTemplate` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Questionnaire";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Template";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DocumentTemplate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "content" TEXT,
    "state" TEXT,
    "categoryId" TEXT NOT NULL,
    "version" TEXT NOT NULL DEFAULT '1.0.0',
    "metadata" JSONB,
    "variables" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "DocumentTemplate_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DocumentTemplate" ("code", "content", "createdAt", "description", "id", "metadata", "name", "state", "type", "updatedAt", "variables", "version") SELECT "code", "content", "createdAt", "description", "id", "metadata", "name", "state", "type", "updatedAt", "variables", "version" FROM "DocumentTemplate";
DROP TABLE "DocumentTemplate";
ALTER TABLE "new_DocumentTemplate" RENAME TO "DocumentTemplate";
CREATE UNIQUE INDEX "DocumentTemplate_code_key" ON "DocumentTemplate"("code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
