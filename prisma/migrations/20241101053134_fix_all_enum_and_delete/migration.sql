/*
  Warnings:

  - The values [Male,Female] on the enum `Gender` will be removed. If these variants are still used in the database, this will fail.
  - The values [admin,member] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `CartItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Gender_new" AS ENUM ('MALE', 'FEMALE');
ALTER TABLE "profile" ALTER COLUMN "gender" TYPE "Gender_new" USING ("gender"::text::"Gender_new");
ALTER TYPE "Gender" RENAME TO "Gender_old";
ALTER TYPE "Gender_new" RENAME TO "Gender";
DROP TYPE "Gender_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'MEMBER');
ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "user" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'MEMBER';
COMMIT;

-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_cartId_fkey";

-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_userId_fkey";

-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_cartId_fkey";

-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_userId_fkey";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'MEMBER';

-- DropTable
DROP TABLE "CartItem";

-- CreateTable
CREATE TABLE "cart_item" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "productId" INTEGER NOT NULL,
    "cartId" INTEGER,

    CONSTRAINT "cart_item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;
