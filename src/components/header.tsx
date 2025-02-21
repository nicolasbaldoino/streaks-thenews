import Link from 'next/link'

import { currentUser } from '@/lib/current-user'

import { HeaderButtons } from './header-buttons'
import { ProfileButton } from './profile-button'
import { ThemeSwitcher } from './theme-switcher'
import { Separator } from './ui/separator'

export const Header = async () => {
  const user = await currentUser()

  return (
    <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4">
      <div className="flex flex-1 items-center gap-3">
        <Link href="/" title="streaks 🔥" className="font-bold">
          streaks 🔥
        </Link>

        {user?.role === 'ADMIN' && <HeaderButtons />}
      </div>

      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <Separator orientation="vertical" className="h-5" />
        <ProfileButton />
      </div>
    </div>
  )
}
