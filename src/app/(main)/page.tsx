import { Streak } from '@prisma/client'
import { CalendarCheck, Flame, Zap } from 'lucide-react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'

import { StreakCalendar } from '@/components/streak-calendar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { authConfig } from '@/lib/auth-config'
import { dailyStreaks } from '@/lib/daily-streaks'
import { db } from '@/lib/db'
import { cn, hideEmail } from '@/lib/utils'

import { Newsletter } from './_components/newsletter'

export default async function Page() {
  const session = await getServerSession(authConfig)

  let streaks: Streak[] = []
  let activeStreakDays = 10
  let highestStreak = 10
  let currentStreak = 10

  if (session?.user?.email) {
    streaks = await db.streak.findMany({
      where: {
        user: {
          // email: session.user.email,
          email: 'teste4@exemplo.com',
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
          new Date(streak.createdAt),
        )
      )
    }, 0)

    highestStreak = streaks.reduce((longest, streak) => {
      const streakLength = dailyStreaks(
        new Date(streak.lastStreakDate),
        new Date(streak.createdAt),
      )
      return streakLength > longest ? streakLength : longest
    }, 0)

    currentStreak = dailyStreaks(
      new Date(streaks[0]?.lastStreakDate),
      new Date(streaks[0]?.createdAt),
    )
  }

  const users = await db.user.findMany({
    orderBy: {
      highestStreak: 'desc',
    },
    take: 10,
  })

  return (
    <>
      <div className="flex flex-row space-x-4">
        <div className="flex flex-1 flex-col space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
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

                <div className="rounded-lg bg-secondary p-2">
                  <CalendarCheck className="size-6 text-muted-foreground" />
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

                <div className="rounded-lg bg-secondary p-2">
                  <Flame className="size-6 text-muted-foreground" />
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

                <div className="rounded-lg bg-secondary p-2">
                  <Zap className="size-6 text-muted-foreground" />
                </div>
              </div>
            </Card>
          </div>

          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-xl">Overview</CardTitle>
            </CardHeader>
          </Card>

          <Newsletter email={session?.user?.email} />
        </div>
        <div className="max-w-[25rem] space-y-4">
          <Card className="min-w-max max-w-[25rem]">
            <CardHeader>
              <CardTitle className="text-xl">Your Streaks</CardTitle>
            </CardHeader>
            <CardContent>
              {session?.user ? (
                <StreakCalendar streaks={streaks} />
              ) : (
                <>
                  <div className="absolute flex h-[20rem] w-[20rem] flex-col items-center justify-center space-y-4">
                    <div className="text-sm">
                      Sign in to see your current streak. 🚀
                    </div>
                    <Button asChild size="sm">
                      <Link href="/auth">Sign In</Link>
                    </Button>
                  </div>
                  <div className="pointer-events-none select-none opacity-30 blur-sm">
                    <StreakCalendar streaks={[]} />
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-xl">🔥 Top Highest Streaks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="text-sm font-medium text-muted-foreground">
                      {i + 1}
                    </div>
                    <Avatar className="size-8">
                      <AvatarImage
                        src={`https://avatar.vercel.sh/${user.email}`}
                      />
                      <AvatarFallback>{user.email[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="text-sm font-medium">
                        {hideEmail(user.email)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {user.highestStreak} day streak
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
