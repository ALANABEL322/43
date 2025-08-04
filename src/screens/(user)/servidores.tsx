import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  ChevronRight,
  Info,
  Plus,
  Cpu,
  Server,
  Database,
  Shield,
  Zap,
  CheckCircle,
} from "lucide-react";
import { useServersStore } from "@/store/serversStore";
import { paths } from "@/routes/paths";
// import { gsap } from "gsap";

export default function Servidores() {
  const navigate = useNavigate();
  const {
    specifications,
    predefinedServers,
    getRecommendedServers,
    createUserServer,
  } = useServersStore();

  const [selectedSpecs, setSelectedSpecs] = useState<string[]>([]);
  const [selectedSubSpecs, setSelectedSubSpecs] = useState<string[]>([]);
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [expandedSpec, setExpandedSpec] = useState<string | null>(null);
  const [serverName, setServerName] = useState("");
  const [serverDescription, setServerDescription] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [recommendedServers, setRecommendedServers] = useState<any[]>([]);

  const handleSpecToggle = (specId: string) => {
    setSelectedSpecs((prev) => {
      if (prev.includes(specId)) {
        return prev.filter((id) => id !== specId);
      } else {
        return [...prev, specId];
      }
    });

    const spec = specifications.find((s) => s.id === specId);
    if (spec && spec.subOptions) {
      const subOptionsToRemove = spec.subOptions.map((subOpt) => subOpt.id);
      setSelectedSubSpecs((prev) => {
        return prev.filter((id) => !subOptionsToRemove.includes(id));
      });
    }
  };

  const handleSubOptionToggle = (subSpecId: string, specId: string) => {
    setSelectedSubSpecs((prev) => {
      if (prev.includes(subSpecId)) {
        return prev.filter((id) => id !== subSpecId);
      } else {
        const otherSubSpecsInCategory = prev.filter((id) => {
          const spec = specifications.find((s) => s.id === specId);
          return (
            spec?.subOptions?.some((subOpt) => subOpt.id === id) &&
            id !== subSpecId
          );
        });

        const remainingSubSpecs = prev.filter(
          (id) => !otherSubSpecsInCategory.includes(id)
        );
        return [...remainingSubSpecs, subSpecId];
      }
    });

    setSelectedSpecs((prev) => {
      const newSpecs = prev.filter((id) => id !== specId);
      return [...newSpecs, specId];
    });
  };

  const handleGetRecommendations = () => {
    if (
      (selectedSpecs.length > 0 || selectedSubSpecs.length > 0) &&
      serverName.trim()
    ) {
      setIsProcessing(true);
      setProcessingStep(0);
      setProcessingProgress(0);

      // Iniciar secuencia de animaciones de 15 segundos
      startProcessingAnimation();
    }
  };

  const startProcessingAnimation = () => {
    const steps = [
      { step: 0, duration: 2000, progress: 10 },
      { step: 1, duration: 3000, progress: 25 },
      { step: 2, duration: 2500, progress: 45 },
      { step: 3, duration: 2500, progress: 65 },
      { step: 4, duration: 2000, progress: 80 },
      { step: 5, duration: 1500, progress: 95 },
      { step: 6, duration: 1500, progress: 100 },
    ];

    let totalTime = 0;

    steps.forEach((stepData, index) => {
      setTimeout(() => {
        setProcessingStep(stepData.step);

        // Animar progreso gradualmente
        let currentProgress = index > 0 ? steps[index - 1].progress : 0;
        const targetProgress = stepData.progress;
        const progressDuration = stepData.duration;
        const progressIncrement =
          (targetProgress - currentProgress) / (progressDuration / 100);

        const progressInterval = setInterval(() => {
          currentProgress += progressIncrement;
          if (currentProgress >= targetProgress) {
            currentProgress = targetProgress;
            clearInterval(progressInterval);
          }
          setProcessingProgress(Math.round(currentProgress));
        }, 100);
      }, totalTime);

      totalTime += stepData.duration;
    });

    // Finalizar después de 15 segundos
    setTimeout(() => {
      // Obtener servidores recomendados
      const recommendations = getRecommendedServers(
        selectedSpecs,
        selectedSubSpecs
      );

      // Si no hay recomendaciones, usar los 3 primeros servidores predefinidos
      const finalRecommendations =
        recommendations.length > 0
          ? recommendations.slice(0, 3)
          : predefinedServers
              .slice(0, 3)
              .map((server) => ({ ...server, matchPercentage: 0 }));

      setRecommendedServers(finalRecommendations);
      setIsProcessing(false);
      setShowRecommendations(true);
    }, 15000);
  };

  const handleCreateServer = async (selectedServerOption: any) => {
    setIsCreating(true);

    try {
      // Crear el servidor con la opción seleccionada
      const newServerId = createUserServer({
        name: serverName.trim(),
        description:
          serverDescription.trim() ||
          `Servidor configurado con ${
            selectedSpecs.length + selectedSubSpecs.length
          } especificaciones`,
        baseServer: selectedServerOption,
        selectedSpecs,
        selectedSubSpecs,
        additionalNotes,
      });

      console.log("Servidor creado exitosamente:", newServerId);

      // Navegar de vuelta al inicio
      navigate(paths.user.misServidores);
    } catch (error) {
      console.error("Error creando servidor:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleBackToConfiguration = () => {
    setShowRecommendations(false);
    setIsProcessing(false);
    setProcessingStep(0);
    setProcessingProgress(0);
    setRecommendedServers([]);
  };

  const handleCancel = () => {
    navigate(paths.user.misServidores);
  };

  const getSelectedSubSpecsForSpec = (specId: string) => {
    const spec = specifications.find((s) => s.id === specId);
    if (!spec?.subOptions) return [];

    return selectedSubSpecs.filter((subSpecId) =>
      spec.subOptions?.some((subOpt) => subOpt.id === subSpecId)
    );
  };

  // Obtener especificaciones seleccionadas para mostrar en el procesamiento
  const getSelectedSpecsDetails = () => {
    const specDetails = selectedSpecs.map((specId) => {
      const spec = specifications.find((s) => s.id === specId);
      return spec?.name || specId;
    });

    const subSpecDetails = selectedSubSpecs.map((subSpecId) => {
      const spec = specifications.find((s) =>
        s.subOptions?.some((subOpt) => subOpt.id === subSpecId)
      );
      const subOption = spec?.subOptions?.find(
        (subOpt) => subOpt.id === subSpecId
      );
      return subOption?.name || subSpecId;
    });

    return [...specDetails, ...subSpecDetails];
  };

  const processingSteps = [
    {
      icon: <Database className="h-6 w-6" />,
      title: "Analizando Requerimientos",
      description: `Procesando ${
        selectedSpecs.length + selectedSubSpecs.length
      } especificaciones seleccionadas`,
      details: getSelectedSpecsDetails().slice(0, 3),
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "Evaluando Hardware",
      description: "Comparando configuraciones de CPU, RAM y almacenamiento",
      details: [
        "Procesadores multi-núcleo",
        "Memoria optimizada",
        "Almacenamiento SSD",
      ],
    },
    {
      icon: <Server className="h-6 w-6" />,
      title: "Consultando Base de Datos",
      description: "Accediendo a catálogo de servidores disponibles",
      details: [
        "Servidores web",
        "Servidores empresariales",
        "Servidores especializados",
      ],
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Calculando Rendimiento",
      description: "Estimando rendimiento y compatibilidad",
      details: [
        "Benchmarks de rendimiento",
        "Optimizaciones específicas",
        "Escalabilidad",
      ],
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Validando Seguridad",
      description: "Verificando configuraciones de seguridad",
      details: [
        "Protocolos de seguridad",
        "Certificaciones",
        "Cumplimiento normativo",
      ],
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Optimizando Selección",
      description: "Seleccionando las 3 mejores opciones",
      details: [
        "Mejor relación precio/rendimiento",
        "Mayor compatibilidad",
        "Recomendación personalizada",
      ],
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Finalizando Análisis",
      description: "Preparando recomendaciones personalizadas",
      details: [
        "Análisis completado",
        "Recomendaciones listas",
        "Configuración optimizada",
      ],
    },
  ];

  // Pantalla de procesamiento de IA
  if (isProcessing) {
    const currentStep = processingSteps[processingStep];

    return (
      <div className="container mx-auto py-10 max-w-6xl">
        <div className="min-h-[70vh] space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
              </div>
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto flex items-center justify-center animate-pulse">
                <span className="text-white font-bold text-xl">IA</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Procesando con Inteligencia Artificial
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Analizando tu configuración <strong>"{serverName}"</strong> para
              encontrar las opciones óptimas de servidores
            </p>
          </div>

          {/* Progress Bar */}
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Progreso</span>
              <span>{processingProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
                style={{ width: `${processingProgress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Current Step */}
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white animate-pulse">
                    {currentStep.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {currentStep.title}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {currentStep.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {currentStep.details.map((detail, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-blue-100 text-blue-800 animate-fadeIn"
                          style={{ animationDelay: `${index * 200}ms` }}
                        >
                          {detail}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Steps Overview */}
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4">
              {processingSteps.map((step, index) => (
                <div
                  key={index}
                  className={`text-center p-3 rounded-lg transition-all duration-500 ${
                    index === processingStep
                      ? "bg-blue-100 border-2 border-blue-500 scale-105"
                      : index < processingStep
                      ? "bg-green-100 border-2 border-green-500"
                      : "bg-gray-100 border-2 border-gray-300"
                  }`}
                >
                  <div
                    className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${
                      index === processingStep
                        ? "bg-blue-600 text-white animate-pulse"
                        : index < processingStep
                        ? "bg-green-600 text-white"
                        : "bg-gray-400 text-white"
                    }`}
                  >
                    {index < processingStep ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <span className="text-xs font-bold">{index + 1}</span>
                    )}
                  </div>
                  <p className="text-xs font-medium text-gray-700">
                    {step.title.split(" ")[0]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Specifications Display */}
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Especificaciones Analizadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getSelectedSpecsDetails().map((spec, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg animate-slideIn"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{spec}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            
            @keyframes slideIn {
              from { opacity: 0; transform: translateX(-20px); }
              to { opacity: 1; transform: translateX(0); }
            }
            
            .animate-fadeIn {
              animation: fadeIn 0.5s ease-out forwards;
            }
            
            .animate-slideIn {
              animation: slideIn 0.3s ease-out forwards;
            }
          `,
          }}
        />
      </div>
    );
  }

  if (showRecommendations) {
    return (
      <div className="container mx-auto py-10 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Recomendaciones de IA</h1>
          <p className="text-gray-600">
            Basado en tus especificaciones, la IA ha seleccionado estas opciones
            optimizadas para ti.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {recommendedServers.map((server, index) => (
            <Card
              key={server.id}
              className="relative overflow-hidden hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{server.name}</CardTitle>
                  {server.matchPercentage > 0 && (
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-800"
                    >
                      {Math.round(server.matchPercentage)}% match
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600">{server.description}</p>
                <p className="text-2xl font-bold text-green-600">
                  ${server.price}/mes
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">
                    Características incluidas:
                  </h4>
                  <ul className="space-y-1">
                    {server.features.map(
                      (feature: string, featureIndex: number) => (
                        <li
                          key={featureIndex}
                          className="text-sm text-gray-600 flex items-center"
                        >
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Recomendado para:</h4>
                  <div className="flex flex-wrap gap-1">
                    {server.recommendedFor.map(
                      (use: string, useIndex: number) => (
                        <Badge
                          key={useIndex}
                          variant="outline"
                          className="text-xs"
                        >
                          {use}
                        </Badge>
                      )
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => handleCreateServer(server)}
                  disabled={isCreating}
                >
                  {isCreating ? "Creando..." : "Seleccionar este Servidor"}
                </Button>
              </CardFooter>
              {index === 0 && (
                <div className="absolute top-0 right-0 bg-green-500 text-white px-2 py-1 text-xs font-bold">
                  Mejor Match
                </div>
              )}
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={handleBackToConfiguration}
            disabled={isCreating}
          >
            ← Volver a Configuración
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Configuración de Servidor</h1>
        <p className="text-gray-600">
          Selecciona las especificaciones que necesitas para tu servidor. Puedes
          elegir categorías completas o sub-opciones específicas.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-500" />
            Especificaciones del Servidor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {specifications.map((spec) => {
              const selectedSubSpecsForThisSpec = getSelectedSubSpecsForSpec(
                spec.id
              );
              const isSpecSelected = selectedSpecs.includes(spec.id);
              const hasSubSpecsSelected =
                selectedSubSpecsForThisSpec.length > 0;
              const isExpanded = expandedSpec === spec.id;

              return (
                <div
                  key={spec.id}
                  className="border rounded-lg p-4 bg-gray-50/50"
                >
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id={spec.id}
                      checked={isSpecSelected || hasSubSpecsSelected}
                      onCheckedChange={() => handleSpecToggle(spec.id)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor={spec.id}
                          className="text-base font-medium cursor-pointer"
                        >
                          {spec.name}
                        </Label>
                        {hasSubSpecsSelected && (
                          <Badge
                            variant="secondary"
                            className="text-xs bg-blue-100 text-blue-800"
                          >
                            {selectedSubSpecsForThisSpec.length} específica
                            seleccionada
                          </Badge>
                        )}
                      </div>

                      {spec.subOptions && (
                        <div className="mt-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setExpandedSpec(isExpanded ? null : spec.id)
                            }
                            className="h-6 px-2 text-xs text-blue-600 hover:text-blue-700"
                          >
                            {isExpanded ? (
                              <ChevronDown className="h-3 w-3 mr-1" />
                            ) : (
                              <ChevronRight className="h-3 w-3 mr-1" />
                            )}
                            {isExpanded ? "Ocultar" : "Ver"} opciones
                            específicas
                          </Button>

                          {isExpanded && (
                            <div className="mt-3 ml-6 space-y-3">
                              <div className="text-xs text-blue-600 mb-2 font-medium">
                                ⚠️ Selecciona solo una opción específica
                              </div>
                              {spec.subOptions.map((subOption) => (
                                <div
                                  key={subOption.id}
                                  className="flex items-start space-x-3 p-3 bg-white rounded border hover:bg-blue-50 transition-colors"
                                >
                                  <Checkbox
                                    id={`${spec.id}-${subOption.id}`}
                                    checked={selectedSubSpecs.includes(
                                      subOption.id
                                    )}
                                    onCheckedChange={() =>
                                      handleSubOptionToggle(
                                        subOption.id,
                                        spec.id
                                      )
                                    }
                                  />
                                  <div className="flex-1">
                                    <Label
                                      htmlFor={`${spec.id}-${subOption.id}`}
                                      className="text-sm font-medium cursor-pointer"
                                    >
                                      {subOption.name}
                                    </Label>
                                    {subOption.description && (
                                      <p className="text-xs text-gray-500 mt-1">
                                        {subOption.description}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-green-500" />
            Información del Servidor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="server-name" className="text-sm font-medium">
                Nombre del Servidor *
              </Label>
              <Input
                id="server-name"
                placeholder="Ej: Mi Servidor Web, Servidor de Producción..."
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label
                htmlFor="server-description"
                className="text-sm font-medium"
              >
                Descripción (Opcional)
              </Label>
              <Input
                id="server-description"
                placeholder="Breve descripción del propósito del servidor..."
                value={serverDescription}
                onChange={(e) => setServerDescription(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Notas Adicionales</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Especifica cualquier requisito adicional que no esté contemplado en las opciones anteriores..."
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            className="min-h-[100px]"
          />
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button
          onClick={handleGetRecommendations}
          disabled={
            (selectedSpecs.length === 0 && selectedSubSpecs.length === 0) ||
            !serverName.trim() ||
            isProcessing
          }
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isProcessing ? "Procesando..." : "Ver Recomendaciones de IA"}
        </Button>
      </div>

      {(selectedSpecs.length > 0 || selectedSubSpecs.length > 0) && (
        <div className="mt-6">
          <Separator className="my-4" />
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-3">
              Resumen de Selección:
            </h3>

            {selectedSpecs.length > 0 && (
              <div className="mb-3">
                <h4 className="text-sm font-medium text-blue-800 mb-2">
                  Categorías completas ({selectedSpecs.length}):
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSpecs.map((specId) => {
                    const spec = specifications.find((s) => s.id === specId);
                    return (
                      <span
                        key={specId}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
                      >
                        {spec?.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {selectedSubSpecs.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-blue-800 mb-2">
                  Opciones específicas ({selectedSubSpecs.length}):
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSubSpecs.map((subSpecId) => {
                    const spec = specifications.find((s) =>
                      s.subOptions?.some((subOpt) => subOpt.id === subSpecId)
                    );
                    const subOption = spec?.subOptions?.find(
                      (subOpt) => subOpt.id === subSpecId
                    );
                    return (
                      <span
                        key={subSpecId}
                        className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm border border-green-200"
                      >
                        ⚡ {subOption?.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
