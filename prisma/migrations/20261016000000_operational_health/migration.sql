ALTER TABLE "CheckoutOrder" ADD COLUMN "lastReconciledAt" TIMESTAMP(3), ADD COLUMN "lastReconcileError" TEXT;
ALTER TABLE "StripeEvent" ADD COLUMN "nextAttemptAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
CREATE TABLE "OperationRun" ("id" TEXT NOT NULL, "kind" TEXT NOT NULL, "status" TEXT NOT NULL DEFAULT 'running', "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "finishedAt" TIMESTAMP(3), "durationMs" INTEGER, CONSTRAINT "OperationRun_pkey" PRIMARY KEY ("id"));
CREATE INDEX "OperationRun_kind_startedAt_idx" ON "OperationRun"("kind", "startedAt");
CREATE TABLE "OperationLease" ("kind" TEXT NOT NULL, "until" TIMESTAMP(3) NOT NULL, CONSTRAINT "OperationLease_pkey" PRIMARY KEY ("kind"));
CREATE TABLE "OperationsAlert" ("id" TEXT NOT NULL, "code" TEXT NOT NULL, "payload" JSONB NOT NULL, "sentAt" TIMESTAMP(3), "nextAttemptAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "attempts" INTEGER NOT NULL DEFAULT 0, "leaseUntil" TIMESTAMP(3), "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "OperationsAlert_pkey" PRIMARY KEY ("id"));
CREATE INDEX "OperationsAlert_sentAt_nextAttemptAt_idx" ON "OperationsAlert"("sentAt", "nextAttemptAt");
