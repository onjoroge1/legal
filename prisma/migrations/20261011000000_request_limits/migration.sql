CREATE TABLE "RequestBudget" ("key" TEXT NOT NULL, "used" INTEGER NOT NULL, "resetAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "RequestBudget_pkey" PRIMARY KEY ("key"));
CREATE TABLE "RequestLease" ("id" TEXT NOT NULL, "subject" TEXT NOT NULL, "expiresAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "RequestLease_pkey" PRIMARY KEY ("id"));
CREATE INDEX "RequestLease_expiresAt_idx" ON "RequestLease"("expiresAt");
CREATE INDEX "RequestLease_subject_idx" ON "RequestLease"("subject");
