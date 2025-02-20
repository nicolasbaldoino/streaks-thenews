import { Level } from '@prisma/client'
import { Crown, Sparkles, Star } from 'lucide-react'

import { LevelUp } from './level-up'

export const LevelStatus = ({
  levels,
  currentStreak,
}: {
  levels: Level[]
  currentStreak: number
}) => {
  const currentLevel = levels.find(
    ({ minStreakDays }) => minStreakDays <= currentStreak,
  )
  const nextLevel = levels
    .slice()
    .reverse()
    .find(({ minStreakDays }) => minStreakDays > currentStreak)

  const daysLeft = (nextLevel?.minStreakDays || 0) - currentStreak

  if (currentLevel && !nextLevel) {
    return (
      <div className="flex items-center gap-4">
        <Crown className="h-5 w-5 shrink-0 text-yellow-600" />
        <div>
          <p className="font-semibold">
            You&apos;re at Level {currentLevel?.name || 'Untitled'}
          </p>
          <p className="text-sm text-muted-foreground">
            You&apos;ve reached the highest level. Great job! 👑
          </p>
          <LevelUp currentLevel={currentLevel} nextLevel={nextLevel} />
        </div>
      </div>
    )
  }

  if (currentLevel && daysLeft === 1) {
    return (
      <div className="flex items-center gap-4">
        <Sparkles className="h-5 w-5 shrink-0" />
        <div>
          <p className="font-semibold">
            You&apos;re at Level {currentLevel?.name || 'Untitled'}
          </p>
          <p className="text-sm text-muted-foreground">
            Almost there! Just one more day to level up! ✨
          </p>
          <LevelUp currentLevel={currentLevel} nextLevel={nextLevel} />
        </div>
      </div>
    )
  }

  if (currentLevel) {
    return (
      <div className="flex items-center gap-4">
        <Star className="h-5 w-5 shrink-0" />
        <div>
          <p className="font-semibold">
            You&apos;re at Level {currentLevel?.name || 'Untitled'}
          </p>
          <p className="text-sm text-muted-foreground">
            Keep going! Only {daysLeft} days left to reach the next level! 🎯
          </p>
          <LevelUp currentLevel={currentLevel} nextLevel={nextLevel} />
        </div>
      </div>
    )
  }

  return null
}
