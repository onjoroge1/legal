/*
  Warnings:

  - You are about to drop the column `signature` on the `DocumentSignature` table. All the data in the column will be lost.
  - You are about to drop the column `signedAt` on the `DocumentSignature` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `DocumentSignature` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DocumentSignature" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "documentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "DocumentSignature_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DocumentSignature_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DocumentSignature" ("documentId", "id", "userId") SELECT "documentId", "id", "userId" FROM "DocumentSignature";
DROP TABLE "DocumentSignature";
ALTER TABLE "new_DocumentSignature" RENAME TO "DocumentSignature";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
