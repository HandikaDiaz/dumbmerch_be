-- DropForeignKey
ALTER TABLE "imgproduct" DROP CONSTRAINT "imgproduct_productId_fkey";

-- AddForeignKey
ALTER TABLE "imgproduct" ADD CONSTRAINT "imgproduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
