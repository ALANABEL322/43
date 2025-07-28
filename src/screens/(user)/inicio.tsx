import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Server } from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";
import imgServer from "@/assets/servidorIMG.png";
import {
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
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
  const isMobile = useMobile();
  const [currentServerPage, setCurrentServerPage] = useState(0);

  const servers = [
    {
      id: 1,
      name: "Servidor Principal",
      subtitle: "Servidor de producción",
      status: "online",
      image: { imgServer },
      title: "Servidor de Aplicaciones",
      description:
        "Servidor principal que maneja las aplicaciones críticas del negocio.",
    },
    {
      id: 2,
      name: "Servidor de Base de Datos",
      subtitle: "Alta disponibilidad",
      status: "offline",
      image: { imgServer },
      title: "Base de Datos Principal",
      description:
        "Servidor dedicado para el manejo de bases de datos con replicación.",
    },
    {
      id: 3,
      name: "Servidor de Desarrollo",
      subtitle: "Ambiente de pruebas",
      status: "online",
      image: { imgServer },
      title: "Desarrollo y QA",
      description:
        "Servidor para pruebas y desarrollo de nuevas características.",
    },
    {
      id: 4,
      name: "Servidor de Respaldo",
      subtitle: "Backup y recuperación",
      status: "online",
      image: { imgServer },
      title: "Sistema de Respaldo",
      description:
        "Servidor dedicado para copias de seguridad y recuperación de desastres.",
    },
  ];

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
            <Button
              variant="outline"
              size="icon"
              onClick={prevPage}
              aria-label="Página anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextPage}
              aria-label="Página siguiente"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {visibleServers.map((server) => (
            <Card key={server.id} className="overflow-hidden">
              <CardHeader className="p-4 pb-0">
                <div className="flex items-start gap-2">
                  <Server
                    className={`h-5 w-5 ${
                      server.status === "online"
                        ? "text-emerald-500"
                        : "text-red-500"
                    }`}
                  />
                  <div>
                    <h3 className="font-medium">{server.name}</h3>
                    <p className="text-xs text-gray-500">{server.subtitle}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={server.image.imgServer}
                    alt="Rack de servidores"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-medium mb-1">{server.title}</h4>
                  <p className="text-sm text-gray-600">{server.description}</p>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
                  Ver detalles
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
