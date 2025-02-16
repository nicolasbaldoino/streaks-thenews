import { getServerSession } from 'next-auth'

import { authConfig } from '@/lib/auth-config'

export default async function Page() {
  const session = await getServerSession(authConfig)

  return (
    <div>
      Streaks {session?.user?.email}{' '}
      <img
        className="rounded-full"
        src={`https://avatar.vercel.sh/${session?.user?.email}`}
      ></img>
    </div>
  )
}
