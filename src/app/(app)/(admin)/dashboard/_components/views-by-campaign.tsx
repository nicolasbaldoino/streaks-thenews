/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { endOfDay, format, parse, startOfDay } from 'date-fns'
import * as React from 'react'
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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const ViewsByCampaign = ({
  viewsByCampaign,
}: {
  viewsByCampaign: any
}) => {
  const [timeRange, setTimeRange] = React.useState('30d')

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

  const filteredData = chartData.filter((item: any) => {
    const date = endOfDay(parse(item.date, 'yyyy-MM-dd', new Date()))
    const referenceDate = startOfDay(new Date())

    let daysToSubtract = 90
    if (timeRange === '30d') {
      daysToSubtract = 30
    } else if (timeRange === '7d') {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  const chartConfig = viewsByCampaign.reduce(
    (acc: ChartConfig, item: any, index: number) => {
      acc[item.utmCampaign || 'none'] = {
        label: item.utmCampaign || 'none',
        color: `hsl(var(--chart-${index + 1}))`,
      }
      return acc
    },
    {},
  )

  const labels = Array.from(
    new Set(viewsByCampaign.map((item: any) => item.utmCampaign || 'none')),
  )

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle className="text-lg">Views by Campaign</CardTitle>
          <CardDescription>
            Showing views by campaign over the last{' '}
            {timeRange === '90d'
              ? '3 months'
              : timeRange === '30d'
                ? '30 days'
                : '7 days'}
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart accessibilityLayer data={filteredData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const parsedDate = parse(value, 'yyyy-MM-dd', new Date())
                return format(parsedDate, 'MMM d')
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    const parsedDate = parse(value, 'yyyy-MM-dd', new Date())
                    return format(parsedDate, 'MMM d')
                  }}
                  indicator="dot"
                />
              }
            />
            {labels.map((label: any, index: any) => (
              <Line
                key={label}
                dataKey={label || 'none'}
                type="monotone"
                stroke={`hsl(var(--chart-${index + 1}))`}
                strokeWidth={2}
                dot={{
                  fill: `hsl(var(--chart-${index + 1}))`,
                }}
                activeDot={{
                  r: 6,
                }}
              />
            ))}
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
