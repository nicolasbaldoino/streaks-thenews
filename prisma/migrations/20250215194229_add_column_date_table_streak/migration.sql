/*
  Warnings:

  - Added the required column `date` to the `streaks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "streaks" ADD COLUMN     "date" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "streaks_userId_date_idx" ON "streaks"("userId", "date");
