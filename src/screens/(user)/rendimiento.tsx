import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import {
  Server,
  Cpu,
  MemoryStick,
  HardDrive,
  Network,
  Activity,
  Clock,
  AlertTriangle,
  TrendingUp,
  Zap,
  DollarSign,
  Settings,
  CheckCircle,
  XCircle,
  Info,
  Trash2,
  Filter,
} from "lucide-react";
import { useServersStore } from "@/store/serversStore";
import { useNavigate } from "react-router-dom";
import { paths } from "@/routes/paths";
import { cn } from "@/lib/utils";

interface ServerEvent {
  id: string;
  type: "update" | "restart" | "start" | "stop" | "maintenance";
  description: string;
  timestamp: string;
  status: "success" | "warning" | "error";
}

type EventFilter =
  | "all"
  | "restart"
  | "stop"
  | "start"
  | "update"
  | "maintenance";

export default function Rendimiento() {
  const navigate = useNavigate();
  const {
    selectedServer,
    updateServerMetrics,
    getServerEvents,
    deleteServerEvent,
  } = useServersStore();
  const [performanceData, setPerformanceData] = useState({
    uptime: 0,
    responseTime: 0,
    throughput: 0,
    errorRate: 0,
    activeConnections: 0,
  });
  const [eventFilter, setEventFilter] = useState<EventFilter>("all");
  const [confirmDelete, setConfirmDelete] = useState<{
    isOpen: boolean;
    eventId: string | null;
    eventDescription: string;
  }>({
    isOpen: false,
    eventId: null,
    eventDescription: "",
  });

  // Obtener eventos dinámicos del store
  const allEvents = getServerEvents();

  // Filtrar eventos según el filtro seleccionado
  const filteredEvents =
    eventFilter === "all"
      ? allEvents
      : allEvents.filter((event) => event.type === eventFilter);

  useEffect(() => {
    if (!selectedServer) {
      navigate(paths.user.dashboard);
      return;
    }

    // Simular datos de rendimiento en tiempo real
    const interval = setInterval(() => {
      setPerformanceData({
        uptime: Math.floor(Math.random() * 100) + 90,
        responseTime: Math.floor(Math.random() * 50) + 10,
        throughput: Math.floor(Math.random() * 1000) + 500,
        errorRate: Math.floor(Math.random() * 5),
        activeConnections: Math.floor(Math.random() * 1000) + 100,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedServer, navigate]);

  const handleDeleteEvent = (eventId: string, eventDescription: string) => {
    setConfirmDelete({
      isOpen: true,
      eventId,
      eventDescription,
    });
  };

  const confirmDeleteEvent = () => {
    if (confirmDelete.eventId) {
      deleteServerEvent(confirmDelete.eventId);
    }
  };

  const closeConfirmDialog = () => {
    setConfirmDelete({
      isOpen: false,
      eventId: null,
      eventDescription: "",
    });
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "update":
        return <Settings className="h-4 w-4" />;
      case "restart":
        return <Zap className="h-4 w-4" />;
      case "start":
        return <CheckCircle className="h-4 w-4" />;
      case "stop":
        return <XCircle className="h-4 w-4" />;
      case "maintenance":
        return <Info className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getEventStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getFilterButtonClass = (filter: EventFilter) => {
    return cn(
      "px-3 py-1 text-sm rounded-md transition-colors",
      eventFilter === filter
        ? "bg-blue-600 text-white"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    );
  };

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  if (!selectedServer) {
    return null;
  }

  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate(paths.user.dashboard)}
          className="mb-4"
        >
          ← Volver al Dashboard
        </Button>
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Rendimiento del Servidor
            </h1>
            <p className="text-gray-600">
              Monitoreo detallado de {selectedServer.server.name}
            </p>
          </div>
        </div>
      </div>

      {/* Estado del Servidor */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              Estado del Servidor
            </CardTitle>
            <Badge
              className={cn(
                "text-white",
                selectedServer.metrics.status === "online"
                  ? "bg-green-500"
                  : "bg-red-500"
              )}
            >
              {selectedServer.metrics.status === "online"
                ? "Activo"
                : "Inactivo"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{performanceData.uptime}%</p>
              <p className="text-sm text-gray-600">Uptime</p>
            </div>
            <div className="text-center">
              <Activity className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">
                {performanceData.responseTime}ms
              </p>
              <p className="text-sm text-gray-600">Tiempo de Respuesta</p>
            </div>
            <div className="text-center">
              <Network className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{performanceData.throughput}</p>
              <p className="text-sm text-gray-600">Throughput (req/s)</p>
            </div>
            <div className="text-center">
              <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{performanceData.errorRate}%</p>
              <p className="text-sm text-gray-600">Tasa de Error</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Métricas de Rendimiento */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* CPU */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="h-5 w-5" />
              Uso de CPU
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Uso Actual</span>
                  <span>{selectedServer.metrics.cpu.current}%</span>
                </div>
                <Progress
                  value={selectedServer.metrics.cpu.current}
                  className="h-3"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Promedio</p>
                  <p className="font-semibold">
                    {selectedServer.metrics.cpu.average}%
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Crítico</p>
                  <p className="font-semibold text-red-600">
                    {selectedServer.metrics.cpu.critical}%
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Memoria */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MemoryStick className="h-5 w-5" />
              Uso de Memoria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Uso Actual</span>
                  <span>{selectedServer.metrics.memory.current}%</span>
                </div>
                <Progress
                  value={selectedServer.metrics.memory.current}
                  className="h-3"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Total</p>
                  <p className="font-semibold">
                    {selectedServer.metrics.memory.total} GB
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Promedio</p>
                  <p className="font-semibold">
                    {selectedServer.metrics.memory.average}%
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Consumo y Gastos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Consumo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Consumo de Recursos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Almacenamiento</span>
                  <span>
                    {Math.round(
                      (selectedServer.metrics.storage.used /
                        selectedServer.metrics.storage.total) *
                        100
                    )}
                    %
                  </span>
                </div>
                <Progress
                  value={
                    (selectedServer.metrics.storage.used /
                      selectedServer.metrics.storage.total) *
                    100
                  }
                  className="h-3"
                />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Red</span>
                  <span>{selectedServer.metrics.network.current}%</span>
                </div>
                <Progress
                  value={selectedServer.metrics.network.current}
                  className="h-3"
                />
              </div>
              <div className="text-sm">
                <p className="text-gray-600">Conexiones Activas</p>
                <p className="font-semibold">
                  {performanceData.activeConnections}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gastos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Gastos y Costos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">
                  ${selectedServer.server.price}
                </p>
                <p className="text-sm text-gray-600">por mes</p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Servidor Base</span>
                  <span>${selectedServer.server.price * 0.7}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ancho de Banda</span>
                  <span>${selectedServer.server.price * 0.15}</span>
                </div>
                <div className="flex justify-between">
                  <span>Soporte Técnico</span>
                  <span>${selectedServer.server.price * 0.15}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${selectedServer.server.price}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Funcionamiento */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Funcionamiento del Sistema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="font-semibold">Sistema Operativo</p>
              <p className="text-sm text-gray-600">Funcionando correctamente</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Network className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="font-semibold">Conectividad</p>
              <p className="text-sm text-gray-600">Conexión estable</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <HardDrive className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="font-semibold">Almacenamiento</p>
              <p className="text-sm text-gray-600">Espacio disponible</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Eventos */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Eventos del Sistema
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{filteredEvents.length} eventos</Badge>
              <Badge variant="outline">Total: {allEvents.length}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="text-sm font-medium text-gray-700 mr-2">
              Filtrar por:
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEventFilter("all")}
              className={getFilterButtonClass("all")}
            >
              <Filter className="mr-1 h-4 w-4" /> Todos
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEventFilter("restart")}
              className={getFilterButtonClass("restart")}
            >
              <Zap className="mr-1 h-4 w-4" /> Reinicios
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEventFilter("start")}
              className={getFilterButtonClass("start")}
            >
              <CheckCircle className="mr-1 h-4 w-4" /> Inicios
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEventFilter("stop")}
              className={getFilterButtonClass("stop")}
            >
              <XCircle className="mr-1 h-4 w-4" /> Paradas
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEventFilter("update")}
              className={getFilterButtonClass("update")}
            >
              <Settings className="mr-1 h-4 w-4" /> Actualizaciones
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEventFilter("maintenance")}
              className={getFilterButtonClass("maintenance")}
            >
              <Info className="mr-1 h-4 w-4" /> Mantenimiento
            </Button>
          </div>
          <div className="space-y-4">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Activity className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No hay eventos que coincidan con el filtro seleccionado</p>
              </div>
            ) : (
              filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      {getEventIcon(event.type)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{event.description}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(event.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getEventStatusColor(event.status)}>
                      {event.status === "success" ? "Exitoso" : event.status}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        handleDeleteEvent(event.id, event.description)
                      }
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      title="Eliminar evento"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <ConfirmDialog
        isOpen={confirmDelete.isOpen}
        onClose={closeConfirmDialog}
        onConfirm={confirmDeleteEvent}
        title="Confirmar Eliminación"
        description={`¿Estás seguro de que quieres eliminar el evento "${confirmDelete.eventDescription}"? Esta acción no se puede deshacer.`}
      />
    </div>
  );
}
