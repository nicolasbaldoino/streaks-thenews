'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from './ui/button'

export const HeaderButtons = () => {
  const pathname = usePathname()

  return (
    <div className="flex flex-1 items-center justify-center gap-2">
      <Button
        asChild
        variant={pathname === '/' ? 'secondary' : 'ghost'}
        size="sm"
      >
        <Link href="/">My Streaks</Link>
      </Button>
      <Button
        asChild
        variant={pathname.startsWith('/dashboard') ? 'secondary' : 'ghost'}
        size="sm"
      >
        <Link href="/dashboard">Dashboard</Link>
      </Button>
    </div>
  )
}
