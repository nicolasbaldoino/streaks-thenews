import { eachDayOfInterval, format, isSunday } from 'date-fns'

import { db } from '@/lib/db'

import { utmCampaign, utmChannel, utmMedium, utmSource } from './mocks.json'

const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const generateRandomDateRanges = (
  rangeMinDays: number = 4,
  rangeMaxDays: number = 8,
  gapMinDays: number = 1,
  gapMaxDays: number = 4,
  numberOfRanges: number = 5,
): { start: Date; end: Date }[] => {
  const today = new Date()
  let endDate = new Date(today)

  const ranges: { start: Date; end: Date }[] = []

  for (let i = numberOfRanges - 1; i >= 0; i--) {
    const rangeDays = getRandomNumber(rangeMinDays, rangeMaxDays)
    const startDate = new Date(endDate)
    startDate.setDate(endDate.getDate() - rangeDays)

    ranges.unshift({ start: new Date(startDate), end: new Date(endDate) })

    const gapDays = getRandomNumber(gapMinDays, gapMaxDays)
    endDate = new Date(startDate)
    endDate.setDate(startDate.getDate() - gapDays)
  }

  return ranges
}

async function main() {
  const MAX_USERS = 50

  await db.view.deleteMany()
  await db.streak.deleteMany()

  for (let i = 0; i < MAX_USERS; i++) {
    const randomDateRanges = generateRandomDateRanges()

    let highestStreak = 0

    for (const range of randomDateRanges) {
      const admin = i === 0

      const email = admin ? 'admin@exemplo.com' : `teste${i}@exemplo.com`

      const role = admin ? 'ADMIN' : 'MEMBER'

      const user = await db.user.upsert({
        where: { email },
        create: {
          email,
          role,
        },
        update: {},
      })

      highestStreak = user.highestStreak

      const days = eachDayOfInterval({ start: range.start, end: range.end })

      for (const day of days) {
        const postId = `post_${format(day, 'yyyy-MM-dd')}`

        const post = await db.post.upsert({
          where: { id: postId },
          create: { id: postId },
          update: {},
        })

        const randomUtmSource =
          utmSource[getRandomNumber(0, utmSource.length - 1)]

        const randomUtmMedium =
          utmMedium[getRandomNumber(0, utmMedium.length - 1)]

        const randomUtmCampaign =
          utmCampaign[getRandomNumber(0, utmCampaign.length - 1)]

        const randomUtmChannel =
          utmChannel[getRandomNumber(0, utmChannel.length - 1)]

        await db.view.upsert({
          where: {
            userId_postId: {
              userId: user.id,
              postId: post.id,
            },
          },
          create: {
            userId: user.id,
            postId: post.id,
            utmSource: randomUtmSource,
            utmMedium: randomUtmMedium,
            utmCampaign: randomUtmCampaign,
            utmChannel: randomUtmChannel,
            createdAt: day,
          },
          update: {
            utmSource: randomUtmSource,
            utmMedium: randomUtmMedium,
            utmCampaign: randomUtmCampaign,
            utmChannel: randomUtmChannel,
            createdAt: day,
          },
        })
      }

      await db.streak.create({
        data: {
          userId: user.id,
          startStreakDate: range.start,
          lastStreakDate: range.end,
          createdAt: range.start,
        },
      })

      const streakDays = days.filter((day) => !isSunday(day))

      if (streakDays.length && streakDays.length > user.highestStreak) {
        highestStreak = streakDays.length

        await db.user.update({
          where: { id: user.id },
          data: { highestStreak },
        })
      }
    }
  }
}

main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await db.$disconnect()
    process.exit(1)
  })
