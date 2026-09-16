/*
  Warnings:

  - You are about to drop the column `refresh_token_hash` on the `refresh_tokens` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[refreshTokenHash]` on the table `refresh_tokens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `refreshTokenHash` to the `refresh_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "refresh_tokens_refresh_token_hash_key";

-- AlterTable
ALTER TABLE "refresh_tokens" DROP COLUMN "refresh_token_hash",
ADD COLUMN     "refreshTokenHash" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "refresh_token_hash" ON "refresh_tokens"("refreshTokenHash");
