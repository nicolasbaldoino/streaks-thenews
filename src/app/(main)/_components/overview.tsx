import { Level, Streak } from '@prisma/client'
import { getServerSession } from 'next-auth'

import { CurrentGoal } from '@/components/current-goal'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { authConfig } from '@/lib/auth-config'
import { db } from '@/lib/db'
import { DEMO_STREAKS } from '@/lib/demo'

import { LevelUp } from './level-up'

export const Overview = async ({
  streaks,
  currentStreak,
}: {
  streaks: Streak[]
  currentStreak: number
}) => {
  const session = await getServerSession(authConfig)

  let levels: Level[] = []

  if (session?.user?.email) {
    levels = await db.level.findMany({
      orderBy: {
        minStreakDays: 'desc',
      },
    })
  }

  const currentLevel = levels.find(
    ({ minStreakDays }) => minStreakDays <= currentStreak,
  )
  const nextLevel = levels
    .slice()
    .reverse()
    .find(({ minStreakDays }) => minStreakDays > currentStreak)

  const daysLeft = (nextLevel?.minStreakDays || 0) - currentStreak

  const loading = Boolean(session?.user)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Overview</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 sm:flex-row sm:justify-between">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Hey,{' '}
            {loading ? (
              session?.user?.email?.split('@')[0]
            ) : (
              <span className="pointer-events-none select-none blur-sm">
                toom
              </span>
            )}
            ! 👋
          </h2>
          <div className="space-y-1">
            <p className="text-lg">
              You&apos;re at{' '}
              <strong>
                Level{' '}
                {loading ? (
                  currentLevel?.name
                ) : (
                  <span className="pointer-events-none select-none blur-sm">
                    Untitled
                  </span>
                )}
              </strong>
              .
            </p>
            <p className="text-lg">
              {loading ? (
                nextLevel ? (
                  daysLeft > 1 ? (
                    <>
                      Keep it up! Just {daysLeft} more days to reach{' '}
                      <strong>Level {nextLevel?.name}</strong>.
                    </>
                  ) : (
                    "Almost there! One more day and you'll level up."
                  )
                ) : (
                  "You've reached the top level. Great job!"
                )
              ) : (
                <>
                  Keep it up! Just{' '}
                  <span className="pointer-events-none select-none blur-sm">
                    99
                  </span>{' '}
                  more days to reach{' '}
                  <strong>
                    Level{' '}
                    <span className="pointer-events-none select-none blur-sm">
                      Untitled
                    </span>
                  </strong>
                  .
                </>
              )}
            </p>
          </div>

          {session?.user?.email && currentLevel && (
            <LevelUp
              email={session.user.email}
              currentLevel={currentLevel}
              nextLevel={nextLevel}
            />
          )}
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            {session?.user ? (
              <CurrentGoal streaks={streaks} />
            ) : (
              <div className="pointer-events-none select-none blur-sm">
                <CurrentGoal streaks={DEMO_STREAKS} />
              </div>
            )}
            <p className="text-sm font-medium text-muted-foreground">
              Weekly Goal
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
