/*
  Warnings:

  - You are about to drop the column `maxStreak` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "maxStreak",
ADD COLUMN     "highest_streak" INTEGER NOT NULL DEFAULT 1;
