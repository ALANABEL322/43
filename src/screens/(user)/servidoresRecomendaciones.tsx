import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Brain, Zap, Shield, Server } from "lucide-react";
import { useServersStore } from "@/store/serversStore";
import { paths } from "@/routes/paths";

export default function ServidoresRecomendaciones() {
  const navigate = useNavigate();
  const { userRequirements, getRecommendedServers, specifications } =
    useServersStore();

  // Si no hay requisitos del usuario, redirigir a la página de configuración
  if (!userRequirements) {
    navigate(paths.user.servidores);
    return null;
  }

  const recommendedServers = getRecommendedServers(
    userRequirements.selectedSpecs,
    userRequirements.selectedSubSpecs
  );

  const getSpecificationName = (specId: string) => {
    const spec = specifications.find((s) => s.id === specId);
    return spec?.name || specId;
  };

  const handleSelectServer = (serverId: string) => {
    // Encontrar el servidor seleccionado
    const selectedServer = recommendedServers.find(
      (server) => server.id === serverId
    );
    if (selectedServer) {
      // Guardar el servidor seleccionado en el store
      useServersStore.getState().selectServer(selectedServer);
      console.log("Servidor seleccionado:", selectedServer.name);
    }
    // Navegar al dashboard
    navigate(paths.user.dashboard);
  };

  const handleBack = () => {
    navigate(paths.user.servidores);
  };

  const getServerIcon = (serverId: string) => {
    switch (serverId) {
      case "basic-web":
        return <Server className="h-8 w-8 text-blue-500" />;
      case "business-server":
        return <Zap className="h-8 w-8 text-green-500" />;
      case "enterprise-server":
        return <Shield className="h-8 w-8 text-purple-500" />;
      case "database-server":
        return <Brain className="h-8 w-8 text-orange-500" />;
      case "storage-server":
        return <Server className="h-8 w-8 text-indigo-500" />;
      case "development-server":
        return <Zap className="h-8 w-8 text-teal-500" />;
      default:
        return <Server className="h-8 w-8 text-gray-500" />;
    }
  };

  const getServerDescription = (serverId: string) => {
    switch (serverId) {
      case "basic-web":
        return "Perfecto para proyectos personales y sitios web de bajo tráfico. Ofrece un equilibrio ideal entre rendimiento y costo.";
      case "business-server":
        return "Ideal para empresas en crecimiento que necesitan confiabilidad y escalabilidad. Maneja aplicaciones empresariales con eficiencia.";
      case "enterprise-server":
        return "La solución definitiva para aplicaciones críticas y alto rendimiento. Diseñado para empresas que requieren máxima potencia.";
      case "database-server":
        return "Optimizado específicamente para bases de datos y aplicaciones de datos intensivas. Rendimiento excepcional para analytics.";
      case "storage-server":
        return "Especializado en almacenamiento masivo y backup empresarial. Ideal para archivos grandes y respaldos críticos.";
      case "development-server":
        return "Configurado para equipos de desarrollo con herramientas integradas. Perfecto para testing y entornos de desarrollo.";
      default:
        return "Servidor personalizado que se adapta a tus necesidades específicas.";
    }
  };

  return (
    <div className="container mx-auto py-10 max-w-6xl">
      <div className="mb-8">
        <Button variant="ghost" onClick={handleBack} className="mb-4">
          ← Volver
        </Button>
        <div className="flex items-center gap-3 mb-4">
          <Brain className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold mb-2">Recomendaciones de IA</h1>
            <p className="text-gray-600">
              Nuestra inteligencia artificial ha analizado tus necesidades y te
              recomienda estos servidores optimizados
            </p>
          </div>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-500" />
            Análisis de Requisitos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userRequirements.selectedSpecs.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Categorías Principales:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {userRequirements.selectedSpecs.map((specId) => {
                    const spec = specifications.find((s) => s.id === specId);
                    return (
                      <Badge key={specId} variant="secondary">
                        {spec?.name}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}

            {userRequirements.selectedSubSpecs.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Especificaciones Detalladas:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {userRequirements.selectedSubSpecs.map((subSpecId) => {
                    const spec = specifications.find((s) =>
                      s.subOptions?.some((subOpt) => subOpt.id === subSpecId)
                    );
                    const subOption = spec?.subOptions?.find(
                      (subOpt) => subOpt.id === subSpecId
                    );
                    return (
                      <Badge key={subSpecId} variant="outline">
                        {subOption?.name}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}

            {userRequirements.additionalNotes && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Requisitos Adicionales:
                </h4>
                <p className="text-gray-700 text-sm bg-blue-50 p-3 rounded-lg">
                  {userRequirements.additionalNotes}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {recommendedServers.map((server, index) => (
          <Card
            key={server.id}
            className={`relative hover:shadow-lg transition-all duration-300 ${
              index === 0 ? "ring-2 ring-blue-500 scale-105" : "hover:scale-105"
            }`}
          >
            {index === 0 && (
              <div className="absolute -top-3 left-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <Brain className="h-3 w-3" />
                Mejor Opción IA
              </div>
            )}

            <CardHeader>
              <div className="flex items-center gap-3 mb-3">
                {getServerIcon(server.id)}
                <div className="flex-1">
                  <CardTitle className="text-xl">{server.name}</CardTitle>
                  <Badge className="bg-green-100 text-green-800 mt-1">
                    {Math.round(server.matchPercentage || 0)}% compatibilidad
                  </Badge>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                {getServerDescription(server.id)}
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  Especificaciones Técnicas:
                </h4>
                <ul className="space-y-2">
                  {server.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center space-x-2 text-sm"
                    >
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-900 flex items-center gap-2">
                  <Brain className="h-4 w-4 text-blue-500" />
                  Casos de Uso Ideales:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {server.recommendedFor.map((useCase, useCaseIndex) => (
                    <Badge
                      key={useCaseIndex}
                      variant="outline"
                      className="text-xs"
                    >
                      {useCase}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Button
                  onClick={() => handleSelectServer(server.id)}
                  className="w-full"
                  variant={index === 0 ? "default" : "outline"}
                >
                  {index === 0 ? "Implementar Recomendación" : "Ver Detalles"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {recommendedServers.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No encontramos servidores que coincidan con tus requisitos
            </h3>
            <p className="text-gray-600 mb-4">
              Nuestra IA sugiere ajustar las especificaciones o contactar con
              nuestro equipo de expertos para una solución personalizada.
            </p>
            <Button onClick={handleBack}>Ajustar Especificaciones</Button>
          </CardContent>
        </Card>
      )}

      <div className="mt-8 text-center">
        <p className="text-gray-600 mb-4">
          ¿Necesitas una recomendación más específica?
        </p>
        <Button variant="outline" onClick={handleBack}>
          Reconfigurar Requisitos
        </Button>
      </div>
    </div>
  );
}
