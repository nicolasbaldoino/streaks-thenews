'use server'

import { Role } from '@prisma/client'
import { revalidatePath } from 'next/cache'

import { db } from '@/lib/db'

export const updateRole = async (userId: string, role: Role) => {
  await db.user.update({
    where: { id: userId },
    data: { role },
  })

  revalidatePath('/dashboard/users')
}
