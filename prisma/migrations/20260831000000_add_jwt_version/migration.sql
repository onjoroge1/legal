-- Support immediate invalidation of all JWT sessions after a password reset.
ALTER TABLE "User" ADD COLUMN "jwtVersion" INTEGER NOT NULL DEFAULT 0;
