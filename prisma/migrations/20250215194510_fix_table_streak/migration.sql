/*
  Warnings:

  - A unique constraint covering the columns `[userId,date]` on the table `streaks` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "streaks_userId_date_idx";

-- CreateIndex
CREATE UNIQUE INDEX "streaks_userId_date_key" ON "streaks"("userId", "date");
