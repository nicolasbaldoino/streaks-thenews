'use server'

import { db } from '@/lib/db'

type UserWithStreak = {
  id: string
  email: string
  role: string
  emailVerified: string | null
  highestStreak: number
  streak?: {
    id: string
    startStreakDate: string
    lastStreakDate: string
    dateDiff: number
  } | null
  createdAt: string
  updatedAt: string
}

export const fetchTopUsers = async () => {
  const result: [] = await db.$queryRaw`
    SELECT u.*,
          s.id AS streak_id,
          s.start_streak_date,
          s.last_streak_date,
          s.created_at AS streak_created_at,
          s.updated_at AS streak_updated_at,
          EXTRACT(DAY FROM (s.last_streak_date - s.start_streak_date)) AS date_diff
    FROM users u
    LEFT JOIN LATERAL (
      SELECT s.*
      FROM streaks s
      WHERE s.user_id = u.id
      ORDER BY s.created_at DESC
      LIMIT 1
    ) s ON true
    ORDER BY
      CASE
        WHEN s.last_streak_date IS NULL OR s.start_streak_date IS NULL THEN 1
        ELSE 0
      END,
      date_diff DESC
    LIMIT 10;
  `

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formattedResult: UserWithStreak[] = result.map((user: any) => ({
    id: user.id,
    email: user.email,
    role: user.role,
    emailVerified: user.email_verified,
    highestStreak: user.highest_streak,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
    streak: {
      id: user.streak_id,
      startStreakDate: user.start_streak_date,
      lastStreakDate: user.last_streak_date,
      createdAt: user.streak_created_at,
      updatedAt: user.streak_updated,
      dateDiff: user.date_diff,
    },
  }))

  return formattedResult as UserWithStreak[]
}
