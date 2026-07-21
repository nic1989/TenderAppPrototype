/*
  Warnings:

  - Added the required column `orgFileName` to the `TenderDocument` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TenderDocument" ADD COLUMN     "orgFileName" TEXT NOT NULL;
