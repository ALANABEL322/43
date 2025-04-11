import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts"
import type { WebUsageData } from "../../types/metrics"
import { TrendingUp } from "lucide-react"

interface WebUsageCardProps {
  data: WebUsageData
}

export function WebUsageCard({ data }: WebUsageCardProps) {
  const chartData = data.labels.map((label, index) => ({
    name: label,
    usage: data.data[index],
  }))

  return (
    <Card className="bg-rose-50">
      <CardHeader className="pb-2">
        <CardTitle>Average Web Usage</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <div className="text-lg font-medium">{data.averageTime}</div>
          <div className="flex items-center gap-1 text-sm text-emerald-600">
            <TrendingUp className="h-4 w-4" />
            <span>{data.growthPercentage}%</span>
          </div>
        </div>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">Usage</span>
                          <span className="font-bold text-blue-500">{payload[0].value} min</span>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Line
                type="monotone"
                dataKey="usage"
                stroke="#3b82f6"
                strokeWidth={2}
                activeDot={{
                  r: 6,
                  style: { fill: "#3b82f6", opacity: 0.8 },
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

