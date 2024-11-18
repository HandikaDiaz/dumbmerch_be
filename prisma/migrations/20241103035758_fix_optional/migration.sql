/*
  Warnings:

  - Made the column `cartId` on table `cart_item` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "cart_item" ALTER COLUMN "cartId" SET NOT NULL;
