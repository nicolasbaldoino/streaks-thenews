import { Streak } from '@prisma/client'
import {
  eachDayOfInterval,
  endOfWeek,
  isWithinInterval,
  startOfWeek,
} from 'date-fns'

export const CurrentGoal = ({ streaks }: { streaks: Streak[] }) => {
  // Get current week's date range
  const today = new Date()
  const weekStart = startOfWeek(today, { weekStartsOn: 0 })
  const weekEnd = endOfWeek(today, { weekStartsOn: 0 })

  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd })

  // Calculate completed days this week
  const completedDays = weekDays.filter((day) => {
    return streaks.some((streak) => {
      const streakStart = new Date(streak.createdAt)
      const streakEnd = new Date(streak.lastStreakDate)
      return isWithinInterval(day, { start: streakStart, end: streakEnd })
    })
  }).length

  // Calculate the percentage for the progress ring
  const total = 7 // Week has 7 days
  const percentage = (completedDays / total) * 100
  const radius = 35
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative flex aspect-square w-32 flex-col items-center justify-center rounded-xl bg-card">
      <svg
        className="absolute -rotate-90 transform"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
      >
        {/* Background ring */}
        <circle
          className="stroke-muted"
          strokeWidth="8"
          fill="none"
          r={radius}
          cx="50"
          cy="50"
        />
        {/* Progress ring */}
        <circle
          className="stroke-emerald-600 transition-all duration-500 ease-in-out"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          fill="none"
          r={radius}
          cx="50"
          cy="50"
        />
      </svg>
      <span className="z-10 text-2xl font-medium text-foreground">
        {completedDays}/{total}
      </span>
    </div>
  )
}
