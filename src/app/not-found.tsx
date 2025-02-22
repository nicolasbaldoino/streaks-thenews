import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4">
      <h2 className="text-2xl font-bold">404 - Not Found</h2>
      <p className="text-lg">The page you are looking for does not exist.</p>

      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  )
}
