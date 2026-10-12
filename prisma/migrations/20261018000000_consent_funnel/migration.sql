CREATE TABLE "FunnelJourney" ("id" TEXT NOT NULL, "userId" TEXT, "source" TEXT NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "expiresAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "FunnelJourney_pkey" PRIMARY KEY ("id"));
CREATE INDEX "FunnelJourney_userId_idx" ON "FunnelJourney"("userId");
CREATE INDEX "FunnelJourney_expiresAt_idx" ON "FunnelJourney"("expiresAt");
CREATE TABLE "FunnelEvent" ("journeyId" TEXT NOT NULL, "stage" TEXT NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "FunnelEvent_pkey" PRIMARY KEY ("journeyId", "stage"));
ALTER TABLE "FunnelEvent" ADD CONSTRAINT "FunnelEvent_journeyId_fkey" FOREIGN KEY ("journeyId") REFERENCES "FunnelJourney"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CheckoutOrder" ADD COLUMN "funnelJourneyId" TEXT;
ALTER TABLE "CheckoutOrder" ADD CONSTRAINT "CheckoutOrder_funnelJourneyId_fkey" FOREIGN KEY ("funnelJourneyId") REFERENCES "FunnelJourney"("id") ON DELETE SET NULL ON UPDATE CASCADE;
