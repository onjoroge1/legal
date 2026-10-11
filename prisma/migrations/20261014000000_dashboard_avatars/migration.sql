CREATE TABLE "StoredAvatar" (
 "id" TEXT NOT NULL, "userId" TEXT NOT NULL, "pathname" TEXT NOT NULL,
 "status" TEXT NOT NULL DEFAULT 'pending', "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
 CONSTRAINT "StoredAvatar_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "StoredAvatar_pathname_key" ON "StoredAvatar"("pathname");
CREATE INDEX "StoredAvatar_userId_status_idx" ON "StoredAvatar"("userId", "status");
