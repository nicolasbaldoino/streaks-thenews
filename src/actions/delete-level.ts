'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/lib/db'

export const deleteLevel = async (id: number) => {
  await db.level.delete({
    where: { id },
  })

  revalidatePath('/dashboard/levels')
}
