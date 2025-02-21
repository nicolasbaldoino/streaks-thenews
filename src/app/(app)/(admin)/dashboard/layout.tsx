import { redirect } from 'next/navigation'

import { Separator } from '@/components/ui/separator'
import { currentUser } from '@/lib/current-user'

import { Header } from './_components/header'

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await currentUser()

  if (user?.role !== 'ADMIN') {
    return redirect('/')
  }

  return (
    <div className="flex flex-col gap-4 px-4">
      <Header />

      <Separator />

      {children}
    </div>
  )
}
