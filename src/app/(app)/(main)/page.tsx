import { Streak } from '@prisma/client'
import { CalendarCheck, Flame, Zap } from 'lucide-react'
import { getServerSession } from 'next-auth'

import { Card } from '@/components/ui/card'
import { authConfig } from '@/lib/auth-config'
import { dailyStreaks } from '@/lib/daily-streaks'
import { db } from '@/lib/db'
import { cn } from '@/lib/utils'

import { Newsletter } from './_components/newsletter'
import { Overview } from './_components/overview'
import { Posts } from './_components/posts'
import { TopStreaks } from './_components/top-streaks'
import { YourStreaks } from './_components/your-streaks'

export default async function Page() {
  const session = await getServerSession(authConfig)

  let streaks: Streak[] = []
  let activeStreakDays = 10
  let highestStreak = 10
  let currentStreak = 10

  // Only fetch data if user is signed in
  if (session?.user?.email) {
    streaks = await db.streak.findMany({
      where: {
        user: {
          email: session.user.email,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    activeStreakDays = streaks.reduce((total, streak) => {
      return (
        total +
        dailyStreaks(
          new Date(streak.lastStreakDate),
          new Date(streak.startStreakDate),
        )
      )
    }, 0)

    highestStreak = streaks.reduce((longest, streak) => {
      const streakLength = dailyStreaks(
        new Date(streak.lastStreakDate),
        new Date(streak.startStreakDate),
      )
      return streakLength > longest ? streakLength : longest
    }, 0)

    currentStreak = dailyStreaks(
      new Date(streaks[0]?.lastStreakDate),
      new Date(streaks[0]?.startStreakDate),
    )
  }

  return (
    <div className="flex flex-row space-x-4 px-4">
      <div className="flex flex-1 flex-col space-y-4">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <Card className="col-span-2 sm:col-span-1">
            <div className="flex items-start justify-between space-x-4 p-6">
              <div>
                <div className="text-sm font-medium">Total Active Days</div>

                <div>
                  <div
                    className={cn(
                      'text-xl font-semibold',
                      !session?.user &&
                        'pointer-events-none select-none blur-sm',
                    )}
                  >
                    {activeStreakDays}{' '}
                    <span className="text-sm font-medium">days</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-blue-500/20 p-2 text-blue-700 dark:text-blue-400">
                <CalendarCheck className="size-6" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start justify-between space-x-4 p-6">
              <div>
                <div className="text-sm font-medium">Highest Streak</div>

                <div>
                  <div
                    className={cn(
                      'text-xl font-semibold',
                      !session?.user &&
                        'pointer-events-none select-none blur-sm',
                    )}
                  >
                    {highestStreak}{' '}
                    <span className="text-sm font-medium">days</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-emerald-500/20 p-2 text-emerald-700 dark:text-emerald-400">
                <Flame className="size-6" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start justify-between space-x-4 p-6">
              <div>
                <div className="text-sm font-medium">Current Streak</div>

                <div>
                  <div
                    className={cn(
                      'text-xl font-semibold',
                      !session?.user &&
                        'pointer-events-none select-none blur-sm',
                    )}
                  >
                    {currentStreak}{' '}
                    <span className="text-sm font-medium">days</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-yellow-500/20 p-2 text-yellow-700 dark:text-yellow-400">
                <Zap className="size-6" />
              </div>
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row lg:hidden">
          <YourStreaks loggedIn={Boolean(session?.user)} streaks={streaks} />

          <div className="flex-1">
            <TopStreaks />
          </div>
        </div>

        <Overview streaks={streaks} currentStreak={currentStreak} />

        <Newsletter />

        <Posts />
      </div>

      <div className="hidden max-w-[25rem] flex-col space-y-4 lg:flex">
        <YourStreaks loggedIn={Boolean(session?.user)} streaks={streaks} />

        <TopStreaks />
      </div>
    </div>
  )
}
