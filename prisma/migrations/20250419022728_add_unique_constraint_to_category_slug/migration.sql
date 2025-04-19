/*
  Warnings:

  - You are about to drop the column `createdAt` on the `DocumentSignature` table. All the data in the column will be lost.
  - You are about to drop the column `metadata` on the `DocumentSignature` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `DocumentSignature` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `signature` to the `DocumentSignature` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DocumentSignature" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "documentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "signature" TEXT NOT NULL,
    "signedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "DocumentSignature_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DocumentSignature_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DocumentSignature" ("documentId", "id", "userId") SELECT "documentId", "id", "userId" FROM "DocumentSignature";
DROP TABLE "DocumentSignature";
ALTER TABLE "new_DocumentSignature" RENAME TO "DocumentSignature";
CREATE UNIQUE INDEX "DocumentSignature_documentId_userId_key" ON "DocumentSignature"("documentId", "userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");
