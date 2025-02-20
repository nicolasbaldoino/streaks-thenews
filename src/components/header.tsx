import { Role } from '@prisma/client'
import Link from 'next/link'
import { getServerSession } from 'next-auth'

import { authConfig } from '@/lib/auth-config'
import { db } from '@/lib/db'

import { HeaderButtons } from './header-buttons'
import { ProfileButton } from './profile-button'
import { ThemeSwitcher } from './theme-switcher'
import { Separator } from './ui/separator'

export const Header = async () => {
  const session = await getServerSession(authConfig)

  let role: Role | undefined

  if (session?.user?.email) {
    const user = await db.user.findUnique({
      where: {
        email: session?.user?.email,
      },
      select: {
        role: true,
      },
    })

    role = user?.role
  }

  return (
    <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4">
      <div className="flex flex-1 items-center gap-3">
        <Link href="/" title="streaks 🔥" className="font-bold">
          streaks 🔥
        </Link>

        {role === 'ADMIN' && <HeaderButtons />}
      </div>

      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <Separator orientation="vertical" className="h-5" />
        <ProfileButton />
      </div>
    </div>
  )
}
