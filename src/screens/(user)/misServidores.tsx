import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
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
  Loader2,
  RotateCcw,
  Copy,
  Settings,
} from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";
import { useServersStore } from "@/store/serversStore";
import { paths } from "@/routes/paths";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { cn } from "@/lib/utils";
import imgServer from "@/assets/server-1024x506.jpg";

export function MisServidores() {
  const navigate = useNavigate();
  const isMobile = useMobile();
  const {
    userCreatedServers,
    selectUserCreatedServer,
    updateUserServerStatus,
    deleteUserCreatedServer,
  } = useServersStore();
  const restartUserServer = useServersStore((state) => state.restartUserServer);

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
  const [serverOperations, setServerOperations] = useState<{
    [key: string]: {
      isStarting: boolean;
      isStopping: boolean;
      isRestarting: boolean;
    };
  }>({});
  const [copiedIP, setCopiedIP] = useState<string | null>(null);

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

  const handleServerToggle = async (
    serverId: string,
    currentStatus: boolean
  ) => {
    const isStarting = !currentStatus;

    // Actualizar estado de operación
    setServerOperations((prev) => ({
      ...prev,
      [serverId]: {
        isStarting,
        isStopping: !isStarting,
        isRestarting: false,
      },
    }));

    // Simular operación de 5 segundos
    setTimeout(() => {
      updateUserServerStatus(serverId, !currentStatus);

      // Limpiar estado de operación
      setServerOperations((prev) => ({
        ...prev,
        [serverId]: {
          isStarting: false,
          isStopping: false,
          isRestarting: false,
        },
      }));
    }, 5000);
  };

  const handleServerRestart = async (serverId: string) => {
    // Actualizar estado de operación
    setServerOperations((prev) => ({
      ...prev,
      [serverId]: {
        isStarting: false,
        isStopping: false,
        isRestarting: true,
      },
    }));

    // Usar la función del store que maneja el reinicio (5 segundos total: 2.5 detener + 2.5 iniciar)
    restartUserServer(serverId);

    // Limpiar estado de operación después de 5 segundos
    setTimeout(() => {
      setServerOperations((prev) => ({
        ...prev,
        [serverId]: {
          isStarting: false,
          isStopping: false,
          isRestarting: false,
        },
      }));
    }, 5000);
  };

  const copyIPToClipboard = async (ip: string) => {
    try {
      await navigator.clipboard.writeText(ip);
      setCopiedIP(ip);
      setTimeout(() => setCopiedIP(null), 2000);
    } catch (err) {
      console.error("Error copying IP:", err);
    }
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

  const getServerOperationState = (serverId: string) => {
    return (
      serverOperations[serverId] || {
        isStarting: false,
        isStopping: false,
        isRestarting: false,
      }
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Mis Servidores</h1>
          <p className="text-gray-600 mt-2">
            Gestiona y monitorea todos tus servidores creados
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          {servers.length} {servers.length === 1 ? "servidor" : "servidores"}
        </Badge>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Panel de Control</h2>
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
                      {(() => {
                        const operationState = getServerOperationState(
                          server.id
                        );
                        if (operationState.isStarting) {
                          return (
                            <Badge
                              variant="secondary"
                              className="text-xs bg-yellow-100 text-yellow-800"
                            >
                              Iniciando...
                            </Badge>
                          );
                        } else if (operationState.isStopping) {
                          return (
                            <Badge
                              variant="secondary"
                              className="text-xs bg-yellow-100 text-yellow-800"
                            >
                              Deteniendo...
                            </Badge>
                          );
                        } else if (operationState.isRestarting) {
                          return (
                            <Badge
                              variant="secondary"
                              className="text-xs bg-orange-100 text-orange-800"
                            >
                              Reiniciando...
                            </Badge>
                          );
                        } else {
                          return (
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
                          );
                        }
                      })()}
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
                    <h4 className="font-medium mb-2">{server.description}</h4>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          IP: {server.ipAddress}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => copyIPToClipboard(server.ipAddress)}
                        >
                          <Copy
                            className={cn(
                              "h-3 w-3",
                              copiedIP === server.ipAddress
                                ? "text-green-500"
                                : "text-gray-500"
                            )}
                          />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600">
                        Creado:{" "}
                        {new Date(server.createdDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        Precio: ${server.baseServer.price}/mes
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <div className="flex flex-col gap-2 w-full">
                    {/* Primera fila: Control de encendido/apagado y reinicio */}
                    <div className="flex gap-2">
                      {(() => {
                        const operationState = getServerOperationState(
                          server.id
                        );
                        const isOperating =
                          operationState.isStarting ||
                          operationState.isStopping ||
                          operationState.isRestarting;

                        return (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleServerToggle(server.id, server.isRunning)
                              }
                              disabled={isOperating}
                              className={cn(
                                "flex-1",
                                isOperating
                                  ? "text-yellow-600 border-yellow-600 bg-yellow-50"
                                  : server.isRunning
                                  ? "text-red-600 border-red-600 hover:bg-red-50"
                                  : "text-green-600 border-green-600 hover:bg-green-50"
                              )}
                            >
                              {operationState.isStarting ? (
                                <>
                                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                                  Iniciando...
                                </>
                              ) : operationState.isStopping ? (
                                <>
                                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                                  Deteniendo...
                                </>
                              ) : server.isRunning ? (
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
                              variant="outline"
                              size="sm"
                              onClick={() => handleServerRestart(server.id)}
                              disabled={isOperating || !server.isRunning}
                              className={cn(
                                "flex-1",
                                operationState.isRestarting
                                  ? "text-orange-600 border-orange-600 bg-orange-50"
                                  : "text-orange-600 border-orange-600 hover:bg-orange-50"
                              )}
                            >
                              {operationState.isRestarting ? (
                                <>
                                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                                  Reiniciando...
                                </>
                              ) : (
                                <>
                                  <RotateCcw className="h-4 w-4 mr-1" />
                                  Reiniciar
                                </>
                              )}
                            </Button>
                          </>
                        );
                      })()}
                    </div>

                    {/* Segunda fila: Ver Dashboard y Configuración */}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleViewServer(server.id)}
                        className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                        disabled={
                          getServerOperationState(server.id).isStarting ||
                          getServerOperationState(server.id).isStopping ||
                          getServerOperationState(server.id).isRestarting
                        }
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Ver Dashboard
                      </Button>
                    </div>
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
