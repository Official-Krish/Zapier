/*
  Warnings:

  - Added the required column `Image` to the `AvailableAction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Image` to the `AvailableTriggers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AvailableAction" ADD COLUMN     "Image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "AvailableTriggers" ADD COLUMN     "Image" TEXT NOT NULL;
