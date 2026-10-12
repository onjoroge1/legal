CREATE TABLE "SupportTicket" ("id" TEXT NOT NULL, "userId" TEXT, "accessHash" TEXT NOT NULL, "topic" TEXT NOT NULL, "message" TEXT NOT NULL, "response" TEXT, "status" TEXT NOT NULL DEFAULT 'open', "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "answeredAt" TIMESTAMP(3), "expiresAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "SupportTicket_pkey" PRIMARY KEY ("id"));
CREATE UNIQUE INDEX "SupportTicket_accessHash_key" ON "SupportTicket"("accessHash");
CREATE INDEX "SupportTicket_status_createdAt_idx" ON "SupportTicket"("status", "createdAt");
CREATE INDEX "SupportTicket_userId_idx" ON "SupportTicket"("userId");
CREATE INDEX "SupportTicket_expiresAt_idx" ON "SupportTicket"("expiresAt");
