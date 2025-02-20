import { Streak } from '@prisma/client'
import { differenceInDays, isMonday, isToday, isYesterday } from 'date-fns'
import { Award, Flame, Trophy } from 'lucide-react'

import { dailyStreaks } from '@/lib/daily-streaks'

export const StreakStatus = ({ streaks }: { streaks: Streak[] }) => {
  const today = new Date()
  const diffDays = differenceInDays(today, streaks[0]?.lastStreakDate)

  const highestStreak = streaks.reduce((longest, streak) => {
    const streakLength = dailyStreaks(
      new Date(streak.lastStreakDate),
      new Date(streak.startStreakDate),
    )
    return streakLength > longest ? streakLength : longest
  }, 0)

  const currentStreak = dailyStreaks(
    new Date(streaks[0]?.lastStreakDate),
    new Date(streaks[0]?.startStreakDate),
  )

  if (currentStreak > highestStreak) {
    return (
      <div className="flex items-center gap-4 text-emerald-600">
        <Trophy className="h-5 w-5 shrink-0" />
        <div>
          <p className="font-semibold">New record! 🎉</p>
          <p className="text-sm text-muted-foreground">
            Amazing! You&apos;ve reached {currentStreak} consecutive days! Keep
            it up!
          </p>
        </div>
      </div>
    )
  }

  if (isToday(streaks[0]?.lastStreakDate) && currentStreak > 0) {
    return (
      <div className="flex items-center gap-4">
        <Flame className="h-5 w-5 shrink-0" />
        <div>
          <p className="font-semibold">Streak maintained! 🔥</p>
          <p className="text-sm text-muted-foreground">
            Great job! You&apos;ve been going for {currentStreak} consecutive
            days. Stay focused!
          </p>
        </div>
      </div>
    )
  }

  if (isYesterday(streaks[0]?.lastStreakDate) && currentStreak > 0) {
    return (
      <div className="flex items-center gap-4">
        <Flame className="h-5 w-5 shrink-0" />
        <div>
          <p className="font-semibold">You&apos;re still on track! 🔥</p>
          <p className="text-sm text-muted-foreground">
            Almost missed it, but you&apos;re still in the game with{' '}
            {currentStreak} days straight! Stay consistent and keep pushing
            forward!
          </p>
        </div>
      </div>
    )
  }

  const previousStreak = dailyStreaks(
    new Date(streaks[1]?.lastStreakDate),
    new Date(streaks[1]?.startStreakDate),
  )

  if (
    previousStreak > 1 &&
    (diffDays > 1 || (isMonday(today) && diffDays > 2))
  ) {
    return (
      <div className="flex items-center gap-4">
        <Flame className="h-5 w-5 shrink-0 text-muted-foreground" />
        <div>
          <p className="font-semibold">Don&apos;t give up!</p>
          <p className="text-sm text-muted-foreground">
            Your {previousStreak}-day streak ended, but today is a new day to
            start again!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <Award className="h-5 w-5 shrink-0" />
      <div>
        <p className="font-semibold">Start your streak!</p>
        <p className="text-sm text-muted-foreground">
          Complete your first activity today and begin your journey!
        </p>
      </div>
    </div>
  )
}
