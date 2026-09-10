/*
  Warnings:

  - Made the column `code` on table `user_roles` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user_roles" ALTER COLUMN "code" SET NOT NULL;
