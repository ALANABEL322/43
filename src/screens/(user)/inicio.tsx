import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Server,
  Plus,
  Power,
  PowerOff,
  Eye,
  Trash2,
} from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";
import { useServersStore } from "@/store/serversStore";
import { paths } from "@/routes/paths";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { cn } from "@/lib/utils";
import imgServer from "@/assets/server-1024x506.jpg";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

const cpuData = [
  { time: "00:00", usage: 32 },
  { time: "04:00", usage: 45 },
  { time: "08:00", usage: 89 },
  { time: "12:00", usage: 72 },
  { time: "16:00", usage: 56 },
  { time: "20:00", usage: 68 },
  { time: "23:59", usage: 72 },
];

const memoryData = [
  { day: "Lun", usage: 40 },
  { day: "Mar", usage: 80 },
  { day: "Mié", usage: 60 },
  { day: "Jue", usage: 35 },
  { day: "Vie", usage: 45 },
  { day: "Sáb", usage: 55 },
  { day: "Dom", usage: 65 },
];

const networkData = [
  { name: "Servidor 1", value: 2811 },
  { name: "Servidor 2", value: 12799 },
  { name: "Servidor 3", value: 5600 },
  { name: "Servidor 4", value: 8200 },
];

const chartConfig = {
  cpu: {
    label: "CPU",
    theme: {
      light: "hsl(152 60% 52%)",
      dark: "hsl(152 60% 52%)",
    },
  },
  memory: {
    label: "Memoria",
    theme: {
      light: "hsl(212 96% 62%)",
      dark: "hsl(212 96% 62%)",
    },
  },
  network: {
    label: "Red",
    theme: {
      light: "hsl(322 75% 46%)",
      dark: "hsl(322 75% 46%)",
    },
  },
};

