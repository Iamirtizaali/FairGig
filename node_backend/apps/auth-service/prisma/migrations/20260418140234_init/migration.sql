-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "audit";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth";

-- CreateEnum
CREATE TYPE "auth"."Role" AS ENUM ('worker', 'verifier', 'advocate', 'admin');

-- CreateEnum
CREATE TYPE "auth"."Language" AS ENUM ('en', 'ur');

-- CreateEnum
CREATE TYPE "auth"."UserStatus" AS ENUM ('active', 'frozen', 'deleted');

-- CreateEnum
CREATE TYPE "auth"."RequestStatus" AS ENUM ('pending', 'approved', 'rejected');

-- CreateTable
CREATE TABLE "auth"."users" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "password_hash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "auth"."Role" NOT NULL DEFAULT 'worker',
    "language" "auth"."Language" NOT NULL DEFAULT 'en',
    "status" "auth"."UserStatus" NOT NULL DEFAULT 'active',
    "city_zone_id" UUID,
    "categories" TEXT[],
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."refresh_tokens" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "token_hash" TEXT NOT NULL,
    "expires_at" TIMESTAMPTZ NOT NULL,
    "revoked_at" TIMESTAMPTZ,
    "replaced_by" UUID,
    "user_agent" TEXT,
    "ip" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."role_requests" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "requested_role" "auth"."Role" NOT NULL,
    "reason" TEXT,
    "status" "auth"."RequestStatus" NOT NULL DEFAULT 'pending',
    "decided_by" UUID,
    "decided_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "role_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."password_reset_tokens" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "token_hash" TEXT NOT NULL,
    "expires_at" TIMESTAMPTZ NOT NULL,
    "used_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "password_reset_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit"."events" (
    "id" UUID NOT NULL,
    "actor_id" UUID,
    "actor_role" TEXT,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entity_id" TEXT NOT NULL,
    "diff" JSONB NOT NULL DEFAULT '{}',
    "ip" TEXT,
    "ua" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "auth"."users"("email");

-- CreateIndex
CREATE INDEX "idx_users_role" ON "auth"."users"("role");

-- CreateIndex
CREATE INDEX "idx_users_zone" ON "auth"."users"("city_zone_id");

-- CreateIndex
CREATE INDEX "idx_refresh_tokens_user" ON "auth"."refresh_tokens"("user_id");

-- CreateIndex
CREATE INDEX "idx_refresh_tokens_hash" ON "auth"."refresh_tokens"("token_hash");

-- CreateIndex
CREATE INDEX "idx_role_requests_status" ON "auth"."role_requests"("status");

-- CreateIndex
CREATE INDEX "idx_pwd_reset_hash" ON "auth"."password_reset_tokens"("token_hash");

-- CreateIndex
CREATE INDEX "idx_audit_entity" ON "audit"."events"("entity", "entity_id");

-- CreateIndex
CREATE INDEX "idx_audit_actor" ON "audit"."events"("actor_id");

-- AddForeignKey
ALTER TABLE "auth"."refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth"."role_requests" ADD CONSTRAINT "role_requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth"."password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
