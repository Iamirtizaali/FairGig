-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "audit";

-- DropForeignKey
ALTER TABLE "grievance"."comments" DROP CONSTRAINT "comments_complaintId_fkey";

-- DropForeignKey
ALTER TABLE "grievance"."complaint_tags" DROP CONSTRAINT "complaint_tags_complaintId_fkey";

-- DropForeignKey
ALTER TABLE "grievance"."complaints" DROP CONSTRAINT "complaints_clusterId_fkey";

-- DropForeignKey
ALTER TABLE "grievance"."reports" DROP CONSTRAINT "reports_complaintId_fkey";

-- AlterTable
ALTER TABLE "grievance"."comments" ALTER COLUMN "deletedAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "grievance"."complaint_clusters" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "grievance"."complaint_tags" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "grievance"."complaints" ALTER COLUMN "deletedAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "grievance"."reports" ALTER COLUMN "resolvedAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3);

-- CreateTable
CREATE TABLE "audit"."events" (
    "id" TEXT NOT NULL,
    "actorId" TEXT,
    "actorRole" TEXT,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "diff" JSONB NOT NULL DEFAULT '{}',
    "ip" TEXT,
    "ua" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "grievance"."complaints" ADD CONSTRAINT "complaints_clusterId_fkey" FOREIGN KEY ("clusterId") REFERENCES "grievance"."complaint_clusters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grievance"."complaint_tags" ADD CONSTRAINT "complaint_tags_complaintId_fkey" FOREIGN KEY ("complaintId") REFERENCES "grievance"."complaints"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grievance"."comments" ADD CONSTRAINT "comments_complaintId_fkey" FOREIGN KEY ("complaintId") REFERENCES "grievance"."complaints"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grievance"."reports" ADD CONSTRAINT "reports_complaintId_fkey" FOREIGN KEY ("complaintId") REFERENCES "grievance"."complaints"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
