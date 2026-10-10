-- Additive recovery of models previously created outside migration history.
-- Existing installations MUST follow docs/launch/03-database-baseline.md first.
BEGIN;

ALTER TABLE "DocumentTemplate" ADD COLUMN "slug" TEXT;
ALTER TABLE "DocumentTemplate" ADD COLUMN "seoTitle" TEXT;
ALTER TABLE "DocumentTemplate" ADD COLUMN "seoDescription" TEXT;
ALTER TABLE "DocumentTemplate" ADD COLUMN "seoKeywords" TEXT;
ALTER TABLE "DocumentTemplate" ADD COLUMN "featuredImage" TEXT;
ALTER TABLE "DocumentTemplate" ADD COLUMN "publicUrl" TEXT;
ALTER TABLE "DocumentTemplate" ADD COLUMN "purchaseUrl" TEXT;
ALTER TABLE "DocumentTemplate" ADD COLUMN "blogPostId" TEXT;


CREATE TABLE "BlogPost" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT,
    "content" TEXT NOT NULL,
    "featuredImage" TEXT,
    "authorId" TEXT NOT NULL,
    "templateId" TEXT,
    "categoryId" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "seoKeywords" TEXT,
    "views" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "link" TEXT,
    "metadata" JSONB,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "TeamMember" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "TeamInvitation" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "invitedBy" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "acceptedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamInvitation_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "LawyerListing" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "tagline" TEXT,
    "bio" TEXT NOT NULL,
    "firmName" TEXT,
    "photoUrl" TEXT,
    "websiteUrl" TEXT,
    "city" TEXT,
    "stateAbbr" TEXT,
    "practiceAreas" TEXT[],
    "licensedStates" TEXT[],
    "yearsExperience" INTEGER,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "tier" TEXT NOT NULL DEFAULT 'basic',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LawyerListing_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "VerifiedFact" (
    "id" TEXT NOT NULL,
    "jurisdiction" TEXT NOT NULL,
    "jurisdictionType" TEXT NOT NULL,
    "documentSlug" TEXT NOT NULL,
    "factType" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "citation" TEXT,
    "source" TEXT NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "rejectionReason" TEXT,
    "reviewedById" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "contentHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerifiedFact_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "IngestSchedule" (
    "id" TEXT NOT NULL,
    "jurisdiction" TEXT NOT NULL,
    "jurisdictionType" TEXT NOT NULL,
    "documentSlug" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "sourceConfig" JSONB NOT NULL,
    "lastIngestedAt" TIMESTAMP(3),
    "lastResult" JSONB,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IngestSchedule_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "DocumentTemplate_slug_key" ON "DocumentTemplate"("slug");

CREATE UNIQUE INDEX "DocumentTemplate_blogPostId_key" ON "DocumentTemplate"("blogPostId");

CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");

CREATE UNIQUE INDEX "BlogPost_templateId_key" ON "BlogPost"("templateId");

CREATE INDEX "BlogPost_slug_idx" ON "BlogPost"("slug");

CREATE INDEX "BlogPost_published_idx" ON "BlogPost"("published");

CREATE INDEX "BlogPost_templateId_idx" ON "BlogPost"("templateId");

CREATE INDEX "BlogPost_categoryId_idx" ON "BlogPost"("categoryId");

CREATE INDEX "Notification_userId_idx" ON "Notification"("userId");

CREATE INDEX "Notification_read_idx" ON "Notification"("read");

CREATE INDEX "Notification_createdAt_idx" ON "Notification"("createdAt");

CREATE INDEX "Team_ownerId_idx" ON "Team"("ownerId");

CREATE INDEX "TeamMember_teamId_idx" ON "TeamMember"("teamId");

CREATE INDEX "TeamMember_userId_idx" ON "TeamMember"("userId");

CREATE UNIQUE INDEX "TeamMember_teamId_userId_key" ON "TeamMember"("teamId", "userId");

CREATE UNIQUE INDEX "TeamInvitation_token_key" ON "TeamInvitation"("token");

CREATE INDEX "TeamInvitation_teamId_idx" ON "TeamInvitation"("teamId");

CREATE INDEX "TeamInvitation_email_idx" ON "TeamInvitation"("email");

CREATE INDEX "TeamInvitation_token_idx" ON "TeamInvitation"("token");

CREATE INDEX "TeamInvitation_status_idx" ON "TeamInvitation"("status");

CREATE UNIQUE INDEX "TeamInvitation_teamId_email_key" ON "TeamInvitation"("teamId", "email");

CREATE UNIQUE INDEX "LawyerListing_slug_key" ON "LawyerListing"("slug");

CREATE UNIQUE INDEX "LawyerListing_email_key" ON "LawyerListing"("email");

CREATE INDEX "LawyerListing_active_idx" ON "LawyerListing"("active");

CREATE INDEX "LawyerListing_stateAbbr_idx" ON "LawyerListing"("stateAbbr");

CREATE INDEX "LawyerListing_featured_idx" ON "LawyerListing"("featured");

CREATE INDEX "LawyerListing_tier_idx" ON "LawyerListing"("tier");

CREATE INDEX "VerifiedFact_jurisdiction_documentSlug_status_idx" ON "VerifiedFact"("jurisdiction", "documentSlug", "status");

CREATE INDEX "VerifiedFact_status_idx" ON "VerifiedFact"("status");

CREATE UNIQUE INDEX "VerifiedFact_jurisdiction_documentSlug_contentHash_key" ON "VerifiedFact"("jurisdiction", "documentSlug", "contentHash");

CREATE INDEX "IngestSchedule_enabled_lastIngestedAt_idx" ON "IngestSchedule"("enabled", "lastIngestedAt");

CREATE UNIQUE INDEX "IngestSchedule_jurisdiction_documentSlug_source_key" ON "IngestSchedule"("jurisdiction", "documentSlug", "source");

ALTER TABLE "BlogPost" ADD CONSTRAINT "BlogPost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "BlogPost" ADD CONSTRAINT "BlogPost_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "DocumentTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "BlogPost" ADD CONSTRAINT "BlogPost_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Team" ADD CONSTRAINT "Team_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "TeamInvitation" ADD CONSTRAINT "TeamInvitation_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "TeamInvitation" ADD CONSTRAINT "TeamInvitation_invitedBy_fkey" FOREIGN KEY ("invitedBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "VerifiedFact" ADD CONSTRAINT "VerifiedFact_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT;
