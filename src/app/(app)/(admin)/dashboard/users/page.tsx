import { db } from '@/lib/db'

import { UsersDataTable } from './_components/users-data-table'

export default async function Page() {
  const users = await db.user.findMany({
    orderBy: {
      createdAt: 'asc',
    },
  })

  return (
    <div className="space-y-2">
      <div>
        <h1 className="text-2xl font-semibold">Users</h1>
        <p className="text-sm text-muted-foreground">
          Manage users and their roles.
        </p>
      </div>
      <UsersDataTable data={users} />
    </div>
  )
}
