import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts"
import type { UserViewsData } from "../../types/metrics"

interface UserViewsCardProps {
  data: UserViewsData
}

export function UserViewsCard({ data }: UserViewsCardProps) {
  const chartData = data.labels.map((label, index) => ({
    name: label,
    newUsers: data.newUsers[index],
    existingUsers: data.existingUsers[index],
  }))

  return (
    <Card className="bg-rose-50">
      <CardHeader className="pb-2">
        <CardTitle>User Views</CardTitle>
      </CardHeader>
      <CardContent>
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
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">New</span>
                            <span className="font-bold text-rose-500">{payload[0].value}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Existing</span>
                            <span className="font-bold text-blue-500">{payload[1].value}</span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Line
                type="monotone"
                dataKey="newUsers"
                stroke="#ef4444"
                strokeWidth={2}
                activeDot={{
                  r: 6,
                  style: { fill: "#ef4444", opacity: 0.8 },
                }}
              />
              <Line
                type="monotone"
                dataKey="existingUsers"
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
        <div className="flex items-center justify-start gap-8 mt-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-rose-500"></div>
            <span className="text-sm text-muted-foreground">New</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
            <span className="text-sm text-muted-foreground">Existing</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

