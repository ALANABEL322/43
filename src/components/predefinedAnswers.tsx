import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useSupportStore } from "@/store/support/supportStore";
import { toast } from "sonner";
import { createRoot } from "react-dom/client";

export default function FAQManagement() {
  const { predefinedAnswers, addPredefinedAnswer, deletePredefinedAnswer } =
    useSupportStore();
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [open, setOpen] = useState(false);

  const handleAddFAQ = () => {
    if (newQuestion.trim() && newAnswer.trim()) {
      addPredefinedAnswer(newQuestion.trim(), newAnswer.trim());
      setNewQuestion("");
      setNewAnswer("");
      setOpen(false);
      toast.success("Respuesta predefinida agregada correctamente");
    } else {
      toast.error("Por favor complete todos los campos");
    }
  };

  const handleDelete = (id: string) => {
    const dialog = document.createElement("div");
    document.body.appendChild(dialog);

    const showConfirmDialog = () => {
      return new Promise<boolean>((resolve) => {
        const cleanup = () => {
          document.body.removeChild(dialog);
        };

        const onConfirm = () => {
          resolve(true);
          cleanup();
        };

        const onCancel = () => {
          resolve(false);
          cleanup();
        };

        const dialogContent = (
          <AlertDialog defaultOpen>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción no se puede deshacer. La respuesta predefinida
                  será eliminada permanentemente.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={onCancel}>
                  Cancelar
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={onConfirm}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Eliminar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        );

        createRoot(dialog).render(dialogContent);
      });
    };

    showConfirmDialog().then((confirmed) => {
      if (confirmed) {
        deletePredefinedAnswer(id);
        toast.success("Respuesta predefinida eliminada correctamente");
      }
    });
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">
        Soluciones dadas a los usuarios
      </h1>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium">Respuestas predefinidas</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-500 hover:bg-emerald-600">
              <Plus className="mr-2 h-4 w-4" /> Agregar más soluciones
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Agregar nueva solución</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="question" className="text-sm font-medium">
                  Posible problemática o duda
                </label>
                <Input
                  id="question"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="Ingrese la pregunta"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="answer" className="text-sm font-medium">
                  Solución
                </label>
                <Textarea
                  id="answer"
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  placeholder="Ingrese la respuesta"
                  rows={4}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button
                className="bg-emerald-500 hover:bg-emerald-600"
                onClick={handleAddFAQ}
              >
                Agregar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {predefinedAnswers.map((faq) => (
          <Card key={faq.id} className="border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-grow">
                  <h3 className="font-medium mb-2">{faq.question}</h3>
                  <p className="text-gray-600 text-sm">{faq.answer}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(faq.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {predefinedAnswers.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No hay respuestas predefinidas. Agregue algunas para empezar.
          </div>
        )}
      </div>
    </div>
  );
}
