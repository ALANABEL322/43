import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
  AlertTriangle,
  Bell,
  CheckCircle,
  Clock,
  DollarSign,
  Info,
  Settings,
  TrendingUp,
  X,
  Zap,
  Activity,
  HardDrive,
  MemoryStick,
  Cpu,
  Network,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";
import { useAlertsStore } from "@/store/alertsStore";
import { useServersStore } from "@/store/serversStore";
import { cn } from "@/lib/utils";

export default function PanelDeAlertas() {
  const {
    alerts,
    alertSettings,
    metrics,
    markAsRead,
    markAsResolved,
    deleteAlert,
    updateAlertSettings,
    clearAllAlerts,
    generateMockAlerts,
    updateMetrics,
    toggleRead,
    resetStore,
  } = useAlertsStore();

  const { selectedServer } = useServersStore();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [filter, setFilter] = useState<
    "all" | "critical" | "warning" | "info" | "success"
  >("all");
  const [showResolved, setShowResolved] = useState(false);

  // Generar alertas mock al cargar si no hay ninguna
  useEffect(() => {
    if (alerts.length === 0) {
      // Resetear completamente el store antes de generar nuevas alertas
      resetStore();
      // Pequeño delay para asegurar que el reset se complete
      setTimeout(() => {
        generateMockAlerts();
      }, 100);
    }
  }, [alerts.length, generateMockAlerts, resetStore]);

  // Actualizar métricas en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedServer) {
        updateMetrics({
          uptimePercentage: Math.floor(Math.random() * 20) + 80,
          averageResponseTime: Math.floor(Math.random() * 100) + 50,
          costOverrun: Math.floor(Math.random() * 30),
          resourceUtilization: Math.floor(Math.random() * 40) + 60,
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedServer, updateMetrics]);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical":
        return "border-red-200 bg-red-50";
      case "warning":
        return "border-yellow-200 bg-yellow-50";
      case "info":
        return "border-blue-200 bg-blue-50";
      case "success":
        return "border-green-200 bg-green-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  const getSeverityColor = (severity: number) => {
    if (severity >= 4) return "bg-red-100 text-red-800";
    if (severity >= 3) return "bg-yellow-100 text-yellow-800";
    if (severity >= 2) return "bg-blue-100 text-blue-800";
    return "bg-green-100 text-green-800";
  };

  const filteredAlerts = alerts.filter((alert) => {
    if (filter !== "all" && alert.type !== filter) return false;
    if (!showResolved && !alert.isActive) return false;
    return true;
  });

  const activeAlerts = alerts.filter((alert) => alert.isActive);
  const unreadAlerts = alerts.filter((alert) => !alert.isRead);

  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Bell className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold mb-2">Panel de Alertas</h1>
              <p className="text-gray-600">
                Monitoreo y gestión de alertas del sistema
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsSettingsOpen(true)}>
              <Settings className="h-4 w-4 mr-2" />
              Configuración
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                resetStore();
                setTimeout(() => {
                  generateMockAlerts();
                }, 100);
              }}
            >
              <Zap className="h-4 w-4 mr-2" />
              Regenerar Alertas
            </Button>
          </div>
        </div>
      </div>

      {/* Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Alertas Activas
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeAlerts.length}</div>
            <p className="text-xs text-muted-foreground">
              {unreadAlerts.length} sin leer
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.uptimePercentage}%
            </div>
            <p className="text-xs text-muted-foreground">
              Tiempo de respuesta: {metrics.averageResponseTime}ms
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilización</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.resourceUtilization}%
            </div>
            <p className="text-xs text-muted-foreground">Recursos en uso</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Costo</CardTitle>
            <DollarSign className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.costOverrun}</div>
            <p className="text-xs text-muted-foreground">
              Exceso presupuestario
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex gap-2">
          {["all", "critical", "warning", "info", "success"].map((type) => (
            <Button
              key={type}
              variant={filter === type ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(type as any)}
            >
              {type === "all"
                ? "Todas"
                : type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Switch checked={showResolved} onCheckedChange={setShowResolved} />
          <Label>Mostrar Resueltas</Label>
        </div>
      </div>

      {/* Lista de Alertas */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No hay alertas
              </h3>
              <p className="text-gray-600">
                No se encontraron alertas con los filtros seleccionados
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredAlerts.map((alert) => (
            <Card
              key={alert.id}
              className={cn(
                "transition-all duration-200",
                getAlertColor(alert.type),
                !alert.isRead && "ring-2 ring-blue-500",
                !alert.isActive && "opacity-60"
              )}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{alert.title}</h4>
                        <Badge className={getSeverityColor(alert.severity)}>
                          Severidad {alert.severity}
                        </Badge>
                        {alert.actionRequired && (
                          <Badge variant="destructive">Acción Requerida</Badge>
                        )}
                        {!alert.isRead && (
                          <Badge variant="secondary">Nuevo</Badge>
                        )}
                        {!alert.isActive && (
                          <Badge
                            variant="outline"
                            className="text-green-600 border-green-600"
                          >
                            Resuelta
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {alert.message}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(alert.timestamp).toLocaleString()}
                        </span>
                        <span className="capitalize">{alert.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {!alert.isRead && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleRead(alert.id)}
                        title="Marcar como leída"
                        className="hover:bg-blue-100 hover:text-blue-600"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                    {alert.isRead && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleRead(alert.id)}
                        title="Marcar como no leída"
                        className="hover:bg-gray-100 hover:text-gray-600"
                      >
                        <EyeOff className="h-4 w-4" />
                      </Button>
                    )}
                    {alert.isActive && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => markAsResolved(alert.id)}
                        title="Resolver alerta"
                        className="hover:bg-green-100 hover:text-green-600"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteAlert(alert.id)}
                      title="Eliminar alerta"
                      className="hover:bg-red-100 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Configuración de Alertas */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Configuración de Alertas</DialogTitle>
            <DialogDescription>
              Configura los umbrales y notificaciones para las alertas del
              sistema
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cpu-threshold">Umbral CPU (%)</Label>
                <Input
                  id="cpu-threshold"
                  type="number"
                  value={alertSettings.cpuThreshold}
                  onChange={(e) =>
                    updateAlertSettings({
                      cpuThreshold: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="memory-threshold">Umbral Memoria (%)</Label>
                <Input
                  id="memory-threshold"
                  type="number"
                  value={alertSettings.memoryThreshold}
                  onChange={(e) =>
                    updateAlertSettings({
                      memoryThreshold: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="storage-threshold">
                  Umbral Almacenamiento (%)
                </Label>
                <Input
                  id="storage-threshold"
                  type="number"
                  value={alertSettings.storageThreshold}
                  onChange={(e) =>
                    updateAlertSettings({
                      storageThreshold: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="network-threshold">Umbral Red (%)</Label>
                <Input
                  id="network-threshold"
                  type="number"
                  value={alertSettings.networkThreshold}
                  onChange={(e) =>
                    updateAlertSettings({
                      networkThreshold: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications">
                  Notificaciones por Email
                </Label>
                <Switch
                  id="email-notifications"
                  checked={alertSettings.enableEmailNotifications}
                  onCheckedChange={(checked) =>
                    updateAlertSettings({ enableEmailNotifications: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="push-notifications">Notificaciones Push</Label>
                <Switch
                  id="push-notifications"
                  checked={alertSettings.enablePushNotifications}
                  onCheckedChange={(checked) =>
                    updateAlertSettings({ enablePushNotifications: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="critical-only">Solo Alertas Críticas</Label>
                <Switch
                  id="critical-only"
                  checked={alertSettings.criticalAlertsOnly}
                  onCheckedChange={(checked) =>
                    updateAlertSettings({ criticalAlertsOnly: checked })
                  }
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setIsSettingsOpen(false)}>
              Guardar Configuración
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
