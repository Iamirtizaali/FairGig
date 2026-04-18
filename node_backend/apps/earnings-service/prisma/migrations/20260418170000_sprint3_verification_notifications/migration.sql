-- Sprint 3: add screenshotId to verifications, errorCsvKey to csv_imports,
--           and create notifications table

ALTER TABLE "earnings"."verifications"
  ADD COLUMN IF NOT EXISTS "screenshotId" TEXT;

ALTER TABLE "earnings"."csv_imports"
  ADD COLUMN IF NOT EXISTS "errorCsvKey" TEXT;

CREATE TABLE IF NOT EXISTS "earnings"."notifications" (
  "id"        TEXT        NOT NULL,
  "userId"    TEXT        NOT NULL,
  "title"     TEXT        NOT NULL,
  "body"      TEXT        NOT NULL,
  "link"      TEXT,
  "readAt"    TIMESTAMPTZ,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "notifications_userId_idx"
  ON "earnings"."notifications" ("userId");
