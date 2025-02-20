import { Level, Streak } from '@prisma/client'
import { Award, Star } from 'lucide-react'
import { getServerSession } from 'next-auth'

import { CurrentGoal } from '@/components/current-goal'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { authConfig } from '@/lib/auth-config'
import { db } from '@/lib/db'
import { DEMO_STREAKS } from '@/lib/demo'

import { LevelStatus } from './level-status'
import { StreakStatus } from './streak-status'

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

  const loading = Boolean(session?.user)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Overview</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 sm:flex-row sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            Hey,{' '}
            {loading ? (
              session?.user?.email?.split('@')[0]
            ) : (
              <span className="pointer-events-none select-none blur-sm">
                toomcook
              </span>
            )}
            ! 👋
          </h2>

          <div className="mt-6 space-y-4">
            {loading ? (
              <>
                <StreakStatus streaks={streaks} />

                <LevelStatus levels={levels} currentStreak={currentStreak} />
              </>
            ) : (
              <>
                <div className="flex items-center gap-4">
                  <Award className="h-5 w-5 shrink-0" />
                  <div>
                    <p className="font-semibold">Start your streak!</p>
                    <p className="pointer-events-none select-none text-sm text-muted-foreground blur-sm">
                      Complete your first activity today and begin your journey!
                      🔥
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-semibold">
                      You&apos;re at Level{' '}
                      <span className="pointer-events-none select-none blur-sm">
                        Untitled
                      </span>
                    </p>
                    <p className="pointer-events-none select-none text-sm text-muted-foreground blur-sm">
                      Keep going! Only 99 days left to reach the next level! 🎯
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            {loading ? (
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
