import { useEffect, useState } from "react"
import { UserViewsCard } from "../../components/metrics/UserViewsCard"
import { WebUsageCard } from "../../components/metrics/WebUsageCard"
import { DetailedMetrics } from "../../components/metrics/DetailedMetrics"
import type { MetricsData } from "../../types/metrics"

export function Metrics() {
  const [data, setData] = useState<MetricsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500))
        setData(metricsData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="grid gap-6">
        <div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
        <div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
        <div className="h-96 bg-gray-100 rounded-lg animate-pulse"></div>
      </div>
    )
  }

  if (!data) {
    return <div>No data available</div>
  }

  return (
    <div className="grid gap-6">
      <UserViewsCard data={data.userViews} />
      <WebUsageCard data={data.webUsage} />
      <h2 className="text-2xl font-bold mt-4">Detailed Metrics</h2>
      <DetailedMetrics monthlyUsers={data.monthlyUsers} userRoles={data.userRoles} />
    </div>
  )
}

const metricsData: MetricsData = {
  userViews: {
    newUsers: [35, 59, 40, 75, 35, 70],
    existingUsers: [65, 35, 65, 85, 55, 40],
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  },
  webUsage: {
    averageTime: "1m 32s",
    growthPercentage: 15,
    data: [45, 30, 60, 80, 65, 45],
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  },
  monthlyUsers: {
    data: [65, 40, 55, 70],
    labels: ["January", "February", "March", "April"],
    colors: ["#f87171", "#22d3ee", "#d8b4fe", "#60a5fa"],
  },
  userRoles: [
    { name: "Editor", value: 40, color: "#22d3ee" },
    { name: "Collaborator", value: 30, color: "#d8b4fe" },
    { name: "Owner", value: 20, color: "#f87171" },
    { name: "Viewer", value: 10, color: "#a3e635" },
  ],
}

