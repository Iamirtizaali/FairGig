-- Sprint 4: create/update certificates table
-- Replaces storageKey with expiresAt, uses uuid() for shareToken

CREATE TABLE IF NOT EXISTS "earnings"."certificates" (
  "id"          TEXT        NOT NULL,
  "workerId"    TEXT        NOT NULL,
  "periodStart" DATE        NOT NULL,
  "periodEnd"   DATE        NOT NULL,
  "shareToken"  TEXT        NOT NULL DEFAULT gen_random_uuid()::text,
  "expiresAt"   TIMESTAMPTZ NOT NULL,
  "revokedAt"   TIMESTAMPTZ,
  "issuedAt"    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT "certificates_pkey" PRIMARY KEY ("id")
);

-- If table already existed with old schema, add missing columns safely
ALTER TABLE "earnings"."certificates"
  ADD COLUMN IF NOT EXISTS "expiresAt" TIMESTAMPTZ NOT NULL DEFAULT NOW();

ALTER TABLE "earnings"."certificates"
  DROP COLUMN IF EXISTS "storageKey";

CREATE UNIQUE INDEX IF NOT EXISTS "certificates_shareToken_key"
  ON "earnings"."certificates" ("shareToken");

CREATE INDEX IF NOT EXISTS "certificates_workerId_idx"
  ON "earnings"."certificates" ("workerId");

CREATE INDEX IF NOT EXISTS "certificates_shareToken_idx"
  ON "earnings"."certificates" ("shareToken");
