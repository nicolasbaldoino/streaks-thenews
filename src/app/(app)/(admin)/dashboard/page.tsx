import { isMonday, startOfDay, subDays } from 'date-fns'
import { Eye, Flame, PauseCircle, Users } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { db } from '@/lib/db'

import { ViewsByCampaign } from './_components/views-by-campaign'
import { ViewsByChannel } from './_components/views-by-channel'
import { ViewsByMedium } from './_components/views-by-medium'
import { ViewsBySource } from './_components/views-by-source'

export default async function Page() {
  const [
    totalStreaks,
    totalViews,
    totalUsers,
    topHighestStreaksByUser,
    topViewsByUser,
    topPostsByViews,
    viewsBySource,
    viewsByMedium,
    viewsByCampaign,
    viewsByChannel,
  ] = await Promise.all([
    // Total Streaks (count)
    db.streak.groupBy({
      by: ['userId'],
      _max: {
        lastStreakDate: true,
      },
    }),

    // Total Views (count)
    db.view.count(),

    // Total Users (count)
    db.user.count(),

    // Top Highest Streaks by User (limit)
    db.user.findMany({
      orderBy: {
        highestStreak: 'desc',
      },
      take: 5,
    }),

    // Top Views by User (limit)
    db.user.findMany({
      include: {
        _count: {
          select: { View: true },
        },
      },
      orderBy: {
        View: {
          _count: 'desc',
        },
      },
      take: 5,
    }),

    // Top Posts by Views (limit)
    db.view.groupBy({
      by: ['postId'],
      _count: {
        postId: true,
      },
      orderBy: {
        _count: {
          postId: 'desc',
        },
      },
      take: 5,
    }),

    // Views by Source (utm_source)
    db.view.groupBy({
      by: ['utmSource', 'createdAt'],
      _count: {
        id: true,
      },
      where: {
        createdAt: {
          gte: subDays(new Date(), 90),
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    }),

    // Views by Medium (utm_medium)
    db.view.groupBy({
      by: ['utmMedium', 'createdAt'],
      _count: {
        id: true,
      },
      where: {
        createdAt: {
          gte: subDays(new Date(), 90),
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    }),

    // Views by Campaign (utm_campaign)
    db.view.groupBy({
      by: ['utmCampaign', 'createdAt'],
      _count: {
        id: true,
      },
      where: {
        createdAt: {
          gte: subDays(new Date(), 90),
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    }),

    // Views by Channel (utm_channel)
    db.view.groupBy({
      by: ['utmChannel', 'createdAt'],
      _count: {
        id: true,
      },
      where: {
        createdAt: {
          gte: subDays(new Date(), 90),
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    }),
  ])

  // const streaksOver7Days = await db.user.findMany({
  //   include: {
  //     Streak: {
  //       take: 1,
  //       orderBy: {
  //         createdAt: 'desc',
  //       },
  //     },
  //   },
  // })

  // const streaksOver7DaysCount = streaksOver7Days.filter(
  //   (user) =>
  //     differenceInDays(
  //       new Date(user.Streak[0]?.lastStreakDate),
  //       new Date(user.Streak[0]?.startStreakDate),
  //     ) >= 7,
  // ).length

  const today = startOfDay(new Date())
  const yesterday = subDays(today, 1)
  const beforeYesterday = subDays(today, 2)

  const totalActiveStreaks = totalStreaks.filter(
    ({ _max: { lastStreakDate } }) =>
      lastStreakDate &&
      (lastStreakDate >= yesterday ||
        (isMonday(today) && lastStreakDate >= beforeYesterday)),
  ).length

  const totalInactiveStreaks = totalStreaks.length - totalActiveStreaks

  return (
    <div className="flex flex-col gap-4 px-4">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card>
          <div className="flex items-start justify-between space-x-4 p-6">
            <div>
              <div className="text-sm font-medium">Total Active Streaks</div>

              <div>
                <div className="text-xl font-semibold">
                  {totalActiveStreaks}
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-secondary p-2">
              <Flame className="size-6 text-muted-foreground" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between space-x-4 p-6">
            <div>
              <div className="text-sm font-medium">Total Inactive Streaks</div>

              <div>
                <div className="text-xl font-semibold">
                  {totalInactiveStreaks}
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-secondary p-2">
              <PauseCircle className="size-6 text-muted-foreground" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between space-x-4 p-6">
            <div>
              <div className="text-sm font-medium">Total Views</div>

              <div>
                <div className="text-xl font-semibold">{totalViews}</div>
              </div>
            </div>

            <div className="rounded-lg bg-secondary p-2">
              <Eye className="size-6 text-muted-foreground" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between space-x-4 p-6">
            <div>
              <div className="text-sm font-medium">Total Users</div>

              <div>
                <div className="text-xl font-semibold">{totalUsers}</div>
              </div>
            </div>

            <div className="rounded-lg bg-secondary p-2">
              <Users className="size-6 text-muted-foreground" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Top Highest Streaks by User
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topHighestStreaksByUser.length === 0 && (
                <div className="py-4 text-center">
                  No users with streaks found
                </div>
              )}
              {topHighestStreaksByUser.map((user, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="text-sm font-medium text-muted-foreground">
                    {i + 1}
                  </div>
                  <Avatar className="size-8">
                    <AvatarImage
                      src={`https://avatar.vercel.sh/${user.email}`}
                    />
                    <AvatarFallback>{user.email[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{user.email}</div>
                    <div className="text-sm text-muted-foreground">
                      {user.highestStreak} day{user.highestStreak > 1 && 's'}{' '}
                      streak
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Views by User</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topViewsByUser.length === 0 && (
                <div className="py-4 text-center">
                  No users with views found
                </div>
              )}
              {topViewsByUser.map((user, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="text-sm font-medium text-muted-foreground">
                    {i + 1}
                  </div>
                  <Avatar className="size-8">
                    <AvatarImage
                      src={`https://avatar.vercel.sh/${user.email}`}
                    />
                    <AvatarFallback>{user.email[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{user.email}</div>
                    <div className="text-sm text-muted-foreground">
                      {user._count.View} view{user._count.View > 1 && 's'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Posts by Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topPostsByViews.length === 0 && (
                <div className="py-4 text-center">No posts found</div>
              )}
              {topPostsByViews.map((view, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="text-sm font-medium text-muted-foreground">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{view.postId}</div>
                    <div className="text-sm text-muted-foreground">
                      {view._count.postId} view{view._count.postId > 1 && 's'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ViewsBySource viewsBySource={viewsBySource} />

        <ViewsByMedium viewsByMedium={viewsByMedium} />

        <ViewsByCampaign viewsByCampaign={viewsByCampaign} />

        <ViewsByChannel viewsByChannel={viewsByChannel} />
      </div>
    </div>
  )
}
