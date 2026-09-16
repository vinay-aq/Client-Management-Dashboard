/*
  Warnings:

  - A unique constraint covering the columns `[refresh_token_hash]` on the table `refresh_tokens` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "ActivityEntityType" AS ENUM ('user', 'client');

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_refresh_token_hash_key" ON "refresh_tokens"("refresh_token_hash");
