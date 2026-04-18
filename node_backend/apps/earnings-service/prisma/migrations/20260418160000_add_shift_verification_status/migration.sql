-- CreateEnum: shift-level verification status (separate from the verifier decision status)
CREATE TYPE "earnings"."ShiftVerificationStatus" AS ENUM (
  'self_attested',
  'pending_review',
  'verified',
  'discrepancy_flagged',
  'unverifiable'
);

-- AlterTable: add verificationStatus column with default
ALTER TABLE "earnings"."shifts"
  ADD COLUMN "verificationStatus" "earnings"."ShiftVerificationStatus" NOT NULL DEFAULT 'self_attested';
