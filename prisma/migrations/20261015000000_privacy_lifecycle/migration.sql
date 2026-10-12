ALTER TABLE "User" ADD COLUMN "privacyState" TEXT NOT NULL DEFAULT 'active';
CREATE TABLE "PrivacyRequest" (
 "id" TEXT NOT NULL, "userId" TEXT NOT NULL, "status" TEXT NOT NULL DEFAULT 'requested',
 "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "eligibleAt" TIMESTAMP(3) NOT NULL,
 "erasedAt" TIMESTAMP(3), "completedAt" TIMESTAMP(3), "policyVersion" TEXT,
 "evidenceRetentionUntil" TIMESTAMP(3), "externalEvidence" TEXT, "lastError" TEXT,
 CONSTRAINT "PrivacyRequest_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "PrivacyRequest_userId_key" ON "PrivacyRequest"("userId");
