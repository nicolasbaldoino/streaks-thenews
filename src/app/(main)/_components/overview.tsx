import { Rank } from '@prisma/client'
import { getServerSession } from 'next-auth'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { authConfig } from '@/lib/auth-config'
import { db } from '@/lib/db'
import { cn } from '@/lib/utils'

export const Overview = async ({
  currentStreak,
}: {
  currentStreak: number
}) => {
  const session = await getServerSession(authConfig)

  let rank: Rank | null = null

  if (session?.user?.email) {
    rank = await db.rank.findFirst({
      where: {
        minStreakDays: {
          lte: currentStreak,
        },
      },
      orderBy: {
        minStreakDays: 'desc',
      },
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium">Current Rank</div>
            {
              <div
                className={cn(
                  'text-xl font-semibold',
                  !session?.user && 'pointer-events-none select-none blur-sm',
                )}
              >
                {rank?.name ?? 'Unranked'}
              </div>
            }
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
