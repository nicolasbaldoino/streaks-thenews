import { getServerSession } from 'next-auth'

import { fetchTopUsers } from '@/actions/fetch-top-users'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { authConfig } from '@/lib/auth-config'
import { dailyStreaks } from '@/lib/daily-streaks'
import { hideEmail } from '@/lib/utils'

export const TopStreaks = async () => {
  const session = await getServerSession(authConfig)

  const users = await fetchTopUsers()

  return (
    <Card className="w-full max-lg:h-full">
      <CardHeader>
        <CardTitle className="text-xl">🔥 Top Streaks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.length === 0 && (
            <div className="py-4 text-center">No users with streaks found</div>
          )}
          {users.map((user, i) => {
            const streakDays =
              user.streak?.startStreakDate && user.streak?.lastStreakDate
                ? dailyStreaks(
                    new Date(user.streak.lastStreakDate),
                    new Date(user.streak.startStreakDate),
                  )
                : 0

            return (
              <div key={i} className="flex items-center gap-4">
                <div className="text-sm font-medium text-muted-foreground">
                  {i + 1}
                </div>
                <Avatar className="size-8">
                  <AvatarImage src={`https://avatar.vercel.sh/${user.email}`} />
                  <AvatarFallback>{user.email[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="text-sm font-medium">
                    {hideEmail(user.email)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {streakDays} day{streakDays > 1 && 's'} streak
                  </div>
                </div>
                {session?.user?.email === user.email && (
                  <Badge variant="outline">You</Badge>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
