/*
  Warnings:

  - You are about to drop the `ImageProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ImageProduct" DROP CONSTRAINT "ImageProduct_productId_fkey";

-- DropTable
DROP TABLE "ImageProduct";

-- CreateTable
CREATE TABLE "imgproduct" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "imgproduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "imgprofile" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "profileId" INTEGER NOT NULL,

    CONSTRAINT "imgprofile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "imgproduct" ADD CONSTRAINT "imgproduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "imgprofile" ADD CONSTRAINT "imgprofile_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
