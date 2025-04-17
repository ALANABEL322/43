import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSupportStore } from "@/store/support/supportStore";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface PredefinedAnswerUserProps {
  email: string;
  serverName: string;
}

export default function PredefinedAnswerUser({
  email,
  serverName,
}: PredefinedAnswerUserProps) {
  const { predefinedQuestions, addTicket } = useSupportStore();
  const { toast } = useToast();

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  const handleSendQuestion = (question: any) => {
    if (!email || !serverName) {
      toast({
        title: "Error",
        description:
          "Por favor, complete los campos de email y servidor antes de enviar una pregunta.",
        variant: "destructive",
      });
      return;
    }

    addTicket({
      serverName,
      email,
      problemType: question.problemType,
      problemDate: new Date().toISOString(),
      urgencyLevel: question.urgencyLevel,
      details: `${question.title}\n\n${question.description}`,
      isAutomaticQuestion: true,
    });

    toast({
      title: "Pregunta enviada",
      description: "Su pregunta ha sido enviada al soporte técnico.",
    });
  };

  return (
    <div className="space-y-4 w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Preguntas Frecuentes</h2>
          <p className="text-sm text-gray-500 mt-1">
            Seleccione una pregunta predefinida para obtener ayuda rápida del
            equipo de soporte.
          </p>
        </div>
        {(!email || !serverName) && (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            Complete los datos del formulario primero.("email" y "serverName")
          </Badge>
        )}
      </div>
      <div className="grid gap-4">
        {predefinedQuestions.map((question) => (
          <Card
            key={question.id}
            className={`border border-gray-200 transition-all ${
              !email || !serverName ? "opacity-50" : "hover:border-emerald-300"
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium">{question.title}</h3>
                    <Badge
                      variant="outline"
                      className={getUrgencyColor(question.urgencyLevel)}
                    >
                      {question.urgencyLevel}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-blue-100 text-blue-800"
                    >
                      {question.problemType}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {question.description}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleSendQuestion(question)}
                  className="text-emerald-500 hover:text-emerald-700 hover:bg-emerald-50"
                  disabled={!email || !serverName}
                  title={
                    !email || !serverName
                      ? "Complete los campos de email y servidor primero"
                      : "Enviar pregunta"
                  }
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {predefinedQuestions.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No hay preguntas predefinidas disponibles.
          </div>
        )}
      </div>
    </div>
  );
}
