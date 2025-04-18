/*
  Warnings:

  - A unique constraint covering the columns `[documentId,userId]` on the table `DocumentSignature` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DocumentSignature_documentId_userId_key" ON "DocumentSignature"("documentId", "userId");
