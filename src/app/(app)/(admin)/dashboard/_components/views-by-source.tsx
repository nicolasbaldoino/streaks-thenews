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

export const ViewsBySource = ({ viewsBySource }: { viewsBySource: any }) => {
  const formattedData = viewsBySource.map((item: any) => ({
    date: format(new Date(item.createdAt), 'yyyy-MM-dd'),
    utmSource: item.utmSource,
    count: item._count.id,
  }))

  const chartData = formattedData.reduce((acc: any, item: any) => {
    const existing = acc.find((x: any) => x.date === item.date)
    if (existing) {
      existing[item.utmSource || 'none'] = item.count
    } else {
      acc.push({
        date: item.date,
        [item.utmSource || 'none']: item.count,
      })
    }
    return acc
  }, [])

  const chartConfig = chartData.reduce(
    (acc: ChartConfig, item: any, index: number) => {
      acc[item.utmSource || 'none'] = {
        label: item.utmSource || 'none',
        color: `hsl(var(--chart-${index + 1}))`,
      }
      return acc
    },
    {},
  )

  const sources = viewsBySource.reduce((acc: any, item: any) => {
    if (!acc.includes(item.utmSource)) {
      acc.push(item.utmSource)
    }
    return acc
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Views by Source</CardTitle>
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
            {sources.map((source: any, index: any) => (
              <Line
                key={source}
                dataKey={source || 'none'}
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
