/*
  Warnings:

  - You are about to drop the column `min_streak` on the `levels` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `streaks` table. All the data in the column will be lost.
  - Added the required column `last_streak_date` to the `streaks` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "levels_min_streak_key";

-- DropIndex
DROP INDEX "streaks_userId_date_key";

-- AlterTable
ALTER TABLE "levels" DROP COLUMN "min_streak",
ADD COLUMN     "min_streak_days" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "streaks" DROP COLUMN "date",
ADD COLUMN     "last_streak_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "maxStreak" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "streaks_last_streak_date_idx" ON "streaks"("last_streak_date");
