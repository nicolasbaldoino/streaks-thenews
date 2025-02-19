import Link from 'next/link'

import { ProfileButton } from './profile-button'
import { ThemeSwitcher } from './theme-switcher'
import { Separator } from './ui/separator'

export const Header = async () => {
  return (
    <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <Link href="/" title="streaks 🔥" className="font-bold">
          streaks 🔥
        </Link>

        {/* buttons */}
      </div>

      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <Separator orientation="vertical" className="h-5" />
        <ProfileButton />
      </div>
    </div>
  )
}
