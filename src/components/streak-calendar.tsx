'use client'

import { Streak } from '@prisma/client'
import {
  addDays,
  addMonths,
  endOfMonth,
  format,
  isSameMonth,
  isSunday,
  isWithinInterval,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const StreakCalendar = ({ streaks }: { streaks: Streak[] }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentDate, setCurrentDate] = useState(new Date())

  // Find the earliest createdAt date
  const earliestDate = streaks.reduce((earliest, streak) => {
    const createdAt = new Date(streak.createdAt)
    return createdAt < earliest ? createdAt : earliest
  }, new Date())

  // Set the valid date range
  const validDateRange = {
    start: startOfMonth(earliestDate),
    end: endOfMonth(new Date()), // Current month end
  }

  const canNavigatePrevious = isWithinInterval(
    subMonths(currentDate, 1),
    validDateRange,
  )
  const canNavigateNext = isWithinInterval(
    addMonths(currentDate, 1),
    validDateRange,
  )

  const monthStart = startOfMonth(currentDate)
  const weekStart = startOfWeek(monthStart)
  const days: {
    date: Date
    isCurrentMonth: boolean
    isStreak: boolean
    isWithinValidRange: boolean
  }[] = []
  let day = weekStart

  // Process streak periods to determine active days
  const activeStreakDays = new Set()
  const processedDays = new Set()

  streaks.forEach((streak) => {
    const startDate = new Date(streak.createdAt)
    const endDate = new Date(streak.lastStreakDate)
    let currentDay = startDate

    while (currentDay <= endDate) {
      activeStreakDays.add(format(currentDay, 'yyyy-MM-dd'))
      processedDays.add(format(currentDay, 'yyyy-MM-dd'))
      currentDay = addDays(currentDay, 1)
    }
  })

  // Generate calendar days
  for (let i = 0; i < 35; i++) {
    const dayStr = format(day, 'yyyy-MM-dd')
    const isCurrentMonth = isSameMonth(day, monthStart)
    const isStreak = activeStreakDays.has(dayStr)
    // const isMissed =
    //   isCurrentMonth &&
    //   !isStreak &&
    //   day < new Date() &&
    //   processedDays.has(dayStr)
    const isWithinValidRange = isWithinInterval(day, validDateRange)

    days.push({
      date: day,
      isCurrentMonth,
      isStreak,
      // isMissed,
      isWithinValidRange,
    })

    day = addDays(day, 1)
  }

  const navigateMonth = (direction: 'previous' | 'next') => {
    setCurrentDate((current) => {
      const newDate =
        direction === 'previous' ? subMonths(current, 1) : addMonths(current, 1)

      // Ensure we stay within valid range
      if (!isWithinInterval(newDate, validDateRange)) {
        return current
      }

      return newDate
    })
  }

  return (
    <div className="max-w-md rounded-lg text-card-foreground">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateMonth('previous')}
          disabled={!canNavigatePrevious}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-md font-semibold">
          {format(monthStart, 'MMMM yyyy')}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateMonth('next')}
          disabled={!canNavigateNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="p-2 text-muted-foreground">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, idx) => (
          <div
            key={idx}
            className={cn(
              'aspect-square p-2',
              'flex items-center justify-center rounded-md text-sm',
              !day.isCurrentMonth && 'text-muted-foreground opacity-50',
              day.isStreak &&
                'bg-green-500/20 text-green-700 dark:text-green-400',
              // day.isMissed && 'bg-red-500/20 text-red-700 dark:text-red-400',
              !day.isWithinValidRange && 'opacity-25',
              isSunday(day.date) &&
                'bg-gray-100 text-muted-foreground dark:bg-gray-800 dark:text-muted-foreground',
            )}
          >
            {format(day.date, 'd')}
          </div>
        ))}
      </div>
    </div>
  )
}
