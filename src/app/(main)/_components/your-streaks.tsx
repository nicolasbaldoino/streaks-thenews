import { Streak } from '@prisma/client'
import Link from 'next/link'

import { StreakCalendar } from '@/components/streak-calendar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const YourStreaks = async ({
  loggedIn,
  streaks,
}: {
  loggedIn: boolean
  streaks: Streak[]
}) => {
  return (
    <Card className="w-full min-w-[300px] sm:max-w-[400px]">
      <CardHeader>
        <CardTitle className="text-xl">Your Streaks</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        {loggedIn ? (
          <StreakCalendar streaks={streaks} />
        ) : (
          <>
            <div className="absolute flex flex-col items-center justify-center space-y-4">
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
  )
}
