import { eachDayOfInterval, isSunday } from 'date-fns'

export const streakDays = (start: Date, end: Date) => {
  if (start < end) throw new Error('End date must be after start date')

  const days = eachDayOfInterval({ start, end })
  const nonSundayDays = days.filter((day) => !isSunday(day))

  return nonSundayDays.length
}
