-- Sprint 4: full grievance schema

CREATE SCHEMA IF NOT EXISTS "grievance";

CREATE TYPE "grievance"."ComplaintStatus" AS ENUM (
  'open', 'under_review', 'escalated', 'resolved', 'hidden'
);

CREATE TYPE "grievance"."ComplaintVisibility" AS ENUM (
  'public_anon', 'internal'
);

CREATE TABLE IF NOT EXISTS "grievance"."complaint_clusters" (
  "id"          TEXT        NOT NULL,
  "title"       TEXT        NOT NULL,
  "description" TEXT,
  "createdBy"   TEXT        NOT NULL,
  "createdAt"   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt"   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT "complaint_clusters_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "grievance"."complaints" (
  "id"          TEXT                            NOT NULL,
  "authorId"    TEXT                            NOT NULL,
  "platform"    TEXT                            NOT NULL,
  "category"    TEXT                            NOT NULL,
  "title"       TEXT                            NOT NULL,
  "description" TEXT                            NOT NULL,
  "visibility"  "grievance"."ComplaintVisibility" NOT NULL DEFAULT 'public_anon',
  "status"      "grievance"."ComplaintStatus"    NOT NULL DEFAULT 'open',
  "clusterId"   TEXT,
  "deletedAt"   TIMESTAMPTZ,
  "createdAt"   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt"   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT "complaints_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "complaints_clusterId_fkey" FOREIGN KEY ("clusterId")
    REFERENCES "grievance"."complaint_clusters" ("id") ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS "complaints_authorId_idx"   ON "grievance"."complaints" ("authorId");
CREATE INDEX IF NOT EXISTS "complaints_status_idx"     ON "grievance"."complaints" ("status");
CREATE INDEX IF NOT EXISTS "complaints_platform_idx"   ON "grievance"."complaints" ("platform");
CREATE INDEX IF NOT EXISTS "complaints_clusterId_idx"  ON "grievance"."complaints" ("clusterId");

CREATE TABLE IF NOT EXISTS "grievance"."complaint_tags" (
  "id"          TEXT        NOT NULL,
  "complaintId" TEXT        NOT NULL,
  "label"       TEXT        NOT NULL,
  "addedBy"     TEXT        NOT NULL,
  "createdAt"   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT "complaint_tags_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "complaint_tags_complaintId_fkey" FOREIGN KEY ("complaintId")
    REFERENCES "grievance"."complaints" ("id") ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS "complaint_tags_complaintId_idx" ON "grievance"."complaint_tags" ("complaintId");

CREATE TABLE IF NOT EXISTS "grievance"."comments" (
  "id"          TEXT        NOT NULL,
  "complaintId" TEXT        NOT NULL,
  "authorId"    TEXT        NOT NULL,
  "body"        TEXT        NOT NULL,
  "deletedAt"   TIMESTAMPTZ,
  "createdAt"   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT "comments_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "comments_complaintId_fkey" FOREIGN KEY ("complaintId")
    REFERENCES "grievance"."complaints" ("id") ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS "comments_complaintId_idx" ON "grievance"."comments" ("complaintId");

CREATE TABLE IF NOT EXISTS "grievance"."reports" (
  "id"          TEXT        NOT NULL,
  "complaintId" TEXT        NOT NULL,
  "reporterId"  TEXT        NOT NULL,
  "reason"      TEXT        NOT NULL,
  "resolvedAt"  TIMESTAMPTZ,
  "createdAt"   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT "reports_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "reports_complaintId_fkey" FOREIGN KEY ("complaintId")
    REFERENCES "grievance"."complaints" ("id") ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS "reports_complaintId_idx" ON "grievance"."reports" ("complaintId");
