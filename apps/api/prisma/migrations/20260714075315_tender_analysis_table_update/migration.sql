-- AlterTable
ALTER TABLE "TenderAnalysis" ADD COLUMN     "financialRequirements" JSONB,
ADD COLUMN     "importantDates" JSONB,
ADD COLUMN     "isLatest" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "processingTime" DOUBLE PRECISION,
ADD COLUMN     "technicalRequirements" JSONB,
ADD COLUMN     "tokensUsed" INTEGER,
ALTER COLUMN "summary" SET DATA TYPE TEXT;
