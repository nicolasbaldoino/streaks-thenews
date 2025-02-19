import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'

import { authConfig } from '@/lib/auth-config'

import { SignOutButton } from './sign-out-button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

const getInitials = (name: string): string => {
  const initials = name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')

  return initials
}

export const ProfileButton = async () => {
  const session = await getServerSession(authConfig)

  if (!session?.user) {
    return (
      <Button asChild size="sm">
        <Link href="/auth">Sign In</Link>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 outline-none">
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium">
            {session.user.name || session.user.email}
          </span>
          {session.user.name && (
            <span className="text-xs text-muted-foreground">
              {session.user.email}
            </span>
          )}
        </div>
        <Avatar className="size-8">
          <AvatarImage
            src={`https://avatar.vercel.sh/${session?.user?.email}`}
          />

          {session.user.name && (
            <AvatarFallback>{getInitials(session.user.name)}</AvatarFallback>
          )}
        </Avatar>
        <ChevronDown className="size-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <SignOutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
