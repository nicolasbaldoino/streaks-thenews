'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/lib/db'

export const updateLevel = async (level: {
  id: number
  name?: string
  minStreakDays?: number
}) => {
  await db.level.update({
    where: { id: level.id },
    data: level,
  })

  revalidatePath('/dashboard/levels')
}
