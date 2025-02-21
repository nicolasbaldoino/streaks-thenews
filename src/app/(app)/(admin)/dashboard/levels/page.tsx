import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { db } from '@/lib/db'

import { LevelFormDialog } from './_components/level-form-dialog'
import { LevelsDataTable } from './_components/levels-data-table'

export default async function Page() {
  const levels = await db.level.findMany({
    orderBy: {
      createdAt: 'asc',
    },
  })

  return (
    <div className="space-y-2">
      <div className="flex flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Levels</h1>
          <p className="text-sm text-muted-foreground">
            Manage levels and their requirements.
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-1.5 h-4 w-4" />
              Create
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[425px]">
            <LevelFormDialog />
          </DialogContent>
        </Dialog>
      </div>
      <LevelsDataTable data={levels} />
    </div>
  )
}
