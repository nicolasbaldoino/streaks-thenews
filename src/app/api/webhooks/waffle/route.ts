import { differenceInDays, isMonday, isSunday } from 'date-fns'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { dailyStreaks } from '@/lib/daily-streaks'
import { db } from '@/lib/db'

const inputSchema = z.object({
  email: z.string().email(),
  id: z.string(), // post_id
  utmSource: z.string().nullish(),
  utmMedium: z.string().nullish(),
  utmCampaign: z.string().nullish(),
  utmChannel: z.string().nullish(),
})

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  // /?email=teste1@exemplo.com&id=post_2025-02-14
  const { data, error } = inputSchema.safeParse({
    email: searchParams.get('email'),
    id: searchParams.get('id'), // post_id

    // UTMs
    utmSource: searchParams.get('utm_source'),
    utmMedium: searchParams.get('utm_medium'),
    utmCampaign: searchParams.get('utm_campaign'),
    utmChannel: searchParams.get('utm_channel'),
  })

  if (error)
    return NextResponse.json(
      {
        message: 'Invalid query parameters',
        fieldErrors: error.flatten().fieldErrors,
      },
      { status: 400 },
    )

  const {
    email,
    id: postId,
    utmSource,
    utmMedium,
    utmCampaign,
    utmChannel,
  } = data

  try {
    const user = await db.user.upsert({
      where: { email },
      create: { email },
      update: {},
    })

    const post = await db.post.upsert({
      where: { id: postId },
      create: { id: postId },
      update: {},
    })

    const view = await db.view.findFirst({
      where: { userId: user.id, postId: post.id },
    })

    if (!view)
      await db.view.create({
        data: {
          userId: user.id,
          postId: post.id,
          utmSource,
          utmMedium,
          utmCampaign,
          utmChannel,
        },
      })

    const streakDays = await checkAndUpdateStreak(user.id)

    // Update highest streak if necessary (only if streakDays is higher than the current highest streak)
    if (streakDays && streakDays > user.highestStreak) {
      await db.user.update({
        where: { id: user.id },
        data: { highestStreak: streakDays },
      })
    }

    if (streakDays) {
      console.log(`[LOG] User ${user.id} has a streak of ${streakDays} days!`)
    }

    return NextResponse.json({ message: 'Webhook received' })
  } catch (error) {
    console.error(`Webhook failed: ${error}`)

    return NextResponse.json({ message: 'Webhook failed' }, { status: 500 })
  }
}

const checkAndUpdateStreak = async (userId: string) => {
  const today = new Date()

  if (isSunday(today)) return

  const lastStreak = await db.streak.findFirst({
    where: { userId },
    orderBy: { lastStreakDate: 'desc' },
  })

  if (lastStreak) {
    const lastDate = new Date(lastStreak.lastStreakDate)
    const diffDays = differenceInDays(today, lastDate)

    if (diffDays === 0) {
      return dailyStreaks(lastStreak.lastStreakDate, lastStreak.startStreakDate)
    }

    // If it's Monday and the last streak was Saturday, or if it was yesterday normally, continue the streak
    if (diffDays === 1 || (isMonday(today) && diffDays === 2)) {
      const newStreak = await db.streak.update({
        where: { id: lastStreak.id },
        data: { lastStreakDate: today },
      })

      const streakDays = dailyStreaks(
        newStreak.lastStreakDate,
        newStreak.startStreakDate,
      )

      return streakDays
    }
  }

  await db.streak.create({
    data: {
      userId,
      startStreakDate: today,
      lastStreakDate: today,
    },
  })
}
