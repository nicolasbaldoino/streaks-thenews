'use client'

import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

export const SignOutButton = () => {
  return (
    <DropdownMenuItem onClick={async () => await signOut()}>
      <LogOut className="mr-2 size-4" /> Sair
    </DropdownMenuItem>
  )
}
