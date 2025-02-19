import { AlertTriangle } from 'lucide-react'

import { fetchRead } from '@/actions/fetch-read'
import { subscribe } from '@/actions/subscribe'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export const Newsletter = async ({ email }: { email?: string | null }) => {
  let isSubscribed: boolean | undefined

  if (email) {
    // Check if user is subscribed (API mock)
    const data = await fetchRead({ email })
    isSubscribed = Boolean(data?.success)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Newsletter</CardTitle>
      </CardHeader>
      <CardContent>
        {isSubscribed === false && (
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
            name="email"
            type="email"
            placeholder="Enter your email"
            className="flex-1"
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
