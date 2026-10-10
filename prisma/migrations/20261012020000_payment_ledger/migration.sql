-- CreateTable
CREATE TABLE "StripeEvent" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "objectId" TEXT NOT NULL,
    "livemode" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "lastError" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedAt" TIMESTAMP(3),

    CONSTRAINT "StripeEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeliveryOutbox" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deliveredAt" TIMESTAMP(3),

    CONSTRAINT "DeliveryOutbox_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentHold" (
    "id" TEXT NOT NULL,
    "subscriptionId" TEXT,
    "invoiceId" TEXT,
    "status" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentHold_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "StripeEvent_status_createdAt_idx" ON "StripeEvent"("status", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryOutbox_orderId_key" ON "DeliveryOutbox"("orderId");

-- CreateIndex
CREATE INDEX "DeliveryOutbox_status_createdAt_idx" ON "DeliveryOutbox"("status", "createdAt");

-- CreateIndex
CREATE INDEX "PaymentHold_subscriptionId_status_idx" ON "PaymentHold"("subscriptionId", "status");

