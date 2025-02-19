import { endOfWeek } from 'date-fns'

export const DEMO_STREAKS = [
  {
    id: 1,
    userId: 'test-mock',
    lastStreakDate: endOfWeek(new Date()),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]
