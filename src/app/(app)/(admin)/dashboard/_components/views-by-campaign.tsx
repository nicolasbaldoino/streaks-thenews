/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { format } from 'date-fns'
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

export const ViewsByCampaign = ({
  viewsByCampaign,
}: {
  viewsByCampaign: any
}) => {
  const formattedData = viewsByCampaign.map((item: any) => ({
    date: format(new Date(item.createdAt), 'yyyy-MM-dd'),
    utmCampaign: item.utmCampaign,
    count: item._count.id,
  }))

  const chartData = formattedData.reduce((acc: any, item: any) => {
    const existing = acc.find((x: any) => x.date === item.date)
    if (existing) {
      existing[item.utmCampaign || 'none'] = item.count
    } else {
      acc.push({
        date: item.date,
        [item.utmCampaign || 'none']: item.count,
      })
    }
    return acc
  }, [])

  const chartConfig = chartData.reduce(
    (acc: ChartConfig, item: any, index: number) => {
      acc[item.utmCampaign || 'none'] = {
        label: item.utmCampaign || 'none',
        color: `hsl(var(--chart-${index + 1}))`,
      }
      return acc
    },
    {},
  )

  const campaigns = viewsByCampaign.reduce((acc: any, item: any) => {
    if (!acc.includes(item.utmCampaign)) {
      acc.push(item.utmCampaign)
    }
    return acc
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Views by Campaign</CardTitle>
        <CardDescription>Last 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 12,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => format(new Date(value), 'MMM d')}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            {campaigns.map((campaign: any, index: any) => (
              <Line
                key={campaign}
                dataKey={campaign || 'none'}
                type="monotone"
                stroke={`hsl(var(--chart-${index + 1}))`}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
