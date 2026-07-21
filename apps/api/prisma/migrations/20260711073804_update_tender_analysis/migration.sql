/*
  Warnings:

  - A unique constraint covering the columns `[tenderId]` on the table `TenderAnalysis` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `TenderAnalysis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TenderAnalysis" ADD COLUMN     "aiModel" TEXT,
ADD COLUMN     "analyzedAt" TIMESTAMP(3),
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "extractedText" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TenderAnalysis_tenderId_key" ON "TenderAnalysis"("tenderId");
