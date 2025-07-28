import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import {
  Brain,
  Zap,
  Server,
  Cpu,
  Database,
  Network,
  HardDrive,
} from "lucide-react";
import { paths } from "@/routes/paths";

const processingSteps = [
  {
    id: 1,
    title: "Analizando Requisitos",
    description:
      "Procesando especificaciones técnicas y necesidades del usuario",
    icon: Brain,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    id: 2,
    title: "Evaluando Rendimiento",
    description: "Calculando optimizaciones de CPU y memoria",
    icon: Cpu,
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    id: 3,
    title: "Optimizando Almacenamiento",
    description: "Configurando soluciones de almacenamiento eficientes",
    icon: HardDrive,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    id: 4,
    title: "Configurando Redes",
    description: "Estableciendo conectividad y seguridad",
    icon: Network,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    id: 5,
    title: "Validando Base de Datos",
    description: "Optimizando configuraciones de datos",
    icon: Database,
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
  {
    id: 6,
    title: "Generando Recomendaciones",
    description: "Creando las mejores opciones para tu proyecto",
    icon: Server,
    color: "text-teal-500",
    bgColor: "bg-teal-50",
  },
];

export default function ServidoresProcesando() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const totalSteps = processingSteps.length;
    const stepDuration = 10000 / totalSteps;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 100 / totalSteps;
        if (newProgress >= 100) {
          setIsComplete(true);
          clearInterval(progressInterval);
          setTimeout(() => {
            navigate(paths.user.servidoresRecomendaciones);
          }, 1500);
          return 100;
        }
        return newProgress;
      });
    }, stepDuration);

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < totalSteps - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          return prev;
        }
      });
    }, stepDuration);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-30 animate-pulse"></div>
              <Brain className="h-16 w-16 text-blue-600 relative z-10 animate-bounce" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              IA Procesando
            </h1>
            <p className="text-gray-600">
              Nuestra inteligencia artificial está analizando tus requisitos
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progreso</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Current Step */}
          {currentStep < processingSteps.length && (
            <div className="mb-8">
              <div
                className={`p-6 rounded-lg ${
                  processingSteps[currentStep].bgColor
                } border-l-4 border-l-${
                  processingSteps[currentStep].color.split("-")[1]
                }-500`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-full ${processingSteps[currentStep].bgColor}`}
                  >
                    {(() => {
                      const IconComponent = processingSteps[currentStep].icon;
                      return (
                        <IconComponent
                          className={`h-6 w-6 ${processingSteps[currentStep].color} animate-pulse`}
                        />
                      );
                    })()}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {processingSteps[currentStep].title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {processingSteps[currentStep].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Completion Message */}
          {isComplete && (
            <div className="text-center">
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <Zap className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  ¡Análisis Completado!
                </h3>
                <p className="text-gray-600">
                  Redirigiendo a tus recomendaciones personalizadas...
                </p>
              </div>
            </div>
          )}

          {/* Animated Background Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-ping"></div>
            <div
              className="absolute top-20 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-ping"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute bottom-20 left-20 w-12 h-12 bg-indigo-200 rounded-full opacity-20 animate-ping"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute bottom-10 right-10 w-24 h-24 bg-green-200 rounded-full opacity-20 animate-ping"
              style={{ animationDelay: "3s" }}
            ></div>
          </div>

          {/* Puntos de Carga */}
          {!isComplete && (
            <div className="flex justify-center space-x-2 mt-6">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
              <div
                className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
