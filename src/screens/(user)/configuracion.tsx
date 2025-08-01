import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Server,
  Settings,
  HardDrive,
  MemoryStick,
  Cpu,
  Network,
  CheckCircle,
  AlertTriangle,
  Save,
  X,
} from "lucide-react";
import { useServersStore } from "@/store/serversStore";
import { useNavigate } from "react-router-dom";
import { paths } from "@/routes/paths";
import { cn } from "@/lib/utils";

interface ServerConfig {
  diskSize: number;
  memory: number;
  storage: number;
  cpu: number;
  bandwidth: number;
}

export default function Configuracion() {
  const navigate = useNavigate();
  const { selectedServer, updateServerMetrics } = useServersStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [config, setConfig] = useState<ServerConfig>({
    diskSize: 0,
    memory: 0,
    storage: 0,
    cpu: 0,
    bandwidth: 0,
  });

  const [isConfiguring, setIsConfiguring] = useState(false);

  useState(() => {
    if (selectedServer) {
      setConfig({
        diskSize: Math.round(selectedServer.metrics.storage.total / 1024),
        memory: selectedServer.metrics.memory.total,
        storage: Math.round(selectedServer.metrics.storage.total / 1024),
        cpu: selectedServer.metrics.cpu.current,
        bandwidth: selectedServer.metrics.network.bandwidth,
      });
    }
  });

  const handleConfigChange = (field: keyof ServerConfig, value: string) => {
    setConfig((prev) => ({
      ...prev,
      [field]: parseInt(value) || 0,
    }));
  };

  const handleConfigure = async () => {
    setIsConfiguring(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (selectedServer) {
      updateServerMetrics({
        storage: {
          ...selectedServer.metrics.storage,
          total: config.storage * 1024,
          available:
            config.storage * 1024 - selectedServer.metrics.storage.used,
        },
        memory: {
          ...selectedServer.metrics.memory,
          total: config.memory,
        },
        network: {
          ...selectedServer.metrics.network,
          bandwidth: config.bandwidth,
        },
        cpu: {
          ...selectedServer.metrics.cpu,
          current: config.cpu,
        },
      });
    }

    setIsConfiguring(false);
    setIsModalOpen(false);
  };

  if (!selectedServer) {
    navigate(paths.user.dashboard);
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
          <Settings className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Configuración del Servidor
            </h1>
            <p className="text-gray-600">
              Gestiona la configuración de {selectedServer.server.name}
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
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <HardDrive className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">
                {Math.round(selectedServer.metrics.storage.total / 1024)} GB
              </p>
              <p className="text-sm text-gray-600">Almacenamiento</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <MemoryStick className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">
                {selectedServer.metrics.memory.total} GB
              </p>
              <p className="text-sm text-gray-600">Memoria RAM</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Cpu className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">
                {selectedServer.metrics.cpu.current}%
              </p>
              <p className="text-sm text-gray-600">CPU</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Network className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">
                {selectedServer.metrics.network.bandwidth} Mbps
              </p>
              <p className="text-sm text-gray-600">Ancho de Banda</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configuración Actual */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configuración Actual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="current-disk">Tamaño de Disco</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Input
                    id="current-disk"
                    value={`${Math.round(
                      selectedServer.metrics.storage.total / 1024
                    )} GB`}
                    disabled
                    className="bg-gray-50"
                  />
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div>
                <Label htmlFor="current-memory">Memoria RAM</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Input
                    id="current-memory"
                    value={`${selectedServer.metrics.memory.total} GB`}
                    disabled
                    className="bg-gray-50"
                  />
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div>
                <Label htmlFor="current-cpu">CPU</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Input
                    id="current-cpu"
                    value={`${selectedServer.metrics.cpu.current}%`}
                    disabled
                    className="bg-gray-50"
                  />
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="current-storage">Almacenamiento</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Input
                    id="current-storage"
                    value={`${Math.round(
                      selectedServer.metrics.storage.total / 1024
                    )} GB`}
                    disabled
                    className="bg-gray-50"
                  />
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div>
                <Label htmlFor="current-bandwidth">Ancho de Banda</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Input
                    id="current-bandwidth"
                    value={`${selectedServer.metrics.network.bandwidth} Mbps`}
                    disabled
                    className="bg-gray-50"
                  />
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div>
                <Label htmlFor="current-price">Precio Mensual</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Input
                    id="current-price"
                    value={`$${selectedServer.server.price}/mes`}
                    disabled
                    className="bg-gray-50"
                  />
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botón de Configuración */}
      <div className="text-center">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="px-8">
              <Settings className="h-5 w-5 mr-2" />
              Modificar Configuración
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Modificar Configuración del Servidor</DialogTitle>
              <DialogDescription>
                Ajusta los parámetros de tu servidor. Los cambios se aplicarán
                inmediatamente.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="disk-size">Tamaño de Disco (GB)</Label>
                  <Input
                    id="disk-size"
                    type="number"
                    value={config.diskSize}
                    onChange={(e) =>
                      handleConfigChange("diskSize", e.target.value)
                    }
                    placeholder="Ej: 500"
                  />
                </div>
                <div>
                  <Label htmlFor="memory">Memoria RAM (GB)</Label>
                  <Input
                    id="memory"
                    type="number"
                    value={config.memory}
                    onChange={(e) =>
                      handleConfigChange("memory", e.target.value)
                    }
                    placeholder="Ej: 16"
                  />
                </div>
                <div>
                  <Label htmlFor="cpu">CPU (%)</Label>
                  <Input
                    id="cpu"
                    type="number"
                    value={config.cpu}
                    onChange={(e) => handleConfigChange("cpu", e.target.value)}
                    placeholder="Ej: 75"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="storage">Almacenamiento (GB)</Label>
                  <Input
                    id="storage"
                    type="number"
                    value={config.storage}
                    onChange={(e) =>
                      handleConfigChange("storage", e.target.value)
                    }
                    placeholder="Ej: 1000"
                  />
                </div>
                <div>
                  <Label htmlFor="bandwidth">Ancho de Banda (Mbps)</Label>
                  <Input
                    id="bandwidth"
                    type="number"
                    value={config.bandwidth}
                    onChange={(e) =>
                      handleConfigChange("bandwidth", e.target.value)
                    }
                    placeholder="Ej: 250"
                  />
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Nota</span>
                  </div>
                  <p className="text-sm text-yellow-700">
                    Los cambios en la configuración pueden afectar el precio
                    mensual del servidor.
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                disabled={isConfiguring}
              >
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
              <Button
                onClick={handleConfigure}
                disabled={isConfiguring}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isConfiguring ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Configurando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Configurar
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Información Adicional */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Información Importante
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium">Configuración en Tiempo Real</p>
                <p className="text-sm text-gray-600">
                  Los cambios se aplican inmediatamente sin necesidad de
                  reiniciar el servidor.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-medium">Impacto en el Rendimiento</p>
                <p className="text-sm text-gray-600">
                  Reducir recursos puede afectar el rendimiento de tus
                  aplicaciones.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Settings className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium">Soporte Técnico</p>
                <p className="text-sm text-gray-600">
                  Nuestro equipo está disponible 24/7 para ayudarte con la
                  configuración.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
