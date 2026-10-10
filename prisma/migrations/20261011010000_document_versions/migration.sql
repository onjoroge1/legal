-- CreateTable
CREATE TABLE "DocumentDraft" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT,
    "guestHash" TEXT,
    "guestExpiresAt" TIMESTAMP(3),
    "category" TEXT NOT NULL,
    "sourceSlug" TEXT NOT NULL,
    "canonicalSlug" TEXT NOT NULL,
    "intent" TEXT,
    "jurisdiction" TEXT,
    "formData" JSONB NOT NULL,
    "revision" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DocumentDraft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentVersion" (
    "id" TEXT NOT NULL,
    "draftId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "contentHash" TEXT NOT NULL,
    "formData" JSONB NOT NULL,
    "review" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DocumentVersion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DocumentDraft_ownerId_idx" ON "DocumentDraft"("ownerId");

-- CreateIndex
CREATE INDEX "DocumentVersion_draftId_createdAt_idx" ON "DocumentVersion"("draftId", "createdAt");

-- AddForeignKey
ALTER TABLE "DocumentVersion" ADD CONSTRAINT "DocumentVersion_draftId_fkey" FOREIGN KEY ("draftId") REFERENCES "DocumentDraft"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

