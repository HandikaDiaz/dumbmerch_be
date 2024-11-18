/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Made the column `username` on table `profile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "profile" ALTER COLUMN "username" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "profile_username_key" ON "profile"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
