-- CreateTable
CREATE TABLE "DocumentReview" (
    "versionId" TEXT NOT NULL,
    "reviewerId" TEXT NOT NULL,
    "contentHash" TEXT NOT NULL,
    "evidenceUrl" TEXT NOT NULL,
    "sourceUrls" JSONB NOT NULL,
    "reviewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DocumentReview_pkey" PRIMARY KEY ("versionId")
);

