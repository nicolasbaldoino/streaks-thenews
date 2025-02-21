'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'

export const Header = () => {
  const pathname = usePathname()
  return (
    <div className="flex w-full flex-row gap-2">
      <Button
        size="sm"
        variant={pathname === '/dashboard/analytics' ? 'secondary' : 'ghost'}
        className="justify-start"
        asChild
      >
        <Link href="/dashboard/analytics">Analytics</Link>
      </Button>

      <Button
        size="sm"
        variant={pathname === '/dashboard/users' ? 'secondary' : 'ghost'}
        className="justify-start"
        asChild
      >
        <Link href="/dashboard/users">Users</Link>
      </Button>

      <Button
        size="sm"
        variant={pathname === '/dashboard/levels' ? 'secondary' : 'ghost'}
        className="justify-start"
        asChild
      >
        <Link href="/dashboard/levels">Levels</Link>
      </Button>
    </div>
  )
}
