/*
  Warnings:

  - Made the column `totalAmount` on table `cart` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "cart" ALTER COLUMN "totalAmount" SET NOT NULL,
ALTER COLUMN "totalAmount" SET DEFAULT 0,
ALTER COLUMN "totalAmount" SET DATA TYPE DOUBLE PRECISION;
