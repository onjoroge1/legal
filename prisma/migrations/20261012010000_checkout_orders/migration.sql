-- CreateTable
CREATE TABLE "CheckoutOrder" (
    "id" TEXT NOT NULL,
    "activeKey" TEXT,
    "ownerId" TEXT,
    "draftId" TEXT,
    "versionId" TEXT,
    "contentHash" TEXT,
    "guestEmail" TEXT,
    "kind" TEXT NOT NULL,
    "priceId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "customerId" TEXT,
    "sessionId" TEXT,
    "paymentIntentId" TEXT,
    "subscriptionId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "disclaimerVersion" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CheckoutOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CheckoutOrder_activeKey_key" ON "CheckoutOrder"("activeKey");

-- CreateIndex
CREATE UNIQUE INDEX "CheckoutOrder_sessionId_key" ON "CheckoutOrder"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "CheckoutOrder_paymentIntentId_key" ON "CheckoutOrder"("paymentIntentId");

-- CreateIndex
CREATE INDEX "CheckoutOrder_status_createdAt_idx" ON "CheckoutOrder"("status", "createdAt");

-- CreateIndex
CREATE INDEX "CheckoutOrder_subscriptionId_idx" ON "CheckoutOrder"("subscriptionId");

