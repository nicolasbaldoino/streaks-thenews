import { getServerSession } from 'next-auth'

import { authConfig } from './auth-config'
import { db } from './db'

export const currentUser = async () => {
  const session = await getServerSession(authConfig)

  let user

  if (session?.user?.email) {
    user = await db.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    })

    return user
  }
}
