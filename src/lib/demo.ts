import { endOfWeek, startOfWeek } from 'date-fns'

export const DEMO_STREAKS = [
  {
    id: 1,
    userId: 'test-mock',
    startStreakDate: startOfWeek(new Date()),
    lastStreakDate: endOfWeek(new Date()),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]
