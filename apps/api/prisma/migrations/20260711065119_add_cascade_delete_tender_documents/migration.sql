-- DropForeignKey
ALTER TABLE "public"."TenderDocument" DROP CONSTRAINT "TenderDocument_tenderId_fkey";

-- AddForeignKey
ALTER TABLE "TenderDocument" ADD CONSTRAINT "TenderDocument_tenderId_fkey" FOREIGN KEY ("tenderId") REFERENCES "Tender"("id") ON DELETE CASCADE ON UPDATE CASCADE;
