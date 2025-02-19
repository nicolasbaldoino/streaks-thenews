import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { db } from '@/lib/db'
import { hideEmail } from '@/lib/utils'

export const HighestStreaks = async () => {
  await new Promise((resolve) => setTimeout(resolve, 200000000))

  const users = await db.user.findMany({
    orderBy: {
      highestStreak: 'desc',
    },
    take: 10,
  })

  return (
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
                <AvatarImage src={`https://avatar.vercel.sh/${user.email}`} />
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
  )
}