export function Inicio() {
  const navigate = useNavigate();
  const isMobile = useMobile();
  const {
    userCreatedServers,
    selectUserCreatedServer,
    updateUserServerStatus,
    deleteUserCreatedServer,
  } = useServersStore();

  const [currentServerPage, setCurrentServerPage] = useState(0);
  const [confirmDelete, setConfirmDelete] = useState<{
    isOpen: boolean;
    serverId: string | null;
    serverName: string;
  }>({
    isOpen: false,
    serverId: null,
    serverName: "",
  });

  const servers = userCreatedServers;

  const serversPerPage = isMobile ? 1 : 3;
  const totalPages = Math.ceil(servers.length / serversPerPage);
  const visibleServers = servers.slice(
    currentServerPage * serversPerPage,
    (currentServerPage + 1) * serversPerPage
  );

  const nextPage = () => {
    setCurrentServerPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentServerPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleServerToggle = (serverId: string, currentStatus: boolean) => {
    updateUserServerStatus(serverId, !currentStatus);
  };

  const handleViewServer = (serverId: string) => {
    selectUserCreatedServer(serverId);
    navigate(paths.user.dashboard);
  };

  const handleDeleteRequest = (serverId: string, serverName: string) => {
    setConfirmDelete({
      isOpen: true,
      serverId,
      serverName,
    });
  };

  const confirmDeleteServer = () => {
    if (confirmDelete.serverId) {
      deleteUserCreatedServer(confirmDelete.serverId);
    }
    setConfirmDelete({
      isOpen: false,
      serverId: null,
      serverName: "",
    });
  };

  const closeConfirmDialog = () => {
    setConfirmDelete({
      isOpen: false,
      serverId: null,
      serverName: "",
    });
  };

  const getStatusColor = (isRunning: boolean) => {
    return isRunning ? "text-emerald-500" : "text-red-500";
  };

  const getStatusText = (isRunning: boolean) => {
    return isRunning ? "En línea" : "Desconectado";
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 p-4">
      <h1 className="text-4xl font-bold">Resumen General</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-gray-600">
              Uso de CPU
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Promedio</p>
                <p className="text-2xl font-semibold text-emerald-500">
                  {Math.round(
                    cpuData.reduce((acc, curr) => acc + curr.usage, 0) /
                      cpuData.length
                  )}
                  %
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Pico</p>
                <p className="text-2xl font-semibold text-red-500">
                  {Math.max(...cpuData.map((d) => d.usage))}%
                </p>
              </div>
            </div>
            <div className="">
              <ChartContainer config={chartConfig}>
                <AreaChart data={cpuData}>
                  <XAxis
                    dataKey="time"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Area
                    type="monotone"
                    dataKey="usage"
                    fill="url(#cpu-gradient)"
                    stroke="hsl(152 60% 52%)"
                  />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (!active || !payload) return null;
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Uso
                              </span>
                              <span className="font-bold text-muted-foreground">
                                {payload[0].value}%
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Hora
                              </span>
                              <span className="font-bold">
                                {payload[0].payload.time}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <defs>
                    <linearGradient
                      id="cpu-gradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="hsl(152 60% 52%)"
                        stopOpacity={0.2}
                      />
                      <stop
                        offset="100%"
                        stopColor="hsl(152 60% 52%)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-gray-600">
              Uso de Memoria
            </CardTitle>
          </CardHeader>
          <CardContent className="">
            <div className="">
              <ChartContainer config={chartConfig}>
                <BarChart data={memoryData}>
                  <XAxis
                    dataKey="day"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Bar
                    dataKey="usage"
                    fill="hsl(212 96% 62%)"
                    radius={[4, 4, 0, 0]}
                  />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (!active || !payload) return null;
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Uso
                              </span>
                              <span className="font-bold text-muted-foreground">
                                {payload[0].value}%
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Día
                              </span>
                              <span className="font-bold">
                                {payload[0].payload.day}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }}
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-gray-600">
              Uso de Red
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="">
              <ChartContainer config={chartConfig}>
                <LineChart data={networkData}>
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(322 75% 46%)"
                    strokeWidth={2}
                    dot={{ fill: "hsl(322 75% 46%)" }}
                  />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (!active || !payload) return null;
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Tráfico
                              </span>
                              <span className="font-bold text-muted-foreground">
                                {typeof payload[0]?.value === "number"
                                  ? (payload[0].value / 1000).toFixed(1)
                                  : 0}
                                k
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Servidor
                              </span>
                              <span className="font-bold">
                                {payload[0].payload.name}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Mis servidores</h2>
          <div className="flex gap-2">
            {servers.length > 0 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevPage}
                  aria-label="Página anterior"
                  disabled={totalPages <= 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextPage}
                  aria-label="Página siguiente"
                  disabled={totalPages <= 1}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
            <Button
              onClick={() => navigate(paths.user.servidores)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Crear Servidor
            </Button>
          </div>
        </div>

        {servers.length === 0 ? (
          <Card className="bg-gray-50 border-dashed border-2">
            <CardContent className="pt-6 pb-6">
              <div className="text-center">
                <Server className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  No tienes servidores creados
                </h3>
                <p className="text-gray-600 mb-4">
                  Crea tu primer servidor personalizado para comenzar a
                  monitorear tu infraestructura
                </p>
                <Button
                  onClick={() => navigate(paths.user.servidores)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Mi Primer Servidor
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {visibleServers.map((server) => (
              <Card key={server.id} className="overflow-hidden">
                <CardHeader className="p-4 pb-0">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2">
                      <Server
                        className={cn(
                          "h-5 w-5",
                          getStatusColor(server.isRunning)
                        )}
                      />
                      <div>
                        <h3 className="font-medium">{server.name}</h3>
                        <p className="text-xs text-gray-500">
                          {server.baseServer.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Badge
                        variant="secondary"
                        className={cn(
                          "text-xs",
                          server.isRunning
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-red-100 text-red-800"
                        )}
                      >
                        {getStatusText(server.isRunning)}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() =>
                          handleDeleteRequest(server.id, server.name)
                        }
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={imgServer}
                      alt="Rack de servidores"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium mb-1">{server.description}</h4>
                    <p className="text-sm text-gray-600">
                      Creado:{" "}
                      {new Date(server.createdDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      Precio: ${server.baseServer.price}/mes
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <div className="flex gap-2 w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleServerToggle(server.id, server.isRunning)
                      }
                      className={cn(
                        "flex-1",
                        server.isRunning
                          ? "text-red-600 border-red-600 hover:bg-red-50"
                          : "text-green-600 border-green-600 hover:bg-green-50"
                      )}
                    >
                      {server.isRunning ? (
                        <>
                          <PowerOff className="h-4 w-4 mr-1" />
                          Detener
                        </>
                      ) : (
                        <>
                          <Power className="h-4 w-4 mr-1" />
                          Iniciar
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleViewServer(server.id)}
                      className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Ver Dashboard
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={confirmDelete.isOpen}
        onClose={closeConfirmDialog}
        onConfirm={confirmDeleteServer}
        title="Eliminar Servidor"
        description={`¿Estás seguro de que quieres eliminar el servidor "${confirmDelete.serverName}"? Esta acción no se puede deshacer y perderás todos los datos y configuraciones asociadas.`}
      />
    </div>
  );
}
