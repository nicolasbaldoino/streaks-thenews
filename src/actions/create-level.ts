'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/lib/db'

export const createLevel = async (level: {
  name: string
  minStreakDays: number
}) => {
  await db.level.create({
    data: level,
  })

  revalidatePath('/dashboard/levels')
}
