-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_userId_fkey";

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
