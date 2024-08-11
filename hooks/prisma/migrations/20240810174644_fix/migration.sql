/*
  Warnings:

  - Made the column `userId` on table `Zap` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Zap" ALTER COLUMN "userId" SET NOT NULL;
