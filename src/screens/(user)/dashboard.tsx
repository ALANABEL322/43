import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  Settings,
  Power,
  PowerOff,
  RotateCcw,
  Trash2,
  Shield,
  Copy,
  Plus,
  Wifi,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useServersStore } from "@/store/serversStore";
import { paths } from "@/routes/paths";
import { useNavigate } from "react-router-dom";
import server1 from "@/assets/server-1024x506.jpg";

interface FirewallRule {
  id: string;
  port: string;
  origin: string;
}

export function UserDashboard() {
  const navigate = useNavigate();
  const { selectedServer, updateServerMetricsSmooth, deleteServerEvent } =
    useServersStore();
  const [confirmDelete, setConfirmDelete] = useState<{
    isOpen: boolean;
    eventId: string | null;
    eventDescription: string;
  }>({
    isOpen: false,
    eventId: null,
    eventDescription: "",
  });

  const [firewallRules, setFirewallRules] = useState<FirewallRule[]>([
    { id: "1", port: "22", origin: "0.0.0.0/0" },
    { id: "2", port: "80", origin: "0.0.0.0/0" },
  ]);
  const [newPort, setNewPort] = useState("");
  // Get the IP from the selected server or use default
  const serverIP = selectedServer?.ipAddress || "192.168.1.100";

  // Debug log to check IP
  console.log(
    "Dashboard - selectedServer:",
    selectedServer?.server?.name,
    "IP:",
    serverIP
  );
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [confirmPortDelete, setConfirmPortDelete] = useState<{
    isOpen: boolean;
    portId: string | null;
    portNumber: string;
  }>({
    isOpen: false,
    portId: null,
    portNumber: "",
  });

  const recentEvents = selectedServer
    ? selectedServer.events.slice(-5).reverse()
    : [];

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

  // Firewall management functions
  const addFirewallRule = () => {
    if (
      newPort.trim() &&
      !firewallRules.some((rule) => rule.port === newPort.trim())
    ) {
      const newRule: FirewallRule = {
        id: Date.now().toString(),
        port: newPort.trim(),
        origin: "0.0.0.0/0",
      };
      setFirewallRules([...firewallRules, newRule]);
      setNewPort("");
    }
  };

  const removeFirewallRule = (id: string) => {
    setFirewallRules(firewallRules.filter((rule) => rule.id !== id));
  };

  const handleDeletePortRequest = (id: string, portNumber: string) => {
    setConfirmPortDelete({
      isOpen: true,
      portId: id,
      portNumber,
    });
  };

  const closePortDeleteDialog = () => {
    setConfirmPortDelete({
      isOpen: false,
      portId: null,
      portNumber: "",
    });
  };

  const confirmDeletePort = () => {
    if (confirmPortDelete.portId) {
      removeFirewallRule(confirmPortDelete.portId);
    }
    closePortDeleteDialog();
  };

  const copyToClipboard = async (text: string) => {
    try {
      // Método moderno para navegadores que soportan navigator.clipboard
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        setCopiedText(text);
        console.log("Copied to clipboard:", text);
        return;
      }

      // Fallback para navegadores más antiguos o contextos no seguros
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);

      if (successful) {
        setCopiedText(text);
        console.log("Copied to clipboard (fallback):", text);
      }
    } catch (err) {
      console.error("Failed to copy: ", err);
      // Mostrar un alert como último recurso
      alert(`Copia este texto manualmente: ${text}`);
    }
  };

  // Limpiar el estado de copiado después de 2 segundos
  useEffect(() => {
    if (copiedText) {
      const timer = setTimeout(() => {
        setCopiedText(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedText]);

  const getEventIcon = (type: string) => {
    switch (type) {
      case "update":
        return <Settings className="h-4 w-4" />;
      case "restart":
        return <RotateCcw className="h-4 w-4" />;
      case "start":
        return <Power className="h-4 w-4" />;
      case "stop":
        return <PowerOff className="h-4 w-4" />;
      case "maintenance":
        return <Activity className="h-4 w-4" />;
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

  useEffect(() => {
    if (!selectedServer) return;

    const interval = setInterval(() => {
      // Usar la nueva función suave que respeta las configuraciones de fluctuación
      updateServerMetricsSmooth();
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedServer, updateServerMetricsSmooth]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      case "critical":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "online":
        return "En línea";
      case "warning":
        return "Advertencia";
      case "critical":
        return "Crítico";
      default:
        return "Desconectado";
    }
  };

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Panel de Monitoreo</h1>

      {selectedServer ? (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Server className="h-8 w-8 text-blue-600" />
                <div>
                  <CardTitle className="text-xl">
                    {selectedServer.server.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    {selectedServer.server.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  // variant="secondary"
                  className={cn(
                    "text-white",
                    getStatusColor(selectedServer.metrics.status)
                  )}
                >
                  {getStatusText(selectedServer.metrics.status)}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  Uptime: {formatUptime(selectedServer.metrics.uptime)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  Última actualización:{" "}
                  {new Date(
                    selectedServer.metrics.lastUpdate
                  ).toLocaleTimeString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  Precio: ${selectedServer.server.price}/mes
                </span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  Compatibilidad:{" "}
                  {Math.round(selectedServer.server.matchPercentage || 0)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <Server className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                No hay servidor seleccionado
              </h3>
              <p className="text-yellow-700 mb-4">
                Selecciona un servidor para ver las métricas de monitoreo en
                tiempo real
              </p>
              <Button onClick={() => navigate(paths.user.servidores)}>
                Configurar Servidor
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-gray-600 flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              Uso de CPU
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Promedio</p>
                <p className="text-2xl font-semibold text-emerald-500">
                  {selectedServer
                    ? `${selectedServer.metrics.cpu.average}%`
                    : "--"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Estado Crítico</p>
                <p className="text-2xl font-semibold text-red-500">
                  {selectedServer
                    ? `${selectedServer.metrics.cpu.critical}%`
                    : "--"}
                </p>
              </div>
            </div>
            <div className="relative pt-4">
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-500"
                  style={{
                    width: selectedServer
                      ? `${selectedServer.metrics.cpu.current}%`
                      : "0%",
                  }}
                />
              </div>
              <div
                className="absolute top-0 transform -translate-x-1/2"
                style={{
                  left: selectedServer
                    ? `${selectedServer.metrics.cpu.current}%`
                    : "0%",
                }}
                aria-hidden="true"
              >
                <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white" />
              </div>
              <p className="text-center text-3xl font-bold mt-4">
                {selectedServer
                  ? `${selectedServer.metrics.cpu.current}%`
                  : "0%"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-gray-600 flex items-center gap-2">
              <MemoryStick className="h-4 w-4" />
              Uso de memoria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-2">
              {selectedServer
                ? `${selectedServer.metrics.memory.current}%`
                : "Sin datos"}
            </p>
            <div className="flex items-end h-32 gap-2">
              {(selectedServer
                ? selectedServer.metrics.memory.history
                : [0, 0, 0, 0, 0]
              ).map((value, i) => {
                const days = ["Lun", "Mar", "Mié", "Jue", "Vie"];
                return (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-gray-200 rounded-sm relative h-full">
                      <div
                        className="absolute bottom-0 left-0 right-0 bg-blue-600 rounded-sm transition-all duration-500"
                        style={{ height: `${value}%` }}
                      />
                    </div>
                    <span className="text-xs mt-1">
                      {days[i] || `D${i + 1}`}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
            {selectedServer && (
              <div className="mt-2 text-center">
                <p className="text-sm text-gray-600">
                  Total: {selectedServer.metrics.memory.total} GB
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Network Usage */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-gray-600 flex items-center gap-2">
              <Network className="h-4 w-4" />
              Uso de red
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-500">Estadística</p>
              <p className="text-sm text-gray-500">
                Esta semana{" "}
                <span className="font-medium">
                  {selectedServer
                    ? selectedServer.metrics.network.total.toLocaleString()
                    : "--"}
                </span>
              </p>
            </div>
            <p className="text-sm text-gray-500 mb-2">
              {selectedServer
                ? `${selectedServer.metrics.network.current}%`
                : "Sin datos"}
            </p>
            <div className="relative h-40 flex justify-center">
              <div className="w-40 h-40 rounded-full border-8 border-blue-600 relative">
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <div
                    className="absolute bg-blue-300 h-full w-full origin-center transition-all duration-500"
                    style={{
                      transform: `rotate(${
                        selectedServer
                          ? selectedServer.metrics.network.current * 3.6
                          : 0
                      }deg) skew(9deg, 9deg)`,
                      clipPath: "polygon(50% 50%, 100% 0, 100% 100%)",
                    }}
                  />
                </div>
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full">
                  {selectedServer ? "Actual" : "Sin datos"}
                  <br />
                  {selectedServer
                    ? selectedServer.metrics.network.current
                    : "--"}
                </div>
                <div className="absolute -right-3 top-1/3 -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full">
                  {selectedServer ? "Ancho" : "Sin datos"}
                  <br />
                  {selectedServer
                    ? `${selectedServer.metrics.network.bandwidth} Mbps`
                    : "--"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Storage Usage */}
      {selectedServer && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="h-5 w-5" />
              Almacenamiento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {Math.round(
                    (selectedServer.metrics.storage.used /
                      selectedServer.metrics.storage.total) *
                      100
                  )}
                  %
                </p>
                <p className="text-sm text-gray-600">Usado</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {Math.round(selectedServer.metrics.storage.available / 1024)}{" "}
                  GB
                </p>
                <p className="text-sm text-gray-600">Disponible</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round(selectedServer.metrics.storage.total / 1024)} GB
                </p>
                <p className="text-sm text-gray-600">Total</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.round(
                      (selectedServer.metrics.storage.used /
                        selectedServer.metrics.storage.total) *
                        100
                    )}%`,
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Middle section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Expenses */}
        <Card className="bg-gray-100">
          <CardHeader>
            <CardTitle>Gastos</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="font-medium mb-2">
              {selectedServer
                ? `Costo del servidor: $${selectedServer.server.price}/mes`
                : "Servidor"}
            </h3>
            <p className="text-sm text-gray-600">
              {selectedServer
                ? `Servidor ${selectedServer.server.name} con ${selectedServer.server.features.length} características incluidas.`
                : "Crear un servidor conlleva una serie de gastos que es importante tener en cuenta desde el principio. En primer lugar, está el costo del hardware, que dependerá del tipo de servidor que se quiera montar. Una máquina básica puede incluir un procesador decente, al menos 16GB de RAM y un disco SSD, pero si se busca mayor rendimiento o tolerancia a fallos, será necesario invertir en componentes más robustos, como fuentes redundantes, almacenamiento RAID, o procesadores con múltiples núcleos."}
            </p>
          </CardContent>
        </Card>

        {/* Performance */}
        <Card className="bg-gray-100">
          <CardHeader>
            <CardTitle>Rendimiento</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="font-medium mb-2">
              {selectedServer
                ? `Compatibilidad: ${Math.round(
                    selectedServer.server.matchPercentage || 0
                  )}%`
                : "Máquina genérica"}
            </h3>
            <p className="text-sm text-gray-600">
              {selectedServer
                ? `Optimizado para: ${selectedServer.server.recommendedFor.join(
                    ", "
                  )}`
                : "Se puede decir que un servidor con características promedio —por ejemplo, un procesador de 4 núcleos, 16 a 32GB de RAM y disco SSD— puede soportar sin problemas aplicaciones web medianas, sitios con tráfico moderado, pequeños sistemas de gestión o entornos de desarrollo. Su rendimiento dependerá del tipo de tareas que se le asignen: servidores de archivos, servidores web, bases de datos o contenedores tienen demandas distintas. A mayor cantidad de procesos simultáneos o usuarios conectados, mayor será la necesidad de CPU y memoria."}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Servidor Seleccionado Card */}
      {selectedServer && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Mi Servidor</h2>
            <Badge
              variant="secondary"
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

          <Card className="overflow-hidden">
            <CardHeader className="p-4 pb-0">
              <div className="flex items-start gap-3">
                <Server className="h-8 w-8 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">
                    {selectedServer.server.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {selectedServer.server.description}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm text-gray-500">
                      Precio: ${selectedServer.server.price}/mes
                    </span>
                    <span className="text-sm text-gray-500">
                      Compatibilidad:{" "}
                      {Math.round(selectedServer.server.matchPercentage || 0)}%
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 relative">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={server1}
                  alt="Rack de servidores"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 text-white bg-black/50 px-3 py-2 rounded-lg">
                  <p className="text-sm font-medium">
                    Servidor Recomendado por IA
                  </p>
                  <p className="text-xs opacity-90">
                    Optimizado para:{" "}
                    {selectedServer.server.recommendedFor.join(", ")}
                  </p>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      {selectedServer.metrics.cpu.current}%
                    </p>
                    <p className="text-xs text-gray-600">CPU</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {selectedServer.metrics.memory.current}%
                    </p>
                    <p className="text-xs text-gray-600">RAM</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">
                      {Math.round(
                        (selectedServer.metrics.storage.used /
                          selectedServer.metrics.storage.total) *
                          100
                      )}
                      %
                    </p>
                    <p className="text-xs text-gray-600">Almacenamiento</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">
                      {selectedServer.metrics.network.current}%
                    </p>
                    <p className="text-xs text-gray-600">Red</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <div className="flex gap-2 w-full">
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={() => navigate(paths.user.rendimiento)}
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Rendimiento
                </Button>
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={() => navigate(paths.user.configuracion)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Configuración
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Configuración de Firewall */}
      {selectedServer && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Configuración de Firewall
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Puerto (ej: 443, 8080)"
                  value={newPort}
                  onChange={(e) => setNewPort(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addFirewallRule()}
                  className="flex-1"
                />
                <Button onClick={addFirewallRule} disabled={!newPort.trim()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Puerto
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Intervalo de Puertos</TableHead>
                    <TableHead>Origen</TableHead>
                    <TableHead className="w-20">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {firewallRules.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell className="font-medium">{rule.port}</TableCell>
                      <TableCell>{rule.origin}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleDeletePortRequest(rule.id, rule.port)
                          }
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Información de Conexión */}
      {selectedServer && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="h-5 w-5" />
              Información de Conexión
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-600">Usuario</div>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <code className="text-sm font-mono">ubuntu</code>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-600">
                  IP del Servidor
                </div>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <code className="text-sm font-mono">{serverIP}</code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(serverIP)}
                    className="ml-auto"
                  >
                    {copiedText === serverIP ? (
                      <>
                        <span className="text-xs text-green-600 mr-1">✓</span>
                        <Copy className="h-4 w-4 text-green-600" />
                      </>
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-800">Conexión SSH</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white rounded border">
                <code className="text-sm font-mono flex-1">
                  ssh ubuntu@{serverIP}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(`ssh ubuntu@${serverIP}`)}
                >
                  {copiedText === `ssh ubuntu@${serverIP}` ? (
                    <>
                      <span className="text-xs text-green-600 mr-1">✓</span>
                      <Copy className="h-4 w-4 text-green-600" />
                    </>
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Eventos Recientes */}
      {selectedServer && recentEvents.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Eventos Recientes
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(paths.user.rendimiento)}
                className="text-blue-600 hover:text-blue-700"
              >
                Ver todos →
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between gap-4 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      {getEventIcon(event.type)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{event.description}</p>
                      <p className="text-xs text-gray-600">
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
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <ConfirmDialog
        isOpen={confirmDelete.isOpen}
        onClose={closeConfirmDialog}
        onConfirm={confirmDeleteEvent}
        title="Confirmar eliminación"
        description={`¿Estás seguro de que quieres eliminar el evento "${confirmDelete.eventDescription}"? Esta acción no se puede deshacer.`}
      />

      <ConfirmDialog
        isOpen={confirmPortDelete.isOpen}
        onClose={closePortDeleteDialog}
        onConfirm={confirmDeletePort}
        title="🔒 Eliminar Puerto del Firewall"
        description={`¿Estás seguro de que deseas eliminar el puerto ${confirmPortDelete.portNumber}? Esta acción cerrará el acceso a este puerto y puede afectar servicios que dependan de él. Esta acción no se puede deshacer.`}
      />
    </div>
  );
}
