/*
  Warnings:

  - Added the required column `updatedAt` to the `Tender` table without a default value. This is not possible if the table is not empty.
  - Made the column `status` on table `Tender` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Tender" ADD COLUMN     "closingDate" TIMESTAMP(3),
ADD COLUMN     "description" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'Draft';
