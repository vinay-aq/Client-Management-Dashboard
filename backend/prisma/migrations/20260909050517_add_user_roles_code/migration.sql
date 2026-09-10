/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `user_roles` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user_roles" ADD COLUMN     "code" VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "user_roles_code_key" ON "user_roles"("code");
