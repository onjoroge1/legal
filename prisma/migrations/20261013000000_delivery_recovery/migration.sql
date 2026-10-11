-- DropIndex
DROP INDEX "DeliveryOutbox_orderId_key";

-- AlterTable
ALTER TABLE "DocumentVersion" ADD COLUMN     "claimedOwnerId" TEXT,
ADD COLUMN     "recoveryExpiresAt" TIMESTAMP(3),
ADD COLUMN     "recoveryHash" TEXT;

-- AlterTable
ALTER TABLE "DeliveryOutbox" ADD COLUMN     "acceptedAt" TIMESTAMP(3),
ADD COLUMN     "dedupeKey" TEXT,
ADD COLUMN     "firstSendAt" TIMESTAMP(3),
ADD COLUMN     "lastError" TEXT,
ADD COLUMN     "leaseId" TEXT,
ADD COLUMN     "leaseUntil" TIMESTAMP(3),
ADD COLUMN     "nextAttemptAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "payloadCipher" TEXT,
ADD COLUMN     "providerId" TEXT,
ADD COLUMN     "recipientHash" TEXT;

-- Preserve existing fulfillment jobs before enforcing the new key.
UPDATE "DeliveryOutbox" SET "dedupeKey" = 'fulfillment:' || "orderId";
ALTER TABLE "DeliveryOutbox" ALTER COLUMN "dedupeKey" SET NOT NULL;

-- CreateTable
CREATE TABLE "GuestPurchaseClaim" (
    "orderId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "redeemedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GuestPurchaseClaim_pkey" PRIMARY KEY ("orderId")
);

-- CreateTable
CREATE TABLE "EmailDeliveryEvent" (
    "id" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailDeliveryEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailSuppression" (
    "recipientHash" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailSuppression_pkey" PRIMARY KEY ("recipientHash")
);

-- CreateIndex
CREATE UNIQUE INDEX "GuestPurchaseClaim_tokenHash_key" ON "GuestPurchaseClaim"("tokenHash");

-- CreateIndex
CREATE INDEX "EmailDeliveryEvent_providerId_idx" ON "EmailDeliveryEvent"("providerId");

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryOutbox_dedupeKey_key" ON "DeliveryOutbox"("dedupeKey");

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryOutbox_providerId_key" ON "DeliveryOutbox"("providerId");

-- CreateIndex
CREATE INDEX "DeliveryOutbox_orderId_idx" ON "DeliveryOutbox"("orderId");

-- CreateIndex
CREATE INDEX "DeliveryOutbox_status_nextAttemptAt_idx" ON "DeliveryOutbox"("status", "nextAttemptAt");

