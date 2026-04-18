-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "audit";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "earnings";

-- CreateEnum
CREATE TYPE "earnings"."ShiftSource" AS ENUM ('manual', 'csv', 'ocr');

-- CreateEnum
CREATE TYPE "earnings"."VerificationStatus" AS ENUM ('pending', 'confirmed', 'discrepancy', 'unverifiable');

-- CreateEnum
CREATE TYPE "earnings"."ImportStatus" AS ENUM ('queued', 'processing', 'done', 'failed');

-- CreateTable
CREATE TABLE "earnings"."platforms" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "logoUrl" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "platforms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "earnings"."city_zones" (
    "id" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zone" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "city_zones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "earnings"."shifts" (
    "id" TEXT NOT NULL,
    "workerId" TEXT NOT NULL,
    "platformId" TEXT NOT NULL,
    "cityZoneId" TEXT,
    "shiftDate" DATE NOT NULL,
    "hoursWorked" DECIMAL(6,2) NOT NULL,
    "grossPay" DECIMAL(12,2) NOT NULL,
    "deductions" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "netPay" DECIMAL(12,2) NOT NULL,
    "currency" CHAR(3) NOT NULL DEFAULT 'PKR',
    "source" "earnings"."ShiftSource" NOT NULL DEFAULT 'manual',
    "notes" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shifts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "earnings"."screenshots" (
    "id" TEXT NOT NULL,
    "shiftId" TEXT NOT NULL,
    "storageKey" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL DEFAULT 'image/jpeg',
    "sizeBytes" INTEGER NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "screenshots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "earnings"."verifications" (
    "id" TEXT NOT NULL,
    "shiftId" TEXT NOT NULL,
    "verifierId" TEXT NOT NULL,
    "status" "earnings"."VerificationStatus" NOT NULL DEFAULT 'pending',
    "notes" TEXT,
    "decidedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "verifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "earnings"."anomaly_flags" (
    "id" TEXT NOT NULL,
    "shiftId" TEXT NOT NULL,
    "flaggedBy" TEXT NOT NULL DEFAULT 'anomaly-service',
    "reason" TEXT NOT NULL,
    "score" DECIMAL(5,4),
    "resolvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "anomaly_flags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "earnings"."csv_imports" (
    "id" TEXT NOT NULL,
    "workerId" TEXT NOT NULL,
    "storageKey" TEXT NOT NULL,
    "status" "earnings"."ImportStatus" NOT NULL DEFAULT 'queued',
    "rowsTotal" INTEGER NOT NULL DEFAULT 0,
    "rowsOk" INTEGER NOT NULL DEFAULT 0,
    "rowsFailed" INTEGER NOT NULL DEFAULT 0,
    "errorLog" JSONB,
    "jobId" TEXT,
    "startedAt" TIMESTAMP(3),
    "finishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "csv_imports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "earnings"."certificates" (
    "id" TEXT NOT NULL,
    "workerId" TEXT NOT NULL,
    "periodStart" DATE NOT NULL,
    "periodEnd" DATE NOT NULL,
    "storageKey" TEXT NOT NULL,
    "shareToken" TEXT NOT NULL,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revokedAt" TIMESTAMP(3),

    CONSTRAINT "certificates_pkey" PRIMARY KEY ("id")
);

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

-- CreateIndex
CREATE UNIQUE INDEX "platforms_name_key" ON "earnings"."platforms"("name");

-- CreateIndex
CREATE UNIQUE INDEX "platforms_slug_key" ON "earnings"."platforms"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "city_zones_city_zone_key" ON "earnings"."city_zones"("city", "zone");

-- CreateIndex
CREATE INDEX "shifts_workerId_idx" ON "earnings"."shifts"("workerId");

-- CreateIndex
CREATE INDEX "shifts_shiftDate_idx" ON "earnings"."shifts"("shiftDate");

-- CreateIndex
CREATE INDEX "shifts_platformId_idx" ON "earnings"."shifts"("platformId");

-- CreateIndex
CREATE UNIQUE INDEX "screenshots_storageKey_key" ON "earnings"."screenshots"("storageKey");

-- CreateIndex
CREATE INDEX "screenshots_shiftId_idx" ON "earnings"."screenshots"("shiftId");

-- CreateIndex
CREATE INDEX "verifications_shiftId_idx" ON "earnings"."verifications"("shiftId");

-- CreateIndex
CREATE INDEX "anomaly_flags_shiftId_idx" ON "earnings"."anomaly_flags"("shiftId");

-- CreateIndex
CREATE INDEX "csv_imports_workerId_idx" ON "earnings"."csv_imports"("workerId");

-- CreateIndex
CREATE UNIQUE INDEX "certificates_storageKey_key" ON "earnings"."certificates"("storageKey");

-- CreateIndex
CREATE UNIQUE INDEX "certificates_shareToken_key" ON "earnings"."certificates"("shareToken");

-- CreateIndex
CREATE INDEX "certificates_workerId_idx" ON "earnings"."certificates"("workerId");

-- AddForeignKey
ALTER TABLE "earnings"."shifts" ADD CONSTRAINT "shifts_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "earnings"."platforms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "earnings"."shifts" ADD CONSTRAINT "shifts_cityZoneId_fkey" FOREIGN KEY ("cityZoneId") REFERENCES "earnings"."city_zones"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "earnings"."screenshots" ADD CONSTRAINT "screenshots_shiftId_fkey" FOREIGN KEY ("shiftId") REFERENCES "earnings"."shifts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "earnings"."verifications" ADD CONSTRAINT "verifications_shiftId_fkey" FOREIGN KEY ("shiftId") REFERENCES "earnings"."shifts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "earnings"."anomaly_flags" ADD CONSTRAINT "anomaly_flags_shiftId_fkey" FOREIGN KEY ("shiftId") REFERENCES "earnings"."shifts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
