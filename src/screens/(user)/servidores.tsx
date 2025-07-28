import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight, Info } from "lucide-react";
import { useServersStore } from "@/store/serversStore";
import { paths } from "@/routes/paths";

export default function Servidores() {
  const navigate = useNavigate();
  const { specifications, setUserRequirements } = useServersStore();

  const [selectedSpecs, setSelectedSpecs] = useState<string[]>([]);
  const [selectedSubSpecs, setSelectedSubSpecs] = useState<string[]>([]);
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [expandedSpec, setExpandedSpec] = useState<string | null>(null);

  const handleSpecToggle = (specId: string) => {
    setSelectedSpecs((prev) =>
      prev.includes(specId)
        ? prev.filter((id) => id !== specId)
        : [...prev, specId]
    );
  };

  const handleSubOptionToggle = (subSpecId: string, specId: string) => {
    setSelectedSubSpecs((prev) => {
      if (prev.includes(subSpecId)) {
        return prev.filter((id) => id !== subSpecId);
      } else {
        return [...prev, subSpecId];
      }
    });

    // Si se selecciona una sub-opción, también seleccionar la especificación principal
    if (!selectedSpecs.includes(specId)) {
      setSelectedSpecs((prev) => [...prev, specId]);
    }
  };

  const handleContinue = () => {
    if (selectedSpecs.length > 0 || selectedSubSpecs.length > 0) {
      setUserRequirements({
        selectedSpecs,
        selectedSubSpecs,
        additionalNotes,
      });
      // Navegar a la pantalla de procesamiento de IA
      navigate(paths.user.servidoresProcesando);
    }
  };

  const handleCancel = () => {
    navigate(paths.user.dashboard);
  };

  const getSelectedSubSpecsForSpec = (specId: string) => {
    const spec = specifications.find((s) => s.id === specId);
    if (!spec?.subOptions) return [];

    return selectedSubSpecs.filter((subSpecId) =>
      spec.subOptions?.some((subOpt) => subOpt.id === subSpecId)
    );
  };

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
                          <Badge variant="secondary" className="text-xs">
                            {selectedSubSpecsForThisSpec.length} seleccionada(s)
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
                              {spec.subOptions.map((subOption) => (
                                <div
                                  key={subOption.id}
                                  className="flex items-start space-x-3 p-3 bg-white rounded border"
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
          onClick={handleContinue}
          disabled={selectedSpecs.length === 0 && selectedSubSpecs.length === 0}
        >
          Continuar
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
                        className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm"
                      >
                        {subOption?.name}
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
