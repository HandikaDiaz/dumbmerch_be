/*
  Warnings:

  - You are about to drop the column `fromUserId` on the `message` table. All the data in the column will be lost.
  - You are about to drop the column `toUserId` on the `message` table. All the data in the column will be lost.
  - Added the required column `conversationId` to the `message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_fromUserId_fkey";

-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_toUserId_fkey";

-- AlterTable
ALTER TABLE "message" DROP COLUMN "fromUserId",
DROP COLUMN "toUserId",
ADD COLUMN     "conversationId" INTEGER NOT NULL,
ADD COLUMN     "senderId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "conversation" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "adminId" INTEGER NOT NULL,

    CONSTRAINT "conversation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "conversation_userId_key" ON "conversation"("userId");

-- AddForeignKey
ALTER TABLE "conversation" ADD CONSTRAINT "conversation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversation" ADD CONSTRAINT "conversation_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
