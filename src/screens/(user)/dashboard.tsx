import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Server } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import server1 from "../../assets/Frame 1755.png"

export function UserDashboard() {
  const isMobile = useMobile()
  const [currentServerPage, setCurrentServerPage] = useState(0)

  const servers = [
    {
      id: 1,
      name: "Nombre del servidor",
      subtitle: "Unos de los más populares",
      status: "online",
      image: "/placeholder.svg?height=200&width=300",
      title: "Card Title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 2,
      name: "Nombre del servidor",
      subtitle: "Unos de los más populares",
      status: "offline",
      image: "/placeholder.svg?height=200&width=300",
      title: "Card Title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 3,
      name: "Nombre del servidor",
      subtitle: "Unos de los más populares",
      status: "online",
      image: "/placeholder.svg?height=200&width=300",
      title: "Card Title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 4,
      name: "Nombre del servidor",
      subtitle: "Unos de los más populares",
      status: "online",
      image: "/placeholder.svg?height=200&width=300",
      title: "Card Title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ]

  const serversPerPage = isMobile ? 1 : 3
  const totalPages = Math.ceil(servers.length / serversPerPage)
  const visibleServers = servers.slice(currentServerPage * serversPerPage, (currentServerPage + 1) * serversPerPage)

  const nextPage = () => {
    setCurrentServerPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentServerPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Panel de Monitoreo</h1>

      {/* Top metrics section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* CPU Usage */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-gray-600">Uso de CPU</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Promedio</p>
                <p className="text-2xl font-semibold text-emerald-500">32%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Estado Crítico</p>
                <p className="text-2xl font-semibold text-red-500">89%</p>
              </div>
            </div>
            <div className="relative pt-4">
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: "72%" }} />
              </div>
              <div className="absolute top-0 left-[72%] transform -translate-x-1/2" aria-hidden="true">
                <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white" />
              </div>
              <p className="text-center text-3xl font-bold mt-4">72%</p>
            </div>
          </CardContent>
        </Card>

        {/* Memory Usage */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-gray-600">Uso de memoria</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-2">Relación promedio</p>
            <div className="flex items-end h-32 gap-2">
              {["Lun", "Mar", "Mié", "Jue", "Vie"].map((day, i) => {
                const heights = [40, 80, 60, 35, 45]
                return (
                  <div key={day} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-gray-200 rounded-sm relative h-full">
                      <div
                        className="absolute bottom-0 left-0 right-0 bg-blue-600 rounded-sm"
                        style={{ height: `${heights[i]}%` }}
                      />
                    </div>
                    <span className="text-xs mt-1">{day}</span>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </CardContent>
        </Card>

        {/* Network Usage */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-gray-600">Uso de red</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-500">Estadística</p>
              <p className="text-sm text-gray-500">
                Esta semana <span className="font-medium">229,293</span>
              </p>
            </div>
            <p className="text-sm text-gray-500 mb-2">Uso de servidores más populares</p>
            <div className="relative h-40 flex justify-center">
              <div className="w-40 h-40 rounded-full border-8 border-blue-600 relative">
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <div
                    className="absolute bg-blue-300 h-full w-full origin-center"
                    style={{
                      transform: "rotate(45deg) skew(9deg, 9deg)",
                      clipPath: "polygon(50% 50%, 100% 0, 100% 100%)",
                    }}
                  />
                </div>
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full">
                  Servidor 1<br />
                  2,811
                </div>
                <div className="absolute -right-3 top-1/3 -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full">
                  Servidor 2<br />
                  12,799
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Middle section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Expenses */}
        <Card className="bg-gray-100">
          <CardHeader>
            <CardTitle>Gastos</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="font-medium mb-2">Título</h3>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet consectetur. Gravida commodo cras enim iaculis suscipit convallis augue eget
              dictumst. Integer nulla sem massa sed eleifend ultricies vitae at. Pulvinar duis malesuada commodo
              condimentum felis. Morbi hendrerit sodales aliquam a diam viverra nunc.
            </p>
          </CardContent>
        </Card>

        {/* Performance */}
        <Card className="bg-gray-100">
          <CardHeader>
            <CardTitle>Rendimiento</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="font-medium mb-2">Título</h3>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet consectetur. Gravida commodo cras enim iaculis suscipit convallis augue eget
              dictumst. Integer nulla sem massa sed eleifend ultricies vitae at. Pulvinar duis malesuada commodo
              condimentum felis. Morbi hendrerit sodales aliquam a diam viverra nunc.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Servers section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Mis servidores</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={prevPage} aria-label="Página anterior">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextPage} aria-label="Página siguiente">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
          {visibleServers.map((server) => (
            <Card key={server.id} className="overflow-hidden">
              <CardHeader className="p-4 pb-0">
                <div className="flex items-start gap-2">
                  <Server className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">{server.name}</h3>
                    <p className="text-xs text-gray-500">{server.subtitle}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 relative">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={server1}
                    alt="Server rack"
                    className="w-full h-full object-cover"
                  />
                 
                </div>
                <div className="p-4">
                  <h4 className="font-medium mb-1">{server.title}</h4>
                  <p className="text-sm text-gray-600">{server.description}</p>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600">Ver</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
