/*
  Warnings:

  - You are about to drop the column `code` on the `Category` table. All the data in the column will be lost.
  - Added the required column `slug` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;

-- Create a temporary table to store the slugs
CREATE TABLE "_temp_category_slugs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL
);

-- Create a table to store duplicate counts
CREATE TABLE "_temp_slug_counts" (
    "base_slug" TEXT NOT NULL PRIMARY KEY,
    "count" INTEGER NOT NULL DEFAULT 0
);

-- Generate base slugs
WITH base_slugs AS (
    SELECT "id",
           LOWER(
               REPLACE(
                   REPLACE(
                       REPLACE(name, ' & ', '-'),
                       ' ', '-'
                   ),
                   '--', '-'
               )
           ) as base_slug
    FROM "Category"
)
INSERT INTO "_temp_slug_counts" ("base_slug", "count")
SELECT base_slug, COUNT(*) - 1
FROM base_slugs
GROUP BY base_slug;

-- Insert slugs with numbers for duplicates
WITH numbered_categories AS (
    SELECT c.id,
           LOWER(
               REPLACE(
                   REPLACE(
                       REPLACE(c.name, ' & ', '-'),
                       ' ', '-'
                   ),
                   '--', '-'
               )
           ) as base_slug,
           ROW_NUMBER() OVER (PARTITION BY LOWER(
               REPLACE(
                   REPLACE(
                       REPLACE(c.name, ' & ', '-'),
                       ' ', '-'
                   ),
                   '--', '-'
               )
           ) ORDER BY c.id) - 1 as row_num
    FROM "Category" c
)
INSERT INTO "_temp_category_slugs" ("id", "slug")
SELECT id,
       CASE
           WHEN row_num > 0 THEN base_slug || '-' || row_num
           ELSE base_slug
       END as slug
FROM numbered_categories;

-- Create the new table with the slug column
CREATE TABLE "new_Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME
);

-- Insert data with the generated slugs
INSERT INTO "new_Category" ("id", "name", "slug", "description", "createdAt", "updatedAt", "deletedAt")
SELECT c.id, c.name, s.slug, c.description, c.createdAt, c.updatedAt, NULL
FROM "Category" c
JOIN "_temp_category_slugs" s ON c.id = s.id;

-- Drop the old tables
DROP TABLE "Category";
DROP TABLE "_temp_category_slugs";
DROP TABLE "_temp_slug_counts";
ALTER TABLE "new_Category" RENAME TO "Category";

-- Create unique index on slug (where not null)
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug") WHERE "slug" IS NOT NULL;

PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
