import { AlertTriangle } from 'lucide-react'
import { getServerSession } from 'next-auth'

import { fetchRead } from '@/actions/fetch-read'
import { subscribe } from '@/actions/subscribe'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { authConfig } from '@/lib/auth-config'

export const Newsletter = async () => {
  const session = await getServerSession(authConfig)

  let isSubscribed: boolean | undefined

  if (session?.user?.email) {
    // Check if user is subscribed (API mock)
    const data = await fetchRead({ email: session?.user?.email })
    isSubscribed = Boolean(data?.success)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Newsletter</CardTitle>
      </CardHeader>
      <CardContent>
        {session?.user && !isSubscribed && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="size-4" />
            <AlertTitle className="text-sm">Not Subscribed</AlertTitle>
            <AlertDescription className="text-xs">
              <p>This email is not subscribed to our newsletter.</p>
            </AlertDescription>
          </Alert>
        )}
        <form action={subscribe} className="mb-4 flex items-center">
          <Input
            className="flex-1"
            name="email"
            type="email"
            required
            placeholder="Enter your email"
          />
          <Button size="sm" type="submit" className="ml-2">
            Subscribe
          </Button>
        </form>
        <span className="text-sm text-muted-foreground">
          Subscribe to our newsletter to get the latest updates.
        </span>
      </CardContent>
    </Card>
  )
}
