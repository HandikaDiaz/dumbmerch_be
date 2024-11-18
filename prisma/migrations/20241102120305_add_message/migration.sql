-- CreateTable
CREATE TABLE "message" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fromUserId" INTEGER NOT NULL,
    "toUserId" INTEGER NOT NULL,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
