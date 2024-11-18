-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_userId_fkey";

-- AlterTable
ALTER TABLE "category" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
