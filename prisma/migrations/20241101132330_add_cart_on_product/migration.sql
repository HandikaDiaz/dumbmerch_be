-- AlterTable
ALTER TABLE "cart" ADD COLUMN     "productId" INTEGER;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
